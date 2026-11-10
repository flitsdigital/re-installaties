/* ==========================================================================
   R&E Installaties – Advies verduurzaming · widget
   Gebruik in Webflow (Code Embed):
     <div id="re-adviesformulier"
          data-webhook="https://flitsdigital01.app.n8n.cloud/webhook/re-advies-verduurzaming"
          data-privacy-url="/privacybeleid"></div>
     <script src="https://cdn.jsdelivr.net/gh/flitsdigital/re-installaties@advies-v1.0.0/advies-verduurzaming/dist/re-advies.min.js" defer></script>
   ========================================================================== */
(function () {
  'use strict';

  var ROOT_ID = 're-adviesformulier';
  var STORE_KEY = 're_advies_v1';
  var CSS = '__REA_CSS__';
  /* __REA_CALC__ */

  // ------------------------------------------------------------------ iconen
  var SVG = function (p, vb) { return '<svg viewBox="' + (vb || '0 0 24 24') + '" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + '</svg>'; };
  var I = {
    check: SVG('<path d="M5 13l4 4L19 7" stroke-width="3"/>'),
    info: SVG('<circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/>'),
    up: SVG('<path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3M12 4v12M7 9l5-5 5 5"/>'),
    ok: SVG('<path d="M5 13l4 4L19 7" stroke-width="2.6"/>'),
    tussen: SVG('<path d="M2 11l5-5 5 5 5-5 5 5"/><path d="M3 10v10h18V10"/><path d="M10 20v-5h4v5"/>'),
    hoek: SVG('<path d="M2 12l7-7 7 7 3-3 3 3"/><path d="M4 10v10h17v-8"/><path d="M7 20v-5h4v5"/>'),
    twee: SVG('<path d="M1 12l6-6 5 5 5-5 6 6"/><path d="M3 10v10h18V10M12 11v9"/>'),
    vrij: SVG('<path d="M3 11l9-8 9 8"/><path d="M5 9.5V20h14V9.5"/><path d="M10 20v-6h4v6"/>'),
    app: SVG('<rect x="5" y="2.5" width="14" height="19" rx="1"/><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M11 21.5v-3h2v3"/>'),
    douche: SVG('<path d="M5 21V8a4 4 0 0 1 4-4h1a4 4 0 0 1 4 4"/><path d="M10.5 9h7"/><path d="M12 12.5v1M15 12.5v1M18 12.5v1M13.5 16v1M16.5 16v1M15 19.5v1"/>'),
    regen: SVG('<path d="M12 2.5v3"/><path d="M5 5.5h14a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2z"/><path d="M6 11v1M9.5 11v1M14.5 11v1M18 11v1M8 15v1M12 11v1M12 15v1M16 15v1M10 19v1M14 19v1"/>'),
    bad: SVG('<path d="M2.5 13h19v1.5a5 5 0 0 1-5 5h-9a5 5 0 0 1-5-5z"/><path d="M5 13V6.5a2.5 2.5 0 0 1 5 0"/><path d="M7 19.5 6 21.5M17 19.5l1 2"/><path d="M14 4.5h6M16 7.5v1M18.5 7.5v1M17.2 10v1"/>'),
    badregen: SVG('<path d="M2.5 13h19v1.5a5 5 0 0 1-5 5h-9a5 5 0 0 1-5-5z"/><path d="M7 19.5 6 21.5M17 19.5l1 2"/><path d="M6 3h12"/><path d="M7 6v1M10 6v1M14 6v1M17 6v1M8.5 9v1M12 6v1M12 9v1M15.5 9v1"/>'),
    hybride: SVG('<path d="M12 3c2 3 5 5 5 9a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3-1-3 0-6 1-8z"/>'),
    ae: SVG('<path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/>'),
    airco: SVG('<path d="M12 2v20M4.5 6.5l15 11M19.5 6.5l-15 11M9 3.5l3 2 3-2M9 20.5l3-2 3 2"/>'),
    advies: SVG('<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5M12 16.5h.01"/>')
  };

  // ------------------------------------------------------------ vragenlijst
  var STEPS = [
    { kort: 'Woning & huishouden', titel: 'Woning & huishouden', sub: 'Zo weten we met wat voor woning en huishouden we te maken hebben.', velden: [
      { id: 'woningtype', type: 'radio', label: 'Wat voor type woning heeft u?', req: true, opties: [
        { v: 'Tussenwoning', ico: I.tussen }, { v: 'Hoekwoning', ico: I.hoek }, { v: 'Twee-onder-één-kap', ico: I.twee },
        { v: 'Vrijstaand', ico: I.vrij }, { v: 'Appartement', ico: I.app }] },
      { id: 'bouwjaar', type: 'radio', cls: 're-chips', label: 'Wat is het geschatte bouwjaar van de woning?', req: true,
        opties: ['Voor 1975', '1975 – 1990', '1990 – 2012', 'Na 2012', 'Nieuwbouw'] },
      { id: 'personen', type: 'radio', cls: 're-chips', label: 'Met hoeveel personen woont u in de woning?', req: true,
        opties: ['1', '2', '3', '4', '5 of meer'] },
      { id: 'badkamer', type: 'radio', label: 'Wat voor badkamer heeft u?', req: true,
        hint: 'Hiermee schatten we hoeveel warm water u nodig heeft, en dus hoe groot een eventuele boiler moet zijn.', opties: [
        { v: 'Standaard douche', ico: I.douche }, { v: 'Regendouche', ico: I.regen },
        { v: 'Bad en standaard douche', ico: I.bad }, { v: 'Bad en/of regendouche', ico: I.badregen }] },
      { id: 'tegelijkWater', type: 'radio', cls: 're-chips', label: 'Wilt u op meerdere plekken tegelijk warm water?', req: true,
        hint: 'Bijvoorbeeld douchen terwijl de keukenkraan of een tweede badkamer warm water gebruikt.', opties: ['Ja', 'Nee'] }
    ] },
    { kort: 'Huidige situatie', titel: 'Huidige situatie, energieverbruik & isolatie', sub: 'Hiermee berekenen we hoeveel warmte uw woning nodig heeft.', velden: [
      { id: 'verwarming', type: 'radio', label: 'Wat is uw huidige manier van verwarmen?', req: true,
        opties: ['CV-ketel (gas)', 'Warmtepomp', 'Stadsverwarming', 'Overig'] },
      { id: 'ketelLeeftijd', type: 'radio', cls: 're-chips', label: 'Hoe oud is de huidige CV-ketel ongeveer?', req: true,
        toon: function (a) { return a.verwarming === 'CV-ketel (gas)'; },
        opties: ['Jonger dan 5 jaar', '5 tot 10 jaar', 'Ouder dan 10 jaar', 'Weet ik niet'],
        note: function (a) { return a.ketelLeeftijd === 'Ouder dan 10 jaar' ? { t: 'Goed moment om over te stappen: bij een ketel ouder dan 10 jaar is een warmtepomp vaak interessant.' } : null; } },
      { id: 'gasverbruik', type: 'number', label: 'Wat is uw gemiddelde jaarlijkse gasverbruik?', suf: 'm³ per jaar', ph: 'bijv. 1400', min: 100, max: 10000, req: true,
        toon: function (a) { return a.verwarming === 'CV-ketel (gas)'; },
        hint: 'Nodig om het benodigde warmtepompvermogen te berekenen. U vindt dit op uw jaarafrekening of in de app van uw energieleverancier.' },
      { id: 'wpVerbruik', type: 'number', label: 'Wat is het jaarlijkse stroomverbruik van uw warmtepomp?', suf: 'kWh per jaar', ph: 'bijv. 3500', min: 100, max: 30000, req: true,
        toon: function (a) { return a.verwarming === 'Warmtepomp'; }, hint: 'Staat vaak in de app of op het display van de warmtepomp. Een schatting is ook goed.' },
      { id: 'gjVerbruik', type: 'number', label: 'Wat is uw jaarlijkse warmteverbruik?', suf: 'GJ per jaar', ph: 'bijv. 25', min: 1, max: 500, req: true,
        toon: function (a) { return a.verwarming === 'Stadsverwarming'; }, hint: 'In gigajoules (GJ). U vindt dit op de jaarafrekening van uw warmteleverancier.' },
      { id: 'overigToelichting', type: 'textarea', label: 'Hoe verwarmt u uw woning nu?', ph: 'Bijv. elektrische kachels, oliegestookte ketel, blokverwarming…', req: true,
        toon: function (a) { return a.verwarming === 'Overig'; } },
      { id: 'isolatie', type: 'checkbox', label: 'Hoe is de isolatie van de woning?', req: true, exclusief: ['Niet geïsoleerd', 'Weet ik niet'],
        opties: ['Spouwmuurisolatie', 'Dakisolatie', 'Vloerisolatie', 'HR++ of triple glas', 'Niet geïsoleerd', 'Weet ik niet'] }
    ] },
    { kort: 'Afgifte & buitenunit', titel: 'Warmteafgifte, bijverwarming & buitenunit', sub: 'Hoe de warmte in huis komt, bepaalt welk systeem het beste past.', velden: [
      { id: 'beneden', type: 'checkbox', label: 'Hoe wordt de woning beneden verwarmd?', req: true,
        opties: ['Vloerverwarming', 'Radiatoren', 'Warmeluchtverwarming', 'Airconditioning (lucht/lucht)'] },
      { id: 'boven', type: 'checkbox', label: 'Hoe wordt de woning boven verwarmd?', req: true, exclusief: ['Geen verwarming'],
        opties: ['Vloerverwarming', 'Radiatoren', 'Warmeluchtverwarming', 'Airconditioning (lucht/lucht)', 'Geen verwarming'] },
      { id: 'bijverwarming', type: 'checkbox', label: 'Is er aanvullende bijverwarming aanwezig?', req: true, exclusief: ['Geen bijverwarming'],
        opties: ['Pelletkachel', 'Houtkachel of open haard', 'Elektrische bijverwarming (bijv. IR-panelen)', 'Geen bijverwarming'] },
      { id: 'pelletsKg', type: 'number', cls: 're-max', label: 'Hoeveel kg pellets stookt u per jaar?', suf: 'kg per jaar', ph: 'bijv. 1000', min: 1, max: 20000, req: true,
        toon: function (a) { return (a.bijverwarming || []).indexOf('Pelletkachel') > -1; }, hint: 'Een schatting is prima.' },
      { id: 'houtKg', type: 'number', cls: 're-max', label: 'Hoeveel kg hout stookt u per jaar?', suf: 'kg per jaar', ph: 'bijv. 800', min: 1, max: 20000, req: true,
        toon: function (a) { return (a.bijverwarming || []).indexOf('Houtkachel of open haard') > -1; }, hint: 'Een schatting is prima.' },
      { id: 'buitenunit', type: 'radio', cls: 're-chips', label: 'Waar kan een eventuele buitenunit geplaatst worden?', req: true,
        opties: ['Op de grond', 'Aan de gevel', 'Op een plat dak', 'Geen mogelijkheden / onbekend'] },
      { id: 'afstand', type: 'radio', cls: 're-chips', label: 'Wat is de geschatte afstand van de buitenunit tot de erfgrens?', req: true,
        toon: function (a) { return a.buitenunit !== 'Geen mogelijkheden / onbekend'; },
        hint: 'Dit vragen we in verband met de geluidsnormen.', opties: ['Minder dan 2 m', '2 tot 5 m', 'Meer dan 5 m'],
        note: function (a) { return a.afstand === 'Minder dan 2 m' ? { warn: true, t: 'Dicht bij de erfgrens gelden strengere geluidseisen. Mogelijk adviseren we een extra stil model of een geluidsscherm.' } : null; } }
    ] },
    { kort: 'Zonnepanelen & tarieven', titel: 'Zonnepanelen, energietarieven & opslag', sub: 'Hiermee rekenen we uw jaarlijkse besparing en terugverdientijd uit.', velden: [
      { id: 'zonnepanelen', type: 'radio', cls: 're-chips', label: 'Zijn er zonnepanelen aanwezig op de woning?', req: true, opties: ['Ja', 'Nee', 'Binnenkort aanwezig'] },
      { id: 'panelen', type: 'groep', label: 'Wat is de capaciteit van uw zonnepanelen?', toon: function (a) { return a.zonnepanelen === 'Ja'; }, inputs: [
        { id: 'aantalPanelen', type: 'number', label: 'Aantal panelen', suf: 'stuks', ph: 'bijv. 12' },
        { id: 'opbrengst', type: 'number', label: 'Of: jaaropbrengst', suf: 'kWh / jaar', ph: 'bijv. 4200' }] },
      { id: 'teruglevering', type: 'number', cls: 're-max', label: 'Hoeveel stroom houdt u op jaarbasis over?', suf: 'kWh per jaar', ph: 'bijv. 1800',
        toon: function (a) { return a.zonnepanelen === 'Ja'; }, hint: 'De teruglevering aan het net. Dit staat op uw jaarafrekening.' },
      { id: 'tarieven', type: 'groep', label: 'Wat zijn uw huidige energietarieven?', hint: 'Weet u het niet precies? Laat het leeg, dan rekenen we met gemiddelde tarieven.', inputs: [
        { id: 'tGas', type: 'number', label: 'Gastarief', pre: '€', suf: 'per m³', ph: '1,35', toon: function (a) { return a.verwarming === 'CV-ketel (gas)'; } },
        { id: 'tStroom', type: 'number', label: 'Stroomtarief', pre: '€', suf: 'per kWh', ph: '0,28' },
        { id: 'tVast', type: 'number', label: 'Vastrecht gas', pre: '€', suf: 'per jaar', ph: '300', toon: function (a) { return a.verwarming === 'CV-ketel (gas)'; } },
        { id: 'tGJ', type: 'number', label: 'Warmtetarief', pre: '€', suf: 'per GJ', ph: '40,97', toon: function (a) { return a.verwarming === 'Stadsverwarming'; } },
        { id: 'tVastWarmte', type: 'number', label: 'Vaste kosten warmte', pre: '€', suf: 'per jaar', ph: '828', toon: function (a) { return a.verwarming === 'Stadsverwarming'; } }],
        note: function (a) { return a.verwarming === 'CV-ketel (gas)' ? { t: 'Bij all-electric vervalt uw gasaansluiting. Alleen al het vastrecht gas scheelt vaak € 250 tot € 350 per jaar.' } : null; } },
      { id: 'accu', type: 'radio', label: 'Is er een thuisaccu aanwezig?', req: true, opties: ['Ja', 'Nee', 'Nee, maar ik wil graag advies over een thuisaccu'] },
      { id: 'accuKwh', type: 'number', cls: 're-max', label: 'Capaciteit thuisaccu', suf: 'kWh', ph: 'bijv. 10', toon: function (a) { return a.accu === 'Ja'; } }
    ] },
    { kort: 'Wens & planning', titel: 'Uw wens & planning', sub: 'Wat zoekt u, en wanneer wilt u het geregeld hebben?', velden: [
      { id: 'wens', type: 'radio', cls: 're-big', label: 'Waar bent u hoofdzakelijk naar op zoek?', req: true, opties: [
        { v: 'Hybride warmtepomp', d: 'Combinatie met uw CV-ketel', ico: I.hybride },
        { v: 'All-electric warmtepomp', d: 'Volledig van het gas af', ico: I.ae },
        { v: 'Airconditioning', d: 'Koelen en/of bijverwarmen', ico: I.airco },
        { v: 'Advies', d: 'Welke optie past het best bij mijn situatie?', ico: I.advies }] },
      { id: 'planning', type: 'radio', cls: 're-chips', label: 'Wanneer wilt u de werkzaamheden laten uitvoeren?', req: true,
        opties: ['Zo snel mogelijk', 'Binnen 3 maanden', 'Binnen 6 maanden', 'Oriënterend'] }
    ] },
    { kort: 'Foto’s & gegevens', titel: 'Foto’s & contactgegevens', sub: 'Bijna klaar. Met foto’s kunnen we sneller en nauwkeuriger een advies maken.', velden: [
      { id: 'fotos', type: 'uploads', label: 'Upload foto’s', opt: true, hint: 'Optioneel. Met foto’s kan onze adviseur uw situatie direct beoordelen.', slots: [
        { id: 'foto_ketel', t: 'CV-ketel + leidingwerk' }, { id: 'foto_meterkast', t: 'Binnenkant meterkast' }, { id: 'foto_opstelplaats', t: 'Plek buitenunit' }] },
      { id: 'contact', type: 'contact', label: 'Uw gegevens' },
      { id: 'opmerkingen', type: 'textarea', label: 'Opmerkingen of vragen', opt: true, ph: 'Bijv. beste tijd om te bellen, bijzonderheden aan de woning…' },
      { id: 'akkoord', type: 'consent' }
    ] }
  ];
  var CONTACT = [
    { id: 'voornaam', label: 'Voornaam', ac: 'given-name' },
    { id: 'achternaam', label: 'Achternaam', ac: 'family-name' },
    { id: 'email', label: 'E-mailadres', type: 'email', ac: 'email', ph: 'naam@voorbeeld.nl' },
    { id: 'telefoon', label: 'Telefoonnummer', type: 'tel', ac: 'tel', ph: '06 12345678' },
    { id: 'postcode', label: 'Postcode', ac: 'postal-code', ph: '7825 VV' },
    { id: 'huisnummer', label: 'Huisnummer + toevoeging', ph: '17' },
    { id: 'straat', label: 'Straat', ac: 'address-line1' },
    { id: 'plaats', label: 'Plaats', ac: 'address-level2' }
  ];

  // ------------------------------------------------------------------ helpers
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var val = function (o) { return typeof o === 'string' ? o : o.v; };
  var fmt = function (n) { return Math.round(n).toLocaleString('nl-NL'); };
  var euro = function (n) { return '€ ' + fmt(n); };
  var dec = function (n) { return String(n).replace('.', ','); };
  var track = function (event, props) {
    try { (window.dataLayer = window.dataLayer || []).push(Object.assign({ event: event }, props || {})); } catch (e) {}
    try { if (window.posthog && window.posthog.capture) window.posthog.capture(event, props || {}); } catch (e) {}
  };

  function init() {
    var root = document.getElementById(ROOT_ID);
    if (!root || root.getAttribute('data-rea-init')) return;
    root.setAttribute('data-rea-init', '1');
    if (!root.getAttribute('lang')) root.setAttribute('lang', 'nl');

    var CONF = {
      webhook: root.getAttribute('data-webhook') || '',
      privacy: root.getAttribute('data-privacy-url') || '#',
      test: root.getAttribute('data-test') === 'true',
      telefoon: root.getAttribute('data-telefoon') || '0591 327 010'
    };

    if (!document.getElementById('re-advies-css')) {
      var st = document.createElement('style'); st.id = 're-advies-css'; st.textContent = CSS; document.head.appendChild(st);
    }

    var A = {}, FILES = {}, cur = 0, started = false, sending = false;
    try { Object.assign(A, JSON.parse(localStorage.getItem(STORE_KEY) || '{}')); } catch (e) {}
    var save = function () { try { localStorage.setItem(STORE_KEY, JSON.stringify(A)); } catch (e) {} };

    var isReq = function (f) { return typeof f.req === 'function' ? f.req(A) : !!f.req; };
    var shown = function (f) { return !f.toon || f.toon(A); };
    var inputsOf = function (f) { return f.inputs.filter(shown); };

    root.innerHTML =
      '<div class="re-layout">' +
        '<div class="re-block" data-rea="card">' +
          '<div class="re-progress" data-rea="progress"></div>' +
          '<form novalidate data-rea="form"><div data-rea="body"></div>' +
            '<div class="re-form-msg" data-rea="msg" role="alert"></div>' +
            '<div class="re-actions">' +
              '<button type="button" class="re-btn re-btn-ghost" data-rea="prev">← Vorige</button>' +
              '<button type="submit" class="re-btn" data-rea="next">Volgende stap →</button>' +
            '</div>' +
            '<input type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" data-rea="hp" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0">' +
          '</form>' +
        '</div>' +
        '<aside class="re-summary"><div class="re-sum-card">' +
          '<h2>Uw indicatie</h2><p class="re-lead">Live overzicht op basis van uw antwoorden</p>' +
          '<ul class="re-sum-steps" data-rea="steps"></ul>' +
          '<div class="re-sum-total"><span class="re-tlab">Geschat vermogen<br>warmtepomp</span><span><span class="re-tval" data-rea="kw">–</span><span class="re-per" data-rea="basis">vul stap 2 in</span></span></div>' +
          '<div data-rea="once"></div>' +
          '<p class="re-sum-foot">Vrijblijvend advies. Liever bellen? <a href="tel:' + esc(CONF.telefoon.replace(/\s/g, '')) + '">' + esc(CONF.telefoon) + '</a></p>' +
        '</div></aside>' +
      '</div>';

    var $ = function (k) { return root.querySelector('[data-rea="' + k + '"]'); };
    var body = $('body');

    // ------------------------------------------------------------ render
    function optHTML(f, o, i) {
      var v = val(o), multi = f.type === 'checkbox';
      var on = multi ? (A[f.id] || []).indexOf(v) > -1 : A[f.id] === v;
      return '<label class="re-opt' + (multi ? ' re-multi-opt' : '') + (on ? ' re-active' : '') + '">' +
        '<input type="' + (multi ? 'checkbox' : 'radio') + '" name="' + f.id + '" value="' + esc(v) + '"' + (on ? ' checked' : '') + '>' +
        (o.ico ? '<span class="re-ico">' + o.ico + '</span>' : '') +
        '<span>' + esc(v) + (o.d ? '<small>' + esc(o.d) + '</small>' : '') + '</span>' +
        '<span class="re-check">' + I.check + '</span></label>';
    }
    function inputHTML(i, extraCls) {
      var v = A[i.id] == null ? '' : A[i.id];
      var t = i.type === 'number' ? 'text' : (i.type || 'text');
      return '<label class="re-fld ' + (i.cls || '') + ' ' + (extraCls || '') + '" data-in="' + i.id + '">' +
        (i.label ? '<span class="re-lab">' + esc(i.label) + (i.req ? ' <i>*</i>' : '') + '</span>' : '') +
        '<span class="re-inwrap">' + (i.pre ? '<span class="re-pre">' + i.pre + '</span>' : '') + (i.suf ? '<span class="re-suf">' + esc(i.suf) + '</span>' : '') +
        (i.type === 'textarea'
          ? '<textarea id="rea-' + i.id + '" name="' + i.id + '" placeholder="' + esc(i.ph || '') + '">' + esc(v) + '</textarea>'
          : '<input id="rea-' + i.id + '" name="' + i.id + '" type="' + t + '"' + (i.type === 'number' ? ' inputmode="decimal"' : '') + (i.suf ? ' class="re-has-suf"' : '') +
            ' placeholder="' + esc(i.ph || '') + '" value="' + esc(v) + '"' + (i.ac ? ' autocomplete="' + i.ac + '"' : '') + '>') +
        '</span></label>';
    }
    function fieldHTML(f) {
      var h = '<div class="re-q" data-q="' + f.id + '">';
      if (f.type === 'consent') {
        return h + '<div class="re-consent"><input type="checkbox" id="rea-akkoord" name="akkoord"' + (A.akkoord ? ' checked' : '') + '>' +
          '<label for="rea-akkoord">Ik ga akkoord met het <a href="' + esc(CONF.privacy) + '" target="_blank" rel="noopener">privacybeleid</a> en ontvang mijn persoonlijke adviesrapport per e-mail. R&amp;E Installaties neemt contact met mij op over dit advies.</label></div>' +
          '<div class="re-err">Geef akkoord om uw advies te ontvangen.</div></div>';
      }
      var star = (f.type !== 'groep' && f.type !== 'uploads' && f.type !== 'contact' && isReq(f)) ? ' <i>*</i>' : '';
      h += '<span class="re-lab">' + esc(f.label) + star + (f.opt ? ' <small>(optioneel)</small>' : '') + (f.type === 'checkbox' ? '<span class="re-multi">meerdere mogelijk</span>' : '') + '</span>';
      h += f.hint ? '<p class="re-hint">' + esc(f.hint) + '</p>' : '<div class="re-gap"></div>';
      if (f.type === 'radio' || f.type === 'checkbox') h += '<div class="re-opts ' + (f.cls || '') + '">' + f.opties.map(function (o, i) { return optHTML(f, o, i); }).join('') + '</div>';
      else if (f.type === 'groep') h += '<div class="re-row">' + inputsOf(f).map(function (i) { return inputHTML(i); }).join('') + '</div>';
      else if (f.type === 'contact') h += '<div class="re-grid-pers">' + CONTACT.map(function (c) { return inputHTML({ id: c.id, label: c.label, type: c.type, ac: c.ac, ph: c.ph, req: true }); }).join('') + '</div>';
      else if (f.type === 'uploads') h += '<div class="re-uploads">' + f.slots.map(upHTML).join('') + '</div>';
      else h += inputHTML(Object.assign({}, f, { label: null }));
      var err = f.type === 'checkbox' ? 'Kies minimaal één optie.' : f.type === 'radio' ? 'Maak een keuze.' : f.type === 'contact' ? 'Vul de gemarkeerde velden (correct) in.' : 'Vul dit veld (correct) in.';
      return h + '<div data-note></div><div class="re-err">' + err + '</div></div>';
    }
    function upHTML(s) {
      var list = FILES[s.id] || [];
      return '<label class="re-up' + (list.length ? ' re-has' : '') + '" data-slot="' + s.id + '">' +
        '<input type="file" accept="image/*" multiple data-up="' + s.id + '">' + I.up +
        '<b>' + esc(s.t) + '</b><small>' + (list.length ? list.length + ' foto(’s) · tik op een foto om te verwijderen' : 'Klik of sleep foto’s hierheen') + '</small>' +
        '<span class="re-thumbs">' + list.map(function (u, i) { return '<button type="button" data-rm="' + s.id + ':' + i + '" aria-label="Foto verwijderen"><img src="' + u.url + '" alt=""></button>'; }).join('') + '</span></label>';
    }

    function renderStep() {
      var s = STEPS[cur];
      $('progress').innerHTML = STEPS.map(function (_, i) { return '<i class="' + (i < cur ? 're-done' : i === cur ? 're-now' : '') + '"></i>'; }).join('');
      body.innerHTML = '<div class="re-step-head"><span class="re-step-num">' + (cur + 1) + '</span><h2>' + esc(s.titel) + '</h2><span class="re-step-count">Stap ' + (cur + 1) + ' van ' + STEPS.length + '</span></div>' +
        '<p class="re-step-sub">' + esc(s.sub) + '</p>' + s.velden.map(fieldHTML).join('');
      $('prev').classList.toggle('re-invisible', cur === 0);
      $('next').textContent = cur === STEPS.length - 1 ? 'Akkoord, stuur mijn advies' : 'Volgende stap →';
      showMsg('');
      refresh();
      track('advies_stap', { advies_stap: cur + 1, advies_stap_naam: s.kort });
    }

    function refresh() {
      STEPS[cur].velden.forEach(function (f) {
        var el = body.querySelector('[data-q="' + f.id + '"]'); if (!el) return;
        el.classList.toggle('re-hidden', !shown(f));
        var slot = el.querySelector('[data-note]');
        if (slot) { var n = f.note ? f.note(A) : null; slot.innerHTML = n ? '<div class="re-note' + (n.warn ? ' re-warn' : '') + '">' + I.info + '<span>' + esc(n.t) + '</span></div>' : ''; }
      });
      renderSummary();
    }

    function renderSummary() {
      $('steps').innerHTML = STEPS.map(function (s, i) {
        return '<li class="' + (i < cur ? 're-done' : i === cur ? 're-now' : '') + '"><span class="re-dotnum">' + (i < cur ? '✓' : i + 1) + '</span>' + esc(s.kort) + '</li>';
      }).join('');
      var r = reaBereken(A);
      $('kw').textContent = r.kw ? '± ' + r.kw + ' kW' : '–';
      $('basis').textContent = r.kw ? 'op basis van ' + r.basis : (A.verwarming === 'Overig' ? 'berekenen we in uw advies' : 'vul stap 2 in');
      $('once').innerHTML = r.kostNu && cur >= 3 ? '<div class="re-sum-once"><span>Huidige stookkosten</span><b>' + euro(r.kostNu) + ' / jaar</b></div>' : '';
    }

    function showMsg(t) { var m = $('msg'); m.className = 're-form-msg' + (t ? ' re-msg-error' : ''); m.innerHTML = t || ''; }

    // ------------------------------------------------------------ events
    body.addEventListener('change', function (e) {
      var t = e.target;
      if (!started) { started = true; track('advies_start'); }
      if (t.getAttribute('data-up')) { addFiles(t.getAttribute('data-up'), t.files); t.value = ''; return; }
      if (t.name === 'akkoord') { A.akkoord = t.checked; }
      else if (t.type === 'radio') {
        A[t.name] = t.value;
        body.querySelectorAll('input[name="' + t.name + '"]').forEach(function (r) { r.closest('.re-opt').classList.toggle('re-active', r.checked); });
      } else if (t.type === 'checkbox') {
        var f = STEPS[cur].velden.filter(function (x) { return x.id === t.name; })[0];
        var ex = (f && f.exclusief) || [], arr = A[t.name] || [];
        if (t.checked) arr = ex.indexOf(t.value) > -1 ? [t.value] : arr.filter(function (v) { return ex.indexOf(v) === -1; }).concat(t.value);
        else arr = arr.filter(function (v) { return v !== t.value; });
        A[t.name] = arr;
        body.querySelectorAll('input[name="' + t.name + '"]').forEach(function (c) { c.checked = arr.indexOf(c.value) > -1; c.closest('.re-opt').classList.toggle('re-active', c.checked); });
      }
      var q = t.closest('.re-q'); if (q) q.classList.remove('re-invalid');
      save(); refresh();
    });
    body.addEventListener('input', function (e) {
      var t = e.target;
      if (!t.name || t.type === 'radio' || t.type === 'checkbox' || t.type === 'file') return;
      A[t.name] = t.value; t.classList.remove('re-bad');
      var q = t.closest('.re-q'); if (q && !q.querySelector('.re-bad')) q.classList.remove('re-invalid');
      if (!started) { started = true; track('advies_start'); }
      save(); renderSummary();
      if (t.name === 'postcode' || t.name === 'huisnummer') lookupAdres();
    });
    body.addEventListener('click', function (e) {
      var b = e.target.closest('[data-rm]'); if (!b) return;
      e.preventDefault();
      var p = b.getAttribute('data-rm').split(':'), list = FILES[p[0]] || [];
      var gone = list.splice(+p[1], 1)[0]; if (gone) URL.revokeObjectURL(gone.url);
      redrawSlot(p[0]);
    });
    $('prev').addEventListener('click', function () { if (cur > 0) { cur--; renderStep(); scrollTop(); } });
    $('form').addEventListener('submit', function (e) {
      e.preventDefault();
      if (sending || !validStep()) return;
      if (cur < STEPS.length - 1) { cur++; renderStep(); scrollTop(); } else send();
    });
    function scrollTop() {
      var y = $('card').getBoundingClientRect().top + window.pageYOffset - 110;
      if (window.pageYOffset > y) window.scrollTo({ top: y, behavior: 'smooth' });
    }

    // ------------------------------------------------------------ adres (PDOK)
    var lastQ = '', autoFilled = {};
    function lookupAdres() {
      var pc = String(A.postcode || '').replace(/\s+/g, '').toUpperCase();
      var nr = (String(A.huisnummer || '').match(/\d+/) || [''])[0];
      if (!/^\d{4}[A-Z]{2}$/.test(pc) || !nr) return;
      var q = pc + '-' + nr; if (q === lastQ) return; lastQ = q;
      fetch('https://api.pdok.nl/bzk/locatieserver/search/v3_1/free?fq=type:adres&rows=1&q=' + encodeURIComponent(pc + ' ' + nr))
        .then(function (r) { return r.json(); })
        .then(function (d) {
          var doc = d && d.response && d.response.docs && d.response.docs[0]; if (!doc) return;
          [['straat', doc.straatnaam], ['plaats', doc.woonplaatsnaam]].forEach(function (p) {
            var el = body.querySelector('#rea-' + p[0]);
            if (p[1] && el && (!el.value || autoFilled[p[0]] === el.value)) { el.value = p[1]; A[p[0]] = p[1]; autoFilled[p[0]] = p[1]; el.classList.remove('re-bad'); }
          });
          save();
        }).catch(function () {});
    }

    // ------------------------------------------------------------ foto's
    function compress(file) {
      return new Promise(function (res) {
        if (!/^image\//.test(file.type) || /svg/.test(file.type)) return res(file);
        var url = URL.createObjectURL(file), img = new Image();
        img.onload = function () {
          var max = 1600, s = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
          var c = document.createElement('canvas'); c.width = Math.round(img.naturalWidth * s); c.height = Math.round(img.naturalHeight * s);
          c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
          c.toBlob(function (b) {
            URL.revokeObjectURL(url);
            res(b && b.size < file.size ? new File([b], file.name.replace(/\.[^.]+$/, '') + '.jpg', { type: 'image/jpeg' }) : file);
          }, 'image/jpeg', 0.82);
        };
        img.onerror = function () { URL.revokeObjectURL(url); res(file); };
        img.src = url;
      });
    }
    function addFiles(slot, files) {
      var list = FILES[slot] = FILES[slot] || [];
      var todo = Array.prototype.slice.call(files || [], 0, Math.max(0, 4 - list.length));
      Promise.all(todo.map(compress)).then(function (out) {
        var totaal = function () { return Object.keys(FILES).reduce(function (n, k) { return n + FILES[k].reduce(function (m, x) { return m + x.file.size; }, 0); }, 0); };
        out.forEach(function (f) { if (f.size < 6 * 1024 * 1024 && totaal() + f.size < 12 * 1024 * 1024) list.push({ file: f, url: URL.createObjectURL(f) }); });
        redrawSlot(slot);
      });
    }
    function redrawSlot(slot) {
      var el = body.querySelector('[data-slot="' + slot + '"]'); if (!el) return;
      var s = STEPS[5].velden[0].slots.filter(function (x) { return x.id === slot; })[0];
      el.outerHTML = upHTML(s);
    }

    // ------------------------------------------------------------ validatie
    function validStep() {
      var ok = true, first = null;
      var mark = function (el, bad) { el.classList.toggle('re-invalid', bad); if (bad) { ok = false; first = first || el; } };
      STEPS[cur].velden.forEach(function (f) {
        if (!shown(f)) return;
        var el = body.querySelector('[data-q="' + f.id + '"]'), bad = false, n;
        if (f.type === 'radio') bad = isReq(f) && !A[f.id];
        else if (f.type === 'checkbox') bad = isReq(f) && !(A[f.id] || []).length;
        else if (f.type === 'number') { n = reaNum(A[f.id]); bad = (isReq(f) && n === null) || (n !== null && ((f.min && n < f.min) || (f.max && n > f.max))) || (!!A[f.id] && n === null); }
        else if (f.type === 'textarea') bad = isReq(f) && !String(A[f.id] || '').trim();
        else if (f.type === 'consent') bad = !A.akkoord;
        else if (f.type === 'groep') inputsOf(f).forEach(function (i) { var v = String(A[i.id] || '').trim(), b = !!v && reaNum(v) === null; markIn(i.id, b); if (b) bad = true; });
        else if (f.type === 'contact') CONTACT.forEach(function (c) {
          var v = String(A[c.id] || '').trim(), b = !v;
          if (v && c.id === 'email') b = !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
          if (v && c.id === 'postcode') b = !/^\d{4}\s?[a-zA-Z]{2}$/.test(v);
          if (v && c.id === 'telefoon') b = v.replace(/\D/g, '').length < 10;
          if (v && c.id === 'huisnummer') b = !/\d/.test(v);
          markIn(c.id, b); if (b) bad = true;
        });
        mark(el, bad);
      });
      if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return ok;
    }
    function markIn(id, bad) { var el = body.querySelector('#rea-' + id); if (el) el.classList.toggle('re-bad', bad); }

    // ------------------------------------------------------------ versturen
    function antwoorden() {
      var out = {};
      STEPS.forEach(function (s) {
        s.velden.forEach(function (f) {
          if (!shown(f)) return;
          if (f.type === 'groep') inputsOf(f).forEach(function (i) { if (A[i.id] !== undefined && A[i.id] !== '') out[i.id] = A[i.id]; });
          else if (f.type === 'contact') CONTACT.forEach(function (c) { out[c.id] = String(A[c.id] || '').trim(); });
          else if (f.type === 'uploads' || f.type === 'consent') return;
          else if (A[f.id] !== undefined && A[f.id] !== '') out[f.id] = A[f.id];
        });
      });
      return out;
    }
    function utm() {
      var o = {};
      try { new URLSearchParams(location.search).forEach(function (v, k) { if (/^utm_|^gclid$|^fbclid$/.test(k)) o[k] = v; }); } catch (e) {}
      return o;
    }
    function send() {
      if (!CONF.webhook) { showMsg('Dit formulier is nog niet gekoppeld (data-webhook ontbreekt).'); return; }
      sending = true;
      var btn = $('next'); btn.disabled = true; btn.textContent = 'Versturen…'; showMsg('');
      var ant = antwoorden(), lokaal = reaBereken(ant);
      var payload = {
        versie: REA_CFG.versie, test: CONF.test, bron: location.origin + location.pathname, utm: utm(),
        verstuurdOp: new Date().toISOString(), akkoord: { privacy: true, tijdstip: new Date().toISOString() },
        website: $('hp').value, antwoorden: ant, indicatieWidget: lokaal
      };
      var fd = new FormData();
      fd.append('data', JSON.stringify(payload));
      Object.keys(FILES).forEach(function (slot) { FILES[slot].forEach(function (f, i) { fd.append(slot + '_' + (i + 1), f.file, slot + '_' + (i + 1) + '.jpg'); }); });
      var ctrl = window.AbortController ? new AbortController() : null;
      var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 45000);
      fetch(CONF.webhook, { method: 'POST', body: fd, signal: ctrl ? ctrl.signal : undefined })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { if (!r.ok || j.ok === false) throw new Error(j.reden || ('HTTP ' + r.status)); return j; }); })
        .then(function (j) {
          clearTimeout(timer);
          var ind = j.indicatie || lokaal;
          track('advies_verstuurd', { advies_type: ind.advies, advies_wens: ant.wens, advies_planning: ant.planning, advies_fotos: Object.keys(FILES).reduce(function (n, k) { return n + FILES[k].length; }, 0) });
          try { localStorage.removeItem(STORE_KEY); } catch (e) {}
          showResult(ind, ant, j.leadId);
        })
        .catch(function (err) {
          clearTimeout(timer); sending = false; btn.disabled = false; btn.textContent = 'Akkoord, stuur mijn advies';
          track('advies_fout', { advies_fout: String(err && err.message || err).slice(0, 80) });
          showMsg('Het versturen is niet gelukt. Probeer het opnieuw, of bel ons op ' + esc(CONF.telefoon) + '.');
        });
    }

    // ------------------------------------------------------------ resultaat
    function showResult(r, ant, leadId) {
      $('progress').innerHTML = STEPS.map(function () { return '<i class="re-done"></i>'; }).join('');
      $('form').outerHTML = '<div class="re-result">' +
        '<div class="re-success-ico">' + I.ok + '</div>' +
        '<h2>Bedankt' + (ant.voornaam ? ', ' + esc(ant.voornaam) : '') + '! Uw adviesaanvraag is ontvangen.</h2>' +
        '<p>Uw persoonlijke adviesrapport is onderweg naar <strong>' + esc(ant.email) + '</strong>. Een adviseur van R&amp;E Installaties neemt binnen 2 werkdagen contact met u op.' + (leadId ? ' Uw referentie: <strong>' + esc(leadId) + '</strong>.' : '') + '</p></div>';
      $('steps').innerHTML = STEPS.map(function (s, i) { return '<li class="re-done"><span class="re-dotnum">✓</span>' + esc(s.kort) + '</li>'; }).join('');
      scrollTop();
    }

    renderStep();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
