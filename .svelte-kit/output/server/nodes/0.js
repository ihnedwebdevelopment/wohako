import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.B7xk5Kbj.js","_app/immutable/chunks/DK3Fl9T5.js","_app/immutable/chunks/CdgXtnB_.js","_app/immutable/chunks/t1UUoTS4.js","_app/immutable/entry/payload.DSmR2FwN.js","_app/immutable/chunks/CbADPH2h.js","_app/immutable/chunks/1-EFwk4M.js","_app/immutable/chunks/BTC5JWUe.js"];
export const stylesheets = ["_app/immutable/assets/0.BSA4UPui.css"];
export const fonts = [];
