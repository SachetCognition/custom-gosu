//
//  MessageAcknowledger.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.integration.messaging

uses java.util.Set
uses java.util.HashSet

uses gw.api.util.Logger
uses gw.util.ILogger

/**
 * Reliable message acknowledgment tracker. Records which
 * messages have been successfully processed so they are
 * not re-delivered by the transport layer.
 */
class MessageAcknowledger {

  private var _acknowledgedIds : Set<String> = new HashSet<String>()
  private var _logger          : ILogger

  construct(pName : String) {
    _logger = Logger.forCategory("Integration.MessageAck.${pName}")
  }

  public function acknowledge(pMessageId : String) {
    _acknowledgedIds.add(pMessageId)
    _logger.debug(\ -> "Acknowledged message: ${pMessageId}")
  }

  public function isAcknowledged(pMessageId : String) : boolean {
    return _acknowledgedIds.contains(pMessageId)
  }

  public function reject(pMessageId : String, pReason : String) {
    _logger.warn("Rejected message ${pMessageId}: ${pReason}")
  }

  public property get AcknowledgedCount() : int {
    return _acknowledgedIds.Count
  }
}
