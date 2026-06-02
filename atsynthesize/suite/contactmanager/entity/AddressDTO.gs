//
//  AddressDTO.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.contactmanager.entity

uses gw.xml.ws.annotation.WsiExportable

uses atsynthesize.suite.integration.service.IWsiServiceEntity

@WsiExportable("http://atsynthesize.com/gw/ws/atsynthesize/suite/contactmanager/entity/AddressDTO")
final class AddressDTO implements IWsiServiceEntity {

  private var _publicId      : String as PublicID
  private var _addressType   : String as AddressType
  private var _addressLine1  : String as AddressLine1
  private var _addressLine2  : String as AddressLine2
  private var _addressLine3  : String as AddressLine3
  private var _city          : String as City
  private var _state         : String as State
  private var _postalCode    : String as PostalCode
  private var _country       : String as Country = "US"
  private var _county        : String as County
  private var _isPrimary     : boolean as IsPrimary = false
  private var _validationStatus : String as ValidationStatus

  override public property get ShortDescription() : String {
    return "[Address:${_addressType} ${_city},${_state} ${_postalCode}]"
  }

  override public property get LongDescription() : String {
    return "[Address:${_addressType} ${_addressLine1} ${_addressLine2 ?: ""} ${_city},${_state} ${_postalCode} ${_country} Primary:${_isPrimary}]"
  }
}
