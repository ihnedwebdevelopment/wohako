<script lang="ts">
  import type { Photo, Project } from '../data/projects';
  let { project }: { project: Project } = $props();
  let current = $state<Photo | null>(null);
  let position = $state(50);
  let shown = $derived(current ?? project.after);
  let compare = $derived(!!project.before && shown.src === project.after.src);
</script>

<div class="project-gallery">
  <div class="comparison project-comparison">
    <img class="comparison-after" src={shown.src} alt={shown.alt} />
    {#if compare && project.before}
      <div class="comparison-before" style:clip-path={`inset(0 ${100 - position}% 0 0)`}><img src={project.before.src} alt={project.before.alt} /></div>
      <span class="comparison-label before">PŘED</span>
      <div class="comparison-line" style:left={`${position}%`}><span>↔</span></div>
      <input type="range" min="0" max="100" bind:value={position} aria-label="Porovnání fotografií před a po" />
      <span class="comparison-label after">PO</span>
    {/if}
  </div>
  <div class="gallery-bottom"><p>{compare ? 'Posunutím porovnejte stav před a po rekonstrukci.' : shown.alt}</p>{#if project.gallery.length > 1}<div class="gallery-thumbs" role="group" aria-label="Další fotografie">{#each project.gallery as photo (photo.src)}<button aria-label={`Zobrazit: ${photo.alt}`} aria-pressed={shown.src === photo.src} class:active={shown.src === photo.src} onclick={() => { current = photo; }}><img src={photo.src} alt="" loading="lazy" /></button>{/each}</div>{/if}</div>
</div>
