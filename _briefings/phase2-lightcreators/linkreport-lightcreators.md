# CC-6 · Linkbericht `davidliebnau.com` → `light-creators.com`

**Aufgabe:** CC-6 aus `phase2-lightcreators-claude-code.md`
**Übergabepunkt:** I-5, fällig vor Freigabepunkt F1
**Stand der Erhebung:** 2. September 2026
**Erhoben auf:** Branch `phase2-zulieferungen`, abgezweigt von `phase1/threshold-proof-seo` (Commit `1cd3e07`)
**Änderungen an bestehenden Dateien:** keine. `ep-28` und `ep-29` sind unangetastet.

---

## 0. Zwei Korrekturen an der Aufgabenstellung

Beide betreffen Annahmen, die im Briefing und in `OFFENE-AUFGABEN-Relaunch.md` stehen und
sich am Code nicht bestätigt haben. Sie sind hier ausgewiesen, nicht stillschweigend
korrigiert.

### K-1 · Die nackten URLs stehen in zwei Episoden, nicht in einer

Das Briefing nennt in Abschnitt 1 (Guardrail 2), in CC-6 und in der Scope-Beschreibung
durchgehend „die beiden nackten URLs in Podcast-Episode 28". Dieselben zwei URLs stehen
wortgleich auch in **Episode 29** und zusätzlich in der Quelldatei `content/ep-29.txt`,
aus der der Generator die Seite erzeugt.

| Fundstelle | Zeile | URL |
|---|---|---|
| `episodes/ep-28-wo-machst-du-gerade-zu-viel.html` | 161 | `light-creators.com/quiz` |
| `episodes/ep-28-wo-machst-du-gerade-zu-viel.html` | 162 | `light-creators.com/call` |
| `episodes/ep-29-ich-frage-erst-um-hilfe-wenn-ich-es-nicht-mehr-alleine-.html` | 148 | `light-creators.com/quiz` |
| `episodes/ep-29-ich-frage-erst-um-hilfe-wenn-ich-es-nicht-mehr-alleine-.html` | 149 | `light-creators.com/call` |
| `content/ep-29.txt` | 51 | `light-creators.com/quiz` |
| `content/ep-29.txt` | 53 | `light-creators.com/call` |

Es sind also **vier** nackte URLs auf zwei veröffentlichten Seiten, plus zwei in einer
Quelldatei. Ein späterer Korrektur-Commit muss beide Episoden erfassen, sonst bleibt die
Hälfte stehen.

`content/` enthält nur diese eine Datei. Für ep-28 liegt keine Quelldatei im Repository;
ein `rebuild`-Lauf des Generators liest den redaktionellen Text aus der Seite selbst.
Praktische Folge: Ein Korrektur-Commit müsste bei ep-29 **zwei** Orte anfassen, die Seite
und `content/ep-29.txt`, sonst schreibt der nächste Generatorlauf die alte URL zurück.

### K-2 · Zwei weitere Episoden nennen die Domain im Fließtext, ohne Pfad

Diese beiden Stellen sind im Briefing nicht erwähnt und stehen weder in `BACKLOG.md` noch
in `OFFENE-AUFGABEN-Relaunch.md`. Sie brechen technisch nicht, sind aber inhaltlich
betroffen — siehe Liste C.

| Fundstelle | Zeile | Text |
|---|---|---|
| `episodes/ep-23-…-diese-rolle.html` | 139 | `<h3>Oder mach zuerst das Resonance Assessment: light-creators.com</h3>` |
| `episodes/ep-26-…-groesster-hebel-und-.html` | 155 | Bio-Absatz, endet auf „Mehr unter light-creators.com" |

---

## 1. Erhebungsmethode

Durchsucht wurde das gesamte Repository nach der Zeichenfolge `light-creators` in den
Dateitypen `.html`, `.md`, `.json`, `.js`, `.py`, `.txt`, `.xml`, `.css`. Erfasst wurden
sowohl Vorkommen in Attributen (`href`, `src`, `content`) als auch nackte Nennungen im
Fließtext, mit und ohne `https://`.

Ausgeschlossen: das Verzeichnis `.git` und `_briefings/` selbst.

Die Zielpfade wurden am 2. September 2026 **live abgerufen**, nicht nur gegen die Liste im
Briefing abgeglichen.

| Pfad | HTTP | Pfad | HTTP |
|---|---|---|---|
| `/` | 200 | `/podcast` | 200 |
| `/en` | 200 | `/buch` | 200 |
| `/quiz` | 200 | `/impressum` | 200 |
| `/call` | 200 | `/datenschutz` | 200 |
| `/quiz-en` | 200 | `/abgs` | 200 |
| `/call-en` | 200 | `/tribe` | **404** |
| | | `/about` | **404** |

`/tribe` und `/about` sind heute nicht vorhanden. Das ist keine Regression, sondern der
Ist-Zustand, und für **OD-5** (Tribe-Pfad) und **OD-7** (Navigation mit „About") die
relevante Tatsache: Beide Ziele müssten neu entstehen.

---

## 2. Gesamtbild

Nur vier Zielpfade kommen im Repository überhaupt vor.

| Ziel | Verlinkte Anker | Nackt im Fließtext | In nicht ausgelieferten Dateien |
|---|---|---|---|
| `https://light-creators.com` (Wurzel) | 71 | 5 | Doku, Archiv, Generatorvorlage |
| `https://light-creators.com/en` | 32 | — | Generatorvorlage |
| `light-creators.com/quiz` | — | 4 | Archiv, Quelldatei |
| `light-creators.com/call` | — | 4 | Archiv, Quelldatei |

**Kein einziger Link zeigt auf einen tieferen Pfad als diese vier.** Es gibt keine
Verweise auf `/podcast`, `/buch`, `/quiz-en`, `/call-en` oder die Rechtsseiten von
`light-creators.com`.

---

## 3. Liste A · Stabil

Ziel existiert, wird in Phase 2 nicht angefasst, Bruchrisiko gering.

### A-1 · Wurzel `https://light-creators.com`, als Anker

| Datei | Zeilen | Art | Anzahl |
|---|---|---|---|
| `index.html` | 123, 335, 631, 648, 693 | Anker, teils mit Plausible-Event | 5 |
| `index-en.html` | 123, 335, 632, 693 | Anker, teils mit Plausible-Event | 4 |
| `podcast.html` | 424, 504, 546 | Anker | 3 |
| `fuehren/index.html` | 297 | Footer-Anker | 1 |
| `fuehren/en/index.html` | 296 | Footer-Anker | 1 |
| `episodes/*.html` (30 Dateien) | je CTA-Block und Footer | Anker | 60 |

**Summe 74 Anker auf die Wurzel.** Davon tragen fünf auf den beiden Startseiten das Event
`outbound_light_creators_click`; die übrigen 69 sind ungemessen.

Technisch stabil: Die Wurzel bleibt erreichbar, auch wenn dort etwas anderes ausgeliefert
wird. **Inhaltlich ist genau das der Bruch** — siehe Liste C.

### A-2 · `https://light-creators.com/en`, als Anker

| Datei | Zeilen | Anzahl |
|---|---|---|
| `podcast.html` | 554 | 1 |
| `episodes/*.html` (30 Dateien) | Footer, „English" | 30 |
| `tools/generate_episode.py` | 423 | Vorlage, nicht ausgeliefert |

**Summe 31 ausgelieferte Anker.** `/en` ist die englische Founder-Seite und wird in
Phase 2 nicht umgebaut. Nach Regel R-B zieht der Founder-Inhalt der **deutschen** Wurzel
auf einen Interim-Pfad um; ob `/en` davon mitbetroffen ist, steht im Briefing nicht und
ist eine offene Frage — siehe Abschnitt 6, Rückfrage RF-2.

### A-3 · `/quiz` und `/call` als nackte URLs

Die vier Fundstellen aus K-1. Beide Zielseiten antworten mit 200. Phase 2 baut die
Startseite um, nicht `/quiz` oder `/call`. Damit sind sie für diese Phase **stabil**.

Sie bleiben als **Beobachtungspunkt** im Bericht, weil sie die einzigen Stellen im
gesamten Repository sind, die auf einen tieferen Pfad zeigen, und weil sie als reiner
Text nicht klickbar sind: Bricht der Pfad, merkt es niemand über einen 404-Report, weil
kein Crawler ihnen folgt.

---

## 4. Liste B · Gefährdet

Ziel könnte sich durch Phase 2 oder eine Folgephase ändern.

| # | Fundstelle | Ziel | Warum gefährdet | Hängt an |
|---|---|---|---|---|
| **B-1** | `index.html:34`, `index-en.html:34` | `https://light-creators.com` in JSON-LD, `Person.worksFor.Organization.url` | Strukturierte Daten, kein sichtbarer Link. Die Aussage lautet: David Liebnau arbeitet für die Organisation „Light Creators" unter dieser URL. Wird die Wurzel zum Marken-Hub, bleibt die Aussage richtig. Zieht der Founder-Inhalt weg und die Wurzel wird etwas anderes, ist zu prüfen, ob `Organization.url` weiter stimmt. | OD-2b |
| **B-2** | `episodes/*.html`, 30× Footer-Anker `/en` | `https://light-creators.com/en` | Betroffen, sobald die englische Founder-Fassung ebenfalls umzieht. Im Briefing nicht adressiert. | RF-2 |
| **B-3** | `tools/generate_episode.py:381, 415, 423` | Wurzel und `/en` in `PAGE_TEMPLATE` | Nicht ausgeliefert, aber die Quelle für alle 30 Episoden. Eine Pfadänderung, die nur in den Episodenseiten korrigiert wird, kommt beim nächsten `rebuild` zurück. **Die Vorlage muss bei jedem Korrektur-Commit mitlaufen.** | jeder Pfadwechsel |
| **B-4** | `content/ep-29.txt:51, 53` | `/quiz`, `/call` | Quelldatei für ep-29. Gleiche Mechanik wie B-3: Korrektur nur in der HTML-Datei wird vom nächsten Generatorlauf überschrieben. | jeder Pfadwechsel |

**B-3 und B-4 sind der eigentliche Fallstrick dieses Berichts.** Das Repository hat zwei
Ebenen, die dieselbe URL tragen: die erzeugte Seite und ihre Quelle. Wer nur die Seiten
korrigiert, hat es scheinbar erledigt.

---

## 5. Liste C · Inhaltlich zu prüfen

Kein technischer Bruch — die URL antwortet weiter mit 200. Aber der Link verspricht etwas,
das an der Zieladresse nach dem Umbau nicht mehr steht. Ein Besucher, dem „hier findest du
das Founder Resonance Assessment" zugesagt wurde und der auf einem Marken-Hub landet,
erlebt ein gebrochenes Versprechen, das kein Linkchecker findet.

Alle folgenden Fälle hängen an **OD-2b**: Erst wenn feststeht, auf welchen Interim-Pfad
der Founder-Inhalt zieht, lässt sich entscheiden, ob der Link umgehängt oder der Text
umformuliert wird.

### C-1 · Links, deren Beschriftung ein Founder-Angebot zusagt

| Datei | Zeile | Beschriftung | Ziel heute |
|---|---|---|---|
| `index.html` | 123 | „Founder Resonance Assessment auf light-creators.com" | Wurzel |
| `index.html` | 631 | „Für Founder Resonance: light-creators.com" | Wurzel |
| `index.html` | 648 | „→ light-creators.com" mit Unterzeile „Founder Resonance" | Wurzel |
| `index.html` | 693 | Footer: „Für Founder Resonance: light-creators.com" | Wurzel |
| `index-en.html` | 123 | „Founder Resonance Assessment at light-creators.com" | Wurzel |
| `index-en.html` | 632, 693 | „For Founder Resonance: light-creators.com" | Wurzel |
| `podcast.html` | 424 | im Block „Für Founder Resonance: *light-creators.com*" | Wurzel |
| `podcast.html` | 504 | „→ light-creators.com", Unterzeile „Founder Resonance" | Wurzel |
| `podcast.html` | 546 | Footer | Wurzel |
| `fuehren/index.html` | 297 | Footer: „Für Founder Resonance: light-creators.com" | Wurzel |
| `fuehren/en/index.html` | 296 | Footer, englisch | Wurzel |
| `episodes/*.html` | 30× CTA, 30× Footer | „Für Founder Resonance: light-creators.com" | Wurzel |

**Das sind 71 von 74 Wurzel-Ankern.** Die Beschriftung sagt in fast allen Fällen
ausdrücklich „Founder Resonance". Wird die Wurzel zum Marken-Hub, zeigen 71 Links mit
Founder-Versprechen auf eine Seite, die zwei Wege anbietet und den Founder-Weg erst nach
der Selbstselektion erreichbar macht.

Das ist nicht zwingend falsch — der Hub führt weiter zum Founder-Weg. Es ist aber ein
zusätzlicher Schritt, der vorher nicht da war, und er trifft **jede Episodenseite**.

### C-2 · Reiner Fließtext mit demselben Versprechen

| Datei | Zeile | Text | Art |
|---|---|---|---|
| `episodes/ep-23-…` | 139 | „Oder mach zuerst das Resonance Assessment: light-creators.com" | `<h3>`, nicht verlinkt |
| `episodes/ep-26-…` | 155 | Bio: „… Mehr unter light-creators.com" | Absatz, nicht verlinkt |
| `index.html` | 644 | „Founder work lives at light-creators.com." | Absatz, nicht verlinkt |
| `podcast.html` | 500 | derselbe Satz | Absatz, nicht verlinkt |
| `ep-28`, `ep-29` | siehe K-1 | „→ light-creators.com/quiz" / „/call" | Absatz, nicht verlinkt |

### C-3 · Nennung in der Datenschutzerklärung

`datenschutz/index.html:176`, Ziffer 8 „Verlinkte Angebote": „Diese Website verlinkt auf
externe Angebote, unter anderem auf Spotify, Apple Podcasts, LinkedIn und
light-creators.com."

Die Aussage bleibt richtig, solange irgendein Link dorthin zeigt. **Berührt aber OD-1b:**
Läuft auf `light-creators.com` weiterhin ein Meta Pixel, ist zu prüfen, ob dieser Satz
als Hinweis ausreicht oder ob die Weiterleitung auf einen Drittanbieter-Tracker
deutlicher benannt werden muss. Das ist eine Rechtsfrage und wird hier nur benannt, nicht
beantwortet.

### C-4 · Kommentar in `assets/styles.css`

Zeile 3: „Aligned with light-creators.com (Deep Blue V2)". Kein Link, kein Nutzerkontakt.
Wird nur relevant, wenn **OD-9** zugunsten eines eigenen Design-Systems für Light Creators
entschieden wird — dann beschreibt der Kommentar eine Angleichung, die es nicht mehr gibt.

---

## 6. Nicht ausgelieferte Fundstellen

Vollständigkeitshalber erfasst, kein Handlungsbedarf. Diese Dateien werden nicht an
Besucher ausgeliefert.

| Datei | Anzahl | Art |
|---|---|---|
| `_archiv/index-en-alt.html` | 14 | Archiv, `robots.txt` sperrt `/_archiv/`, `noindex`. Enthält als einzige Stelle außerhalb der Episoden `/quiz` und `/call` |
| `_archiv/founder-resonance-bloecke.html` | 1 | Archiv, gesperrt |
| `briefing/*.md` | 55 | Arbeitsdokumente |
| `BACKLOG.md`, `README.md`, `COMPLETION-SPRINT-2026-08-16.md` | 10 | Arbeitsdokumente |
| `quiz-assets/*` | 14 | Prototypen, `noindex`, an Webflow gebunden |
| `landing-pages/*` | 9 | `noindex` |
| `quiz-2.0.html`, `solo.html` | 4 | `noindex` bzw. nicht verlinkt |

---

## 7. Rückfragen

Keine dieser Fragen wird hier beantwortet oder durch eine Annahme ersetzt.

| ID | Frage | Blockiert |
|---|---|---|
| **RF-1** | Der Korrektur-Commit nach dem Publish muss vier Ebenen erfassen: die beiden Episodenseiten, `content/ep-29.txt` und `tools/generate_episode.py`. Soll er das in einem Commit tun oder pro Ebene getrennt, damit die Rücknahme feiner wird? | S10 |
| **RF-2** | Zieht die englische Founder-Fassung `/en` zusammen mit der deutschen Wurzel auf einen Interim-Pfad um, oder bleibt sie, wo sie ist? Betrifft 31 ausgelieferte Anker. Im Briefing nicht adressiert; OD-2b spricht nur von „der alten Startseite". | S1, F1 |
| **RF-3** | Die 71 Wurzel-Anker tragen fast alle die Beschriftung „Founder Resonance". Sollen sie nach dem Umbau auf den Interim-Pfad umgehängt werden, oder bleiben sie auf der Wurzel und die Beschriftung wird angepasst? Das ist eine redaktionelle Entscheidung mit 71 Fundstellen, davon 60 in generierten Episoden. | F1, S10 |
| **RF-4** | `Person.worksFor.Organization.url` in den beiden JSON-LD-Blöcken: bleibt die Wurzel, oder zeigt sie nach dem Umzug auf den Founder-Pfad? | OD-2b |

---

## 8. Ergebnis für die Redirect-Liste des Webflow-Strangs

Aus diesem Repository heraus werden auf `light-creators.com` genau vier Pfade
angesprochen. Wird einer davon verschoben, braucht er eine Weiterleitung:

```
/            ← 74 Anker + 5 Fließtextnennungen, alle Seitentypen
/en          ← 31 Anker, Podcast und alle 30 Episoden
/quiz        ← 4 nackte Nennungen, ep-28 und ep-29
/call        ← 4 nackte Nennungen, ep-28 und ep-29
```

Weiterleitungen fangen die Anker auf. Sie fangen **nicht** die nackten Nennungen auf:
Ein Besucher, der `light-creators.com/quiz` abtippt, landet auf der Weiterleitung — das
funktioniert. Ein Besucher, der den Text nur liest und sich den Pfad merkt, bekommt von
einer Weiterleitung nichts mit, und die gedruckte Zeile bleibt falsch, sobald der Pfad
sich ändert. Deshalb ist der Korrektur-Commit für ep-28 und ep-29 nach dem Publish nicht
optional, sondern die einzige Absicherung für diese vier Stellen.
