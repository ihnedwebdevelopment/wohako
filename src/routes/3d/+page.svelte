<script lang="ts">
  import { onMount } from 'svelte';
  import Viewer3D from '../../lib/components/Viewer3D.svelte';
  import type { ModelKey } from '../../lib/data/projects';
  let selected = $state<ModelKey>('compact');
  onMount(() => {
    const requested = new URLSearchParams(window.location.search).get('model');
    if (requested === 'compact' || requested === 'walkin' || requested === 'kitchen') selected = requested;
  });
</script>

<svelte:head>
  <title>3D studio | WOHAKO rekonstrukce</title>
  <meta name="description" content="Interaktivní 3D studie koupelen a kuchyně. Otočte modely, změňte pohled a porovnejte materiály." />
</svelte:head>

<main class="studio-page">
  <section class="page-intro"><p class="eyebrow">3D STUDIO</p><h1>Podívejte se<br /><em>z jiného úhlu.</em></h1><p>Vyberte prostor, otočte model a prohlédněte si půdorys. Materiály můžete přepnout podle nálady interiéru.</p></section>
  <Viewer3D bind:selected />
  <section class="section studio-explain"><div><p class="eyebrow">PROČ 3D?</p><h2>Prostor se lépe chápe, když se v něm můžete rozhlédnout.</h2></div><div><p>Fotografie zachytí jeden okamžik. Interaktivní studie ukáže vztah vybavení, průchodu a proporcí z více stran.</p><p>Modely jsou vytvořené podle dodaných fotografií. Slouží k představě o uspořádání a materiálech; skutečné rozměry je potřeba ověřit na místě.</p><a class="arrow-link" href="/realizace">Prohlédnout skutečné realizace <span aria-hidden="true">↗</span></a></div></section>
</main>
