<template>
    <footer id="contact" class="footer-cont">
        <div><a class="footer-logo" href="#top">UFLY</a><p>Travel further. Feel closer.</p></div>
        <p class="copyright">Built for better journeys<br />&#169; 2026 UFLY</p>
    </footer>
</template>


<style scoped>

.footer-cont{
    background-color: var(--color-ink);
    color: var(--color-white);
    padding: 42px clamp(24px, 8vw, 110px);
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.footer-logo { color: var(--color-white); text-decoration: none; font-size: 22px; font-weight: bold; letter-spacing: 2px; }
.footer-cont p { color: #aeb9c4; font-size: 13px; }
.copyright { text-align: right; line-height: 1.7; }
@media (max-width: 500px) {
  .footer-cont { align-items: flex-start; flex-direction: column; gap: 18px; }
  .copyright { text-align: left; }
}
</style>