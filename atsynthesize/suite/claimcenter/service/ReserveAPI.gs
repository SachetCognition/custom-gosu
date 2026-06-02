//
//  ReserveAPI.gs
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
uses atsynthesize.suite.claimcenter.entity.ReserveDTO

@WsiWebService("http://atsynthesize.com/gw/ws/atsynthesize/suite/claimcenter/service/ReserveAPI")
@WsiAvailability(AvailabilityLevel.MULTIUSER)
class ReserveAPI extends WsiServiceBaseAPI {

  construct() {
    super("ReserveAPI")
  }

  @Throws(InvalidFieldsException, "Invalid reserve data")
  @Throws(BadIdentifierException, "Claim/exposure not found")
  @Throws(SOAPException, "SOAP Exception")
  public function setReserve(pInput : ReserveDTO) : ReserveDTO {
    var result : ReserveDTO = wsiExecute(
        \ requestInput : ReserveDTO -> {
          return processSetReserve(requestInput)
        },
        pInput
    )
    return result
  }

  @Throws(InvalidFieldsException, "Invalid reserve data")
  @Throws(SOAPException, "SOAP Exception")
  public function getReservesByClaimNumber(pInput : ReserveDTO) : ReserveDTO[] {
    var result : ReserveDTO[] = wsiExecuteAndReturnArray(
        \ requestInput : ReserveDTO -> {
          return processGetReserves(requestInput)
        },
        pInput
    )
    return result
  }

  protected function processSetReserve(pInput : ReserveDTO) : ReserveDTO {
    if (pInput == null || !pInput.ClaimNumber.HasContent) {
      throw new ValidationException("Claim number is required for reserve")
    }
    if (pInput.ReserveAmount == null) {
      throw new ValidationException("Reserve amount is required")
    }

    pInput.Status = "Approved"
    pInput.AvailableAmount = pInput.ReserveAmount
    pInput.PendingAmount = java.math.BigDecimal.ZERO
    pInput.CreatedDate = new java.util.Date()
    pInput.ApprovedBy = "System"
    return pInput
  }

  protected function processGetReserves(pInput : ReserveDTO) : ReserveDTO[] {
    if (pInput == null || !pInput.ClaimNumber.HasContent) {
      throw new ValidationException("Claim number is required")
    }

    return new ReserveDTO[] {
        new ReserveDTO() {
            :ClaimNumber = pInput.ClaimNumber,
            :CostType = "ClaimCost",
            :CostCategory = "Body",
            :ReserveAmount = new java.math.BigDecimal("10000.00"),
            :AvailableAmount = new java.math.BigDecimal("5000.00"),
            :Status = "Approved"
        },
        new ReserveDTO() {
            :ClaimNumber = pInput.ClaimNumber,
            :CostType = "AOExpense",
            :CostCategory = "Legal",
            :ReserveAmount = new java.math.BigDecimal("5000.00"),
            :AvailableAmount = new java.math.BigDecimal("5000.00"),
            :Status = "Approved"
        }
    }
  }
}
