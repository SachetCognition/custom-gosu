//
//  IntegrationException.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.integration.service.exception

uses gw.api.webservice.exception.SOAPException

/**
 * Base exception for all integration-layer failures.
 * Provides a consistent error code + detail model that both
 * SOAP and REST service handlers can translate into their
 * respective fault formats.
 */
class IntegrationException extends SOAPException {

  private var _errorCode    : String as ErrorCode
  private var _errorDetails : String as ErrorDetails
  private var _httpStatus   : int    as HttpStatus = 500

  construct(pMessage : String) {
    super(pMessage)
    _errorCode = "INTEGRATION_ERROR"
  }

  construct(pMessage : String, pErrorCode : String) {
    super(pMessage)
    _errorCode = pErrorCode
  }

  construct(pMessage : String, pErrorCode : String, pHttpStatus : int) {
    super(pMessage)
    _errorCode    = pErrorCode
    _httpStatus   = pHttpStatus
  }

  construct(pMessage : String, pCause : java.lang.Throwable) {
    super(pMessage)
    _errorCode = "INTEGRATION_ERROR"
    initCause(pCause)
  }

  override public property get Message() : String {
    var base = super.Message
    if (_errorDetails != null) {
      return "${base} [${_errorCode}] - ${_errorDetails}"
    }
    return "${base} [${_errorCode}]"
  }
}
