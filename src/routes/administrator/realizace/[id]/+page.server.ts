import { error, fail, redirect } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import { loadSite, saveProject } from '../../../../lib/server/repo';
import type { Project } from '../../../../lib/content/types';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const { projects, photos } = await loadSite();
  const blank: Project = { id: '', slug: '', title: '', subtitle: '', category: 'Koupelna', description: '', details: '', photoIds: [], published: true, order: 0 };
  const project = params.id === 'nova' ? blank : projects.find((item) => item.id === params.id);
  if (!project) error(404, 'Realizace nenalezena.');
  const categories = [...new Set(['Koupelna', 'WC', 'Kuchyně', 'Interiér', ...projects.map((item) => item.category)])];
  return { project, isNew: params.id === 'nova', photos: photos.map(({ id, thumb, alt }) => ({ id, thumb, alt })), categories };
};

function slugify(value: string) {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

export const actions: Actions = {
  default: async ({ request, params }) => {
    const form = await request.formData();
    const line = (key: string, max: number) => String(form.get(key) ?? '').replace(/\s+/g, ' ').trim().slice(0, max);
    const block = (key: string, max: number) => String(form.get(key) ?? '').replace(/\r\n/g, '\n').trim().slice(0, max);
    const { photos } = await loadSite();
    const known = new Set(photos.map((photo) => photo.id));
    const subtitle = line('subtitle', 120);
    const values = {
      subtitle,
      title: line('title', 160),
      category: line('category', 60),
      slug: slugify(line('slug', 80) || subtitle),
      description: block('description', 600),
      details: block('details', 4000),
      published: form.get('published') === 'on',
      photoIds: form.getAll('photoIds').map(String).filter((id) => known.has(id)).slice(0, 60)
    };
    if (!subtitle) return fail(400, { message: 'Vyplňte název realizace.', values });
    if (!values.slug) return fail(400, { message: 'Adresa stránky nesmí být prázdná.', values });
    const id = params.id === 'nova' ? new ObjectId().toString() : params.id;
    try {
      await saveProject({ id, order: 0, ...values });
    } catch (cause) {
      return fail(400, { message: cause instanceof Error ? cause.message : 'Uložení se nepovedlo.', values });
    }
    redirect(303, `/administrator/realizace/${id}?ulozeno=1`);
  }
};
