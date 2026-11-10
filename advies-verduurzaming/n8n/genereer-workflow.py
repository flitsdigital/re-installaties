# Genereert de n8n Workflow-SDK-code voor "R&E Installaties — Advies verduurzaming"
import json, pathlib
root = pathlib.Path(__file__).resolve().parent
verwerk = (root / 'verwerk-aanvraag.n8n.js').read_text()
J = json.dumps
SHEET_ID = '1ftpvyVpulBY74c-hAUkTU0dJsKI6iR_3_HnOrl4EU-I'
FOTO_MAP = '1-hz7Su2LQc77eip_F0e86QXQSGRjfurH'
cols = "Datum,Lead-ID,Status,Test,Voornaam,Achternaam,E-mail,Telefoon,Straat,Huisnummer,Postcode,Plaats,Woningtype,Bouwjaar,Verwarming,Ketelleeftijd,Gasverbruik (m³),Stroomverbruik WP (kWh),Warmteverbruik (GJ),Toelichting verwarming,Isolatie,Afgifte beneden,Afgifte boven,Bijverwarming,Pellets (kg),Hout (kg),Buitenunit,Afstand erfgrens,Zonnepanelen,Aantal panelen,Opbrengst (kWh),Teruglevering (kWh),Gastarief,Stroomtarief,Vastrecht gas (jaar),Thuisaccu,Accu (kWh),Wens,Planning,Opmerkingen,Vermogen (kW),Warmtevraag (kWh),Huidige kosten (€/jr),Besparing hybride (€/jr),Besparing all-electric (€/jr),TVT hybride (jr),TVT all-electric (jr),Advies,Foto's (aantal),Fotomap,Akkoord privacy,Bron,UTM".split(',')
schema = '[' + ','.join('{ id: %s, displayName: %s, required: false, defaultMatch: false, display: true, type: "string", canBeUsedToMatch: true }' % (J(c), J(c)) for c in cols) + ']'
SMTP = "{ smtp: { id: 'V3QKwZDEfXoU0lG5', name: 'noreply@re-installaties.nl' } }"
V = "$('Verwerk aanvraag').first().json"
fotomap = "(($('Fotomap aanmaken').isExecuted && $('Fotomap aanmaken').first().json.id) ? 'https://drive.google.com/drive/folders/' + $('Fotomap aanmaken').first().json.id : '')"
warn = lambda cond, t: "(%s ? '<p style=\"background:#fbe6e1;color:#9c331b;padding:8px 12px;border-radius:6px\"><b>Let op:</b> %s</p>' : '')" % (cond, t)
intern_html = "{{ " + warn("$('Sheet: aanvraag opslaan').first().json.error", "deze aanvraag kon niet in de Google Sheet worden opgeslagen.") + " + " + warn("$('Rapport naar klant').first().json.error", "het adviesrapport kon niet naar de klant worden gemaild.") + " + " + V + ".intern.html.replace('__FOTOMAP__', " + fotomap + " || '#') }}"
LEAD = J((root / 'leadmail-samenstellen.js').read_text())
code = f'''
const ontvang = trigger({{
  type: 'n8n-nodes-base.webhook', version: 2.1,
  config: {{ name: 'Adviesaanvraag', parameters: {{ httpMethod: 'POST', path: 're-advies-verduurzaming', responseMode: 'responseNode',
    options: {{ allowedOrigins: 'https://www.re-installaties.nl,https://re-installaties.nl,https://r-e-installaties.webflow.io' }} }} }},
  output: [{{ body: {{ data: '{{"antwoorden":{{}}}}' }} }}]
}});
const verwerk = node({{
  type: 'n8n-nodes-base.code', version: 2,
  config: {{ name: 'Verwerk aanvraag', parameters: {{ mode: 'runOnceForAllItems', jsCode: {J(verwerk)} }} }},
  output: [{{ geldig: true, leadId: 'RE-261109-AB12', fotoAantal: 1, mapNaam: 'map', row: {{}}, indicatie: {{}}, klant: {{ to: 'a@b.nl', subject: 's', html: 'h' }}, intern: {{ to: 'a@b.nl', replyTo: 'a@b.nl', subject: 's', html: 'h' }} }}]
}});
const geldig = ifElse({{
  version: 2.2,
  config: {{ name: 'Geldige aanvraag?', parameters: {{ conditions: {{
    options: {{ caseSensitive: true, leftValue: '', typeValidation: 'loose' }},
    conditions: [{{ leftValue: expr('{{{{ $json.geldig }}}}'), rightValue: '', operator: {{ type: 'boolean', operation: 'true', singleValue: true }} }}],
    combinator: 'and' }} }} }}
}});
const weiger = node({{
  type: 'n8n-nodes-base.respondToWebhook', version: 1.5,
  config: {{ name: 'Weiger aanvraag', parameters: {{ respondWith: 'json', responseBody: expr('{{{{ JSON.stringify({{ ok: false, reden: $json.reden }}) }}}}'), options: {{ responseCode: 400 }} }} }}
}});
const regel = node({{
  type: 'n8n-nodes-base.set', version: 3.4,
  config: {{ name: 'Sheetregel samenstellen', parameters: {{ mode: 'raw', jsonOutput: expr({J("{{ JSON.stringify(" + V + ".row) }}")})), options: {{}} }} }},
  output: [{{ 'Lead-ID': 'RE-261109-AB12' }}]
}});
const sheet = node({{
  type: 'n8n-nodes-base.googleSheets', version: 4.7,
  config: {{ name: 'Sheet: aanvraag opslaan', onError: 'continueRegularOutput', parameters: {{ resource: 'sheet', operation: 'append',
    documentId: {{ __rl: true, mode: 'id', value: '{SHEET_ID}', cachedResultName: 'R&E – Aanvragen advies verduurzaming' }},
    sheetName: {{ __rl: true, mode: 'id', value: '920963470' }},
    columns: {{ mappingMode: 'autoMapInputData', value: {{}}, schema: {schema} }},
    options: {{ cellFormat: 'RAW', handlingExtraData: 'insertInNewColumn' }} }},
    credentials: {{ googleSheetsOAuth2Api: {{ id: 'djcPl3HNJBZ7aCgu', name: 'Google Sheets account' }} }} }},
  output: [{{ 'Lead-ID': 'RE-261109-AB12' }}]
}});
const bevestig = node({{
  type: 'n8n-nodes-base.respondToWebhook', version: 1.5,
  config: {{ name: 'Bevestig aan formulier', parameters: {{ respondWith: 'json',
    responseBody: expr({J("{{ JSON.stringify({ ok: true, leadId: " + V + ".leadId, indicatie: " + V + ".indicatie }) }}")}), options: {{ responseCode: 200 }} }} }}
}});
const klantmail = node({{
  type: 'n8n-nodes-base.emailSend', version: 2.1,
  config: {{ name: 'Rapport naar klant', onError: 'continueRegularOutput', parameters: {{ fromEmail: 'R&E Installaties <noreply@re-installaties.nl>',
    toEmail: expr({J("{{ " + V + ".klant.to }}")}), subject: expr({J("{{ " + V + ".klant.subject }}")}), html: expr({J("{{ " + V + ".klant.html }}")}),
    options: {{ appendAttribution: false, replyTo: 'info@re-installaties.nl' }} }}, credentials: {SMTP} }},
  output: [{{ accepted: ['a@b.nl'] }}]
}});
const leadmail = node({{
  type: 'n8n-nodes-base.code', version: 2,
  config: {{ name: 'Leadmail samenstellen', parameters: {{ mode: 'runOnceForAllItems', jsCode: {LEAD} }} }},
  output: [{{ to: 'info@re-installaties.nl', replyTo: 'a@b.nl', subject: 's', html: 'h' }}]
}});
const internmail = node({{
  type: 'n8n-nodes-base.emailSend', version: 2.1,
  config: {{ name: 'Lead naar R&E', parameters: {{ fromEmail: 'R&E Aanvragen <noreply@re-installaties.nl>',
    toEmail: expr('{{{{ $json.to }}}}'), subject: expr('{{{{ $json.subject }}}}'), html: expr('{{{{ $json.html }}}}'),
    options: {{ appendAttribution: false, replyTo: expr('{{{{ $json.replyTo }}}}'), attachments: expr('{{{{ $json.bijlagen }}}}') }} }}, credentials: {SMTP} }},
  output: [{{ accepted: ['info@re-installaties.nl'] }}]
}});
const uitleg = sticky({J('''## Advies verduurzaming – R&E Installaties

Ontvangt aanvragen van de widget op re-installaties.nl (code: github.com/flitsdigital/re-installaties/tree/main/advies-verduurzaming).

1. **Verwerk aanvraag** controleert de invoer (honeypot + verplichte velden), rekent het advies uit en bouwt de sheetregel en beide mails. Rekenaannames staan bovenin deze node (REA_CFG) en komen uit `src/calc.js`.
2. Foto's gaan als bijlage mee in de leadmail naar R&E (geen opslag in Drive).
3. De aanvraag wordt opgeslagen in de Sheet, daarna krijgt het formulier antwoord (met de berekening voor het bedankscherm).
4. Daarna: adviesrapport naar de klant en leadmail naar info@re-installaties.nl.

`test: true` in de payload (data-test="true" op de widget) stuurt de leadmail naar flitsdigital1@gmail.com en zet *Test = ja* in de Sheet.''')}, [], {{ color: 4, width: 520, height: 360 }});

export default workflow('re-advies', 'R&E Installaties — Advies verduurzaming')
  .add(ontvang)
  .to(verwerk)
  .to(geldig
    .onTrue(regel.to(sheet).to(bevestig).to(klantmail).to(leadmail).to(internmail))
    .onFalse(weiger))
  .add(uitleg)
  .group('Ontvangen & controleren', [verwerk, geldig], {{ description: 'Leest de formulierdata, weert bots en ontbrekende velden en rekent het advies uit.' }})
  .group('Opslaan & antwoorden', [regel, sheet, bevestig], {{ description: 'Schrijft de aanvraag naar de Google Sheet en stuurt de berekening terug naar het formulier.' }})
  .group('Mails', [klantmail, leadmail, internmail], {{ description: 'Adviesrapport naar de klant, daarna de lead naar info@re-installaties.nl.' }});
'''
(root / 'workflow.sdk.ts').write_text(code)
print(len(code))
