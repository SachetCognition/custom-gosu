package gw.api.webservice.exception;

/**
 * Stub for Guidewire's SOAPException.
 * Base exception for all SOAP-related errors in WS-I services.
 */
public class SOAPException extends Exception {

    public SOAPException() {
        super();
    }

    public SOAPException(String message) {
        super(message);
    }

    public SOAPException(String message, Throwable cause) {
        super(message, cause);
    }
}
