<template>
  <div class="base-image">
    <transition name="zoom">
      <img
        v-show="loaded"
        :key="src"
        class="img"
        :src="src"
        @load="loaded = true"
      />
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
  },

  data () {
    return {
      loaded: false,
    }
  },

  watch: {
    src () {
      this.loaded = false
    },
  },
}
</script>

<style lang="stylus" scoped>
@import "../styles/imports"

.base-image
  flex-box()
  box-center()
  background $md-grey-100
  border-radius 3px

  .img
    max-width 100%
    max-height 100%
    border-radius @border-radius
</style>
