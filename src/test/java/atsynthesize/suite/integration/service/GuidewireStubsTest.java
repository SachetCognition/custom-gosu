package atsynthesize.suite.integration.service;

import gw.api.database.Query;
import gw.api.server.AvailabilityLevel;
import gw.api.util.Logger;
import gw.api.webservice.exception.BadIdentifierException;
import gw.api.webservice.exception.FieldFormatException;
import gw.api.webservice.exception.SOAPException;
import gw.util.ILogger;
import gw.xml.IXmlMixedContent;
import gw.xml.XmlElement;
import gw.xml.ws.WsiInvocationContext;
import gw.xml.ws.annotation.WsiAvailability;
import gw.xml.ws.annotation.WsiExportable;
import gw.xml.ws.annotation.WsiWebService;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Tests for the Guidewire API stubs.
 * Verifies that all stub classes and interfaces are correctly structured
 * and functional enough to support the Gosu code compilation and basic usage.
 */
class GuidewireStubsTest {

    @Test
    void testLoggerCreation() {
        ILogger logger = Logger.forCategory("TestCategory");
        assertNotNull(logger);
        assertTrue(logger.isDebugEnabled());
        assertTrue(logger.isInfoEnabled());
        assertEquals("TestCategory", logger.getName());
    }

    @Test
    void testLoggerInfoAndError() {
        ILogger logger = Logger.forCategory("TestCategory");
        assertDoesNotThrow(() -> logger.info("info message"));
        assertDoesNotThrow(() -> logger.error("error message"));
        assertDoesNotThrow(() -> logger.error("error with cause", new RuntimeException("test")));
        assertDoesNotThrow(() -> logger.warn("warn message"));
        assertDoesNotThrow(() -> logger.debug("debug message"));
    }

    @Test
    void testXmlElementImplementsIXmlMixedContent() {
        XmlElement element = new XmlElement("<test/>");
        assertInstanceOf(IXmlMixedContent.class, element);
    }

    @Test
    void testXmlElementAsUTFString() {
        XmlElement element = new XmlElement("<root><child/></root>");
        assertEquals("<root><child/></root>", element.asUTFString());
    }

    @Test
    void testXmlElementToString() {
        XmlElement element = new XmlElement("content");
        assertEquals("content", element.toString());
    }

    @Test
    void testSOAPExceptionHierarchy() {
        SOAPException soap = new SOAPException("test");
        BadIdentifierException bad = new BadIdentifierException("bad id");
        FieldFormatException field = new FieldFormatException("bad field");

        assertInstanceOf(Exception.class, soap);
        assertInstanceOf(SOAPException.class, bad);
        assertInstanceOf(SOAPException.class, field);
        assertEquals("test", soap.getMessage());
    }

    @Test
    void testAvailabilityLevelEnum() {
        assertNotNull(AvailabilityLevel.MULTIUSER);
        assertNotNull(AvailabilityLevel.MAINTENANCE);
        assertNotNull(AvailabilityLevel.DATABASE);
        assertEquals(3, AvailabilityLevel.values().length);
    }

    @Test
    void testWsiInvocationContext() {
        WsiInvocationContext ctx = new WsiInvocationContext();
        ctx.setHeader("X-Custom", "value");
        assertEquals("value", ctx.getHeader("X-Custom"));
        assertNull(ctx.getHeader("nonexistent"));
    }

    @Test
    void testQueryMakeAndSelect() {
        Query<Object> query = Query.make(Object.class);
        assertNotNull(query);
        Query.QueryResult<Object> result = query.select();
        assertNotNull(result);
        assertEquals(0, result.getCount());
        assertNull(result.getAtMostOneRow());
    }

    @Test
    void testQueryChaining() {
        Query<Object> query = Query.make(Object.class)
                .compare("field", "Equals", "value")
                .compare("other", "GreaterThan", 42);
        assertNotNull(query.select());
    }

    @Test
    void testAnnotationRetention() {
        assertNotNull(WsiWebService.class.getAnnotation(java.lang.annotation.Retention.class));
        assertNotNull(WsiExportable.class.getAnnotation(java.lang.annotation.Retention.class));
        assertNotNull(WsiAvailability.class.getAnnotation(java.lang.annotation.Retention.class));
    }
}
