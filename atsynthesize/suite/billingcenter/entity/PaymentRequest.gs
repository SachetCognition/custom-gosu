//
//  PaymentRequest.gs
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

@WsiExportable("http://atsynthesize.com/gw/ws/atsynthesize/suite/billingcenter/entity/PaymentRequest")
final class PaymentRequest implements IWsiServiceEntity {

  private var _accountNumber    : String     as AccountNumber
  private var _policyNumber     : String     as PolicyNumber
  private var _invoiceNumber    : String     as InvoiceNumber
  private var _amount           : BigDecimal as Amount
  private var _currencyCode     : String     as CurrencyCode = "USD"
  private var _paymentMethod    : String     as PaymentMethod
  private var _paymentDate      : Date       as PaymentDate
  private var _referenceNumber  : String     as ReferenceNumber
  private var _payerName        : String     as PayerName
  private var _bankAccountLast4 : String     as BankAccountLast4
  private var _cardLast4        : String     as CardLast4

  override public property get ShortDescription() : String {
    return "[PaymentRequest: account=${_accountNumber} amount=${_currencyCode} ${_amount}]"
  }

  override public property get LongDescription() : String {
    return "[PaymentRequest: account=${_accountNumber} policy=${_policyNumber} invoice=${_invoiceNumber} amount=${_currencyCode} ${_amount} method=${_paymentMethod} payer=${_payerName}]"
  }
}
