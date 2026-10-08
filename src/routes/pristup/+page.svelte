<script lang="ts">
  import Closing from '../../lib/components/Closing.svelte';
  import { pickPhoto } from '../../lib/content/helpers';
  let { data } = $props();
  let a = $derived(data.content.approach);
  let hero = $derived(pickPhoto(data.photos, a.heroPhoto));
  let strip = $derived(data.photos.filter((photo) => photo.inGallery && photo.id !== hero.id).slice(0, 3));
</script>

<svelte:head>
  <title>Náš přístup | {data.content.brand.name}</title>
  <meta name="description" content={a.heroText} />
</svelte:head>

<main>
  <section class="page-hero">
    <div>
      <p class="eyebrow">Náš přístup</p>
      <h1>{a.heroTitle} <em>{a.heroAccent}</em></h1>
      <p class="lead">{a.heroText}</p>
    </div>
    {#if hero.src}<img src={hero.src} alt={hero.alt} width={hero.width} height={hero.height} fetchpriority="high" />{/if}
  </section>

  <section class="section belief">
    <p class="eyebrow">Co je pro nás podstatné</p>
    <blockquote>„{a.quote}“</blockquote>
    <p>{a.quoteText}</p>
  </section>

  <section class="section process">
    <div class="section-heading"><div><p class="eyebrow">Od představy k realizaci</p><h2>Každý krok má své místo.</h2></div></div>
    <div class="process-grid">
      {#each a.steps as step (step.title)}<article><h3>{step.title}</h3><p>{step.description}</p></article>{/each}
    </div>
  </section>

  {#if strip.length}
    <section class="section photo-row">
      {#each strip as photo (photo.id)}<img src={photo.thumb} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" />{/each}
    </section>
  {/if}

  <Closing title="Povíte nám svůj nápad?" button="Kontaktovat WOHAKO" eyebrow="Začněme rozhovorem" />
</main>
