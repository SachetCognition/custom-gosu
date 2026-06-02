//
//  TokenManager.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.security

uses java.lang.System

uses gw.api.util.Logger
uses gw.util.ILogger

/**
 * OAuth2 token lifecycle manager. Handles token acquisition,
 * caching and automatic refresh before expiry.
 */
class TokenManager {

  private var _tokenEndpoint   : String as TokenEndpoint
  private var _clientId        : String as ClientId
  private var _scope           : String as Scope
  private var _currentToken    : String
  private var _tokenExpiry     : long   = 0
  private var _refreshToken    : String
  private var _bufferMs        : long   = 60000  // refresh 60s before expiry
  private var _logger          : ILogger

  construct(pName : String) {
    _logger = Logger.forCategory("Integration.Security.TokenManager.${pName}")
  }

  construct(pName : String, pTokenEndpoint : String, pClientId : String) {
    _tokenEndpoint = pTokenEndpoint
    _clientId      = pClientId
    _logger = Logger.forCategory("Integration.Security.TokenManager.${pName}")
  }

  public function getAccessToken() : String {
    if (isTokenValid()) {
      return _currentToken
    }

    _logger.info("Token expired or not yet acquired, refreshing...")
    refreshToken()
    return _currentToken
  }

  public function setToken(pToken : String, pExpiresInSeconds : long) {
    _currentToken = pToken
    _tokenExpiry  = System.currentTimeMillis() + (pExpiresInSeconds * 1000)
    _logger.info("Token set, expires in ${pExpiresInSeconds}s")
  }

  public function setRefreshToken(pRefreshToken : String) {
    _refreshToken = pRefreshToken
  }

  public function invalidateToken() {
    _currentToken = null
    _tokenExpiry  = 0
    _logger.info("Token invalidated")
  }

  private function isTokenValid() : boolean {
    return _currentToken != null &&
           System.currentTimeMillis() < (_tokenExpiry - _bufferMs)
  }

  private function refreshToken() {
    // In production, this would make an HTTP call to _tokenEndpoint
    // using client credentials or refresh token grant
    _logger.info("Refreshing token from ${_tokenEndpoint}")
    // Placeholder for actual OAuth2 token refresh logic
  }
}
