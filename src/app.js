const express = require('express')

const morgan = require('morgan')

const consign = require('consign')

const app = express()

const indexRouter = require('./routes/index.router')

//Conexão NOSql::MongoDB
// const mongoose  = require('./database')

app.use('/', indexRouter)

// // Load App
consign({ cwd: 'src' , verbose:false})
    .include('./middleware')
    .then('./routes/users.js')
    .into(app)


// Midlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

module.exports = app