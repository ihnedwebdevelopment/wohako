import { json } from '@sveltejs/kit';
import { removeLogo, saveLogo } from '../../../../lib/server/repo';
import type { RequestHandler } from './$types';

// Logo se ořízne a zmenší už v prohlížeči; sem přichází hotové PNG (logo + ikona prohlížeče).
const MAX_BYTES = 3 * 1024 * 1024;
const isPng = (bytes: Uint8Array) => bytes.length > 8 && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;

export const POST: RequestHandler = async ({ request, locals }) => {
  if (!locals.admin) return json({ ok: false, message: 'Nejste přihlášeni.' }, { status: 401 });
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, message: 'Soubor se nepodařilo přečíst.' }, { status: 400 });
  }
  const logo = form.get('logo');
  const favicon = form.get('favicon');
  if (!(logo instanceof File) || !(favicon instanceof File)) return json({ ok: false, message: 'Chybí soubor s logem.' }, { status: 400 });
  if (logo.size + favicon.size > MAX_BYTES) return json({ ok: false, message: 'Logo je příliš velké.' }, { status: 413 });
  const logoBytes = new Uint8Array(await logo.arrayBuffer());
  const faviconBytes = new Uint8Array(await favicon.arrayBuffer());
  if (!isPng(logoBytes) || !isPng(faviconBytes)) return json({ ok: false, message: 'Nepodporovaný formát.' }, { status: 415 });
  const width = Math.round(Number(form.get('width')));
  const height = Math.round(Number(form.get('height')));
  if (!(width > 0 && height > 0 && width <= 2000 && height <= 1000)) return json({ ok: false, message: 'Neplatné rozměry loga.' }, { status: 400 });
  try {
    const brand = await saveLogo({ logo: logoBytes, favicon: faviconBytes, width, height });
    return json({ ok: true, brand });
  } catch (error) {
    console.error('Uložení loga selhalo:', error);
    return json({ ok: false, message: 'Uložení loga se nepovedlo.' }, { status: 500 });
  }
};

export const DELETE: RequestHandler = async ({ locals }) => {
  if (!locals.admin) return json({ ok: false, message: 'Nejste přihlášeni.' }, { status: 401 });
  try {
    await removeLogo();
    return json({ ok: true });
  } catch (error) {
    console.error('Odebrání loga selhalo:', error);
    return json({ ok: false, message: 'Odebrání loga se nepovedlo.' }, { status: 500 });
  }
};
