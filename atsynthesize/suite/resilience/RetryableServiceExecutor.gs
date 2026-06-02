//
//  RetryableServiceExecutor.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.resilience

uses gw.api.util.Logger
uses gw.util.ILogger

/**
 * Combines {@link RetryPolicy} and {@link CircuitBreaker} to
 * wrap any service executor with resilience logic.
 *
 * Usage:
 *   var resilient = new RetryableServiceExecutor("ExtSvc",
 *       new RetryPolicy("ExtSvc", 3, 500, 2.0),
 *       new CircuitBreaker("ExtSvc", 5, 30000))
 *   var result = resilient.execute(\ -> myService.call(input))
 */
class RetryableServiceExecutor {

  private var _name           : String         as Name
  private var _retryPolicy    : RetryPolicy    as ServiceRetryPolicy
  private var _circuitBreaker : CircuitBreaker as ServiceCircuitBreaker
  private var _logger         : ILogger

  construct(pName : String,
            pRetryPolicy : RetryPolicy,
            pCircuitBreaker : CircuitBreaker) {
    _name           = pName
    _retryPolicy    = pRetryPolicy
    _circuitBreaker = pCircuitBreaker
    _logger = Logger.forCategory("Integration.Resilient.${pName}")
  }

  public function execute<T>(pOperation : block() : T) : T {
    return _circuitBreaker.execute(\ -> {
      return _retryPolicy.execute(\ -> {
        return pOperation()
      })
    })
  }
}
