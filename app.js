const express = require('express')
const port = 3000
const app = express()

app.get('/paczki', (req, res) =>{
    console.log('coś tu przyszło')
})
app.get('/manifest', function (req, res, next) {
  res.sendFile(__dirname + '/manifestPaczki.xml')
  console.log('1:' + req.baseUrl)  
  console.log('2:' + req.headers)
  console.log('3:' + req.params)
  console.log('4:' + req.body) 
})

app.listen(port)
