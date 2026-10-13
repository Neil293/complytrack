// TMV Fill for Tradehack: loaded by the tmvfill bookmark. Not part of the ComplyTrack app.
(() => { try {
  if (window.__tmvf) { window.__tmvf.toggle(); return; }
  const KEY = 'tmvf_settings_v1';
  const CR = [['checked','Checked'],['replaced','Replaced']], YN = [['yes','Yes'],['no','No']], PF = [['passed','Passed'],['failed','Failed']];
  const GROUPS = [
    ['Maintenance', [['strainer','Strainer','r',CR],['non_return_valves','Non-return valves','r',CR],['o_rings_and_seals','O-rings & seals','r',CR],['thermostatic_element','Thermostatic element','r',CR],['replacement_valve','Replacement valve?','r',YN]]],
    ['Temperatures (°C)', [['temperature_set_at','Valve set to','n'],['hot_water_temp','Hot water','n'],['cold_water_temp','Cold water','n'],['mixed_water_temp','Mixed water','n'],['mixed_min_flow','Minimum flow','n'],['mixed_max_flow','Maximum flow','n'],['spike_test','Spike test','n']]],
    ['Thermal shutdown', [['cold_isolation','Cold isolation','r',PF],['hot_isolation','Hot isolation','r',PF]]],
    ['Dynamic pressure (kPa)', [['cold_water_kpa','Cold water','n'],['hot_water_kpa','Hot water','n']]],
    ['Sign-off', [['result','Test result','r',[['auto','Auto (from limits)'],...PF]],['valve_tested_by','Valve tested by','t'],['plumbers_licence_number','Licence number','t'],['comments','Comments','a']]],
  ];
  const FIELDS = GROUPS.flatMap(g => g[1]);
  const DEF = { activePreset: 'standard', onlyEmpty: false, dateToday: true, highlight: true, container: true, autoNext: true, autoOpen: false, reverse: false, openValveId: true, maxMixed: 45, maxSpike: 46,
    presets: [{ id: 'standard', name: 'Standard service – 42.5°C', values: {
      strainer:'checked', non_return_valves:'checked', o_rings_and_seals:'checked', thermostatic_element:'checked', replacement_valve:'no',
      temperature_set_at:'42.5', hot_water_temp:'65', cold_water_temp:'18', mixed_water_temp:'42.5', mixed_min_flow:'42.5', mixed_max_flow:'43', spike_test:'44',
      cold_isolation:'passed', hot_isolation:'passed', cold_water_kpa:'', hot_water_kpa:'', result:'auto', valve_tested_by:'', plumbers_licence_number:'', comments:'' } }] };
  const clone = o => JSON.parse(JSON.stringify(o));
  const load = () => { try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && s.presets && s.presets.length) return s; } catch (e) {} return clone(DEF); };
  const save = s => { try { localStorage.setItem(KEY, JSON.stringify(s)); return true; } catch (e) { return false; } };
  let S = load();
  const esc = t => String(t).replace(/[&<>"]/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]));

  // ---------- filling ----------
  let frame = null; // set when container mode is running
  const findForm = () => {
    const docs = frame ? [] : [document];
    document.querySelectorAll('iframe').forEach(f => { try { if (f.contentDocument) docs.push(f.contentDocument); } catch (e) {} });
    const all = docs.flatMap(d => [...d.querySelectorAll('form.tmv_form')]);
    return all.find(f => f.offsetParent !== null) || all[0] || null;
  };
  const fire = el => { const E = (el.ownerDocument.defaultView || window).Event; el.dispatchEvent(new E('input', { bubbles: true })); el.dispatchEvent(new E('change', { bubbles: true })); };
  const rv = (f, n) => { const r = f.querySelector('input[type=radio][name="' + n + '"]:checked'); return r ? r.value : ''; };
  const setR = (f, n, v, only) => {
    if (only && rv(f, n)) return false;
    const r = f.querySelector('input[type=radio][name="' + n + '"][value="' + v + '"]');
    if (!r) return false;
    if (!r.checked) r.click();
    if (!r.checked) { r.checked = true; fire(r); }
    return true;
  };
  const setI = (f, n, v, only) => {
    const el = f.querySelector('[name="' + n + '"]');
    if (!el || (only && el.value !== '')) return null;
    el.value = v; fire(el); return el;
  };
  const num = (f, n) => { const el = f.querySelector('[name="' + n + '"]'); const v = el ? parseFloat(el.value) : NaN; return isNaN(v) ? null : v; };
  const judge = f => {
    const why = [];
    ['mixed_water_temp','mixed_min_flow','mixed_max_flow'].forEach(n => { const v = num(f, n); if (v !== null && v > S.maxMixed) why.push(n.replace(/_/g, ' ') + ' ' + v + '°C > ' + S.maxMixed); });
    const sp = num(f, 'spike_test'); if (sp !== null && sp > S.maxSpike) why.push('spike ' + sp + '°C > ' + S.maxSpike);
    if (rv(f, 'cold_isolation') === 'failed') why.push('cold isolation failed');
    if (rv(f, 'hot_isolation') === 'failed') why.push('hot isolation failed');
    return why;
  };
  const today = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
  function fill() {
    const f = findForm();
    if (!f) return toast('No TMV form found — open the device test popup first, then tap Fill.', true);
    const p = S.presets.find(x => x.id === sel.value) || S.presets[0], v = p.values || {};
    f.querySelectorAll('.tmvf-check').forEach(e => { e.classList.remove('tmvf-check'); e.style.background = ''; e.style.boxShadow = ''; });
    setR(f, 'form_type', 'testing', false);
    let c = 0;
    FIELDS.forEach(([n, , t]) => {
      const val = v[n];
      if (val === undefined || val === '' || n === 'result') return;
      if (t === 'r') { if (setR(f, n, val, S.onlyEmpty)) c++; }
      else { const el = setI(f, n, val, S.onlyEmpty); if (el) { c++; if (S.highlight && t === 'n') { el.classList.add('tmvf-check'); el.style.background = '#fff7cc'; el.style.boxShadow = 'inset 0 0 0 2px #f0b400'; } } }
    });
    if (S.dateToday && setI(f, 'date_of_test', today(), false)) c++;
    let msg = 'Filled ' + c + ' fields from “' + p.name + '”.', bad = false;
    if (v.result === 'auto') { const why = judge(f); bad = why.length > 0; setR(f, 'result', bad ? 'failed' : 'passed', false); msg += bad ? ' Result: FAILED (' + why.join('; ') + ').' : ' Result: PASSED.'; }
    else if (v.result) setR(f, 'result', v.result, S.onlyEmpty);
    if (S.highlight) msg += ' Check the yellow readings before Complete Test.';
    if (bad) toast(msg, true); else toast('Done', false, 1000);
    // bring the Complete Test button into view (the popup scrolls inside itself, so scroll to the button rather than the window)
    const done = (f.closest('.modal') || f.ownerDocument).querySelector('._doSave_complete_btn') || [...f.ownerDocument.querySelectorAll('button')].filter(x => x.offsetParent !== null).pop();
    if (done) setTimeout(() => done.scrollIntoView({ behavior: 'smooth', block: 'end' }), 150);
  }

  // ---------- jump to the next valve that is "Not Yet Tested" ----------
  let lastCard = null, lastBadge = null;
  const curDoc = () => { try { return frame ? frame.contentDocument : document; } catch (e) { return null; } };
  function findBadges(d) {
    const badges = [];
    if (!d || !d.body) return badges;
    const tw = d.createTreeWalker(d.body, NodeFilter.SHOW_TEXT);
    while (tw.nextNode()) {
      if (/^\s*not yet tested\s*$/i.test(tw.currentNode.nodeValue)) {
        const el = tw.currentNode.parentElement;
        if (el && el.offsetParent !== null && !el.closest('.modal')) badges.push(el);
      }
    }
    return badges;
  }
  const isTestBtn = x => /^\s*test\s*$/i.test(x.textContent);
  const testBtnOf = card => card && [...card.querySelectorAll('a,button')].find(isTestBtn);
  // the valve's box: first ancestor that also contains its Test button
  const many = e => (e.textContent.match(/not yet tested/gi) || []).length > 1;
  function cardOf(b) {
    const d = b.ownerDocument; let e = b;
    while (e && e !== d.body && !many(e)) { if ([...e.querySelectorAll('a,button')].some(isTestBtn)) { const t = e.closest('table'); return t && !many(t) ? t : e; } e = e.parentElement; }
    const t = b.closest('table,.panel,.card'); return t && !many(t) ? t : b.parentElement;
  }
  // a stable name for a valve that survives a page reload: its Test link, or its details minus the status
  function valveKey(btn) {
    const h = (btn.getAttribute('href') || '').trim();
    // just the page path: the query string carries a test id that changes once the valve is tested
    if (h && h !== '#' && !/^javascript:/i.test(h)) { try { return 'h:' + new URL(h, btn.ownerDocument.baseURI).pathname; } catch (e) { return 'h:' + h.split('?')[0]; } }
    let c = btn; for (let k = 0; k < 8 && c.parentElement && !/^(TABLE|BODY)$/.test(c.tagName); k++) c = c.parentElement;
    return 't:' + c.textContent.replace(/not yet tested|tested|passed|pass|failed|fail|test/gi, '').replace(/\s+/g, ' ').trim();
  }
  let currentKey = null, currentIdx = -1; // the valve whose Test was last opened, and its place in the list
  function nextUntested(fromKey) {
    const d = curDoc();
    if (!d) return false;
    const win = d.defaultView, badges = findBadges(d), back = !!S.reverse;
    if (!badges.length) return toast('No valves left marked Not Yet Tested ✓', false, 2000);
    const header = [...d.querySelectorAll('nav,.navbar,header')].filter(n => getComputedStyle(n).position === 'fixed' || getComputedStyle(n).position === 'sticky').reduce((m, n) => Math.max(m, n.getBoundingClientRect().bottom), 0);
    const line = header + 24;
    let i = -1;
    if (fromKey || currentIdx >= 0) {
      // carry on from the valve just tested, in list order
      const all = [...d.querySelectorAll('a,button')].filter(x => isTestBtn(x) && x.offsetParent !== null && !x.closest('.modal'));
      let ref = all.findIndex(x => valveKey(x) === fromKey);
      if (ref < 0 && currentIdx >= 0 && currentIdx < all.length) ref = currentIdx; // fall back to its place in the list
      if (ref >= 0) {
        const pos = badges.map(b => all.indexOf(testBtnOf(cardOf(b))));
        if (!back) { i = pos.findIndex(p => p > ref); if (i < 0) i = 0; }
        else { for (let k = pos.length - 1; k >= 0; k--) if (pos[k] >= 0 && pos[k] < ref) { i = k; break; } if (i < 0) i = badges.length - 1; }
      }
    }
    if (i < 0) {
      // from where you are on screen
      if (!back) {
        i = badges.findIndex(b => b.getBoundingClientRect().top > line + 4);
        if (i >= 0 && badges[i] === lastBadge) i++; // couldn't scroll any further last time
        if (i < 0 || i >= badges.length) i = 0;
      } else {
        for (let k = badges.length - 1; k >= 0; k--) if (badges[k].getBoundingClientRect().top < line - 4) { i = k; break; }
        if (i >= 0 && badges[i] === lastBadge) i--; // couldn't scroll any further last time
        if (i < 0) i = badges.length - 1;
      }
    }
    lastBadge = badges[i];
    const card = cardOf(badges[i]);
    if (lastCard && lastCard.isConnected) { lastCard.style.outline = ''; lastCard.style.outlineOffset = ''; }
    card.style.outline = '4px solid #6f42c1'; card.style.outlineOffset = '2px'; lastCard = card;
    win.scrollTo({ top: win.scrollY + badges[i].getBoundingClientRect().top - line + 4, behavior: 'smooth' });
    toast((back ? '↑ ' : '') + (i + 1) + ' of ' + badges.length + ' not yet tested', false, 1200);
    return true;
  }
  function openTest() {
    const b = lastCard && lastCard.isConnected && testBtnOf(lastCard);
    if (b) b.click();
  }

  // ---------- when the test popup opens, open the Valve Identification section too ----------
  // (set the class directly: Tradehack's accordion would otherwise close the Testing section)
  function expandValveId(f) {
    const loc = f.querySelector('[name="location"]'), c = loc && loc.closest('.panel-collapse,.collapse');
    if (!c || c.classList.contains('in')) return;
    c.classList.add('in'); c.style.height = ''; c.setAttribute('aria-expanded', 'true');
    f.ownerDocument.querySelectorAll('[href$="#' + c.id + '"],[data-target="#' + c.id + '"]').forEach(a => { a.classList.remove('collapsed'); a.setAttribute('aria-expanded', 'true'); });
  }
  setInterval(() => {
    if (S.openValveId === false) return;
    const d = curDoc(); if (!d) return;
    d.querySelectorAll('form.tmv_form').forEach(f => {
      const shown = f.offsetParent !== null;
      if (shown && !f.__tmvfShown) expandValveId(f);
      f.__tmvfShown = shown;
    });
  }, 500);

  // ---------- after Complete Test: jump to the next valve automatically ----------
  let pending = 0, goingBack = false, scheduleUrl = null;
  const isSched = href => { try { return /\/schedule/i.test(new URL(href).pathname); } catch (e) { return false; } };
  function autoJump(tries) {
    tries = tries || 0;
    if (!findBadges(curDoc()).length && tries < 5) return setTimeout(() => autoJump(tries + 1), 800); // list may still be loading
    if (nextUntested(currentKey) && S.autoOpen) setTimeout(openTest, 900);
  }
  function afterComplete(d) {
    pending = 0;
    let href = ''; try { href = d.defaultView.location.href; } catch (e) {}
    if (isSched(href)) setTimeout(autoJump, 700);
    else if (frame && scheduleUrl) { goingBack = true; frame.contentWindow.location.href = scheduleUrl; }
  }
  function watchDoc(d) {
    if (!d || d.__tmvfWatched) return;
    d.__tmvfWatched = true;
    // remember which valve's Test you opened, so auto-jump carries on from there
    d.addEventListener('click', e => { const b = e.target.closest && e.target.closest('a,button'); if (b && isTestBtn(b) && !b.closest('.modal')) { currentKey = valveKey(b); currentIdx = [...d.querySelectorAll('a,button')].filter(x => isTestBtn(x) && x.offsetParent !== null && !x.closest('.modal')).indexOf(b); } }, true);
    d.addEventListener('click', e => {
      if (S.autoNext === false || !(e.target.closest && e.target.closest('._doSave_complete_btn'))) return;
      const t0 = pending = Date.now();
      const iv = setInterval(() => {
        if (pending !== t0) return clearInterval(iv);          // superseded, or a page load took over
        if (Date.now() - t0 > 30000) { pending = 0; return clearInterval(iv); } // popup never closed (e.g. a required field was missing)
        if (curDoc() !== d) return clearInterval(iv);          // page changed; the frame load handler carries on
        const f = d.querySelector('form.tmv_form');
        if (!f || f.offsetParent === null) { clearInterval(iv); afterComplete(d); }
      }, 400);
    }, true);
  }
  function onPageLoad(d, href) {
    watchDoc(d);
    if (isSched(href)) scheduleUrl = href;
    if (pending || goingBack) {
      const wasPending = pending; pending = 0;
      if (isSched(href)) { goingBack = false; setTimeout(autoJump, 900); }
      else if (wasPending && scheduleUrl) { goingBack = true; frame.contentWindow.location.href = scheduleUrl; }
      else goingBack = false;
    }
  }

  // ---------- UI (shadow DOM so Tradehack's styles don't clash) ----------
  const host = document.createElement('div');
  host.style.cssText = 'position:fixed;inset:auto 0 0 0;z-index:2147483647;pointer-events:none';
  // stop Bootstrap's modal focus-trap stealing focus from our inputs
  ['focusin','keydown','touchstart','mousedown','click'].forEach(t => host.addEventListener(t, e => e.stopPropagation()));
  const root = host.attachShadow({ mode: 'open' });
  root.innerHTML = `<style>
    *{box-sizing:border-box;font-family:system-ui,-apple-system,Roboto,Arial,sans-serif}
    .bar{pointer-events:auto;position:fixed;right:0;top:45%;display:flex;flex-direction:column;gap:6px;align-items:stretch;background:#fff;padding:4px 4px 6px 6px;border-radius:12px 0 0 12px;box-shadow:0 4px 20px rgba(0,0,0,.3);touch-action:none}
    button,select,input,textarea{font-size:16px}
    .bar button{border:0;border-radius:9px;width:52px;height:46px;padding:0;font-weight:700;cursor:pointer;line-height:1.05}.bar .next{height:52px;font-size:13px;background:#f36f21;color:#fff}.bar .next b{display:block;font-size:18px}.bar .fill{height:58px;font-size:13px}.bar .fill b{display:block;font-size:20px}.grip{height:20px;display:flex;align-items:center;justify-content:center;color:#999;font-size:14px;letter-spacing:2px;cursor:grab;user-select:none;-webkit-user-select:none}
    .fill{background:#6f42c1;color:#fff}.ico{background:#eee;color:#333}
    .bar select{width:52px;height:34px;border:1px solid #ccc;border-radius:9px;padding:0 2px;background:#fff;color:#222;font-size:11px}
    .toast{pointer-events:none;position:fixed;left:10px;right:10px;bottom:calc(76px + env(safe-area-inset-bottom));background:#1e7e34;color:#fff;padding:12px 14px;border-radius:10px;font-weight:600;font-size:15px;line-height:1.35;opacity:0;transform:translateY(10px);transition:.2s;box-shadow:0 4px 18px rgba(0,0,0,.3)}
    .toast.show{opacity:1;transform:none}.toast.warn{background:#c0392b}
    .sheet{pointer-events:auto;position:fixed;inset:0;background:#f4f5f7;color:#1d2330;overflow:auto;-webkit-overflow-scrolling:touch;display:none;padding-bottom:90px}
    .sheet.open{display:block}
    .top{position:sticky;top:0;background:#6f42c1;color:#fff;padding:12px 16px;display:flex;align-items:center;justify-content:space-between;z-index:2}
    .top b{font-size:18px}.top button{background:rgba(255,255,255,.2);color:#fff;border:0;border-radius:8px;height:40px;padding:0 14px;font-weight:700}
    .card{background:#fff;border:1px solid #d9dde3;border-radius:10px;padding:12px 14px;margin:12px}
    h3{margin:0 0 10px;font-size:15px}
    label{display:block;font-size:13px;color:#667085;font-weight:600;margin:0 0 10px}
    label input,label select,label textarea{display:block;width:100%;margin-top:4px;padding:10px;border:1px solid #d9dde3;border-radius:8px;background:#fff;color:#1d2330}
    textarea{min-height:70px}
    .two{display:grid;grid-template-columns:1fr 1fr;gap:0 10px}
    .row{display:flex;gap:8px;flex-wrap:wrap}.row button{flex:1 1 auto;height:42px;border:1px solid #d9dde3;background:#fff;border-radius:8px;font-weight:600;color:#1d2330}
    .chk{display:flex;gap:10px;align-items:center;color:#1d2330;font-weight:500;font-size:15px}.chk input{width:22px;height:22px;margin:0;flex:none}
    .foot{position:fixed;left:0;right:0;bottom:0;background:#fff;border-top:1px solid #d9dde3;padding:10px 12px calc(10px + env(safe-area-inset-bottom))}
    .foot button{width:100%;height:48px;border:0;border-radius:10px;background:#6f42c1;color:#fff;font-weight:700;font-size:17px}
    .danger{color:#c0392b!important}.hint{font-size:13px;color:#667085;margin:4px 0 0}
  </style>
  <div class="bar"><div class="grip" aria-label="Drag to move">• • •</div><button class="fill"><b>⚡</b>Fill</button><button class="next"><b>↓</b>Next</button><select class="sel" aria-label="Preset"></select><button class="ico cog" aria-label="Settings">⚙</button><button class="ico x" aria-label="Hide">✕</button></div>
  <div class="toast"></div>
  <div class="sheet"><div class="top"><b>TMV defaults</b><button class="close">Done</button></div><div class="body"></div><div class="foot"><button class="save">Save</button></div></div>`;
  document.body.appendChild(host);
  const $ = q => root.querySelector(q);
  const sel = $('.sel'), bar = $('.bar'), sheet = $('.sheet'), body = $('.body'), tEl = $('.toast');
  let tH;
  function toast(m, w, ms) { tEl.textContent = m; tEl.className = 'toast show' + (w ? ' warn' : ''); clearTimeout(tH); tH = setTimeout(() => tEl.className = 'toast', ms || 6000); }
  function fillSel() {
    const nb = root.querySelector('.next b'); if (nb) nb.textContent = S.reverse ? '↑' : '↓';
    sel.innerHTML = S.presets.map(p => '<option value="' + esc(p.id) + '"' + (p.id === S.activePreset ? ' selected' : '') + '>' + esc(p.name) + '</option>').join('');
    sel.style.display = S.presets.length > 1 ? '' : 'none';
  }
  fillSel();

  let cur;
  function renderSheet() {
    const opts = S.presets.map(p => '<option value="' + esc(p.id) + '"' + (p.id === cur.id ? ' selected' : '') + '>' + esc(p.name) + (p.id === S.activePreset ? ' (default)' : '') + '</option>').join('');
    let h = '<div class="card"><h3>Preset</h3><label>Choose preset<select data-k="pick">' + opts + '</select></label>'
      + '<label>Preset name<input data-k="name" value="' + esc(cur.name) + '"></label>'
      + '<label class="chk"><input type="checkbox" data-k="def"' + (S.activePreset === cur.id ? ' checked' : '') + '> Use this preset by default</label>'
      + '<div class="row"><button data-a="new">+ New</button><button data-a="dup">Duplicate</button><button data-a="del" class="danger"' + (S.presets.length < 2 ? ' disabled' : '') + '>Delete</button></div></div>';
    GROUPS.forEach(([title, fs]) => {
      h += '<div class="card"><h3>' + title + '</h3><div class="' + (fs.some(f => f[2] === 'a') ? '' : 'two') + '">';
      fs.forEach(([n, lab, t, o]) => {
        const val = cur.values[n] ?? '';
        if (t === 'r') h += '<label>' + lab + '<select data-f="' + n + '"><option value="">— leave —</option>' + o.map(([v, tx]) => '<option value="' + v + '"' + (v === val ? ' selected' : '') + '>' + tx + '</option>').join('') + '</select></label>';
        else if (t === 'a') h += '<label>' + lab + '<textarea data-f="' + n + '">' + esc(val) + '</textarea></label>';
        else h += '<label>' + lab + '<input data-f="' + n + '" ' + (t === 'n' ? 'type="text" inputmode="decimal"' : 'type="text"') + ' placeholder="leave blank" value="' + esc(val) + '"></label>';
      });
      h += '</div></div>';
    });
    h += '<div class="card"><h3>Pass/fail limits (when result is Auto)</h3><div class="two">'
      + '<label>Max mixed °C<input data-k="maxMixed" inputmode="decimal" value="' + S.maxMixed + '"></label>'
      + '<label>Max spike °C<input data-k="maxSpike" inputmode="decimal" value="' + S.maxSpike + '"></label></div>'
      + '<p class="hint">Auto fails if any mixed reading is over the mixed limit, the spike is over the spike limit, or an isolation test failed.</p></div>'
      + '<div class="card"><h3>Behaviour</h3>'
      + '<label class="chk"><input type="checkbox" data-k="dateToday"' + (S.dateToday ? ' checked' : '') + '> Set Date of Test to today</label>'
      + '<label class="chk"><input type="checkbox" data-k="onlyEmpty"' + (S.onlyEmpty ? ' checked' : '') + '> Only fill empty fields</label>'
      + '<label class="chk"><input type="checkbox" data-k="openValveId"' + (S.openValveId !== false ? ' checked' : '') + '> Open Valve Identification when the test popup opens</label>'
      + '<label class="chk"><input type="checkbox" data-k="autoNext"' + (S.autoNext !== false ? ' checked' : '') + '> After Complete Test, jump to the next Not Yet Tested valve</label>'
      + '<label class="chk"><input type="checkbox" data-k="autoOpen"' + (S.autoOpen ? ' checked' : '') + '> …and open its Test popup</label>'
      + '<label class="chk"><input type="checkbox" data-k="reverse"' + (S.reverse ? ' checked' : '') + '> Work backwards (bottom of the list to the top)</label>'
      + '<label class="chk"><input type="checkbox" data-k="container"' + (S.container !== false ? ' checked' : '') + '> Keep the bar between pages (container mode)</label>'
      + '<label class="chk"><input type="checkbox" data-k="highlight"' + (S.highlight ? ' checked' : '') + '> Highlight filled readings in yellow</label></div>'
      + '<div class="card"><h3>Backup / copy between devices</h3><div class="row"><button data-a="exp">Copy settings</button><button data-a="imp">Paste settings</button><button data-a="reset" class="danger">Reset</button></div>'
      + '<label style="margin-top:10px">Settings text<textarea data-k="json" placeholder="Paste copied settings here, then tap Paste settings"></textarea></label></div>';
    body.innerHTML = h;
  }
  function readSheet() {
    const q = k => body.querySelector('[data-k="' + k + '"]');
    cur.name = q('name').value.trim() || 'Untitled preset';
    body.querySelectorAll('[data-f]').forEach(el => cur.values[el.dataset.f] = el.value.trim());
    if (q('def').checked) S.activePreset = cur.id;
    S.maxMixed = parseFloat(q('maxMixed').value) || 45;
    S.maxSpike = parseFloat(q('maxSpike').value) || 46;
    ['dateToday', 'onlyEmpty', 'highlight', 'container', 'autoNext', 'autoOpen', 'reverse', 'openValveId'].forEach(k => S[k] = q(k).checked);
  }
  const uid = () => 'p' + Date.now().toString(36);
  function openSheet() { S = load(); cur = S.presets.find(p => p.id === (sel.value || S.activePreset)) || S.presets[0]; renderSheet(); sheet.classList.add('open'); bar.style.display = 'none'; }
  function closeSheet() { sheet.classList.remove('open'); bar.style.display = ''; }

  body.addEventListener('change', e => {
    if (e.target.dataset.k === 'pick') { readSheet(); cur = S.presets.find(p => p.id === e.target.value); renderSheet(); }
  });
  body.addEventListener('click', async e => {
    const a = e.target.dataset && e.target.dataset.a; if (!a) return;
    const ta = body.querySelector('[data-k="json"]');
    if (a === 'new' || a === 'dup') { readSheet(); cur = { id: uid(), name: a === 'new' ? 'New preset' : cur.name + ' (copy)', values: a === 'new' ? {} : { ...cur.values } }; S.presets.push(cur); renderSheet(); }
    if (a === 'del' && S.presets.length > 1) { S.presets = S.presets.filter(p => p.id !== cur.id); if (S.activePreset === cur.id) S.activePreset = S.presets[0].id; cur = S.presets[0]; renderSheet(); toast('Deleted — tap Save to keep this change'); }
    if (a === 'exp') { readSheet(); const txt = JSON.stringify(S); ta.value = txt; try { await navigator.clipboard.writeText(txt); toast('Settings copied'); } catch (_) { ta.select(); toast('Select the text in the box and copy it'); } }
    if (a === 'imp') { try { const s = JSON.parse(ta.value); if (!s.presets || !s.presets.length) throw 0; S = { ...clone(DEF), ...s }; save(S); cur = S.presets.find(p => p.id === S.activePreset) || S.presets[0]; renderSheet(); fillSel(); toast('Settings imported ✓'); } catch (_) { toast('That text isn\'t a valid settings copy', true); } }
    if (a === 'reset') { S = clone(DEF); save(S); cur = S.presets[0]; renderSheet(); fillSel(); toast('Reset to defaults'); }
  });
  $('.save').addEventListener('click', () => { readSheet(); if (save(S)) { fillSel(); closeSheet(); toast('Saved ✓'); } else toast('Couldn\'t save — is this a private tab?', true); });
  $('.close').addEventListener('click', closeSheet);
  $('.fill').addEventListener('click', fill);
  $('.next').addEventListener('click', nextUntested);
  $('.cog').addEventListener('click', openSheet);
  $('.x').addEventListener('click', () => { host.style.display = 'none'; });
  window.__tmvf = { toggle() { host.style.display = host.style.display === 'none' ? '' : 'none'; if (host.style.display === '') fill(); }, fill };
  // ---------- drag the bar up/down; position is remembered ----------
  (() => {
    const g = root.querySelector('.grip'), PK = 'tmvf_bar_top';
    const place = y => { const max = window.innerHeight - bar.offsetHeight - 8; y = Math.max(8, Math.min(max, y)); bar.style.top = y + 'px'; return y; };
    try { const t = parseFloat(localStorage.getItem(PK)); if (!isNaN(t)) requestAnimationFrame(() => place(t)); } catch (e) {}
    let startY = 0, startTop = 0, drag = false;
    g.addEventListener('pointerdown', e => { drag = true; startY = e.clientY; startTop = bar.getBoundingClientRect().top; g.setPointerCapture(e.pointerId); e.preventDefault(); });
    g.addEventListener('pointermove', e => { if (drag) place(startTop + e.clientY - startY); });
    const end = () => { if (!drag) return; drag = false; try { localStorage.setItem(PK, String(bar.getBoundingClientRect().top)); } catch (e) {} };
    g.addEventListener('pointerup', end); g.addEventListener('pointercancel', end);
    window.addEventListener('resize', () => place(bar.getBoundingClientRect().top));
  })();

  // ---------- container mode: reload Tradehack inside a same-site frame so the bar survives page changes ----------
  function startContainer() {
    const f = document.createElement('iframe');
    f.src = location.href;
    f.setAttribute('allow', 'geolocation; camera; clipboard-write');
    f.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;border:0;z-index:2147483640;background:#fff;opacity:0';
    document.body.insertBefore(f, host);
    let started = false;
    const giveUp = () => { f.remove(); frame = null; onPageLoad(document, location.href); toast('Tradehack wouldn\'t open in container mode, so the bar only stays on this page. Run tmvfill again after changing pages.', true); };
    const timer = setTimeout(() => { if (!started) giveUp(); }, 20000);
    f.addEventListener('load', () => {
      let d, href;
      try { d = f.contentDocument; href = f.contentWindow.location.href; } catch (e) { d = null; }
      if (!d || !href || href === 'about:blank' || !href.startsWith(location.origin)) { if (!started) { clearTimeout(timer); giveUp(); } else { toast('That page opened outside Tradehack. Use Back to return.', true); } return; }
      if (!started) {
        started = true; clearTimeout(timer); frame = f;
        // clear the original page so there's only one copy of Tradehack running
        [...document.body.children].forEach(c => { if (c !== f && c !== host) c.remove(); });
        document.documentElement.style.overflow = document.body.style.overflow = 'hidden';
        document.body.style.margin = '0';
        f.style.opacity = '1';
        toast('Container mode on: the bar stays as you move around Tradehack. Refreshing the page turns it off.');
      }
      // keep the address bar and tab title in step with the page inside
      try { history.replaceState(null, '', href); } catch (e) {}
      document.title = d.title;
      // links that would break out of the frame stay inside it instead
      d.addEventListener('click', e => { const a = e.target.closest && e.target.closest('a[target="_top"],a[target="_parent"]'); if (a) a.target = '_self'; }, true);
      d.querySelectorAll('form[target="_top"],form[target="_parent"]').forEach(x => x.target = '_self');
      onPageLoad(d, href);
    });
  }
  if (S.container !== false && window.top === window) { toast('Starting container mode…'); startContainer(); }
  else onPageLoad(document, location.href), toast(findForm() ? 'TMV Fill ready — tap ⚡ Fill.' : 'TMV Fill ready. Open a device test popup, then tap ⚡ Fill.');
} catch (e) { alert('TMV Fill error: ' + (e && e.message)); } })();
