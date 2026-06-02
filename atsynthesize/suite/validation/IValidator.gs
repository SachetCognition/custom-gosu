//
//  IValidator.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.validation

/**
 * Generic validator interface. Implementations validate
 * a specific entity type and return aggregated results.
 *
 * @param <T> the type of entity to validate
 */
interface IValidator<T> {

  function validate(pEntity : T) : ValidationResult
}
