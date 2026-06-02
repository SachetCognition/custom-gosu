//
//  ValidationRule.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.validation

/**
 * Single validation rule definition. Rules are composable
 * and carry a field name, predicate and error message.
 *
 * @param <T> the type of entity being validated
 */
class ValidationRule<T> {

  private var _fieldName    : String            as FieldName
  private var _predicate    : block(T) : boolean
  private var _errorMessage : String            as ErrorMessage
  private var _errorCode    : String            as ErrorCode = "INVALID"

  construct(pFieldName : String,
            pPredicate : block(T) : boolean,
            pErrorMessage : String) {
    _fieldName    = pFieldName
    _predicate    = pPredicate
    _errorMessage = pErrorMessage
  }

  construct(pFieldName : String,
            pPredicate : block(T) : boolean,
            pErrorMessage : String,
            pErrorCode : String) {
    _fieldName    = pFieldName
    _predicate    = pPredicate
    _errorMessage = pErrorMessage
    _errorCode    = pErrorCode
  }

  public function evaluate(pEntity : T) : ValidationResult {
    var result = new ValidationResult()
    if (!_predicate(pEntity)) {
      result.addError(_fieldName, _errorMessage, _errorCode)
    }
    return result
  }
}
