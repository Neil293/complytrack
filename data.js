// =============================================================================
// COMPLYTRACK — APP CONFIGURATION & SEED DATA
// =============================================================================
// Version:   1.0.0
// Released:  2026-03-22
// Repo:      https://github.com/Neil293/complytrack
// Live:      https://neil293.github.io/complytrack/
// =============================================================================
//
// HOW TO CHANGE THE APP NAME
// --------------------------
// Update APP_CONFIG below. These values are used throughout the app
// automatically — you do not need to change index.html.
//
// FOR MERGING WITH ANOTHER APP
// ----------------------------
// This file (data.js) contains ONLY:
//   - APP_CONFIG  (branding, version)
//   - MONTHS      (utility constant)
//   - DTYPES      (default asset types)
//   - DCLIENTS    (default clients)
//   - DCOMPLEXES  (default complexes)
//   - DASSETS     (default assets)
//   - DUSERS      (default users)
//   - DSETTINGS   (default settings)
//
// index.html contains all UI, logic, and styling.
// To merge: keep this file separate, replace or extend each D* constant.
// All D* constants are read by initData() in index.html on first load.
//
// CHANGE LOG
// ----------
// v1.0.0  2026-03-22  Initial release
//         - Single-file PWA split into index.html + data.js
//         - IRT Group client with 20 complexes
//         - 124 William Beach Gardens TMV assets (Tradehack import)
//         - Legionella disinfection certificate report
//         - 7-step report wizard
//         - Asset import via CSV paste in Edit Complex
//         - Report history saved to assets (Service / Reactive / Legionella)
//         - Company info settings synced to report template
//         - ComplyTrack branding with Fairy Meadow Plumbing logo
// =============================================================================

// ─── APP CONFIG ──────────────────────────────────────────────────────────────
// Edit these values to rebrand or configure the app.
const APP_CONFIG = {
  name:        'ComplyTrack',
  tagline:     'Water System Compliance',
  version:     '1.0.0',
  repo:        'https://github.com/Neil293/complytrack',
  liveUrl:     'https://neil293.github.io/complytrack/',
  // Default login credentials (change after first deploy)
  defaultAdmin:    { username: 'admin',  password: 'admin' },
  defaultTech:     { username: 'tech1',  password: 'tech1' },
};
// ─────────────────────────────────────────────────────────────────────────────

const MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];

const DTYPES=[
  {id:'t1',name:'Warm Water System',   icon:'🌡',col:'#1565c0',capLbl:'Capacity (L)',      intv:'annual'},
  {id:'t2',name:'Sewer Pump',          icon:'🔧',col:'#00796b',capLbl:'Power (kW)',         intv:'biannual'},
  {id:'t3',name:'Stormwater Pump',     icon:'💧',col:'#558b2f',capLbl:'Power (kW)',         intv:'annual'},
  {id:'t4',name:'Raypack',             icon:'🔥',col:'#e65100',capLbl:'BTU Rating',         intv:'annual'},
  {id:'t5',name:'UV System',           icon:'☀️',col:'#6a1b9a',capLbl:'Flow Rate',          intv:'annual'},
  {id:'t6',name:'Legionella Sterilising',icon:'🦠',col:'#c62828',capLbl:'Tank Volume (L)', intv:'quarterly'},
  {id:'t7',name:'TMV',icon:'🔀',col:'#0097a7',capLbl:'Size (mm)',intv:'annual'},
];

const DCLIENTS=[
  {id:'c4',name:'IRT Group',abbr:'IRT',contact:'',email:'',phone:'',addr:'NSW & ACT',col:'#c0392b'},
];

const DCOMPLEXES=[
  // IRT — all 20 sites
  {id:'cx_irt_01',clientId:'c4',name:'IRT Woonona',              addr:'4-10 Popes Rd',        suburb:'Woonona',          state:'NSW',postcode:'2517',contact:'',phone:'',email:'',notes:''},
  {id:'cx_irt_02',clientId:'c4',name:'IRT Marco Polo',           addr:'52 Woonona Parade',    suburb:'Woonona',          state:'NSW',postcode:'2517',contact:'',phone:'',email:'',notes:''},
  {id:'cx_irt_03',clientId:'c4',name:'IRT Thomas Holt Kirrawee', addr:'1-25 Acacia Rd',       suburb:'Kirrawee',         state:'NSW',postcode:'2232',contact:'',phone:'',email:'',notes:''},
  {id:'cx_irt_04',clientId:'c4',name:'IRT William Beach Gardens',addr:'1-5 The Avenue',       suburb:'Kanahooka',        state:'NSW',postcode:'2530',contact:'',phone:'',email:'',notes:''},
  {id:'cx_irt_05',clientId:'c4',name:'IRT Sarah Claydon',        addr:'130-154 Loftus St',    suburb:'North Wollongong', state:'NSW',postcode:'2500',contact:'',phone:'',email:'',notes:''},
  {id:'cx_irt_06',clientId:'c4',name:'IRT Tarrawanna Gardens',   addr:'2 Foothills Rd',       suburb:'Tarrawanna',       state:'NSW',postcode:'2518',contact:'',phone:'',email:'',notes:''},
  {id:'cx_irt_07',clientId:'c4',name:'IRT Five Islands Court',   addr:'179 Five Islands Rd',  suburb:'Cringila',         state:'NSW',postcode:'2502',contact:'',phone:'',email:'',notes:''},
  {id:'cx_irt_08',clientId:'c4',name:'IRT Kanahooka',            addr:'260 Kanahooka Rd',     suburb:'Kanahooka',        state:'NSW',postcode:'2530',contact:'',phone:'',email:'',notes:''},
  {id:'cx_irt_09',clientId:'c4',name:'IRT Culburra Beach',       addr:'110 The Lake Circuit', suburb:'Culburra Beach',   state:'NSW',postcode:'2540',contact:'',phone:'',email:'',notes:''},
  {id:'cx_irt_10',clientId:'c4',name:'IRT St Georges Basin',     addr:'1 Meriton St',         suburb:'St Georges Basin', state:'NSW',postcode:'2540',contact:'',phone:'',email:'',notes:''},
  {id:'cx_irt_11',clientId:'c4',name:'IRT Nowra',                addr:'42-60 Worrigee St',    suburb:'Nowra',            state:'NSW',postcode:'2541',contact:'',phone:'',email:'',notes:''},
  {id:'cx_irt_12',clientId:'c4',name:'IRT Greenwell Gardens',    addr:'4 Brinawarr St',       suburb:'Bomaderry',        state:'NSW',postcode:'2541',contact:'',phone:'',email:'',notes:''},
  {id:'cx_irt_13',clientId:'c4',name:'IRT Shoalhaven',           addr:'18 Brinawarr St',      suburb:'Bomaderry',        state:'NSW',postcode:'2541',contact:'',phone:'',email:'',notes:''},
  {id:'cx_irt_14',clientId:'c4',name:'IRT Peakhurst',            addr:'24 Turpentine Ave',    suburb:'Peakhurst',        state:'NSW',postcode:'2210',contact:'',phone:'',email:'',notes:''},
  {id:'cx_irt_15',clientId:'c4',name:'IRT Berala',               addr:'13 St Johns Rd',       suburb:'Berala',           state:'NSW',postcode:'2141',contact:'',phone:'',email:'',notes:''},
  {id:'cx_irt_16',clientId:'c4',name:'IRT Macarthur',            addr:'1 Hyde Parade',        suburb:'Campbelltown',     state:'NSW',postcode:'2560',contact:'',phone:'',email:'',notes:''},
  {id:'cx_irt_17',clientId:'c4',name:'IRT Auburn',               addr:'1-3 Harrow Rd',        suburb:'Auburn',           state:'NSW',postcode:'2144',contact:'',phone:'',email:'',notes:''},
  {id:'cx_irt_18',clientId:'c4',name:'IRT Kangara Waters',       addr:'2 Joy Cummings Pl',    suburb:'Belconnen',        state:'ACT',postcode:'2617',contact:'',phone:'',email:'',notes:''},
  {id:'cx_irt_19',clientId:'c4',name:'IRT Dalmeny',              addr:'50 Dalmeny Dr',        suburb:'Dalmeny',          state:'NSW',postcode:'2546',contact:'',phone:'',email:'',notes:''},
  {id:'cx_irt_20',clientId:'c4',name:'IRT Moruya',               addr:'6-10 Evans St',        suburb:'Moruya',           state:'NSW',postcode:'2537',contact:'',phone:'',email:'',notes:''},
];

const DASSETS=[
  // IRT William Beach Gardens — 124 TMVs (imported from Tradehack)
  {id:'wbg_tmv_001',type:'TMV',ref:"WBG-TMV-001",clientId:'c4',cxId:'cx_irt_04',loc:"Eleouera Cottage \u00b7 Corridor- On the wall between room 143 and 144",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-05',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_002',type:'TMV',ref:"WBG-TMV-002",clientId:'c4',cxId:'cx_irt_04',loc:"Eleouera Cottage \u00b7 Corridor- On the wall between 141a and 142",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-05',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_003',type:'TMV',ref:"WBG-TMV-003",clientId:'c4',cxId:'cx_irt_04',loc:"Eleouera Cottage \u00b7 Corridor- On the wall between 145 and 146",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-05',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_004',type:'TMV',ref:"WBG-TMV-004",clientId:'c4',cxId:'cx_irt_04',loc:"Eleouera Cottage \u00b7 Laundry- In dirty linen room on wall",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-06',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_005',type:'TMV',ref:"WBG-TMV-005",clientId:'c4',cxId:'cx_irt_04',loc:"Eleouera Cottage \u00b7 Corridor- On the wall between 147 and 148",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-06',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_006',type:'TMV',ref:"WBG-TMV-006",clientId:'c4',cxId:'cx_irt_04',loc:"Eleouera Cottage \u00b7 Above the hand wash sink in pantry/kitchen",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-06',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_007',type:'TMV',ref:"WBG-TMV-007",clientId:'c4',cxId:'cx_irt_04',loc:"Eleouera Cottage \u00b7 Corridor- On the wall between 149 and 150",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-06',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_008',type:'TMV',ref:"WBG-TMV-008",clientId:'c4',cxId:'cx_irt_04',loc:"Eleouera Cottage \u00b7 Corridor- On the wall between 151 and 152",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-06',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_009',type:'TMV',ref:"WBG-TMV-009",clientId:'c4',cxId:'cx_irt_04',loc:"Eleouera Cottage \u00b7 Corridor- On the wall between 157 and unisex bathroom",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-06',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_010',type:'TMV',ref:"WBG-TMV-010",clientId:'c4',cxId:'cx_irt_04',loc:"Eleouera Cottage \u00b7 Corridor- On the wall between 153 and 154",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-06',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_011',type:'TMV',ref:"WBG-TMV-011",clientId:'c4',cxId:'cx_irt_04',loc:"Eleouera Cottage \u00b7 Corridor- On the wall between 155 and 156",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-06',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_012',type:'TMV',ref:"WBG-TMV-012",clientId:'c4',cxId:'cx_irt_04',loc:"Nebo Cottage \u00b7 Corridor- On the wall between 173 and 174",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2026-01-05',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_013',type:'TMV',ref:"WBG-TMV-013",clientId:'c4',cxId:'cx_irt_04',loc:"Nebo Cottage \u00b7 Corridor- On the wall between 171 and 172",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-12-29',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_014',type:'TMV',ref:"WBG-TMV-014",clientId:'c4',cxId:'cx_irt_04',loc:"Nebo Cottage \u00b7 Laundry- In dirty linen room on wall",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-12-29',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_015',type:'TMV',ref:"WBG-TMV-015",clientId:'c4',cxId:'cx_irt_04',loc:"Nebo Cottage \u00b7 Corridor- On the wall between 169 and 170",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-12-29',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_016',type:'TMV',ref:"WBG-TMV-016",clientId:'c4',cxId:'cx_irt_04',loc:"Nebo Cottage \u00b7 Above the hand wash sink in pantry/kitchen",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-12-29',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_017',type:'TMV',ref:"WBG-TMV-017",clientId:'c4',cxId:'cx_irt_04',loc:"Nebo Cottage \u00b7 On the wall in the cleaners room which is located between the two kitchens (Eleouera and Nebo)",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-12-29',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_018',type:'TMV',ref:"WBG-TMV-018",clientId:'c4',cxId:'cx_irt_04',loc:"Nebo Cottage \u00b7 Corridor- On the wall between 167 and 168",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-12-29',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_019',type:'TMV',ref:"WBG-TMV-019",clientId:'c4',cxId:'cx_irt_04',loc:"Nebo Cottage \u00b7 Corridor- On the wall between 165 and 166",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-12-29',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_020',type:'TMV',ref:"WBG-TMV-020",clientId:'c4',cxId:'cx_irt_04',loc:"Nebo Cottage \u00b7 Corridor- On the wall between 158 and 159",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-12-29',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_021',type:'TMV',ref:"WBG-TMV-021",clientId:'c4',cxId:'cx_irt_04',loc:"Nebo Cottage \u00b7 Corridor- On the wall between 160 and 161",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-12-29',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_022',type:'TMV',ref:"WBG-TMV-022",clientId:'c4',cxId:'cx_irt_04',loc:"Nebo Cottage \u00b7 Corridor- On the wall between 163 and 164",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2026-01-05',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_023',type:'TMV',ref:"WBG-TMV-023",clientId:'c4',cxId:'cx_irt_04',loc:"Nebo Cottage \u00b7 Corridor-On the wall beside 162",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-12-29',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_024',type:'TMV',ref:"WBG-TMV-024",clientId:'c4',cxId:'cx_irt_04',loc:"Admin \u00b7 Male toilets",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-06',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_025',type:'TMV',ref:"WBG-TMV-025",clientId:'c4',cxId:'cx_irt_04',loc:"Admin \u00b7 Female toilets",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-06',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_026',type:'TMV',ref:"WBG-TMV-026",clientId:'c4',cxId:'cx_irt_04',loc:"Kiosk \u00b7 On the wall beside counter",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-06',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_027',type:'TMV',ref:"WBG-TMV-027",clientId:'c4',cxId:'cx_irt_04',loc:"Admin \u00b7 Therapy services room, above basin",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-06',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_028',type:'TMV',ref:"WBG-TMV-028",clientId:'c4',cxId:'cx_irt_04',loc:"Flinders Court West \u00b7 Corridor- On wall beside pantry/kitchen",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-07',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_029',type:'TMV',ref:"WBG-TMV-029",clientId:'c4',cxId:'cx_irt_04',loc:"Flinders Court West \u00b7 Corridor- On wall next to 211",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-07',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_030',type:'TMV',ref:"WBG-TMV-030",clientId:'c4',cxId:'cx_irt_04',loc:"Flinders Court West \u00b7 Corridor- On wall between 201 and 202",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-07',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_031',type:'TMV',ref:"WBG-TMV-031",clientId:'c4',cxId:'cx_irt_04',loc:"Flinders Court West \u00b7 Corridor- On wall between 209 and 210",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-07',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_032',type:'TMV',ref:"WBG-TMV-032",clientId:'c4',cxId:'cx_irt_04',loc:"Flinders Court West \u00b7 Corridor- On wall between 203 and 204",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-07',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_033',type:'TMV',ref:"WBG-TMV-033",clientId:'c4',cxId:'cx_irt_04',loc:"Flinders Court West \u00b7 Cleaners room beside 208",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-07',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_034',type:'TMV',ref:"WBG-TMV-034",clientId:'c4',cxId:'cx_irt_04',loc:"Flinders Court West \u00b7 Corridor- On wall between 205 and 206",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-07',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_035',type:'TMV',ref:"WBG-TMV-035",clientId:'c4',cxId:'cx_irt_04',loc:"Flinders Court West \u00b7 Staff room beside 207",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-07',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_036',type:'TMV',ref:"WBG-TMV-036",clientId:'c4',cxId:'cx_irt_04',loc:"Flinders Court East \u00b7 Corridor- On wall beside 184",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-06',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_037',type:'TMV',ref:"WBG-TMV-037",clientId:'c4',cxId:'cx_irt_04',loc:"Flinders Court East \u00b7 Corridor- On wall between 185 and 186",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-06',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_038',type:'TMV',ref:"WBG-TMV-038",clientId:'c4',cxId:'cx_irt_04',loc:"Flinders Court East \u00b7 Corridor- On wall between 182 and 183",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-06',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_039',type:'TMV',ref:"WBG-TMV-039",clientId:'c4',cxId:'cx_irt_04',loc:"Flinders Court East \u00b7 Corridor- On the wall between 187 and 188",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-06',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_040',type:'TMV',ref:"WBG-TMV-040",clientId:'c4',cxId:'cx_irt_04',loc:"Flinders Court East \u00b7 Corridor- On the wall between 180 and 181",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-06',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_041',type:'TMV',ref:"WBG-TMV-041",clientId:'c4',cxId:'cx_irt_04',loc:"Flinders Court East \u00b7 Corridor- On the wall beside 189",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-06',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_042',type:'TMV',ref:"WBG-TMV-042",clientId:'c4',cxId:'cx_irt_04',loc:"Flinders Court East \u00b7 Dirty utility room",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-06',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_043',type:'TMV',ref:"WBG-TMV-043",clientId:'c4',cxId:'cx_irt_04',loc:"Flinders Court East \u00b7 Corridor- On wall beside pantry/kitchen",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-06',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_044',type:'TMV',ref:"WBG-TMV-044",clientId:'c4',cxId:'cx_irt_04',loc:"Flinders Court East \u00b7 Corridor- On wall between 178 and 179",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-07',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_045',type:'TMV',ref:"WBG-TMV-045",clientId:'c4',cxId:'cx_irt_04',loc:"Flinders Court East \u00b7 Corridor- On wall beside 190",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-07',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_046',type:'TMV',ref:"WBG-TMV-046",clientId:'c4',cxId:'cx_irt_04',loc:"Flinders Court East \u00b7 Corridor- On wall between 176 and 177",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-07',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_047',type:'TMV',ref:"WBG-TMV-047",clientId:'c4',cxId:'cx_irt_04',loc:"Flinders Court East \u00b7 Corridor- On wall between 191 and 192",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-07',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_048',type:'TMV',ref:"WBG-TMV-048",clientId:'c4',cxId:'cx_irt_04',loc:"Flinders Court East \u00b7 Corridor- On wall between 193 and Laundry",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-07',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_049',type:'TMV',ref:"WBG-TMV-050",clientId:'c4',cxId:'cx_irt_04',loc:"Flinders Court West \u00b7 Laundry -On wall next to sink",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-07',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_050',type:'TMV',ref:"WBG-TMV-051",clientId:'c4',cxId:'cx_irt_04',loc:"Flinders Court West \u00b7 Corridor- On wall between 194 and 195",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-07',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_051',type:'TMV',ref:"WBG-TMV-052",clientId:'c4',cxId:'cx_irt_04',loc:"Flinders Court West \u00b7 Corridor- On wall beside dirty utility room",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-07',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_052',type:'TMV',ref:"WBG-TMV-053",clientId:'c4',cxId:'cx_irt_04',loc:"Flinders Court West \u00b7 Corridor- On wall between 196 and 197",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-07',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_053',type:'TMV',ref:"WBG-TMV-054",clientId:'c4',cxId:'cx_irt_04',loc:"Flinders Court West \u00b7 Corridor- On wall between 214 and 215",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-07',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_054',type:'TMV',ref:"WBG-TMV-055",clientId:'c4',cxId:'cx_irt_04',loc:"Flinders Court West \u00b7 Corridor- On wall between 198 and 199",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-07',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_055',type:'TMV',ref:"WBG-TMV-056",clientId:'c4',cxId:'cx_irt_04',loc:"Flinders Court West \u00b7 Corridor- On wall between 212 and 213",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-07',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_056',type:'TMV',ref:"WBG-TMV-057",clientId:'c4',cxId:'cx_irt_04',loc:"The Grange \u00b7 Corridor- On wall between 228 and 229",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-07',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_057',type:'TMV',ref:"WBG-TMV-058",clientId:'c4',cxId:'cx_irt_04',loc:"The Grange \u00b7 Corridor- On wall between 226 and 227",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-07',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_058',type:'TMV',ref:"WBG-TMV-059",clientId:'c4',cxId:'cx_irt_04',loc:"The Grange \u00b7 Corridor- On wall between 230 and 231",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-07',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_059',type:'TMV',ref:"WBG-TMV-060",clientId:'c4',cxId:'cx_irt_04',loc:"The Grange \u00b7 Corridor- On wall between 224 and 225",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-07',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_060',type:'TMV',ref:"WBG-TMV-061",clientId:'c4',cxId:'cx_irt_04',loc:"The Grange \u00b7 Above hand wash sink in pantry/kitchen",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-07',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_061',type:'TMV',ref:"WBG-TMV-062",clientId:'c4',cxId:'cx_irt_04',loc:"The Grange \u00b7 Cleaners room",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-07',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_062',type:'TMV',ref:"WBG-TMV-063",clientId:'c4',cxId:'cx_irt_04',loc:"The Grange \u00b7 Bathroom",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-07',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_063',type:'TMV',ref:"WBG-TMV-064",clientId:'c4',cxId:'cx_irt_04',loc:"The Grange \u00b7 Electrical/store room beside 223",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-07',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_064',type:'TMV',ref:"WBG-TMV-065",clientId:'c4',cxId:'cx_irt_04',loc:"The Grange \u00b7 Laundry",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-07',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_065',type:'TMV',ref:"WBG-TMV-066",clientId:'c4',cxId:'cx_irt_04',loc:"The Grange \u00b7 Corridor- On wall between 221 and 222",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-07',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_066',type:'TMV',ref:"WBG-TMV-067",clientId:'c4',cxId:'cx_irt_04',loc:"The Grange \u00b7 Linen store beside 216",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-07',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_067',type:'TMV',ref:"WBG-TMV-068",clientId:'c4',cxId:'cx_irt_04',loc:"The Grange \u00b7 Corridor- On wall between 217 and 218",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-07',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_068',type:'TMV',ref:"WBG-TMV-069",clientId:'c4',cxId:'cx_irt_04',loc:"The Grange \u00b7 Corridor- On wall between 219 and 220",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-07',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_069',type:'TMV',ref:"WBG-TMV-000",clientId:'c4',cxId:'cx_irt_04',loc:"Huntley Cottage \u00b7 Corridor- On wall between 234 and 235",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-07',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_070',type:'TMV',ref:"WBG-TMV-071",clientId:'c4',cxId:'cx_irt_04',loc:"Huntley Cottage \u00b7 Outside in Garden store, beside 236",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-06',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_071',type:'TMV',ref:"WBG-TMV-072",clientId:'c4',cxId:'cx_irt_04',loc:"Huntley Cottage \u00b7 Corridor- On wall between 237 and 238",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-07',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_072',type:'TMV',ref:"WBG-TMV-073",clientId:'c4',cxId:'cx_irt_04',loc:"Huntley Cottage \u00b7 Corridor- On wall between 232 and 233",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-07',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_073',type:'TMV',ref:"WBG-TMV-000",clientId:'c4',cxId:'cx_irt_04',loc:"Huntley Cottage \u00b7 Above hand wash sink in pantry/kitchen",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-07',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_074',type:'TMV',ref:"WBG-TMV-075",clientId:'c4',cxId:'cx_irt_04',loc:"Huntley Cottage \u00b7 Corridor- On wall between 239 and 240",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-07',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_075',type:'TMV',ref:"WBG-TMV-000",clientId:'c4',cxId:'cx_irt_04',loc:"Huntley Cottage \u00b7 On wall in Laundry",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-07',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_076',type:'TMV',ref:"WBG-TMV-000",clientId:'c4',cxId:'cx_irt_04',loc:"Huntley Cottage \u00b7 Corridor- On wall between 244 and 245",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-07',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_077',type:'TMV',ref:"WBG-TMV-078",clientId:'c4',cxId:'cx_irt_04',loc:"Huntley Cottage \u00b7 Corridor- On wall between 241 and 242",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-07',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_078',type:'TMV',ref:"WBG-TMV-079",clientId:'c4',cxId:'cx_irt_04',loc:"Huntley Cottage \u00b7 Corridor- On wall beside 243",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-07',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_079',type:'TMV',ref:"WBG-TMV-000",clientId:'c4',cxId:'cx_irt_04',loc:"Huntley Cottage \u00b7 Cleaners room, corridor leading to Kembla Cottage",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-07',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_080',type:'TMV',ref:"WBG-TMV-000",clientId:'c4',cxId:'cx_irt_04',loc:"Kembla Cottage \u00b7 Corridor- On wall between 249 and 250",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-06',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_081',type:'TMV',ref:"WBG-TMV-082",clientId:'c4',cxId:'cx_irt_04',loc:"Kembla Cottage \u00b7 Outside in Garden Store, beside 248",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-06',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_082',type:'TMV',ref:"WBG-TMV-083",clientId:'c4',cxId:'cx_irt_04',loc:"Kembla Cottage \u00b7 Corridor- On wall between 251 and 252",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-06',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_083',type:'TMV',ref:"WBG-TMV-084",clientId:'c4',cxId:'cx_irt_04',loc:"Kembla Cottage \u00b7 Corridor- On wall between 246 and 247",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-06',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_084',type:'TMV',ref:"WBG-TMV-085",clientId:'c4',cxId:'cx_irt_04',loc:"Kembla Cottage \u00b7 Corridor- On wall between 253 and 254",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-06',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_085',type:'TMV',ref:"WBG-TMV-086",clientId:'c4',cxId:'cx_irt_04',loc:"Kembla Cottage \u00b7 Above hand wash in pantry/kitchen",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-06',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_086',type:'TMV',ref:"WBG-TMV-087",clientId:'c4',cxId:'cx_irt_04',loc:"Kembla Cottage \u00b7 In unisex bathroom beside 255",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-06',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_087',type:'TMV',ref:"WBG-TMV-088",clientId:'c4',cxId:'cx_irt_04',loc:"Kembla Cottage \u00b7 Corridor- On wall between 256 and 257",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-06',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_088',type:'TMV',ref:"WBG-TMV-089",clientId:'c4',cxId:'cx_irt_04',loc:"Kembla Cottage \u00b7 Corridor - On wall between 258 and 259",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-06',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_089',type:'TMV',ref:"WBG-TMV-040",clientId:'c4',cxId:'cx_irt_04',loc:"040 Akuna \u00b7 Room 102",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-04',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_090',type:'TMV',ref:"WBG-TMV-091",clientId:'c4',cxId:'cx_irt_04',loc:"104 Akuna \u00b7 Room 104",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-04',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_091',type:'TMV',ref:"WBG-TMV-092",clientId:'c4',cxId:'cx_irt_04',loc:"106 Akuna \u00b7 Room 106",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-04',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_092',type:'TMV',ref:"WBG-TMV-093",clientId:'c4',cxId:'cx_irt_04',loc:"107 Akuna \u00b7 Room 107",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-04',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_093',type:'TMV',ref:"WBG-TMV-094",clientId:'c4',cxId:'cx_irt_04',loc:"108 Akuna \u00b7 Room 108",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-04',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_094',type:'TMV',ref:"WBG-TMV-095",clientId:'c4',cxId:'cx_irt_04',loc:"110 Akuna \u00b7 Room 110",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-04',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_095',type:'TMV',ref:"WBG-TMV-096",clientId:'c4',cxId:'cx_irt_04',loc:"118 Akuna \u00b7 Room 118",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-04',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_096',type:'TMV',ref:"WBG-TMV-097",clientId:'c4',cxId:'cx_irt_04',loc:"115 Akuna \u00b7 Room 115",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-04',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_097',type:'TMV',ref:"WBG-TMV-098",clientId:'c4',cxId:'cx_irt_04',loc:"117 Akuna \u00b7 Room 117",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-04',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_098',type:'TMV',ref:"WBG-TMV-099",clientId:'c4',cxId:'cx_irt_04',loc:"114 Akuna \u00b7 Room 114",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-04',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_099',type:'TMV',ref:"WBG-TMV-100",clientId:'c4',cxId:'cx_irt_04',loc:"120 Akuna \u00b7 Room 120",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-04',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_100',type:'TMV',ref:"WBG-TMV-101",clientId:'c4',cxId:'cx_irt_04',loc:"121 Akuna \u00b7 Room 121",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-04',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_101',type:'TMV',ref:"WBG-TMV-102",clientId:'c4',cxId:'cx_irt_04',loc:"122 Akuna \u00b7 Room 122",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-06',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_102',type:'TMV',ref:"WBG-TMV-103",clientId:'c4',cxId:'cx_irt_04',loc:"Akuna \u00b7 Room123",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-09-16',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_103',type:'TMV',ref:"WBG-TMV-124",clientId:'c4',cxId:'cx_irt_04',loc:"125 Akuna \u00b7 Room 125",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-04',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_104',type:'TMV',ref:"WBG-TMV-105",clientId:'c4',cxId:'cx_irt_04',loc:"128 Akuna \u00b7 Room 128",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-05',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_105',type:'TMV',ref:"WBG-TMV-110",clientId:'c4',cxId:'cx_irt_04',loc:"130 Akuna \u00b7 Room 130",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-05',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_106',type:'TMV',ref:"WBG-TMV-107",clientId:'c4',cxId:'cx_irt_04',loc:"131 Akuna \u00b7 Room 131",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-05',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_107',type:'TMV',ref:"WBG-TMV-108",clientId:'c4',cxId:'cx_irt_04',loc:"132 Akuna \u00b7 Room 132",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-05',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_108',type:'TMV',ref:"WBG-TMV-109",clientId:'c4',cxId:'cx_irt_04',loc:"134 Akuna \u00b7 Room 134",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-05',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_109',type:'TMV',ref:"WBG-TMV-106",clientId:'c4',cxId:'cx_irt_04',loc:"136 Akuna \u00b7 Room 136",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-05',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_110',type:'TMV',ref:"WBG-TMV-111",clientId:'c4',cxId:'cx_irt_04',loc:"138 Akuna \u00b7 Room 138",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-05',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_111',type:'TMV',ref:"WBG-TMV-112",clientId:'c4',cxId:'cx_irt_04',loc:"140 Akuna \u00b7 Room 140",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-05',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_112',type:'TMV',ref:"WBG-TMV-113",clientId:'c4',cxId:'cx_irt_04',loc:"Akuna \u00b7 Cleaners room behind toilet",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-05',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_113',type:'TMV',ref:"WBG-TMV-114",clientId:'c4',cxId:'cx_irt_04',loc:"Akuna \u00b7 Kitchen ceiling",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-07',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_114',type:'TMV',ref:"WBG-TMV-115",clientId:'c4',cxId:'cx_irt_04',loc:"Akuna \u00b7 In bathroom of gym",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-05',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_115',type:'TMV',ref:"WBG-TMV-116",clientId:'c4',cxId:'cx_irt_04',loc:"Akuna \u00b7 Under vanity opp room 140",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-05',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_116',type:'TMV',ref:"WBG-TMV-001",clientId:'c4',cxId:'cx_irt_04',loc:"KEMIRA \u00b7 Community hall kitchen",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-05',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_117',type:'TMV',ref:"WBG-TMV-000",clientId:'c4',cxId:'cx_irt_04',loc:"KEMIRA \u00b7 Community hall male toilets behind door",make:"Rada",model:"215",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-05',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_118',type:'TMV',ref:"WBG-TMV-000",clientId:'c4',cxId:'cx_irt_04',loc:"KEMIRA \u00b7 Main kitchen under bench",make:"Caleffe",model:"2522tmx",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-05',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_119',type:'TMV',ref:"WBG-TMV-000",clientId:'c4',cxId:'cx_irt_04',loc:"KEMIRA \u00b7 Staff bathroom",make:"Caleffe",model:"2522tmx",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-05',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_120',type:'TMV',ref:"WBG-TMV-000",clientId:'c4',cxId:'cx_irt_04',loc:"KEMIRA \u00b7 Staff kitchen",make:"Caleffe",model:"2522tmx",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-05',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_121',type:'TMV',ref:"WBG-TMV-000",clientId:'c4',cxId:'cx_irt_04',loc:"KEMIRA \u00b7 Respite room 1",make:"Caleffe",model:"2522tmx",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-05',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_122',type:'TMV',ref:"WBG-TMV-000",clientId:'c4',cxId:'cx_irt_04',loc:"KEMIRA \u00b7 Respite room 2",make:"Caleffe",model:"2522tmx",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-05',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_123',type:'TMV',ref:"WBG-TMV-000",clientId:'c4',cxId:'cx_irt_04',loc:"KEMIRA \u00b7 Respite room 4",make:"Caleffe",model:"2522tmx",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-05',result:'Pass',notes:'',log:[]},
  {id:'wbg_tmv_124',type:'TMV',ref:"WBG-TMV-000",clientId:'c4',cxId:'cx_irt_04',loc:"KEMIRA \u00b7 Disabled bathroom",make:"Caleffe",model:"2522tmx",serial:'',cap:'',month:'November',intv:'annual',svcDate:'2025-11-05',result:'Pass',notes:'',log:[]}
];

const DUSERS=[
  {id:'u1',username:'admin',password:'admin',name:'Admin User',role:'admin',company:'ComplyTrack',email:'admin@aquacomply.com.au',phone:'07 3000 0100',mobile:'0400 000 100',licence:'',perms:{rec:true,edit:true,add:true,hist:true,exp:true,mgr:true}},
  {id:'u2',username:'tech1',password:'tech1',name:'Tom Brown', role:'technician',company:'ComplyTrack',email:'tom@aquacomply.com.au',phone:'',mobile:'0400 000 101',licence:'QLD PL98765',perms:{rec:true,edit:false,add:false,hist:true,exp:false,mgr:false}},
];

const DSETTINGS={
  emailSubj:'Service Report — {{complex}} — {{month}} {{year}}',
  emailBody:'Dear {{client}},\n\nPlease find the service report for {{complex}} — {{month}} {{year}}.\n\nAddress: {{complex_addr}}\n\nSummary:\n• Assets: {{total_assets}}\n• Completed: {{completed}}\n• Overdue/Failed: {{overdue}}\n\n{{asset_list}}\n\nRegards,\n{{tech_name}}\n{{tech_company}}\n{{tech_phone}}',
  company:{
    name:'Fairy Meadow Plumbing',
    trading:'',
    abn:'',
    licence:'',
    phone:'02 4229 9590',
    mobile:'',
    email:'Sales@fairymeadowplumbing.com',
    web:'www.fairymeadowplumbing.com.au',
    addr:'',
    suburb:'Fairy Meadow',
    state:'NSW',
    postcode:'2519',
    tagline:'Certified Water System Specialists',
    colour:'#0a2540',
    rptTitle:'Water System Compliance Report',
    disclaimer:'This report has been prepared in accordance with AS/NZS 3500 and relevant state legislation.',
  },
  rptTpl:{
    co:'Fairy Meadow Plumbing',
    tag:'Certified Water System Specialists',
    abn:'',
    ph:'02 4229 9590',
    em:'Sales@fairymeadowplumbing.com',
    web:'www.fairymeadowplumbing.com.au',
    col:'#0a2540',
    title:'Water System Compliance Report',
    disc:'This report has been prepared in accordance with AS/NZS 3500 and relevant state legislation.',
    sections:{det:true,tech:true,assets:true,log:true,sign:false,foot:true}
  }
};
