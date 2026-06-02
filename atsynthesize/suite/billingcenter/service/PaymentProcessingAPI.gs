//
//  PaymentProcessingAPI.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.billingcenter.service

uses gw.api.server.AvailabilityLevel
uses gw.api.webservice.exception.BadIdentifierException
uses gw.api.webservice.exception.SOAPException
uses gw.xml.ws.annotation.WsiAvailability
uses gw.xml.ws.annotation.WsiWebService

uses atsynthesize.suite.integration.service.WsiServiceBaseAPI
uses atsynthesize.suite.integration.service.exception.InvalidFieldsException
uses atsynthesize.suite.integration.service.exception.ValidationException
uses atsynthesize.suite.billingcenter.entity.PaymentRequest
uses atsynthesize.suite.billingcenter.entity.PaymentResponse

@WsiWebService("http://atsynthesize.com/gw/ws/atsynthesize/suite/billingcenter/service/PaymentProcessingAPI")
@WsiAvailability(AvailabilityLevel.MULTIUSER)
class PaymentProcessingAPI extends WsiServiceBaseAPI {

  construct() {
    super("PaymentProcessingAPI")
  }

  @Throws(InvalidFieldsException, "Invalid payment data")
  @Throws(BadIdentifierException, "Account/invoice not found")
  @Throws(SOAPException, "SOAP Exception")
  public function processPayment(pInput : PaymentRequest) : PaymentResponse {
    var result : PaymentResponse = wsiExecute(
        \ requestInput : PaymentRequest -> {
          return processPaymentRequest(requestInput)
        },
        pInput
    )
    return result
  }

  protected function processPaymentRequest(pInput : PaymentRequest) : PaymentResponse {
    if (pInput == null || !pInput.AccountNumber.HasContent) {
      throw new ValidationException("Account number is required")
    }
    if (pInput.Amount == null || pInput.Amount.compareTo(java.math.BigDecimal.ZERO) <= 0) {
      throw new ValidationException("Payment amount must be positive")
    }

    var response = new PaymentResponse() {
        :TransactionId = "TXN-${java.lang.System.currentTimeMillis()}",
        :Status = "Applied",
        :Amount = pInput.Amount,
        :AppliedDate = new java.util.Date(),
        :ConfirmationCode = "CONF-${java.util.UUID.randomUUID().toString().substring(0, 8)}",
        :RemainingBalance = java.math.BigDecimal.ZERO,
        :Message = "Payment of ${pInput.CurrencyCode} ${pInput.Amount} applied to account ${pInput.AccountNumber}"
    }
    return response
  }
}
