const express = require('express')
const morgan = require('morgan')
const consign = require('consign')
const app = express()
const knex = require('knex')
const knexfile = require('./knexfile')

//Conexão Postgress
app.db = knex(knexfile.test)

// Midlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// Load App
consign({ cwd: 'src/app', verbose: false })
    .include('./middlewares')
    .then('./services')
    .then('./controllers')
    .then('./routes')
    .into(app)

app.use((err, req, res, next) => {
    const { name, message, stack } = err

    if (name === 'ValidationError') {
        return res.status(400).send({ error: message })
    } else {
        return res.status(500).send({ name, message, stack })
    }
})

module.exports = app