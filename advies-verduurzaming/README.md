# R&E Installaties – Advies verduurzaming

Widget met 6 stappen voor de pagina **Diensten › Advies verduurzaming** op [re-installaties.nl](https://www.re-installaties.nl), met een n8n-flow die het rapport mailt, de lead naar R&E stuurt en alles in een Google Sheet zet.

- **Stijl:** zelfde opzet als het onderhoudscontract-formulier (`#re-onderhoudsformulier`). Alle kleuren, radii en fonts komen uit de Webflow design-tokens (`--_color---blue--700` enz.), dus een merkwijziging in Webflow werkt hier ook door.
- **Adres:** bij postcode + huisnummer worden straat en plaats ingevuld via PDOK, net als bij het onderhoudsformulier.
- **Foto's:** worden in de browser verkleind (max 1600 px, JPEG) en als multipart meegestuurd.
- **Meten:** events gaan naar `dataLayer` (Tag Manager) en, als die op de pagina staat, naar PostHog. Er gaan geen persoonsgegevens mee.

## In Webflow zetten

Plaats een **Code Embed** op de pagina:

```html
<div id="re-adviesformulier"
     data-webhook="https://flitsdigital01.app.n8n.cloud/webhook/re-advies-verduurzaming"
     data-privacy-url="/privacybeleid"></div>
<script src="https://cdn.jsdelivr.net/gh/flitsdigital/re-installaties@advies-v1.0.0/advies-verduurzaming/dist/re-advies.min.js" defer></script>
```

| Attribuut | Betekenis |
|---|---|
| `data-webhook` | Productie-URL van de n8n-webhook (verplicht) |
| `data-privacy-url` | Link achter "privacybeleid" bij het akkoord-vinkje |
| `data-test="true"` | Testmodus: de leadmail gaat naar Flits in plaats van naar R&E, en in de Sheet staat *Test = ja* |
| `data-telefoon` | Telefoonnummer in de foutmelding en de samenvatting (standaard 0591 327 010) |

De hero en de kop van de pagina bouw je gewoon in Webflow. De widget is alleen het formulier met de samenvattingskaart.

**Let op caching:** gebruik in de embed altijd een versie-tag (`@advies-v1.0.0`). Na een wijziging: versie ophogen in `package.json` → `npm run build` → commit → tag `advies-v1.0.1` pushen → de embed aanpassen naar `@advies-v1.0.1`.

## Ontwikkelen

```bash
cd advies-verduurzaming
npm install
npm run build        # dist/re-advies(.min).js + n8n/verwerk-aanvraag.n8n.js
open demo/index.html # lokale demo
```

| Bestand | Wat |
|---|---|
| `src/widget.js` | Vragenlijst, rendering, validatie, versturen |
| `src/widget.css` | Styling (wordt in de JS gebundeld) |
| `src/calc.js` | **Rekenlogica en aannames** (`REA_CFG`), gedeeld door de widget en n8n |
| `n8n/verwerk-aanvraag.js` | Code-node "Verwerk aanvraag": validatie, sheetregel, rapportmail en leadmail |
| `n8n/verwerk-aanvraag.n8n.js` | Gegenereerd: dit plak je in de n8n Code-node |
| `n8n/leadmail-samenstellen.js` | Code-node "Leadmail samenstellen" |
| `n8n/genereer-workflow.py` | Genereert de n8n Workflow-SDK-code (`n8n/workflow.sdk.ts`) |

## n8n-flow

Workflow **"R&E Installaties — Advies verduurzaming"** (`0m3vgiOj1lCl3VBI`):

1. Webhook `POST /webhook/re-advies-verduurzaming` (CORS: re-installaties.nl + webflow.io)
2. **Verwerk aanvraag**: honeypot, verplichte velden, berekening, lead-ID, sheetregel en beide mails
3. Foto's worden niet opgeslagen: ze gaan als bijlage mee in de leadmail (de widget verkleint ze tot max 1600 px, max 12 MB in totaal)
4. **Google Sheet** *R&E – Aanvragen advies verduurzaming*, met een kolom *Status* voor de opvolging
5. Antwoord naar het formulier, met de berekening voor het bedankscherm
6. Rapportmail naar de klant, daarna de leadmail naar `info@re-installaties.nl`. Beide gaan via SMTP vanaf `noreply@re-installaties.nl`.

Rekenaannames aanpassen: `src/calc.js` → `npm run build` → de inhoud van `n8n/verwerk-aanvraag.n8n.js` in de Code-node plakken → een nieuwe widgetversie taggen.

## Payload (multipart/form-data)

- `data`: JSON `{ versie, test, bron, utm, verstuurdOp, akkoord: { privacy, tijdstip }, website (honeypot), antwoorden, indicatieWidget }`
- `foto_ketel_1…4`, `foto_meterkast_1…4`, `foto_opstelplaats_1…4`: JPEG-bestanden

Antwoord: `{ ok: true, leadId, indicatie }` of `{ ok: false, reden }` (HTTP 400).
