import 'babel-polyfill'
import Vue from 'vue'
import AppLayout from './components/AppLayout.vue'
import router from './router'
import state from './state'
import VueFetch, { $fetch } from './plugins/fetch'
import VueState from './plugins/state'
import './global-components'
import * as filters from './filters'

Vue.use(VueFetch, {
  baseUrl: 'http://localhost:3000/',
})

Vue.use(VueState, state)

for (const key in filters) {
  Vue.filter(key, filters[key])
}

async function main () {
  // Get user info
  try {
    state.user = await $fetch('user')
  } catch (e) {
    console.warn(e)
  }
  // Launch app
  new Vue({
    el: '#app',
    data: state,
    router,
    render: h => h(AppLayout),
  })
}

main()
