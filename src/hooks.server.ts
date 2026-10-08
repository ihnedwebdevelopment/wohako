import { json, redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit/hooks';
import { hasValidSession } from './lib/server/auth';

const LOGIN = '/administrator/prihlaseni';

export const handle: Handle = async ({ event, resolve }) => {
  const path = event.url.pathname;

  if (path.startsWith('/administrator')) {
    const loggedIn = hasValidSession(event.cookies);
    event.locals.admin = loggedIn;
    if (!loggedIn && path !== LOGIN) {
      if (path.startsWith('/administrator/api')) return json({ ok: false, message: 'Přihlášení vypršelo. Přihlaste se znovu.' }, { status: 401 });
      redirect(303, `${LOGIN}?zpet=${encodeURIComponent(path)}`);
    }
    const response = await resolve(event);
    response.headers.set('cache-control', 'no-store');
    response.headers.set('x-robots-tag', 'noindex, nofollow');
    return response;
  }

  return resolve(event);
};
