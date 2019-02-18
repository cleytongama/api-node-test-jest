const express = require('express')

const morgan = require('morgan')

const consign = require('consign')

const app = express()

//Conexão NOSql::MongoDB
// const mongoose  = require('./database')

// Load App
consign({ cwd: 'src' , verbose:false})
    .include('./middleware')
    .then('./routes')
    .into(app)


// Midlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use('/', (req, res) => {
    res.status(200).send('Rotas Raiz')
})


module.exports = app