import { defineEnvVars } from "@sveltejs/kit/env";
import { handle_issues, validate } from "@sveltejs/kit/internal/env";
//#region src/env.ts
var variables = defineEnvVars({
	RESEND_API_KEY: {
		public: false,
		static: false,
		schema: (value) => value?.trim() || void 0
	},
	RESEND_FROM_EMAIL: {
		public: false,
		static: false,
		schema: (value) => value?.trim() || void 0
	}
});
//#endregion
//#region .svelte-kit/generated/build/env/config.js
var issues = {};
var dynamic_private_env = {};
var explicit_public_env = {};
var rendered_env = {};
handle_issues(issues);
function set_env(env) {
	const issues = {};
	dynamic_private_env.RESEND_API_KEY = validate(variables, env.RESEND_API_KEY, "RESEND_API_KEY", issues);
	dynamic_private_env.RESEND_FROM_EMAIL = validate(variables, env.RESEND_FROM_EMAIL, "RESEND_FROM_EMAIL", issues);
	handle_issues(issues);
}
//#endregion
export { variables as a, set_env as i, explicit_public_env as n, rendered_env as r, dynamic_private_env as t };

//# sourceMappingURL=config.js.map