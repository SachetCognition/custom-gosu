package gw.xml.ws.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Stub for Guidewire's @WsiExportable annotation.
 * Marks a class as exportable for XML serialization in WS-I services.
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface WsiExportable {
    String value();
}
