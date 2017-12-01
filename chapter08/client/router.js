import Vue from 'vue'
import VueRouter from 'vue-router'

import ProductionDashboard from './components/ProductionDashboard.vue'
import ProductionGenerator from './components/ProductionGenerator.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'dashboard', component: ProductionDashboard },
  { path: '/generate', name: 'generate', component: ProductionGenerator },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
