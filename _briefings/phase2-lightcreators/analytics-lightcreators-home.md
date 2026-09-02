# CC-4 · Analytics-Spezifikation, neue Startseite `light-creators.com`

**Aufgabe:** CC-4 aus `phase2-lightcreators-claude-code.md`
**Übergabepunkt:** I-4, fällig nach Freigabepunkt F2
**Dateien:** dieses Dokument, `snippets/plausible-events.js`, `snippets/plausible-scroll.js`
**Stand:** 2. September 2026

---

# Teil 1 · Spezifikation für die neue Startseite

## 1.1 Eventtabelle

Schema `brand.page.object.action`, cookiefrei über Plausible. Die Tabelle listet
**Auslöser**, nicht Namen: Zwei Namen kommen an zwei Stellen vor und werden über die
Property `position` unterschieden. Zur Zählung siehe 1.6.

| # | Auslöser | Eventname | Properties |
|---|---|---|---|
| 1 | Hero-CTA „Die Idee entdecken ↓" | `light.home.hero.click` | — |
| 2 | Next Gen, Sektion Zwei Wege | `light.home.nextgen.click` | `position=zweiwege` |
| 3 | Next Gen, finale Einladung | `light.home.nextgen.click` | `position=finale` |
| 4 | Founders, Sektion Zwei Wege | `light.home.founders.click` | `position=zweiwege` |
| 5 | Founders, finale Einladung | `light.home.founders.click` | `position=finale` |
| 6 | Tribe-Pfad „Menschen kennenlernen" | `light.home.tribe.click` | `position=finale` |
| 7 | Externer Link in einem Portrait | `light.home.tribeperson.click` | `person=<slug>` |
| 8 | Navigation | `light.home.nav.click` | `target=<slug>` |
| 9 | Scrolltiefe Recognition | `light.home.recognition.reach` | — |
| 10 | Scrolltiefe Big Idea | `light.home.bigidea.reach` | — |
| 11 | Scrolltiefe Tribe | `light.home.tribe.reach` | — |
| 12 | Scrolltiefe Zwei Wege | `light.home.zweiwege.reach` | — |

**Zehn verschiedene Eventnamen, zwölf Auslöser.** `light.home.nextgen.click` und
`light.home.founders.click` stehen jeweils in zwei Zeilen — einmal in Sektion 6, einmal
in der finalen Einladung — und werden über `position` unterschieden.

**Primäre KPI** aus dem Change Brief: Anteil der Home-Sessions mit mindestens einem Klick
auf `light.home.nextgen.click` **oder** `light.home.founders.click`, unabhängig von
`position`.

## 1.2 Fallback, falls Properties nicht verfügbar sind

Ob der gebuchte Plausible-Tarif benutzerdefinierte Properties unterstützt, ist im
Dashboard zu prüfen. **Nicht aus diesem Repository prüfbar.**

Trägt der Tarif keine Properties, werden die Events der finalen Einladung als eigene
Objektnamen geführt:

| Statt | Fallback-Eventname |
|---|---|
| `light.home.nextgen.click` mit `position=finale` | `light.home.nextgenfinale.click` |
| `light.home.founders.click` mit `position=finale` | `light.home.foundersfinale.click` |
| `light.home.tribe.click` mit `position=finale` | `light.home.tribefinale.click` |

Die Fallback-Variante hat zwei Folgen, die vor der Umstellung bekannt sein sollten:
`light.home.tribeperson.click` verliert die Person-Zuordnung ersatzlos, weil ein eigener
Eventname pro Person nicht praktikabel ist; und `light.home.nav.click` verliert das Ziel.
Die primäre KPI bliebe messbar, sie müsste dann über vier statt zwei Eventnamen summiert
werden.

## 1.3 Bindungsmechanik

Die Elemente in Webflow bekommen **Data-Attribute, keine Plausible-Klassennamen.**
Webflow-Klassennamen vertragen die Zeichen `=` und `.` nicht zuverlässig; Data-Attribute
sind über die Element-Werkzeuge sauber setzbar und im Designer sichtbar.

```
data-plausible-event="light.home.nextgen.click"
data-plausible-prop-position="zweiwege"
data-plausible-prop-person="<slug>"
data-plausible-prop-target="<slug>"
```

Die vier Sektionen für die Scrolltiefe tragen:

```
data-reach-event="light.home.recognition.reach"
data-reach-event="light.home.bigidea.reach"
data-reach-event="light.home.tribe.reach"
data-reach-event="light.home.zweiwege.reach"
```

## 1.4 Prüfstand der beiden Snippets

Geprüft am 02.09.2026 gegen eine lokale Testseite mit denselben Data-Attributen.

### `plausible-events.js` — vollständig geprüft

| Prüfung | Ergebnis |
|---|---|
| Konsolenfehler beim Laden | keine |
| Event ohne Properties | `light.home.hero.click`, Payload `undefined` ✔ |
| Event mit `position` | `{props:{position:"zweiwege"}}` ✔ |
| Event mit `person` | `{props:{person:"beispiel-slug"}}` ✔ |
| Event mit `target` | `{props:{target:"manifest"}}` ✔ |
| Klick auf verschachteltes Kindelement | steigt korrekt zum Vorfahren mit dem Attribut auf ✔ |
| Klick auf Element ohne Attribut | meldet nichts ✔ |

Sechs Klicks, sechs korrekte Meldungen, keine Fehlmeldung.

### `plausible-scroll.js` — Logik geprüft, Auslösung nicht

Die Snippet-Logik wurde gegen einen Stub-`IntersectionObserver` geprüft, weil im
Werkzeug-Umfeld kein echter Observer auslösen kann (siehe 1.5).

| Prüfung | Ergebnis |
|---|---|
| Konsolenfehler beim Laden | keine |
| Übergebener Schwellwert | `{threshold: 0.4}` ✔ |
| Beobachtete Ziele | 4 ✔ |
| Eintrag mit `isIntersecting: false` | meldet nichts ✔ |
| Alle vier sichtbar | vier Meldungen, korrekte Namen ✔ |
| Dieselben erneut sichtbar | keine zweite Meldung ✔ |
| `unobserve` nach Meldung | 4× aufgerufen ✔ |
| Payload | keiner, wie spezifiziert ✔ |

**Was damit nicht geprüft ist:** dass ein echter `IntersectionObserver` in einem echten
Viewport bei 40 Prozent Sichtbarkeit auslöst. Das ist Browserverhalten, nicht
Snippet-Logik, und gehört in den Prüflauf des Webflow-Strangs nach dem Publish.

### 1.5 Warum die Auslösung hier nicht prüfbar war

Der Browser-Bereich des Werkzeugs ist ausgeblendet; `window.innerWidth` meldet `0`. In
einem Dokument mit Null-Viewport schneidet kein Element den Sichtbereich, und
`IntersectionObserver` liefert grundsätzlich keine Callbacks. Gegengeprüft: Auch ein
von Hand aufgesetzter Observer auf denselben vier Sektionen feuert nicht — der Fehler
liegt nicht im Snippet.

Ein iframe mit gesetzter Größe (900 × 700, im Frame korrekt gemeldet) ändert daran
nichts, weil das übergeordnete Dokument ausgeblendet bleibt und verschachtelte Frames
damit ebenfalls als nicht sichtbar gelten.

Dasselbe betrifft die beiden bestehenden Reach-Events auf `davidliebnau.com`,
`threshold_price_scroll` und `threshold_faq_seen`: Auch für sie liegt keine Prüfung der
tatsächlichen Auslösung vor, nur der Nachweis, dass sie im Quelltext stehen.

## 1.6 Goals, die im Dashboard angelegt werden müssen

**Ein Event im Code erscheint in Plausible erst, wenn dort ein Goal mit demselben Namen
angelegt ist.** Goals entstehen nicht automatisch aus eintreffenden Events.

Es sind **zehn** Goals, nicht zwölf. Die Eventtabelle in 1.1 hat zwölf Zeilen, aber
`light.home.nextgen.click` und `light.home.founders.click` stehen jeweils zweimal darin,
einmal mit `position=zweiwege` und einmal mit `position=finale`. Ein Goal wird pro
Eventname angelegt, nicht pro Auslöser; die Property unterscheidet die Positionen
innerhalb desselben Goals.

Das Briefing spricht in CC-4 von „allen zwölf Eventnamen aus der Tabelle oben". Gemeint
sind die zwölf Zeilen. Wer zwölf Goals anlegt, legt zwei doppelt an.

```
light.home.hero.click
light.home.nextgen.click
light.home.founders.click
light.home.tribe.click
light.home.tribeperson.click
light.home.nav.click
light.home.recognition.reach
light.home.bigidea.reach
light.home.tribe.reach
light.home.zweiwege.reach
```

`light.home.tribe.click` und `light.home.tribe.reach` sind zwei verschiedene Goals mit
demselben Objektnamen. Beim Anlegen nicht verwechseln.

Im Fallback-Fall aus 1.2 kommen drei hinzu, dann sind es dreizehn:

```
light.home.nextgenfinale.click
light.home.foundersfinale.click
light.home.tribefinale.click
```

## 1.7 Datenschutz

Keine personenbezogenen Daten in Eventnamen oder Properties. Keine Mailadressen, keine
Formularinhalte, keine Klarnamen.

`light.home.tribeperson.click` trägt `person=<slug>`. Der Slug ist eine öffentliche
Kennung aus dem CMS und steht ohnehin in der URL des Portraits. Er ist damit kein
zusätzlicher personenbezogener Datenpunkt, aber er ist auch nicht anonym. Sollte eine
Tribe-Person der Messung ihres Portrait-Links widersprechen, muss das Attribut an ihrem
Item entfallen — das Snippet meldet dann für dieses Element nichts, ohne Fehler.

## 1.8 Meta Pixel

**Kein Vorschlag.** Der Pixel läuft site-weit auf `light-creators.com` und ist eine
offene Entscheidung, keine technische Aufgabe. Siehe **OD-1b**.

Nur als Befund, weil es die Ausgangslage bestätigt: Ein Abruf von
`https://light-creators.com` am 02.09.2026 zeigt `fbq(` und
`connect.facebook.net/en_US/fbevents.js`. **Plausible ist dort nicht eingebunden.** Das
deckt sich mit der Vorbedingung P0 im Briefing und mit Schritt S-P0 im Webflow-Strang.

---

# Teil 2 · Domainübergreifendes Eventregister

Grundlage ist der **tatsächliche Bestand im Code**, ermittelt am 02.09.2026 über beide
Branch-Stände, nicht aus dem Master-Briefing abgeschrieben.

Legende `status`:
`aktiv` = auf `main` und damit live · `geplant` = im Code, aber nicht veröffentlicht,
oder spezifiziert und noch nicht gebaut · `stillgelegt` = war live, ist es nicht mehr.

Legende `goal_angelegt`: `?` = aus dem Repository nicht feststellbar. Der Zustand des
Plausible-Dashboards liegt außerhalb dieses Repositories. Kein Wert hier ist geraten.

## 2.1 `davidliebnau.com`

| event | domain | seite | zweck | status | goal_angelegt |
|---|---|---|---|---|---|
| `nav_threshold_click` | davidliebnau.com | `/`, `/index-en.html` | Klick auf Threshold in der Navigation, 11 Fundstellen | aktiv | ? |
| `outbound_light_creators_click` | davidliebnau.com | `/`, `/index-en.html` | Ausgehender Klick nach light-creators.com, 9 Fundstellen | aktiv | ? |
| `cta_briefing_click` | davidliebnau.com | `/`, `/index-en.html` | Briefing-Gespräch von der Startseite | aktiv | ? |
| `threshold_cta_click` | davidliebnau.com | `/threshold/`, `/threshold/en/` | Bewerbungslink im Investitionsblock | aktiv | ? |
| `threshold_partner_link_click` | davidliebnau.com | `/threshold/`, `/threshold/en/` | Weg zur Partnerseite | aktiv | ? |
| `partner_request_click` | davidliebnau.com | `/threshold/partner/`, `/en/` | Partnerschaftsanfrage im Abschluss-CTA | aktiv | ? |
| `fuehren_cta1_click` | davidliebnau.com | `/fuehren/`, `/fuehren/en/` | Briefing-Gespräch, Hero | aktiv | ? |
| `fuehren_cta2_click` | davidliebnau.com | `/fuehren/`, `/fuehren/en/` | Briefing-Gespräch, Formate | aktiv | ? |
| `threshold_price_scroll` | davidliebnau.com | `/threshold/`, `/threshold/en/` | Investitionsblock erstmals sichtbar | aktiv | ? |
| `threshold_faq_seen` | davidliebnau.com | `/threshold/`, `/threshold/en/` | FAQ erstmals sichtbar | aktiv | ? |
| `fuehren_cta3_click` | davidliebnau.com | `/fuehren/`, `/fuehren/en/` | Briefing-Gespräch, Kontaktabschnitt | **geplant** | nein |
| `threshold_path_application_click` | davidliebnau.com | `/threshold/`, `/threshold/en/` | Nachfrageweg: Termin passt | **geplant** | nein |
| `threshold_path_waitlist_click` | davidliebnau.com | `/threshold/`, `/threshold/en/` | Nachfrageweg: Warteliste | **geplant** | nein |
| `threshold_path_later_click` | davidliebnau.com | `/threshold/`, `/threshold/en/` | Nachfrageweg: späterer Termin | **geplant** | nein |
| `threshold_path_institution_click` | davidliebnau.com | `/threshold/`, `/threshold/en/` | Nachfrageweg: Organisation | **geplant** | nein |
| `partner_path_partnership_click` | davidliebnau.com | `/threshold/partner/`, `/en/` | Zahlerweg: Termin passt | **geplant** | nein |
| `partner_path_waitlist_click` | davidliebnau.com | `/threshold/partner/`, `/en/` | Zahlerweg: Warteliste | **geplant** | nein |
| `partner_path_later_click` | davidliebnau.com | `/threshold/partner/`, `/en/` | Zahlerweg: späterer Termin | **geplant** | nein |
| `partner_path_institution_click` | davidliebnau.com | `/threshold/partner/`, `/en/` | Zahlerweg: Organisation | **geplant** | nein |

**19 Eventnamen.** Zehn davon sind auf `main` und damit live. Neun liegen auf dem
unveröffentlichten Branch `phase1/threshold-proof-seo` und werden mit dem Phase-1-Publish
aktiv. Kein Event ist stillgelegt.

Alle Klick-Events sind über CSS-Klassen gebunden (`plausible-event-name=…`), nicht über
Data-Attribute. Die beiden Reach-Events laufen über `window.plausible()` in einem
Inline-Skript mit `IntersectionObserver`, Schwellwert 0,25.

## 2.2 `light-creators.com`

| event | domain | seite | zweck | status | goal_angelegt |
|---|---|---|---|---|---|
| `light.home.hero.click` | light-creators.com | `/` | Hero-CTA | geplant | nein |
| `light.home.nextgen.click` | light-creators.com | `/` | Wegwahl Next Gen, zwei Positionen | geplant | nein |
| `light.home.founders.click` | light-creators.com | `/` | Wegwahl Founders, zwei Positionen | geplant | nein |
| `light.home.tribe.click` | light-creators.com | `/` | Tribe-Pfad | geplant | nein |
| `light.home.tribeperson.click` | light-creators.com | `/` | Externer Link eines Portraits | geplant | nein |
| `light.home.nav.click` | light-creators.com | `/` | Navigation | geplant | nein |
| `light.home.recognition.reach` | light-creators.com | `/` | Scrolltiefe Sektion 2 | geplant | nein |
| `light.home.bigidea.reach` | light-creators.com | `/` | Scrolltiefe Sektion 3 | geplant | nein |
| `light.home.tribe.reach` | light-creators.com | `/` | Scrolltiefe Sektion 5 | geplant | nein |
| `light.home.zweiwege.reach` | light-creators.com | `/` | Scrolltiefe Sektion 6 | geplant | nein |
| `light.home.nextgenfinale.click` | light-creators.com | `/` | nur im Fallback aus 1.2 | geplant | nein |
| `light.home.foundersfinale.click` | light-creators.com | `/` | nur im Fallback aus 1.2 | geplant | nein |
| `light.home.tribefinale.click` | light-creators.com | `/` | nur im Fallback aus 1.2 | geplant | nein |

Alle `geplant`. Auf `light-creators.com` läuft heute kein Plausible; der Einbau ist
Schritt S-P0 im Webflow-Strang.

## 2.3 Widersprüche zum Schema

Ausgewiesen, nicht geglättet — wie in CC-4 verlangt. Eine bestehende Abweichung ist eine
Information, kein Fehler, der wegzuputzen wäre.

### W-1 · Zwei Namensschemata nebeneinander

| | `davidliebnau.com` | `light-creators.com` |
|---|---|---|
| Form | `bereich_sache_verb`, Unterstriche | `brand.page.object.action`, Punkte |
| Beispiel | `threshold_path_waitlist_click` | `light.home.nextgen.click` |
| Domain-Präfix | keins | `light.` |

Das Briefing schreibt: „Das Präfix trägt die Domainzuordnung: `david.*` gegen `light.*`."
**Kein einziges der 19 bestehenden Events trägt ein `david.`-Präfix.** Sie sind vor der
Einführung des Schemas entstanden und folgen einer eigenen, in sich konsistenten
Konvention.

Angleichen hieße, 19 Events umzubenennen. Das hätte drei Folgen:

1. Es wäre eine Änderung an bestehenden Dateien und verstößt gegen **R-E**, solange der
   Phase-1-Review läuft.
2. Zehn dieser Events sind live. Eine Umbenennung bricht die Datenkontinuität aller
   bereits angelegten Goals; alte und neue Zählung ließen sich nicht zusammenführen.
3. Neun weitere liegen ungemergt auf dem Phase-1-Branch. Sie ließen sich ohne Datenverlust
   umbenennen, aber nur zusammen mit den zehn anderen — sonst entstünden drei Schemata.

**Empfehlung, keine Entscheidung:** Die Domainzuordnung im Register führen, nicht im
Eventnamen. Die Spalte `domain` leistet dasselbe wie ein Präfix, ohne bestehende Messreihen
zu brechen. Plausible trennt beide Domains ohnehin als eigene Sites.

### W-2 · Die Reach-Events auf `davidliebnau.com` heißen anders

`threshold_price_scroll` und `threshold_faq_seen` sind funktional dasselbe wie die vier
`*.reach`-Events auf Light Creators: Sektion einmal pro Seitenaufruf sichtbar geworden.
Die Verben unterscheiden sich (`_scroll`, `_seen`, `.reach`), und die Schwellwerte auch:
0,25 gegen 0,4.

Ein Vergleich der Scrolltiefe über beide Domains ist damit möglich, aber nicht
deckungsgleich. Wer die Zahlen nebeneinanderlegt, sollte den Unterschied kennen.

### W-3 · Ein Objektname trägt zwei Aktionen

`light.home.tribe` erscheint als `…tribe.click` und als `…tribe.reach`. Das ist im Schema
`brand.page.object.action` korrekt und beabsichtigt, führt im Dashboard aber zu zwei
Zeilen, die sich auf den ersten Blick ähneln. Im Goal-Anlegen nicht verwechseln.

### W-4 · Die Bindungsmechanik unterscheidet sich

`davidliebnau.com` bindet über CSS-Klassen, `light-creators.com` soll über
Data-Attribute binden. Beides ist richtig für die jeweilige Plattform — statisches HTML
gegen Webflow. Es heißt aber, dass die beiden Snippets aus diesem Verzeichnis auf
`davidliebnau.com` **nicht** funktionieren würden und umgekehrt. Sie sind kein
gemeinsamer Baustein.

---

## 3 Rückfragen

| ID | Frage | Blockiert |
|---|---|---|
| **RF-10** | Unterstützt der gebuchte Plausible-Tarif benutzerdefinierte Properties? Aus dem Repository nicht feststellbar. Von der Antwort hängt ab, ob die Spezifikation aus 1.1 oder der Fallback aus 1.2 gilt — und damit acht oder elf Goals. | F2, S7 |
| **RF-11** | Bleiben die 19 bestehenden Eventnamen auf `davidliebnau.com` wie sie sind, oder sollen sie später auf `david.*` umgestellt werden? Siehe W-1. Eine Umstellung ist frühestens nach dem Phase-1-Merge möglich und bricht die Datenkontinuität der zehn aktiven Events. | nach P1 |
| **RF-12** | Sollen `threshold_price_scroll` und `threshold_faq_seen` auf den Schwellwert 0,4 angeglichen werden, damit Scrolltiefen über beide Domains vergleichbar sind? Siehe W-2. Ebenfalls eine Änderung an bestehenden Dateien. | nach P1 |
