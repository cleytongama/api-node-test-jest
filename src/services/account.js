const ValidationError = require('./../errors/ValidationError')

const AccountService = (app) => {
    return {
        query: async () => {
            return await app.db('accounts').select()
        },
        create: async (account) => {

            if (!account.name)
                throw new ValidationError('Nome é um atributo obrigatório')

            return await app.db('accounts').insert(account, '*')
        },
        getById: async (filter = {}) => {
            return await app.db('accounts').where(filter).first()
        },
        update: async (id, account) => {
            return await app.db('accounts').where({
                id
            }).update(account, '*')
        },
        remove: async (id) => {
            return await app.db('accounts').where({ id }).del()
        }
    }
}

module.exports = (app) => AccountService(app)