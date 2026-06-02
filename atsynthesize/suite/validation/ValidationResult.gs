//
//  ValidationResult.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.validation

uses java.util.List
uses java.util.ArrayList

/**
 * Aggregated validation result carrying zero or more field-level
 * errors. When {@code isValid()} returns false, the caller should
 * inspect the error list before proceeding.
 */
class ValidationResult {

  private var _errors : List<FieldError> as Errors = new ArrayList<FieldError>()

  construct() {}

  public function addError(pFieldName : String, pMessage : String) {
    _errors.add(new FieldError(pFieldName, pMessage, "INVALID"))
  }

  public function addError(pFieldName : String, pMessage : String, pCode : String) {
    _errors.add(new FieldError(pFieldName, pMessage, pCode))
  }

  public function merge(pOther : ValidationResult) {
    if (pOther != null) {
      _errors.addAll(pOther.Errors)
    }
  }

  public property get IsValid() : boolean {
    return _errors.isEmpty()
  }

  public property get ErrorCount() : int {
    return _errors.Count
  }

  override public function toString() : String {
    if (IsValid) return "Valid"
    return "Invalid: ${_errors.map(\ e -> e.toString()).join("; ")}"
  }

  public static class FieldError {
    private var _fieldName : String as FieldName
    private var _message   : String as ErrorMessage
    private var _code      : String as ErrorCode

    construct(pFieldName : String, pMessage : String, pCode : String) {
      _fieldName = pFieldName
      _message   = pMessage
      _code      = pCode
    }

    override public function toString() : String {
      return "[${_fieldName}: ${_message} (${_code})]"
    }
  }
}
