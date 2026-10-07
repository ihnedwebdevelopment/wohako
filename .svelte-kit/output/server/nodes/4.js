

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/galerie/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.DYN1GqBP.js","_app/immutable/chunks/CdgXtnB_.js"];
export const stylesheets = [];
export const fonts = [];
