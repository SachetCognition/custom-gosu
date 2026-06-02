//
//  ClaimSearchAPI.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.claimcenter.service

uses gw.api.server.AvailabilityLevel
uses gw.api.webservice.exception.BadIdentifierException
uses gw.api.webservice.exception.SOAPException
uses gw.xml.ws.annotation.WsiAvailability
uses gw.xml.ws.annotation.WsiWebService

uses atsynthesize.suite.integration.service.WsiServiceBaseAPI
uses atsynthesize.suite.integration.service.exception.InvalidFieldsException
uses atsynthesize.suite.integration.service.exception.ValidationException
uses atsynthesize.suite.claimcenter.entity.ClaimSummary

@WsiWebService("http://atsynthesize.com/gw/ws/atsynthesize/suite/claimcenter/service/ClaimSearchAPI")
@WsiAvailability(AvailabilityLevel.MULTIUSER)
class ClaimSearchAPI extends WsiServiceBaseAPI {

  construct() {
    super("ClaimSearchAPI")
  }

  @Throws(InvalidFieldsException, "Invalid search criteria")
  @Throws(BadIdentifierException, "Claim not found")
  @Throws(SOAPException, "SOAP Exception")
  public function searchByClaimNumber(pInput : ClaimSummary) : ClaimSummary {
    var result : ClaimSummary = wsiExecute(
        \ requestInput : ClaimSummary -> {
          return processSearchByClaimNumber(requestInput)
        },
        pInput
    )
    return result
  }

  @Throws(InvalidFieldsException, "Invalid search criteria")
  @Throws(SOAPException, "SOAP Exception")
  public function searchByPolicyNumber(pInput : ClaimSummary) : ClaimSummary[] {
    var result : ClaimSummary[] = wsiExecuteAndReturnArray(
        \ requestInput : ClaimSummary -> {
          return processSearchByPolicyNumber(requestInput)
        },
        pInput
    )
    return result
  }

  protected function processSearchByClaimNumber(pInput : ClaimSummary) : ClaimSummary {
    if (pInput == null || !pInput.ClaimNumber.HasContent) {
      throw new ValidationException("Claim number is required")
    }

    var result = new ClaimSummary() {
        :ClaimNumber = pInput.ClaimNumber,
        :Status = "Open",
        :PolicyNumber = "PA-2024-001",
        :LossCause = "Collision",
        :LossType = "Auto",
        :TotalIncurred = new java.math.BigDecimal("15000.00"),
        :TotalPaid = new java.math.BigDecimal("5000.00"),
        :TotalReserves = new java.math.BigDecimal("10000.00"),
        :AdjusterName = "Jane Doe"
    }
    return result
  }

  protected function processSearchByPolicyNumber(pInput : ClaimSummary) : ClaimSummary[] {
    if (pInput == null || !pInput.PolicyNumber.HasContent) {
      throw new ValidationException("Policy number is required for claim search")
    }

    return new ClaimSummary[] {
        new ClaimSummary() {
            :ClaimNumber = "CLM-2024-001",
            :PolicyNumber = pInput.PolicyNumber,
            :Status = "Open",
            :LossCause = "Collision",
            :TotalIncurred = new java.math.BigDecimal("15000.00")
        },
        new ClaimSummary() {
            :ClaimNumber = "CLM-2024-002",
            :PolicyNumber = pInput.PolicyNumber,
            :Status = "Closed",
            :LossCause = "Theft",
            :TotalIncurred = new java.math.BigDecimal("8500.00")
        }
    }
  }
}
