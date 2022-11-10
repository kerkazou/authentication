const express = require('express')
const app = express()
require('dotenv').config();

app.get('/', function (req, res) {
  res.send({ok: process.env.PORT})
})

// Port
const port = process.env.PORT || 9001;
app.listen(port, ()=> 
    console.log(`Server running on http://localhost:${port}`)
);