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
