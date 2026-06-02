//
//  CorrelationIdUtil.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.logging

uses java.util.UUID

/**
 * Utility for generating and propagating correlation IDs across
 * service boundaries.  Each inbound request should call
 * {@code generate()} or {@code fromHeader()} at the entry point
 * so downstream calls carry the same trace identifier.
 */
class CorrelationIdUtil {

  private static var _HEADER_NAME : String as HEADER_NAME = "X-Correlation-ID"
  private static var _threadLocal : ThreadLocal<String> = new ThreadLocal<String>()

  /**
   * Generates a new correlation ID and stores it in the thread context.
   */
  public static function generate() : String {
    var id = UUID.randomUUID().toString()
    _threadLocal.set(id)
    return id
  }

  /**
   * Accepts an existing correlation ID (e.g. from an HTTP header)
   * and stores it in the thread context.
   */
  public static function fromHeader(pCorrelationId : String) : String {
    var id = pCorrelationId.HasContent ? pCorrelationId : generate()
    _threadLocal.set(id)
    return id
  }

  /**
   * Returns the current thread's correlation ID, generating one
   * if none has been set.
   */
  public static function current() : String {
    var id = _threadLocal.get()
    if (id == null) {
      id = generate()
    }
    return id
  }

  public static function clear() {
    _threadLocal.remove()
  }
}
