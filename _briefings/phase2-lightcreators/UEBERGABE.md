# CC-8 · Übergabepaket Phase 2 · `light-creators.com`

**Aufgabe:** CC-8 aus `phase2-lightcreators-claude-code.md`
**Stand:** 10. September 2026. Nach **F1**, **F2**, den Regeln **R-W bis R-Z**, dem Merge aller 75 Anker und dem Fortfall von **OD-1b**.
**Branch:** `phase2-zulieferungen`, Stand `main` bei `ebdab50`
**Charakter:** **Zwischenstand.** Abgeschlossen wird CC-8 nach S9. Fortgeschrieben am 04./05.09.2026.

> **Ein leeres Feld ist kein Ergebnis; eine benannte Lücke schon.** Abschnitt 5 gehört
> genauso zur Lieferung wie Abschnitt 2.

---

## 1. Wo alles liegt

```
/Users/liebnaudavid/light-creators/_briefings/phase2-lightcreators/
```

Sichtbar nur mit ausgechecktem Branch `phase2-zulieferungen` — auf `main` existiert das
Verzeichnis nicht.

**Seit dem 04.09.2026 auf GitHub**, das Paket liegt nicht mehr nur auf einer Platte:

| Branch | Inhalt | Zustand |
|---|---|---|
| [`phase2-zulieferungen`](https://github.com/Iris-Cocreative/light-creators/tree/phase2-zulieferungen/_briefings/phase2-lightcreators) | dieses Paket | gepusht, **nicht** für `main` bestimmt |
| ~~`founder-pfad-umhaengen`~~ | 74 Anker + Generatorvorlage auf `/founder` | **erledigt, Branch überholt** — siehe 4.1 |
| [`analytics-reach-schwellwert`](https://github.com/Iris-Cocreative/light-creators/tree/analytics-reach-schwellwert) | Reach-Schwellwert 0,25 → 0,4 | gepusht, **mergefähig** |

---

## 2. Die Dateien

| Datei | Aufgabe | Zweck | Status | Gültig ab |
|---|---|---|---|---|
| `copy-lightcreators-home.md` | CC-1 | 110 Body-Strings mit Provenance und Linkzielen, dazu die vier SEO-Texte | **fertig, F2 eingearbeitet** | sofort |
| `symbole/01…04-*.svg` | CC-2 | vier Symbole, `currentColor`, ViewBox 240×240 | **fertig** | sofort |
| `symbole/symbole-README.md` | CC-2 | Farbe, Einbau, Barrierefreiheit, Kontrast-Gegenprobe | **fertig** | sofort |
| `analytics-lightcreators-home.md` | CC-4 | Eventspezifikation, Goal-Liste, Register, Namensregel Weg B | **fertig** | Einbau nach Publish |
| `snippets/plausible-events.js` | CC-4 | Klick-Listener, ohne Properties | **fertig** | Einbau nach Publish |
| `snippets/plausible-scroll.js` | CC-4 | Scrolltiefe, `threshold: 0.4` | **fertig** | Einbau nach Publish |
| `linkreport-lightcreators.md` | CC-6 | drei Listen, Redirect-Lage, Umhänge-Plan | **fertig, umgesetzt** | war fällig vor F1 |
| `founder-material-inventar.md` | CC-7 | Bestand `_archiv/`, drei Rollenbilder | **fertig** | Phase 3 |
| `UEBERGABE.md` | CC-8 | dieses Dokument | **Zwischenstand** | wird nach S9 abgeschlossen |
| ~~`bilder/`~~ | ~~CC-3~~ | ~~Hero-Collage, OG-Bild~~ | **entfallen (R-Y)** | — |
| ~~`bild-manifest.csv`~~ | ~~CC-5~~ | ~~Alt-Text-Entwürfe~~ | **entfallen (R-Y)** | — |

Zwölf Dateien, alle fertig. **CC-3 und CC-5 sind mit R-Y aus diesem Strang heraus** — das
Bildmaterial kam über den Chat, deshalb laufen Aufbereitung, Grading und Alt-Texte über den
Webflow-Strang. Es fehlt hier nichts mehr.

### Was der Webflow-Strang wo abholt

| Übergabe | Datei | Fällig |
|---|---|---|
| I-1 Copy | `copy-lightcreators-home.md` | **jetzt** |
| I-2 Symbole | `symbole/` — vier SVG, **inline einbetten, kein Upload** (R-K) | **jetzt** |
| ~~I-3 Bildpaket~~ | entfällt, R-Y | — |
| I-4 Analytics | `analytics-lightcreators-home.md` + `snippets/` | **jetzt** |
| I-5 Linkbericht | `linkreport-lightcreators.md` | geliefert, floss in F1 ein |

**Alle noch offenen Übergaben sind fällig.** Das Paket wartet auf nichts mehr.

---

## 3. Was F2 an diesem Paket geändert hat

| Regel | Wirkung |
|---|---|
| **R-L / R-M** | `S1.EYEBROW`: LIGHT CREATORS TRIBE → **LIGHT CREATORS**, Status `HIS/EXISTING` → **REWRITTEN**. Der einzige umgeschriebene Bestandsstring des Pakets. |
| **R-N** | Navigation neu: `NAV.3` ist jetzt das Aufklappmenü **Wege**, die bisherigen `NAV.3`/`NAV.4` heißen `NAV.3a`/`NAV.3b`, **`NAV.5` „About“ ist gestrichen**. |
| **R-O** | „Next Gen“ bestätigt → **OD-6 erledigt**, `S6.NG.CTA` ist `fest`. |
| **R-P** | Vier SEO-Texte freigegeben → neuer Abschnitt „Seiteneinstellungen“ → **OD-10 erledigt**. |
| **R-Q** | `S7.H2` ist ein **visuell verstecktes** Heading „Light Creators Tribe“; die drei großen Wörter werden als `S7.DEKO` mit `aria-hidden` geführt. |
| **R-T** | Kontrastregel gegen die Symbole gegengeprüft, Ergebnis in `symbole-README.md`. |
| **R-V** | S-P0 ausgeführt; die Analytics-Spezifikation nennt nur noch zwei Resthandgriffe. |
| **R-W** | R-E aufgehoben → die drei gesperrten Rückfragen umgesetzt (Abschnitt 4). |
| **R-Y** | CC-3 und CC-5 entfallen. |

**Statusbilanz der Copy-Datei:** 108 `fest`, **3 offen** — und alle drei gehören ins
Tribe-Paket (`S5.P4`, `S5.LABEL.A`, `S5.LINK`). Außerhalb des Tribe ist kein String mehr
freigabe-offen.

---

## 4. Was nach R-W umgesetzt wurde

R-E ist aufgehoben, damit waren drei bis dahin gesperrte Punkte frei. Alle drei sind
erledigt, jeder auf **eigenem Branch**, damit sie einzeln zurücknehmbar bleiben.

### 4.1 Die 74 Anker auf `/founder` — `founder-pfad-umhaengen`

Commit `01e0f3f`. **76 Ersetzungen in 36 Dateien**, davon 74 ausgelieferte Anker und 2 in
`tools/generate_episode.py` (ohne die Vorlage kehrt der alte Pfad mit der nächsten Episode
zurück).

Geprüft: 76 Zeilen raus, 76 rein, **jede unterscheidet sich ausschließlich im `href`** —
Linktexte, Plausible-Klassen und Attribute unverändert.

| Bewusst nicht angefasst | Grund |
|---|---|
| `/en` (32), `/quiz` (8), `/call` (6) | R-J, und beide Pfade sind stabil |
| nackte URLs in ep-28, ep-29, `content/ep-29.txt` | zeigen auf `/quiz` und `/call`, **nicht** auf die Wurzel — sie brauchen keine Änderung |
| `_archiv/index-en-alt.html` (2) | Archiv, nicht ausgeliefert |
| `landing-pages/flourishing-life-eltern-v2.html` (1) | `noindex`, unverlinkt, hängt an **RF-17** |

#### Gemergt und live seit dem 06.09.2026

Das Gate aus R-X wurde vor dem Merge geprüft, nicht vorausgesetzt: `/founder` antwortete mit
**HTTP 200**, 16 KB Inhalt, ohne Weiterleitung und ohne `noindex`. Danach Fast-Forward auf
`main`, Commit **`67ae2b3`**, veröffentlicht.

**Live gegengeprüft** (Stichprobe über Startseite, Podcast, `/fuehren/`, zwei Episoden,
`index-en.html`, `/fuehren/en/`): Alle Anker zeigen auf `/founder`; `/en`, `/quiz` und
`/call` unverändert. Alle vier Zielpfade antworten mit 200.

> **Ein Fehler, der vor dem Veröffentlichen gefunden wurde.** Der ursprüngliche Commit auf
> `founder-pfad-umhaengen` (`01e0f3f`) enthielt **40 statt 36 Dateien**: ein `git add -A`
> hatte vier unversionierte Dateien mitgenommen — zwei Testimonial-PNG und die beiden
> Briefing-Dokumente. Geprüft: die PNG werden von keiner Seite referenziert (alle Seiten
> nutzen `.webp`, und die sind seit `ebdab50` versioniert). Weil `main` noch nicht gepusht
> war, wurde der Commit mit exakt den 36 beabsichtigten Dateien neu gebaut. Der Branch
> `founder-pfad-umhaengen` trägt weiterhin die fehlerhafte Fassung und **kann gelöscht
> werden**. Lehre fürs nächste Mal: in einem Repository mit unversionierten Arbeitsdateien
> nicht `git add -A`, sondern die Pfade nennen.

### 4.2 Reach-Schwellwert — `analytics-reach-schwellwert`

Commit `cfb3e75`. `threshold_price_scroll` und `threshold_faq_seen` feuerten bei 0,25, die
neuen Reach-Events bei 0,4. Vier Fundstellen, zwei je Sprachfassung, jetzt einheitlich 0,4.
Geändert ist nur der Schwellwert; Beobachterlogik, Eventnamen und `disconnect()` bleiben.

**Nebenwirkung, bewusst:** Beide Events feuern künftig später und damit seltener. Die
Zeitreihe hat am Publish-Datum einen Bruch. **Dieser Branch ist mergefähig** — er hängt an
keinem Webflow-Schritt.

### 4.3 Weg B festgeschrieben

Neuer Abschnitt **7.2a** in der Analytics-Spezifikation: 19 Altnamen bleiben, Neues auf
`davidliebnau.com` bekommt `david.`, Neues auf `light-creators.com` `light.` — mit einem
Beispiel für den nächsten Fall, damit die Regel nicht neu hergeleitet werden muss.

---

## 5. Was offen bleibt — und warum

### 5.1 Nicht überprüfbar aus diesem Repository

- ~~Neun der zehn Goals fehlen~~ — **erledigt 09.09.2026: alle elf sind angelegt und
  verifiziert**, einschließlich des neuen `light.home.david.click`.
- ~~Drei überflüssige Custom Properties~~ — **abgegeben an den Webflow-Strang**, dort
  angestoßen (ex-RF-12). Der Punkt bleibt sachlich richtig: Sie funktionieren in der
  laufenden Trial und verschwinden beim Wechsel auf Growth, eine gelungene Probe jetzt
  beweist nichts über nachher. Er wird nur woanders erledigt.
- **Der Einbau der Snippets im Browser.** Geprüft ist ihre Logik gegen eine DOM-Attrappe,
  nicht ihr Einbau. **Teilweise aufgelöst:** Für die Symbole liegt der Einbaunachweis
  inzwischen vor (42 SVG-Elemente, `currentColor`, `aria-hidden` — siehe RF-16). Für die
  beiden Plausible-Snippets steht er weiterhin aus.

### 5.2 Außerhalb dieser Phase

- **Tribe-CMS** (R-G): kein Importschema, keine Feldliste, keine Portrait-Alt-Texte.
- **Bilder** (R-Y): über den Webflow-Strang.
- **Rechtstexte `light-creators.com`**: über die Anwaltsprüfung. Anderer Hoster als GitHub
  Pages, kein ProvenExpert, kein Pixel mehr — siehe 10.2.
- **Das Logo** (R-U): bleibt vorerst „Light Creators Tribe“, obwohl das R-L widerspricht.
  Die Adaption macht später ein Designer.

---

## 6. Geprüft, mit Datum und Methode

| Was | Wie | Ergebnis |
|---|---|---|
| Copy gegen Anhang A | maschineller Abgleich, 03.09. | 110 IDs deckungsgleich, zeichengenau |
| Genau ein `Level 1` | `grep`, 03.09. | erfüllt, acht `Level 2` |
| CTA-Linkziele | `grep`, 03.09. | kein `linkziel: OFFEN` mehr |
| Snippets | JavaScriptCore + DOM-Attrappe, 03.09. | 6 Klick-Events mit je **einem** Argument, 4 Reach-Events genau einmal, keine Fehler |
| SVG-Validität | XML-Parser, 03.09. | alle vier fehlerfrei |
| Symbolsatz nach R-K | `grep`, 03.09. | kein `linearGradient`, kein `#E3C486` |
| Zielpfade | live, 03.09. | 11× 200; `/tribe`, `/about` 404 |
| CTA-Ziele aus R-I | live, 03.09. | `/the-art-and-practice-of-a-flourishing-life` **200**, `/founder` **404** (erwartet) |
| Eventbestand | maschinell aus dem Code, 04.09. gegen `ebdab50` | **19**, unverändert |
| Umhänge-Diff | Paarabgleich jeder Diff-Zeile, 04.09. | 76/76, nur `href` verschieden |
| Reach-Diff | `git diff`, 04.09. | 4/4, nur der Schwellwert |
| SEO-Zeichenlängen | gemessen, 04.09. | 39 / 157 / 49 / 75 — alle innerhalb der Anzeigegrenzen |
| Berichte gegen neuen `main` | 04.09. | Zeilennummern und Anzahlen unverändert |
| Originale unberührt | `git status`, 04.09. | `briefing/`, `assets/icons/`, `_archiv/` unverändert |

---

## 7. Rückfragen — Stand 09.09.2026

Von den elf offenen Punkten sind **neun geschlossen**, einer abgegeben, einer bleibt.

### 7.1 Was noch offen ist

| ID | Art | Inhalt |
|---|---|---|
| **RF-13** | **Prüfschritt, keine Entscheidung** | Ob Plausible Growth die Ziel-URL bei Outbound-Links aufschlüsselt, lässt sich nicht herleiten, nur messen: einen getaggten externen Link klicken und im Dashboard nachsehen. **`light.home.david.click` ist genau so ein Link** — der Test geht damit, sobald die Startseite live ist, ohne aufs Tribe-Paket zu warten. |
| **RF-7** | **Sperre, keine Frage** | Die acht namentlichen Kundenstimmen sind **nicht freigegeben** und damit nicht verwendbar — weder auf `light-creators.com` noch in Phase 3 —, bis ein Nachweis **je Person** vorliegt. Offen ist allein, ob ein solcher Nachweis außerhalb des Repositories existiert. |
| **RF-22** | **Entscheidung** | 32 Anker auf `light-creators.com/en` in der Fußzeilenspalte „English“: auf `/founder-en` umhängen (dann müssen 32 Linktexte mit, weil dort die nackte Adresse als Text steht) oder auf dem Marken-Hub belassen? Siehe 11.3. |
| **RF-5, RF-6, RF-8** | **Phase 3** | Markenentscheidungen zum Founder-Material, keine technischen Fragen. Bleiben stehen, wo sie stehen. |

### 7.2 Was geschlossen wurde

**Konvention:** `**RF-n**` heißt offen, `~~RF-n~~` heißt geschlossen — paketweit, damit ein Grep die Wahrheit sagt.

| ID | Ergebnis |
|---|---|
| ~~RF-11~~ | Absicht, keine Auslassung. Das Label gehört zur **Vorlage**, nicht zur Person — also ins Template, nicht in die CMS-Collection. |
| ~~RF-16~~ | Richtig entschieden **und im Einbau verifiziert**: 42 SVG-Elemente, `currentColor` erhalten, `aria-hidden` gesetzt, `role`/`aria-label` entfernt. Mit fest eingeschriebener Farbe wäre der Vorteil weg gewesen. |
| ~~RF-17~~ | Mitnehmen. Umgesetzt, Commit `330ce2a`. |
| ~~RF-19~~ | Zehn, nicht dreizehn — die Dreizehn stammte aus einer überholten Briefing-Fassung. Die zwei gestrichenen Events kommen **nicht** zurück. |
| ~~RF-21~~ | Dunkler Grund: Midnight Blue. Auf hell wären die inneren Ringe verschwunden. |
| ~~RF-12~~ | **Abgegeben.** Die drei Custom Properties laufen über den Webflow-Strang. Nicht mehr auf dieser Liste. |
| ~~RF-9~~, ~~RF-10~~ | schon am 03.09. durch R-K geschlossen. |
| ~~RF-1~~ – ~~RF-4~~, ~~RF-15~~, ~~RF-18~~ | schon am 03./04.09. geschlossen. |

## 8. Nächste Schritte

| Wer | Was |
|---|---|
| ~~Webflow~~ | ~~`/founder` publishen~~ · erledigt 05.09. |
| ~~Claude Code~~ | ~~74 + 1 Anker umhängen~~ · erledigt, `67ae2b3` und `330ce2a`, live |
| ~~David~~ | ~~elf Goals anlegen~~ · erledigt 09.09. |
| **David** | `analytics-reach-schwellwert` mergen — hängt an nichts |
| **David** | Branch `founder-pfad-umhaengen` löschen (überholt) |
| **David** | vier unversionierte Dateien: committen oder ignorieren (siehe 9.3) |
| **Webflow** | drei Custom Properties in Plausible löschen (ex-RF-12) |
| **Webflow** | zwei H1 und fehlende h2-Ebene auf `/founder`, Seitentitel gegen R-L (siehe 9.3) |
| **Anwaltsprüfung** | Rechtstexte `light-creators.com` neu — anderer Hoster, kein ProvenExpert, kein Pixel. **Nicht dieser Strang.** |
| **Tribe-Paket** | RF-13 messen, RF-11 umsetzen, RF-7 nur mit Nachweis |

## 9. Zwei Hinweise zum Arbeitsstand

**Parallele Sitzungen.** Am 03.09.2026 arbeiteten zwei Claude-Code-Sitzungen im selben
Verzeichnis; zwei Commits (`0480a73`, `c2fd6ff`) stammen aus der zweiten. Ihr Beitrag zur
Analytics-Spezifikation — Trial-Falle und Zahlendifferenz — ist vollständig erhalten. Zwei
Folgen sind aufgetreten und behoben: `c2fd6ff` änderte `BACKLOG.md` (damals R-E-Bruch, nach
dem Merge identisch zu `main`, im Ergebnis folgenlos), und beide Sitzungen vergaben die
Nummer **RF-14** an verschiedene Fragen — die der zweiten Sitzung heißt jetzt **RF-19**.

Ursache war, dass `git checkout` fürs ganze Arbeitsverzeichnis gilt, nicht pro Sitzung. Seit
dem 04.09. arbeitet die zweite Sitzung in einem eigenen `git worktree`. **Ab jetzt gilt:
nur eine Sitzung gleichzeitig.**

**Reversibilität.** Das Zulieferungspaket besteht ausschließlich aus neuen Dateien in einem
eigenen Verzeichnis. Die beiden Eingriffe in den Bestand liegen auf getrennten Branches und
sind einzeln zurücknehmbar. Kein bestehendes Artefakt wurde überschrieben.

### 9.3 Zwei Befunde, die nicht in dieses Repository gehören

**`/founder` hat zwei H1 und keine h2-Ebene.** R-Z hält die Seite mit „31 Überschriften,
sieben Sektionen, ein H1" für verifiziert. Live gemessen am 05. und 06.09.2026, nach Abzug
von Kommentaren, `<script>` und `<style>`: **33 Überschriften, zwei H1, kein h2** — dazu
5× h3, 5× h4, 21× h5.

| H1 | Wortlaut |
|---|---|
| 1 | Warum glauben Investoren deiner Vision nicht? |
| 2 | Finde deinen größten Hebel |

Zwei H1 machen nichts kaputt, schwächen aber die Dokumentstruktur, und die übersprungene
h2-Ebene lässt die Gliederung für Screenreader-Nutzer springen. Die Seite ist ein Duplikat
der alten Startseite; der Befund gilt damit vermutlich auch für die Wurzel, solange sie
nicht ersetzt ist.

**Der Seitentitel widerspricht R-L.** Er lautet `Light Creators Tribe | Founder Resonance
Assessment`. R-L verlangt „durchgängig: Seitentitel … Light Creators"; R-U nimmt davon
ausdrücklich nur das Logo aus, nicht den Titel.

Beides ist Webflow-Arbeit und wurde von hier aus **nicht** angefasst — hier steht es nur,
damit es nicht zwischen zwei Strängen verlorengeht.

**Vier unversionierte Dateien** liegen weiter im Arbeitsverzeichnis: die beiden
Testimonial-PNG (Ausgangsmaterial, von keiner Seite referenziert) und die beiden
Briefing-Dokumente. Dazu eine `.DS_Store` in `assets/testimonials/`, die von keiner
`.gitignore`-Regel erfasst wird. Committen oder ignorieren ist Davids Entscheidung.

---

## 10. Nachtrag 09.09.2026 — was sich zum Abschluss von Phase 2 geändert hat

### 10.1 Elf Messpunkte statt zehn

Die neue **Origin-Story-Sektion** trägt einen Link „Mehr über David" auf
`davidliebnau.com`. Er bekommt `light.home.david.click`; das Goal ist angelegt.

Das ist nicht bloß ein Zähler mehr. **Es ist das einzige Event der Startseite, das die
Domain verlässt** — und damit das Gegenstück zu `outbound_light_creators_click`, das seit
Phase 0 in der Gegenrichtung zählt. Zusammen ergeben die beiden erstmals ein Bild des
Verkehrs **zwischen** den Domains statt zweier getrennter Inseln.

Nebeneffekt: **RF-13 wird früher prüfbar.** Es brauchte einen getaggten externen Link,
um Plausibles Outbound-Aufschlüsselung zu testen — der ist jetzt da, ohne aufs Tribe-Paket
zu warten.

### 10.2 OD-1b geschlossen: kein Meta Pixel, keine Cookies

Der Pixel ist auf Davids Entscheidung von `light-creators.com` entfernt. **Die Site setzt
keine Cookies mehr und fährt ausschließlich Plausible.** In der Analytics-Spezifikation und
im Linkbericht ist der Punkt gestrichen, nicht vertagt.

Die Rechtstexte für die Domain werden ohnehin neu geschrieben — anderer Hoster als GitHub
Pages, kein ProvenExpert, kein Pixel. Das läuft über die Anwaltsprüfung und **nicht über
diesen Strang**; es steht hier nur, damit die Verbindung sichtbar bleibt.

### 10.3 Zwei Seitenfassungen, und wie die Zweisprachigkeit gebaut ist

| Slug | Fassung | Wird später |
|---|---|---|
| `/v3` | deutsch | die **Wurzel** |
| `/v3-en` | englisch | **`/en`** |

Beide sind Entwürfe. **Für die 75 umgehängten Anker ändert sich nichts:** `/founder`
bleibt ihr Ziel, `/en` existiert heute und bleibt erhalten.

**Die Zweisprachigkeit läuft über Seitenpaare mit `-en`-Suffix, nicht über Webflows
eingebaute Lokalisierung.** Das ist dieselbe Bauweise wie auf `davidliebnau.com`
(`index.html` / `index-en.html`, `/fuehren/` / `/fuehren/en/`).

Zwei Folgen, die man kennen sollte:

- **Fürs Messen:** Deutsche und englische Fassung sind getrennte Seiten mit getrennten
  Seitenaufrufen. Bei Webflow-Lokalisierung lägen beide unter einem Pfad. Die Eventnamen
  sind davon unberührt — sie unterscheiden nach Weg, nicht nach Sprache, genau wie die
  19 Namen auf `davidliebnau.com`.
- **Für die Pflege:** Jede Textänderung ist zweimal zu machen. Das ist der Preis dieser
  Bauweise und auf der anderen Domain seit Phase 0 so.

### 10.4 Der Auftrag zum Selbsthosten der Schriften war hinfällig

`davidliebnau.com` hostet die Schriften längst selbst. Unabhängig gegengeprüft: keine
ausgelieferte Seite und kein ausgeliefertes Stylesheet lädt von `fonts.googleapis.com`
oder `fonts.gstatic.com`; 26 WOFF2 liegen unter `assets/fonts/`, eingebunden über
`@font-face`. David hat es zusätzlich über die Netzwerkaufzeichnung bestätigt — neun
Dateien je Seitenaufruf, kein Fremdaufruf. **Beide Zahlen stimmen: 26 liegen im
Repository, neun lädt eine einzelne Seite.**

Auslöser des hinfälligen Auftrags war eine **unabgehakte Abnahmeliste** in
`briefing/Briefing_Google-Fonts_und_Rechtstexte-v3_Claude_Code.md`. Sie ist jetzt
abgehakt (Commit `fea5e8d`), mit einer Korrektur: Das Kriterium „Grep liefert null Treffer
im gesamten Repository" ist in dieser wörtlichen Fassung **nicht erfüllbar** — es gibt zwei
Treffer, beide ohne Ladevorgang (maskierter Beispielcode in einem Webflow-Export, und ein
Kommentar in `assets/fonts.css`, der das Gegenteil festhält). Erfüllt ist, was gemeint war.

**Die Briefing-Datei wurde nicht gelöscht.** Sie dokumentiert eine juristisch veranlasste
Umsetzung und gehört zum Nachweis. Wenn sie trotzdem weg soll, ist das eine Entscheidung,
die jemand ausdrücklich treffen sollte.

---

## 11. Nachtrag 10.09.2026 — nach dem Startseiten-Tausch

### 11.1 Die Adressstruktur, wie sie jetzt live steht

| Adresse | Inhalt |
|---|---|
| `/` | Marken-Hub **deutsch** |
| `/en` | Marken-Hub **englisch** |
| `/founder` | Founder Resonance deutsch, unverändert |
| `/founder-en` | Founder Resonance englisch — **neu**, lag vorher auf `/en` |
| `/old-home-2` | die alte deutsche Startseite |
| `/the-art-and-practice-of-a-flourishing-life` | Next Gen |
| ~~`/v3`~~, ~~`/v3-en`~~ | existieren nicht mehr (404, geprüft) |

Alle sechs bestehenden Adressen am 10.09.2026 mit 200 geprüft, die beiden alten
Entwurfs-Slugs mit 404.

**Die Zweisprachigkeit läuft über Seitenpaare mit `-en`-Suffix, nicht über Webflows
Lokalisierung.** Das war zwischenzeitlich falsch geschlossen worden, weil
`locales.secondary` leer ist — ein leeres Feld beweist hier nichts, weil die Bauweise
gar nicht darüber läuft. Dieselbe Bauweise wie auf `davidliebnau.com`.

### 11.2 Fünf englische Anker umgehängt

Mit `/founder-en` gibt es erstmals eine englische Founder-Seite. Die englischen Anker
zeigten ersatzweise auf die deutsche `/founder`; englische Besucher landeten auf deutschem
Inhalt.

| Datei | Anker |
|---|---|
| `index-en.html` | 4 |
| `fuehren/en/index.html` | **1 — in der Aufgabenstellung nicht genannt** |

**Es waren fünf, nicht vier.** Beide Dateien führen `<html lang="en">`. Geprüft, dass in
keiner Datei mit `lang="en"` noch ein Anker auf `/founder` steht. Commit `e151313`.

Die 72 verbleibenden `/founder`-Anker stehen sämtlich auf deutschen Seiten und zeigen
richtig.

### 11.3 Offen: 32 Anker auf `light-creators.com/en`

Diese Adresse trug bis zum Tausch die **englische Founder-Seite** und trägt jetzt den
**Marken-Hub**. 32 Fundstellen zeigen weiter dorthin:

| Ort | Anzahl |
|---|---|
| `episodes/*.html` | 30 |
| `podcast.html` | 1 |
| `tools/generate_episode.py` | 1 |

Sie stehen alle an derselben Stelle: in einer Fußzeilenspalte mit der Überschrift
**„English"**, direkt unter „For international clients". Der Linktext ist die nackte
Adresse `light-creators.com/en`.

**Warum ich sie nicht angefasst habe.** Zwei Lesarten sind vertretbar, und sie führen zu
verschiedenen Zielen:

| Lesart | Ziel | Folge |
|---|---|---|
| Die Spalte ist das englische Gegenstück zum deutschen „Für Founder Resonance"-Link darüber | `/founder-en` | **Der Linktext müsste mit** — 32 Dateien, Text *und* Ziel |
| Die Spalte verweist auf „die englische Seite von Light Creators" | `/en`, bleibt | nichts zu tun |

Die erste Lesart ist die wahrscheinlichere — die Spalte stand neben dem Founder-Link und
`/en` *war* die Founder-Seite. Aber sie kostet eine Änderung an 32 Linktexten, und
Linktexte sind Inhalt, nicht Technik. **Das ist eine Entscheidung, keine Korrektur.**
Siehe RF-22.

### 11.4 Rechtstexte `davidliebnau.com` — gemessen, ein Fehler gefunden

Sieben Seiten mit Netzwerkaufzeichnung geprüft. **Es laden genau zwei Fremd-Hosts:**

| Host | Wo | Im Text |
|---|---|---|
| `plausible.io` | alle Seiten | Ziffer 6, korrekt beschrieben |
| `open.spotify.com` | **nur `/podcast.html`** | **fehlte** |

**Der Fehler war der Spiegelfall des Problems auf `light-creators.com`.** Dort standen
Dienste im Text, die nicht liefen. Hier lief einer, der als bloßer Verweis beschrieben
war: Das Spotify-Abspielfenster ist ein `iframe`, das **beim Seitenaufruf automatisch
lädt** und dabei die IP-Adresse überträgt — der Text führte Spotify unter „Verlinkte
Angebote" mit dem Satz „Beim Anklicken dieser Links verlässt du diese Website".

Behoben mit Commit `2a16985`: neuer Abschnitt 8 „Podcast-Player von Spotify", Ziffern
verschoben, Querverweise mitgezogen.

**Geprüft und richtig befunden, unverändert gelassen:** GitHub Pages als Hoster (Ziffer 2),
selbst gehostete Schriften (Ziffer 3), Plausible cookiefrei mit EU-Servern (Ziffer 6),
ProvenExpert lädt nichts nach (Ziffer 7).

**Nicht im Text und laufen auch nicht** — über alle 46 ausgelieferten Seiten gegengeprüft,
null Treffer: Google Analytics, gtag, Google Fonts, Adobe Fonts/Typekit, Meta Pixel,
reCAPTCHA, YouTube, Vimeo, Cookiebot. `document.cookie` ist auf jeder gemessenen Seite
leer.

**Impressum** vollständig: Anschrift, Telefon, E-Mail, USt-IdNr. `DE363826204`,
Verantwortlicher nach § 18 Abs. 2 MStV. Keine Änderung nötig.

**Eine Korrektur an deiner Vorgabe:** Plausible sitzt laut Handelsregister in **Tartu**
(Västriku tn 2, 50403), nicht in Tallinn. Der bestehende Text nennt Tartu und ist damit
richtig — ich habe ihn nicht „korrigiert".

### 11.5 Was daraus für `light-creators.com` folgt

- **Elf Messpunkte** auf der Startseite, `light.home.david.click` eingeschlossen.
- **Meta Pixel entfernt, OD-1b geschlossen**, keine Cookies, **kein Einwilligungsbanner
  nötig** — solange kein Embed hinzukommt, das wie das Spotify-Fenster ohne Klick lädt.
- **Adobe Fonts entfernt**, gemessen bestätigt.
- **Ein DPA nach Art. 28 DSGVO** ist bei Webflow außerhalb von Enterprise nicht separat
  abschließbar; es ist Bestandteil der Nutzungsbedingungen.
- Die Rechtstexte der Domain gehen über die **Anwaltsprüfung**, nicht über diesen Strang.

### 11.6 Die Lehre, als Verfahren

**Nachsehen statt annehmen.** Bei Rechtstexten heißt das: messen, was läuft, dann
schreiben, was gemessen wurde. Drei Fälle in zwei Wochen, alle nach demselben Muster:

| Fall | Angenommen | Gemessen |
|---|---|---|
| Google Fonts | müssten noch umgestellt werden | seit Langem selbst gehostet |
| `light-creators.com` | Analytics, Fonts, reCAPTCHA, YouTube, Vimeo laufen | nichts davon lief |
| Spotify | nur verlinkt | eingebettet, lädt ohne Klick |

Zweimal stand zu viel im Text, einmal zu wenig. Die Abweichung geht in **beide**
Richtungen — deshalb ist der Abgleich in beide Richtungen zu führen: kein Dienst genannt,
der nicht läuft, **und** kein Dienst geladen, der nicht genannt ist.

