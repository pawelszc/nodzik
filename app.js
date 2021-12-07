const { json } = require('express')
const express = require('express')
const port = 3000
const app = express()
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
    res.send('to jest zwykły tekst od res.send()')
    res.json(req.body)
    console.log(req.body)
})

app.get('/manifest', function (req, res, next) {
  res.download(__dirname + '/manifestPaczki.xml')
  console.log('manifest został pobrany')
})

app.get('/paczki', (req, res) => {
    res.send('<html><body><p>Joł joł joł tu tede</p></body></html>')
})

app.listen(port)
