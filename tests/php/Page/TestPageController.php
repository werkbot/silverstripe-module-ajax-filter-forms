<?php

namespace Werkbot\AjaxForms\Tests\Page;

use SilverStripe\CMS\Controllers\ContentController;
use SilverStripe\Dev\TestOnly;
use SilverStripe\Forms\FieldList;
use Werkbot\AjaxForms\UsesAjaxForm;

class TestPageController extends ContentController implements UsesAjaxForm, TestOnly
{
  public function getAjaxEndpoint(): string
  {
    return '/test-page/ajax';
  }

  public function getAjaxFilterFormFields(): FieldList
  {
    return FieldList::create();
  }

  public function getAjaxFormCSSClass(): string
  {
    return 'ajax-filter-form';
  }

  public function getAjaxFormTemplate(): string
  {
    return 'Forms/AjaxFilterForm';
  }

  public function getFilteredArray(): array
  {
    return [];
  }

  public function getLoadMoreCount(): int
  {
    return 9;
  }

  public function getResultsTemplate(): string
  {
    return 'Includes/AjaxFilterFormResults';
  }

}

