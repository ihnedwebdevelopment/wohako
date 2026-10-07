import { d as escape_html, l as attr, o as head } from "../../../chunks/server.js";
import { n as site } from "../../../chunks/site.js";
//#region src/lib/components/ContactForm.svelte
function ContactForm($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push(`<section class="section inquiry-section" id="poptavka" aria-labelledby="inquiry-title"><div class="inquiry-intro"><p class="eyebrow">NEZÁVAZNÁ POPTÁVKA</p> <h2 id="inquiry-title">Začíná to<br/> <em>vaší představou.</em></h2> <p>Napište nám pár informací o prostoru, který chcete proměnit.
      Čím více toho budeme vědět předem, tím lépe dokážeme odhadnout
      možnosti realizace a další postup.</p> <div class="inquiry-note"><span aria-hidden="true">↗</span> <p>Raději si zavoláte?<br/> <a href="tel:+420734155310">734 155 310</a></p></div> <p class="inquiry-attachments">Fotografie, půdorysy nebo projektovou dokumentaci nám můžete poslat
      přímo na <a href="mailto:wohako@email.cz">wohako@email.cz</a>.</p></div> <form class="inquiry-form"${attr("aria-busy", false)}><fieldset${attr("disabled", false, true)}><legend class="sr-only">Kontaktní údaje a informace o plánované rekonstrukci</legend> <div class="form-grid"><label>Vaše jméno <span>*</span> <input name="name" autocomplete="name" required="" minlength="2" maxlength="100" placeholder="Jméno a příjmení"/></label> <label>E-mail <span>*</span> <input name="email" type="email" autocomplete="email" required="" maxlength="254" placeholder="vas@email.cz"/></label> <label>Telefon <small>nepovinné</small> <input name="phone" type="tel" autocomplete="tel" maxlength="40" placeholder="+420"/></label> <label>Místo realizace <small>nepovinné</small> <input name="locality" autocomplete="address-level2" maxlength="150" placeholder="Město nebo městská část"/></label> <label class="form-wide">Co si přejete proměnit? <span>*</span> <select name="service" required="">`);
		$$renderer.option({
			value: "",
			disabled: true,
			selected: true
		}, ($$renderer) => {
			$$renderer.push(`Vyberte typ rekonstrukce`);
		});
		$$renderer.option({ value: "Koupelna a WC" }, ($$renderer) => {
			$$renderer.push(`Koupelna a WC`);
		});
		$$renderer.option({ value: "Kuchyně" }, ($$renderer) => {
			$$renderer.push(`Kuchyně`);
		});
		$$renderer.option({ value: "Kompletní interiér" }, ($$renderer) => {
			$$renderer.push(`Kompletní interiér`);
		});
		$$renderer.option({ value: "Byt" }, ($$renderer) => {
			$$renderer.push(`Rekonstrukce bytu`);
		});
		$$renderer.option({ value: "Rodinný dům" }, ($$renderer) => {
			$$renderer.push(`Rekonstrukce rodinného domu`);
		});
		$$renderer.option({ value: "Podkroví" }, ($$renderer) => {
			$$renderer.push(`Podkroví`);
		});
		$$renderer.option({ value: "Nebytový prostor" }, ($$renderer) => {
			$$renderer.push(`Nebytový prostor`);
		});
		$$renderer.option({ value: "Jiná poptávka" }, ($$renderer) => {
			$$renderer.push(`Jiná poptávka`);
		});
		$$renderer.push(`</select></label> <label>Typ nemovitosti <small>nepovinné</small> <select name="propertyType">`);
		$$renderer.option({
			value: "",
			selected: true
		}, ($$renderer) => {
			$$renderer.push(`Vyberte typ nemovitosti`);
		});
		$$renderer.option({ value: "Byt v panelovém domě" }, ($$renderer) => {
			$$renderer.push(`Byt v panelovém domě`);
		});
		$$renderer.option({ value: "Byt v cihlovém domě" }, ($$renderer) => {
			$$renderer.push(`Byt v cihlovém domě`);
		});
		$$renderer.option({ value: "Rodinný dům" }, ($$renderer) => {
			$$renderer.push(`Rodinný dům`);
		});
		$$renderer.option({ value: "Novostavba" }, ($$renderer) => {
			$$renderer.push(`Novostavba`);
		});
		$$renderer.option({ value: "Historický objekt" }, ($$renderer) => {
			$$renderer.push(`Historický objekt`);
		});
		$$renderer.option({ value: "Nebytový prostor" }, ($$renderer) => {
			$$renderer.push(`Nebytový prostor`);
		});
		$$renderer.option({ value: "Jiné" }, ($$renderer) => {
			$$renderer.push(`Jiné`);
		});
		$$renderer.push(`</select></label> <label>Současná dispozice <small>nepovinné</small> <select name="disposition">`);
		$$renderer.option({
			value: "",
			selected: true
		}, ($$renderer) => {
			$$renderer.push(`Např. 3+1`);
		});
		$$renderer.option({ value: "1+kk" }, ($$renderer) => {
			$$renderer.push(`1+kk`);
		});
		$$renderer.option({ value: "1+1" }, ($$renderer) => {
			$$renderer.push(`1+1`);
		});
		$$renderer.option({ value: "2+kk" }, ($$renderer) => {
			$$renderer.push(`2+kk`);
		});
		$$renderer.option({ value: "2+1" }, ($$renderer) => {
			$$renderer.push(`2+1`);
		});
		$$renderer.option({ value: "3+kk" }, ($$renderer) => {
			$$renderer.push(`3+kk`);
		});
		$$renderer.option({ value: "3+1" }, ($$renderer) => {
			$$renderer.push(`3+1`);
		});
		$$renderer.option({ value: "4+kk" }, ($$renderer) => {
			$$renderer.push(`4+kk`);
		});
		$$renderer.option({ value: "4+1" }, ($$renderer) => {
			$$renderer.push(`4+1`);
		});
		$$renderer.option({ value: "5+kk a větší" }, ($$renderer) => {
			$$renderer.push(`5+kk a větší`);
		});
		$$renderer.option({ value: "Rodinný dům" }, ($$renderer) => {
			$$renderer.push(`Rodinný dům`);
		});
		$$renderer.option({ value: "Jiné" }, ($$renderer) => {
			$$renderer.push(`Jiné`);
		});
		$$renderer.push(`</select></label> <label>Celková podlahová plocha <small>nepovinné</small> <input name="totalFloorArea" type="number" min="1" max="5000" step="0.1" inputmode="decimal" placeholder="např. 75 m²"/></label> <label>Počet místností <small>nepovinné</small> <input name="roomCount" type="number" min="1" max="100" step="1" inputmode="numeric" placeholder="např. 4"/></label> <label class="form-wide">Rozložení místností <small>nepovinné</small> <textarea name="roomLayout" rows="3" maxlength="1500" placeholder="Např. obývací pokoj 25 m², kuchyně 10 m², ložnice 14 m², dětský pokoj 12 m², chodba 8 m²…"></textarea> <small>Stačí orientačně. Pokud máte půdorys, můžete nám ho následně poslat e-mailem.</small></label> <label>Velikost koupelny <small>nepovinné</small> <input name="bathroomArea" type="number" min="1" max="200" step="0.1" inputmode="decimal" placeholder="např. 5.5 m²"/></label> <label>Velikost WC <small>nepovinné</small> <input name="toiletArea" type="number" min="0.5" max="100" step="0.1" inputmode="decimal" placeholder="např. 1.5 m²"/></label> <label>Koupelna a WC <small>nepovinné</small> <select name="bathroomLayout">`);
		$$renderer.option({
			value: "",
			selected: true
		}, ($$renderer) => {
			$$renderer.push(`Vyberte variantu`);
		});
		$$renderer.option({ value: "Koupelna a WC zvlášť" }, ($$renderer) => {
			$$renderer.push(`Koupelna a WC zvlášť`);
		});
		$$renderer.option({ value: "Koupelna a WC společně" }, ($$renderer) => {
			$$renderer.push(`Koupelna a WC společně`);
		});
		$$renderer.option({ value: "Chci koupelnu a WC spojit" }, ($$renderer) => {
			$$renderer.push(`Chci koupelnu a WC spojit`);
		});
		$$renderer.option({ value: "Chci koupelnu a WC oddělit" }, ($$renderer) => {
			$$renderer.push(`Chci koupelnu a WC oddělit`);
		});
		$$renderer.option({ value: "Zatím nevím" }, ($$renderer) => {
			$$renderer.push(`Zatím nevím`);
		});
		$$renderer.push(`</select></label> <label>Požadavky na koupelnu <small>nepovinné</small> <select name="bathroomRequirement">`);
		$$renderer.option({
			value: "",
			selected: true
		}, ($$renderer) => {
			$$renderer.push(`Vyberte`);
		});
		$$renderer.option({ value: "Sprchový kout" }, ($$renderer) => {
			$$renderer.push(`Sprchový kout`);
		});
		$$renderer.option({ value: "Vana" }, ($$renderer) => {
			$$renderer.push(`Vana`);
		});
		$$renderer.option({ value: "Vana i sprchový kout" }, ($$renderer) => {
			$$renderer.push(`Vana i sprchový kout`);
		});
		$$renderer.option({ value: "Bezbariérové řešení" }, ($$renderer) => {
			$$renderer.push(`Bezbariérové řešení`);
		});
		$$renderer.option({ value: "Zatím nevím" }, ($$renderer) => {
			$$renderer.push(`Zatím nevím`);
		});
		$$renderer.push(`</select></label> <label>Současný stav prostoru <small>nepovinné</small> <select name="propertyCondition">`);
		$$renderer.option({
			value: "",
			selected: true
		}, ($$renderer) => {
			$$renderer.push(`Vyberte současný stav`);
		});
		$$renderer.option({ value: "Původní stav" }, ($$renderer) => {
			$$renderer.push(`Původní stav`);
		});
		$$renderer.option({ value: "Částečně rekonstruováno" }, ($$renderer) => {
			$$renderer.push(`Částečně rekonstruováno`);
		});
		$$renderer.option({ value: "Po starší rekonstrukci" }, ($$renderer) => {
			$$renderer.push(`Po starší rekonstrukci`);
		});
		$$renderer.option({ value: "Novostavba před dokončením" }, ($$renderer) => {
			$$renderer.push(`Novostavba před dokončením`);
		});
		$$renderer.option({ value: "Hrubá stavba" }, ($$renderer) => {
			$$renderer.push(`Hrubá stavba`);
		});
		$$renderer.option({ value: "Jiné" }, ($$renderer) => {
			$$renderer.push(`Jiné`);
		});
		$$renderer.push(`</select></label> <label>Patro <small>nepovinné</small> <input name="floor" maxlength="30" placeholder="např. 3. patro"/></label> <label>Výtah <small>nepovinné</small> <select name="elevator">`);
		$$renderer.option({
			value: "",
			selected: true
		}, ($$renderer) => {
			$$renderer.push(`Vyberte`);
		});
		$$renderer.option({ value: "Ano" }, ($$renderer) => {
			$$renderer.push(`Ano`);
		});
		$$renderer.option({ value: "Ne" }, ($$renderer) => {
			$$renderer.push(`Ne`);
		});
		$$renderer.option({ value: "Nevím / netýká se" }, ($$renderer) => {
			$$renderer.push(`Nevím / netýká se`);
		});
		$$renderer.push(`</select></label> <label>Bude prostor během rekonstrukce obývaný? <small>nepovinné</small> <select name="occupiedDuringRenovation">`);
		$$renderer.option({
			value: "",
			selected: true
		}, ($$renderer) => {
			$$renderer.push(`Vyberte`);
		});
		$$renderer.option({ value: "Ano" }, ($$renderer) => {
			$$renderer.push(`Ano`);
		});
		$$renderer.option({ value: "Ne" }, ($$renderer) => {
			$$renderer.push(`Ne`);
		});
		$$renderer.option({ value: "Částečně" }, ($$renderer) => {
			$$renderer.push(`Částečně`);
		});
		$$renderer.option({ value: "Zatím nevím" }, ($$renderer) => {
			$$renderer.push(`Zatím nevím`);
		});
		$$renderer.push(`</select></label> <label class="form-wide">Co všechno by měla rekonstrukce zahrnovat? <small>nepovinné</small> <textarea name="reconstructionScope" rows="4" maxlength="2500" placeholder="Např. bourací práce, nové příčky, elektroinstalace, voda a odpady, podlahy, obklady, sádrokarton, malování, kuchyň, koupelna, dveře…"></textarea></label> <label class="form-wide">Chcete měnit dispozici? <small>nepovinné</small> <textarea name="layoutChanges" rows="3" maxlength="1500" placeholder="Např. propojit kuchyň s obývacím pokojem, posunout příčku, zvětšit koupelnu, přesunout dveře…"></textarea></label> <label>Elektroinstalace <small>nepovinné</small> <select name="electrical">`);
		$$renderer.option({
			value: "",
			selected: true
		}, ($$renderer) => {
			$$renderer.push(`Vyberte`);
		});
		$$renderer.option({ value: "Původní – bude potřeba nová" }, ($$renderer) => {
			$$renderer.push(`Původní – bude potřeba nová`);
		});
		$$renderer.option({ value: "Částečně nová" }, ($$renderer) => {
			$$renderer.push(`Částečně nová`);
		});
		$$renderer.option({ value: "Nová" }, ($$renderer) => {
			$$renderer.push(`Nová`);
		});
		$$renderer.option({ value: "Nevím" }, ($$renderer) => {
			$$renderer.push(`Nevím`);
		});
		$$renderer.push(`</select></label> <label>Voda a odpady <small>nepovinné</small> <select name="plumbing">`);
		$$renderer.option({
			value: "",
			selected: true
		}, ($$renderer) => {
			$$renderer.push(`Vyberte`);
		});
		$$renderer.option({ value: "Původní" }, ($$renderer) => {
			$$renderer.push(`Původní`);
		});
		$$renderer.option({ value: "Částečně nové" }, ($$renderer) => {
			$$renderer.push(`Částečně nové`);
		});
		$$renderer.option({ value: "Nové" }, ($$renderer) => {
			$$renderer.push(`Nové`);
		});
		$$renderer.option({ value: "Nevím" }, ($$renderer) => {
			$$renderer.push(`Nevím`);
		});
		$$renderer.push(`</select></label> <label>Stav podlah <small>nepovinné</small> <select name="floorCondition">`);
		$$renderer.option({
			value: "",
			selected: true
		}, ($$renderer) => {
			$$renderer.push(`Vyberte`);
		});
		$$renderer.option({ value: "Kompletní výměna" }, ($$renderer) => {
			$$renderer.push(`Počítáme s kompletní výměnou`);
		});
		$$renderer.option({ value: "Částečná výměna" }, ($$renderer) => {
			$$renderer.push(`Pouze částečná výměna`);
		});
		$$renderer.option({ value: "Podlahy chceme zachovat" }, ($$renderer) => {
			$$renderer.push(`Podlahy chceme zachovat`);
		});
		$$renderer.option({ value: "Nevím" }, ($$renderer) => {
			$$renderer.push(`Nevím`);
		});
		$$renderer.push(`</select></label> <label>Přibližná výška stropu <small>nepovinné</small> <input name="ceilingHeight" type="number" min="1.5" max="10" step="0.01" inputmode="decimal" placeholder="např. 2.6 m"/></label> <label>Předpokládaný termín realizace <small>nepovinné</small> <select name="preferredTerm">`);
		$$renderer.option({
			value: "",
			selected: true
		}, ($$renderer) => {
			$$renderer.push(`Vyberte orientační termín`);
		});
		$$renderer.option({ value: "Co nejdříve" }, ($$renderer) => {
			$$renderer.push(`Co nejdříve`);
		});
		$$renderer.option({ value: "Do 1–3 měsíců" }, ($$renderer) => {
			$$renderer.push(`Do 1–3 měsíců`);
		});
		$$renderer.option({ value: "Do 3–6 měsíců" }, ($$renderer) => {
			$$renderer.push(`Do 3–6 měsíců`);
		});
		$$renderer.option({ value: "Do 6–12 měsíců" }, ($$renderer) => {
			$$renderer.push(`Do 6–12 měsíců`);
		});
		$$renderer.option({ value: "Za více než rok" }, ($$renderer) => {
			$$renderer.push(`Za více než rok`);
		});
		$$renderer.option({ value: "Zatím nevím" }, ($$renderer) => {
			$$renderer.push(`Zatím nevím`);
		});
		$$renderer.push(`</select></label> <label>Orientační rozpočet <small>nepovinné</small> <select name="budget">`);
		$$renderer.option({
			value: "",
			selected: true
		}, ($$renderer) => {
			$$renderer.push(`Vyberte orientační rozpočet`);
		});
		$$renderer.option({ value: "Do 150 000 Kč" }, ($$renderer) => {
			$$renderer.push(`Do 150 000 Kč`);
		});
		$$renderer.option({ value: "150 000–300 000 Kč" }, ($$renderer) => {
			$$renderer.push(`150 000–300 000 Kč`);
		});
		$$renderer.option({ value: "300 000–500 000 Kč" }, ($$renderer) => {
			$$renderer.push(`300 000–500 000 Kč`);
		});
		$$renderer.option({ value: "500 000–800 000 Kč" }, ($$renderer) => {
			$$renderer.push(`500 000–800 000 Kč`);
		});
		$$renderer.option({ value: "800 000–1 200 000 Kč" }, ($$renderer) => {
			$$renderer.push(`800 000–1 200 000 Kč`);
		});
		$$renderer.option({ value: "1 200 000 Kč a více" }, ($$renderer) => {
			$$renderer.push(`1 200 000 Kč a více`);
		});
		$$renderer.option({ value: "Rozpočet zatím nemám" }, ($$renderer) => {
			$$renderer.push(`Rozpočet zatím nemám`);
		});
		$$renderer.push(`</select></label> <label>Máte půdorys nebo projekt? <small>nepovinné</small> <select name="documentation">`);
		$$renderer.option({
			value: "",
			selected: true
		}, ($$renderer) => {
			$$renderer.push(`Vyberte`);
		});
		$$renderer.option({ value: "Ano – mám půdorys" }, ($$renderer) => {
			$$renderer.push(`Ano – mám půdorys`);
		});
		$$renderer.option({ value: "Ano – mám projektovou dokumentaci" }, ($$renderer) => {
			$$renderer.push(`Ano – mám projektovou dokumentaci`);
		});
		$$renderer.option({ value: "Mám pouze fotografie" }, ($$renderer) => {
			$$renderer.push(`Mám pouze fotografie`);
		});
		$$renderer.option({ value: "Ne" }, ($$renderer) => {
			$$renderer.push(`Ne`);
		});
		$$renderer.push(`</select></label> <label>Stav nemovitosti při zahájení <small>nepovinné</small> <select name="sitePreparation">`);
		$$renderer.option({
			value: "",
			selected: true
		}, ($$renderer) => {
			$$renderer.push(`Vyberte`);
		});
		$$renderer.option({ value: "Vybavená a obývaná" }, ($$renderer) => {
			$$renderer.push(`Vybavená a obývaná`);
		});
		$$renderer.option({ value: "Částečně vyklizená" }, ($$renderer) => {
			$$renderer.push(`Částečně vyklizená`);
		});
		$$renderer.option({ value: "Kompletně vyklizená" }, ($$renderer) => {
			$$renderer.push(`Kompletně vyklizená`);
		});
		$$renderer.option({ value: "Po bouracích pracích" }, ($$renderer) => {
			$$renderer.push(`Po bouracích pracích`);
		});
		$$renderer.option({ value: "Nevím" }, ($$renderer) => {
			$$renderer.push(`Zatím nevím`);
		});
		$$renderer.push(`</select></label> <label class="form-wide">Vaše představa <span>*</span> <textarea name="message" rows="6" required="" minlength="20" maxlength="5000" placeholder="Popište nám svou představu. Co chcete změnit, co vám na současném prostoru nevyhovuje a jak by měl výsledek ideálně vypadat?"></textarea> <small>Alespoň 20 znaků. Nemusíte mít vše promyšlené – od toho jsme tu my.</small></label> <label class="form-wide">Je ještě něco, co bychom měli vědět? <small>nepovinné</small> <textarea name="additionalInfo" rows="3" maxlength="2500" placeholder="Např. omezení domu nebo SVJ, parkování, přístup do objektu, specifické materiály, požadavky na hlučnost nebo jiné důležité informace."></textarea></label></div> <div class="form-trap" aria-hidden="true"><label>Webová stránka <input name="website" tabindex="-1" autocomplete="off"/></label></div> <div class="form-submit"><p>Údaje použijeme pouze k vyřízení vaší poptávky.<br/> Povinná pole jsou označená hvězdičkou.</p> <button class="button dark" type="submit">${escape_html("Odeslat poptávku")} <span aria-hidden="true">↗</span></button></div></fieldset> <div aria-live="polite" aria-atomic="true">`);
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