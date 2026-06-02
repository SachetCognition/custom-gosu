//
//  ClaimSummary.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.claimcenter.entity

uses gw.xml.ws.annotation.WsiExportable
uses java.math.BigDecimal
uses java.util.Date
uses java.util.List
uses java.util.ArrayList

uses atsynthesize.suite.integration.service.IWsiServiceEntity

@WsiExportable("http://atsynthesize.com/gw/ws/atsynthesize/suite/claimcenter/entity/ClaimSummary")
final class ClaimSummary implements IWsiServiceEntity {

  private var _claimNumber        : String       as ClaimNumber
  private var _publicId           : String       as PublicID
  private var _policyNumber       : String       as PolicyNumber
  private var _status             : String       as Status
  private var _lossDate           : Date         as LossDate
  private var _reportedDate       : Date         as ReportedDate
  private var _closedDate         : Date         as ClosedDate
  private var _lossCause          : String       as LossCause
  private var _lossType           : String       as LossType
  private var _lossLocationCity   : String       as LossLocationCity
  private var _lossLocationState  : String       as LossLocationState
  private var _claimantName       : String       as ClaimantName
  private var _insuredName        : String       as InsuredName
  private var _adjusterName       : String       as AdjusterName
  private var _adjusterCode       : String       as AdjusterCode
  private var _totalIncurred      : BigDecimal   as TotalIncurred
  private var _totalPaid          : BigDecimal   as TotalPaid
  private var _totalReserves      : BigDecimal   as TotalReserves
  private var _totalRecoveries    : BigDecimal   as TotalRecoveries
  private var _currencyCode       : String       as CurrencyCode = "USD"
  private var _exposures          : List<ExposureDTO> as Exposures = new ArrayList<ExposureDTO>()
  private var _severity           : String       as Severity
  private var _litigationStatus   : String       as LitigationStatus
  private var _catastropheNumber  : String       as CatastropheNumber
  private var _createdDate        : Date         as CreatedDate
  private var _modifiedDate       : Date         as ModifiedDate

  override public property get ShortDescription() : String {
    return "[Claim:${_claimNumber} Status:${_status} Policy:${_policyNumber}]"
  }

  override public property get LongDescription() : String {
    return "[Claim:${_claimNumber} Status:${_status} Policy:${_policyNumber} LossDate:${_lossDate} Cause:${_lossCause} Incurred:${_currencyCode} ${_totalIncurred} Paid:${_totalPaid} Reserves:${_totalReserves} Adjuster:${_adjusterName}]"
  }
}
