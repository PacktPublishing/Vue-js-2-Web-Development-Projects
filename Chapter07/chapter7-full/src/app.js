import 'babel-polyfill'
import Vue from 'vue'
import App from './components/App.vue'
import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'
import * as filters from './filters'
import './plugins'
import './components'
import { createI18n } from './utils/i18n'

// Global filters
for (const key in filters) {
  Vue.filter(key, filters[key])
}

export async function createApp (context) {
  const router = createRouter()
  const store = createStore()

  sync(store, router)

  const i18n = await createI18n(context.locale)
  await store.dispatch('init')

  const app = new Vue({
    router,
    store,
    i18n,
    ...App,
  })

  return {
    app,
    router,
    store,
  }
}
