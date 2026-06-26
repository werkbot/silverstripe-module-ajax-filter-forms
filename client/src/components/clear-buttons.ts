import { submitForm } from './submit-form';
import { FormConfig } from '../form-config';

interface Filter {
  title: string,
  value: string,
  key: string,
};

let formConfig: FormConfig = {};

function clearButtonEventListener(event: Event) {
  event.preventDefault();

  const {
    ClearAllFiltersButtons,
    FilterForm,
  } = formConfig;

  if (!FilterForm) return;

  const button = event.currentTarget as HTMLElement;
  if (button.dataset.key) {
    let filter: Filter = {
      title: button.innerText || '',
      value: button.dataset.value || '',
      key: button.dataset.key || '',
    };

    // Uncheck the filter
    const clearButtons = FilterForm.querySelectorAll<HTMLInputElement>(`input[name="${filter.key}"]`);
    clearButtons.forEach((input) => {
      if (input.type == 'text') {
        input.value = '';
        input.dispatchEvent(new Event('blur'));
      } else if (input.type == 'checkbox') {
        input.checked = false;
      }
    });

    const checkedFilters = Array.from(
      FilterForm.querySelectorAll<HTMLInputElement>('input[type="checkbox"]')
    ).filter(input => input.checked);

    if (checkedFilters.length == 0) {
      if (ClearAllFiltersButtons) ClearAllFiltersButtons.forEach((clearButton) => {
        clearButton.style.display = 'none';
      });
    }

    // Submiting the form will re-render the filter clear buttons
    submitForm(formConfig);

  } else {
    clearAllButtonEventListener();
  }

}

function clearAllButtonEventListener() {

  const {
    AllOptionsCheckbox,
    CheckboxContainers,
    ClearAllFiltersButtons,
    FilterDropdownToggleButtons,
    FilterForm,
    TextSearchField,
  } = formConfig;

  if (CheckboxContainers) CheckboxContainers.forEach((checkboxContainer) => {
    const checkbox = checkboxContainer.querySelector<HTMLInputElement>('input[type="checkbox"]');
    if (!checkbox) return;
    if (checkbox.value != 'all_options') {
      checkboxContainer.classList.remove('active');
      checkbox.checked = false;
    } else {
      checkboxContainer.classList.add('active');
    }
  });

  if (AllOptionsCheckbox) AllOptionsCheckbox.checked = true;
  if (ClearAllFiltersButtons) ClearAllFiltersButtons.forEach((clearButton) => {
    clearButton.style.display = 'none';
  });

  if (TextSearchField) {
    TextSearchField.value = '';
    TextSearchField.dispatchEvent(new Event('blur'));
  }

  if (FilterDropdownToggleButtons && FilterDropdownToggleButtons.length && FilterForm) {
    if (FilterDropdownToggleButtons) FilterDropdownToggleButtons.forEach((button) => {
      const FilterDropdown = button.parentElement?.parentElement;
      if (FilterDropdown?.classList.contains('active')) {
        FilterDropdown?.classList.remove('active');
      }
    });
  }

  submitForm(formConfig);
}

/**
 * Initialize the clear buttons for the filters
 * Re-renders the form filter clear buttons based on the filters set in the form.
 **/
function renderClearButtonsByFormFilters() {
  const {
    ClearAllFiltersButtons,
    DynamicClearFilterButtonsContainer,
    FilterForm,
    TextSearchField,
  } = formConfig;

  if (!FilterForm) return;

  // Get all filters set in the form
  const existingFilters = Array.from(FilterForm.querySelectorAll<HTMLInputElement>('input[type="checkbox"]'));

  // Remove "all_options"
  existingFilters.shift();

  if (TextSearchField) existingFilters.push(TextSearchField);

  // If there are any filters set, show the clear buttons
  if (existingFilters.length) {
    existingFilters.forEach((filter) => {
      const clearButton = DynamicClearFilterButtonsContainer.querySelector<HTMLElement>('.option-clear-filter[data-key="' + filter.name + '"]');

      let filterSet = false;
      let clearButtonText = '';

      if (filter.type == 'text') {
        filterSet = filter.value != '';
        clearButtonText = filter.value;

      } else if (filter.type == 'checkbox') {
        filterSet = filter.checked;
        if (filter.labels) {
          clearButtonText = filter.labels[0].innerText;
        }
      }

      if (filterSet) {
        if (ClearAllFiltersButtons) ClearAllFiltersButtons.forEach((clearButton) => {
          clearButton.style.display = 'inline-block';
        });

        if (DynamicClearFilterButtonsContainer && !clearButton) {
          DynamicClearFilterButtonsContainer.insertAdjacentHTML(
            'beforeend',
            `<button class="button option-clear-filter" data-key="${filter.name}" data-value="${filter.value}">${clearButtonText}&nbsp;<i class="fas fa-times"></i></button>`
          );
        } else if (clearButton) {
          clearButton.innerHTML = `${clearButtonText}&nbsp;<i class="fas fa-times"></i>`;
        }


      } else if (!filterSet && clearButton) {
        clearButton.remove();
      }

    });
  }
}

/**
 * Attach event listeners to the clear buttons
 * When a clear button is clicked, it will remove the filter from the form and re-submit the form.
 **/
function attachClearButtonEventListeners() {
  const clearButtons = document.querySelectorAll('.option-clear-filter');
  clearButtons.forEach((button) => {
    button.removeEventListener('click', clearButtonEventListener);
    button.addEventListener('click', clearButtonEventListener);
  });
}

/**
 * Initialize the filter clear buttons
 * Load new filter clear buttons when filters are updated,
 * and attach event listeners to them
 **/
export function initializeFilterClearButtons(config: FormConfig) {
  formConfig = config;

  const {
    AllOptionsCheckbox,
    ClearAllFiltersButtons,
    DynamicClearFilterButtonsContainer,
  } = formConfig;

  if (DynamicClearFilterButtonsContainer) {
    renderClearButtonsByFormFilters();
    attachClearButtonEventListeners();
  }

  if (ClearAllFiltersButtons) ClearAllFiltersButtons.forEach((clearButton) => {
    clearButton.addEventListener('click', clearAllButtonEventListener);
  });

  if (AllOptionsCheckbox) {
    AllOptionsCheckbox.parentElement?.addEventListener('click', clearAllButtonEventListener);
  }
}
