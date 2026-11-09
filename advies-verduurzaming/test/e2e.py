import asyncio, json, sys
from playwright.async_api import async_playwright
F="file:///home/claude/re-installaties/advies-verduurzaming/demo/index.html"
OUT="/home/claude/re-installaties/advies-verduurzaming/test/"
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox"])
        for vw in (1300, 390):
            pg = await b.new_page(viewport={"width":vw,"height":900})
            errs=[]; pg.on("pageerror", lambda e: errs.append(str(e)))
            sent={}
            async def route(r):
                u=r.request.url
                if "pdok.nl" in u:
                    await r.fulfill(status=200, content_type="application/json", body=json.dumps({"response":{"docs":[{"straatnaam":"Willem Schoutenstraat","woonplaatsnaam":"Emmen"}]}}))
                elif "n8n.cloud" in u:
                    sent['ct']=r.request.headers.get('content-type'); sent['len']=len(r.request.post_data_buffer or b'')
                    body=(r.request.post_data_buffer or b'').decode('latin-1')
                    sent['hasData']='name="data"' in body; sent['files']=body.count('filename=')
                    await r.fulfill(status=200, content_type="application/json", headers={"access-control-allow-origin":"*"}, body=json.dumps({"ok":True,"leadId":"RE-TEST-1"}))
                elif "fonts.g" in u: await r.abort()
                else: await r.continue_()
            await pg.route("**/*", route)
            await pg.goto(F); await pg.evaluate("localStorage.clear()"); await pg.reload()
            async def nxt(): await pg.click("[data-rea=next]"); await pg.wait_for_timeout(350)
            async def opt(q,t): await pg.click(f"[data-q={q}] .re-opt:has-text('{t}')")
            if vw==1300: await pg.screenshot(path=OUT+"d1.png", full_page=True)
            await nxt(); inv=await pg.evaluate("[...document.querySelectorAll('.re-invalid')].map(e=>e.dataset.q)"); print(vw,"leeg stap1 invalid:",inv)
            await opt("woningtype","Vrijstaand"); await opt("bouwjaar","1990"); await nxt()
            await opt("verwarming","CV-ketel"); await opt("ketelLeeftijd","Ouder dan 10"); await pg.fill("#rea-gasverbruik","1450")
            for t in ("Dakisolatie","Spouwmuur","HR++"): await opt("isolatie",t)
            if vw==1300: await pg.screenshot(path=OUT+"d2.png", full_page=True)
            await nxt()
            await opt("beneden","Vloerverwarming"); await opt("boven","Radiatoren"); await opt("bijverwarming","Houtkachel")
            await pg.fill("#rea-houtKg","800"); await opt("buitenunit","Op de grond"); await opt("afstand","Minder dan 2")
            await nxt()
            await opt("zonnepanelen","Ja"); await pg.fill("#rea-teruglevering","1800"); await pg.fill("#rea-tVast","320"); await opt("accu","advies")
            await nxt()
            await opt("wens","Advies"); await opt("planning","Binnen 3"); await nxt()
            await pg.set_input_files("[data-up=foto_ketel]", [OUT+"d1.png"] if vw==1300 else [])
            await pg.wait_for_timeout(500)
            for k,v in [("voornaam","Jan"),("achternaam","Jansen"),("email","jan@test.nl"),("telefoon","0612345678"),("postcode","7825VV"),("huisnummer","17")]:
                await pg.fill(f"#rea-{k}",v)
            await pg.wait_for_timeout(400)
            print(vw,"adres autofill:", await pg.input_value("#rea-straat"), await pg.input_value("#rea-plaats"))
            await nxt(); print(vw,"zonder akkoord invalid:", await pg.evaluate("[...document.querySelectorAll('.re-invalid')].map(e=>e.dataset.q)"))
            await pg.click("label[for=rea-akkoord]")
            if vw==1300: await pg.screenshot(path=OUT+"d6.png", full_page=True)
            await pg.click("[data-rea=next]"); await pg.wait_for_timeout(1200)
            print(vw,"result:", await pg.locator(".re-result").count(), "sent:", sent)
            dl = await pg.evaluate("(window.dataLayer||[]).map(e=>e.event+(e.advies_stap?':'+e.advies_stap:''))"); print(vw,"dataLayer:",dl)
            await pg.screenshot(path=OUT+f"r{vw}.png", full_page=True)
            print(vw,"errors:",errs)
            await pg.close()
        await b.close()
asyncio.run(main())
