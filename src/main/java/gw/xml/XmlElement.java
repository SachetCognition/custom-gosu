package gw.xml;

/**
 * Stub for Guidewire's XmlElement.
 * Represents an XML element that can be serialized to a UTF string.
 */
public class XmlElement implements IXmlMixedContent {

    private String content;

    public XmlElement() {
        this.content = "";
    }

    public XmlElement(String content) {
        this.content = content;
    }

    public String asUTFString() {
        return content != null ? content : "";
    }

    @Override
    public String toString() {
        return asUTFString();
    }
}
