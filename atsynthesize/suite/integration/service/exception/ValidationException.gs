//
//  ValidationException.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.integration.service.exception

uses java.util.ArrayList
uses java.util.List

/**
 * Rich field-level validation exception with error codes.
 * Carries a list of FieldError descriptors that REST/SOAP
 * handlers translate into structured error responses.
 */
class ValidationException extends IntegrationException {

  private var _fieldErrors : List<FieldError> = new ArrayList<FieldError>()

  construct(pMessage : String) {
    super(pMessage, "VALIDATION_ERROR", 400)
  }

  public function addFieldError(pFieldName : String,
                                 pRejectedValue : String,
                                 pMessage : String) {
    _fieldErrors.add(new FieldError(pFieldName, pRejectedValue, pMessage))
  }

  public property get FieldErrors() : List<FieldError> {
    return _fieldErrors
  }

  public property get HasFieldErrors() : boolean {
    return _fieldErrors.Count > 0
  }

  override public property get Message() : String {
    var base = super.Message
    if (_fieldErrors.Count > 0) {
      var details = _fieldErrors.map(\ fe -> fe.toString()).join("; ")
      return "${base}: ${details}"
    }
    return base
  }

  /**
   * Individual field-level error descriptor.
   */
  public static class FieldError {
    private var _fieldName     : String as FieldName
    private var _rejectedValue : String as RejectedValue
    private var _message       : String as ErrorMessage

    construct(pFieldName : String, pRejectedValue : String, pMessage : String) {
      _fieldName     = pFieldName
      _rejectedValue = pRejectedValue
      _message       = pMessage
    }

    override public function toString() : String {
      return "[${_fieldName}:'${_rejectedValue}' - ${_message}]"
    }
  }
}
