<template>
  <div class="store-item store-item-infos-parent" :class="cssClass">
    <div class="image" @click="addToCart">
      <BaseImage ref="image" :src="item.img" />
      <div class="icon">
        <i class="material-icons">add</i>
      </div>
    </div>
    <router-link
      :to="{ name: 'store-item', params: { id: item.id } }"
      class="infos"
    >
      <StoreItemInfos :item="item" />
    </router-link>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import DiscountMixin from '../mixins/discount'
import StoreItemInfos from './StoreItemInfos.vue'
import { flyingImage } from '../utils/animations'

export default {
  mixins: [
    DiscountMixin(),
  ],

  components: {
    StoreItemInfos,
  },

  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  computed: {
    cssClass () {
      return {
        discount: this.discount,
      }
    },
  },

  methods: {
    ...mapActions('cart', [
      'addStoreItemToCart',
    ]),

    addToCart () {
      this.addStoreItemToCart({
        id: this.item.id,
      })

      // Animation
      flyingImage({
        el: this.$refs.image.$el,
        targetEl: document.querySelector('.cart-animation-target'),
        imageUrl: this.item.img,
        imageClass: 'store-item',
      })
    },
  },
}
</script>

<style lang="stylus" scoped>
@import "../styles/imports"

.store-item
  h-box()
  padding 12px
  border-radius 3px
  user-select none
  cursor default

  .image
    margin-right 12px
    position relative
    cursor pointer
    transition all .3s cubic-bezier(0.0, 0.0, 0.2, 1)

    .base-image
      width 100px
      height @width

    .icon
      color $md-white
      position absolute
      top 0
      bottom 0
      left 0
      right 0
      flex-box()
      box-center()
      font-size 42px
      border-radius @border-radius
      background rgba($md-black, .3)
      opacity 0
      transition opacity .3s

    &:hover
      .icon
        opacity 1

    &:active
      transform scale(.9)

  .infos
    flex 1
    display inline-block
    color $md-black

  &:hover
    background rgba($color-primary, .1)

  &.discount
    &:hover
      background linear-gradient(to right, $color-accent1 0%, $color-primary 50%, $color-accent2 100%)
</style>

<style lang="stylus">
.animation.flying-image.store-item
  max-width 100px
  max-height @max-width
  min-width @max-width
  min-height @max-width
</style>
