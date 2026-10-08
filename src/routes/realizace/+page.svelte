<script lang="ts">
  import Closing from '../../lib/components/Closing.svelte';
  import ProjectCard from '../../lib/components/ProjectCard.svelte';
  let { data } = $props();
  let p = $derived(data.content.projectsPage);
  let categories = $derived([...new Set(data.projects.map((project) => project.category).filter(Boolean))]);
  let filter = $state('');
  let visible = $derived(data.projects.filter((project) => !filter || project.category === filter));
</script>

<svelte:head>
  <title>Realizace | {data.content.brand.name}</title>
  <meta name="description" content={p.text} />
</svelte:head>

<main>
  <section class="page-intro">
    <p class="eyebrow">Naše práce</p>
    <h1>{p.title} <em>{p.accent}</em></h1>
    <p class="lead">{p.text}</p>
  </section>

  <section class="section">
    {#if categories.length > 1}
      <div class="filters" role="group" aria-label="Filtrovat realizace">
        <button class:active={!filter} aria-pressed={!filter} onclick={() => { filter = ''; }}>Vše</button>
        {#each categories as category (category)}
          <button class:active={filter === category} aria-pressed={filter === category} onclick={() => { filter = category; }}>{category}</button>
        {/each}
      </div>
    {/if}
    {#if visible.length}
      <div class="project-grid">
        {#each visible as project, i (project.id)}<ProjectCard {project} photos={data.photos} eager={i < 2} />{/each}
      </div>
    {:else}
      <p class="empty">Realizace připravujeme.</p>
    {/if}
  </section>

  <Closing title="Další proměna může začít u vás doma." />
</main>
