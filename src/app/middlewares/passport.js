const passport = require('passport')
const passportJwt = require('passport-jwt')

const secrect = '123123'

const { Strategy, ExtractJwt } = passportJwt

const PassportMiddleware = ((app) => {

    const params = {
        secretOrKey: secrect,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const strategy = new Strategy(params, async (payload, done) => {
        try {
            
            const user = await app.services.user.findOne({ id: payload.id })

            if (user) done(null, user);

            else done(null, false);

        } catch (err) {
            done(err);
        }
    })

    passport.use(strategy);

    return {
        authenticate: () => passport.authenticate('jwt', { session: false })
    }
})

module.exports = (app) => PassportMiddleware(app)