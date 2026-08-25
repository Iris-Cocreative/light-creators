# Briefing: Überarbeitung /fuehren/

Zwei Änderungen nach dem visuellen Durchgang: der Hero wird umgebaut, und die
Seite bekommt einen Farbrhythmus statt durchgehendem Beige.

Branch: `relaunch/fuehren-hero-farben`. Ein Commit pro Abschnitt.

---

## 1. Der Hero wird zweispaltig

**Warum, damit die Entscheidung nachvollziehbar ist.** Der Vollbild-Hero ist
bei 70vh etwa doppelt so breit wie hoch. `cover` schneidet jedes Bild auf
dieses Verhältnis, deshalb bleibt vom Porträt nur der Kopf. Ein anderer
Ausschnitt hilft nicht, der Browser schneidet ihn erneut zurecht. Nur ein
eigener Bildbereich löst das.

**Zielaufbau ab 880 Pixeln Breite:**

- Zwei Spalten nebeneinander. Links Text, rechts Bild.
- Textspalte etwa 55 Prozent, Bildspalte etwa 45 Prozent. Der genaue Wert ist
  deine Entscheidung nach Messung, siehe unten.
- Kein Hintergrundbild mehr, kein Verlauf über dem Bild, keine Abdunklung.
  Der Text steht auf ruhigem Hintergrund, nicht auf dem Foto.
- Hintergrund der Hero-Sektion: Luminous Sand `#FFF8E6`, also
  `var(--color-cream)`.
- Bild: neue Datei `hero-fuehren-split.webp`, 1200 × 1500, Hochformat.
  `object-fit: cover`, volle Höhe der Sektion, bündig mit dem rechten
  Seitenrand oder mit Rundung, je nachdem was der Bestand sonst tut.
- Höhe der Sektion: `min-height: 70vh`, wie bisher.
- Textfarben zurück auf die normalen Werte der Seite. Die Sonderfarben Creme
  und Gold aus dem alten Modifier entfallen, weil der Text nicht mehr auf
  dunklem Grund steht.

**Unter 880 Pixeln:**

- Einspaltig. Bild oben, Text darunter.
- Bildhöhe etwa 45vh, `object-position: center top`, damit das Gesicht sicher
  im Bild bleibt.
- Kein Verlauf nötig, der Text steht unter dem Bild auf Luminous Sand.

**Das Bild ist bereits gespiegelt.** Grund: Der Blick soll in den Text laufen,
nicht aus dem Bild hinaus. Nicht erneut spiegeln, nicht per CSS
zurückdrehen.

**Was aufgeräumt wird:** Der Modifier `.hero--photo-fuehren` mit
Hintergrundbild, den beiden Verläufen, dem Nav-Schleier und den Sonderfarben
wird nicht mehr gebraucht. Entferne ihn vollständig, statt ihn zu
überschreiben. Die Dateien `hero-fuehren-wide.webp` und
`hero-fuehren-portrait.webp` werden nicht mehr verwendet. Lösche sie nicht,
leg sie nur beiseite und melde mir, dass sie ungenutzt sind.

**Prüfen und melden:**
- Sitzt der Textblock bei 1280, 1440 und 1920 optisch ruhig neben dem Bild,
  oder wird die Textspalte bei 1920 zu breit? Wenn ja, deckle sie mit
  `max-width`.
- Ist bei 880 bis 1100 Pixeln beides gleichzeitig lesbar, oder sollte der
  Umbruch auf einspaltig früher greifen? Sag mir deinen Messwert.
- Screenshot bei 1440 und bei 390.

---

## 2. Farbrhythmus für die Seite

Aktuell laufen alle Abschnitte auf Luminous Sand. Das ist ruhig, aber über
sieben Abschnitte hinweg monoton. Die Palette hat mehr zu bieten.

**Nur Hintergrundfarben ändern, sonst nichts.** Keine neuen Abstände, keine
neuen Komponenten, keine neuen Schriftgrößen.

| Abschnitt | Hintergrund | Variable | Schriftfarbe |
|---|---|---|---|
| Hero | Luminous Sand | `--color-cream` | wie bisher dunkel |
| Zwei Sätze | Luminous Sand | `--color-cream` | dunkel |
| Wie ich arbeite | **Open Horizon** | `--color-teal` | Luminous Sand, Akzente in Soft Gold |
| Formate | Luminous Sand | `--color-cream` | dunkel |
| Wofür ich nicht der Richtige bin | **Grounding Umber** | `--color-graphite` | Luminous Sand |
| Belege | Luminous Sand | `--color-cream` | dunkel |
| Briefing-Gespräch | **Midnight Blue** | `--color-deep-blue` | Luminous Sand, Button in Soft Gold |

**Die Logik dahinter, damit du sie bei Zweifeln anwenden kannst:** Zwei helle
Abschnitte, dann ein dunkler. Der dunkle Abschnitt markiert jeweils einen
Wendepunkt im Lesefluss: die Methode, die Abgrenzung, der Abschluss. Die
hellen Abschnitte tragen die Erklärung. Nie zwei dunkle direkt hintereinander.

**Aurora Tide `#83A18E` bleibt auf dieser Seite ungenutzt.** Die Farbe ist
weicher und passt besser zur Threshold-Welt. Nicht einbauen.

**Prüfen und melden:**
- Kontrast von Text auf Open Horizon, Grounding Umber und Midnight Blue.
  Mindestens 4,5:1 für Fließtext, 3:1 für große Überschriften. Wenn ein Wert
  darunter liegt, sag es mir, statt die Farbe eigenmächtig aufzuhellen.
- Bleiben Links und Buttons auf den dunklen Abschnitten sichtbar? Das hängt
  mit deinem Fund zu `color: inherit` zusammen.
- Sind die Übergänge zwischen hell und dunkel sauber, ohne helle Kante am
  Sektionsrand?
- Screenshots aller sieben Abschnitte bei 1440.

---

## 3. Prüfen, ob dasselbe auf der Startseite sinnvoll ist

Nur prüfen, nicht ändern. Sag mir, welche Abschnitte der Startseite heute
welchen Hintergrund haben und ob dort bereits ein Wechsel stattfindet. Wenn
die Startseite ebenfalls durchgehend hell ist, überlegen wir denselben
Rhythmus dort, aber das ist ein eigener Auftrag.

---

## 4. Reihenfolge

1. Hero umbauen, messen, Screenshot, melden.
2. Danach erst der Farbrhythmus.
3. Kein Pull Request ohne meine Freigabe.
