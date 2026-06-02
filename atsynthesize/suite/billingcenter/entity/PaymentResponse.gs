//
//  PaymentResponse.gs
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

@WsiExportable("http://atsynthesize.com/gw/ws/atsynthesize/suite/billingcenter/entity/PaymentResponse")
final class PaymentResponse implements IWsiServiceEntity {

  private var _transactionId    : String     as TransactionId
  private var _status           : String     as Status
  private var _amount           : BigDecimal as Amount
  private var _appliedDate      : Date       as AppliedDate
  private var _confirmationCode : String     as ConfirmationCode
  private var _remainingBalance : BigDecimal as RemainingBalance
  private var _message          : String     as Message

  override public property get ShortDescription() : String {
    return "[PaymentResponse: txn=${_transactionId} status=${_status}]"
  }

  override public property get LongDescription() : String {
    return "[PaymentResponse: txn=${_transactionId} status=${_status} amount=${_amount} remaining=${_remainingBalance} confirmation=${_confirmationCode}]"
  }
}
