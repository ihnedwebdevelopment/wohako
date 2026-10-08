import { defineEnvVars } from '@sveltejs/kit/env';

const optional = {
  public: false,
  static: false,
  schema: (value: string | undefined) => value?.trim() || undefined
} as const;

export const variables = defineEnvVars({
  // The website can build without mail credentials. The contact endpoint returns
  // an actionable 503 response until both server-side values are configured.
  RESEND_API_KEY: optional,
  RESEND_FROM_EMAIL: optional,
  // Obsah webu a administrace. Bez MONGODB_URI web zobrazí výchozí obsah
  // a administrace upozorní, že databáze není nastavená.
  MONGODB_URI: optional,
  MONGODB_DB: optional,
  // Heslo do /administrator. Bez něj se do administrace nelze přihlásit.
  ADMIN_PASSWORD: optional,
  // Volitelné: tajný klíč pro podepisování přihlášení. Když chybí, odvodí se z hesla.
  ADMIN_SESSION_SECRET: optional
});
