<script lang="ts">
  import ContactForm from '../../lib/components/ContactForm.svelte';
  let { data } = $props();
  let c = $derived(data.content);
</script>

<svelte:head>
  <title>Kontakt | {c.brand.name}</title>
  <meta name="description" content={`Nezávazná poptávka rekonstrukce. ${c.contact.area}, ${c.contact.phone}, ${c.contact.email}.`} />
</svelte:head>

<main>
  <ContactForm title={c.contactPage.title} accent={c.contactPage.accent} text={c.contactPage.text} email={c.contact.email} phone={c.contact.phone} area={c.contact.area} />
</main>
