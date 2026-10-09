<script lang="ts">
  import '@fontsource-variable/inter-tight';
  import '@fontsource/instrument-serif/latin-ext-400-italic.css';
  import '@fontsource/instrument-serif/latin-400-italic.css';
  import '../app.css';
  import { onMount, tick } from 'svelte';
  import { page } from '$app/state';
  import { afterNavigate, onNavigate } from '$app/navigation';
  import Intro from '../lib/components/Intro.svelte';
  import BrandMark from '../lib/components/BrandMark.svelte';
  import InquiryModal from '../lib/components/InquiryModal.svelte';
  import ContactFab from '../lib/components/ContactFab.svelte';
  import { openInquiry } from '../lib/inquiry.svelte';
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

  // Odkazy na /kontakt mimo navigaci a patičku otevřou okno s formulářem.
  function interceptContact(event: MouseEvent) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = (event.target as Element | null)?.closest?.('a[href="/kontakt"]');
    if (!link || link.closest('nav, footer') || page.url.pathname === '/kontakt') return;
    event.preventDefault();
    menuOpen = false;
    openInquiry(link.textContent?.trim().replace(/\s*→$/, '') || 'Odkaz na webu');
  }

  const isActive = (href: string) => page.url.pathname === href || page.url.pathname.startsWith(`${href}/`);
</script>

<svelte:head>
  {#if c.brand.favicon}
    <link rel="icon" type="image/png" href={c.brand.favicon} />
    <link rel="apple-touch-icon" href={c.brand.favicon} />
  {:else}
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  {/if}
</svelte:head>

<svelte:window onclickcapture={interceptContact} />

{#if isAdmin}
  {@render children()}
{:else}
<Intro brand={c.brand} />
<a class="skip-link" href="#obsah">Přeskočit na obsah</a>
<header class="site-header" class:open={menuOpen} bind:this={header}>
  <div class="header-inner">
    <a class="brand" href="/" aria-label={`${c.brand.name} — úvod`} onclick={() => { menuOpen = false; }}>
      <BrandMark brand={c.brand} />
    </a>
    <nav id="main-nav" aria-label="Hlavní navigace">
      {#each nav as item (item.href)}
        <a href={item.href} class:active={isActive(item.href)} aria-current={isActive(item.href) ? 'page' : undefined} onclick={() => { menuOpen = false; }}>{item.label}</a>
      {/each}
      <a class="nav-contact-mobile" href="/kontakt" onclick={() => { menuOpen = false; }}>Kontakt</a>
    </nav>
    <a class="button small header-cta" href="/kontakt">Cenová nabídka zdarma</a>
    <button class="menu-toggle" aria-label={menuOpen ? 'Zavřít nabídku' : 'Otevřít nabídku'} aria-controls="main-nav" aria-expanded={menuOpen} onclick={() => { menuOpen = !menuOpen; }}><span></span><span></span></button>
  </div>
</header>

<div id="obsah">
  {@render children()}
</div>

<footer class="site-footer">
  <div class="footer-top">
    <div class="footer-brand">
      {#if c.brand.logo}<a href="/" class="footer-logo" aria-label={`${c.brand.name} — úvod`}><BrandMark brand={c.brand} place="footer" /></a>{:else}<a href="/">WOHAKO <span>rekonstrukce</span></a>{/if}
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

<InquiryModal email={c.contact.email} phone={c.contact.phone} />
{#if page.url.pathname !== '/kontakt'}<ContactFab />{/if}
{/if}
