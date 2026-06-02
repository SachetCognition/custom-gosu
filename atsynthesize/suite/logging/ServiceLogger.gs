//
//  ServiceLogger.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.logging

uses java.lang.System
uses java.util.UUID
uses java.util.Map
uses java.util.HashMap

uses gw.api.util.Logger
uses gw.util.ILogger

/**
 * Structured logging wrapper that adds correlation IDs,
 * contextual metadata (user, product, transaction) and
 * elapsed-time tracking to every log entry.
 */
class ServiceLogger {

  private var _logger        : ILogger
  private var _serviceName   : String
  private var _contextMap    : Map<String, String> = new HashMap<String, String>()

  construct(pServiceName : String) {
    _serviceName = pServiceName
    _logger = Logger.forCategory("Integration.${pServiceName}")
  }

  public function withCorrelationId(pCorrelationId : String) : ServiceLogger {
    _contextMap.put("correlationId", pCorrelationId)
    return this
  }

  public function withContext(pKey : String, pValue : String) : ServiceLogger {
    _contextMap.put(pKey, pValue)
    return this
  }

  public function info(pMessage : String) {
    _logger.info(formatMessage("INFO", pMessage))
  }

  public function debug(pMessageBlock : block() : String) {
    if (_logger.DebugEnabled) {
      _logger.debug(formatMessage("DEBUG", pMessageBlock()))
    }
  }

  public function warn(pMessage : String) {
    _logger.warn(formatMessage("WARN", pMessage))
  }

  public function error(pMessage : String, pThrowable : java.lang.Throwable) {
    _logger.error(formatMessage("ERROR", pMessage), pThrowable)
  }

  public function error(pMessage : String) {
    _logger.error(formatMessage("ERROR", pMessage))
  }

  /**
   * Creates a new timing context. Call {@code stop()} on the
   * returned object to log the elapsed time.
   */
  public function startTimer(pOperation : String) : TimingContext {
    return new TimingContext(this, pOperation)
  }

  private function formatMessage(pLevel : String, pMessage : String) : String {
    var ctx = _contextMap.entrySet()
        .map(\ e -> "${e.Key}=${e.Value}")
        .join(" ")
    return "[${_serviceName}] ${ctx.HasContent ? ctx + " " : ""}${pMessage}"
  }

  /**
   * Timing context for measuring operation duration.
   */
  public static class TimingContext {
    private var _logger    : ServiceLogger
    private var _operation : String
    private var _startTime : long

    construct(pLogger : ServiceLogger, pOperation : String) {
      _logger    = pLogger
      _operation = pOperation
      _startTime = System.currentTimeMillis()
    }

    public function stop() : long {
      var elapsed = System.currentTimeMillis() - _startTime
      _logger.info("${_operation} completed in ${elapsed}ms")
      return elapsed
    }
  }
}
