//
//  IMessageHandler.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.integration.messaging

/**
 * Handler interface for processing inbound messages.
 * Implementations define how to handle a specific message type
 * from the message transport layer.
 */
interface IMessageHandler {

  function canHandle(pMessageType : String) : boolean

  function handle(pMessage : MessagePayload) : MessagePayload
}
