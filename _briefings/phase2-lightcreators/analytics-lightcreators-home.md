# CC-4 · Analytics-Spezifikation der neuen Startseite `light-creators.com`

**Aufgabe:** CC-4 aus `phase2-lightcreators-claude-code.md`
**Übergabepunkt:** I-4, fällig nach Freigabepunkt F2
**Stand:** 3. September 2026
**Erhoben auf:** Branch `phase2-zulieferungen`, Stand `main` (Commit `2060bb8`)
**Geltende Regel:** **R-F — Plausible-Tarif Growth, keine Custom Properties.**

> Diese Datei ersetzt die Fassung vom 02.09.2026 vollständig. Die alte Fassung war auf
> Custom Properties gebaut (`position`, `person`, `target`) und ist mit R-F unvereinbar.
> Sie wurde nicht korrigiert, sondern neu geschrieben.

---

## 1. Was sich durch R-F geändert hat

Der Growth-Tarif unterstützt keine Custom Properties. Daraus folgen drei Dinge:

1. **Die Unterscheidung wandert in den Eventnamen.** Ein Klick auf „Next Gen" in
   Sektion 6 und derselbe Klick in Sektion 9 sind zwei verschiedene Eventnamen, nicht ein
   Name mit zwei Property-Werten.
2. **Es gibt keine `data-plausible-prop-*`-Attribute** und keine Property-Logik im
   Snippet. Genau zwei Attribute werden gesetzt, siehe Abschnitt 4.
3. **Zwei Events entfallen ersatzlos.** Siehe Abschnitt 3.

| Frühere Variante (hinfällig) | Jetzt gültig |
|---|---|
| `light.home.nextgen.click` + `position=finale` | `light.home.nextgenfinale.click` |
| `light.home.founders.click` + `position=finale` | `light.home.foundersfinale.click` |
| `light.home.tribeperson.click` + `person=<slug>` | entfällt, siehe Abschnitt 3 |
| `light.home.nav.click` + `target=<slug>` | entfällt, siehe Abschnitt 3 |

**Offener Punkt aus dem Briefing, hier weitergereicht:** Am 02.09.2026 wurden im
Plausible-Konto versuchsweise die drei Properties `position`, `person` und `target`
angelegt. Ob sie inzwischen gelöscht sind, lässt sich aus diesem Repository nicht
feststellen. **Vor dem Tarifwechsel prüfen und löschen.** Sie werden hier nicht
eingeplant. Siehe RF-12.

---

## 2. Die Eventtabelle

Schema `brand.page.object.action`, cookiefrei über Plausible. **Zehn Eventnamen, keine
Properties.** Die Tabelle ist verbindlich.

| # | Route | Eventname | Ausgelöst durch | Copy-String |
|---|---|---|---|---|
| 1 | Hero-CTA „Die Idee entdecken ↓" | `light.home.hero.click` | Klick | `S1.CTA` |
| 2 | Next Gen, Sektion Zwei Wege | `light.home.nextgen.click` | Klick | `S6.NG.CTA` |
| 3 | Next Gen, finale Einladung | `light.home.nextgenfinale.click` | Klick | `S9.CTA1` |
| 4 | Founders, Sektion Zwei Wege | `light.home.founders.click` | Klick | `S6.FO.CTA` |
| 5 | Founders, finale Einladung | `light.home.foundersfinale.click` | Klick | `S9.CTA2` |
| 6 | Tribe-Pfad „Menschen kennenlernen" | `light.home.tribe.click` | Klick | `S9.CTA3` |
| 7 | Scrolltiefe Recognition | `light.home.recognition.reach` | 40 % der Sektion sichtbar, einmal pro Seitenaufruf | Sektion 2 |
| 8 | Scrolltiefe Big Idea | `light.home.bigidea.reach` | dito | Sektion 3 |
| 9 | Scrolltiefe Tribe | `light.home.tribe.reach` | dito | Sektion 5 |
| 10 | Scrolltiefe Zwei Wege | `light.home.zweiwege.reach` | dito | Sektion 6 |

`light.home.tribe.click` braucht keine Positionsvariante, weil der Tribe-Pfad nur in der
finalen Einladung vorkommt.

**Namenskollision, die keine ist:** `light.home.tribe.click` und `light.home.tribe.reach`
teilen den Objektteil, unterscheiden sich aber in der Aktion. Das ist schemakonform und
im Dashboard zwei getrennte Goals.

### Bezug zu den KPI aus dem Change Brief

Die primäre KPI lautet „Anteil der Home-Sessions mit mindestens einem Klick auf
`light.home.nextgen.click` oder `light.home.founders.click`". **Das sind die Klicks in
Sektion 6, nicht die in Sektion 9.** Wer die finale Einladung mitzählen will, muss
`light.home.nextgenfinale.click` und `light.home.foundersfinale.click` addieren — auf
Growth von Hand, weil es keine Property gibt, über die sich beides zusammenfassen ließe.
Das ist der Preis von R-F und hier bewusst benannt, damit die KPI später nicht
stillschweigend anders gerechnet wird.

---

## 3. Was nicht gemessen wird

| Entfallen | Grund |
|---|---|
| `light.home.nav.click` | Interne Navigationsklicks sind an den Seitenaufrufen der Zielseiten ablesbar. Ohne Property wäre das Event nur eine Sammelzahl ohne Ziel. |
| `light.home.tribeperson.click` | Fällt aus dieser Phase heraus. Die externen Portrait-Links laufen später über das eingebaute Plausible-Goal „Outbound Link: Click" und gehören ins separate Tribe-Paket (**R-G**). |

**⚠ Prüfpunkt für das Tribe-Paket.** Ob „Outbound Link: Click" die Aufschlüsselung nach
Ziel-URL auch auf Growth zeigt, ist offen. Aus diesem Repository gibt es dazu einen
Anhaltspunkt, aber keine Antwort: Bei der Verkabelungsprüfung am 03.09.2026 auf
`davidliebnau.com` wurde in der abgefangenen Nutzlast beobachtet, dass Plausible bei
getaggten Links die Zieladresse **automatisch als Property `url`** anhängt (dokumentiert
in `BACKLOG.md`, Abschnitt „Messung"). Das ist eine eingebaute Property, keine Custom
Property — ob Growth sie im Dashboard aufschlüsselt, ist damit **nicht** beantwortet.
Siehe RF-13.

**Meta Pixel.** Kein Vorschlag in dieser Spezifikation. Der Pixel läuft site-weit auf
`light-creators.com` und ist eine offene Entscheidung, keine technische Aufgabe. Verweis
auf **OD-1b**.

---

## 4. Bindungsmechanik

Die Elemente in Webflow bekommen **Data-Attribute, keine Plausible-Klassennamen.**
Webflow-Klassennamen vertragen die Zeichen `=` und `.` nicht zuverlässig; Data-Attribute
sind über die Element-Werkzeuge sauber setzbar und im Designer sichtbar.

> **Unterschied zu `davidliebnau.com`, bewusst.** Dort laufen die Klick-Events über
> CSS-Klassen der Form `plausible-event-name=…`, weil dort das Markup von Hand gepflegt
> wird. Auf `light-creators.com` wird über Webflow gebaut, deshalb Data-Attribute plus
> eigenes Snippet. Beide Wege erzeugen dieselbe Art Event; nur die Verkabelung
> unterscheidet sich. Das ist im Register (Abschnitt 7) als Spalte `mechanik` geführt.

Genau zwei Attribute, keine Properties:

| Attribut | Wo | Beispiel |
|---|---|---|
| `data-plausible-event` | an jedem messbaren Klickziel | `data-plausible-event="light.home.nextgen.click"` |
| `data-reach-event` | an jeder der vier Sektionen mit Scrolltiefenmessung | `data-reach-event="light.home.recognition.reach"` |

### Setzliste für den Webflow-Strang

| Element | Attribut | Wert |
|---|---|---|
| Hero-CTA (`S1.CTA`) | `data-plausible-event` | `light.home.hero.click` |
| Next-Gen-CTA Sektion 6 (`S6.NG.CTA`) | `data-plausible-event` | `light.home.nextgen.click` |
| Founders-CTA Sektion 6 (`S6.FO.CTA`) | `data-plausible-event` | `light.home.founders.click` |
| Next-Gen-CTA Sektion 9 (`S9.CTA1`) | `data-plausible-event` | `light.home.nextgenfinale.click` |
| Founders-CTA Sektion 9 (`S9.CTA2`) | `data-plausible-event` | `light.home.foundersfinale.click` |
| Tribe-CTA Sektion 9 (`S9.CTA3`) | `data-plausible-event` | `light.home.tribe.click` |
| Sektion 2 Recognition | `data-reach-event` | `light.home.recognition.reach` |
| Sektion 3 Big Idea | `data-reach-event` | `light.home.bigidea.reach` |
| Sektion 5 Tribe | `data-reach-event` | `light.home.tribe.reach` |
| Sektion 6 Zwei Wege | `data-reach-event` | `light.home.zweiwege.reach` |

Zehn Attribute, zehn Eventnamen, eins zu eins.

---

## 5. Die beiden Snippets

Dateien: `snippets/plausible-events.js` und `snippets/plausible-scroll.js`. Beide sind
wörtlich aus dem Briefing übernommen. Sie gehören in den Head-Code der Seite, nach dem
Plausible-Skript — der Einbau erfolgt erst nach Freigabe durch den Webflow-Strang.

`plausible-events.js` ist ein delegierter Klick-Listener: Er hängt an `document`, nicht an
den einzelnen Links, und findet über `closest()` auch dann das richtige Ziel, wenn der
Klick auf einem Kindelement des Links landet — etwa auf dem `<span>` mit dem Pfeil.

`plausible-scroll.js` nutzt einen `IntersectionObserver` mit `threshold: 0.4` und ruft
`unobserve()`, sobald ein Event gefeuert hat. Damit meldet jede Sektion höchstens einmal
je Seitenaufruf, auch wenn der Besucher hoch- und wieder herunterscrollt.

### Abnahme — durchgeführt am 03.09.2026

Das Briefing verlangt: „Beide Snippets laufen ohne Konsolenfehler gegen eine lokale
Testseite mit denselben Data-Attributen."

Der Browser-Bereich rendert lokale Dateien nur als statischen Schnappschuss ohne
JavaScript-Kontext — derselbe Werkzeugbefund, der in `OFFENE-AUFGABEN-Relaunch.md` unter
„Werkzeug" steht. Die Prüfung lief deshalb gegen **JavaScriptCore** (`jsc`, im System
vorhanden) mit einer minimalen DOM-Attrappe, die genau die vom Snippet berührten
Schnittstellen nachbildet: `document.addEventListener`, `document.querySelectorAll`,
`Element.closest`, `dataset`, `IntersectionObserver` und `window.plausible`.

| Prüfung | Erwartet | Ergebnis |
|---|---|---|
| Klick auf sechs getaggte Ziele | 6 Aufrufe | **6** |
| Übergebene Eventnamen | die sechs Klick-Namen aus Abschnitt 2 | **stimmen, alle sechs** |
| Argumente je Aufruf | genau 1 — kein Property-Objekt | **1, 1, 1, 1, 1, 1** |
| Klick auf ein Kindelement im getaggten Link | löst über `closest()` aus | **löst aus** |
| Klick auf ein ungetaggtes Element | sendet nichts | **sendet nichts** |
| Vier Sektionen beobachtet | 4 | **4** |
| Erste Sichtbarkeit | 4 Reach-Events | **4** |
| Zweite Sichtbarkeit derselben Sektionen | weiterhin 4, kein Nachfeuern | **weiterhin 4** |
| `unobserve` nach Auslösen | 0 verbleibende Beobachtungen | **0** |
| Laufzeitfehler | keine | **keine** |

Die Zeile „Argumente je Aufruf: 1" ist der eigentliche R-F-Nachweis: Das Snippet übergibt
nur den Namen und kein Property-Objekt.

**Was damit nicht geprüft ist:** das Verhalten im echten Browser, die Netzwerkstrecke zu
Plausible und das Zusammenspiel mit dem Webflow-Markup. Die Attrappe belegt die Logik der
Snippets, nicht ihren Einbau. Der Einbaunachweis entsteht im Webflow-Strang.

---

## 6. Goal-Liste fürs Dashboard

Goals entstehen im Plausible-Dashboard **nicht automatisch** aus eintreffenden Events.
Ein Event, für das kein Goal desselben Namens existiert, erscheint dort nicht. Alle zehn
müssen von Hand angelegt werden.

| # | Goal-Name | `goal_angelegt` |
|---|---|---|
| 1 | `light.home.hero.click` | **ja** (Stand 02.09.2026) |
| 2 | `light.home.nextgen.click` | nein |
| 3 | `light.home.nextgenfinale.click` | nein |
| 4 | `light.home.founders.click` | nein |
| 5 | `light.home.foundersfinale.click` | nein |
| 6 | `light.home.tribe.click` | nein |
| 7 | `light.home.recognition.reach` | nein |
| 8 | `light.home.bigidea.reach` | nein |
| 9 | `light.home.tribe.reach` | nein |
| 10 | `light.home.zweiwege.reach` | nein |

**Der Stand von `light.home.hero.click` stammt aus dem Briefing, nicht aus einer eigenen
Prüfung.** Aus diesem Repository ist der Zustand des Plausible-Kontos für
`light-creators.com` nicht einsehbar. Vor dem Anlegen der übrigen neun ist der Stand im
Dashboard zu verifizieren.

**Voraussetzung, die vor allen Goals kommt:** Plausible muss auf `light-creators.com`
überhaupt laufen. Das ist Schritt **S-P0** im Webflow-Strang (Regel R-A) und zum Stand
dieser Datei nicht als erledigt gemeldet.

---

## 7. Domainübergreifendes Eventregister

Weil Plausible nach R-A auf beiden Domains läuft, führt dieses Register **alle**
Eventnamen über `davidliebnau.com` und `light-creators.com` hinweg. Es ist die einzige
Stelle, an der beide Domains zusammen dokumentiert sind, und die Grundlage für die in
Abschnitt 6.2 des Master-Briefings verlangte Cross-Domain-Prüfung.

**Erhebungsweise.** Der Bestand für `davidliebnau.com` wurde **maschinell aus dem Code
gezogen**, nicht aus dem Master-Briefing übernommen: alle Vorkommen von
`plausible-event-name=` in `.html` und `.py` sowie alle direkten `window.plausible(…)`-
Aufrufe, Stand `main` bei `2060bb8`.

### 7.1 Bestand `davidliebnau.com` — 19 Events, alle aktiv

| Event | Domain | Seite | Zweck | Mechanik | Status | `goal_angelegt` |
|---|---|---|---|---|---|---|
| `cta_briefing_click` | davidliebnau.com | `/`, `/en` | CTA Briefinggespräch | Klasse | aktiv | ja |
| `nav_threshold_click` | davidliebnau.com | `/`, `/en` | Navigationsklick zu Threshold | Klasse | aktiv | ja |
| `outbound_light_creators_click` | davidliebnau.com | `/`, `/en` | Ausgehender Klick nach `light-creators.com` | Klasse | aktiv | ja |
| `fuehren_cta1_click` | davidliebnau.com | `/fuehren/`, `/fuehren/en/` | Erster CTA | Klasse | aktiv | ja |
| `fuehren_cta2_click` | davidliebnau.com | `/fuehren/`, `/fuehren/en/` | Zweiter CTA | Klasse | aktiv | ja |
| `fuehren_cta3_click` | davidliebnau.com | `/fuehren/`, `/fuehren/en/` | Dritter CTA | Klasse | aktiv | ja |
| `threshold_cta_click` | davidliebnau.com | `/threshold/`, `/threshold/en/` | Haupt-CTA | Klasse | aktiv | ja |
| `threshold_partner_link_click` | davidliebnau.com | `/threshold/`, `/threshold/en/` | Verweis auf die Partnerseite | Klasse | aktiv | ja |
| `threshold_path_application_click` | davidliebnau.com | `/threshold/`, `/threshold/en/` | Nachfrageweg Bewerbung | Klasse | aktiv | ja |
| `threshold_path_institution_click` | davidliebnau.com | `/threshold/`, `/threshold/en/` | Nachfrageweg Institution | Klasse | aktiv | ja |
| `threshold_path_later_click` | davidliebnau.com | `/threshold/`, `/threshold/en/` | Nachfrageweg später | Klasse | aktiv | ja |
| `threshold_path_waitlist_click` | davidliebnau.com | `/threshold/`, `/threshold/en/` | Nachfrageweg Warteliste | Klasse | aktiv | ja |
| `threshold_price_scroll` | davidliebnau.com | `/threshold/`, `/threshold/en/` | Preisblock erreicht | `window.plausible()` | aktiv | ja |
| `threshold_faq_seen` | davidliebnau.com | `/threshold/`, `/threshold/en/` | FAQ erreicht | `window.plausible()` | aktiv | ja |
| `partner_request_click` | davidliebnau.com | `/threshold/partner/`, `…/en/` | Anfrage Partner | Klasse | aktiv | ja |
| `partner_path_institution_click` | davidliebnau.com | `/threshold/partner/`, `…/en/` | Nachfrageweg Institution | Klasse | aktiv | ja |
| `partner_path_later_click` | davidliebnau.com | `/threshold/partner/`, `…/en/` | Nachfrageweg später | Klasse | aktiv | ja |
| `partner_path_partnership_click` | davidliebnau.com | `/threshold/partner/`, `…/en/` | Nachfrageweg Partnerschaft | Klasse | aktiv | ja |
| `partner_path_waitlist_click` | davidliebnau.com | `/threshold/partner/`, `…/en/` | Nachfrageweg Warteliste | Klasse | aktiv | ja |

Der Stand `goal_angelegt: ja` ist belegt: `OFFENE-AUFGABEN-Relaunch.md` und `BACKLOG.md`
halten fest, dass David die Goals am 03.09.2026 im Dashboard angelegt und verifiziert hat
— 19 Custom Events plus vier Standard-Goals, deckungsgleich mit dem Bestand im Code.

Deutsche und englische Fassung teilen sich je einen Namen. Getrennt wird nach Teilnehmer-
und Partnerseite, nicht nach Sprache.

### 7.2 Geplant `light-creators.com` — 10 Events

| Event | Domain | Seite | Zweck | Mechanik | Status | `goal_angelegt` |
|---|---|---|---|---|---|---|
| `light.home.hero.click` | light-creators.com | `/` | Hero-CTA | Data-Attribut | geplant | ja |
| `light.home.nextgen.click` | light-creators.com | `/` | Next Gen, Sektion 6 | Data-Attribut | geplant | nein |
| `light.home.nextgenfinale.click` | light-creators.com | `/` | Next Gen, Sektion 9 | Data-Attribut | geplant | nein |
| `light.home.founders.click` | light-creators.com | `/` | Founders, Sektion 6 | Data-Attribut | geplant | nein |
| `light.home.foundersfinale.click` | light-creators.com | `/` | Founders, Sektion 9 | Data-Attribut | geplant | nein |
| `light.home.tribe.click` | light-creators.com | `/` | Tribe-Pfad, Sektion 9 | Data-Attribut | geplant | nein |
| `light.home.recognition.reach` | light-creators.com | `/` | Scrolltiefe Sektion 2 | `IntersectionObserver` | geplant | nein |
| `light.home.bigidea.reach` | light-creators.com | `/` | Scrolltiefe Sektion 3 | `IntersectionObserver` | geplant | nein |
| `light.home.tribe.reach` | light-creators.com | `/` | Scrolltiefe Sektion 5 | `IntersectionObserver` | geplant | nein |
| `light.home.zweiwege.reach` | light-creators.com | `/` | Scrolltiefe Sektion 6 | `IntersectionObserver` | geplant | nein |

### 7.3 Stillgelegt

| Event | Domain | Grund |
|---|---|---|
| `light.home.nav.click` | light-creators.com | Nie implementiert. Aus der Spezifikation entfernt, siehe Abschnitt 3. |
| `light.home.tribeperson.click` | light-creators.com | Nie implementiert. Vertagt in das Tribe-Paket (R-G). |

Beide sind hier geführt, damit sie nicht später als Lücke wiederentdeckt und erneut
eingeplant werden.

### 7.4 Widerspruch zum Schema — ausgewiesen, nicht geglättet

Das Briefing verlangt, Abweichungen zwischen tatsächlichem Bestand und Schema als solche
auszuweisen. Es gibt genau eine, und sie ist grundsätzlich:

> **Keiner der 19 bestehenden Events auf `davidliebnau.com` folgt dem Schema
> `brand.page.object.action`.** Sie folgen durchgängig `<bereich>_<sache>_<verb>` in
> `snake_case`, ohne Domain-Präfix — `threshold_path_waitlist_click` statt etwa
> `david.threshold.waitlist.click`.

Das Präfix, das laut Briefing die Domainzuordnung tragen soll (`david.*` gegen `light.*`),
existiert auf `davidliebnau.com` also **nicht**. Nach dem Publish stehen im selben
Plausible-Konto zwei Namenswelten nebeneinander: 19 Events in `snake_case` ohne Präfix und
10 Events in `punkt.notation` mit `light.`-Präfix.

**Bewertung, keine Entscheidung.** Praktisch ist das kein Fehler: Die Domains sind in
Plausible ohnehin getrennte Sites, die Zuordnung geht nie verloren, und die 19 Goals sind
seit dem 03.09.2026 angelegt und verifiziert. Eine Umbenennung würde die Goals im
Dashboard brechen und die Historie abschneiden — die neuen Namen zählten bei null, die
alten blieben als tote Goals stehen. Sie fiele außerdem unter **R-E** und käme frühestens
nach dem Phase-1-Merge in Frage.

Drei Wege stehen offen. Die Entscheidung liegt bei David, siehe RF-14:

| Weg | Folge |
|---|---|
| **A · So lassen** | Zwei Namenswelten, sauber nach Domain getrennt. Kein Bruch, kein Aufwand. Das Schema aus dem Briefing gilt dann nur für Neues. |
| **B · Nur Neues nach Schema** | Wie A, aber ausdrücklich festgehalten: `davidliebnau.com` bekommt bei künftigen Events ebenfalls `david.*`. Die 19 Altnamen bleiben. Mischbestand innerhalb einer Domain. |
| **C · Alles vereinheitlichen** | Ein Schema über beide Domains. Kostet 19 Goal-Neuanlagen, bricht die Historie, berührt neun bestehende Dateien und fällt unter R-E. |

---

## 8. Rückfragen

| ID | Frage | Blockiert |
|---|---|---|
| **RF-12** | Sind die drei am 02.09.2026 versuchsweise angelegten Properties `position`, `person` und `target` im Plausible-Konto inzwischen gelöscht? Aus dem Repository nicht feststellbar. Sie werden hier nicht eingeplant, müssen aber vor dem Tarifwechsel weg. | S-P0 |
| **RF-13** | Zeigt das eingebaute Goal „Outbound Link: Click" die Aufschlüsselung nach Ziel-URL auch auf Growth? Plausible hängt bei getaggten Links die Zieladresse automatisch als eingebaute Property `url` an — ob Growth sie im Dashboard aufschlüsselt, ist damit nicht beantwortet. Bestimmt, ob das Tribe-Paket die Portrait-Links überhaupt einzeln messen kann. | Tribe-Paket (T0) |
| **RF-14** | Welcher der drei Wege A, B oder C aus Abschnitt 7.4 gilt? Ohne Antwort entsteht Weg A durch Unterlassen — das ist vertretbar, sollte aber eine Entscheidung sein und kein Versehen. | F2 |
| **RF-15** | Ist `light.home.hero.click` im Plausible-Konto tatsächlich schon als Goal angelegt? Der Stand stammt aus dem Briefing (02.09.2026) und ist aus diesem Repository nicht überprüfbar. | S-P0 |

---

## 9. Was diese Spezifikation nicht enthält

- **Keinen Vorschlag zum Meta Pixel.** Nur der Verweis auf **OD-1b**.
- **Keine Properties.** Weder Custom Properties noch eine Vorbereitung darauf.
- **Keine Tribe-Messung.** `light.home.tribe.click` und `light.home.tribe.reach` messen
  den Pfad und die Sektion, nicht einzelne Personen. Alles Personenbezogene gehört ins
  separate Tribe-Paket (**R-G**).
- **Keinen Head-Code-Einbau.** Die Snippets liegen als Dateien vor; eingebaut wird im
  Webflow-Strang nach Freigabe.
- **Keine personenbezogenen Daten in Eventnamen.** Kein Eventname enthält einen Namen,
  einen Slug oder eine Kennung einer Person.
