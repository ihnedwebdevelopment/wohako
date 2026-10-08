// Popis formuláře „Texty webu“ v administraci. Každé pole odkazuje na místo v SiteContent.

export type FieldType = 'text' | 'textarea' | 'lines' | 'photo' | 'email';

export interface Field {
  path: string;
  label: string;
  type: FieldType;
  hint?: string;
  max?: number;
}

export interface Section {
  id: string;
  title: string;
  description?: string;
  fields: Field[];
}

const t = (path: string, label: string, hint?: string, max = 200): Field => ({ path, label, type: 'text', hint, max });
const area = (path: string, label: string, hint?: string, max = 2000): Field => ({ path, label, type: 'textarea', hint, max });
const photo = (path: string, label: string): Field => ({ path, label, type: 'photo' });

const service = (i: number): Field[] => [
  t(`services.items.${i}.eyebrow`, `Služba ${i + 1} — nadpisek`),
  t(`services.items.${i}.title`, `Služba ${i + 1} — nadpis`),
  area(`services.items.${i}.text`, `Služba ${i + 1} — text`),
  { path: `services.items.${i}.bullets`, label: `Služba ${i + 1} — body seznamu`, type: 'lines', hint: 'Každý bod na nový řádek.', max: 1500 },
  photo(`services.items.${i}.photo`, `Služba ${i + 1} — fotka`)
];

const step = (i: number): Field[] => [
  t(`approach.steps.${i}.title`, `Krok ${i + 1} — nadpis`),
  area(`approach.steps.${i}.description`, `Krok ${i + 1} — popis`, undefined, 600)
];

export const contentSchema: Section[] = [
  {
    id: 'kontakty',
    title: 'Kontakty a firma',
    description: 'Zobrazují se v patičce, na stránce Kontakt a používají se pro poptávkový formulář.',
    fields: [
      { path: 'contact.email', label: 'E-mail', type: 'email', hint: 'Na tento e-mail chodí poptávky z formuláře.', max: 254 },
      t('contact.phone', 'Telefon', undefined, 40),
      t('contact.area', 'Oblast působení', undefined, 100),
      t('contact.company', 'Název firmy / jméno podnikatele', 'Volitelné, zobrazí se v patičce.'),
      t('contact.ico', 'IČO', 'Volitelné.', 20),
      t('contact.address', 'Sídlo', 'Volitelné.'),
      t('brand.name', 'Název webu'),
      t('brand.tagline', 'Motto v patičce')
    ]
  },
  {
    id: 'uvod',
    title: 'Úvodní stránka',
    fields: [
      t('home.eyebrow', 'Malý nadpisek nad hlavním nadpisem'),
      t('home.heroTitle', 'Hlavní nadpis — 1. část'),
      t('home.heroAccent', 'Hlavní nadpis — zvýrazněná část', 'Zobrazí se kurzívou.'),
      area('home.heroLead', 'Úvodní text', undefined, 400),
      photo('home.heroPhoto', 'Hlavní fotka'),
      { path: 'home.strip', label: 'Pruh se službami', type: 'lines', hint: 'Každá položka na nový řádek.', max: 600 },
      t('home.introEyebrow', 'Blok „O nás“ — nadpisek'),
      t('home.introTitle', 'Blok „O nás“ — nadpis'),
      area('home.introText', 'Blok „O nás“ — text'),
      t('home.projectsTitle', 'Realizace — nadpis'),
      t('home.projectsText', 'Realizace — text'),
      t('home.studioTitle', '3D studio — nadpis'),
      area('home.studioText', '3D studio — text', undefined, 400),
      t('home.closingTitle', 'Výzva na konci stránky')
    ]
  },
  {
    id: 'sluzby',
    title: 'Služby',
    fields: [
      t('services.heroTitle', 'Nadpis — 1. část'),
      t('services.heroAccent', 'Nadpis — zvýrazněná část'),
      area('services.heroText', 'Úvodní text', undefined, 400),
      photo('services.heroPhoto', 'Hlavní fotka'),
      ...service(0),
      ...service(1),
      ...service(2),
      t('services.bottomTitle', 'Závěrečný blok — nadpis'),
      area('services.bottomText', 'Závěrečný blok — text')
    ]
  },
  {
    id: 'pristup',
    title: 'Náš přístup',
    description: 'Kroky spolupráce se zobrazují i na úvodní stránce.',
    fields: [
      t('approach.heroTitle', 'Nadpis — 1. část'),
      t('approach.heroAccent', 'Nadpis — zvýrazněná část'),
      area('approach.heroText', 'Úvodní text', undefined, 400),
      photo('approach.heroPhoto', 'Hlavní fotka'),
      area('approach.quote', 'Citát', undefined, 400),
      area('approach.quoteText', 'Text pod citátem'),
      ...step(0),
      ...step(1),
      ...step(2)
    ]
  },
  {
    id: 'stranky',
    title: 'Realizace, galerie a kontakt',
    fields: [
      t('projectsPage.title', 'Realizace — nadpis'),
      t('projectsPage.accent', 'Realizace — zvýrazněná část'),
      area('projectsPage.text', 'Realizace — text', undefined, 400),
      t('gallery.title', 'Galerie — nadpis'),
      t('gallery.accent', 'Galerie — zvýrazněná část'),
      area('gallery.text', 'Galerie — text', undefined, 400),
      t('contactPage.title', 'Kontakt — nadpis'),
      t('contactPage.accent', 'Kontakt — zvýrazněná část'),
      area('contactPage.text', 'Kontakt — text', undefined, 600)
    ]
  },
  {
    id: 'seo',
    title: 'Vyhledávače (SEO)',
    description: 'Název a popis, které ukazuje Google ve výsledcích hledání.',
    fields: [t('seo.title', 'Titulek stránky', 'Ideálně do 60 znaků.', 120), area('seo.description', 'Popis', 'Ideálně do 160 znaků.', 300)]
  }
];

export function getPath(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => (acc == null ? undefined : (acc as Record<string, unknown>)[key]), obj);
}

export function setPath(obj: unknown, path: string, value: unknown) {
  const keys = path.split('.');
  let target = obj as Record<string, unknown>;
  for (const key of keys.slice(0, -1)) target = target[key] as Record<string, unknown>;
  target[keys.at(-1)!] = value;
}
