<script lang="ts">
  import '@fontsource-variable/inter-tight';
  import '../../lib/admin.css';
  import { page } from '$app/state';
  import { navigating } from '$app/state';
  import BrandMark from '../../lib/components/BrandMark.svelte';
  let { data, children } = $props();

  const nav = [
    { href: '/administrator', label: 'Přehled' },
    { href: '/administrator/texty', label: 'Texty a kontakty' },
    { href: '/administrator/fotky', label: 'Fotky' },
    { href: '/administrator/logo', label: 'Logo' },
    { href: '/administrator/realizace', label: 'Realizace' }
  ];
  const active = (href: string) => (href === '/administrator' ? page.url.pathname === href : page.url.pathname.startsWith(href));
</script>

<svelte:head><meta name="robots" content="noindex, nofollow" /></svelte:head>

{#if data.admin}
  <div class="admin-shell">
    <aside class="admin-side">
      <a class="admin-brand" href="/administrator"><BrandMark brand={page.data.content.brand} place="admin" sub="administrace" /></a>
      <nav aria-label="Administrace">
        {#each nav as item (item.href)}<a href={item.href} class:active={active(item.href)} aria-current={active(item.href) ? 'page' : undefined}>{item.label}</a>{/each}
      </nav>
      <div class="admin-side-bottom">
        <a href="/" target="_blank" rel="noopener" data-sveltekit-reload>Zobrazit web ↗</a>
        <form method="POST" action="/administrator/odhlaseni"><button>Odhlásit se</button></form>
      </div>
    </aside>
    <div class="admin-main" class:loading={!!navigating.to}>
      {#if !data.dbConfigured}
        <p class="notice warn">Databáze není připojená (chybí <code>MONGODB_URI</code>). Web zobrazuje výchozí obsah a změny nelze uložit.</p>
      {/if}
      {@render children()}
    </div>
  </div>
{:else}
  {@render children()}
{/if}
