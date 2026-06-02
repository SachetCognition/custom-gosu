//
//  IRestServiceEntity.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.integration.service.rest

uses atsynthesize.suite.util.IBaseEntity

/**
 * Marker interface for all REST-based service parameter entities.
 * REST entities are JSON-serializable and carry their own
 * short/long descriptions for logging.
 */
interface IRestServiceEntity extends IBaseEntity {

  /**
   * Returns a JSON-compatible string representation.
   */
  public function toJsonString() : String
}
