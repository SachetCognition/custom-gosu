//
//  RetryPolicy.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.resilience

uses java.lang.Thread
uses java.lang.Math
uses gw.api.util.Logger
uses gw.util.ILogger

uses atsynthesize.suite.integration.service.exception.RetryableException

/**
 * Configurable retry policy with exponential back-off and jitter.
 * Wraps any operation and re-attempts it when a {@link RetryableException}
 * is thrown, up to the configured maximum number of attempts.
 *
 * Usage:
 *   var policy = new RetryPolicy("MyService", 3, 1000, 2.0)
 *   var result = policy.execute(\ -> callExternalService())
 */
class RetryPolicy {

  private var _name            : String  as Name
  private var _maxAttempts     : int     as MaxAttempts     = 3
  private var _initialDelayMs  : long    as InitialDelayMs  = 1000
  private var _backoffMultiplier : double as BackoffMultiplier = 2.0
  private var _maxDelayMs      : long    as MaxDelayMs      = 30000
  private var _logger          : ILogger

  construct(pName : String) {
    _name   = pName
    _logger = Logger.forCategory("Integration.Retry.${pName}")
  }

  construct(pName : String, pMaxAttempts : int,
            pInitialDelayMs : long, pBackoffMultiplier : double) {
    _name              = pName
    _maxAttempts       = pMaxAttempts
    _initialDelayMs    = pInitialDelayMs
    _backoffMultiplier = pBackoffMultiplier
    _logger = Logger.forCategory("Integration.Retry.${pName}")
  }

  /**
   * Executes the given block with retry logic.
   *
   * @param pOperation the operation to execute
   * @return the result of the operation
   * @throws the last exception if all retries are exhausted
   */
  public function execute<T>(pOperation : block() : T) : T {
    var lastException : java.lang.Throwable = null
    var currentDelay = _initialDelayMs

    for (var attempt in 1.._maxAttempts) {
      try {
        var result = pOperation()
        if (attempt > 1) {
          _logger.info("${_name}: Succeeded on attempt ${attempt}")
        }
        return result
      } catch (re : RetryableException) {
        lastException = re
        if (attempt < _maxAttempts) {
          var delayMs = re.RetryAfterMs > 0
              ? re.RetryAfterMs
              : Math.min(currentDelay, _maxDelayMs)
          _logger.warn("${_name}: Attempt ${attempt}/${_maxAttempts} failed, retrying in ${delayMs}ms - ${re.Message}")
          Thread.sleep(delayMs)
          currentDelay = (currentDelay * _backoffMultiplier) as long
        } else {
          _logger.error("${_name}: All ${_maxAttempts} attempts exhausted - ${re.Message}")
        }
      }
    }
    throw lastException
  }
}
