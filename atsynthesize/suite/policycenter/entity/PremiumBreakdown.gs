//
//  PremiumBreakdown.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.policycenter.entity

uses gw.xml.ws.annotation.WsiExportable
uses java.math.BigDecimal

uses atsynthesize.suite.integration.service.IWsiServiceEntity

@WsiExportable("http://atsynthesize.com/gw/ws/atsynthesize/suite/policycenter/entity/PremiumBreakdown")
final class PremiumBreakdown implements IWsiServiceEntity {

  private var _coverageCode    : String     as CoverageCode
  private var _coverageName    : String     as CoverageName
  private var _lineName        : String     as LineName
  private var _basePremium     : BigDecimal as BasePremium
  private var _adjustments     : BigDecimal as Adjustments
  private var _discounts       : BigDecimal as Discounts
  private var _finalPremium    : BigDecimal as FinalPremium
  private var _ratePerUnit     : BigDecimal as RatePerUnit
  private var _units           : int        as Units = 1

  override public property get ShortDescription() : String {
    return "[${_coverageCode}: ${_finalPremium}]"
  }

  override public property get LongDescription() : String {
    return "[Coverage:${_coverageCode}(${_coverageName}) Line:${_lineName} Base:${_basePremium} Adj:${_adjustments} Disc:${_discounts} Final:${_finalPremium}]"
  }
}
