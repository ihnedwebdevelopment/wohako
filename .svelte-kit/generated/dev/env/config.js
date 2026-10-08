import { variables } from "../../../../src/env.ts";
import { validate, handle_issues } from '@sveltejs/kit/internal/env';

const issues = {};

export { variables }

export const dynamic_private_env = {};

export const explicit_public_env = {};

export const rendered_env = {};

handle_issues(issues);

export function set_env(env) {
	const issues = {};
	const RESEND_API_KEY = validate(variables, env.RESEND_API_KEY, "RESEND_API_KEY", issues);
	dynamic_private_env.RESEND_API_KEY = RESEND_API_KEY;
	const RESEND_FROM_EMAIL = validate(variables, env.RESEND_FROM_EMAIL, "RESEND_FROM_EMAIL", issues);
	dynamic_private_env.RESEND_FROM_EMAIL = RESEND_FROM_EMAIL;
	const MONGODB_URI = validate(variables, env.MONGODB_URI, "MONGODB_URI", issues);
	dynamic_private_env.MONGODB_URI = MONGODB_URI;
	const MONGODB_DB = validate(variables, env.MONGODB_DB, "MONGODB_DB", issues);
	dynamic_private_env.MONGODB_DB = MONGODB_DB;
	const ADMIN_PASSWORD = validate(variables, env.ADMIN_PASSWORD, "ADMIN_PASSWORD", issues);
	dynamic_private_env.ADMIN_PASSWORD = ADMIN_PASSWORD;
	const ADMIN_SESSION_SECRET = validate(variables, env.ADMIN_SESSION_SECRET, "ADMIN_SESSION_SECRET", issues);
	dynamic_private_env.ADMIN_SESSION_SECRET = ADMIN_SESSION_SECRET;
	handle_issues(issues);
}

set_env({});