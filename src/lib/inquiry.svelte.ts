// Sdílený stav okna s poptávkou: otevřít ho může tlačítko kdekoli na webu.
export const inquiry = $state({ open: false, source: '' });

export function openInquiry(source = '') {
  inquiry.source = source;
  inquiry.open = true;
}
