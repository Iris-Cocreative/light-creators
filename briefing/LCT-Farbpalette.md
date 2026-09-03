# LCT Brand Design Guidelines — Farbpalette

Quelle: `LCT-Brand Design Guidelines.pdf`, Seite mit Logo und Palette.
Ausgelesen am 03.09.2026 aus der Datei in OneDrive
(`Light Creators Tribe/Design/Iris Cocreative/`).

Diese Datei existiert, damit die Markenfarben nicht länger aus einer
Präsentationsschicht abgeleitet werden müssen. **Sie ist die Referenz.**
`assets/styles.css` und `styles.html` sind Ableitungen, keine Quelle.

---

## Die sieben Farben

| Name | Hex | Beschreibung aus den Guidelines |
|---|---|---|
| **Midnight Blue** | `#04171F` | Deep, steady, directional — holds the brand. |
| **Grounding Umber** | `#393231` | Earthy, warm depth, slightly unexpected, grounding shade. |
| **Gold Gradient** | `#FFDB9D` → `#A87D34` | Used for highlights, glow effects, typography gradients — transformation energy. |
| **Soft Gold** | `#E0B76F` | Premium accent — subtle, not loud. |
| **Aurora Tide** | `#83A18E` | Fresh, fluid, collaborative energy. |
| **Open Horizon** | `#05404C` | Clear thinking, forward motion. |
| **Luminous Sand** | `#FFF8E6` | Soft warm white — breathable and calm. |

Gegengeprüft: Die gedruckten Hexwerte wurden gegen die tatsächlichen Pixel der
Farbfelder abgetastet. Grounding Umber, Aurora Tide, Open Horizon und Luminous
Sand stimmen exakt. Midnight Blue misst `#03171F` und Soft Gold `#DFB76F`, je
eine Einheit daneben — das ist die Rasterung der eingebetteten Bitmap, nicht
das Dokument. **Es gelten die gedruckten Werte.**

---

## Namensabweichungen im Repository

Die Hexwerte stimmen überall überein, die Namen nicht. Wer nach einem Namen
sucht, findet je nach Datei etwas anderes.

| Hex | Guidelines | `styles.html` (Style-Guide-Export) | `assets/styles.css` |
|---|---|---|---|
| `#04171F` | Midnight Blue | Midnight Blue | `--color-deep-blue` |
| `#393231` | Grounding Umber | Earth **und** Dark Gray | `--color-graphite` |
| `#E0B76F` | Soft Gold | **Sun Touch** | `--color-gold` |
| `#83A18E` | Aurora Tide | Morning Dew | `--color-sage` |
| `#05404C` | Open Horizon | Open Horizon | `--color-teal` |
| `#FFF8E6` | Luminous Sand | **Summit Mist** | `--color-cream` |
| `#FFDB9D` → `#A87D34` | Gold Gradient | als Feld „Gradient" mit `#000000` geführt | nur als `linearGradient` in `assets/icons/03-erkennen.svg` |

Zwei Punkte, die daraus folgen:

- **`styles.html` ist als Farbquelle unbrauchbar.** Der Export führt drei Namen
  anders und den Gold Gradient als schwarzes Platzhalterfeld. Er war bis zum
  03.09.2026 die einzige Datei im Repo mit benannten Farbfeldern und wurde
  deshalb ersatzweise herangezogen; das ist mit dieser Datei erledigt.
- **Der Gold Gradient ist im CSS nicht als Variable definiert.** Er lebt nur im
  SVG. Steht seit längerem als Punkt in `BACKLOG.md`.

---

## Werte, die aus dem Gold Gradient abgeleitet wurden

Diese stehen **nicht** in den Guidelines, sondern sind auf `davidliebnau.com`
aus Kontrastgründen entstanden. Sie gehören dokumentiert, damit sie nicht für
Markenfarben gehalten werden.

| Wert | Wo | Warum |
|---|---|---|
| `#A87D34` `--color-gold-em` | `em` und Hervorhebungen auf hellem Grund | Soft Gold erreicht auf Luminous Sand nur Kontrast 1,77. Entspricht dem dunklen Ende des Gold Gradient. |
| `#8D651E` `--color-eyebrow` | Eyebrow-Zeilen, kleiner gesperrter Text auf hellem Grund | Kontrast 4,94, besteht AA für Kleintext. |

---

## Verwendung in den og-Karten

`briefing/og-vorschau/`, Stand 03.09.2026:

- Variante A und B: Grund **Midnight Blue `#04171F`**
- Variante C: Grund **Luminous Sand `#FFF8E6`**

**Soft Gold scheidet als Grund aus,** sobald Text darauf soll: Dunkler Text auf
`#E0B76F` erreicht die Schwelle nicht zuverlässig, heller Text erst recht nicht.
