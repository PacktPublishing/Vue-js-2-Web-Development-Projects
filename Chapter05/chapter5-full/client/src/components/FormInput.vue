<!--<template>
  <div class="row">
    <input
      class="input"
      :class="inputClass"
      :name="name"
      :type="type"
      :value.prop="text"
      @input="update"
      :placeholder="placeholder" />
  </div>
</template>-->

<template>
  <div class="row">
    <component
      :is="element"
      class="input"
      :class="inputClass"
      :name="name"
      :type="type"
      :value.prop="text"
      @input="update"
      :placeholder="placeholder"
      v-bind="$attrs" />
  </div>
</template>

<script>
export default {
  model: {
    prop: 'text',
    event: 'update',
  },

  props: {
    name: {
      type: String,
    },
    type: {
      type: String,
      default: 'text',
    },
    text: {
      required: true,
    },
    placeholder: {
      type: String,
    },
    invalid: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    inputClass () {
      return {
        'invalid': this.invalid,
      }
    },

    element () {
      return this.type === 'textarea' ? this.type : 'input'
    },
  },

  methods: {
    update (event) {
      this.$emit('update', event.currentTarget.value)
    },
  },

  /* render (h) {
    return h('div', { class: 'row' }, [
      h(this.element, {
        class: ['input', this.inputClass],
        attrs: {
          type: this.type,
          placeholder: this.placeholder,
          ...this.$attrs,
        },
        domProps: {
          value: this.text,
        },
        on: {
          input: this.update,
        },
      }),
    ])
  }, */
}
</script>

<style lang="stylus" scoped>
.input {
  &.invalid {
    border-color: red;
  }
}
</style>
