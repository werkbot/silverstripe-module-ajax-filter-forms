import { submitForm } from './submit-form';
import { FormConfig } from '../form-config';

export function initializeSortControl(config: FormConfig) {
  const {
    SortByDropdown,
    SortByField,
  } = config;

  if (!SortByDropdown || !SortByField) return;

  SortByDropdown.addEventListener('click', (event) => {
    SortByDropdown.classList.toggle('active');
    const target = event.target as HTMLElement;
    const value = target.dataset.value;
    if (value) {
      SortByField.value = value;
      submitForm(config);
    }
  });
}

