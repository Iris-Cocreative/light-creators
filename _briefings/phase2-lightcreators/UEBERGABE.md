# CC-8 · Übergabepaket Phase 2 · `light-creators.com`

**Aufgabe:** CC-8 aus `phase2-lightcreators-claude-code.md`
**Stand:** 5. September 2026, nach **F1**, **F2**, **R-W** (Phase 1 live) und **R-Z**
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
| [`founder-pfad-umhaengen`](https://github.com/Iris-Cocreative/light-creators/tree/founder-pfad-umhaengen) | 74 Anker + Generatorvorlage auf `/founder` | gepusht, **wartet auf Signal** (R-X) |
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

> **⚠ Nicht mergen vor dem Webflow-Publish von `/founder`** (R-X). Die Seite ist angelegt
> (Page-ID `6a9b3c6b0b1f07241e741771`, R-Z), aber noch nicht veröffentlicht. Vorher liefen
> 74 Links ins Leere.

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

- **Neun der zehn Goals fehlen** im Plausible-Konto (R-V). Nur `light.home.hero.click` ist
  angelegt.
- **Drei überflüssige Custom Properties** stehen noch im Konto (RF-12). Sie funktionieren
  in der laufenden Trial und verschwinden beim Wechsel auf Growth — eine gelungene Probe
  jetzt beweist nichts über nachher.
- **Der Einbau der Snippets im Browser.** Geprüft ist ihre Logik gegen eine DOM-Attrappe,
  nicht ihr Einbau.

### 5.2 Außerhalb dieser Phase

- **Tribe-CMS** (R-G): kein Importschema, keine Feldliste, keine Portrait-Alt-Texte.
- **Bilder** (R-Y): über den Webflow-Strang.
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

## 7. Offene Rückfragen

| ID | Datei | Frage | Blockiert |
|---|---|---|---|
| **RF-12** | CC-4 | Drei Custom Properties im Konto löschen — vor dem Wechsel auf Growth, nicht danach. | vor Growth |
| **RF-13** | CC-4 | Zeigt „Outbound Link: Click“ die Ziel-URL-Aufschlüsselung auch auf Growth? | Tribe-Paket |
| **RF-16** | CC-2 | Inline-`color` aus den Symbolen **entfernt** statt auf `#A87D34` gesetzt — richtig ausgelegt? | — |
| **RF-17** | CC-6 | Den 75. Wurzel-Anker in der `noindex`-Landingpage mit umhängen? | S10 |
| **RF-19** | CC-4 | Briefing nennt 13 Goals, Spezifikation kommt auf 10. Sollen die zwei gestrichenen Messungen unter eigenen Namen zurückkommen? | — |
| **RF-21** | CC-2 | Stehen die Symbole auf hellem oder dunklem Grund? Auf hell verschwinden die inneren Ringe nahezu. | — |
| **RF-5 – RF-8** | CC-7 | Vier Fragen zum Founder-Material. | Phase 3 |
| **RF-11** | CC-1 | `S5.LABEL.A`: eine Stimme mit Label, eine ohne — so gewollt? | Tribe-Paket |

**Keine davon blockiert den Bau.** Am ehesten lohnen den kurzen Blick **RF-16** (eine
Auslegung von mir) und **RF-19** (eine Zahl, die im Dashboard sichtbar wird).

---

## 8. Nächste Schritte

| Wer | Was | Danach |
|---|---|---|
| **Webflow** | `/founder` publishen (Seite liegt, R-Z) | dann **Signal an Code** |
| **Claude Code** | auf Signal: `founder-pfad-umhaengen` mergen | 74 Links zeigen richtig |
| **David** | `analytics-reach-schwellwert` mergen — hängt an nichts | Schwellwerte einheitlich |
| **David** | neun Goals anlegen, drei Properties löschen | Messung belastbar |
| **Webflow** | Startseite bauen: Copy, Symbole, Snippets liegen bereit | S7 ff. |
| **Claude Code** | nach S9: CC-8 abschließen, RF-17 entscheiden | S10 |

---

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
