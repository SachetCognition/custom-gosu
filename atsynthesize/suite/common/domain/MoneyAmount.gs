//
//  MoneyAmount.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.common.domain

uses java.math.BigDecimal
uses java.math.RoundingMode
uses java.util.Currency

/**
 * Currency-aware monetary amount used across all InsuranceSuite
 * integration modules. Prevents floating-point rounding issues
 * by using BigDecimal internally.
 */
class MoneyAmount {

  private var _amount       : BigDecimal as Amount
  private var _currencyCode : String     as CurrencyCode = "USD"

  construct() {
    _amount = BigDecimal.ZERO
  }

  construct(pAmount : BigDecimal, pCurrencyCode : String) {
    _amount       = pAmount.setScale(2, RoundingMode.HALF_UP)
    _currencyCode = pCurrencyCode
  }

  construct(pAmount : double) {
    _amount = new BigDecimal(pAmount).setScale(2, RoundingMode.HALF_UP)
  }

  public function add(pOther : MoneyAmount) : MoneyAmount {
    validateSameCurrency(pOther)
    return new MoneyAmount(_amount.add(pOther.Amount), _currencyCode)
  }

  public function subtract(pOther : MoneyAmount) : MoneyAmount {
    validateSameCurrency(pOther)
    return new MoneyAmount(_amount.subtract(pOther.Amount), _currencyCode)
  }

  public function multiply(pFactor : BigDecimal) : MoneyAmount {
    return new MoneyAmount(_amount.multiply(pFactor), _currencyCode)
  }

  public function negate() : MoneyAmount {
    return new MoneyAmount(_amount.negate(), _currencyCode)
  }

  public property get IsZero() : boolean {
    return _amount.compareTo(BigDecimal.ZERO) == 0
  }

  public property get IsPositive() : boolean {
    return _amount.compareTo(BigDecimal.ZERO) > 0
  }

  public property get IsNegative() : boolean {
    return _amount.compareTo(BigDecimal.ZERO) < 0
  }

  private function validateSameCurrency(pOther : MoneyAmount) {
    if (_currencyCode != pOther.CurrencyCode) {
      throw new IllegalArgumentException(
          "Cannot operate on different currencies: ${_currencyCode} vs ${pOther.CurrencyCode}")
    }
  }

  override public function toString() : String {
    return "${_currencyCode} ${_amount.toPlainString()}"
  }
}
