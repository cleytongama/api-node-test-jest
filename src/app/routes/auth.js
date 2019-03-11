const AuthRoute = (app) => {

    const { signin } = app.controllers.auth

    app.route('/auth/signin')
        .post(signin)
}

module.exports = (app) => AuthRoute(app)