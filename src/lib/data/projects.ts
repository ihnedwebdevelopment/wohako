export type ModelKey = "compact" | "walkin" | "kitchen";
export type ProjectKey = ModelKey | "bath";
export type MaterialKey = "original" | "light" | "dark";
export type ViewKey = "perspective" | "top" | "front";

export interface Photo {
  src: string;
  alt: string;
}

export interface Project {
  id: ProjectKey;
  modelId?: ModelKey;
  title: string;
  subtitle: string;
  category: string;
  tag: string;
  modelName: string;
  modelMaterials: string;
  after: Photo;
  before?: Photo;
  gallery: Photo[];
  description: string;
}

const compact: Photo = {
  src: "/assets/koupelna-kompaktni-po.webp",
  alt: "Moderní koupelna se sprchovým koutem, dřevěnou skříňkou a pračkou",
};
const walkin: Photo = {
  src: "/assets/koupelna-walkin-po.webp",
  alt: "Světlá koupelna s bezrámovou skleněnou zástěnou",
};
const kitchen: Photo = {
  src: "/assets/kuchyne-bila.webp",
  alt: "Bílá kuchyně do L s dřevěnou pracovní deskou a černými doplňky",
};

export const projects: Project[] = [
  {
    id: "compact",
    modelId: "compact",
    title: "Malý prostor. Velká změna.",
    subtitle: "Koupelna se sprchovým koutem",
    category: "KOUPELNA / PŘED A PO",
    tag: "PŘED / PO",
    modelName: "Kompaktní koupelna",
    modelMaterials: "Sprcha · dřevo · šedý kámen",
    after: compact,
    before: {
      src: "/assets/koupelna-kompaktni-pred.webp",
      alt: "Původní koupelna s vanou před rekonstrukcí",
    },
    gallery: [compact],
    description:
      "Vanu nahradil sprchový kout. Dřevěná skříňka a šedé obklady vytvářejí kompaktní, sjednocený prostor.",
  },
  {
    id: "walkin",
    modelId: "walkin",
    title: "Čisté linie. Nová lehkost.",
    subtitle: "Světlá koupelna s walk-in sprchou",
    category: "KOUPELNA / PŘED A PO",
    tag: "PŘED / PO",
    modelName: "Walk-in koupelna",
    modelMaterials: "Sklo · světlé obklady",
    after: walkin,
    before: {
      src: "/assets/koupelna-demontaz-pred.webp",
      alt: "Koupelna při demontáži původních obkladů",
    },
    gallery: [walkin],
    description:
      "Světlé obklady, nová sanita a skleněná zástěna dodávají prostoru lehkost a otevřenost.",
  },
  {
    id: "kitchen",
    modelId: "kitchen",
    title: "Srdce domova v novém.",
    subtitle: "Bílá kuchyně s dekorem dřeva",
    category: "KUCHYNĚ / REALIZACE",
    tag: "KUCHYNĚ",
    modelName: "Kuchyně do L",
    modelMaterials: "Bílá · dřevěná pracovní deska",
    after: kitchen,
    gallery: [
      kitchen,
      {
        src: "/assets/kuchyne-bila-detail.webp",
        alt: "Druhý pohled na bílou kuchyni do L",
      },
    ],
    description:
      "Bílá kuchyňská linka do L s dřevěnou pracovní deskou, černými doplňky a vestavěnými spotřebiči.",
  },
  {
    id: "bath",
    title: "Klid v každém detailu.",
    subtitle: "Světlá koupelna s vanou",
    category: "KOUPELNA / PŘED A PO",
    tag: "PŘED / PO",
    modelName: "Koupelna s vanou",
    modelMaterials: "Světlé obklady · vana",
    after: {
      src: "/assets/koupelna-vana-po.webp",
      alt: "Dokončená světlá koupelna s obdélníkovou vanou a umyvadlem",
    },
    before: {
      src: "/assets/koupelna-vana-pred.webp",
      alt: "Původní koupelna s tmavými obklady a rohovou vanou",
    },
    gallery: [{
      src: "/assets/koupelna-vana-po.webp",
      alt: "Dokončená světlá koupelna s obdélníkovou vanou a umyvadlem",
    }],
    description:
      "Proměna koupelny s tmavými obklady a rohovou vanou ve světlý, přehledný prostor s jednoduchou sanitou.",
  },
];

export const modelProjects = projects.filter((project): project is Project & { modelId: ModelKey } => !!project.modelId);

export const materialOptions: { id: MaterialKey; label: string }[] = [
  { id: "original", label: "Podle foto" },
  { id: "light", label: "Světlý" },
  { id: "dark", label: "Tmavý" },
];

export const viewOptions: { id: ViewKey; label: string }[] = [
  { id: "perspective", label: "Perspektiva" },
  { id: "top", label: "Půdorys" },
  { id: "front", label: "Zepředu" },
];
