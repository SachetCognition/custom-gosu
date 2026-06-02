//
//  BatchProcessBase.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.batch

uses java.util.List

uses gw.api.util.Logger
uses gw.util.ILogger

/**
 * Base class for batch jobs. Provides the standard lifecycle
 * (initialize → process items → finalize) with automatic
 * context tracking and error handling.
 *
 * @param <T> the type of items to process
 */
abstract class BatchProcessBase<T> {

  protected var _context   : BatchProcessContext as Context
  protected var _logger    : ILogger
  protected var _batchSize : int                 as BatchSize = 100

  construct(pJobName : String) {
    _context = new BatchProcessContext(pJobName)
    _logger  = Logger.forCategory("Batch.${pJobName}")
  }

  public function execute() : BatchProcessContext {
    _context.markStarted()
    _logger.info("Starting batch job: ${_context.JobName} [${_context.JobId}]")

    try {
      initialize()
      var items = fetchItems()
      _context.TotalItems = items.Count

      _logger.info("Fetched ${items.Count} items to process")

      for (item in items) {
        try {
          if (shouldSkip(item)) {
            _context.recordSkipped()
            continue
          }
          processItem(item)
          _context.recordProcessed()
        } catch (t : java.lang.Throwable) {
          _context.recordFailed(t.Message)
          _logger.error("Error processing item: ${t.Message}", t)
        }
      }

      finalize_batch()
    } catch (t : java.lang.Throwable) {
      _context.LastError = t.Message
      _logger.error("Batch job failed: ${t.Message}", t)
    }

    _context.markCompleted()
    _logger.info("Batch job completed: ${_context}")
    return _context
  }

  protected abstract function initialize() : void
  protected abstract function fetchItems() : List<T>
  protected abstract function processItem(pItem : T) : void

  protected function shouldSkip(pItem : T) : boolean {
    return false
  }

  protected function finalize_batch() : void {
    // override in subclasses for cleanup
  }
}
