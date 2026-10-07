<script lang="ts">
  import '../app.css';
  import { page } from '$app/state';
  import { site } from '../lib/data/site';
  let { children } = $props();
  let menuOpen = $state(false);
</script>

<header class="header site-header">
  <a class="brand" href="/" aria-label={`${site.name} — úvod`} onclick={() => { menuOpen = false; }}>
    <svg viewBox="0 0 40 40" aria-hidden="true"><path d="M6 34V6h28v28M6 20h14v14" /></svg>
    <span>{site.brandTop}<small>{site.brandBottom}</small></span>
  </a>
  <nav class:open={menuOpen} id="main-nav" aria-label="Hlavní navigace">
    <a class:active={page.url.pathname === '/sluzby'} aria-current={page.url.pathname === '/sluzby' ? 'page' : undefined} href="/sluzby" onclick={() => { menuOpen = false; }}>Služby</a>
    <a class:active={page.url.pathname.startsWith('/realizace')} aria-current={page.url.pathname === '/realizace' ? 'page' : undefined} href="/realizace" onclick={() => { menuOpen = false; }}>Realizace</a>
    <a class:active={page.url.pathname === '/galerie'} aria-current={page.url.pathname === '/galerie' ? 'page' : undefined} href="/galerie" onclick={() => { menuOpen = false; }}>Galerie</a>
    <a class:active={page.url.pathname === '/3d'} aria-current={page.url.pathname === '/3d' ? 'page' : undefined} href="/3d" onclick={() => { menuOpen = false; }}>3D studio</a>
    <a class:active={page.url.pathname === '/pristup'} aria-current={page.url.pathname === '/pristup' ? 'page' : undefined} href="/pristup" onclick={() => { menuOpen = false; }}>Náš přístup</a>
  </nav>
  <a class="nav-cta" href="/kontakt">Pojďme to probrat <span class="cube-icon" aria-hidden="true">↗</span></a>
  <button class="menu-toggle" aria-label={menuOpen ? 'Zavřít nabídku' : 'Otevřít nabídku'} aria-controls="main-nav" aria-expanded={menuOpen} onclick={() => { menuOpen = !menuOpen; }}><span></span><span></span><span></span></button>
</header>

{@render children()}

<footer class="site-footer">
  <div class="footer-top">
    <div><a class="footer-brand" href="/">WOHAKO<span>rekonstrukce</span></a><p>Proměny, ve kterých se dobře žije.</p></div>
    <nav aria-label="Patička"><a href="/sluzby">Služby</a><a href="/realizace">Realizace</a><a href="/galerie">Galerie</a><a href="/3d">3D studio</a><a href="/pristup">Náš přístup</a><a href="/kontakt">Kontakt</a></nav>
    <div class="footer-contact"><span>{site.area}</span><a href={`mailto:${site.email}`}>{site.email}</a><a href={`tel:${site.phoneHref}`}>{site.phoneDisplay}</a></div>
  </div>
  <div class="footer-bottom"><span>© {new Date().getFullYear()} WOHAKO rekonstrukce</span><span>Koupelny · Kuchyně · Interiéry</span></div>
</footer>
