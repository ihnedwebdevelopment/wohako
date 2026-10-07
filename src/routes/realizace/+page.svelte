<script lang="ts">
  import { page } from '$app/state';
  import { projects } from '../../lib/data/projects';
  let filter = $state<'vse' | 'koupelna' | 'kuchyne'>('vse');
  $effect(() => {
    const query = page.url.searchParams.get('typ');
    filter = query === 'koupelna' || query === 'kuchyne' ? query : 'vse';
  });
  let visible = $derived(projects.filter((project) => filter === 'vse' || (filter === 'kuchyne' ? project.id === 'kitchen' : project.id !== 'kitchen')));
</script>

<svelte:head>
  <title>Realizace | WOHAKO rekonstrukce</title>
  <meta name="description" content="Prohlédněte si skutečné proměny koupelen a kuchyní od WOHAKO rekonstrukce v Praze a okolí." />
</svelte:head>

<main>
  <section class="page-intro"><p class="eyebrow">NAŠE PRÁCE</p><h1>Proměny, které<br /><em>mluví samy za sebe.</em></h1><p>Fotografie dokončených prostor, jejich výchozí stav a detaily, které utvářejí celek.</p></section>
  <section class="section portfolio-section">
    <div class="portfolio-toolbar"><p>Skutečné realizace WOHAKO</p><div role="group" aria-label="Filtrovat realizace"><button class:active={filter === 'vse'} aria-pressed={filter === 'vse'} onclick={() => { filter = 'vse'; }}>Vše</button><button class:active={filter === 'koupelna'} aria-pressed={filter === 'koupelna'} onclick={() => { filter = 'koupelna'; }}>Koupelny</button><button class:active={filter === 'kuchyne'} aria-pressed={filter === 'kuchyne'} onclick={() => { filter = 'kuchyne'; }}>Kuchyně</button></div></div>
    <div class="portfolio-grid">
      {#each visible as project (project.id)}
        <a class="portfolio-card" href={`/realizace/${project.id}`}><div class="portfolio-image"><img src={project.after.src} alt={project.after.alt} loading="lazy" /><span>{project.tag}</span></div><div class="portfolio-card-text"><p>{project.subtitle}</p><h2>{project.title}</h2><span>Prohlédnout realizaci <b aria-hidden="true">↗</b></span></div></a>
      {/each}
    </div>
  </section>
  <section class="gallery-invitation section"><div><p class="eyebrow">POHLED DO ZÁKULISÍ</p><h2>Každá proměna<br />má svou cestu.</h2><p>Další koupelny, kuchyně i rekonstrukce podkroví. Prohlédněte si celou sbírku fotografií od prvních stavebních prací po hotové prostory.</p><a class="arrow-link" href="/galerie">Otevřít fotogalerii <span aria-hidden="true">↗</span></a></div><a href="/galerie?typ=podkrovi" aria-label="Prohlédnout fotografie podkroví"><img src="/assets/galerie/podkrovi-hotove.webp" alt="Podkrovní interiér s odkrytými dřevěnými trámy" loading="lazy" /></a></section>
  <section class="closing"><p class="eyebrow">PŘEDSTAVTE SI SVOU PROMĚNU</p><h2>Další příběh může začít<br />u vás doma.</h2><a class="button light-button" href="/kontakt">Napsat nám <span aria-hidden="true">↗</span></a></section>
</main>
