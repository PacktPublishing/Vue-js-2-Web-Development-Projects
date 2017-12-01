<template>
  <div id="#app">
    <nav>
      <router-link :to="{ name: 'dashboard' }" exact>Dashboard</router-link>
      <router-link :to="{ name: 'generate' }">Measure</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style lang="stylus" src="../style.styl" />
