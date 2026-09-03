# CC-2 · Symbol-Set „Schöpferische Dialoge"

**Aufgabe:** CC-2 aus `phase2-lightcreators-claude-code.md`
**Übergabepunkt:** I-2
**Stand:** 3. September 2026 — **Neubau nach Regel R-K.** Ersetzt die Fassung vom 02.09.2026.
**Geltende Regeln:** **R-K** (maßgeblicher Satz, Farbe, Einbettung, Barrierefreiheit), **R-E**

> **Was sich gegenüber dem 02.09. geändert hat.** Die erste Fassung wurde aus dem
> **falschen Symbolsatz** exportiert und enthielt vier PNG-Fallbacks. Beides ist mit R-K
> hinfällig. Diese Fassung ist ein Neubau, keine Korrektur.

---

## 0. Widerspruch zum Aufgabentext, ausgewiesen

Abschnitt CC-2 des Briefings ist zum Stand 03.09.2026 **nicht** auf R-K nachgezogen. Er
verlangt weiterhin unter Punkt 3 „pro Symbol zusätzlich ein PNG … Kantenlänge 512 px" und
beschreibt unter „Farbwerte" den Goldverlauf als das zu dokumentierende Merkmal.

**R-K steht in Abschnitt 1a („Diese Punkte sind entschieden") und ist vom 03.09.2026,
der CC-2-Abschnitt ist älter.** Diese Lieferung folgt R-K. Der Widerspruch ist hier
benannt, statt stillschweigend in die eine oder andere Richtung aufgelöst zu werden.

| Punkt | CC-2-Abschnitt (älter) | R-K (gültig) | Hier umgesetzt |
|---|---|---|---|
| Maßgeblicher Satz | Verlaufssatz, `assets/icons/` | `currentColor`-Satz | `currentColor`-Satz |
| PNG-Fallback | vier PNG à 512 px | entfällt | **keine PNG** |
| Farbe | Verlauf `#FFDB9D` → `#A87D34` | `#A87D34`, einfarbig | `#A87D34` per CSS |
| Einbau | Asset-Upload | inline eingebettet | inline |

---

## 1. Dateien in diesem Verzeichnis

| Datei | Größe | Herkunft |
|---|---|---|
| `01-loslassen.svg` | 578 B | Kopie von `briefing/01-loslassen.svg` |
| `02-verbinden.svg` | 827 B | Kopie von `briefing/02-verbinden.svg` |
| `03-erkennen.svg` | 669 B | Kopie von `briefing/03-erkennen.svg` |
| `04-gestalten.svg` | 761 B | Kopie von `briefing/04-gestalten.svg` |
| `symbole-README.md` | diese Datei | — |

**Vier SVG, ein README. Keine PNG.**

Die Originale unter `briefing/` und unter `assets/icons/` sind **unverändert**. Es wurde
kopiert, nicht verschoben. Alle vier Kopien parsen fehlerfrei als XML.

### Warum die PNG-Fallbacks gestrichen sind

Sie hatten genau einen Zweck: ein Ersatzformat, falls der **SVG-Upload als Webflow-Asset**
klemmt. Nach R-K werden die Symbole **inline in das Markup eingebettet**, nicht als Asset
hochgeladen. Damit gibt es keinen Upload, der klemmen könnte — der Fallback sichert einen
Weg ab, den niemand mehr geht.

Dazu kommt: Ein PNG kann keine offene Farbe tragen. Die vier Rasterungen der ersten
Fassung trugen `#E3C486` eingebrannt, also nicht einmal den nach R-K gültigen Wert. Sie
hätten bei jeder Farbänderung neu erzeugt werden müssen, während die SVG-Lösung eine
CSS-Zeile braucht. Ein Fallback, der die Entscheidung gegen sich hat, ist kein Fallback,
sondern eine zweite Wahrheit.

---

## 2. Welcher Satz maßgeblich ist — und wie klein der Unterschied wirklich ist

Im Repository liegen zwei Sätze der vier Symbole:

| Ort | Merkmal |
|---|---|
| `briefing/` | **maßgeblich (R-K).** Trug `style="color:#E3C486"` am Wurzelelement. `03-erkennen` füllt den Mittelpunkt mit `currentColor`. |
| `assets/icons/` | Verlaufssatz. Kein `style`. `03-erkennen` füllt den Mittelpunkt mit `url(#gold-gradient)`. |

Nach Entfernen der Inline-Farbe (siehe Abschnitt 3) zeigt sich, dass die beiden Sätze
**fast dasselbe** sind:

| Datei | Verhältnis zu `assets/icons/` |
|---|---|
| `01-loslassen.svg` | **byte-identisch** |
| `02-verbinden.svg` | **byte-identisch** |
| `04-gestalten.svg` | **byte-identisch** |
| `03-erkennen.svg` | weicht ab — nur im Goldpunkt |

Der **einzige** inhaltliche Unterschied zwischen den Sätzen steckt in `03-erkennen.svg`:

```
Verlaufssatz:      <circle … fill="url(#gold-gradient)" stroke="none"/>   + <defs> mit linearGradient
currentColor-Satz: <circle … fill="currentColor" stroke="none"/>          ohne <defs>
```

**Praktische Folge:** Der Punkt folgt jetzt derselben Farbe wie die Konturen. Ein Symbol,
eine Farbe, eine CSS-Zeile. Der Verlauf `#FFDB9D` → `#A87D34` ist damit für Phase 2
stillgelegt — er bleibt in `assets/icons/03-erkennen.svg` erhalten und ist dort
dokumentiert (`briefing/LCT-Farbpalette.md`).

Ein Nebenbefund, der die Wahl stützt: **`#A87D34` aus R-K ist genau das dunkle Ende
dieses Verlaufs.** Die Entscheidung nimmt also keinen fremden Wert, sondern friert den
Verlauf auf sein dunkles Ende ein — den Teil, der auf hellem Grund trägt.

---

## 3. Die einzige Änderung an den Kopien

Aus allen vier Dateien wurde genau eine Zeichenfolge entfernt:

```
 style="color:#E3C486"
```

**Warum.** R-K setzt die Farbe auf `#A87D34` und nennt sie „eine CSS-Zeile, jederzeit
änderbar". Eine Inline-`color` am Wurzelelement des SVG **schlägt eine geerbte CSS-Regel**
— die Symbole wären beim Einbetten `#E3C486` geblieben und die CSS-Zeile wirkungslos.
Zusätzlich trug der Wert nicht die entschiedene Farbe.

Ohne die Inline-Farbe erben alle vier Symbole ihre Farbe vom Container. Das ist der
Zustand, den R-K beschreibt.

**Nicht** geändert wurden: `viewBox`, `width`, `height`, `stroke`, `stroke-width`,
Geometrie, Deckkraftwerte, `role` und `aria-label`. Die Änderung ist in einem Schritt
rücknehmbar, indem die Zeichenfolge wieder eingesetzt wird.

---

## 4. Farbe und Einbau

**Farbe: `#A87D34`** (R-K). Begründung aus der Entscheidung: Die Striche sind haarfein
(`stroke-width: 1.25`) und stark abgeschwächt (Deckkraft bis herunter auf 0,16); das
hellere Gold verschwindet auf hellem Grund.

Gesetzt wird sie **einmal am Container**, nicht in den Dateien:

```css
.dialoge-symbol { color: #A87D34; }
```

```html
<span class="dialoge-symbol">
  <svg viewBox="0 0 240 240" … aria-hidden="true"> … </svg>
</span>
```

| Merkmal | Wert |
|---|---|
| ViewBox | `0 0 240 240` (alle vier, R-K) |
| `width` / `height` im Attribut | `240` — die ViewBox skaliert frei, CSS gewinnt |
| `stroke` | `currentColor` |
| `stroke-width` | `1.25`, in `04-gestalten` zusätzlich `1.9` auf der äußeren Ellipse |
| `fill` | `none`, Ausnahme: Mittelpunkt in `03-erkennen` mit `currentColor` |

| Symbol | Aufbau | Deckkraftstufen |
|---|---|---|
| 01 Loslassen | 5 Ellipsen, gemeinsam um −12° gedreht, nach innen kleiner und blasser, die inneren zwei gestrichelt | 1 · 0,75 · 0,5 · 0,3 · 0,16 |
| 02 Verbinden | 2 Kreise (r 72), überlappend; in der Schnittmenge 11 waagerechte Ellipsen | 0,85 auf der Ellipsengruppe |
| 03 Erkennen | 8 Ellipsen, vier links und vier rechts, dazwischen ein gefüllter Punkt (r 6,5) | 0,9 auf der Ellipsengruppe |
| 04 Gestalten | 6 hochkant-Ellipsen in 30°-Schritten gedreht, darüber eine breite Ellipse um −16° | 0,55 auf der Rosettengruppe |

---

## 5. Barrierefreiheit — `aria-hidden="true"` beim Einbetten

**Die vier Symbole sind dekorativ.** Jedes steht direkt neben seiner eigenen sichtbaren
Beschriftung — „01 LOSLASSEN", „02 VERBINDEN", „03 ERKENNEN", „04 GESTALTEN" (Copy-Strings
`S4.01.NUM` und `S4.01.H3` und so weiter).

**Beim Einbetten werden `role="img"` und `aria-label="…"` durch `aria-hidden="true"`
ersetzt** (R-K). Das ist keine Feinheit, sondern verhindert eine konkrete Doppelung:

Die vier Dateien tragen im Auslieferungszustand am Wurzelelement:

```xml
role="img" aria-label="Loslassen"
```

Solange ein SVG über `<img src="…" alt="">` eingebunden wird, ist das folgenlos — der
Browser behandelt es als ersetztes Bild, und `aria-label` **im** SVG wird nicht vorgelesen.
**Inline eingebettet wirkt es dagegen.** Der Screenreader liest dann „Loslassen" und
unmittelbar danach die sichtbare Beschriftung „01 LOSLASSEN": derselbe Inhalt zweimal.

Weil R-K die Inline-Einbettung festlegt, ist der Austausch verbindlich:

| | Vorher (Datei) | Nachher (eingebettet) |
|---|---|---|
| Wurzelelement | `role="img" aria-label="Loslassen"` | `aria-hidden="true"` |

**Warum die Dateien den Austausch nicht schon mitbringen.** Er gehört an die Einbaustelle,
nicht in die Zulieferung: `aria-hidden` ist nur richtig, solange die Beschriftung
tatsächlich daneben steht. Fiele sie im Layout weg, wäre `aria-label` wieder die richtige
Wahl. Die Dateien bleiben deshalb neutral, und der Webflow-Strang setzt es beim Einbetten.
Das ist die einzige Stelle, an der diese Lieferung Nacharbeit verlangt — sie ist hier
ausdrücklich benannt.

---

## 6. Zuordnung zu den Copy-Strings

| Datei | String-IDs | Beschriftung | Satz darunter |
|---|---|---|---|
| `01-loslassen` | `S4.01.NUM`, `S4.01.H3`, `S4.01.P` | 01 · LOSLASSEN | Raum schaffen. Nicht sofort wissen müssen. |
| `02-verbinden` | `S4.02.NUM`, `S4.02.H3`, `S4.02.P` | 02 · VERBINDEN | Mit dir selbst, anderen Menschen und dem Leben in Beziehung kommen. |
| `03-erkennen` | `S4.03.NUM`, `S4.03.H3`, `S4.03.P` | 03 · ERKENNEN | Wahrnehmen, was wirklich deins ist – und was entstehen will. |
| `04-gestalten` | `S4.04.NUM`, `S4.04.H3`, `S4.04.P` | 04 · GESTALTEN | Erkenntnis in Erfahrungen, Entscheidungen und konkrete Schritte übersetzen. |

Sektion 4 löst **kein** Analytics-Event aus, siehe `analytics-lightcreators-home.md`.

---

## 7. Fundstelle im Repository

Beide Sätze liegen unverändert an ihrem Platz:

```
briefing/0{1..4}-*.svg        ← maßgeblich (R-K), Quelle dieser Kopien
assets/icons/0{1..4}-*.svg    ← Verlaufssatz
```

Ein Befund aus der Erhebung vom 03.09.2026, der eine Annahme im Briefing korrigiert:
Punkt 2 des CC-2-Abschnitts begründet „Kopieren, nicht verschieben" damit, dass die
Originale „auf `davidliebnau.com` in Verwendung sind". **Das trifft nicht zu.** Keines der
vier Symbole wird von einer ausgelieferten Seite eingebunden — es gibt weder ein `<img>`
noch einen CSS-Verweis darauf. Am Vorgehen ändert das nichts (kopiert wurde ohnehin), aber
die Begründung stimmt nicht: Die Symbole liegen ungenutzt im Repository.

`assets/icons/` enthält daneben die fünf Icons der Founder-Resonance-Faktoren
(`Obsession.svg`, `Presence.svg`, `Vision.svg`, `Founder Fit.svg`, `Scalable Logic.svg`).
Sie gehören zum Founder-Material und sind in `founder-material-inventar.md` erfasst.

---

## 8. Abnahme

| Kriterium | Ergebnis |
|---|---|
| Vier SVG vorhanden | **ja** |
| Alle vier parsen fehlerfrei als XML | **ja** |
| Aus dem `currentColor`-Satz (R-K) | **ja** |
| Kein `linearGradient`, kein `#E3C486` mehr enthalten | **ja, geprüft** |
| ViewBox durchgehend `0 0 240 240` | **ja** |
| Keine PNG im Verzeichnis | **ja** |
| Originale in `briefing/` und `assets/icons/` unverändert | **ja** |
| Keine Datei außerhalb von `_briefings/phase2-lightcreators/` berührt (R-E) | **ja** |

---

## 9. Rückfragen

| ID | Frage | Blockiert |
|---|---|---|
| **RF-16** | Das Entfernen von `style="color:#E3C486"` ist die einzige Änderung an den Kopien und meine Auslegung von R-K („eine CSS-Zeile, jederzeit änderbar"). Falls die Symbole stattdessen ihre Farbe selbst tragen sollen, sag Bescheid — dann wird der Wert auf `#A87D34` gesetzt statt entfernt, und die CSS-Zeile entfällt. | — |
| ~~RF-9~~ | Goldwert — **entschieden: `#A87D34`** (R-K, 03.09.2026). | erledigt |
| ~~RF-10~~ | Führender Satz — **entschieden: der `currentColor`-Satz** (R-K, 03.09.2026). | erledigt |
