//
//  QuoteResponse.gs
//
//  Initial version created by Hari Kanangi
//  Extended for modernization
//  License: http://www.harikanangi.com/license.txt
//

package atsynthesize.suite.policycenter.entity

uses gw.xml.ws.annotation.WsiExportable
uses java.math.BigDecimal
uses java.util.List
uses java.util.ArrayList

uses atsynthesize.suite.integration.service.IWsiServiceEntity

@WsiExportable("http://atsynthesize.com/gw/ws/atsynthesize/suite/policycenter/entity/QuoteResponse")
final class QuoteResponse implements IWsiServiceEntity {

  private var _quoteId           : String               as QuoteId
  private var _policyNumber      : String               as PolicyNumber
  private var _status            : String               as Status
  private var _totalPremium      : BigDecimal            as TotalPremium
  private var _taxes             : BigDecimal            as Taxes
  private var _fees              : BigDecimal            as Fees
  private var _grandTotal        : BigDecimal            as GrandTotal
  private var _currencyCode      : String               as CurrencyCode = "USD"
  private var _premiumBreakdowns : List<PremiumBreakdown> as PremiumBreakdowns = new ArrayList<PremiumBreakdown>()
  private var _validUntil        : java.util.Date        as ValidUntil
  private var _messages          : List<String>          as Messages = new ArrayList<String>()

  override public property get ShortDescription() : String {
    return "[Quote:${_quoteId} Premium:${_currencyCode} ${_totalPremium} Status:${_status}]"
  }

  override public property get LongDescription() : String {
    return "[Quote:${_quoteId} Policy:${_policyNumber} Premium:${_totalPremium} Taxes:${_taxes} Fees:${_fees} Total:${_grandTotal} Status:${_status}]"
  }
}
