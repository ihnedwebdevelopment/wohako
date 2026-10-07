import { r as projects } from "../../../../chunks/projects.js";
import { error } from "@sveltejs/kit";
//#region src/routes/realizace/[slug]/+page.ts
var prerender = true;
var entries = () => projects.map((project) => ({ slug: project.id }));
var load = ({ params }) => {
	const project = projects.find((item) => item.id === params.slug);
	if (!project) error(404, "Realizace nebyla nalezena.");
	return { project };
};
//#endregion
export { entries, load, prerender };

//# sourceMappingURL=_page.ts.js.map