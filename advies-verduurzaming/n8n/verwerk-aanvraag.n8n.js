// R&E Installaties – Advies verduurzaming · n8n Code-node "Verwerk aanvraag"
// Bron: github.com/flitsdigital/re-installaties/tree/main/advies-verduurzaming (gebouwd met npm run build uit src/calc.js + n8n/verwerk-aanvraag.js)
/* R&E Installaties – Advies verduurzaming · gedeelde rekenlogica.
   Wordt in de widget gebundeld en door npm run build in n8n/verwerk-aanvraag.n8n.js gezet.
   n8n is leidend: de cijfers in de rapportmail komen uit n8n.
   Let op: geen backslashes in dit bestand (het wordt in de n8n-workflow ingesloten). */

var REA_CFG = {
  versie: '1.3.0',
  // Standaardtarieven als de klant niets invult (incl. belastingen)
  tariefGas: 1.35,          // € per m³
  tariefStroom: 0.28,       // € per kWh
  vastrechtGas: 300,        // € per jaar
  tariefWarmte: 40.97,      // € per GJ stadsverwarming (ACM-maximum 2026)
  vastWarmte: 828,          // € per jaar vaste kosten stadsverwarming (ACM-maximum 2026, incl. meet- en afleverset)
  // Omrekening naar warmte (kWh)
  kwhPerM3: 9.8,            // calorische waarde aardgas (R&E)
  kwhPerGJ: 277.8,
  bestaandeWpScop: 3.3,     // bestaande warmtepomp: kWh stroom → kWh warmte
  kwhPerKgPellets: 4.1,     // 4,8 kWh × ~85% rendement
  kwhPerKgHout: 2.5,        // ~4,2 kWh × ~60% rendement
  // Dimensionering
  vollastUren: 2000,
  maten: [4, 5, 6, 8, 10, 12, 14, 16],
  // SCOP (R&E)
  scopSlecht: 2.8,          // all-electric, matig geïsoleerd (praktijkgemiddelde)
  scopGoed: 3.3,            // all-electric, goed geïsoleerd (geoptimaliseerd)
  scopHybride: 3.5,         // hybride: de ketel pakt de pieken onder het vriespunt
  vloerBonus: 1.0,          // vloerverwarming (zonder radiatoren boven) geeft ca. 1 punt extra
  // Hybride
  hybrideAandeel: 0.70,     // deel van de warmtevraag dat de warmtepomp overneemt
  // Investering: prijs ex. btw + btw − ISDE-subsidie = netto voor de klant
  btw: 0.21,
  hybrideToestel: 'Xtend eco 5 kW',
  hybridePrijsEx: 6000,
  hybrideSubsidie: 2125,
  ketelPrijsEx: 2400,       // nieuwe CV-ketel bij hybride als de huidige ketel ouder is dan 10 jaar
  aeToestel: 'Bosch Compress 7 kW met 300 L boiler',
  aePrijsEx: 10694.10,
  aeSubsidie: 3025,
  // Warm water (tapwater)
  wwM3PerPersoon: 75,       // m³ gas per bewoner per jaar bij een standaard douche (~20% van een gemiddeld gezinsverbruik)
  wwFactor: { 'Standaard douche': 1.0, 'Regendouche': 1.4, 'Bad en standaard douche': 1.2, 'Bad en/of regendouche': 1.5, 'Meerdere badkamers': 1.3 },
  wwMaxAandeel: 0.4,        // warm water nooit meer dan 40% van de totale warmtevraag
  scopWarmWater: 2.5,       // warmtepomp maakt tapwater op 55–60 °C, dus lager rendement
  // Boiler (all-electric)
  boilerMaten: [150, 200, 300],
  boilerStap: { 'Standaard douche': 0, 'Regendouche': 1, 'Bad en standaard douche': 1, 'Bad en/of regendouche': 2, 'Meerdere badkamers': 2 }
};

function reaNum(v) {
  if (v === null || v === undefined || v === '') return null;
  var n = parseFloat(String(v).replace(/ /g, '').replace(',', '.'));
  return isNaN(n) ? null : n;
}

function reaBereken(A, CFG) {
  CFG = CFG || REA_CFG;
  A = A || {};
  var arr = function (v) { return Array.isArray(v) ? v : (v ? [v] : []); };
  var v = A.verwarming;
  var bij = arr(A.bijverwarming), iso = arr(A.isolatie), ben = arr(A.beneden), bov = arr(A.boven);
  var r1 = function (n) { return Math.round(n * 10) / 10; };

  // ---- Warmtevraag ----
  var warmte = null, basis = '', gas = null, gj = null;
  if (v === 'CV-ketel (gas)') {
    gas = reaNum(A.gasverbruik);
    if (gas) { warmte = gas * CFG.kwhPerM3; basis = Math.round(gas).toLocaleString('nl-NL') + ' m³ gas per jaar'; }
  } else if (v === 'Warmtepomp') {
    var k = reaNum(A.wpVerbruik);
    if (k) { warmte = k * CFG.bestaandeWpScop; basis = Math.round(k).toLocaleString('nl-NL') + ' kWh stroom per jaar'; }
  } else if (v === 'Stadsverwarming') {
    gj = reaNum(A.gjVerbruik);
    if (gj) { warmte = gj * CFG.kwhPerGJ; basis = Math.round(gj).toLocaleString('nl-NL') + ' GJ warmte per jaar'; }
  }
  var bijWarmte = (bij.indexOf('Pelletkachel') > -1 ? (reaNum(A.pelletsKg) || 0) * CFG.kwhPerKgPellets : 0) +
                  (bij.indexOf('Houtkachel of open haard') > -1 ? (reaNum(A.houtKg) || 0) * CFG.kwhPerKgHout : 0);
  if (warmte && bijWarmte) basis += ' + bijverwarming';

  // ---- Warm water: schatting uit bewoners en badkamer ----
  var pers = { '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6+': 6, '5 of meer': 5 }[A.personen];
  var wwF = CFG.wwFactor[A.badkamer];
  var warmteWW = 0;
  if (warmte && pers && wwF) warmteWW = Math.min(pers * CFG.wwM3PerPersoon * wwF * CFG.kwhPerM3, warmte * CFG.wwMaxAandeel);
  var warmteVerw = warmte ? warmte - warmteWW : null;

  // ---- Woningkwaliteit en rendement ----
  var ltv = ben.indexOf('Vloerverwarming') > -1 && bov.indexOf('Radiatoren') === -1;
  var maatregelen = iso.filter(function (x) { return x !== 'Weet ik niet' && x !== 'Niet geïsoleerd'; }).length;
  var slecht = iso.indexOf('Niet geïsoleerd') > -1 || (A.bouwjaar === 'Voor 1975' && maatregelen < 2);
  var goed = !slecht && (['1990 – 2012', 'Na 2012', 'Nieuwbouw'].indexOf(A.bouwjaar) > -1 || maatregelen >= 3);
  var bonus = ltv ? CFG.vloerBonus : 0;
  var scopAe = r1((slecht ? CFG.scopSlecht : CFG.scopGoed) + bonus);
  var scopHy = r1(CFG.scopHybride + bonus);

  var pG = reaNum(A.tGas) || CFG.tariefGas;
  var pS = reaNum(A.tStroom) || CFG.tariefStroom;
  var vast = reaNum(A.tVast); if (vast === null) vast = CFG.vastrechtGas;
  var pW = reaNum(A.tGJ) || CFG.tariefWarmte;
  var vastW = reaNum(A.tVastWarmte); if (vastW === null) vastW = CFG.vastWarmte;

  var nieuweKetel = v === 'CV-ketel (gas)' && A.ketelLeeftijd === 'Ouder dan 10 jaar';
  var invHy = Math.round((CFG.hybridePrijsEx + (nieuweKetel ? CFG.ketelPrijsEx : 0)) * (1 + CFG.btw) - CFG.hybrideSubsidie);
  var invAe = Math.round(CFG.aePrijsEx * (1 + CFG.btw) - CFG.aeSubsidie);

  var r = {
    versie: CFG.versie,
    heeftIndicatie: !!warmte,
    basis: basis,
    warmte: warmte ? Math.round(warmte) : null,
    warmteVerwarming: warmteVerw ? Math.round(warmteVerw) : null,
    warmteWarmWater: Math.round(warmteWW),
    gasWarmWater: gas && warmteWW ? Math.round(warmteWW / CFG.kwhPerM3) : null,
    bijWarmte: bijWarmte ? Math.round(bijWarmte) : 0,
    kw: null, scop: scopAe, scopHybride: scopHy, slecht: slecht, goedGeisoleerd: goed, ltv: ltv,
    advies: null, adviesLabel: null, adviesBron: 'keuze',
    tarieven: { gas: pG, stroom: pS, vastrecht: vast, warmte: pW, vastWarmte: vastW },
    gas: gas, gj: gj, bron: gas ? 'gas' : (gj ? 'warmtenet' : null),
    kostNu: null, hybride: null, allElectric: null,
    investering: { hybride: invHy, allElectric: invAe, hybrideToestel: CFG.hybrideToestel, aeToestel: CFG.aeToestel, nieuweKetel: nieuweKetel },
    teruglevering: reaNum(A.teruglevering), terugDekking: null,
    boiler: null, boilerRuim: false,
    tips: []
  };

  if (warmte) {
    var kwRaw = (warmteVerw + bijWarmte) / CFG.vollastUren;   // warm water komt uit de boiler, telt niet mee in het vermogen
    r.kw = CFG.maten.filter(function (m) { return m >= kwRaw; })[0] || CFG.maten[CFG.maten.length - 1];
  }

  // ---- Kosten en besparing ----
  var tvt = function (inv, besp) { return besp > 0 ? r1(inv / besp) : null; };
  if (gas || gj) {
    var kostNu = gas ? gas * pG + vast : gj * pW + vastW;
    var aeStroom = warmteVerw / scopAe + warmteWW / CFG.scopWarmWater;
    var ae = { stroom: Math.round(aeStroom), kosten: Math.round(aeStroom * pS), scop: scopAe };
    ae.besparing = Math.round(kostNu - aeStroom * pS);
    ae.terugverdientijd = tvt(invAe, ae.besparing);
    r.kostNu = Math.round(kostNu); r.allElectric = ae;
    if (gas) {
      // Hybride kan alleen naast een gasketel
      // De warmtepomp neemt 70% van de verwarming over; warm water blijft op de CV-ketel
      var hyStroom = warmteVerw * CFG.hybrideAandeel / scopHy;
      var hyGas = gas - warmteVerw * CFG.hybrideAandeel / CFG.kwhPerM3;
      var hy = { stroom: Math.round(hyStroom), gasRest: Math.round(hyGas), kosten: Math.round(hyGas * pG + vast + hyStroom * pS), scop: scopHy };
      hy.besparing = Math.round(kostNu - (hyGas * pG + vast + hyStroom * pS));
      hy.terugverdientijd = tvt(invHy, hy.besparing);
      r.hybride = hy;
    }
    if (r.teruglevering && ae.stroom) r.terugDekking = Math.min(100, Math.round(r.teruglevering / ae.stroom * 100));
  }

  // ---- Advies: eigen keuze, anders de snelste terugverdientijd ----
  var wens = A.wens, advies;
  if (wens === 'Airconditioning') advies = 'airco';
  else if (wens === 'Hybride warmtepomp') advies = 'hybride';
  else if (wens === 'All-electric warmtepomp') advies = 'all-electric';
  else {
    r.adviesBron = 'advies';
    var tHy = r.hybride && r.hybride.terugverdientijd, tAe = r.allElectric && r.allElectric.terugverdientijd;
    if (tHy && tAe) advies = tAe <= tHy ? 'all-electric' : 'hybride';
    else if (tAe) advies = 'all-electric';
    else if (tHy) advies = 'hybride';
    else if (v === 'Stadsverwarming' || v === 'Warmtepomp' || goed) advies = 'all-electric';
    else advies = 'hybride';
  }
  r.advies = advies;
  r.adviesLabel = { 'hybride': 'Hybride warmtepomp', 'all-electric': 'All-electric warmtepomp', 'airco': 'Airconditioning' }[advies];

  // ---- Boiler (warm water bij all-electric) ----
  var bad = CFG.boilerStap[A.badkamer];
  if (pers && bad !== undefined) {
    var stap = (pers <= 2 ? 0 : (pers <= 4 ? 1 : 2)) + bad + (A.tegelijkWater === 'Ja' ? 1 : 0);
    r.boiler = CFG.boilerMaten[Math.min(stap, CFG.boilerMaten.length - 1)];
    r.boilerRuim = stap > CFG.boilerMaten.length - 1;
  }

  // ---- Tips (zelfde tekst op het scherm en in de mail) ----
  var t = r.tips;
  if (advies === 'airco') t.push('U koos voor airconditioning. Onze adviseur bepaalt samen met u het aantal binnenunits en het vermogen per ruimte.');
  if (slecht) t.push('Uw woning lijkt matig geïsoleerd. Met extra isolatie werkt een warmtepomp zuiniger en bespaart u meer. Onze adviseur kijkt met u wat het meeste oplevert.');
  if (nieuweKetel && advies !== 'airco') t.push('Uw CV-ketel is ouder dan 10 jaar. Bij een hybride warmtepomp rekenen we daarom ook een nieuwe CV-ketel mee. Bij all-electric is een ketel niet meer nodig.');
  if (v === 'Stadsverwarming' && advies !== 'airco') t.push('U zit nu op stadsverwarming. Een hybride warmtepomp is dan niet mogelijk. Of en wanneer u de aansluiting kunt opzeggen, en wat dat kost, verschilt per warmteleverancier. Dat zoeken we voor u uit.');
  if (r.terugDekking) t.push('U levert nu ' + Math.round(r.teruglevering).toLocaleString('nl-NL') + ' kWh per jaar terug aan het net. Daarmee dekt u ongeveer ' + r.terugDekking + '% van het extra stroomverbruik van een all-electric warmtepomp.');
  if (r.boiler && advies === 'all-electric') t.push('Voor uw warm water rekenen we met een boiler van ongeveer ' + r.boiler + ' liter' + (r.boilerRuim ? ' of groter' : '') + '. Onze adviseur stemt dit af op uw gezin en badkamer.');
  if (A.accu === 'Nee, maar ik wil graag advies over een thuisaccu') t.push('U wilt advies over een thuisaccu. Die nemen we mee in het gesprek, zodat u meer van uw eigen zonnestroom gebruikt.');
  if (A.afstand === 'Minder dan 2 m') t.push('De buitenunit komt dicht bij de erfgrens. Daar gelden strengere geluidseisen. Mogelijk adviseren we een extra stil model of een geluidsscherm.');
  if (A.buitenunit === 'Geen mogelijkheden / onbekend') t.push('Er is nog geen plek voor een buitenunit bekend. Onze adviseur bekijkt de mogelijkheden bij u thuis.');
  if (bij.indexOf('Pelletkachel') > -1 || bij.indexOf('Houtkachel of open haard') > -1) t.push('Uw kachel hebben we meegerekend in het vermogen. Zo krijgt u een warmtepomp die ook zonder de kachel genoeg warmte levert.');
  if (!r.allElectric && advies !== 'airco') t.push('Uw besparing rekenen we precies voor u uit in het persoonlijke advies.');

  return r;
}


const INSTELLINGEN = {
  interneOntvanger: 'info@re-installaties.nl',
  testOntvanger: 'flitsdigital1@gmail.com',
  telefoon: '0591 327 010',
  email: 'info@re-installaties.nl',
  sheetUrl: 'https://docs.google.com/spreadsheets/d/1ftpvyVpulBY74c-hAUkTU0dJsKI6iR_3_HnOrl4EU-I/edit',
  // Klantmail: false = alleen "Uw woning in het kort"; true = ook advies, berekening en tips
  toonBerekeningKlant: false
};

const item = $input.first();
const body = item.json.body || item.json;
let p = {};
try { p = typeof body.data === 'string' ? JSON.parse(body.data) : (body.data || body); } catch (e) { p = {}; }
const a = p.antwoorden || {};
const s = (v) => String(v == null ? '' : v).trim();
const lijst = (v) => Array.isArray(v) ? v.join(', ') : s(v);
const esc = (v) => s(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const getal = (n) => { const neg = n < 0; const t = String(Math.abs(Math.round(n))); let o = ''; for (let i = 0; i < t.length; i++) { if (i && (t.length - i) % 3 === 0) o += '.'; o += t[i]; } return (neg ? '-' : '') + o; };
const euro = (n) => '€ ' + getal(n);
const dec = (n) => String(n).replace('.', ',');

// ---------------------------------------------------------------- validatie
const fouten = [];
if (s(p.website)) fouten.push('spam');
if (!s(a.voornaam)) fouten.push('voornaam');
if (!s(a.achternaam)) fouten.push('achternaam');
if (!/^[^ @]+@[^ @]+[.][^ @]{2,}$/.test(s(a.email))) fouten.push('email');
if (s(a.telefoon).replace(/[^0-9]/g, '').length < 10) fouten.push('telefoon');
if (!/^[0-9]{4} ?[a-zA-Z]{2}$/.test(s(a.postcode))) fouten.push('postcode');
if (!/[0-9]/.test(s(a.huisnummer))) fouten.push('huisnummer');
['woningtype', 'bouwjaar', 'verwarming', 'wens', 'planning'].forEach((k) => { if (!s(a[k])) fouten.push(k); });
if (!(p.akkoord && p.akkoord.privacy === true)) fouten.push('akkoord');
if (fouten.length) return [{ json: { geldig: false, reden: fouten.indexOf('spam') > -1 ? 'ongeldig' : 'ontbrekend: ' + fouten.join(', ') } }];

// ---------------------------------------------------------------- basis
const r = reaBereken(a);
const nu = $now.setZone('Europe/Amsterdam');
const leadId = 'RE-' + nu.toFormat('yyMMdd') + '-' + Math.random().toString(36).slice(2, 6).toUpperCase();
const isTest = p.test === true;
const naam = (s(a.voornaam) + ' ' + s(a.achternaam)).trim();
const postcode = s(a.postcode).replace(/ +/g, '').toUpperCase().replace(/^([0-9]{4})([A-Z]{2})$/, '$1 $2');
const adres = s(a.straat) + ' ' + s(a.huisnummer) + ', ' + postcode + ' ' + s(a.plaats);
const fotoKeys = Object.keys(item.binary || {}).filter((k) => /^foto_/.test(k)).sort();
const utm = Object.keys(p.utm || {}).map((k) => k + '=' + p.utm[k]).join('&');
const adviesTekst = r.adviesLabel ? (r.adviesBron === 'advies' ? 'Advies: ' : 'Keuze: ') + r.adviesLabel : 'Maatwerk';

// ---------------------------------------------------------------- sheetregel
const row = {
  'Datum': nu.toFormat('yyyy-MM-dd HH:mm'), 'Lead-ID': leadId, 'Status': 'Nieuw', 'Test': isTest ? 'ja' : '',
  'Voornaam': s(a.voornaam), 'Achternaam': s(a.achternaam), 'E-mail': s(a.email), 'Telefoon': s(a.telefoon),
  'Straat': s(a.straat), 'Huisnummer': s(a.huisnummer), 'Postcode': postcode, 'Plaats': s(a.plaats),
  'Woningtype': s(a.woningtype), 'Bouwjaar': s(a.bouwjaar), 'Verwarming': s(a.verwarming), 'Ketelleeftijd': s(a.ketelLeeftijd),
  'Gasverbruik (m³)': s(a.gasverbruik), 'Stroomverbruik WP (kWh)': s(a.wpVerbruik), 'Warmteverbruik (GJ)': s(a.gjVerbruik),
  'Toelichting verwarming': s(a.overigToelichting), 'Isolatie': lijst(a.isolatie), 'Afgifte beneden': lijst(a.beneden),
  'Afgifte boven': lijst(a.boven), 'Bijverwarming': lijst(a.bijverwarming), 'Pellets (kg)': s(a.pelletsKg), 'Hout (kg)': s(a.houtKg),
  'Buitenunit': s(a.buitenunit), 'Afstand erfgrens': s(a.afstand), 'Zonnepanelen': s(a.zonnepanelen),
  'Aantal panelen': s(a.aantalPanelen), 'Opbrengst (kWh)': s(a.opbrengst), 'Teruglevering (kWh)': s(a.teruglevering),
  'Gastarief': s(a.tGas), 'Stroomtarief': s(a.tStroom), 'Vastrecht gas (jaar)': s(a.tVast), 'Thuisaccu': s(a.accu), 'Accu (kWh)': s(a.accuKwh),
  'Wens': s(a.wens), 'Planning': s(a.planning), 'Opmerkingen': s(a.opmerkingen),
  'Personen': s(a.personen), 'Badkamer': s(a.badkamer), 'Tegelijk warm water': s(a.tegelijkWater), 'Boiler (L)': r.boiler ? r.boiler + (r.boilerRuim ? '+' : '') : '', 'Gas warm water (m³, schatting)': r.gasWarmWater || '',
  'Warmtetarief (€/GJ)': s(a.tGJ), 'Vaste kosten warmte (jaar)': s(a.tVastWarmte), 'Rekenversie': r.versie,
  'Vermogen (kW)': r.kw || '', 'Warmtevraag (kWh)': r.warmte || '', 'Huidige kosten (€/jr)': r.kostNu || '',
  'Besparing hybride (€/jr)': r.hybride ? r.hybride.besparing : '', 'Besparing all-electric (€/jr)': r.allElectric ? r.allElectric.besparing : '',
  'TVT hybride (jr)': r.hybride && r.hybride.terugverdientijd ? dec(r.hybride.terugverdientijd) : '',
  'TVT all-electric (jr)': r.allElectric && r.allElectric.terugverdientijd ? dec(r.allElectric.terugverdientijd) : '',
  'Advies': adviesTekst, "Foto's (aantal)": fotoKeys.length, 'Fotomap': fotoKeys.length ? 'Als bijlage in leadmail' : '',
  'Akkoord privacy': p.akkoord && p.akkoord.tijdstip ? p.akkoord.tijdstip : 'ja', 'Bron': s(p.bron), 'UTM': utm
};

// ---------------------------------------------------------------- mailbouwstenen
const F = 'font-family:Outfit,Arial,Helvetica,sans-serif;';
const C = { navy: '#030d1b', blauw: '#018ed1', blauwDonker: '#1454a4', zacht: '#e8f3f7', groen: '#279857', groenZacht: '#e6f4d9', oranje: '#f58236', inkt: '#242321', grijs: '#474641', lijn: '#e1dfd6' };
const tr = (l, v, extra) => '<tr><td style="padding:7px 0;color:' + C.grijs + ';font-size:14px;border-bottom:1px solid ' + C.lijn + '">' + l + '</td><td style="padding:7px 0;text-align:right;font-size:14px;font-weight:600;color:' + C.inkt + ';border-bottom:1px solid ' + C.lijn + ';' + (extra || '') + '">' + v + '</td></tr>';
const kop = (t) => '<h3 style="' + F + 'margin:26px 0 8px;font-size:17px;color:' + C.navy + ';font-weight:600">' + t + '</h3>';
const tipsHtml = r.tips.length ? '<table role="presentation" width="100%" cellpadding="0" cellspacing="0">' + r.tips.map((t) => '<tr><td width="30" valign="top" style="padding:1px 0 12px 0"><div style="width:18px;height:18px;line-height:18px;border-radius:5px;background:' + C.groenZacht + ';border:1px solid ' + C.groen + ';color:' + C.groen + ';font-size:12px;font-weight:700;text-align:center;' + F + '">&#10003;</div></td><td valign="top" style="padding:0 0 12px 0;font-size:14px;line-height:1.55;color:' + C.grijs + ';' + F + '">' + esc(t) + '</td></tr>').join('') + '</table>' : '';

let vergelijking = '';
if (r.allElectric && r.advies !== 'airco') {
  const beide = r.adviesBron === 'advies';
  const toonHy = !!r.hybride && (beide || r.advies === 'hybride');
  const toonAe = beide || r.advies === 'all-electric' || !r.hybride;
  const th = (t, rec) => '<th style="' + F + 'padding:10px 8px;font-size:13px;text-align:right;color:' + (rec ? '#fff' : C.navy) + ';background:' + (rec ? C.blauw : C.zacht) + ';border-radius:6px 6px 0 0">' + t + '</th>';
  const td = (v, rec, bold) => '<td style="padding:9px 8px;font-size:14px;text-align:right;border-bottom:1px solid ' + C.lijn + ';' + (rec ? 'background:#f3f9fc;' : '') + (bold ? 'font-weight:600;color:' + C.groen + ';' : 'color:' + C.inkt + ';') + '">' + v + '</td>';
  const lbl = (t) => '<td style="padding:9px 8px 9px 0;font-size:14px;color:' + C.grijs + ';border-bottom:1px solid ' + C.lijn + '">' + t + '</td>';
  const recHy = r.advies === 'hybride', recAe = r.advies === 'all-electric';
  const hy = r.hybride || {}, ae = r.allElectric;
  const rij = (l, vNu, vHy, vAe, bold) => '<tr>' + lbl(l) + td(vNu, false) + (toonHy ? td(vHy, recHy, bold) : '') + (toonAe ? td(vAe, recAe, bold) : '') + '</tr>';
  const tvt = (o) => o.terugverdientijd ? '± ' + dec(o.terugverdientijd) + ' jaar' : '–';
  const gasBron = r.bron === 'gas';
  const T = r.tarieven, inv = r.investering;
  const invTekst = [toonHy ? euro(inv.hybride) + ' voor een hybride warmtepomp (bijv. ' + inv.hybrideToestel + (inv.nieuweKetel ? ', incl. nieuwe CV-ketel' : '') + ')' : '', toonAe ? euro(inv.allElectric) + ' voor een all-electric warmtepomp (bijv. ' + inv.aeToestel + ')' : ''].filter(Boolean).join(' of ');
  vergelijking = kop('Wat levert het u op?') +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border-spacing:0;' + F + '"><tr><th></th>' + th('Nu', false) + (toonHy ? th('Hybride', recHy) : '') + (toonAe ? th('All-electric', recAe) : '') + '</tr>' +
    rij('Energiekosten per jaar', euro(r.kostNu), euro(hy.kosten || 0), euro(ae.kosten)) +
    rij('Besparing per jaar', '–', euro(hy.besparing || 0), euro(ae.besparing), true) +
    (gasBron ? rij('Gasverbruik', getal(r.gas) + ' m³', getal(hy.gasRest || 0) + ' m³', '0 m³') : rij('Warmte van het warmtenet', getal(r.gj) + ' GJ', '–', '0 GJ')) +
    rij('Extra stroomverbruik', '–', getal(hy.stroom || 0) + ' kWh', getal(ae.stroom) + ' kWh') +
    rij('Terugverdientijd*', '–', tvt(hy), tvt(ae)) + '</table>' +
    '<p style="margin:8px 0 0;font-size:12px;line-height:1.5;color:#7a786f">* Indicatie met ' +
    (gasBron ? '€' + dec(T.gas.toFixed(2)) + '/m³ gas, ' + euro(T.vastrecht) + ' vastrecht gas per jaar, ' : '€' + dec(T.warmte.toFixed(2)) + '/GJ warmte, ' + euro(T.vastWarmte) + ' vaste kosten warmte per jaar, ') +
    '€' + dec(T.stroom.toFixed(2)) + '/kWh stroom en een netto investering van ' + invTekst + ', incl. btw en na aftrek van de ISDE-subsidie.</p>';
}

const woning = [
  ['Woning', esc(a.woningtype) + ', ' + esc(a.bouwjaar)], ['Huishouden', a.personen ? esc(a.personen) + (a.personen === '1' ? ' persoon' : ' personen') + (a.badkamer ? ', ' + esc(a.badkamer).toLowerCase() : '') : '–'],
  ['Huidige verwarming', esc(a.verwarming) + (a.ketelLeeftijd ? ' (' + esc(a.ketelLeeftijd).toLowerCase() + ')' : '')],
  ['Verbruik per jaar', a.gasverbruik ? esc(a.gasverbruik) + ' m³ gas' : (a.wpVerbruik ? esc(a.wpVerbruik) + ' kWh stroom' : (a.gjVerbruik ? esc(a.gjVerbruik) + ' GJ warmte' : (a.overigToelichting ? esc(a.overigToelichting) : '–')))],
  ['Isolatie', esc(lijst(a.isolatie))], ['Verwarming beneden / boven', esc(lijst(a.beneden)) + ' / ' + esc(lijst(a.boven))],
  ['Bijverwarming', esc(lijst(a.bijverwarming))], ['Buitenunit', esc(a.buitenunit) + (a.afstand ? ' (' + esc(a.afstand) + ' tot erfgrens)' : '')],
  ['Zonnepanelen', esc(a.zonnepanelen) + (a.teruglevering ? ', ' + esc(a.teruglevering) + ' kWh teruglevering' : '')], ['Uw wens', esc(a.wens)], ['Planning', esc(a.planning)]
];
const metBerekening = INSTELLINGEN.toonBerekeningKlant;

const adviesBlok = r.advies === 'airco'
  ? '<p style="margin:0;font-size:15px;color:' + C.inkt + '"><strong>Uw keuze: Airconditioning</strong></p>'
  : '<p style="margin:0 0 4px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:' + C.blauwDonker + ';font-weight:600">' + (r.adviesBron === 'advies' ? 'Ons advies' : 'Uw keuze') + '</p>' +
    '<p style="margin:0 0 10px;font-size:22px;font-weight:600;color:' + C.navy + '">' + esc(r.adviesLabel) + '</p>' +
    (r.kw ? '<p style="margin:0;font-size:14px;color:' + C.grijs + '">Geschat vermogen: <strong style="color:' + C.navy + '">± ' + r.kw + ' kW</strong> · op basis van ' + esc(r.basis) + (r.gasWarmWater ? ', waarvan ± ' + getal(r.gasWarmWater) + ' m³ voor warm water' : '') + '</p>' : '') +
    (r.allElectric && r.advies !== 'hybride' ? '<p style="margin:6px 0 0;font-size:14px;color:' + C.grijs + '">Verwachte besparing: <strong style="color:' + C.groen + '">' + euro(r.allElectric.besparing) + ' per jaar</strong></p>' : '') +
    (r.hybride && r.advies === 'hybride' ? '<p style="margin:6px 0 0;font-size:14px;color:' + C.grijs + '">Verwachte besparing: <strong style="color:' + C.groen + '">' + euro(r.hybride.besparing) + ' per jaar</strong></p>' : '') +
    (r.boiler && r.advies === 'all-electric' ? '<p style="margin:6px 0 0;font-size:14px;color:' + C.grijs + '">Boiler voor warm water: <strong style="color:' + C.navy + '">± ' + r.boiler + ' liter' + (r.boilerRuim ? ' of groter' : '') + '</strong></p>' : '');

const klantHtml =
  '<!DOCTYPE html><html lang="nl"><body style="margin:0;padding:0;background:#f0eee6">' +
  '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f0eee6"><tr><td align="center" style="padding:24px 12px">' +
  '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;background:#ffffff;border-radius:10px;overflow:hidden;' + F + 'color:' + C.inkt + '">' +
  '<tr><td style="background:' + C.navy + ';padding:22px 28px"><span style="' + F + 'color:#fff;font-size:20px;font-weight:600;letter-spacing:.3px">R&amp;E Installaties</span><br><span style="' + F + 'color:#9fc8df;font-size:13px">' + (metBerekening ? 'Uw persoonlijke verduurzamingsadvies' : 'Uw adviesaanvraag') + ' · ' + leadId + '</span></td></tr>' +
  '<tr><td style="padding:28px">' +
  '<h2 style="' + F + 'margin:0 0 10px;font-size:22px;color:' + C.navy + ';font-weight:600">Beste ' + esc(a.voornaam) + ',</h2>' +
  '<p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:' + C.grijs + '">' + (metBerekening
    ? 'Bedankt voor uw aanvraag. Op basis van uw antwoorden hebben we een eerste advies voor uw woning gemaakt. Hieronder ziet u wat wij u aanraden en wat het u ongeveer oplevert.'
    : 'Bedankt voor uw aanvraag. We hebben uw gegevens goed ontvangen. Hieronder ziet u een overzicht van uw antwoorden. Daarmee maken we een advies op maat voor uw woning.') + '</p><!--PDF-->' +
  (metBerekening ? '<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td style="background:' + C.zacht + ';border-radius:8px;padding:18px 20px;border-left:4px solid ' + C.blauw + '">' + adviesBlok + '</td></tr></table>' +
    vergelijking + (tipsHtml ? kop('Goed om te weten') + tipsHtml : '') : '') +
  kop('Uw woning in het kort') + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="' + F + '">' + woning.map((w) => tr(w[0], w[1])).join('') + '</table>' +
  kop('Hoe gaat het verder?') +
  '<p style="margin:0 0 18px;font-size:15px;line-height:1.6;color:' + C.grijs + '">Een adviseur van R&amp;E Installaties neemt zo snel mogelijk contact met u op. We bespreken ' + (metBerekening ? 'het advies' : 'uw situatie') + ' en plannen zo nodig een bezoek aan huis. Daarna ontvangt u ' + (metBerekening ? 'een offerte' : 'een advies en offerte') + ' op maat.</p>' +
  '<table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="background:' + C.oranje + ';border-radius:100px"><a href="tel:' + INSTELLINGEN.telefoon.replace(/ /g, '') + '" style="' + F + 'display:inline-block;padding:12px 24px;color:#fff;font-weight:600;font-size:15px;text-decoration:none">Bel ' + INSTELLINGEN.telefoon + '</a></td></tr></table>' +
  '<p style="margin:16px 0 0;font-size:14px;color:' + C.grijs + '">Vragen? Beantwoord deze mail of mail naar <a href="mailto:' + INSTELLINGEN.email + '" style="color:' + C.blauwDonker + '">' + INSTELLINGEN.email + '</a>.</p>' +
  '<p style="margin:22px 0 0;font-size:15px;color:' + C.grijs + '">Met vriendelijke groet,<br>Team R&amp;E Installaties</p>' +
  '</td></tr>' +
  '<tr><td style="padding:16px 28px;background:#f7f6f1;font-size:12px;line-height:1.5;color:#7a786f">' + (metBerekening ? 'Dit advies is een indicatie op basis van uw eigen antwoorden. De definitieve keuze en prijs volgen na beoordeling door onze adviseur.' : 'Dit is een overzicht van uw eigen antwoorden. Het advies en de prijs volgen na beoordeling door onze adviseur.') + '<br>R&amp;E Installaties · Willem Schoutenstraat 17, 7825 VV Emmen · ' + INSTELLINGEN.telefoon + '</td></tr>' +
  '</table></td></tr></table></body></html>';

// ---------------------------------------------------------------- PDF (via PDFBolt)
const datumNl = nu.setLocale('nl').toFormat('d MMMM yyyy');
const pdfHtml =
  '<!DOCTYPE html><html lang="nl"><head><meta charset="utf-8">' +
  '<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600&display=swap" rel="stylesheet">' +
  '<style>@page{size:A4;margin:16mm 16mm 20mm}*{box-sizing:border-box}body{margin:0;' + F + 'color:' + C.inkt + ';font-size:13px;-webkit-print-color-adjust:exact;print-color-adjust:exact}' +
  'table{border-collapse:collapse}tr{break-inside:avoid}h3{break-after:avoid}.blok{break-inside:avoid}</style></head><body>' +
  '<table width="100%" cellpadding="0" cellspacing="0" style="background:' + C.navy + ';border-radius:10px"><tr>' +
  '<td style="padding:22px 26px"><div style="color:#fff;font-size:22px;font-weight:600">R&amp;E Installaties</div>' +
  '<div style="color:#9fc8df;font-size:13px;margin-top:2px">' + (metBerekening ? 'Persoonlijk verduurzamingsadvies' : 'Overzicht adviesaanvraag verduurzaming') + '</div></td>' +
  '<td style="padding:22px 26px;text-align:right;color:#fff;font-size:12px;line-height:1.6">' + datumNl + '<br>Referentie ' + leadId + '</td></tr></table>' +
  '<div class="blok" style="margin:22px 0 4px;padding:16px 20px;background:' + C.zacht + ';border-radius:8px;border-left:4px solid ' + C.blauw + '">' +
  '<div style="font-size:16px;font-weight:600;color:' + C.navy + '">' + esc(naam) + '</div>' +
  '<div style="color:' + C.grijs + ';line-height:1.6;margin-top:2px">' + esc(adres) + '<br>' + esc(a.email) + ' · ' + esc(a.telefoon) + '</div></div>' +
  (metBerekening ? '<div class="blok" style="margin-top:18px">' + adviesBlok + '</div>' + vergelijking + (tipsHtml ? kop('Goed om te weten') + tipsHtml : '') : '') +
  kop('Uw woning in het kort') + '<table width="100%" cellpadding="0" cellspacing="0">' + woning.map((w) => tr(w[0], w[1])).join('') + '</table>' +
  (s(a.opmerkingen) ? kop('Uw opmerkingen') + '<p style="margin:0;line-height:1.6;color:' + C.grijs + '">' + esc(a.opmerkingen) + '</p>' : '') +
  '<div class="blok">' + kop('Hoe gaat het verder?') +
  '<p style="margin:0;line-height:1.6;color:' + C.grijs + '">Een adviseur van R&amp;E Installaties neemt zo snel mogelijk contact met u op. We bespreken ' + (metBerekening ? 'het advies' : 'uw situatie') + ' en plannen zo nodig een bezoek aan huis. Daarna ontvangt u ' + (metBerekening ? 'een offerte' : 'een advies en offerte') + ' op maat.</p></div>' +
  '<div class="blok" style="margin-top:26px;padding-top:12px;border-top:1px solid ' + C.lijn + ';font-size:11px;line-height:1.6;color:#7a786f">' +
  (metBerekening ? 'Dit advies is een indicatie op basis van uw eigen antwoorden. De definitieve keuze en prijs volgen na beoordeling door onze adviseur.' : 'Dit is een overzicht van uw eigen antwoorden. Het advies en de prijs volgen na beoordeling door onze adviseur.') +
  '<br>R&amp;E Installaties · Willem Schoutenstraat 17, 7825 VV Emmen · ' + INSTELLINGEN.telefoon + ' · ' + INSTELLINGEN.email + '</div>' +
  '</body></html>';
const pdfBestand = 'RE-Installaties-adviesaanvraag-' + leadId + '.pdf';
const pdfZin = '<p style="margin:-8px 0 20px;font-size:14px;line-height:1.6;color:' + C.grijs + '">In de bijlage vindt u dit overzicht ook als PDF.</p>';

// ---------------------------------------------------------------- interne leadmail
const LABELS = {
  woningtype: 'Woningtype', bouwjaar: 'Bouwjaar', personen: 'Aantal personen', badkamer: 'Badkamer', tegelijkWater: 'Tegelijk warm water', verwarming: 'Huidige verwarming', ketelLeeftijd: 'Leeftijd CV-ketel', gasverbruik: 'Gasverbruik (m³/jr)',
  wpVerbruik: 'Stroomverbruik warmtepomp (kWh/jr)', gjVerbruik: 'Warmteverbruik (GJ/jr)', overigToelichting: 'Toelichting verwarming', isolatie: 'Isolatie',
  beneden: 'Verwarming beneden', boven: 'Verwarming boven', bijverwarming: 'Bijverwarming', pelletsKg: 'Pellets (kg/jr)', houtKg: 'Hout (kg/jr)',
  buitenunit: 'Plek buitenunit', afstand: 'Afstand tot erfgrens', zonnepanelen: 'Zonnepanelen', aantalPanelen: 'Aantal panelen', opbrengst: 'Opbrengst (kWh/jr)',
  teruglevering: 'Teruglevering (kWh/jr)', tGas: 'Gastarief (€/m³)', tStroom: 'Stroomtarief (€/kWh)', tVast: 'Vastrecht gas (€/jr)', tGJ: 'Warmtetarief (€/GJ)', tVastWarmte: 'Vaste kosten warmte (€/jr)', accu: 'Thuisaccu', accuKwh: 'Accu (kWh)',
  wens: 'Wens', planning: 'Planning', opmerkingen: 'Opmerkingen'
};
const antwoordRijen = Object.keys(LABELS).filter((k) => s(lijst(a[k]))).map((k) => tr(LABELS[k], esc(lijst(a[k])), 'font-weight:500')).join('');
const tvtTxt = (o) => o.terugverdientijd ? dec(o.terugverdientijd) + ' jr' : '–';
const indicatieRijen = r.heeftIndicatie
  ? tr('Vermogen', '± ' + r.kw + ' kW') + tr('Warmtevraag', getal(r.warmte) + ' kWh' + (r.warmteWarmWater ? ' (verwarming ' + getal(r.warmteVerwarming) + ' · warm water ' + getal(r.warmteWarmWater) + ')' : '') + (r.bijWarmte ? ' + ' + getal(r.bijWarmte) + ' kWh kachel' : '')) +
    tr('SCOP', 'all-electric ' + dec(r.scop) + (r.hybride ? ' · hybride ' + dec(r.scopHybride) : '') + (r.ltv ? ' (incl. vloerverwarming)' : '')) +
    (r.allElectric ? tr('Huidige kosten', euro(r.kostNu) + '/jr') +
      (r.hybride ? tr('Besparing hybride', euro(r.hybride.besparing) + '/jr · TVT ' + tvtTxt(r.hybride) + ' (inv. ' + euro(r.investering.hybride) + (r.investering.nieuweKetel ? ' incl. nieuwe ketel' : '') + ')') : '') +
      tr('Besparing all-electric', euro(r.allElectric.besparing) + '/jr · TVT ' + tvtTxt(r.allElectric) + ' (inv. ' + euro(r.investering.allElectric) + ')') : '') +
    (r.boiler ? tr('Boiler (schatting)', r.boiler + ' L' + (r.boilerRuim ? ' of groter' : '')) : '')
  : tr('Indicatie', 'niet te berekenen (geen verbruik opgegeven)') + (r.boiler ? tr('Boiler (schatting)', r.boiler + ' L' + (r.boilerRuim ? ' of groter' : '')) : '');
const internHtml =
  '<div style="' + F + 'color:' + C.inkt + ';max-width:660px;margin:0 auto;line-height:1.5">' +
  (isTest ? '<p style="background:#fff4e8;color:#9c331b;padding:8px 12px;border-radius:6px;font-weight:600">TESTAANVRAAG – niet opvolgen</p>' : '') +
  '<h2 style="color:' + C.navy + ';margin:0 0 4px">Nieuwe adviesaanvraag verduurzaming</h2>' +
  '<p style="color:' + C.grijs + ';margin:0 0 16px">' + leadId + ' · ' + nu.toFormat('dd-MM-yyyy HH:mm') + ' · ' + esc(adviesTekst) + '</p>' +
  '<table width="100%" cellpadding="0" cellspacing="0" style="background:' + C.zacht + ';border-radius:8px"><tr><td style="padding:14px 18px;font-size:15px">' +
  '<strong style="font-size:17px;color:' + C.navy + '">' + esc(naam) + '</strong><br>' + esc(adres) + '<br>' +
  '<a href="tel:' + esc(s(a.telefoon).replace(/[^0-9+]/g, '')) + '" style="color:' + C.blauwDonker + '">' + esc(a.telefoon) + '</a> · <a href="mailto:' + esc(a.email) + '" style="color:' + C.blauwDonker + '">' + esc(a.email) + '</a></td></tr></table>' +
  kop('Indicatie') + '<table width="100%" cellpadding="0" cellspacing="0">' + indicatieRijen + '</table>' +
  kop('Antwoorden') + '<table width="100%" cellpadding="0" cellspacing="0">' + antwoordRijen + '</table>' +
  kop('Links') + '<p style="font-size:14px;margin:0">' +
  '<a href="' + INSTELLINGEN.sheetUrl + '" style="color:' + C.blauwDonker + '">Alle aanvragen (Google Sheet)</a>' +
  (fotoKeys.length ? ' · ' + fotoKeys.length + " foto's als bijlage bij deze mail" : " · geen foto's meegestuurd") + '</p>' +
  '<p style="font-size:12px;color:#7a786f;margin-top:18px">Bron: ' + esc(p.bron) + (utm ? ' · ' + esc(utm) : '') + ' · akkoord privacy: ' + esc(row['Akkoord privacy']) + '</p></div>';

return [{
  json: {
    geldig: true, leadId, isTest, naam, fotoAantal: fotoKeys.length, fotoKeys,
    mapNaam: nu.toFormat('yyyy-MM-dd') + ' – ' + naam + ' – ' + postcode + ' (' + leadId + ')',
    row, indicatie: r,
    pdf: { html: Buffer.from(pdfHtml, 'utf8').toString('base64'), bestand: pdfBestand },
    klant: { pdfZin, to: s(a.email), subject: (metBerekening ? 'Uw persoonlijke verduurzamingsadvies' : 'Uw adviesaanvraag is ontvangen') + ' – R&E Installaties', html: klantHtml },
    intern: {
      to: isTest ? INSTELLINGEN.testOntvanger : INSTELLINGEN.interneOntvanger, replyTo: s(a.email),
      subject: (isTest ? '[TEST] ' : '') + 'Nieuwe adviesaanvraag – ' + naam + ', ' + s(a.plaats) + ' (' + (r.adviesLabel || 'maatwerk') + (r.kw ? ', ± ' + r.kw + ' kW' : '') + ')',
      html: internHtml
    }
  },
  binary: item.binary
}];
