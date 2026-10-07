import assert from 'node:assert/strict';
import { test } from 'node:test';
import { validateContact, contactEmail } from '../src/lib/server/contact.ts';

const valid = { name: 'Jana Nováková', email: 'jana@example.com', phone: '', locality: 'Praha', service: 'Koupelna a WC', message: 'Máme zájem o rekonstrukci koupelny v našem bytě.', website: '' };
test('accepts Czech text and optional empty phone, trims fields', () => {
  const { contact } = validateContact({ ...valid, name: '  Jana Nováková  ' });
  assert.equal(contact?.name, valid.name);
  assert.equal(contact?.phone, '');
});
test('rejects malformed payloads and missing fields', () => {
  for (const value of [null, [], 'message', {}, { ...valid, name: 5 }]) assert.ok(validateContact(value).error);
});
test('rejects header injection and invalid emails', () => {
  for (const email of ['bad', 'a@b', 'a@b.cz\r\nBcc: x@y.cz']) assert.ok(validateContact({ ...valid, email }).error);
  assert.ok(validateContact({ ...valid, name: 'Name\nBcc: x@y.cz' }).error);
});
test('rejects spam trap and invalid service', () => {
  assert.ok(validateContact({ ...valid, website: 'https://spam.example' }).error);
  assert.ok(validateContact({ ...valid, service: '<script>' }).error);
});
test('enforces length boundaries', () => {
  assert.ok(validateContact({ ...valid, message: 'short' }).error);
  assert.ok(validateContact({ ...valid, message: 'a'.repeat(5001) }).error);
  assert.ok(validateContact({ ...valid, name: 'a'.repeat(101) }).error);
});
test('escapes customer content in HTML mail while retaining plain text', () => {
  const { contact } = validateContact({ ...valid, message: '<img src=x onerror="alert(1)"> & rekonstrukce' });
  assert.ok(contact);
  const mail = contactEmail(contact);
  assert.ok(!mail.html.includes('<img'));
  assert.ok(mail.html.includes('&lt;img'));
  assert.ok(mail.text.includes('<img'));
});
