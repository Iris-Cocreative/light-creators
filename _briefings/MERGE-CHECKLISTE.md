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
- [x] **Plausible:** Goals für die acht Events aus A7 sowie Pageview-Goals für
      `/mirror-edge/` und `/mirror-edge/en/` angelegt. Laut David, 24.09.2026
      (von Claude Code nicht geprüft, kein Zugang zu Plausible).
- [x] **Calendly:** Einstiegsfrage in beiden Passungsterminen angepasst (DE und
      EN), beide MIRROR-Gespräche auf geheim. Geprüft per API am 24.09.2026.
- [x] **Datenschutzerklärung nach v4.3:** Microsoft 365, Tally und Calendly
      genannt (neue Ziffern 5 bis 7), Satz „nicht in externe Systeme“ in der
      Ziffer zu Programmen und Coachings angepasst (jetzt Ziffer 8),
      Bereitstellungshinweis unter Ziffer 1.
- [x] **Datenschutzerklärung, Löschfristen Tally und Ziffer 4:** Fristen und
      Freitext-Hinweis in Ziffer 6 ergänzt, damit hat der Verweis in Ziffer 8
      („nach der genannten Frist“) sein Ziel. Ziffer 4 an Ziffer 5 angeglichen
      (Microsoft 365 als Auftragsverarbeiter, Löschung spätestens nach drei
      Jahren).
- [x] **Datenschutzerklärung nach v4.4 und v4.5:** Satz zur Weitergabe in
      Ziffer 6 in der Fassung von v4.5, Aufzeichnung in Ziffer 5, neue Ziffer 8
      „KI-Unterstützung mit deiner Einwilligung“ (Anker `#ki`), folgende
      Ziffern und Querverweise um eins verschoben, drei Ausnahmen in Ziffer 9,
      Hinweis und Sprachumschalter auf die englische Fassung.
- [x] **Englische Datenschutzerklärung** `/datenschutz/en/` angelegt, hreflang
      mit `/datenschutz/`, „Privacy Policy“ im Footer aller englischen Seiten
      zeigt dorthin, Eintrag in der Sitemap.
- [ ] **Englische Datenschutzerklärung: übersetzte Abschnitte von Claude
      gegengelesen** (Abschnitte 1, 3, 4, 5, 10, 11, 12).
- [ ] **Englische Datenschutzerklärung, Stand:** Datum „Last updated“ wie bei
      der deutschen Fassung auf den Tag des Merges setzen.
- [x] **Training in Claude und ChatGPT abgeschaltet.** Laut David, 24.09.2026.
- [ ] **Datenschutzerklärung, Stand:** Datum auf den Tag des Merges setzen (v4.3,
      A6). Heute steht dort „September 2026“.
- [x] **KI-Seite nach v4.5:** Leitsatz „Nichts Vertrauliches geht ohne deine
      ausdrückliche Zustimmung in ein KI-System“, Absatz zu Tally und KI nach
      „sage ich es vorher“.
- [ ] **KI-Seite, widersprechende Sätze:** Davids Entscheidung zu den Sätzen,
      die der Einwilligungsregel entgegenstehen (siehe Übergabe v4.4/v4.5).
- [x] **Impressum nach v4.3:** Haftungsteil ohne DDG-Zitate, gekürzt auf den
      Satz zu eigenen Inhalten; „Haftung für Links“ bleibt und enthält keine
      Normverweise. Versicherungsblock
      bleibt vollständig, Überschrift „Berufshaftpflichtversicherung (Angaben
      nach § 2 Abs. 1 Nr. 11 DL-InfoV)“ (Davids Entscheidung, abweichend von
      v4.3 C2). Die Zeile „David Liebnau, Anschrift wie oben“ bleibt: Sie
      gehört zur Pflichtangabe nach § 18 Abs. 2 MStV, nicht zum
      Versicherungsblock.
- [x] **Impressum, Versicherung:** Berufshaftpflicht besteht. Laut David,
      24.09.2026.
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
