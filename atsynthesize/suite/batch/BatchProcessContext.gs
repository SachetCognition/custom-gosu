//
//  BatchProcessContext.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.batch

uses java.util.UUID
uses java.util.Date

/**
 * Batch execution context carrying job ID, timing, status
 * and counters for processed/skipped/failed items.
 */
class BatchProcessContext {

  public enum BatchStatus { PENDING, RUNNING, COMPLETED, FAILED, CANCELLED }

  private var _jobId          : String      as JobId
  private var _jobName        : String      as JobName
  private var _status         : BatchStatus as Status         = BatchStatus.PENDING
  private var _startTime      : Date        as StartTime
  private var _endTime        : Date        as EndTime
  private var _totalItems     : int         as TotalItems     = 0
  private var _processedItems : int         as ProcessedItems = 0
  private var _skippedItems   : int         as SkippedItems   = 0
  private var _failedItems    : int         as FailedItems    = 0
  private var _lastError      : String      as LastError

  construct(pJobName : String) {
    _jobId   = UUID.randomUUID().toString()
    _jobName = pJobName
  }

  public function markStarted() {
    _status    = BatchStatus.RUNNING
    _startTime = new Date()
  }

  public function markCompleted() {
    _status  = _failedItems > 0 ? BatchStatus.FAILED : BatchStatus.COMPLETED
    _endTime = new Date()
  }

  public function recordProcessed() {
    _processedItems++
  }

  public function recordSkipped() {
    _skippedItems++
  }

  public function recordFailed(pError : String) {
    _failedItems++
    _lastError = pError
  }

  public property get ElapsedMs() : long {
    if (_startTime == null) return 0
    var end = _endTime ?: new Date()
    return end.Time - _startTime.Time
  }

  public property get ProgressPercent() : int {
    if (_totalItems == 0) return 0
    return ((_processedItems + _skippedItems + _failedItems) * 100 / _totalItems)
  }

  override public function toString() : String {
    return "BatchJob[${_jobId}] ${_jobName}: ${_status} - ${_processedItems}/${_totalItems} processed, ${_failedItems} failed (${ElapsedMs}ms)"
  }
}
