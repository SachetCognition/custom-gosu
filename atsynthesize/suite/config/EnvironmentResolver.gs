//
//  EnvironmentResolver.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.config

uses java.util.Map
uses java.util.HashMap

/**
 * Environment-aware configuration resolver.
 * Maps logical environment names (dev, staging, prod) to
 * concrete {@link IntegrationConfig} instances, enabling
 * environment-specific endpoint URLs, timeouts and auth.
 */
class EnvironmentResolver {

  public enum Environment { DEV, STAGING, UAT, PROD }

  private var _configs : Map<Environment, IntegrationConfig> = new HashMap<Environment, IntegrationConfig>()
  private var _currentEnv : Environment as CurrentEnvironment = Environment.DEV

  construct() {}

  construct(pCurrentEnv : Environment) {
    _currentEnv = pCurrentEnv
  }

  public function registerConfig(pEnv : Environment, pConfig : IntegrationConfig) {
    _configs.put(pEnv, pConfig)
  }

  public function resolve() : IntegrationConfig {
    var config = _configs.get(_currentEnv)
    if (config == null) {
      throw new IllegalStateException("No IntegrationConfig registered for environment: ${_currentEnv}")
    }
    return config
  }

  public function resolve(pEnv : Environment) : IntegrationConfig {
    var config = _configs.get(pEnv)
    if (config == null) {
      throw new IllegalStateException("No IntegrationConfig registered for environment: ${pEnv}")
    }
    return config
  }
}
