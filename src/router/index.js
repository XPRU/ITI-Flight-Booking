import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import FlightsList from '../views/FlightsList.vue'
import FlightDetails from '../views/FlightDetails.vue'

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/flights', name: 'flights', component: FlightsList },
  { path: '/flights/:id', name: 'flight-details', component: FlightDetails },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
