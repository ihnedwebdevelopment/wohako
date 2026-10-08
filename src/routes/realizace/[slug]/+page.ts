import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent }) => {
  const { projects } = await parent();
  const project = projects.find((item) => item.slug === params.slug);
  if (!project) error(404, 'Realizace nebyla nalezena.');
  return { project };
};
