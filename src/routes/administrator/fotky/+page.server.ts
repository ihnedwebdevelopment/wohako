import { fail } from '@sveltejs/kit';
import { deletePhoto, loadSite, reorderPhotos, updatePhoto } from '../../../lib/server/repo';
import { contentSchema, getPath } from '../../../lib/content/schema';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const { content, photos, projects } = await loadSite();
  const usage: Record<string, string[]> = {};
  const add = (id: string, where: string) => { (usage[id] ??= []).push(where); };
  for (const section of contentSchema)
    for (const field of section.fields)
      if (field.type === 'photo') add(String(getPath(content, field.path)), `${section.title}: ${field.label}`);
  for (const project of projects) for (const id of project.photoIds) add(id, `Realizace: ${project.subtitle}`);
  const categories = [...new Set(['Koupelny', 'WC', 'Kuchyně', 'Interiéry', ...photos.map((photo) => photo.category).filter(Boolean)])];
  return { photos, usage, categories };
};

const text = (form: FormData, key: string, max: number) => String(form.get(key) ?? '').replace(/\s+/g, ' ').trim().slice(0, max);

export const actions: Actions = {
  update: async ({ request }) => {
    const form = await request.formData();
    const id = text(form, 'id', 100);
    const alt = text(form, 'alt', 300);
    if (!alt) return fail(400, { id, message: 'Doplňte popis fotky (důležitý pro nevidomé a pro Google).' });
    await updatePhoto(id, { alt, category: text(form, 'category', 60), inGallery: form.get('inGallery') === 'on' });
    return { id, saved: true };
  },
  move: async ({ request }) => {
    const form = await request.formData();
    const id = text(form, 'id', 100);
    const direction = form.get('direction') === 'up' ? -1 : 1;
    const { photos } = await loadSite();
    const ids = photos.map((photo) => photo.id);
    const index = ids.indexOf(id);
    const target = index + direction;
    if (index < 0 || target < 0 || target >= ids.length) return;
    [ids[index], ids[target]] = [ids[target], ids[index]];
    await reorderPhotos(ids);
  },
  delete: async ({ request }) => {
    const form = await request.formData();
    await deletePhoto(text(form, 'id', 100));
    return { deleted: true };
  }
};
