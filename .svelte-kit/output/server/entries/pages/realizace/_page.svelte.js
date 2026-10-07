import { a as ensure_array_like, d as escape_html, i as derived, l as attr, o as head, t as attr_class } from "../../../chunks/server.js";
import "../../../chunks/state.js";
import { r as projects } from "../../../chunks/projects.js";
//#region src/routes/realizace/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let visible = derived(() => projects.filter((project) => true));
		head("14blx31", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Realizace | WOHAKO rekonstrukce</title>`);
			});
			$$renderer.push(`<meta name="description" content="Prohlédněte si skutečné proměny koupelen a kuchyní od WOHAKO rekonstrukce v Praze a okolí."/>`);
		});
		$$renderer.push(`<main><section class="page-intro"><p class="eyebrow">NAŠE PRÁCE</p><h1>Proměny, které<br/><em>mluví samy za sebe.</em></h1><p>Fotografie dokončených prostor, jejich výchozí stav a detaily, které utvářejí celek.</p></section> <section class="section portfolio-section"><div class="portfolio-toolbar"><p>Skutečné realizace WOHAKO</p><div role="group" aria-label="Filtrovat realizace"><button${attr("aria-pressed", true)}${attr_class("", void 0, { "active": true })}>Vše</button><button${attr("aria-pressed", false)}${attr_class("", void 0, { "active": false })}>Koupelny</button><button${attr("aria-pressed", false)}${attr_class("", void 0, { "active": false })}>Kuchyně</button></div></div> <div class="portfolio-grid"><!--[-->`);
		const each_array = ensure_array_like(visible());
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let project = each_array[$$index];
			$$renderer.push(`<a class="portfolio-card"${attr("href", `/realizace/${project.id}`)}><div class="portfolio-image"><img${attr("src", project.after.src)}${attr("alt", project.after.alt)} loading="lazy"/><span>${escape_html(project.tag)}</span></div><div class="portfolio-card-text"><p>${escape_html(project.subtitle)}</p><h2>${escape_html(project.title)}</h2><span>Prohlédnout realizaci <b aria-hidden="true">↗</b></span></div></a>`);
		}
		$$renderer.push(`<!--]--></div></section> <section class="gallery-invitation section"><div><p class="eyebrow">POHLED DO ZÁKULISÍ</p><h2>Každá proměna<br/>má svou cestu.</h2><p>Další koupelny, kuchyně i rekonstrukce podkroví. Prohlédněte si celou sbírku fotografií od prvních stavebních prací po hotové prostory.</p><a class="arrow-link" href="/galerie">Otevřít fotogalerii <span aria-hidden="true">↗</span></a></div><a href="/galerie?typ=podkrovi" aria-label="Prohlédnout fotografie podkroví"><img src="/assets/galerie/podkrovi-hotove.webp" alt="Podkrovní interiér s odkrytými dřevěnými trámy" loading="lazy"/></a></section> <section class="closing"><p class="eyebrow">PŘEDSTAVTE SI SVOU PROMĚNU</p><h2>Další příběh může začít<br/>u vás doma.</h2><a class="button light-button" href="/kontakt">Napsat nám <span aria-hidden="true">↗</span></a></section></main>`);
	});
}
//#endregion
export { _page as default };

//# sourceMappingURL=_page.svelte.js.map