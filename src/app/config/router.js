const express = require('express')

module.exports = (app) => {
    
    const { authenticate } = app.middlewares.passport

    // const protectedRouter =  express.Router()

    app.use('/auth', app.routes.auth)

    app.use('/accounts', authenticate(), app.routes.accounts)

    app.use('/users', authenticate(), app.routes.user)

    // app.use('/v1', authenticate(), protectedRouter)
}