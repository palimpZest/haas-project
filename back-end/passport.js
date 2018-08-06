let JwtStrategy = require('passport-jwt').Strategy
let ExtractJwt = require('passport-jwt').ExtractJwt

// load up the user model
let User = require('./models/User')
let settings = require('./config') // get config file

module.exports = function (passport) {
  let opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
  opts.secretOrKey = settings.secret
  passport.use(
    new JwtStrategy(opts, function (jwtPayload, done) {
      User.findOne({ id: jwtPayload.id }, function (err, user) {
        if (err) {
          return done(err, false)
        }
        if (user) {
          done(null, user)
        } else {
          done(null, false)
        }
      })
    })
  )
}
