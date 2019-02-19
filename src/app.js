const express = require('express')

const morgan = require('morgan')

const consign = require('consign')

const app = express()

const knex = require('knex')

const knexfile =  require('./knexfile')

const indexRouter = require('./routes')

//Conexão Postgress
app.db = knex(knexfile.test)

//Conexão NOSql::MongoDB
// const mongoose  = require('./database')

// Midlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// Load App
consign({ cwd: 'src' , verbose:false})
    .include('./middleware')
    .then('./controllers')
    .then('./routes')
    .into(app)

module.exports = app