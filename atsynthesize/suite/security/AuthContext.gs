//
//  AuthContext.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.security

uses java.util.Set
uses java.util.HashSet

/**
 * Authentication context holder for the current service invocation.
 * Carries the authenticated identity, roles and permissions
 * through the integration call chain.
 */
class AuthContext {

  private static var _threadLocal : ThreadLocal<AuthContext> = new ThreadLocal<AuthContext>()

  private var _userId      : String      as UserId
  private var _username    : String      as Username
  private var _authScheme  : String      as AuthScheme
  private var _roles       : Set<String> as Roles       = new HashSet<String>()
  private var _permissions : Set<String> as Permissions  = new HashSet<String>()
  private var _tokenExpiry : long        as TokenExpiry  = 0
  private var _authenticated : boolean   as Authenticated = false

  construct() {}

  construct(pUserId : String, pUsername : String) {
    _userId   = pUserId
    _username = pUsername
    _authenticated = true
  }

  public static function current() : AuthContext {
    var ctx = _threadLocal.get()
    if (ctx == null) {
      ctx = new AuthContext()
      _threadLocal.set(ctx)
    }
    return ctx
  }

  public static function set(pContext : AuthContext) {
    _threadLocal.set(pContext)
  }

  public static function clear() {
    _threadLocal.remove()
  }

  public function hasRole(pRole : String) : boolean {
    return _roles.contains(pRole)
  }

  public function hasPermission(pPermission : String) : boolean {
    return _permissions.contains(pPermission)
  }

  public function addRole(pRole : String) {
    _roles.add(pRole)
  }

  public function addPermission(pPermission : String) {
    _permissions.add(pPermission)
  }

  public property get IsTokenExpired() : boolean {
    return _tokenExpiry > 0 && java.lang.System.currentTimeMillis() > _tokenExpiry
  }

  override public function toString() : String {
    return "AuthContext[user=${_username}, roles=${_roles}, authenticated=${_authenticated}]"
  }
}
