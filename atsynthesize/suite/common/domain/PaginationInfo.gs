//
//  PaginationInfo.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.common.domain

/**
 * Pagination metadata for list-based service requests
 * and responses.
 */
class PaginationInfo {

  private var _page       : int  as Page       = 1
  private var _pageSize   : int  as PageSize   = 25
  private var _totalCount : long as TotalCount = 0
  private var _totalPages : int  as TotalPages = 0

  construct() {}

  construct(pPage : int, pPageSize : int) {
    _page     = pPage
    _pageSize = pPageSize
  }

  construct(pPage : int, pPageSize : int, pTotalCount : long) {
    _page       = pPage
    _pageSize   = pPageSize
    _totalCount = pTotalCount
    _totalPages = (pTotalCount > 0 && pPageSize > 0)
        ? ((pTotalCount + pPageSize - 1) / pPageSize) as int
        : 0
  }

  public property get HasNextPage() : boolean {
    return _page < _totalPages
  }

  public property get HasPreviousPage() : boolean {
    return _page > 1
  }

  public property get Offset() : int {
    return (_page - 1) * _pageSize
  }

  override public function toString() : String {
    return "Page ${_page}/${_totalPages} (${_totalCount} total)"
  }
}
