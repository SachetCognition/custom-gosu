//
//  ServiceTestBase.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.test

uses java.util.List
uses java.util.ArrayList

/**
 * Base class for integration service tests. Provides
 * assertion helpers, test lifecycle hooks and mock setup
 * utilities for verifying service behaviour.
 */
abstract class ServiceTestBase {

  protected var _testName    : String       as TestName
  protected var _results     : List<TestResult> = new ArrayList<TestResult>()
  protected var _setupDone   : boolean = false

  construct(pTestName : String) {
    _testName = pTestName
  }

  public function runAll() : List<TestResult> {
    setUp()
    _setupDone = true
    try {
      executeTests()
    } finally {
      tearDown()
    }
    return _results
  }

  protected abstract function executeTests() : void

  protected function setUp() {
    // override in subclasses
  }

  protected function tearDown() {
    // override in subclasses
  }

  protected function assertEqual(pActual : Object, pExpected : Object, pMessage : String) {
    var passed = (pActual == pExpected) ||
                 (pActual != null && pActual.equals(pExpected))
    _results.add(new TestResult(pMessage, passed,
        passed ? null : "Expected [${pExpected}] but got [${pActual}]"))
  }

  protected function assertNotNull(pActual : Object, pMessage : String) {
    var passed = pActual != null
    _results.add(new TestResult(pMessage, passed,
        passed ? null : "Expected non-null value"))
  }

  protected function assertTrue(pCondition : boolean, pMessage : String) {
    _results.add(new TestResult(pMessage, pCondition,
        pCondition ? null : "Condition was false"))
  }

  protected function assertFalse(pCondition : boolean, pMessage : String) {
    _results.add(new TestResult(pMessage, !pCondition,
        !pCondition ? null : "Condition was true"))
  }

  public property get PassedCount() : int {
    return _results.where(\ r -> r.Passed).Count
  }

  public property get FailedCount() : int {
    return _results.where(\ r -> !r.Passed).Count
  }

  public static class TestResult {
    private var _description : String  as Description
    private var _passed      : boolean as Passed
    private var _errorMsg    : String  as ErrorMessage

    construct(pDescription : String, pPassed : boolean, pErrorMsg : String) {
      _description = pDescription
      _passed      = pPassed
      _errorMsg    = pErrorMsg
    }

    override public function toString() : String {
      return "${_passed ? "PASS" : "FAIL"}: ${_description}${_errorMsg != null ? " - " + _errorMsg : ""}"
    }
  }
}
