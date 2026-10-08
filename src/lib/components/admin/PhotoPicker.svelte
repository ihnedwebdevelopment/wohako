<script lang="ts">
  type Option = { id: string; thumb: string; alt: string };
  let { label, name, value, photos, onchange }: { label: string; name: string; value: string; photos: Option[]; onchange?: () => void } = $props();
  let selected = $state('');
  let open = $state(false);
  $effect.pre(() => { selected = value; });
  let current = $derived(photos.find((photo) => photo.id === selected));
</script>

<fieldset class="picker wide">
  <legend>{label}</legend>
  <div class="picker-current">
    {#if current}<img src={current.thumb} alt="" />{:else}<span class="picker-empty">Fotka chybí — použije se první fotka.</span>{/if}
    <button type="button" class="btn" onclick={() => { open = !open; }} aria-expanded={open}>{open ? 'Hotovo' : 'Změnit fotku'}</button>
  </div>
  <input type="hidden" {name} value={selected} />
  {#if open}
    <div class="picker-grid" role="radiogroup" aria-label={label}>
      {#each photos as photo (photo.id)}
        <button type="button" role="radio" aria-checked={selected === photo.id} class:active={selected === photo.id} title={photo.alt} onclick={() => { selected = photo.id; onchange?.(); }}>
          <img src={photo.thumb} alt={photo.alt} loading="lazy" />
        </button>
      {/each}
    </div>
  {/if}
</fieldset>
