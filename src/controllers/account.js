const AccountController = (app) => {
    return {
        query: async (req, res) => {
            const accounts = await app.services.account.query()

            return res.status(200).send(accounts)
        },
        getById: async (req, res) => {
            const accountId = req.params.id
            const account = await app.services.account.getById({
                id: accountId
            })
            return res.status(200).send(account)
        },
        create: async (req, res) => {
            try {
                const data = req.body
                const account = await app.services.account.create(data)
                return res.status(201).send(account)
            } catch (error) {
                return res.status(400).send({ error: error.message })
            }
        },
        update: async (req, res) => {
            const id = req.params.id
            const data = req.body
            const account = await app.services.account.update(id, data)
            return res.status(200).send(account)
        },
        remove: async (req, res) => {
            const id = req.params.id
            const account = await app.services.account.remove(id)
            return res.status(204).send()
        }
    }
}

module.exports = (app) => AccountController(app)