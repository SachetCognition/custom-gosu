//
//  AuthenticationPlugin.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.plugin

uses java.util.Map
uses java.util.HashMap

uses gw.api.util.Logger
uses gw.util.ILogger

/**
 * Pluggable authentication handler supporting multiple
 * authentication schemes (Basic, OAuth2, Certificate, API Key).
 * Delegates actual credential retrieval to the
 * {@link atsynthesize.suite.security} package.
 */
class AuthenticationPlugin implements IIntegrationPlugin {

  public enum AuthScheme { BASIC, OAUTH2, CERTIFICATE, API_KEY, NONE }

  private var _enabled    : boolean    = true
  private var _authScheme : AuthScheme as ActiveScheme = AuthScheme.NONE
  private var _properties : Map<String, String> = new HashMap<String, String>()
  private var _logger     : ILogger = Logger.forCategory("Integration.Plugin.Auth")

  construct() {}

  construct(pAuthScheme : AuthScheme) {
    _authScheme = pAuthScheme
  }

  override property get PluginName() : String {
    return "AuthenticationPlugin"
  }

  override function initialize() {
    _logger.info("AuthenticationPlugin initialized with scheme: ${_authScheme}")
  }

  override function isEnabled() : boolean {
    return _enabled
  }

  override function shutdown() {
    _logger.info("AuthenticationPlugin shut down")
  }

  public function authenticate(pContext : Map<String, String>) : Map<String, String> {
    var headers = new HashMap<String, String>()

    switch (_authScheme) {
      case AuthScheme.BASIC:
        var credentials = pContext.get("username") + ":" + pContext.get("password")
        var encoded = java.util.Base64.getEncoder().encodeToString(credentials.getBytes("UTF-8"))
        headers.put("Authorization", "Basic ${encoded}")
        break
      case AuthScheme.OAUTH2:
        var token = pContext.get("access_token")
        headers.put("Authorization", "Bearer ${token}")
        break
      case AuthScheme.API_KEY:
        var apiKey = pContext.get("api_key")
        var headerName = pContext.get("header_name") ?: "X-API-Key"
        headers.put(headerName, apiKey)
        break
      case AuthScheme.CERTIFICATE:
        _logger.info("Certificate auth configured via JVM truststore")
        break
      case AuthScheme.NONE:
        break
    }

    return headers
  }

  public function setProperty(pKey : String, pValue : String) {
    _properties.put(pKey, pValue)
  }
}
