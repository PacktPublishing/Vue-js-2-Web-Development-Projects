<template>
  <div class="location-info" v-if="currentPost">
    <!-- Place -->
    <googlemaps-place-details
      v-if="currentPost.placeId"
      :request="{
        placeId: currentPost.placeId
      }">
      <PlaceDetails
        slot-scope="props"
        v-if="props.results"
        :name="props.results.name"
        :address="props.results.formatted_address" />
    </googlemaps-place-details>

    <!-- Position only -->
    <googlemaps-geocoder
      v-else
      :request="{
        location: currentPost.position,
      }">
      <PlaceDetails
        slot-scope="props"
        v-if="props.results"
        :name="props.results[1].placeDetails.name"
        :address="props.results[0].formatted_address" />
    </googlemaps-geocoder>
  </div>
  <div v-else></div>
</template>

<script>
import PlaceDetails from './PlaceDetails.vue'
import { createNamespacedHelpers } from 'vuex'

// posts module
const {
  mapGetters: postsGetters,
} = createNamespacedHelpers('posts')

export default {
  components: {
    PlaceDetails,
  },

  computed: postsGetters([
    'currentPost',
  ]),
}
</script>
