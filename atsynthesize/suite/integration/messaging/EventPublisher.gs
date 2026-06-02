//
//  EventPublisher.gs
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
 * Publishes domain events to external systems. Supports
 * multiple transport backends and topic-based routing.
 */
class EventPublisher {

  private var _publisherName : String                      as PublisherName
  private var _transports    : List<MessageTransportBase>  = new ArrayList<MessageTransportBase>()
  private var _logger        : ILogger

  construct(pPublisherName : String) {
    _publisherName = pPublisherName
    _logger = Logger.forCategory("Integration.EventPublisher.${pPublisherName}")
  }

  public function addTransport(pTransport : MessageTransportBase) {
    _transports.add(pTransport)
  }

  public function publish(pEventType : String, pPayload : String) {
    var message = new MessagePayload(pEventType, pPayload)
    message.Source = _publisherName

    for (transport in _transports) {
      try {
        transport.send(message)
        _logger.info("Published event ${pEventType} via ${transport.TransportName}")
      } catch (t : java.lang.Throwable) {
        _logger.error("Failed to publish event ${pEventType} via ${transport.TransportName}: ${t.Message}", t)
      }
    }
  }

  public function publish(pMessage : MessagePayload) {
    pMessage.Source = _publisherName
    for (transport in _transports) {
      try {
        transport.send(pMessage)
      } catch (t : java.lang.Throwable) {
        _logger.error("Failed to publish message ${pMessage.MessageId}: ${t.Message}", t)
      }
    }
  }
}
