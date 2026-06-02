//
//  AccountBalanceAPI.gs
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
uses atsynthesize.suite.billingcenter.entity.AccountBalanceDTO

@WsiWebService("http://atsynthesize.com/gw/ws/atsynthesize/suite/billingcenter/service/AccountBalanceAPI")
@WsiAvailability(AvailabilityLevel.MULTIUSER)
class AccountBalanceAPI extends WsiServiceBaseAPI {

  construct() {
    super("AccountBalanceAPI")
  }

  @Throws(InvalidFieldsException, "Invalid account query")
  @Throws(BadIdentifierException, "Account not found")
  @Throws(SOAPException, "SOAP Exception")
  public function getAccountBalance(pInput : AccountBalanceDTO) : AccountBalanceDTO {
    var result : AccountBalanceDTO = wsiExecute(
        \ requestInput : AccountBalanceDTO -> {
          return processGetBalance(requestInput)
        },
        pInput
    )
    return result
  }

  protected function processGetBalance(pInput : AccountBalanceDTO) : AccountBalanceDTO {
    if (pInput == null || !pInput.AccountNumber.HasContent) {
      throw new ValidationException("Account number is required")
    }

    var result = new AccountBalanceDTO() {
        :AccountNumber = pInput.AccountNumber,
        :AccountName = "John Smith Insurance Account",
        :TotalBilled = new java.math.BigDecimal("3750.00"),
        :TotalPaid = new java.math.BigDecimal("2500.00"),
        :CurrentBalance = new java.math.BigDecimal("1250.00"),
        :PastDueBalance = java.math.BigDecimal.ZERO,
        :UnbilledAmount = new java.math.BigDecimal("1250.00"),
        :DelinquencyStatus = "None",
        :AsOfDate = new java.util.Date()
    }
    return result
  }
}
