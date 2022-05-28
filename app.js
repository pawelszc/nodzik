const express = require('express')
const axios = require('axios')
const sha1 = require('js-sha1')
const port = 3000
const app = express()
const bodyParser = require('body-parser')
const { json } = require('express/lib/response')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public'))
app.set('views', './views')
app.set('view engine', 'pug')

let date = new Date();
let dataAutoryzacja = date.getFullYear() * 1e4 + (date.getMonth() + 1) * 100 + date.getDate() + ''; // "20211124"
//let dataStart = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' 00:00:00'
let today = new Date()
let startDate = new Date().setDate(-10)
console.log(date)




let sha1Password = sha1('IaIpAWeL1987!!')
let sha1Acces = sha1(dataAutoryzacja+sha1Password)
console.log(sha1Acces)
app.get('/', (req, res) => {
  res.render('index',{title: 'Hey', message: 'Hello there!'})
})

app.get('/manifest',  (req, res, next) => {
  res.send(__dirname + '/manifestPaczki.xml')
  console.log('manifest został pobrany')
})
app.listen(port)


let jsonBody = { "authenticate": {
  "userLogin" : "pawcie111",
  "authenticateKey": sha1Acces
      },
 "params": {
     "ordersStatuses": ["new","finished"],
     "ordersRange":{
         "ordersDateRange": {
             "ordersDateType": "add",
             "ordersDateBegin" : "2022-05-18 00:00:00",
             "ordersDateEnd" : "2022-05-28 00:00:00"
     }
 },
 "resultsPage": 0,
 "resultsLimit": 200
  
}
}
let numerStrony = jsonBody.params.resultsPage
let sum = 0

axios.post('http://megaimport.iai-shop.com/api/?gate=orders/get/152/json',jsonBody)
  .then(response => {
    let data = response.data
    let results = data.Results
    let currencyId = data.Results[0].orderDetails.payments.orderCurrency.currencyId
    let billingCurrencyRate = data.Results[0].orderDetails.payments.orderCurrency.billingCurrencyRate
    let orderProductsCost = data.Results[0].orderDetails.payments.orderCurrency.orderProductsCost
    let orderDeliveryCost = data.Results[0].orderDetails.payments.orderCurrency.orderDeliveryCost
    let iloscStron = data.resultsNumberPage
    /*for (let i = 0 ; i < results.length; i++){
           if (data.Results[i].orderDetails.payments.orderCurrency.currencyId === "EUR") {
            let productCost = data.Results[i].orderDetails.payments.orderCurrency.orderProductsCost 
            let shippingCost =  data.Results[i].orderDetails.payments.orderCurrency.orderDeliveryCost
            let orderSum = productCost + shippingCost
            let plnSum = (orderSum * data.Results[i].orderDetails.payments.orderCurrency.billingCurrencyRate) / 1.19

            sum += plnSum           
            }
            else
            sum += (data.Results[i].orderDetails.payments.orderCurrency.orderProductsCost + data.Results[i].orderDetails.payments.orderCurrency.orderDeliveryCost) /1.23
             }
             */

             
               for (n = 0; n < iloscStron;n++){
                jsonBody.params.resultsPage = n
                axios.post('http://megaimport.iai-shop.com/api/?gate=orders/get/152/json',jsonBody)
                .then(response => {
                  let data = response.data
                  let results = data.Results
                  let currencyId = data.Results[0].orderDetails.payments.orderCurrency.currencyId
                  let billingCurrencyRate = data.Results[0].orderDetails.payments.orderCurrency.billingCurrencyRate
                  let orderProductsCost = data.Results[0].orderDetails.payments.orderCurrency.orderProductsCost
                  let orderDeliveryCost = data.Results[0].orderDetails.payments.orderCurrency.orderDeliveryCost
                  
                  for (let i = 0 ; i < results.length; i++){
                         if (data.Results[i].orderDetails.payments.orderCurrency.currencyId === "EUR") {
                          let productCost = data.Results[i].orderDetails.payments.orderCurrency.orderProductsCost 
                          let shippingCost =  data.Results[i].orderDetails.payments.orderCurrency.orderDeliveryCost
                          let orderSum = productCost + shippingCost
                          let plnSum = (orderSum * data.Results[i].orderDetails.payments.orderCurrency.billingCurrencyRate) / 1.19
              
                          sum += plnSum        
                          
                          }
                          else
                          sum += (data.Results[i].orderDetails.payments.orderCurrency.orderProductsCost + data.Results[i].orderDetails.payments.orderCurrency.orderDeliveryCost) /1.23
                          

                        }
                           
                        console.log(sum)
               })   
               

             }
             
   
  })
    
