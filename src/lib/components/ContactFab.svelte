<script lang="ts">
  import { inquiry, openInquiry } from '../inquiry.svelte';
</script>

<button
  class="contact-fab"
  class:hidden={inquiry.open}
  type="button"
  onclick={() => openInquiry('Plovoucí tlačítko')}
  aria-haspopup="dialog"
  aria-label="Kontaktovat nás — cenová nabídka zdarma"
>
  <span class="fab-icon" aria-hidden="true">
    <svg viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4z" /></svg>
  </span>
  <span class="fab-text"><strong>Kontaktovat</strong><small>Cenová nabídka zdarma</small></span>
</button>
