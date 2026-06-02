//
//  ExposureDTO.gs
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

@WsiExportable("http://atsynthesize.com/gw/ws/atsynthesize/suite/claimcenter/entity/ExposureDTO")
final class ExposureDTO implements IWsiServiceEntity {

  private var _publicId        : String     as PublicID
  private var _exposureType    : String     as ExposureType
  private var _coverageType    : String     as CoverageType
  private var _status          : String     as Status
  private var _claimantName    : String     as ClaimantName
  private var _lossParty       : String     as LossParty
  private var _reserveAmount   : BigDecimal as ReserveAmount
  private var _paidAmount      : BigDecimal as PaidAmount
  private var _incurredAmount  : BigDecimal as IncurredAmount
  private var _createdDate     : Date       as CreatedDate
  private var _closedDate      : Date       as ClosedDate
  private var _assignedAdjuster : String    as AssignedAdjuster
  private var _severity        : String     as Severity

  override public property get ShortDescription() : String {
    return "[Exposure:${_exposureType} Status:${_status} Claimant:${_claimantName}]"
  }

  override public property get LongDescription() : String {
    return "[Exposure:${_exposureType} Coverage:${_coverageType} Status:${_status} Claimant:${_claimantName} LossParty:${_lossParty} Reserved:${_reserveAmount} Paid:${_paidAmount}]"
  }
}
