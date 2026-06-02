package gw.xml.ws.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Stub for Guidewire's @WsiWebService annotation.
 * Marks a class as a WS-I compliant web service endpoint.
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface WsiWebService {
    String value();
}
