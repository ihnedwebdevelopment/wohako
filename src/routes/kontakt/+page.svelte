<script lang="ts">
  import ContactForm from '../../lib/components/ContactForm.svelte';
  import { site } from '../../lib/data/site';
</script>

<svelte:head>
  <title>Kontakt | WOHAKO rekonstrukce</title>
  <meta name="description" content="Kontaktujte WOHAKO rekonstrukce. Praha a okolí. E-mail wohako@email.cz, telefon 734 155 310." />
</svelte:head>

<main>
  <section class="contact-hero"><div class="contact-copy"><p class="eyebrow">POJĎME TO PROBRAT</p><h1>Váš prostor.<br /><em>Nový začátek.</em></h1><p>Máte představu o proměně koupelny, kuchyně nebo interiéru? Ozvěte se nám a napište, co byste chtěli změnit.</p><a class="button dark contact-form-link" href="#poptavka">Nezávazně poptat rekonstrukci <span aria-hidden="true">↗</span></a><a class="contact-email" href={`mailto:${site.email}?subject=${encodeURIComponent('Poptávka rekonstrukce — WOHAKO')}`}>{site.email}<span aria-hidden="true">↗</span></a><div class="contact-methods"><div><span>TELEFON</span><a href={`tel:${site.phoneHref}`}>{site.phoneDisplay}</a></div><div><span>PŮSOBNOST</span><strong>{site.area}</strong></div></div></div><div class="contact-image"><img src="/assets/koupelna-walkin-po.webp" alt="Světlá dokončená koupelna" fetchpriority="high" /></div></section>
  <ContactForm />
  <section class="section contact-prep"><div><p class="eyebrow">CO NÁM POSLAT</p><h2>Stačí pár věcí,<br />abychom mohli začít.</h2></div><ul><li>Co chcete rekonstruovat a kde se prostor nachází</li><li>Fotografie současného stavu</li><li>Přibližné rozměry nebo půdorys, pokud je máte</li><li>Vaši představu o výsledku a časovém rámci</li></ul></section>
  <section class="contact-final"><p>Nevíte ještě přesně, jak má výsledek vypadat?</p><h2>To vůbec nevadí.<br />Začneme rozhovorem.</h2><a class="button dark" href={`mailto:${site.email}`}>Napsat e-mail <span aria-hidden="true">↗</span></a></section>
</main>
