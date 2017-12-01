<template>
  <BasePage class="page-checkout">
    <div class="hero">
      <i class="icon material-icons">done</i>
    </div>
    <p>
      Your order is complete
    </p>
    <div class="actions">
      <router-link :to="{ name: 'home' }">Return to home</router-link>
    </div>
  </BasePage>
</template>

<style lang="stylus" scoped>
@import "../styles/imports"

.page-checkout
  padding-top 100px

p
  text-align: center

.icon
  color $md-green
</style>
