// Guidewire InsuranceSuite Demo — Frontend Application
const API = '/api/v1';

// ── Utilities ────────────────────────────────────────────
function fmt$(v) {
  if (v == null) return '—';
  return '$' + Number(v).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function fmtDate(d) { return d || '—'; }
function fmtNum(v) { return v != null ? Number(v).toLocaleString() : '—'; }
function escHtml(s) { return s ? String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') : ''; }

function statusBadge(status) {
  if (!status) return '';
  var cls = 'gw-badge gw-badge-' + status.toLowerCase().replace(/\s+/g, '');
  return '<span class="' + cls + '">' + escHtml(status) + '</span>';
}

async function apiFetch(url) {
  try {
    var res = await fetch(url);
    if (!res.ok) throw new Error(res.status);
    return await res.json();
  } catch (e) {
    console.error('API error:', url, e);
    return null;
  }
}

// ── Navigation ───────────────────────────────────────────
document.querySelectorAll('.gw-nav-item').forEach(function(item) {
  item.addEventListener('click', function() {
    showScreen(this.dataset.screen);
  });
});

function showScreen(name) {
  document.querySelectorAll('.gw-nav-item').forEach(function(n) { n.classList.remove('active'); });
  document.querySelectorAll('.gw-screen').forEach(function(s) { s.classList.remove('active'); });
  var navItem = document.querySelector('[data-screen="' + name + '"]');
  if (navItem) navItem.classList.add('active');
  var screen = document.getElementById('screen-' + name);
  if (screen) screen.classList.add('active');

  if (name === 'dashboard') loadDashboard();
  else if (name === 'policies') { hidePolicyDetail(); loadPolicies(0); }
  else if (name === 'claims') { hideClaimDetail(); loadClaims(0); }
  else if (name === 'billing') { hideBillingDetail(); loadBilling(0); }
  else if (name === 'contacts') { hideContactDetail(); loadContacts(0); }
}

// ── Dashboard ────────────────────────────────────────────
async function loadDashboard() {
  var data = await apiFetch(API + '/dashboard/summary');
  if (!data) return;

  var p = data.policies || {};
  var c = data.claims || {};
  var b = data.billing || {};
  var ct = data.contacts || {};

  document.getElementById('nav-policy-count').textContent = fmtNum(p.total);
  document.getElementById('nav-claim-count').textContent = fmtNum(c.total);
  document.getElementById('nav-billing-count').textContent = fmtNum(b.totalAccounts);
  document.getElementById('nav-contact-count').textContent = fmtNum(ct.total);

  var kpiHtml = '' +
    '<div class="gw-kpi-card policies">' +
      '<div class="gw-kpi-label">Total Policies</div>' +
      '<div class="gw-kpi-value">' + fmtNum(p.total) + '</div>' +
      '<div class="gw-kpi-detail">' +
        '<span><span class="dot green"></span> InForce: ' + fmtNum(p.inForce) + '</span>' +
        '<span><span class="dot red"></span> Cancelled: ' + fmtNum(p.cancelled) + '</span>' +
      '</div>' +
    '</div>' +
    '<div class="gw-kpi-card claims">' +
      '<div class="gw-kpi-label">Total Claims</div>' +
      '<div class="gw-kpi-value">' + fmtNum(c.total) + '</div>' +
      '<div class="gw-kpi-detail">' +
        '<span><span class="dot green"></span> Open: ' + fmtNum(c.open) + '</span>' +
        '<span><span class="dot red"></span> Closed: ' + fmtNum(c.closed) + '</span>' +
      '</div>' +
    '</div>' +
    '<div class="gw-kpi-card billing">' +
      '<div class="gw-kpi-label">Billing Accounts</div>' +
      '<div class="gw-kpi-value">' + fmtNum(b.totalAccounts) + '</div>' +
      '<div class="gw-kpi-detail">' +
        '<span><span class="dot blue"></span> Active accounts</span>' +
      '</div>' +
    '</div>' +
    '<div class="gw-kpi-card contacts">' +
      '<div class="gw-kpi-label">Contacts</div>' +
      '<div class="gw-kpi-value">' + fmtNum(ct.total) + '</div>' +
      '<div class="gw-kpi-detail">' +
        '<span><span class="dot blue"></span> Persons &amp; Companies</span>' +
      '</div>' +
    '</div>';
  document.getElementById('dashboard-kpis').innerHTML = kpiHtml;

  // Charts
  var chartsHtml = '' +
    '<div class="gw-chart-card">' +
      '<div class="gw-chart-title">Policy Status Distribution</div>' +
      buildDonutSVG([
        { label: 'InForce', value: p.inForce || 0, color: '#28a745' },
        { label: 'Cancelled', value: p.cancelled || 0, color: '#dc3545' },
        { label: 'Other', value: (p.total||0) - (p.inForce||0) - (p.cancelled||0), color: '#f0ad4e' }
      ]) +
    '</div>' +
    '<div class="gw-chart-card">' +
      '<div class="gw-chart-title">Claims Overview</div>' +
      buildDonutSVG([
        { label: 'Open', value: c.open || 0, color: '#17a2b8' },
        { label: 'Closed', value: c.closed || 0, color: '#6c757d' },
        { label: 'Other', value: (c.total||0) - (c.open||0) - (c.closed||0), color: '#f0ad4e' }
      ]) +
    '</div>';
  document.getElementById('dashboard-charts').innerHTML = chartsHtml;

  // Recent policies
  var recentData = await apiFetch(API + '/policies?page=0&size=5');
  if (recentData && recentData.content) {
    var tbody = document.querySelector('#dashboard-recent-policies tbody');
    tbody.innerHTML = recentData.content.map(function(p) {
      return '<tr onclick="showScreen(\'policies\')">' +
        '<td><strong>' + escHtml(p.policyNumber) + '</strong></td>' +
        '<td>' + escHtml(p.productName) + '</td>' +
        '<td>' + escHtml(p.primaryInsuredName) + '</td>' +
        '<td>' + statusBadge(p.status) + '</td>' +
        '<td class="gw-money">' + fmt$(p.totalPremium) + '</td>' +
      '</tr>';
    }).join('');
  }
}

function buildDonutSVG(segments) {
  var total = segments.reduce(function(s, seg) { return s + seg.value; }, 0);
  if (total === 0) return '<div style="text-align:center;color:#999">No data</div>';
  var cx = 80, cy = 80, r = 60, r2 = 35;
  var paths = '', angle = -90, legendHtml = '';

  segments.forEach(function(seg) {
    if (seg.value === 0) return;
    var pct = seg.value / total;
    var sweep = pct * 360;
    var startAngle = angle * Math.PI / 180;
    var endAngle = (angle + sweep) * Math.PI / 180;
    var large = sweep > 180 ? 1 : 0;

    var x1o = cx + r * Math.cos(startAngle), y1o = cy + r * Math.sin(startAngle);
    var x2o = cx + r * Math.cos(endAngle), y2o = cy + r * Math.sin(endAngle);
    var x1i = cx + r2 * Math.cos(endAngle), y1i = cy + r2 * Math.sin(endAngle);
    var x2i = cx + r2 * Math.cos(startAngle), y2i = cy + r2 * Math.sin(startAngle);

    paths += '<path d="M' + x1o + ' ' + y1o + ' A' + r + ' ' + r + ' 0 ' + large + ' 1 ' + x2o + ' ' + y2o +
             ' L' + x1i + ' ' + y1i + ' A' + r2 + ' ' + r2 + ' 0 ' + large + ' 0 ' + x2i + ' ' + y2i + ' Z" fill="' + seg.color + '"/>';
    angle += sweep;

    legendHtml += '<div class="gw-chart-legend-item"><span class="gw-legend-dot" style="background:' + seg.color + '"></span>' +
                  escHtml(seg.label) + ': ' + fmtNum(seg.value) + ' (' + Math.round(pct * 100) + '%)</div>';
  });

  return '<div class="gw-donut-chart"><svg viewBox="0 0 160 160">' + paths +
         '<text x="80" y="78" text-anchor="middle" font-size="18" font-weight="700" fill="#1a3a5c">' + fmtNum(total) + '</text>' +
         '<text x="80" y="95" text-anchor="middle" font-size="10" fill="#999">Total</text>' +
         '</svg></div><div class="gw-chart-legend">' + legendHtml + '</div>';
}

// ── PolicyCenter ─────────────────────────────────────────
var policyPage = 0;
async function loadPolicies(page) {
  policyPage = page;
  var tbody = document.getElementById('policy-table-body');
  tbody.innerHTML = '<tr><td colspan="9" class="gw-loading"><div class="gw-spinner"></div> Loading…</td></tr>';

  var url = API + '/policies?page=' + page + '&size=15';
  var data = await apiFetch(url);
  if (!data || !data.content) { tbody.innerHTML = '<tr><td colspan="9">No data</td></tr>'; return; }

  tbody.innerHTML = data.content.map(function(p) {
    return '<tr onclick="showPolicyDetail(\'' + escHtml(p.policyNumber) + '\')">' +
      '<td><strong>' + escHtml(p.policyNumber) + '</strong></td>' +
      '<td>' + escHtml(p.productName) + '</td>' +
      '<td>' + escHtml(p.primaryInsuredName) + '</td>' +
      '<td>' + statusBadge(p.status) + '</td>' +
      '<td>' + fmtDate(p.effectiveDate) + '</td>' +
      '<td>' + fmtDate(p.expirationDate) + '</td>' +
      '<td class="gw-money">' + fmt$(p.totalPremium) + '</td>' +
      '<td>' + escHtml(p.agentName) + '</td>' +
      '<td>' + escHtml(p.uwCompany) + '</td>' +
    '</tr>';
  }).join('');

  renderPagination('policy-pagination', data, loadPolicies);
}

async function searchPolicies() {
  var q = document.getElementById('policy-search').value.trim();
  if (!q) { loadPolicies(0); return; }
  var tbody = document.getElementById('policy-table-body');
  tbody.innerHTML = '<tr><td colspan="9" class="gw-loading"><div class="gw-spinner"></div> Searching…</td></tr>';

  var data = await apiFetch(API + '/policies/search?insuredName=' + encodeURIComponent(q));
  if (!data || !Array.isArray(data) || data.length === 0) {
    tbody.innerHTML = '<tr><td colspan="9" style="text-align:center;padding:20px">No policies found for "' + escHtml(q) + '"</td></tr>';
    document.getElementById('policy-pagination').innerHTML = '';
    return;
  }

  tbody.innerHTML = data.map(function(p) {
    return '<tr onclick="showPolicyDetail(\'' + escHtml(p.policyNumber) + '\')">' +
      '<td><strong>' + escHtml(p.policyNumber) + '</strong></td>' +
      '<td>' + escHtml(p.productName) + '</td>' +
      '<td>' + escHtml(p.primaryInsuredName) + '</td>' +
      '<td>' + statusBadge(p.status) + '</td>' +
      '<td>' + fmtDate(p.effectiveDate) + '</td>' +
      '<td>' + fmtDate(p.expirationDate) + '</td>' +
      '<td class="gw-money">' + fmt$(p.totalPremium) + '</td>' +
      '<td>' + escHtml(p.agentName) + '</td>' +
      '<td>' + escHtml(p.uwCompany) + '</td>' +
    '</tr>';
  }).join('');
  document.getElementById('policy-pagination').innerHTML = '<span>' + data.length + ' result(s)</span>';
}

async function showPolicyDetail(policyNumber) {
  document.getElementById('policy-list-view').style.display = 'none';
  var detailView = document.getElementById('policy-detail-view');
  detailView.classList.add('visible');

  var p = await apiFetch(API + '/policies/' + encodeURIComponent(policyNumber));
  if (!p) return;

  document.getElementById('policy-detail-title').innerHTML = 'Policy: ' + escHtml(p.policyNumber) + ' ' + statusBadge(p.status);
  document.getElementById('policy-detail-content').innerHTML = '' +
    '<div class="gw-detail-section">' +
      '<div class="gw-detail-section-header">Policy Information</div>' +
      '<div class="gw-detail-section-body">' +
        detailRow('Policy Number', p.policyNumber) +
        detailRow('Public ID', p.publicId) +
        detailRow('Product', p.productName + ' (' + p.productCode + ')') +
        detailRow('Status', p.status) +
        detailRow('Term Number', p.termNumber) +
        detailRow('UW Company', p.uwCompany) +
      '</div>' +
    '</div>' +
    '<div class="gw-detail-section">' +
      '<div class="gw-detail-section-header">Dates & Premium</div>' +
      '<div class="gw-detail-section-body">' +
        detailRow('Effective Date', p.effectiveDate) +
        detailRow('Expiration Date', p.expirationDate) +
        detailRow('Cancellation Date', p.cancellationDate || 'N/A') +
        detailRow('Total Premium', fmt$(p.totalPremium)) +
        detailRow('Currency', p.currencyCode) +
      '</div>' +
    '</div>' +
    '<div class="gw-detail-section">' +
      '<div class="gw-detail-section-header">Insured & Agent</div>' +
      '<div class="gw-detail-section-body">' +
        detailRow('Primary Insured', p.primaryInsuredName) +
        detailRow('Insured ID', p.primaryInsuredId) +
        detailRow('Agent', p.agentName) +
        detailRow('Agent Code', p.agentCode) +
      '</div>' +
    '</div>' +
    '<div class="gw-detail-section">' +
      '<div class="gw-detail-section-header">Audit</div>' +
      '<div class="gw-detail-section-body">' +
        detailRow('Created', fmtDateTime(p.createdDate)) +
        detailRow('Modified', fmtDateTime(p.modifiedDate)) +
        detailRow('Internal ID', p.id) +
      '</div>' +
    '</div>';
}

function hidePolicyDetail() {
  document.getElementById('policy-list-view').style.display = 'block';
  document.getElementById('policy-detail-view').classList.remove('visible');
}

// ── ClaimCenter ──────────────────────────────────────────
async function loadClaims(page) {
  var tbody = document.getElementById('claim-table-body');
  tbody.innerHTML = '<tr><td colspan="10" class="gw-loading"><div class="gw-spinner"></div> Loading…</td></tr>';

  var url = API + '/claims?page=' + page + '&size=15';
  var data = await apiFetch(url);
  if (!data || !data.content) { tbody.innerHTML = '<tr><td colspan="10">No data</td></tr>'; return; }

  tbody.innerHTML = data.content.map(function(c) {
    return '<tr onclick="showClaimDetail(\'' + escHtml(c.claimNumber) + '\')">' +
      '<td><strong>' + escHtml(c.claimNumber) + '</strong></td>' +
      '<td>' + escHtml(c.policyNumber) + '</td>' +
      '<td>' + statusBadge(c.status) + '</td>' +
      '<td>' + escHtml(c.lossCause) + '</td>' +
      '<td>' + escHtml(c.severity) + '</td>' +
      '<td>' + escHtml(c.insuredName) + '</td>' +
      '<td>' + fmtDate(c.lossDate) + '</td>' +
      '<td class="gw-money">' + fmt$(c.totalIncurred) + '</td>' +
      '<td class="gw-money">' + fmt$(c.totalPaid) + '</td>' +
      '<td class="gw-money">' + fmt$(c.totalReserves) + '</td>' +
    '</tr>';
  }).join('');

  renderPagination('claim-pagination', data, loadClaims);
}

async function searchClaims() {
  var q = document.getElementById('claim-search').value.trim();
  var status = document.getElementById('claim-status-filter').value;
  if (!q && !status) { loadClaims(0); return; }

  var tbody = document.getElementById('claim-table-body');
  tbody.innerHTML = '<tr><td colspan="10" class="gw-loading"><div class="gw-spinner"></div> Searching…</td></tr>';

  var url = API + '/claims/search?';
  if (status) url += 'status=' + encodeURIComponent(status) + '&';
  if (q) url += 'insuredName=' + encodeURIComponent(q);

  var data = await apiFetch(url);
  if (!data || data.length === 0) {
    tbody.innerHTML = '<tr><td colspan="10" style="text-align:center;padding:20px">No claims found</td></tr>';
    return;
  }

  var list = Array.isArray(data) ? data : (data.content || []);
  tbody.innerHTML = list.map(function(c) {
    return '<tr onclick="showClaimDetail(\'' + escHtml(c.claimNumber) + '\')">' +
      '<td><strong>' + escHtml(c.claimNumber) + '</strong></td>' +
      '<td>' + escHtml(c.policyNumber) + '</td>' +
      '<td>' + statusBadge(c.status) + '</td>' +
      '<td>' + escHtml(c.lossCause) + '</td>' +
      '<td>' + escHtml(c.severity) + '</td>' +
      '<td>' + escHtml(c.insuredName) + '</td>' +
      '<td>' + fmtDate(c.lossDate) + '</td>' +
      '<td class="gw-money">' + fmt$(c.totalIncurred) + '</td>' +
      '<td class="gw-money">' + fmt$(c.totalPaid) + '</td>' +
      '<td class="gw-money">' + fmt$(c.totalReserves) + '</td>' +
    '</tr>';
  }).join('');
  document.getElementById('claim-pagination').innerHTML = '<span>' + list.length + ' result(s)</span>';
}

async function showClaimDetail(claimNumber) {
  document.getElementById('claim-list-view').style.display = 'none';
  var detailView = document.getElementById('claim-detail-view');
  detailView.classList.add('visible');

  var c = await apiFetch(API + '/claims/' + encodeURIComponent(claimNumber));
  if (!c) return;

  document.getElementById('claim-detail-title').innerHTML = 'Claim: ' + escHtml(c.claimNumber) + ' ' + statusBadge(c.status);
  document.getElementById('claim-detail-content').innerHTML = '' +
    '<div class="gw-detail-section">' +
      '<div class="gw-detail-section-header">Claim Information</div>' +
      '<div class="gw-detail-section-body">' +
        detailRow('Claim Number', c.claimNumber) +
        detailRow('Public ID', c.publicId) +
        detailRow('Policy Number', c.policyNumber) +
        detailRow('Status', c.status) +
        detailRow('Severity', c.severity) +
        detailRow('Litigation', c.litigationStatus) +
      '</div>' +
    '</div>' +
    '<div class="gw-detail-section">' +
      '<div class="gw-detail-section-header">Loss Details</div>' +
      '<div class="gw-detail-section-body">' +
        detailRow('Loss Cause', c.lossCause) +
        detailRow('Loss Type', c.lossType) +
        detailRow('Description', c.lossDescription) +
        detailRow('Loss Location', (c.lossLocationCity || '') + ', ' + (c.lossLocationState || '')) +
        detailRow('Loss Date', c.lossDate) +
        detailRow('Reported Date', c.reportedDate) +
        detailRow('Closed Date', c.closedDate || 'N/A') +
      '</div>' +
    '</div>' +
    '<div class="gw-detail-section">' +
      '<div class="gw-detail-section-header">Financial Summary</div>' +
      '<div class="gw-detail-section-body">' +
        detailRow('Total Incurred', fmt$(c.totalIncurred)) +
        detailRow('Total Paid', fmt$(c.totalPaid)) +
        detailRow('Total Reserves', fmt$(c.totalReserves)) +
        detailRow('Total Recoveries', fmt$(c.totalRecoveries)) +
        detailRow('Catastrophe #', c.catastropheNumber || 'N/A') +
      '</div>' +
    '</div>' +
    '<div class="gw-detail-section">' +
      '<div class="gw-detail-section-header">Parties</div>' +
      '<div class="gw-detail-section-body">' +
        detailRow('Claimant', c.claimantName) +
        detailRow('Insured', c.insuredName) +
        detailRow('Adjuster', c.adjusterName) +
        detailRow('Adjuster Code', c.adjusterCode) +
      '</div>' +
    '</div>';
}

function hideClaimDetail() {
  document.getElementById('claim-list-view').style.display = 'block';
  document.getElementById('claim-detail-view').classList.remove('visible');
}

// ── BillingCenter ────────────────────────────────────────
async function loadBilling(page) {
  var tbody = document.getElementById('billing-table-body');
  tbody.innerHTML = '<tr><td colspan="11" class="gw-loading"><div class="gw-spinner"></div> Loading…</td></tr>';

  var filter = document.getElementById('billing-filter').value;
  var url;
  if (filter === 'delinquent') {
    url = API + '/billing/accounts/delinquent';
  } else {
    url = API + '/billing/accounts?page=' + page + '&size=15';
  }

  var data = await apiFetch(url);
  var list = Array.isArray(data) ? data : (data && data.content ? data.content : []);
  if (list.length === 0) { tbody.innerHTML = '<tr><td colspan="11" style="text-align:center;padding:20px">No accounts found</td></tr>'; return; }

  tbody.innerHTML = list.map(function(a) {
    return '<tr onclick="showBillingDetail(\'' + escHtml(a.accountNumber) + '\')">' +
      '<td><strong>' + escHtml(a.accountNumber) + '</strong></td>' +
      '<td>' + escHtml(a.accountName) + '</td>' +
      '<td>' + escHtml(a.policyNumber) + '</td>' +
      '<td>' + statusBadge(a.status) + '</td>' +
      '<td>' + (a.delinquencyStatus === 'Delinquent' ? statusBadge('Delinquent') : '<span class="gw-badge gw-badge-active">Current</span>') + '</td>' +
      '<td class="gw-money">' + fmt$(a.totalBilled) + '</td>' +
      '<td class="gw-money">' + fmt$(a.totalPaid) + '</td>' +
      '<td class="gw-money">' + fmt$(a.currentBalance) + '</td>' +
      '<td class="gw-money' + (a.pastDueBalance > 0 ? ' negative' : '') + '">' + fmt$(a.pastDueBalance) + '</td>' +
      '<td>' + escHtml(a.billingPlan) + '</td>' +
      '<td>' + escHtml(a.paymentPlan) + '</td>' +
    '</tr>';
  }).join('');

  if (!Array.isArray(data) && data && data.totalPages != null) {
    renderPagination('billing-pagination', data, loadBilling);
  } else {
    document.getElementById('billing-pagination').innerHTML = '<span>' + list.length + ' account(s)</span>';
  }
}

async function searchBilling() {
  var q = document.getElementById('billing-search').value.trim();
  if (!q) { loadBilling(0); return; }
  var tbody = document.getElementById('billing-table-body');
  tbody.innerHTML = '<tr><td colspan="11" class="gw-loading"><div class="gw-spinner"></div> Searching…</td></tr>';

  var data = await apiFetch(API + '/billing/accounts/search?accountName=' + encodeURIComponent(q));
  if (!data || data.length === 0) {
    tbody.innerHTML = '<tr><td colspan="11" style="text-align:center;padding:20px">No accounts found</td></tr>';
    return;
  }
  var list = Array.isArray(data) ? data : [];
  tbody.innerHTML = list.map(function(a) {
    return '<tr onclick="showBillingDetail(\'' + escHtml(a.accountNumber) + '\')">' +
      '<td><strong>' + escHtml(a.accountNumber) + '</strong></td>' +
      '<td>' + escHtml(a.accountName) + '</td>' +
      '<td>' + escHtml(a.policyNumber) + '</td>' +
      '<td>' + statusBadge(a.status) + '</td>' +
      '<td>' + (a.delinquencyStatus === 'Delinquent' ? statusBadge('Delinquent') : '<span class="gw-badge gw-badge-active">Current</span>') + '</td>' +
      '<td class="gw-money">' + fmt$(a.totalBilled) + '</td>' +
      '<td class="gw-money">' + fmt$(a.totalPaid) + '</td>' +
      '<td class="gw-money">' + fmt$(a.currentBalance) + '</td>' +
      '<td class="gw-money">' + fmt$(a.pastDueBalance) + '</td>' +
      '<td>' + escHtml(a.billingPlan) + '</td>' +
      '<td>' + escHtml(a.paymentPlan) + '</td>' +
    '</tr>';
  }).join('');
  document.getElementById('billing-pagination').innerHTML = '<span>' + list.length + ' result(s)</span>';
}

async function showBillingDetail(accountNumber) {
  document.getElementById('billing-list-view').style.display = 'none';
  var detailView = document.getElementById('billing-detail-view');
  detailView.classList.add('visible');

  var a = await apiFetch(API + '/billing/accounts/' + encodeURIComponent(accountNumber));
  if (!a) return;

  document.getElementById('billing-detail-title').innerHTML = 'Account: ' + escHtml(a.accountNumber) + ' — ' + escHtml(a.accountName);
  document.getElementById('billing-detail-content').innerHTML = '' +
    '<div class="gw-detail-section">' +
      '<div class="gw-detail-section-header">Account Information</div>' +
      '<div class="gw-detail-section-body">' +
        detailRow('Account Number', a.accountNumber) +
        detailRow('Account Name', a.accountName) +
        detailRow('Policy Number', a.policyNumber) +
        detailRow('Status', a.status) +
        detailRow('Delinquency', a.delinquencyStatus) +
      '</div>' +
    '</div>' +
    '<div class="gw-detail-section">' +
      '<div class="gw-detail-section-header">Financial Summary</div>' +
      '<div class="gw-detail-section-body">' +
        detailRow('Total Billed', fmt$(a.totalBilled)) +
        detailRow('Total Paid', fmt$(a.totalPaid)) +
        detailRow('Current Balance', fmt$(a.currentBalance)) +
        detailRow('Past Due Balance', fmt$(a.pastDueBalance)) +
      '</div>' +
    '</div>' +
    '<div class="gw-detail-section">' +
      '<div class="gw-detail-section-header">Payment Details</div>' +
      '<div class="gw-detail-section-body">' +
        detailRow('Billing Plan', a.billingPlan) +
        detailRow('Payment Plan', a.paymentPlan) +
        detailRow('Last Payment Date', a.lastPaymentDate || 'N/A') +
        detailRow('Last Payment Amount', fmt$(a.lastPaymentAmount)) +
      '</div>' +
    '</div>';
}

function hideBillingDetail() {
  document.getElementById('billing-list-view').style.display = 'block';
  document.getElementById('billing-detail-view').classList.remove('visible');
}

// ── ContactManager ───────────────────────────────────────
async function loadContacts(page) {
  var tbody = document.getElementById('contact-table-body');
  tbody.innerHTML = '<tr><td colspan="8" class="gw-loading"><div class="gw-spinner"></div> Loading…</td></tr>';

  var url = API + '/contacts?page=' + page + '&size=15';
  var data = await apiFetch(url);
  if (!data || !data.content) { tbody.innerHTML = '<tr><td colspan="8">No data</td></tr>'; return; }

  tbody.innerHTML = data.content.map(function(c) {
    return '<tr onclick="showContactDetail(\'' + escHtml(c.publicId) + '\')">' +
      '<td>' + escHtml(c.publicId) + '</td>' +
      '<td>' + statusBadge(c.contactType === 'Person' ? 'Person' : 'Company') + '</td>' +
      '<td><strong>' + escHtml(c.displayName) + '</strong></td>' +
      '<td>' + escHtml(c.emailAddress) + '</td>' +
      '<td>' + escHtml(c.workPhone) + '</td>' +
      '<td>' + escHtml(c.city) + '</td>' +
      '<td>' + escHtml(c.state) + '</td>' +
      '<td>' + statusBadge(c.status) + '</td>' +
    '</tr>';
  }).join('');

  renderPagination('contact-pagination', data, loadContacts);
}

async function searchContacts() {
  var q = document.getElementById('contact-search').value.trim();
  var type = document.getElementById('contact-type-filter').value;
  if (!q && !type) { loadContacts(0); return; }

  var tbody = document.getElementById('contact-table-body');
  tbody.innerHTML = '<tr><td colspan="8" class="gw-loading"><div class="gw-spinner"></div> Searching…</td></tr>';

  var url = API + '/contacts/search?';
  if (q) url += 'lastName=' + encodeURIComponent(q) + '&';
  if (type) url += 'contactType=' + encodeURIComponent(type);

  var data = await apiFetch(url);
  if (!data || data.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;padding:20px">No contacts found</td></tr>';
    return;
  }

  var list = Array.isArray(data) ? data : [];
  tbody.innerHTML = list.map(function(c) {
    return '<tr onclick="showContactDetail(\'' + escHtml(c.publicId) + '\')">' +
      '<td>' + escHtml(c.publicId) + '</td>' +
      '<td>' + statusBadge(c.contactType === 'Person' ? 'Person' : 'Company') + '</td>' +
      '<td><strong>' + escHtml(c.displayName) + '</strong></td>' +
      '<td>' + escHtml(c.emailAddress) + '</td>' +
      '<td>' + escHtml(c.workPhone) + '</td>' +
      '<td>' + escHtml(c.city) + '</td>' +
      '<td>' + escHtml(c.state) + '</td>' +
      '<td>' + statusBadge(c.status) + '</td>' +
    '</tr>';
  }).join('');
  document.getElementById('contact-pagination').innerHTML = '<span>' + list.length + ' result(s)</span>';
}

async function showContactDetail(publicId) {
  document.getElementById('contact-list-view').style.display = 'none';
  var detailView = document.getElementById('contact-detail-view');
  detailView.classList.add('visible');

  var c = await apiFetch(API + '/contacts/' + encodeURIComponent(publicId));
  if (!c) return;

  document.getElementById('contact-detail-title').innerHTML = escHtml(c.displayName) + ' ' + statusBadge(c.contactType);
  document.getElementById('contact-detail-content').innerHTML = '' +
    '<div class="gw-detail-section">' +
      '<div class="gw-detail-section-header">Contact Information</div>' +
      '<div class="gw-detail-section-body">' +
        detailRow('Public ID', c.publicId) +
        detailRow('Type', c.contactType) +
        detailRow('First Name', c.firstName) +
        detailRow('Last Name', c.lastName) +
        detailRow('Company', c.companyName || 'N/A') +
        detailRow('Display Name', c.displayName) +
        detailRow('Date of Birth', c.dateOfBirth || 'N/A') +
        detailRow('Status', c.status) +
      '</div>' +
    '</div>' +
    '<div class="gw-detail-section">' +
      '<div class="gw-detail-section-header">Communication</div>' +
      '<div class="gw-detail-section-body">' +
        detailRow('Email', c.emailAddress) +
        detailRow('Work Phone', c.workPhone || 'N/A') +
        detailRow('Home Phone', c.homePhone || 'N/A') +
        detailRow('Cell Phone', c.cellPhone || 'N/A') +
      '</div>' +
    '</div>' +
    '<div class="gw-detail-section">' +
      '<div class="gw-detail-section-header">Address</div>' +
      '<div class="gw-detail-section-body">' +
        detailRow('Street', c.addressLine1 || 'N/A') +
        detailRow('City', c.city) +
        detailRow('State', c.state) +
        detailRow('Postal Code', c.postalCode) +
        detailRow('Country', c.country) +
      '</div>' +
    '</div>';
}

function hideContactDetail() {
  document.getElementById('contact-list-view').style.display = 'block';
  document.getElementById('contact-detail-view').classList.remove('visible');
}

// ── Shared Helpers ───────────────────────────────────────
function detailRow(label, value) {
  return '<div class="gw-detail-row"><span class="gw-detail-label">' + escHtml(label) +
         '</span><span class="gw-detail-value">' + escHtml(String(value != null ? value : '—')) + '</span></div>';
}

function fmtDateTime(dt) {
  if (!dt) return '—';
  return dt.replace('T', ' ').substring(0, 19);
}

function renderPagination(containerId, data, loadFn) {
  var container = document.getElementById(containerId);
  var page = data.number != null ? data.number : 0;
  var totalPages = data.totalPages || 1;
  var totalElements = data.totalElements || 0;
  var size = data.size || 15;

  var from = page * size + 1;
  var to = Math.min((page + 1) * size, totalElements);

  var html = '<span>Showing ' + from + '-' + to + ' of ' + fmtNum(totalElements) + '</span>';
  html += '<div class="gw-pagination-controls">';
  html += '<button class="gw-pagination-btn" onclick="(' + loadFn.name + ')(' + (page - 1) + ')"' + (page === 0 ? ' disabled' : '') + '>&laquo; Prev</button>';

  var startPage = Math.max(0, page - 2);
  var endPage = Math.min(totalPages - 1, page + 2);
  for (var i = startPage; i <= endPage; i++) {
    html += '<button class="gw-pagination-btn' + (i === page ? ' active' : '') + '" onclick="(' + loadFn.name + ')(' + i + ')">' + (i + 1) + '</button>';
  }

  html += '<button class="gw-pagination-btn" onclick="(' + loadFn.name + ')(' + (page + 1) + ')"' + (page >= totalPages - 1 ? ' disabled' : '') + '>Next &raquo;</button>';
  html += '</div>';
  container.innerHTML = html;
}

// ── Initialize ───────────────────────────────────────────
loadDashboard();
