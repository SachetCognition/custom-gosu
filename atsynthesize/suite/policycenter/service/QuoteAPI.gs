//
//  QuoteAPI.gs
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
uses atsynthesize.suite.policycenter.entity.QuoteRequest
uses atsynthesize.suite.policycenter.entity.QuoteResponse
uses atsynthesize.suite.policycenter.entity.PremiumBreakdown

@WsiWebService("http://atsynthesize.com/gw/ws/atsynthesize/suite/policycenter/service/QuoteAPI")
@WsiAvailability(AvailabilityLevel.MULTIUSER)
class QuoteAPI extends WsiServiceBaseAPI {

  construct() {
    super("QuoteAPI")
  }

  @Throws(InvalidFieldsException, "Invalid quote request")
  @Throws(BadIdentifierException, "Product/account not found")
  @Throws(SOAPException, "SOAP Exception")
  public function createQuote(pInput : QuoteRequest) : QuoteResponse {
    var result : QuoteResponse = wsiExecute(
        \ requestInput : QuoteRequest -> {
          return processCreateQuote(requestInput)
        },
        pInput
    )
    return result
  }

  protected function processCreateQuote(pInput : QuoteRequest) : QuoteResponse {
    if (pInput == null) {
      throw new ValidationException("Quote request cannot be null")
    }
    if (!pInput.ProductCode.HasContent) {
      var ve = new ValidationException("Quote request validation failed")
      ve.addFieldError("productCode", "", "Product code is required")
      throw ve
    }

    // In production: Create submission, rate, and return quote
    var response = new QuoteResponse() {
        :QuoteId = "Q-${java.lang.System.currentTimeMillis()}",
        :Status = "Quoted",
        :TotalPremium = new java.math.BigDecimal("1850.00"),
        :Taxes = new java.math.BigDecimal("148.00"),
        :Fees = new java.math.BigDecimal("25.00"),
        :GrandTotal = new java.math.BigDecimal("2023.00"),
        :PremiumBreakdowns = {
            new PremiumBreakdown() {
                :CoverageCode = "PALiabilityCov",
                :CoverageName = "Bodily Injury & Property Damage",
                :LineName = "PersonalAutoLine",
                :BasePremium = new java.math.BigDecimal("750.00"),
                :Adjustments = new java.math.BigDecimal("50.00"),
                :Discounts = new java.math.BigDecimal("-75.00"),
                :FinalPremium = new java.math.BigDecimal("725.00")
            },
            new PremiumBreakdown() {
                :CoverageCode = "PACollisionCov",
                :CoverageName = "Collision",
                :LineName = "PersonalAutoLine",
                :BasePremium = new java.math.BigDecimal("500.00"),
                :Adjustments = new java.math.BigDecimal("0.00"),
                :Discounts = new java.math.BigDecimal("-25.00"),
                :FinalPremium = new java.math.BigDecimal("475.00")
            },
            new PremiumBreakdown() {
                :CoverageCode = "PAComprehensiveCov",
                :CoverageName = "Comprehensive",
                :LineName = "PersonalAutoLine",
                :BasePremium = new java.math.BigDecimal("700.00"),
                :Adjustments = new java.math.BigDecimal("0.00"),
                :Discounts = new java.math.BigDecimal("-50.00"),
                :FinalPremium = new java.math.BigDecimal("650.00")
            }
        }
    }
    return response
  }
}
