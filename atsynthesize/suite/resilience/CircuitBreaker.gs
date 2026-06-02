//
//  CircuitBreaker.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.resilience

uses java.lang.System
uses java.lang.Throwable
uses java.util.concurrent.atomic.AtomicInteger
uses java.util.concurrent.atomic.AtomicLong
uses java.util.concurrent.atomic.AtomicReference

uses gw.api.util.Logger
uses gw.util.ILogger

uses atsynthesize.suite.integration.service.exception.IntegrationException

/**
 * Circuit breaker pattern implementation to prevent cascading failures
 * when an external service is unavailable.
 *
 * States:
 *   CLOSED  - normal operation, failures are counted
 *   OPEN    - calls are short-circuited with an exception
 *   HALF_OPEN - a single probe call is allowed through
 *
 * Usage:
 *   var breaker = new CircuitBreaker("PaymentGateway", 5, 60000)
 *   var result = breaker.execute(\ -> callPaymentService())
 */
class CircuitBreaker {

  public enum State { CLOSED, OPEN, HALF_OPEN }

  private var _name              : String        as Name
  private var _failureThreshold  : int           as FailureThreshold  = 5
  private var _resetTimeoutMs    : long          as ResetTimeoutMs    = 60000
  private var _state             : AtomicReference<State> = new AtomicReference<State>(State.CLOSED)
  private var _failureCount      : AtomicInteger = new AtomicInteger(0)
  private var _lastFailureTime   : AtomicLong    = new AtomicLong(0)
  private var _successCount      : AtomicInteger = new AtomicInteger(0)
  private var _logger            : ILogger

  construct(pName : String) {
    _name   = pName
    _logger = Logger.forCategory("Integration.CircuitBreaker.${pName}")
  }

  construct(pName : String, pFailureThreshold : int, pResetTimeoutMs : long) {
    _name             = pName
    _failureThreshold = pFailureThreshold
    _resetTimeoutMs   = pResetTimeoutMs
    _logger = Logger.forCategory("Integration.CircuitBreaker.${pName}")
  }

  public function execute<T>(pOperation : block() : T) : T {
    var currentState = _state.get()
    if (currentState == State.OPEN) {
      if (System.currentTimeMillis() - _lastFailureTime.get() >= _resetTimeoutMs) {
        if (_state.compareAndSet(State.OPEN, State.HALF_OPEN)) {
          _logger.info("${_name}: Transitioning to HALF_OPEN")
        } else {
          throw new IntegrationException(
              "Circuit breaker OPEN for ${_name} - service unavailable",
              "CIRCUIT_OPEN", 503)
        }
      } else {
        throw new IntegrationException(
            "Circuit breaker OPEN for ${_name} - service unavailable",
            "CIRCUIT_OPEN", 503)
      }
    }

    try {
      var result = pOperation()
      onSuccess()
      return result
    } catch (t : Throwable) {
      onFailure()
      throw t
    }
  }

  private function onSuccess() {
    _failureCount.set(0)
    if (_state.compareAndSet(State.HALF_OPEN, State.CLOSED)) {
      _successCount.incrementAndGet()
      _logger.info("${_name}: Circuit CLOSED after successful probe")
    }
  }

  private function onFailure() {
    _lastFailureTime.set(System.currentTimeMillis())
    var failures = _failureCount.incrementAndGet()
    if (_state.get() == State.HALF_OPEN) {
      _state.compareAndSet(State.HALF_OPEN, State.OPEN)
      _logger.error("${_name}: Circuit OPEN after failed probe")
    } else if (failures >= _failureThreshold) {
      _state.compareAndSet(State.CLOSED, State.OPEN)
      _logger.error("${_name}: Circuit OPEN after ${failures} failures")
    }
  }

  public property get CurrentState() : State {
    return _state.get()
  }

  public property get FailureCount() : int {
    return _failureCount.get()
  }
}
