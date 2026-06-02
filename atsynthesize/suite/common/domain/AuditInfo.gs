//
//  AuditInfo.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.common.domain

uses java.util.Date

/**
 * Standard audit metadata attached to domain entities.
 * Tracks creation and last-modification timestamps and
 * the responsible user/system identity.
 */
class AuditInfo {

  private var _createdBy   : String as CreatedBy
  private var _createdDate : Date   as CreatedDate
  private var _updatedBy   : String as UpdatedBy
  private var _updatedDate : Date   as UpdatedDate
  private var _version     : int    as Version = 1

  construct() {
    _createdDate = new Date()
    _updatedDate = new Date()
  }

  public function markUpdated(pUpdatedBy : String) {
    _updatedBy   = pUpdatedBy
    _updatedDate = new Date()
    _version++
  }

  override public function toString() : String {
    return "AuditInfo[created=${_createdDate} by ${_createdBy}, updated=${_updatedDate} by ${_updatedBy}, v${_version}]"
  }
}
