<script lang="ts">
  import { onMount } from 'svelte';
  import { models, materialOptions, viewOptions, type MaterialKey, type ModelKey, type ViewKey } from '../data/models3d';
  import type { ViewerHandle } from '../three/viewer';

  let { selected = $bindable('compact') }: { selected?: ModelKey } = $props();
  let host: HTMLDivElement;
  let viewer = $state<ViewerHandle | null>(null);
  let material = $state<MaterialKey>('original');
  let view = $state<ViewKey>('perspective');
  let rotating = $state(false);
  let status = $state<'waiting' | 'loading' | 'ready' | 'error'>('waiting');
  let error = $state('');

  $effect(() => { viewer?.setModel(selected, material); });
  $effect(() => {
    if (!viewer) return;
    viewer.setView(view);
    rotating = false;
  });
  $effect(() => { viewer?.rotate(rotating); });

  function changeView(next: ViewKey) {
    view = next;
    rotating = false;
    viewer?.setView(next);
  }

  onMount(() => {
    let disposed = false;
    let instance: ViewerHandle | null = null;
    let starting: Promise<void> | null = null;

    async function initialize() {
      status = 'loading';
      try {
        const { createViewer } = await import('../three/viewer');
        if (disposed) return;
        instance = createViewer(host, () => {
          status = 'error';
          error = '3D prohlídka byla přerušena. Pro opětovné načtení obnovte stránku.';
        });
        instance.setModel(selected, material);
        instance.setView(view);
        viewer = instance;
        status = 'ready';
      } catch (cause) {
        if (disposed) return;
        instance?.destroy();
        instance = null;
        status = 'error';
        error = 'Pro interaktivní model povolte WebGL nebo použijte aktuální prohlížeč. Fotografie realizací najdete v galerii.';
        console.warn('3D prohlídka není dostupná:', cause);
      }
    }
    const near = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      near.disconnect();
      starting ??= initialize();
    }, { rootMargin: '500px' });
    near.observe(host);
    return () => {
      disposed = true;
      near.disconnect();
      instance?.destroy();
    };
  });
</script>

<section class="viewer-section" id="prohlidka">
  <div class="section-heading">
    <div><p class="eyebrow">Z jiné perspektivy</p><h2>Projděte si prostor. Ještě než do něj vstoupíte.</h2></div>
    <p>Otočte model, přibližte si detail a vyzkoušejte jiný odstín materiálu.</p>
  </div>
  <div class="viewer-shell">
    <div class="viewer-main">
      <div class="viewer-top">
        <span class="viewer-label">Interaktivní 3D</span>
        <button class="icon-button" aria-label="Obnovit výchozí pohled" title="Obnovit pohled" disabled={status !== 'ready'} onclick={() => changeView('perspective')}>↺</button>
      </div>
      <div
        id="canvas-host"
        bind:this={host}
        tabindex="-1"
        role="region"
        aria-label="Interaktivní 3D model. Šipkami otočíte pohled, klávesami plus a mínus přiblížíte nebo oddálíte."
        aria-describedby="viewer-instructions"
        data-model={selected}
        data-material={material}
        data-view={view}
      >
        {#if status !== 'ready'}
          <div class="viewer-loading" role="status" aria-live="polite">
            {#if status === 'error'}
              <strong>3D prohlídku nelze zobrazit.</strong>
              <p>{error}</p>
            {:else}
              <span class="loading-spinner" aria-hidden="true"></span>
              Připravuji 3D prostor…
            {/if}
          </div>
        {/if}
      </div>
      <div class="viewer-toolbar">
        <div class="view-options" role="group" aria-label="Pohled na model">
          {#each viewOptions as option (option.id)}
            <button class:active={view === option.id} aria-pressed={view === option.id} disabled={status !== 'ready'} onclick={() => changeView(option.id)}>{option.label}</button>
          {/each}
        </div>
        <div class="zoom-options">
          <button aria-label="Oddálit" disabled={status !== 'ready'} onclick={() => viewer?.zoom(1.22)}>−</button>
          <button aria-label="Přiblížit" disabled={status !== 'ready'} onclick={() => viewer?.zoom(0.82)}>+</button>
        </div>
      </div>
      <p class="viewer-hint" id="viewer-instructions">Tažením otáčejte · kolečkem nebo dvěma prsty přibližujte</p>
    </div>
    <aside class="viewer-side">
      <p class="eyebrow">Vyberte prostor</p>
      <div class="model-options" role="group" aria-label="Výběr 3D modelu">
        {#each models as model (model.id)}
          <button class:active={selected === model.id} aria-pressed={selected === model.id} onclick={() => { selected = model.id; }}>
            <span class={`model-icon ${model.id}`} aria-hidden="true"></span>
            <span>{model.name}<small>{model.materials}</small></span>
            <span class="selection-dot" aria-hidden="true"></span>
          </button>
        {/each}
      </div>
      <div class="material-section">
        <p class="eyebrow">Odstín materiálů</p>
        <div class="material-options" role="group" aria-label="Varianty materiálů">
          {#each materialOptions as option (option.id)}
            <button class:active={material === option.id} aria-pressed={material === option.id} onclick={() => { material = option.id; }}>
              <span class={`swatch ${option.id}`} aria-hidden="true"></span>{option.label}
            </button>
          {/each}
        </div>
      </div>
      <button class="rotation-toggle" aria-pressed={rotating} disabled={status !== 'ready'} onclick={() => { rotating = !rotating; }}>
        <span class="toggle-track" aria-hidden="true"><span></span></span>Automatické otáčení
      </button>
      <div class="model-note"><strong>Studie podle fotografie</strong><p>Model zachycuje styl a základní uspořádání. Rozměry nejsou ověřené; nejde o přesný stavební návrh.</p></div>
    </aside>
  </div>
</section>
