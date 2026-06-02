//
//  RateLimitException.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.integration.service.exception

/**
 * Thrown when an external service returns HTTP 429 or a
 * rate-limiting indicator. Carries the retry-after hint
 * so the retry framework can honour the back-off window.
 */
class RateLimitException extends RetryableException {

  private var _limitRemaining : int  as LimitRemaining = 0
  private var _limitResetMs   : long as LimitResetMs   = 0

  construct(pMessage : String) {
    super(pMessage)
    this.ErrorCode  = "RATE_LIMIT_EXCEEDED"
    this.HttpStatus = 429
  }

  construct(pMessage : String, pRetryAfterMs : long) {
    super(pMessage, pRetryAfterMs)
    this.ErrorCode  = "RATE_LIMIT_EXCEEDED"
    this.HttpStatus = 429
  }
}
