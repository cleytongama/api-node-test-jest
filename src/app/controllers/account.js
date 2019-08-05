const AccountController = (app) => {
    return {
        query: async(req, res, next) => {
            try {
                const accounts = await app.services.account.query(req.user.id)
                return res.status(200).send(accounts)

            } catch (error) {
                return next(error)
            }
        },
        getById: async(req, res, next) => {
            try {
                const accountId = req.params.id
                const account = await app.services.account.getById({
                    id: accountId
                })
                return res.status(200).send(account)
            } catch (error) {
                return next(error)
            }
        },
        create: async(req, res, next) => {
            try {
                const data = req.body;
                const account = await app.services.account.create({
                    ...data,
                    user_id: req.user.id
                })
                return res.status(201).send(account)
            } catch (error) {
                return next(error)
            }
        },
        update: async(req, res, next) => {
            try {
                const id = req.params.id
                const data = req.body
                const account = await app.services.account.update(id, data)
                return res.status(200).send(account)
            } catch (error) {
                return next(error)
            }
        },
        remove: async(req, res, next) => {
            try {
                const id = req.params.id
                const account = await app.services.account.remove(id)
                return res.status(204).send()
            } catch (error) {
                return next(error)
            }
        }
    }
}

module.exports = (app) => AccountController(app)