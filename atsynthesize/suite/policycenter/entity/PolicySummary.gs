//
//  PolicySummary.gs
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

@WsiExportable("http://atsynthesize.com/gw/ws/atsynthesize/suite/policycenter/entity/PolicySummary")
final class PolicySummary implements IWsiServiceEntity {

  private var _policyNumber     : String        as PolicyNumber
  private var _publicId         : String        as PublicID
  private var _productCode      : String        as ProductCode
  private var _productName      : String        as ProductName
  private var _status           : String        as Status
  private var _effectiveDate    : Date          as EffectiveDate
  private var _expirationDate   : Date          as ExpirationDate
  private var _totalPremium     : BigDecimal    as TotalPremium
  private var _currencyCode     : String        as CurrencyCode = "USD"
  private var _primaryInsuredName : String      as PrimaryInsuredName
  private var _primaryInsuredId : String        as PrimaryInsuredId
  private var _agentCode        : String        as AgentCode
  private var _agentName        : String        as AgentName
  private var _uwCompany        : String        as UwCompany
  private var _policyLines      : List<String>  as PolicyLines = new ArrayList<String>()
  private var _termNumber       : int           as TermNumber = 1
  private var _cancellationDate : Date          as CancellationDate
  private var _createdDate      : Date          as CreatedDate
  private var _modifiedDate     : Date          as ModifiedDate

  override public property get ShortDescription() : String {
    return "[Policy:${_policyNumber} Status:${_status} Product:${_productCode}]"
  }

  override public property get LongDescription() : String {
    return "[Policy:${_policyNumber} Status:${_status} Product:${_productCode} Insured:${_primaryInsuredName} Premium:${_currencyCode} ${_totalPremium} Effective:${_effectiveDate}-${_expirationDate}]"
  }
}
