# WOHAKO rekonstrukce: web s administrací

Web je postavený na **Svelte 5, SvelteKit 3 a TypeScriptu** a běží na Vercelu. Obsah je uložený v **MongoDB Atlas**: texty, kontakty, fotky i realizace. Majitel webu ho upravuje sám v administraci na adrese **`/administrator`**.

## Stránky

| Adresa | Obsah |
| --- | --- |
| `/` | Úvod: hlavní fotka, služby, vybrané realizace, galerie, 3D studio a postup |
| `/sluzby` | Tři služby s fotkami a body |
| `/realizace`, `/realizace/<adresa>` | Přehled realizací a jejich detail s fotkami (lightbox) |
| `/galerie` | Všechny fotky označené „Zobrazit v galerii“, s filtrem podle kategorie |
| `/3d` | Interaktivní 3D studie (Three.js). Nezávisí na fotkách v administraci. |
| `/pristup` | Náš přístup, citát, kroky spolupráce |
| `/kontakt` | Kontakty a poptávkový formulář (Resend) |
| `/administrator` | Administrace (přihlášení heslem) |

## Administrace (`/administrator`)

- **Texty a kontakty:** všechny nadpisy a texty na webu, telefon, e-mail, oblast působení, IČO a sídlo. Volí se tu i hlavní fotky jednotlivých stránek a fotky služeb. Na e-mail uvedený v kontaktech chodí poptávky z formuláře.
- **Fotky:** nahrávání přetažením nebo tlačítkem. Funguje i z mobilu. Prohlížeč fotku před odesláním zmenší na max. 2400 px a převede do WebP. Dále se tu upravuje popis, kategorie, zobrazení v galerii a pořadí (↑ ↓) a fotky se tu mažou. U každé fotky je vidět, kde je na webu použitá.
- **Realizace:** přidání, úprava, skrytí a zveřejnění, pořadí a smazání. První vybraná fotka je titulní.

Změny se na webu projeví do několika vteřin. Stránky mají na CDN cache jen 10 s.

Přihlášení je chráněné heslem z proměnné `ADMIN_PASSWORD`. Po 8 chybných pokusech se přihlašování na 15 minut zablokuje. Přihlášení vydrží 7 dní. Změnou hesla se odhlásí všechna zařízení.

## Jak je to uložené

- **MongoDB**, databáze `wohako` (nebo hodnota `MONGODB_DB`):
  - `settings`: dokument `content` obsahuje všechny texty, dokument `seed` označuje, že proběhlo první naplnění.
  - `photos`: seznam fotek (popis, kategorie, pořadí, rozměry, adresa souboru).
  - `projects`: realizace.
  - `media.files` / `media.chunks` (GridFS): soubory fotek nahraných v administraci. Web je vydává na `/media/<id>` s dlouhou cache.
- Výchozí obsah je v `src/lib/content/defaults.ts`. Při prvním spuštění se do databáze zapíše 7 dodaných fotek (`static/assets/foto/`) a 2 realizace. Když databáze není dostupná, web zobrazí právě tento výchozí obsah, takže nikdy nespadne.
- Free tier MongoDB Atlas má 512 MB. Jedna fotka zabere přibližně 0,3–1 MB, vejde se tedy několik set fotek.

## Nastavení (proměnné prostředí)

Lokálně patří do `.env.local`, ten se do Gitu nenahrává. Na Vercelu se nastavují v **Project → Settings → Environment Variables** pro Production i Preview. Po změně je potřeba projekt znovu nasadit.

| Proměnná | K čemu |
| --- | --- |
| `MONGODB_URI` | Připojení k MongoDB Atlas |
| `MONGODB_DB` | Název databáze, výchozí `wohako` |
| `ADMIN_PASSWORD` | Heslo do `/administrator` |
| `ADMIN_SESSION_SECRET` | Dlouhý náhodný řetězec pro podpis přihlášení (volitelné) |
| `RESEND_API_KEY`, `RESEND_FROM_EMAIL` | Odesílání poptávek z formuláře |

**MongoDB Atlas → Network Access:** Vercel nemá pevné IP adresy, proto je potřeba povolit přístup z `0.0.0.0/0` (Allow access from anywhere). Přístup chrání jméno a heslo v `MONGODB_URI`.

## Lokální spuštění

Použijte Node.js 24 LTS (`nvm use`).

```bash
npm ci
npm run dev
```

Kontrola a sestavení:

```bash
npm run check
node --test tests/contact.test.ts
npm run build
```

## Nasazení na Vercel

### Nejrychleji: skript

Dvojklikem spusťte **`vercel-nastaveni.cmd`** v kořeni projektu. Skript:

1. Ze souboru `.secrets/env.txt` vytvoří `.env.local`. Složka `.secrets` je v `.gitignore`.
2. Spustí `npm install`.
3. Přihlásí vás k Vercelu a propojí složku s projektem (vyberete existující projekt, nebo založíte nový).
4. Nahraje proměnné prostředí do Production i Development. Prázdné hodnoty přeskočí.
5. Nasadí web na produkci (`vercel deploy --prod`).

Pokud se web na Vercel nasazuje přes GitHub, krok 5 můžete přeskočit. Po pushi se web nasadí sám a proměnné už na Vercelu budou.

### Ručně

- Framework preset nastavte na **SvelteKit** a Node.js na **24.x**. Region funkcí je `fra1` (Frankfurt), nastavuje ho `vercel.json`.
- Build command je `npm run build`, install command `npm ci`.
- Proměnné z tabulky výše vložte v Settings → Environment Variables. Celý obsah `.secrets/env.txt` se dá vložit najednou.
- `.vercelignore` zajišťuje, že se při nasazení přes CLI nenahraje `.secrets`, `.env*` ani složka `fotky`.

## Úvodní obrazovka a animace

- **Úvodní obrazovka** (`src/lib/components/Intro.svelte`, `src/lib/three/splash.ts`): 3D model koupelny se postupně „postaví“ – nejdřív dlažba, pak stěny, nakonec vybavení. Kamera se přitom pomalu otáčí. Zobrazí se jen při prvním vstupu na web v dané návštěvě, trvá zhruba 3 s a jde přeskočit tlačítkem nebo klávesou Esc. Než se načte Three.js, kreslí se obrys místnosti. Bez WebGL zůstane jen kresba.
- **Animace** (`src/lib/motion.ts` a konec `src/app.css`):
  - nadpis na úvodu vyjíždí po řádcích, hlavní fotka se odkrývá zdola,
  - sekce, karty a fotky se při posouvání postupně odkrývají,
  - hlavní fotka se jemně posouvá (paralaxa),
  - stránky na sebe plynule navazují (View Transitions),
  - hlavička se schová při posunu dolů a vrátí při posunu nahoru,
  - tlačítka mají výplň, která se při najetí vysune zespodu.
- Návštěvníci se zapnutým omezením pohybu (prefers-reduced-motion) nevidí úvodní obrazovku ani animace. Bez JavaScriptu je obsah normálně vidět.

## Kde upravovat vzhled a kód

| Soubor | Obsah |
| --- | --- |
| `src/app.css` | Vzhled webu. Barvy a písma se mění v `:root`. |
| `src/lib/admin.css` | Vzhled administrace |
| `src/routes/+layout.svelte` | Hlavička a patička |
| `src/lib/content/schema.ts` | Pole formuláře „Texty a kontakty“ |
| `src/lib/content/defaults.ts` | Výchozí obsah |
| `src/lib/server/repo.ts` | Čtení a zápis do MongoDB |
| `src/lib/server/auth.ts`, `src/hooks.server.ts` | Přihlášení a ochrana administrace |
| `src/lib/components/Viewer3D.svelte`, `src/lib/three/` | 3D studio |

Písma Inter Tight a Instrument Serif se načítají z vlastního serveru (balíčky `@fontsource`), ne z Google Fonts. Je to tak kvůli GDPR.

## Soubory, které už nejsou potřeba

Následující soubory se nepoužívají a můžete je smazat:

- `src/lib/data/projects.ts`, `src/lib/data/site.ts`, `src/lib/data/gallery.ts`
- `src/lib/components/LoadingScreen.svelte`, `ProjectGallery.svelte`, `ProjectDialog.svelte`
- staré fotky `static/assets/*.webp` a složka `static/assets/galerie/`. Nové fotky jsou v `static/assets/foto/`.
