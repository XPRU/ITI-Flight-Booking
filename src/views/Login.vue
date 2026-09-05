<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = ref('')
const email = ref('')

function submit() {
  if (!name.value || !email.value) return

  sessionStorage.setItem('uflyUser', JSON.stringify({ name: name.value, email: email.value }))

  const pending = sessionStorage.getItem('pendingBooking')
  if (pending) {
    const flight = JSON.parse(pending)
    const bookings = JSON.parse(sessionStorage.getItem('uflyBookings') || '[]')
    bookings.push({
      id: 'BK-' + Date.now(),
      flight,
      user: { name: name.value, email: email.value },
      status: 'pending'
    })
    sessionStorage.setItem('uflyBookings', JSON.stringify(bookings))
    sessionStorage.removeItem('pendingBooking')
    router.push('/Mybooking')
  } else {
    router.push('/')
  }
}
</script>

<template>
  <section class="login">
    <div class="login-card">
      <p class="eyebrow">ONE LAST STEP</p>
      <h1>Sign in to book</h1>
      <p class="sub">Just your name and email, so we know who the booking belongs to.</p>
      <form @submit.prevent="submit">
        <div class="field">
          <label for="name">Full name</label>
          <input id="name" v-model="name" placeholder="Your name" required />
        </div>
        <div class="field">
          <label for="email">Email</label>
          <input id="email" v-model="email" type="email" placeholder="you@example.com" required />
        </div>
        <button type="submit">Continue <span aria-hidden="true">&#8594;</span></button>
      </form>
    </div>
  </section>
</template>

<style scoped>
.login {
  min-height: 520px;
  padding: 90px clamp(24px, 8vw, 110px);
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-sky);
}
.login-card {
  width: 100%;
  max-width: 420px;
  background: var(--color-white);
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(20, 33, 61, .1);
}
.eyebrow { color: var(--color-teal); font-size: 12px; letter-spacing: 2px; font-weight: bold; margin: 0 0 10px; }
h1 { margin: 0 0 10px; font-size: 30px; color: var(--color-ink); }
.sub { color: var(--color-muted); margin: 0 0 28px; }
.field { display: grid; gap: 8px; margin-bottom: 20px; }
label { color: var(--color-muted); font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; }
input { width: 100%; padding: 11px 4px; border: 0; border-bottom: 1px solid var(--color-border); color: var(--color-ink); outline: none; }
input:focus { border-color: var(--color-teal); }
button { width: 100%; padding: 14px 20px; border: 0; border-radius: 5px; background: var(--color-coral); color: var(--color-white); cursor: pointer; font-weight: bold; margin-top: 10px; }
button:hover { background: #d9524b; }
button span { margin-left: 10px; }
</style>
