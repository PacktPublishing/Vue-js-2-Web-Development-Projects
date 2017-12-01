<template>
  <ul class="movies">
    <li v-for="movie of movies" class="movie">
      {{ movie.title }}
    </li>
  </ul>
</template>

<script>
export default {
  data () {
    return {
      movies: [
        { title: 'Star Wars' },
        { title: 'Blade Runner' },
      ],
    }
  },
}
</script>

<style>
.movies {
  padding: 12px;
  background: rgba(0, 0, 0, .1);
  border-radius: 3px;
  list-style: none;
}
</style>

<style scoped>
.movie:not(:last-child) {
  padding-bottom: 6px;
  margin-bottom: 6px;
  border-bottom: solid 1px rgba(0, 0, 0, .1);
}
</style>
