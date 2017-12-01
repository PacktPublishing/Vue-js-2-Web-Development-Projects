<template>
  <ul class="movies">
    <Movie
      v-for="(movie, index) of movies"
      :key="index"
      :movie="movie" />
  </ul>
</template>

<script>
import Movie from './Movie.vue'

export default {
  components: {
    Movie,
  },

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

<style scoped>
.movies {
  padding: 12px;
  background: rgba(0, 0, 0, .1);
  border-radius: 3px;
  list-style: none;
}
</style>
