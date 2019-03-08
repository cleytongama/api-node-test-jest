const UserController = (app) => {

    const controller = {
        query: async (req, res, next) => {
            try {
                const users = await app.services.user.query()
                return res.status(200).json(users)
            } catch (error) {
                return next(error)
            }
        },
        create: async (req, res, next) => {
            try {
                const data = req.body
                const user = await app.services.user.create(data)

                return res.status(201).json(user)

            } catch (error) {
                return next(error)
            }

        }
    }

    return controller
}

module.exports = (app) => UserController(app)