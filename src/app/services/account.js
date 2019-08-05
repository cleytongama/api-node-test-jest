const ValidationError = require('./../errors/ValidationError')

const AccountService = ((app) => {

    const query = async(user_id) => {
        return await app.db('accounts').where({ user_id })
    }
    const create = async(account) => {

        if (!account.name)
            throw new ValidationError('Nome é um atributo obrigatório')

        return await app.db('accounts').insert(account, '*')
    }
    const getById = async(filter = {}) => {
        return await app.db('accounts').where(filter).first()
    }
    const update = async(id, account) => {
        return await app.db('accounts').where({
            id
        }).update(account, '*')
    }
    const remove = async(id) => {
        return await app.db('accounts').where({ id }).del()
    }

    //Methods publics
    return {
        query,
        create,
        getById,
        update,
        remove
    }
})

module.exports = (app) => AccountService(app)