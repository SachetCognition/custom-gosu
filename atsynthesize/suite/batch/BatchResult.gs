//
//  BatchResult.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.batch

uses java.util.List
uses java.util.ArrayList

/**
 * Summary of a batch job execution with per-item results
 * and aggregate statistics.
 */
class BatchResult {

  private var _jobId          : String       as JobId
  private var _jobName        : String       as JobName
  private var _success        : boolean      as Success        = true
  private var _totalProcessed : int          as TotalProcessed = 0
  private var _totalFailed    : int          as TotalFailed    = 0
  private var _totalSkipped   : int          as TotalSkipped   = 0
  private var _elapsedMs      : long         as ElapsedMs      = 0
  private var _errors         : List<String> as Errors         = new ArrayList<String>()

  construct() {}

  construct(pContext : BatchProcessContext) {
    _jobId          = pContext.JobId
    _jobName        = pContext.JobName
    _success        = pContext.FailedItems == 0
    _totalProcessed = pContext.ProcessedItems
    _totalFailed    = pContext.FailedItems
    _totalSkipped   = pContext.SkippedItems
    _elapsedMs      = pContext.ElapsedMs
  }

  public function addError(pError : String) {
    _errors.add(pError)
    _success = false
  }

  override public function toString() : String {
    return "BatchResult[${_jobName}]: processed=${_totalProcessed}, failed=${_totalFailed}, skipped=${_totalSkipped}, elapsed=${_elapsedMs}ms"
  }
}
