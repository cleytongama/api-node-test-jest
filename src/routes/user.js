const UserRouter = (app) => {

    const { query, create } = app.controllers.user

    app.route('/users')
        .get(query)
        .post(create)
}

module.exports = (app) => UserRouter(app)
