const bron = $('Verwerk aanvraag').first();
const v = bron.json;
let sheetFout = false;
try { sheetFout = !!$('Sheet: aanvraag opslaan').first().json.error; } catch (e) {}
let mailFout = false;
try { mailFout = !!$input.first().json.error; } catch (e) {}
const let_op = (t) => '<p style="background:#fbe6e1;color:#9c331b;padding:8px 12px;border-radius:6px"><b>Let op:</b> ' + t + '</p>';
let pdfFout = true;
try { const pb = $('PDF maken').first().binary; pdfFout = !(pb && pb.rapport); } catch (e) {}
const html = (sheetFout ? let_op('deze aanvraag kon niet in de Google Sheet worden opgeslagen.') : '') +
  (pdfFout ? let_op('het PDF-rapport kon niet worden gemaakt. De klant kreeg alleen een overzicht van zijn antwoorden, zonder advies.') : '') +
  (mailFout ? let_op('de bevestigingsmail kon niet naar de klant worden gemaild.') : '') + v.intern.html;
const binary = {};
(v.fotoKeys || []).forEach((k) => { if (bron.binary && bron.binary[k]) binary[k] = bron.binary[k]; });
try { const pdf = $('PDF maken').first().binary; if (pdf && pdf.rapport) binary.rapport = pdf.rapport; } catch (e) {}
return [{ json: { to: v.intern.to, replyTo: v.intern.replyTo, subject: v.intern.subject, html, bijlagen: Object.keys(binary).join(',') }, binary }];
