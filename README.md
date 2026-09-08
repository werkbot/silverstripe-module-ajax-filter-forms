# SilverStripe Ajax Filter Forms

A SilverStripe module that provides boilerplate for ajax powered filter forms

## Installation
```
composer require werkbot/werkbot-ajax-filter-forms
```

## Setup
- [PHP Configuration](docs/en/php_config.md)
- [TypeScript Configuration](docs/en/ts_config.md)

## Examples
Page template
```
<div class="fw-container">
  <section class="fw-space">
    $AjaxFilterForm
  </section>

  <section class="fw-container fw-space">
    <div class="ajax-filter-message">
      $FilterString.RAW
    </div>
    <div class="flex-container">
      <div class="ajax-filter-form-clear-filters flex-container">
        <% if $FiltersForTemplate %>
          <% loop $FiltersForTemplate %>
            <button class="button option-clear-filter" data-key="$Key" data-value="$Value">$Title &nbsp; <i class="fa fa-times"></i></button>
          <% end_loop %>
        <% end_if %>
      </div>
      <button class="button option-clear-filter clear-all-types-btn"<% if $FiltersForTemplate.count == 0 %>style="display: none;"<% end_if %>>Clear Filters &nbsp; <i class="fa fa-times"></i></button>
    </div>
  </section>

  <section class="ajax-filter-form-results"
    data-loader-source="$themedResourceURL(images/ajax-loader.gif)"
    data-load-more-count="$getLoadMoreCount()"
    data-can-load-more="$CanLoadMore"
  >
    <% include AjaxFilterFormResults %>
  </section>
</div>
```
Includes/AjaxFilterFormResults
```
<div class="fw-container flex-container">
  <% if $AjaxSearchResults %>
    <% loop $AjaxSearchResults %>
      <% include ResultItemSummary %>
    <% end_loop %>
  <% end_if %>
</div>
```

## Testing
```
./vendor/bin/phpunit vendor/werkbot/werkbot-ajax-filter-forms
```

## Documentation
Generate documentation using Doctum:
```
./vendor/bin/doctum.php update doctum.config.php
```

View the api documentation:
```
start doctum_build/index.html
```
