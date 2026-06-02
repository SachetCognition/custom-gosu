package gw.xml.ws.annotation;

import gw.api.server.AvailabilityLevel;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Stub for Guidewire's @WsiAvailability annotation.
 * Specifies the availability level required for a WS-I service.
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface WsiAvailability {
    AvailabilityLevel value();
}
