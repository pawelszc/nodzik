const { json } = require('express')
const express = require('express')
const port = 3000
const app = express()
const manifest = 
app.get('/', (req, res) => {
    console.log(req.body)
    console.log('coś tu przyszło')
})
app.get('/manifest', function (req, res, next) {
  res.download(__dirname + '/manifestPaczki.xml')

  console.log('1:' + JSON.stringify(req.body))
  console.log('2:' + JSON.stringify(req.params))
  console.log('3:' + JSON.stringify(req.body)) 
})

app.listen(port)
