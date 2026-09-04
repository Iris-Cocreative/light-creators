# Offene Aufgaben nach dem Relaunch

Stand: 2. September 2026. Reihenfolge ist eine Empfehlung, nicht bindend.
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
- [x] **Platzhalterkasten auf den Rechtsseiten entfernt.** Erledigt vor dem
  01.09.2026. Impressum, Datenschutz, AGB, Widerruf und KI-Einsatz tragen
  echten Text, stehen nicht mehr auf `noindex` und sind in der Sitemap.
- [x] **Eigene Bilder für die Vorschau (og:image).** Erledigt am 02.09.2026.
  `/fuehren/` und `/fuehren/en/` tragen seit dem 03.09.2026 eine gebaute
  Karte statt eines Zuschnitts, je Sprache eine eigene Datei:
  `assets/og-fuehren-de.jpg` und `assets/og-fuehren-en.jpg`.
  `/threshold/partner/` und `/threshold/partner/en/` tragen
  `assets/og-image-threshold-partner.jpg`, denselben Zuschnitt aus dem
  bestehenden `assets/threshold-teaser.jpg`. Beide mit `og:image:width`,
  `og:image:height` und `twitter:image`.
- [x] **og:image der Threshold-Hauptseiten.** Erledigt am 04.09.2026.
  `/threshold/` und `/threshold/en/` tragen gebaute Karten,
  `assets/og-threshold-de.jpg` und `-en.jpg`, mit dem vorhandenen Bild
  vollständig und unbeschnitten. Die Regel kein automatisches Beschneiden
  ist gewahrt: `threshold/og-image.jpg` bleibt unverändert und dient als
  Quelle. Die Wahl des Motivs bleibt eine offene Frage an David, siehe
  BACKLOG.

---

## Aus dem Relaunch heraus, kurzfristig

- [x] **Zieladressen der Buttons festgelegt.** Alle laufen auf
  `mail@davidliebnau.com`, unterschieden über die Betreffzeile. Seit dem
  Phase-1-Sprint kommen acht weitere Betreffzeilen für die vier
  Nachfragewege dazu. Kein Formulardienst, kein Kalenderlink.
- [ ] **LinkedIn-Empfehlung 4 und 5 im Wortlaut liefern.**
  Drei liegen vor und stehen seit dem 01.09.2026 kontextnah auf
  `/fuehren/` und `/fuehren/en/`: Sinyan bei „Wie ich arbeite", Szücs bei
  „Formate", Kling im Belege-Abschnitt. Kriterien und Einbauort für die
  fehlenden zwei stehen als markierter Kommentarblock in beiden Dateien.
  Achtung: Der Wortlaut muss die Rolle bei der SYNK GROUP erkennen lassen,
  wo der Award erwähnt wird (Regel R2). `assets/award-context.js` trägt den
  Rollen-Satz automatisch nach, falls er im Zitat fehlt.
- [x] **Partnerschaftswege für `/threshold/partner/` freigegeben.** Die vier
  Wege der Zusammenarbeit stehen auf Zahler formuliert, dazu seit dem
  Phase-1-Sprint vier Nachfragewege für die Anfrage selbst.

---

## Vor dem Merge

- [ ] **Visueller Abnahmedurchgang, Phase 1.** Macht David selbst, auf
  Desktop und Mobil: die vier Threshold-Seiten und `/fuehren/`, mit Fokus
  auf die vier mailto-Wege und die Zitat-Platzierungen. Erst danach mergen.
  Claude Code soll dafür nicht das Browser-Tooling reparieren.
- [x] **`/fuehren/` und `/threshold/partner/` müssen existieren.** Erledigt.
  Beide Seiten stehen, dazu die englischen Fassungen.
- [x] **Generator-Sperre ist ungetestet.** Gegenstandslos, geprüft am
  04.09.2026. `generate-episodes.js` existiert im Repository nicht mehr,
  an seine Stelle ist `tools/generate_episode.py` getreten. Node ist auf
  der Maschine weiterhin nicht installiert und wird auch nicht mehr
  gebraucht. Die Sperre, die getestet werden sollte, gehörte zum
  entfernten Skript.

---

## Phase 1: Conversionpfade

Gebaut auf `phase1/threshold-proof-seo`, **gemergt und live seit dem
03.09.2026** (Merge-Commit `9534eae`, GitHub-Pages-Build durchgelaufen und
gegen die Produktionsdomain verifiziert).

- [x] **1A Threshold-Angebotslogik.** Gebaut am 01.09.2026, live am
  03.09.2026. Vier unterscheidbare Nachfragewege auf allen vier
  Threshold-Seiten, als mailto mit eigener Betreffzeile, eigenem Feldgerüst
  und eigenem Folgetext.
- [x] **1B Corporate Proof auf `/fuehren/`.** Gebaut am 01.09.2026, live am
  03.09.2026. Drei Empfehlungen kontextnah platziert, Testimonial-Wand
  aufgelöst, Regel R2 über `assets/award-context.js` technisch abgesichert.
  Die Seite ist damit eingefroren, bis Plausible-Daten vorliegen.
- [x] **1D SEO der vier Money Pages.** Gebaut am 01. und 02.09.2026, live am
  03.09.2026. hreflang beidseitig plus x-default, Twitter-Meta vollständig,
  eigene og:images. Live-Auslieferung real abgerufen: alle acht Seiten mit
  200, beide og:images erreichbar.
- [ ] **Social-Preview-Check.** Technisch abgeschlossen und gegen die
  Live-Domain geprüft, am 04.09.2026: alle neun Seiten mit Vorschaubild
  tragen og:image mit Maßen und Bildbeschreibung, dazu die vollständigen
  twitter-Entsprechungen; jedes Bild antwortet mit 200 und liefert byteweise
  das, was im Repository liegt. Sechs Seiten tragen gebaute Karten in
  2400 × 1256.

  **Was aussteht, ist die Sichtprüfung im LinkedIn Post Inspector durch
  David.** Läuft. Hinweis aus dem Verlauf: LinkedIn speichert das gerenderte
  Bild je URL und bis zu sieben Tage. Ändert sich der Bildinhalt, muss der
  Dateiname sich mit ändern, sonst zeigt der Inspector die alte Fassung.
- [x] **Goals im Plausible-Dashboard angelegt.** Erledigt am 03.09.2026,
  von David angelegt und im Dashboard verifiziert. Im Account stehen 19
  Custom Events plus die vier Standard-Goals; die 19 decken sich mit dem
  Bestand im Code. Vollständige Namensliste in `BACKLOG.md` unter „Messung".
- [x] **Verkabelung der neun neuen Goals geprüft.** Ebenfalls am 03.09.2026,
  gegen die Live-Domain und **ohne eine einzige Konversion** zu erzeugen: Die
  Sendewege wurden abgefangen und die Nutzlast mitgelesen, statt echte Klicks
  abzusetzen. In allen 18 geprüften Fällen stimmt der gesendete Eventname mit
  der Klasse im Markup überein. Vorgehen und Grenzen in `BACKLOG.md`.

---

## Werkzeug

- [ ] **Browser-Bereich in Claude Code ist unbrauchbar für die visuelle
  Abnahme.** Zum zweiten Mal aufgetreten, am 21.08.2026 und am
  01.09.2026: Der Browser-Bereich ist ausgeblendet, Scrollen und
  Screenshots laufen nach 30 Sekunden in einen Timeout,
  `window.innerWidth` meldet 0. Was funktioniert: `fetch`, DOM-Auswertung
  über `DOMParser` und berechnete Stile über `getComputedStyle`. Damit
  lassen sich Struktur, Farben, Kontraste, Verweise und Metadaten prüfen,
  aber kein Layout und keine Optik.

  Konsequenz, damit es nicht in jedem Sprint neu improvisiert wird: Die
  visuelle Abnahme macht David im eigenen Browser. Claude Code prüft über
  DOM und berechnete Stile und schreibt dazu, was damit nicht geprüft
  werden konnte. Kein Versuch, das Werkzeug zu reparieren.

---

## Podcast

- [x] **SEO-Block in die Generator-Vorlage nachtragen.** Erledigt mit der
  Ablösung des Skripts, geprüft am 04.09.2026. `tools/generate_episode.py`
  trägt canonical, robots, og und twitter sowie beide JSON-LD-Blöcke
  (PodcastEpisode und BreadcrumbList). Ein Lauf überschreibt die Episoden
  nicht mehr um ihren SEO-Block. Der alte Windows-Pfad in `CONTENT_FILE`
  ist mit dem alten Skript entfallen.
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
- [x] **Englische Partnerseite.** Erledigt. Sie liegt unter
  `/threshold/partner/en/`, nicht unter `/threshold/en/partner/`. Der
  vollständige Partnerblock stand bis zum 02.09.2026 zusätzlich in
  `threshold/en/index.html` und ist dort jetzt auf denselben kurzen Teaser
  zurückgebaut wie in der deutschen Fassung. Der Inhalt steht damit nur
  noch auf einer indexierbaren URL.

---

## Hängt am Abschluss der Pilotkohorte

Diese Punkte liegen nicht offen, weil sie jemand vergessen hat, sondern
weil die Voraussetzung dafür erst mit der ersten Gruppe im Mai 2027
entsteht. Vorher sind sie nicht entscheidbar. Zusammen gruppiert, damit
nach dem Piloten an einer Stelle steht, was dann fällig wird.

- [ ] **Threshold-Preis nach dem Piloten.**
  Der Preis steht nur an einer Stelle, im Investitionsblock der
  Threshold-Seite. Überall sonst heißt es "Einführungspreis" oder
  "Kosten im Gespräch". Nach dem Piloten dort ändern, sonst nirgends.
  Der Wechsel hängt am Abschluss der Kohorte, nicht an einem
  Kalenderdatum.
- [ ] **Inhouse-Variante von Threshold.**
  Etwa für eine Kooperation mit der INTES Akademie. Betrifft die
  Formulierung "Termine auf Anfrage" und möglicherweise eine eigene Seite.
  Erst bauen, wenn die Nachfrage über echte Gespräche belegt ist. Der
  Anfragepfad für Organisationen auf den Threshold-Seiten trägt dafür
  seit dem 01.09.2026 eine eigene Auswahl im Formulartext.
- [ ] **Eigenes Bildmaterial aus Finnland.**
  `assets/og-image-threshold-partner.jpg` ist ein Zuschnitt aus
  `assets/threshold-teaser.jpg`, einer Gruppensilhouette im
  Sonnenuntergang. Thematisch passend, aber generisch. Ein Bild aus dem
  Programm selbst wäre stärker — es existiert noch nicht und entsteht mit
  der ersten Pilotgruppe. Bis dahin bleibt der Zuschnitt bewusst stehen,
  er ist keine Übergangslösung aus Zeitmangel.
  Betrifft dann auch `threshold/og-image.jpg`, das mit 1920 × 1440 im
  Format 4:3 liegt und in der Vorschau oben und unten beschnitten wird.
  Für diese Datei gilt weiterhin: kein automatisches Beschneiden.
- [ ] **Schriftliche Rückmeldungen der Teilnehmenden.**
  `/threshold/partner/` verspricht Stipendien-Partnern eine schriftliche
  Rückmeldung der Person, die sie unterstützt haben, und Impact-Partnern
  anonymisierte Vorher-Nachher-Reflexionen. Beides entsteht erst mit der
  ersten Kohorte. Nach dem Piloten prüfen, ob die Zusage eingelöst werden
  kann oder umformuliert werden muss.

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
