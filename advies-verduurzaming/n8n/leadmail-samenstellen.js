const v = $('Verwerk aanvraag').first().json;
let fotomap = '';
try { const f = $('Fotomap aanmaken').first().json; if (f && f.id) fotomap = 'https://drive.google.com/drive/folders/' + f.id; } catch (e) {}
let sheetFout = false;
try { sheetFout = !!$('Sheet: aanvraag opslaan').first().json.error; } catch (e) {}
let mailFout = false;
try { mailFout = !!$input.first().json.error; } catch (e) {}
const let_op = (t) => '<p style="background:#fbe6e1;color:#9c331b;padding:8px 12px;border-radius:6px"><b>Let op:</b> ' + t + '</p>';
const html = (sheetFout ? let_op('deze aanvraag kon niet in de Google Sheet worden opgeslagen.') : '') +
  (mailFout ? let_op('het adviesrapport kon niet naar de klant worden gemaild.') : '') +
  v.intern.html.replace('__FOTOMAP__', fotomap || '#');
return [{ json: { to: v.intern.to, replyTo: v.intern.replyTo, subject: v.intern.subject, html } }];
