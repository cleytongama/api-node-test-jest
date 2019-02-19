const IndexRouter = (app) => {
    return app.route('/')
        .get((req, res) => {
            return res.status(200).send({ menssage: 'Index app' })
        })
}

module.exports = (app) => IndexRouter(app)
