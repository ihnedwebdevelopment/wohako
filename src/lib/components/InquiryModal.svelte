<script lang="ts">
  import { inquiry } from '../inquiry.svelte';
  import ContactForm from './ContactForm.svelte';

  let { email, phone, area }: { email: string; phone: string; area: string } = $props();

  let dialog = $state<HTMLDialogElement>();
  let sent = $state('');

  $effect(() => {
    if (!dialog) return;
    if (inquiry.open && !dialog.open) {
      dialog.showModal();
      document.documentElement.classList.add('modal-open');
    } else if (!inquiry.open && dialog.open) {
      dialog.close();
    }
  });

  function closed() {
    inquiry.open = false;
    document.documentElement.classList.remove('modal-open');
    sent = '';
  }

  const close = () => { inquiry.open = false; };
</script>

<dialog
  class="inquiry-modal"
  bind:this={dialog}
  aria-labelledby="inquiry-modal-title"
  onclose={closed}
  onclick={(event) => { if (event.target === dialog) close(); }}
>
  <div class="im-card">
    <button class="im-close" type="button" onclick={close} aria-label="Zavřít">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
    </button>

    {#if sent}
      <div class="im-success" role="status">
        <svg class="im-check" viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="24" pathLength="1" /><path d="M15 27l8 8 15-17" pathLength="1" /></svg>
        <h2 id="inquiry-modal-title">Děkujeme!</h2>
        <p>{sent}</p>
        <button class="button" type="button" onclick={close}>Zavřít</button>
      </div>
    {:else}
      <header class="im-head">
        <span class="im-badge"><i aria-hidden="true"></i>Zdarma a nezávazně</span>
        <h2 id="inquiry-modal-title">Cenová nabídka <em>zdarma</em></h2>
        <p>Popište nám, co plánujete. Stačí jméno, kontakt a pár vět. Chcete-li, rozbalte „Upřesnit zadání“ a my budeme moct nabídku připravit přesněji.</p>
      </header>
      <ContactForm modal {email} {phone} {area} onsuccess={(message) => { sent = message; }} />
    {/if}
  </div>
</dialog>
