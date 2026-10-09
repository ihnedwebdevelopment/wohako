import { loadSite } from '../lib/server/repo';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ url, setHeaders }) => {
  const { content, photos, projects } = await loadSite();
  // Administrace potřebuje jen značku (logo); stránky si data načítají samy a nesmí se cachovat.
  if (url.pathname.startsWith('/administrator')) return { content, photos: [], projects: [] };
  // Krátká cache na CDN Vercelu: změny z administrace se na webu projeví během několika vteřin.
  setHeaders({ 'cache-control': 'public, max-age=0, s-maxage=10, stale-while-revalidate=50' });
  return { content, photos, projects: projects.filter((project) => project.published) };
};
