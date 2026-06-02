package atsynthesize.suite.integration.service

uses gw.xml.XmlElement
uses org.junit.jupiter.api.Test
uses org.junit.jupiter.api.Assertions

/**
 * Gosu-native tests for WsiServiceParameterWrapper.
 */
class WsiServiceParameterWrapperGosuTest {

  @Test
  function testSingleParameterNotNull() {
    var element = new XmlElement("<test/>")
    var wrapper = new WsiServiceParameterWrapper<XmlElement>(element)
    Assertions.assertFalse(wrapper.isParameterNull())
  }

  @Test
  function testSingleNullParameterIsNull() {
    var wrapper = new WsiServiceParameterWrapper<XmlElement>(null as XmlElement)
    Assertions.assertTrue(wrapper.isParameterNull())
  }

  @Test
  function testArrayParameterNotNull() {
    var elements = new XmlElement[] { new XmlElement("<a/>"), new XmlElement("<b/>") }
    var wrapper = new WsiServiceParameterWrapper<XmlElement>(elements)
    Assertions.assertFalse(wrapper.isParameterNull())
    Assertions.assertTrue(wrapper.IsListParameter)
  }

  @Test
  function testArrayNullParameterIsNull() {
    var wrapper = new WsiServiceParameterWrapper<XmlElement>(null as XmlElement[])
    Assertions.assertTrue(wrapper.isParameterNull())
    Assertions.assertTrue(wrapper.IsListParameter)
  }

  @Test
  function testGetParameter() {
    var element = new XmlElement("<test/>")
    var wrapper = new WsiServiceParameterWrapper<XmlElement>(element)
    Assertions.assertEquals(element, wrapper.Parameter)
    Assertions.assertFalse(wrapper.IsListParameter)
  }

  @Test
  function testGetArrayParameter() {
    var elements = new XmlElement[] { new XmlElement("<a/>") }
    var wrapper = new WsiServiceParameterWrapper<XmlElement>(elements)
    Assertions.assertArrayEquals(elements, wrapper.ArrayParameter)
    Assertions.assertTrue(wrapper.IsListParameter)
  }

  @Test
  function testShortDescriptionForXmlElement() {
    var element = new XmlElement("<test/>")
    var wrapper = new WsiServiceParameterWrapper<XmlElement>(element)
    var desc = wrapper.ShortDescription
    Assertions.assertNotNull(desc)
    Assertions.assertTrue(desc.contains("<test/>"))
  }

  @Test
  function testLongDescriptionForXmlElement() {
    var element = new XmlElement("<test>content</test>")
    var wrapper = new WsiServiceParameterWrapper<XmlElement>(element)
    var desc = wrapper.LongDescription
    Assertions.assertNotNull(desc)
    Assertions.assertTrue(desc.contains("<test>content</test>"))
  }

  @Test
  function testDescriptionForNullParameter() {
    var wrapper = new WsiServiceParameterWrapper<XmlElement>(null as XmlElement)
    // Null parameter yields null description (no content to describe)
    var desc = wrapper.ShortDescription
    Assertions.assertNull(desc)
  }

  @Test
  function testDescriptionForEmptyArray() {
    var elements = new XmlElement[0]
    var wrapper = new WsiServiceParameterWrapper<XmlElement>(elements)
    var desc = wrapper.ShortDescription
    Assertions.assertNotNull(desc)
  }
}
