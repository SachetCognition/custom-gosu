//
//  ContactSearchAPI.gs
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

@WsiWebService("http://atsynthesize.com/gw/ws/atsynthesize/suite/contactmanager/service/ContactSearchAPI")
@WsiAvailability(AvailabilityLevel.MULTIUSER)
class ContactSearchAPI extends WsiServiceBaseAPI {

  construct() {
    super("ContactSearchAPI")
  }

  @Throws(InvalidFieldsException, "Invalid search criteria")
  @Throws(BadIdentifierException, "Contact not found")
  @Throws(SOAPException, "SOAP Exception")
  public function searchByName(pInput : ContactDTO) : ContactDTO[] {
    var result : ContactDTO[] = wsiExecuteAndReturnArray(
        \ requestInput : ContactDTO -> {
          return processSearchByName(requestInput)
        },
        pInput
    )
    return result
  }

  @Throws(BadIdentifierException, "Contact not found")
  @Throws(SOAPException, "SOAP Exception")
  public function getByPublicId(pInput : ContactDTO) : ContactDTO {
    var result : ContactDTO = wsiExecute(
        \ requestInput : ContactDTO -> {
          return processGetByPublicId(requestInput)
        },
        pInput
    )
    return result
  }

  protected function processSearchByName(pInput : ContactDTO) : ContactDTO[] {
    if (pInput == null || (!pInput.LastName.HasContent && !pInput.CompanyName.HasContent)) {
      throw new ValidationException("Last name or company name is required for search")
    }

    return new ContactDTO[] {
        new ContactDTO() {
            :PublicID = "cm:1001",
            :ContactType = "Person",
            :FirstName = "John",
            :LastName = pInput.LastName ?: "Smith",
            :EmailAddress = "john.smith@example.com",
            :WorkPhone = "(555) 123-4567",
            :Status = "Active"
        },
        new ContactDTO() {
            :PublicID = "cm:1002",
            :ContactType = "Person",
            :FirstName = "Jane",
            :LastName = pInput.LastName ?: "Smith",
            :EmailAddress = "jane.smith@example.com",
            :WorkPhone = "(555) 234-5678",
            :Status = "Active"
        }
    }
  }

  protected function processGetByPublicId(pInput : ContactDTO) : ContactDTO {
    if (pInput == null || !pInput.PublicID.HasContent) {
      throw new ValidationException("Public ID is required")
    }

    var result = new ContactDTO() {
        :PublicID = pInput.PublicID,
        :ContactType = "Person",
        :FirstName = "John",
        :LastName = "Smith",
        :EmailAddress = "john.smith@example.com",
        :WorkPhone = "(555) 123-4567",
        :Status = "Active"
    }
    return result
  }
}
