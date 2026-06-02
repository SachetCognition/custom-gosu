//
//  MessageTransportBase.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.integration.messaging

uses java.util.List
uses java.util.ArrayList

uses gw.api.util.Logger
uses gw.util.ILogger

/**
 * Base class for message transport plugins (JMS, Kafka, MQ, etc.).
 * Provides handler registration, message dispatch and error handling.
 * Subclasses implement the transport-specific send/receive logic.
 */
abstract class MessageTransportBase {

  protected var _transportName : String              as TransportName
  protected var _handlers      : List<IMessageHandler> = new ArrayList<IMessageHandler>()
  protected var _logger        : ILogger
  protected var _maxRetries    : int                 as MaxRetries = 3

  construct(pTransportName : String) {
    _transportName = pTransportName
    _logger = Logger.forCategory("Integration.Messaging.${pTransportName}")
  }

  public function registerHandler(pHandler : IMessageHandler) {
    _handlers.add(pHandler)
    _logger.info("Registered handler: ${pHandler}")
  }

  public function dispatch(pMessage : MessagePayload) : MessagePayload {
    _logger.debug(\ -> "Dispatching message: ${pMessage}")

    for (handler in _handlers) {
      if (handler.canHandle(pMessage.MessageType)) {
        try {
          var response = handler.handle(pMessage)
          _logger.info("Message ${pMessage.MessageId} handled successfully")
          return response
        } catch (t : java.lang.Throwable) {
          _logger.error("Error handling message ${pMessage.MessageId}: ${t.Message}", t)
          if (pMessage.RetryCount < _maxRetries) {
            pMessage.incrementRetry()
            return dispatch(pMessage)
          }
          throw t
        }
      }
    }

    _logger.warn("No handler found for message type: ${pMessage.MessageType}")
    return null
  }

  abstract function send(pMessage : MessagePayload) : void

  abstract function receive() : MessagePayload
}
