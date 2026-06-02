//
//  RatingAPI.gs
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
uses atsynthesize.suite.policycenter.entity.RatingRequest
uses atsynthesize.suite.policycenter.entity.QuoteResponse
uses atsynthesize.suite.policycenter.entity.PremiumBreakdown

@WsiWebService("http://atsynthesize.com/gw/ws/atsynthesize/suite/policycenter/service/RatingAPI")
@WsiAvailability(AvailabilityLevel.MULTIUSER)
class RatingAPI extends WsiServiceBaseAPI {

  construct() {
    super("RatingAPI")
  }

  @Throws(InvalidFieldsException, "Invalid rating request")
  @Throws(BadIdentifierException, "Policy/product not found")
  @Throws(SOAPException, "SOAP Exception")
  public function ratePolicy(pInput : RatingRequest) : QuoteResponse {
    var result : QuoteResponse = wsiExecute(
        \ requestInput : RatingRequest -> {
          return processRatePolicy(requestInput)
        },
        pInput
    )
    return result
  }

  protected function processRatePolicy(pInput : RatingRequest) : QuoteResponse {
    if (pInput == null || !pInput.ProductCode.HasContent) {
      throw new ValidationException("Product code is required for rating")
    }

    // In production: invoke rating engine with territory, class code, experience mod, etc.
    var basePremium = new java.math.BigDecimal("1000.00")
    if (pInput.ExperienceMod != null) {
      basePremium = basePremium.multiply(pInput.ExperienceMod)
    }

    var response = new QuoteResponse() {
        :QuoteId = "R-${java.lang.System.currentTimeMillis()}",
        :PolicyNumber = pInput.PolicyNumber,
        :Status = "Rated",
        :TotalPremium = basePremium,
        :Taxes = basePremium.multiply(new java.math.BigDecimal("0.08")),
        :Fees = new java.math.BigDecimal("25.00")
    }
    response.GrandTotal = response.TotalPremium.add(response.Taxes).add(response.Fees)
    return response
  }
}
