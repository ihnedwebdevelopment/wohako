<script lang="ts">
  import { enhance } from '$app/forms';
  let { data, form } = $props();
  const cover = (photoIds: string[]) => data.photos.find((photo) => photo.id === photoIds[0])?.thumb;
</script>

<svelte:head><title>Realizace | Administrace WOHAKO</title></svelte:head>

<header class="admin-head with-action">
  <div>
    <h1>Realizace</h1>
    <p>Hotové zakázky. První fotka realizace je její titulní obrázek. Pořadí zde = pořadí na webu.</p>
  </div>
  <a class="btn primary" href="/administrator/realizace/nova">+ Přidat realizaci</a>
</header>

{#if form?.deleted}<p class="notice ok" role="status">Realizace byla smazána.</p>{/if}

<ul class="project-list">
  {#each data.projects as project, index (project.id)}
    <li class:hidden-project={!project.published}>
      {#if cover(project.photoIds)}<img src={cover(project.photoIds)} alt="" />{:else}<span class="no-photo">Bez fotky</span>{/if}
      <div class="project-text">
        <strong>{project.subtitle}</strong>
        <span>{project.category} · {project.photoIds.length} fotek · {project.published ? 'Zveřejněno' : 'Skryto'}</span>
      </div>
      <div class="project-tools">
        <a class="btn" href={`/administrator/realizace/${project.id}`}>Upravit</a>
        {#if project.published}<a class="btn" href={`/realizace/${project.slug}`} target="_blank" rel="noopener">Na webu ↗</a>{/if}
        <form method="POST" action="?/toggle" use:enhance><input type="hidden" name="id" value={project.id} /><button class="btn">{project.published ? 'Skrýt' : 'Zveřejnit'}</button></form>
        <form method="POST" action="?/move" use:enhance>
          <input type="hidden" name="id" value={project.id} />
          <button class="icon" name="direction" value="up" disabled={index === 0} aria-label="Posunout výš">↑</button>
          <button class="icon" name="direction" value="down" disabled={index === data.projects.length - 1} aria-label="Posunout níž">↓</button>
        </form>
        <form method="POST" action="?/delete" use:enhance={({ cancel }) => { if (!confirm(`Opravdu smazat realizaci „${project.subtitle}“? Fotky zůstanou v sekci Fotky.`)) cancel(); }}>
          <input type="hidden" name="id" value={project.id} /><button class="icon danger" aria-label="Smazat realizaci">✕</button>
        </form>
      </div>
    </li>
  {:else}
    <li class="empty">Zatím žádné realizace. Přidejte první.</li>
  {/each}
</ul>
