//
//  PolicyIssuanceAPI.gs
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

@WsiWebService("http://atsynthesize.com/gw/ws/atsynthesize/suite/policycenter/service/PolicyIssuanceAPI")
@WsiAvailability(AvailabilityLevel.MULTIUSER)
class PolicyIssuanceAPI extends WsiServiceBaseAPI {

  construct() {
    super("PolicyIssuanceAPI")
  }

  @Throws(InvalidFieldsException, "Invalid issuance request")
  @Throws(BadIdentifierException, "Submission not found")
  @Throws(SOAPException, "SOAP Exception")
  public function issuePolicy(pInput : PolicySummary) : PolicySummary {
    var result : PolicySummary = wsiExecute(
        \ requestInput : PolicySummary -> {
          return processIssuePolicy(requestInput)
        },
        pInput
    )
    return result
  }

  @Throws(InvalidFieldsException, "Invalid endorsement request")
  @Throws(SOAPException, "SOAP Exception")
  public function endorsePolicy(pInput : PolicySummary) : PolicySummary {
    var result : PolicySummary = wsiExecute(
        \ requestInput : PolicySummary -> {
          return processEndorsePolicy(requestInput)
        },
        pInput
    )
    return result
  }

  @Throws(InvalidFieldsException, "Invalid renewal request")
  @Throws(SOAPException, "SOAP Exception")
  public function renewPolicy(pInput : PolicySummary) : PolicySummary {
    var result : PolicySummary = wsiExecute(
        \ requestInput : PolicySummary -> {
          return processRenewPolicy(requestInput)
        },
        pInput
    )
    return result
  }

  @Throws(InvalidFieldsException, "Invalid cancellation request")
  @Throws(SOAPException, "SOAP Exception")
  public function cancelPolicy(pInput : PolicySummary) : PolicySummary {
    var result : PolicySummary = wsiExecute(
        \ requestInput : PolicySummary -> {
          return processCancelPolicy(requestInput)
        },
        pInput
    )
    return result
  }

  protected function processIssuePolicy(pInput : PolicySummary) : PolicySummary {
    if (pInput == null || !pInput.ProductCode.HasContent) {
      throw new ValidationException("Product code is required for issuance")
    }

    var issued = new PolicySummary() {
        :PolicyNumber = "PA-${java.lang.System.currentTimeMillis()}",
        :Status = "Issued",
        :ProductCode = pInput.ProductCode,
        :ProductName = pInput.ProductName,
        :TotalPremium = pInput.TotalPremium,
        :PrimaryInsuredName = pInput.PrimaryInsuredName,
        :EffectiveDate = pInput.EffectiveDate,
        :ExpirationDate = pInput.ExpirationDate,
        :TermNumber = 1,
        :CreatedDate = new java.util.Date()
    }
    return issued
  }

  protected function processEndorsePolicy(pInput : PolicySummary) : PolicySummary {
    if (pInput == null || !pInput.PolicyNumber.HasContent) {
      throw new ValidationException("Policy number is required for endorsement")
    }
    pInput.Status = "Endorsed"
    pInput.ModifiedDate = new java.util.Date()
    return pInput
  }

  protected function processRenewPolicy(pInput : PolicySummary) : PolicySummary {
    if (pInput == null || !pInput.PolicyNumber.HasContent) {
      throw new ValidationException("Policy number is required for renewal")
    }
    pInput.Status = "Renewed"
    pInput.TermNumber = pInput.TermNumber + 1
    pInput.ModifiedDate = new java.util.Date()
    return pInput
  }

  protected function processCancelPolicy(pInput : PolicySummary) : PolicySummary {
    if (pInput == null || !pInput.PolicyNumber.HasContent) {
      throw new ValidationException("Policy number is required for cancellation")
    }
    pInput.Status = "Cancelled"
    pInput.CancellationDate = new java.util.Date()
    pInput.ModifiedDate = new java.util.Date()
    return pInput
  }
}
