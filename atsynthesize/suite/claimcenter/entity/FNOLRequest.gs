//
//  FNOLRequest.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.claimcenter.entity

uses gw.xml.ws.annotation.WsiExportable
uses java.util.Date
uses java.util.List
uses java.util.ArrayList

uses atsynthesize.suite.integration.service.IWsiServiceEntity

@WsiExportable("http://atsynthesize.com/gw/ws/atsynthesize/suite/claimcenter/entity/FNOLRequest")
final class FNOLRequest implements IWsiServiceEntity {

  private var _policyNumber      : String          as PolicyNumber
  private var _lossDate          : Date            as LossDate
  private var _reportedDate      : Date            as ReportedDate
  private var _lossCause         : String          as LossCause
  private var _lossType          : String          as LossType
  private var _lossDescription   : String          as LossDescription
  private var _lossLocationAddr  : String          as LossLocationAddr
  private var _lossLocationCity  : String          as LossLocationCity
  private var _lossLocationState : String          as LossLocationState
  private var _lossLocationZip   : String          as LossLocationZip
  private var _reporterFirstName : String          as ReporterFirstName
  private var _reporterLastName  : String          as ReporterLastName
  private var _reporterPhone     : String          as ReporterPhone
  private var _reporterRelation  : String          as ReporterRelation
  private var _injuredParties    : List<String>    as InjuredParties = new ArrayList<String>()
  private var _witnessNames      : List<String>    as WitnessNames = new ArrayList<String>()
  private var _policeReportFiled : boolean         as PoliceReportFiled = false
  private var _policeReportNumber : String         as PoliceReportNumber
  private var _estimatedDamage   : java.math.BigDecimal as EstimatedDamage

  override public property get ShortDescription() : String {
    return "[FNOL: policy=${_policyNumber} loss=${_lossDate} cause=${_lossCause}]"
  }

  override public property get LongDescription() : String {
    return "[FNOL: policy=${_policyNumber} loss=${_lossDate} cause=${_lossCause} type=${_lossType} reporter=${_reporterFirstName} ${_reporterLastName} location=${_lossLocationCity},${_lossLocationState}]"
  }
}
