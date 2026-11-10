/*! R&E Installaties – Advies verduurzaming v1.3.0 | Flits Digital | github.com/flitsdigital/re-installaties/tree/main/advies-verduurzaming */
/* ==========================================================================
   R&E Installaties – Advies verduurzaming · widget
   Gebruik in Webflow (Code Embed):
     <div id="re-adviesformulier"
          data-webhook="https://flitsdigital01.app.n8n.cloud/webhook/re-advies-verduurzaming"
          data-privacy-url="/privacybeleid"></div>
     <script src="https://cdn.jsdelivr.net/gh/flitsdigital/re-installaties@advies-v1.0.0/advies-verduurzaming/dist/re-advies.min.js" defer></script>
   ========================================================================== */
(function () {
  'use strict';

  var ROOT_ID = 're-adviesformulier';
  var STORE_KEY = 're_advies_v1';
  var CSS = "#re-adviesformulier{--re-blue: var(--_color---blue--700, #018ed1);--re-blue-dark: var(--_color---blue--800, #1454a4);--re-blue-soft: var(--_color---blue--100, #e8f3f7);--re-blue-300: var(--_color---blue--300, #4eacdd);--re-navy: var(--_color---blue--900, #030d1b);--re-orange: linear-gradient(90deg, var(--_color---orange--800, #f58236), var(--_color---orange--600, #fa9d47));--re-orange-solid: var(--_color---orange--800, #f58236);--re-orange-soft: color-mix(in srgb, var(--_color---orange--800, #f58236) 16%, #fff);--re-green: var(--_color---green--700, #279857);--re-green-2: var(--_color---green--400, #7dc242);--re-green-soft: color-mix(in srgb, var(--_color---green--400, #7dc242) 22%, #fff);--re-ink: var(--_color---neutral--dark-gray, #242321);--re-muted: var(--_color---neutral--mid-gray-2, #474641);--re-line: var(--_color---neutral--mid-gray-1, #cccabf);--re-line-soft: color-mix(in srgb, var(--_color---neutral--mid-gray-1, #cccabf) 55%, #fff);--re-bg: var(--_color---neutral--light-gray, #f0eee6);--re-card: var(--_color---neutral--white, #fff);--re-shadow: 0 1px 2px rgba(3,13,27,.04), 0 8px 24px -14px rgba(3,13,27,.16);--re-shadow-lg: 0 24px 60px -30px rgba(3,13,27,.4);--re-radius: var(--_components---card--border-radius, .5rem);--re-radius-sm: var(--_components---input--border-radius, .5rem);--re-font: var(--_typography---fonts--primary-font, Outfit, Arial, sans-serif);--re-ease: cubic-bezier(.165,.84,.44,1);font-family:var(--re-font);color:var(--re-ink);line-height:var(--_typography---paragraph-body--line-height, 1.6);-webkit-font-smoothing:antialiased;container:rea / inline-size;display:block;width:100%;max-width:100%}#re-adviesformulier *{box-sizing:border-box}#re-adviesformulier h2,#re-adviesformulier h3,#re-adviesformulier h4{font-family:var(--re-font)}#re-adviesformulier .re-layout{display:grid;grid-template-columns:minmax(0,1fr) 320px;gap:24px;align-items:start;padding-bottom:20px}#re-adviesformulier .re-block,#re-adviesformulier .re-summary{min-width:0}#re-adviesformulier .re-block{background:var(--re-card);border:1px solid var(--re-line);border-radius:var(--re-radius);padding:26px;box-shadow:var(--re-shadow)}#re-adviesformulier .re-progress{display:flex;gap:5px;margin:-4px 0 20px}#re-adviesformulier .re-progress i{flex:1;height:5px;border-radius:9px;background:var(--re-line-soft);transition:background .3s var(--re-ease)}#re-adviesformulier .re-progress i.re-done{background:var(--re-blue-dark)}#re-adviesformulier .re-progress i.re-now{background:var(--re-blue)}#re-adviesformulier .re-step-head{display:flex;align-items:center;gap:13px;margin-bottom:6px}#re-adviesformulier .re-step-num{flex:0 0 auto;width:30px;height:30px;border-radius:8px;display:grid;place-items:center;background:var(--re-blue);color:#fff;font-weight:600;font-size:.95rem}#re-adviesformulier .re-step-head h2{font-size:1.4rem;color:var(--re-navy);font-weight:600;letter-spacing:-.02em;margin:0;line-height:1.2}#re-adviesformulier .re-step-count{margin-left:auto;font-size:.82rem;color:var(--re-muted);white-space:nowrap}#re-adviesformulier .re-step-sub{color:var(--re-muted);font-size:.92rem;margin:2px 0 22px 43px}#re-adviesformulier .re-q{margin-bottom:24px;animation:re-slideIn .3s ease}#re-adviesformulier .re-q.re-hidden{display:none!important}@keyframes re-slideIn{0%{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}#re-adviesformulier .re-lab{display:block;font-size:var(--_components---input-label--font-size, .9rem);font-weight:600;color:var(--re-navy);margin-bottom:4px}#re-adviesformulier .re-q>.re-lab{font-size:1rem}#re-adviesformulier .re-lab i{color:var(--re-orange-solid);font-style:normal}#re-adviesformulier .re-lab small{font-weight:400;color:var(--re-muted);font-size:.85rem}#re-adviesformulier .re-multi{display:inline-block;margin-left:6px;font-size:.72rem;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:var(--re-blue-dark);background:var(--re-blue-soft);border-radius:6px;padding:2px 7px;vertical-align:2px}#re-adviesformulier .re-hint{margin:0 0 12px;font-size:.86rem;color:var(--re-muted)}#re-adviesformulier .re-gap{height:10px}#re-adviesformulier .re-opts{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,200px),1fr));gap:12px}#re-adviesformulier .re-opts.re-big{grid-template-columns:repeat(2,1fr)}#re-adviesformulier .re-opt{position:relative;border:1.5px solid var(--re-line);border-radius:var(--re-radius-sm);padding:14px 40px 14px 14px;cursor:pointer;transition:.18s ease;background:#fff;display:flex;gap:12px;align-items:center;min-height:56px;font-weight:600;font-size:.95rem;color:var(--re-ink);line-height:1.25;hyphens:auto;-webkit-hyphens:auto;overflow-wrap:anywhere;min-width:0}#re-adviesformulier .re-opt>span:not(.re-ico):not(.re-check){flex:1 1 auto;min-width:0}#re-adviesformulier .re-opt:hover{border-color:var(--re-blue);transform:translateY(-1px)}#re-adviesformulier .re-opt input{position:absolute;opacity:0;pointer-events:none}#re-adviesformulier .re-opt.re-active{border-color:var(--re-blue);background:var(--re-blue-soft);box-shadow:0 0 0 3px #018ed124}#re-adviesformulier .re-opt:has(input:focus-visible){outline:2px solid var(--re-blue);outline-offset:2px}#re-adviesformulier .re-opt .re-ico{flex:0 0 auto;width:42px;height:42px;border-radius:10px;display:grid;place-items:center;background:var(--re-green-soft);color:var(--re-blue-dark);transition:.15s}#re-adviesformulier .re-opt.re-active .re-ico{background:var(--re-blue);color:#fff}#re-adviesformulier .re-opt .re-ico svg{width:24px;height:24px}#re-adviesformulier .re-opt small{display:block;color:var(--re-muted);font-size:.82rem;font-weight:400;margin-top:3px}#re-adviesformulier .re-check{position:absolute;top:50%;right:12px;margin-top:-10px;width:20px;height:20px;border-radius:50%;border:2px solid var(--re-line);display:grid;place-items:center;transition:.15s;background:#fff}#re-adviesformulier .re-opt.re-multi-opt .re-check{border-radius:6px}#re-adviesformulier .re-opt.re-active .re-check{background:var(--re-blue);border-color:var(--re-blue)}#re-adviesformulier .re-check svg{width:12px;height:12px;color:#fff;opacity:0;transition:.15s}#re-adviesformulier .re-opt.re-active .re-check svg{opacity:1}#re-adviesformulier .re-opts.re-chips{display:flex;flex-wrap:wrap;gap:10px}#re-adviesformulier .re-opts.re-chips .re-opt{min-height:44px;padding:9px 16px 9px 42px;border-radius:100rem;font-size:.9rem}#re-adviesformulier .re-opts.re-chips .re-check{right:auto;left:13px}#re-adviesformulier .re-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px}#re-adviesformulier .re-grid-pers{display:grid;grid-template-columns:1fr 1fr;gap:14px}#re-adviesformulier .re-grid-adres{display:grid;grid-template-columns:1fr .7fr;gap:14px}#re-adviesformulier .re-span2{grid-column:1 / -1}#re-adviesformulier .re-fld{display:block}#re-adviesformulier .re-fld.re-max{max-width:320px}#re-adviesformulier .re-inwrap{position:relative;display:flex;align-items:center}#re-adviesformulier input[type=text],#re-adviesformulier input[type=email],#re-adviesformulier input[type=tel],#re-adviesformulier textarea{width:100%;font-family:var(--_components---input--font, var(--re-font));font-size:var(--_components---input--font-size, 1rem);line-height:var(--_components---input--line-height, 1.4);font-weight:var(--_components---input--font-weight, 400);color:var(--re-ink);background:#fff;border:1px solid color-mix(in hsl,var(--re-navy) 40%,transparent 60%);border-radius:var(--re-radius-sm);padding:.8rem 1rem;transition:border-color .3s var(--re-ease);margin:0}#re-adviesformulier textarea{min-height:110px;resize:vertical}#re-adviesformulier input::placeholder,#re-adviesformulier textarea::placeholder{color:color-mix(in hsl,var(--re-navy) 60%,transparent 40%)}#re-adviesformulier input:hover,#re-adviesformulier textarea:hover{border-color:var(--re-blue-300)}#re-adviesformulier input:focus,#re-adviesformulier textarea:focus{outline:none;border-color:var(--re-blue-dark)}#re-adviesformulier .re-pre~input{padding-left:2rem}#re-adviesformulier .re-suf~input,#re-adviesformulier input.re-has-suf{padding-right:7.5rem}#re-adviesformulier .re-pre,#re-adviesformulier .re-suf{position:absolute;top:50%;transform:translateY(-50%);color:var(--re-muted);font-size:.88rem;font-weight:500;pointer-events:none}#re-adviesformulier .re-pre{left:1rem}#re-adviesformulier .re-suf{right:1rem}#re-adviesformulier .re-invalid input,#re-adviesformulier .re-invalid textarea,#re-adviesformulier input.re-bad{border-color:#d9644a!important}#re-adviesformulier .re-invalid .re-opt{border-color:#eebcae}#re-adviesformulier .re-err{display:none;margin-top:8px;font-size:.84rem;font-weight:600;color:#b5452c}#re-adviesformulier .re-invalid .re-err{display:block}#re-adviesformulier .re-note{display:flex;gap:10px;margin:12px 0 0;padding:10px 13px;background:var(--re-blue-soft);border-radius:var(--re-radius-sm);color:var(--re-blue-dark);font-size:.9rem;font-weight:500}#re-adviesformulier .re-note.re-warn{background:var(--re-orange-soft);color:#9c331b}#re-adviesformulier .re-note svg{flex:0 0 18px;width:18px;height:18px;margin-top:1px}#re-adviesformulier .re-form-msg{display:none;margin-top:14px;padding:11px 14px;border-radius:var(--re-radius-sm);font-size:.9rem;font-weight:600}#re-adviesformulier .re-msg-error{display:block;background:#fbe6e1;color:#9c331b;border:1px solid #eebcae}#re-adviesformulier .re-uploads{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}#re-adviesformulier .re-up{position:relative;border:1.5px dashed var(--re-blue);background:var(--re-blue-soft);border-radius:var(--re-radius-sm);padding:16px 12px;text-align:center;cursor:pointer;min-height:140px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;transition:.15s;color:var(--re-blue-dark)}#re-adviesformulier .re-up:hover{background:#fff}#re-adviesformulier .re-up input{position:absolute;inset:0;opacity:0;cursor:pointer;width:100%}#re-adviesformulier .re-up b{font-size:.9rem;color:var(--re-navy);font-weight:600}#re-adviesformulier .re-up small{font-size:.8rem;color:var(--re-muted)}#re-adviesformulier .re-up svg{width:26px;height:26px}#re-adviesformulier .re-up.re-has{border-style:solid;border-color:var(--re-green);background:var(--re-green-soft)}#re-adviesformulier .re-thumbs{display:flex;gap:6px;flex-wrap:wrap;justify-content:center}#re-adviesformulier .re-thumbs img{width:44px;height:44px;object-fit:cover;border-radius:6px}#re-adviesformulier .re-thumbs button{position:relative;z-index:2;padding:0;border:0;background:none;cursor:pointer}#re-adviesformulier .re-consent{display:flex;gap:11px;align-items:flex-start;margin-top:6px}#re-adviesformulier .re-consent input{appearance:none;-webkit-appearance:none;flex:0 0 auto;width:20px;height:20px;margin:2px 0 0;border:2px solid var(--re-line);border-radius:6px;background:#fff center/13px 13px no-repeat;cursor:pointer;transition:.15s}#re-adviesformulier .re-consent input:checked{border-color:var(--re-blue);background-color:var(--re-blue);background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 13l4 4L19 7'/%3E%3C/svg%3E\")}#re-adviesformulier .re-consent input:focus-visible{outline:2px solid var(--re-blue);outline-offset:2px}#re-adviesformulier .re-consent label{font-size:.9rem;color:var(--re-muted);cursor:pointer}#re-adviesformulier .re-consent a{color:var(--re-blue-dark);font-weight:600}#re-adviesformulier .re-actions{display:flex;justify-content:space-between;align-items:center;gap:12px;border-top:1px solid var(--re-line-soft);padding-top:20px;margin-top:6px}#re-adviesformulier .re-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;border:0;border-radius:100rem;cursor:pointer;text-decoration:none;padding:var(--_components---button--vertical-padding, .7em) calc(var(--_components---button--horizontal-padding, 1em) * 1.6);font-family:var(--_components---button--font, var(--re-font));font-size:var(--_components---button--font-size, 1rem);font-weight:var(--_components---button--font-weight, 600);line-height:var(--_components---button--line-height, 1.5);color:#fff;background:var(--re-orange);transition:filter .3s var(--re-ease),background .3s var(--re-ease)}#re-adviesformulier .re-btn:hover{filter:brightness(.95)}#re-adviesformulier .re-btn:disabled{background:#3a4654;cursor:not-allowed;opacity:.8}#re-adviesformulier .re-btn-ghost{background:#fff;color:var(--re-blue-dark);border:1.5px solid var(--re-line)}#re-adviesformulier .re-btn-ghost:hover{border-color:var(--re-blue);background:var(--re-blue-soft);filter:none}#re-adviesformulier .re-btn.re-invisible{visibility:hidden}#re-adviesformulier .re-summary{position:sticky;top:100px}#re-adviesformulier .re-sum-card{background:var(--re-navy);color:#fff;border-radius:var(--re-radius);padding:24px;box-shadow:var(--re-shadow-lg)}#re-adviesformulier .re-sum-card h2{font-size:1.25rem;margin:0 0 4px;font-weight:600;color:#fff}#re-adviesformulier .re-sum-card .re-lead{color:#9fc8df;font-size:.85rem;margin:0 0 16px}#re-adviesformulier .re-sum-steps{list-style:none;margin:0;padding:0;display:flex;flex-direction:column}#re-adviesformulier .re-sum-steps li{display:flex;align-items:center;gap:10px;font-size:.88rem;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.1);color:#7e9bb0}#re-adviesformulier .re-sum-steps li span.re-dotnum{flex:0 0 22px;height:22px;border-radius:6px;display:grid;place-items:center;font-size:.75rem;font-weight:600;background:#ffffff14;color:#9fc8df}#re-adviesformulier .re-sum-steps li.re-done{color:#dbe8f1}#re-adviesformulier .re-sum-steps li.re-done span.re-dotnum{background:var(--re-green);color:#fff}#re-adviesformulier .re-sum-steps li.re-now{color:#fff;font-weight:600}#re-adviesformulier .re-sum-steps li.re-now span.re-dotnum{background:var(--re-blue);color:#fff}#re-adviesformulier .re-sum-total{margin-top:16px;padding-top:16px;border-top:2px solid rgba(255,255,255,.2);display:flex;justify-content:space-between;align-items:flex-end;gap:10px}#re-adviesformulier .re-tlab{font-size:.82rem;color:#9fc8df}#re-adviesformulier .re-tval{font-size:1.9rem;font-weight:600;line-height:1;white-space:nowrap}#re-adviesformulier .re-per{display:block;font-size:.78rem;color:#9fc8df;font-weight:400;text-align:right;margin-top:4px}#re-adviesformulier .re-sum-once{margin-top:12px;background:#ffffff14;border-radius:8px;padding:11px 14px;display:flex;justify-content:space-between;gap:10px;font-size:.84rem;color:#dbe8f1}#re-adviesformulier .re-sum-once b{color:var(--_color---secondary--yellow, #ffd44d);font-weight:600;white-space:nowrap}#re-adviesformulier .re-sum-foot{font-size:.76rem;color:#7e9bb0;text-align:center;margin:14px 0 0;line-height:1.5}#re-adviesformulier .re-sum-foot a{color:#9fc8df}#re-adviesformulier .re-success-ico{width:52px;height:52px;border-radius:14px;display:grid;place-items:center;background:var(--re-green-soft);color:var(--re-green);margin-bottom:14px}#re-adviesformulier .re-success-ico svg{width:26px;height:26px}#re-adviesformulier .re-result h2{font-size:1.6rem;color:var(--re-navy);font-weight:600;letter-spacing:-.02em;margin:0 0 6px;line-height:1.2}#re-adviesformulier .re-result>p{color:var(--re-muted);margin:0}#re-adviesformulier .re-calc-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin:22px 0 6px}#re-adviesformulier .re-calc{position:relative;border:1.5px solid var(--re-line);border-radius:var(--re-radius-sm);padding:18px;background:#fff}#re-adviesformulier .re-calc.re-rec{border-color:var(--re-blue);background:var(--re-blue-soft);box-shadow:0 0 0 3px #018ed124}#re-adviesformulier .re-calc .re-tag{position:absolute;top:-11px;left:14px;background:var(--re-orange);color:#fff;font-size:.7rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;padding:3px 10px;border-radius:100rem}#re-adviesformulier .re-calc h3{font-size:1rem;color:var(--re-navy);margin:0 0 6px;font-weight:600}#re-adviesformulier .re-calc .re-hl{font-size:1.6rem;font-weight:600;color:var(--re-green);margin:0 0 12px;line-height:1.1}#re-adviesformulier .re-calc .re-hl.re-navy{color:var(--re-navy)}#re-adviesformulier .re-calc dl{margin:0;display:grid;grid-template-columns:1fr auto;gap:6px 10px;font-size:.86rem}#re-adviesformulier .re-calc dt{color:var(--re-muted)}#re-adviesformulier .re-calc dd{margin:0;font-weight:600;text-align:right;color:var(--re-ink)}#re-adviesformulier .re-tips{list-style:none;margin:16px 0 0;padding:0;display:grid;gap:9px}#re-adviesformulier .re-tips li{position:relative;padding-left:24px;font-size:.92rem;color:var(--re-muted)}#re-adviesformulier .re-tips li:before{content:\"\";position:absolute;left:0;top:7px;width:11px;height:11px;border-radius:3px;background:var(--re-green-soft);border:2px solid var(--re-green)}#re-adviesformulier .re-small{font-size:.78rem;color:var(--re-muted);margin-top:14px}@container rea (max-width: 980px){#re-adviesformulier .re-layout{grid-template-columns:minmax(0,1fr)}#re-adviesformulier .re-summary{position:static}#re-adviesformulier .re-sum-steps{display:none}#re-adviesformulier .re-sum-card{padding:18px 22px}#re-adviesformulier .re-sum-card .re-lead{margin-bottom:6px}#re-adviesformulier .re-sum-total{margin-top:4px}}@container rea (max-width: 720px){#re-adviesformulier .re-block{padding:20px}#re-adviesformulier .re-uploads{grid-template-columns:1fr}#re-adviesformulier .re-uploads .re-up{min-height:96px}#re-adviesformulier .re-step-sub{margin-left:0}}@container rea (max-width: 560px){#re-adviesformulier .re-block{padding:18px 16px}#re-adviesformulier .re-opts{grid-template-columns:1fr 1fr}#re-adviesformulier .re-opts.re-big,#re-adviesformulier .re-grid-pers,#re-adviesformulier .re-grid-adres{grid-template-columns:1fr}#re-adviesformulier .re-opt{padding:12px 34px 12px 12px;font-size:.9rem}#re-adviesformulier .re-opt .re-ico{width:36px;height:36px}#re-adviesformulier .re-step-count{display:none}#re-adviesformulier .re-step-head h2{font-size:1.2rem}#re-adviesformulier .re-actions .re-btn{padding-left:1.1em;padding-right:1.1em}}@container rea (max-width: 380px){#re-adviesformulier .re-opts{grid-template-columns:1fr}}";
    /* R&E Installaties – Advies verduurzaming · gedeelde rekenlogica.
     Wordt in de widget gebundeld en door npm run build in n8n/verwerk-aanvraag.n8n.js gezet.
     n8n is leidend: de cijfers in de rapportmail komen uit n8n.
     Let op: geen backslashes in dit bestand (het wordt in de n8n-workflow ingesloten). */
  
  var REA_CFG = {
    versie: '1.3.0',
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
    // Investering: prijs ex. btw + btw − ISDE-subsidie = netto voor de klant
    btw: 0.21,
    hybrideToestel: 'Xtend eco 5 kW',
    hybridePrijsEx: 6000,
    hybrideSubsidie: 2125,
    ketelPrijsEx: 2400,       // nieuwe CV-ketel bij hybride als de huidige ketel ouder is dan 10 jaar
    aeToestel: 'Bosch Compress 7 kW met 300 L boiler',
    aePrijsEx: 10694.10,
    aeSubsidie: 3025,
    // Warm water (tapwater)
    wwM3PerPersoon: 75,       // m³ gas per bewoner per jaar bij een standaard douche (~20% van een gemiddeld gezinsverbruik)
    wwFactor: { 'Standaard douche': 1.0, 'Regendouche': 1.4, 'Bad en standaard douche': 1.2, 'Bad en/of regendouche': 1.5, 'Meerdere badkamers': 1.3 },
    wwMaxAandeel: 0.4,        // warm water nooit meer dan 40% van de totale warmtevraag
    scopWarmWater: 2.5,       // warmtepomp maakt tapwater op 55–60 °C, dus lager rendement
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
  
    var pG = reaNum(A.tGas) || CFG.tariefGas;
    var pS = reaNum(A.tStroom) || CFG.tariefStroom;
    var vast = reaNum(A.tVast); if (vast === null) vast = CFG.vastrechtGas;
    var pW = reaNum(A.tGJ) || CFG.tariefWarmte;
    var vastW = reaNum(A.tVastWarmte); if (vastW === null) vastW = CFG.vastWarmte;
  
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
      kw: null, scop: scopAe, scopHybride: scopHy, slecht: slecht, goedGeisoleerd: goed, ltv: ltv,
      advies: null, adviesLabel: null, adviesBron: 'keuze',
      tarieven: { gas: pG, stroom: pS, vastrecht: vast, warmte: pW, vastWarmte: vastW },
      gas: gas, gj: gj, bron: gas ? 'gas' : (gj ? 'warmtenet' : null),
      kostNu: null, hybride: null, allElectric: null,
      investering: { hybride: invHy, allElectric: invAe, hybrideToestel: CFG.hybrideToestel, aeToestel: CFG.aeToestel, nieuweKetel: nieuweKetel },
      teruglevering: reaNum(A.teruglevering), terugDekking: null,
      boiler: null, boilerRuim: false,
      tips: []
    };
  
    if (warmte) {
      var kwRaw = (warmteVerw + bijWarmte) / CFG.vollastUren;   // warm water komt uit de boiler, telt niet mee in het vermogen
      r.kw = CFG.maten.filter(function (m) { return m >= kwRaw; })[0] || CFG.maten[CFG.maten.length - 1];
    }
  
    // ---- Kosten en besparing ----
    var tvt = function (inv, besp) { return besp > 0 ? r1(inv / besp) : null; };
    if (gas || gj) {
      var kostNu = gas ? gas * pG + vast : gj * pW + vastW;
      var aeStroom = warmteVerw / scopAe + warmteWW / CFG.scopWarmWater;
      var ae = { stroom: Math.round(aeStroom), kosten: Math.round(aeStroom * pS), scop: scopAe };
      ae.besparing = Math.round(kostNu - aeStroom * pS);
      ae.terugverdientijd = tvt(invAe, ae.besparing);
      r.kostNu = Math.round(kostNu); r.allElectric = ae;
      if (gas) {
        // Hybride kan alleen naast een gasketel
        // De warmtepomp neemt 70% van de verwarming over; warm water blijft op de CV-ketel
        var hyStroom = warmteVerw * CFG.hybrideAandeel / scopHy;
        var hyGas = gas - warmteVerw * CFG.hybrideAandeel / CFG.kwhPerM3;
        var hy = { stroom: Math.round(hyStroom), gasRest: Math.round(hyGas), kosten: Math.round(hyGas * pG + vast + hyStroom * pS), scop: scopHy };
        hy.besparing = Math.round(kostNu - (hyGas * pG + vast + hyStroom * pS));
        hy.terugverdientijd = tvt(invHy, hy.besparing);
        r.hybride = hy;
      }
      if (r.teruglevering && ae.stroom) r.terugDekking = Math.min(100, Math.round(r.teruglevering / ae.stroom * 100));
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
    if (r.terugDekking) t.push('U levert nu ' + Math.round(r.teruglevering).toLocaleString('nl-NL') + ' kWh per jaar terug aan het net. Daarmee dekt u ongeveer ' + r.terugDekking + '% van het extra stroomverbruik van een all-electric warmtepomp.');
    if (r.boiler && advies === 'all-electric') t.push('Voor uw warm water rekenen we met een boiler van ongeveer ' + r.boiler + ' liter' + (r.boilerRuim ? ' of groter' : '') + '. Onze adviseur stemt dit af op uw gezin en badkamer.');
    if (A.accu === 'Nee, maar ik wil graag advies over een thuisaccu') t.push('U wilt advies over een thuisaccu. Die nemen we mee in het gesprek, zodat u meer van uw eigen zonnestroom gebruikt.');
    if (A.afstand === 'Minder dan 2 m') t.push('De buitenunit komt dicht bij de erfgrens. Daar gelden strengere geluidseisen. Mogelijk adviseren we een extra stil model of een geluidsscherm.');
    if (A.buitenunit === 'Geen mogelijkheden / onbekend') t.push('Er is nog geen plek voor een buitenunit bekend. Onze adviseur bekijkt de mogelijkheden bij u thuis.');
    if (bij.indexOf('Pelletkachel') > -1 || bij.indexOf('Houtkachel of open haard') > -1) t.push('Uw kachel hebben we meegerekend in het vermogen. Zo krijgt u een warmtepomp die ook zonder de kachel genoeg warmte levert.');
    if (!r.allElectric && advies !== 'airco') t.push('Uw besparing rekenen we precies voor u uit in het persoonlijke advies.');
  
    return r;
  }
  

  // ------------------------------------------------------------------ iconen
  var SVG = function (p, vb) { return '<svg viewBox="' + (vb || '0 0 24 24') + '" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + '</svg>'; };
  var I = {
    check: SVG('<path d="M5 13l4 4L19 7" stroke-width="3"/>'),
    info: SVG('<circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/>'),
    up: SVG('<path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3M12 4v12M7 9l5-5 5 5"/>'),
    ok: SVG('<path d="M5 13l4 4L19 7" stroke-width="2.6"/>'),
    tussen: SVG('<path d="M2 11l5-5 5 5 5-5 5 5"/><path d="M3 10v10h18V10"/><path d="M10 20v-5h4v5"/>'),
    hoek: SVG('<path d="M2 12l7-7 7 7 3-3 3 3"/><path d="M4 10v10h17v-8"/><path d="M7 20v-5h4v5"/>'),
    twee: SVG('<path d="M1 12l6-6 5 5 5-5 6 6"/><path d="M3 10v10h18V10M12 11v9"/>'),
    vrij: SVG('<path d="M3 11l9-8 9 8"/><path d="M5 9.5V20h14V9.5"/><path d="M10 20v-6h4v6"/>'),
    app: SVG('<rect x="5" y="2.5" width="14" height="19" rx="1"/><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M11 21.5v-3h2v3"/>'),
    douche: SVG('<path d="M5 21V8a4 4 0 0 1 4-4h1a4 4 0 0 1 4 4"/><path d="M10.5 9h7"/><path d="M12 12.5v1M15 12.5v1M18 12.5v1M13.5 16v1M16.5 16v1M15 19.5v1"/>'),
    regen: SVG('<path d="M12 2.5v3"/><path d="M5 5.5h14a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2z"/><path d="M6 11v1M9.5 11v1M14.5 11v1M18 11v1M8 15v1M12 11v1M12 15v1M16 15v1M10 19v1M14 19v1"/>'),
    bad: SVG('<path d="M2.5 13h19v1.5a5 5 0 0 1-5 5h-9a5 5 0 0 1-5-5z"/><path d="M5 13V6.5a2.5 2.5 0 0 1 5 0"/><path d="M7 19.5 6 21.5M17 19.5l1 2"/><path d="M14 4.5h6M16 7.5v1M18.5 7.5v1M17.2 10v1"/>'),
    badregen: SVG('<path d="M2.5 13h19v1.5a5 5 0 0 1-5 5h-9a5 5 0 0 1-5-5z"/><path d="M7 19.5 6 21.5M17 19.5l1 2"/><path d="M6 3h12"/><path d="M7 6v1M10 6v1M14 6v1M17 6v1M8.5 9v1M12 6v1M12 9v1M15.5 9v1"/>'),
    meer: SVG('<path d="M1.5 15h12v1a3.5 3.5 0 0 1-3.5 3.5H5A3.5 3.5 0 0 1 1.5 16z"/><path d="M3.5 15V10a1.8 1.8 0 0 1 3.6 0"/><path d="M15 3.5h6.5v16H15z"/><path d="M17 6.5h3M18.5 6.5v2M17.4 10.5v1M19.6 10.5v1M18.5 13v1"/>'),
    hybride: SVG('<path d="M12 3c2 3 5 5 5 9a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3-1-3 0-6 1-8z"/>'),
    ae: SVG('<path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/>'),
    airco: SVG('<path d="M12 2v20M4.5 6.5l15 11M19.5 6.5l-15 11M9 3.5l3 2 3-2M9 20.5l3-2 3 2"/>'),
    advies: SVG('<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5M12 16.5h.01"/>')
  };

  // ------------------------------------------------------------ vragenlijst
  var STEPS = [
    { kort: 'Woning & huishouden', titel: 'Woning & huishouden', sub: 'Zo weten we met wat voor woning en huishouden we te maken hebben.', velden: [
      { id: 'woningtype', type: 'radio', label: 'Wat voor type woning heeft u?', req: true, opties: [
        { v: 'Tussenwoning', ico: I.tussen }, { v: 'Hoekwoning', ico: I.hoek }, { v: 'Twee-onder-één-kap', ico: I.twee },
        { v: 'Vrijstaand', ico: I.vrij }, { v: 'Appartement', ico: I.app }] },
      { id: 'bouwjaar', type: 'radio', cls: 're-chips', label: 'Wat is het geschatte bouwjaar van de woning?', req: true,
        opties: ['Voor 1975', '1975 – 1990', '1990 – 2012', 'Na 2012', 'Nieuwbouw'] },
      { id: 'personen', type: 'radio', cls: 're-chips', label: 'Hoeveel bewoners heeft de woning?', req: true,
        opties: ['1', '2', '3', '4', '5', '6+'] },
      { id: 'badkamer', type: 'radio', label: 'Wat voor badkamer heeft u?', req: true,
        hint: 'Met het aantal bewoners en uw badkamer schatten we hoeveel gas u voor warm water gebruikt, en hoe groot een eventuele boiler moet zijn.', opties: [
        { v: 'Standaard douche', ico: I.douche }, { v: 'Regendouche', ico: I.regen },
        { v: 'Bad en standaard douche', ico: I.bad }, { v: 'Bad en/of regendouche', ico: I.badregen }, { v: 'Meerdere badkamers', ico: I.meer }] },
      { id: 'tegelijkWater', type: 'radio', cls: 're-chips', label: 'Wilt u op meerdere plekken tegelijk warm water?', req: true,
        hint: 'Bijvoorbeeld douchen terwijl de keukenkraan of een tweede badkamer warm water gebruikt.', opties: ['Ja', 'Nee'] }
    ] },
    { kort: 'Huidige situatie', titel: 'Huidige situatie, energieverbruik & isolatie', sub: 'Hiermee berekenen we hoeveel warmte uw woning nodig heeft.', velden: [
      { id: 'verwarming', type: 'radio', label: 'Wat is uw huidige manier van verwarmen?', req: true,
        opties: ['CV-ketel (gas)', 'Warmtepomp', 'Stadsverwarming', 'Overig'] },
      { id: 'ketelLeeftijd', type: 'radio', cls: 're-chips', label: 'Hoe oud is de huidige CV-ketel ongeveer?', req: true,
        toon: function (a) { return a.verwarming === 'CV-ketel (gas)'; },
        opties: ['Jonger dan 5 jaar', '5 tot 10 jaar', 'Ouder dan 10 jaar', 'Weet ik niet'],
        note: function (a) { return a.ketelLeeftijd === 'Ouder dan 10 jaar' ? { t: 'Goed moment om over te stappen: bij een ketel ouder dan 10 jaar is een warmtepomp vaak interessant.' } : null; } },
      { id: 'gasverbruik', type: 'number', label: 'Wat is uw gemiddelde jaarlijkse gasverbruik?', suf: 'm³ per jaar', ph: 'bijv. 1400', min: 100, max: 10000, req: true,
        toon: function (a) { return a.verwarming === 'CV-ketel (gas)'; },
        hint: 'Nodig om het benodigde warmtepompvermogen te berekenen. U vindt dit op uw jaarafrekening of in de app van uw energieleverancier.' },
      { id: 'wpVerbruik', type: 'number', label: 'Wat is het jaarlijkse stroomverbruik van uw warmtepomp?', suf: 'kWh per jaar', ph: 'bijv. 3500', min: 100, max: 30000, req: true,
        toon: function (a) { return a.verwarming === 'Warmtepomp'; }, hint: 'Staat vaak in de app of op het display van de warmtepomp. Een schatting is ook goed.' },
      { id: 'gjVerbruik', type: 'number', label: 'Wat is uw jaarlijkse warmteverbruik?', suf: 'GJ per jaar', ph: 'bijv. 25', min: 1, max: 500, req: true,
        toon: function (a) { return a.verwarming === 'Stadsverwarming'; }, hint: 'In gigajoules (GJ). U vindt dit op de jaarafrekening van uw warmteleverancier.' },
      { id: 'overigToelichting', type: 'textarea', label: 'Hoe verwarmt u uw woning nu?', ph: 'Bijv. elektrische kachels, oliegestookte ketel, blokverwarming…', req: true,
        toon: function (a) { return a.verwarming === 'Overig'; } },
      { id: 'isolatie', type: 'checkbox', label: 'Hoe is de isolatie van de woning?', req: true, exclusief: ['Niet geïsoleerd', 'Weet ik niet'],
        opties: ['Spouwmuurisolatie', 'Dakisolatie', 'Vloerisolatie', 'HR++ of triple glas', 'Niet geïsoleerd', 'Weet ik niet'] }
    ] },
    { kort: 'Afgifte & buitenunit', titel: 'Warmteafgifte, bijverwarming & buitenunit', sub: 'Hoe de warmte in huis komt, bepaalt welk systeem het beste past.', velden: [
      { id: 'beneden', type: 'checkbox', label: 'Hoe wordt de woning beneden verwarmd?', req: true,
        opties: ['Vloerverwarming', 'Radiatoren', 'Warmeluchtverwarming', 'Airconditioning (lucht/lucht)'] },
      { id: 'boven', type: 'checkbox', label: 'Hoe wordt de woning boven verwarmd?', req: true, exclusief: ['Geen verwarming'],
        opties: ['Vloerverwarming', 'Radiatoren', 'Warmeluchtverwarming', 'Airconditioning (lucht/lucht)', 'Geen verwarming'] },
      { id: 'bijverwarming', type: 'checkbox', label: 'Is er aanvullende bijverwarming aanwezig?', req: true, exclusief: ['Geen bijverwarming'],
        opties: ['Pelletkachel', 'Houtkachel of open haard', 'Elektrische bijverwarming (bijv. IR-panelen)', 'Geen bijverwarming'] },
      { id: 'pelletsKg', type: 'number', cls: 're-max', label: 'Hoeveel kg pellets stookt u per jaar?', suf: 'kg per jaar', ph: 'bijv. 1000', min: 1, max: 20000, req: true,
        toon: function (a) { return (a.bijverwarming || []).indexOf('Pelletkachel') > -1; }, hint: 'Een schatting is prima.' },
      { id: 'houtKg', type: 'number', cls: 're-max', label: 'Hoeveel kg hout stookt u per jaar?', suf: 'kg per jaar', ph: 'bijv. 800', min: 1, max: 20000, req: true,
        toon: function (a) { return (a.bijverwarming || []).indexOf('Houtkachel of open haard') > -1; }, hint: 'Een schatting is prima.' },
      { id: 'buitenunit', type: 'radio', cls: 're-chips', label: 'Waar kan een eventuele buitenunit geplaatst worden?', req: true,
        opties: ['Op de grond', 'Aan de gevel', 'Op een plat dak', 'Geen mogelijkheden / onbekend'] },
      { id: 'afstand', type: 'radio', cls: 're-chips', label: 'Wat is de geschatte afstand van de buitenunit tot de erfgrens?', req: true,
        toon: function (a) { return a.buitenunit !== 'Geen mogelijkheden / onbekend'; },
        hint: 'Dit vragen we in verband met de geluidsnormen.', opties: ['Minder dan 2 m', '2 tot 5 m', 'Meer dan 5 m'],
        note: function (a) { return a.afstand === 'Minder dan 2 m' ? { warn: true, t: 'Dicht bij de erfgrens gelden strengere geluidseisen. Mogelijk adviseren we een extra stil model of een geluidsscherm.' } : null; } }
    ] },
    { kort: 'Zonnepanelen & tarieven', titel: 'Zonnepanelen, energietarieven & opslag', sub: 'Hiermee rekenen we uw jaarlijkse besparing en terugverdientijd uit.', velden: [
      { id: 'zonnepanelen', type: 'radio', cls: 're-chips', label: 'Zijn er zonnepanelen aanwezig op de woning?', req: true, opties: ['Ja', 'Nee', 'Binnenkort aanwezig'] },
      { id: 'panelen', type: 'groep', label: 'Wat is de capaciteit van uw zonnepanelen?', toon: function (a) { return a.zonnepanelen === 'Ja'; }, inputs: [
        { id: 'aantalPanelen', type: 'number', label: 'Aantal panelen', suf: 'stuks', ph: 'bijv. 12' },
        { id: 'opbrengst', type: 'number', label: 'Of: jaaropbrengst', suf: 'kWh / jaar', ph: 'bijv. 4200' }] },
      { id: 'teruglevering', type: 'number', cls: 're-max', label: 'Hoeveel stroom houdt u op jaarbasis over?', suf: 'kWh per jaar', ph: 'bijv. 1800',
        toon: function (a) { return a.zonnepanelen === 'Ja'; }, hint: 'De teruglevering aan het net. Dit staat op uw jaarafrekening.' },
      { id: 'tarieven', type: 'groep', label: 'Wat zijn uw huidige energietarieven?', hint: 'Weet u het niet precies? Laat het leeg, dan rekenen we met gemiddelde tarieven.', inputs: [
        { id: 'tGas', type: 'number', label: 'Gastarief', pre: '€', suf: 'per m³', ph: '1,35', toon: function (a) { return a.verwarming === 'CV-ketel (gas)'; } },
        { id: 'tStroom', type: 'number', label: 'Stroomtarief', pre: '€', suf: 'per kWh', ph: '0,28' },
        { id: 'tVast', type: 'number', label: 'Vastrecht gas', pre: '€', suf: 'per jaar', ph: '300', toon: function (a) { return a.verwarming === 'CV-ketel (gas)'; } },
        { id: 'tGJ', type: 'number', label: 'Warmtetarief', pre: '€', suf: 'per GJ', ph: '40,97', toon: function (a) { return a.verwarming === 'Stadsverwarming'; } },
        { id: 'tVastWarmte', type: 'number', label: 'Vaste kosten warmte', pre: '€', suf: 'per jaar', ph: '828', toon: function (a) { return a.verwarming === 'Stadsverwarming'; } }],
        note: function (a) { return a.verwarming === 'CV-ketel (gas)' ? { t: 'Bij all-electric vervalt uw gasaansluiting. Alleen al het vastrecht gas scheelt vaak € 250 tot € 350 per jaar.' } : null; } },
      { id: 'accu', type: 'radio', label: 'Is er een thuisaccu aanwezig?', req: true, opties: ['Ja', 'Nee', 'Nee, maar ik wil graag advies over een thuisaccu'] },
      { id: 'accuKwh', type: 'number', cls: 're-max', label: 'Capaciteit thuisaccu', suf: 'kWh', ph: 'bijv. 10', toon: function (a) { return a.accu === 'Ja'; } }
    ] },
    { kort: 'Wens & planning', titel: 'Uw wens & planning', sub: 'Wat zoekt u, en wanneer wilt u het geregeld hebben?', velden: [
      { id: 'wens', type: 'radio', cls: 're-big', label: 'Waar bent u hoofdzakelijk naar op zoek?', req: true, opties: [
        { v: 'Hybride warmtepomp', d: 'Combinatie met uw CV-ketel', ico: I.hybride },
        { v: 'All-electric warmtepomp', d: 'Volledig van het gas af', ico: I.ae },
        { v: 'Airconditioning', d: 'Koelen en/of bijverwarmen', ico: I.airco },
        { v: 'Advies', d: 'Welke optie past het best bij mijn situatie?', ico: I.advies }] },
      { id: 'planning', type: 'radio', cls: 're-chips', label: 'Wanneer wilt u de werkzaamheden laten uitvoeren?', req: true,
        opties: ['Zo snel mogelijk', 'Binnen 3 maanden', 'Binnen 6 maanden', 'Oriënterend'] }
    ] },
    { kort: 'Foto’s & gegevens', titel: 'Foto’s & contactgegevens', sub: 'Bijna klaar. Met foto’s kunnen we sneller en nauwkeuriger een advies maken.', velden: [
      { id: 'fotos', type: 'uploads', label: 'Upload foto’s', opt: true, hint: 'Optioneel. Met foto’s kan onze adviseur uw situatie direct beoordelen.', slots: [
        { id: 'foto_ketel', t: 'CV-ketel + leidingwerk' }, { id: 'foto_meterkast', t: 'Binnenkant meterkast' }, { id: 'foto_opstelplaats', t: 'Plek buitenunit' }] },
      { id: 'contact', type: 'contact', label: 'Uw gegevens' },
      { id: 'opmerkingen', type: 'textarea', label: 'Opmerkingen of vragen', opt: true, ph: 'Bijv. beste tijd om te bellen, bijzonderheden aan de woning…' },
      { id: 'akkoord', type: 'consent' }
    ] }
  ];
  var CONTACT = [
    { id: 'voornaam', label: 'Voornaam', ac: 'given-name' },
    { id: 'achternaam', label: 'Achternaam', ac: 'family-name' },
    { id: 'email', label: 'E-mailadres', type: 'email', ac: 'email', ph: 'naam@voorbeeld.nl' },
    { id: 'telefoon', label: 'Telefoonnummer', type: 'tel', ac: 'tel', ph: '06 12345678' },
    { id: 'postcode', label: 'Postcode', ac: 'postal-code', ph: '7825 VV' },
    { id: 'huisnummer', label: 'Huisnummer + toevoeging', ph: '17' },
    { id: 'straat', label: 'Straat', ac: 'address-line1' },
    { id: 'plaats', label: 'Plaats', ac: 'address-level2' }
  ];

  // ------------------------------------------------------------------ helpers
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var val = function (o) { return typeof o === 'string' ? o : o.v; };
  var fmt = function (n) { return Math.round(n).toLocaleString('nl-NL'); };
  var euro = function (n) { return '€ ' + fmt(n); };
  var dec = function (n) { return String(n).replace('.', ','); };
  var track = function (event, props) {
    try { (window.dataLayer = window.dataLayer || []).push(Object.assign({ event: event }, props || {})); } catch (e) {}
    try { if (window.posthog && window.posthog.capture) window.posthog.capture(event, props || {}); } catch (e) {}
  };

  function init() {
    var root = document.getElementById(ROOT_ID);
    if (!root || root.getAttribute('data-rea-init')) return;
    root.setAttribute('data-rea-init', '1');
    if (!root.getAttribute('lang')) root.setAttribute('lang', 'nl');

    var CONF = {
      webhook: root.getAttribute('data-webhook') || '',
      privacy: root.getAttribute('data-privacy-url') || '#',
      test: root.getAttribute('data-test') === 'true',
      telefoon: root.getAttribute('data-telefoon') || '0591 327 010'
    };

    if (!document.getElementById('re-advies-css')) {
      var st = document.createElement('style'); st.id = 're-advies-css'; st.textContent = CSS; document.head.appendChild(st);
    }

    var A = {}, FILES = {}, cur = 0, started = false, sending = false;
    try { Object.assign(A, JSON.parse(localStorage.getItem(STORE_KEY) || '{}')); } catch (e) {}
    var save = function () { try { localStorage.setItem(STORE_KEY, JSON.stringify(A)); } catch (e) {} };

    var isReq = function (f) { return typeof f.req === 'function' ? f.req(A) : !!f.req; };
    var shown = function (f) { return !f.toon || f.toon(A); };
    var inputsOf = function (f) { return f.inputs.filter(shown); };

    root.innerHTML =
      '<div class="re-layout">' +
        '<div class="re-block" data-rea="card">' +
          '<div class="re-progress" data-rea="progress"></div>' +
          '<form novalidate data-rea="form"><div data-rea="body"></div>' +
            '<div class="re-form-msg" data-rea="msg" role="alert"></div>' +
            '<div class="re-actions">' +
              '<button type="button" class="re-btn re-btn-ghost" data-rea="prev">← Vorige</button>' +
              '<button type="submit" class="re-btn" data-rea="next">Volgende stap →</button>' +
            '</div>' +
            '<input type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" data-rea="hp" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0">' +
          '</form>' +
        '</div>' +
        '<aside class="re-summary"><div class="re-sum-card">' +
          '<h2>Uw indicatie</h2><p class="re-lead">Live overzicht op basis van uw antwoorden</p>' +
          '<ul class="re-sum-steps" data-rea="steps"></ul>' +
          '<div class="re-sum-total"><span class="re-tlab">Geschat vermogen<br>warmtepomp</span><span><span class="re-tval" data-rea="kw">–</span><span class="re-per" data-rea="basis">vul stap 2 in</span></span></div>' +
          '<div data-rea="once"></div>' +
          '<p class="re-sum-foot">Vrijblijvend advies. Liever bellen? <a href="tel:' + esc(CONF.telefoon.replace(/\s/g, '')) + '">' + esc(CONF.telefoon) + '</a></p>' +
        '</div></aside>' +
      '</div>';

    var $ = function (k) { return root.querySelector('[data-rea="' + k + '"]'); };
    var body = $('body');

    // ------------------------------------------------------------ render
    function optHTML(f, o, i) {
      var v = val(o), multi = f.type === 'checkbox';
      var on = multi ? (A[f.id] || []).indexOf(v) > -1 : A[f.id] === v;
      return '<label class="re-opt' + (multi ? ' re-multi-opt' : '') + (on ? ' re-active' : '') + '">' +
        '<input type="' + (multi ? 'checkbox' : 'radio') + '" name="' + f.id + '" value="' + esc(v) + '"' + (on ? ' checked' : '') + '>' +
        (o.ico ? '<span class="re-ico">' + o.ico + '</span>' : '') +
        '<span>' + esc(v) + (o.d ? '<small>' + esc(o.d) + '</small>' : '') + '</span>' +
        '<span class="re-check">' + I.check + '</span></label>';
    }
    function inputHTML(i, extraCls) {
      var v = A[i.id] == null ? '' : A[i.id];
      var t = i.type === 'number' ? 'text' : (i.type || 'text');
      return '<label class="re-fld ' + (i.cls || '') + ' ' + (extraCls || '') + '" data-in="' + i.id + '">' +
        (i.label ? '<span class="re-lab">' + esc(i.label) + (i.req ? ' <i>*</i>' : '') + '</span>' : '') +
        '<span class="re-inwrap">' + (i.pre ? '<span class="re-pre">' + i.pre + '</span>' : '') + (i.suf ? '<span class="re-suf">' + esc(i.suf) + '</span>' : '') +
        (i.type === 'textarea'
          ? '<textarea id="rea-' + i.id + '" name="' + i.id + '" placeholder="' + esc(i.ph || '') + '">' + esc(v) + '</textarea>'
          : '<input id="rea-' + i.id + '" name="' + i.id + '" type="' + t + '"' + (i.type === 'number' ? ' inputmode="decimal"' : '') + (i.suf ? ' class="re-has-suf"' : '') +
            ' placeholder="' + esc(i.ph || '') + '" value="' + esc(v) + '"' + (i.ac ? ' autocomplete="' + i.ac + '"' : '') + '>') +
        '</span></label>';
    }
    function fieldHTML(f) {
      var h = '<div class="re-q" data-q="' + f.id + '">';
      if (f.type === 'consent') {
        return h + '<div class="re-consent"><input type="checkbox" id="rea-akkoord" name="akkoord"' + (A.akkoord ? ' checked' : '') + '>' +
          '<label for="rea-akkoord">Ik ga akkoord met het <a href="' + esc(CONF.privacy) + '" target="_blank" rel="noopener">privacybeleid</a> en ontvang mijn persoonlijke adviesrapport per e-mail. R&amp;E Installaties neemt contact met mij op over dit advies.</label></div>' +
          '<div class="re-err">Geef akkoord om uw advies te ontvangen.</div></div>';
      }
      var star = (f.type !== 'groep' && f.type !== 'uploads' && f.type !== 'contact' && isReq(f)) ? ' <i>*</i>' : '';
      h += '<span class="re-lab">' + esc(f.label) + star + (f.opt ? ' <small>(optioneel)</small>' : '') + (f.type === 'checkbox' ? '<span class="re-multi">meerdere mogelijk</span>' : '') + '</span>';
      h += f.hint ? '<p class="re-hint">' + esc(f.hint) + '</p>' : '<div class="re-gap"></div>';
      if (f.type === 'radio' || f.type === 'checkbox') h += '<div class="re-opts ' + (f.cls || '') + '">' + f.opties.map(function (o, i) { return optHTML(f, o, i); }).join('') + '</div>';
      else if (f.type === 'groep') h += '<div class="re-row">' + inputsOf(f).map(function (i) { return inputHTML(i); }).join('') + '</div>';
      else if (f.type === 'contact') h += '<div class="re-grid-pers">' + CONTACT.map(function (c) { return inputHTML({ id: c.id, label: c.label, type: c.type, ac: c.ac, ph: c.ph, req: true }); }).join('') + '</div>';
      else if (f.type === 'uploads') h += '<div class="re-uploads">' + f.slots.map(upHTML).join('') + '</div>';
      else h += inputHTML(Object.assign({}, f, { label: null }));
      var err = f.type === 'checkbox' ? 'Kies minimaal één optie.' : f.type === 'radio' ? 'Maak een keuze.' : f.type === 'contact' ? 'Vul de gemarkeerde velden (correct) in.' : 'Vul dit veld (correct) in.';
      return h + '<div data-note></div><div class="re-err">' + err + '</div></div>';
    }
    function upHTML(s) {
      var list = FILES[s.id] || [];
      return '<label class="re-up' + (list.length ? ' re-has' : '') + '" data-slot="' + s.id + '">' +
        '<input type="file" accept="image/*" multiple data-up="' + s.id + '">' + I.up +
        '<b>' + esc(s.t) + '</b><small>' + (list.length ? list.length + ' foto(’s) · tik op een foto om te verwijderen' : 'Klik of sleep foto’s hierheen') + '</small>' +
        '<span class="re-thumbs">' + list.map(function (u, i) { return '<button type="button" data-rm="' + s.id + ':' + i + '" aria-label="Foto verwijderen"><img src="' + u.url + '" alt=""></button>'; }).join('') + '</span></label>';
    }

    function renderStep() {
      var s = STEPS[cur];
      $('progress').innerHTML = STEPS.map(function (_, i) { return '<i class="' + (i < cur ? 're-done' : i === cur ? 're-now' : '') + '"></i>'; }).join('');
      body.innerHTML = '<div class="re-step-head"><span class="re-step-num">' + (cur + 1) + '</span><h2>' + esc(s.titel) + '</h2><span class="re-step-count">Stap ' + (cur + 1) + ' van ' + STEPS.length + '</span></div>' +
        '<p class="re-step-sub">' + esc(s.sub) + '</p>' + s.velden.map(fieldHTML).join('');
      $('prev').classList.toggle('re-invisible', cur === 0);
      $('next').textContent = cur === STEPS.length - 1 ? 'Akkoord, stuur mijn advies' : 'Volgende stap →';
      showMsg('');
      refresh();
      track('advies_stap', { advies_stap: cur + 1, advies_stap_naam: s.kort });
    }

    function refresh() {
      STEPS[cur].velden.forEach(function (f) {
        var el = body.querySelector('[data-q="' + f.id + '"]'); if (!el) return;
        el.classList.toggle('re-hidden', !shown(f));
        var slot = el.querySelector('[data-note]');
        if (slot) { var n = f.note ? f.note(A) : null; slot.innerHTML = n ? '<div class="re-note' + (n.warn ? ' re-warn' : '') + '">' + I.info + '<span>' + esc(n.t) + '</span></div>' : ''; }
      });
      renderSummary();
    }

    function renderSummary() {
      $('steps').innerHTML = STEPS.map(function (s, i) {
        return '<li class="' + (i < cur ? 're-done' : i === cur ? 're-now' : '') + '"><span class="re-dotnum">' + (i < cur ? '✓' : i + 1) + '</span>' + esc(s.kort) + '</li>';
      }).join('');
      var r = reaBereken(A);
      $('kw').textContent = r.kw ? '± ' + r.kw + ' kW' : '–';
      $('basis').textContent = r.kw ? 'op basis van ' + r.basis : (A.verwarming === 'Overig' ? 'berekenen we in uw advies' : 'vul stap 2 in');
      $('once').innerHTML = r.kostNu && cur >= 3 ? '<div class="re-sum-once"><span>Huidige stookkosten</span><b>' + euro(r.kostNu) + ' / jaar</b></div>' : '';
    }

    function showMsg(t) { var m = $('msg'); m.className = 're-form-msg' + (t ? ' re-msg-error' : ''); m.innerHTML = t || ''; }

    // ------------------------------------------------------------ events
    body.addEventListener('change', function (e) {
      var t = e.target;
      if (!started) { started = true; track('advies_start'); }
      if (t.getAttribute('data-up')) { addFiles(t.getAttribute('data-up'), t.files); t.value = ''; return; }
      if (t.name === 'akkoord') { A.akkoord = t.checked; }
      else if (t.type === 'radio') {
        A[t.name] = t.value;
        body.querySelectorAll('input[name="' + t.name + '"]').forEach(function (r) { r.closest('.re-opt').classList.toggle('re-active', r.checked); });
      } else if (t.type === 'checkbox') {
        var f = STEPS[cur].velden.filter(function (x) { return x.id === t.name; })[0];
        var ex = (f && f.exclusief) || [], arr = A[t.name] || [];
        if (t.checked) arr = ex.indexOf(t.value) > -1 ? [t.value] : arr.filter(function (v) { return ex.indexOf(v) === -1; }).concat(t.value);
        else arr = arr.filter(function (v) { return v !== t.value; });
        A[t.name] = arr;
        body.querySelectorAll('input[name="' + t.name + '"]').forEach(function (c) { c.checked = arr.indexOf(c.value) > -1; c.closest('.re-opt').classList.toggle('re-active', c.checked); });
      }
      var q = t.closest('.re-q'); if (q) q.classList.remove('re-invalid');
      save(); refresh();
    });
    body.addEventListener('input', function (e) {
      var t = e.target;
      if (!t.name || t.type === 'radio' || t.type === 'checkbox' || t.type === 'file') return;
      A[t.name] = t.value; t.classList.remove('re-bad');
      var q = t.closest('.re-q'); if (q && !q.querySelector('.re-bad')) q.classList.remove('re-invalid');
      if (!started) { started = true; track('advies_start'); }
      save(); renderSummary();
      if (t.name === 'postcode' || t.name === 'huisnummer') lookupAdres();
    });
    body.addEventListener('click', function (e) {
      var b = e.target.closest('[data-rm]'); if (!b) return;
      e.preventDefault();
      var p = b.getAttribute('data-rm').split(':'), list = FILES[p[0]] || [];
      var gone = list.splice(+p[1], 1)[0]; if (gone) URL.revokeObjectURL(gone.url);
      redrawSlot(p[0]);
    });
    $('prev').addEventListener('click', function () { if (cur > 0) { cur--; renderStep(); scrollTop(); } });
    $('form').addEventListener('submit', function (e) {
      e.preventDefault();
      if (sending || !validStep()) return;
      if (cur < STEPS.length - 1) { cur++; renderStep(); scrollTop(); } else send();
    });
    function scrollTop() {
      var y = $('card').getBoundingClientRect().top + window.pageYOffset - 110;
      if (window.pageYOffset > y) window.scrollTo({ top: y, behavior: 'smooth' });
    }

    // ------------------------------------------------------------ adres (PDOK)
    var lastQ = '', autoFilled = {};
    function lookupAdres() {
      var pc = String(A.postcode || '').replace(/\s+/g, '').toUpperCase();
      var nr = (String(A.huisnummer || '').match(/\d+/) || [''])[0];
      if (!/^\d{4}[A-Z]{2}$/.test(pc) || !nr) return;
      var q = pc + '-' + nr; if (q === lastQ) return; lastQ = q;
      fetch('https://api.pdok.nl/bzk/locatieserver/search/v3_1/free?fq=type:adres&rows=1&q=' + encodeURIComponent(pc + ' ' + nr))
        .then(function (r) { return r.json(); })
        .then(function (d) {
          var doc = d && d.response && d.response.docs && d.response.docs[0]; if (!doc) return;
          [['straat', doc.straatnaam], ['plaats', doc.woonplaatsnaam]].forEach(function (p) {
            var el = body.querySelector('#rea-' + p[0]);
            if (p[1] && el && (!el.value || autoFilled[p[0]] === el.value)) { el.value = p[1]; A[p[0]] = p[1]; autoFilled[p[0]] = p[1]; el.classList.remove('re-bad'); }
          });
          save();
        }).catch(function () {});
    }

    // ------------------------------------------------------------ foto's
    function compress(file) {
      return new Promise(function (res) {
        if (!/^image\//.test(file.type) || /svg/.test(file.type)) return res(file);
        var url = URL.createObjectURL(file), img = new Image();
        img.onload = function () {
          var max = 1600, s = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
          var c = document.createElement('canvas'); c.width = Math.round(img.naturalWidth * s); c.height = Math.round(img.naturalHeight * s);
          c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
          c.toBlob(function (b) {
            URL.revokeObjectURL(url);
            res(b && b.size < file.size ? new File([b], file.name.replace(/\.[^.]+$/, '') + '.jpg', { type: 'image/jpeg' }) : file);
          }, 'image/jpeg', 0.82);
        };
        img.onerror = function () { URL.revokeObjectURL(url); res(file); };
        img.src = url;
      });
    }
    function addFiles(slot, files) {
      var list = FILES[slot] = FILES[slot] || [];
      var todo = Array.prototype.slice.call(files || [], 0, Math.max(0, 4 - list.length));
      Promise.all(todo.map(compress)).then(function (out) {
        var totaal = function () { return Object.keys(FILES).reduce(function (n, k) { return n + FILES[k].reduce(function (m, x) { return m + x.file.size; }, 0); }, 0); };
        out.forEach(function (f) { if (f.size < 6 * 1024 * 1024 && totaal() + f.size < 12 * 1024 * 1024) list.push({ file: f, url: URL.createObjectURL(f) }); });
        redrawSlot(slot);
      });
    }
    function redrawSlot(slot) {
      var el = body.querySelector('[data-slot="' + slot + '"]'); if (!el) return;
      var s = STEPS[5].velden[0].slots.filter(function (x) { return x.id === slot; })[0];
      el.outerHTML = upHTML(s);
    }

    // ------------------------------------------------------------ validatie
    function validStep() {
      var ok = true, first = null;
      var mark = function (el, bad) { el.classList.toggle('re-invalid', bad); if (bad) { ok = false; first = first || el; } };
      STEPS[cur].velden.forEach(function (f) {
        if (!shown(f)) return;
        var el = body.querySelector('[data-q="' + f.id + '"]'), bad = false, n;
        if (f.type === 'radio') bad = isReq(f) && !A[f.id];
        else if (f.type === 'checkbox') bad = isReq(f) && !(A[f.id] || []).length;
        else if (f.type === 'number') { n = reaNum(A[f.id]); bad = (isReq(f) && n === null) || (n !== null && ((f.min && n < f.min) || (f.max && n > f.max))) || (!!A[f.id] && n === null); }
        else if (f.type === 'textarea') bad = isReq(f) && !String(A[f.id] || '').trim();
        else if (f.type === 'consent') bad = !A.akkoord;
        else if (f.type === 'groep') inputsOf(f).forEach(function (i) { var v = String(A[i.id] || '').trim(), b = !!v && reaNum(v) === null; markIn(i.id, b); if (b) bad = true; });
        else if (f.type === 'contact') CONTACT.forEach(function (c) {
          var v = String(A[c.id] || '').trim(), b = !v;
          if (v && c.id === 'email') b = !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
          if (v && c.id === 'postcode') b = !/^\d{4}\s?[a-zA-Z]{2}$/.test(v);
          if (v && c.id === 'telefoon') b = v.replace(/\D/g, '').length < 10;
          if (v && c.id === 'huisnummer') b = !/\d/.test(v);
          markIn(c.id, b); if (b) bad = true;
        });
        mark(el, bad);
      });
      if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return ok;
    }
    function markIn(id, bad) { var el = body.querySelector('#rea-' + id); if (el) el.classList.toggle('re-bad', bad); }

    // ------------------------------------------------------------ versturen
    function antwoorden() {
      var out = {};
      STEPS.forEach(function (s) {
        s.velden.forEach(function (f) {
          if (!shown(f)) return;
          if (f.type === 'groep') inputsOf(f).forEach(function (i) { if (A[i.id] !== undefined && A[i.id] !== '') out[i.id] = A[i.id]; });
          else if (f.type === 'contact') CONTACT.forEach(function (c) { out[c.id] = String(A[c.id] || '').trim(); });
          else if (f.type === 'uploads' || f.type === 'consent') return;
          else if (A[f.id] !== undefined && A[f.id] !== '') out[f.id] = A[f.id];
        });
      });
      return out;
    }
    function utm() {
      var o = {};
      try { new URLSearchParams(location.search).forEach(function (v, k) { if (/^utm_|^gclid$|^fbclid$/.test(k)) o[k] = v; }); } catch (e) {}
      return o;
    }
    function send() {
      if (!CONF.webhook) { showMsg('Dit formulier is nog niet gekoppeld (data-webhook ontbreekt).'); return; }
      sending = true;
      var btn = $('next'); btn.disabled = true; btn.textContent = 'Versturen…'; showMsg('');
      var ant = antwoorden(), lokaal = reaBereken(ant);
      var payload = {
        versie: REA_CFG.versie, test: CONF.test, bron: location.origin + location.pathname, utm: utm(),
        verstuurdOp: new Date().toISOString(), akkoord: { privacy: true, tijdstip: new Date().toISOString() },
        website: $('hp').value, antwoorden: ant, indicatieWidget: lokaal
      };
      var fd = new FormData();
      fd.append('data', JSON.stringify(payload));
      Object.keys(FILES).forEach(function (slot) { FILES[slot].forEach(function (f, i) { fd.append(slot + '_' + (i + 1), f.file, slot + '_' + (i + 1) + '.jpg'); }); });
      var ctrl = window.AbortController ? new AbortController() : null;
      var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 45000);
      fetch(CONF.webhook, { method: 'POST', body: fd, signal: ctrl ? ctrl.signal : undefined })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { if (!r.ok || j.ok === false) throw new Error(j.reden || ('HTTP ' + r.status)); return j; }); })
        .then(function (j) {
          clearTimeout(timer);
          var ind = j.indicatie || lokaal;
          track('advies_verstuurd', { advies_type: ind.advies, advies_wens: ant.wens, advies_planning: ant.planning, advies_fotos: Object.keys(FILES).reduce(function (n, k) { return n + FILES[k].length; }, 0) });
          try { localStorage.removeItem(STORE_KEY); } catch (e) {}
          showResult(ind, ant, j.leadId);
        })
        .catch(function (err) {
          clearTimeout(timer); sending = false; btn.disabled = false; btn.textContent = 'Akkoord, stuur mijn advies';
          track('advies_fout', { advies_fout: String(err && err.message || err).slice(0, 80) });
          showMsg('Het versturen is niet gelukt. Probeer het opnieuw, of bel ons op ' + esc(CONF.telefoon) + '.');
        });
    }

    // ------------------------------------------------------------ resultaat
    function showResult(r, ant, leadId) {
      $('progress').innerHTML = STEPS.map(function () { return '<i class="re-done"></i>'; }).join('');
      $('form').outerHTML = '<div class="re-result">' +
        '<div class="re-success-ico">' + I.ok + '</div>' +
        '<h2>Bedankt' + (ant.voornaam ? ', ' + esc(ant.voornaam) : '') + '! Uw adviesaanvraag is ontvangen.</h2>' +
        '<p>Uw persoonlijke adviesrapport is onderweg naar <strong>' + esc(ant.email) + '</strong>. Een adviseur van R&amp;E Installaties neemt binnen 2 werkdagen contact met u op.' + (leadId ? ' Uw referentie: <strong>' + esc(leadId) + '</strong>.' : '') + '</p></div>';
      $('steps').innerHTML = STEPS.map(function (s, i) { return '<li class="re-done"><span class="re-dotnum">✓</span>' + esc(s.kort) + '</li>'; }).join('');
      scrollTop();
    }

    renderStep();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
