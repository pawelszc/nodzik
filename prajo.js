
const fs = require('fs');

const cheerio = require('cheerio');
let products =[]
fetch("https://b2b.prajo.eu/module/ceneoxml/xml")
.then( res => res.text())
.then((res)=> {
    const $ = cheerio.load(res, { xmlMode: true })
    let array = $('o')
    array.each((index, el) => {
        let stockValue = parseInt($(el).attr('stock'))
        let price = parseFloat($(el).attr('price'));
        let dividedPrice = price / 1.23
        let finalPrice = dividedPrice * 0.90
        let amazonPrice = (((finalPrice / 4.35 ) + 4.5) * 1.19) * 1.67
    
        if (stockValue > 10) {
            products.push({
                productSizeCodeExternal: $(el).find('attrs a[name="Kod_producenta"]').text().trim(),
                stockId: 0,
                productSizeQuantity: stockValue,
                //productPurchasePriceNet: amazonPrice.toFixed(2)
            })
        } 
        else {
          products.push({
            productSizeCodeExternal: $(el).find('attrs a[name="Kod_producenta"]').text().trim(),
            stockId: 0,
            productSizeQuantity: 0,
           // productPurchasePriceNet: amazonPrice.toFixed(2)
        })
        }
    })
    
  

}) 
    .then((res)=> {
      /*
        fs.writeFile('products.json', JSON.stringify(products, null, 2), err => {
          if (err) console.log('Error writing file:', err)
      }) */
        /// chunks option
        
      let chunks = [];
      for (let i = 0; i < products.length; i += 100) {
        chunks.push(products.slice(i, i + 100));
      }
      for (const chunk of chunks) {
        let options = {
          method: 'PUT',
          headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            'X-API-KEY': 'YXBwbGljYXRpb24xOm9najA1UWVvYnc2MFk1QmdtOEk5eUEyUklkWTBPTml0MWs5dTVkK0VzWVFqMklCeFJGY3VqcUFFME5iK0ExK3Y='
          },
          body: JSON.stringify({
            params: {
              products: chunk
            }
          })
        }


       fetch('https://megaimport.pl/api/admin/v1/products/stockQuantity', options).then(response => response.json())
       .then(response => console.log(response))
       .catch(err => console.error(err))

      } 
        }
        )    

