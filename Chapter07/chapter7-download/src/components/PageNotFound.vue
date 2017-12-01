<template>
  <BasePage class="page-not-found">
    <h1>This page can't be found</h1>
    <p class="more-info">
      Sorry, but we can't find the page you're looking for.<br>
      It might have been moved or deleted.<br>
      Check your spelling or click below to return to the homepage.
    </p>
    <div class="actions">
      <router-link :to="{ name: 'home' }">Return to home</router-link>
    </div>
  </BasePage>
</template>

<style lang="stylus" scoped>
.more-info
  text-align: center

.page-not-found
  padding-top 100px
</style>
