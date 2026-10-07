import { a as ensure_array_like, d as escape_html, l as attr, o as head, r as bind_props, t as attr_class } from "../../../chunks/server.js";
import "../../../chunks/index-server.js";
import { i as viewOptions, n as modelProjects, t as materialOptions } from "../../../chunks/projects.js";
//#region src/lib/components/Viewer3D.svelte
function Viewer3D($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { selected = "compact" } = $$props;
		let material = "original";
		let view = "perspective";
		let rotating = false;
		$$renderer.push(`<section class="viewer-section" id="prohlidka"><div class="section-heading"><div><p class="eyebrow">Z JINÉ PERSPEKTIVY</p><h2>Projděte si prostor.<br/>Ještě než do něj vstoupíte.</h2></div> <p>Otočte model, přibližte si detail<br/>a vyzkoušejte jiný odstín materiálu.</p></div> <div class="viewer-shell"><div class="viewer-main"><div class="viewer-top"><span class="viewer-label">INTERAKTIVNÍ 3D</span> <button class="icon-button" aria-label="Obnovit výchozí pohled" title="Obnovit pohled"${attr("disabled", true, true)}>↺</button></div> <div id="canvas-host" tabindex="-1" role="region" aria-label="Interaktivní 3D model. Šipkami otočíte pohled, klávesami plus a mínus přiblížíte nebo oddálíte." aria-describedby="viewer-instructions"${attr("data-model", selected)}${attr("data-material", material)}${attr("data-view", view)}>`);
		$$renderer.push(`<!--[0--><div class="viewer-loading" role="status" aria-live="polite">`);
		$$renderer.push(`<!--[-1--><span class="loading-spinner" aria-hidden="true"></span> Připravuji 3D prostor…`);
		$$renderer.push(`<!--]--></div>`);
		$$renderer.push(`<!--]--></div> <div class="viewer-toolbar"><div class="view-options" role="group" aria-label="Pohled na model"><!--[-->`);
		const each_array = ensure_array_like(viewOptions);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let option = each_array[$$index];
			$$renderer.push(`<button${attr("aria-pressed", view === option.id)}${attr("disabled", true, true)}${attr_class("", void 0, { "active": view === option.id })}>${escape_html(option.label)}</button>`);
		}
		$$renderer.push(`<!--]--></div> <div class="zoom-options"><button aria-label="Oddálit"${attr("disabled", true, true)}>−</button> <button aria-label="Přiblížit"${attr("disabled", true, true)}>+</button></div></div> <p class="viewer-hint" id="viewer-instructions">Tažením otáčejte · kolečkem nebo dvěma prsty přibližujte</p></div> <aside class="viewer-side"><p class="eyebrow">VYBERTE PROSTOR</p> <div class="model-options" role="group" aria-label="Výběr 3D modelu"><!--[-->`);
		const each_array_1 = ensure_array_like(modelProjects);
		for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
			let project = each_array_1[$$index_1];
			$$renderer.push(`<button${attr("aria-pressed", selected === project.modelId)}${attr_class("", void 0, { "active": selected === project.modelId })}><img${attr("src", project.after.src)} alt=""/> <span>${escape_html(project.modelName)}<small>${escape_html(project.modelMaterials)}</small></span> <span class="selection-dot" aria-hidden="true"></span></button>`);
		}
		$$renderer.push(`<!--]--></div> <div class="material-section"><p class="eyebrow">ODSTÍN MATERIÁLŮ</p> <div class="material-options" role="group" aria-label="Varianty materiálů"><!--[-->`);
		const each_array_2 = ensure_array_like(materialOptions);
		for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
			let option = each_array_2[$$index_2];
			$$renderer.push(`<button${attr("aria-pressed", material === option.id)}${attr_class("", void 0, { "active": material === option.id })}><span${attr_class(`swatch ${option.id}`)} aria-hidden="true"></span>${escape_html(option.label)}</button>`);
		}
		$$renderer.push(`<!--]--></div></div> <button class="rotation-toggle"${attr("aria-pressed", rotating)}${attr("disabled", true, true)}><span class="toggle-track" aria-hidden="true"><span></span></span>Automatické otáčení</button> <div class="model-note"><strong>Studie podle fotografie</strong><p>Model zachycuje styl a základní uspořádání. Rozměry nejsou ověřené; nejde o přesný stavební návrh.</p></div></aside></div></section>`);
		bind_props($$props, { selected });
	});
}
//#endregion
//#region src/routes/3d/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let selected = "compact";
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			head("1jo6gb0", $$renderer, ($$renderer) => {
				$$renderer.title(($$renderer) => {
					$$renderer.push(`<title>3D studio | WOHAKO rekonstrukce</title>`);
				});
				$$renderer.push(`<meta name="description" content="Interaktivní 3D studie koupelen a kuchyně. Otočte modely, změňte pohled a porovnejte materiály."/>`);
			});
			$$renderer.push(`<main class="studio-page"><section class="page-intro"><p class="eyebrow">3D STUDIO</p><h1>Podívejte se<br/><em>z jiného úhlu.</em></h1><p>Vyberte prostor, otočte model a prohlédněte si půdorys. Materiály můžete přepnout podle nálady interiéru.</p></section> `);
			Viewer3D($$renderer, {
				get selected() {
					return selected;
				},
				set selected($$value) {
					selected = $$value;
					$$settled = false;
				}
			});
			$$renderer.push(`<!----> <section class="section studio-explain"><div><p class="eyebrow">PROČ 3D?</p><h2>Prostor se lépe chápe, když se v něm můžete rozhlédnout.</h2></div><div><p>Fotografie zachytí jeden okamžik. Interaktivní studie ukáže vztah vybavení, průchodu a proporcí z více stran.</p><p>Modely jsou vytvořené podle dodaných fotografií. Slouží k představě o uspořádání a materiálech; skutečné rozměry je potřeba ověřit na místě.</p><a class="arrow-link" href="/realizace">Prohlédnout skutečné realizace <span aria-hidden="true">↗</span></a></div></section></main>`);
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
	});
}
//#endregion
export { _page as default };

//# sourceMappingURL=_page.svelte.js.map