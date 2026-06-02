//
//  RatingRequest.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.policycenter.entity

uses gw.xml.ws.annotation.WsiExportable
uses java.util.Date
uses java.util.List
uses java.util.ArrayList

uses atsynthesize.suite.integration.service.IWsiServiceEntity

@WsiExportable("http://atsynthesize.com/gw/ws/atsynthesize/suite/policycenter/entity/RatingRequest")
final class RatingRequest implements IWsiServiceEntity {

  private var _policyNumber    : String          as PolicyNumber
  private var _productCode     : String          as ProductCode
  private var _effectiveDate   : Date            as EffectiveDate
  private var _ratingDate      : Date            as RatingDate
  private var _territory       : String          as Territory
  private var _classCode       : String          as ClassCode
  private var _riskUnits       : List<RiskUnitDTO> as RiskUnits = new ArrayList<RiskUnitDTO>()
  private var _priorLosses     : int             as PriorLosses = 0
  private var _yearsInBusiness : int             as YearsInBusiness = 0
  private var _experienceMod   : java.math.BigDecimal as ExperienceMod

  override public property get ShortDescription() : String {
    return "[RatingRequest: policy=${_policyNumber} product=${_productCode}]"
  }

  override public property get LongDescription() : String {
    return "[RatingRequest: policy=${_policyNumber} product=${_productCode} territory=${_territory} class=${_classCode} risks=${_riskUnits.Count}]"
  }
}
