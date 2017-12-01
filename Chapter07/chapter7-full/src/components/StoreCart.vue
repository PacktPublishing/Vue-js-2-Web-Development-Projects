<template>
  <BasePane
    class="store-cart right-pane"
    icon="shopping_basket"
    title="Shopping Cart"
    @close="close"
  >
    <div class="items">
      <div v-if="cartItems.length === 0" class="empty">Nothing in the cart yet</div>
      <StoreCartItem
        v-for="item of cartItems"
        :key="item.id"
        :item="item"
      />
    </div>

    <div slot="footer" class="cart-footer">
      <div class="cart-total">
        <span class="prefix">Total</span>
        <span class="value">{{ cartTotal | money }}</span>
      </div>
      <BaseButton
        :disabled="cartItems.length === 0"
        @click="checkout"
      >Checkout</BaseButton>
    </div>
  </BasePane>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import StoreCartItem from './StoreCartItem.vue'

export default {
  components: {
    StoreCartItem,
  },

  computed: {
    ...mapGetters('cart', [
      'cartItems',
      'cartTotal',
    ]),
  },

  methods: {
    ...mapActions('ui', [
      'setShowCart',
    ]),

    ...mapActions('cart', [
      'clearCart',
    ]),

    close () {
      this.setShowCart(false)
    },

    checkout () {
      this.close()
      this.clearCart()
      this.$router.push({ name: 'checkout' })
    },
  },
}
</script>

<style lang="stylus" scoped>
@import "../styles/imports"

.cart-footer
  h-box()
  box-center()
  padding 24px 12px 24px 18px

  .cart-total
    flex 1
    font-size 24px

    .prefix
      color rgba($md-black, .3)

</style>
