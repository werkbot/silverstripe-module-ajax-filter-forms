import { submitForm } from './submit-form';
import { FormConfig } from '../form-config';
import { updateClearAllFiltersButtonVisibility } from './clear-buttons';

export function initializeDropdownSelections(config: FormConfig) {
  const {
    DropdownSelectFields,
  } = config;

  if (!DropdownSelectFields) return;

  DropdownSelectFields.forEach((dropdown) => {
    dropdown.addEventListener('change', () => {
      updateClearAllFiltersButtonVisibility(config);
      submitForm(config)
    });
  });
}

