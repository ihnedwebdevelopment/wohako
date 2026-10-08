<script lang="ts">
  import Closing from '../../lib/components/Closing.svelte';
  import { lines, pickPhoto, srcset } from '../../lib/content/helpers';
  let { data } = $props();
  let s = $derived(data.content.services);
  let hero = $derived(pickPhoto(data.photos, s.heroPhoto));
</script>

<svelte:head>
  <title>Služby | {data.content.brand.name}</title>
  <meta name="description" content={s.heroText} />
</svelte:head>

<main>
  <section class="page-hero">
    <div>
      <p class="eyebrow">Služby</p>
      <h1>{s.heroTitle} <em>{s.heroAccent}</em></h1>
      <p class="lead">{s.heroText}</p>
      <a class="button" href="/kontakt">Probrat váš projekt <span aria-hidden="true">→</span></a>
    </div>
    {#if hero.src}<img src={hero.src} alt={hero.alt} width={hero.width} height={hero.height} fetchpriority="high" />{/if}
  </section>

  {#each s.items as item, index (item.anchor)}
    {@const photo = pickPhoto(data.photos, item.photo)}
    <section class="section service-detail" class:reversed={index % 2 === 1} id={item.anchor}>
      {#if photo.src}<img src={photo.thumb} srcset={srcset(photo)} sizes="(max-width: 760px) 100vw, 45vw" alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" />{/if}
      <div>
        <p class="eyebrow">{item.eyebrow}</p>
        <h2>{item.title}</h2>
        <p>{item.text}</p>
        <ul class="feature-list">{#each lines(item.bullets) as bullet (bullet)}<li>{bullet}</li>{/each}</ul>
      </div>
    </section>
  {/each}

  <section class="section service-bottom">
    <p class="eyebrow">Od první myšlenky</p>
    <h2>{s.bottomTitle}</h2>
    <p>{s.bottomText}</p>
  </section>

  <Closing title="Pošlete nám svou představu." button="Napsat WOHAKO" eyebrow="Nezávazná poptávka" />
</main>
