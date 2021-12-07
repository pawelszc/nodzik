const { json } = require('express')
const express = require('express')
const port = 3000
const app = express()

app.get('/', (req, res) => {
    res.send(req.body, req, req.headers)
    console.log('coś tu przyszło')
})

app.get('/manifest', function (req, res, next) {
  res.download(__dirname + '/manifestPaczki.xml')
  console.log('manifest został pobrany')
})

app.get('/paczki', (req, res) => {
    res.send('<html><body><p>Joł joł joł tu tede</p></body></html>')
})

app.listen(port)
