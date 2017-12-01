import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import * as Users from './connectors/users'

async function authUser (username, password) {
  const user = await Users.getByUsername(username)
  let valid = false
  if (user) {
    valid = await Users.isPasswordMatching(user, password)
  }
  return {
    valid,
    user,
  }
}

passport.use('local', new LocalStrategy(
  async (username, password, done) => {
    const { valid, user } = await authUser(username, password)
    if (valid) {
      return done(null, user)
    } else {
      return done('Invalid username or password')
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
