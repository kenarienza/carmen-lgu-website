document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      toggle.textContent = nav.classList.contains('open') ? '✕' : '☰';
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.textContent = '☰';
      });
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', function () {
      var wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (i) { i.classList.remove('open'); });
      if (!wasOpen) item.classList.add('open');
    });
  });

  // Full Disclosure Portal: sidebar categories, tabs, sub-tabs
  document.querySelectorAll('.fdp-cat-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var cat = btn.getAttribute('data-cat');
      document.querySelectorAll('.fdp-cat-btn').forEach(function (b) { b.classList.remove('active'); });
      document.querySelectorAll('.fdp-panel').forEach(function (p) { p.classList.remove('active'); });
      btn.classList.add('active');
      var panel = document.querySelector('.fdp-panel[data-panel="' + cat + '"]');
      if (panel) panel.classList.add('active');
    });
  });
  document.querySelectorAll('.fdp-tab').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var tab = btn.getAttribute('data-tab');
      var group = btn.closest('.fdp-panel');
      if (!group) return;
      group.querySelectorAll('.fdp-tab').forEach(function (b) { b.classList.remove('active'); });
      group.querySelectorAll('.fdp-tab-panel').forEach(function (p) { p.classList.remove('active'); });
      btn.classList.add('active');
      var panel = group.querySelector('.fdp-tab-panel[data-tabpanel="' + tab + '"]');
      if (panel) panel.classList.add('active');
      var search = group.querySelector('.fdp-search');
      if (search) search.dispatchEvent(new Event('input'));
    });
  });
  document.querySelectorAll('.fdp-subtab').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var subtab = btn.getAttribute('data-subtab');
      var group = btn.closest('.fdp-tab-panel');
      if (!group) return;
      group.querySelectorAll('.fdp-subtab').forEach(function (b) { b.classList.remove('active'); });
      group.querySelectorAll('.fdp-subtab-panel').forEach(function (p) { p.classList.remove('active'); });
      btn.classList.add('active');
      var panel = group.querySelector('.fdp-subtab-panel[data-subtabpanel="' + subtab + '"]');
      if (panel) panel.classList.add('active');
    });
  });

  // Full Disclosure Portal: real ordinance titles, transcribed from the
  // "MUNICIPAL ORDINANCE SERIES" index docs uploaded per year
  var ordinanceTitles = {
    2026: [
      'An Ordinance Institutionalizing the Youth Leadership Summit, Young Gardener Program, and Teen Pregnancy Prevention Campaign in the Municipality of Carmen, Province of Surigao del Sur',
      'An Ordinance Mandating Strict Liquidation Deadlines for All Cash Advances and Funds Released for Programs, Projects, and Activities (PPAs) of the Municipal Government of Carmen, Surigao del Sur, and Providing Sanctions for Violations Thereof',
      'An Ordinance Recognizing and Rewarding Academic Excellence among College Graduates of the Municipality of Carmen, Surigao del Sur and Appropriating Funds Thereof',
      'An Ordinance Mandating the Institutionalization of Emergency Preparedness through the Establishment of a "Go Bag" in Every Household within the Territorial Jurisdiction of the Municipality of Carmen, Surigao del Sur and Providing Guidelines for its Effective Implementation',
      'An Ordinance Mandating the Free Use of All Rural Health Unit (RHU)-Carmen Vehicles for the Transport of Patients to Designated Hospitals and Health Facilities, and for Other Related Purposes',
      'An Ordinance Amending Section 9, Paragraph (4) of Ordinance No. 01, Series of 2024, Otherwise Known as "An Ordinance Prescribing the Rates of Wages for Contract of Service, Job Order Workers, and Support Service Personnel of the Local Government Unit of Carmen, Surigao del Sur"',
      'An Ordinance Institutionalizing the Use of Data and Technology in Decision-Making in the Municipality of Carmen, Surigao del Sur',
      'An Ordinance Governing the Procurement of Goods, Services and Infrastructure Projects',
      'An Ordinance Institutionalizing Measures to Strengthen Budget Utilization and Financial Accountability in the Municipality of Carmen, Surigao del Sur',
      'An Ordinance Recognizing and Providing Administrative Guidelines for the Availment and Management of Cash Advances for Official Expenditures of the Offices of the Municipal Mayor and the Municipal Vice-Mayor, Consistent with Commission on Audit Rules and Regulations, and for Other Purposes',
      'An Ordinance Institutionalizing Social Protection Programs During Emergencies in the Municipality of Carmen, Surigao del Sur',
      'An Ordinance Authorizing the Online Application and Electronic Payment of Permits, Clearances and Licenses in the Municipality of Carmen, Surigao del Sur',
      'An Ordinance on the Institutionalization of the United Volunteers of Carmen, Surigao del Sur, a Duly Accredited Community Disaster Volunteer Group for Disaster Preparedness and Response Auxiliary Support, and Providing Funds Thereof',
      'An Ordinance Prescribing the Procedures for the Preparation, Submission, Review, and Approval of the Local Development Investment Program (LDIP), Annual Investment Program (AIP), Annual Local Government Budget (ALGB), Supplemental Annual Investment Program (SAIP), and Supplemental Appropriation to the Annual Local Government Budget (SAA) of the Local Government of Carmen, Surigao del Sur, Subject to National Laws and Regulations',
      'An Ordinance Institutionalizing Climate Change Adaptation and Mitigation Programs in the Municipality of Carmen, Surigao del Sur',
      'An Ordinance Promoting Transparency and Accountability in Local Fiscal Administration, Subject to National Laws and Regulations',
      'An Ordinance Institutionalizing Calamity-Resilient Infrastructure Facilities in the Territorial Jurisdiction of the Municipality of Carmen, Province of Surigao del Sur, and Providing Guidelines for its Implementation',
      'An Ordinance Imposing a Temporary Liquor Ban on the Sale, Distribution, and Consumption of Intoxicating and Alcoholic Beverages in the Municipality of Carmen, Surigao del Sur during the Occurrence of Tropical Cyclones (Signal No. 1 or Higher) and Other Natural and Man-Made Calamities, and Providing Penalties for Violation Thereof',
      'An Ordinance Requiring Barangay Council Members in the Municipality of Carmen, Surigao del Sur to Wear Barong Tagalog and Filipiniana during Sessions',
      'An Ordinance Mandating the Relocation of All Households Residing within the Designated No-Build Zones in the Municipality of Carmen, Province of Surigao del Sur, Providing Assistance and Support for Affected Residents, and Prescribing Penalties for Non-Compliance',
      'An Ordinance Mandating All Local and National Government Employees, Municipal and Barangay Officials Assigned or Stationed within the Municipality of Carmen, Province of Surigao del Sur to Participate in a One (1) Hour Physical Fitness Activity per Week to Promote Health and Wellness, and Providing Guidelines for its Implementation',
      'An Ordinance Institutionalizing the Pre-Positioning of Food and Non-Food Items to Designated High-Risk, Low-Income, and Low National Tax Allotment Barangays in the Municipality of Carmen, Province of Surigao del Sur, Providing Mechanisms for its Implementation and Appropriating Funds Thereof',
      'An Ordinance Supporting the Installation, Operation, Maintenance, and Management of Closed-Circuit Television (CCTV) Cameras in Strategic Areas of the Municipality of Carmen, Province of Surigao del Sur, Providing Policies on Privacy, Use of Footage, Responsible Entities, Funding, and for Other Purposes',
      'An Ordinance Institutionalizing the Rapid Disaster and Needs Analysis (RDANA) in the Local Government Unit of Carmen, Surigao del Sur, Providing Guidelines for its Implementation and Appropriating Funds Thereof',
      'An Ordinance to Institutionalize the Incident Management Team (IMT) System in the Municipality of Carmen, Province of Surigao del Sur, Providing for its Organization, Functions and Responsibilities, and Appropriating Funds Thereof',
      'An Ordinance Requiring All Qualified Stores, Facilities, and Similar Establishments within the Territorial Jurisdiction of the Municipality of Carmen, Province of Surigao del Sur to Obtain PhilGEPS Registration, Providing Guidelines and for Other Purposes',
      'An Ordinance Establishing Guidelines on the Utilization and Application of Early Warning Devices during Impending Disasters in the Municipality of Carmen, Surigao del Sur and Providing Penalties for Violations Thereof',
      'An Ordinance Institutionalizing the Granting of Cash Awards to Honor Pupils and Students from Kindergarten to Grade 12 in the Department of Education (DepEd) District of Carmen, Municipality of Carmen, Surigao del Sur',
      'An Ordinance Temporarily Closing Hubason Bridge due to Damage Sustained by its Approach Concrete Lane during Tropical Storm Basyang',
      'An Ordinance Institutionalizing the Regular Desilting and Maintenance of All Riverbeds, Creeks, Canals, Irrigation Systems, Drainage, and Similar Waterways within the Territorial Jurisdiction of the Municipality of Carmen, Surigao del Sur, Prescribing Responsibilities, Standards and Penalties for Violations, and for Other Purposes',
      'An Ordinance Requiring Radio Stations Operating within the Municipality of Carmen, Surigao del Sur to Allocate at Least One (1) Hour of Airtime per Week for Free Broadcasting of Local Government Unit Programs, Projects, Activities and Public Service Announcements, Prescribing Guidelines for its Implementation, and for Other Purposes',
      'An Ordinance Regulating the Establishment and Operation of Private Talipapa or Mini-Markets within the Municipality of Carmen, Providing Penalties for Violation Thereof, and for Other Purposes',
      'An Ordinance Declaring, Regulating, and Providing for the Abatement of Nuisance within the Municipality of Carmen, Surigao del Sur and Providing Penalties Therefor, and for Other Purposes',
      'An Ordinance Regulating the Preparation and Sale of Meat, Poultry, Fish, Vegetables, Fruits, Dairy Products, and Other Foodstuffs for Public Consumption in the Municipality of Carmen, Surigao del Sur, Providing Penalties for Violations Thereof, and for Other Purposes',
      'An Ordinance Requiring Houses, Buildings, and the Premises Thereof, and Any Land within the Municipality of Carmen, Surigao del Sur, to Be Kept and Maintained in a Sanitary Condition, and Imposing Penalties for Violation Thereof',
      'An Ordinance Recognizing and Regulating the Payment of Real Property Tax through Authorized Representatives, Consistent with Republic Act No. 10173 (Data Privacy Act of 2012), and Directing the Municipal Treasurer of the Municipality of Carmen, Surigao del Sur to Accept Such Payments',
      'An Ordinance Restructuring the Local Disaster Risk Reduction and Management Office (LDRRMO) as a Department in the Local Government Unit of Carmen, Surigao del Sur, Incorporating Existing Positions, with its Own Standard Organizational Structure, Staffing Pattern, Mandates and Functions, and Subsequently Creating the Position of Municipal Government Department Head I (Local Disaster Risk Reduction and Management Officer), Salary Grade (SG) 24',
      'An Ordinance Providing for the Clearing and Proper Maintenance of Low-Hanging Power Lines, Internet Wires, Telephone Wires, and Other Similar Wires Crossing Roadways within the Territorial Jurisdiction of the Municipality of Carmen, Surigao del Sur, Prescribing Standards for their Installation and Maintenance, Establishing a Joint Task Force, Imposing Penalties for Violations, and for Other Purposes',
      'An Ordinance Institutionalizing Evacuation and Support Protocols for Internally Displaced Persons, Inside and Outside Evacuation Centers, and for Other Purposes in the Municipality of Carmen, Surigao del Sur',
      'An Ordinance Requiring All Public Market Vendors and Grocery Stores Selling Fish, Meat and Agricultural Products to Display Price Tags, Providing Penalties for Violations, and for Other Purposes in the Municipality of Carmen, Surigao del Sur',
      'An Ordinance Prescribing the New Minimum Wage Rates for Construction Workers and Laborers Hired by the Municipality of Carmen, Province of Surigao del Sur, as well as those Engaged by Contractors on Local Government Projects, and Providing Penalties for Violation Thereof',
      'An Ordinance Instituting a Mandatory Proper Queuing (Pila) System in All Municipal and Barangay Activities, Including the Distribution, Release, and Receipt of Goods, Assistance and Similar Transactions within the Municipality of Carmen, Surigao del Sur, and Providing Penalties for Violation Thereof',
      'An Ordinance Prescribing the New Minimum Wage Rates for Construction Workers and Laborers Hired by the Municipality of Carmen, Province of Surigao del Sur, as well as those Engaged by Contractors on Local Government Projects, and Providing Penalties for Violation Thereof (Amendatory)',
      'An Ordinance Institutionalizing the National Action Plan on Women, Peace and Security (WPS) in the Municipality of Carmen, Surigao del Sur',
      'An Ordinance Establishing Guidelines on the Operation of the Bahay Dangpanan Crisis Intervention Center of the Municipality of Carmen, Surigao del Sur',
      'An Ordinance Institutionalizing Energy Conservation and Efficiency Measures in the Municipality of Carmen, Surigao del Sur, in Response to the Global Energy Crisis',
      'An Ordinance Encouraging Local Food Production and Urban Agriculture to Ensure Food Security Amidst Energy and Economic Instability in the Municipality of Carmen, Surigao del Sur',
      'An Ordinance Prohibiting Philippine Offshore Gaming Operators (POGO) and Other Online Gambling within the Territorial Jurisdiction of the Municipality of Carmen, Province of Surigao del Sur, Providing Penalties for Violation Thereof, and for Other Purposes',
      'An Ordinance for the Prevention and Control of Crime in the Municipality of Carmen, Surigao del Sur',
      'An Ordinance Prohibiting Any Obstruction on Public Roads and Other Similar Public Places within the Territorial Jurisdiction of Carmen, Surigao del Sur',
      'An Ordinance Regulating the Operation of Cockfighting, Imposing Fees and Charges Thereof, and for Other Purposes',
      'An Ordinance Strengthening the Price Monitoring Mechanism, Prohibiting Hoarding and Profiteering, and Prescribing Penalties for Violation Thereof in the Municipality of Carmen, Surigao del Sur',
      'An Ordinance Requiring the Installation and Use of Solar Power Technology and Other Renewable Energy Sources in All Government-Owned Buildings, Establishments, Offices and Public Facilities, and Encouraging the Same among Private Residents in the Municipality of Carmen, Province of Surigao del Sur, and Providing Funds Thereof',
      'An Ordinance Enacting the Omnibus Tourism Code of the Municipality of Carmen, Province of Surigao del Sur',
      'An Ordinance Creating and Structuring the Municipal Human Resource Management Office (MHRMO) of the Municipality of Carmen, Surigao del Sur, with its Own Standards, Organizational Structure, Staffing Pattern, Mandates and Functions, and Subsequently Creating the Position of Municipal Government Department Head I (Human Resource Management and Development Office), Salary Grade (SG) 24',
      'An Ordinance Regulating the Sale, Distribution, and Use of Electronic Vaporized Nicotine/Non-Nicotine and Heated Tobacco Products in the Municipality of Carmen, Surigao del Sur, Providing Penalties for Violations, and Providing Funds Thereof',
      'An Ordinance Regulating the Use of National Highway Shoulders and Establishing Designated Parking Areas within the Municipality of Carmen, Province of Surigao del Sur, Prohibiting Illegal Parking and All Forms of Obstruction along the National Highway, and Prescribing Penalties for Violation Thereof',
      'An Ordinance Prohibiting Being Half-Naked or Topless in Public Places within the Municipality of Carmen, Province of Surigao del Sur, Providing Penalties for Violation Thereof, and for Other Purposes',
      'An Ordinance Promoting and Mandating Water Conservation and Efficient Water Management Practices in the Municipality of Carmen, Province of Surigao del Sur to Support Energy Conservation and Resource Resilience, and for Other Purposes',
      'An Ordinance Declaring a Call to Action for Community Safety and Resilience in the Municipality of Carmen, Province of Surigao del Sur, Establishing Intersectoral Coordination Mechanisms, and Appropriating Funds for its Implementation',
      'An Ordinance Authorizing the Municipal Mayor of the Municipality of Carmen, Surigao del Sur to Use Savings for Augmentation in Accordance with the Local Government Code of 1991, in the Amount of One Hundred Sixty Thousand Pesos (Php 160,000.00)'
    ],
    2025: [
      'An Ordinance Localizing Support to the Pantawid Pamilyang Pilipino Program (4Ps), Prescribing for Prioritization and Commitment in the Delivery of Services for the Exited Households through the Adoption of the Convergence Provision of Republic Act 11310 in the Municipality of Carmen, Province of Surigao del Sur, and for Other Purposes',
      'An Ordinance Prohibiting Government Officials, Employees, Private Individuals/Groups, and Local Businesses or Corporations from Accepting Pantawid Pamilya Documents and Cash Cards as Loan Collateral',
      'An Ordinance Regulating Motorcycle Drivers and Backriders from Wearing Bonnets, Masks, or Any Face Coverings that Conceal their Identity within the Municipality of Carmen, Surigao del Sur, and Imposing Penalties for Violation Thereof',
      'An Ordinance Providing for the Temporary Closure of Hayagan Street in Barangay Poblacion, Carmen, Surigao del Sur in Line with the Celebration of the 2025 Patronal Fiesta, and for Other Purposes',
      'An Ordinance Temporarily Closing the Hubason River Resort and Adventure Trail in the Municipality of Carmen Due to Landscaping and Construction Activities, for Public Safety Purposes',
      'An Ordinance Establishing the Rules and Regulations Governing the Operations of the Hubason River Resort and Adventure Trail and Prescribing Charges Thereof',
      'An Ordinance Establishing Rules and Regulations Governing the Operations of the Multi-Purpose Evacuation Center and Prescribing Fees and Charges Thereof',
      'An Ordinance Prescribing the Issuance and Collection of Tax Clearance/Certification/Sketch Plan Fees in the Municipality of Carmen, Surigao del Sur',
      'An Ordinance Amending the Caption, Explanatory Note, and Section 1 of Ordinance No. 25, Series of 2024, Otherwise Known as "An Ordinance Naming the Streets, Roads and Bridges within the Town Proper of Carmen, Surigao del Sur and Providing Funds Therefor," into "An Ordinance Naming the Streets, Roads, and Bridges within Poblacion, Carmen, Surigao del Sur after Deceased Barangay and Municipal Officials and Appropriating Funds Therefor"',
      'An Ordinance Revising Ordinance No. 02, Series of 2023, Otherwise Known as "An Ordinance Institutionalizing the Carmen Sustainable Agro-Forestry and Agro-Industrial Development Program (CaSAAD) of the Municipality of Carmen, Surigao del Sur and Appropriating Funds Thereof," and for Other Purposes'
    ],
    2024: [
      'An Ordinance Prescribing the Rate of Wages for Contract of Service, Job Order Workers, and Support Services of the Local Government Unit of Carmen, Surigao del Sur',
      'An Ordinance Localizing Republic Act No. 11036, "An Act Establishing a National Mental Health Policy," Appropriating Funds Therefor, and for Other Purposes',
      'An Ordinance Designating the Barangay Health Workers (BHW) of Carmen, Surigao del Sur as Barangay-Level Health Education Promotion Officers (HEPOs) for the Implementation of the Health Governance Structure, and Appropriating Resources Thereof',
      'An Ordinance Declaring Every 20th Day of October Each Year as "Araw ng mga Tribo" in the Municipality of Carmen, Surigao del Sur, in Commemoration of the Passage of the Indigenous Peoples Rights Act (IPRA) of 1997',
      'An Ordinance Scrapping the Position of Disbursing Officer II with Salary Grade 8 in the Office of the Municipal Treasurer, Municipality of Carmen, Surigao del Sur',
      'An Ordinance Creating the Position of Cashier II with Salary Grade 14/1 in the Office of the Municipal Treasurer, Municipality of Carmen, Surigao del Sur, Providing for its Inclusion in the Plantilla of Personnel, and Appropriating Funds Therefor',
      'An Ordinance Regulating Peddling Activities within the Territorial Jurisdiction of the Municipality of Carmen, Surigao del Sur, Imposing Penalties, and for Other Purposes',
      'An Ordinance Imposing Fees on Public Rooms in the New Carmen Public Market in the Municipality of Carmen, Province of Surigao del Sur',
      'An Ordinance Prescribing the Guidelines, Rules, and Regulations in Acquiring a Tricycle Franchise',
      'An Ordinance Requiring Business Establishments and Other High-Risk Places to Install Video Surveillance Cameras or Closed-Circuit Television (CCTV) and Providing Penalties for Violations Thereof, and for Other Purposes',
      'An Ordinance Strengthening and Institutionalizing the Adoption and Implementation of Bantay ASF sa Barangay ("Goodbye ASF") in the Municipality of Carmen, Province of Surigao del Sur',
      'An Ordinance Institutionalizing a Drug-Free Workplace Policy in the Local and Barangay Government Units of Carmen, Surigao del Sur, and Appropriating Funds for its Implementation',
      'An Ordinance Regulating the Operation of Cockfighting and Imposing Fees and Charges Thereof, and for Other Purposes',
      'An Ordinance Providing for a Comprehensive Child Support System for the Local Government of Carmen, Surigao del Sur',
      'An Ordinance Operationalizing Freedom of Information in the Municipal Government of Carmen, Surigao del Sur, and Providing Guidelines Therefor',
      'An Ordinance Regulating the Operation and Management of Piggery, Poultry Farms, and Other Livestock Raising in the Municipality of Carmen, Surigao del Sur',
      'An Ordinance Providing Free Fluoride Treatment to Preschoolers of All Child Development Centers in the Municipality of Carmen, Surigao del Sur, and Appropriating Funds Therefor',
      'An Ordinance Rectifying the Position Title "Cashier II, Salary Grade 14/1" to "Administrative Officer III (Cashier II), Salary Grade 14/1" in the Caption and Sections of Ordinance No. 06, Dated July 2, 2024',
      'An Ordinance Prohibiting Gambling and Other Illegal Gaming in the Municipality of Carmen, Surigao del Sur, Imposing Penalties Therefor, and for Other Purposes',
      'An Ordinance Approving the Establishment of a New Public Cemetery and Prescribing Guidelines for its Use, Acquisition, Operation, and Maintenance, Including the Collection of Fees and Charges and Penalties for Violations Thereof',
      'An Ordinance Creating the LGU-Carmen Human Rights Action Center (HRAC) under the Office of the Municipal Mayor, and Defining its Powers and Functions',
      'An Ordinance Institutionalizing "Peer Support Groups" as an Early Intervention for Mental Health Promotion in the Municipality of Carmen, Especially among Key Affected Populations, and Providing Funds Therefor',
      'An Ordinance Authorizing the Municipal Mayor to Use Savings for Augmentation in Accordance with the Local Government Code of 1991',
      'An Ordinance on the Collection of the Corresponding Barangay Clearance Fee in the Application for Any Business-Related Transactions',
      'An Ordinance Naming the Streets, Roads, and Bridges within the Town Proper of Carmen, Surigao del Sur and Providing Funds Therefor',
      'An Ordinance Granting Authority to the Municipal Mayor and Vice Mayor to Augment Any Item in the Approved 2024 Annual Budget from Savings in Other Items within the Same Class of Appropriation',
      'An Ordinance Extending the Deadline of the Business One-Stop Shop (BOSS) in the Local Government Unit of Carmen, Surigao del Sur'
    ]
  };
  // Irregular / supplemental ordinances that don't follow the plain numeric filename pattern
  var ordinanceExtras = {
    2026: [
      { sort: 3.3, num: '3.3', file: 'ordinance-2026-3-.pdf', title: 'An Ordinance Authorizing Supplemental Budget No. 03, Calendar Year 2026, Involving an Amount of Eleven Million Sixty-Two Thousand Six Hundred Sixty-Seven Pesos and Seventeen Centavos (Php 11,062,667.17) to Cover the Deficiencies in the Annual Budget Appropriation for "An Ordinance Recognizing and Rewarding Academic Excellence among College Graduates of the Municipality of Carmen, Surigao del Sur and Appropriating Funds Thereof"' }
    ]
  };

  // Full Disclosure Portal: generate paginated ordinance lists per year from uploaded files
  var FDP_PAGE_SIZE = 10;
  document.querySelectorAll('.fdp-ord-year-table').forEach(function (tbody) {
    var year = tbody.getAttribute('data-year');
    var titles = ordinanceTitles[year] || [];
    var entries = titles.map(function (title, i) {
      var n = i + 1;
      return { sort: n, num: (n < 10 ? '0' : '') + n, file: 'ordinance-' + year + '-' + (n < 10 ? '0' : '') + n + '.pdf', title: title };
    });
    (ordinanceExtras[year] || []).forEach(function (item) { entries.push(item); });
    entries.sort(function (a, b) { return b.sort - a.sort; });

    var pager = document.createElement('div');
    pager.className = 'fdp-pagination';
    tbody.closest('table').insertAdjacentElement('afterend', pager);

    var state = { all: entries, filtered: entries, page: 1 };

    function renderRow(entry) {
      var file = 'assets/Ordinances/' + year + '/' + entry.file;
      return '<tr><td class="ord-no">Ordinance No. ' + year + '-' + entry.num + '</td>' +
             '<td><a href="' + file + '" class="doc-title" target="_blank">' + entry.title + '</a></td>' +
             '<td><a href="' + file + '" class="btn-view" target="_blank">📄 View</a></td></tr>';
    }

    function totalPages() { return Math.max(1, Math.ceil(state.filtered.length / FDP_PAGE_SIZE)); }

    function render() {
      var pages = totalPages();
      if (state.page > pages) state.page = pages;
      var start = (state.page - 1) * FDP_PAGE_SIZE;
      var pageItems = state.filtered.slice(start, start + FDP_PAGE_SIZE);
      tbody.innerHTML = pageItems.length ? pageItems.map(renderRow).join('') :
        '<tr><td colspan="3" class="fdp-no-results">No matching ordinances found.</td></tr>';

      if (pages <= 1) { pager.innerHTML = ''; return; }
      var html = '';
      for (var p = 1; p <= pages; p++) {
        html += '<button type="button" class="fdp-page-btn' + (p === state.page ? ' active' : '') + '" data-page="' + p + '">' + p + '</button>';
      }
      html += '<button type="button" class="fdp-page-btn fdp-page-next" data-page="next"' + (state.page === pages ? ' disabled' : '') + '>Next »</button>';
      pager.innerHTML = html;
    }

    pager.addEventListener('click', function (e) {
      var btn = e.target.closest('.fdp-page-btn');
      if (!btn || btn.disabled) return;
      var target = btn.getAttribute('data-page');
      state.page = target === 'next' ? Math.min(state.page + 1, totalPages()) : parseInt(target, 10);
      render();
    });

    tbody._fdpState = state;
    tbody._fdpRender = render;
    render();
  });

  // Full Disclosure Portal: live search filters and re-paginates the ordinance tables
  document.querySelectorAll('.fdp-search').forEach(function (input) {
    input.addEventListener('input', function () {
      var query = input.value.trim().toLowerCase();
      var panel = input.closest('.fdp-panel');
      if (!panel) return;
      panel.querySelectorAll('.fdp-ord-year-table').forEach(function (tbody) {
        var state = tbody._fdpState;
        if (!state) return;
        state.filtered = query ? state.all.filter(function (entry) {
          return (entry.num + ' ' + entry.title).toLowerCase().indexOf(query) !== -1;
        }) : state.all;
        state.page = 1;
        tbody._fdpRender();
      });
    });
  });

  // Highlight active nav link based on current page
  var path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === path) a.classList.add('active');
  });

  // Newsletter / contact form demo submit
  document.querySelectorAll('form[data-demo-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      if (btn) {
        var original = btn.textContent;
        btn.textContent = 'Thank you!';
        setTimeout(function () { btn.textContent = original; form.reset(); }, 2200);
      }
    });
  });

  // Scroll reveal animation for sections and card grids
  if ('IntersectionObserver' in window) {
    var revealTargets = document.querySelectorAll(
      '.section, .cta-banner, .leaders-strip, .partners-strip'
    );
    var staggerGrids = document.querySelectorAll(
      '.officials-grid, .news-grid, .dept-icon-grid, .barangay-grid, .services-directory, .stat-grid, .quicklinks-grid, .gallery-grid'
    );

    revealTargets.forEach(function (el) { el.classList.add('reveal'); });
    staggerGrids.forEach(function (el) { el.classList.add('reveal-stagger'); });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -60px 0px' });

    revealTargets.forEach(function (el) { io.observe(el); });
    staggerGrids.forEach(function (el) { io.observe(el); });
  }
});
