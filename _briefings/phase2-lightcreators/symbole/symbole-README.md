# CC-2 · Symbol-Set „Schöpferische Dialoge"

**Aufgabe:** CC-2 aus `phase2-lightcreators-claude-code.md`
**Übergabepunkt:** I-2, fällig nach Freigabepunkt F2
**Stand:** 2. September 2026
**Zielsektion:** Sektion 4 der neuen Startseite, Copy-Strings `S4.*`

---

## 1. Dateien in diesem Verzeichnis

| Datei | Größe | Herkunft |
|---|---|---|
| `01-loslassen.svg` | 578 B | Kopie von `assets/icons/01-loslassen.svg`, byte-identisch |
| `02-verbinden.svg` | 827 B | Kopie von `assets/icons/02-verbinden.svg`, byte-identisch |
| `03-erkennen.svg` | 877 B | Kopie von `assets/icons/03-erkennen.svg`, byte-identisch |
| `04-gestalten.svg` | 761 B | Kopie von `assets/icons/04-gestalten.svg`, byte-identisch |
| `01-loslassen@2x.png` | 42 KB | 512 × 512, transparent, erzeugt am 02.09.2026 |
| `02-verbinden@2x.png` | 40 KB | dito |
| `03-erkennen@2x.png` | 54 KB | dito |
| `04-gestalten@2x.png` | 66 KB | dito |

Die vier Originale unter `assets/icons/` sind **unverändert**. Es wurde kopiert, nicht
verschoben. Die Prüfsummen der Kopien stimmen mit denen der Originale überein.

---

## 2. Fundstelle — und ein Fund, der im Briefing nicht steht

Das Briefing nennt `03-erkennen.svg` als bekannten Dateinamen und geht von einem Satz aus.
**Es liegen zwei Sätze im Repository**, an zwei Orten, und sie sind nicht identisch.

| Ort | Zustand |
|---|---|
| `assets/icons/` | Trägt den Goldverlauf in `03-erkennen.svg`. Kein `style="color:…"` am Wurzelelement. |
| `briefing/` | Trägt `style="color:#E3C486"` am Wurzelelement. **Kein Goldverlauf** in `03-erkennen.svg`; der Mittelpunkt ist dort mit `currentColor` gefüllt. |

Übernommen wurde der Satz aus **`assets/icons/`**, weil er der Beschreibung im Briefing
entspricht: Der Verlauf ist dort tatsächlich als `linearGradient` in `03-erkennen.svg`
definiert. Der `briefing/`-Satz ist damit als ältere oder abgezweigte Variante zu
behandeln. Umbenannt oder zusammengeführt wurde nichts.

### Zweiter Fund: die Symbole sind heute nirgends eingebunden

Das Briefing begründet das Kopieren damit, dass die Originale „auf `davidliebnau.com` in
Verwendung sind". Das trifft nicht zu. Eine Suche über alle HTML- und CSS-Dateien findet
**keine einzige Referenz** auf `01-loslassen`, `02-verbinden`, `03-erkennen`,
`04-gestalten` oder auf das Verzeichnis `assets/icons/`. Die Symbole liegen ungenutzt.

Das ändert nichts am Vorgehen — kopieren statt verschieben bleibt richtig, weil die
Dateien Bestand sind und Phase 2 keine bestehende Datei anfasst. Es ändert aber die
Risikolage: Ein späterer Umzug der Originale bräche nichts auf `davidliebnau.com`.

---

## 3. Technische Daten

Alle vier Dateien sind gleich aufgebaut:

```
viewBox      0 0 240 240
width/height 240 × 240   (im Attribut; die viewBox skaliert frei)
fill         none
stroke       currentColor
stroke-width 1.25
role         img
aria-label   Loslassen | Verbinden | Erkennen | Gestalten
```

| Symbol | Aufbau | Deckkraftstufen |
|---|---|---|
| 01 Loslassen | 5 Ellipsen, gemeinsam um −12° gedreht, nach innen kleiner und blasser, die inneren zwei gestrichelt | 1 · 0,75 · 0,5 · 0,3 · 0,16 |
| 02 Verbinden | 2 Kreise (r 72), überlappend; in der Schnittmenge 11 waagerechte Ellipsen | 0,85 auf der Ellipsengruppe |
| 03 Erkennen | 8 Ellipsen, vier links und vier rechts, dazwischen ein gefüllter Punkt (r 6,5) | 0,9 auf der Ellipsengruppe |
| 04 Gestalten | 6 hochkant-Ellipsen in 30°-Schritten gedreht, darüber eine breite Ellipse um −16° mit stärkerer Kontur (1,9) | 0,55 auf der Rosettengruppe |

---

## 4. Farbwerte

### Der Goldverlauf

Nur in `03-erkennen.svg`, nur auf der Füllung des Mittelpunkts, nicht auf den Konturen:

```xml
<linearGradient id="gold-gradient" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0" stop-color="#FFDB9D"/>
  <stop offset="1" stop-color="#A87D34"/>
</linearGradient>
```

| Rolle | Wert |
|---|---|
| Verlauf oben | `#FFDB9D` |
| Verlauf unten | `#A87D34` |
| Richtung | senkrecht, oben nach unten |
| Angewandt auf | `fill` des `<circle cx="120" cy="120" r="6.5">` |

**Geprüft, wie im Briefing verlangt:** Der Verlauf kommt in den anderen drei Symbolen
**nicht** vor. `01`, `02` und `04` enthalten kein `<defs>` und keinen `linearGradient`.
Die `id="gold-gradient"` ist damit auch nur in einer Datei vergeben; beim Inline-Einbau
mehrerer Symbole auf einer Seite entsteht kein ID-Konflikt.

### Die Konturfarbe ist offen

Die Konturen aller vier Symbole stehen auf `stroke="currentColor"`. Der kanonische Satz
unter `assets/icons/` setzt **keine** `color`. Ein Symbol, das so als eigenständige Datei
hochgeladen und über `<img>` eingebunden wird, rendert deshalb **schwarz**, weil
`currentColor` auf den Vorgabewert fällt.

Im Repository stehen drei verschiedene Goldwerte:

| Wert | Wo | Rolle |
|---|---|---|
| `#E0B76F` | `assets/styles.css`, `--color-gold` | Das Gold von `davidliebnau.com` |
| `#E3C486` | nur in den `briefing/`-Kopien der Symbole | Ein vierter, sonst nirgends verwendeter Wert |
| `#FFDB9D` → `#A87D34` | `03-erkennen.svg` | Der Verlauf |

**Welcher Wert für Light Creators gilt, ist nicht entschieden.** Das hängt an **OD-9**
(eigenes Design-System oder Übernahme von `davidliebnau.com`, ausdrücklich einschließlich
der Frage, ob die Symbolfarben angepasst werden). Es wurde deshalb kein Wert in die
SVG-Kopien geschrieben.

**Für den Webflow-Strang heißt das:** Die Konturfarbe wird dort gesetzt, nicht hier —
entweder über eine `color`-Regel auf dem Container beim Inline-Einbau, oder durch eine
Variable, sobald OD-9 entschieden ist.

### Die PNG tragen einen provisorischen Wert

Ein PNG kann keine offene Farbe haben. Die vier Fallback-Dateien wurden mit `#E3C486`
gerastert — dem einzigen Wert, der im Repository für genau diese Symbole steht. Das ist
**keine Farbentscheidung**, sondern die Voraussetzung dafür, dass überhaupt ein PNG
entsteht. Fällt OD-9 anders aus, müssen die vier PNG neu erzeugt werden; die SVG nicht.

Erzeugt mit Quick Look (`qlmanage -t -s 512`) aus temporären Kopien, in die `color`
injiziert wurde. Die Kopien in diesem Verzeichnis blieben dabei unangetastet.
Transparenz geprüft: alle vier haben einen Alphakanal.

---

## 5. Alt-Text-Regel

**Die vier Symbole sind dekorativ und bekommen `alt=""`.**

Jedes Symbol steht direkt neben seiner eigenen Textbeschriftung — „01 LOSLASSEN",
„02 VERBINDEN", „03 ERKENNEN", „04 GESTALTEN" (Copy-Strings `S4.01.NUM` und `S4.01.H3`
und so weiter). Ein Alt-Text würde diese Beschriftung doppeln: Screenreader-Nutzer hörten
denselben Inhalt zweimal hintereinander.

### Achtung — die SVG widersprechen dieser Regel von innen

Alle vier Dateien tragen am Wurzelelement:

```xml
role="img" aria-label="Loslassen"
```

Das hat je nach Einbauart unterschiedliche Folgen:

| Einbauart | Wirkung | Bewertung |
|---|---|---|
| `<img src="01-loslassen.svg" alt="">` | Der Browser behandelt das SVG als ersetztes Bild. `aria-label` **im** SVG wird nicht vorgelesen. `alt=""` gewinnt. | **unkritisch** |
| SVG inline ins HTML kopiert | `role="img"` und `aria-label` wirken. Der Screenreader liest „Loslassen" — und direkt danach die sichtbare Beschriftung „01 LOSLASSEN". | **Regelbruch** |

**Empfehlung an den Webflow-Strang:** als `<img>` mit `alt=""` einbinden, nicht inline.
Wird inline gebraucht (etwa weil die Konturfarbe per CSS gesteuert werden soll), müssen
`role="img"` und `aria-label` durch `aria-hidden="true"` ersetzt werden. Diese Änderung
gehört dann in den Webflow-Strang, nicht in die Kopien hier — sie würde die
Byte-Identität zu den Originalen brechen.

---

## 6. Zuordnung zu den Copy-Strings

| Datei | String-IDs | Beschriftung | Satz darunter |
|---|---|---|---|
| `01-loslassen` | `S4.01.NUM`, `S4.01.H3`, `S4.01.P` | 01 · LOSLASSEN | Raum schaffen. Nicht sofort wissen müssen. |
| `02-verbinden` | `S4.02.NUM`, `S4.02.H3`, `S4.02.P` | 02 · VERBINDEN | Mit dir selbst, anderen Menschen und dem Leben in Beziehung kommen. |
| `03-erkennen` | `S4.03.NUM`, `S4.03.H3`, `S4.03.P` | 03 · ERKENNEN | Wahrnehmen, was wirklich deins ist – und was entstehen will. |
| `04-gestalten` | `S4.04.NUM`, `S4.04.H3`, `S4.04.P` | 04 · GESTALTEN | Erkenntnis in Erfahrungen, Entscheidungen und konkrete Schritte übersetzen. |

---

## 7. Rückfragen

| ID | Frage | Blockiert |
|---|---|---|
| **RF-7** | Welcher Goldwert gilt für die Symbole auf Light Creators — `#E0B76F` wie auf `davidliebnau.com`, `#E3C486` wie in den `briefing/`-Kopien, oder ein eigener Wert? Solange das offen ist, tragen die SVG keine Farbe und die PNG einen provisorischen Wert. | OD-9 |
| **RF-8** | Es liegen zwei nicht identische Sätze der vier Symbole im Repository, unter `assets/icons/` und unter `briefing/`. Soll einer davon später der führende werden? Das wäre eine Änderung an bestehenden Dateien und fällt damit unter R-E, also frühestens nach dem Phase-1-Merge. | nach P1 |
