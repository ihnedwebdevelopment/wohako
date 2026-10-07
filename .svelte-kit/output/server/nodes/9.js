

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/sluzby/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/9.CL5TsMU-.js","_app/immutable/chunks/CdgXtnB_.js","_app/immutable/chunks/uuinRxoU.js"];
export const stylesheets = [];
export const fonts = [];
