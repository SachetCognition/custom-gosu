package atsynthesize.suite.integration.service;

import atsynthesize.suite.util.IBaseEntity;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Tests for the IBaseEntity interface.
 * Verifies that implementations provide both short and long descriptions.
 */
class IBaseEntityTest {

    @Test
    void testImplementation() {
        IBaseEntity entity = new IBaseEntity() {
            @Override
            public String getShortDescription() {
                return "short";
            }

            @Override
            public String getLongDescription() {
                return "long description";
            }
        };
        assertEquals("short", entity.getShortDescription());
        assertEquals("long description", entity.getLongDescription());
    }
}
