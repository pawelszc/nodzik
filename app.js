const express = require('express')
const port = 3000
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/checker', (req, res) => {
  console.log(req.body)
  res.send(req.body)
  
})

app.get('/', (req, res) => {
    res.send('Witaj w mojej apce')

})

app.get('/manifest', function (req, res, next) {
  res.download(__dirname + '/manifestPaczki.xml')
  console.log('manifest został pobrany')
})


app.listen(port)
