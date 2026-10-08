import { redirect } from '@sveltejs/kit';
import { clearSession } from '../../../lib/server/auth';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = () => redirect(303, '/administrator');

export const actions: Actions = {
  default: ({ cookies }) => {
    clearSession(cookies);
    redirect(303, '/administrator/prihlaseni');
  }
};
