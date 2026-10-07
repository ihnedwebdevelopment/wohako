# WOHAKO rekonstrukce — Svelte a Vercel

Vícestránkový web v **Svelte 5, SvelteKit 3 a TypeScriptu**, připravený pro Vercel. Obsahuje úvod, služby, přehled realizací, čtyři detailní stránky projektů, 3D studio, stránku o přístupu, fotogalerii všech 34 nově dodaných snímků a kontakt s funkčním formulářem. Součástí jsou fotografie před/po, tři interaktivní 3D studie, úvodní prostorová animace a mobilní navigace. Číslování sekcí a realizací není použité.

## Lokální spuštění

Použijte **Node.js 24 LTS**. Pokud používáte nvm, spusťte `nvm use`.

```bash
npm ci
npm run dev
```

Terminál vypíše adresu lokálního webu. Pro ověření a produkční náhled:

```bash
npm run check
node --test tests/contact.test.ts
npm run build
npm run preview
```

## Nasazení na Vercel přes GitHub

- Rozbalte ZIP. Obsah složky `interiery-svelte` vložte do vlastního GitHub repozitáře — `package.json` by měl být v kořeni repozitáře.
- Na [Vercelu](https://vercel.com/new) vyberte **Add New → Project** a importujte repozitář.
- Framework preset nastavte na **SvelteKit**, Node.js na **24.x**. Pokud je projekt ve vnořené složce, nastavte odpovídající **Root Directory**.
- Build command je `npm run build`, install command je `npm ci`. Výstupní adresář ponechte automatický, nepřepisujte ho na `dist`.
- Klikněte na **Deploy**. Další změny ve výchozí větvi repozitáře Vercel automaticky nasadí.

Kontaktní formulář vyžaduje dvě serverové proměnné prostředí uvedené níže. Databáze není potřeba. Součástí je `vercel.json` a oficiální `@sveltejs/adapter-vercel`. V SvelteKitu 3 se adaptér konfiguruje v `vite.config.ts`; starý `svelte.config.js` se nepoužívá.

Alternativně můžete z kořene projektu použít Vercel CLI:

```bash
npx vercel
```

Pro produkční nasazení:

```bash
npx vercel --prod
```

CLI vás vyzve k přihlášení a výběru projektu.

## Kde upravovat obsah

| Soubor | Obsah |
| --- | --- |
| `src/lib/data/site.ts` | Značka, kontakt, oblast působení a texty postupu |
| `src/lib/data/projects.ts` | Popisy realizací, fotografie a názvy 3D ukázek |
| `src/routes/+layout.svelte` | Společná navigace a patička |
| `src/routes/+page.svelte` | Úvodní stránka |
| `src/routes/sluzby/`, `src/routes/pristup/`, `src/routes/kontakt/` | Tematické podstránky |
| `src/routes/realizace/` | Přehled a detailní stránky realizací |
| `src/routes/3d/` | Samostatné 3D studio |
| `src/lib/components/ProjectGallery.svelte` | Galerie a porovnání před/po |
| `src/lib/components/Viewer3D.svelte` | Ovládací prvky 3D prohlížeče |
| `src/lib/components/LoadingScreen.svelte` | Úvodní 3D obrazovka WOHAKO |
| `src/lib/three/viewer.ts` | Kamera, osvětlení, ovládání a správa WebGL |
| `src/lib/three/models.js` | Geometrie koupelen a kuchyně |
| `src/app.css` | Barvy, typografie, rozložení a mobilní zobrazení |
| `static/assets/` | Všechny dodané fotografie převedené do WebP |
| `static/favicon.svg` | Ikona webu |

## Jak je řešené 3D

Three.js se načítá až v prohlížeči, když se návštěvník přiblíží k 3D studiu. Stránky jsou předrenderované, takže texty a fotografie jsou dostupné bez čekání na 3D knihovnu. Otáčení, zoom, půdorys, čelní pohled a varianty materiálů používají reaktivní stav Svelte.

Prohlížeč uvolňuje geometrie, materiály, renderer, posluchače událostí i pozorovatele při zániku komponenty. Mimo viditelnou oblast a v neaktivní kartě pozastavuje vykreslování. Na zařízení bez WebGL ukáže fotografii a vysvětlení. Ovládání podporuje myš, dotyk i klávesnici.

Modely zůstávají **orientačními studiemi podle fotografií**, nejsou zaměřenými stavebními modely. Pro přesnou vizualizaci je potřeba dodat rozměry nebo skutečné modely GLB/GLTF.

Kontakt: **wohako@email.cz**, **734 155 310**, **Praha a okolí**. Údaje jsou na kontaktní stránce a v patičce. Formulář posílá poptávky přes Resend. Přímé e-mailové a telefonní odkazy zůstávají dostupné.

## Kontaktní formulář a Resend

- Lokálně vytvořte `.env.local` podle `.env.example`. V dodané místní kopii je klíč již nastavený.
- `RESEND_API_KEY`: klíč Resend. Patří pouze do serverového prostředí, nikdy do `PUBLIC_`/`VITE_` proměnné ani do repozitáře.
- `RESEND_FROM_EMAIL`: `WOHAKO rekonstrukce <web@wohako.cz>`. Doména wohako.cz je ověřená v účtu Resend.
- Sestavení webu projde i bez těchto proměnných. Dokud nejsou obě nastavené, formulář vrátí srozumitelnou zprávu s přímým e-mailem; odeslání se nepotvrdí.
- Na Vercelu nastavte obě proměnné v **Project → Settings → Environment Variables** pro příslušná prostředí a znovu nasaďte projekt. Místní `.env.local` se do Gitu nenahrává.
- `POST /api/kontakt` běží jako serverová funkce. Příjemce je pevně `wohako@email.cz`; odpověď na přijatou zprávu míří na e-mail zájemce.
- Kontrola původu požadavku, limit velikosti, validace údajů, skryté pole proti robotům a limit pěti požadavků za 15 minut na IP omezují nechtěné odesílání. Limit je v paměti každé serverové instance; při velkém veřejném provozu jej doplňte centrálním limitem na hostingu.
- Opakování stejného odeslání používá stejný idempotentní klíč Resend. Při chybě zůstávají vyplněné údaje zachované; potvrzení se ukáže až po přijetí zprávy službou.
- Přílohy se formulářem neposílají. U formuláře je přímý odkaz pro zaslání fotografií e-mailem.

## Fotografie

Všech **34 JPG souborů** ze složky `fotky/` je v galerii `/galerie`. Každý má optimalizovaný WebP a samostatný menší náhled v `static/assets/galerie/`. Originály zůstávají beze změny. Galerie podporuje filtry, zvětšení, šipky a Escape; velké soubory se načítají až po otevření. Popisky a zařazení upravíte v `src/lib/data/gallery.ts`.

Fotografie podkroví jsou také na úvodní stránce a u přehledu realizací. Titulní obrázky projektů s původními nápisy jsou zachované v galerii.

## Dokumentace

- [Resend — odesílání zpráv](https://resend.com/docs/api-reference/emails/send-email)
- [SvelteKit — serverové proměnné](https://svelte.dev/docs/kit/environment-variables)
- [SvelteKit a Vercel](https://svelte.dev/docs/kit/adapter-vercel)
- [SvelteKit 3 — konfigurace projektu](https://svelte.dev/docs/kit/migrating-to-sveltekit-3)

## Ověření dodané verze

Produkční sestavení pro Vercel a `svelte-check` prošly bez chyb a varování Svelte. V prohlížeči byly zkontrolované hlavní podstránky, detail realizace, filtr projektů, mobilní rozložení i vykreslení a přepínání 3D modelů. Nová galerie byla ověřena na počítači i v šířce 390 px včetně filtrů a zvětšení. Všech 34 snímků má dostupné soubory.

Dne 7. 10. 2026 byl z formuláře odeslán jeden označený test na wohako@email.cz; Resend potvrdil stav `delivered`. Server odmítl neúplná data, spamové pole a cizí Origin. Testy validace a bezpečného sestavení e-mailu prošly. Ve veřejném produkčním výstupu není API klíč.

Tento balíček připravuje web pro vaše nasazení; neobsahuje přihlášení ani propojení s původním soukromým náhledem.
