import 'babel-polyfill'
import Vue from 'vue'
import VueFetch, { $fetch } from './plugins/fetch'
import App from './components/App.vue'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import VueGoogleMaps, * as GMap from 'vue-googlemaps'
import * as filters from './filters'

// Filters
for (const key in filters) {
  Vue.filter(key, filters[key])
}

Vue.use(VueFetch, {
  baseUrl: 'http://localhost:3000/',
})

Vue.use(VueGoogleMaps, {
  load: {
    apiKey: 'AIzaSyBl_r42YN1g-pY3DVsy_0x3k15f0-oOJeo',
    libraries: ['places'],
  },
})

sync(store, router)

async function main () {
  await store.dispatch('init')

  new Vue({
    ...App,
    el: '#app',
    router,
    store,
  })
}

main()
