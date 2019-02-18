const mongoose = require('mongoose')

mongoose.connect('mongodb://barrigadb:barrigadb123@ds029297.mlab.com:29297/db-barriga', {
    useCreateIndex: true,
    useNewUrlParser: true
})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'Errro ao conectar com o banco'))

db.once('open', () => console.log(`Conexão com o banco estabelecida com sucesso :: ${new Date()}`))

module.exports = mongoose