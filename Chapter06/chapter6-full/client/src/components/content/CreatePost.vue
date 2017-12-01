<template>
  <form
    class="create-post"
    @submit.prevent="handleSubmit">
    <input
      name="title"
      v-model="title"
      placeholder="Title"
      required />

    <textarea
      name="content"
      v-model="content"
      placeholder="Content"
      required />

    <div class="actions">
      <button
        type="button"
        class="secondary"
        @click="clearDraft">
        <i class="material-icons">delete</i>
        Discard
      </button>
      <button
        type="submit"
        :disabled="!formValid">
        <i class="material-icons">save</i>
        Post
      </button>
    </div>
  </form>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

// posts module
const {
  mapGetters: postsGetters,
  mapActions: postsActions,
} = createNamespacedHelpers('posts')

export default {
  computed: {
    ...postsGetters([
      'draft',
    ]),

    title: {
      get () {
        return this.draft.title
      },
      set (value) {
        this.updateDraft({
          ...this.draft,
          title: value,
        })
      },
    },

    content: {
      get () {
        return this.draft.content
      },
      set (value) {
        this.updateDraft({
          ...this.draft,
          content: value,
        })
      },
    },

    formValid () {
      return this.title && this.content
    },
  },

  methods: {
    ...postsActions([
      'clearDraft',
      'createPost',
      'updateDraft',
    ]),

    handleSubmit () {
      if (this.formValid) {
        this.createPost(this.draft)
      }
    },
  },
}
</script>
