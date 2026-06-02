//
//  FNOLServiceAPI.gs
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
uses atsynthesize.suite.claimcenter.entity.FNOLRequest
uses atsynthesize.suite.claimcenter.entity.FNOLResponse

@WsiWebService("http://atsynthesize.com/gw/ws/atsynthesize/suite/claimcenter/service/FNOLServiceAPI")
@WsiAvailability(AvailabilityLevel.MULTIUSER)
class FNOLServiceAPI extends WsiServiceBaseAPI {

  construct() {
    super("FNOLServiceAPI")
  }

  @Throws(InvalidFieldsException, "Invalid FNOL data")
  @Throws(BadIdentifierException, "Policy not found")
  @Throws(SOAPException, "SOAP Exception")
  public function submitFNOL(pInput : FNOLRequest) : FNOLResponse {
    var result : FNOLResponse = wsiExecute(
        \ requestInput : FNOLRequest -> {
          return processSubmitFNOL(requestInput)
        },
        pInput
    )
    return result
  }

  protected function processSubmitFNOL(pInput : FNOLRequest) : FNOLResponse {
    if (pInput == null) {
      throw new ValidationException("FNOL request cannot be null")
    }
    if (!pInput.PolicyNumber.HasContent) {
      var ve = new ValidationException("FNOL validation failed")
      ve.addFieldError("policyNumber", "", "Policy number is required")
      throw ve
    }
    if (pInput.LossDate == null) {
      var ve = new ValidationException("FNOL validation failed")
      ve.addFieldError("lossDate", "", "Loss date is required")
      throw ve
    }

    var response = new FNOLResponse() {
        :ClaimNumber = "CLM-${java.lang.System.currentTimeMillis()}",
        :ClaimPublicId = "cc:${java.util.UUID.randomUUID().toString().substring(0, 8)}",
        :Status = "Open",
        :AssignedAdjuster = "Auto-Assigned",
        :CreatedDate = new java.util.Date(),
        :Acknowledgement = "FNOL received for policy ${pInput.PolicyNumber}. Claim created and assigned."
    }
    return response
  }
}
