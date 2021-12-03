const express = require('express')
const port = 3000
const app = express()
app.get('/' , (req , res) => {
    res.send('This is my app')
})

app.listen(port)