//
//  RetryableException.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.integration.service.exception

/**
 * Marks a transient failure that is eligible for automatic retry.
 * The retry framework inspects thrown exceptions and re-attempts
 * the operation when this type (or a subclass) is caught.
 */
class RetryableException extends IntegrationException {

  private var _retryAfterMs : long as RetryAfterMs = 0

  construct(pMessage : String) {
    super(pMessage, "RETRYABLE_ERROR", 503)
  }

  construct(pMessage : String, pRetryAfterMs : long) {
    super(pMessage, "RETRYABLE_ERROR", 503)
    _retryAfterMs = pRetryAfterMs
  }

  construct(pMessage : String, pCause : java.lang.Throwable) {
    super(pMessage, pCause)
    this.ErrorCode  = "RETRYABLE_ERROR"
    this.HttpStatus = 503
  }
}
