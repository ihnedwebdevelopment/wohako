import { loadSite } from '../lib/server/repo';
import { defaultContent } from '../lib/content/defaults';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ url, setHeaders }) => {
  // Administrace si načítá data sama a nesmí se cachovat.
  if (url.pathname.startsWith('/administrator')) return { content: defaultContent, photos: [], projects: [] };
  const { content, photos, projects } = await loadSite();
  // Krátká cache na CDN Vercelu: změny z administrace se na webu projeví během několika vteřin.
  setHeaders({ 'cache-control': 'public, max-age=0, s-maxage=10, stale-while-revalidate=50' });
  return { content, photos, projects: projects.filter((project) => project.published) };
};
