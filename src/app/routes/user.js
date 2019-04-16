const express =  require('express')

const UserRouter = (app) => {
    const router =  express.Router()
    const { query, create } = app.controllers.user
    const { authenticate } = app.middlewares.passport


    router.get('/', query)
    router.post('/', create)
    // app.route('/users')
    //     .all(authenticate())
    //     .get(query)
    //     .post(create)

    return router
}

module.exports = (app) => UserRouter(app)
