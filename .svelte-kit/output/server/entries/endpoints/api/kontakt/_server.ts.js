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
	"Byt",
	"Rodinný dům",
	"Podkroví",
	"Nebytový prostor",
	"Jiná poptávka"
];
var propertyTypes = [
	"Byt v panelovém domě",
	"Byt v cihlovém domě",
	"Rodinný dům",
	"Novostavba",
	"Historický objekt",
	"Nebytový prostor",
	"Jiné"
];
var dispositions = [
	"1+kk",
	"1+1",
	"2+kk",
	"2+1",
	"3+kk",
	"3+1",
	"4+kk",
	"4+1",
	"5+kk a větší",
	"Rodinný dům",
	"Jiné"
];
var bathroomLayouts = [
	"Koupelna a WC zvlášť",
	"Koupelna a WC společně",
	"Chci koupelnu a WC spojit",
	"Chci koupelnu a WC oddělit",
	"Zatím nevím"
];
var bathroomRequirements = [
	"Sprchový kout",
	"Vana",
	"Vana i sprchový kout",
	"Bezbariérové řešení",
	"Zatím nevím"
];
var propertyConditions = [
	"Původní stav",
	"Částečně rekonstruováno",
	"Po starší rekonstrukci",
	"Novostavba před dokončením",
	"Hrubá stavba",
	"Jiné"
];
var elevators = [
	"Ano",
	"Ne",
	"Nevím / netýká se"
];
var occupiedOptions = [
	"Ano",
	"Ne",
	"Částečně",
	"Zatím nevím"
];
var electricalOptions = [
	"Původní – bude potřeba nová",
	"Částečně nová",
	"Nová",
	"Nevím"
];
var plumbingOptions = [
	"Původní",
	"Částečně nové",
	"Nové",
	"Nevím"
];
var floorConditionOptions = [
	"Kompletní výměna",
	"Částečná výměna",
	"Podlahy chceme zachovat",
	"Nevím"
];
var preferredTerms = [
	"Co nejdříve",
	"Do 1–3 měsíců",
	"Do 3–6 měsíců",
	"Do 6–12 měsíců",
	"Za více než rok",
	"Zatím nevím"
];
var budgets = [
	"Do 150 000 Kč",
	"150 000–300 000 Kč",
	"300 000–500 000 Kč",
	"500 000–800 000 Kč",
	"800 000–1 200 000 Kč",
	"1 200 000 Kč a více",
	"Rozpočet zatím nemám"
];
var documentationOptions = [
	"Ano – mám půdorys",
	"Ano – mám projektovou dokumentaci",
	"Mám pouze fotografie",
	"Ne"
];
var sitePreparationOptions = [
	"Vybavená a obývaná",
	"Částečně vyklizená",
	"Kompletně vyklizená",
	"Po bouracích pracích",
	"Nevím"
];
var fields = [
	"name",
	"email",
	"phone",
	"locality",
	"service",
	"propertyType",
	"disposition",
	"totalFloorArea",
	"roomCount",
	"roomLayout",
	"bathroomArea",
	"toiletArea",
	"bathroomLayout",
	"bathroomRequirement",
	"propertyCondition",
	"floor",
	"elevator",
	"occupiedDuringRenovation",
	"reconstructionScope",
	"layoutChanges",
	"electrical",
	"plumbing",
	"floorCondition",
	"ceilingHeight",
	"preferredTerm",
	"budget",
	"documentation",
	"sitePreparation",
	"message",
	"additionalInfo"
];
function isAllowed(value, options) {
	return value === "" || options.includes(value);
}
function validateOptionalNumber(value, min, max) {
	if (!value) return true;
	const number = Number(value);
	return Number.isFinite(number) && number >= min && number <= max;
}
function hasNewLine(value) {
	return /[\r\n]/.test(value);
}
function validateContact(value) {
	if (!value || typeof value !== "object" || Array.isArray(value)) return { error: "Vyplňte prosím poptávkový formulář." };
	const raw = value;
	if (raw.website) return { error: "Poptávku se nepodařilo odeslat." };
	if (fields.some((field) => raw[field] !== void 0 && typeof raw[field] !== "string")) return { error: "Zkontrolujte prosím vyplněné údaje." };
	const contact = Object.fromEntries(fields.map((field) => [field, typeof raw[field] === "string" ? raw[field].trim() : ""]));
	if (contact.name.length < 2 || contact.name.length > 100 || hasNewLine(contact.name)) return { error: "Jméno musí mít 2 až 100 znaků." };
	if (contact.email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(contact.email)) return { error: "Zadejte platný e-mail, na který vám můžeme odpovědět." };
	if (contact.phone.length > 40 || contact.phone && !/^[+\d\s()\-]{6,40}$/.test(contact.phone)) return { error: "Zkontrolujte prosím telefonní číslo nebo jej nechte prázdné." };
	if (contact.locality.length > 150 || hasNewLine(contact.locality)) return { error: "Místo realizace může mít nejvýše 150 znaků." };
	if (!services.includes(contact.service)) return { error: "Vyberte prosím, co chcete rekonstruovat." };
	if (!isAllowed(contact.propertyType, propertyTypes)) return { error: "Vyberte platný typ nemovitosti." };
	if (!isAllowed(contact.disposition, dispositions)) return { error: "Vyberte platnou dispozici nemovitosti." };
	if (!validateOptionalNumber(contact.totalFloorArea, 1, 5e3)) return { error: "Celková podlahová plocha musí být mezi 1 a 5 000 m²." };
	if (contact.roomCount && (!Number.isInteger(Number(contact.roomCount)) || Number(contact.roomCount) < 1 || Number(contact.roomCount) > 100)) return { error: "Počet místností musí být číslo mezi 1 a 100." };
	if (contact.roomLayout.length > 1500) return { error: "Popis rozložení místností může mít nejvýše 1 500 znaků." };
	if (!validateOptionalNumber(contact.bathroomArea, 1, 200)) return { error: "Velikost koupelny musí být mezi 1 a 200 m²." };
	if (!validateOptionalNumber(contact.toiletArea, .5, 100)) return { error: "Velikost WC musí být mezi 0,5 a 100 m²." };
	if (!isAllowed(contact.bathroomLayout, bathroomLayouts)) return { error: "Vyberte platné uspořádání koupelny a WC." };
	if (!isAllowed(contact.bathroomRequirement, bathroomRequirements)) return { error: "Vyberte platný požadavek na koupelnu." };
	if (!isAllowed(contact.propertyCondition, propertyConditions)) return { error: "Vyberte platný stav nemovitosti." };
	if (contact.floor.length > 30 || hasNewLine(contact.floor)) return { error: "Údaj o patře může mít nejvýše 30 znaků." };
	if (!isAllowed(contact.elevator, elevators)) return { error: "Vyberte platný údaj o výtahu." };
	if (!isAllowed(contact.occupiedDuringRenovation, occupiedOptions)) return { error: "Vyberte platný údaj o užívání prostoru během rekonstrukce." };
	if (contact.reconstructionScope.length > 2500) return { error: "Popis rozsahu rekonstrukce může mít nejvýše 2 500 znaků." };
	if (contact.layoutChanges.length > 1500) return { error: "Popis změn dispozice může mít nejvýše 1 500 znaků." };
	if (!isAllowed(contact.electrical, electricalOptions)) return { error: "Vyberte platný stav elektroinstalace." };
	if (!isAllowed(contact.plumbing, plumbingOptions)) return { error: "Vyberte platný stav vody a odpadů." };
	if (!isAllowed(contact.floorCondition, floorConditionOptions)) return { error: "Vyberte platný stav podlah." };
	if (!validateOptionalNumber(contact.ceilingHeight, 1.5, 10)) return { error: "Výška stropu musí být mezi 1,5 a 10 metry." };
	if (!isAllowed(contact.preferredTerm, preferredTerms)) return { error: "Vyberte platný předpokládaný termín realizace." };
	if (!isAllowed(contact.budget, budgets)) return { error: "Vyberte platný orientační rozpočet." };
	if (!isAllowed(contact.documentation, documentationOptions)) return { error: "Vyberte platný údaj o projektové dokumentaci." };
	if (!isAllowed(contact.sitePreparation, sitePreparationOptions)) return { error: "Vyberte platný stav nemovitosti při zahájení." };
	if (contact.message.length < 20 || contact.message.length > 5e3) return { error: "Popište prosím svou představu v rozsahu 20 až 5 000 znaků." };
	if (contact.additionalInfo.length > 2500) return { error: "Doplňující informace mohou mít nejvýše 2 500 znaků." };
	return { contact };
}
function contactEmail(contact) {
	const value = (input, fallback = "Neuvedeno") => input || fallback;
	const area = (input) => input ? `${input} m²` : "Neuvedeno";
	const meters = (input) => input ? `${input} m` : "Neuvedeno";
	const text = `
NOVÁ POPTÁVKA Z WEBU WOHAKO


────────────────────────────
KONTAKTNÍ ÚDAJE
────────────────────────────

Jméno: ${contact.name}
E-mail: ${contact.email}
Telefon: ${value(contact.phone, "Neuveden")}
Místo realizace: ${value(contact.locality)}

Typ rekonstrukce: ${contact.service}


────────────────────────────
NEMOVITOST
────────────────────────────

Typ nemovitosti: ${value(contact.propertyType)}
Dispozice: ${value(contact.disposition)}
Celková podlahová plocha: ${area(contact.totalFloorArea)}
Počet místností: ${value(contact.roomCount)}

Rozložení místností:
${value(contact.roomLayout)}


────────────────────────────
KOUPELNA A WC
────────────────────────────

Velikost koupelny: ${area(contact.bathroomArea)}
Velikost WC: ${area(contact.toiletArea)}
Uspořádání koupelny a WC: ${value(contact.bathroomLayout)}
Požadavky na koupelnu: ${value(contact.bathroomRequirement)}


────────────────────────────
SOUČASNÝ STAV
────────────────────────────

Stav nemovitosti: ${value(contact.propertyCondition)}
Patro: ${value(contact.floor)}
Výtah: ${value(contact.elevator)}
Prostor bude během rekonstrukce obývaný: ${value(contact.occupiedDuringRenovation)}


────────────────────────────
ROZSAH REKONSTRUKCE
────────────────────────────

Co má rekonstrukce zahrnovat:
${value(contact.reconstructionScope)}

Požadované změny dispozice:
${value(contact.layoutChanges)}


────────────────────────────
TECHNICKÉ INFORMACE
────────────────────────────

Elektroinstalace: ${value(contact.electrical)}
Voda a odpady: ${value(contact.plumbing)}
Podlahy: ${value(contact.floorCondition)}
Výška stropu: ${meters(contact.ceilingHeight)}


────────────────────────────
TERMÍN A ROZPOČET
────────────────────────────

Předpokládaný termín: ${value(contact.preferredTerm)}
Orientační rozpočet: ${value(contact.budget)}


────────────────────────────
DOKUMENTACE A PŘÍPRAVA
────────────────────────────

Půdorys / projekt / fotografie: ${value(contact.documentation)}
Stav nemovitosti při zahájení: ${value(contact.sitePreparation)}


────────────────────────────
PŘEDSTAVA ZÁKAZNÍKA
────────────────────────────

${contact.message}


────────────────────────────
DALŠÍ INFORMACE
────────────────────────────

${value(contact.additionalInfo)}


────────────────────────────

Odpovědí na tento e-mail kontaktujete přímo zájemce.

WOHAKO Rekonstrukce
`.trim();
	const escapeHtml = (input) => input.replace(/[&<>"']/g, (character) => ({
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		"\"": "&quot;",
		"'": "&#39;"
	})[character]);
	const row = (label, content) => `
    <tr>
      <td
        style="
          padding:8px 16px 8px 0;
          color:#777;
          vertical-align:top;
          width:210px;
        "
      >
        ${escapeHtml(label)}
      </td>

      <td
        style="
          padding:8px 0;
          color:#1c302c;
          font-weight:600;
          vertical-align:top;
        "
      >
        ${escapeHtml(content)}
      </td>
    </tr>
  `;
	const sectionTitle = (title) => `
    <h2
      style="
        font-family:Georgia,serif;
        font-size:22px;
        font-weight:normal;
        margin:36px 0 12px;
        padding-bottom:10px;
        border-bottom:1px solid #dedbd4;
        color:#1c302c;
      "
    >
      ${escapeHtml(title)}
    </h2>
  `;
	const textBlock = (title, content) => `
    <div style="margin-top:24px;">
      <p
        style="
          margin:0 0 8px;
          font-size:13px;
          text-transform:uppercase;
          letter-spacing:1px;
          color:#9c6a49;
          font-weight:bold;
        "
      >
        ${escapeHtml(title)}
      </p>

      <div
        style="
          white-space:pre-wrap;
          line-height:1.7;
          color:#1c302c;
          background:#f4f1eb;
          padding:16px 18px;
          border-radius:4px;
        "
      >
        ${escapeHtml(content || "Neuvedeno")}
      </div>
    </div>
  `;
	const html = `
    <!doctype html>
    <html lang="cs">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Nová poptávka WOHAKO</title>
      </head>

      <body
        style="
          margin:0;
          padding:0;
          background:#efede8;
          font-family:Arial,sans-serif;
          color:#1c302c;
        "
      >
        <div
          style="
            padding:32px 16px;
            background:#efede8;
          "
        >
          <div
            style="
              max-width:720px;
              margin:0 auto;
              background:#faf9f5;
              padding:40px;
              border-radius:4px;
            "
          >

            <p
              style="
                margin:0 0 16px;
                letter-spacing:3px;
                font-size:12px;
                color:#9c6a49;
                font-weight:bold;
              "
            >
              WOHAKO REKONSTRUKCE
            </p>

            <h1
              style="
                margin:0;
                font-family:Georgia,serif;
                font-size:34px;
                line-height:1.2;
                font-weight:normal;
                color:#1c302c;
              "
            >
              Nová poptávka z webu
            </h1>

            <p
              style="
                margin:12px 0 32px;
                line-height:1.6;
                color:#666;
              "
            >
              Zákazník odeslal novou nezávaznou poptávku.
            </p>


            ${sectionTitle("Kontaktní údaje")}

            <table
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="
                border-collapse:collapse;
                font-size:15px;
              "
            >
              ${row("Jméno", contact.name)}
              ${row("E-mail", contact.email)}
              ${row("Telefon", value(contact.phone, "Neuveden"))}
              ${row("Místo realizace", value(contact.locality))}
              ${row("Typ rekonstrukce", contact.service)}
            </table>


            ${sectionTitle("Nemovitost")}

            <table
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="
                border-collapse:collapse;
                font-size:15px;
              "
            >
              ${row("Typ nemovitosti", value(contact.propertyType))}
              ${row("Dispozice", value(contact.disposition))}
              ${row("Podlahová plocha", area(contact.totalFloorArea))}
              ${row("Počet místností", value(contact.roomCount))}
            </table>

            ${textBlock("Rozložení místností", contact.roomLayout)}


            ${sectionTitle("Koupelna a WC")}

            <table
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="
                border-collapse:collapse;
                font-size:15px;
              "
            >
              ${row("Velikost koupelny", area(contact.bathroomArea))}
              ${row("Velikost WC", area(contact.toiletArea))}
              ${row("Uspořádání", value(contact.bathroomLayout))}
              ${row("Požadavky", value(contact.bathroomRequirement))}
            </table>


            ${sectionTitle("Současný stav")}

            <table
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="
                border-collapse:collapse;
                font-size:15px;
              "
            >
              ${row("Stav nemovitosti", value(contact.propertyCondition))}
              ${row("Patro", value(contact.floor))}
              ${row("Výtah", value(contact.elevator))}
              ${row("Obývané během rekonstrukce", value(contact.occupiedDuringRenovation))}
            </table>


            ${sectionTitle("Rozsah rekonstrukce")}

            ${textBlock("Co má rekonstrukce zahrnovat", contact.reconstructionScope)}

            ${textBlock("Změny dispozice", contact.layoutChanges)}


            ${sectionTitle("Technické informace")}

            <table
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="
                border-collapse:collapse;
                font-size:15px;
              "
            >
              ${row("Elektroinstalace", value(contact.electrical))}
              ${row("Voda a odpady", value(contact.plumbing))}
              ${row("Podlahy", value(contact.floorCondition))}
              ${row("Výška stropu", meters(contact.ceilingHeight))}
            </table>


            ${sectionTitle("Termín a rozpočet")}

            <table
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="
                border-collapse:collapse;
                font-size:15px;
              "
            >
              ${row("Předpokládaný termín", value(contact.preferredTerm))}

              ${row("Orientační rozpočet", value(contact.budget))}
            </table>


            ${sectionTitle("Dokumentace a příprava")}

            <table
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="
                border-collapse:collapse;
                font-size:15px;
              "
            >
              ${row("Půdorys / projekt / fotografie", value(contact.documentation))}

              ${row("Stav při zahájení", value(contact.sitePreparation))}
            </table>


            ${sectionTitle("Představa zákazníka")}

            ${textBlock("Popis rekonstrukce", contact.message)}

            ${contact.additionalInfo ? textBlock("Další informace", contact.additionalInfo) : ""}


            <div
              style="
                margin-top:40px;
                padding-top:24px;
                border-top:1px solid #dedbd4;
                font-size:13px;
                line-height:1.6;
                color:#777;
              "
            >
              Odpovědí na tento e-mail kontaktujete přímo zájemce.
            </div>

          </div>
        </div>
      </body>
    </html>
  `;
	return {
		subject: `Poptávka WOHAKO — ${contact.service}`,
		text,
		html
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