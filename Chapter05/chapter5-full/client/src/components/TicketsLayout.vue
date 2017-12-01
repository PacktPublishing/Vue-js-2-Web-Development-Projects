<template>
  <main class="tickets-layout">
    <h1>Your Support tickets</h1>

    <!-- <Tickets /> -->

    <div class="actions">
      <router-link v-if="$route.name !== 'tickets'" tag="button" class="secondary" :to="{name: 'tickets'}">See all tickets</router-link>
      <router-link v-if="$route.name !== 'new-ticket'" tag="button" :to="{name: 'new-ticket'}">New ticket</router-link>
    </div>

    <router-view />
  </main>
</template>

<!-- <script>
import Tickets from './Tickets.vue'

export default {
  components: {
    Tickets,
  }
}
</script> -->

<style lang="stylus" scoped>
.actions {
  margin-bottom: 32px;
}
</style>
