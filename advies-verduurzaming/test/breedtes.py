import asyncio, json
from playwright.async_api import async_playwright
F="file:///home/claude/re-installaties/advies-verduurzaming/demo/index.html"
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path="/usr/bin/google-chrome",args=["--no-sandbox"])
        pg=await b.new_page(viewport={"width":1400,"height":1000})
        await pg.route("**/*", lambda r: r.abort() if "fonts.g" in r.request.url else r.continue_())
        await pg.goto(F)
        await pg.evaluate("localStorage.setItem('re_advies_v1', JSON.stringify({woningtype:'Vrijstaand',bouwjaar:'Na 2012',verwarming:'CV-ketel (gas)',gasverbruik:'1200',isolatie:['Dakisolatie'],boven:['Warmeluchtverwarming'],ketelLeeftijd:'5 tot 10 jaar'}))")
        await pg.reload()
        for i in range(2): await pg.click("[data-rea=next]"); await pg.wait_for_timeout(300)
        for w in (1200, 860, 340):
            await pg.evaluate(f"document.querySelector('.demo-wrap').style.maxWidth='{w}px'")
            await pg.wait_for_timeout(200)
            over = await pg.evaluate("""(()=>{const r=document.getElementById('re-adviesformulier').getBoundingClientRect();
              const bad=[...document.querySelectorAll('#re-adviesformulier *')].filter(e=>{const b=e.getBoundingClientRect();return b.width&&(b.right>r.right+1||b.left<r.left-1)}).map(e=>e.className||e.tagName).slice(0,5);
              const opt=[...document.querySelectorAll('.re-opt')].filter(o=>o.scrollWidth>o.clientWidth+1).map(o=>o.textContent.trim()).slice(0,3);
              return JSON.stringify({w:Math.round(r.width),buiten:bad,tegelOverflow:opt})})()""")
            print(over)
            await pg.screenshot(path=f"/home/claude/re-installaties/advies-verduurzaming/test/s3w{w}.png", full_page=False)
        await b.close()
asyncio.run(main())
