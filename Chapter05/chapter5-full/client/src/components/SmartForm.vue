<template>
  <form @submit.prevent="submit">
    <section class="content">
      <h2>{{ title }}</h2>
      <slot />

      <div class="actions">
        <slot name="actions" />
      </div>

      <div class="error" v-if="error">{{ error }}</div>
    </section>

    <transition name="fade">
      <Loading v-if="busy" class="overlay" />
    </transition>
  </form>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    operation: {
      type: Function,
      required: true,
    },
    valid: {
      type: Boolean,
      required: true,
    },
  },

  data () {
    return {
      error: null,
      busy: false,
    }
  },

  methods: {
    async submit () {
      if (this.valid && !this.busy) {
        this.error = null
        this.busy = true
        try {
          await this.operation()
        } catch (e) {
          this.error = e.message
        }
        this.busy = false
      }
    },
  },
}
</script>
