const bcrypt = require('bcrypt')
const ValidationError = require('./../errors/ValidationError')
const UserService = ((app) => {
    const query = async () => {
        try {
            const users = await app.db('users').select(['id', 'name', 'mail'])
            return users
        } catch (err) {
            throw new ValidationError('Erro ao listar usuários')
        }
    }
    const findOne = async (filter = {}) => {

        const user = await app.db('users').where(filter).first()

        return user
    }
    const getPasswdHash = async (passwd) => {
        return await bcrypt.hash(passwd, 10)
    }
    const create = async (user) => {

        if (!user.name) throw new ValidationError('Nome é um atributo obrigatório')

        if (!user.mail) throw new ValidationError('Email é um campo obrigatório')

        if (!user.passwd) throw new ValidationError('A senha é uma campo obrigatório')

        const findUser = await findOne({ mail: user.mail })

        if (findUser) throw new ValidationError('Esse email já esta cadastrado na aplicação')

        const newUser = { ...user, passwd: await getPasswdHash(user.passwd) }
        
        return await app.db('users').insert(newUser, ['id', 'name', 'mail'])
    }
    return {
        query,
        findOne,
        create
    }
})

module.exports = (app) => UserService(app)