<template>
  <li class="movie">
    {{ movie.title }}
  </li>
</template>

<script>
export default {
  props: ['movie'],
}
</script>

<style scoped>
.movie:not(:last-child) {
  padding-bottom: 6px;
  margin-bottom: 6px;
  border-bottom: solid 1px rgba(0, 0, 0, .1);
}
</style>
