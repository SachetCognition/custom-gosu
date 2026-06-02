package atsynthesize.suite.integration.service

uses gw.api.util.Logger
uses gw.xml.XmlElement
uses org.junit.jupiter.api.Test
uses org.junit.jupiter.api.Assertions

/**
 * Gosu-native tests for WsiServiceExecutor.
 */
class WsiServiceExecutorGosuTest {

  @Test
  function testServiceType1ConstructorAndExecute() {
    var logger = Logger.forCategory("Test")
    var input = new XmlElement("<input/>")

    var executor = new WsiServiceExecutor<XmlElement, XmlElement>(
      \ param : XmlElement -> new XmlElement("<output/>"),
      input,
      logger
    )

    Assertions.assertNotNull(executor)
    Assertions.assertNotNull(executor.Input)
    Assertions.assertFalse(executor.Input.isParameterNull())

    executor.execute()
    Assertions.assertNotNull(executor.Output)
    Assertions.assertNotNull(executor.Output.Parameter)
  }

  @Test
  function testServiceType2ArrayInput() {
    var logger = Logger.forCategory("Test")
    var input = new XmlElement[] { new XmlElement("<a/>"), new XmlElement("<b/>") }

    var executor = new WsiServiceExecutor<XmlElement, XmlElement>(
      \ params : XmlElement[] -> new XmlElement("<output-from-array/>"),
      input,
      logger
    )

    Assertions.assertNotNull(executor)
    executor.execute()
    Assertions.assertNotNull(executor.Output)
  }

  @Test
  function testServiceType3ArrayReturn() {
    var logger = Logger.forCategory("Test")
    var input = new XmlElement("<input/>")

    var executor = new WsiServiceExecutor<XmlElement, XmlElement>(
      \ param : XmlElement -> new XmlElement[] { new XmlElement("<out1/>"), new XmlElement("<out2/>") },
      input,
      true,
      logger
    )

    Assertions.assertNotNull(executor)
    executor.execute()
    Assertions.assertNotNull(executor.Output)
    Assertions.assertNotNull(executor.Output.ArrayParameter)
  }
}
