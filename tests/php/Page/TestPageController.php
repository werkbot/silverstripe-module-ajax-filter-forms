<?php

namespace Werkbot\AjaxForms\Tests\Page;

use SilverStripe\Dev\TestOnly;

class TestPageController extends ContentController implements UsesAjaxForm, TestOnly
{
  protected static string $commandName = 'test-page-controller';

  protected string $title = 'test page controller';

  protected static string $description = 'command for testing that page controllers work as expected';
}
