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

    if (!requestId || payload !== previousPayload) {
      requestId = crypto.randomUUID();
    }

    previousPayload = payload;
    formState = 'sending';
    feedback = '';

    try {
      const response = await fetch('/api/kontakt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': requestId
        },
        body: payload,
        signal: AbortSignal.timeout(20000)
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(
          result.message ||
            'Zprávu se nepodařilo odeslat. Zkuste to prosím znovu.'
        );
      }

      formState = 'success';
      feedback = result.message;
      form.reset();

      requestId = '';
      previousPayload = '';
    } catch (error) {
      formState = 'error';

      feedback =
        error instanceof Error && error.name === 'Error'
          ? error.message
          : 'Spojení se přerušilo. Vaše údaje zůstaly vyplněné. Zkuste odeslání znovu nebo nám napište e-mail.';
    }
  }
</script>

<section
  class="section inquiry-section"
  id="poptavka"
  aria-labelledby="inquiry-title"
>
  <div class="inquiry-intro">
    <p class="eyebrow">NEZÁVAZNÁ POPTÁVKA</p>

    <h2 id="inquiry-title">
      Začíná to<br />
      <em>vaší představou.</em>
    </h2>

    <p>
      Napište nám pár informací o prostoru, který chcete proměnit.
      Čím více toho budeme vědět předem, tím lépe dokážeme odhadnout
      možnosti realizace a další postup.
    </p>

    <div class="inquiry-note">
      <span aria-hidden="true">↗</span>

      <p>
        Raději si zavoláte?<br />
        <a href="tel:+420734155310">734 155 310</a>
      </p>
    </div>

    <p class="inquiry-attachments">
      Fotografie, půdorysy nebo projektovou dokumentaci nám můžete poslat
      přímo na
      <a href="mailto:wohako@email.cz">wohako@email.cz</a>.
    </p>
  </div>

  <form
    class="inquiry-form"
    onsubmit={submit}
    aria-busy={formState === 'sending'}
  >
    <fieldset disabled={formState === 'sending'}>
      <legend class="sr-only">
        Kontaktní údaje a informace o plánované rekonstrukci
      </legend>

      <div class="form-grid">

        <!-- KONTAKTNÍ ÚDAJE -->

        <label>
          Vaše jméno
          <span>*</span>

          <input
            name="name"
            autocomplete="name"
            required
            minlength="2"
            maxlength="100"
            placeholder="Jméno a příjmení"
          />
        </label>

        <label>
          E-mail
          <span>*</span>

          <input
            name="email"
            type="email"
            autocomplete="email"
            required
            maxlength="254"
            placeholder="vas@email.cz"
          />
        </label>

        <label>
          Telefon
          <small>nepovinné</small>

          <input
            name="phone"
            type="tel"
            autocomplete="tel"
            maxlength="40"
            placeholder="+420"
          />
        </label>

        <label>
          Místo realizace
          <small>nepovinné</small>

          <input
            name="locality"
            autocomplete="address-level2"
            maxlength="150"
            placeholder="Město nebo městská část"
          />
        </label>


        <!-- TYP REKONSTRUKCE -->

        <label class="form-wide">
          Co si přejete proměnit?
          <span>*</span>

          <select name="service" required>
            <option value="" disabled selected>
              Vyberte typ rekonstrukce
            </option>

            <option value="Koupelna a WC">
              Koupelna a WC
            </option>

            <option value="Kuchyně">
              Kuchyně
            </option>

            <option value="Kompletní interiér">
              Kompletní interiér
            </option>

            <option value="Byt">
              Rekonstrukce bytu
            </option>

            <option value="Rodinný dům">
              Rekonstrukce rodinného domu
            </option>

            <option value="Podkroví">
              Podkroví
            </option>

            <option value="Nebytový prostor">
              Nebytový prostor
            </option>

            <option value="Jiná poptávka">
              Jiná poptávka
            </option>
          </select>
        </label>


        <!-- NEMOVITOST -->

        <label>
          Typ nemovitosti
          <small>nepovinné</small>

          <select name="propertyType">
            <option value="" selected>
              Vyberte typ nemovitosti
            </option>

            <option value="Byt v panelovém domě">
              Byt v panelovém domě
            </option>

            <option value="Byt v cihlovém domě">
              Byt v cihlovém domě
            </option>

            <option value="Rodinný dům">
              Rodinný dům
            </option>

            <option value="Novostavba">
              Novostavba
            </option>

            <option value="Historický objekt">
              Historický objekt
            </option>

            <option value="Nebytový prostor">
              Nebytový prostor
            </option>

            <option value="Jiné">
              Jiné
            </option>
          </select>
        </label>

        <label>
          Současná dispozice
          <small>nepovinné</small>

          <select name="disposition">
            <option value="" selected>
              Např. 3+1
            </option>

            <option value="1+kk">1+kk</option>
            <option value="1+1">1+1</option>
            <option value="2+kk">2+kk</option>
            <option value="2+1">2+1</option>
            <option value="3+kk">3+kk</option>
            <option value="3+1">3+1</option>
            <option value="4+kk">4+kk</option>
            <option value="4+1">4+1</option>
            <option value="5+kk a větší">5+kk a větší</option>
            <option value="Rodinný dům">Rodinný dům</option>
            <option value="Jiné">Jiné</option>
          </select>
        </label>

        <label>
          Celková podlahová plocha
          <small>nepovinné</small>

          <input
            name="totalFloorArea"
            type="number"
            min="1"
            max="5000"
            step="0.1"
            inputmode="decimal"
            placeholder="např. 75 m²"
          />
        </label>

        <label>
          Počet místností
          <small>nepovinné</small>

          <input
            name="roomCount"
            type="number"
            min="1"
            max="100"
            step="1"
            inputmode="numeric"
            placeholder="např. 4"
          />
        </label>


        <!-- ROZLOŽENÍ MÍSTNOSTÍ -->

        <label class="form-wide">
          Rozložení místností
          <small>nepovinné</small>

          <textarea
            name="roomLayout"
            rows="3"
            maxlength="1500"
            placeholder="Např. obývací pokoj 25 m², kuchyně 10 m², ložnice 14 m², dětský pokoj 12 m², chodba 8 m²…"
          ></textarea>

          <small>
            Stačí orientačně. Pokud máte půdorys, můžete nám ho následně poslat e-mailem.
          </small>
        </label>


        <!-- KOUPELNA A WC -->

        <label>
          Velikost koupelny
          <small>nepovinné</small>

          <input
            name="bathroomArea"
            type="number"
            min="1"
            max="200"
            step="0.1"
            inputmode="decimal"
            placeholder="např. 5.5 m²"
          />
        </label>

        <label>
          Velikost WC
          <small>nepovinné</small>

          <input
            name="toiletArea"
            type="number"
            min="0.5"
            max="100"
            step="0.1"
            inputmode="decimal"
            placeholder="např. 1.5 m²"
          />
        </label>

        <label>
          Koupelna a WC
          <small>nepovinné</small>

          <select name="bathroomLayout">
            <option value="" selected>
              Vyberte variantu
            </option>

            <option value="Koupelna a WC zvlášť">
              Koupelna a WC zvlášť
            </option>

            <option value="Koupelna a WC společně">
              Koupelna a WC společně
            </option>

            <option value="Chci koupelnu a WC spojit">
              Chci koupelnu a WC spojit
            </option>

            <option value="Chci koupelnu a WC oddělit">
              Chci koupelnu a WC oddělit
            </option>

            <option value="Zatím nevím">
              Zatím nevím
            </option>
          </select>
        </label>

        <label>
          Požadavky na koupelnu
          <small>nepovinné</small>

          <select name="bathroomRequirement">
            <option value="" selected>
              Vyberte
            </option>

            <option value="Sprchový kout">
              Sprchový kout
            </option>

            <option value="Vana">
              Vana
            </option>

            <option value="Vana i sprchový kout">
              Vana i sprchový kout
            </option>

            <option value="Bezbariérové řešení">
              Bezbariérové řešení
            </option>

            <option value="Zatím nevím">
              Zatím nevím
            </option>
          </select>
        </label>


        <!-- STAV NEMOVITOSTI -->

        <label>
          Současný stav prostoru
          <small>nepovinné</small>

          <select name="propertyCondition">
            <option value="" selected>
              Vyberte současný stav
            </option>

            <option value="Původní stav">
              Původní stav
            </option>

            <option value="Částečně rekonstruováno">
              Částečně rekonstruováno
            </option>

            <option value="Po starší rekonstrukci">
              Po starší rekonstrukci
            </option>

            <option value="Novostavba před dokončením">
              Novostavba před dokončením
            </option>

            <option value="Hrubá stavba">
              Hrubá stavba
            </option>

            <option value="Jiné">
              Jiné
            </option>
          </select>
        </label>

        <label>
          Patro
          <small>nepovinné</small>

          <input
            name="floor"
            maxlength="30"
            placeholder="např. 3. patro"
          />
        </label>

        <label>
          Výtah
          <small>nepovinné</small>

          <select name="elevator">
            <option value="" selected>
              Vyberte
            </option>

            <option value="Ano">
              Ano
            </option>

            <option value="Ne">
              Ne
            </option>

            <option value="Nevím / netýká se">
              Nevím / netýká se
            </option>
          </select>
        </label>

        <label>
          Bude prostor během rekonstrukce obývaný?
          <small>nepovinné</small>

          <select name="occupiedDuringRenovation">
            <option value="" selected>
              Vyberte
            </option>

            <option value="Ano">
              Ano
            </option>

            <option value="Ne">
              Ne
            </option>

            <option value="Částečně">
              Částečně
            </option>

            <option value="Zatím nevím">
              Zatím nevím
            </option>
          </select>
        </label>


        <!-- ROZSAH PRACÍ -->

        <label class="form-wide">
          Co všechno by měla rekonstrukce zahrnovat?
          <small>nepovinné</small>

          <textarea
            name="reconstructionScope"
            rows="4"
            maxlength="2500"
            placeholder="Např. bourací práce, nové příčky, elektroinstalace, voda a odpady, podlahy, obklady, sádrokarton, malování, kuchyň, koupelna, dveře…"
          ></textarea>
        </label>

        <label class="form-wide">
          Chcete měnit dispozici?
          <small>nepovinné</small>

          <textarea
            name="layoutChanges"
            rows="3"
            maxlength="1500"
            placeholder="Např. propojit kuchyň s obývacím pokojem, posunout příčku, zvětšit koupelnu, přesunout dveře…"
          ></textarea>
        </label>


        <!-- TECHNICKÉ INFORMACE -->

        <label>
          Elektroinstalace
          <small>nepovinné</small>

          <select name="electrical">
            <option value="" selected>
              Vyberte
            </option>

            <option value="Původní – bude potřeba nová">
              Původní – bude potřeba nová
            </option>

            <option value="Částečně nová">
              Částečně nová
            </option>

            <option value="Nová">
              Nová
            </option>

            <option value="Nevím">
              Nevím
            </option>
          </select>
        </label>

        <label>
          Voda a odpady
          <small>nepovinné</small>

          <select name="plumbing">
            <option value="" selected>
              Vyberte
            </option>

            <option value="Původní">
              Původní
            </option>

            <option value="Částečně nové">
              Částečně nové
            </option>

            <option value="Nové">
              Nové
            </option>

            <option value="Nevím">
              Nevím
            </option>
          </select>
        </label>

        <label>
          Stav podlah
          <small>nepovinné</small>

          <select name="floorCondition">
            <option value="" selected>
              Vyberte
            </option>

            <option value="Kompletní výměna">
              Počítáme s kompletní výměnou
            </option>

            <option value="Částečná výměna">
              Pouze částečná výměna
            </option>

            <option value="Podlahy chceme zachovat">
              Podlahy chceme zachovat
            </option>

            <option value="Nevím">
              Nevím
            </option>
          </select>
        </label>

        <label>
          Přibližná výška stropu
          <small>nepovinné</small>

          <input
            name="ceilingHeight"
            type="number"
            min="1.5"
            max="10"
            step="0.01"
            inputmode="decimal"
            placeholder="např. 2.6 m"
          />
        </label>


        <!-- TERMÍN A ROZPOČET -->

        <label>
          Předpokládaný termín realizace
          <small>nepovinné</small>

          <select name="preferredTerm">
            <option value="" selected>
              Vyberte orientační termín
            </option>

            <option value="Co nejdříve">
              Co nejdříve
            </option>

            <option value="Do 1–3 měsíců">
              Do 1–3 měsíců
            </option>

            <option value="Do 3–6 měsíců">
              Do 3–6 měsíců
            </option>

            <option value="Do 6–12 měsíců">
              Do 6–12 měsíců
            </option>

            <option value="Za více než rok">
              Za více než rok
            </option>

            <option value="Zatím nevím">
              Zatím nevím
            </option>
          </select>
        </label>

        <label>
          Orientační rozpočet
          <small>nepovinné</small>

          <select name="budget">
            <option value="" selected>
              Vyberte orientační rozpočet
            </option>

            <option value="Do 150 000 Kč">
              Do 150 000 Kč
            </option>

            <option value="150 000–300 000 Kč">
              150 000–300 000 Kč
            </option>

            <option value="300 000–500 000 Kč">
              300 000–500 000 Kč
            </option>

            <option value="500 000–800 000 Kč">
              500 000–800 000 Kč
            </option>

            <option value="800 000–1 200 000 Kč">
              800 000–1 200 000 Kč
            </option>

            <option value="1 200 000 Kč a více">
              1 200 000 Kč a více
            </option>

            <option value="Rozpočet zatím nemám">
              Rozpočet zatím nemám
            </option>
          </select>
        </label>


        <!-- DOKUMENTACE -->

        <label>
          Máte půdorys nebo projekt?
          <small>nepovinné</small>

          <select name="documentation">
            <option value="" selected>
              Vyberte
            </option>

            <option value="Ano – mám půdorys">
              Ano – mám půdorys
            </option>

            <option value="Ano – mám projektovou dokumentaci">
              Ano – mám projektovou dokumentaci
            </option>

            <option value="Mám pouze fotografie">
              Mám pouze fotografie
            </option>

            <option value="Ne">
              Ne
            </option>
          </select>
        </label>

        <label>
          Stav nemovitosti při zahájení
          <small>nepovinné</small>

          <select name="sitePreparation">
            <option value="" selected>
              Vyberte
            </option>

            <option value="Vybavená a obývaná">
              Vybavená a obývaná
            </option>

            <option value="Částečně vyklizená">
              Částečně vyklizená
            </option>

            <option value="Kompletně vyklizená">
              Kompletně vyklizená
            </option>

            <option value="Po bouracích pracích">
              Po bouracích pracích
            </option>

            <option value="Nevím">
              Zatím nevím
            </option>
          </select>
        </label>


        <!-- HLAVNÍ ZPRÁVA -->

        <label class="form-wide">
          Vaše představa
          <span>*</span>

          <textarea
            name="message"
            rows="6"
            required
            minlength="20"
            maxlength="5000"
            placeholder="Popište nám svou představu. Co chcete změnit, co vám na současném prostoru nevyhovuje a jak by měl výsledek ideálně vypadat?"
          ></textarea>

          <small>
            Alespoň 20 znaků. Nemusíte mít vše promyšlené – od toho jsme tu my.
          </small>
        </label>


        <!-- DOPLŇUJÍCÍ INFORMACE -->

        <label class="form-wide">
          Je ještě něco, co bychom měli vědět?
          <small>nepovinné</small>

          <textarea
            name="additionalInfo"
            rows="3"
            maxlength="2500"
            placeholder="Např. omezení domu nebo SVJ, parkování, přístup do objektu, specifické materiály, požadavky na hlučnost nebo jiné důležité informace."
          ></textarea>
        </label>
      </div>


      <!-- HONEYPOT PROTI SPAMU -->

      <div class="form-trap" aria-hidden="true">
        <label>
          Webová stránka
          <input
            name="website"
            tabindex="-1"
            autocomplete="off"
          />
        </label>
      </div>


      <!-- ODESLÁNÍ -->

      <div class="form-submit">
        <p>
          Údaje použijeme pouze k vyřízení vaší poptávky.<br />
          Povinná pole jsou označená hvězdičkou.
        </p>

        <button
          class="button dark"
          type="submit"
        >
          {formState === 'sending'
            ? 'Odesíláme…'
            : 'Odeslat poptávku'}

          <span aria-hidden="true">↗</span>
        </button>
      </div>
    </fieldset>


    <!-- STAV ODESLÁNÍ -->

    <div
      aria-live="polite"
      aria-atomic="true"
    >
      {#if feedback}
        <p
          class="form-feedback"
          class:success={formState === 'success'}
          class:error={formState === 'error'}
        >
          {feedback}
        </p>
      {/if}
    </div>


    <!-- BEZ JAVASCRIPTU -->

    <noscript>
      <p>
        Pro odeslání formuláře zapněte JavaScript nebo napište přímo na
        <a href="mailto:wohako@email.cz">
          wohako@email.cz
        </a>.
      </p>
    </noscript>
  </form>
</section>