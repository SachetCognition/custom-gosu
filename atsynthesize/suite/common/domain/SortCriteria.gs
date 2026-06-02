//
//  SortCriteria.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.common.domain

uses java.util.List
uses java.util.ArrayList

/**
 * Multi-field sorting specification for list queries.
 * Each entry pairs a field name with a direction.
 */
class SortCriteria {

  public enum Direction { ASC, DESC }

  private var _sortFields : List<SortField> as SortFields = new ArrayList<SortField>()

  construct() {}

  public function addSort(pFieldName : String, pDirection : Direction) : SortCriteria {
    _sortFields.add(new SortField(pFieldName, pDirection))
    return this
  }

  public function addAsc(pFieldName : String) : SortCriteria {
    return addSort(pFieldName, Direction.ASC)
  }

  public function addDesc(pFieldName : String) : SortCriteria {
    return addSort(pFieldName, Direction.DESC)
  }

  public static class SortField {
    private var _fieldName : String    as FieldName
    private var _direction : Direction as SortDirection

    construct(pFieldName : String, pDirection : Direction) {
      _fieldName = pFieldName
      _direction = pDirection
    }

    override public function toString() : String {
      return "${_fieldName} ${_direction}"
    }
  }
}
