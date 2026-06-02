//
//  RestServiceBaseAPI.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.integration.service.rest

uses java.lang.System
uses java.lang.Throwable

uses gw.api.util.Logger
uses gw.util.ILogger

uses atsynthesize.suite.integration.service.exception.IntegrationException
uses atsynthesize.suite.integration.service.exception.ValidationException
uses atsynthesize.suite.integration.service.exception.AuthenticationException
uses atsynthesize.suite.integration.service.exception.RetryableException
uses atsynthesize.suite.integration.service.exception.TimeoutException

/**
 * Base class for RESTful integration service endpoints.
 * Provides the same logging/timing/exception-handling harness
 * as {@link WsiServiceBaseAPI} but for JSON-over-HTTP services.
 *
 * Subclasses implement concrete REST endpoints by calling
 * {@link #restExecute} with appropriate handler blocks.
 */
class RestServiceBaseAPI {

  protected var _logger          : ILogger = null
  protected var _serviceName     : String  = null
  protected var _defaultPageSize : int     = 25

  construct(pServiceName : String) {
    _serviceName = pServiceName
    _logger = Logger.forCategory("Integration.REST.${_serviceName}")
  }

  /**
   * Executes a REST service call with full logging, timing and
   * exception handling.
   */
  protected function restExecute<K, V>(
      pExecuteBlock : block(input : K) : V,
      pInput : K,
      pHttpMethod : RestServiceExecutor.HTTP_METHOD
  ) : RestServiceResponse<V> {
    var startTime = System.currentTimeMillis()
    var response  = new RestServiceResponse<V>()

    try {
      var executor = new RestServiceExecutor<K, V>(
          pExecuteBlock, pInput, pHttpMethod, _logger)
      var result = executor.execute()
      response.Data       = result
      response.Success    = true
      response.StatusCode = (pHttpMethod == RestServiceExecutor.HTTP_METHOD.POST ? 201 : 200)

      _logger.debug(\ -> "${Name}:restExecute() [${pHttpMethod}] - Processed successfully in ${executor.ExecutionTimeMs}ms")

    } catch (ve : ValidationException) {
      response = RestServiceResponse.error<V>(ve.HttpStatus, ve.Message)
      _logger.warn("${Name}:restExecute() - Validation failed: ${ve.Message}")
    } catch (ae : AuthenticationException) {
      response = RestServiceResponse.error<V>(ae.HttpStatus, ae.Message)
      _logger.warn("${Name}:restExecute() - Auth failed: ${ae.Message}")
    } catch (re : RetryableException) {
      response = RestServiceResponse.error<V>(re.HttpStatus, re.Message)
      _logger.warn("${Name}:restExecute() - Retryable error: ${re.Message}")
    } catch (ie : IntegrationException) {
      response = RestServiceResponse.error<V>(ie.HttpStatus, ie.Message)
      _logger.error("${Name}:restExecute() - Integration error: ${ie.Message}")
    } catch (t : Throwable) {
      response = RestServiceResponse.error<V>(500, "Unexpected error: ${t.Message}")
      _logger.error("${Name}:restExecute() - Unexpected error", t)
    }

    if (_logger.InfoEnabled) {
      var elapsed = System.currentTimeMillis() - startTime
      _logger.info("${Name}:restExecute() [${pHttpMethod}] - Time:[${elapsed}ms] Success:[${response.Success}]")
    }

    response.Timestamp = System.currentTimeMillis()
    return response
  }

  /**
   * Convenience for GET operations with no input body.
   */
  protected function restGet<V>(pExecuteBlock : block(input : Object) : V) : RestServiceResponse<V> {
    return restExecute(pExecuteBlock, null, RestServiceExecutor.HTTP_METHOD.GET)
  }

  protected property get Name() : String {
    return "RestServiceBaseAPI[${_serviceName}]"
  }
}
