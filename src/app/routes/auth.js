const AuthRoute = (app) => {

    const { signin } = app.controllers.auth
    const { create } = app.controllers.user

    app.route('/auth/signin')
        .post(signin)

    app.route('/auth/signup')
        .post(create)
}

module.exports = (app) => AuthRoute(app)