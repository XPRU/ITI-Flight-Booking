import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import FlightsList from '../views/FlightsList.vue'
import FlightDetails from '../views/FlightDetails.vue'
 import Mybooking from '../views/Mybooking.vue'
const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/flights', name: 'flights', component: FlightsList },
  { path: '/flights/:id', name: 'flight-details', component: FlightDetails },
  {path:'/Mybooking',name:Mybooking ,component:Mybooking}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
