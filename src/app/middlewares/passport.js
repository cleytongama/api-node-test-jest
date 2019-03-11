const passport = require('passport')
const passportJwt = require('passport-jwt')

const secrect = '123123'

const { Strategy, ExtractJwt } = passportJwt

const PassportMiddleware = ((app) => {

    const params = {
        secretOrKey: secrect,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true
    }

    const strategy = new Strategy(params, (req, payload, done) => {

        console.log(req)
        console.log(payload)
        app.services.user.findOne({ id: payload.id })
            .then((user) => {
                if (user) done(null, { ...payload })

                else done(null, false)
            }).catch(err => done(null, false))
        // try {
        //     const user = await app.services.user.findOne({ id: payload.id })

        //     console.log(user, payload)
        //     if (user) done(null, { ...payload })

        //     else done(null, false)
        // } catch (error) {
        //     console.log(error)
        //     done(error, false)
        // }
    })

    passport.use(strategy)

    return {
        authenticate: () => passport.authenticate('jwt', { session: false }, (a) => console.log(a))
    }
})

module.exports = (app) => PassportMiddleware(app)