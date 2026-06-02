package gw.api.webservice.exception;

/**
 * Stub for Guidewire's BadIdentifierException.
 * Thrown when a provided identifier is not found or is incorrect.
 */
public class BadIdentifierException extends SOAPException {

    public BadIdentifierException() {
        super();
    }

    public BadIdentifierException(String message) {
        super(message);
    }
}
