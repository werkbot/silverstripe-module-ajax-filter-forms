import { initializeFilterClearButtons } from './components/clear-buttons';
import { initializeFilterDropdowns } from './components/filter-dropdown';
import { initializeHistoryChange } from './components/history-change';
import { initializeLoadMore } from './components/load-more';
import { initializeSortControl } from './components/sort-by';
import { submitForm } from './components/submit-form';
import { initializeViewType } from './components/view-type';
import { initializeCheckboxes } from './components/checkboxes';

import { FormConfig } from './form-config';

export function initializeForm(config: FormConfig) {
  const {
    CheckboxContainers,
    FilterDropdownToggleButtons,
    FilterForm,
    LoaderSource,
    LoadMoreCount,
    ResultsContainer,
    SortByDropdown,
    SortByField,
    StartHiddenField,
    ViewTypeField,
  } = config;

  if (FilterForm) {
    FilterForm.addEventListener('submit', (event) => {
      event.preventDefault();
      submitForm(config);
    });
  }

  if (CheckboxContainers) {
    initializeCheckboxes(config);
  }

  if (ResultsContainer) {
    initializeHistoryChange(config);
  }

  if (SortByDropdown && SortByField) {
    initializeSortControl(config);
  }

  if (ViewTypeField) {
    initializeViewType(config);
  }

  if (FilterDropdownToggleButtons) {
    initializeFilterDropdowns(config);
  }

  initializeFilterClearButtons(config);

  if (ResultsContainer
   && LoaderSource
   && LoadMoreCount
   && StartHiddenField
  ) {
    initializeLoadMore(config);
  }

}

