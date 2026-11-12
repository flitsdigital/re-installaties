/* R&E Installaties – Advies verduurzaming · gedeelde rekenlogica.
   Wordt in de widget gebundeld en door npm run build in n8n/verwerk-aanvraag.n8n.js gezet.
   n8n is leidend: de cijfers in de rapportmail komen uit n8n.
   Let op: geen backslashes in dit bestand (het wordt in de n8n-workflow ingesloten). */

var REA_CFG = {
  versie: '1.5.1',
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
  hybrideVermogen: 0.5,     // hybride: 50% van het benodigde vermogen (de ketel vult aan)
  // Investering: prijs ex. btw + btw − ISDE-subsidie = netto voor de klant
  btw: 0.21,
  hybrideToestel: 'Xtend eco 5 kW',
  hybridePrijsEx: 6000,
  hybrideSubsidie: 2125,
  ketelPrijsEx: 2400,       // nieuwe CV-ketel bij hybride als de huidige ketel ouder is dan 10 jaar
  aeToestel: 'Bosch Compress 7 kW met 300 L boiler',
  aePrijsEx: 12180.17,      // = € 14.738 incl. btw
  aeSubsidie: 3025,
  // Warm water (tapwater)
  wwM3PerPersoon: 75,       // m³ gas per bewoner per jaar bij een standaard douche (~20% van een gemiddeld gezinsverbruik)
  wwFactor: { 'Standaard douche': 1.0, 'Regendouche': 1.4, 'Bad en standaard douche': 1.2, 'Bad en/of regendouche': 1.5, 'Meerdere badkamers': 1.3 },
  wwMaxAandeel: 0.4,        // warm water nooit meer dan 40% van de totale warmtevraag
  scopWarmWater: 2.5,       // warmtepomp maakt tapwater op 55–60 °C, dus lager rendement
  // Zonnepanelen (zonder thuisaccu): 20–30% van het warmtepompverbruik komt uit eigen zonnestroom
  zonDekking: 0.25,
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

  // Ingevulde tarieven controleren: centen omrekenen, maandbedragen ×12, onzin vervangen door het standaardtarief
  var correcties = [];
  var fmt = function (n) { return String(Math.round(n * 100) / 100).replace('.', ','); };
  // maandGrens: bij jaarbedragen wordt een getal daaronder gelezen als bedrag per maand
  var tarief = function (veld, naam, def, min, max, maandGrens) {
    var n = reaNum(A[veld]);
    if (n === null) return def;
    if (maandGrens && n < maandGrens) {
      if (n * 12 >= min && n * 12 <= max) { correcties.push(naam + ' ' + fmt(n) + ' gelezen als per maand: € ' + fmt(n * 12) + ' per jaar'); return n * 12; }
    } else if (n >= min && n <= max) return n;
    if (!maandGrens && n / 100 >= min && n / 100 <= max) { correcties.push(naam + ' ' + fmt(n) + ' gelezen als centen: € ' + fmt(n / 100)); return n / 100; }
    correcties.push(naam + ' ' + fmt(n) + ' lijkt onjuist, gerekend met € ' + fmt(def));
    return def;
  };
  var pG = tarief('tGas', 'Gastarief', CFG.tariefGas, 0.3, 4);
  var pS = tarief('tStroom', 'Stroomtarief', CFG.tariefStroom, 0.05, 1.2);
  var vast = tarief('tVast', 'Vastrecht gas', CFG.vastrechtGas, 50, 1500, 60);
  var pW = tarief('tGJ', 'Warmtetarief', CFG.tariefWarmte, 10, 150);
  var vastW = tarief('tVastWarmte', 'Vaste kosten warmte', CFG.vastWarmte, 100, 2500, 170);

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
    kw: null, kwHybride: null, correcties: correcties, scop: scopAe, scopHybride: scopHy, slecht: slecht, goedGeisoleerd: goed, ltv: ltv,
    advies: null, adviesLabel: null, adviesBron: 'keuze',
    tarieven: { gas: pG, stroom: pS, vastrecht: vast, warmte: pW, vastWarmte: vastW },
    gas: gas, gj: gj, bron: gas ? 'gas' : (gj ? 'warmtenet' : null),
    kostNu: null, hybride: null, allElectric: null,
    investering: { hybride: invHy, allElectric: invAe, hybrideToestel: CFG.hybrideToestel, aeToestel: CFG.aeToestel, nieuweKetel: nieuweKetel },
    teruglevering: reaNum(A.teruglevering), zon: A.zonnepanelen === 'Ja', zonDekking: null,
    boiler: null, boilerRuim: false,
    tips: []
  };

  if (warmte) {
    var kwRaw = (warmteVerw + bijWarmte) / CFG.vollastUren;   // warm water komt uit de boiler, telt niet mee in het vermogen
    r.kw = CFG.maten.filter(function (m) { return m >= kwRaw; })[0] || CFG.maten[CFG.maten.length - 1];
    r.kwHybride = CFG.maten.filter(function (m) { return m >= r.kw * CFG.hybrideVermogen; })[0] || CFG.maten[0];
  }

  // ---- Kosten en besparing ----
  var tvt = function (inv, besp) { return besp > 0 ? r1(inv / besp) : null; };
  // Deel van het warmtepompverbruik dat uit eigen zonnestroom komt (nooit meer dan het huidige overschot)
  var eigenZon = function (kwh) {
    if (!r.zon) return 0;
    var z = kwh * CFG.zonDekking;
    return r.teruglevering ? Math.min(z, r.teruglevering) : z;
  };
  if (gas || gj) {
    var kostNu = gas ? gas * pG + vast : gj * pW + vastW;
    var aeStroom = warmteVerw / scopAe + warmteWW / CFG.scopWarmWater;
    var aeZon = eigenZon(aeStroom);
    var ae = { stroom: Math.round(aeStroom), zonStroom: Math.round(aeZon), netStroom: Math.round(aeStroom - aeZon), kosten: Math.round((aeStroom - aeZon) * pS), scop: scopAe };
    ae.besparing = Math.round(kostNu - (aeStroom - aeZon) * pS);
    ae.terugverdientijd = tvt(invAe, ae.besparing);
    r.kostNu = Math.round(kostNu); r.allElectric = ae;
    if (gas) {
      // Hybride kan alleen naast een gasketel
      // De warmtepomp neemt 70% van de verwarming over; warm water blijft op de CV-ketel
      var hyStroom = warmteVerw * CFG.hybrideAandeel / scopHy;
      var hyGas = gas - warmteVerw * CFG.hybrideAandeel / CFG.kwhPerM3;
      var hyZon = eigenZon(hyStroom);
      var hy = { stroom: Math.round(hyStroom), zonStroom: Math.round(hyZon), netStroom: Math.round(hyStroom - hyZon), gasRest: Math.round(hyGas), kosten: Math.round(hyGas * pG + vast + (hyStroom - hyZon) * pS), scop: scopHy };
      hy.besparing = Math.round(kostNu - (hyGas * pG + vast + (hyStroom - hyZon) * pS));
      hy.terugverdientijd = tvt(invHy, hy.besparing);
      r.hybride = hy;
    }
    if (r.zon && aeStroom) r.zonDekking = Math.round(aeZon / aeStroom * 100);
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
  if (r.zonDekking && advies !== 'airco') {
    var zOpt = advies === 'hybride' && r.hybride ? r.hybride : r.allElectric;
    t.push('Met uw zonnepanelen haalt de warmtepomp naar schatting ' + Math.round(zOpt.zonStroom / zOpt.stroom * 100) + '% van zijn stroom uit uw eigen zonnestroom (ongeveer ' + zOpt.zonStroom.toLocaleString('nl-NL') + ' kWh per jaar). De rest neemt u af van het net. Dat hebben we in de besparing meegerekend.');
  }
  if (r.boiler && advies === 'all-electric') t.push('Voor uw warm water rekenen we met een boiler van ongeveer ' + r.boiler + ' liter' + (r.boilerRuim ? ' of groter' : '') + '. Onze adviseur stemt dit af op uw gezin en badkamer.');
  if (A.accu === 'Nee, maar ik wil graag advies over een thuisaccu') t.push('U wilt advies over een thuisaccu. Die nemen we mee in het gesprek, zodat u meer van uw eigen zonnestroom gebruikt.');
  if (A.afstand === 'Minder dan 2 m') t.push('De buitenunit komt dicht bij de erfgrens. Daar gelden strengere geluidseisen. Mogelijk adviseren we een extra stil model of een geluidsscherm.');
  if (A.buitenunit === 'Geen mogelijkheden / onbekend') t.push('Er is nog geen plek voor een buitenunit bekend. Onze adviseur bekijkt de mogelijkheden bij u thuis.');
  if (bij.indexOf('Pelletkachel') > -1 || bij.indexOf('Houtkachel of open haard') > -1) t.push('Uw kachel hebben we meegerekend in het vermogen. Zo krijgt u een warmtepomp die ook zonder de kachel genoeg warmte levert.');
  var gekozen = advies === 'hybride' ? r.hybride : (advies === 'all-electric' ? r.allElectric : null);
  if (gekozen && gekozen.besparing <= 0) t.push('Met de ingevulde gegevens levert een ' + r.adviesLabel.toLowerCase() + ' volgens onze berekening geen besparing op. Onze adviseur rekent dit graag samen met u na.');
  if (!r.allElectric && advies !== 'airco') t.push('Uw besparing rekenen we precies voor u uit in het persoonlijke advies.');

  return r;
}
