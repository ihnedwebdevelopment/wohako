<script lang="ts">
  import { tick, onMount } from 'svelte';
  import type { ModelKey, Photo, Project } from '../data/projects';

  let { onexplore }: { onexplore: (key: ModelKey) => void } = $props();
  let dialog: HTMLDialogElement;
  let project = $state<Project | null>(null);
  let after = $state<Photo | null>(null);
  let position = $state(50);

  export async function open(item: Project) {
    project = item;
    after = item.after;
    position = 50;
    await tick();
    dialog.showModal();
  }

  function explore() {
    if (!project?.modelId) return;
    dialog.close();
    onexplore(project.modelId);
  }

  onMount(() => {
    const lock = () => { document.body.style.overflow = 'hidden'; };
    const unlock = () => { document.body.style.overflow = ''; };
    const mutation = new MutationObserver(() => dialog.open ? lock() : unlock());
    mutation.observe(dialog, { attributes: true, attributeFilter: ['open'] });
    return () => { mutation.disconnect(); unlock(); };
  });

  function closeOnBackdrop(event: MouseEvent) {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  }
</script>

<dialog bind:this={dialog} aria-labelledby="dialog-title" onclick={closeOnBackdrop}>
  {#if project && after}
    <div class="dialog-head">
      <div>
        <p class="eyebrow">{project.category}</p>
        <h2 id="dialog-title">{project.title}</h2>
      </div>
      <button class="close-button" aria-label="Zavřít detail" onclick={() => dialog.close()}>×</button>
    </div>
    <div class="comparison">
      <img class="comparison-after" src={after.src} alt={after.alt} />
      {#if project.before && after.src === project.after.src}
        <div class="comparison-before" style:clip-path={`inset(0 ${100 - position}% 0 0)`}>
          <img src={project.before.src} alt={project.before.alt} />
        </div>
        <span class="comparison-label before">PŘED</span>
        <div class="comparison-line" style:left={`${position}%`}><span>↔</span></div>
        <input type="range" min="0" max="100" bind:value={position} aria-label="Porovnání fotografií před a po" />
      {/if}
      {#if project.before && after.src === project.after.src}<span class="comparison-label after">PO</span>{/if}
    </div>
    <p class="comparison-instruction">
      {project.before && after.src === project.after.src ? 'Posuňte dělicí čáru a prohlédněte si proměnu.' : 'Fotografie dokončeného interiéru.'}
    </p>
    <div class="dialog-bottom">
      <p>{project.description}</p>
      {#if project.modelId}<button class="button dark" onclick={explore}>Prozkoumat ve 3D</button>{/if}
    </div>
    <div class="dialog-gallery">
      {#each project.gallery as photo (photo.src)}
        <button
          class:active={after.src === photo.src}
          aria-label={`Zobrazit: ${photo.alt}`}
          aria-pressed={after.src === photo.src}
          onclick={() => { after = photo; }}
        >
          <img src={photo.src} alt="" />
        </button>
      {/each}
    </div>
  {/if}
</dialog>
