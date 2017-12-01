<template>
  <main class="home">
    <h1>Welcome to our support center</h1>
    <p>
      We are here to help! Please read the <router-link :to="{name: 'faq'}">F.A.Q</router-link> first,
      and if you don't find the answer to your question, <router-link :to="{name: 'tickets'}">send us a ticket!</router-link>
    </p>
  </main>
</template>
