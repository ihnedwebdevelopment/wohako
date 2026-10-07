import { d as escape_html, l as attr, o as head } from "../../../chunks/server.js";
import { n as site } from "../../../chunks/site.js";
//#region src/lib/components/ContactForm.svelte
function ContactForm($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push(`<section class="section inquiry-section" id="poptavka" aria-labelledby="inquiry-title"><div class="inquiry-intro"><p class="eyebrow">NEZÁVAZNÁ POPTÁVKA</p><h2 id="inquiry-title">Začíná to<br/><em>vaší představou.</em></h2><p>Napište nám pár řádků o prostoru, který chcete proměnit. Společně probereme možnosti a další postup.</p><div class="inquiry-note"><span aria-hidden="true">↗</span><p>Raději si zavoláte?<br/><a href="tel:+420734155310">734 155 310</a></p></div><p class="inquiry-attachments">Fotografie a půdorysy nám můžete poslat přímo na <a href="mailto:wohako@email.cz">wohako@email.cz</a>.</p></div> <form class="inquiry-form"${attr("aria-busy", false)}><fieldset${attr("disabled", false, true)}><legend class="sr-only">Vaše kontaktní údaje a představa rekonstrukce</legend> <div class="form-grid"><label>Vaše jméno <span>*</span><input name="name" autocomplete="name" required="" minlength="2" maxlength="100" placeholder="Jméno a příjmení"/></label> <label>E-mail <span>*</span><input name="email" type="email" autocomplete="email" required="" maxlength="254" placeholder="vas@email.cz"/></label> <label>Telefon <small>nepovinné</small><input name="phone" type="tel" autocomplete="tel" maxlength="40" placeholder="+420"/></label> <label>Místo realizace <small>nepovinné</small><input name="locality" autocomplete="address-level2" maxlength="150" placeholder="Město nebo městská část"/></label> <label class="form-wide">Co si přejete proměnit? <span>*</span><select name="service" required="">`);
		$$renderer.option({
			value: "",
			disabled: true,
			selected: true
		}, ($$renderer) => {
			$$renderer.push(`Vyberte typ rekonstrukce`);
		});
		$$renderer.option({}, ($$renderer) => {
			$$renderer.push(`Koupelna a WC`);
		});
		$$renderer.option({}, ($$renderer) => {
			$$renderer.push(`Kuchyně`);
		});
		$$renderer.option({}, ($$renderer) => {
			$$renderer.push(`Kompletní interiér`);
		});
		$$renderer.option({}, ($$renderer) => {
			$$renderer.push(`Podkroví`);
		});
		$$renderer.option({}, ($$renderer) => {
			$$renderer.push(`Jiná poptávka`);
		});
		$$renderer.push(`</select></label> <label class="form-wide">Vaše představa <span>*</span><textarea name="message" rows="5" required="" minlength="20" maxlength="5000" placeholder="Co byste chtěli změnit? Připište přibližné rozměry nebo preferovaný termín, pokud je už znáte."></textarea><small>Alespoň 20 znaků. Nemusíte mít vše promyšlené.</small></label></div> <div class="form-trap" aria-hidden="true"><label>Webová stránka<input name="website" tabindex="-1" autocomplete="off"/></label></div> <div class="form-submit"><p>Údaje použijeme k vyřízení vaší poptávky.<br/>Povinná pole jsou označená hvězdičkou.</p><button class="button dark" type="submit">${escape_html("Odeslat poptávku")}<span aria-hidden="true">↗</span></button></div></fieldset> <div aria-live="polite" aria-atomic="true">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> <noscript><p>Pro odeslání formuláře zapněte JavaScript nebo napište přímo na <a href="mailto:wohako@email.cz">wohako@email.cz</a>.</p></noscript></form></section>`);
	});
}
//#endregion
//#region src/routes/kontakt/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		head("wkxllv", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Kontakt | WOHAKO rekonstrukce</title>`);
			});
			$$renderer.push(`<meta name="description" content="Kontaktujte WOHAKO rekonstrukce. Praha a okolí. E-mail wohako@email.cz, telefon 734 155 310."/>`);
		});
		$$renderer.push(`<main><section class="contact-hero"><div class="contact-copy"><p class="eyebrow">POJĎME TO PROBRAT</p><h1>Váš prostor.<br/><em>Nový začátek.</em></h1><p>Máte představu o proměně koupelny, kuchyně nebo interiéru? Ozvěte se nám a napište, co byste chtěli změnit.</p><a class="button dark contact-form-link" href="#poptavka">Nezávazně poptat rekonstrukci <span aria-hidden="true">↗</span></a><a class="contact-email"${attr("href", `mailto:${site.email}?subject=${encodeURIComponent("Poptávka rekonstrukce — WOHAKO")}`)}>${escape_html(site.email)}<span aria-hidden="true">↗</span></a><div class="contact-methods"><div><span>TELEFON</span><a${attr("href", `tel:${site.phoneHref}`)}>${escape_html(site.phoneDisplay)}</a></div><div><span>PŮSOBNOST</span><strong>${escape_html(site.area)}</strong></div></div></div><div class="contact-image"><img src="/assets/koupelna-walkin-po.webp" alt="Světlá dokončená koupelna" fetchpriority="high"/></div></section> `);
		ContactForm($$renderer, {});
		$$renderer.push(`<!----> <section class="section contact-prep"><div><p class="eyebrow">CO NÁM POSLAT</p><h2>Stačí pár věcí,<br/>abychom mohli začít.</h2></div><ul><li>Co chcete rekonstruovat a kde se prostor nachází</li><li>Fotografie současného stavu</li><li>Přibližné rozměry nebo půdorys, pokud je máte</li><li>Vaši představu o výsledku a časovém rámci</li></ul></section> <section class="contact-final"><p>Nevíte ještě přesně, jak má výsledek vypadat?</p><h2>To vůbec nevadí.<br/>Začneme rozhovorem.</h2><a class="button dark"${attr("href", `mailto:${site.email}`)}>Napsat e-mail <span aria-hidden="true">↗</span></a></section></main>`);
	});
}
//#endregion
export { _page as default };

//# sourceMappingURL=_page.svelte.js.map