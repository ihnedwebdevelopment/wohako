<script lang="ts">
  import type { Photo } from '../content/types';
  let { photos }: { photos: Photo[] } = $props();
  let dialog: HTMLDialogElement;
  let index = $state(-1);
  let current = $derived(index >= 0 ? photos[index] : null);

  export function open(photo: Photo) {
    index = photos.findIndex((item) => item.id === photo.id);
    dialog.showModal();
  }
  function step(direction: number) {
    if (!photos.length) return;
    index = (index + direction + photos.length) % photos.length;
  }
  function keydown(event: KeyboardEvent) {
    if (!dialog?.open) return;
    if (event.key === 'ArrowRight') { event.preventDefault(); step(1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); step(-1); }
  }
  function backdrop(event: MouseEvent) {
    if (event.target === dialog) dialog.close();
  }
  $effect(() => {
    if (!current) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  });
</script>

<svelte:window onkeydown={keydown} />

<dialog class="lightbox" bind:this={dialog} onclose={() => { index = -1; }} onclick={backdrop} aria-label="Zvětšená fotografie">
  <button class="lightbox-close" onclick={() => dialog.close()} aria-label="Zavřít">✕</button>
  {#if current}
    <figure>
      <img src={current.src} alt={current.alt} width={current.width} height={current.height} />
      <figcaption aria-live="polite"><span>{index + 1} / {photos.length}</span> {current.alt}</figcaption>
    </figure>
    {#if photos.length > 1}
      <button class="lightbox-prev" onclick={() => step(-1)} aria-label="Předchozí fotografie">←</button>
      <button class="lightbox-next" onclick={() => step(1)} aria-label="Další fotografie">→</button>
    {/if}
  {/if}
</dialog>
