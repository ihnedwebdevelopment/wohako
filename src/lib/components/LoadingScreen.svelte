<script lang="ts">
  import { onMount } from 'svelte';

  let visible = $state(true);

  onMount(() => {
    let timer: ReturnType<typeof setTimeout>;
    const finish = () => {
      timer = setTimeout(() => { visible = false; }, 1350);
    };
    if (document.readyState === 'complete') finish();
    else window.addEventListener('load', finish, { once: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', finish);
    };
  });
</script>

{#if visible}
  <div class="splash" role="status" aria-label="Načítá se WOHAKO rekonstrukce">
    <div class="splash-inner">
      <div class="splash-scene" aria-hidden="true">
        <div class="splash-room">
          <div class="splash-floor"></div>
          <div class="splash-wall back"></div>
          <div class="splash-wall side"></div>
          <div class="splash-shower"></div>
          <div class="splash-glass"></div>
          <div class="splash-vanity"></div>
          <div class="splash-basin"></div>
          <div class="splash-mirror"></div>
          <div class="splash-lamp"></div>
        </div>
      </div>
      <div class="splash-rule"></div>
      <p class="splash-brand">WOHAKO <span>rekonstrukce</span></p>
      <p class="splash-caption">Prostor pro nový začátek</p>
      <div class="splash-progress" aria-hidden="true"><span></span></div>
    </div>
    <button class="splash-skip" onclick={() => { visible = false; }}>Přejít na web <span aria-hidden="true">↗</span></button>
  </div>
{/if}
