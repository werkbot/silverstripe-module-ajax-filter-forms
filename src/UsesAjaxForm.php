<?php

namespace Werkbot\AjaxForms;

use SilverStripe\Forms\FieldList;

interface UsesAjaxForm
{
  /**
   * For CheckboxSetFields.
   * For the searchable DataObject, map a field name to a has_many/many_many DataObject source.
   * Format like:
   *   [ 'FormFieldName' => FieldSourceClassName::class ]
   *
   * Example:
   *   [ 'Categories' => Category::class ]
   *
   * @return array<string, class-string<\SilverStripe\ORM\DataObject>>
   */
  public function getFiltersConfig(): array;

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

  /**
   * Return the name of the text search field, if applicable.
   * @return string
   */
  public function getTextSearchName(): string;
}
