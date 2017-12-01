import Vue from 'vue'
import VueRouter from 'vue-router'

import PageHome from './components/PageHome.vue'
import PageStoreItem from './components/PageStoreItem.vue'
import PageCheckout from './components/PageCheckout.vue'
import PageNotFound from './components/PageNotFound.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'home', component: PageHome },
  { path: '/item/:id', name: 'store-item', component: PageStoreItem, props: route => ({ id: parseInt(route.params.id) }) },
  { path: '/checkout', name: 'checkout', component: PageCheckout },
  { path: '*', component: PageNotFound },
]

const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }
  },
})

export default router
