<?php

namespace Werkbot\AjaxForms\Tests;

use SilverStripe\Core\Injector\Injector;
use SilverStripe\Dev\SapphireTest;
use Werkbot\AjaxForms\Tests\Page\TestPage;

class AjaxFilterFormTest extends SapphireTest
{
  protected static $fixture_file = 'AjaxFilterFormTest.yml';

  public function testAjaxFormCSSClass()
  {
    $fixtureObjects = [
      'TestPageOne' => 'ajax-filter-form',
    ];

    foreach ($fixtureObjects as $fixtureObject => $expectedValue) {
      $object = $this->objFromFixture(TestPage::class, $fixtureObject);
      $this->assertEquals($expectedValue, Injector::inst()->get($object->getControllerName())->getAjaxFormCSSClass());
    }
  }

  public function testAjaxFormTemplate()
  {
    $fixtureObjects = [
      'TestPageOne' => 'Forms/AjaxFilterForm',
    ];

    foreach ($fixtureObjects as $fixtureObject => $expectedValue) {
      $object = $this->objFromFixture(TestPage::class, $fixtureObject);
      $this->assertEquals($expectedValue, Injector::inst()->get($object->getControllerName())->getAjaxFormTemplate());
    }
  }

  public function testResultsTemplate()
  {
    $fixtureObjects = [
      'TestPageOne' => 'Includes/AjaxFilterFormResults',
    ];

    foreach ($fixtureObjects as $fixtureObject => $expectedValue) {
      $object = $this->objFromFixture(TestPage::class, $fixtureObject);
      $this->assertEquals($expectedValue, Injector::inst()->get($object->getControllerName())->getResultsTemplate());
    }
  }

  public function testLoadMoreCount()
  {
    $fixtureObjects = [
      'TestPageOne' => 9,
    ];

    foreach ($fixtureObjects as $fixtureObject => $expectedValue) {
      $object = $this->objFromFixture(TestPage::class, $fixtureObject);
      $this->assertEquals($expectedValue, Injector::inst()->get($object->getControllerName())->getLoadMoreCount());
    }
  }

  public function testFilteredArray()
  {
    $fixtureObjects = [
      'TestPageOne' => [],
    ];

    foreach ($fixtureObjects as $fixtureObject => $expectedValue) {
      $object = $this->objFromFixture(TestPage::class, $fixtureObject);
      $this->assertEquals($expectedValue, Injector::inst()->get($object->getControllerName())->getFilteredArray());
    }
  }

  public function testAjaxEndpoint()
  {
    $fixtureObjects = [
      'TestPageOne' => '/test-page/ajax',
    ];

    foreach ($fixtureObjects as $fixtureObject => $expectedValue) {
      $object = $this->objFromFixture(TestPage::class, $fixtureObject);
      $this->assertEquals($expectedValue, Injector::inst()->get($object->getControllerName())->getAjaxEndpoint());
    }
  }

  public function testAjaxFilterFormFields()
  {
    $fixtureObjects = [
      'TestPageOne' => [],
    ];

    foreach ($fixtureObjects as $fixtureObject => $expectedValue) {
      $object = $this->objFromFixture(TestPage::class, $fixtureObject);
      $this->assertEquals($expectedValue, Injector::inst()->get($object->getControllerName())->getAjaxFilterFormFields()->toArray());
    }
  }

}

