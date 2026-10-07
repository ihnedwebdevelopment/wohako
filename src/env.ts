import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
  // The website can build without mail credentials. The contact endpoint returns
  // an actionable 503 response until both server-side values are configured.
  RESEND_API_KEY: {
    public: false,
    static: false,
    schema: (value: string | undefined) => value?.trim() || undefined
  },
  RESEND_FROM_EMAIL: {
    public: false,
    static: false,
    schema: (value: string | undefined) => value?.trim() || undefined
  }
});
