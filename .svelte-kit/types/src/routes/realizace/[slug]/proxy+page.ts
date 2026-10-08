// @ts-nocheck
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = async ({ params, parent }: Parameters<PageLoad>[0]) => {
  const { projects } = await parent();
  const project = projects.find((item) => item.slug === params.slug);
  if (!project) error(404, 'Realizace nebyla nalezena.');
  return { project };
};
