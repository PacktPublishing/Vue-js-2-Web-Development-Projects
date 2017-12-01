<template>
  <main class="page">
    <slot />
  </main>
</template>

<style lang="stylus" scoped>
@import "../styles/imports"

.page
  max-width $page-size
  min-height calc(100vh - 270px)
  margin auto
  padding 12px
  box-sizing border-box
</style>

<style lang="stylus">
@import "../styles/imports"

// Critical CSS

body
  margin 0
  font-family 'Roboto', sans-serif

a
  text-decoration none
  color $color-primary

h1
  color $color-primary
  margin-top 0
  font-weight lighter
  font-size 2.2em
  text-align center

.material-icons
  overflow hidden
  display inline-block
  width 1em
  height 1em
</style>
