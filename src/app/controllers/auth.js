const bcrypt = require('bcrypt')
const ValidationError = require('./../errors/ValidationError')
const AuthController = ((app) => {
    const signin = async (req, res, next) => {

        try {

            const { findOne } = app.services.user
            const { generateToken, comparePasswd } = app.services.auth

            const user = await findOne({ mail: req.body.mail })

            if (!user)
                throw new ValidationError('Email incorreto, por favor tentar novamente')

            if (!await comparePasswd(req.body.passwd, user.passwd))
                throw new ValidationError('Senha incorreta, por favor tentar novamente')

            const token = await generateToken({
                id: user.id,
                name: user.name,
                mail: user.mail
            })

            return res.status(200).send({ token: token })
        } catch (error) {
            return next(error)
        }
    }

    return {
        signin
    }
})

module.exports = (app) => AuthController(app)