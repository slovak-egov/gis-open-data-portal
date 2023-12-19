# Portál otvorených dát

Portál pre zverejňovanie otvorených dát samosprávy, naprogramovaný v React frameworku [Next.js](https://nextjs.org/).

Ide o klientskú aplikáciu, ktorá konzumuje dáta prostredníctvom GraphQL API. Samotné GraphQL API nie je súčasťou tohto projektu.
Na spustenie, prípadne vývojové účely, je možné použiť MOCK API, ktoré je súčasťou tohto projektu.

Štruktúra jednotlivých GraphQL queries sa nachádza v priečinku "/src/queries".

## Nastavenie premenných prostredia

Aplikácia využíva nasledovné premenné prostredia:

1. NEXT_PUBLIC_API_URL - URL na API, ak sa chcete napojiť na MOCK API, vyplňte hodnotu:
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
2. NEXT_PUBLIC_SITE_URL - URL, na ktorej je aplikácia dostupná
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
3. NEXT_PUBLIC_CSP_IMG_SRC - content security premenná nastavovaná v súbore middleware.ts
4. NEXT_PUBLIC_CSP_DEFAULT_SRC - content security premenná nastavovaná v súbore middleware.ts

Príklad nastavenia premenných prostredia:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_CSP_IMG_SRC="https://tile.openstreetmap.org https://zbgisws.skgeodesy.sk"
NEXT_PUBLIC_CSP_DEFAULT_SRC="http://localhost:3000"
```

## Spustenie projektu

```bash
yarn start:dev
```

Po spustení je aplikácia dostupná na adrese http://localhost:3000

![Alt text](public/opendata-portal.png?raw=true "portal")
