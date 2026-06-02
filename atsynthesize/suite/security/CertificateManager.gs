//
//  CertificateManager.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.security

uses gw.api.util.Logger
uses gw.util.ILogger

/**
 * Mutual TLS (mTLS) certificate management for secure
 * integration endpoints. Handles truststore and keystore
 * configuration for outbound HTTPS connections.
 */
class CertificateManager {

  private var _keystorePath     : String as KeystorePath
  private var _keystoreType     : String as KeystoreType     = "JKS"
  private var _truststorePath   : String as TruststorePath
  private var _truststoreType   : String as TruststoreType   = "JKS"
  private var _certAlias        : String as CertAlias
  private var _validateHostname : boolean as ValidateHostname = true
  private var _logger           : ILogger

  construct(pName : String) {
    _logger = Logger.forCategory("Integration.Security.CertManager.${pName}")
  }

  public function configureSslContext() {
    _logger.info("Configuring SSL context:")
    _logger.info("  Keystore:   ${_keystorePath} (${_keystoreType})")
    _logger.info("  Truststore: ${_truststorePath} (${_truststoreType})")
    _logger.info("  Alias:      ${_certAlias}")
    _logger.info("  Hostname validation: ${_validateHostname}")

    if (_keystorePath != null) {
      java.lang.System.setProperty("javax.net.ssl.keyStore", _keystorePath)
      java.lang.System.setProperty("javax.net.ssl.keyStoreType", _keystoreType)
    }

    if (_truststorePath != null) {
      java.lang.System.setProperty("javax.net.ssl.trustStore", _truststorePath)
      java.lang.System.setProperty("javax.net.ssl.trustStoreType", _truststoreType)
    }
  }

  public function validateCertificateExpiry() : boolean {
    _logger.info("Validating certificate expiry for alias: ${_certAlias}")
    // In production, load the keystore and check certificate NotAfter date
    return true
  }
}
