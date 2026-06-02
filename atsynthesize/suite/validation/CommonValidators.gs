//
//  CommonValidators.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.validation

uses java.util.regex.Pattern
uses java.math.BigDecimal

/**
 * Factory for common reusable validation rules: required fields,
 * pattern matching, numeric ranges, date comparisons, etc.
 */
class CommonValidators {

  /**
   * Validates that a string field matches a regex pattern.
   */
  public static function <T> pattern(pFieldName : String,
                                      pExtractor : block(T) : String,
                                      pPattern : String) : ValidationRule<T> {
    return new ValidationRule<T>(
        pFieldName,
        \ entity -> {
          var val = pExtractor(entity)
          return val != null && Pattern.matches(pPattern, val)
        },
        "${pFieldName} does not match required pattern",
        "PATTERN_MISMATCH")
  }

  /**
   * Validates string length within bounds.
   */
  public static function <T> length(pFieldName : String,
                                     pExtractor : block(T) : String,
                                     pMin : int, pMax : int) : ValidationRule<T> {
    return new ValidationRule<T>(
        pFieldName,
        \ entity -> {
          var val = pExtractor(entity)
          return val != null && val.length >= pMin && val.length <= pMax
        },
        "${pFieldName} must be between ${pMin} and ${pMax} characters",
        "LENGTH_OUT_OF_RANGE")
  }

  /**
   * Validates a numeric value falls within a range.
   */
  public static function <T> range(pFieldName : String,
                                    pExtractor : block(T) : BigDecimal,
                                    pMin : BigDecimal,
                                    pMax : BigDecimal) : ValidationRule<T> {
    return new ValidationRule<T>(
        pFieldName,
        \ entity -> {
          var val = pExtractor(entity)
          return val != null &&
                 val.compareTo(pMin) >= 0 &&
                 val.compareTo(pMax) <= 0
        },
        "${pFieldName} must be between ${pMin} and ${pMax}",
        "OUT_OF_RANGE")
  }

  /**
   * Validates email format.
   */
  public static function <T> email(pFieldName : String,
                                    pExtractor : block(T) : String) : ValidationRule<T> {
    return pattern(pFieldName, pExtractor,
        "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$")
  }

  /**
   * Validates US phone number format.
   */
  public static function <T> phoneUS(pFieldName : String,
                                      pExtractor : block(T) : String) : ValidationRule<T> {
    return pattern(pFieldName, pExtractor,
        "^\\+?1?[-.\\s]?\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$")
  }

  /**
   * Validates US ZIP code format (5 or 9 digit).
   */
  public static function <T> zipCodeUS(pFieldName : String,
                                        pExtractor : block(T) : String) : ValidationRule<T> {
    return pattern(pFieldName, pExtractor,
        "^\\d{5}(-\\d{4})?$")
  }
}
