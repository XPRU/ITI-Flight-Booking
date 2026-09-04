<template>
    <section class="mybooking">
       <h1>My booking</h1>
       <div class="booking-card" v-if="booking">
    <h3>{{ booking.from }} &#8594;{{ booking.to }}</h3>
    <p>airline:{{ booking.airline }}</p>
     <p>price:{{ booking.price }} {{ booking.currency }}</p>
     <p>Duration:{{ booking.duration }}</p>
     <p>seatsAvailable:{{ booking.seatsAvailable }}</p>
     <button class="btn-cancel" @click="cancelbooking"> cancel Reservation</button>
       </div>
       <div  v-else>
        <p>No booking yet</p>
       </div>
    </section>
</template>
<script setup>
 import { onMounted, ref } from 'vue';
 const booking =ref(null)
 onMounted(()=>{
    const savbooking=localStorage.getItem('bookingflight')
    if(savbooking){
        booking.value=JSON.parse(savbooking)
    }
 })

 function cancelbooking(){
    localStorage.removeItem('bookingflight')
    booking.value=null
 }
</script>
<style scoped>
.Mybooking{
    min-height:100vh;
    padding: 90px clamp(24px,8vw,110px);
    background: var(--color-sky);
}
.Mybooking h1{
 color: var(--color-ink);
 font-size:50px;
 margin-bottom:25px;
}
 .Mybooking div{
    max-width: 700px;
}
.Mybooking h3{
    color: var(--color-ink);
    font-size:25px;
    margin-bottom:20px;
}
.Mybooking p{
color: var(--color-ink);
font-size: 20px;
margin-bottom: 10px;
}
.booking-card{
    background: var( --color-white);
    padding: 10px;
    border-radius: 10px;
    border:1px solid var(--color-border);
    box-shadow:0 6px 18px rgba(20, 33,61, 0.06);
    margin-bottom: 30px;
}
.btn-cancel{
 margin-top:20px;
 padding: 10px 20px;
 border: none;
 border-radius: 7px;
 background: var(--color-coral);
 color: var(--color-white);
 font-weight: bold;
cursor: pointer;
}
 
</style>