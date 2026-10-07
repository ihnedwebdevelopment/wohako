export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	app_dir: "_app",
	app_path: "_app",
	assets: new Set(["assets/galerie/cerna-koupelna-detail-nahled.webp","assets/galerie/cerna-koupelna-detail.webp","assets/galerie/cerna-koupelna-umyvadlo-nahled.webp","assets/galerie/cerna-koupelna-umyvadlo.webp","assets/galerie/interier-demontaz-nahled.webp","assets/galerie/interier-demontaz.webp","assets/galerie/kompaktni-koupelna-nahled.webp","assets/galerie/kompaktni-koupelna.webp","assets/galerie/koupelna-bourani-nahled.webp","assets/galerie/koupelna-bourani.webp","assets/galerie/koupelna-kyje-nahled.webp","assets/galerie/koupelna-kyje.webp","assets/galerie/koupelna-modrany-nahled.webp","assets/galerie/koupelna-modrany.webp","assets/galerie/koupelna-odhalene-steny-nahled.webp","assets/galerie/koupelna-odhalene-steny.webp","assets/galerie/koupelna-pred-obklady-nahled.webp","assets/galerie/koupelna-pred-obklady.webp","assets/galerie/koupelna-s-vanou-nahled.webp","assets/galerie/koupelna-s-vanou.webp","assets/galerie/koupelna-stodulky-nahled.webp","assets/galerie/koupelna-stodulky.webp","assets/galerie/kuchyne-bila-celek-nahled.webp","assets/galerie/kuchyne-bila-celek.webp","assets/galerie/kuchyne-bila-pohled-nahled.webp","assets/galerie/kuchyne-bila-pohled.webp","assets/galerie/kuchyne-podkrovi-detail-nahled.webp","assets/galerie/kuchyne-podkrovi-detail.webp","assets/galerie/podkrovi-chodba-nahled.webp","assets/galerie/podkrovi-chodba.webp","assets/galerie/podkrovi-hotove-nahled.webp","assets/galerie/podkrovi-hotove.webp","assets/galerie/podkrovi-izolace-nahled.webp","assets/galerie/podkrovi-izolace.webp","assets/galerie/podkrovi-konstrukce-nahled.webp","assets/galerie/podkrovi-konstrukce.webp","assets/galerie/podkrovi-kuchynka-nahled.webp","assets/galerie/podkrovi-kuchynka.webp","assets/galerie/podkrovi-pred-promena-nahled.webp","assets/galerie/podkrovi-pred-promena.webp","assets/galerie/podkrovi-puvodni-nahled.webp","assets/galerie/podkrovi-puvodni.webp","assets/galerie/podkrovi-topeni-okno-nahled.webp","assets/galerie/podkrovi-topeni-okno.webp","assets/galerie/podkrovi-tramy-nahled.webp","assets/galerie/podkrovi-tramy.webp","assets/galerie/podlahove-topeni-celek-nahled.webp","assets/galerie/podlahove-topeni-celek.webp","assets/galerie/podlahove-topeni-detail-nahled.webp","assets/galerie/podlahove-topeni-detail.webp","assets/galerie/projekt-vlasim-nahled.webp","assets/galerie/projekt-vlasim.webp","assets/galerie/puvodni-rohova-vana-nahled.webp","assets/galerie/puvodni-rohova-vana.webp","assets/galerie/sprcha-cerne-ramy-nahled.webp","assets/galerie/sprcha-cerne-ramy.webp","assets/galerie/sprcha-kamen-drevo-nahled.webp","assets/galerie/sprcha-kamen-drevo.webp","assets/galerie/sprcha-priprava-nahled.webp","assets/galerie/sprcha-priprava.webp","assets/galerie/wc-pred-rekonstrukci-nahled.webp","assets/galerie/wc-pred-rekonstrukci.webp","assets/galerie/wc-sede-dokoncene-nahled.webp","assets/galerie/wc-sede-dokoncene.webp","assets/galerie/wc-sedy-kamen-nahled.webp","assets/galerie/wc-sedy-kamen.webp","assets/galerie/wc-svetle-nahled.webp","assets/galerie/wc-svetle.webp","assets/koupelna-demontaz-pred.webp","assets/koupelna-kompaktni-po.webp","assets/koupelna-kompaktni-pred.webp","assets/koupelna-stodulky.webp","assets/koupelna-vana-po.webp","assets/koupelna-vana-pred.webp","assets/koupelna-walkin-po.webp","assets/kuchyne-bila-detail.webp","assets/kuchyne-bila.webp","assets/wc-puvodni.webp","favicon.svg"]),
	mime_types: {".webp":"image/webp",".svg":"image/svg+xml"},
	client: {start:"_app/immutable/entry/start.CEbN0FYi.js",app:"_app/immutable/entry/app.D31fbF8G.js",imports:["_app/immutable/entry/start.CEbN0FYi.js","_app/immutable/entry/payload.DSmR2FwN.js","_app/immutable/chunks/BaNbYf_w.js","_app/immutable/chunks/CXNpVFb9.js","_app/immutable/chunks/CdgXtnB_.js","_app/immutable/chunks/CbADPH2h.js","_app/immutable/chunks/t1UUoTS4.js","_app/immutable/chunks/CvlLlHQ2.js","_app/immutable/entry/app.D31fbF8G.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
	
	nodes: [
		__memo(() => import('./nodes/0.js')),
		__memo(() => import('./nodes/1.js')),
		__memo(() => import('./nodes/2.js')),
		__memo(() => import('./nodes/3.js')),
		__memo(() => import('./nodes/4.js')),
		__memo(() => import('./nodes/5.js')),
		__memo(() => import('./nodes/6.js')),
		__memo(() => import('./nodes/7.js')),
		__memo(() => import('./nodes/8.js')),
		__memo(() => import('./nodes/9.js'))
	],
	remotes: {
		
	},
	routes: [
		{
			id: "/",
			pattern: /^\/$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 2 },
			endpoint: null
		},
		{
			id: "/3d",
			pattern: /^\/3d\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 3 },
			endpoint: null
		},
		{
			id: "/api/kontakt",
			pattern: /^\/api\/kontakt\/?$/,
			params: [],
			page: null,
			endpoint: __memo(() => import('./entries/endpoints/api/kontakt/_server.ts.js'))
		},
		{
			id: "/galerie",
			pattern: /^\/galerie\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 4 },
			endpoint: null
		},
		{
			id: "/kontakt",
			pattern: /^\/kontakt\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 5 },
			endpoint: null
		},
		{
			id: "/pristup",
			pattern: /^\/pristup\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 6 },
			endpoint: null
		},
		{
			id: "/realizace",
			pattern: /^\/realizace\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 7 },
			endpoint: null
		},
		{
			id: "/realizace/[slug]",
			pattern: /^\/realizace\/([^/]+?)\/?$/,
			params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
			page: { layouts: [0,], errors: [1,], leaf: 8 },
			endpoint: null
		},
		{
			id: "/sluzby",
			pattern: /^\/sluzby\/?$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 9 },
			endpoint: null
		}
	],
	prerendered_routes: new Set([]),
	matchers: async () => {
		return {};
	},
	server_assets: {}
}
})();
