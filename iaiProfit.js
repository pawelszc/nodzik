const axios = require('axios');
const options1 = {
  method: 'POST',
  url: 'https://megaimport.pl/api/admin/v1/orders/orders/get',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    'X-API-KEY': 'YXBwbGljYXRpb24xOm9najA1UWVvYnc2MFk1QmdtOEk5eUEyUklkWTBPTml0MWs5dTVkK0VzWVFqMklCeFJGY3VqcUFFME5iK0ExK3Y'
  },
  data: {
    params: {
      ordersRange: {
        ordersDateRange: {
          ordersDateType: 'dispatch',
          ordersDateBegin: '2023-11-24 00:00:00',
          ordersDateEnd: '2023-11-25 00:00:00'
        }
      },
      ordersStatuses: ['new', 'finished']
    }
  }
};


async function hello () {
  let orders = await axios.request(options1)
  let data = orders.data.Results


  let array = data.map((value)=>{
    let serials = value.orderSerialNumber
    let source = value.orderDetails.orderSourceResults.orderSourceDetails.orderSourceName
    return {serials:serials,source:source}

    
  })
  for (let i = 0; i<array.length;i++){
    let orderSerial = array[i].serials
    
    let options2 = {
      method: 'GET',
      url: `https://megaimport.pl/api/admin/v1/orders/profitability?orderSerialNumber=${orderSerial}`,
      headers: {
        accept: 'application/json',
        'X-API-KEY': 'YXBwbGljYXRpb24xOm9najA1UWVvYnc2MFk1QmdtOEk5eUEyUklkWTBPTml0MWs5dTVkK0VzWVFqMklCeFJGY3VqcUFFME5iK0ExK3Y'
      }
    }
  let profit = await axios.request(options2)  
  let data = profit.data.profitMarginPercent
  console.log(array[i])
  console.log(data)
  
  }

}
hello()