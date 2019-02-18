
const { query, create } = require('./../controllers/users.controllers')()

module.exports = (app) => {
    app.route('/users')
    .get(query)
    .post(create)
}
