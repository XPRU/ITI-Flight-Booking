<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const flight = ref(null)
const image = ref('/paris.jpg')
const loading = ref(true)

function formatDate(iso) {
  return new Date(iso).toLocaleString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
}

onMounted(async () => {
  const [flightsRes, destinationsRes] = await Promise.all([
    fetch('http://localhost:3000/api/flights'),
    fetch('http://localhost:3000/api/destinations')
  ])
  const flights = await flightsRes.json()
  const destinations = await destinationsRes.json()

  flight.value = flights.find(f => f.id === route.params.id)
  const match = destinations.find(d => d.name.toLowerCase() === flight.value?.to.toLowerCase())
  if (match) image.value = match.image

  loading.value = false
})
</script>

<template>
  <section class="flight-details">
    <button class="back-btn" @click="router.push('/flights')">&#8592; Back to all flights</button>

    <p v-if="loading">Loading flight...</p>
    <p v-else-if="!flight">Flight not found.</p>

    <div v-else class="details-card">
      <div class="image-container">
        <img :src="image" :alt="flight.to" />
      </div>
      <div class="details-info">
        <p class="eyebrow">FLIGHT {{ flight.id }}</p>
        <h2>{{ flight.from }} <span aria-hidden="true">&#8594;</span> {{ flight.to }}</h2>
        <p class="airline">{{ flight.airline }}</p>
        <div class="grid">
          <div><span class="label">Departure</span><span class="value">{{ formatDate(flight.departure) }}</span></div>
          <div><span class="label">Duration</span><span class="value">{{ flight.duration }}</span></div>
          <div><span class="label">Seats left</span><span class="value">{{ flight.seatsAvailable }}</span></div>
          <div><span class="label">Price</span><span class="value price">{{ flight.price }} {{ flight.currency }}</span></div>
        </div>
        <button class="book-btn">Book this flight <span aria-hidden="true">&#8594;</span></button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.flight-details { padding: 90px clamp(24px, 8vw, 110px); min-height: 500px; }
.back-btn { background: none; border: 0; color: var(--color-teal); font-weight: bold; cursor: pointer; margin-bottom: 24px; padding: 0; font-size: 14px; }
.details-card { display: flex; background: var(--color-white); border-radius: 10px; overflow: hidden; box-shadow: 0 14px 28px rgba(20, 33, 61, .1); }
.image-container { width: 40%; flex-shrink: 0; }
.image-container img { width: 100%; height: 100%; object-fit: cover; min-height: 320px; }
.details-info { flex: 1; padding: 40px; }
.eyebrow { color: var(--color-teal); font-size: 12px; letter-spacing: 2px; font-weight: bold; margin: 0 0 10px; }
.details-info h2 { margin: 0 0 6px; color: var(--color-ink); font-size: clamp(26px, 3vw, 36px); }
.airline { color: var(--color-muted); margin: 0 0 24px; }
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 32px; }
.label { display: block; color: var(--color-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; margin-bottom: 4px; }
.value { display: block; color: var(--color-ink); font-size: 18px; font-weight: bold; }
.value.price { color: var(--color-coral); }
.book-btn { padding: 14px 24px; border: 0; border-radius: 5px; background: var(--color-coral); color: var(--color-white); cursor: pointer; font-weight: bold; }
.book-btn:hover { background: #d9524b; }
@media (max-width: 700px) {
  .details-card { flex-direction: column; }
  .image-container { width: 100%; }
  .grid { grid-template-columns: 1fr; }
}
</style>
