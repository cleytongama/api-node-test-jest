const UserController = (app) => {

    const controller = {
        query: async (req, res) => {

            const users = await app.db('users').select()

            res.status(200).json(users)
        },
        create: async (req, res) => {

            const data = req.body

            if (!data.name)
                return res.status(400).send({ error: 'Nome é um atributo obrigatório' })

            if (!data.mail)
                return res.status(400).send({ error: 'Email é um campo obrigatório' })

            if (!data.passwd)
                return res.status(400).send({ error: 'A senha é uma campo obrigatório' })

            const findUser = await app.db('users').where({ mail: data.mail }).first()

            if (findUser)
                return res.status(400).send({ error: 'Esse email já esta cadastrado na aplicação' })

            const user = await app.db('users').insert(data, '*')

            return res.status(201).json(user)
        }
    }

    return controller
}

module.exports = (app) => UserController(app)