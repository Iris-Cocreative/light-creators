# Offene Aufgaben nach dem Relaunch

Stand: 21. August 2026. Reihenfolge ist eine Empfehlung, nicht bindend.
Erledigtes abhaken und mit Datum versehen, damit klar bleibt, was noch offen ist.

---

## Sofort, unabhängig vom Relaunch

- [ ] **Impressum und Datenschutzerklärung inhaltlich erstellen.**
  Claude Code legt die Seiten `/impressum/` und `/datenschutz/` mit Platzhalter an.
  Der Text kommt von dir oder deinem Anwalt, nicht von einer KI.
  Betrifft: 100 tote Links auf der gesamten Website. Threshold-Seiten haben
  bisher gar keine Rechtslinks im Footer.
- [ ] **AGB entscheiden.** Falls du keine hast, bleibt der Link entfernt.
  Falls du welche brauchst, etwa für die Threshold-Buchung, ist das ein
  eigenes Thema.
- [ ] **Platzhalterkasten auf den Rechtsseiten entfernen,** sobald der echte
  Text steht. Aktuell steht dort `.who-exclusion` als markierter Platzhalter,
  beide Seiten sind auf `noindex` und nicht in der Sitemap.
- [ ] **Eigene Bilder für die Vorschau (og:image)** von `/fuehren/` und
  `/threshold/partner/`. Vorläufig läuft dort das Bild der Startseite mit.

---

## Aus dem Relaunch heraus, kurzfristig

- [ ] **Zieladressen der drei Buttons festlegen.**
  Briefing-Gespräch, Threshold-Bewerbungsgespräch, Partnerschaftsanfrage.
  Formular, Kalenderlink oder Mailadresse, jeweils entscheiden.
- [ ] **LinkedIn-Empfehlungen im Wortlaut liefern.**
  Drei bis fünf Stück, mit Name und Funktion. Kommen in den Belege-Abschnitt
  der Führen-Seite und in den Testimonial-Block.
  Achtung: Der Wortlaut muss die Rolle bei der SYNK GROUP erkennen lassen,
  wo der Award erwähnt wird (Regel R2).
- [ ] **Partnerschaftswege für `/threshold/partner/` freigeben.**
  Claude Code legt den bestehenden Text vor, du entscheidest über die
  Anpassung auf Zahler statt Teilnehmer.

---

## Vor dem Merge

- [ ] **Visueller Abnahmedurchgang.** In der Bausitzung war der Browser-Bereich
  ausgeblendet, Scrollen und Layout-Messungen funktionierten nicht,
  `window.innerWidth` meldete 0. Geprüft wurde über DOM und Vorschauseiten.
  Vor dem Merge alle geänderten Seiten einmal in echt durchsehen, auf
  Desktop und Mobil.
- [ ] **`/fuehren/` und `/threshold/partner/` müssen existieren.**
  Bis dahin laufen vier Links auf der Startseite ins Leere. Der Pull Request
  darf vorher nicht gemergt werden.
- [ ] **Generator-Sperre ist ungetestet.** Node war beim Einbau nicht
  installiert. Bei Gelegenheit einmal `node generate-episodes.js` ohne
  `--force` ausführen und prüfen, dass sauber abgebrochen wird.

---

## Podcast

- [ ] **SEO-Block in die Generator-Vorlage nachtragen.**
  Datei: `generate-episodes.js`, Funktion `generatePage()`, Zeilen 141 bis 286.
  Die 29 erzeugten Episoden enthalten je einen SEO-Block, den die Vorlage
  nicht kennt: canonical, robots, 9 x og und twitter, JSON-LD PodcastEpisode,
  JSON-LD BreadcrumbList. Ein Generatorlauf würde alle 29 überschreiben.
  Vorläufig ist eine Sperre im Skript eingebaut.
  Zusätzlich: `CONTENT_FILE` zeigt auf einen Windows-Downloads-Pfad, die
  Quelldatei liegt nicht im Repository.
- [ ] **podcast.html vollständig überarbeiten.**
  Im Relaunch wurden nur die gröbsten Founder-Stellen ersetzt. Die Seite ist
  strukturell weiterhin eine Founder-Landingpage. Offen: Hero-Aufbau,
  Blog-Tags, English-Block, gesamte Dramaturgie.
- [ ] **Entscheidung zu den Founder-Episoden.**
  Folge 15 und 20 bis 28 sind reine Founder-Folgen, inklusive Titel und
  URL-Slug. Aktuelle Entscheidung: bleiben unverändert als datiertes Archiv,
  nur der Rahmen wurde aktualisiert. Falls du das später anders willst,
  betrifft es auch die Slugs und damit Weiterleitungen.
- [ ] **ep-28 nach dem Webflow-Umzug prüfen.**
  Im Fließtext stehen die nackten URLs `light-creators.com/quiz` und
  `light-creators.com/call`. Sie bleiben als redaktioneller Inhalt stehen.
  Wenn sich beim Umzug die Struktur von light-creators.com ändert, sind das
  die einzigen beiden Stellen in den Episoden, die brechen können.

---

## Umzug der Founder-Inhalte auf light-creators.com

Läuft nicht über Claude Code, sondern über den Webflow-Connector im Chat.
Sieben Schritte, wir stehen bei Schritt 1.

- [ ] 1. Webflow-Verbindung freigeben und Projekte auflisten
- [ ] 2. Bestand aufnehmen: welche Seiten, welche Sections existieren heute
- [ ] 3. Zielbild festlegen: was steht danach wo
- [ ] 4. Auftrag schreiben
- [ ] 5. Founder-Blöcke aus `_archiv/founder-resonance-bloecke.html` holen
- [ ] 6. In Webflow umsetzen, Section für Section
- [ ] 7. Prüfen und veröffentlichen

Was umzieht: die fünf Resonance-Faktoren, der Resonance Gap, das Founder
Resonance Assessment, die Zeile "Das Update, das alle anderen Updates erst
möglich macht" als neue Hero-Headline, dazu Hero-Variante C aus der
Textabstimmung.

Material liegt in `_archiv/founder-resonance-bloecke.html`, gesichert aus
`index.html` und `podcast.html`. Zusätzlich liegen drei Bilder brach, die
dort wiederverwendet werden können: `role-entrepreneur.webp`,
`role-manager.webp`, `role-expert.webp`.

---

## Englische Fassungen

- [ ] **Neue Texte übersetzen.**
  Im Relaunch wurden auf den englischen Seiten nur Signaturzeile, Navigation
  und die Award-Formulierung angeglichen. Die neuen Abschnitte fehlen dort.
- [ ] **Englische Partnerseite `/threshold/en/partner/`.**
  Solange sie fehlt, bleibt der englische Partnerblock auf der
  Threshold-Seite stehen.

---

## Später, kein Zeitdruck

- [ ] **Design-Tokens vereinheitlichen.**
  `landing-pages/flourishing-life-eltern-v2.html`, Zeilen 30 bis 42, enthält
  eine Token-Sammlung, die den Namen des Corporate Designs näher folgt
  (`--gold-light`, `--gold-dark`, `--horizon`, `--summit`).
  In `assets/styles.css` heißen dieselben Farben `--color-deep-blue`,
  `--color-gold`, `--color-teal`. Alle Hex-Werte stimmen, nur die Namen
  laufen auseinander. Zwei Zusatz-Tokens ohne Entsprechung im Corporate
  Design: `--color-cream-2: #F5EFD8` und `--bg-soft: #F8F1DE`.
- [ ] **Gold Gradient ins CSS heben.**
  Aktuell nur im SVG `03-erkennen.svg` als linearGradient definiert
  (#FFDB9D nach #A87D34). Gehört als Token nach `assets/styles.css`.
- [ ] **Neues Quiz und Funnel für die junge Zielgruppe.**
  Kommt an davidliebnau.com, nicht an light-creators.com.
- [ ] **Threshold-Preis nach dem Piloten.**
  Der Preis steht nur an einer Stelle, im Investitionsblock der
  Threshold-Seite. Überall sonst heißt es "Einführungspreis" oder
  "Kosten im Gespräch". Nach dem Piloten dort ändern, sonst nirgends.
- [ ] **Inhouse-Variante von Threshold.**
  Etwa für eine Kooperation mit der INTES Akademie. Betrifft die
  Formulierung "Termine auf Anfrage" und möglicherweise eine eigene Seite.

---

## Später, nicht dringend

- [ ] **Vorvertragliche Pflichtinformationen nach Art. 246c EGBGB.**
      Betrifft nicht die Website, sondern die Anmeldebestätigung per
      E-Mail. Pflichtangaben sind unter anderem: welche technischen
      Schritte zum Vertragsschluss führen, ob der Vertragstext
      gespeichert und zugänglich ist, wie Eingabefehler erkannt und
      korrigiert werden können, welche Sprachen zur Verfügung stehen.
      Bei Buchung über Gespräch und E-Mail entspannter als bei einem
      Shop, gehört aber in die Bestätigung. Claude kann das Dokument
      entwerfen, sobald der genaue Buchungsablauf feststeht: Kommt der
      Vertrag im Gespräch zustande oder erst mit der schriftlichen
      Bestätigung, und werden AGB und Widerrufsbelehrung mitgeschickt.
      Verschoben am 1. September 2026, aktuell nicht wichtig.

- [ ] **DPMA-Markenrecherche „The Threshold Program".**
      Keine eigenen Markenrechte angemeldet und vorerst auch nicht
      geplant. Das Risiko liegt umgekehrt: Jemand anderes könnte den
      Namen für Coaching- oder Weiterbildungsleistungen eingetragen
      haben, dann droht eine Abmahnung, obwohl nichts angemeldet wurde.
      Echte Registerrecherche im DPMAregister, keine Websuche. Bei einer
      Gründungsgruppe gering relevant. Vor bezahlter Werbung oder
      größerer Reichweite einmal prüfen lassen.
      Verschoben am 1. September 2026.

- [x] **Auftragsverarbeitungsvertrag mit GitHub.** Am 1. September 2026
      als ausreichend abgehakt: Das GitHub Data Protection Agreement
      läuft in der Regel über die Nutzungsbedingungen mit. Ziffer 2 der
      Datenschutzerklärung beschreibt Hosting, Drittlandtransfer und
      EU-US Data Privacy Framework korrekt.

---

## Erledigt

- [x] Positionierung und Klammer festgelegt: Bewusstes Leadership an
      kritischen Wendepunkten
- [x] Seitenarchitektur festgelegt: Startseite für Entscheider und Zahler,
      `/fuehren/` neu, `/threshold/partner/` neu, Founder auf light-creators.com
- [x] Alle Startseitentexte abgestimmt
- [x] Vier Symbole der schöpferischen Dialoge gestaltet und im Repository
- [x] Briefing für Claude Code geschrieben und übergeben
- [x] Rückfragen 1 bis 10 von Claude Code beantwortet
