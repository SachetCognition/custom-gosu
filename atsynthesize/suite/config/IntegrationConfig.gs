//
//  IntegrationConfig.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.config

uses java.util.Map
uses java.util.HashMap

/**
 * Externalized configuration holder for integration endpoints.
 * Provides strongly-typed access to endpoint URLs, timeouts,
 * credentials references and feature flags.
 *
 * In production, values are populated from Guidewire's
 * integration parameters or an external config store.
 */
class IntegrationConfig {

  private var _endpointUrl       : String  as EndpointUrl
  private var _connectTimeoutMs  : int     as ConnectTimeoutMs  = 10000
  private var _readTimeoutMs     : int     as ReadTimeoutMs     = 30000
  private var _maxRetries        : int     as MaxRetries        = 3
  private var _retryDelayMs      : long    as RetryDelayMs      = 1000
  private var _authType          : String  as AuthType          = "NONE"
  private var _credentialRef     : String  as CredentialRef
  private var _enabled           : boolean as Enabled           = true
  private var _customProperties  : Map<String, String> as CustomProperties = new HashMap<String, String>()

  construct() {}

  construct(pEndpointUrl : String) {
    _endpointUrl = pEndpointUrl
  }

  public function getCustomProperty(pKey : String) : String {
    return _customProperties.get(pKey)
  }

  public function setCustomProperty(pKey : String, pValue : String) {
    _customProperties.put(pKey, pValue)
  }

  override public function toString() : String {
    return "IntegrationConfig[url=${_endpointUrl}, auth=${_authType}, timeout=${_readTimeoutMs}ms, enabled=${_enabled}]"
  }
}
