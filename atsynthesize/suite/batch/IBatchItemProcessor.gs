//
//  IBatchItemProcessor.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.batch

/**
 * Per-item processing interface for batch operations.
 * Implementations define how to process a single item
 * within a batch job.
 *
 * @param <T> the type of item to process
 */
interface IBatchItemProcessor<T> {

  function processItem(pItem : T, pContext : BatchProcessContext) : boolean

  function shouldSkip(pItem : T) : boolean
}
