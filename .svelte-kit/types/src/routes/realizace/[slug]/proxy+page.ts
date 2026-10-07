// @ts-nocheck
import { error } from '@sveltejs/kit';
import { projects } from '../../../lib/data/projects';
import type { PageLoad } from './$types';

export const prerender = true;
export const entries = () => projects.map((project) => ({ slug: project.id }));

export const load = ({ params }: Parameters<PageLoad>[0]) => {
  const project = projects.find((item) => item.id === params.slug);
  if (!project) error(404, 'Realizace nebyla nalezena.');
  return { project };
};
