<script lang="ts">
  let formState = $state<'idle' | 'sending' | 'success' | 'error'>('idle');
  let feedback = $state('');
  let requestId = '';
  let previousPayload = '';

  async function submit(event: SubmitEvent) {
    event.preventDefault();
    if (formState === 'sending') return;
    const form = event.currentTarget as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form));
    const payload = JSON.stringify(data);
    if (!requestId || payload !== previousPayload) requestId = crypto.randomUUID();
    previousPayload = payload;
    formState = 'sending';
    feedback = '';
    try {
      const response = await fetch('/api/kontakt', {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': requestId },
        body: payload, signal: AbortSignal.timeout(20000)
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.message || 'Zprávu se nepodařilo odeslat. Zkuste to prosím znovu.');
      formState = 'success';
      feedback = result.message;
      form.reset();
      requestId = '';
    } catch (error) {
      formState = 'error';
      feedback = error instanceof Error && error.name === 'Error' ? error.message : 'Spojení se přerušilo. Vaše údaje zůstaly vyplněné. Zkuste odeslání znovu nebo nám napište e-mail.';
    }
  }
</script>

<section class="section inquiry-section" id="poptavka" aria-labelledby="inquiry-title">
  <div class="inquiry-intro"><p class="eyebrow">NEZÁVAZNÁ POPTÁVKA</p><h2 id="inquiry-title">Začíná to<br /><em>vaší představou.</em></h2><p>Napište nám pár řádků o prostoru, který chcete proměnit. Společně probereme možnosti a další postup.</p><div class="inquiry-note"><span aria-hidden="true">↗</span><p>Raději si zavoláte?<br /><a href="tel:+420734155310">734 155 310</a></p></div><p class="inquiry-attachments">Fotografie a půdorysy nám můžete poslat přímo na <a href="mailto:wohako@email.cz">wohako@email.cz</a>.</p></div>
  <form class="inquiry-form" onsubmit={submit} aria-busy={formState === 'sending'}>
    <fieldset disabled={formState === 'sending'}>
      <legend class="sr-only">Vaše kontaktní údaje a představa rekonstrukce</legend>
      <div class="form-grid">
        <label>Vaše jméno <span>*</span><input name="name" autocomplete="name" required minlength="2" maxlength="100" placeholder="Jméno a příjmení" /></label>
        <label>E-mail <span>*</span><input name="email" type="email" autocomplete="email" required maxlength="254" placeholder="vas@email.cz" /></label>
        <label>Telefon <small>nepovinné</small><input name="phone" type="tel" autocomplete="tel" maxlength="40" placeholder="+420" /></label>
        <label>Místo realizace <small>nepovinné</small><input name="locality" autocomplete="address-level2" maxlength="150" placeholder="Město nebo městská část" /></label>
        <label class="form-wide">Co si přejete proměnit? <span>*</span><select name="service" required><option value="" disabled selected>Vyberte typ rekonstrukce</option><option>Koupelna a WC</option><option>Kuchyně</option><option>Kompletní interiér</option><option>Podkroví</option><option>Jiná poptávka</option></select></label>
        <label class="form-wide">Vaše představa <span>*</span><textarea name="message" rows="5" required minlength="20" maxlength="5000" placeholder="Co byste chtěli změnit? Připište přibližné rozměry nebo preferovaný termín, pokud je už znáte."></textarea><small>Alespoň 20 znaků. Nemusíte mít vše promyšlené.</small></label>
      </div>
      <div class="form-trap" aria-hidden="true"><label>Webová stránka<input name="website" tabindex="-1" autocomplete="off" /></label></div>
      <div class="form-submit"><p>Údaje použijeme k vyřízení vaší poptávky.<br />Povinná pole jsou označená hvězdičkou.</p><button class="button dark" type="submit">{formState === 'sending' ? 'Odesíláme…' : 'Odeslat poptávku'}<span aria-hidden="true">↗</span></button></div>
    </fieldset>
    <div aria-live="polite" aria-atomic="true">{#if feedback}<p class="form-feedback" class:success={formState === 'success'} class:error={formState === 'error'}>{feedback}</p>{/if}</div>
    <noscript><p>Pro odeslání formuláře zapněte JavaScript nebo napište přímo na <a href="mailto:wohako@email.cz">wohako@email.cz</a>.</p></noscript>
  </form>
</section>
