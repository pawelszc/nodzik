const axios = require('axios')
const sha1 = require('js-sha1')
let date = new Date();
let dataAutoryzacja = date.getFullYear() * 1e4 + (date.getMonth() + 1) * 100 + date.getDate() + ''; // "20211124"
let sha1Password = sha1('IaIpAWeL1987!!')
let sha1Acces = sha1(dataAutoryzacja+sha1Password)
console.log(sha1Acces)
let jsonBody = { 
  "authenticate": {
    "userLogin" : "pawcie111",
    "authenticateKey": sha1Acces
  },
 "params": {
     "ordersStatuses": ["new","finished"],
     "ordersRange":{
        "ordersDateRange": {
            "ordersDateType": "add",
            "ordersDateBegin" : "2023-05-29 00:00:00",
            "ordersDateEnd" : "2023-06-07 00:00:00"
          }
      },
 "resultsPage": 0,
 "resultsLimit": 200
  } 
}

async function get (){
  let iloscStron = await axios.post('http://megaimport.iai-shop.com/api/?gate=orders/get/152/json',jsonBody).then(
    res => {
      let data = res.data.Results
      console.log('hello')
      let iloscStron = data.resultsNumberPage
      return iloscStron
    }
  )

}
/*function postPost(){
  
// check how many pages are to download
  axios.post('http://megaimport.iai-shop.com/api/?gate=orders/get/152/json',jsonBody)
  .then(response => {
    let sum = 5 
    let data = response.data
    let iloscStron = data.resultsNumberPage
     for (n = 0; n < iloscStron;n++){
       jsonBody.params.resultsPage = n
       
                
                axios.post('http://megaimport.iai-shop.com/api/?gate=orders/get/152/json',jsonBody)
                .then(response => {
                  let data = response.data
                  let results = data.Results
                  for (let i = 0 ; i < results.length; i++){
                    let productCost = results[i].orderDetails.payments.orderCurrency.orderProductsCost 
                    let shippingCost =  results[i].orderDetails.payments.orderCurrency.orderDeliveryCost
                    let orderSum = productCost + shippingCost
                    
                    if (data.Results[i].orderDetails.payments.orderCurrency.currencyId === "EUR") {
                        sum += orderSum * data.Results[i].orderDetails.payments.orderCurrency.billingCurrencyRate / 1.19
                        
                          }
                    else
                        sum += (data.Results[i].orderDetails.payments.orderCurrency.orderProductsCost + data.Results[i].orderDetails.payments.orderCurrency.orderDeliveryCost) /1.23
                        } 
                        
               })
             } 
             console.log(sum)
  })

 }
 postPost() */
get()
//module.exports = {postPost}