import type { Photo, Project, SiteContent } from './types';

// Výchozí obsah. Použije se při prvním spuštění (nahraje se do MongoDB)
// a také jako záloha, kdyby databáze nebyla dostupná.

const photo = (id: string, alt: string, category: string, width: number, height: number, order: number): Photo => ({
  id,
  src: `/assets/foto/${id}.webp`,
  thumb: `/assets/foto/${id}-nahled.webp`,
  alt,
  category,
  width,
  height,
  inGallery: true,
  order,
  source: 'static'
});

export const defaultPhotos: Photo[] = [
  photo('tmava-koupelna-dvojumyvadlo', 'Koupelna v dekoru tmavého kamene s dvojumyvadlem, oknem a obloženými policemi', 'Koupelny', 2048, 1536, 0),
  photo('sprcha-zeleny-mramor', 'Walk-in sprcha se stěnou v dekoru zeleného mramoru a liniovým odtokem', 'Koupelny', 1536, 2048, 1),
  photo('tmava-koupelna-niky', 'Obložené niky a police s nerezovými lištami v tmavé kamenné koupelně', 'Koupelny', 1536, 2048, 2),
  photo('umyvadlo-zrcadlova-skrinka', 'Umyvadlo na desce se zrcadlovou skříňkou a šedými velkoformátovými obklady', 'Koupelny', 1536, 2048, 3),
  photo('tmava-koupelna-vana', 'Vana vestavěná do obkladu v dekoru tmavého kamene', 'Koupelny', 1536, 2048, 4),
  photo('umyvadlo-skrinka', 'Bílá závěsná skříňka s umyvadlem a šedé obklady', 'Koupelny', 1536, 2048, 5),
  photo('wc-betonovy-dekor', 'WC s velkoformátovými obklady v betonovém dekoru', 'WC', 1536, 2048, 6)
];

export const defaultProjects: Project[] = [
  {
    id: 'koupelna-tmavy-kamen',
    slug: 'koupelna-tmavy-kamen',
    title: 'Kámen, světlo a místo pro všechno.',
    subtitle: 'Koupelna v dekoru tmavého kamene',
    category: 'Koupelna',
    description: 'Velkoformátové obklady v dekoru tmavého kamene, obložené police a niky s nerezovými lištami a vana vestavěná do obkladu.',
    details: 'Celý prostor spojuje jeden materiál na stěnách i podlaze. Police a niky jsou obložené stejným obkladem a lemované nerezovými lištami, takže úložný prostor je součástí stěn. Závěsné WC odděluje nízká příčka, dvojumyvadlo stojí u okna s denním světlem.',
    photoIds: ['tmava-koupelna-dvojumyvadlo', 'tmava-koupelna-niky', 'tmava-koupelna-vana'],
    published: true,
    order: 0
  },
  {
    id: 'koupelna-zeleny-mramor',
    slug: 'koupelna-zeleny-mramor',
    title: 'Klidná šedá. Jeden výrazný detail.',
    subtitle: 'Světlá koupelna se sprchou v zeleném mramoru',
    category: 'Koupelna',
    description: 'Šedé velkoformátové obklady, walk-in sprcha se stěnou v dekoru zeleného mramoru a umyvadlo na desce se zrcadlovou skříňkou.',
    details: 'Sprchový kout bez vaničky má liniový odtok a termostatickou sprchovou sestavu s hlavovou sprchou. Zelená mramorová stěna dává prostoru výraz, zbytek koupelny zůstává světlý a klidný. Umyvadlo stojí na bílé závěsné skříňce se zásuvkami.',
    photoIds: ['sprcha-zeleny-mramor', 'umyvadlo-zrcadlova-skrinka', 'umyvadlo-skrinka'],
    published: true,
    order: 1
  }
];

export const defaultContent: SiteContent = {
  brand: {
    name: 'WOHAKO rekonstrukce',
    tagline: 'Proměny, ve kterých se dobře žije.',
    logo: '',
    logoWidth: 0,
    logoHeight: 0,
    favicon: '',
    logoFiles: [],
    logoText: false,
    logoSize: 'm'
  },
  contact: { email: 'wohako@email.cz', phone: '734 155 310', area: 'Praha a okolí', company: '', ico: '', address: '' },
  seo: {
    title: 'WOHAKO rekonstrukce — koupelny, WC a interiéry v Praze',
    description: 'Rekonstrukce koupelen, WC a interiérů v Praze a okolí. Prohlédněte si skutečné realizace WOHAKO.'
  },
  home: {
    eyebrow: 'Rekonstrukce koupelen · Praha a okolí',
    heroTitle: 'Koupelny, ve kterých',
    heroAccent: 'se dobře začíná den.',
    heroLead: 'Navrhneme a postavíme koupelnu, WC nebo celý interiér. Od bourání po poslední silikonovou spáru.',
    heroPhoto: 'tmava-koupelna-dvojumyvadlo',
    strip: 'Kompletní rekonstrukce\nKoupelny a WC\nObklady a dlažby\nKuchyně a interiéry',
    introEyebrow: 'Prostory s myšlenkou',
    introTitle: 'Dobře udělanou koupelnu poznáte každý den.',
    introText: 'Nejde jen o nový obklad. Jde o světlo, úložný prostor, čisté spáry a pocit, že všechno má své místo.',
    projectsTitle: 'Vybrané realizace',
    projectsText: 'Skutečné prostory, které jsme dokončili.',
    studioTitle: 'Prostor z jiné perspektivy.',
    studioText: 'Otočte model, podívejte se na půdorys a vyzkoušejte světlou i tmavou variantu materiálů.',
    closingTitle: 'Řekněte nám, jaký prostor si představujete.'
  },
  services: {
    heroTitle: 'Prostor, který',
    heroAccent: 'pracuje pro vás.',
    heroText: 'Od dispozice a materiálů po promyšlené detaily. Každá rekonstrukce začíná tím, jak chcete prostor používat.',
    heroPhoto: 'sprcha-zeleny-mramor',
    items: [
      {
        anchor: 'koupelny',
        eyebrow: 'Koupelny',
        title: 'Funkce, klid a místo pro vše důležité.',
        text: 'Sprcha, vana, úložný prostor i výběr obkladů musí fungovat společně. Navrhneme uspořádání a postaráme se o celou realizaci.',
        bullets: 'Bourací práce a příprava podkladu\nRozvody vody, odpadů a elektro\nVelkoformátové obklady a dlažby\nMontáž sanity a vybavení',
        photo: 'tmava-koupelna-vana'
      },
      {
        anchor: 'wc',
        eyebrow: 'WC a malé prostory',
        title: 'I malý prostor může působit velkoryse.',
        text: 'Závěsné WC, velké formáty obkladů a jednoduché detaily opticky zvětší i úzkou místnost.',
        bullets: 'Předstěnové instalace\nZávěsná WC a umyvadla\nČisté a snadno udržovatelné povrchy',
        photo: 'umyvadlo-skrinka'
      },
      {
        anchor: 'obklady',
        eyebrow: 'Obklady a detaily',
        title: 'Rozdíl dělá poslední milimetr.',
        text: 'Obložené police, niky, nerezové lišty a liniové odtoky. Detaily, které vypadají samozřejmě, ale vyžadují přesnou práci.',
        bullets: 'Niky a police z obkladu\nLiniové odtoky a sprchy bez vaničky\nPřesné spáry a ukončovací lišty',
        photo: 'tmava-koupelna-niky'
      }
    ],
    bottomTitle: 'Výsledek stojí na tom, co se rozhodne na začátku.',
    bottomText: 'Pošlete nám představu, fotografie současného stavu a přibližné rozměry. Pak se můžeme bavit konkrétně o možnostech prostoru.'
  },
  approach: {
    heroTitle: 'Hezký prostor.',
    heroAccent: 'Dobře promyšlený.',
    heroText: 'Nejdřív hledáme smysl každého řešení. Teprve potom přichází obklad, barva a poslední detail.',
    heroPhoto: 'umyvadlo-zrcadlova-skrinka',
    quote: 'Nejlepší interiér není ten, který jen dobře vypadá. Je to ten, ve kterém se dobře žije.',
    quoteText: 'Funkce a atmosféra patří k sobě. V koupelně rozhodují maličkosti, které poznáte až při každodenním používání.',
    steps: [
      { title: 'Prostor a vaše představa', description: 'Nejprve potřebujeme znát dispozici, rozměry a to, co od nového prostoru očekáváte.' },
      { title: 'Návrh a materiály', description: 'Uspořádání, obklady a vybavení vytvoří společný celek. Materiály vybereme spolu s vámi.' },
      { title: 'Realizace do detailu', description: 'Od přípravy podkladu přes rozvody a obklady až po montáž vybavení a finální dokončení.' }
    ]
  },
  projectsPage: {
    title: 'Proměny, které',
    accent: 'mluví samy za sebe.',
    text: 'Fotografie dokončených koupelen a detaily, které utvářejí celek.'
  },
  gallery: {
    title: 'Hotové prostory',
    accent: 'zblízka.',
    text: 'Materiály, spáry, světlo a detaily. Prohlédněte si fotografie našich realizací.'
  },
  contactPage: {
    title: 'Začíná to',
    accent: 'vaší představou.',
    text: 'Napište nám pár informací o prostoru, který chcete proměnit. Čím víc toho budeme vědět předem, tím lépe odhadneme možnosti a další postup.'
  }
};
