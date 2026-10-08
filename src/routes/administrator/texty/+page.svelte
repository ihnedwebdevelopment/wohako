<script lang="ts">
  import { enhance } from '$app/forms';
  import { contentSchema, getPath } from '../../../lib/content/schema';
  import PhotoPicker from '../../../lib/components/admin/PhotoPicker.svelte';
  let { data, form } = $props();
  let busy = $state(false);
  let dirty = $state(false);
  let openSection = $state(contentSchema[0].id);
  const value = (path: string) => String(getPath(data.content, path) ?? '');
</script>

<svelte:head><title>Texty | Administrace WOHAKO</title></svelte:head>
<svelte:window onbeforeunload={(event) => { if (dirty) event.preventDefault(); }} />

<header class="admin-head">
  <h1>Texty a kontakty</h1>
  <p>Upravte texty a klikněte na „Uložit změny“. Zvýrazněná část nadpisu se na webu zobrazí kurzívou.</p>
</header>

<form
  method="POST"
  class="content-form"
  oninput={() => { dirty = true; }}
  use:enhance={() => {
    busy = true;
    return async ({ result, update }) => {
      await update({ reset: false });
      busy = false;
      if (result.type === 'success') dirty = false;
    };
  }}
>
  {#each contentSchema as section (section.id)}
    <details class="panel" open={openSection === section.id} ontoggle={(event) => { if ((event.currentTarget as HTMLDetailsElement).open) openSection = section.id; }}>
      <summary><h2>{section.title}</h2>{#if section.description}<p>{section.description}</p>{/if}</summary>
      <div class="fields">
        {#each section.fields as field (field.path)}
          {#if field.type === 'photo'}
            <PhotoPicker label={field.label} name={field.path} value={value(field.path)} photos={data.photos} onchange={() => { dirty = true; }} />
          {:else}
            <label class:wide={field.type === 'textarea' || field.type === 'lines'}>
              <span>{field.label}</span>
              {#if field.type === 'textarea' || field.type === 'lines'}
                <textarea name={field.path} rows={field.type === 'lines' ? 4 : 3} maxlength={field.max}>{value(field.path)}</textarea>
              {:else}
                <input name={field.path} type={field.type === 'email' ? 'email' : 'text'} value={value(field.path)} maxlength={field.max} />
              {/if}
              {#if field.hint}<small>{field.hint}</small>{/if}
            </label>
          {/if}
        {/each}
      </div>
    </details>
  {/each}

  <div class="save-bar">
    {#if form?.message}<p class="notice error" role="alert">{form.message}</p>
    {:else if form?.saved && !dirty}<p class="notice ok" role="status">Uloženo. Na webu se změna projeví během několika vteřin.</p>
    {:else if dirty}<p class="save-hint">Máte neuložené změny.</p>{/if}
    <button class="btn primary" disabled={busy}>{busy ? 'Ukládám…' : 'Uložit změny'}</button>
  </div>
</form>
