//
//  MessagePayload.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.integration.messaging

uses java.util.Map
uses java.util.HashMap
uses java.util.UUID

/**
 * Standardized message envelope for asynchronous integration.
 * Wraps a payload with metadata (message ID, correlation ID,
 * timestamp, headers) for reliable message transport.
 */
class MessagePayload {

  private var _messageId     : String              as MessageId
  private var _correlationId : String              as CorrelationId
  private var _messageType   : String              as MessageType
  private var _source        : String              as Source
  private var _destination   : String              as Destination
  private var _payload       : String              as Payload
  private var _timestamp     : long                as Timestamp
  private var _headers       : Map<String, String> as Headers = new HashMap<String, String>()
  private var _retryCount    : int                 as RetryCount = 0

  construct() {
    _messageId = UUID.randomUUID().toString()
    _timestamp = java.lang.System.currentTimeMillis()
  }

  construct(pMessageType : String, pPayload : String) {
    _messageId   = UUID.randomUUID().toString()
    _timestamp   = java.lang.System.currentTimeMillis()
    _messageType = pMessageType
    _payload     = pPayload
  }

  public function addHeader(pKey : String, pValue : String) : MessagePayload {
    _headers.put(pKey, pValue)
    return this
  }

  public function incrementRetry() : MessagePayload {
    _retryCount++
    return this
  }

  override public function toString() : String {
    return "MessagePayload[id=${_messageId}, type=${_messageType}, src=${_source}, dst=${_destination}]"
  }
}
