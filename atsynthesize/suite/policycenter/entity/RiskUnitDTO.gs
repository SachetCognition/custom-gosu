//
//  RiskUnitDTO.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.policycenter.entity

uses gw.xml.ws.annotation.WsiExportable
uses java.util.List
uses java.util.ArrayList

uses atsynthesize.suite.integration.service.IWsiServiceEntity

@WsiExportable("http://atsynthesize.com/gw/ws/atsynthesize/suite/policycenter/entity/RiskUnitDTO")
final class RiskUnitDTO implements IWsiServiceEntity {

  private var _publicId      : String          as PublicID
  private var _riskType      : String          as RiskType
  private var _riskNumber    : int             as RiskNumber = 1
  private var _description   : String          as Description
  private var _locationCode  : String          as LocationCode
  private var _addressLine1  : String          as AddressLine1
  private var _city          : String          as City
  private var _state         : String          as State
  private var _postalCode    : String          as PostalCode
  private var _coverages     : List<CoverageDTO> as Coverages = new ArrayList<CoverageDTO>()

  override public property get ShortDescription() : String {
    return "[Risk:${_riskType}#${_riskNumber} Loc:${_locationCode}]"
  }

  override public property get LongDescription() : String {
    return "[Risk:${_riskType}#${_riskNumber} Desc:${_description} Location:${_locationCode} Addr:${_addressLine1},${_city},${_state} ${_postalCode} Coverages:${_coverages.Count}]"
  }
}
