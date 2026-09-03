<template>
  <section id="destinations" class="destinations">
    <div class="section-heading"><p class="eyebrow">GO SOMEWHERE NEW</p><h2>Popular destinations</h2><p>Handpicked places for your next great escape.</p></div>
    <div class="cards">
      <article class="card" v-for="place in places" :key="place.name">
        
        
        <div class="image-container">
          <img :src="place.image" :alt="place.name" />
        </div>

        
        <div class="text-container">
          <div class="card-title"><h3>{{ place.name }}</h3><span aria-hidden="true">&#8599;</span></div>
          <p>{{ place.description }}</p>
        </div>

      </article>
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
  padding: 90px clamp(24px, 8vw, 110px);
  background: var(--color-sky);
}
.section-heading { margin-bottom: 32px; }
.section-heading .eyebrow { color: var(--color-teal); margin: 0 0 10px; }
.section-heading h2 { margin: 0 0 10px; font-size: clamp(30px, 4vw, 44px); }
.section-heading > p:last-child { color: var(--color-muted); margin: 0; }
.card-title { display: flex; justify-content: space-between; align-items: center; }
.card-title span { color: var(--color-coral); font-size: 24px; }
.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}
.card {
  background: var(--color-white);
  border-radius: 8px;
  width: 100%;
  min-height: 340px;
  overflow: hidden; 
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 24px rgba(20, 33, 61, .07);
  transition: transform .3s ease, box-shadow .3s ease;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 14px 28px rgba(20, 33, 61, .13);
}


.image-container {
  height: 190px;
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
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  text-align: left; 
}

.text-container h3 {
  margin: 0 0 10px 0;
  color: var(--color-ink);
}

.text-container p {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--color-muted);
}
@media (max-width: 850px) { .cards { grid-template-columns: 1fr 1fr; } }
@media (max-width: 560px) { .cards { grid-template-columns: 1fr; } }
</style>