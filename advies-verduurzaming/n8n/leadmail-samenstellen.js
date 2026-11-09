const bron = $('Verwerk aanvraag').first();
const v = bron.json;
let sheetFout = false;
try { sheetFout = !!$('Sheet: aanvraag opslaan').first().json.error; } catch (e) {}
let mailFout = false;
try { mailFout = !!$input.first().json.error; } catch (e) {}
const let_op = (t) => '<p style="background:#fbe6e1;color:#9c331b;padding:8px 12px;border-radius:6px"><b>Let op:</b> ' + t + '</p>';
const html = (sheetFout ? let_op('deze aanvraag kon niet in de Google Sheet worden opgeslagen.') : '') +
  (mailFout ? let_op('het adviesrapport kon niet naar de klant worden gemaild.') : '') + v.intern.html;
const binary = {};
(v.fotoKeys || []).forEach((k) => { if (bron.binary && bron.binary[k]) binary[k] = bron.binary[k]; });
return [{ json: { to: v.intern.to, replyTo: v.intern.replyTo, subject: v.intern.subject, html, bijlagen: Object.keys(binary).join(',') }, binary }];
