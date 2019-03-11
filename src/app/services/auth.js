const jwt = require('jsonwebtoken')
const bcrypt  = require('bcrypt')

const AuthService = (() => {

    const generateToken = async (payload) => {
        return await jwt.sign(payload, '123123')
    }
    
    const comparePasswd = async (passwd, hash) => {
        return await bcrypt.compare(passwd, hash)
    }

    return {
        generateToken,
        comparePasswd
    }
})


module.exports = (app) => AuthService(app)