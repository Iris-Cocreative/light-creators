# CC-8 · Übergabepaket Phase 2 · `light-creators.com`

**Aufgabe:** CC-8 aus `phase2-lightcreators-claude-code.md`
**Stand:** 4. September 2026
**Branch:** `phase2-zulieferungen`, Stand `main` bei `98b50ce`
**Charakter:** **Zwischenstand, nicht Abschluss.** CC-8 gehört nach Schritt S10 hinter den Publish. Dieses Dokument hält fest, was nach Freigabepunkt **F1** fertig ist und woran der Rest hängt. Es wird nach S9 fortgeschrieben.

> **Ein leeres Feld ist kein Ergebnis; eine benannte Lücke schon.** Abschnitt 4 ist deshalb
> genauso Teil der Lieferung wie Abschnitt 2.

---

## 1. Wo das Paket liegt

```
/Users/liebnaudavid/light-creators/_briefings/phase2-lightcreators/
```

Sichtbar nur, wenn `phase2-zulieferungen` ausgecheckt ist — auf `main` existiert das
Verzeichnis nicht.

**Der Branch ist zum Stand dieses Dokuments nicht nach GitHub gepusht.** Ein Push-Versuch
am 03.09.2026 wurde abgelehnt. Solange er aussteht, existiert das Paket nur lokal; es gibt
keine zweite Kopie.

---

## 2. Die Dateien

| Datei | Aufgabe | Zweck | Status | Gültig ab |
|---|---|---|---|---|
| `copy-lightcreators-home.md` | CC-1 | Kanonische Textquelle, 110 String-IDs mit Provenance und Linkzielen | **fertig** | Texte nach **F2**; Linkziele seit F1 gesetzt |
| `symbole/01-loslassen.svg` | CC-2 | Symbol Sektion 4 | **fertig** | sofort |
| `symbole/02-verbinden.svg` | CC-2 | Symbol Sektion 4 | **fertig** | sofort |
| `symbole/03-erkennen.svg` | CC-2 | Symbol Sektion 4 | **fertig** | sofort |
| `symbole/04-gestalten.svg` | CC-2 | Symbol Sektion 4 | **fertig** | sofort |
| `symbole/symbole-README.md` | CC-2 | Farbwert, Einbauregel, Barrierefreiheit, Abnahme | **fertig** | sofort |
| `analytics-lightcreators-home.md` | CC-4 | Eventspezifikation, Goal-Liste, domainübergreifendes Register | **fertig** | Einbau nach **F2** |
| `snippets/plausible-events.js` | CC-4 | Delegierter Klick-Listener, ohne Properties | **fertig** | Einbau nach **F2** |
| `snippets/plausible-scroll.js` | CC-4 | Scrolltiefe über `IntersectionObserver` | **fertig** | Einbau nach **F2** |
| `linkreport-lightcreators.md` | CC-6 | Drei Listen, Redirect-Lage, Umhänge-Plan | **fertig** | war fällig **vor F1**, geliefert |
| `founder-material-inventar.md` | CC-7 | Bestand `_archiv/`, drei Rollenbilder, Empfehlung | **fertig** | Phase 3 |
| `UEBERGABE.md` | CC-8 | dieses Dokument | **Zwischenstand** | wird nach S9 fortgeschrieben |
| ~~`bilder/`~~ | CC-3 | Hero-Collage und OG-Bild | **wartet auf Zulieferung** | nach **F4** |
| ~~`bilder/bild-manifest.csv`~~ | CC-3 / CC-5 | Manifest mit Alt-Text-Entwürfen | **wartet auf Zulieferung** | nach **F4** |

Elf Dateien fertig, zwei ausstehend.

### Was der Webflow-Strang wo abholt

| Übergabe | Datei | Fällig |
|---|---|---|
| I-1 Copy | `copy-lightcreators-home.md` | nach F2 |
| I-2 Symbole | `symbole/` — **vier SVG, kein Upload:** inline einbetten (R-K) | jetzt |
| I-3 Bildpaket | `bilder/` — **fehlt** | nach F4 |
| I-4 Analytics | `analytics-lightcreators-home.md` + `snippets/` | nach F2 |
| I-5 Linkbericht | `linkreport-lightcreators.md` | **geliefert**, floss in F1 ein |

---

## 3. Was seit F1 entschieden ist

| Regel | Wirkung auf dieses Paket |
|---|---|
| **R-H** `/founder`, indexiert, **kein 301 von `/`** | Linkbericht Abschnitt 9: keine Weiterleitung nötig, stattdessen 74 Anker umhängen |
| **R-I** CTA-Ziele | Fünf Linkziele in der Copy-Datei eingetragen, OD-3/4/5 geschlossen |
| **R-J** `/en` bleibt | Liste B-2 des Linkberichts entfällt, 31 Anker bleiben gültig |
| **R-K** Symbole | CC-2 neu gebaut, PNG gestrichen, Farbe `#A87D34` |
| **Weg B** (RF-14) | Altnamen bleiben, Neues auf `davidliebnau.com` bekommt `david.*` |

Zehn Rückfragen sind seit dem 03.09. geschlossen: RF-1 bis RF-4, RF-9, RF-10, RF-12,
RF-14, RF-15, RF-18.

---

## 4. Was nicht geliefert werden konnte — mit Begründung

### 4.1 CC-3 · Bildpaket · wartet auf Zulieferung

Es liegt kein Bildmaterial vor. Nach der Vorbedingung des Briefings wird **kein
Platzhalterbild erzeugt, kein Stockbild beschafft und kein Bild generiert.** Gebraucht
werden vier bis sechs Collagenbilder (Langkante ≥ 2400 px) und ein OG-Motiv. Danach
Freigabepunkt **F4**, dann Schritt S6.

### 4.2 CC-5 · Alt-Texte · hängt an CC-3

Die Alt-Text-Entwürfe leben in der Spalte `alt_text_entwurf` von `bild-manifest.csv`. Ohne
Bilder gibt es keine Zeilen. Die **Regeln** dafür stehen bereits fest und sind in
`symbole-README.md` (Symbole) und im Briefing (Collage) festgehalten.

### 4.3 Tribe · außerhalb dieser Phase

Nach **R-G** gebaut im separaten Paket. In diesem Repository entstehen deshalb bewusst
**kein** CSV-Importschema, **keine** Feldliste, **keine** Portrait-Aufbereitung und
**keine** Portrait-Alt-Texte. Die Copy-Datei enthält nur die acht Struktur-Strings `S5.*`.

### 4.4 `ep-28` und `ep-29` · absichtlich unverändert

Die vier nackten URLs bleiben stehen. Ein Korrektur-Commit entsteht erst, wenn der
Webflow-Strang eine tatsächliche Pfadänderung zurückmeldet — als **ein** Commit (RF-1)
über alle vier Ebenen, nach dem Phase-1-Merge.

### 4.5 Nicht überprüfbar aus diesem Repository

- Der Zustand des Plausible-Kontos für `light-creators.com`. Neun der zehn Goals fehlen
  laut Briefing noch; nachgeprüft ist das hier nicht.
- Ob Schritt **S-P0** (Plausible auf `light-creators.com`) erledigt ist.
- Der tatsächliche Einbau der Snippets im Browser. Geprüft ist ihre **Logik**, nicht ihr
  Einbau — siehe Abschnitt 5 der Analytics-Spezifikation.

---

## 5. Geprüft, mit Datum

| Was | Wie | Ergebnis |
|---|---|---|
| Copy gegen Anhang A | maschineller Abgleich, 03.09. | 110 IDs, deckungsgleich und zeichengenau |
| Genau ein `Heading, Level 1` | `grep`, 03.09. | erfüllt, acht `Level 2` |
| Keine offenen CTA-Linkziele | `grep`, 03.09. | `linkziel: OFFEN` kommt null Mal vor |
| Snippets | JavaScriptCore mit DOM-Attrappe, 03.09. | 6 Klick-Events mit je **einem** Argument, 4 Reach-Events genau einmal, keine Fehler |
| SVG-Validität | XML-Parser, 03.09. | alle vier fehlerfrei |
| Symbolsatz nach R-K | `grep`, 03.09. | kein `linearGradient`, kein `#E3C486` |
| Zielpfade auf `light-creators.com` | live, 03.09. | 11× 200, `/tribe` und `/about` 404 |
| CTA-Ziele aus R-I | live, 03.09. | `/the-art-and-practice-of-a-flourishing-life` **200**; `/founder` **404** (erwartet) |
| Eventbestand | maschinell aus dem Code, 03.09. | 19 aktive Events auf `davidliebnau.com` |
| Linkbericht gegen neuen `main` | 04.09. gegen `98b50ce` | Zeilennummern und Anzahlen unverändert |
| Originale unberührt | `git status`, 04.09. | `briefing/`, `assets/icons/`, `_archiv/` unverändert |
| **R-E** | `git diff main..HEAD`, 04.09. | ausschließlich Dateien unter `_briefings/phase2-lightcreators/` |

---

## 6. Offene Rückfragen

| ID | Datei | Frage | Blockiert |
|---|---|---|---|
| **RF-5** | CC-7 | Braucht Phase 3 eine deutschsprachige Sicherung des Assessments in diesem Repository? | Phase 3 |
| **RF-6** | CC-7 | Welche der drei Fassungen der fünf Faktoren gilt? | Phase 3 |
| **RF-7** | CC-7 | Freigabestand der acht namentlichen Kundenstimmen in `_archiv/index-en-alt.html`? | Phase 3 |
| **RF-8** | CC-7 | Die alte **englische** Startseite ist als ganze Seite gesichert, die deutsche nicht. Absicht oder Lücke? | Phase 3 |
| **RF-11** | CC-1 | `S5.LABEL.A`: eine Stimme mit Label, eine ohne — so gewollt? | Tribe-Paket |
| **RF-13** | CC-4 | Zeigt „Outbound Link: Click" die Ziel-URL-Aufschlüsselung auch auf Growth? | Tribe-Paket |
| **RF-16** | CC-2 | Inline-`color` aus den Symbolen entfernt statt auf `#A87D34` gesetzt — richtig ausgelegt? | — |
| **RF-17** | CC-6 | Den 75. Wurzel-Anker in der `noindex`-Landingpage mit umhängen? | S10 |
| **RF-19** | CC-4 | Briefing nennt 13 Goals, Spezifikation kommt auf 10. Sollen die zwei gestrichenen Messungen unter eigenen Namen zurückkommen? | F2 |

Keine davon blockiert den Weiterbau. **RF-16 und RF-19 lohnen den kürzesten Blick**: die
erste betrifft eine Auslegung von mir, die zweite eine Zahl, die im Dashboard sichtbar wird.

---

## 7. Nächste Schritte

| Wer | Was | Danach |
|---|---|---|
| **David** | Branch pushen (steht aus) | zweite Kopie existiert |
| **David** | **F2**: Copy freigeben — offen sind `S6.NG.CTA`-Beschriftung (OD-6), `S7.H2`, `NAV.5` (OD-7) | S7 kann bauen |
| **David** | Bildzulieferung Hero-Collage und OG-Motiv (S5) | dann **F4** |
| **Webflow** | **S-P0**: Plausible auf `light-creators.com` | Baseline |
| **Webflow** | Alte Startseite nach `/founder`, indexiert (R-H) | Gate für den Umhänge-Commit |
| **Claude Code** | nach F4: CC-3 und CC-5 | Bildpaket, Manifest |
| **Claude Code** | nach S9: CC-8 abschließen, Umhänge-Commit, `ep-28`/`ep-29` | S10 |

---

## 8. Zwei Hinweise zum Arbeitsstand

**Parallele Sitzungen auf demselben Branch.** Am 03.09.2026 haben zwei Claude-Code-Sitzungen
im selben Arbeitsverzeichnis gearbeitet. Zwei Commits (`0480a73`, `c2fd6ff`) stammen aus der
zweiten Sitzung; ihr Beitrag zur Analytics-Spezifikation — die Trial-Falle und die
Zahlendifferenz — ist vollständig erhalten. Zwei Folgen sind aufgetreten und behoben:

- `c2fd6ff` änderte `BACKLOG.md`, also eine Datei außerhalb des Zielverzeichnisses (**R-E**).
  Derselbe Inhalt kam später über `main` als `98b50ce`; nach dem Merge ist `BACKLOG.md` auf
  diesem Branch **identisch zu `main`**. Im Ergebnis folgenlos, im Verlauf ein Regelbruch.
- Beide Sitzungen vergaben die Nummer **RF-14** an verschiedene Fragen. Die Frage der
  zweiten Sitzung heißt jetzt **RF-19**; ihr Inhalt ist unverändert.

`git checkout` gilt für das ganze Arbeitsverzeichnis, nicht pro Sitzung. Für echte
Parallelarbeit braucht jede Sitzung ein eigenes `git worktree`.

**Reversibilität.** Alle Ergebnisse sind neue Dateien in einem eigenen Verzeichnis auf einem
eigenen Branch. Rücknahme = Verzeichnis löschen oder Branch verwerfen. Kein bestehendes
Artefakt wurde überschrieben.
