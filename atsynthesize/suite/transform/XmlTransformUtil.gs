//
//  XmlTransformUtil.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.transform

uses gw.xml.XmlElement

/**
 * Utility methods for XML-to-entity and entity-to-XML
 * transformations used in SOAP/WS-I integrations.
 */
class XmlTransformUtil {

  public static function getElementText(pRoot : XmlElement,
                                         pElementName : String) : String {
    var child = pRoot.getChild(pElementName)
    return child != null ? child.Text : null
  }

  public static function getElementInt(pRoot : XmlElement,
                                        pElementName : String,
                                        pDefault : int) : int {
    var text = getElementText(pRoot, pElementName)
    if (!text.HasContent) return pDefault
    try {
      return Integer.parseInt(text)
    } catch (e : NumberFormatException) {
      return pDefault
    }
  }

  public static function getElementBoolean(pRoot : XmlElement,
                                            pElementName : String) : boolean {
    var text = getElementText(pRoot, pElementName)
    return "true".equalsIgnoreCase(text) || "1" == text || "Y".equalsIgnoreCase(text)
  }

  public static function setElementText(pRoot : XmlElement,
                                         pElementName : String,
                                         pValue : String) {
    if (pValue != null) {
      var child = new XmlElement(pElementName)
      child.Text = pValue
      pRoot.addChild(child)
    }
  }

  public static function setElementInt(pRoot : XmlElement,
                                        pElementName : String,
                                        pValue : int) {
    setElementText(pRoot, pElementName, pValue as String)
  }

  public static function xmlToString(pElement : XmlElement) : String {
    return pElement != null ? pElement.asUTFString() : ""
  }
}
