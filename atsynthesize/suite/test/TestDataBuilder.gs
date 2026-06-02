//
//  TestDataBuilder.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.test

uses java.util.Map
uses java.util.HashMap
uses java.util.UUID
uses java.util.Date
uses java.math.BigDecimal

/**
 * Builder pattern utility for creating test entities with
 * sensible defaults. Reduces boilerplate in test setup.
 */
class TestDataBuilder {

  private var _properties : Map<String, Object> = new HashMap<String, Object>()

  construct() {}

  public function withProperty(pKey : String, pValue : Object) : TestDataBuilder {
    _properties.put(pKey, pValue)
    return this
  }

  public function withPublicId() : TestDataBuilder {
    _properties.put("publicId", "pc:" + UUID.randomUUID().toString().substring(0, 8))
    return this
  }

  public function withName(pFirst : String, pLast : String) : TestDataBuilder {
    _properties.put("firstName", pFirst)
    _properties.put("lastName", pLast)
    return this
  }

  public function withAddress(pLine1 : String, pCity : String,
                               pState : String, pZip : String) : TestDataBuilder {
    _properties.put("addressLine1", pLine1)
    _properties.put("city", pCity)
    _properties.put("state", pState)
    _properties.put("postalCode", pZip)
    return this
  }

  public function withAmount(pAmount : double) : TestDataBuilder {
    _properties.put("amount", new BigDecimal(pAmount))
    return this
  }

  public function withDateRange(pStart : Date, pEnd : Date) : TestDataBuilder {
    _properties.put("effectiveDate", pStart)
    _properties.put("expirationDate", pEnd)
    return this
  }

  public function get(pKey : String) : Object {
    return _properties.get(pKey)
  }

  public function getString(pKey : String) : String {
    var val = _properties.get(pKey)
    return val != null ? val.toString() : null
  }

  public function getInt(pKey : String, pDefault : int) : int {
    var val = _properties.get(pKey)
    return val typeis Integer ? val : pDefault
  }

  public property get Properties() : Map<String, Object> {
    return _properties
  }

  public function build() : Map<String, Object> {
    return new HashMap<String, Object>(_properties)
  }
}
