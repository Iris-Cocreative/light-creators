# Merge-Checkliste · MIRROR und EDGE

Branch `feature/mirror-edge` → `main`. Ein Merge auf `main` ist der Livegang
(GitHub Pages, Quelle `main /`). Erst mergen, wenn jeder Punkt abgehakt ist
und David den Merge ausdrücklich freigegeben hat.

Diese Datei liegt bewusst in `_briefings/`. Ordner mit Unterstrich
veröffentlicht GitHub Pages nicht, Markdown im Stammverzeichnis dagegen schon
(`/BACKLOG.md` liefert 200). Nicht verlinken, nicht in die Sitemap.

## Bedingungen

- [ ] **Tally:** Beide MIRROR-Anfrageformulare sind veröffentlicht, die Links
      liefern 200.
      - DE: https://tally.so/r/445NbX
      - EN: https://tally.so/r/RGpB99
- [ ] **Datenschutzerklärung** (`datenschutz/index.html`) nennt Tally und
      Calendly.
- [ ] **Datenschutzerklärung, Ziffer 5:** Der Satz, dass Inhalte „nicht in
      externe Systeme“ eingetragen werden, ist angepasst.
- [ ] **KI-Seite** (`ki-einsatz/index.html`) ist um den Hinweis zu Tally
      ergänzt.
- [ ] **Calendly:**
      - Die Einstiegsfrage ist in beiden Passungsterminen angepasst (DE und EN).
      - Beide MIRROR-Gespräche sind auf geheim gestellt (DE und EN).
- [ ] **Werte-Prüfung:** `python3 tools/angebotswerte.py --pruefen` endet mit 0.

## Prüfbefehle

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://tally.so/r/445NbX
curl -s -o /dev/null -w "%{http_code}\n" https://tally.so/r/RGpB99
python3 tools/angebotswerte.py --pruefen; echo "exit $?"
```

Zum Abgleich nach dem Merge: dieselben Seiten wie im Branch geprüft,
`/mirror-edge/`, `/mirror-edge/en/`, `/fuehren/`, `/fuehren/en/`
(`python3 tools/pruefwerkzeug/pruefen.py statisch --seiten …`).
