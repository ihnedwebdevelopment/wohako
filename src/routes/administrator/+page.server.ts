import { loadSite } from '../../lib/server/repo';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const site = await loadSite();
  return {
    status: site.status,
    photoCount: site.photos.length,
    galleryCount: site.photos.filter((photo) => photo.inGallery).length,
    projectCount: site.projects.length,
    publishedCount: site.projects.filter((project) => project.published).length,
    contact: site.content.contact
  };
};
