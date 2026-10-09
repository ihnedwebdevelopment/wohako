<script lang="ts">
  import { enhance } from '$app/forms';
  import { invalidateAll } from '$app/navigation';
  import BrandMark from '../../../lib/components/BrandMark.svelte';
  import { processLogo, type ProcessedLogo } from '../../../lib/admin/logo-image';
  let { data, form } = $props();

  let file = $state<File | null>(null);
  let removeBg = $state(true);
  let result = $state<ProcessedLogo | null>(null);
  let working = $state(false);
  let saving = $state(false);
  let message = $state('');
  let error = $state('');
  let input = $state<HTMLInputElement>();

  // Náhled: aktuální nastavení s nově zpracovaným logem (pokud nějaké je).
  let preview = $derived(
    result
      ? { ...data.brand, logo: result.preview, logoWidth: result.width, logoHeight: result.height }
      : data.brand
  );

  async function prepare() {
    if (!file) return;
    working = true;
    error = '';
    message = '';
    try {
      if (result) URL.revokeObjectURL(result.preview);
      result = await processLogo(file, removeBg);
    } catch (cause) {
      result = null;
      error = cause instanceof Error ? cause.message : 'Logo se nepodařilo zpracovat.';
    } finally {
      working = false;
    }
  }

  function choose(list: FileList | null | undefined) {
    const chosen = list?.[0];
    if (!chosen) return;
    file = chosen;
    removeBg = true;
    prepare();
  }

  async function save() {
    if (!result) return;
    saving = true;
    error = '';
    const body = new FormData();
    body.set('logo', result.logo, 'logo.png');
    body.set('favicon', result.favicon, 'favicon.png');
    body.set('width', String(result.width));
    body.set('height', String(result.height));
    try {
      const response = await fetch('/administrator/api/logo', { method: 'POST', body });
      const json = await response.json().catch(() => ({ ok: false, message: 'Server neodpověděl.' }));
      if (!response.ok || !json.ok) throw new Error(json.message || 'Uložení se nepovedlo.');
      await invalidateAll();
      URL.revokeObjectURL(result.preview);
      result = null;
      file = null;
      if (input) input.value = '';
      message = 'Logo je uložené. Na webu se projeví během několika vteřin.';
    } catch (cause) {
      error = cause instanceof Error ? cause.message : 'Uložení se nepovedlo.';
    } finally {
      saving = false;
    }
  }

  async function remove() {
    if (!confirm('Odebrat logo a vrátit výchozí značku WOHAKO?')) return;
    saving = true;
    error = '';
    const response = await fetch('/administrator/api/logo', { method: 'DELETE' });
    const json = await response.json().catch(() => ({ ok: false }));
    saving = false;
    if (!response.ok || !json.ok) { error = json.message || 'Odebrání se nepovedlo.'; return; }
    await invalidateAll();
    message = 'Logo bylo odebráno.';
  }
</script>

<svelte:head><title>Logo | Administrace WOHAKO</title></svelte:head>

<header class="admin-head">
  <h1>Logo</h1>
  <p>Nahrajte logo (PNG, JPG, WebP nebo SVG). Prázdné okraje se samy oříznou, velikost se upraví pro web a z loga se vytvoří i ikona v záložce prohlížeče. Logo se vymění všude na webu.</p>
</header>

{#if message}<p class="notice ok" role="status">{message}</p>{/if}
{#if error}<p class="notice error" role="alert">{error}</p>{/if}

<section class="panel logo-panel">
  <h2>{result ? 'Náhled nového loga' : 'Takto vypadá hlavička webu'}</h2>
  <div class="logo-preview">
    <div class="logo-preview-bar">
      <span class="brand"><BrandMark brand={preview} /></span>
      <span class="logo-preview-nav">Služby · Realizace · Galerie</span>
    </div>
    <div class="logo-preview-row">
      {#if preview.logo}<div class="logo-preview-dark"><BrandMark brand={preview} place="footer" /></div>{:else}<p class="list-note">Zatím není nahrané žádné logo — web používá výchozí značku WOHAKO.</p>{/if}
      {#if result}
        <div class="logo-preview-icon"><img src={result.faviconPreview} alt="Ikona v záložce prohlížeče" width="32" height="32" /><span>Ikona v záložce</span></div>
      {:else if data.brand.favicon}
        <div class="logo-preview-icon"><img src={data.brand.favicon} alt="Ikona v záložce prohlížeče" width="32" height="32" /><span>Ikona v záložce</span></div>
      {/if}
    </div>
  </div>

  {#if result}
    <div class="logo-actions">
      {#if !result.transparent}
        <label class="check"><input type="checkbox" bind:checked={removeBg} onchange={prepare} /> Odstranit pozadí loga (doporučeno u loga na bílém nebo jednobarevném podkladu)</label>
      {/if}
      <p class="list-note">Výsledná velikost: {result.width} × {result.height} px</p>
      <div class="row">
        <button class="btn primary" onclick={save} disabled={saving || working}>{saving ? 'Ukládám…' : 'Uložit logo'}</button>
        <button class="btn" onclick={() => { result = null; file = null; if (input) input.value = ''; }} disabled={saving}>Zrušit</button>
      </div>
    </div>
  {:else}
    <div
      class="dropzone"
      role="group"
      aria-label="Nahrání loga"
      ondragover={(event) => event.preventDefault()}
      ondrop={(event) => { event.preventDefault(); choose(event.dataTransfer?.files); }}
    >
      <div>
        <strong>Přetáhněte logo sem</strong>
        <span>nebo</span>
        <label class="btn primary">{working ? 'Zpracovávám…' : data.brand.logo ? 'Nahrát nové logo' : 'Vybrat logo'}<input bind:this={input} type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" hidden onchange={(event) => choose((event.currentTarget as HTMLInputElement).files)} disabled={working || !data.dbConfigured} /></label>
      </div>
      <small>Ideálně logo s průhledným pozadím (PNG nebo SVG) v co nejvyšším rozlišení.</small>
    </div>
  {/if}
</section>

{#if data.brand.logo}
  <form method="POST" class="panel logo-settings" use:enhance={() => async ({ update }) => { await update({ reset: false }); await invalidateAll(); }}>
    <h2>Zobrazení</h2>
    <fieldset class="size-options">
      <legend>Velikost loga v hlavičce</legend>
      {#each [['s', 'Menší'], ['m', 'Střední'], ['l', 'Větší']] as [value, label] (value)}
        <label class="check"><input type="radio" name="logoSize" {value} checked={data.brand.logoSize === value} /> {label}</label>
      {/each}
    </fieldset>
    <label class="check"><input type="checkbox" name="logoText" checked={data.brand.logoText} /> Zobrazit vedle loga i název „{data.brand.name}“</label>
    <div class="row">
      <button class="btn primary">Uložit zobrazení</button>
      {#if form?.saved}<span class="saved">Uloženo</span>{/if}
      {#if form?.message}<span class="error-text">{form.message}</span>{/if}
      <button type="button" class="btn danger-btn" onclick={remove} disabled={saving}>Odebrat logo</button>
    </div>
  </form>
{/if}
