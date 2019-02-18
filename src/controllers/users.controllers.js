const UserController = (app) => {

    const controller = {
        query: async (req, res) => {

            const users =  await app.db('users').select()
        
            res.status(200).json(users)
        },
        create:  (req, res) => {
            
            const data  = req.body

            // const user = await app.db('users').insert(data, '*')

            res.status(201).json(req.body)
        }
    }

    return controller
}

module.exports = UserController