import 'babel-polyfill'
import Vue from 'vue'
import Test from './MoviesJSX.vue'

new Vue({
  el: '#app',
  ...Test,
})
