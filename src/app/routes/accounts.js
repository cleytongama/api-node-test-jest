const AccountRouter = (app) => {

    const { create, query, getById, update, remove } = app.controllers.account

    app.route('/accounts')
        .post(create)
        .get(query)

    app.route('/accounts/:id')
        .get(getById)
        .put(update)
        .delete(remove)
}

module.exports = (app) => AccountRouter(app)