//
//  InvoiceAPI.gs
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
uses atsynthesize.suite.billingcenter.entity.InvoiceDTO
uses atsynthesize.suite.billingcenter.entity.ChargeDTO

@WsiWebService("http://atsynthesize.com/gw/ws/atsynthesize/suite/billingcenter/service/InvoiceAPI")
@WsiAvailability(AvailabilityLevel.MULTIUSER)
class InvoiceAPI extends WsiServiceBaseAPI {

  construct() {
    super("InvoiceAPI")
  }

  @Throws(InvalidFieldsException, "Invalid invoice query")
  @Throws(BadIdentifierException, "Account not found")
  @Throws(SOAPException, "SOAP Exception")
  public function getInvoicesByAccount(pInput : InvoiceDTO) : InvoiceDTO[] {
    var result : InvoiceDTO[] = wsiExecuteAndReturnArray(
        \ requestInput : InvoiceDTO -> {
          return processGetInvoices(requestInput)
        },
        pInput
    )
    return result
  }

  protected function processGetInvoices(pInput : InvoiceDTO) : InvoiceDTO[] {
    if (pInput == null || !pInput.AccountNumber.HasContent) {
      throw new ValidationException("Account number is required")
    }

    return new InvoiceDTO[] {
        new InvoiceDTO() {
            :InvoiceNumber = "INV-2024-001",
            :AccountNumber = pInput.AccountNumber,
            :Status = "Due",
            :TotalAmount = new java.math.BigDecimal("625.00"),
            :PaidAmount = java.math.BigDecimal.ZERO,
            :BalanceDue = new java.math.BigDecimal("625.00"),
            :InstallmentNumber = 1,
            :TotalInstallments = 6
        },
        new InvoiceDTO() {
            :InvoiceNumber = "INV-2024-002",
            :AccountNumber = pInput.AccountNumber,
            :Status = "Paid",
            :TotalAmount = new java.math.BigDecimal("625.00"),
            :PaidAmount = new java.math.BigDecimal("625.00"),
            :BalanceDue = java.math.BigDecimal.ZERO,
            :InstallmentNumber = 2,
            :TotalInstallments = 6
        }
    }
  }
}
