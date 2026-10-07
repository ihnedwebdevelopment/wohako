import { d as escape_html, l as attr, t as attr_class } from "../../chunks/server.js";
import { t as page } from "../../chunks/state.js";
import { n as site } from "../../chunks/site.js";
//#region src/routes/+layout.svelte
function _layout($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { children } = $$props;
		let menuOpen = false;
		$$renderer.push(`<header class="header site-header"><a class="brand" href="/"${attr("aria-label", `${site.name} — úvod`)}><svg viewBox="0 0 40 40" aria-hidden="true"><path d="M6 34V6h28v28M6 20h14v14"></path></svg> <span>${escape_html(site.brandTop)}<small>${escape_html(site.brandBottom)}</small></span></a> <nav id="main-nav" aria-label="Hlavní navigace"${attr_class("", void 0, { "open": menuOpen })}><a${attr("aria-current", page.url.pathname === "/sluzby" ? "page" : void 0)} href="/sluzby"${attr_class("", void 0, { "active": page.url.pathname === "/sluzby" })}>Služby</a> <a${attr("aria-current", page.url.pathname === "/realizace" ? "page" : void 0)} href="/realizace"${attr_class("", void 0, { "active": page.url.pathname.startsWith("/realizace") })}>Realizace</a> <a${attr("aria-current", page.url.pathname === "/galerie" ? "page" : void 0)} href="/galerie"${attr_class("", void 0, { "active": page.url.pathname === "/galerie" })}>Galerie</a> <a${attr("aria-current", page.url.pathname === "/3d" ? "page" : void 0)} href="/3d"${attr_class("", void 0, { "active": page.url.pathname === "/3d" })}>3D studio</a> <a${attr("aria-current", page.url.pathname === "/pristup" ? "page" : void 0)} href="/pristup"${attr_class("", void 0, { "active": page.url.pathname === "/pristup" })}>Náš přístup</a></nav> <a class="nav-cta" href="/kontakt">Pojďme to probrat <span class="cube-icon" aria-hidden="true">↗</span></a> <button class="menu-toggle"${attr("aria-label", "Otevřít nabídku")} aria-controls="main-nav"${attr("aria-expanded", menuOpen)}><span></span><span></span><span></span></button></header> `);
		children($$renderer);
		$$renderer.push(`<!----> <footer class="site-footer"><div class="footer-top"><div><a class="footer-brand" href="/">WOHAKO<span>rekonstrukce</span></a><p>Proměny, ve kterých se dobře žije.</p></div> <nav aria-label="Patička"><a href="/sluzby">Služby</a><a href="/realizace">Realizace</a><a href="/galerie">Galerie</a><a href="/3d">3D studio</a><a href="/pristup">Náš přístup</a><a href="/kontakt">Kontakt</a></nav> <div class="footer-contact"><span>${escape_html(site.area)}</span><a${attr("href", `mailto:${site.email}`)}>${escape_html(site.email)}</a><a${attr("href", `tel:${site.phoneHref}`)}>${escape_html(site.phoneDisplay)}</a></div></div> <div class="footer-bottom"><span>© ${escape_html((/* @__PURE__ */ new Date()).getFullYear())} WOHAKO rekonstrukce</span><span>Koupelny · Kuchyně · Interiéry</span></div></footer>`);
	});
}
//#endregion
export { _layout as default };

//# sourceMappingURL=_layout.svelte.js.map