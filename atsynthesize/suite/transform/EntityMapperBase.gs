//
//  EntityMapperBase.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.transform

uses java.util.List
uses java.util.ArrayList
uses java.util.Date
uses java.text.SimpleDateFormat

/**
 * Abstract base mapper providing null-safe helper methods
 * for common type conversions used during entity mapping.
 *
 * @param <S> source type
 * @param <T> target type
 */
abstract class EntityMapperBase<S, T> implements IEntityMapper<S, T> {

  private static var ISO_DATE_FORMAT : String = "yyyy-MM-dd'T'HH:mm:ss.SSSZ"

  protected function nullSafe(pValue : String) : String {
    return pValue ?: ""
  }

  protected function nullSafe(pValue : String, pDefault : String) : String {
    return pValue.HasContent ? pValue : pDefault
  }

  protected function toIsoDate(pDate : Date) : String {
    if (pDate == null) return null
    return new SimpleDateFormat(ISO_DATE_FORMAT).format(pDate)
  }

  protected function fromIsoDate(pDateStr : String) : Date {
    if (!pDateStr.HasContent) return null
    return new SimpleDateFormat(ISO_DATE_FORMAT).parse(pDateStr)
  }

  protected function toInt(pValue : String, pDefault : int) : int {
    if (!pValue.HasContent) return pDefault
    try {
      return Integer.parseInt(pValue)
    } catch (e : NumberFormatException) {
      return pDefault
    }
  }

  protected function toBigDecimal(pValue : String) : java.math.BigDecimal {
    if (!pValue.HasContent) return java.math.BigDecimal.ZERO
    try {
      return new java.math.BigDecimal(pValue)
    } catch (e : NumberFormatException) {
      return java.math.BigDecimal.ZERO
    }
  }

  public function mapList(pSources : List<S>) : List<T> {
    if (pSources == null) return new ArrayList<T>()
    return pSources.map(\ s -> mapToTarget(s)).toList()
  }

  public function mapListToSource(pTargets : List<T>) : List<S> {
    if (pTargets == null) return new ArrayList<S>()
    return pTargets.map(\ t -> mapToSource(t)).toList()
  }
}
