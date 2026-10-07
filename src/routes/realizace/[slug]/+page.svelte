<script lang="ts">
  import ProjectGallery from '../../../lib/components/ProjectGallery.svelte';
  import { projects } from '../../../lib/data/projects';
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();
  let project = $derived(data.project);
  let related = $derived(projects.filter((item) => item.id !== project.id).slice(0, 2));
</script>

<svelte:head>
  <title>{project.subtitle} | WOHAKO rekonstrukce</title>
  <meta name="description" content={`${project.description} Prohlédněte si realizaci WOHAKO rekonstrukce.`} />
</svelte:head>

<main>
  <section class="detail-intro"><a href="/realizace" class="back-link">← Všechny realizace</a><p class="eyebrow">{project.category}</p><h1>{project.title}</h1><p>{project.subtitle}</p></section>
  <section class="detail-photo"><img src={project.after.src} alt={project.after.alt} fetchpriority="high" /></section>
  <section class="section detail-story"><div><p class="eyebrow">PŘÍBĚH PROSTORU</p><h2>Každý detail<br />tvoří celek.</h2></div><div><p>{project.description}</p><p>Podívejte se na fotografii realizace a její výchozí stav. 3D studie, pokud je u projektu dostupná, ukazuje prostor také z dalších úhlů.</p>{#if project.modelId}<a class="arrow-link" href={`/3d?model=${project.modelId}`}>Otevřít 3D studii <span aria-hidden="true">↗</span></a>{/if}</div></section>
  <section class="section detail-gallery-section"><div class="section-heading"><div><p class="eyebrow">BLÍŽE K REALIZACI</p><h2>Podívejte se<br />na proměnu.</h2></div></div><ProjectGallery {project} /></section>
  <section class="section related-section"><div class="section-heading"><div><p class="eyebrow">DALŠÍ INSPIRACE</p><h2>Další prostory<br />k prozkoumání.</h2></div><a class="arrow-link" href="/realizace">Všechny realizace <span aria-hidden="true">↗</span></a></div><div class="related-grid">{#each related as item (item.id)}<a class="related-card" href={`/realizace/${item.id}`}><img src={item.after.src} alt={item.after.alt} loading="lazy" /><div><span>{item.subtitle}</span><h3>{item.title}</h3><b aria-hidden="true">↗</b></div></a>{/each}</div></section>
  <section class="closing"><p class="eyebrow">VAŠE REALIZACE</p><h2>Promluvme si o prostoru,<br />který chcete změnit.</h2><a class="button light-button" href="/kontakt">Kontaktovat WOHAKO <span aria-hidden="true">↗</span></a></section>
</main>
