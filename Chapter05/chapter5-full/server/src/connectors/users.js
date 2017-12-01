import bcrypt from 'bcrypt'
import { Users } from '../providers'
import * as Tickets from './tickets'

const SALT_ROUNDS = 10

export async function getById (id) {
  return await Users.findOne({ _id: id })
}

export async function getByUsername (username) {
  return await Users.findOne({ username })
}

export async function isPasswordMatching (user, password) {
  return await bcrypt.compare(password, user.password)
}

export async function hashPassword (password) {
  return await bcrypt.hash(password, SALT_ROUNDS)
}

export async function createUser ({ username, email, password }) {
  const user = await getByUsername(username)
  if (user) {
    throw new Error('Duplicate username')
  } else {
    const hash = await hashPassword(password)
    const result = await Users.insert({
      username,
      email,
      password: hash,
    })

    Tickets.create({ user: result }, {
      title: 'Welcome',
      description: 'Welcome to our support center!',
    })

    return result
  }
}
