// Animace při posouvání stránky. Prvky jsou skryté jen tehdy, když má <html> třídu `motion`
// (JavaScript běží a návštěvník nemá zapnuté omezení pohybu) — viz app.css „Animace“.

export const REVEAL_SELECTOR = [
  '.section-heading',
  '.intro-grid > *',
  '.project-card',
  '.service-card',
  '.gallery-strip-grid > a',
  '.studio-teaser > *',
  '.process-grid > article',
  '.closing > *',
  '.page-intro > *',
  '.page-hero > *',
  '.service-detail > *',
  '.feature-list > li',
  '.service-bottom > *',
  '.belief > *',
  '.photo-row > img',
  '.filters',
  '.masonry > .photo-open',
  '.detail-photos > .photo-open',
  '.detail-story > *',
  '.inquiry-intro > *',
  '.inquiry-form',
  '.viewer-shell',
  '.studio-explain > *',
  '.footer-top > *'
].join(', ');

let observer: IntersectionObserver | null = null;

export function scanReveal() {
  if (!document.documentElement.classList.contains('motion')) return;
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('revealed');
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  );
  const counters = new Map<Element, number>();
  document.querySelectorAll(REVEAL_SELECTOR).forEach((element) => {
    if (element.classList.contains('revealed') || element.closest('.hero')) return;
    // Sourozenci nastupují postupně (max. 6 kroků, aby se dlouhé seznamy nezdržovaly).
    const parent = element.parentElement!;
    const index = counters.get(parent) ?? 0;
    counters.set(parent, index + 1);
    (element as HTMLElement).style.setProperty('--reveal-i', String(Math.min(index, 6)));
    observer!.observe(element);
  });
}

export function stopReveal() {
  observer?.disconnect();
  observer = null;
}

/** Hlavička: stín po odscrollování, schová se při posunu dolů a vrátí při posunu nahoru. */
export function trackHeader(header: HTMLElement) {
  let last = window.scrollY;
  let frame = 0;
  const update = () => {
    frame = 0;
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 8);
    const menuOpen = header.classList.contains('open');
    if (!menuOpen && y > 320 && y > last + 4) header.classList.add('tucked');
    else if (y < last - 4 || y <= 320) header.classList.remove('tucked');
    last = y;
  };
  const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
  window.addEventListener('scroll', onScroll, { passive: true });
  update();
  return () => {
    window.removeEventListener('scroll', onScroll);
    cancelAnimationFrame(frame);
  };
}
