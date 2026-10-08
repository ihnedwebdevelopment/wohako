<script lang="ts">
  import { enhance } from '$app/forms';
  import { invalidateAll } from '$app/navigation';
  let { data, form } = $props();

  type Job = { name: string; state: 'waiting' | 'working' | 'done' | 'error'; message?: string };
  let jobs = $state<Job[]>([]);
  let category = $state('Koupelny');
  let dragging = $state(false);
  let uploading = $derived(jobs.some((job) => job.state === 'waiting' || job.state === 'working'));
  let fileInput: HTMLInputElement;

  async function encode(source: ImageBitmap, max: number, quality: number) {
    const scale = Math.min(1, max / Math.max(source.width, source.height));
    const width = Math.round(source.width * scale);
    const height = Math.round(source.height * scale);
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(source, 0, 0, width, height);
    const toBlob = (type: string) => new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, quality));
    let blob = await toBlob('image/webp');
    // Starší Safari neumí WebP uložit — vrátí PNG. Pak použijeme JPEG.
    if (!blob || blob.type !== 'image/webp') blob = await toBlob('image/jpeg');
    if (!blob) throw new Error('Fotku se nepodařilo zpracovat.');
    return { blob, width, height };
  }

  async function uploadOne(file: File, job: Job) {
    job.state = 'working';
    let bitmap: ImageBitmap;
    try {
      bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
    } catch {
      throw new Error('Tento formát prohlížeč neumí otevřít. Uložte fotku jako JPG a zkuste to znovu.');
    }
    let full = await encode(bitmap, 2400, 0.88);
    if (full.blob.size > 3.4 * 1024 * 1024) full = await encode(bitmap, 2000, 0.8);
    const thumb = await encode(bitmap, 900, 0.82);
    bitmap.close();

    const body = new FormData();
    const ext = full.blob.type === 'image/webp' ? 'webp' : 'jpg';
    body.set('full', full.blob, `foto.${ext}`);
    body.set('thumb', thumb.blob, `nahled.${ext}`);
    body.set('width', String(full.width));
    body.set('height', String(full.height));
    body.set('category', category);
    body.set('alt', file.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' '));
    const response = await fetch('/administrator/api/fotky', { method: 'POST', body });
    const result = await response.json().catch(() => ({ ok: false, message: 'Server neodpověděl.' }));
    if (!response.ok || !result.ok) throw new Error(result.message || 'Nahrání se nepovedlo.');
  }

  async function upload(files: FileList | File[]) {
    const list = [...files].filter((file) => file.type.startsWith('image/') || /\.(heic|heif)$/i.test(file.name));
    if (!list.length) return;
    const start = jobs.length;
    jobs.push(...list.map((file) => ({ name: file.name, state: 'waiting' as const })));
    for (let i = 0; i < list.length; i++) {
      const job = jobs[start + i];
      try {
        await uploadOne(list[i], job);
        job.state = 'done';
      } catch (error) {
        job.state = 'error';
        job.message = error instanceof Error ? error.message : 'Nahrání se nepovedlo.';
      }
    }
    await invalidateAll();
    if (fileInput) fileInput.value = '';
  }

  function drop(event: DragEvent) {
    event.preventDefault();
    dragging = false;
    if (event.dataTransfer?.files.length) upload(event.dataTransfer.files);
  }
</script>

<svelte:head><title>Fotky | Administrace WOHAKO</title></svelte:head>

<header class="admin-head">
  <h1>Fotky</h1>
  <p>Nahrajte fotky z mobilu nebo počítače. Automaticky se zmenší na velikost vhodnou pro web (max. 2400 px), kvalita zůstane zachovaná.</p>
</header>

<section
  class="dropzone"
  class:dragging
  aria-label="Nahrání fotek"
  ondragover={(event) => { event.preventDefault(); dragging = true; }}
  ondragleave={() => { dragging = false; }}
  ondrop={drop}
>
  <div>
    <strong>Přetáhněte fotky sem</strong>
    <span>nebo</span>
    <label class="btn primary">Vybrat fotky<input bind:this={fileInput} type="file" accept="image/*" multiple hidden onchange={(event) => upload((event.currentTarget as HTMLInputElement).files ?? [])} disabled={uploading || !data.dbConfigured} /></label>
  </div>
  <label class="inline">Kategorie nových fotek
    <input list="categories" bind:value={category} maxlength="60" />
  </label>
  {#if jobs.length}
    <ul class="jobs">
      {#each jobs as job, i (i)}
        <li class={job.state}>
          <span>{job.name}</span>
          <b>{job.state === 'waiting' ? 'Čeká' : job.state === 'working' ? 'Nahrávám…' : job.state === 'done' ? 'Hotovo' : job.message}</b>
        </li>
      {/each}
    </ul>
    {#if !uploading}<button type="button" class="link" onclick={() => { jobs = []; }}>Skrýt seznam</button>{/if}
  {/if}
</section>

<datalist id="categories">{#each data.categories as item (item)}<option value={item}></option>{/each}</datalist>

{#if form?.deleted}<p class="notice ok" role="status">Fotka byla smazána.</p>{/if}

<p class="list-note">Pořadí zde = pořadí v galerii na webu. Popis fotky čtou vyhledávače a nevidomí návštěvníci.</p>

<ul class="photo-list">
  {#each data.photos as photo, index (photo.id)}
    <li class="photo-item">
      <img src={photo.thumb} alt="" loading="lazy" />
      <form method="POST" action="?/update" class="photo-fields" use:enhance={() => async ({ update }) => update({ reset: false })}>
        <input type="hidden" name="id" value={photo.id} />
        <label>Popis fotky<textarea name="alt" rows="2" maxlength="300" required>{photo.alt}</textarea></label>
        <div class="row">
          <label>Kategorie<input name="category" list="categories" value={photo.category} maxlength="60" /></label>
          <label class="check"><input type="checkbox" name="inGallery" checked={photo.inGallery} /> Zobrazit v galerii</label>
        </div>
        {#if data.usage[photo.id]?.length}
          <p class="usage">Použito: {data.usage[photo.id].join(' · ')}</p>
        {/if}
        <div class="row actions">
          <button class="btn">Uložit</button>
          {#if form?.id === photo.id && form?.saved}<span class="saved">Uloženo</span>{/if}
          {#if form?.id === photo.id && form?.message}<span class="error-text">{form.message}</span>{/if}
        </div>
      </form>
      <div class="photo-tools">
        <form method="POST" action="?/move" use:enhance>
          <input type="hidden" name="id" value={photo.id} />
          <button class="icon" name="direction" value="up" disabled={index === 0} aria-label="Posunout výš">↑</button>
          <button class="icon" name="direction" value="down" disabled={index === data.photos.length - 1} aria-label="Posunout níž">↓</button>
        </form>
        <form method="POST" action="?/delete" use:enhance={({ cancel }) => {
          const used = data.usage[photo.id]?.length ? '\n\nFotka je použitá na webu – místo ní se zobrazí jiná.' : '';
          if (!confirm(`Opravdu smazat tuto fotku?${used}`)) cancel();
        }}>
          <input type="hidden" name="id" value={photo.id} />
          <button class="icon danger" aria-label="Smazat fotku">✕</button>
        </form>
      </div>
    </li>
  {:else}
    <li class="empty">Zatím tu nejsou žádné fotky.</li>
  {/each}
</ul>
