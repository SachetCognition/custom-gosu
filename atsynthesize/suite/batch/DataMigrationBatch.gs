//
//  DataMigrationBatch.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.batch

uses java.util.List
uses java.util.ArrayList
uses java.util.Map
uses java.util.HashMap

/**
 * Example batch job for migrating legacy policy data.
 * Demonstrates the BatchProcessBase lifecycle with
 * fetch, transform and persist phases.
 */
class DataMigrationBatch extends BatchProcessBase<Map<String, String>> {

  private var _sourceSystem  : String as SourceSystem
  private var _targetSystem  : String as TargetSystem
  private var _migrationData : List<Map<String, String>> = new ArrayList<Map<String, String>>()

  construct() {
    super("DataMigration")
  }

  construct(pSourceSystem : String, pTargetSystem : String) {
    super("DataMigration_${pSourceSystem}_to_${pTargetSystem}")
    _sourceSystem = pSourceSystem
    _targetSystem = pTargetSystem
  }

  override protected function initialize() {
    _logger.info("Initializing migration from ${_sourceSystem} to ${_targetSystem}")
  }

  override protected function fetchItems() : List<Map<String, String>> {
    // In production, this would query the source system
    _logger.info("Fetching records from ${_sourceSystem}")
    return _migrationData
  }

  override protected function processItem(pItem : Map<String, String>) {
    var sourceId = pItem.get("sourceId")
    _logger.debug(\ -> "Migrating record: ${sourceId}")
    // In production: transform and persist to target system
  }

  override protected function shouldSkip(pItem : Map<String, String>) : boolean {
    return pItem == null || pItem.isEmpty()
  }

  override protected function finalize_batch() {
    _logger.info("Migration finalized. ${Context.ProcessedItems} records migrated.")
  }

  public function addMigrationRecord(pRecord : Map<String, String>) {
    _migrationData.add(pRecord)
  }
}
