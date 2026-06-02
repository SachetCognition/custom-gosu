//
//  AuthenticationException.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.integration.service.exception

/**
 * Thrown when authentication or authorization fails during
 * an integration service call (expired token, invalid credentials,
 * insufficient permissions).
 */
class AuthenticationException extends IntegrationException {

  private var _realm : String as Realm

  construct(pMessage : String) {
    super(pMessage, "AUTH_ERROR", 401)
  }

  construct(pMessage : String, pRealm : String) {
    super(pMessage, "AUTH_ERROR", 401)
    _realm = pRealm
  }
}
