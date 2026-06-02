//
//  PluginRegistry.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.plugin

uses java.util.Map
uses java.util.HashMap
uses java.util.List
uses java.util.ArrayList

uses gw.api.util.Logger
uses gw.util.ILogger

/**
 * Central plugin registry. Manages plugin lifecycle,
 * registration and lookup by name.
 */
class PluginRegistry {

  private static var _instance : PluginRegistry = new PluginRegistry()
  private var _plugins : Map<String, IIntegrationPlugin> = new HashMap<String, IIntegrationPlugin>()
  private var _logger  : ILogger = Logger.forCategory("Integration.PluginRegistry")

  private construct() {}

  public static function getInstance() : PluginRegistry {
    return _instance
  }

  public function register(pPlugin : IIntegrationPlugin) {
    _plugins.put(pPlugin.PluginName, pPlugin)
    _logger.info("Registered plugin: ${pPlugin.PluginName}")
  }

  public function getPlugin(pName : String) : IIntegrationPlugin {
    return _plugins.get(pName)
  }

  public function getPlugin<T extends IIntegrationPlugin>(pName : String, pType : Type<T>) : T {
    var plugin = _plugins.get(pName)
    if (plugin != null && pType.isAssignableFrom(typeof plugin)) {
      return plugin as T
    }
    return null
  }

  public function initializeAll() {
    for (plugin in _plugins.Values) {
      try {
        plugin.initialize()
        _logger.info("Initialized plugin: ${plugin.PluginName}")
      } catch (t : java.lang.Throwable) {
        _logger.error("Failed to initialize plugin ${plugin.PluginName}: ${t.Message}", t)
      }
    }
  }

  public function shutdownAll() {
    for (plugin in _plugins.Values) {
      try {
        plugin.shutdown()
        _logger.info("Shut down plugin: ${plugin.PluginName}")
      } catch (t : java.lang.Throwable) {
        _logger.error("Failed to shut down plugin ${plugin.PluginName}: ${t.Message}", t)
      }
    }
  }

  public property get RegisteredPlugins() : List<String> {
    return new ArrayList<String>(_plugins.Keys)
  }
}
