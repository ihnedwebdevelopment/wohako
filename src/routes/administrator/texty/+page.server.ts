import { fail } from '@sveltejs/kit';
import { loadSite, saveContent } from '../../../lib/server/repo';
import { contentSchema, setPath } from '../../../lib/content/schema';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const { content, photos } = await loadSite();
  return { content, photos: photos.map(({ id, thumb, alt }) => ({ id, thumb, alt })) };
};

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const { content, photos, status } = await loadSite();
    if (status !== 'ok') return fail(503, { message: 'Databáze není dostupná, změny nelze uložit.' });
    const photoIds = new Set(photos.map((photo) => photo.id));
    const next = structuredClone(content);

    for (const section of contentSchema) {
      for (const field of section.fields) {
        const raw = form.get(field.path);
        if (typeof raw !== 'string') continue;
        let value = raw.replace(/\r\n/g, '\n').trim().slice(0, field.max ?? 2000);
        if (field.type === 'text' || field.type === 'email') value = value.replace(/\s+/g, ' ');
        if (field.type === 'email' && !/^[^\s@<>",]+@[^\s@<>",]+\.[^\s@<>",]+$/.test(value)) {
          return fail(400, { message: `Pole „${field.label}“ neobsahuje platný e-mail.` });
        }
        if (field.type === 'photo' && !photoIds.has(value)) continue;
        setPath(next, field.path, value);
      }
    }

    try {
      await saveContent(next);
    } catch (error) {
      console.error(error);
      return fail(500, { message: 'Uložení se nepovedlo. Zkuste to prosím znovu.' });
    }
    return { saved: true };
  }
};
