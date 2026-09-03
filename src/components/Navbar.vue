<template>
<nav class="navbar" aria-label="Main navigation">
  <a class="logo" href="#top" aria-label="UFLY home"><span>U</span>FLY</a>
  <ul class="nav-links">
    <li><a href="#top">Home</a></li>
    <li><a href="#destinations">Destinations</a></li>
    <li><a href="#contact">Contact</a></li>
    </ul>
  <a class="nav-action" href="#search">Search flights <span aria-hidden="true">&#8594;</span></a>
</nav>
</template>

<style scoped>
.navbar {
    background-color: var(--color-white);
    padding: 22px clamp(24px, 5vw, 72px);
    display: flex;
    align-items: center;
    gap: 40px;
}
.logo {
  color: var(--color-ink);
  text-decoration: none;
  font-weight: bold;
  font-size: 22px;
  letter-spacing: 2px;
}
.logo span {
  display: inline-grid;
  place-items: center;
  width: 32px;
  height: 32px;
  margin-right: 3px;
  border-radius: 50%;
  background: var(--color-coral);
  color: var(--color-white);
}
.nav-links {
  list-style: none;
  display: flex;
  gap: 28px;
  flex: 1;
  margin: 0;
  padding: 0;
}
.nav-links a {
  color: var(--color-muted);
  text-decoration: none;
  font-size: 14px;
  font-weight: bold;
}
.nav-links a:hover,
.nav-links a:focus-visible {
  color: var(--color-teal);
}
.nav-action {
  color: var(--color-teal);
  text-decoration: none;
  font-size: 14px;
  font-weight: bold;
}
.nav-action span { margin-left: 8px; font-size: 18px; }

@media (max-width: 620px) {
  .navbar { gap: 18px; flex-wrap: wrap; }
  .nav-links { order: 3; flex-basis: 100%; justify-content: space-between; gap: 10px; }
}

</style>