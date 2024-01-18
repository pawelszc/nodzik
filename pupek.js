const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const baseUrl = 'https://prajo.eu/pl/2-oferta';
    let pageIndex = 1;
    let hasNextPage = true;
    const products = [];

    while (hasNextPage) {
        await page.goto(`${baseUrl}?page=${pageIndex}`, { waitUntil: 'networkidle2' });
        await console.log(pageIndex)
        // Check if there is a next page
        hasNextPage = 
        await page.evaluate(() => {
            const nextPageButton = document.querySelector('.page-list a.next');
            
            return nextPageButton !== null;
            
        }); 
        

        // Extract product page URLs
        const productLinks = await page.evaluate(() => {
            const links = Array.from(document.querySelectorAll('.product-miniature a.product-thumbnail'));
            return links.map(link => link.href);
        });

        for (const link of productLinks) {
            await page.goto(link, { waitUntil: 'networkidle2' });

            const productData = await page.evaluate(() => {
            let images = [];
            document.querySelectorAll('.slick-slide').forEach(slide => {
            const index = parseInt(slide.getAttribute('data-slick-index'), 10);
            if (index > -1) {
                const imageUrl = slide.querySelector('img').getAttribute('data-image-large-src');
                if (!images.includes(imageUrl)) { // Check if URL is not already in the array
                    images.push(imageUrl); // Add new URL to the array
                }
                
                
            }
        })
                const code = document.querySelector('.product-reference span').innerText.trim();
                const name = document.querySelector('.product-detail-name').innerHTML.trim()
                const desc = document.querySelector('.product-description').innerHTML.trim()

                return { code,name, desc,  images };
            });

            products.push(productData);
        }

        pageIndex++;
    }

    // Save to a JSON file
    fs.writeFile('products.json', JSON.stringify(products, null, 2), err => {
        if (err) console.log('Error writing file:', err);
    });

    await browser.close();
})();

