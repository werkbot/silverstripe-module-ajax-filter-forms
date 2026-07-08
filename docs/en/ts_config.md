# TypeScript Configuration

## Vite
This can be aliased in a vite.config.js.
```js
resolve: {
    alias: {
        'werkbot-ajax-forms': path.resolve(__dirname, './vendor/werkbot/werkbot-ajax-forms/client/src'),
```

## Usage
Assign AjaxForm elements and initialize the form.
See the [FormConfig](/client/src/form-config.ts) interface for more information on each of the properties.

## Example usage:
```ts
import { FormConfig } from 'werkbot-ajax-forms/form-config';
import { initializeForm } from 'werkbot-ajax-forms/initializeForm';

const FilterForm = document.querySelector<HTMLFormElement>('...');

const formConfig: FormConfig = {
  FilterForm,
  AllOptionsCheckbox: document.querySelector<HTMLInputElement>('...'),
  CheckboxContainers: document.querySelectorAll<HTMLInputElement>('...'),
  FilterDropdownToggleButtons: document.querySelectorAll<HTMLInputElement>('...'),
  ResultsContainer: document.querySelector<HTMLElement>('...'),
  StartHiddenField: document.querySelector<HTMLInputElement>('...'),
  SortByDropdown: document.querySelector<HTMLInputElement>('...'),
  SortByField: document.querySelector<HTMLInputElement>('...'),
  FilterStringElement: document.querySelector<HTMLElement>('...'),
}

if (formConfig.ResultsContainer) {
  formConfig.LoaderSource = formConfig.ResultsContainer.dataset.loaderSource;
  formConfig.LoadMoreCount = Number(formConfig.ResultsContainer.dataset.loadMoreCount);
}

if (FilterForm) {
  initializeForm(formConfig);
}

export { formConfig }
```

