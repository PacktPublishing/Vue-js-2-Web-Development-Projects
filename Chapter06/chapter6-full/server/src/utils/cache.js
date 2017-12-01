
import LRU from 'lru-cache'

export function cacheFactory (options) {
  const finalOptions = Object.assign({}, {
    max: 100,
    maxAge: 1000 * 60 * 60,
    key: 'id',
    refresh: null,
    resolveKey: null,
  }, options)

  const cache = {
    lru: LRU({
      max: finalOptions.max,
      maxAge: finalOptions.maxAge,
    }),

    async set (item, ...args) {
      let key
      if (args && cache.resolveKey) {
        key = await cache.resolveKey(...args)
      } else {
        key = item[cache.key]
      }
      cache.lru.set(key, item)
    },

    async put (items, mapKeyArgs = null) {
      for (const item of items) {
        if (mapKeyArgs) {
          const args = await mapKeyArgs(item)
          await cache.setOne(item, ...args)
        } else {
          await cache.setOne(item)
        }
      }
    },

    async get (...args) {
      let key
      if (cache.resolveKey) {
        key = await cache.resolveKey(...args)
      } else {
        key = args[0]
      }

      let item = cache.lru.get(key)

      // Refresh
      if (!item && cache.refresh) {
        const refreshArgs = cache.resolveKey ? args : key
        item = await cache.refresh(...refreshArgs)
        cache.set(item, ...args)
      }

      return item
    },

    ...finalOptions,
  }

  return cache
}
