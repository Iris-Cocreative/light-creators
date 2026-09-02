# Entscheidungsvorlage für Freigabepunkt F1

**Zweck:** Vorbereitung von **F1** aus der Ablauffolge in `phase2-lightcreators-claude-code.md`.
F1 hängt an S1; S1 ist mit CC-6 und CC-7 abgeschlossen.
**Stand:** 2. September 2026
**Was das hier nicht ist:** nicht CC-8. Das Übergabeprotokoll entsteht nach S9.

> Diese Vorlage entscheidet nichts. Sie stellt die offenen Punkte so zusammen, dass sie
> in einem Durchgang beantwortbar sind, und legt zu jedem den geprüften Sachstand daneben.
> Wo eine Empfehlung steht, ist sie als solche gekennzeichnet und begründet.

---

## 1. Was F1 tatsächlich blockiert

Ohne F1 startet **S2** nicht. S2 ist CC-1, CC-2 und CC-4 — die sind auf deine Anweisung
hin bereits gebaut, als dokumentierter Vorgriff. Praktisch blockiert F1 damit heute nur
noch das Setzen der Linkziele im Webflow-Bau, nicht mehr die Zulieferung.

Vier Punkte des Briefings stehen auf F1: **OD-1b, OD-2b, OD-3, OD-4, OD-5.**
Dazu kommen aus der Prüfarbeit **RF-1 bis RF-4**.

---

## 2. Geprüfter Sachstand, der in die Entscheidungen einfließt

Alles hier ist am 02.09.2026 im Code oder live geprüft, nichts stammt aus einem Dokument.

| Befund | Belegt durch | Betrifft |
|---|---|---|
| `light-creators.com/tribe` antwortet **404** | Live-Abruf | OD-5 |
| `light-creators.com/about` antwortet **404** | Live-Abruf | OD-7 |
| `/`, `/en`, `/quiz`, `/call`, `/quiz-en`, `/call-en`, `/podcast`, `/buch`, `/impressum`, `/datenschutz`, `/abgs` antworten **200** | Live-Abruf | OD-2b, OD-3, OD-4 |
| Auf `light-creators.com` läuft ein Meta Pixel (`fbq`, `connect.facebook.net`), **kein Plausible** | Live-Abruf | OD-1b, S-P0 |
| **74 Anker** aus diesem Repository zeigen auf die Wurzel, **71 davon** mit der Beschriftung „Founder Resonance" | CC-6 | OD-2b, RF-3 |
| **31 Anker** zeigen auf `/en`, davon 30 in generierten Episoden | CC-6 | RF-2 |
| Die nackten URLs `/quiz` und `/call` stehen in **ep-28 und ep-29** plus `content/ep-29.txt` | CC-6 | RF-1 |
| Zielpfade insgesamt: nur vier (`/`, `/en`, `/quiz`, `/call`) | CC-6 | Redirect-Liste |

---

## 3. Die Punkte auf F1

### OD-1b · Meta Pixel auf `light-creators.com`

**Sachstand.** Der Pixel läuft site-weit, `fbq init` plus `PageView`, ohne erkennbaren
Einwilligungsmechanismus. Plausible ist dort nicht eingebunden.

**Optionen laut Briefing:** entfernen · hinter eine Einwilligung legen · behalten und in
der Datenschutzerklärung abbilden.

**Keine Empfehlung von hier.** Das ist eine Rechts- und Marketingentscheidung, keine
technische. Was aus diesem Repository dazu gehört: `datenschutz/index.html`, Ziffer 8
nennt `light-creators.com` als verlinktes Angebot. Ob dieser Satz ausreicht, wenn dort
ein cookiesetzender Drittanbieter läuft, gehört in die Anwaltsprüfung, die ohnehin
aussteht.

**Blockiert nicht** die Plausible-Einbindung (S-P0).

---

### OD-2b · Interim-Pfad der alten Startseite

**Sachstand.** Der Founder-Inhalt zieht laut R-B unverändert auf einen eigenen Pfad und
bleibt als Interim live. Welcher Slug, ist offen. Ob die Seite indexiert bleibt, ist offen.

**Warum das der Angelpunkt ist.** An OD-2b hängen 71 Anker, deren Beschriftung ein
Founder-Angebot zusagt. Solange der Slug nicht feststeht, lässt sich RF-3 nicht
entscheiden, und die Redirect-Liste des Webflow-Strangs bleibt unvollständig.

**Zu entscheiden sind drei Dinge, nicht eines:**
1. Der Slug.
2. Indexiert oder `noindex` bis Sprint C.
3. Ob `/en` mitzieht — das ist RF-2 und im Briefing nicht adressiert.

---

### OD-3 · Zieladresse des Next-Gen-CTA

**Sachstand.** Betrifft `S6.NG.CTA` und `S9.CTA1`, beide in der Copy-Datei als
`linkziel: OFFEN · OD-3` markiert, ohne Platzhalter-URL.

Auf `light-creators.com` existieren laut Briefing drei Flourishing-Life-Seiten. In
**diesem** Repository liegen drei gleichnamige Entwürfe unter `landing-pages/`
(`flourishing-life-dich.html`, `-eltern.html`, `-eltern-v2.html`), alle auf `noindex`
und nicht verlinkt. Ob sie den Seiten auf `light-creators.com` entsprechen, ist von hier
aus nicht feststellbar — die Webflow-Seite kenne ich nur über den Live-Abruf, und die
drei Pfade sind mir nicht genannt.

**Keine Empfehlung von hier.** Ob eine der drei Seiten das Ziel wird oder eine neue
Übersichtsseite entsteht, ist eine Produktentscheidung.

---

### OD-4 · Zieladresse des Founders-CTA

**Sachstand.** Betrifft `S6.FO.CTA` und `S9.CTA2`. Kandidaten laut Briefing: `/quiz`,
`/call`, `/en`, oder die nach OD-2b verschobene alte Startseite. Alle vier antworten
heute mit 200, der vierte existiert noch nicht.

**Ein Hinweis aus der Linkprüfung, keine Empfehlung.** `/quiz` und `/call` sind bereits
die beiden Ziele, die in ep-28 und ep-29 im Fließtext genannt werden. Wird eines davon
auch das CTA-Ziel, laufen zwei verschiedene Einstiegswege auf dieselbe Seite — das ist
messbar trennbar über `light.home.founders.click`, aber nur, wenn die Podcast-Erwähnung
nicht ebenfalls verlinkt wird.

---

### OD-5 · Der Tribe-Pfad

**Sachstand.** Betrifft `S9.CTA3` („Ich möchte die Menschen kennenlernen →").
**`light-creators.com/tribe` antwortet heute mit 404.** Eine eigene Seite müsste also neu
entstehen; ein Anker auf derselben Seite wäre ohne zusätzliche Seite umsetzbar.

**Messtechnische Folge, die vor der Entscheidung bekannt sein sollte:** Von der Antwort
hängt ab, was `light.home.tribe.click` bedeutet. Bei einem Anker ist es ein Sprung
innerhalb derselben Session und derselben Seite; bei einer eigenen Seite ein
Seitenwechsel, der in Plausible als zweiter Pageview erscheint. Beides ist messbar, aber
die Zahlen sind nicht vergleichbar, und die primäre KPI zählt nur `nextgen` und
`founders` — der Tribe-Pfad steht daneben.

---

## 4. Die vier Rückfragen aus der Prüfarbeit, die auf F1 gehören

| ID | Frage | Sachstand | Empfehlung |
|---|---|---|---|
| **RF-1** | Der Korrektur-Commit nach dem Publish muss vier Ebenen erfassen: `ep-28`, `ep-29`, `content/ep-29.txt`, `tools/generate_episode.py`. Ein Commit oder vier? | Wer nur die beiden Episodenseiten korrigiert, bekommt die alte URL beim nächsten Generatorlauf zurück. | **Ein Commit.** Die vier Ebenen gehören zu einer Änderung; getrennt zurückgenommen ergäbe jede für sich einen inkonsistenten Zustand. |
| **RF-2** | Zieht `/en` mit der deutschen Wurzel auf einen Interim-Pfad um? | 31 Anker, davon 30 in generierten Episoden. Im Briefing nicht adressiert, OD-2b spricht nur von „der alten Startseite". | **Keine.** Das ist Teil derselben Markenentscheidung wie OD-2b und gehört dorthin. |
| **RF-3** | Die 71 Wurzel-Anker mit der Beschriftung „Founder Resonance": umhängen auf den Interim-Pfad oder auf der Wurzel lassen und die Beschriftung anpassen? | 60 davon stehen in generierten Episoden und in `tools/generate_episode.py`. | **Umhängen, nicht umformulieren.** Die Beschriftung in 30 Episoden zu ändern ist ein redaktioneller Eingriff in datierte Inhalte; das Linkziel zu ändern ist es nicht. Beides läuft über dieselbe Generatorvorlage, der Aufwand ist gleich. |
| **RF-4** | `Person.worksFor.Organization.url` in den beiden JSON-LD-Blöcken: bleibt die Wurzel? | `index.html:34`, `index-en.html:34`. Die Aussage lautet: David Liebnau arbeitet für die Organisation „Light Creators" unter dieser URL. | **Bleibt die Wurzel.** Die Organisation heißt Light Creators und residiert auf der Wurzel, unabhängig davon, welches Angebot dort steht. Der Interim-Pfad wäre ein Produktpfad, keine Organisations-URL. |

---

## 5. Was nicht auf F1 gehört, aber offen ist

Zur Vollständigkeit, damit nichts durchfällt. Diese Punkte blockieren F1 nicht.

| ID | Kurz | Fällig zu | Quelle |
|---|---|---|---|
| OD-6 | Öffentliche Bezeichnung für „Next Gen" | F2 | Briefing |
| OD-7 | Navigation, „About"-Seite existiert nicht (404 geprüft) | F2 | Briefing |
| OD-8 | Reihenfolge der zwei Wege auf Mobil | F2 | Briefing |
| OD-9 | Design-System, einschließlich Symbolfarben | F2 | Briefing |
| OD-10 | SEO-Title, Meta Description, Open-Graph-Text | F2 | Briefing |
| OD-11 | Tribe-Mitgliedschaft und Aufnahmelogik | F5 | Briefing |
| OD-12 | Verhältnis zur bestehenden Testimonials-Collection | S3 | Briefing |
| RF-5 | Das Founder Resonance Assessment ist **nicht** im Archiv gesichert | Phase 3 | CC-7 |
| RF-6 | Die fünf Faktoren liegen in zwei Fassungen vor — welche gilt? | Phase 3 | CC-7 |
| RF-7 | Welcher Goldwert gilt für die Symbole? | OD-9 | CC-2 |
| RF-8 | Zwei nicht identische Symbolsätze im Repository — welcher führt? | nach P1 | CC-2 |
| RF-9 | `S5.LABEL.A`: eine Stimme mit Label, eine ohne — Absicht oder Auslassung? | F2, S3 | CC-1 |
| RF-10 | Trägt der Plausible-Tarif benutzerdefinierte Properties? | F2, S7 | CC-4 |
| RF-11 | Bleiben die 19 Eventnamen auf `davidliebnau.com`, oder Umstellung auf `david.*`? | nach P1 | CC-4 |
| RF-12 | Schwellwert der bestehenden Reach-Events auf 0,4 angleichen? | nach P1 | CC-4 |

**RF-8, RF-11 und RF-12 sind gesperrt, bis Phase 1 gemergt ist.** Alle drei wären
Änderungen an bestehenden Dateien und fallen unter R-E.

---

## 6. Reihenfolge, in der die Antworten am meisten lösen

1. **OD-2b** zuerst, einschließlich RF-2. Löst RF-3, RF-4 und die Redirect-Liste mit.
2. **OD-5**, weil davon abhängt, ob eine zusätzliche Seite entsteht — das betrifft den
   Umfang des Webflow-Baus, nicht nur ein Linkziel.
3. **OD-3 und OD-4**, die reinen Linkziele. Sie blockieren nur das Setzen, nicht den Bau.
4. **OD-1b** unabhängig davon, weil es die Plausible-Einbindung nicht aufhält.
5. **RF-10** parallel, weil es nur ein Blick ins Dashboard ist und über zehn oder
   dreizehn Goals entscheidet.
