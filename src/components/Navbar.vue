<template>
<nav class="navbar">
    <div class="logo">UFLY</div>
    <ul class="NavLinks">
        <li>Home</li>
        <li>Popular Destinations</li>
        <li>Contact</li>
    </ul>
    <input type="text" placeholder="Search Flight" class="SearchBar">

</nav>
</template>

<style scoped>
.navbar{
    background-color: var(--color-light-blue);
    padding: 15px 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
}
.logo {
  background-color: var(--color-card-orange) ;
  border-radius:50% ;
  font-weight: bold;
  font-size: 20px;
  color: var(--color-orange);
}
.NavLinks {
  color: var(--color-text);
  list-style: none;
  display: flex;
  gap: 20px;
  margin: 0;
  padding: 0;
  cursor: pointer;
  font-weight: bold;
  

}
.SearchBar {
  padding: 6px 10px;
  border-radius: 8px;
  border: none;
}
.SearchBar{
    border-radius: 20px;
}



</style>