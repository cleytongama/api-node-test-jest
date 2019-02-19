const UserRouter = (app) => {

    const { query, create } = app.controllers.user

    return app.route('/users')
        .get(query)
        .post(create)
}

module.exports = (app) => UserRouter(app)
