<script lang="ts">
  import { onMount } from 'svelte';
  import { galleryPhotos, type GalleryCategory, type GalleryPhoto } from '../../lib/data/gallery';
  const filters: { id: GalleryCategory; label: string }[] = [{ id: 'vse', label: 'Všechny prostory' }, { id: 'koupelny', label: 'Koupelny a WC' }, { id: 'kuchyne', label: 'Kuchyně' }, { id: 'podkrovi', label: 'Podkroví' }, { id: 'interiery', label: 'Interiéry' }];
  let filter = $state<GalleryCategory>('vse');
  let visible = $derived(galleryPhotos.filter((photo) => filter === 'vse' || photo.category === filter));
  let selected = $state<GalleryPhoto | null>(null);
  let dialog: HTMLDialogElement;
  onMount(() => {
    const category = new URLSearchParams(window.location.search).get('typ');
    if (filters.some((item) => item.id === category)) filter = category as GalleryCategory;
  });
  $effect(() => {
    if (!selected) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  });
  function open(photo: GalleryPhoto) { selected = photo; dialog.showModal(); }
  function step(direction: number) {
    const index = visible.findIndex((photo) => photo.id === selected?.id);
    selected = visible[(index + direction + visible.length) % visible.length];
  }
  function keydown(event: KeyboardEvent) {
    if (!dialog?.open) return;
    if (event.key === 'ArrowRight') { event.preventDefault(); step(1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); step(-1); }
  }
</script>

<svelte:head><title>Galerie proměn | WOHAKO rekonstrukce</title><meta name="description" content="Projděte si fotogalerii rekonstrukcí WOHAKO. Koupelny, kuchyně, podkroví i pohled do průběhu stavebních prací." /></svelte:head>
<svelte:window onkeydown={keydown} />

<main>
  <section class="gallery-hero"><div><p class="eyebrow">ZA KAŽDÝM DETAILEM JE PRÁCE</p><h1>Prostor se mění.<br /><em>Příběh zůstává.</em></h1><p>Od odhaleného zdiva až po poslední detail. Nahlédněte do našich rekonstrukcí tak, jak skutečně vznikají.</p><a class="arrow-link" href="#fotografie">Procházet fotografie <span aria-hidden="true">↓</span></a></div><div class="gallery-hero-images"><img class="gallery-hero-main" src="/assets/galerie/podkrovi-hotove.webp" alt="Dokončené světlé podkroví s přiznanými trámy" fetchpriority="high" /><img class="gallery-hero-detail" src="/assets/galerie/cerna-koupelna-detail-nahled.webp" alt="Detail kamenné kresby v černé koupelně" /><span>DŘEVO · KÁMEN · SVĚTLO</span></div></section>
  <section class="section photo-collection" id="fotografie" aria-label="Fotogalerie realizací">
    <div class="portfolio-toolbar"><p>Hotové prostory i cesta k nim</p><div role="group" aria-label="Filtrovat fotografie">{#each filters as item}<button class:active={filter === item.id} aria-pressed={filter === item.id} onclick={() => { filter = item.id; }}>{item.label}</button>{/each}</div></div>
    <p class="sr-only" aria-live="polite">Zobrazeno {visible.length} fotografií</p>
    <div class="photo-masonry">{#each visible as photo (photo.id)}<figure><button class="photo-open" aria-label={`Zvětšit: ${photo.alt}`} onclick={() => open(photo)}><img src={photo.thumb} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async" /><span class="photo-enlarge" aria-hidden="true">↗</span></button><figcaption><span>{photo.stage}</span><p>{photo.alt}</p></figcaption></figure>{/each}</div>
  </section>
  <section class="closing"><p class="eyebrow">DALŠÍ PROMĚNA MŮŽE BÝT VAŠE</p><h2>Dejte své představě<br />skutečný prostor.</h2><a class="button light-button" href="/kontakt#poptavka">Popsat svou představu <span aria-hidden="true">↗</span></a></section>
</main>

<dialog class="photo-lightbox" bind:this={dialog} onclose={() => { selected = null; }} aria-label="Zvětšená fotografie realizace">
  <button class="lightbox-close" onclick={() => dialog.close()} aria-label="Zavřít fotografii">✕</button>
  {#if selected}<div class="lightbox-stage"><img src={selected.src} alt={selected.alt} width={selected.width} height={selected.height} /><button class="lightbox-prev" onclick={() => step(-1)} aria-label="Předchozí fotografie">←</button><button class="lightbox-next" onclick={() => step(1)} aria-label="Další fotografie">→</button></div><div class="lightbox-caption" aria-live="polite"><span>{selected.stage}</span><p>{selected.alt}</p><small>Procházejte šipkami · Escape zavře fotografii</small></div>{/if}
</dialog>
