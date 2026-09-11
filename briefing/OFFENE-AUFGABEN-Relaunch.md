# Offene Aufgaben nach dem Relaunch

Stand: 10. September 2026. Zusammengeführt aus zwei Ständen (siehe Kasten).
Reihenfolge ist eine Empfehlung, nicht bindend.
Erledigtes abhaken und mit Datum versehen, damit klar bleibt, was noch offen ist.

> ## ⚠ Die maßgebliche Fassung dieser Datei liegt im Repository
>
> **`briefing/OFFENE-AUFGABEN-Relaunch.md`**, auf `main`. Nur dort.
>
> **Jede Kopie außerhalb ist als veraltet zu behandeln** — die Wissensablage eines
> Chat-Projekts, ein heruntergeladener Stand, ein Anhang in einer Nachricht. Solche
> Kopien sind Momentaufnahmen; sie wandern nicht mit. Wer auf ihnen aufbaut,
> eröffnet Erledigtes erneut.
>
> **Das ist am 10.09.2026 passiert.** Die Überarbeitung setzte auf einer Kopie vom
> 21. August auf statt auf der Repository-Fassung vom 2. September. Acht bereits
> abgehakte Punkte standen dadurch wieder offen, und bei den Vorschaubildern kam
> eine Aussage über einen Zustand dazu, der nie angesehen worden war. Beim
> Zusammenführen wurden alle acht gegen die Wirklichkeit nachgemessen, nicht gegen
> die alte Datei.
>
> **Vor dem Bearbeiten: `git pull`. Nach dem Bearbeiten: committen.**

> **Zu den zwei Ständen:** Zwischen dem 21. August und heute liegen der
> Webflow-Umzug, der Startseiten-Tausch auf light-creators.com und eine
> vollständige Rechtstext-Prüfung auf beiden Domains. Neu hinzugekommene Punkte
> sind mit **NEU** gekennzeichnet.

---

## Dringend

- [ ] **NEU · Die Next-Gen-Tür endet in einer Sackgasse.**
  Alle drei Next-Gen-Einstiege auf der neuen Startseite von
  light-creators.com zeigen auf `/the-art-and-practice-of-a-flourishing-life`.
  Diese Seite trägt das Eyebrow „FÜR ELTERN · VERTRAULICH", spricht in
  Sie-Form über junge Menschen statt mit ihnen, und hat **null ausgehende
  Links**. Ein Neunzehnjähriger, der auf „Ich suche meinen Weg" klickt,
  landet dort.
  Wird in Phase 2.5 durch `/next-gen` gelöst. Falls das länger als ein paar
  Tage dauert: die drei Einstiege vorübergehend auf Threshold umhängen.
  Der jetzige Zustand ist schlechter als kein Link.

- [ ] **NEU · Founder-Route ist blind.**
  `/founder`, `/quiz` und `/call` tragen kein einziges Tracking-Attribut.
  Der site-weite Binder ist aktiv, es fehlen nur die Attribute.
  Solange nicht gemessen wird, kein Freeze — ein Freeze ohne Messung friert
  genau den Zustand ein, über den man nichts lernt.
---

## Sofort, unabhängig vom Relaunch

- [x] **Impressum und Datenschutzerklärung inhaltlich erstellen.** Erledigt,
  gegen die Live-Domain geprüft am 04.09.2026, erneut am 10.09.2026.
  `/impressum/`, `/datenschutz/`, `/agb/`, `/widerruf/` und `/ki-einsatz/`
  antworten alle mit 200 und tragen echten Text, keine Platzhalterzeichen.
- [x] **AGB entscheiden.** Erledigt. `/agb/` steht auf davidliebnau.com
  (13.383 Zeichen, HTTP 200) und ist verlinkt, der Text ist durch die
  juristische Durchsicht gegangen. Offen bleibt davon getrennt, ob für die
  Threshold-Buchung eigene Bedingungen nötig sind; das hängt am Piloten und
  steht unter „Hängt am Abschluss der Pilotkohorte".
- [x] **Platzhalterkasten auf den Rechtsseiten entfernt.** Erledigt vor dem
  01.09.2026. Alle fünf Rechtsseiten tragen echten Text, stehen nicht mehr auf
  `noindex` und sind in der Sitemap. Am 10.09.2026 gegengeprüft: null
  Platzhalterzeichen in allen fünf Dateien.
- [x] **`.who-exclusion` geprüft — kein Platzhalter.** Erledigt am 10.09.2026.
  Der Kasten steht in `fuehren/index.html:231` und `fuehren/en/index.html:231`
  und enthält **fertigen Text** („Für Standardtrainings von der Stange…"). Er
  bleibt. Der Punkt ist beantwortet, nicht offen — hier festgehalten, damit er
  beim nächsten Durchgang nicht erneut als Verdacht auftaucht.
- [x] **Eigene Bilder für die Vorschau (og:image).** Erledigt am 02.09.2026.
  `/fuehren/` und `/fuehren/en/` tragen seit dem 03.09.2026 je eine eigene
  gebaute Karte: `assets/og-fuehren-de.jpg` und `assets/og-fuehren-en.jpg`.
  **Am 10.09.2026 im Markup gegengeprüft** — es läuft dort *nicht* das Bild der
  Startseite mit. `/threshold/partner/` und `/threshold/partner/en/` tragen
  `assets/og-image-threshold-partner.jpg`. Alle mit `og:image:width`,
  `og:image:height` und `twitter:image`.
- [x] **og:image der Threshold-Hauptseiten.** Erledigt am 04.09.2026.
  `/threshold/` und `/threshold/en/` tragen gebaute Karten,
  `assets/og-threshold-de.jpg` und `-en.jpg`. Die Regel kein automatisches
  Beschneiden ist gewahrt: `threshold/og-image.jpg` bleibt unverändert und
  dient als Quelle. Die Wahl des Motivs bleibt eine offene Frage, siehe BACKLOG.

- [ ] **NEU · Meta-Angaben auf `/founder` aktualisieren.**
  Am 10.09.2026 an der Live-Seite gemessen, und der Befund ist schärfer als
  zunächst notiert:
  - Titel: `Light Creators Tribe | Founder Resonance Assessment`. **Widerspricht
    R-L**, wonach durchgängig *Light Creators* im Seitentitel stehen soll; R-U
    nimmt davon ausdrücklich nur das Logo aus, nicht den Titel.
  - **Keine** Meta-Description.
  - **Kein `og:image` und kein `og:title`** — nicht ein altes, sondern gar keins.
    Beim Teilen entsteht damit keine Vorschaukarte.
  - Zwei `<h1>` und **kein einziges `<h2>`** (dazu 5 × h3, 5 × h4, 21 × h5).
    R-Z hält die Seite mit „ein H1" für verifiziert; gemessen sind es zwei.
    Kein Fehler, der etwas kaputtmacht, aber die Gliederung springt.

---

## Aus dem Relaunch heraus, kurzfristig

- [x] **Zieladressen der Buttons festgelegt.** Alle laufen auf
  `mail@davidliebnau.com`, unterschieden über die Betreffzeile. Seit dem
  Phase-1-Sprint kommen acht weitere Betreffzeilen für die vier Nachfragewege
  dazu. Kein Formulardienst, kein Kalenderlink.
- [x] **LinkedIn-Empfehlungen: entschieden und abgeschlossen bei sechs.**
  Erledigt am 04.09.2026. Auf `/fuehren/` und `/fuehren/en/` stehen sechs
  Zitate, jedes inline bei der Aussage, die es belegt: Sinyan und Harz bei den
  Ergebnissen, Euteneuer bei „Einzelarbeit auf Geschäftsführungsebene", Szücs
  bei „Programme", Kling und Rufnak im Belege-Abschnitt. Die Obergrenze von
  fünf aus dem Ursprungsbriefing wurde am selben Tag aufgehoben. **Am
  10.09.2026 gegengeprüft:** sechs Porträts im Markup. Der Punkt ist
  geschlossen, nicht wartend. Regel R2 ist über `assets/award-context.js`
  technisch abgesichert.
- [x] **Partnerschaftswege für `/threshold/partner/` freigegeben.** Die vier
  Wege der Zusammenarbeit stehen auf Zahler formuliert, dazu seit dem
  Phase-1-Sprint vier Nachfragewege für die Anfrage selbst.

- [ ] **NEU · Belege für die Zahlen auf `/founder`.**
  „8/10 Logic, 4/10 Resonance, ca. 70 %" sind eigene Beobachtungsdaten.
  Entweder belegbare Grundlage nachliefern oder vorsichtiger formulieren,
  bevor die Seite eingefroren wird.

---

## Vor dem Merge

- [ ] **Visueller Abnahmedurchgang.** Alle geänderten Seiten einmal in echt
  durchsehen, auf Desktop und Mobil.
- [ ] **`/fuehren/` und `/threshold/partner/` müssen existieren.**
  Bis dahin laufen vier Links auf der Startseite ins Leere. Der Pull Request
  darf vorher nicht gemergt werden.
- [ ] **Generator-Sperre ist ungetestet.** Bei Gelegenheit einmal
  `node generate-episodes.js` ohne `--force` ausführen und prüfen, dass
  sauber abgebrochen wird.
---

## Datenschutz und Geschwindigkeit

- [x] **NEU · Spotify-Player auf Klick-zum-Laden umgestellt.** Erledigt am
  10.09.2026, Commit `98e1f87`, live. Alle drei Vorgaben eingehalten: Der
  Platzhalter sieht aus wie Teil der Seite (Cover, Reihentitel, Abspielsymbol,
  **kein Datenschutztext auf dem Knopf**), der sachliche Hinweis steht klein
  darunter, und die **Entscheidung wird nicht gespeichert** — kein
  `localStorage`, kein Cookie, ein Klick je Seitenaufruf.
  Gemessen in drei Zuständen: vor dem Klick **0** Anfragen an
  `open.spotify.com`, nach dem Klick **1**, nach Neuladen wieder **0**;
  `document.cookie` und `localStorage` in allen drei Zuständen leer.
  Abschnitt 8 der Datenschutzerklärung entsprechend zurückangepasst.
- [x] **Dabei gefunden: Episodenabruf bei Apple.** Erledigt am 10.09.2026,
  Commit `efe0494`. `/podcast.html` ruft beim Seitenaufruf die öffentliche
  Podcast-Schnittstelle von Apple ab. **In früheren Messungen unsichtbar**,
  weil die Antwort im `sessionStorage` liegt — bei warmem Zwischenspeicher
  entsteht gar keine Anfrage. Als Abschnitt 9 in die Datenschutzerklärung
  aufgenommen. Ob der Abruf entfallen soll, ist eine Produktentscheidung
  (RF-23), keine Textkorrektur.
- [ ] **NEU · Ladezeit messen**, vorher und nachher, auf Mobil über Mobilfunk.
  Geschwindigkeit hat hohe Priorität. Der Player-Umbau sollte hier messbar
  wirken: Die Podcast-Seite zieht beim Aufruf kein Fremd-Dokument mehr.

---

## Nach Abschluss der Gestaltungsiteration

- [ ] **NEU · Bildoptimierung light-creators.com.**
  Alle Bilder der Startseite auf die tatsächliche Anzeigegröße bringen,
  Qualität 78, progressive JPEGs. Erwartete Ersparnis 60 bis 70 Prozent
  des Bildgewichts.
  Voraussetzung: Die Bildauswahl steht fest, sonst doppelte Arbeit.
  Teilweise erledigt: Naturfoto der Origin Story von 1441 auf 504 KB.
- [ ] **NEU · Regel für neue Bilder durchsetzen.**
  Nie breiter als das Doppelte der Anzeigebreite, nie über 500 KB,
  JPEG Qualität 78, progressiv. Gilt für alles, was ab jetzt gebaut wird.
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
---

## Englische Fassungen

- [ ] **Neue Texte auf davidliebnau.com übersetzen.**
  Im Relaunch wurden auf den englischen Seiten nur Signaturzeile, Navigation
  und die Award-Formulierung angeglichen. Die neuen Abschnitte fehlen dort.
- [ ] **Englische Partnerseite `/threshold/en/partner/`.**
  Solange sie fehlt, bleibt der englische Partnerblock auf der
  Threshold-Seite stehen.
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

- [ ] **NEU · Nicht öffentliche Seiten auf light-creators.com absichern.**
  `/old-home-2`, `/quiz-copy` und `/lp2-quiz-admin` sind öffentlich
  erreichbar und indexierbar. Entweder auf noindex setzen oder entfernen.
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

- [ ] **Weitere Tribe-Profile.**
  Drei stehen im CMS: Angelina Reichel, David Liebnau, Finn Trigo.
  Jedes weitere braucht Foto, Rolle und beide Antworten in DE und EN,
  dazu die dokumentierte Zustimmung der Person.

---

## Offene Rückfragen bei Claude Code

Stand 10.09.2026: **sechs offen, sechzehn geschlossen.**

- **RF-5, RF-6, RF-8** — Phase 3, Markenentscheidungen zum Founder-Material
- **RF-7** — **gesperrt bis Nachweis.** Die acht namentlichen Kundenstimmen sind
  ohne Freigabenachweis je Person nicht verwendbar. Nicht „ungeklärt", sondern
  nicht verwendbar.
- **RF-13** — von Entscheidung zu Prüfschritt umgeschrieben.
  `light.home.david.click` ist der erste getaggte externe Link auf der
  Startseite und dient als Testfall für Plausibles Outbound-Aufschlüsselung.
- **RF-23 · NEU** — soll der Episodenabruf bei Apple auf `/podcast.html`
  entfallen und die Liste allein aus `episodes-meta.json` gebaut werden? Dann
  kein Fremdaufruf mehr, aber die Liste aktualisiert sich nicht mehr von selbst.

---

## Erledigt

**September 2026**

- [x] **10.09.** Startseiten-Tausch auf light-creators.com vollzogen.
      Neue Struktur: `/` Marken-Hub deutsch, `/en` Marken-Hub englisch,
      `/founder` Founder Resonance deutsch, `/founder-en` englisch (neu),
      `/old-home-2` alte Startseite. `/v3` und `/v3-en` existieren nicht mehr.
- [x] **10.09.** Datenschutzerklärung light-creators.com neu geschrieben.
      Google Analytics, Google Fonts, reCAPTCHA, YouTube, Vimeo und ein
      Cookiebot-Fehlertext standen darin, ohne dass irgendetwas davon lief.
      Ersetzt durch den gemessenen Ist-Zustand.
- [x] **10.09.** Adobe Fonts von light-creators.com entfernt.
      Lief unbemerkt aus der Iris-Vorlage mit und schickte bei jedem
      Seitenaufruf ein Zählpixel an Adobe. Gemessen bestätigt: acht
      Anfragen weniger pro Seitenaufruf.
- [x] **10.09.** Rechtstexte davidliebnau.com geprüft — gemessen, nicht
      gelesen. Sieben Seiten mit Netzwerkaufzeichnung. Ergebnis: nur
      Plausible und Spotify laden fremd. Impressum vollständig.
- [x] **10.09.** Fünf englische Anker von `/founder` auf `/founder-en`
      umgehängt. Es waren fünf, nicht vier: `fuehren/en/index.html` trug einen
      weiteren, der in der Aufgabenstellung nicht genannt war.
- [x] **10.09.** Spotify-Player auf Klick-zum-Laden umgestellt, Apple-Abruf in
      der Datenschutzerklärung benannt. Siehe „Datenschutz und Geschwindigkeit".
- [x] **10.09.** Diese Datei aus zwei auseinandergelaufenen Ständen
      zusammengeführt, acht fälschlich wiedereröffnete Punkte gegen die
      Wirklichkeit nachgemessen und mit Datum zurückgeholt.
- [x] **10.09.** `ep-28` geprüft: `light-creators.com/quiz` und `/call`
      existieren nach dem Umzug unverändert. Die Links brechen nicht.
- [x] **09.09.** Englische Fassung der neuen Startseite gebaut,
      Sprachumschaltung DE/EN in beiden Navigationen.
- [x] **08.09.** Tribe-Sektion an das CMS gebunden, drei Profile.
- [x] **08.09.** Meta Pixel von light-creators.com entfernt.
      Die Site setzt seitdem keine Cookies und braucht kein
      Einwilligungsbanner.
- [x] **03.09.** Umzug der Founder-Inhalte auf light-creators.com
      abgeschlossen, alle sieben Schritte.
- [x] **03.09.** Impressum und Datenschutzerklärung für davidliebnau.com
      stehen inhaltlich.

**August 2026**

- [x] Positionierung und Klammer festgelegt: Bewusstes Leadership an
      kritischen Wendepunkten
- [x] Seitenarchitektur festgelegt: Startseite für Entscheider und Zahler,
      `/fuehren/` neu, `/threshold/partner/` neu, Founder auf
      light-creators.com
- [x] Alle Startseitentexte abgestimmt
- [x] Vier Symbole der schöpferischen Dialoge gestaltet und im Repository
- [x] Briefing für Claude Code geschrieben und übergeben
- [x] Rückfragen 1 bis 10 von Claude Code beantwortet
