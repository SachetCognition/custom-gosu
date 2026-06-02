//
//  MockServiceExecutor.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.test

uses java.util.List
uses java.util.ArrayList

/**
 * Mock service executor for unit testing integration services.
 * Records invocations and returns pre-configured responses,
 * enabling deterministic tests without external dependencies.
 *
 * @param <K> input type
 * @param <V> output type
 */
class MockServiceExecutor<K, V> {

  private var _responses    : List<V>  = new ArrayList<V>()
  private var _invocations  : List<K>  = new ArrayList<K>()
  private var _responseIdx  : int      = 0
  private var _throwOnNext  : java.lang.Throwable = null

  construct() {}

  public function addResponse(pResponse : V) : MockServiceExecutor<K, V> {
    _responses.add(pResponse)
    return this
  }

  public function throwOnNextCall(pException : java.lang.Throwable) : MockServiceExecutor<K, V> {
    _throwOnNext = pException
    return this
  }

  public function execute(pInput : K) : V {
    _invocations.add(pInput)

    if (_throwOnNext != null) {
      var ex = _throwOnNext
      _throwOnNext = null
      throw ex
    }

    if (_responses.isEmpty()) {
      return null
    }

    var response = _responses.get(_responseIdx % _responses.Count)
    _responseIdx++
    return response
  }

  public property get InvocationCount() : int {
    return _invocations.Count
  }

  public property get LastInput() : K {
    return _invocations.isEmpty() ? null : _invocations.get(_invocations.Count - 1)
  }

  public property get AllInputs() : List<K> {
    return _invocations
  }

  public function wasInvoked() : boolean {
    return !_invocations.isEmpty()
  }

  public function reset() {
    _invocations.clear()
    _responseIdx = 0
    _throwOnNext = null
  }
}
