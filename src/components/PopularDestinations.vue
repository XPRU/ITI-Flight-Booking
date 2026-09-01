<template>
  <section class="destinations">
    <h2>Popular Destinations</h2>
    <div class="cards">
      <div class="card" v-for="place in places" :key="place.name">
        
        
        <div class="image-container">
          
          <img :src="place.image" :alt="place.name" />
        </div>

        
        <div class="text-container">
          <h3>{{ place.name }}</h3>
          <p>{{ place.description }}</p>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
const places = [
  {
    name: 'Paris',
    image: "/paris.jpg" ,
    description: 'The city of light, famous for the Eiffel Tower, art, and incredible cuisine.'
  },
  {
    name: 'Cairo',
    image: '/Cairo.webp',
    description: 'Home to the Great Pyramids, ancient history, and the beautiful Nile river.'
  },
  {
    name: 'Dubai',
    image: '/Dubai.webp',
    description: 'Modern architecture, luxury shopping, and vibrant nightlife in the desert.'
  }
]
</script>

<style scoped>
.destinations {
  
  min-height: 400px;
  padding: 40px 30px;
  text-align: center; 
}

.destinations h2 {
  margin-bottom: 30px;
}

.cards {
  display: flex;
  gap: 25px;
  flex-wrap: wrap;
  justify-content: center; 
}

.card {
  background-color: #ffe0b2;
  border-radius: 12px;
  width: 300px; 
  height: 380px;
  overflow: hidden; 
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: 0 8px 16px rgba(0,0,0,0.15); 
}


.image-container {
  height: 50%;
  width: 100%;
  overflow: hidden; 
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease; 
}

.card:hover .image-container img {
  transform: scale(1.1);
}


.text-container {
  height: 50%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  text-align: left; 
}

.text-container h3 {
  margin: 0 0 10px 0;
  color: #333;
}

.text-container p {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
  color: #555;
}
</style>