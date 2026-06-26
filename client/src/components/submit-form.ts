import { getResults, ResponseData } from './get-results';
import { FormConfig } from '../form-config';

/**
 * Submit form when filter is changed
 *
 * Constructs FormData and calls getResults
 * Unlike getResults, this function is not concerned with the following
 *   - Sending a fetch request
 *   - Updating the DOM with the loader gif and results HTML
 **/
export function submitForm<T extends ResponseData>(config: FormConfig) {
  const {
    FilterForm,
    StartHiddenField,
  } = config;

  if (!FilterForm) return;

  if (StartHiddenField) StartHiddenField.value = '0';

  const url = new URL(FilterForm.action);
  const formData = new FormData(FilterForm);

  for (let [key, value] of formData) {
    if (value != 'all_options' && key != 'Start') {
      url.searchParams.set(key, String(value));
    }
  }

  return getResults(url, config) as Promise<T>;
}

