const UserController = (app) => {

    const controller = {
        query: async (req, res) => {

            const users = await app.db('users').select()

            res.status(200).json(users)
        },
        create: async (req, res) => {
            try {
                const data = req.body
                const user = await app.services.user.create(data)

                return res.status(201).json(user)

            } catch (error) {
                return res.status(400).send({ error: error.message })
            }

        }
    }

    return controller
}

module.exports = (app) => UserController(app)