//
//  CodeValue.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.common.domain

/**
 * Wrapper for Guidewire typelist / code-table values.
 * Carries both the internal code and the display name
 * for serialization across integration boundaries.
 */
class CodeValue {

  private var _code        : String as Code
  private var _displayName : String as DisplayName
  private var _typelist    : String as Typelist
  private var _sortOrder   : int    as SortOrder = 0

  construct() {}

  construct(pCode : String, pDisplayName : String) {
    _code        = pCode
    _displayName = pDisplayName
  }

  construct(pCode : String, pDisplayName : String, pTypelist : String) {
    _code        = pCode
    _displayName = pDisplayName
    _typelist    = pTypelist
  }

  override public function toString() : String {
    return "${_typelist ?: ""}:${_code}(${_displayName})"
  }

  override public function equals(pOther : Object) : boolean {
    if (pOther typeis CodeValue) {
      return _code == pOther.Code && _typelist == pOther.Typelist
    }
    return false
  }

  override public function hashCode() : int {
    return (_code ?: "").hashCode() * 31 + (_typelist ?: "").hashCode()
  }
}
