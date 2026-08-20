import { initializeFilterClearButtons } from './clear-buttons';
import { updateCheckboxSetState } from './checkboxes';
import { updateCanLoadMore, updateCanTrigger } from './load-more';
import { FormConfig } from '../form-config';

export interface ResponseData {
  ResultsHTML: string;
  Start: string;
  CanLoadMore: boolean;
  FilterString?: string;
}

let existingRequests = 0;

/**
 * Get results from url
 *   - Creates a promise to fetch the url
 *   - Updates DOM with loader gif
 *   - Updated DOM with results HTML
 *   - Updates the browser history
 **/
export async function getResults<T extends ResponseData>(
  url: URL,
  config: FormConfig
) {
  const {
    DynamicClearFilterButtonsContainer,
    FilterStringElement,
    LoaderSource,
    ResultsContainer,
  } = config;

  if (!ResultsContainer || !LoaderSource) return;

  updateCheckboxSetState(
    checkbox => checkbox.checked,
    true,
    config
  );

  if (DynamicClearFilterButtonsContainer) {
    initializeFilterClearButtons(config);
  }

  ResultsContainer.innerHTML = `<img src="${LoaderSource}" alt="loader gif" class="loader-gif"/>`;

  updateCanTrigger(false);

  existingRequests++;

  return fetch(url.toString(), { headers: { 'x-requested-with': 'XMLHttpRequest' } })
    .then(response => response.json())
    .then((data: ResponseData) => {
      existingRequests--

      // Only display the results of the latest request, if multiple requests are made in quick succession
      if (existingRequests) return data;

      if (ResultsContainer && data.ResultsHTML) {
        ResultsContainer.innerHTML = data.ResultsHTML
      }

      if (data.FilterString && FilterStringElement) {
        FilterStringElement.innerHTML = data.FilterString
      }

      // May be using a unique endpoint for ajax, usually added by a DataExtension
      const urlString = url.toString().replace('ajax', '');

      window.history.pushState({}, '', urlString);

      updateCanLoadMore(true);
      updateCanTrigger(true);

      ResultsContainer.dispatchEvent(new CustomEvent('ajax-results', { detail: data }));

      return data as T;
    })
    .catch(e => console.log(e));
}

