<?php

namespace Werkbot\AjaxForms;

use SilverStripe\Control\HTTPResponse;
use SilverStripe\Forms\Form;
use SilverStripe\ORM\ArrayList;
use SilverStripe\ORM\DataExtension;
use SilverStripe\View\ArrayData;

class AjaxFormsExtension extends DataExtension
{
  private static $allowed_actions = [
    'getAjaxResponse',
  ];

  private static $url_handlers = [
    'loadMoreResults/$Start' => 'getAjaxResponse',
  ];

  /**
   * Select from sub-categories to filter all products under this category and its sub-categories
   * @return Form
   */
  public function AjaxFilterForm(): Form
  {
    $request = $this->owner->request;
    $action = $this->owner->getAjaxEndpoint();

    $form = Form::create(
      $this->owner,
      'AjaxFilterForm',
      $this->owner->getAjaxFilterFormFields()
    );

    $form->setFormMethod('GET')
      ->setFormAction($action)
      ->loadDataFrom($request->getVars())
      ->addExtraClass($this->owner->getAjaxFormCSSClass())
      ->setTemplate($this->owner->getAjaxFormTemplate());

    $this->owner->extend('updateAjaxFilterForm', $form);

    return $form;
  }

  public function getActiveFilters(): array
  {
    $request = $this->owner->request;

    $filtersMessage = '<p>Now Displaying: <strong>';
    $filtersForTemplate = [];

    $search = $request->getVar($this->owner->getTextSearchName());
    if ($search) {
      $filtersForTemplate[] = [
        'Key' => 'Search',
        'Value' => $search,
        'Title' => $search,
      ];
      $filtersMessage .= $search . ', ';
    }

    foreach ($this->owner->getFiltersConfig() as $optionsFieldName => $className) {
      $optionIDs = $request->getVar($optionsFieldName);
      if ($optionIDs) {
        foreach ($optionIDs as $optionID) {
          $option = $className::get()->byID($optionID);
          if (!$option) continue;
          $filtersForTemplate[] = [
            'Key' => $optionsFieldName . '[' . $optionID . ']',
            'Value' => $optionID,
            'Title' => $option->Title,
          ];
          $filtersMessage .= $option->Title . ', ';
        }
      }
    }

    if ($search || $filtersForTemplate) {
      $filtersMessage = rtrim($filtersMessage, ', ') . '</strong></p>';
    } else {
      $filtersMessage .= 'All</strong></p>';
    }

    $filtersForTemplate = ArrayList::create($filtersForTemplate);

    $activeFilters = [
      'FiltersMessage' => $filtersMessage,
      'FiltersForTemplate' => $filtersForTemplate,
    ];

    $this->owner->extend('updateActiveFilters', $activeFilters);

    return $activeFilters;
  }

  public function getAjaxResponse(): HTTPResponse
  {
    $request = $this->owner->request;
    $start = $this->owner->request->getVar('Start');
    $loadMoreCount = $this->owner->getLoadMoreCount();

    $newStart = $start + $loadMoreCount;

    $filtersMessage = $this->owner->getActiveFilters()['FiltersMessage'];

    $results = ArrayList::create(
      array_slice(
        $this->owner->getFilteredArray(),
        $start ?: 0,
        $loadMoreCount
      )
    );

    if (count($results) === 0) {
      $canLoadMore = false;
    } else {
      $canLoadMore = $results->count() % $loadMoreCount === 0;
    }

    $responseData = [
      'FilterString' => $filtersMessage,
      'Start' => $newStart,
      'CanLoadMore' => $canLoadMore,
      'ResultsHTML' => ArrayData::create([
        'AjaxSearchResults' => $results,
      ])->renderWith($this->owner->getResultsTemplate())->RAW(),
    ];

    $this->owner->extend('updateAjaxResponseData', $responseData);

    $response = HTTPResponse::create(json_encode($responseData))
      ->addHeader('Content-Type', 'application/json');

    $this->owner->extend('updateAjaxResponse', $response);

    return $response;
  }

}
