<script lang="ts">
  import { enhance } from '$app/forms';
  import { page } from '$app/state';
  import BrandMark from '../../../lib/components/BrandMark.svelte';
  let { form, data } = $props();
  let busy = $state(false);
</script>

<svelte:head><title>Přihlášení | Administrace WOHAKO</title></svelte:head>

<main class="login">
  <form method="POST" use:enhance={() => { busy = true; return async ({ update }) => { await update(); busy = false; }; }}>
    <div class="login-brand"><BrandMark brand={page.data.content.brand} place="admin" sub="administrace" /></div>
    <h1>Přihlášení</h1>
    {#if !data.adminConfigured}
      <p class="notice warn">Heslo není nastavené. Doplňte proměnnou <code>ADMIN_PASSWORD</code> (lokálně v souboru .env.local, na Vercelu v Settings → Environment Variables).</p>
    {/if}
    <label>Heslo<input type="password" name="password" autocomplete="current-password" required /></label>
    {#if form?.message}<p class="notice error" role="alert">{form.message}</p>{/if}
    <button class="btn primary" disabled={busy}>{busy ? 'Přihlašuji…' : 'Přihlásit se'}</button>
    <a class="muted-link" href="/" data-sveltekit-reload>← Zpět na web</a>
  </form>
</main>
