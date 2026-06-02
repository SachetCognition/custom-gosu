//
//  ContactDTO.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.contactmanager.entity

uses gw.xml.ws.annotation.WsiExportable
uses java.util.Date
uses java.util.List
uses java.util.ArrayList

uses atsynthesize.suite.integration.service.IWsiServiceEntity

@WsiExportable("http://atsynthesize.com/gw/ws/atsynthesize/suite/contactmanager/entity/ContactDTO")
final class ContactDTO implements IWsiServiceEntity {

  private var _publicId      : String          as PublicID
  private var _contactType   : String          as ContactType
  private var _firstName     : String          as FirstName
  private var _lastName      : String          as LastName
  private var _displayName   : String          as DisplayName
  private var _companyName   : String          as CompanyName
  private var _dateOfBirth   : Date            as DateOfBirth
  private var _gender        : String          as Gender
  private var _ssn           : String          as SSN
  private var _fein          : String          as FEIN
  private var _emailAddress  : String          as EmailAddress
  private var _workPhone     : String          as WorkPhone
  private var _homePhone     : String          as HomePhone
  private var _cellPhone     : String          as CellPhone
  private var _faxNumber     : String          as FaxNumber
  private var _preferredContact : String       as PreferredContact
  private var _addresses     : List<AddressDTO> as Addresses = new ArrayList<AddressDTO>()
  private var _tags          : List<String>    as Tags = new ArrayList<String>()
  private var _status        : String          as Status
  private var _createdDate   : Date            as CreatedDate
  private var _modifiedDate  : Date            as ModifiedDate

  override public property get ShortDescription() : String {
    return "[Contact:${_contactType} Name:${_displayName ?: _firstName + " " + _lastName}]"
  }

  override public property get LongDescription() : String {
    return "[Contact:${_contactType} Name:${_displayName ?: _firstName + " " + _lastName} Email:${_emailAddress} Phone:${_workPhone} Status:${_status}]"
  }
}
