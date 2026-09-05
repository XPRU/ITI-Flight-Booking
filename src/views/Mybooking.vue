<template>
    <section class="mybooking">
       <h1>My booking</h1>
       <div class="booking-card" v-if="booking && !confirm ">
    <h3>{{ booking.from }} &#8594;{{ booking.to }}</h3>
    <p>airline:{{ booking.airline }}</p>
     <p>price:{{ booking.price }} {{ booking.currency }}</p>
     <p>Duration:{{ booking.duration }}</p>
     <p>seatsAvailable:{{ booking.seatsAvailable }}</p>
     <button class="btn-cancel" @click="cancelbooking"> cancelbooking</button>
     <button  class="btn-confir" @click="confirmbooking">confirmbooking</button>
     </div>
     <div v-if="confirm"> 
         <p class=" confirmp"> <span class="confirms">&#10003;</span> تم الحجز بنجاح</p>
     </div>
       <div  v-if="!booking">
        <p class="cancelp"><span class="cancel">X</span>تم الغاء الحجز </p>
       </div>
       <div class="action">
        <button @click="gohome">gohome <span>&rarr;</span></button>
        <button @click="goflights" class="btn-filgts">goflights <span>&rarr;</span></button>
       </div>
    </section>
</template>
<script setup>
 import { onMounted, ref } from 'vue';
import {  useRouter } from 'vue-router';
 const router =useRouter()
 const booking =ref(null)
 const confirm= ref(false)
 onMounted(()=>{
    const savbooking=localStorage.getItem('bookingflight')
    if(savbooking){
        booking.value=JSON.parse(savbooking)
    }
 })
  async function confirmbooking(){
    confirm.value=true

}
  

 function cancelbooking(){
    localStorage.removeItem('bookingflight')
    booking.value=null
 }
  function gohome() {
        router.push( '/')
    }
    function goflights() {
        router.push('/flights')
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
    margin-bottom: 30px;
    box-shadow:0 2px 8px rgba(20, 33,61, 0.02);
    transition: 0.5s ease;
}
   
.booking-card:hover{
    
    transform: translateY(-2px);
    box-shadow:0 3px 10px rgba(20, 33,61, 0.04);
}


.btn-cancel{
    min-width: 150px;
 margin-top:20px;
 padding: 10px 20px;
 border: none;
 border-radius: 7px;
 background: var(--color-coral);
 color: var(--color-white);
 font-weight: bold;
 cursor: pointer;

}
.cancel{
    color:var(--color-coral);
    font-size: 25px;
    font-weight: bold;
}
.cancelp{
    font-size: 25px;
    color: var(--color-ink);
    font-weight: bold;


}
.action {
     display: flex;
     flex-direction: column;
     gap: 5px;
     align-items:flex-start;
}
.action button{
    background: none;
    border: none;
    font-size: 18px;
    color: var(--color-teal);
    margin-left:5px;
}
.btn-confir{
    min-width: 150px;
     margin-top:20px;
 padding: 10px 20px;
 border: none;
 border-radius: 7px;
 background: var(--color-coral);
 color: var(--color-white);
 font-weight: bold;
 cursor: pointer;
 margin: 10px;
}

.btn-filgts{
    margin-bottom: 20px;
}
.confirmp{
     font-size: 25px;
    color: var(--color-ink);
    font-weight: bold;

}
.confirms{
  color: var(--color-teal);
  font-size: 30pxpx;
}
</style>