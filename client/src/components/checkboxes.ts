import { FormConfig } from '../form-config';
import { submitForm } from './submit-form';

/*
 * Update the state of the checkboxes based on a callback function.
 * The callback can check if a checkbox is checked or if its value is in the URL.
 **/
export function updateCheckboxSetState(
  checkboxCheckedCallback: (checkbox: HTMLInputElement) => boolean,
  updateCheckedState = false,
  config: FormConfig
) {
  const {
    AllOptionsCheckbox,
    CheckboxContainers,
    ClearAllFiltersButtons,
  } = config;

  let filtersSet = false;
  if (CheckboxContainers) CheckboxContainers.forEach((checkboxContainer) => {
    const checkbox = checkboxContainer.querySelector<HTMLInputElement>('input[type="checkbox"]');
    if (!checkbox) return;

    if (checkbox.value != 'all_options') {
      if (checkboxCheckedCallback(checkbox)) {
        filtersSet = true;
        if (updateCheckedState) checkbox.checked = true;
        checkboxContainer.classList.add('active');
      } else {
        if (updateCheckedState) checkbox.checked = false;
        checkboxContainer.classList.remove('active');
      }
    }

    if (AllOptionsCheckbox) {
      if (filtersSet) {
        AllOptionsCheckbox.checked = false;
        AllOptionsCheckbox.parentElement?.classList.remove('active');
        if (ClearAllFiltersButtons) ClearAllFiltersButtons.forEach((clearButton) => {
          clearButton.style.display = 'flex';
        });
      } else {
        AllOptionsCheckbox.checked = true;
        AllOptionsCheckbox.parentElement?.classList.add('active');
        if (ClearAllFiltersButtons) ClearAllFiltersButtons.forEach((clearButton) => {
          clearButton.style.display = 'none';
        });
      }
    }
  });
}

export function initializeCheckboxes(config: FormConfig) {
  const {
    CheckboxContainers,
  } = config;

  if (CheckboxContainers) CheckboxContainers.forEach((checkboxContainer) => {
    const checkbox = checkboxContainer.querySelector<HTMLInputElement>('input[type="checkbox"]');
    if (!checkbox) return;

    checkboxContainer.addEventListener('click', () => {
      if (checkbox.value != 'all_options') checkbox.checked = !checkbox.checked;
      if (checkbox.value != 'all_options') submitForm(config);
    });

  });

  updateCheckboxSetState(
    (checkbox) => {
      const urlParams = new URLSearchParams(document.location.search);
      return urlParams.has(checkbox.name);
    },
    true,
    config
  );
}


