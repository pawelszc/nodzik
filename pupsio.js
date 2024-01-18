const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const baseUrl = 'https://prajo.eu/pl/2-oferta';
    let pageIndex = 1;
    await page.goto(`https://prajo.eu/pl/akcesoria-kuchenne/3822-p3822-kh1827-waga-lazienkowa-czarna-5908287218277.html`, { waitUntil: 'networkidle2' });
    const products = [];
    const productData = await page.evaluate(() => {
        const code = document.querySelector('.product-reference span').innerText.trim();
        const images = Array.from(document.querySelectorAll('#thumb-gallery img')).map(img => img.getAttribute('data-image-large-src'));
        return { code, images };
    });
    await console.log(productData)
    
    await browser.close();
})();

