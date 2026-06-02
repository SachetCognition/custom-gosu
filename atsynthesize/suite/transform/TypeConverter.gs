//
//  TypeConverter.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.transform

uses java.util.Date
uses java.text.SimpleDateFormat
uses java.math.BigDecimal
uses java.math.RoundingMode

/**
 * Utility class providing common type conversions used
 * across integration mappers: dates, currencies, codes,
 * boolean representations, etc.
 */
class TypeConverter {

  public static var DATE_FORMAT_ISO     : String = "yyyy-MM-dd"
  public static var DATETIME_FORMAT_ISO : String = "yyyy-MM-dd'T'HH:mm:ss"
  public static var DATE_FORMAT_GW      : String = "MM/dd/yyyy"

  public static function dateToString(pDate : Date, pFormat : String) : String {
    if (pDate == null) return null
    return new SimpleDateFormat(pFormat).format(pDate)
  }

  public static function stringToDate(pDateStr : String, pFormat : String) : Date {
    if (!pDateStr.HasContent) return null
    return new SimpleDateFormat(pFormat).parse(pDateStr)
  }

  public static function toMoney(pAmount : double, pScale : int) : BigDecimal {
    return new BigDecimal(pAmount).setScale(pScale, RoundingMode.HALF_UP)
  }

  public static function toMoney(pAmount : String) : BigDecimal {
    if (!pAmount.HasContent) return BigDecimal.ZERO
    return new BigDecimal(pAmount.replaceAll("[^\\d.-]", ""))
        .setScale(2, RoundingMode.HALF_UP)
  }

  public static function boolToYN(pValue : boolean) : String {
    return pValue ? "Y" : "N"
  }

  public static function ynToBool(pValue : String) : boolean {
    return "Y".equalsIgnoreCase(pValue) || "YES".equalsIgnoreCase(pValue) ||
           "TRUE".equalsIgnoreCase(pValue) || "1" == pValue
  }

  public static function truncate(pValue : String, pMaxLength : int) : String {
    if (pValue == null || pValue.length <= pMaxLength) return pValue
    return pValue.substring(0, pMaxLength)
  }

  public static function padLeft(pValue : String, pLength : int, pPadChar : char) : String {
    if (pValue == null) pValue = ""
    while (pValue.length < pLength) {
      pValue = "${pPadChar}${pValue}"
    }
    return pValue
  }
}
