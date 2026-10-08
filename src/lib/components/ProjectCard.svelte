<script lang="ts">
  import type { Photo, Project } from '../content/types';
  import { projectCover, srcset } from '../content/helpers';
  let { project, photos, eager = false }: { project: Project; photos: Photo[]; eager?: boolean } = $props();
  let cover = $derived(projectCover(project, photos));
</script>

<a class="project-card" href={`/realizace/${project.slug}`}>
  <div class="project-card-image">
    {#if cover.src}<img src={cover.thumb} srcset={srcset(cover)} sizes="(max-width: 760px) 100vw, 50vw" alt={cover.alt} width={cover.width} height={cover.height} loading={eager ? 'eager' : 'lazy'} decoding="async" />{/if}
  </div>
  <div class="project-card-text">
    <span class="eyebrow">{project.category}</span>
    <h3>{project.subtitle}</h3>
    <p>{project.title}</p>
  </div>
</a>
