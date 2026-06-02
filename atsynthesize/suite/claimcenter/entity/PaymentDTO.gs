//
//  PaymentDTO.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.claimcenter.entity

uses gw.xml.ws.annotation.WsiExportable
uses java.math.BigDecimal
uses java.util.Date

uses atsynthesize.suite.integration.service.IWsiServiceEntity

@WsiExportable("http://atsynthesize.com/gw/ws/atsynthesize/suite/claimcenter/entity/PaymentDTO")
final class PaymentDTO implements IWsiServiceEntity {

  private var _publicId        : String     as PublicID
  private var _claimNumber     : String     as ClaimNumber
  private var _exposureId      : String     as ExposureId
  private var _paymentType     : String     as PaymentType
  private var _costType        : String     as CostType
  private var _costCategory    : String     as CostCategory
  private var _amount          : BigDecimal as Amount
  private var _currencyCode    : String     as CurrencyCode = "USD"
  private var _status          : String     as Status
  private var _payeeName       : String     as PayeeName
  private var _payeeType       : String     as PayeeType
  private var _checkNumber     : String     as CheckNumber
  private var _scheduledDate   : Date       as ScheduledDate
  private var _paidDate        : Date       as PaidDate
  private var _approvedBy      : String     as ApprovedBy
  private var _approvalStatus  : String     as ApprovalStatus
  private var _reportability   : String     as Reportability

  override public property get ShortDescription() : String {
    return "[Payment: claim=${_claimNumber} amount=${_currencyCode} ${_amount} payee=${_payeeName}]"
  }

  override public property get LongDescription() : String {
    return "[Payment: claim=${_claimNumber} exposure=${_exposureId} type=${_paymentType} cost=${_costType}/${_costCategory} amount=${_currencyCode} ${_amount} payee=${_payeeName}(${_payeeType}) check=${_checkNumber} status=${_status}]"
  }
}
