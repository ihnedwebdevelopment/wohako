<script lang="ts">
  let { data } = $props();
</script>

<svelte:head><title>Přehled | Administrace WOHAKO</title></svelte:head>

<header class="admin-head">
  <h1>Dobrý den</h1>
  <p>Tady upravíte obsah webu. Změny se na webu projeví během několika vteřin po uložení.</p>
</header>

{#if data.status === 'error'}
  <p class="notice error">Nepodařilo se připojit k databázi. Zkontrolujte <code>MONGODB_URI</code> a v MongoDB Atlas povolte přístup z adresy 0.0.0.0/0 (Network Access).</p>
{:else if data.status === 'ok'}
  <p class="notice ok">Databáze je připojená.</p>
{/if}

<div class="cards">
  <a class="card" href="/administrator/texty">
    <h2>Texty a kontakty</h2>
    <p>Nadpisy, popisy služeb, kroky spolupráce, telefon a e-mail.</p>
    <span class="card-meta">{data.contact.phone} · {data.contact.email}</span>
  </a>
  <a class="card" href="/administrator/fotky">
    <h2>Fotky</h2>
    <p>Nahrávání nových fotek, popisky, pořadí a zobrazení v galerii.</p>
    <span class="card-meta">{data.photoCount} fotek · {data.galleryCount} v galerii</span>
  </a>
  <a class="card" href="/administrator/realizace">
    <h2>Realizace</h2>
    <p>Hotové zakázky s fotkami a popisem. Přidání, úprava, skrytí.</p>
    <span class="card-meta">{data.projectCount} realizací · {data.publishedCount} zveřejněno</span>
  </a>
</div>

<section class="help">
  <h2>Jak na to</h2>
  <ol>
    <li><strong>Nová zakázka:</strong> nejdřív nahrajte fotky v sekci Fotky, potom v sekci Realizace klikněte na „Přidat realizaci“ a fotky vyberte.</li>
    <li><strong>Pořadí fotek:</strong> šipkami ↑ ↓ určíte, v jakém pořadí se fotky zobrazí v galerii.</li>
    <li><strong>Skrytí:</strong> realizaci můžete skrýt, aniž byste ji mazali. Fotku stačí odškrtnout z galerie.</li>
  </ol>
</section>
