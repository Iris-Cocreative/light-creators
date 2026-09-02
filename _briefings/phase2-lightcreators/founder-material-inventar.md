# CC-7 · Inventar des Founder-Materials

**Aufgabe:** CC-7 aus `phase2-lightcreators-claude-code.md`
**Zweck:** Klarheit darüber, was für Phase 3 bereitliegt. In Phase 2 wird nichts davon verwendet.
**Stand:** 2. September 2026
**Änderungen an bestehenden Dateien:** keine. Nichts aus `_archiv/` wurde kopiert, aufbereitet oder verschoben.

> **Regel aus dem Briefing, hier eingehalten.** Migration ist Bestandteil des
> Phase-3-Rebuilds und kein Kopiervorgang. Dieses Dokument beschreibt Bestand und gibt
> eine **Empfehlung**. Es trifft keine Entscheidung.

---

## 1. `_archiv/founder-resonance-bloecke.html`

157 Zeilen, 6.177 Bytes. Trägt `<meta name="robots" content="noindex">`; zusätzlich sperrt
`robots.txt` das gesamte Verzeichnis `/_archiv/`. Die Datei ist von keiner Seite verlinkt.

Die Datei ist ein **Sicherungsschnitt**, kein Baukasten: Sie enthält zwei Blöcke, die aus
zwei verschiedenen Quelldateien stammen und inhaltlich weitgehend dasselbe sagen.

### Block 1 — Quelle `podcast.html`, Zeilen 240–298, gesichert 22.08.2026

| Element | Inhalt |
|---|---|
| Section | `factors-section`, dunkler Hintergrund (`--bg-deep`) |
| H2 | „Fünf Faktoren. Alle wurzeln in *einer Beziehung*." |
| Fünf `factor`-Einträge | Obsession · Presence · Vision Resonance · Founder Fit · Scalable Logic, je mit einem Satz |
| Pre-Coda | „Keine Pitch-Tipps. Kein besseres Deck. Weg von Performance-Druck. Hin zu Präsenz und Verbindung." |
| Coda | „Das Update, das alle anderen *Updates erst möglich macht*." |

### Block 2 — Quelle `index.html`, Zeilen 174–231, gesichert 22.08.2026

| Element | Inhalt |
|---|---|
| Section | `factors-section`, heller Hintergrund |
| H2 | „Leadership beginnt innen — *wirkt außen*." |
| Fünf `factor`-Einträge | dieselben fünf Faktoren, teils andere Beschreibungssätze |
| Pre-Coda | „Wenn auch nur einer dieser Faktoren schwach ist, spüren Investoren das — ohne es benennen zu können." |
| Coda | „Sie sagen nicht ‚Deine Obsession wirkt toxisch.' Sie sagen: *‚Interessant — aber noch nicht für uns.'*" |
| Coda-Zeile | „Das ist der Resonance Gap. Und genau hier setze ich an." |

### Abweichung von der Beschreibung im Briefing

Das Briefing nennt als bekannten Inhalt „die fünf Resonance-Faktoren, den Resonance Gap,
**das Founder Resonance Assessment** und die Hero-Zeile". Die ersten beiden und die
Hero-Zeile sind vorhanden.

**Das Founder Resonance Assessment ist nicht in der Datei.** Die Zeichenfolge
„Assessment" kommt darin null Mal vor. Was gesichert wurde, sind die beiden
Faktoren-Sektionen; das Assessment selbst lebt auf `light-creators.com/quiz` und in den
Prototypen unter `quiz-assets/`, nicht im Archiv.

Zusätzlich, im Briefing nicht erwähnt: Die fünf Faktoren liegen **doppelt** vor, in zwei
Fassungen aus zwei Quelldateien. Wer sie für Phase 3 übernimmt, muss zuerst entscheiden,
welche Fassung gilt — oder beide zusammenführen.

### Technischer Zustand

Das Markup referenziert zehn CSS-Klassen aus `assets/styles.css`. Neun davon existieren
dort weiterhin:

| Klasse | Status in `assets/styles.css` |
|---|---|
| `factors-section`, `factor`, `factor-content`, `factor-num`, `factors-intro`, `factors-list`, `factors-pre-coda`, `factors-coda`, `container`, `eyebrow` | vorhanden |

Das Markup ist damit **nicht verwaist**, aber es hängt an einem Design-System, über das
**OD-9** noch nicht entschieden ist. Bekommt Light Creators eigene Tokens, trägt keine
dieser Klassen mehr.

Bereits im Backlog vermerkt und hier bestätigt: Die Datei hat tote Bildverweise, weil beim
Verschieben nach `_archiv/` die relativen Pfade nicht mitgezogen wurden. Ohne Folgen,
solange die Datei gesperrt und unverlinkt ist.

---

## 2. Die drei brachliegenden Rollenbilder

| Datei | Maße | Größe | Motiv |
|---|---|---|---|
| `assets/role-entrepreneur.webp` | 1024 × 1024 | 67.554 B | Messing-Sextant, aufgelegt auf dunkelblauem Grund, Seitenlicht |
| `assets/role-manager.webp` | 1024 × 1024 | 52.252 B | Ineinandergreifende Messingzahnräder, gleicher Grund |
| `assets/role-expert.webp` | 1024 × 1024 | 24.222 B | Kalligrafiefeder mit Tintenfass, gleicher Grund |

**Aktueller Verwendungsort: keiner.** Die drei Dateien werden von keiner ausgelieferten
Seite eingebunden. Referenziert werden sie nur noch in `_archiv/index-en-alt.html`
(Zeilen 134, 142, 150), in `BACKLOG.md`, in `OFFENE-AUFGABEN-Relaunch.md` und im
Phase-2-Briefing selbst.

Die Alt-Texte aus der Archivfassung beschreiben die Motive so:

> „Brass sextant on midnight blue, symbol of navigation and strategy"
> „Interlocking brass cogs on midnight blue, symbol of orchestration"
> „Calligraphy pen with inkwell on midnight blue, symbol of craft and precision"

---

## 3. Bewertung für die Hero-Collage der Phase 2

**Empfehlung: nicht geeignet. Keine Entscheidung, sondern ein Rat mit Begründung.**

Das Briefing begründet die Ungeeignetheit damit, dass Rollenbilder aus einer
Founder-Segmentierung das Gegenteil von echter Begegnung transportieren und die
Produktsegmentierung in den ersten Screen zurückholen. Das trifft zu. Beim Sichten der
Dateien kommt ein einfacherer und härterer Grund dazu:

**Auf keinem der drei Bilder ist ein Mensch zu sehen.** Es sind Stillleben von
Gegenständen — ein Messinstrument, Zahnräder, ein Schreibgerät. Die Anforderung an die
Hero-Collage lautet „echte Begegnung, unterschiedliche Menschen und Situationen". Diese
drei Bilder können das nicht knapp verfehlen; sie liegen in einer anderen Kategorie.

Drei weitere Punkte, falls die Frage später noch einmal aufkommt:

1. **Format.** 1024 × 1024 quadratisch. Die Collage verlangt eine Langkante von
   mindestens 2400 px. Hochskalieren käme nicht in Frage.
2. **Bildsprache.** Dunkelblauer Grund, Seitenlicht, Messingtöne, hoher Kontrast. Das ist
   die Bildsprache der Founder-Landingpage. Auf einem Marken-Hub, der mit „Finde, was nur
   du bist" öffnet, wirkt sie kühler und produktnäher, als der erste Screen sein soll.
3. **Semantik.** Sextant, Zahnräder und Feder standen für die drei Rollen Entrepreneur,
   Manager, Experte. Wer sie in die Collage nimmt, holt genau die Segmentierung in den
   ersten Screen zurück, die dort laut Sektionslogik erst in Sektion 6 stattfinden soll.

**Für Phase 3 dagegen sind sie brauchbar**, falls die Founder-Welt ihre eigene Seite
bekommt: Dort ist die Segmentierung der Punkt, die Bildsprache passt zum Bestand, und die
Maße reichen für Karten- oder Icon-Größen aus. Das ist keine Empfehlung für Phase 3,
sondern die Feststellung, dass sie dort nicht aus denselben Gründen ausscheiden.

---

## 4. Was dieses Inventar nicht enthält

- Keine Bewertung, ob die fünf Faktoren inhaltlich weiterverwendet werden sollen. Das ist
  eine Markenentscheidung und gehört nicht in ein Inventar.
- Keine Aufbereitung, keine Kopie, keine Konvertierung. Die Dateien liegen unverändert.
- Keine Aussage darüber, welche der beiden Faktoren-Fassungen gilt.

---

## 5. Rückfragen

| ID | Frage | Blockiert |
|---|---|---|
| **RF-5** | Das Founder Resonance Assessment ist entgegen der Briefing-Annahme **nicht** im Archiv gesichert. Es lebt auf `light-creators.com/quiz` und in den Webflow-gebundenen Prototypen unter `quiz-assets/`. Braucht Phase 3 eine Sicherung davon in diesem Repository, oder bleibt es dort, wo es ist? | Phase 3 |
| **RF-6** | Die fünf Faktoren liegen in zwei Fassungen vor, aus `podcast.html` und aus `index.html`. Welche ist die gültige — oder werden sie für Phase 3 neu geschrieben? | Phase 3 |
