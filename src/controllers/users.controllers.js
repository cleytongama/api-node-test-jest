const UserController = () => {
    return {
        query: (req, res) => {
            const users = [
                {
                    name: "cleyton",
                    idade: 20
                }
            ]

            res.status(200).json(users)
        },
        create: (req, res) => {
            res.status(200).json(req.body)
        }
    }
}

module.exports = UserController