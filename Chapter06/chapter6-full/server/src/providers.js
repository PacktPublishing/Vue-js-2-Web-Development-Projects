import { collectionFactory, modelFactory } from './utils/database'

const idIndex = {
  fieldName: '_id',
  unique: true,
}

export const Users = modelFactory(collectionFactory('users', idIndex))
export const Posts = modelFactory(collectionFactory('posts', idIndex))

// Init
export async function initData () {

}
