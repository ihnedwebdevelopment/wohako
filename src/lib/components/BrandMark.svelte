<script lang="ts">
  import type { SiteContent } from '../content/types';
  // Značka webu: nahrané logo z administrace, nebo výchozí kresba WOHAKO.
  let { brand, place = 'header', sub = 'rekonstrukce' }: { brand: SiteContent['brand']; place?: 'header' | 'footer' | 'splash' | 'admin'; sub?: string } = $props();
</script>

{#if brand.logo}
  <span class={`logo logo-${place} logo-${brand.logoSize || 'm'}`} class:wide={brand.logoWidth / brand.logoHeight > 3.2} class:stacked={brand.logoWidth / brand.logoHeight < 2}>
    <img src={brand.logo} alt={brand.name} width={brand.logoWidth} height={brand.logoHeight} decoding="async" />
    {#if brand.logoText || place === 'admin'}<span class="logo-text">{place === 'admin' ? sub : brand.name}</span>{/if}
  </span>
{:else}
  <svg class="mark" viewBox="0 0 40 40" aria-hidden="true"><path pathLength="1" d="M7 33V7h26v26M7 20h13v13" /></svg>
  <span class="mark-text">WOHAKO<small>{sub}</small></span>
{/if}
