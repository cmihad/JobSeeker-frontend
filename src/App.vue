<script>
import UserRegister from './Views/CustomerRegister.vue'
import CustomerHome from './Views/CustomerHome.vue'
</script>

<template>
  <router-view :key="$route.fullPath" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
