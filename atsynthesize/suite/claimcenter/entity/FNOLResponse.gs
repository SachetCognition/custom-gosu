//
//  FNOLResponse.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.claimcenter.entity

uses gw.xml.ws.annotation.WsiExportable
uses java.util.Date
uses java.util.List
uses java.util.ArrayList

uses atsynthesize.suite.integration.service.IWsiServiceEntity

@WsiExportable("http://atsynthesize.com/gw/ws/atsynthesize/suite/claimcenter/entity/FNOLResponse")
final class FNOLResponse implements IWsiServiceEntity {

  private var _claimNumber     : String       as ClaimNumber
  private var _claimPublicId   : String       as ClaimPublicId
  private var _status          : String       as Status
  private var _assignedAdjuster : String      as AssignedAdjuster
  private var _createdDate     : Date         as CreatedDate
  private var _acknowledgement : String       as Acknowledgement
  private var _validationMessages : List<String> as ValidationMessages = new ArrayList<String>()

  override public property get ShortDescription() : String {
    return "[FNOLResponse: claim=${_claimNumber} status=${_status}]"
  }

  override public property get LongDescription() : String {
    return "[FNOLResponse: claim=${_claimNumber} status=${_status} adjuster=${_assignedAdjuster} created=${_createdDate}]"
  }
}
