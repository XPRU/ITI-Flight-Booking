<script setup>
import Navbar from './components/Navbar.vue'
import Home from './components/Home.vue';
import PopularDestinations from './components/PopularDestinations.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <div class="container">
    <Navbar />
    <Home />
    <PopularDestinations />
    <Footer />
  </div>
</template>

<style scoped>
.container {
  max-width: 1440px;
  margin: 0 auto;
  overflow: hidden;
  background-color: var(--color-white);
  box-shadow: 0 10px 40px rgba(20, 33, 61, 0.08);
}
</style>