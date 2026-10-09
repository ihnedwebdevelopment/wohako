// Shared shapes for everything the administration can edit.

export interface Photo {
  id: string;
  src: string;
  thumb: string;
  alt: string;
  category: string;
  width: number;
  height: number;
  inGallery: boolean;
  order: number;
  /** "static" = soubor ve složce static/, "upload" = nahráno přes administraci do MongoDB */
  source: 'static' | 'upload';
  fileIds?: string[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  details: string;
  photoIds: string[];
  published: boolean;
  order: number;
}

export interface ServiceItem {
  anchor: string;
  eyebrow: string;
  title: string;
  text: string;
  bullets: string;
  photo: string;
}

export interface Step {
  title: string;
  description: string;
}

export interface SiteContent {
  brand: {
    name: string;
    tagline: string;
    /** Nahrané logo (PNG v MongoDB). Prázdné = výchozí značka WOHAKO. */
    logo: string;
    logoWidth: number;
    logoHeight: number;
    favicon: string;
    logoFiles: string[];
    /** Zobrazit vedle loga i název firmy. */
    logoText: boolean;
    /** Velikost loga v hlavičce: s / m / l */
    logoSize: string;
  };
  contact: { email: string; phone: string; area: string; company: string; ico: string; address: string };
  seo: { title: string; description: string };
  home: {
    eyebrow: string;
    heroTitle: string;
    heroAccent: string;
    heroLead: string;
    heroPhoto: string;
    strip: string;
    introEyebrow: string;
    introTitle: string;
    introText: string;
    projectsTitle: string;
    projectsText: string;
    studioTitle: string;
    studioText: string;
    closingTitle: string;
  };
  services: {
    heroTitle: string;
    heroAccent: string;
    heroText: string;
    heroPhoto: string;
    items: ServiceItem[];
    bottomTitle: string;
    bottomText: string;
  };
  approach: {
    heroTitle: string;
    heroAccent: string;
    heroText: string;
    heroPhoto: string;
    quote: string;
    quoteText: string;
    steps: Step[];
  };
  projectsPage: { title: string; accent: string; text: string };
  gallery: { title: string; accent: string; text: string };
  contactPage: { title: string; accent: string; text: string };
}

export interface SiteData {
  content: SiteContent;
  photos: Photo[];
  projects: Project[];
}
