<script lang="ts">
  import { onMount } from 'svelte';
  import { inquiry, openInquiry } from '../inquiry.svelte';

  let bubble = $state(false);

  onMount(() => {
    let dismissed = false;
    try { dismissed = sessionStorage.getItem('wohako-bubble') === '1'; } catch { /* bez úložiště se bublina prostě ukáže */ }
    if (dismissed) return;
    const timer = setTimeout(() => { bubble = true; }, 2200);
    return () => clearTimeout(timer);
  });

  function hide() {
    bubble = false;
    try { sessionStorage.setItem('wohako-bubble', '1'); } catch { /* nevadí */ }
  }
  function open() { hide(); openInquiry('Plovoucí tlačítko'); }
</script>

<div class="contact-fab" class:hidden={inquiry.open}>
  {#if bubble}
    <div class="fab-bubble" role="note">
      <button type="button" class="fab-bubble-text" onclick={open}>
        <strong>Cenová nabídka zdarma</strong>
        <small>Napište nám, co plánujete</small>
      </button>
      <button type="button" class="fab-bubble-x" onclick={hide} aria-label="Skrýt bublinu">×</button>
    </div>
  {/if}
  <button class="fab-btn" type="button" onclick={open} aria-haspopup="dialog" aria-label="Kontaktovat nás — cenová nabídka zdarma">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z" /></svg>
  </button>
</div>
