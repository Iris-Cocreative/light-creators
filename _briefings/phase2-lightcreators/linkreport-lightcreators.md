# CC-6 · Linkbericht `davidliebnau.com` → `light-creators.com`

**Aufgabe:** CC-6 aus `phase2-lightcreators-claude-code.md`
**Übergabepunkt:** I-5, fällig vor Freigabepunkt F1
**Stand der Erhebung:** 3. September 2026
**Erhoben auf:** Branch `phase2-zulieferungen`, Stand `main` (Commit `2060bb8`)
**Nachgeprüft:** 4. September 2026 gegen `main` bei `98b50ce` — Zeilennummern und Anzahlen unverändert
**Änderungen an bestehenden Dateien:** keine. `ep-28` und `ep-29` sind unangetastet.

> **Hinweis zu den Zeilennummern.** Dieser Bericht wurde am 03.09.2026 gegen den
> aktuellen `main` neu erhoben. Gegenüber der Fassung vom 02.09.2026 haben sich durch
> die Phase-1-Commits Zeilennummern verschoben (typisch +2 bis +5). Die hier genannten
> Nummern gelten für `main` bei `2060bb8`. Die **Anzahlen** haben sich nicht verändert.

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
| `episodes/ep-28-wo-machst-du-gerade-zu-viel.html` | 163 | `light-creators.com/quiz` |
| `episodes/ep-28-wo-machst-du-gerade-zu-viel.html` | 164 | `light-creators.com/call` |
| `episodes/ep-29-ich-frage-erst-um-hilfe-wenn-ich-es-nicht-mehr-alleine-.html` | 150 | `light-creators.com/quiz` |
| `episodes/ep-29-ich-frage-erst-um-hilfe-wenn-ich-es-nicht-mehr-alleine-.html` | 151 | `light-creators.com/call` |
| `content/ep-29.txt` | 51 | `light-creators.com/quiz` |
| `content/ep-29.txt` | 53 | `light-creators.com/call` |

Es sind also **vier** nackte URLs auf zwei veröffentlichten Seiten, plus zwei in einer
Quelldatei. Ein späterer Korrektur-Commit muss beide Episoden erfassen, sonst bleibt die
Hälfte stehen.

`content/` enthält nur diese eine Datei. Für ep-28 liegt keine Quelldatei im Repository.
Praktische Folge: Ein Korrektur-Commit müsste bei ep-29 **zwei** Orte anfassen, die Seite
und `content/ep-29.txt`, sonst schreibt ein späterer Generatorlauf die alte URL zurück.

### K-2 · Zwei weitere Episoden nennen die Domain im Fließtext, ohne Pfad

Diese beiden Stellen sind im Briefing nicht erwähnt und stehen weder in `BACKLOG.md` noch
in `OFFENE-AUFGABEN-Relaunch.md`. Sie brechen technisch nicht, sind aber inhaltlich
betroffen — siehe Liste C.

| Fundstelle | Zeile | Text |
|---|---|---|
| `episodes/ep-23-…-diese-rolle.html` | 141 | `<h3>Oder mach zuerst das Resonance Assessment: light-creators.com</h3>` |
| `episodes/ep-26-…-groesster-hebel-und-.html` | 157 | Bio-Absatz, endet auf „Mehr unter light-creators.com" |

---

## 1. Erhebungsmethode

Durchsucht wurde das gesamte Repository nach der Zeichenfolge `light-creators` in den
Dateitypen `.html`, `.md`, `.json`, `.js`, `.py`, `.txt`, `.xml`, `.css`. Erfasst wurden
sowohl Vorkommen in Attributen (`href`, `src`, `content`) als auch nackte Nennungen im
Fließtext, mit und ohne `https://`.

Ausgeschlossen: das Verzeichnis `.git`, `_briefings/` selbst und die beiden
Phase-2-Briefings unter `briefing/`.

Roher Fundbestand: 285 Zeilen. Nach Abzug der eigenen Zulieferungen und der beiden
Phase-2-Briefings: **181 Zeilen** in 60 Dateien.

Die Zielpfade wurden am **3. September 2026 live abgerufen**, nicht nur gegen die Liste im
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

| Ziel | Verlinkte Anker (ausgeliefert) | Nackt im Fließtext | In nicht ausgelieferten Dateien |
|---|---|---|---|
| `https://light-creators.com` (Wurzel) | 74 | 5 | Doku, Archiv, Generatorvorlage, 1 noindex-Landingpage |
| `https://light-creators.com/en` | 31 | — | Generatorvorlage |
| `light-creators.com/quiz` | — | 4 | Archiv, Quelldatei |
| `light-creators.com/call` | — | 4 | Archiv, Quelldatei |

Gegenprobe über das ganze Repository: 79 Wurzel-Anker insgesamt = 74 ausgeliefert
+ 2 in `_archiv/` + 2 in der Generatorvorlage + 1 in einer `noindex`-Landingpage.
32 `/en`-Anker insgesamt = 31 ausgeliefert + 1 in der Generatorvorlage.

**Kein einziger Link zeigt auf einen tieferen Pfad als diese vier.** Es gibt keine
Verweise auf `/podcast`, `/buch`, `/quiz-en`, `/call-en` oder die Rechtsseiten von
`light-creators.com`.

Separat davon, ohne Bezug zur Seitenstruktur: 16 Nennungen von Mailadressen unter der
Domain (`info@light-creators.com` 12×, `dl@light-creators.com` 4×). Sie sind von einem
Umbau der Website nicht betroffen und stehen nur der Vollständigkeit halber hier.

---

## 3. Liste A · Stabil

Ziel existiert, wird in Phase 2 nicht angefasst, Bruchrisiko gering.

### A-1 · Wurzel `https://light-creators.com`, als Anker

| Datei | Zeilen | Art | Anzahl |
|---|---|---|---|
| `index.html` | 125, 336, 636, 653, 698 | Anker, teils mit Plausible-Event | 5 |
| `index-en.html` | 125, 336, 637, 698 | Anker, teils mit Plausible-Event | 4 |
| `podcast.html` | 426, 506, 548 | Anker | 3 |
| `fuehren/index.html` | 302 | Footer-Anker | 1 |
| `fuehren/en/index.html` | 301 | Footer-Anker | 1 |
| `episodes/*.html` (30 Dateien) | je CTA-Block und Footer | Anker | 60 |

**Summe 74 Anker auf die Wurzel** auf ausgelieferten Seiten. Davon tragen fünf auf den
beiden Startseiten das Event `outbound_light_creators_click`; die übrigen 69 sind
ungemessen.

Ein 75. Anker steht in `landing-pages/flourishing-life-eltern-v2.html:1487`. Die Datei
trägt `noindex` und ist von keiner Seite verlinkt, deshalb zählt sie hier nicht mit —
sie steht in Abschnitt 6.

Technisch stabil: Die Wurzel bleibt erreichbar, auch wenn dort etwas anderes ausgeliefert
wird. **Inhaltlich ist genau das der Bruch** — siehe Liste C.

### A-2 · `https://light-creators.com/en`, als Anker

| Datei | Zeilen | Anzahl |
|---|---|---|
| `podcast.html` | 556 | 1 |
| `episodes/*.html` (30 Dateien) | Footer, „English" | 30 |
| `tools/generate_episode.py` | 425 | Vorlage, nicht ausgeliefert |

**Summe 31 ausgelieferte Anker.** `/en` ist die englische Founder-Seite und wird in
Phase 2 nicht umgebaut. Nach Regel R-B zieht der Founder-Inhalt der **deutschen** Wurzel
auf einen Interim-Pfad um; ob `/en` davon mitbetroffen ist, steht im Briefing nicht und
ist eine offene Frage — siehe Rückfrage RF-2.

### A-3 · `/quiz` und `/call` als nackte URLs

Die vier Fundstellen aus K-1. Beide Zielseiten antworten mit 200 (live geprüft
03.09.2026). Phase 2 baut die Startseite um, nicht `/quiz` oder `/call`. Damit sind sie
für diese Phase **stabil**.

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
| **B-3** | `tools/generate_episode.py:383, 417, 425` | Wurzel und `/en` in `PAGE_TEMPLATE` | Nicht ausgeliefert, aber die Quelle für alle 30 Episoden. Eine Pfadänderung, die nur in den Episodenseiten korrigiert wird, kommt bei einem späteren Generatorlauf zurück. **Die Vorlage muss bei jedem Korrektur-Commit mitlaufen.** | jeder Pfadwechsel |
| **B-4** | `content/ep-29.txt:51, 53` | `/quiz`, `/call` | Quelldatei für ep-29. Gleiche Mechanik wie B-3: Korrektur nur in der HTML-Datei wird von einem späteren Generatorlauf überschrieben. | jeder Pfadwechsel |

**B-3 und B-4 sind der eigentliche Fallstrick dieses Berichts.** Das Repository hat zwei
Ebenen, die dieselbe URL tragen: die erzeugte Seite und ihre Quelle. Wer nur die Seiten
korrigiert, hat es scheinbar erledigt.

> Der Generator steht nach Abschnitt 7.3 des Briefings unter Sperre. B-3 ist deshalb
> kein Auftrag, sondern eine Notiz für den Zeitpunkt, an dem die Sperre fällt.

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
| `index.html` | 125 | „Founder Resonance Assessment auf light-creators.com" | Wurzel |
| `index.html` | 636 | „Für Founder Resonance: light-creators.com" | Wurzel |
| `index.html` | 653 | „→ light-creators.com" mit Unterzeile „Founder Resonance" | Wurzel |
| `index.html` | 698 | Footer: „Für Founder Resonance: light-creators.com" | Wurzel |
| `index-en.html` | 125 | „Founder Resonance Assessment at light-creators.com" | Wurzel |
| `index-en.html` | 637, 698 | „For Founder Resonance: light-creators.com" | Wurzel |
| `podcast.html` | 506 | „→ light-creators.com", Unterzeile „Founder Resonance" | Wurzel |
| `podcast.html` | 548 | Footer | Wurzel |
| `fuehren/index.html` | 302 | Footer: „Für Founder Resonance: light-creators.com" | Wurzel |
| `fuehren/en/index.html` | 301 | Footer, englisch | Wurzel |
| `episodes/*.html` | 30× CTA, 30× Footer | „Für Founder Resonance: light-creators.com" | Wurzel |

**Das betrifft alle 74 ausgelieferten Wurzel-Anker.** Nachgezählt am 03.09.2026:
71 tragen „Founder Resonance" im Linktext selbst. Die restlichen drei lauten nur
„Zu light-creators.com →" beziehungsweise „To light-creators.com →", stehen aber
jeweils in einem Block, dessen Überschrift oder Absatz das Versprechen unmittelbar
davor gibt:

| Datei | Zeile Anker | Was direkt darüber steht |
|---|---|---|
| `index.html` | 336 | `<h3>Gründen. Für Founder.</h3>` und „Diese Arbeit läuft unter Founder Resonance." |
| `index-en.html` | 336 | `<h3>Founding. For founders.</h3>` und „This work runs under Founder Resonance." |
| `podcast.html` | 426 | `<h3>Für Founder Resonance: <em>light-creators.com</em></h3>` (Zeile 424) |

Wird die Wurzel zum Marken-Hub, zeigen damit 74 Links mit Founder-Versprechen auf eine
Seite, die zwei Wege anbietet und den Founder-Weg erst nach der Selbstselektion
erreichbar macht.

Das ist nicht zwingend falsch — der Hub führt weiter zum Founder-Weg. Es ist aber ein
zusätzlicher Schritt, der vorher nicht da war, und er trifft **jede Episodenseite**.

### C-2 · Reiner Fließtext mit demselben Versprechen

| Datei | Zeile | Text | Art |
|---|---|---|---|
| `episodes/ep-23-…` | 141 | „Oder mach zuerst das Resonance Assessment: light-creators.com" | `<h3>`, nicht verlinkt |
| `episodes/ep-26-…` | 157 | Bio: „… Mehr unter light-creators.com" | Absatz, nicht verlinkt |
| `index.html` | 649 | „Founder work lives at light-creators.com." | Absatz, nicht verlinkt |
| `podcast.html` | 502 | derselbe Satz | Absatz, nicht verlinkt |
| `ep-28`, `ep-29` | siehe K-1 | „→ light-creators.com/quiz" / „/call" | Absatz, nicht verlinkt |

### C-3 · Nennung in der Datenschutzerklärung

`datenschutz/index.html:178`, Ziffer 8 „Verlinkte Angebote": „Diese Website verlinkt auf
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
| `briefing/*.md` | 55 | Arbeitsdokumente (ohne die beiden Phase-2-Briefings) |
| `BACKLOG.md`, `README.md`, `COMPLETION-SPRINT-2026-08-16.md` | 10 | Arbeitsdokumente |
| `quiz-assets/*` | 14 | Prototypen, `noindex`, an Webflow gebunden |
| `landing-pages/*` | 9 | `noindex`, unverlinkt. Enthält in `flourishing-life-eltern-v2.html:1487` einen 75. Wurzel-Anker |
| `quiz-2.0.html`, `solo.html` | 4 | `noindex` bzw. nicht verlinkt |

---

## 7. Rückfragen

Keine dieser Fragen wird hier beantwortet oder durch eine Annahme ersetzt.

| ID | Frage | Blockiert |
|---|---|---|
| ~~RF-1~~ | **Beantwortet 03.09.2026: ein Commit**, wie empfohlen. Er erfasst alle vier Ebenen zusammen: beide Episodenseiten, `content/ep-29.txt` und die Generatorvorlage. | erledigt |
| ~~RF-2~~ | **Beantwortet 03.09.2026 -> Regel R-J:** `/en` bleibt, wo es ist. Phase 2 ersetzt die deutsche Wurzel, nicht die englische Founder-Seite. Die 31 Anker bleiben gueltig; B-2 entfaellt. | erledigt |
| ~~RF-3~~ | **Beantwortet 03.09.2026: umhaengen auf `/founder`**, nicht umformulieren - wie empfohlen. Betrifft alle 74 Anker, davon 60 in generierten Episoden, plus die Generatorvorlage. Siehe Abschnitt 9. | erledigt |
| ~~RF-4~~ | **Beantwortet 03.09.2026: bleibt die Wurzel.** Die Organisation wohnt weiterhin unter `https://light-creators.com`; der Marken-Hub ist ihre Startseite. B-1 ist geschlossen. | erledigt |

---

## 8. Ergebnis für die Redirect-Liste des Webflow-Strangs

Aus diesem Repository heraus werden auf `light-creators.com` genau vier Pfade
angesprochen. Wird einer davon verschoben, braucht er eine Weiterleitung:

```
/            ← 74 Anker + 5 Fließtextnennungen, alle Seitentypen
             (75 mit der noindex-Datei unter landing-pages/)
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

---

## 9. Nach Freigabepunkt F1 — was sich am 03.09.2026 geklärt hat

F1 ist erteilt. Damit sind alle vier Rückfragen dieses Berichts beantwortet und die
Redirect-Lage sieht anders aus als in Abschnitt 8 angenommen.

### 9.1 Es braucht keine einzige Weiterleitung

| Pfad | Bisherige Annahme | Nach R-H / R-J | Weiterleitung nötig? |
|---|---|---|---|
| `/` | könnte umziehen | bleibt erreichbar, bekommt den neuen Hub | **nein** |
| `/en` | könnte mitziehen (B-2) | bleibt unverändert (R-J) | **nein** |
| `/quiz` | stabil | unverändert | **nein** |
| `/call` | stabil | unverändert | **nein** |

**Kein 301 von `/` auf `/founder`** (R-H, ausdrücklich). Die Wurzel verschwindet nicht,
sie bekommt neuen Inhalt — eine Weiterleitung dort würde die neue Startseite unerreichbar
machen. `/founder` ist ein **neuer** Pfad, kein Ziel einer Umleitung, und bleibt
indexiert.

**Liste B ist damit leer, was die Zielpfade angeht.** B-1 (JSON-LD) und B-2 (`/en`) sind
durch RF-4 und R-J geschlossen. Es bleiben B-3 und B-4 — und die sind keine Frage der
Zielpfade, sondern der zwei Ebenen im Repository.

### 9.2 Was dennoch zu tun ist: die 74 Anker umhängen

RF-3 ist mit **umhängen** beantwortet. Die Anker zeigen heute auf `https://light-creators.com`
und geben ein Founder-Resonance-Versprechen; nach dem Publish liegt dieses Angebot auf
`/founder`. Sie werden deshalb auf `https://light-creators.com/founder` gezogen, ihre
Beschriftung bleibt unangetastet.

**Das ist keine Weiterleitungsfrage, sondern eine Textänderung an 74 Stellen** — und
gerade weil es keinen 301 gibt, ist sie die einzige Absicherung. Ohne sie landen alle 74
Links auf dem Hub statt beim Angebot, das sie zusagen.

Umfang, gegen `main` bei `2060bb8` gezählt:

| Ebene | Fundstellen | Anmerkung |
|---|---|---|
| `episodes/*.html` | 60 | 30 Dateien, je CTA-Block und Footer |
| `index.html` | 5 | |
| `index-en.html` | 4 | |
| `podcast.html` | 3 | |
| `fuehren/index.html` | 1 | |
| `fuehren/en/index.html` | 1 | |
| **Summe ausgeliefert** | **74** | |
| `tools/generate_episode.py` | 2 | Vorlage — **muss mit**, sonst kommt der alte Pfad zurück |
| `landing-pages/flourishing-life-eltern-v2.html` | 1 | `noindex`, unverlinkt — Entscheidung offen, siehe RF-17 |

Nicht betroffen: die 31 `/en`-Anker (R-J), die vier nackten `/quiz`- und `/call`-URLs, die
beiden JSON-LD-Blöcke (RF-4) und die Fundstellen in `_archiv/` und den Arbeitsdokumenten.

### 9.3 Wann das passiert — und warum nicht jetzt

**Nicht in diesem Paket.** Alle 77 Fundstellen liegen außerhalb von
`_briefings/phase2-lightcreators/` und fallen damit unter **R-E**. Sie werden erst
angefasst, wenn der Phase-1-Review durch ist und der Webflow-Strang `/founder` als live
zurückmeldet — vorher zeigte der neue Link ins Leere.

Reihenfolge, damit zu keinem Zeitpunkt ein toter Link ausgeliefert wird:

1. Webflow: alte Startseite liegt unter `/founder`, erreichbar, indexiert.
2. Rückmeldung an dieses Repository, dass `/founder` mit 200 antwortet.
3. Phase-1-Merge abwarten (**R-E**).
4. **Ein** Commit (RF-1) über alle Ebenen: 74 Anker, Generatorvorlage, gegebenenfalls die
   `noindex`-Landingpage.
5. Gegenprobe: kein `href="https://light-creators.com"` ohne Pfad mehr im ausgelieferten
   Bestand.

Schritt 4 gehört zu **S10** und ist einzeln zurücknehmbar.

### 9.4 Die drei neuen Zielpfade, live geprüft am 03.09.2026

| Pfad | HTTP | Bewertung |
|---|---|---|
| `/the-art-and-practice-of-a-flourishing-life` | **200** | Ziel des Next-Gen-CTA (R-I). Existiert, nichts zu tun. |
| `/founder` | **404** | **Erwartet.** Der Pfad entsteht erst, wenn der Webflow-Strang die alte Startseite dorthin zieht (R-H). Er ist die Bedingung für Schritt 2 in 9.3. |
| `#tribe` | — | Sprungmarke auf der neuen Startseite, kein eigener Pfad. Entsteht mit Sektion 5. |

Nebenbefund zu R-I: Die beiden Unterseiten der Flourishing-Life-Welt sind unter den
naheliegenden Slugs `…-fuer-dich` und `…-fuer-eltern` **nicht** erreichbar (je 404).
Für diesen Bericht folgenlos — R-I zielt ohnehin auf die Übersichtsseite —, aber es
heißt: Die tatsächlichen Slugs der beiden Unterseiten sind hier unbekannt. Falls sie
später verlinkt werden sollen, müssen sie erst erhoben werden.

### 9.5 Was jetzt noch offen ist

| ID | Frage | Blockiert |
|---|---|---|
| **RF-17** | Soll der 75. Wurzel-Anker in `landing-pages/flourishing-life-eltern-v2.html:1487` mit umgehängt werden? Die Datei trägt `noindex` und ist von keiner Seite verlinkt; der Link steht im Fußbereich als reine Kontaktangabe ohne Founder-Versprechen. Mitnehmen kostet nichts, Auslassen fällt niemandem auf. | S10 |
| ~~RF-18~~ | **Selbst geprüft am 03.09.2026, erledigt:** `/the-art-and-practice-of-a-flourishing-life` antwortet mit **200**. Der Next-Gen-CTA aus R-I zeigt auf einen bestehenden Pfad. | erledigt |
