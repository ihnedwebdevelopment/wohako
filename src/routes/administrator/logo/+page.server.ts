import { fail } from '@sveltejs/kit';
import { loadSite, saveLogoSettings } from '../../../lib/server/repo';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const { content } = await loadSite();
  return { brand: content.brand };
};

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const size = String(form.get('logoSize') ?? 'm');
    try {
      await saveLogoSettings({ logoText: form.get('logoText') === 'on', logoSize: ['s', 'm', 'l'].includes(size) ? size : 'm' });
    } catch (error) {
      console.error(error);
      return fail(500, { message: 'Uložení se nepovedlo.' });
    }
    return { saved: true };
  }
};
