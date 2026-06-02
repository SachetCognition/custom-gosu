//
//  TimeoutException.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.integration.service.exception

/**
 * Thrown when an integration call exceeds its configured
 * connection or read timeout.  Extends RetryableException
 * because timeouts are often transient.
 */
class TimeoutException extends RetryableException {

  private var _timeoutMs : long as TimeoutMs

  construct(pMessage : String, pTimeoutMs : long) {
    super(pMessage)
    _timeoutMs      = pTimeoutMs
    this.ErrorCode  = "TIMEOUT"
    this.HttpStatus = 504
  }
}
