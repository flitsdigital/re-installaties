// Bouwt dist/re-advies.js + dist/re-advies.min.js en n8n/calc.n8n.js
// Gebruik: npm run build
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { transform } from 'esbuild';

const css = readFileSync('src/widget.css', 'utf8');
const calc = readFileSync('src/calc.js', 'utf8');
const widget = readFileSync('src/widget.js', 'utf8');

const cssMin = (await transform(css, { loader: 'css', minify: true })).code.trim();
const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
const banner = `/*! R&E Installaties – Advies verduurzaming v${pkg.version} | Flits Digital | github.com/flitsdigital/re-installaties/tree/main/advies-verduurzaming */`;

const full = widget
  .replace("'__REA_CSS__'", JSON.stringify(cssMin))
  .replace('/* __REA_CALC__ */', calc.replace(/^/gm, '  '));
if (full.includes('__REA_')) throw new Error('Placeholder niet vervangen');

mkdirSync('dist', { recursive: true });
mkdirSync('n8n', { recursive: true });
writeFileSync('dist/re-advies.js', banner + '\n' + full);
const min = await transform(full, { loader: 'js', minify: true, target: 'es2018', legalComments: 'none' });
writeFileSync('dist/re-advies.min.js', banner + '\n' + min.code);
const verwerk = readFileSync('n8n/verwerk-aanvraag.js', 'utf8').replace('/* __REA_CALC__ */', calc);
writeFileSync('n8n/verwerk-aanvraag.n8n.js', '// R&E Installaties – Advies verduurzaming · n8n Code-node "Verwerk aanvraag"\n// Bron: github.com/flitsdigital/re-installaties/tree/main/advies-verduurzaming (gebouwd met npm run build uit src/calc.js + n8n/verwerk-aanvraag.js)\n' + verwerk);
console.log(`dist/re-advies.min.js ${(min.code.length / 1024).toFixed(1)} kB`);
