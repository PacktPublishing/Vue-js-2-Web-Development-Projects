<template>
  <div class="production-indicator">
    <loading-progress :progress="value" />
    <div class="title">{{ title }}</div>
    <div class="info">{{ info }}</div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true,
    },
    title: String,
    info: [String, Number],
  },
}
</script>
