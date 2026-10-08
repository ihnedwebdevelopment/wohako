
import error from './shared/error-template.js';

export const options = {
	app_template_contains_nonce: false,
	csp: {"mode":"auto","directives":{"upgrade-insecure-requests":false,"block-all-mixed-content":false},"reportOnly":{"upgrade-insecure-requests":false,"block-all-mixed-content":false}},
	csrf_trusted_origins: [],
	service_worker_options: undefined,
	templates: {
		app: ({ head, body, assets, nonce, env }) => "<!doctype html>\n<html lang=\"cs\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <meta name=\"theme-color\" content=\"#fafaf7\" />\n    <link rel=\"icon\" type=\"image/svg+xml\" href=\"" + assets + "/favicon.svg\" />\n    <script>\n      // Před vykreslením: zapnout animace jen s JavaScriptem, úvodní obrazovku jen jednou za návštěvu.\n      (function () {\n        var d = document.documentElement;\n        d.classList.add('js');\n        var still = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;\n        if (!still) d.classList.add('motion');\n        var seen = false;\n        try { seen = !!sessionStorage.getItem('wohako-intro'); } catch (e) { seen = true; }\n        if (seen || still || location.pathname.indexOf('/administrator') === 0) d.classList.add('no-intro', 'is-ready');\n      })();\n    </script>\n    " + head + "\n  </head>\n  <body data-sveltekit-preload-data=\"hover\">\n    <div style=\"display: contents\">" + body + "</div>\n  </body>\n</html>\n",
		error
	}
};

export async function get_hooks() {
	let handle;
	let handleFetch;
	let handleError;
	let init;
	({ handle, handleFetch, handleError, init } = await import("../../../src/hooks.server.ts"));

	let reroute;
	let transport;
	

	return {
		handle,
		handleFetch,
		handleError,
		init,
		reroute,
		transport
	};
}
