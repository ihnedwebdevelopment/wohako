<script lang="ts">
  import { onMount } from 'svelte';
  import { introSkipped, markReady } from '../intro';

  let visible = $state(true);
  let leaving = $state(false);
  let has3d = $state(false);
  let progress = $state(0);
  let host = $state<HTMLDivElement>();
  let skip = () => {};

  onMount(() => {
    if (introSkipped()) { visible = false; markReady(); return; }

    const root = document.documentElement;
    root.classList.add('splash-lock');
    let destroyScene: (() => void) | null = null;
    let disposed = false;
    let raf = 0;
    const started = performance.now();
    const MIN = 2600;
    const MAX = 6500;

    const pageLoaded = new Promise<void>((resolve) => {
      if (document.readyState === 'complete') resolve();
      else window.addEventListener('load', () => resolve(), { once: true });
    });

    const sceneBuilt = (async () => {
      try {
        const { createSplashScene } = await import('../three/splash');
        if (disposed) return;
        const scene = createSplashScene(host!, 1900);
        destroyScene = scene.destroy;
        requestAnimationFrame(() => { has3d = true; });
        await scene.built;
      } catch (error) {
        console.warn('3D úvod není dostupný, zobrazuji kresbu.', error);
        await new Promise((resolve) => setTimeout(resolve, 1600));
      }
    })();

    const tick = () => {
      const elapsed = performance.now() - started;
      const target = Math.min(elapsed / MIN, 0.94);
      progress += (target - progress) * 0.08;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    let closed = false;
    const finish = () => {
      if (closed || disposed) return;
      closed = true;
      cancelAnimationFrame(raf);
      progress = 1;
      setTimeout(() => {
        leaving = true;
        root.classList.remove('splash-lock');
        markReady();
        setTimeout(() => {
          visible = false;
          destroyScene?.();
        }, 1000);
      }, 260);
    };

    Promise.all([sceneBuilt, pageLoaded, new Promise((resolve) => setTimeout(resolve, MIN))]).then(finish);
    const safety = setTimeout(finish, MAX);
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') finish(); };
    window.addEventListener('keydown', onKey);
    skip = finish;

    return () => {
      disposed = true;
      clearTimeout(safety);
      cancelAnimationFrame(raf);
      window.removeEventListener('keydown', onKey);
      root.classList.remove('splash-lock');
      destroyScene?.();
      markReady();
    };
  });
</script>

{#if visible}
  <div class="splash" class:leaving class:has3d role="status" aria-live="polite" aria-label="Načítá se WOHAKO rekonstrukce">
    <div class="splash-stage" bind:this={host}>
      <svg class="splash-sketch" viewBox="0 0 400 320" fill="none" aria-hidden="true">
        <path pathLength="1" d="M200 270 L360 190 L200 110 L40 190 Z" />
        <path pathLength="1" d="M40 190 L40 60 L200 -20 L200 110" />
        <path pathLength="1" d="M200 -20 L360 60 L360 190" />
        <path pathLength="1" d="M80 210 L80 175 L170 130 L170 165 Z M80 175 L120 195 L210 150 L170 130 M120 195 L120 230 L210 185 L210 150" />
        <path pathLength="1" class="accent" d="M255 137 L255 40 L285 55 L285 152" />
        <path pathLength="1" d="M300 165 L340 145 L340 120 L300 140 Z M300 140 L280 130 L320 110 L340 120" />
      </svg>
    </div>

    <div class="splash-copy">
      <div class="splash-brand">
        <svg viewBox="0 0 40 40" aria-hidden="true"><path pathLength="1" d="M7 33V7h26v26M7 20h13v13" /></svg>
        <p>WOHAKO <span>rekonstrukce</span></p>
      </div>
      <p class="splash-claim">Stavíme prostor pro nový začátek</p>
      <div class="splash-progress" aria-hidden="true">
        <span style:transform={`scaleX(${progress})`}></span>
      </div>
      <p class="splash-percent" aria-hidden="true">{Math.round(progress * 100)} %</p>
    </div>

    <button class="splash-skip" type="button" onclick={() => skip()}>Přeskočit <span aria-hidden="true">→</span></button>
  </div>
{/if}
