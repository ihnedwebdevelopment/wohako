<script lang="ts">
  import LoadingScreen from '../lib/components/LoadingScreen.svelte';
  import { projects } from '../lib/data/projects';
  import { processSteps, site } from '../lib/data/site';
</script>

<svelte:head>
  <title>{site.title}</title>
  <meta name="description" content={site.description} />
</svelte:head>

<LoadingScreen />
<main id="uvod">
  <section class="hero home-hero">
    <div class="hero-copy">
      <p class="eyebrow">WOHAKO REKONSTRUKCE · PRAHA A OKOLÍ</p>
      <h1>Prostor pro<br /><em>nový začátek.</em></h1>
      <p class="lead">Koupelny, kuchyně a interiéry proměněné s citem pro prostor, materiál a každodenní život.</p>
      <div class="hero-actions"><a class="button dark" href="/realizace">Prohlédnout realizace <span aria-hidden="true">↗</span></a><a class="text-link" href="/sluzby">Co pro vás můžeme udělat</a></div>
      <div class="hero-bottom"><span class="tiny-plan" aria-hidden="true">⌑</span><p>Od první představy<br /><strong>až po poslední detail.</strong></p></div>
    </div>
    <div class="hero-photo">
      <img src={projects[0].after.src} alt={projects[0].after.alt} fetchpriority="high" width="1400" height="1215" />
      <span class="photo-caption">SKUTEČNÁ REALIZACE / KOUPELNA</span>
      <a href="/3d" class="floating-3d"><span>3D</span><div>Prohlédněte si prostor<br />z jiného úhlu <b aria-hidden="true">↗</b></div></a>
    </div>
  </section>

  <div class="service-strip"><span>Kompletní rekonstrukce</span><span>Obklady a dlažby</span><span>Koupelny a WC</span><span>Kuchyně a interiéry</span></div>

  <section class="editorial-intro section">
    <div><p class="eyebrow">PROSTORY S MYŠLENKOU</p><h2>Dobře navržený interiér poznáte každý den.</h2></div>
    <div class="editorial-intro-copy"><p>Nejde jen o nový povrch. Jde o světlo, pohyb, úložný prostor a pocit, že všechno má své místo.</p><a class="arrow-link" href="/pristup">Poznejte náš přístup <span aria-hidden="true">↗</span></a></div>
  </section>

  <section class="services-preview section" aria-labelledby="services-heading">
    <div class="section-heading"><div><p class="eyebrow">CO DĚLÁME</p><h2 id="services-heading">Od nápadu<br />k prostoru, který funguje.</h2></div><a class="arrow-link" href="/sluzby">Všechny služby <span aria-hidden="true">↗</span></a></div>
    <div class="service-card-grid">
      <a class="service-card" href="/sluzby#koupelny"><img src="/assets/koupelna-walkin-po.webp" alt="Světlá koupelna s walk-in sprchou" loading="lazy" /><div><span>KOUPELNY A WC</span><h3>Každý den začíná tady.</h3><b aria-hidden="true">↗</b></div></a>
      <a class="service-card" href="/sluzby#kuchyne"><img src="/assets/kuchyne-bila.webp" alt="Dokončená bílá kuchyně s dřevěnou deskou" loading="lazy" /><div><span>KUCHYNĚ A INTERIÉRY</span><h3>Místo, kde se žije.</h3><b aria-hidden="true">↗</b></div></a>
    </div>
  </section>

  <section class="section projects home-projects" id="realizace">
    <div class="section-heading"><div><p class="eyebrow">VYBRANÉ REALIZACE</p><h2>Za každou proměnou<br />je nový příběh.</h2></div><p>Podívejte se na skutečné prostory a jejich změnu.</p></div>
    <div class="project-grid">
      {#each projects.slice(0, 3) as project (project.id)}
        <a class="project" href={`/realizace/${project.id}`}>
          <div class="project-image"><img src={project.after.src} loading="lazy" alt={project.after.alt} /><span class="tag">{project.tag}</span><span class="project-open">Otevřít příběh ↗</span></div>
          <div class="project-info"><div><h3>{project.title}</h3><p>{project.subtitle}</p></div><span aria-hidden="true">↗</span></div>
        </a>
      {/each}
    </div>
    <a class="all-projects-link arrow-link" href="/realizace">Zobrazit všechny realizace <span aria-hidden="true">↗</span></a>
  </section>

  <section class="studio-teaser">
    <div class="studio-teaser-visual"><img src="/assets/koupelna-kompaktni-po.webp" alt="Kompaktní koupelna, která má interaktivní 3D studii" loading="lazy" /><div class="studio-orbit" aria-hidden="true"><span>3D</span></div></div>
    <div class="studio-teaser-copy"><p class="eyebrow">INTERAKTIVNÍ 3D STUDIO</p><h2>Prostor z jiné perspektivy.</h2><p>Otočte model, podívejte se na půdorys a vyzkoušejte světlou i tmavou variantu materiálů.</p><a class="button light-button" href="/3d">Otevřít 3D studio <span aria-hidden="true">↗</span></a><small>Modely jsou orientační studie podle fotografií realizací.</small></div>
  </section>

  <section class="gallery-invitation section"><div><p class="eyebrow">VÍCE NEŽ NOVÉ POVRCHY</p><h2>Ze staré půdy<br />místo pro život.</h2><p>Přiznané trámy, přirozené světlo a promyšlené využití prostoru. Podívejte se na hotové podkroví i práci, která mu předcházela.</p><a class="arrow-link" href="/galerie?typ=podkrovi">Nahlédnout do podkroví <span aria-hidden="true">↗</span></a></div><a href="/galerie?typ=podkrovi" aria-label="Otevřít galerii podkroví"><img src="/assets/galerie/podkrovi-tramy.webp" alt="Dokončené podkroví s dřevěnou konstrukcí a světlou podlahou" loading="lazy" /></a></section>
  <section class="section process home-process">
    <div class="section-heading"><div><p class="eyebrow">JAK SPOLUPRACUJEME</p><h2>Dobrý výsledek<br />začíná dobrým plánem.</h2></div><a class="arrow-link" href="/pristup">Celý postup <span aria-hidden="true">↗</span></a></div>
    <div class="process-grid">{#each processSteps as step (step.title)}<article><h3>{step.title}</h3><p>{step.description}</p></article>{/each}</div>
  </section>

  <section class="closing"><p class="eyebrow">VAŠE DALŠÍ PROMĚNA</p><h2>Řekněte nám, jaký prostor<br />si představujete.</h2><a class="button light-button" href="/kontakt">Ozvat se WOHAKO <span aria-hidden="true">↗</span></a></section>
</main>
