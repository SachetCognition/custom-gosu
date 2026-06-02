//
//  CoverageDTO.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.policycenter.entity

uses gw.xml.ws.annotation.WsiExportable
uses java.math.BigDecimal
uses java.util.Date
uses java.util.List
uses java.util.ArrayList

uses atsynthesize.suite.integration.service.IWsiServiceEntity

@WsiExportable("http://atsynthesize.com/gw/ws/atsynthesize/suite/policycenter/entity/CoverageDTO")
final class CoverageDTO implements IWsiServiceEntity {

  private var _publicId        : String     as PublicID
  private var _coverageCode    : String     as CoverageCode
  private var _coverageName    : String     as CoverageName
  private var _patternCode     : String     as PatternCode
  private var _effectiveDate   : Date       as EffectiveDate
  private var _expirationDate  : Date       as ExpirationDate
  private var _deductible      : BigDecimal as Deductible
  private var _limit           : BigDecimal as CoverageLimit
  private var _premium         : BigDecimal as Premium
  private var _isRequired      : boolean    as IsRequired = false
  private var _covTerms        : List<String> as CovTerms = new ArrayList<String>()

  override public property get ShortDescription() : String {
    return "[Coverage:${_coverageCode} Limit:${_limit} Deductible:${_deductible}]"
  }

  override public property get LongDescription() : String {
    return "[Coverage:${_coverageCode}(${_coverageName}) Pattern:${_patternCode} Limit:${_limit} Deductible:${_deductible} Premium:${_premium} Required:${_isRequired}]"
  }
}
