<script lang="ts">
  import Closing from '../../../lib/components/Closing.svelte';
  import Lightbox from '../../../lib/components/Lightbox.svelte';
  import ProjectCard from '../../../lib/components/ProjectCard.svelte';
  import { projectPhotos, srcset } from '../../../lib/content/helpers';
  let { data } = $props();
  let project = $derived(data.project);
  let photos = $derived(projectPhotos(project, data.photos));
  let related = $derived(data.projects.filter((item) => item.id !== project.id).slice(0, 2));
  let lightbox: Lightbox;
</script>

<svelte:head>
  <title>{project.subtitle} | {data.content.brand.name}</title>
  <meta name="description" content={project.description} />
  {#if photos[0]}<meta property="og:image" content={photos[0].src} />{/if}
</svelte:head>

<main>
  <section class="page-intro detail-intro">
    <a href="/realizace" class="back-link">← Všechny realizace</a>
    <p class="eyebrow">{project.category}</p>
    <h1>{project.subtitle}</h1>
    <p class="lead">{project.title}</p>
  </section>

  {#if photos.length}
    <section class="detail-photos" class:single={photos.length === 1}>
      {#each photos as photo, i (photo.id)}
        <button class="photo-open" class:first={i === 0} onclick={() => lightbox.open(photo)} aria-label={`Zvětšit: ${photo.alt}`}>
          <img src={i === 0 ? photo.src : photo.thumb} srcset={i === 0 ? undefined : srcset(photo)} sizes="(max-width: 760px) 100vw, 50vw" alt={photo.alt} width={photo.width} height={photo.height} loading={i === 0 ? 'eager' : 'lazy'} />
        </button>
      {/each}
    </section>
  {/if}

  <section class="section detail-story">
    <div><p class="eyebrow">O realizaci</p><h2>{project.title}</h2></div>
    <div>
      <p class="lead">{project.description}</p>
      {#if project.details}{#each project.details.split(/\n\s*\n/) as paragraph (paragraph)}<p>{paragraph}</p>{/each}{/if}
    </div>
  </section>

  {#if related.length}
    <section class="section">
      <div class="section-heading"><div><p class="eyebrow">Další inspirace</p><h2>Další prostory k prozkoumání.</h2></div><a class="arrow-link" href="/realizace">Všechny realizace <span aria-hidden="true">→</span></a></div>
      <div class="project-grid">{#each related as item (item.id)}<ProjectCard project={item} photos={data.photos} />{/each}</div>
    </section>
  {/if}

  <Closing title="Promluvme si o prostoru, který chcete změnit." button="Kontaktovat WOHAKO" eyebrow="Vaše realizace" />
</main>

<Lightbox bind:this={lightbox} {photos} />
