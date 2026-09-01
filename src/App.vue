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
  max-width: 1400px;
  margin: 30px auto;
  border-radius: 20px;
  overflow: hidden;
  background-color: var(--color-pale-white); 
  box-shadow: 0 0 15px rgba(0,0,0,0.1);
}
</style>