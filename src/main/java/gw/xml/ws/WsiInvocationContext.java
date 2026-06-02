package gw.xml.ws;

/**
 * Stub for Guidewire's WsiInvocationContext.
 * Provides SOAP header handling context for WS-I service invocations.
 */
public class WsiInvocationContext {

    private java.util.Map<String, String> headers;

    public WsiInvocationContext() {
        this.headers = new java.util.HashMap<>();
    }

    public void setHeader(String name, String value) {
        headers.put(name, value);
    }

    public String getHeader(String name) {
        return headers.get(name);
    }
}
