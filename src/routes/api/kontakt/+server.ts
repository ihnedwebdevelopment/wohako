import { json } from '@sveltejs/kit';
import * as env from '$app/env/private';
import { validateContact, contactEmail } from '../../../lib/server/contact';
import type { RequestHandler } from './$types';

export const prerender = false;

// A bounded, per-instance limit complements the honeypot and request size limit.
const attempts = new Map<string, { count: number; expires: number }>();
const windowMs = 15 * 60 * 1000;
const response = (status: number, message: string) => json({ ok: status === 200, message }, { status, headers: { 'Cache-Control': 'no-store' } });

export const POST: RequestHandler = async ({ request, url, getClientAddress, fetch }) => {
  if (request.headers.get('origin') !== url.origin) return response(403, 'Odešlete prosím formulář přímo z našeho webu.');
  if (!request.headers.get('content-type')?.startsWith('application/json')) return response(415, 'Nepodporovaný formát formuláře.');
  const key = request.headers.get('idempotency-key');
  if (!key || !/^[a-f\d]{8}-[a-f\d]{4}-4[a-f\d]{3}-[89ab][a-f\d]{3}-[a-f\d]{12}$/i.test(key)) return response(400, 'Obnovte prosím stránku a odešlete formulář znovu.');

  let raw: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return response(400, 'Formulář je prázdný.');
    const decoder = new TextDecoder();
    let size = 0;
    let body = '';
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 24000) { await reader.cancel(); return response(413, 'Poptávka je příliš dlouhá. Zkraťte prosím zprávu.'); }
      body += decoder.decode(value, { stream: true });
    }
    raw = JSON.parse(body + decoder.decode());
  } catch { return response(400, 'Formulář se nepodařilo přečíst. Zkuste jej prosím odeslat znovu.'); }

  const { contact, error } = validateContact(raw);
  if (!contact) return response(400, error!);
  if (!env.RESEND_API_KEY || !env.RESEND_FROM_EMAIL) return response(503, 'Formulář je dočasně nedostupný. Napište nám prosím na wohako@email.cz.');

  const now = Date.now();
  for (const [ip, attempt] of attempts) if (attempt.expires <= now) attempts.delete(ip);
  const ip = getClientAddress();
  const attempt = attempts.get(ip);
  if (attempt && attempt.count >= 5) return response(429, 'Odeslali jste více zpráv v krátkém čase. Zkuste to prosím za 15 minut nebo nám zavolejte.');
  if (!attempt && attempts.size >= 1000) attempts.delete(attempts.keys().next().value!);
  attempts.set(ip, { count: (attempt?.count ?? 0) + 1, expires: attempt?.expires ?? now + windowMs });

  try {
    const sent = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': `wohako-${key}` },
      body: JSON.stringify({ from: env.RESEND_FROM_EMAIL, to: ['wohako@email.cz'], reply_to: contact.email, ...contactEmail(contact) }),
      signal: AbortSignal.timeout(10000)
    });
    if (!sent.ok) return response(502, 'Zprávu se nyní nepodařilo odeslat. Zkuste to prosím znovu nebo napište na wohako@email.cz.');
    const result = await sent.json();
    if (!result.id) return response(502, 'Odeslání se nepodařilo potvrdit. Zkuste to prosím znovu.');
    return response(200, 'Děkujeme. Vaši poptávku jsme přijali a ozveme se vám na uvedený kontakt.');
  } catch { return response(502, 'Spojení se přerušilo. Zkuste odeslání znovu nebo napište na wohako@email.cz.'); }
};
