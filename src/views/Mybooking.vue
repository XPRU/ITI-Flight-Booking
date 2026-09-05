<template>
  <section class="mybooking">
    <button class="back-btn" @click="gohome">&#8592; Back to home</button>
    <h1>My bookings</h1>

    <p v-if="!bookings.length" class="empty">You have no bookings yet.</p>

    <div class="booking-list">
      <div class="booking-card" v-for="item in bookings" :key="item.id">
        <div class="booking-info">
          <h3>{{ item.flight.from }} <span aria-hidden="true">&#8594;</span> {{ item.flight.to }}</h3>
          <p>{{ item.flight.airline }} &bull; {{ item.flight.duration }}</p>
          <p>{{ item.flight.price }} {{ item.flight.currency }} &bull; {{ item.flight.seatsAvailable }} seats left</p>
          <p class="status" :class="item.status">{{ item.status }}</p>
        </div>
        <div class="booking-actions">
          <button v-if="item.status === 'pending'" class="btn-confirm" @click="confirmBooking(item.id)">Confirm</button>
          <button class="btn-cancel" @click="cancelBooking(item.id)">Cancel</button>
        </div>
      </div>
    </div>

    <button class="btn-flights" @click="goflights">Browse more flights <span aria-hidden="true">&#8594;</span></button>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const bookings = ref([])

onMounted(() => {
  const saved = sessionStorage.getItem('uflyBookings')
  if (saved) bookings.value = JSON.parse(saved)
})

function save() {
  sessionStorage.setItem('uflyBookings', JSON.stringify(bookings.value))
}
function confirmBooking(id) {
  const item = bookings.value.find(b => b.id === id)
  if (item) item.status = 'confirmed'
  save()
}
function cancelBooking(id) {
  bookings.value = bookings.value.filter(b => b.id !== id)
  save()
}
function gohome() {
  router.push('/')
}
function goflights() {
  router.push('/flights')
}
</script>

<style scoped>
.mybooking {
  min-height: 100vh;
  padding: 90px clamp(24px, 8vw, 110px);
  background: var(--color-sky);
}
.back-btn {
  background: none;
  border: 0;
  color: var(--color-teal);
  font-weight: bold;
  cursor: pointer;
  padding: 0;
  font-size: 14px;
  margin-bottom: 24px;
}
.mybooking h1 {
  color: var(--color-ink);
  font-size: 40px;
  margin: 0 0 30px;
}
.empty {
  color: var(--color-muted);
  font-size: 18px;
}
.booking-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
  max-width: 700px;
  margin-bottom: 30px;
}
.booking-card {
  background: var(--color-white);
  padding: 24px;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  box-shadow: 0 8px 24px rgba(20, 33, 61, .07);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  transition: transform .3s ease, box-shadow .3s ease;
}
.booking-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 28px rgba(20, 33, 61, .1);
}
.booking-info h3 { margin: 0 0 10px; color: var(--color-ink); font-size: 22px; }
.booking-info p { margin: 0 0 6px; color: var(--color-muted); }
.status { font-weight: bold; text-transform: capitalize; }
.status.pending { color: var(--color-coral); }
.status.confirmed { color: var(--color-teal); }
.booking-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.btn-confirm,
.btn-cancel {
  padding: 10px 20px;
  border: none;
  border-radius: 7px;
  color: var(--color-white);
  font-weight: bold;
  cursor: pointer;
  min-width: 130px;
}
.btn-confirm { background: var(--color-teal); }
.btn-cancel { background: var(--color-coral); }
.btn-flights {
  padding: 14px 24px;
  border: 0;
  border-radius: 5px;
  background: var(--color-coral);
  color: var(--color-white);
  cursor: pointer;
  font-weight: bold;
}
.btn-flights:hover { background: #d9524b; }
@media (max-width: 600px) {
  .booking-card { flex-direction: column; align-items: flex-start; }
  .booking-actions { flex-direction: row; }
}
</style>
