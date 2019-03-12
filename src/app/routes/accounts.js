const AccountRouter = (app) => {

    const { create, query, getById, update, remove } = app.controllers.account
    const { authenticate } = app.middlewares.passport
    
    app.route('/accounts')
        .all(authenticate())
        .post(create)
        .get(query)

    app.route('/accounts/:id')
        .all(authenticate())
        .get(getById)
        .put(update)
        .delete(remove)
}

module.exports = (app) => AccountRouter(app)