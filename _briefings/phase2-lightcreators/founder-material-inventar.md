# CC-7 · Inventar des Founder-Materials

**Aufgabe:** CC-7 aus `phase2-lightcreators-claude-code.md`
**Zweck:** Klarheit darüber, was für Phase 3 bereitliegt. In Phase 2 wird nichts davon verwendet.
**Stand:** 3. September 2026
**Erhoben auf:** Branch `phase2-zulieferungen`, Stand `main` (Commit `2060bb8`)
**Änderungen an bestehenden Dateien:** keine. Nichts aus `_archiv/` wurde kopiert, aufbereitet oder verschoben.

> **Regel aus dem Briefing, hier eingehalten.** Migration ist Bestandteil des
> Phase-3-Rebuilds und kein Kopiervorgang. Dieses Dokument beschreibt Bestand und gibt
> eine **Empfehlung**. Es trifft keine Entscheidung.

---

## 0. Umfang und eine Abweichung vom Briefing

Das Briefing nennt unter CC-7 nur **eine** Archivdatei,
`_archiv/founder-resonance-bloecke.html`. Das Verzeichnis enthält jedoch **zwei** Dateien,
und die zweite ist die umfangreichere.

| Datei | Zeilen | Bytes | Was es ist |
|---|---|---|---|
| `_archiv/founder-resonance-bloecke.html` | 157 | 6.177 | Sicherungsschnitt zweier Sektionen |
| `_archiv/index-en-alt.html` | 636 | 32.091 | **vollständige alte englische Startseite** |

Beide sind Founder-Material und beide sind für Phase 3 relevant. Die zweite ist hier
mit aufgenommen, weil der Auftrag „Founder-Material in `_archiv/`" lautet und ein
Inventar, das die größere Hälfte des Verzeichnisses ausspart, seinen Zweck verfehlt.

Beide Dateien tragen `<meta name="robots" content="noindex">`; zusätzlich sperrt
`robots.txt` das gesamte Verzeichnis (`Disallow: /_archiv/`). Keine der beiden ist von
einer ausgelieferten Seite verlinkt.

---

## 1. `_archiv/founder-resonance-bloecke.html`

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

Beide Blöcke binden je fünf Icons aus `assets/icons/` ein: `Obsession.svg`,
`Presence.svg`, `Vision.svg`, `Founder Fit.svg`, `Scalable Logic.svg`. Alle fünf Dateien
existieren. Der Pfad im Archiv-Markup ist relativ (`assets/icons/…`) und zeigt von
`_archiv/` aus ins Leere — tote Bildverweise, ohne Folgen, solange die Datei gesperrt und
unverlinkt ist.

### Abweichungen von der Beschreibung im Briefing

Das Briefing nennt als bekannten Inhalt dieser Datei „die fünf Resonance-Faktoren, den
Resonance Gap, das Founder Resonance Assessment und die Hero-Zeile ‚Das Update, das alle
anderen Updates erst möglich macht'". Drei Punkte stimmen so nicht:

1. **Das Founder Resonance Assessment steht nicht in dieser Datei.** Die Zeichenfolge
   „Assessment" kommt darin null Mal vor. Der zugehörige CTA-Block liegt in der
   **anderen** Archivdatei, auf Englisch — siehe Abschnitt 2.
2. **„Das Update, das alle anderen Updates erst möglich macht" ist hier keine Hero-Zeile,
   sondern eine Coda** am Ende von Block 1. Als echte `<h1>`-Hero-Zeile steht sie nur in
   `index-en-alt.html:100`, und dort auf Englisch: „The update that makes all other
   *updates possible*."
3. Im Briefing nicht erwähnt: Die fünf Faktoren liegen **doppelt** vor, in zwei Fassungen
   aus zwei Quelldateien. Wer sie für Phase 3 übernimmt, muss zuerst entscheiden, welche
   Fassung gilt — oder beide zusammenführen.

Der Resonance Gap ist vorhanden, wie beschrieben.

### Technischer Zustand

Das Markup referenziert zehn CSS-Klassen aus `assets/styles.css`. **Alle zehn existieren
dort weiterhin:** `factors-section`, `factor`, `factor-content`, `factor-num`,
`factors-intro`, `factors-list`, `factors-pre-coda`, `factors-coda`, `container`,
`eyebrow`.

Das Markup ist damit **nicht verwaist**, aber es hängt an einem Design-System, über das
**OD-9** noch nicht entschieden ist. Bekommt Light Creators eigene Tokens, trägt keine
dieser Klassen mehr.

---

## 2. `_archiv/index-en-alt.html`

Die vollständige alte **englische** Startseite, gesichert im selben Zug. 636 Zeilen.
Inhaltlich deutlich mehr als der Name „alt" vermuten lässt.

| Zeile | Sektion | Inhalt |
|---|---|---|
| 100 | Hero | `<h1>` „The update that makes all other *updates possible*." |
| 124 | `qa-section` | „You're juggling *three roles* simultaneously." — Entrepreneur · Manager · Expert, mit den drei Rollenbildern |
| 172 | `qa-section` | „What's missing." |
| 200 | `factors-section` | „Leadership begins within — works outward." mit den fünf Faktoren, englisch |
| 259 | `about-section` | „Why I do this work." und „The common thread" |
| 310 | `about-section--dark` | „Leadership never works in isolation" · „Customised in-house programmes" |
| 344 | `testimonials-section` | „20+ years of leadership work. 25 countries." — **acht namentliche Kundenstimmen**, siehe Rechtshinweis |
| 458 | `threshold-teaser` | „Make room for the answer that is *genuinely yours*." |
| 481 | `next-section` | „Find out which Resonance factor is already a strength of yours." mit **Founder Resonance Assessment** und **Diagnostic Call** als zwei CTA-Karten |
| 518 | `english-block` | „For English-speaking founders." |
| 541 | `quote-section` | Abschlusszitat |

Alle verwendeten Sektionsklassen (`qa-section`, `roles-grid`, `role-card`,
`role-card-img`, `testimonials-section`, `threshold-teaser`, `english-block`,
`quote-section`, `about-section`) existieren in `assets/styles.css`. Auch diese Datei ist
also nicht verwaist, hängt aber an derselben offenen Frage OD-9.

Die Datei enthält 14 Verweise auf `light-creators.com`, darunter als einzige Stelle
außerhalb der Episoden Links auf `/quiz` und `/call` — siehe CC-6, Abschnitt 6.

> **Rechtshinweis, nicht beantwortet.** Der Testimonial-Abschnitt enthält acht
> Kundenstimmen mit vollem Namen, Position und Arbeitgeber, teils von Personen aus
> Konzernen. Das sind Personendaten und Zitate. Ob für diese Verwendung eine dokumentierte
> Freigabe vorliegt, geht aus dem Repository nicht hervor. Solange die Datei gesperrt und
> unverlinkt ist, entsteht daraus kein Außenkontakt. **Vor jeder Wiederverwendung in
> Phase 3 ist der Freigabestand je Person zu klären.** Die Zitate sind hier bewusst nicht
> abgedruckt. Siehe RF-7.

---

## 3. Die drei brachliegenden Rollenbilder

| Datei | Maße | Größe | Motiv |
|---|---|---|---|
| `assets/role-entrepreneur.webp` | 1024 × 1024 | 67.554 B | Messing-Sextant auf dunkelblauem Grund, Seitenlicht |
| `assets/role-manager.webp` | 1024 × 1024 | 52.252 B | Ineinandergreifende Messingzahnräder, gleicher Grund |
| `assets/role-expert.webp` | 1024 × 1024 | 24.222 B | Kalligrafiefeder mit Tintenfass, gleicher Grund |

**Aktueller Verwendungsort: keiner.** Die drei Dateien werden von keiner ausgelieferten
Seite eingebunden. Referenziert werden sie nur noch in `_archiv/index-en-alt.html`
(Zeilen 134, 142, 150), in `BACKLOG.md` (142–143), in `OFFENE-AUFGABEN-Relaunch.md`
(167–168) und im Phase-2-Briefing selbst.

Die Alt-Texte aus der Archivfassung beschreiben die Motive so:

> „Brass sextant on midnight blue, symbol of navigation and strategy"
> „Interlocking brass cogs on midnight blue, symbol of orchestration"
> „Calligraphy pen with inkwell on midnight blue, symbol of craft and precision"

---

## 4. Bewertung für die Hero-Collage der Phase 2

**Empfehlung: nicht geeignet. Keine Entscheidung, sondern ein Rat mit Begründung.**

Das Briefing begründet die Ungeeignetheit damit, dass Rollenbilder aus einer
Founder-Segmentierung das Gegenteil von echter Begegnung transportieren und die
Produktsegmentierung in den ersten Screen zurückholen. Das trifft zu. Beim Sichten der
Dateien kommt ein einfacherer und härterer Grund dazu:

**Auf keinem der drei Bilder ist ein Mensch zu sehen.** Es sind Stillleben von
Gegenständen — ein Messinstrument, Zahnräder, ein Schreibgerät. Die Anforderung an die
Hero-Collage lautet „echte Begegnung, unterschiedliche Menschen und Situationen". Diese
drei Bilder verfehlen das nicht knapp; sie liegen in einer anderen Kategorie.

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

## 5. Was dieses Inventar nicht enthält

- Keine Bewertung, ob die fünf Faktoren inhaltlich weiterverwendet werden sollen. Das ist
  eine Markenentscheidung und gehört nicht in ein Inventar.
- Keine Aufbereitung, keine Kopie, keine Konvertierung. Die Dateien liegen unverändert.
- Keine Aussage darüber, welche der beiden Faktoren-Fassungen gilt.
- Keine Wiedergabe der acht Kundenzitate und keine Aussage über ihren Freigabestand.

---

## 6. Rückfragen

| ID | Frage | Blockiert |
|---|---|---|
| **RF-5** | Der CTA-Block „Founder Resonance Assessment" ist gesichert, aber nur **englisch** in `index-en-alt.html`. Die deutsche Fassung und die Quiz-Logik selbst liegen auf `light-creators.com/quiz` und in den Webflow-gebundenen Prototypen unter `quiz-assets/`. Braucht Phase 3 eine deutschsprachige Sicherung in diesem Repository, oder bleibt sie dort, wo sie ist? | Phase 3 |
| **RF-6** | Die fünf Faktoren liegen in drei Fassungen vor: zwei deutsche in `founder-resonance-bloecke.html` und eine englische in `index-en-alt.html`. Welche ist die gültige — oder werden sie für Phase 3 neu geschrieben? | Phase 3 |
| **RF-7** | Für die acht namentlichen Kundenstimmen in `index-en-alt.html` liegt im Repository kein Freigabenachweis. Existiert er außerhalb, und gilt er auch für eine Wiederverwendung auf `light-creators.com`? Berührt zusätzlich **OD-12** (Verhältnis zur bestehenden `Testimonials`-Collection in Webflow). | Phase 3 |
| **RF-8** | Die alte englische Startseite ist als ganze Seite gesichert, die alte deutsche nicht — von ihr existieren nur die zwei ausgeschnittenen Faktoren-Blöcke. War das beabsichtigt, oder fehlt eine Sicherung? Für Phase 3 wäre der Unterschied erheblich. | Phase 3 |
