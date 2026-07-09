import { submitForm } from './submit-form';
import { FormConfig } from '../form-config';

export function initializeDropdownSelections(config: FormConfig) {
  const {
    DropdownSelectFields,
    ClearAllFiltersButtons,
  } = config;

  if (!DropdownSelectFields) return;

  DropdownSelectFields.forEach((dropdown) => {
    dropdown.addEventListener('change', () => {
      submitForm(config)
      if (dropdown.value && ClearAllFiltersButtons) ClearAllFiltersButtons.forEach((clearButton) => {
        clearButton.style.display = 'flex';
      });
    });
  });
}

