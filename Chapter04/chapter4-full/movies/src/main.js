import 'babel-polyfill'
import Vue from 'vue'
import Movies from './Movies.vue'

new Vue({
  el: '#app',
  ...Movies,
})
