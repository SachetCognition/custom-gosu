//
//  ChargeDTO.gs
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

@WsiExportable("http://atsynthesize.com/gw/ws/atsynthesize/suite/billingcenter/entity/ChargeDTO")
final class ChargeDTO implements IWsiServiceEntity {

  private var _publicId      : String     as PublicID
  private var _chargeType    : String     as ChargeType
  private var _chargeGroup   : String     as ChargeGroup
  private var _amount        : BigDecimal as Amount
  private var _paidAmount    : BigDecimal as PaidAmount
  private var _writeOffAmount : BigDecimal as WriteOffAmount
  private var _chargeDate    : Date       as ChargeDate
  private var _description   : String     as Description
  private var _policyNumber  : String     as PolicyNumber

  override public property get ShortDescription() : String {
    return "[Charge:${_chargeType} Amount:${_amount}]"
  }

  override public property get LongDescription() : String {
    return "[Charge:${_chargeType} Group:${_chargeGroup} Amount:${_amount} Paid:${_paidAmount} Desc:${_description}]"
  }
}
