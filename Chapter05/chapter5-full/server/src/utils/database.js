import path from 'path'
import Datastore from 'nedb'

import { promiseMethod } from '../utils/promise'

const DB_PATH = process.env.DB_PATH || './db'
const COMPACTION_INTERVAL = process.env.COMPACTION_INTERVAL || 12 * 60 * 60 * 1000

export function getCollectionPath (name) {
  return path.join(DB_PATH, `${name}.db`)
}

const defaultFindQuery = {
  removed: { $ne: true },
}

// Factories

export function collectionFactory (name, index = null, persistence = true) {
  const options = {}

  if (persistence) {
    Object.assign(options, {
      filename: getCollectionPath(name),
      autoload: true,
    })
  }

  const collection = new Datastore(options)

  if (index !== null) {
    const indexes = !Array.isArray(index) ? [index] : index
    indexes.forEach(index => {
      collection.ensureIndex(index)
    })
  }

  if (persistence) {
    collection.persistence.setAutocompactionInterval(COMPACTION_INTERVAL)
  }

  return collection
}

export function cursorFactory (collection, query, options) {
  const opts = Object.assign({}, {
    sort: null,
    skip: null,
    limit: null,
    fields: undefined,
  }, options)

  let cursor = collection.find(query, opts.fields)

  if (opts.sort !== null) {
    cursor = cursor.sort(opts.sort)
  }

  if (opts.skip !== null) {
    cursor = cursor.skip(opts.skip)
  }

  if (opts.limit !== null) {
    cursor = cursor.limit(opts.limit)
  }

  return cursor
}

export function filterFactory (value, fields) {
  const query = {}
  Object.keys(value).forEach(key => {
    if (value[key]) {
      const field = fields[key]
      if (field) {
        const fieldName = (typeof field === 'string' ? field : key)
        query[fieldName] = value[key]
      }
    }
  })
  return query
}

export function modelFactory (collection) {
  const model = {
    collection,

    insert (items) {
      return promiseMethod(collection, 'insert', items)
    },

    find (query, options) {
      const finalQuery = Object.assign({}, defaultFindQuery, query)
      return promiseMethod(cursorFactory(collection, finalQuery, options), 'exec')
    },

    findOne (query) {
      const finalQuery = Object.assign({}, defaultFindQuery, query)
      return promiseMethod(collection, 'findOne', finalQuery)
    },

    count (query) {
      const finalQuery = Object.assign({}, defaultFindQuery, query)
      return promiseMethod(collection, 'count', finalQuery)
    },

    update (query, update, options) {
      const finalOptions = Object.assign({}, {
        multi: true,
        upsert: false,
      }, options)
      return promiseMethod(collection, 'update', query, update, finalOptions)
    },

    updateOne (query, update) {
      return model.update(query, update, { multi: false })
    },

    upsert (query, update) {
      return model.update(query, update, { upsert: true })
    },

    upsertOne (query, update) {
      return model.update(query, update, { multi: false, upsert: true })
    },

    remove (query, options, fake = true) {
      const finalOptions = Object.assign({}, {
        multi: true,
      }, options)
      if (fake) {
        return model.update(query, { $set: { removed: true } }, finalOptions)
      } else {
        return promiseMethod(collection, 'remove', query, finalOptions)
      }
    },

    removeOne (query, fake = true) {
      return model.remove(query, { multi: false }, fake)
    },

    sync (items) {
      const ops = []
      ops.push(model.remove({}, null, true))
      items.forEach(item => {
        const data = Object.assign({}, { removed: false }, item)
        ops.push(model.upsert({ id: item.id }, { $set: data }))
      })
      return Promise.all(ops)
    },
  }
  return model
}
