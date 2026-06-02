//
//  RestServiceExecutor.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.integration.service.rest

uses gw.util.ILogger
uses java.lang.System

/**
 * Generic REST service executor analogous to {@link WsiServiceExecutor}.
 * Dispatches REST service calls through typed callback blocks and
 * captures timing, input/output descriptions and error handling.
 *
 * @param <K> request/input type
 * @param <V> response/output type
 */
class RestServiceExecutor<K, V> {

  protected enum HTTP_METHOD { GET, POST, PUT, PATCH, DELETE }

  private var _executeBlock  : block(input : K) : V     = null
  private var _input         : K                         = null
  private var _output        : V                         = null
  private var _httpMethod    : HTTP_METHOD                = null
  private var _logger        : ILogger                   = null
  private var _executionTimeMs : long                    = 0

  construct(pExecuteBlock : block(input : K) : V,
            pInput : K,
            pHttpMethod : HTTP_METHOD,
            pLogger : ILogger) {
    _executeBlock = pExecuteBlock
    _input        = pInput
    _httpMethod   = pHttpMethod
    _logger       = pLogger
  }

  public function execute() : V {
    var startTime = System.currentTimeMillis()
    try {
      _output = _executeBlock(_input)
      return _output
    } finally {
      _executionTimeMs = System.currentTimeMillis() - startTime
    }
  }

  public property get Input() : K {
    return _input
  }

  public property get Output() : V {
    return _output
  }

  public property get HttpMethod() : HTTP_METHOD {
    return _httpMethod
  }

  public property get ExecutionTimeMs() : long {
    return _executionTimeMs
  }
}
