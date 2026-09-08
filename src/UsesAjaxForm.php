<?php

namespace Werkbot\AjaxForms;

use SilverStripe\Forms\FieldList;

interface UsesAjaxForm
{
  /**
   * The endpoint to which the form will submit via AJAX.
   * @return string
   */
  public function getAjaxEndpoint(): string;

  /**
   * The fields to be included in the AJAX filter form.
   * @return FieldList
   */
  public function getAjaxFilterFormFields(): FieldList;

  /**
   * The CSS class to be applied to the AJAX filter form.
   * @return string
   */
  public function getAjaxFormCSSClass(): string;

  /**
   * The template name to be used for rendering the AJAX filter form.
   * @return string
   */
  public function getAjaxFormTemplate(): string;

  /**
   * Return an array of filtered DataObjects based on the current filter criteria.
   * @return array<\SilverStripe\ORM\DataObject>
   */
  public function getFilteredArray(): array;

  /**
   * Return the number of additional results to load per page.
   * @return int
   */
  public function getLoadMoreCount(): int;

  /**
   * Return the template name to be used for rendering the filtered results.
   * @return string
   */
  public function getResultsTemplate(): string;
}
