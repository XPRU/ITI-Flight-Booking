<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const flights = ref([])
const destinations = ref([])
const loading = ref(true)

function imageFor(cityName) {
  const match = destinations.value.find(d => d.name.toLowerCase() === cityName.toLowerCase())
  return match ? match.image : '/paris.jpg'
}
function formatDate(iso) {
  return new Date(iso).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
}
function openFlight(id) {
  router.push(`/flights/${id}`)
}

onMounted(async () => {
  const [flightsRes, destinationsRes] = await Promise.all([
    fetch('http://localhost:3000/api/flights'),
    fetch('http://localhost:3000/api/destinations')
  ])
  flights.value = await flightsRes.json()
  destinations.value = await destinationsRes.json()
  loading.value = false
})
</script>

<template>
  <section class="flights-page">
    <div class="section-heading">
      <p class="eyebrow">ALL FLIGHTS</p>
      <h2>Available flights</h2>
      <p>Browse every flight currently on offer.</p>
    </div>

    <p v-if="loading">Loading flights...</p>

    <div v-else class="flight-list">
      <article v-for="flight in flights" :key="flight.id" class="flight-card" @click="openFlight(flight.id)">
        <div class="image-container">
          <img :src="imageFor(flight.to)" :alt="flight.to" />
        </div>
        <div class="flight-info">
          <div class="route">
            <h3>{{ flight.from }} <span aria-hidden="true">&#8594;</span> {{ flight.to }}</h3>
            <span class="price">{{ flight.price }} {{ flight.currency }}</span>
          </div>
          <p class="meta">{{ flight.airline }} &bull; {{ flight.duration }} &bull; Departs {{ formatDate(flight.departure) }}</p>
          <p class="seats">{{ flight.seatsAvailable }} seats left</p>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.flights-page { padding: 90px clamp(24px, 8vw, 110px); background: var(--color-sky); min-height: 500px; }
.section-heading { margin-bottom: 32px; }
.section-heading .eyebrow { color: var(--color-teal); margin: 0 0 10px; font-size: 12px; letter-spacing: 2px; font-weight: bold; }
.section-heading h2 { margin: 0 0 10px; font-size: clamp(30px, 4vw, 44px); color: var(--color-ink); }
.section-heading > p:last-child { color: var(--color-muted); margin: 0; }
.flight-list { display: flex; flex-direction: column; gap: 18px; }
.flight-card {
  display: flex;
  background: var(--color-white);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(20, 33, 61, .07);
  cursor: pointer;
  transition: transform .3s ease, box-shadow .3s ease;
}
.flight-card:hover { transform: translateY(-3px); box-shadow: 0 14px 28px rgba(20, 33, 61, .13); }
.image-container { width: 220px; flex-shrink: 0; overflow: hidden; }
.image-container img { width: 100%; height: 100%; object-fit: cover; }
.flight-info { flex: 1; padding: 20px 24px; display: flex; flex-direction: column; gap: 8px; justify-content: center; }
.route { display: flex; justify-content: space-between; align-items: center; }
.route h3 { margin: 0; color: var(--color-ink); }
.price { color: var(--color-coral); font-weight: bold; font-size: 18px; }
.meta { margin: 0; color: var(--color-muted); font-size: 0.9rem; }
.seats { margin: 0; color: var(--color-teal); font-size: 0.85rem; font-weight: bold; }
@media (max-width: 600px) {
  .flight-card { flex-direction: column; }
  .image-container { width: 100%; height: 160px; }
}
</style>
