//
//  RestServiceResponse.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.integration.service.rest

uses java.util.List
uses java.util.ArrayList

/**
 * Standardized REST response wrapper with status, data payload,
 * pagination metadata and error details.
 *
 * @param <T> the type of the data payload
 */
class RestServiceResponse<T> {

  private var _statusCode    : int      as StatusCode    = 200
  private var _success       : boolean  as Success       = true
  private var _message       : String   as Message
  private var _data          : T        as Data
  private var _errors        : List<String> as Errors    = new ArrayList<String>()
  private var _totalCount    : long     as TotalCount    = 0
  private var _page          : int      as Page          = 1
  private var _pageSize      : int      as PageSize      = 25
  private var _correlationId : String   as CorrelationId
  private var _timestamp     : long     as Timestamp     = java.lang.System.currentTimeMillis()

  construct() {}

  construct(pData : T) {
    _data = pData
  }

  static function ok<R>(pData : R) : RestServiceResponse<R> {
    var resp = new RestServiceResponse<R>()
    resp.Data       = pData
    resp.StatusCode = 200
    resp.Success    = true
    return resp
  }

  static function created<R>(pData : R) : RestServiceResponse<R> {
    var resp = new RestServiceResponse<R>()
    resp.Data       = pData
    resp.StatusCode = 201
    resp.Success    = true
    return resp
  }

  static function error<R>(pStatusCode : int, pMessage : String) : RestServiceResponse<R> {
    var resp = new RestServiceResponse<R>()
    resp.StatusCode = pStatusCode
    resp.Success    = false
    resp.Message    = pMessage
    return resp
  }

  static function paginated<R>(pData : R, pTotalCount : long,
                                pPage : int, pPageSize : int) : RestServiceResponse<R> {
    var resp = new RestServiceResponse<R>()
    resp.Data       = pData
    resp.TotalCount = pTotalCount
    resp.Page       = pPage
    resp.PageSize   = pPageSize
    resp.StatusCode = 200
    resp.Success    = true
    return resp
  }

  public property get HasErrors() : boolean {
    return _errors.Count > 0
  }

  public function addError(pError : String) {
    _errors.add(pError)
    _success = false
  }
}
