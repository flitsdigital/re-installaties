import { readFileSync, writeFileSync } from 'node:fs';
import { DateTime } from 'luxon';
const code = readFileSync('n8n/verwerk-aanvraag.n8n.js', 'utf8');
const run = (payload, binary) => new Function('$input', '$now', code)({ first: () => ({ json: { body: { data: JSON.stringify(payload) } }, binary }) }, DateTime.now());
const base = { test: true, bron: 'https://www.re-installaties.nl/diensten/advies-verduurzaming', utm: { utm_source: 'google' }, akkoord: { privacy: true, tijdstip: '2026-11-09T13:00:00Z' }, website: '',
  antwoorden: { woningtype: 'Vrijstaand', bouwjaar: '1990 – 2012', verwarming: 'CV-ketel (gas)', ketelLeeftijd: 'Ouder dan 10 jaar', gasverbruik: '1450', isolatie: ['Dakisolatie', 'Spouwmuurisolatie'],
    beneden: ['Vloerverwarming'], boven: ['Radiatoren'], bijverwarming: ['Houtkachel of open haard'], houtKg: '800', buitenunit: 'Op de grond', afstand: 'Minder dan 2 m', zonnepanelen: 'Ja', teruglevering: '1800',
    tVast: '320', accu: 'Nee, maar ik wil graag advies over een thuisaccu', wens: 'Advies', planning: 'Binnen 3 maanden', voornaam: 'Jan', achternaam: 'Jansen', email: 'jan@test.nl', telefoon: '0612345678',
    postcode: '7825vv', huisnummer: '17', straat: 'Willem Schoutenstraat', plaats: 'Emmen' } };
const ok = run(base, { foto_ketel_1: { data: 'x' } })[0].json;
console.log('geldig', ok.geldig, ok.leadId, ok.mapNaam, 'fotos', ok.fotoAantal);
console.log('intern', ok.intern.to, '|', ok.intern.subject);
console.log('row keys', Object.keys(ok.row).length);
writeFileSync('test/mail-klant.html', ok.klant.html); writeFileSync('test/mail-intern.html', ok.intern.html.replace('__FOTOMAP__', '#'));
console.log('spam', JSON.stringify(run({ ...base, website: 'x' })[0].json));
console.log('leeg', JSON.stringify(run({ antwoorden: {} })[0].json));
const stad = run({ ...base, test: false, antwoorden: { ...base.antwoorden, verwarming: 'Stadsverwarming', gasverbruik: undefined, gjVerbruik: '30', wens: 'Hybride warmtepomp' } })[0].json;
console.log('stad', stad.intern.to, stad.indicatie.kw, stad.indicatie.kostNu, stad.klant.html.length);
// v1.2.0: scenario's
const sc = (extra) => run({ ...base, antwoorden: { ...base.antwoorden, ...extra } })[0].json;
const show = (n, j) => { const i = j.indicatie; console.log(n, '| kW', i.kw, '| SCOP ae/hy', i.scop, i.scopHybride, '| nu', i.kostNu, '| hy', i.hybride && [i.hybride.besparing, i.hybride.terugverdientijd], '| ae', i.allElectric && [i.allElectric.besparing, i.allElectric.terugverdientijd], '| advies', i.advies, '| boiler', i.boiler, i.boilerRuim); };
const vb = { bouwjaar: '1975 – 1990', isolatie: ['Dakisolatie', 'HR++ of triple glas'], beneden: ['Radiatoren'], boven: ['Radiatoren'], bijverwarming: ['Geen bijverwarming'], houtKg: '', gasverbruik: '1500', tVast: '', teruglevering: '', personen: '4', badkamer: 'Standaard douche', tegelijkWater: 'Nee' };
show('voorbeeld 1500 m³', sc(vb));
show('idem + vloerverw.', sc({ ...vb, beneden: ['Vloerverwarming'], boven: ['Vloerverwarming'] }));
show('slecht geïsoleerd', sc({ ...vb, bouwjaar: 'Voor 1975', isolatie: ['Niet geïsoleerd'], gasverbruik: '2200' }));
show('stadsverw. 30 GJ', sc({ ...vb, verwarming: 'Stadsverwarming', gasverbruik: undefined, gjVerbruik: '30' }));
show('5p bad+regen tegelijk', sc({ ...vb, personen: '6+', badkamer: 'Meerdere badkamers', tegelijkWater: 'Ja' }));
const st = sc({ ...vb, verwarming: 'Stadsverwarming', gasverbruik: undefined, gjVerbruik: '30' });
writeFileSync('test/mail-klant-stad.html', st.klant.html);
console.log('nieuwe kolommen', ['Personen','Badkamer','Tegelijk warm water','Boiler (L)','Warmtetarief (€/GJ)','Vaste kosten warmte (jaar)','Rekenversie'].map(k => k + '=' + st.row[k]).join(' | '));
writeFileSync('test/mail-klant-ww.html', sc({ ...vb, ketelLeeftijd: '5 tot 10 jaar' }).klant.html);
{ const j = sc({ ...vb, ketelLeeftijd: '5 tot 10 jaar', opmerkingen: 'Graag bellen na 17:00.' }); writeFileSync('test/rapport.html', Buffer.from(j.pdf.html, 'base64').toString('utf8')); console.log('pdf bestand', j.pdf.bestand, 'b64 kB', Math.round(j.pdf.html.length/1024)); }
