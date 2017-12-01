import 'babel-polyfill'
import Vue from 'vue'
import App from './components/App.vue'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import * as filters from './filters'
import './plugins'
import './components'

// Global filters
for (const key in filters) {
  Vue.filter(key, filters[key])
}

sync(store, router)

async function main () {
  await store.dispatch('init')

  new Vue({
    el: '#app',
    router,
    store,
    ...App,
  })
}

main()
