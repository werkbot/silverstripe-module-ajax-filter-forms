import { ResponseData } from './get-results';
import { FormConfig } from '../form-config';

const CanLoadMoreState = {
  canLoadMore: false,
  canTrigger: true, // Prevents multiple AJAX requests from being sent
}

export function initializeLoadMore(config: FormConfig) {
  const {
    FilterForm,
    ResultsContainer,
    LoaderSource,
    LoadMoreButtons,
    LoadMoreCount,
    StartHiddenField,
  } = config;

  if (!FilterForm || !ResultsContainer || !LoaderSource || !StartHiddenField) return;

  /* Load more on scroll */
  CanLoadMoreState.canLoadMore = Boolean(ResultsContainer.dataset.canLoadMore);
  if (LoadMoreButtons && LoadMoreButtons.length) {
    LoadMoreButtons.forEach((button) => {
      button.addEventListener('click', loadMore);
    });
  } else {
    window.addEventListener('scroll', () => {
      if (ResultsContainer.getBoundingClientRect().bottom <= window.innerHeight) {
        loadMore();
      }
    });
  }

  function loadMore() {
    if (!CanLoadMoreState.canTrigger || !CanLoadMoreState.canLoadMore) return;

    CanLoadMoreState.canTrigger = false;

    ResultsContainer.innerHTML += `<img src="${LoaderSource}" alt="loader gif" class="loader-gif"/>`

    const originalSearch = document.location.search;
    var urlString = FilterForm.action;
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
        updateCanLoadMore(data.CanLoadMore, config);
        updateCanTrigger(true);
      });
  }
}

export function updateCanLoadMore(canLoadMore: boolean, config: FormConfig) {
  CanLoadMoreState.canLoadMore = canLoadMore;

  const { LoadMoreButtons } = config;

  if (LoadMoreButtons && LoadMoreButtons.length) {
    if (canLoadMore) {
      LoadMoreButtons.forEach((button) => {
        // Unset the display property to show the button again
        button.style.display = '';
      });
    } else {
      LoadMoreButtons.forEach((button) => {
        button.style.display = 'none';
      });
    }
  }
}

export function updateCanTrigger(canTrigger: boolean) {
  CanLoadMoreState.canTrigger = canTrigger;
}

