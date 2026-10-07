import { a as ensure_array_like, d as escape_html, i as derived, l as attr, n as attr_style, o as head, t as attr_class } from "../../../../chunks/server.js";
import { r as projects } from "../../../../chunks/projects.js";
//#region src/lib/components/ProjectGallery.svelte
function ProjectGallery($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { project } = $$props;
		let position = 50;
		let shown = derived(() => project.after);
		let compare = derived(() => !!project.before && shown().src === project.after.src);
		$$renderer.push(`<div class="project-gallery"><div class="comparison project-comparison"><img class="comparison-after"${attr("src", shown().src)}${attr("alt", shown().alt)}/> `);
		if (compare() && project.before) $$renderer.push(`<!--[0--><div class="comparison-before"${attr_style("", { "clip-path": `inset(0 50% 0 0)` })}><img${attr("src", project.before.src)}${attr("alt", project.before.alt)}/></div> <span class="comparison-label before">PŘED</span> <div class="comparison-line"${attr_style("", { left: `${position}%` })}><span>↔</span></div> <input type="range" min="0" max="100"${attr("value", position)} aria-label="Porovnání fotografií před a po"/> <span class="comparison-label after">PO</span>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> <div class="gallery-bottom"><p>${escape_html(compare() ? "Posunutím porovnejte stav před a po rekonstrukci." : shown().alt)}</p>`);
		if (project.gallery.length > 1) {
			$$renderer.push(`<!--[0--><div class="gallery-thumbs" role="group" aria-label="Další fotografie"><!--[-->`);
			const each_array = ensure_array_like(project.gallery);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let photo = each_array[$$index];
				$$renderer.push(`<button${attr("aria-label", `Zobrazit: ${photo.alt}`)}${attr("aria-pressed", shown().src === photo.src)}${attr_class("", void 0, { "active": shown().src === photo.src })}><img${attr("src", photo.src)} alt="" loading="lazy"/></button>`);
			}
			$$renderer.push(`<!--]--></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div>`);
	});
}
//#endregion
//#region src/routes/realizace/[slug]/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		let project = derived(() => data.project);
		let related = derived(() => projects.filter((item) => item.id !== project().id).slice(0, 2));
		head("1wyjvz3", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(project().subtitle)} | WOHAKO rekonstrukce</title>`);
			});
			$$renderer.push(`<meta name="description"${attr("content", `${project().description} Prohlédněte si realizaci WOHAKO rekonstrukce.`)}/>`);
		});
		$$renderer.push(`<main><section class="detail-intro"><a href="/realizace" class="back-link">← Všechny realizace</a><p class="eyebrow">${escape_html(project().category)}</p><h1>${escape_html(project().title)}</h1><p>${escape_html(project().subtitle)}</p></section> <section class="detail-photo"><img${attr("src", project().after.src)}${attr("alt", project().after.alt)} fetchpriority="high"/></section> <section class="section detail-story"><div><p class="eyebrow">PŘÍBĚH PROSTORU</p><h2>Každý detail<br/>tvoří celek.</h2></div><div><p>${escape_html(project().description)}</p><p>Podívejte se na fotografii realizace a její výchozí stav. 3D studie, pokud je u projektu dostupná, ukazuje prostor také z dalších úhlů.</p>`);
		if (project().modelId) $$renderer.push(`<!--[0--><a class="arrow-link"${attr("href", `/3d?model=${project().modelId}`)}>Otevřít 3D studii <span aria-hidden="true">↗</span></a>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></section> <section class="section detail-gallery-section"><div class="section-heading"><div><p class="eyebrow">BLÍŽE K REALIZACI</p><h2>Podívejte se<br/>na proměnu.</h2></div></div>`);
		ProjectGallery($$renderer, { project: project() });
		$$renderer.push(`<!----></section> <section class="section related-section"><div class="section-heading"><div><p class="eyebrow">DALŠÍ INSPIRACE</p><h2>Další prostory<br/>k prozkoumání.</h2></div><a class="arrow-link" href="/realizace">Všechny realizace <span aria-hidden="true">↗</span></a></div><div class="related-grid"><!--[-->`);
		const each_array = ensure_array_like(related());
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let item = each_array[$$index];
			$$renderer.push(`<a class="related-card"${attr("href", `/realizace/${item.id}`)}><img${attr("src", item.after.src)}${attr("alt", item.after.alt)} loading="lazy"/><div><span>${escape_html(item.subtitle)}</span><h3>${escape_html(item.title)}</h3><b aria-hidden="true">↗</b></div></a>`);
		}
		$$renderer.push(`<!--]--></div></section> <section class="closing"><p class="eyebrow">VAŠE REALIZACE</p><h2>Promluvme si o prostoru,<br/>který chcete změnit.</h2><a class="button light-button" href="/kontakt">Kontaktovat WOHAKO <span aria-hidden="true">↗</span></a></section></main>`);
	});
}
//#endregion
export { _page as default };

//# sourceMappingURL=_page.svelte.js.map