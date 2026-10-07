export type GalleryCategory = "vse" | "koupelny" | "kuchyne" | "podkrovi" | "interiery";
export interface GalleryPhoto { id: string; src: string; thumb: string; alt: string; category: GalleryCategory; stage: string; width: number; height: number }
export const galleryPhotos: GalleryPhoto[] = [
  {
    "id": "kompaktni-koupelna",
    "src": "/assets/galerie/kompaktni-koupelna.webp",
    "thumb": "/assets/galerie/kompaktni-koupelna-nahled.webp",
    "alt": "Koupelna se sprchovým koutem a dřevěnou skříňkou",
    "category": "koupelny",
    "stage": "Hotový prostor",
    "width": 1179,
    "height": 1179
  },
  {
    "id": "wc-sedy-kamen",
    "src": "/assets/galerie/wc-sedy-kamen.webp",
    "thumb": "/assets/galerie/wc-sedy-kamen-nahled.webp",
    "alt": "Závěsné WC s obklady v dekoru kamene",
    "category": "koupelny",
    "stage": "Hotový prostor",
    "width": 1179,
    "height": 1179
  },
  {
    "id": "kuchyne-bila-celek",
    "src": "/assets/galerie/kuchyne-bila-celek.webp",
    "thumb": "/assets/galerie/kuchyne-bila-celek-nahled.webp",
    "alt": "Bílá kuchyně s dřevěnou pracovní deskou",
    "category": "kuchyne",
    "stage": "Hotový prostor",
    "width": 1280,
    "height": 1600
  },
  {
    "id": "kuchyne-bila-pohled",
    "src": "/assets/galerie/kuchyne-bila-pohled.webp",
    "thumb": "/assets/galerie/kuchyne-bila-pohled-nahled.webp",
    "alt": "Rohová kuchyňská linka s černými doplňky",
    "category": "kuchyne",
    "stage": "Hotový prostor",
    "width": 1280,
    "height": 1600
  },
  {
    "id": "koupelna-s-vanou",
    "src": "/assets/galerie/koupelna-s-vanou.webp",
    "thumb": "/assets/galerie/koupelna-s-vanou-nahled.webp",
    "alt": "Světlá koupelna s vanou a umyvadlem",
    "category": "koupelny",
    "stage": "Hotový prostor",
    "width": 1179,
    "height": 1179
  },
  {
    "id": "cerna-koupelna-umyvadlo",
    "src": "/assets/galerie/cerna-koupelna-umyvadlo.webp",
    "thumb": "/assets/galerie/cerna-koupelna-umyvadlo-nahled.webp",
    "alt": "Černé obklady a bílé umyvadlo v koupelně",
    "category": "koupelny",
    "stage": "Hotový prostor",
    "width": 968,
    "height": 968
  },
  {
    "id": "podkrovi-kuchynka",
    "src": "/assets/galerie/podkrovi-kuchynka.webp",
    "thumb": "/assets/galerie/podkrovi-kuchynka-nahled.webp",
    "alt": "Kuchyňská linka zasazená pod trámy",
    "category": "kuchyne",
    "stage": "Hotový prostor",
    "width": 983,
    "height": 983
  },
  {
    "id": "podkrovi-chodba",
    "src": "/assets/galerie/podkrovi-chodba.webp",
    "thumb": "/assets/galerie/podkrovi-chodba-nahled.webp",
    "alt": "Dokončená chodba s přiznanou dřevěnou konstrukcí",
    "category": "podkrovi",
    "stage": "Hotový prostor",
    "width": 982,
    "height": 982
  },
  {
    "id": "kuchyne-podkrovi-detail",
    "src": "/assets/galerie/kuchyne-podkrovi-detail.webp",
    "thumb": "/assets/galerie/kuchyne-podkrovi-detail-nahled.webp",
    "alt": "Bílá kuchyňská linka s dřevěným obkladem",
    "category": "kuchyne",
    "stage": "Hotový prostor",
    "width": 1280,
    "height": 1600
  },
  {
    "id": "wc-svetle",
    "src": "/assets/galerie/wc-svetle.webp",
    "thumb": "/assets/galerie/wc-svetle-nahled.webp",
    "alt": "Dokončené WC se světlými obklady",
    "category": "koupelny",
    "stage": "Hotový prostor",
    "width": 1334,
    "height": 1334
  },
  {
    "id": "wc-sede-dokoncene",
    "src": "/assets/galerie/wc-sede-dokoncene.webp",
    "thumb": "/assets/galerie/wc-sede-dokoncene-nahled.webp",
    "alt": "Šedé obklady, závěsné WC a černé doplňky",
    "category": "koupelny",
    "stage": "Hotový prostor",
    "width": 1179,
    "height": 1179
  },
  {
    "id": "sprcha-cerne-ramy",
    "src": "/assets/galerie/sprcha-cerne-ramy.webp",
    "thumb": "/assets/galerie/sprcha-cerne-ramy-nahled.webp",
    "alt": "Sprchový kout s černými rámy a světlými obklady",
    "category": "koupelny",
    "stage": "Hotový prostor",
    "width": 1178,
    "height": 1178
  },
  {
    "id": "sprcha-kamen-drevo",
    "src": "/assets/galerie/sprcha-kamen-drevo.webp",
    "thumb": "/assets/galerie/sprcha-kamen-drevo-nahled.webp",
    "alt": "Sprchový kout s kombinací kamene a dřeva",
    "category": "koupelny",
    "stage": "Hotový prostor",
    "width": 1280,
    "height": 1600
  },
  {
    "id": "podkrovi-tramy",
    "src": "/assets/galerie/podkrovi-tramy.webp",
    "thumb": "/assets/galerie/podkrovi-tramy-nahled.webp",
    "alt": "Hotový interiér s původními dřevěnými trámy",
    "category": "podkrovi",
    "stage": "Hotový prostor",
    "width": 750,
    "height": 750
  },
  {
    "id": "cerna-koupelna-detail",
    "src": "/assets/galerie/cerna-koupelna-detail.webp",
    "thumb": "/assets/galerie/cerna-koupelna-detail-nahled.webp",
    "alt": "Černé obklady s výraznou kamennou kresbou",
    "category": "koupelny",
    "stage": "Hotový prostor",
    "width": 992,
    "height": 992
  },
  {
    "id": "podkrovi-hotove",
    "src": "/assets/galerie/podkrovi-hotove.webp",
    "thumb": "/assets/galerie/podkrovi-hotove-nahled.webp",
    "alt": "Dokončené světlé podkroví s dřevěnými trámy",
    "category": "podkrovi",
    "stage": "Hotový prostor",
    "width": 1334,
    "height": 1334
  },
  {
    "id": "podlahove-topeni-celek",
    "src": "/assets/galerie/podlahove-topeni-celek.webp",
    "thumb": "/assets/galerie/podlahove-topeni-celek-nahled.webp",
    "alt": "Rozvody podlahového vytápění v podkroví",
    "category": "podkrovi",
    "stage": "V průběhu",
    "width": 1280,
    "height": 1600
  },
  {
    "id": "podlahove-topeni-detail",
    "src": "/assets/galerie/podlahove-topeni-detail.webp",
    "thumb": "/assets/galerie/podlahove-topeni-detail-nahled.webp",
    "alt": "Detail pokládky podlahového vytápění",
    "category": "podkrovi",
    "stage": "V průběhu",
    "width": 1280,
    "height": 1600
  },
  {
    "id": "koupelna-bourani",
    "src": "/assets/galerie/koupelna-bourani.webp",
    "thumb": "/assets/galerie/koupelna-bourani-nahled.webp",
    "alt": "Koupelna při odstraňování původních obkladů",
    "category": "koupelny",
    "stage": "V průběhu",
    "width": 1179,
    "height": 1179
  },
  {
    "id": "sprcha-priprava",
    "src": "/assets/galerie/sprcha-priprava.webp",
    "thumb": "/assets/galerie/sprcha-priprava-nahled.webp",
    "alt": "Příprava koupelny pro nové povrchy a sanitu",
    "category": "koupelny",
    "stage": "V průběhu",
    "width": 1171,
    "height": 1171
  },
  {
    "id": "podkrovi-konstrukce",
    "src": "/assets/galerie/podkrovi-konstrukce.webp",
    "thumb": "/assets/galerie/podkrovi-konstrukce-nahled.webp",
    "alt": "Práce na konstrukci a izolaci podkroví",
    "category": "podkrovi",
    "stage": "V průběhu",
    "width": 946,
    "height": 946
  },
  {
    "id": "interier-demontaz",
    "src": "/assets/galerie/interier-demontaz.webp",
    "thumb": "/assets/galerie/interier-demontaz-nahled.webp",
    "alt": "Demontáž původního vybavení interiéru",
    "category": "interiery",
    "stage": "V průběhu",
    "width": 1280,
    "height": 1600
  },
  {
    "id": "koupelna-odhalene-steny",
    "src": "/assets/galerie/koupelna-odhalene-steny.webp",
    "thumb": "/assets/galerie/koupelna-odhalene-steny-nahled.webp",
    "alt": "Odhalené zdivo a rozvody během rekonstrukce",
    "category": "koupelny",
    "stage": "V průběhu",
    "width": 1179,
    "height": 1179
  },
  {
    "id": "podkrovi-izolace",
    "src": "/assets/galerie/podkrovi-izolace.webp",
    "thumb": "/assets/galerie/podkrovi-izolace-nahled.webp",
    "alt": "Izolace pod šikmou střechou během stavebních prací",
    "category": "podkrovi",
    "stage": "V průběhu",
    "width": 976,
    "height": 976
  },
  {
    "id": "koupelna-pred-obklady",
    "src": "/assets/galerie/koupelna-pred-obklady.webp",
    "thumb": "/assets/galerie/koupelna-pred-obklady-nahled.webp",
    "alt": "Koupelna před položením nových obkladů",
    "category": "koupelny",
    "stage": "V průběhu",
    "width": 1179,
    "height": 1179
  },
  {
    "id": "podkrovi-topeni-okno",
    "src": "/assets/galerie/podkrovi-topeni-okno.webp",
    "thumb": "/assets/galerie/podkrovi-topeni-okno-nahled.webp",
    "alt": "Podlahové vytápění u okna v podkrovním pokoji",
    "category": "podkrovi",
    "stage": "V průběhu",
    "width": 1280,
    "height": 1600
  },
  {
    "id": "puvodni-rohova-vana",
    "src": "/assets/galerie/puvodni-rohova-vana.webp",
    "thumb": "/assets/galerie/puvodni-rohova-vana-nahled.webp",
    "alt": "Původní koupelna s rohovou vanou",
    "category": "koupelny",
    "stage": "Před rekonstrukcí",
    "width": 1334,
    "height": 1334
  },
  {
    "id": "podkrovi-puvodni",
    "src": "/assets/galerie/podkrovi-puvodni.webp",
    "thumb": "/assets/galerie/podkrovi-puvodni-nahled.webp",
    "alt": "Původní podkroví s odhalenými trámy",
    "category": "podkrovi",
    "stage": "Před rekonstrukcí",
    "width": 1334,
    "height": 1334
  },
  {
    "id": "wc-pred-rekonstrukci",
    "src": "/assets/galerie/wc-pred-rekonstrukci.webp",
    "thumb": "/assets/galerie/wc-pred-rekonstrukci-nahled.webp",
    "alt": "Původní WC s tmavými obklady",
    "category": "koupelny",
    "stage": "Před rekonstrukcí",
    "width": 986,
    "height": 986
  },
  {
    "id": "podkrovi-pred-promena",
    "src": "/assets/galerie/podkrovi-pred-promena.webp",
    "thumb": "/assets/galerie/podkrovi-pred-promena-nahled.webp",
    "alt": "Podkrovní prostor před zahájením rekonstrukce",
    "category": "podkrovi",
    "stage": "Před rekonstrukcí",
    "width": 982,
    "height": 982
  },
  {
    "id": "koupelna-kyje",
    "src": "/assets/galerie/koupelna-kyje.webp",
    "thumb": "/assets/galerie/koupelna-kyje-nahled.webp",
    "alt": "Koupelna Kyje — titulní fotografie projektu",
    "category": "koupelny",
    "stage": "Představení projektu",
    "width": 1080,
    "height": 1080
  },
  {
    "id": "projekt-vlasim",
    "src": "/assets/galerie/projekt-vlasim.webp",
    "thumb": "/assets/galerie/projekt-vlasim-nahled.webp",
    "alt": "Projekt Vlašim — rekonstrukce půdy na obytný byt",
    "category": "podkrovi",
    "stage": "Představení projektu",
    "width": 1080,
    "height": 1080
  },
  {
    "id": "koupelna-stodulky",
    "src": "/assets/galerie/koupelna-stodulky.webp",
    "thumb": "/assets/galerie/koupelna-stodulky-nahled.webp",
    "alt": "Koupelna Stodůlky — titulní fotografie projektu",
    "category": "koupelny",
    "stage": "Představení projektu",
    "width": 1080,
    "height": 1080
  },
  {
    "id": "koupelna-modrany",
    "src": "/assets/galerie/koupelna-modrany.webp",
    "thumb": "/assets/galerie/koupelna-modrany-nahled.webp",
    "alt": "Koupelna Modřany — titulní fotografie projektu",
    "category": "koupelny",
    "stage": "Představení projektu",
    "width": 1080,
    "height": 1080
  }
];
