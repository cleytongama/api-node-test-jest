const UserRouter = (app) => {

    const { query, create } = app.controllers.user
    const { authenticate } = app.middlewares.passport

    app.route('/users')
        .get(query, authenticate())
        .post(create)
}

module.exports = (app) => UserRouter(app)
