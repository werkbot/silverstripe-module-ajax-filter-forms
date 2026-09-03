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

    $filterString = '<p>Now Displaying: <strong>';
    $filtersForTemplate = [];

    foreach ($this->owner->getFiltersConfig() as $fieldName => $type) {
      $value = $request->getVar($fieldName);
      if (!$value) continue;

      if ($type == 'TextValue') {
        $filtersForTemplate[] = [
          'Key' => $fieldName,
          'Value' => $value,
          'Title' => $value,
        ];
        $filterString .= $value . ', ';

      } else if ($type == 'SelectedValue') {
        $title = $this->owner->getAjaxFilterFormFields()->fieldByName($fieldName)->getSource()[$value];
        $filtersForTemplate[] = [
          'Key' => $fieldName,
          'Value' => $value,
          'Title' => $title,
        ];
        $filterString .= $title . ', ';

      // CheckboxSet of DataObject IDs
      } else if (is_array($value)) {
        foreach ($value as $optionID) {
          $option = $type::get()->byID($optionID);
          if (!$option) continue;
          $filtersForTemplate[] = [
            'Key' => $fieldName . '[' . $optionID . ']',
            'Value' => $optionID,
            'Title' => $option->Title,
          ];
          $filterString .= $option->Title . ', ';
        }

      } else {
        $option = $type::get()->byID($value);
        if (!$option) continue;
        $filtersForTemplate[] = [
          'Key' => $fieldName,
          'Value' => $value,
          'Title' => $option->Title,
        ];
        $filterString .= $option->Title . ', ';
      }
    }

    if ($filtersForTemplate) {
      $filterString = rtrim($filterString, ', ') . '</strong></p>';
    } else {
      $filterString .= 'All</strong></p>';
    }

    $filtersForTemplate = ArrayList::create($filtersForTemplate);

    $activeFilters = [
      'FilterString' => $filterString,
      'FiltersForTemplate' => $filtersForTemplate,
    ];

    $this->owner->extend('updateActiveFilters', $activeFilters);

    return $activeFilters;
  }

  public function getAjaxResultsData(): array
  {
    $request = $this->owner->request;
    $start = $this->owner->request->getVar('Start');
    $loadMoreCount = $this->owner->getLoadMoreCount();

    $newStart = $start + $loadMoreCount;

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

    $resultsHTMLData = [
      'AjaxSearchResults' => $results,
      'AjaxSearchResultsEncoded' => json_encode($results->toNestedArray()),
    ];

    $this->owner->extend('updateAjaxResultsHTMLData', $resultsHTMLData);

    $resultsData = array_merge(
      $resultsHTMLData,
      $this->owner->getActiveFilters(),
      [
        'Start' => $newStart,
        'CanLoadMore' => $canLoadMore,
        'ResultsHTML' => ArrayData::create($resultsHTMLData)->renderWith($this->owner->getResultsTemplate())->RAW(),
      ]
    );

    $this->owner->extend('updateAjaxResultsData', $resultsData);

    return $resultsData;
  }

  public function getAjaxResponse(): HTTPResponse
  {
    $response = HTTPResponse::create(json_encode($this->owner->getAjaxResultsData()))
      ->addHeader('Content-Type', 'application/json');

    $this->owner->extend('updateAjaxResponse', $response);

    return $response;
  }

}
