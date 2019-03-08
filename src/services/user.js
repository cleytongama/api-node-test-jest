const ValidationError = require('./../errors/ValidationError')

const UserService = (app) => {
    return {
        query: async () => {
            try {
                const users = await app.db('users').select()
                return users
            } catch (err) {
                throw new ValidationError('Erro ao listar usuários')
            }
        },
        create: async (user) => {

            if (!user.name)
                throw new ValidationError('Nome é um atributo obrigatório')

            if (!user.mail)
                throw new ValidationError('Email é um campo obrigatório')

            if (!user.passwd)
                throw new ValidationError('A senha é uma campo obrigatório')

            const findUser = await app.db('users').where({ mail: user.mail }).first()

            if (findUser)
                throw new ValidationError('Esse email já esta cadastrado na aplicação')

            return await app.db('users').insert(user, '*')
        }
    }
}

module.exports = (app) => UserService(app)