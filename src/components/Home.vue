<template>
  <section id="top" class="home">
      <div class="hero-copy">
        <p class="eyebrow">TRAVEL WITH PURPOSE</p>
        <h1>Your next story<br /><em>starts in the sky.</em></h1>
        <p class="paragraph">Search, compare, and book flights to places that stay with you.</p>
        <router-link to="/flights" class="browse-btn">
          Browse all flights <span aria-hidden="true">&#8594;</span>
        </router-link>
      </div> 
      <form id="search" class="search-panel" @submit.prevent="searchFlights">
    <div class="field"><label for="from">From</label>
      <input id="from" v-model="fromsearch" placeholder="Departure city"  @input="selectedFrom = false"/>
      <div v-if="fromsearch !== '' && !selectedFrom" class="suggestions">
        <div v-for="country in fromcountrys" :key="country.name" @click="selectFrom(country)" >
          {{ country.name }}
        </div>
      </div>
    </div>

    <div class="field"> <label for="to">To</label>
      <input  id="to" v-model="tosearch" placeholder="Where to?" @input="selectedTo = false" />
      <div v-if="tosearch !== '' && !selectedTo" class="suggestions" >
        <div  v-for="country in tocountrys"  :key="country.name" @click="selectTo(country)" >
          {{ country.name }}
        </div>
      </div>
    </div>
    <div class="field"> <label for="date">Departure</label>
    <input id="date" type="date" v-model="departureDate"/> </div>
    <button type="submit">  Find flights <span aria-hidden="true">&#8594;</span> </button>
  </form>
    </section>
</template>
  <script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const fromsearch = ref('')
const tosearch = ref('')
const departureDate = ref('')
const countrys = ref([])
const selectedFrom = ref(false)
const selectedTo = ref(false)

async function getcountrys() {
  try { const response = await fetch( 'http://localhost:3000/api/destinations')
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`) }
    const data = await response.json()
    countrys.value = data 
    const flightrespons=await fetch('http://localhost:3000/api/flights')
    const flights=await flightrespons.json()
      flights.forEach(flight => {
  if (!countrys.value.some(city => city.name === flight.from)) {
    countrys.value.push({ name: flight.from })
  }

  if (!countrys.value.some(city => city.name === flight.to)) {
    countrys.value.push({ name: flight.to })
  }
})
  } catch (error) {
    console.error('Error loading destinations:', error)
  }}
onMounted(() => {
  getcountrys()
})
const fromcountrys = computed(() => {
  return countrys.value.filter(country =>
    country.name
      .toUpperCase()
      .startsWith(fromsearch.value.toUpperCase())
  )})
const tocountrys = computed(() => {
  return countrys.value.filter(country =>
    country.name
      .toUpperCase()
      .startsWith(tosearch.value.toUpperCase())
  )
})
function selectFrom(country) {
  fromsearch.value = country.name
  selectedFrom.value = true
}
function selectTo(country) {
  tosearch.value = country.name
  selectedTo.value = true
}
async function searchFlights() {
  if (!fromsearch.value || !tosearch.value || !departureDate.value) {
    alert('Please select From, To and Departure date.')
    return
  }

  try { const response = await fetch( 'http://localhost:3000/api/flights' )

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`) }
    const flights = await response.json()

    const results = flights.filter(flight => { 
    
      const flightDate = flight.departure.split('T')[0]
      return (
        flight.from.trim().toLowerCase() === fromsearch.value.trim().toLowerCase() &&
        flight.to.trim().toLowerCase() === tosearch.value.trim().toLowerCase() &&
       flightDate === departureDate.value)
    })
    localStorage.setItem(
      'searchResults',
      JSON.stringify(results)
    )

    localStorage.setItem(
      'searchData',
      JSON.stringify({
        from: fromsearch.value,
        to: tosearch.value,
        date: departureDate.value
      })
    )
    router.push('/flights')

  } catch (error) {

    console.error('Error loading flights:', error)

    alert('Could not load flights. Please try again.')

  }
}
</script>

<style scoped>
.home {
  min-height: 560px;
  padding: clamp(70px, 11vw, 140px) clamp(24px, 8vw, 110px) 42px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-image: url(../assets/Flightbg.jpeg);
  background-size: cover;
  background-position: center;
  isolation: isolate;
}
.home::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(13, 29, 53, .85), rgba(13, 29, 53, .2));
  z-index: -1;
}
.hero-copy { max-width: 600px; color: var(--color-white); }
.eyebrow { color: #a9e0d9; font-size: 12px; letter-spacing: 2px; font-weight: bold; }
h1 { margin: 18px 0 14px; font-size: clamp(42px, 6vw, 78px); line-height: .98; letter-spacing: -2px; }
h1 em { color: #ffb4a8; font-style: normal; }
.paragraph {
  max-width: 400px;
  color: #e5eef0;
  font-size: 17px;
  line-height: 1.6;
}
.browse-btn {
  display: inline-block;
  margin-top: 18px;
  padding: 12px 22px;
  border-radius: 5px;
  background: var(--color-coral);
  color: var(--color-white);
  text-decoration: none;
  font-weight: bold;
  font-size: 14px;
  width: fit-content;
}
.browse-btn:hover { background: #d9524b; }
.search-panel {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto;
  align-items: end;
  gap: 16px;
  padding: 20px;
  max-width: 1080px;
  background: rgba(255, 255, 255, .96);
  border-radius: 10px;
  box-shadow: 0 18px 35px rgba(11, 23, 40, .2);
}
.field { display: grid; gap: 8px; }
label { color: var(--color-muted); font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; }
input { width: 100%; padding: 11px 4px; border: 0; border-bottom: 1px solid var(--color-border); color: var(--color-ink); outline: none; }
input:focus { border-color: var(--color-teal); }
button { padding: 14px 20px; border: 0; border-radius: 5px; background: var(--color-coral); color: var(--color-white); cursor: pointer; font-weight: bold; white-space: nowrap; }
button:hover { background: #d9524b; }
button span { margin-left: 10px; }
@media (max-width: 700px) {
  .home { min-height: 700px; }
  .search-panel { grid-template-columns: 1fr 1fr; }
  .search-panel button { grid-column: 1 / -1; }
}
</style>
