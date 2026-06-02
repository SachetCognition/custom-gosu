//
//  ReserveDTO.gs
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

@WsiExportable("http://atsynthesize.com/gw/ws/atsynthesize/suite/claimcenter/entity/ReserveDTO")
final class ReserveDTO implements IWsiServiceEntity {

  private var _publicId        : String     as PublicID
  private var _claimNumber     : String     as ClaimNumber
  private var _exposureId      : String     as ExposureId
  private var _costType        : String     as CostType
  private var _costCategory    : String     as CostCategory
  private var _reserveAmount   : BigDecimal as ReserveAmount
  private var _availableAmount : BigDecimal as AvailableAmount
  private var _pendingAmount   : BigDecimal as PendingAmount
  private var _currencyCode    : String     as CurrencyCode = "USD"
  private var _status          : String     as Status
  private var _createdDate     : Date       as CreatedDate
  private var _modifiedDate    : Date       as ModifiedDate
  private var _approvedBy      : String     as ApprovedBy

  override public property get ShortDescription() : String {
    return "[Reserve: claim=${_claimNumber} type=${_costType} amount=${_reserveAmount}]"
  }

  override public property get LongDescription() : String {
    return "[Reserve: claim=${_claimNumber} exposure=${_exposureId} type=${_costType} cat=${_costCategory} amount=${_reserveAmount} avail=${_availableAmount} pending=${_pendingAmount}]"
  }
}
