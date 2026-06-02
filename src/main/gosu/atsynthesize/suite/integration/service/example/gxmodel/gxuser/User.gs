package atsynthesize.suite.integration.service.example.gxmodel.gxuser

uses gw.xml.IXmlMixedContent

/**
 * Stub for the GX Model-generated User type.
 * In a Guidewire environment, this class is auto-generated from GXUser.gx.
 * It provides a projected view of the entity.User with selected fields.
 */
class User implements IXmlMixedContent {

  private var _publicID   : String as PublicID
  private var _firstName  : String as FirstName
  private var _lastName   : String as LastName
  private var _userName   : String as UserName

  construct() {
  }

  construct(pUser : entity.User) {
    _publicID  = pUser.PublicID
    _firstName = pUser.FirstName
    _lastName  = pUser.LastName
    _userName  = pUser.UserName
  }
}
