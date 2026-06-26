import { ResponseData } from './get-results';
import { FormConfig } from '../form-config';

const CanLoadMoreState = {
  canLoadMore: false,
  canTrigger: true, // Prevents multiple AJAX requests from being sent
}

export function initializeLoadMore(config: FormConfig) {
  const {
    ResultsContainer,
    LoaderSource,
    LoadMoreCount,
    StartHiddenField,
  } = config;

  if (!ResultsContainer || !LoaderSource || !StartHiddenField) return;

  /* Load more on scroll */
  CanLoadMoreState.canLoadMore = Boolean(ResultsContainer.dataset.canLoadMore);
  window.addEventListener('scroll', () => {
    if (ResultsContainer.getBoundingClientRect().bottom <= window.innerHeight
      && CanLoadMoreState.canTrigger
      && CanLoadMoreState.canLoadMore
    ) {
      CanLoadMoreState.canTrigger = false;

      ResultsContainer.innerHTML += `<img src="${LoaderSource}" alt="loader gif" class="loader-gif"/>`

      const originalSearch = document.location.search;
      var urlString = document.location.origin + document.location.pathname;
      urlString = urlString.replace(/\/$/, '');
      const url = new URL(urlString + '/loadMoreResults');
      url.search = originalSearch;
      const start = StartHiddenField.value != '0' ? StartHiddenField.value : LoadMoreCount;
      url.searchParams.set('Start', String(start));
      return fetch(url.toString(), { headers: { 'x-requested-with': 'XMLHttpRequest' } })
        .then(response => response.json())
        .then((data: ResponseData) => {
          ResultsContainer.querySelector('.loader-gif')?.remove();
          ResultsContainer.innerHTML += data.ResultsHTML;
          StartHiddenField.value = data.Start;
          CanLoadMoreState.canLoadMore = data.CanLoadMore;
          CanLoadMoreState.canTrigger = true;
        });
    }
  });
}

export function updateCanLoadMore(canLoadMore) {
  CanLoadMoreState.canLoadMore = canLoadMore;
}

export function updateCanTrigger(canTrigger) {
  CanLoadMoreState.canTrigger = canTrigger;
}

