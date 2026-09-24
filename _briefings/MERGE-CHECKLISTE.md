# Merge-Checkliste · MIRROR und EDGE

Branch `feature/mirror-edge` → `main`. Ein Merge auf `main` ist der Livegang
(GitHub Pages, Quelle `main /`). Erst mergen, wenn jeder Punkt abgehakt ist
und David den Merge ausdrücklich freigegeben hat.

Diese Datei liegt bewusst in `_briefings/`. Ordner mit Unterstrich
veröffentlicht GitHub Pages nicht, Markdown im Stammverzeichnis dagegen schon
(`/BACKLOG.md` liefert 200). Nicht verlinken, nicht in die Sitemap.

## Bedingungen

- [ ] **Tally:** MIRROR-Anfrage DE (445NbX) und EN (RGpB99) veröffentlicht,
      Links liefern 200.
      - DE: https://tally.so/r/445NbX
      - EN: https://tally.so/r/RGpB99
- [ ] **Plausible:** Goals für die acht Events aus A7 sowie Pageview-Goals für
      `/mirror-edge/` und `/mirror-edge/en/` angelegt.
- [x] **Calendly:** Einstiegsfrage in beiden Passungsterminen angepasst (DE und
      EN), beide MIRROR-Gespräche auf geheim. Geprüft per API am 24.09.2026.
- [x] **Datenschutzerklärung nach v4.3:** Microsoft 365, Tally und Calendly
      genannt (neue Ziffern 5 bis 7), Satz „nicht in externe Systeme“ in der
      Ziffer zu Programmen und Coachings angepasst (jetzt Ziffer 8),
      Bereitstellungshinweis unter Ziffer 1.
- [ ] **Datenschutzerklärung nach v4.4:** Letzter Teil von „Formulare über
      Tally“ ab „Darüber hinaus gebe ich die Angaben nicht an andere Dienste
      weiter…“ mit den Löschfristen. Bis dahin verweist der Satz in Ziffer 8
      („werden dort nach der genannten Frist gelöscht“) auf eine Frist, die
      noch nirgends genannt ist.
- [ ] **Datenschutzerklärung, Stand:** Datum auf den Tag des Merges setzen (v4.3,
      A6). Heute steht dort „September 2026“.
- [ ] **KI-Seite** (`ki-einsatz/index.html`) um den Hinweis zu Tally ergänzt.
      Folgt mit v4.4.
- [x] **Impressum nach v4.3:** Haftungsteil ohne DDG-Zitate. Versicherungsblock
      bleibt vollständig, Überschrift „Berufshaftpflichtversicherung (Angaben
      nach § 2 Abs. 1 Nr. 11 DL-InfoV)“ (Davids Entscheidung, abweichend von
      v4.3 C2). Die Zeile „David Liebnau, Anschrift wie oben“ bleibt: Sie
      gehört zur Pflichtangabe nach § 18 Abs. 2 MStV, nicht zum
      Versicherungsblock.
- [ ] **Impressum, Versicherung:** Bestätigung der Baloise liegt vor, dass es
      sich um eine Berufshaftpflicht handelt.
- [x] **AGB nach v4.3:** Abschnitt „Bedingungen für Unternehmen“ mit Anker
      `#unternehmen`, Satz in § 1 ergänzt.
- [ ] **Werte-Prüfung:** `python3 tools/angebotswerte.py --pruefen` endet mit 0.
      Stand 24.09.2026: 0. Unmittelbar vor dem Merge erneut laufen lassen.

## Prüfbefehle

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://tally.so/r/445NbX
curl -s -o /dev/null -w "%{http_code}\n" https://tally.so/r/RGpB99
python3 tools/angebotswerte.py --pruefen; echo "exit $?"
```

Zum Abgleich nach dem Merge: dieselben Seiten wie im Branch geprüft,
`/mirror-edge/`, `/mirror-edge/en/`, `/fuehren/`, `/fuehren/en/`,
`/datenschutz/`, `/impressum/`, `/agb/`
(`python3 tools/pruefwerkzeug/pruefen.py statisch --seiten …`).
