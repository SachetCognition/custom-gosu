//
//  PolicySearchAPI.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.policycenter.service

uses gw.api.server.AvailabilityLevel
uses gw.api.webservice.exception.BadIdentifierException
uses gw.api.webservice.exception.SOAPException
uses gw.xml.ws.annotation.WsiAvailability
uses gw.xml.ws.annotation.WsiWebService

uses atsynthesize.suite.integration.service.WsiServiceBaseAPI
uses atsynthesize.suite.integration.service.exception.InvalidFieldsException
uses atsynthesize.suite.integration.service.exception.ValidationException
uses atsynthesize.suite.policycenter.entity.PolicySummary

@WsiWebService("http://atsynthesize.com/gw/ws/atsynthesize/suite/policycenter/service/PolicySearchAPI")
@WsiAvailability(AvailabilityLevel.MULTIUSER)
class PolicySearchAPI extends WsiServiceBaseAPI {

  construct() {
    super("PolicySearchAPI")
  }

  @Throws(InvalidFieldsException, "Invalid search criteria")
  @Throws(BadIdentifierException, "Policy not found")
  @Throws(SOAPException, "SOAP Exception")
  public function searchByPolicyNumber(pInput : PolicySummary) : PolicySummary {
    var result : PolicySummary = wsiExecute(
        \ requestInput : PolicySummary -> {
          return processSearchByPolicyNumber(requestInput)
        },
        pInput
    )
    return result
  }

  @Throws(InvalidFieldsException, "Invalid search criteria")
  @Throws(SOAPException, "SOAP Exception")
  public function searchByInsuredName(pInput : PolicySummary) : PolicySummary[] {
    var result : PolicySummary[] = wsiExecuteAndReturnArray(
        \ requestInput : PolicySummary -> {
          return processSearchByInsuredName(requestInput)
        },
        pInput
    )
    return result
  }

  protected function processSearchByPolicyNumber(pInput : PolicySummary) : PolicySummary {
    if (pInput == null || !pInput.PolicyNumber.HasContent) {
      throw new ValidationException("Policy number is required")
    }

    // In production: Query.make(entity.Policy).compare("PolicyNumber", equals, pInput.PolicyNumber)
    var result = new PolicySummary() {
        :PolicyNumber = pInput.PolicyNumber,
        :Status = "InForce",
        :ProductCode = "PersonalAuto",
        :ProductName = "Personal Auto",
        :TotalPremium = new java.math.BigDecimal("1250.00"),
        :PrimaryInsuredName = "John Smith",
        :TermNumber = 1
    }
    return result
  }

  protected function processSearchByInsuredName(pInput : PolicySummary) : PolicySummary[] {
    if (pInput == null || !pInput.PrimaryInsuredName.HasContent) {
      throw new ValidationException("Insured name is required for search")
    }

    // In production: Query based search with pagination
    var results = new PolicySummary[] {
        new PolicySummary() {
            :PolicyNumber = "PA-2024-001",
            :Status = "InForce",
            :ProductCode = "PersonalAuto",
            :PrimaryInsuredName = pInput.PrimaryInsuredName,
            :TotalPremium = new java.math.BigDecimal("1250.00")
        },
        new PolicySummary() {
            :PolicyNumber = "HO-2024-003",
            :Status = "InForce",
            :ProductCode = "Homeowners",
            :PrimaryInsuredName = pInput.PrimaryInsuredName,
            :TotalPremium = new java.math.BigDecimal("2100.00")
        }
    }
    return results
  }
}
