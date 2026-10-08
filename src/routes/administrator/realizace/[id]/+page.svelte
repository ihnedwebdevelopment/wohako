<script lang="ts">
  import { enhance } from '$app/forms';
  import { page } from '$app/state';
  let { data, form } = $props();
  let busy = $state(false);
  let selected = $state<string[]>([]);
  $effect.pre(() => { selected = [...((form?.values?.photoIds as string[] | undefined) ?? data.project.photoIds)]; });
  const v = (key: 'subtitle' | 'title' | 'category' | 'slug' | 'description' | 'details') => String(form?.values?.[key] ?? data.project[key] ?? '');
  const thumb = (id: string) => data.photos.find((photo) => photo.id === id);

  function toggle(id: string) {
    selected = selected.includes(id) ? selected.filter((item) => item !== id) : [...selected, id];
  }
  function move(index: number, direction: number) {
    const target = index + direction;
    if (target < 0 || target >= selected.length) return;
    const next = [...selected];
    [next[index], next[target]] = [next[target], next[index]];
    selected = next;
  }
</script>

<svelte:head><title>{data.isNew ? 'Nová realizace' : data.project.subtitle} | Administrace WOHAKO</title></svelte:head>

<header class="admin-head">
  <a class="back" href="/administrator/realizace">← Všechny realizace</a>
  <h1>{data.isNew ? 'Nová realizace' : 'Upravit realizaci'}</h1>
</header>

{#if page.url.searchParams.get('ulozeno') && !form}<p class="notice ok" role="status">Uloženo. {#if data.project.published}<a href={`/realizace/${data.project.slug}`} target="_blank" rel="noopener">Zobrazit na webu ↗</a>{/if}</p>{/if}
{#if form?.message}<p class="notice error" role="alert">{form.message}</p>{/if}

<form method="POST" class="project-form" use:enhance={() => { busy = true; return async ({ update }) => { await update({ reset: false }); busy = false; }; }}>
  <div class="panel">
    <div class="fields">
      <label class="wide"><span>Název realizace</span><input name="subtitle" value={v('subtitle')} maxlength="120" required placeholder="např. Koupelna se sprchou v zeleném mramoru" /></label>
      <label class="wide"><span>Krátký slogan</span><input name="title" value={v('title')} maxlength="160" placeholder="např. Klidná šedá. Jeden výrazný detail." /><small>Zobrazí se pod názvem.</small></label>
      <label><span>Kategorie</span><input name="category" list="project-categories" value={v('category')} maxlength="60" /></label>
      <label><span>Adresa stránky</span><input name="slug" value={v('slug')} maxlength="80" placeholder="vytvoří se z názvu" /><small>web.cz/realizace/<b>{v('slug') || '…'}</b></small></label>
      <label class="wide"><span>Krátký popis</span><textarea name="description" rows="3" maxlength="600">{v('description')}</textarea><small>Zobrazí se na kartě a jako úvod realizace.</small></label>
      <label class="wide"><span>Podrobný popis</span><textarea name="details" rows="6" maxlength="4000">{v('details')}</textarea><small>Odstavce oddělte prázdným řádkem.</small></label>
      <label class="check wide"><input type="checkbox" name="published" checked={form?.values ? !!form.values.published : data.project.published} /> Zveřejnit na webu</label>
    </div>
  </div>
  <datalist id="project-categories">{#each data.categories as item (item)}<option value={item}></option>{/each}</datalist>

  <div class="panel">
    <h2>Fotky realizace</h2>
    <p class="list-note">Klikněte na fotky, které k realizaci patří. První vybraná je titulní. Nové fotky nejdřív nahrajte v sekci <a href="/administrator/fotky">Fotky</a>.</p>
    {#if selected.length}
      <ol class="selected-photos">
        {#each selected as id, index (id)}
          <li>
            <input type="hidden" name="photoIds" value={id} />
            <img src={thumb(id)?.thumb} alt="" />
            {#if index === 0}<span class="badge">Titulní</span>{/if}
            <div>
              <button type="button" class="icon" onclick={() => move(index, -1)} disabled={index === 0} aria-label="Posunout dopředu">←</button>
              <button type="button" class="icon" onclick={() => move(index, 1)} disabled={index === selected.length - 1} aria-label="Posunout dozadu">→</button>
              <button type="button" class="icon danger" onclick={() => toggle(id)} aria-label="Odebrat z realizace">✕</button>
            </div>
          </li>
        {/each}
      </ol>
    {/if}
    <div class="picker-grid large">
      {#each data.photos as photo (photo.id)}
        <button type="button" class:active={selected.includes(photo.id)} aria-pressed={selected.includes(photo.id)} title={photo.alt} onclick={() => toggle(photo.id)}>
          <img src={photo.thumb} alt={photo.alt} loading="lazy" />
          {#if selected.includes(photo.id)}<span class="order">{selected.indexOf(photo.id) + 1}</span>{/if}
        </button>
      {/each}
    </div>
  </div>

  <div class="save-bar">
    <button class="btn primary" disabled={busy}>{busy ? 'Ukládám…' : 'Uložit realizaci'}</button>
  </div>
</form>
