const express = require('express')

const AuthRoute = (app) => {

    const router = express.Router()
    
    const { signin } = app.controllers.auth
    const { create } = app.controllers.user

    router.post('/signin', signin)

    router.post('/signup', create)

    return router
}

module.exports = (app) => AuthRoute(app)