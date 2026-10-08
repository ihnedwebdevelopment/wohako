// Stav úvodní obrazovky. Třída `is-ready` na <html> spouští vstupní animace stránky.
const KEY = 'wohako-intro';

export function introSkipped() {
  return document.documentElement.classList.contains('no-intro');
}

export function markReady() {
  const root = document.documentElement;
  if (root.classList.contains('is-ready')) return;
  root.classList.add('is-ready');
  try { sessionStorage.setItem(KEY, '1'); } catch { /* soukromé okno — nevadí */ }
  window.dispatchEvent(new Event('wohako:ready'));
}

export function whenReady(callback: () => void) {
  if (document.documentElement.classList.contains('is-ready')) { callback(); return () => {}; }
  window.addEventListener('wohako:ready', callback, { once: true });
  return () => window.removeEventListener('wohako:ready', callback);
}
