<script>
import UserRegister from './Views/userRegister.vue'
import CustomerHome from './Views/CustomerHome.vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
export default {
  components: {
    Navbar,
    Footer,
  },
}
</script>

<template>
  <Navbar />
  <router-view :key="$route.fullPath" />
  <Footer />
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
