package gw.api.util;

import gw.util.ILogger;

/**
 * Stub for Guidewire's Logger factory.
 * Creates loggers for different categories in the Guidewire platform.
 */
public class Logger {

    public static ILogger forCategory(String category) {
        return new SimpleLogger(category);
    }

    private static class SimpleLogger implements ILogger {
        private final String category;

        SimpleLogger(String category) {
            this.category = category;
        }

        @Override
        public String getName() {
            return category;
        }

        @Override
        public boolean isDebugEnabled() {
            return true;
        }

        @Override
        public boolean isTraceEnabled() {
            return false;
        }

        @Override
        public boolean isInfoEnabled() {
            return true;
        }

        @Override
        public void trace(Object message) {
        }

        @Override
        public void trace(Object message, Throwable t) {
        }

        @Override
        public void debug(Object message) {
            System.out.println("[DEBUG][" + category + "] " + message);
        }

        @Override
        public void debug(Object message, Throwable t) {
            System.out.println("[DEBUG][" + category + "] " + message);
            if (t != null) t.printStackTrace(System.out);
        }

        @Override
        public void info(Object message) {
            System.out.println("[INFO][" + category + "] " + message);
        }

        @Override
        public void info(Object message, Throwable t) {
            System.out.println("[INFO][" + category + "] " + message);
            if (t != null) t.printStackTrace(System.out);
        }

        @Override
        public void warn(Object message) {
            System.out.println("[WARN][" + category + "] " + message);
        }

        @Override
        public void warn(Object message, Throwable t) {
            System.out.println("[WARN][" + category + "] " + message);
            if (t != null) t.printStackTrace(System.out);
        }

        @Override
        public void error(Object message) {
            System.err.println("[ERROR][" + category + "] " + message);
        }

        @Override
        public void error(Object message, Throwable t) {
            System.err.println("[ERROR][" + category + "] " + message);
            if (t != null) t.printStackTrace(System.err);
        }

        @Override
        public void fatal(Object message) {
            System.err.println("[FATAL][" + category + "] " + message);
        }

        @Override
        public void fatal(Object message, Throwable t) {
            System.err.println("[FATAL][" + category + "] " + message);
            if (t != null) t.printStackTrace(System.err);
        }
    }
}
