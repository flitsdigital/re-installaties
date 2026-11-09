/* R&E Installaties – Advies verduurzaming · gedeelde rekenlogica.
   Wordt in de widget gebundeld en door npm run build in n8n/verwerk-aanvraag.n8n.js gezet.
   n8n is leidend: de cijfers in de rapportmail en op het bedankscherm komen uit n8n. */

var REA_CFG = {
  versie: '1.1.0',
  // Standaardtarieven als de klant niets invult (incl. belastingen)
  tariefGas: 1.35,          // € per m³
  tariefStroom: 0.28,       // € per kWh
  vastrechtGas: 300,        // € per jaar
  // Omrekening naar nuttige warmte (kWh)
  kwhPerM3: 8.8,            // HR-ketel, ~90% van 9,77 kWh
  kwhPerGJ: 277.8,
  bestaandeWpScop: 3.3,     // bestaande warmtepomp: kWh stroom → kWh warmte
  kwhPerKgPellets: 4.1,     // 4,8 kWh × ~85% rendement
  kwhPerKgHout: 2.5,        // ~4,2 kWh × ~60% rendement
  // Dimensionering
  vollastUren: 2000,
  maten: [4, 5, 6, 8, 10, 12, 14, 16],
  // SCOP per situatie
  scopLtv: 4.0,             // vloerverwarming, geen radiatoren boven
  scopMix: 3.3,
  scopSlecht: 2.8,          // matig geïsoleerd
  // Hybride
  hybrideAandeel: 0.65,     // deel van de warmtevraag dat de warmtepomp overneemt
  hybrideScopBonus: 0.3,
  // Netto investering (na subsidie) – placeholders, door R&E te bepalen
  investeringHybride: 4000,
  investeringAllElectric: 11000
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

  // ---- Warmtevraag ----
  var warmte = null, basis = '', gas = null;
  if (v === 'CV-ketel (gas)') {
    gas = reaNum(A.gasverbruik);
    if (gas) { warmte = gas * CFG.kwhPerM3; basis = Math.round(gas).toLocaleString('nl-NL') + ' m³ gas per jaar'; }
  } else if (v === 'Warmtepomp') {
    var k = reaNum(A.wpVerbruik);
    if (k) { warmte = k * CFG.bestaandeWpScop; basis = Math.round(k).toLocaleString('nl-NL') + ' kWh stroom per jaar'; }
  } else if (v === 'Stadsverwarming') {
    var g = reaNum(A.gjVerbruik);
    if (g) { warmte = g * CFG.kwhPerGJ; basis = Math.round(g).toLocaleString('nl-NL') + ' GJ warmte per jaar'; }
  }
  var bijWarmte = (bij.indexOf('Pelletkachel') > -1 ? (reaNum(A.pelletsKg) || 0) * CFG.kwhPerKgPellets : 0) +
                  (bij.indexOf('Houtkachel of open haard') > -1 ? (reaNum(A.houtKg) || 0) * CFG.kwhPerKgHout : 0);
  if (warmte && bijWarmte) basis += ' + bijverwarming';

  // ---- Woningkwaliteit ----
  var ltv = ben.indexOf('Vloerverwarming') > -1 && bov.indexOf('Radiatoren') === -1;
  var maatregelen = iso.filter(function (x) { return x !== 'Weet ik niet' && x !== 'Niet geïsoleerd'; }).length;
  var slecht = iso.indexOf('Niet geïsoleerd') > -1 || (A.bouwjaar === 'Voor 1975' && maatregelen < 2);
  var scop = slecht ? CFG.scopSlecht : (ltv ? CFG.scopLtv : CFG.scopMix);
  var goed = !slecht && (['1990 – 2012', 'Na 2012', 'Nieuwbouw'].indexOf(A.bouwjaar) > -1 || maatregelen >= 3);

  var pG = reaNum(A.tGas) || CFG.tariefGas;
  var pS = reaNum(A.tStroom) || CFG.tariefStroom;
  var vast = reaNum(A.tVast); if (vast === null) vast = CFG.vastrechtGas;

  // ---- Advies ----
  var wens = A.wens, advies, adviesBron = 'keuze';
  if (wens === 'Airconditioning') advies = 'airco';
  else if (wens === 'Hybride warmtepomp') advies = 'hybride';
  else if (wens === 'All-electric warmtepomp') advies = 'all-electric';
  else { adviesBron = 'advies'; advies = (v === 'Warmtepomp' || goed) ? 'all-electric' : 'hybride'; }
  var labels = { 'hybride': 'Hybride warmtepomp', 'all-electric': 'All-electric warmtepomp', 'airco': 'Airconditioning' };

  var r = {
    versie: CFG.versie,
    heeftIndicatie: !!warmte,
    basis: basis,
    warmte: warmte ? Math.round(warmte) : null,
    bijWarmte: bijWarmte ? Math.round(bijWarmte) : 0,
    kw: null, scop: scop, slecht: slecht, goedGeisoleerd: goed, ltv: ltv,
    advies: advies, adviesLabel: labels[advies], adviesBron: adviesBron,
    tarieven: { gas: pG, stroom: pS, vastrecht: vast },
    gas: gas, kostNu: null, hybride: null, allElectric: null,
    teruglevering: reaNum(A.teruglevering), terugDekking: null,
    tips: []
  };

  if (warmte) {
    var kwRaw = (warmte + bijWarmte) / CFG.vollastUren;
    r.kw = CFG.maten.filter(function (m) { return m >= kwRaw; })[0] || CFG.maten[CFG.maten.length - 1];
  }

  if (gas) {
    var kostNu = gas * pG + vast;
    var aeStroom = warmte / scop;
    var ae = { stroom: Math.round(aeStroom), kosten: Math.round(aeStroom * pS) };
    ae.besparing = Math.round(kostNu - aeStroom * pS);
    ae.terugverdientijd = ae.besparing > 0 ? Math.round(CFG.investeringAllElectric / ae.besparing * 10) / 10 : null;
    var hyGas = gas * (1 - CFG.hybrideAandeel);
    var hyStroom = warmte * CFG.hybrideAandeel / (scop + CFG.hybrideScopBonus);
    var hy = { stroom: Math.round(hyStroom), gasRest: Math.round(hyGas), kosten: Math.round(hyGas * pG + vast + hyStroom * pS) };
    hy.besparing = Math.round(kostNu - hy.kosten);
    hy.terugverdientijd = hy.besparing > 0 ? Math.round(CFG.investeringHybride / hy.besparing * 10) / 10 : null;
    r.kostNu = Math.round(kostNu); r.allElectric = ae; r.hybride = hy;
    if (r.teruglevering && ae.stroom) r.terugDekking = Math.min(100, Math.round(r.teruglevering / ae.stroom * 100));
    r.investering = { hybride: CFG.investeringHybride, allElectric: CFG.investeringAllElectric };
  }

  // ---- Tips (zelfde tekst op het scherm en in de mail) ----
  var t = r.tips;
  if (advies === 'airco') t.push('U koos voor airconditioning. Onze adviseur bepaalt samen met u het aantal binnenunits en het vermogen per ruimte.');
  if (slecht) t.push('Uw woning lijkt matig geïsoleerd. Begin met een hybride warmtepomp, of laat eerst extra isoleren. Dan werkt een warmtepomp later zuiniger.');
  if (A.ketelLeeftijd === 'Ouder dan 10 jaar') t.push('Uw CV-ketel is ouder dan 10 jaar. Dit is een goed moment om over te stappen, voordat de ketel vervangen moet worden.');
  if (r.terugDekking) t.push('U levert nu ' + Math.round(r.teruglevering).toLocaleString('nl-NL') + ' kWh per jaar terug aan het net. Daarmee dekt u ongeveer ' + r.terugDekking + '% van het extra stroomverbruik van een all-electric warmtepomp.');
  if (A.accu === 'Nee, maar ik wil graag advies over een thuisaccu') t.push('U wilt advies over een thuisaccu. Die nemen we mee in het gesprek, zodat u meer van uw eigen zonnestroom gebruikt.');
  if (A.afstand === 'Minder dan 2 m') t.push('De buitenunit komt dicht bij de erfgrens. Daar gelden strengere geluidseisen. Mogelijk adviseren we een extra stil model of een geluidsscherm.');
  if (A.buitenunit === 'Geen mogelijkheden / onbekend') t.push('Er is nog geen plek voor een buitenunit bekend. Onze adviseur bekijkt de mogelijkheden bij u thuis.');
  if (bij.indexOf('Pelletkachel') > -1 || bij.indexOf('Houtkachel of open haard') > -1) t.push('Uw kachel hebben we meegerekend in het vermogen. Zo krijgt u een warmtepomp die ook zonder de kachel genoeg warmte levert.');
  if (!warmte && advies !== 'airco') t.push('Uw besparing rekenen we precies voor u uit in het persoonlijke advies.');

  return r;
}
