<script lang="ts">
  import '@fontsource-variable/inter-tight';
  import '@fontsource/instrument-serif/latin-ext-400-italic.css';
  import '@fontsource/instrument-serif/latin-400-italic.css';
  import '../app.css';
  import { onMount, tick } from 'svelte';
  import { page } from '$app/state';
  import { afterNavigate, onNavigate } from '$app/navigation';
  import Intro from '../lib/components/Intro.svelte';
  import { phoneHref } from '../lib/content/helpers';
  import { scanReveal, stopReveal, trackHeader } from '../lib/motion';
  import { whenReady } from '../lib/intro';
  let { data, children } = $props();
  let menuOpen = $state(false);
  let isAdmin = $derived(page.url.pathname.startsWith('/administrator'));
  let c = $derived(data.content);

  const nav = [
    { href: '/sluzby', label: 'Služby' },
    { href: '/realizace', label: 'Realizace' },
    { href: '/galerie', label: 'Galerie' },
    { href: '/3d', label: '3D studio' },
    { href: '/pristup', label: 'Náš přístup' }
  ];
  let header = $state<HTMLElement>();

  onMount(() => {
    if (isAdmin || !header) return;
    const untrack = trackHeader(header);
    const unready = whenReady(() => scanReveal());
    return () => { untrack(); unready(); stopReveal(); };
  });

  afterNavigate(async () => {
    if (isAdmin) return;
    await tick();
    if (document.documentElement.classList.contains('is-ready')) scanReveal();
  });

  // Plynulé přechody mezi stránkami (View Transitions API, kde ho prohlížeč umí).
  onNavigate((navigation) => {
    if (!document.startViewTransition || !document.documentElement.classList.contains('motion')) return;
    if (navigation.from?.url.pathname === navigation.to?.url.pathname) return;
    if (navigation.to?.url.pathname.startsWith('/administrator') || navigation.from?.url.pathname.startsWith('/administrator')) return;
    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });

  const isActive = (href: string) => page.url.pathname === href || page.url.pathname.startsWith(`${href}/`);
</script>

{#if isAdmin}
  {@render children()}
{:else}
<Intro />
<a class="skip-link" href="#obsah">Přeskočit na obsah</a>
<header class="site-header" class:open={menuOpen} bind:this={header}>
  <div class="header-inner">
    <a class="brand" href="/" aria-label={`${c.brand.name} — úvod`} onclick={() => { menuOpen = false; }}>
      <svg viewBox="0 0 40 40" aria-hidden="true"><path d="M7 33V7h26v26M7 20h13v13" /></svg>
      <span>WOHAKO<small>rekonstrukce</small></span>
    </a>
    <nav id="main-nav" aria-label="Hlavní navigace">
      {#each nav as item (item.href)}
        <a href={item.href} class:active={isActive(item.href)} aria-current={isActive(item.href) ? 'page' : undefined} onclick={() => { menuOpen = false; }}>{item.label}</a>
      {/each}
      <a class="nav-contact-mobile" href="/kontakt" onclick={() => { menuOpen = false; }}>Kontakt</a>
    </nav>
    <a class="button small" href="/kontakt">Nezávazná poptávka</a>
    <button class="menu-toggle" aria-label={menuOpen ? 'Zavřít nabídku' : 'Otevřít nabídku'} aria-controls="main-nav" aria-expanded={menuOpen} onclick={() => { menuOpen = !menuOpen; }}><span></span><span></span></button>
  </div>
</header>

<div id="obsah">
  {@render children()}
</div>

<footer class="site-footer">
  <div class="footer-top">
    <div class="footer-brand">
      <a href="/">WOHAKO <span>rekonstrukce</span></a>
      <p>{c.brand.tagline}</p>
    </div>
    <nav aria-label="Patička">
      {#each nav as item (item.href)}<a href={item.href}>{item.label}</a>{/each}
      <a href="/kontakt">Kontakt</a>
    </nav>
    <div class="footer-contact">
      <span>{c.contact.area}</span>
      <a href={`mailto:${c.contact.email}`}>{c.contact.email}</a>
      <a href={`tel:${phoneHref(c.contact.phone)}`}>{c.contact.phone}</a>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© {new Date().getFullYear()} {c.contact.company || c.brand.name}{#if c.contact.ico} · IČO {c.contact.ico}{/if}{#if c.contact.address} · {c.contact.address}{/if}</span>
    <span>Koupelny · WC · Interiéry</span>
  </div>
</footer>
{/if}
