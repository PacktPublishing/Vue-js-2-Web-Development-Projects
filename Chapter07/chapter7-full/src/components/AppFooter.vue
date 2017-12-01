<template>
  <footer class="app-footer">
    <div>Made with <a href="https://vuejs.org/">Vue.js</a> and ❤️</div>
    <div v-if="$route.name !== 'locale'">
      <router-link :to="{ name: 'locale' }">{{ $t('change-lang') }}</router-link>
    </div>
  </footer>
</template>

<style lang="stylus" scoped>
@import "../styles/imports"

.app-footer
  text-align center
  padding 42px
  color $md-grey-300
</style>
