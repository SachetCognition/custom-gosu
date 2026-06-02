//
//  QuoteRequest.gs
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

@WsiExportable("http://atsynthesize.com/gw/ws/atsynthesize/suite/policycenter/entity/QuoteRequest")
final class QuoteRequest implements IWsiServiceEntity {

  private var _productCode      : String           as ProductCode
  private var _effectiveDate    : Date             as EffectiveDate
  private var _accountNumber    : String           as AccountNumber
  private var _primaryInsuredId : String           as PrimaryInsuredId
  private var _insuredFirstName : String           as InsuredFirstName
  private var _insuredLastName  : String           as InsuredLastName
  private var _insuredDOB       : Date             as InsuredDOB
  private var _addressLine1     : String           as AddressLine1
  private var _addressLine2     : String           as AddressLine2
  private var _city             : String           as City
  private var _state            : String           as State
  private var _postalCode       : String           as PostalCode
  private var _country          : String           as Country = "US"
  private var _coverageCodes    : List<String>     as CoverageCodes = new ArrayList<String>()
  private var _riskUnits        : List<RiskUnitDTO> as RiskUnits = new ArrayList<RiskUnitDTO>()
  private var _agentCode        : String           as AgentCode
  private var _uwCompanyCode    : String           as UwCompanyCode

  override public property get ShortDescription() : String {
    return "[QuoteRequest: product=${_productCode} insured=${_insuredLastName}]"
  }

  override public property get LongDescription() : String {
    return "[QuoteRequest: product=${_productCode} effective=${_effectiveDate} insured=${_insuredFirstName} ${_insuredLastName} addr=${_city},${_state} coverages=${_coverageCodes.join(",")}]"
  }
}
