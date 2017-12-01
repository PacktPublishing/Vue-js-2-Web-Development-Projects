<template>
  <BasePage class="page-home">
    <transition name="fade">
      <BaseLoading
        v-if="loading"
        key="loading"
        class="overlay"
      />
      <div
        v-else
        key="items"
        class="items"
      >
        <StoreItem
          v-for="(item, index) of items"
          :key="item.id"
          :item="item"
          :style="{ 'animation-delay': `${index * .1}s` }"
        />
      </div>
    </transition>
  </BasePage>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import StoreItem from './StoreItem.vue'

export default {
  components: {
    StoreItem,
  },

  // SSR
  asyncData ({ store }) {
    return store.dispatch('items/fetchItems')
  },

  computed: {
    ...mapGetters('items', [
      'items',
      'loading',
    ]),
  },

  methods: {
    ...mapActions('items', [
      'fetchItems',
    ]),
  },

  mounted () {
    if (!this.items.length) {
      this.fetchItems()
    }
  },
}
</script>

<style lang="stylus" scoped>
.items
  display flex
  flex-direction row
  flex-wrap wrap

  .store-item
    flex 50% 1 1
    box-sizing border-box
    animation slide .5s cubic-bezier(0.0, 0.0, 0.2, 1) backwards

@keyframes slide
  0%
    opacity 0
    transform translateY(100px)
  100%
    opacity 1
    transform none
</style>
