<template>
  <BasePage class="page-store-item">
    <div v-if="error" class="error">An error occured (sorry)</div>
    <template v-else>
      <!-- Details -->
      <div class="section details">
        <transition name="fade">
          <BaseLoading
            v-if="detailsLoading"
            key="loading"
            class="overlay"
          />
          <div
            v-else-if="details"
            key="content"
            class="details-content"
          >
            <BaseImage
              ref="image"
              class="item-image"
              :src="details.img"
            />
            <div class="details-toolbar">
              <StoreItemInfos :item="details" />
              <BaseButton
                icon="add"
                @click="addToCart"
              >Add to cart</BaseButton>
            </div>
          </div>
        </transition>
      </div>

      <!-- Comments -->
      <div class="section comments">
        <h2><i class="material-icons">comment</i> Comments</h2>
        <transition name="fade">
          <BaseLoading
            v-if="commentsLoading"
            key="loading"
            class="overlay"
          />
          <div
            v-else
            key="content"
            class="comments-content"
          >
            <div v-if="comments.length === 0" class="empty">No comments yet</div>
            <div
              v-for="comment of comments"
              :key="comment.id"
              class="comment"
              v-text="comment.text"
            ></div>
          </div>
        </transition>

        <div class="h-form">
          <input
            v-model="commentText"
            placeholder="Type a new comment"
            @keyup.enter="submitComment"
          />
        </div>
      </div>
    </template>
  </BasePage>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import StoreItemInfos from './StoreItemInfos.vue'
import { flyingImage } from '../utils/animations'

export default {
  components: {
    StoreItemInfos,
  },

  props: {
    id: {
      type: Number,
      required: true,
    },
  },

  data () {
    return {
      commentText: '',
    }
  },

  computed: {
    ...mapGetters('item', [
      'comments',
      'commentsLoading',
      'details',
      'detailsLoading',
      'error',
    ]),
  },

  watch: {
    id () {
      this.fetchData()
    },
  },

  mounted () {
    this.fetchData()
  },

  methods: {
    ...mapActions('item', [
      'fetchStoreItemDetails',
      'sendComment',
    ]),

    ...mapActions('cart', [
      'addStoreItemToCart',
    ]),

    addToCart () {
      this.addStoreItemToCart({
        id: this.id,
      })

      // Animation
      flyingImage({
        el: this.$refs.image.$el.querySelector('img'),
        targetEl: document.querySelector('.cart-animation-target'),
        imageUrl: this.details.img,
        imageClass: 'page-store-item',
      })
    },

    fetchData () {
      this.fetchStoreItemDetails({
        id: this.id,
      })
    },

    async submitComment () {
      const text = this.commentText
      if (text) {
        this.commentText = ''
        try {
          await this.sendComment({
            text,
          })
        } catch (e) {
          this.commentText = text
        }
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
@import "../styles/imports"

.item-image
  height 400px

.section
  position relative
  min-height 150px

  &.comments
    margin-top 42px

.comment
  padding 18px 12px
  margin 12px 0
  border-radius 3px
  background $md-grey-200

  &:nth-child(2n)
    background $md-grey-100

.details-toolbar
  padding 12px 0
  h-box()

  .store-item-infos
    flex 1
</style>

<style lang="stylus">
.animation.flying-image.page-store-item
  max-height 400px
</style>
