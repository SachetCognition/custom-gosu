package atsynthesize.suite.integration.service.exception

uses org.junit.jupiter.api.Test
uses org.junit.jupiter.api.Assertions

/**
 * Gosu-native tests for InvalidFieldsException.
 */
class InvalidFieldsExceptionGosuTest {

  @Test
  function testConstructorSetsMessage() {
    var ex = new InvalidFieldsException("TestEntity")
    Assertions.assertEquals("Null/Invalid Values in TestEntity", ex.Message)
  }

  @Test
  function testHasInvalidFieldsInitiallyFalse() {
    var ex = new InvalidFieldsException("TestEntity")
    Assertions.assertFalse(ex.HasInvalidFields)
  }

  @Test
  function testAddInvalidFieldSetsFlag() {
    var ex = new InvalidFieldsException("TestEntity")
    ex.addInvalidField("field1", "value1")
    Assertions.assertTrue(ex.HasInvalidFields)
  }

  @Test
  function testMessageWithInvalidFields() {
    var ex = new InvalidFieldsException("TestEntity")
    ex.addInvalidField("field1", "badValue")
    var msg = ex.Message
    Assertions.assertTrue(msg.contains("TestEntity"))
    Assertions.assertTrue(msg.contains("field1"))
    Assertions.assertTrue(msg.contains("badValue"))
  }

  @Test
  function testMessageWithMultipleInvalidFields() {
    var ex = new InvalidFieldsException("TestEntity")
    ex.addInvalidField("field1", "val1")
    ex.addInvalidField("field2", "val2")
    var msg = ex.Message
    Assertions.assertTrue(msg.contains("field1"))
    Assertions.assertTrue(msg.contains("field2"))
  }

  @Test
  function testAddInvalidFieldWithMessage() {
    var ex = new InvalidFieldsException("TestEntity")
    ex.addInvalidField("field1", "val1", "must be positive")
    var msg = ex.Message
    Assertions.assertTrue(msg.contains("must be positive"))
  }

  @Test
  function testIsSOAPException() {
    var ex = new InvalidFieldsException("TestEntity")
    Assertions.assertTrue(ex typeis gw.api.webservice.exception.SOAPException)
  }
}
