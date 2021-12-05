const express = require('express')
const port = 3000
const app = express()

app.get('/paczki', (req, res) =>{
    console.log('coś tu przyszło')
})
app.get('/manifest', function (req, res, next) {
  res.download('/Users/pawelcieslak/Documents/Dokumenty — MacBook Air (Paweł)/kody/nodzik/manifestPaczki.xml')  
})

app.listen(port)