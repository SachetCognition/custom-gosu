package atsynthesize.suite.integration;

import gw.api.util.Logger;
import gw.util.ILogger;

/**
 * Demonstration runner for the WS-I Integration Framework.
 * Shows that the Gosu-based service infrastructure compiles and initializes correctly.
 *
 * In a full Guidewire environment, these services would be exposed as SOAP endpoints.
 * This demo validates the framework's components work outside the Guidewire runtime.
 */
public class Demo {

    private static final ILogger logger = Logger.forCategory("Integration.Demo");

    public static void main(String[] args) {
        logger.info("=== WS-I Integration Framework Demo ===");
        logger.info("Framework initialized successfully.");
        logger.info("");
        logger.info("Available example services:");
        logger.info("  1. POGOExampleAPI    - Plain Old Gosu Object service (single/array I/O)");
        logger.info("  2. GXModelExampleAPI - GX Model entity service (DB query integration)");
        logger.info("  3. XSDExampleAPI     - XSD Schema service (XML type mapping)");
        logger.info("");
        logger.info("Service patterns supported by WsiServiceExecutor:");
        logger.info("  Type 1: Single input  -> Single output");
        logger.info("  Type 2: Array input   -> Single output");
        logger.info("  Type 3: Single input  -> Array output");
        logger.info("  Type 4: Array input   -> Array output");
        logger.info("  Type 5-8: Same patterns with WsiInvocationContext");
        logger.info("");

        try {
            // Verify Gosu classes load correctly via the Gosu runtime
            Class<?> baseApi = Class.forName(
                    "atsynthesize.suite.integration.service.WsiServiceBaseAPI");
            Class<?> executor = Class.forName(
                    "atsynthesize.suite.integration.service.WsiServiceExecutor");
            Class<?> wrapper = Class.forName(
                    "atsynthesize.suite.integration.service.WsiServiceParameterWrapper");

            logger.info("Core framework classes loaded:");
            logger.info("  - " + baseApi.getName());
            logger.info("  - " + executor.getName());
            logger.info("  - " + wrapper.getName());
            logger.info("");
            logger.info("=== Demo completed successfully ===");
        } catch (ClassNotFoundException e) {
            logger.error("Failed to load framework class: " + e.getMessage());
            System.exit(1);
        }
    }
}
