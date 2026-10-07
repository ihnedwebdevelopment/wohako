import { t as dynamic_private_env } from "../../../../chunks/config.js";
import { json } from "@sveltejs/kit";
//#region .svelte-kit/generated/build/env/private/server.js
var RESEND_API_KEY = dynamic_private_env.RESEND_API_KEY;
var RESEND_FROM_EMAIL = dynamic_private_env.RESEND_FROM_EMAIL;
//#endregion
//#region src/lib/server/contact.ts
var services = [
	"Koupelna a WC",
	"Kuchyně",
	"Kompletní interiér",
	"Podkroví",
	"Jiná poptávka"
];
function validateContact(value) {
	if (!value || typeof value !== "object" || Array.isArray(value)) return { error: "Vyplňte prosím poptávkový formulář." };
	const raw = value;
	if (raw.website) return { error: "Poptávku se nepodařilo odeslat." };
	const fields = [
		"name",
		"email",
		"phone",
		"locality",
		"service",
		"message"
	];
	if (fields.some((field) => typeof raw[field] !== "string")) return { error: "Zkontrolujte prosím vyplněné údaje." };
	const contact = Object.fromEntries(fields.map((field) => [field, raw[field].trim()]));
	if (contact.name.length < 2 || contact.name.length > 100 || /[\r\n]/.test(contact.name)) return { error: "Jméno musí mít 2 až 100 znaků." };
	if (contact.email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(contact.email)) return { error: "Zadejte platný e-mail, na který vám můžeme odpovědět." };
	if (contact.phone.length > 40 || contact.phone && !/^[+\d\s()\-]{6,40}$/.test(contact.phone)) return { error: "Zkontrolujte prosím telefonní číslo nebo jej nechte prázdné." };
	if (contact.locality.length > 150 || /[\r\n]/.test(contact.locality)) return { error: "Místo realizace může mít nejvýše 150 znaků." };
	if (!services.includes(contact.service)) return { error: "Vyberte prosím, co chcete rekonstruovat." };
	if (contact.message.length < 20 || contact.message.length > 5e3) return { error: "Popište prosím svou představu v rozsahu 20 až 5 000 znaků." };
	return { contact };
}
function contactEmail(contact) {
	const text = `Nová poptávka z webu WOHAKO\n\nJméno: ${contact.name}\nE-mail: ${contact.email}\nTelefon: ${contact.phone || "Neuveden"}\nMísto: ${contact.locality || "Neuvedeno"}\nZájem o: ${contact.service}\n\n${contact.message}\n\nOdpovědí na tento e-mail kontaktujete přímo zájemce.`;
	const escape = (s) => s.replace(/[&<>"']/g, (c) => ({
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		"\"": "&quot;",
		"'": "&#39;"
	})[c]);
	return {
		subject: `Poptávka WOHAKO — ${contact.service}`,
		text,
		html: `<div style="background:#faf9f5;padding:32px;font-family:Arial,sans-serif;color:#1c302c;max-width:680px"><p style="letter-spacing:3px;color:#9c6a49">WOHAKO REKONSTRUKCE</p><h1 style="font-family:Georgia,serif;font-weight:normal">Nová poptávka z webu</h1><div style="white-space:pre-wrap;line-height:1.7">${escape(text.replace("Nová poptávka z webu WOHAKO\n\n", ""))}</div></div>`
	};
}
//#endregion
//#region src/routes/api/kontakt/+server.ts
var prerender = false;
var attempts = /* @__PURE__ */ new Map();
var windowMs = 9e5;
var response = (status, message) => json({
	ok: status === 200,
	message
}, {
	status,
	headers: { "Cache-Control": "no-store" }
});
var POST = async ({ request, url, getClientAddress, fetch }) => {
	if (request.headers.get("origin") !== url.origin) return response(403, "Odešlete prosím formulář přímo z našeho webu.");
	if (!request.headers.get("content-type")?.startsWith("application/json")) return response(415, "Nepodporovaný formát formuláře.");
	const key = request.headers.get("idempotency-key");
	if (!key || !/^[a-f\d]{8}-[a-f\d]{4}-4[a-f\d]{3}-[89ab][a-f\d]{3}-[a-f\d]{12}$/i.test(key)) return response(400, "Obnovte prosím stránku a odešlete formulář znovu.");
	let raw;
	try {
		const reader = request.body?.getReader();
		if (!reader) return response(400, "Formulář je prázdný.");
		const decoder = new TextDecoder();
		let size = 0;
		let body = "";
		while (true) {
			const { value, done } = await reader.read();
			if (done) break;
			size += value.byteLength;
			if (size > 24e3) {
				await reader.cancel();
				return response(413, "Poptávka je příliš dlouhá. Zkraťte prosím zprávu.");
			}
			body += decoder.decode(value, { stream: true });
		}
		raw = JSON.parse(body + decoder.decode());
	} catch {
		return response(400, "Formulář se nepodařilo přečíst. Zkuste jej prosím odeslat znovu.");
	}
	const { contact, error } = validateContact(raw);
	if (!contact) return response(400, error);
	if (!RESEND_API_KEY || !RESEND_FROM_EMAIL) return response(503, "Formulář je dočasně nedostupný. Napište nám prosím na wohako@email.cz.");
	const now = Date.now();
	for (const [ip, attempt] of attempts) if (attempt.expires <= now) attempts.delete(ip);
	const ip = getClientAddress();
	const attempt = attempts.get(ip);
	if (attempt && attempt.count >= 5) return response(429, "Odeslali jste více zpráv v krátkém čase. Zkuste to prosím za 15 minut nebo nám zavolejte.");
	if (!attempt && attempts.size >= 1e3) attempts.delete(attempts.keys().next().value);
	attempts.set(ip, {
		count: (attempt?.count ?? 0) + 1,
		expires: attempt?.expires ?? now + windowMs
	});
	try {
		const sent = await fetch("https://api.resend.com/emails", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${RESEND_API_KEY}`,
				"Content-Type": "application/json",
				"Idempotency-Key": `wohako-${key}`
			},
			body: JSON.stringify({
				from: RESEND_FROM_EMAIL,
				to: ["wohako@email.cz"],
				reply_to: contact.email,
				...contactEmail(contact)
			}),
			signal: AbortSignal.timeout(1e4)
		});
		if (!sent.ok) return response(502, "Zprávu se nyní nepodařilo odeslat. Zkuste to prosím znovu nebo napište na wohako@email.cz.");
		if (!(await sent.json()).id) return response(502, "Odeslání se nepodařilo potvrdit. Zkuste to prosím znovu.");
		return response(200, "Děkujeme. Vaši poptávku jsme přijali a ozveme se vám na uvedený kontakt.");
	} catch {
		return response(502, "Spojení se přerušilo. Zkuste odeslání znovu nebo napište na wohako@email.cz.");
	}
};
//#endregion
export { POST, prerender };

//# sourceMappingURL=_server.ts.js.map