<script lang="ts">
  import Closing from '../../lib/components/Closing.svelte';
  import Lightbox from '../../lib/components/Lightbox.svelte';
  let { data } = $props();
  let g = $derived(data.content.gallery);
  let all = $derived(data.photos.filter((photo) => photo.inGallery));
  let categories = $derived([...new Set(all.map((photo) => photo.category).filter(Boolean))]);
  let filter = $state('');
  let visible = $derived(all.filter((photo) => !filter || photo.category === filter));
  let lightbox: Lightbox;
</script>

<svelte:head>
  <title>Galerie | {data.content.brand.name}</title>
  <meta name="description" content={g.text} />
</svelte:head>

<main>
  <section class="page-intro">
    <p class="eyebrow">Galerie</p>
    <h1>{g.title} <em>{g.accent}</em></h1>
    <p class="lead">{g.text}</p>
  </section>

  <section class="section" aria-label="Fotogalerie realizací">
    {#if categories.length > 1}
      <div class="filters" role="group" aria-label="Filtrovat fotografie">
        <button class:active={!filter} aria-pressed={!filter} onclick={() => { filter = ''; }}>Vše</button>
        {#each categories as category (category)}
          <button class:active={filter === category} aria-pressed={filter === category} onclick={() => { filter = category; }}>{category}</button>
        {/each}
      </div>
    {/if}
    <p class="sr-only" aria-live="polite">Zobrazeno {visible.length} fotografií</p>
    <div class="masonry">
      {#each visible as photo (photo.id)}
        <button class="photo-open" onclick={() => lightbox.open(photo)} aria-label={`Zvětšit: ${photo.alt}`}>
          <img src={photo.thumb} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async" />
        </button>
      {/each}
    </div>
  </section>

  <Closing title="Dejte své představě skutečný prostor." button="Popsat svou představu" eyebrow="Další proměna může být vaše" />
</main>

<Lightbox bind:this={lightbox} photos={visible} />
