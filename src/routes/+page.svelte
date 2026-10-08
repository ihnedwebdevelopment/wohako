<script lang="ts">
  import Closing from '../lib/components/Closing.svelte';
  import ProjectCard from '../lib/components/ProjectCard.svelte';
  import { lines, pickPhoto, srcset } from '../lib/content/helpers';
  let { data } = $props();
  let c = $derived(data.content);
  let hero = $derived(pickPhoto(data.photos, c.home.heroPhoto));
  let featured = $derived(data.projects.slice(0, 4));
  let galleryPreview = $derived(data.photos.filter((photo) => photo.inGallery && photo.id !== hero.id).slice(0, 4));
</script>

<svelte:head>
  <title>{c.seo.title}</title>
  <meta name="description" content={c.seo.description} />
  <meta property="og:title" content={c.seo.title} />
  <meta property="og:description" content={c.seo.description} />
  {#if hero.src}<meta property="og:image" content={hero.src} />{/if}
</svelte:head>

<main>
  <section class="hero">
    <div class="hero-copy">
      <p class="eyebrow" data-hero style="--i: 0">{c.home.eyebrow}</p>
      <h1>
        <span class="line"><span data-hero style="--i: 1">{c.home.heroTitle}</span></span>
        <em class="line"><span data-hero style="--i: 2">{c.home.heroAccent}</span></em>
      </h1>
      <p class="lead" data-hero style="--i: 3">{c.home.heroLead}</p>
      <div class="hero-actions" data-hero style="--i: 4">
        <a class="button" href="/realizace">Prohlédnout realizace <span aria-hidden="true">→</span></a>
        <a class="text-link" href="/kontakt">Nezávazná poptávka</a>
      </div>
    </div>
    <figure class="hero-photo" data-hero-photo>
      {#if hero.src}<img src={hero.src} alt={hero.alt} width={hero.width} height={hero.height} fetchpriority="high" />{/if}
      <figcaption class="hero-badge" data-hero style="--i: 5"><span>Skutečná realizace</span>{c.contact.area}</figcaption>
    </figure>
  </section>

  <section class="strip-wrap">
    <ul class="service-strip" aria-label="Co děláme">
      {#each lines(c.home.strip) as item (item)}<li>{item}</li>{/each}
    </ul>
  </section>

  <section class="section intro">
    <p class="eyebrow">{c.home.introEyebrow}</p>
    <div class="intro-grid">
      <h2>{c.home.introTitle}</h2>
      <div>
        <p>{c.home.introText}</p>
        <a class="arrow-link" href="/pristup">Jak pracujeme <span aria-hidden="true">→</span></a>
      </div>
    </div>
  </section>

  {#if featured.length}
    <section class="section">
      <div class="section-heading">
        <div><p class="eyebrow">Realizace</p><h2>{c.home.projectsTitle}</h2></div>
        <p>{c.home.projectsText}</p>
      </div>
      <div class="project-grid">
        {#each featured as project (project.id)}<ProjectCard {project} photos={data.photos} />{/each}
      </div>
      <a class="arrow-link more" href="/realizace">Všechny realizace <span aria-hidden="true">→</span></a>
    </section>
  {/if}

  <section class="section services-preview">
    <div class="section-heading">
      <div><p class="eyebrow">Služby</p><h2>Od nápadu k prostoru, který funguje.</h2></div>
      <a class="arrow-link" href="/sluzby">Všechny služby <span aria-hidden="true">→</span></a>
    </div>
    <div class="service-grid">
      {#each c.services.items as item (item.anchor)}
        {@const photo = pickPhoto(data.photos, item.photo)}
        <a class="service-card" href={`/sluzby#${item.anchor}`}>
          {#if photo.src}<img src={photo.thumb} srcset={srcset(photo)} sizes="(max-width: 760px) 100vw, 33vw" alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" />{/if}
          <span class="eyebrow">{item.eyebrow}</span>
          <h3>{item.title}</h3>
        </a>
      {/each}
    </div>
  </section>

  {#if galleryPreview.length}
    <section class="section gallery-strip">
      <div class="section-heading">
        <div><p class="eyebrow">Galerie</p><h2>Detaily zblízka.</h2></div>
        <a class="arrow-link" href="/galerie">Otevřít galerii <span aria-hidden="true">→</span></a>
      </div>
      <div class="gallery-strip-grid">
        {#each galleryPreview as photo (photo.id)}
          <a href="/galerie" aria-label={`Galerie: ${photo.alt}`}><img src={photo.thumb} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" /></a>
        {/each}
      </div>
    </section>
  {/if}

  <section class="section studio-teaser">
    <div class="studio-visual" aria-hidden="true">
      <svg viewBox="0 0 400 320" fill="none" stroke-linejoin="round">
        <g class="iso-room">
          <path d="M200 270 L360 190 L200 110 L40 190 Z" class="floor" />
          <path d="M40 190 L40 60 L200 -20 L200 110 Z" class="wall" />
          <path d="M200 110 L200 -20 L360 60 L360 190 Z" class="wall wall-b" />
          <path d="M80 210 L80 175 L170 130 L170 165 Z M80 175 L120 195 L210 150 L170 130" class="tub" />
          <path d="M120 195 L120 230 L210 185 L210 150" class="tub" />
          <path d="M255 137 L255 40 M255 40 L285 55 M285 55 L285 152" class="glass" />
          <path d="M300 165 L340 145 L340 120 L300 140 Z M300 140 L280 130 L320 110 L340 120" class="vanity" />
          <path d="M315 75 L335 65 L335 100 L315 110 Z" class="mirror" />
        </g>
      </svg>
    </div>
    <div>
      <p class="eyebrow">3D studio</p>
      <h2>{c.home.studioTitle}</h2>
      <p>{c.home.studioText}</p>
      <a class="button ghost" href="/3d">Otevřít 3D studio <span aria-hidden="true">→</span></a>
      <small>Modely jsou orientační studie, nejde o přesné stavební návrhy.</small>
    </div>
  </section>

  <section class="section process">
    <div class="section-heading">
      <div><p class="eyebrow">Jak spolupracujeme</p><h2>Dobrý výsledek začíná dobrým plánem.</h2></div>
      <a class="arrow-link" href="/pristup">Celý postup <span aria-hidden="true">→</span></a>
    </div>
    <div class="process-grid">
      {#each c.approach.steps as step (step.title)}<article><h3>{step.title}</h3><p>{step.description}</p></article>{/each}
    </div>
  </section>

  <Closing title={c.home.closingTitle} button="Ozvat se WOHAKO" />
</main>
