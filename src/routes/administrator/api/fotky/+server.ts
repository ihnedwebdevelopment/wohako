import { json } from '@sveltejs/kit';
import { addUploadedPhoto } from '../../../../lib/server/repo';
import type { RequestHandler } from './$types';

const MAX_BYTES = 4 * 1024 * 1024; // Vercel přijme max. 4,5 MB na požadavek.
const ALLOWED = new Set(['image/webp', 'image/jpeg']);

// Fotky se zmenšují už v prohlížeči (max. 2400 px), sem přichází hotové WebP.
export const POST: RequestHandler = async ({ request, locals }) => {
  if (!locals.admin) return json({ ok: false, message: 'Nejste přihlášeni.' }, { status: 401 });
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, message: 'Soubor se nepodařilo přečíst.' }, { status: 400 });
  }
  const full = form.get('full');
  const thumb = form.get('thumb');
  if (!(full instanceof File) || !(thumb instanceof File)) return json({ ok: false, message: 'Chybí soubor.' }, { status: 400 });
  if (!ALLOWED.has(full.type) || !ALLOWED.has(thumb.type)) return json({ ok: false, message: 'Nepodporovaný formát.' }, { status: 415 });
  if (full.size + thumb.size > MAX_BYTES) return json({ ok: false, message: 'Fotka je i po zmenšení příliš velká.' }, { status: 413 });
  const width = Math.round(Number(form.get('width')));
  const height = Math.round(Number(form.get('height')));
  if (!(width > 0 && height > 0 && width <= 6000 && height <= 6000)) return json({ ok: false, message: 'Neplatné rozměry fotky.' }, { status: 400 });
  const clean = (key: string, max: number) => String(form.get(key) ?? '').replace(/\s+/g, ' ').trim().slice(0, max);

  try {
    const photo = await addUploadedPhoto({
      full: new Uint8Array(await full.arrayBuffer()),
      thumb: new Uint8Array(await thumb.arrayBuffer()),
      type: full.type,
      alt: clean('alt', 300) || 'Fotografie realizace WOHAKO',
      category: clean('category', 60),
      width,
      height
    });
    return json({ ok: true, photo });
  } catch (error) {
    console.error('Nahrání fotky selhalo:', error);
    return json({ ok: false, message: error instanceof Error ? error.message : 'Nahrání se nepovedlo.' }, { status: 500 });
  }
};
