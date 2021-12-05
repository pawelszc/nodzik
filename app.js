const express = require('express')
const port = process.env.PORT || 3000
const app = express()


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', function (req, res, next) {
  res.json(req.headers)
})

app.listen(port)