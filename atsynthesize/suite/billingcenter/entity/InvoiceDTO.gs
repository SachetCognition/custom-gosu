//
//  InvoiceDTO.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.billingcenter.entity

uses gw.xml.ws.annotation.WsiExportable
uses java.math.BigDecimal
uses java.util.Date
uses java.util.List
uses java.util.ArrayList

uses atsynthesize.suite.integration.service.IWsiServiceEntity

@WsiExportable("http://atsynthesize.com/gw/ws/atsynthesize/suite/billingcenter/entity/InvoiceDTO")
final class InvoiceDTO implements IWsiServiceEntity {

  private var _invoiceNumber    : String          as InvoiceNumber
  private var _publicId         : String          as PublicID
  private var _accountNumber    : String          as AccountNumber
  private var _policyNumber     : String          as PolicyNumber
  private var _invoiceDate      : Date            as InvoiceDate
  private var _dueDate          : Date            as DueDate
  private var _paidDate         : Date            as PaidDate
  private var _status           : String          as Status
  private var _totalAmount      : BigDecimal      as TotalAmount
  private var _paidAmount       : BigDecimal      as PaidAmount
  private var _balanceDue       : BigDecimal      as BalanceDue
  private var _currencyCode     : String          as CurrencyCode = "USD"
  private var _invoiceType      : String          as InvoiceType
  private var _charges          : List<ChargeDTO> as Charges = new ArrayList<ChargeDTO>()
  private var _installmentNumber : int            as InstallmentNumber = 1
  private var _totalInstallments : int            as TotalInstallments = 1

  override public property get ShortDescription() : String {
    return "[Invoice:${_invoiceNumber} Amount:${_currencyCode} ${_totalAmount} Due:${_dueDate}]"
  }

  override public property get LongDescription() : String {
    return "[Invoice:${_invoiceNumber} Account:${_accountNumber} Policy:${_policyNumber} Amount:${_totalAmount} Paid:${_paidAmount} Balance:${_balanceDue} Due:${_dueDate} Status:${_status}]"
  }
}
