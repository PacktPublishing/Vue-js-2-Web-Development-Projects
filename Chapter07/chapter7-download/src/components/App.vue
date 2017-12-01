<template>
  <div id="app">
    <AppHeader />
    <router-view />
    <AppFooter />

    <transition name="right-pane" duration="800">
      <StoreCart v-if="showCart" />
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'
import StoreCart from './StoreCart.vue'

export default {
  components: {
    AppHeader,
    AppFooter,
    StoreCart,
  },

  computed: {
    ...mapGetters('ui', [
      'showCart',
    ]),
  },
}
</script>

<style lang="stylus">
@import '../styles/main';
</style>
