const mongoose = require('mongoose')
const express = require('express')

const app = express()
const url = "mongodb://localhost/trees";


mongoose.connect(url,{useNewUrlParser :true, useFindAndModify :false, useUnifiedTopology: true})

const con = mongoose.connection

app.use(express.json())

con.on('open',() =>{console.log('connected')})

const plants = require('./trees')
app.use('/trees',plants)

app.listen(3000, () =>{console.log('Server started')})



