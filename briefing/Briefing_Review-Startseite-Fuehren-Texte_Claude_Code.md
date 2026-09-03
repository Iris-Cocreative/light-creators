# Briefing: Review Startseite und Führen-Seite — Textänderungen und drei Funde

Stand: 3. September 2026. Aus Davids Review der deutschen Startseite und der
Führen-Seite.

> Ablage: Im Briefing war `_briefings/2026-09_review-startseite-fuehren-texte.md`
> vorgeschlagen. Abgelegt nach der Phase-1-Konvention in `briefing/`. `_briefings/`
> gehört zum Phase-2-Branch und ist hier bewusst nicht angelegt.

---

## Befund vor der Umsetzung: die Abschnitte liegen anders als angenommen

Das Briefing verlangt: „Vorher prüfen: Auf welchen Seiten stehen die Abschnitte […]
jeweils? Wenn ein Abschnitt doppelt liegt […], vor dem Ersetzen zurückmelden."

Geprüft am 03.09.2026. **Kein Abschnitt liegt doppelt.** Aber drei der vier liegen
auf der Startseite, nicht auf der Führen-Seite:

| Abschnitt | Tatsächlicher Ort | Im Briefing angenommen |
|---|---|---|
| „Die Lücke" | `index.html:164`, `index-en.html:164` — **Startseite** | Führen-Seite |
| „Zwei Schulen" | `index.html:395`, `index-en.html:395` — **Startseite** | Führen-Seite |
| „Wie ich arbeite / Zukunftsintelligenz" (`#methode`) | `index.html:187`, `index-en.html:187` — **Startseite** | Führen-Seite |
| „Vorgehen / Wie ich arbeite." | `fuehren/index.html:114`, `fuehren/en/index.html:114` | Führen-Seite ✔ |

Folge für Punkt 4 und 5: Die Begründung „stand zweimal auf derselben Seite" trifft
nicht zu — die beiden Überschriften standen auf **zwei verschiedenen Seiten**. Die
Anweisungen selbst bleiben eindeutig, weil jeder Abschnitt genau einmal existiert.
Sie wurden deshalb umgesetzt, die Begründung ist hier korrigiert.

### Punkt 1 · Der `localhost`-Link ist ein Fehlalarm

Im Quelltext steht `href="/#methode"` — wurzelrelativ. In der lokalen Vorschau löst
der Browser das zu `http://localhost:4173/#methode` auf; auf Produktion wird daraus
`https://davidliebnau.com/#methode`. Was im Review zu sehen war, ist die
Vorschauumgebung, nicht der Code.

Repo-weite Suche nach `localhost` und `127.0.0.1` in HTML, CSS, JS, JSON, XML und
Python: **null Fundstellen** im ausgelieferten Code. Die einzige Fundstelle im
gesamten Repository ist `briefing/briefing-landingpage-hauptseite.md`, ein
Arbeitsdokument. Nichts geändert.

### Punkt 6 · Die vier Schritte liegen nicht doppelt

`methode-symbol` kommt in `index.html` viermal vor und in `index-en.html` viermal.
Auf `fuehren/index.html` und `fuehren/en/index.html` **gar nicht**. Die vier Schritte
stehen nur auf der Startseite, in beiden Sprachfassungen. Nichts gekürzt.

### Punkt 3 · R2 greift hier nicht

„preisgekrönt" wurde im Zwei-Schulen-Absatz zu „ausgezeichnete" geändert. Der Satz
nennt den HR Excellence Award **nicht** — er spricht von „ausgezeichnete
Blended-Learning-Architekturen". R2 gilt nur für Sätze, die den Award benennen; der
Wächter `assets/award-context.js` greift hier folglich nicht.

Alle tatsächlichen Award-Fundstellen wurden nachgeprüft: Jede nennt die SYNK GROUP im
selben Element. R2 ist unverletzt. „preisgekrönt" im Hero (`index.html:127`,
`index-en.html:127`) blieb unverändert, wie im Briefing verlangt.

### Sinyan-Umbruch nicht reproduzierbar

`.proof-name` und `.proof-role` stehen beide auf `display: block`; gemessen beginnt
die Rollenzeile zwei Pixel unter der Namenszeile. Auch im Testimonial-Block der
Startseite bricht es korrekt um. Nichts geändert — falls es in einem bestimmten
Browser oder einer bestimmten Breite doch zusammenläuft, brauche ich Browser und
Fensterbreite.

---

## Umgesetzt

- Punkt 2, „Die Lücke", DE und EN. Eyebrow und H2 blieben stehen, weil das Briefing
  für diesen Abschnitt keine neue H2 vorgibt und ein Entfernen eine Strukturänderung
  wäre. **Offen: Soll die H2 „Für den Übergang selbst ist niemand zuständig." bleiben?**
  Der neue erste Absatz sagt inhaltlich dasselbe.
- Punkt 3, „Zwei Schulen", DE und EN. Eyebrow und H2 entsprachen bereits dem Briefing.
- Punkt 4, Führen-Seite: „Vorgehen / Wie ich arbeite." → „Ergebnisse / Was dir die
  Zusammenarbeit bringt." Die drei alten Bewegungen sind entfallen, sechs neue
  Ergebnispunkte stehen dort. Die Sinyan-Empfehlung und der Link auf die vier
  Schritte blieben unverändert an ihrer Stelle.
- Punkt 5, Startseite: „Wie ich arbeite" → „Die Methode". H2 unverändert, drei neue
  Absätze. Der Anker `#methode` ist unverändert; die beiden Links darauf stehen auf
  `fuehren/index.html:138` und `fuehren/en/index.html:138` und funktionieren weiter.
- Zusätzlich, aus der Nachricht vom selben Tag: Rückweg-Leiste auf den beiden
  Threshold-Hauptseiten.

## Nicht umgesetzt, wartet auf Entscheidung

- Punkt 7, Bowie-Zitat: als offener Punkt im Backlog, siehe `BACKLOG.md`.
- Die Linkfarbe auf der Startseite: siehe Rückfrage im Ergebnisbericht.
