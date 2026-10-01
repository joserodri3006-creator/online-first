# Online First – Website + Effizienzcheck

Eigenständige Vite/React-Version des Online-First-Prototyps.

## Enthalten
- Midnight-Blue Landingpage
- Responsive Layout
- `/effizienzcheck` mit 8 Fragen
- Score 0–23
- 0–8 niedrig / 9–16 mittel / 17–23 hoch
- Mehrfachauswahl bei Problemen, maximal 2 Score-Punkte
- Personenabhängigkeit / Betriebsrisiko
- Ergebnis-Treiber
- Process-Check CTA

## Lokal starten
```bash
npm install
npm run dev
```

## Production Build
```bash
npm run build
npm run preview
```

## Deployment
Für Vercel: Repository importieren, Framework `Vite`; Build Command `npm run build`; Output `dist`.

## Hinweis
Der CTA zum Process Check verwendet aktuell `kontakt@onlinefirst.eu` als Mail-Link. Falls eine andere Adresse oder später Calendly/CRM verwendet wird, in `src/main.jsx` ersetzen.
