//
//  TransformPlugin.gs
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
 * Pluggable data transformation handler. Allows registration
 * of named transformation functions that can be applied to
 * integration payloads before send or after receive.
 */
class TransformPlugin implements IIntegrationPlugin {

  private var _transformers : Map<String, block(String) : String> = new HashMap<String, block(String) : String>()
  private var _enabled      : boolean = true
  private var _logger       : ILogger = Logger.forCategory("Integration.Plugin.Transform")

  construct() {}

  override property get PluginName() : String {
    return "TransformPlugin"
  }

  override function initialize() {
    _logger.info("TransformPlugin initialized with ${_transformers.Count} transformers")
  }

  override function isEnabled() : boolean {
    return _enabled
  }

  override function shutdown() {
    _transformers.clear()
    _logger.info("TransformPlugin shut down")
  }

  public function registerTransformer(pName : String, pTransformer : block(String) : String) {
    _transformers.put(pName, pTransformer)
    _logger.info("Registered transformer: ${pName}")
  }

  public function transform(pName : String, pInput : String) : String {
    var transformer = _transformers.get(pName)
    if (transformer == null) {
      _logger.warn("No transformer found for: ${pName}")
      return pInput
    }
    return transformer(pInput)
  }

  public property get TransformerNames() : java.util.Set<String> {
    return _transformers.Keys
  }
}
