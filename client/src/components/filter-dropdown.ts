import { FormConfig } from '../form-config';

export function initializeFilterDropdowns(config: FormConfig) {
  const {
    FilterDropdownToggleButtons,
  } = config;

  if (FilterDropdownToggleButtons) FilterDropdownToggleButtons.forEach((button) => {
    button.addEventListener('click', () => {
      button.parentElement?.parentElement?.classList.toggle('active');
    });
  });

  // Close the dropdown if the user clicks outside of it
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (FilterDropdownToggleButtons) FilterDropdownToggleButtons.forEach((button) => {
      if (!button.contains(target) && !target.closest('.type-checkbox-filters')) {
        button.parentElement?.parentElement?.classList.remove('active');
      }
    });
  });
}

