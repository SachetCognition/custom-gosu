//
//  IIntegrationPlugin.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.plugin

/**
 * Plugin lifecycle interface for integration extensions.
 * Plugins are initialized at startup, can process requests,
 * and are shut down gracefully when the application stops.
 */
interface IIntegrationPlugin {

  property get PluginName() : String

  function initialize() : void

  function isEnabled() : boolean

  function shutdown() : void
}
