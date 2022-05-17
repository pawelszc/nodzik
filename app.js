const express = require('express')
const sha1 = require('js-sha1')
const port = 3000
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public'))



const date = new Date();
let datka = date.getFullYear() * 1e4 + (date.getMonth() + 1) * 100 + date.getDate() + ''; // "20211124"
let sha1Password = sha1('IaIpAWeL1987!!')
let sha1Acces = sha1(datka+sha1Password)
console.log(sha1Acces)


app.get('/', (req, res)=>{
  res.send('sdfsdfsdfsdfsdfsdf' )
})

app.get('/manifest',  (req, res, next) => {
  res.send(__dirname + '/manifestPaczki.xml')
  console.log('manifest został pobrany')
})
app.listen(port)