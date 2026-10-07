export const services = [
  'Koupelna a WC',
  'Kuchyně',
  'Kompletní interiér',
  'Byt',
  'Rodinný dům',
  'Podkroví',
  'Nebytový prostor',
  'Jiná poptávka'
] as const;

export const propertyTypes = [
  'Byt v panelovém domě',
  'Byt v cihlovém domě',
  'Rodinný dům',
  'Novostavba',
  'Historický objekt',
  'Nebytový prostor',
  'Jiné'
] as const;

export const dispositions = [
  '1+kk',
  '1+1',
  '2+kk',
  '2+1',
  '3+kk',
  '3+1',
  '4+kk',
  '4+1',
  '5+kk a větší',
  'Rodinný dům',
  'Jiné'
] as const;

export const bathroomLayouts = [
  'Koupelna a WC zvlášť',
  'Koupelna a WC společně',
  'Chci koupelnu a WC spojit',
  'Chci koupelnu a WC oddělit',
  'Zatím nevím'
] as const;

export const bathroomRequirements = [
  'Sprchový kout',
  'Vana',
  'Vana i sprchový kout',
  'Bezbariérové řešení',
  'Zatím nevím'
] as const;

export const propertyConditions = [
  'Původní stav',
  'Částečně rekonstruováno',
  'Po starší rekonstrukci',
  'Novostavba před dokončením',
  'Hrubá stavba',
  'Jiné'
] as const;

export const elevators = [
  'Ano',
  'Ne',
  'Nevím / netýká se'
] as const;

export const occupiedOptions = [
  'Ano',
  'Ne',
  'Částečně',
  'Zatím nevím'
] as const;

export const electricalOptions = [
  'Původní – bude potřeba nová',
  'Částečně nová',
  'Nová',
  'Nevím'
] as const;

export const plumbingOptions = [
  'Původní',
  'Částečně nové',
  'Nové',
  'Nevím'
] as const;

export const floorConditionOptions = [
  'Kompletní výměna',
  'Částečná výměna',
  'Podlahy chceme zachovat',
  'Nevím'
] as const;

export const preferredTerms = [
  'Co nejdříve',
  'Do 1–3 měsíců',
  'Do 3–6 měsíců',
  'Do 6–12 měsíců',
  'Za více než rok',
  'Zatím nevím'
] as const;

export const budgets = [
  'Do 150 000 Kč',
  '150 000–300 000 Kč',
  '300 000–500 000 Kč',
  '500 000–800 000 Kč',
  '800 000–1 200 000 Kč',
  '1 200 000 Kč a více',
  'Rozpočet zatím nemám'
] as const;

export const documentationOptions = [
  'Ano – mám půdorys',
  'Ano – mám projektovou dokumentaci',
  'Mám pouze fotografie',
  'Ne'
] as const;

export const sitePreparationOptions = [
  'Vybavená a obývaná',
  'Částečně vyklizená',
  'Kompletně vyklizená',
  'Po bouracích pracích',
  'Nevím'
] as const;


export interface Contact {
  // Kontaktní údaje
  name: string;
  email: string;
  phone: string;
  locality: string;

  // Typ poptávky
  service: string;

  // Nemovitost
  propertyType: string;
  disposition: string;
  totalFloorArea: string;
  roomCount: string;
  roomLayout: string;

  // Koupelna / WC
  bathroomArea: string;
  toiletArea: string;
  bathroomLayout: string;
  bathroomRequirement: string;

  // Stav nemovitosti
  propertyCondition: string;
  floor: string;
  elevator: string;
  occupiedDuringRenovation: string;

  // Rozsah rekonstrukce
  reconstructionScope: string;
  layoutChanges: string;

  // Technické informace
  electrical: string;
  plumbing: string;
  floorCondition: string;
  ceilingHeight: string;

  // Termín a rozpočet
  preferredTerm: string;
  budget: string;

  // Dokumentace a příprava
  documentation: string;
  sitePreparation: string;

  // Popis
  message: string;
  additionalInfo: string;
}


const fields = [
  'name',
  'email',
  'phone',
  'locality',

  'service',

  'propertyType',
  'disposition',
  'totalFloorArea',
  'roomCount',
  'roomLayout',

  'bathroomArea',
  'toiletArea',
  'bathroomLayout',
  'bathroomRequirement',

  'propertyCondition',
  'floor',
  'elevator',
  'occupiedDuringRenovation',

  'reconstructionScope',
  'layoutChanges',

  'electrical',
  'plumbing',
  'floorCondition',
  'ceilingHeight',

  'preferredTerm',
  'budget',

  'documentation',
  'sitePreparation',

  'message',
  'additionalInfo'
] as const;


function isAllowed(
  value: string,
  options: readonly string[]
): boolean {
  return value === '' || options.includes(value);
}


function validateOptionalNumber(
  value: string,
  min: number,
  max: number
): boolean {
  if (!value) return true;

  const number = Number(value);

  return (
    Number.isFinite(number) &&
    number >= min &&
    number <= max
  );
}


function hasNewLine(value: string): boolean {
  return /[\r\n]/.test(value);
}


export function validateContact(
  value: unknown
): { contact?: Contact; error?: string } {
  if (
    !value ||
    typeof value !== 'object' ||
    Array.isArray(value)
  ) {
    return {
      error: 'Vyplňte prosím poptávkový formulář.'
    };
  }

  const raw = value as Record<string, unknown>;


  // Honeypot proti botům
  if (raw.website) {
    return {
      error: 'Poptávku se nepodařilo odeslat.'
    };
  }


  // Všechna očekávaná pole musí být řetězce.
  // Prázdná nepovinná pole jsou v pořádku.
  if (
    fields.some(
      (field) =>
        raw[field] !== undefined &&
        typeof raw[field] !== 'string'
    )
  ) {
    return {
      error: 'Zkontrolujte prosím vyplněné údaje.'
    };
  }


  // Převedeme všechna pole na string a odstraníme mezery.
  const contact = Object.fromEntries(
    fields.map((field) => [
      field,
      typeof raw[field] === 'string'
        ? raw[field].trim()
        : ''
    ])
  ) as unknown as Contact;


  // ---------------------------------------
  // KONTAKTNÍ ÚDAJE
  // ---------------------------------------

  if (
    contact.name.length < 2 ||
    contact.name.length > 100 ||
    hasNewLine(contact.name)
  ) {
    return {
      error: 'Jméno musí mít 2 až 100 znaků.'
    };
  }


  if (
    contact.email.length > 254 ||
    !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(contact.email)
  ) {
    return {
      error:
        'Zadejte platný e-mail, na který vám můžeme odpovědět.'
    };
  }


  if (
    contact.phone.length > 40 ||
    (
      contact.phone &&
      !/^[+\d\s()\-]{6,40}$/.test(contact.phone)
    )
  ) {
    return {
      error:
        'Zkontrolujte prosím telefonní číslo nebo jej nechte prázdné.'
    };
  }


  if (
    contact.locality.length > 150 ||
    hasNewLine(contact.locality)
  ) {
    return {
      error:
        'Místo realizace může mít nejvýše 150 znaků.'
    };
  }


  // ---------------------------------------
  // TYP REKONSTRUKCE
  // ---------------------------------------

  if (!services.includes(contact.service as (typeof services)[number])) {
    return {
      error:
        'Vyberte prosím, co chcete rekonstruovat.'
    };
  }


  // ---------------------------------------
  // NEMOVITOST
  // ---------------------------------------

  if (!isAllowed(contact.propertyType, propertyTypes)) {
    return {
      error: 'Vyberte platný typ nemovitosti.'
    };
  }


  if (!isAllowed(contact.disposition, dispositions)) {
    return {
      error: 'Vyberte platnou dispozici nemovitosti.'
    };
  }


  if (
    !validateOptionalNumber(
      contact.totalFloorArea,
      1,
      5000
    )
  ) {
    return {
      error:
        'Celková podlahová plocha musí být mezi 1 a 5 000 m².'
    };
  }


  if (
    contact.roomCount &&
    (
      !Number.isInteger(Number(contact.roomCount)) ||
      Number(contact.roomCount) < 1 ||
      Number(contact.roomCount) > 100
    )
  ) {
    return {
      error:
        'Počet místností musí být číslo mezi 1 a 100.'
    };
  }


  if (contact.roomLayout.length > 1500) {
    return {
      error:
        'Popis rozložení místností může mít nejvýše 1 500 znaků.'
    };
  }


  // ---------------------------------------
  // KOUPELNA A WC
  // ---------------------------------------

  if (
    !validateOptionalNumber(
      contact.bathroomArea,
      1,
      200
    )
  ) {
    return {
      error:
        'Velikost koupelny musí být mezi 1 a 200 m².'
    };
  }


  if (
    !validateOptionalNumber(
      contact.toiletArea,
      0.5,
      100
    )
  ) {
    return {
      error:
        'Velikost WC musí být mezi 0,5 a 100 m².'
    };
  }


  if (
    !isAllowed(
      contact.bathroomLayout,
      bathroomLayouts
    )
  ) {
    return {
      error:
        'Vyberte platné uspořádání koupelny a WC.'
    };
  }


  if (
    !isAllowed(
      contact.bathroomRequirement,
      bathroomRequirements
    )
  ) {
    return {
      error:
        'Vyberte platný požadavek na koupelnu.'
    };
  }


  // ---------------------------------------
  // STAV NEMOVITOSTI
  // ---------------------------------------

  if (
    !isAllowed(
      contact.propertyCondition,
      propertyConditions
    )
  ) {
    return {
      error:
        'Vyberte platný stav nemovitosti.'
    };
  }


  if (
    contact.floor.length > 30 ||
    hasNewLine(contact.floor)
  ) {
    return {
      error:
        'Údaj o patře může mít nejvýše 30 znaků.'
    };
  }


  if (!isAllowed(contact.elevator, elevators)) {
    return {
      error:
        'Vyberte platný údaj o výtahu.'
    };
  }


  if (
    !isAllowed(
      contact.occupiedDuringRenovation,
      occupiedOptions
    )
  ) {
    return {
      error:
        'Vyberte platný údaj o užívání prostoru během rekonstrukce.'
    };
  }


  // ---------------------------------------
  // ROZSAH REKONSTRUKCE
  // ---------------------------------------

  if (contact.reconstructionScope.length > 2500) {
    return {
      error:
        'Popis rozsahu rekonstrukce může mít nejvýše 2 500 znaků.'
    };
  }


  if (contact.layoutChanges.length > 1500) {
    return {
      error:
        'Popis změn dispozice může mít nejvýše 1 500 znaků.'
    };
  }


  // ---------------------------------------
  // TECHNICKÉ INFORMACE
  // ---------------------------------------

  if (
    !isAllowed(
      contact.electrical,
      electricalOptions
    )
  ) {
    return {
      error:
        'Vyberte platný stav elektroinstalace.'
    };
  }


  if (
    !isAllowed(
      contact.plumbing,
      plumbingOptions
    )
  ) {
    return {
      error:
        'Vyberte platný stav vody a odpadů.'
    };
  }


  if (
    !isAllowed(
      contact.floorCondition,
      floorConditionOptions
    )
  ) {
    return {
      error:
        'Vyberte platný stav podlah.'
    };
  }


  if (
    !validateOptionalNumber(
      contact.ceilingHeight,
      1.5,
      10
    )
  ) {
    return {
      error:
        'Výška stropu musí být mezi 1,5 a 10 metry.'
    };
  }


  // ---------------------------------------
  // TERMÍN A ROZPOČET
  // ---------------------------------------

  if (
    !isAllowed(
      contact.preferredTerm,
      preferredTerms
    )
  ) {
    return {
      error:
        'Vyberte platný předpokládaný termín realizace.'
    };
  }


  if (
    !isAllowed(
      contact.budget,
      budgets
    )
  ) {
    return {
      error:
        'Vyberte platný orientační rozpočet.'
    };
  }


  // ---------------------------------------
  // DOKUMENTACE
  // ---------------------------------------

  if (
    !isAllowed(
      contact.documentation,
      documentationOptions
    )
  ) {
    return {
      error:
        'Vyberte platný údaj o projektové dokumentaci.'
    };
  }


  if (
    !isAllowed(
      contact.sitePreparation,
      sitePreparationOptions
    )
  ) {
    return {
      error:
        'Vyberte platný stav nemovitosti při zahájení.'
    };
  }


  // ---------------------------------------
  // HLAVNÍ POPIS
  // ---------------------------------------

  if (
    contact.message.length < 20 ||
    contact.message.length > 5000
  ) {
    return {
      error:
        'Popište prosím svou představu v rozsahu 20 až 5 000 znaků.'
    };
  }


  if (contact.additionalInfo.length > 2500) {
    return {
      error:
        'Doplňující informace mohou mít nejvýše 2 500 znaků.'
    };
  }


  return {
    contact
  };
}


export function contactEmail(contact: Contact) {
  const value = (
    input: string,
    fallback = 'Neuvedeno'
  ) => input || fallback;


  const area = (input: string) =>
    input ? `${input} m²` : 'Neuvedeno';


  const meters = (input: string) =>
    input ? `${input} m` : 'Neuvedeno';


  const text = `
NOVÁ POPTÁVKA Z WEBU WOHAKO


────────────────────────────
KONTAKTNÍ ÚDAJE
────────────────────────────

Jméno: ${contact.name}
E-mail: ${contact.email}
Telefon: ${value(contact.phone, 'Neuveden')}
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


  const escapeHtml = (input: string) =>
    input.replace(
      /[&<>"']/g,
      (character) =>
        ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;'
        })[character]!
    );


  const row = (
    label: string,
    content: string
  ) => `
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


  const sectionTitle = (title: string) => `
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


  const textBlock = (
    title: string,
    content: string
  ) => `
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
        ${escapeHtml(content || 'Neuvedeno')}
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


            ${sectionTitle('Kontaktní údaje')}

            <table
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="
                border-collapse:collapse;
                font-size:15px;
              "
            >
              ${row('Jméno', contact.name)}
              ${row('E-mail', contact.email)}
              ${row('Telefon', value(contact.phone, 'Neuveden'))}
              ${row('Místo realizace', value(contact.locality))}
              ${row('Typ rekonstrukce', contact.service)}
            </table>


            ${sectionTitle('Nemovitost')}

            <table
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="
                border-collapse:collapse;
                font-size:15px;
              "
            >
              ${row('Typ nemovitosti', value(contact.propertyType))}
              ${row('Dispozice', value(contact.disposition))}
              ${row('Podlahová plocha', area(contact.totalFloorArea))}
              ${row('Počet místností', value(contact.roomCount))}
            </table>

            ${textBlock(
              'Rozložení místností',
              contact.roomLayout
            )}


            ${sectionTitle('Koupelna a WC')}

            <table
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="
                border-collapse:collapse;
                font-size:15px;
              "
            >
              ${row('Velikost koupelny', area(contact.bathroomArea))}
              ${row('Velikost WC', area(contact.toiletArea))}
              ${row('Uspořádání', value(contact.bathroomLayout))}
              ${row('Požadavky', value(contact.bathroomRequirement))}
            </table>


            ${sectionTitle('Současný stav')}

            <table
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="
                border-collapse:collapse;
                font-size:15px;
              "
            >
              ${row('Stav nemovitosti', value(contact.propertyCondition))}
              ${row('Patro', value(contact.floor))}
              ${row('Výtah', value(contact.elevator))}
              ${row(
                'Obývané během rekonstrukce',
                value(contact.occupiedDuringRenovation)
              )}
            </table>


            ${sectionTitle('Rozsah rekonstrukce')}

            ${textBlock(
              'Co má rekonstrukce zahrnovat',
              contact.reconstructionScope
            )}

            ${textBlock(
              'Změny dispozice',
              contact.layoutChanges
            )}


            ${sectionTitle('Technické informace')}

            <table
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="
                border-collapse:collapse;
                font-size:15px;
              "
            >
              ${row('Elektroinstalace', value(contact.electrical))}
              ${row('Voda a odpady', value(contact.plumbing))}
              ${row('Podlahy', value(contact.floorCondition))}
              ${row('Výška stropu', meters(contact.ceilingHeight))}
            </table>


            ${sectionTitle('Termín a rozpočet')}

            <table
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="
                border-collapse:collapse;
                font-size:15px;
              "
            >
              ${row(
                'Předpokládaný termín',
                value(contact.preferredTerm)
              )}

              ${row(
                'Orientační rozpočet',
                value(contact.budget)
              )}
            </table>


            ${sectionTitle('Dokumentace a příprava')}

            <table
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="
                border-collapse:collapse;
                font-size:15px;
              "
            >
              ${row(
                'Půdorys / projekt / fotografie',
                value(contact.documentation)
              )}

              ${row(
                'Stav při zahájení',
                value(contact.sitePreparation)
              )}
            </table>


            ${sectionTitle('Představa zákazníka')}

            ${textBlock(
              'Popis rekonstrukce',
              contact.message
            )}

            ${
              contact.additionalInfo
                ? textBlock(
                    'Další informace',
                    contact.additionalInfo
                  )
                : ''
            }


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