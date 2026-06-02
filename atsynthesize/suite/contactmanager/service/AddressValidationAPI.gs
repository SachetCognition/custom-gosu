//
//  AddressValidationAPI.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.contactmanager.service

uses gw.api.server.AvailabilityLevel
uses gw.api.webservice.exception.SOAPException
uses gw.xml.ws.annotation.WsiAvailability
uses gw.xml.ws.annotation.WsiWebService

uses atsynthesize.suite.integration.service.WsiServiceBaseAPI
uses atsynthesize.suite.integration.service.exception.InvalidFieldsException
uses atsynthesize.suite.integration.service.exception.ValidationException
uses atsynthesize.suite.contactmanager.entity.AddressDTO

@WsiWebService("http://atsynthesize.com/gw/ws/atsynthesize/suite/contactmanager/service/AddressValidationAPI")
@WsiAvailability(AvailabilityLevel.MULTIUSER)
class AddressValidationAPI extends WsiServiceBaseAPI {

  construct() {
    super("AddressValidationAPI")
  }

  @Throws(InvalidFieldsException, "Invalid address data")
  @Throws(SOAPException, "SOAP Exception")
  public function validateAddress(pInput : AddressDTO) : AddressDTO {
    var result : AddressDTO = wsiExecute(
        \ requestInput : AddressDTO -> {
          return processValidateAddress(requestInput)
        },
        pInput
    )
    return result
  }

  protected function processValidateAddress(pInput : AddressDTO) : AddressDTO {
    if (pInput == null) {
      throw new ValidationException("Address data is required")
    }
    if (!pInput.AddressLine1.HasContent) {
      var ve = new ValidationException("Address validation failed")
      ve.addFieldError("addressLine1", "", "Address line 1 is required")
      throw ve
    }
    if (!pInput.City.HasContent || !pInput.State.HasContent || !pInput.PostalCode.HasContent) {
      var ve = new ValidationException("Address validation failed")
      if (!pInput.City.HasContent) ve.addFieldError("city", "", "City is required")
      if (!pInput.State.HasContent) ve.addFieldError("state", "", "State is required")
      if (!pInput.PostalCode.HasContent) ve.addFieldError("postalCode", "", "Postal code is required")
      throw ve
    }

    // In production: call USPS or external address validation service
    pInput.ValidationStatus = "Validated"
    pInput.Country = pInput.Country ?: "US"
    return pInput
  }
}
