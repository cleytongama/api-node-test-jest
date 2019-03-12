const UserRouter = (app) => {

    const { query, create } = app.controllers.user
    const { authenticate } = app.middlewares.passport

    app.route('/users')
        .all(authenticate())
        .get(query)
        .post(create)
}

module.exports = (app) => UserRouter(app)
