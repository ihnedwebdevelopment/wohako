<script lang="ts">
  import { inquiry } from '../inquiry.svelte';
  import { phoneHref } from '../content/helpers';

  let { email, phone }: { email: string; phone: string } = $props();

  const services = ['Koupelna a WC', 'Kuchyně', 'Kompletní interiér', 'Byt', 'Rodinný dům', 'Podkroví', 'Nebytový prostor', 'Jiná poptávka'];

  let dialog = $state<HTMLDialogElement>();
  let formEl = $state<HTMLFormElement>();
  let status = $state<'idle' | 'sending' | 'success' | 'error'>('idle');
  let feedback = $state('');
  let requestId = '';
  let lastPayload = '';

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
    // Po úspěšném odeslání se při dalším otevření začíná od začátku.
    if (status === 'success') { status = 'idle'; feedback = ''; }
  }

  function close() { inquiry.open = false; }

  async function submit(event: SubmitEvent) {
    event.preventDefault();
    if (status === 'sending') return;
    const form = event.currentTarget as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form));
    if (inquiry.source) data.additionalInfo = `Odesláno z: ${inquiry.source}`;
    const payload = JSON.stringify(data);
    if (!requestId || payload !== lastPayload) requestId = crypto.randomUUID();
    lastPayload = payload;
    status = 'sending';
    feedback = '';
    try {
      const response = await fetch('/api/kontakt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Idempotency-Key': requestId },
        body: payload,
        signal: AbortSignal.timeout(20000)
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.message || 'Zprávu se nepodařilo odeslat. Zkuste to prosím znovu.');
      status = 'success';
      feedback = result.message;
      form.reset();
      requestId = '';
      lastPayload = '';
    } catch (error) {
      status = 'error';
      feedback = error instanceof Error && error.name === 'Error'
        ? error.message
        : 'Spojení se přerušilo. Vaše údaje zůstaly vyplněné, zkuste odeslání znovu.';
    }
  }
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

    {#if status === 'success'}
      <div class="im-success" role="status">
        <svg class="im-check" viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="24" pathLength="1" /><path d="M15 27l8 8 15-17" pathLength="1" /></svg>
        <h2 id="inquiry-modal-title">Děkujeme!</h2>
        <p>{feedback}</p>
        <button class="button" type="button" onclick={close}>Zavřít</button>
      </div>
    {:else}
      <header class="im-head">
        <span class="im-badge"><i aria-hidden="true"></i>Zdarma a nezávazně</span>
        <h2 id="inquiry-modal-title">Cenová nabídka <em>zdarma</em></h2>
        <p>Popište nám, co plánujete. Ozveme se vám a připravíme nabídku bez jakýchkoli závazků.</p>
      </header>

      <form bind:this={formEl} onsubmit={submit} aria-busy={status === 'sending'}>
        <fieldset disabled={status === 'sending'}>
          <div class="im-grid">
            <label>
              <span class="im-label">Jméno <b>*</b></span>
              <input name="name" autocomplete="name" required minlength="2" maxlength="100" placeholder="Jméno a příjmení" />
            </label>
            <label>
              <span class="im-label">Telefon</span>
              <input name="phone" type="tel" autocomplete="tel" maxlength="40" placeholder="+420" />
            </label>
            <label class="wide">
              <span class="im-label">E-mail <b>*</b></span>
              <input name="email" type="email" autocomplete="email" required maxlength="254" placeholder="vas@email.cz" />
            </label>
            <label>
              <span class="im-label">Co chcete proměnit? <b>*</b></span>
              <select name="service" required>
                <option value="" disabled selected>Vyberte</option>
                {#each services as item (item)}<option value={item}>{item}</option>{/each}
              </select>
            </label>
            <label>
              <span class="im-label">Kde</span>
              <input name="locality" autocomplete="address-level2" maxlength="150" placeholder="Město nebo část Prahy" />
            </label>
            <label class="wide">
              <span class="im-label">Vaše představa <b>*</b></span>
              <textarea name="message" rows="4" required minlength="20" maxlength="5000" placeholder="Např. kompletní rekonstrukce koupelny v bytě 3+1, chceme sprchový kout místo vany…"></textarea>
            </label>
          </div>

          <div class="form-trap" aria-hidden="true">
            <label>Webová stránka <input name="website" tabindex="-1" autocomplete="off" /></label>
          </div>

          <div class="im-foot">
            <button class="button im-send" type="submit">{status === 'sending' ? 'Odesíláme…' : 'Chci cenovou nabídku'} <span aria-hidden="true">→</span></button>
            <p>Nebo zavolejte <a href={`tel:${phoneHref(phone)}`}>{phone}</a>, případně napište na <a href={`mailto:${email}`}>{email}</a>. Údaje použijeme jen k vyřízení poptávky.</p>
          </div>
        </fieldset>

        <div aria-live="polite" aria-atomic="true">
          {#if feedback && status === 'error'}<p class="form-feedback error">{feedback}</p>{/if}
        </div>
      </form>
    {/if}
  </div>
</dialog>
