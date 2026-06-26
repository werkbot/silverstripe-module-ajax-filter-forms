export interface FormConfig {
  /**
   * An "all" checkboxset option that deselects all other checkboxes in the filter form.
   */
  AllOptionsCheckbox?: HTMLInputElement;

  /**
   * The container that holds all the filter checkboxes.
   */
  CheckboxContainers?: NodeListOf<HTMLElement>;

  /**
   * A list of buttons that clear all filters when clicked.
   * These are hidden after they are clicked or all filters are cleared.
   */
  ClearAllFiltersButtons?: NodeListOf<HTMLElement>;

  /**
   * A container that holds the dynamic clear filter buttons for each filter.
   * The clear buttons here are generated dynamically based on the filters selected and are hidden when no filters are selected.
   */
  DynamicClearFilterButtonsContainer?: HTMLElement;

  /**
   * A list of buttons that toggle the visibility of the filter dropdowns when clicked.
   */
  FilterDropdownToggleButtons?: NodeListOf<HTMLElement>;

  /**
   * The form element that contains all the filter inputs.
   */
  FilterForm?: HTMLFormElement;

  /**
   * A container that holds the filter string element.
   * Displays the currently selected filters as a comma separated string.
   */
  FilterStringElement?: HTMLElement;

  /**
   * The URL of a loader gif to display while the results are loading.
   */
  LoaderSource?: string;

  /**
   * The number of results to load when the "Load More" button is clicked.
   */
  LoadMoreCount?: number;

  /**
   * A list of buttons that load more results when clicked.
   */
  LoadMoreButtons?: NodeListOf<HTMLElement>;

  /**
   * The container that holds the results of the filter form.
   */
  ResultsContainer?: HTMLElement;

  /**
   * A container that holds the "Sort By" dropdown.
   */
  SortByDropdown?: HTMLElement;

  /**
   * The "Sort By" select element.
   */
  SortByField?: HTMLInputElement;

  /**
   * A hidden input field that holds the start index for the results.
   * This is used for pagination and is updated when the "Load More" button is clicked.
   */
  StartHiddenField?: HTMLInputElement;

  /**
   * A text input field that allows users to search the results by a text string.
   */
  TextSearchField?: HTMLInputElement;

  /**
   * A "View Type" element, that when clicked toggles the view type of the results (e.g. grid or list).
   */
  ViewTypeField?: HTMLElement;
}

