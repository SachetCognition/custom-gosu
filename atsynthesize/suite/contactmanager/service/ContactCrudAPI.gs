//
//  ContactCrudAPI.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.contactmanager.service

uses gw.api.server.AvailabilityLevel
uses gw.api.webservice.exception.BadIdentifierException
uses gw.api.webservice.exception.SOAPException
uses gw.xml.ws.annotation.WsiAvailability
uses gw.xml.ws.annotation.WsiWebService

uses atsynthesize.suite.integration.service.WsiServiceBaseAPI
uses atsynthesize.suite.integration.service.exception.InvalidFieldsException
uses atsynthesize.suite.integration.service.exception.ValidationException
uses atsynthesize.suite.contactmanager.entity.ContactDTO

@WsiWebService("http://atsynthesize.com/gw/ws/atsynthesize/suite/contactmanager/service/ContactCrudAPI")
@WsiAvailability(AvailabilityLevel.MULTIUSER)
class ContactCrudAPI extends WsiServiceBaseAPI {

  construct() {
    super("ContactCrudAPI")
  }

  @Throws(InvalidFieldsException, "Invalid contact data")
  @Throws(SOAPException, "SOAP Exception")
  public function createContact(pInput : ContactDTO) : ContactDTO {
    var result : ContactDTO = wsiExecute(
        \ requestInput : ContactDTO -> {
          return processCreateContact(requestInput)
        },
        pInput
    )
    return result
  }

  @Throws(InvalidFieldsException, "Invalid contact data")
  @Throws(BadIdentifierException, "Contact not found")
  @Throws(SOAPException, "SOAP Exception")
  public function updateContact(pInput : ContactDTO) : ContactDTO {
    var result : ContactDTO = wsiExecute(
        \ requestInput : ContactDTO -> {
          return processUpdateContact(requestInput)
        },
        pInput
    )
    return result
  }

  @Throws(BadIdentifierException, "Contact not found")
  @Throws(SOAPException, "SOAP Exception")
  public function deleteContact(pInput : ContactDTO) : ContactDTO {
    var result : ContactDTO = wsiExecute(
        \ requestInput : ContactDTO -> {
          return processDeleteContact(requestInput)
        },
        pInput
    )
    return result
  }

  protected function processCreateContact(pInput : ContactDTO) : ContactDTO {
    if (pInput == null) {
      throw new ValidationException("Contact data is required")
    }
    if (!pInput.ContactType.HasContent) {
      throw new ValidationException("Contact type is required")
    }
    if (pInput.ContactType == "Person" && !pInput.LastName.HasContent) {
      var ve = new ValidationException("Contact validation failed")
      ve.addFieldError("lastName", "", "Last name is required for Person contacts")
      throw ve
    }

    pInput.PublicID = "cm:" + java.util.UUID.randomUUID().toString().substring(0, 8)
    pInput.Status = "Active"
    pInput.CreatedDate = new java.util.Date()
    pInput.ModifiedDate = new java.util.Date()
    return pInput
  }

  protected function processUpdateContact(pInput : ContactDTO) : ContactDTO {
    if (pInput == null || !pInput.PublicID.HasContent) {
      throw new ValidationException("Public ID is required for update")
    }
    pInput.ModifiedDate = new java.util.Date()
    return pInput
  }

  protected function processDeleteContact(pInput : ContactDTO) : ContactDTO {
    if (pInput == null || !pInput.PublicID.HasContent) {
      throw new ValidationException("Public ID is required for delete")
    }
    pInput.Status = "Deleted"
    pInput.ModifiedDate = new java.util.Date()
    return pInput
  }
}
