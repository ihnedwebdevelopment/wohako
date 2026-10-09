<script lang="ts">
  let { title, button = 'Napsat nám', href = '/kontakt', eyebrow = 'Vaše další proměna' }: { title: string; button?: string; href?: string; eyebrow?: string } = $props();
</script>

<section class="closing">
  <div>
    <p class="eyebrow">{eyebrow}</p>
    <h2>{title}</h2>
    <p class="closing-free"><i aria-hidden="true"></i>Cenová nabídka zdarma a nezávazně</p>
  </div>
  <a class="button" {href}>{button} <span aria-hidden="true">→</span></a>
</section>
