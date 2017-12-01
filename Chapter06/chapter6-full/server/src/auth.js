import passport from 'passport'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'
import * as Users from './connectors/users'
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, PUBLIC_URL } from './config'

passport.use(new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `${PUBLIC_URL}/auth/google/callback`,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await Users.findOrCreate({
        profile: {
          id: profile.id,
          displayName: profile.displayName,
          photos: profile.photos,
        },
        accessToken,
        refreshToken,
      })
      done(null, user)
    } catch (e) {
      done(e)
    }
  }
))

passport.serializeUser(
  (user, done) => {
    done(null, user._id)
  }
)

passport.deserializeUser(
  async (id, done) => {
    const user = await Users.getById(id)
    const err = !user ? new Error('User not found') : null
    done(err, user || null)
  }
)
