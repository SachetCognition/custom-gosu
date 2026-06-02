//
//  ValidatorChain.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.validation

uses java.util.List
uses java.util.ArrayList

/**
 * Composable validator chain that runs multiple
 * {@link ValidationRule} instances in sequence and
 * merges their results.
 *
 * @param <T> the type of entity being validated
 */
class ValidatorChain<T> implements IValidator<T> {

  private var _rules : List<ValidationRule<T>> = new ArrayList<ValidationRule<T>>()
  private var _failFast : boolean as FailFast = false

  construct() {}

  public function addRule(pRule : ValidationRule<T>) : ValidatorChain<T> {
    _rules.add(pRule)
    return this
  }

  public function addRequired(pFieldName : String,
                               pExtractor : block(T) : Object) : ValidatorChain<T> {
    _rules.add(new ValidationRule<T>(
        pFieldName,
        \ entity -> {
          var val = pExtractor(entity)
          return val != null && (!(val typeis String) || (val as String).HasContent)
        },
        "${pFieldName} is required",
        "REQUIRED"))
    return this
  }

  override function validate(pEntity : T) : ValidationResult {
    var result = new ValidationResult()
    for (rule in _rules) {
      var ruleResult = rule.evaluate(pEntity)
      result.merge(ruleResult)
      if (_failFast && !result.IsValid) {
        break
      }
    }
    return result
  }
}
