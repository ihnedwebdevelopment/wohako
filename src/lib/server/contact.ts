export const services = ['Koupelna a WC', 'Kuchyně', 'Kompletní interiér', 'Podkroví', 'Jiná poptávka'];

export interface Contact {
  name: string;
  email: string;
  phone: string;
  locality: string;
  service: string;
  message: string;
}

export function validateContact(value: unknown): { contact?: Contact; error?: string } {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return { error: 'Vyplňte prosím poptávkový formulář.' };
  const raw = value as Record<string, unknown>;
  if (raw.website) return { error: 'Poptávku se nepodařilo odeslat.' };
  const fields = ['name', 'email', 'phone', 'locality', 'service', 'message'] as const;
  if (fields.some((field) => typeof raw[field] !== 'string')) return { error: 'Zkontrolujte prosím vyplněné údaje.' };
  const contact = Object.fromEntries(fields.map((field) => [field, (raw[field] as string).trim()])) as unknown as Contact;
  if (contact.name.length < 2 || contact.name.length > 100 || /[\r\n]/.test(contact.name)) return { error: 'Jméno musí mít 2 až 100 znaků.' };
  if (contact.email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(contact.email)) return { error: 'Zadejte platný e-mail, na který vám můžeme odpovědět.' };
  if (contact.phone.length > 40 || (contact.phone && !/^[+\d\s()\-]{6,40}$/.test(contact.phone))) return { error: 'Zkontrolujte prosím telefonní číslo nebo jej nechte prázdné.' };
  if (contact.locality.length > 150 || /[\r\n]/.test(contact.locality)) return { error: 'Místo realizace může mít nejvýše 150 znaků.' };
  if (!services.includes(contact.service)) return { error: 'Vyberte prosím, co chcete rekonstruovat.' };
  if (contact.message.length < 20 || contact.message.length > 5000) return { error: 'Popište prosím svou představu v rozsahu 20 až 5 000 znaků.' };
  return { contact };
}

export function contactEmail(contact: Contact) {
  const text = `Nová poptávka z webu WOHAKO\n\nJméno: ${contact.name}\nE-mail: ${contact.email}\nTelefon: ${contact.phone || 'Neuveden'}\nMísto: ${contact.locality || 'Neuvedeno'}\nZájem o: ${contact.service}\n\n${contact.message}\n\nOdpovědí na tento e-mail kontaktujete přímo zájemce.`;
  const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
  return {
    subject: `Poptávka WOHAKO — ${contact.service}`,
    text,
    html: `<div style="background:#faf9f5;padding:32px;font-family:Arial,sans-serif;color:#1c302c;max-width:680px"><p style="letter-spacing:3px;color:#9c6a49">WOHAKO REKONSTRUKCE</p><h1 style="font-family:Georgia,serif;font-weight:normal">Nová poptávka z webu</h1><div style="white-space:pre-wrap;line-height:1.7">${escape(text.replace('Nová poptávka z webu WOHAKO\n\n', ''))}</div></div>`
  };
}
