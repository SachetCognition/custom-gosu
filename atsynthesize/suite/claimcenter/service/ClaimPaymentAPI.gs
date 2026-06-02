//
//  ClaimPaymentAPI.gs
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
uses atsynthesize.suite.claimcenter.entity.PaymentDTO

@WsiWebService("http://atsynthesize.com/gw/ws/atsynthesize/suite/claimcenter/service/ClaimPaymentAPI")
@WsiAvailability(AvailabilityLevel.MULTIUSER)
class ClaimPaymentAPI extends WsiServiceBaseAPI {

  construct() {
    super("ClaimPaymentAPI")
  }

  @Throws(InvalidFieldsException, "Invalid payment data")
  @Throws(BadIdentifierException, "Claim/exposure not found")
  @Throws(SOAPException, "SOAP Exception")
  public function createPayment(pInput : PaymentDTO) : PaymentDTO {
    var result : PaymentDTO = wsiExecute(
        \ requestInput : PaymentDTO -> {
          return processCreatePayment(requestInput)
        },
        pInput
    )
    return result
  }

  protected function processCreatePayment(pInput : PaymentDTO) : PaymentDTO {
    if (pInput == null || !pInput.ClaimNumber.HasContent) {
      throw new ValidationException("Claim number is required")
    }
    if (pInput.Amount == null || pInput.Amount.compareTo(java.math.BigDecimal.ZERO) <= 0) {
      throw new ValidationException("Payment amount must be positive")
    }

    pInput.PublicID = "cc:pay:" + java.util.UUID.randomUUID().toString().substring(0, 8)
    pInput.Status = "Pending"
    pInput.ApprovalStatus = "PendingApproval"
    pInput.ScheduledDate = new java.util.Date()
    return pInput
  }
}
