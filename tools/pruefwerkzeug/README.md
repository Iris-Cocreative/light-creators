# Prüfwerkzeug

Misst Kontrast, Überlauf, Nähte und die Kopfdaten der Seiten gegen den lokalen
Vorschauserver. Gemessen wird am tatsächlichen Pixel im Screenshot, nicht am
CSS-Farbwert, und über einen headless Edge, der per DevTools-Protokoll gesteuert
wird.

## Einmalig bauen

```bash
bash tools/pruefwerkzeug/bauen.sh
```

Baut vier kleine Swift-Werkzeuge nach `bin/` (nicht im Repository):

| Werkzeug | Aufgabe |
|---|---|
| `cdp` | steuert den Browser: Fenstergröße, Seite laden, CSS einschleusen, scrollen, JS auswerten, Screenshot |
| `ana` | liest Pixel: `contrast` (schwächster Wert je Textzeile), `rows` (Farbabstand zweier Pixelzeilen, für Nähte) |
| `img` | zuschneiden, skalieren, weichzeichnen, AVIF/JPEG schreiben, Rauschkachel, Helligkeitswerte |
| `comp` | Bilder zuschneiden und zu Übersichten stapeln oder nebeneinanderlegen |

Voraussetzungen: macOS mit Xcode-Befehlszeilenwerkzeugen (`swiftc`) und Microsoft
Edge unter `/Applications`. Google Chrome reicht nicht, die App dort ist nur eine
Hülle ohne Binärdatei.

## Vorschauserver

Die Prüfungen erwarten das Repository unter `http://localhost:4173`:

```bash
python3 -m http.server 4173
```

## Prüfen

```bash
python3 tools/pruefwerkzeug/pruefen.py ueberlauf     # 320, 360, 390, 1440 px
python3 tools/pruefwerkzeug/pruefen.py kontrast      # jede Textzeile unter 18px
python3 tools/pruefwerkzeug/pruefen.py nav           # nur die Leiste, oben und gescrollt
python3 tools/pruefwerkzeug/pruefen.py statisch      # Links, Sprungmarken, Kopfdaten, Events
```

Ohne Zusatz laufen sie auf drei stellvertretenden Seiten: Startseite (langer
Foto-Hero), `/fuehren/` (heller Hero) und eine Episodenseite aus der Vorlage.
Vollständig mit `--alle`, eigene Auswahl mit `--seiten / /podcast.html`.
Der Browser wird beim ersten Aufruf selbst gestartet und bleibt stehen.

## Was dabei leicht schiefgeht

Diese vier Fallen haben beim Aufbau jeweils falsche Zahlen erzeugt. Sie sind im
Werkzeug abgefangen, aber gut zu wissen, wenn jemand etwas daran ändert:

1. **Einblend-Animationen.** `.fade-in` startet auf `opacity: 0`. Wer sofort
   misst, misst den halb eingeblendeten Zustand. Deshalb schaltet jede Messung
   `transition` und `animation` ab und zwingt `.fade-in` auf sichtbar.
2. **Farben nicht per `style.disabled` zurückholen.** Das Ab- und Anschalten des
   eingeschleusten Verstecken-Stylesheets liefert auf manchen Seiten weiter
   transparente Farben. Deshalb zwei Durchgänge: erst Farben und Zeilen messen,
   dann mit verstecktem Text aufnehmen.
3. **Text unter der fixierten Leiste.** Beim Scrollen liegt Text hinter der
   Navigation. Solche Zeilen sind verdeckt, nicht kontrastschwach, und bleiben
   außen vor.
4. **Bilder mit `loading="lazy"`.** `img.decode()` löst bei einem Bild weit
   unterhalb des Fensters nie aus. Der Browser-Baustein stellt alle Bilder auf
   `eager` und wartet höchstens vier Sekunden.

Dazu: Messbesuche auf der Live-Domain werden in Plausible mitgezählt, wenn man
sie lässt. `cdp` blockt deshalb `plausible.io`.

## Maßstäbe

* Kontrast: mindestens 4,5 : 1 für Text unter 18 px, gemessen gegen das
  schwächste tatsächliche Pixel hinter den Zeilen.
* Überlauf: `scrollWidth` gleich Fensterbreite bei 320, 360, 390 und 1440 px.
* Nähte (Threshold): höchstens 3 Einheiten Farbabstand je Kanal zwischen den
  Pixelzeilen direkt über und unter einer Flächengrenze, gemessen mit
  `bin/ana rows BILD ZEILE X0 X1`.
