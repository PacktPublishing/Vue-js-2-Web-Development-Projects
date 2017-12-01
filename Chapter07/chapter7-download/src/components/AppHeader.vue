<template>
  <header class="app-header">
    <div class="content">
      <transition name="fade">
        <!-- Search -->
        <div
          v-if="showSearch"
          key="search"
          class="state"
        >
          <input
            ref="searchInput"
            class="search-input"
            v-model="searchTextModel"
            placeholder="Search"
            @keyup.esc="closeSearch"
          />

          <BaseButton
            class="icon-button"
            icon="close"
            @click="closeSearch"
          />
        </div>

        <!-- Normal header -->
        <div
          v-else
          key="header"
          class="state"
        >
          <h1 class="app-name">
            <router-link class="link" :to="{ name: 'home' }">Fashion Store</router-link>
          </h1>

          <BaseButton
            class="icon-button"
            icon="search"
            @click="openSearch"
          />

          <BaseButton
            class="icon-button cart-button cart-animation-target"
            :class="{ animate: animateCart }"
            icon="shopping_basket"
            :badge="displayedCartCount"
            @click="openCart"
          />
        </div>
      </transition>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      showSearch: false,
      animateCart: false,
      displayedCartCount: 0,
    }
  },

  computed: {
    ...mapGetters('items', [
      'searchText',
    ]),

    ...mapGetters('cart', [
      'cartCount',
    ]),

    searchTextModel: {
      get () {
        return this.searchText
      },
      set (value) {
        this.setSearchText(value)
      },
    },
  },

  watch: {
    cartCount (value, oldValue) {
      clearTimeout(this.$_cartAnimationTimer)
      clearTimeout(this.$_cartCountTimer)

      if (value > oldValue) {
        this.animateCart = false
        this.$nextTick(() => {
          this.animateCart = true
          this.$_cartCountTimer = setTimeout(() => {
            this.displayedCartCount = value
          }, 500)
          this.$_cartAnimationTimer = setTimeout(() => {
            this.animateCart = false
          }, 1000)
        })
      } else {
        this.displayedCartCount = value
      }
    },
  },

  mounted () {
    this.displayedCartCount = this.cartCount
  },

  methods: {
    ...mapActions('items', [
      'setSearchText',
    ]),

    ...mapActions('ui', [
      'setShowCart',
    ]),

    openSearch () {
      this.showSearch = true
      // Focus search input
      this.$nextTick(() => {
        this.$refs.searchInput.focus()
      })
    },

    closeSearch () {
      this.showSearch = false
      this.searchTextModel = ''
    },

    openCart () {
      this.setShowCart(true)
    },
  },
}
</script>

<style lang="stylus" scoped>
@import "../styles/imports"

.app-header
  text-align center
  background linear-gradient(to right, $color-accent1 0%, $color-primary 30%, $color-primary 70%, $color-accent2 100%)

  .content
    max-width $page-size
    margin 0 auto
    box-sizing border-box
    position relative
    height 100px

  .state
    h-box()
    box-center()
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    padding 12px 24px

  .app-name
    flex 1
    margin 0
    text-align left

    .link
      color $md-white

  .base-button
    margin-left 12px

  .search-input
    flex 1
    background none
    color $md-white
    border-bottom solid 1px rgba(@color, .4)

  .cart-button
    &.animate
      >>> .button-badge
        animation cart .5s .5s cubic-bezier(0, 0, .2, 1)

@keyframes cart
  0%, 100%
    transform none
  30%
    transform scale(1.4)
</style>
