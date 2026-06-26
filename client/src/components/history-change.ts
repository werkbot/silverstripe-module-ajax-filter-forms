import { getResults } from './get-results';
import { updateCheckboxSetState } from './checkboxes';
import { FormConfig } from '../form-config';

export function initializeHistoryChange(config: FormConfig) {
  const {
    FilterForm,
  } = config;

  if (!FilterForm) return;

  const url = new URL(FilterForm.action);

  /* Update state when browser back/forward buttons are used */
  window.addEventListener('popstate', function () {
    url.search = document.location.search;
    getResults(url, config);
    updateCheckboxSetState(
      (checkbox) => {
        const urlParams = new URLSearchParams(document.location.search);
        return urlParams.has(checkbox.name);
      },
      true,
      config
    );
  });
}
