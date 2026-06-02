//
//  IEntityMapper.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.transform

/**
 * Generic entity mapper interface for converting between
 * domain entities and integration DTOs.
 *
 * @param <S> source type
 * @param <T> target type
 */
interface IEntityMapper<S, T> {

  function mapToTarget(pSource : S) : T

  function mapToSource(pTarget : T) : S
}
