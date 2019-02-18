
module.exports = (app) => {
    
    const { query, create } = require('./../controllers/users.controllers')(app)

    app.route('/users')
    .get(query)
    .post(create)
}
