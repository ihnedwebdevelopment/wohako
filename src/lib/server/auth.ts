import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
import type { Cookies } from '@sveltejs/kit';
import * as env from '$app/env/private';

export const SESSION_COOKIE = 'wohako_admin';
const SESSION_DAYS = 7;

const sha = (value: string) => createHash('sha256').update(value).digest();

function secret() {
  if (env.ADMIN_SESSION_SECRET) return env.ADMIN_SESSION_SECRET;
  if (!env.ADMIN_PASSWORD) return null;
  // Changing the password automatically signs out every existing session.
  return createHash('sha256').update(`wohako-session:${env.ADMIN_PASSWORD}`).digest('hex');
}

const sign = (payload: string, key: string) => createHmac('sha256', key).update(payload).digest('base64url');

export function isAdminConfigured() {
  return !!env.ADMIN_PASSWORD;
}

export function checkPassword(candidate: string) {
  if (!env.ADMIN_PASSWORD) return false;
  return timingSafeEqual(sha(candidate), sha(env.ADMIN_PASSWORD));
}

export function createSession(cookies: Cookies, secure: boolean) {
  const key = secret();
  if (!key) return;
  const expires = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  const payload = String(expires);
  cookies.set(SESSION_COOKIE, `${payload}.${sign(payload, key)}`, {
    path: '/administrator',
    httpOnly: true,
    sameSite: 'strict',
    secure,
    maxAge: SESSION_DAYS * 24 * 60 * 60
  });
}

export function clearSession(cookies: Cookies) {
  cookies.delete(SESSION_COOKIE, { path: '/administrator' });
}

export function hasValidSession(cookies: Cookies) {
  const key = secret();
  const value = cookies.get(SESSION_COOKIE);
  if (!key || !value) return false;
  const [payload, signature] = value.split('.');
  if (!payload || !signature) return false;
  const expected = Buffer.from(sign(payload, key));
  const given = Buffer.from(signature);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return false;
  return Number(payload) > Date.now();
}

// Brute-force brake for the login form (per server instance).
const attempts = new Map<string, { count: number; until: number }>();
export function loginBlocked(ip: string) {
  const entry = attempts.get(ip);
  if (!entry) return false;
  if (entry.until < Date.now()) {
    attempts.delete(ip);
    return false;
  }
  return entry.count >= 8;
}
export function registerFailure(ip: string) {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || entry.until < now) attempts.set(ip, { count: 1, until: now + 15 * 60 * 1000 });
  else entry.count += 1;
  if (attempts.size > 1000) attempts.delete(attempts.keys().next().value!);
}
export function registerSuccess(ip: string) {
  attempts.delete(ip);
}
