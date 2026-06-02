//
//  AccountBalanceDTO.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.billingcenter.entity

uses gw.xml.ws.annotation.WsiExportable
uses java.math.BigDecimal
uses java.util.Date

uses atsynthesize.suite.integration.service.IWsiServiceEntity

@WsiExportable("http://atsynthesize.com/gw/ws/atsynthesize/suite/billingcenter/entity/AccountBalanceDTO")
final class AccountBalanceDTO implements IWsiServiceEntity {

  private var _accountNumber     : String     as AccountNumber
  private var _accountName       : String     as AccountName
  private var _totalBilled       : BigDecimal as TotalBilled
  private var _totalPaid         : BigDecimal as TotalPaid
  private var _currentBalance    : BigDecimal as CurrentBalance
  private var _pastDueBalance    : BigDecimal as PastDueBalance
  private var _unbilledAmount    : BigDecimal as UnbilledAmount
  private var _collateralBalance : BigDecimal as CollateralBalance
  private var _currencyCode      : String     as CurrencyCode = "USD"
  private var _delinquencyStatus : String     as DelinquencyStatus
  private var _lastPaymentDate   : Date       as LastPaymentDate
  private var _lastPaymentAmount : BigDecimal as LastPaymentAmount
  private var _asOfDate          : Date       as AsOfDate

  override public property get ShortDescription() : String {
    return "[Account:${_accountNumber} Balance:${_currencyCode} ${_currentBalance}]"
  }

  override public property get LongDescription() : String {
    return "[Account:${_accountNumber}(${_accountName}) Billed:${_totalBilled} Paid:${_totalPaid} Balance:${_currentBalance} PastDue:${_pastDueBalance} Delinquency:${_delinquencyStatus}]"
  }
}
