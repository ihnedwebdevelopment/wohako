import { a as ensure_array_like, d as escape_html, o as head } from "../../../chunks/server.js";
import { t as processSteps } from "../../../chunks/site.js";
//#region src/routes/pristup/+page.svelte
function _page($$renderer) {
	head("1amf2h4", $$renderer, ($$renderer) => {
		$$renderer.title(($$renderer) => {
			$$renderer.push(`<title>Náš přístup | WOHAKO rekonstrukce</title>`);
		});
		$$renderer.push(`<meta name="description" content="Jak WOHAKO přemýšlí o rekonstrukci: prostor, materiály, funkce a realizace do detailu."/>`);
	});
	$$renderer.push(`<main><section class="approach-hero"><div><p class="eyebrow">NÁŠ PŘÍSTUP</p><h1>Hezký prostor.<br/><em>Dobře promyšlený.</em></h1><p>Nejdřív hledáme smysl každého řešení. Teprve potom přichází obklad, barva a poslední detail.</p></div><img src="/assets/kuchyne-bila-detail.webp" alt="Detail světlé kuchyně s dřevěnou pracovní deskou" fetchpriority="high"/></section> <section class="section approach-belief"><p class="eyebrow">CO JE PRO NÁS PODSTATNÉ</p><blockquote>„Nejlepší interiér není ten, který jen dobře vypadá. Je to ten, ve kterém se dobře žije.“</blockquote><p>Funkce a atmosféra patří k sobě. V koupelně i kuchyni rozhodují maličkosti, které poznáte až při každodenním používání.</p></section> <section class="section approach-process"><div class="section-heading"><div><p class="eyebrow">OD PŘEDSTAVY K REALIZACI</p><h2>Každý krok má<br/>své místo.</h2></div></div><div class="process-grid"><!--[-->`);
	const each_array = ensure_array_like(processSteps);
	for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
		let step = each_array[$$index];
		$$renderer.push(`<article><h3>${escape_html(step.title)}</h3><p>${escape_html(step.description)}</p></article>`);
	}
	$$renderer.push(`<!--]--></div></section> <section class="approach-gallery"><img src="/assets/koupelna-kompaktni-po.webp" alt="Kompaktní koupelna po proměně" loading="lazy"/><img src="/assets/koupelna-walkin-po.webp" alt="Světlá koupelna se skleněnou zástěnou" loading="lazy"/><img src="/assets/kuchyne-bila.webp" alt="Bílá kuchyně s dřevěným dekorem" loading="lazy"/></section> <section class="closing"><p class="eyebrow">ZAČNĚME ROZHOVOREM</p><h2>Povíte nám svůj nápad?</h2><a class="button light-button" href="/kontakt">Kontaktovat WOHAKO <span aria-hidden="true">↗</span></a></section></main>`);
}
//#endregion
export { _page as default };

//# sourceMappingURL=_page.svelte.js.map