import { fail, redirect } from '@sveltejs/kit';
import { checkPassword, createSession, isAdminConfigured, loginBlocked, registerFailure, registerSuccess } from '../../../lib/server/auth';
import type { Actions, PageServerLoad } from './$types';

const safeTarget = (value: string | null) => (value && value.startsWith('/administrator') && !value.startsWith('//') ? value : '/administrator');

export const load: PageServerLoad = ({ locals, url }) => {
  if (locals.admin) redirect(303, safeTarget(url.searchParams.get('zpet')));
};

export const actions: Actions = {
  default: async ({ request, cookies, url, getClientAddress }) => {
    const ip = getClientAddress();
    if (!isAdminConfigured()) return fail(503, { message: 'Administrace zatím nemá nastavené heslo (proměnná ADMIN_PASSWORD).' });
    if (loginBlocked(ip)) return fail(429, { message: 'Příliš mnoho pokusů. Zkuste to znovu za 15 minut.' });
    const form = await request.formData();
    const password = String(form.get('password') ?? '');
    if (!checkPassword(password)) {
      registerFailure(ip);
      return fail(400, { message: 'Nesprávné heslo.' });
    }
    registerSuccess(ip);
    createSession(cookies, url.protocol === 'https:');
    redirect(303, safeTarget(url.searchParams.get('zpet')));
  }
};
