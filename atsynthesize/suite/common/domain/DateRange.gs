//
//  DateRange.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.common.domain

uses java.util.Date

/**
 * Effective/expiry date range used for policy periods,
 * coverage terms, billing cycles and other temporal entities.
 */
class DateRange {

  private var _effectiveDate : Date as EffectiveDate
  private var _expirationDate : Date as ExpirationDate

  construct() {}

  construct(pEffectiveDate : Date, pExpirationDate : Date) {
    if (pEffectiveDate != null && pExpirationDate != null &&
        pEffectiveDate.after(pExpirationDate)) {
      throw new IllegalArgumentException(
          "Effective date cannot be after expiration date")
    }
    _effectiveDate  = pEffectiveDate
    _expirationDate = pExpirationDate
  }

  public function contains(pDate : Date) : boolean {
    if (pDate == null) return false
    var afterStart = _effectiveDate == null || !pDate.before(_effectiveDate)
    var beforeEnd  = _expirationDate == null || !pDate.after(_expirationDate)
    return afterStart && beforeEnd
  }

  public function overlaps(pOther : DateRange) : boolean {
    if (pOther == null) return false
    return contains(pOther.EffectiveDate) || contains(pOther.ExpirationDate) ||
           pOther.contains(_effectiveDate) || pOther.contains(_expirationDate)
  }

  public property get IsActive() : boolean {
    return contains(new Date())
  }

  public property get DurationDays() : long {
    if (_effectiveDate == null || _expirationDate == null) return -1
    var diffMs = _expirationDate.Time - _effectiveDate.Time
    return diffMs / (1000 * 60 * 60 * 24)
  }

  override public function toString() : String {
    return "[${_effectiveDate} - ${_expirationDate}]"
  }
}
