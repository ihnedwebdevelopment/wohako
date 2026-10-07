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
	handle_issues(issues);
}