const express = require('express')

const morgan = require('morgan')

const consign = require('consign')

const app = express()

const knex = require('knex')

const knexfile = require('./knexfile')

//Conexão Postgress
app.db = knex(knexfile.test)

//Conexão NOSql::MongoDB
// const mongoose  = require('./database')

// Midlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))


// Load App
consign({ cwd: 'src', verbose: false })
    .include('./middleware')
    .then('./services')
    .then('./controllers')
    .then('./routes')
    .into(app)

app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        res.status(400).send({ error: err.message })
    }else{
        res.status(500).send({ error: 'Ops!! Ocorreu algum erro no servidor' })
    }
})

module.exports = app