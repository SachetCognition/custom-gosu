//
//  CredentialManager.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.security

uses java.util.Map
uses java.util.HashMap

uses gw.api.util.Logger
uses gw.util.ILogger

/**
 * Secure credential retrieval abstraction. Credentials are
 * referenced by logical name and resolved at runtime from
 * Guidewire's integration credential store or an external
 * vault (e.g. HashiCorp Vault, AWS Secrets Manager).
 */
class CredentialManager {

  private static var _instance : CredentialManager
  private var _credentialStore : Map<String, Credential> = new HashMap<String, Credential>()
  private var _logger : ILogger = Logger.forCategory("Integration.Security.CredentialManager")

  private construct() {}

  public static function getInstance() : CredentialManager {
    if (_instance == null) {
      _instance = new CredentialManager()
    }
    return _instance
  }

  public function registerCredential(pName : String, pCredential : Credential) {
    _credentialStore.put(pName, pCredential)
    _logger.info("Registered credential: ${pName} (type=${pCredential.CredentialType})")
  }

  public function getCredential(pName : String) : Credential {
    var cred = _credentialStore.get(pName)
    if (cred == null) {
      _logger.warn("Credential not found: ${pName}")
    }
    return cred
  }

  public function hasCredential(pName : String) : boolean {
    return _credentialStore.containsKey(pName)
  }

  public static class Credential {
    private var _credentialType : String as CredentialType
    private var _username       : String as Username
    private var _password       : String as Password
    private var _apiKey          : String as ApiKey
    private var _token           : String as Token
    private var _expiresAt       : long   as ExpiresAt = 0

    construct(pType : String) {
      _credentialType = pType
    }

    public property get IsExpired() : boolean {
      return _expiresAt > 0 && java.lang.System.currentTimeMillis() > _expiresAt
    }
  }
}
