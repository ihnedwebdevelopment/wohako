import * as universal from '../entries/pages/_page.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.ts";
export const imports = ["_app/immutable/nodes/2.BLw3R3zn.js","_app/immutable/chunks/DK3Fl9T5.js","_app/immutable/chunks/CdgXtnB_.js","_app/immutable/chunks/BTC5JWUe.js","_app/immutable/chunks/uuinRxoU.js","_app/immutable/chunks/BIXnkxNc.js"];
export const stylesheets = [];
export const fonts = [];
