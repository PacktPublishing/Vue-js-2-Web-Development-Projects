import { Users } from '../providers'

export function getById (id) {
  return Users.findOne({ _id: id })
}

export async function findOrCreate (data) {
  const { profile } = data
  const user = await getById(profile.id)
  if (user) {
    Users.updateOne({
      _id: user._id,
    }, data)
    console.log(user, data)
    return {
      ...user,
      ...data,
    }
  } else {
    const result = await Users.insert({
      _id: profile.id,
      ...data,
    })

    return result
  }
}
