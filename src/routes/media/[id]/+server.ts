import { error } from '@sveltejs/kit';
import { Readable } from 'node:stream';
import { openMedia } from '../../../lib/server/repo';
import type { RequestHandler } from './$types';

// Fotky nahrané v administraci (MongoDB GridFS). Každé nahrání má nové ID,
// proto lze soubory dlouhodobě cachovat.
export const GET: RequestHandler = async ({ params }) => {
  const file = await openMedia(params.id).catch(() => null);
  if (!file) error(404, 'Soubor nenalezen.');
  return new Response(Readable.toWeb(file.stream) as ReadableStream, {
    headers: {
      'content-type': file.type,
      'content-length': String(file.length),
      'cache-control': 'public, max-age=31536000, immutable',
      'x-content-type-options': 'nosniff'
    }
  });
};
