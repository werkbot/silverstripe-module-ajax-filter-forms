# PHP Configuration
A PageController can implement the `UsesAjaxForm` interface.
```php
class BlogPageController extends PageController implements UsesAjaxForm
```

This can also work for DataExtensions, though you may need to set a different action for the ajax form handling.
```php
class BlogPageControllerExtension extends DataExtension implements UsesAjaxForm
{
  private static $url_handlers = [
    'ajax' => 'getAjaxResponse',
  ];
```

The PageController should also receive the `AjaxFormsExtension`.
```yml
BlogPageController:
  extensions:
    - Werkbot\AjaxForms\AjaxFormsExtension
```

The PageController will then need to implement each of the methods defined in the `UsesAjaxForm` interface.
See the [UsesAjaxForm](/src/UsesAjaxForm.php) interface for more information on each of the methods.


