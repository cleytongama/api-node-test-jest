const express = require('express')

const AccountRouter = (app) => {

    const router =  express.Router()
    const { create, query, getById, update, remove } = app.controllers.account
    
    router.post('/', create)
    router.get('/', query)
    router.get('/:id', getById)
    router.put('/:id', update)
    router.delete('/:id', remove)

    return router
}

module.exports = (app) => AccountRouter(app)