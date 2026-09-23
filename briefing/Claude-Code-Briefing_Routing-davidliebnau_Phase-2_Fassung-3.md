# Claude-Code-Arbeitsbriefing — Routing davidliebnau.com → Light Creators
**Phase 2, Fassung 3 vom 13.09.2026.** Ersetzt Fassung 1 und 2 vollständig.
**Domain:** davidliebnau.com, statische Seite auf GitHub Pages
**Auftragsart:** Ausführung. Kein Vorschlagspapier.

Dieses Dokument ist eigenständig lesbar. Du brauchst kein anderes Briefing, um es auszuführen.

---

## 0. Stand aus der letzten Sitzung

Auf dem Branch `claude/phase-2-nachtrag-korrektionen-3w3lp1` liegt bereits Commit `78becd9`: `podcast.html:448`, Linktext von „Zu light-creators.com →" auf „Zu Founder Resonance →", Ziel `/founder` unverändert. Das ist Änderung 8 unten und gilt als erledigt. Kein Publish, kein Merge.

Alles Weitere ist offen.

---

## 1. Was du tust und was du nicht tust

Du änderst Links, Linktexte, die globale Navigation und Tracking-Attribute. Nichts anderes.

**Nicht anfassen:** Layout, CSS, Farben, Gradienten, `assets/styles.css`, Copy außerhalb der hier genannten Linktexte und Satzumgebungen, Rechtstexte, Formulare, Seitenarchitektur. Keine neue Seite, keine Umbenennung.

**R1 — Root-Link-Regel.** Von davidliebnau.com wird nie auf die nackte Root `light-creators.com` verlinkt, immer auf einen benannten Angebotspfad. `light-creators.com/en` gilt als Root-Äquivalent und fällt unter dieselbe Regel. Ausgenommen ist genau eine globale Markentür in der Navigation, das sind Änderung 1 und 2. Ein Footerlink ist nie von dieser Ausnahme gedeckt.

**R2 — Language Safety.** Eine englische Seite verlinkt auf ein englisches Ziel. Existiert kein passendes englisches Ziel, wird kein Link gesetzt und die Lücke bleibt dokumentiert. Keine Übersetzungsäquivalenz simulieren.

**Generierte Dateien.** Für die 30 Episodenseiten plus `podcast.html` sind die Quellen `episodes-meta.json` und `tools/generate_episode.py`. Für die globale Navigation und die Footer der Inhaltsseiten ist die Quelle in diesem Briefing **nicht benannt**, weil sie nicht verifiziert wurde. Finde sie und melde, was du gefunden hast, bevor du die Nav anfasst.

---

## 2. Die Navigation, neu geschnitten

Das ist gegenüber früheren Fassungen geändert und die wichtigste Stelle des Dokuments.

**Heute:** `Home · Führen · Threshold · Podcast · Über mich · Kontakt`
**Künftig:** `Home · Führen · Threshold · Light Creators · Podcast · Über mich`

Drei Bewegungen: `Light Creators` kommt nach `Threshold` neu hinein, `Kontakt` verlässt die Nav und wandert in den Footer, die Anzahl der Nav-Punkte bleibt bei sechs.

**Der Grund für den Wechsel von Kontakt** ist nicht die Handy-Breite, sondern ein vermuteter Defekt. `Kontakt` zeigt auf `#contact` und `Über mich` auf `#about`, also auf Abschnitte innerhalb der aktuellen Seite. Auf der Startseite existieren diese Abschnitte. Auf `/fuehren/`, `/threshold/` und den 30 Episodenseiten vermutlich nicht. **Das ist eine Annahme aus dem Audit vom 12.09.2026, nicht seitenweise geprüft. Prüfe es und melde das Ergebnis, bevor du die Nav umbaust.**

### Änderung 1 — Markentür, deutsche Navigation

| | |
|---|---|
| Betroffen | globale Navigation, alle deutschen Seiten |
| Vorkommen | wiederkehrend, eine Quelle |
| Alter Zustand | kein Light-Creators-Eintrag. Programmatisch verifiziert: auf keiner der 41 Seiten existiert ein LC-Link in `nav` oder `header` |
| Zielzustand | zusätzlicher Eintrag nach `Threshold`, vor `Podcast` |
| Linktext | `Light Creators` |
| Ziel | `https://light-creators.com/` |
| Tracking | `class="plausible-event-name=outbound_lc_nav_click_de"` |
| Zusatz | eine dezente Kennzeichnung, dass der Link die Seite verlässt, etwa ein Pfeil nach schräg oben. Öffnet im selben Tab, **kein** `target="_blank"` |
| Hinweis | die eine Ausnahme von R1 |

### Änderung 2 — Markentür, englische Navigation

| | |
|---|---|
| Betroffen | `/index-en.html`, `/fuehren/en/`, `/threshold/en/`, `/threshold/partner/en/` |
| Alter Zustand | `Home · Leading · Threshold · Podcast · About · Contact`, kein LC-Eintrag |
| Zielzustand | zusätzlicher Eintrag nach `Threshold`, vor `Podcast`; `Contact` verlässt die Nav |
| Linktext | `Light Creators` |
| Ziel | `https://light-creators.com/en` |
| Tracking | `class="plausible-event-name=outbound_lc_nav_click_en"` |

### Änderung 3 — Kontakt in den Footer, Ankerlinks absolut

| | |
|---|---|
| Betroffen | globale Nav und globaler Footer, beide Sprachen |
| Alter Zustand | Nav enthält `Kontakt` → `#contact` und `Über mich` → `#about`, beide relativ |
| Zielzustand | `Kontakt` aus der Nav entfernt und im Footer ergänzt. `Über mich` bleibt in der Nav |
| Neue Ziele | DE: `/#contact` und `/#about`. EN: `/index-en.html#contact` und `/index-en.html#about` |
| Tracking | keins |
| Hinweis | der führende Schrägstrich ist der Punkt der Übung. Ohne ihn springt der Link ins Leere, sobald jemand nicht auf der Startseite steht |

---

## 3. Die Linkänderungen

### Änderung 4 — Kontextueller Next-Gen-Link, deutsche Threshold-Seite

| | |
|---|---|
| Betroffen | `/threshold/`, Sektion mit dem Anker `#naechste-schritte` |
| Vorkommen | einmalig |
| Alter Zustand | die Threshold-Strecke enthält in keiner Sprache einen Light-Creators-Link. Verifiziert für `/threshold/`, `/threshold/partner/`, `/threshold/en/`, `/threshold/partner/en/` |
| Zielzustand | ein Absatz plus Link am Ende der Sektion |
| Satzumgebung | `Wenn Threshold sich gerade zu groß anfühlt, ist das eine brauchbare Information und kein Nein. Unter Next Gen liegt der kleinere Einstieg, mit dem du in einer Woche etwas Konkretes ausprobierst.` |
| Linktext | `Zu Next Gen →` |
| Ziel | `https://light-creators.com/next-gen` |
| Tracking | `class="plausible-event-name=outbound_lc_next_gen_click_de"` |
| Hinweis | keine neue Sektion, kein neues Layout. Die Prosa trägt den Reframe, der Link nur das Ziel |

### Änderung 5 — Englischer Founder-Block, deutsches Ziel korrigieren

| | |
|---|---|
| Betroffen | `/` und `/podcast.html`, Block mit dem Anker `#english-founders` |
| Vorkommen | zwei Stellen |
| Alter Zustand | Linktext `→ light-creators.com Founder Resonance`, Ziel `https://light-creators.com/founder`. Auf `/` mit `outbound_light_creators_click` instrumentiert, auf `/podcast.html` nicht |
| Linktext neu | `Founder Resonance in English →` |
| Ziel neu | `https://light-creators.com/founder-en` |
| Tracking | `class="plausible-event-name=outbound_lc_english_block_click"` auf beiden Stellen. Dieses Event **ersetzt** hier `outbound_lc_founder_click_de` und kommt nicht zusätzlich dazu |
| Hinweis | der Block existiert, um englischsprachige Founder abzufangen, und liefert sie heute auf einer deutschen Seite ab |

### Änderung 6 — Die `/en`-Footer-Links der 30 Episodenseiten

| | |
|---|---|
| Betroffen | die 30 Episodenseiten, Footer-Liste. **Nicht `/podcast.html`**, siehe Änderung 7 |
| Quelle | `episodes-meta.json` und `tools/generate_episode.py` |
| **Identifikation, eindeutig** | der Link mit **Linktext `light-creators.com/en` und Ziel `https://light-creators.com/en`**. Das ist der einzige `/en`-Link je Seite. Die zwei `/founder`-Links mit dem Text „Für Founder Resonance: light-creators.com" sind **nicht** gemeint und bleiben unverändert |
| Linktext neu | `Founder Resonance in English →` |
| Ziel neu | `https://light-creators.com/founder-en` |
| Tracking | `class="plausible-event-name=outbound_lc_founder_click_episode"` |
| Hinweis | Kern von R1: 30 Links auf ein Root-Äquivalent. Es gibt zu diesem Punkt **keine Alternative** mehr, die Variante „auf `/en` zeigen lassen" ist gestrichen |

### Änderung 7 — Denselben Footer-Link auf `/podcast.html` entfernen

| | |
|---|---|
| Betroffen | `/podcast.html`, Footer-Liste |
| Alter Zustand | Linktext `light-creators.com/en`, Ziel `https://light-creators.com/en` |
| Zielzustand | Link ersatzlos entfernt |
| Warum nicht wie Änderung 6 | `/podcast.html` trägt bereits den Block `#english-founders`, der nach Änderung 5 auf `/founder-en` zeigt. Beides zusammen ergäbe zwei wortgleiche Links auf dasselbe Ziel auf einer Seite |
| Technischer Punkt | Podcast-Seite und Episodenseiten teilen denselben Footer. Änderung 6 und 7 brauchen zusammen eine Bedingung im Generator, nicht zwei Templatedateien. Wenn sich das nicht sauber ausdrücken lässt, melde es, bevor du eine zweite Datei anlegst |

### Änderung 8 — Sprechender Linktext, `/podcast.html`

**Erledigt in Commit `78becd9`.** `podcast.html:448`, `.next-section`: Linktext jetzt `Zu Founder Resonance →`, Ziel `https://light-creators.com/founder` unverändert. Es fehlt noch die Instrumentierung: ergänze `class="plausible-event-name=outbound_lc_founder_click_de"`.

### Änderung 9 — Derselbe Linktext auf der Startseite

| | |
|---|---|
| Betroffen | `index.html:342` |
| Alter Zustand | Linktext `Zu light-creators.com →`, Ziel `https://light-creators.com/founder` |
| Linktext neu | `Zu Founder Resonance →` |
| Ziel | unverändert |
| Tracking | `class="plausible-event-name=outbound_lc_founder_click_de"` |
| Hinweis | dieselbe Begründung wie Änderung 8, dieselbe Stelle in der englischen Fassung `index-en.html` prüfen und, falls vorhanden, analog auf `To Founder Resonance →` ändern mit `outbound_lc_founder_click_en` |

### Änderung 10 — GESPERRT: kontextueller Next-Gen-Link in EN

| | |
|---|---|
| Betroffen | `/threshold/en/` |
| Status | **Nicht ausführen.** Das Ziel `https://light-creators.com/next-gen-en` existiert noch nicht |
| Freigabe | erst wenn die Seite veröffentlicht und der Pfad bestätigt ist |
| Satzumgebung | `If Threshold feels too big right now, that is useful information and not a no. Next Gen holds the smaller way in, the kind you can try in a week.` |
| Linktext | `Go to Next Gen →` |
| Ziel | `https://light-creators.com/next-gen-en` |
| Tracking | `class="plausible-event-name=outbound_lc_next_gen_click_en"` |
| Bis dahin | Lücke bleibt dokumentiert. Kein Ersatzlink auf eine deutsche Seite |

### Was unverändert bleibt

| Stelle | Ziel | Anmerkung |
|---|---|---|
| `/` Hero, `.wege-section`, `#contact` | `/founder` | Instrumentierung auf `outbound_lc_founder_click_de` umstellen |
| Haupt-Footer auf 33 Seiten, „Für Founder Resonance: light-creators.com" | `/founder` | dito |
| Episodenseiten, der Button `.btn--ghost` und der Footer-Listen-Link, beide „Für Founder Resonance: light-creators.com" | `/founder` | Ziel und Text bleiben. Beide bekommen `outbound_lc_founder_click_de` |
| `/index-en.html` Hero, `.wege-section`, `#contact`, Footer | `/founder-en` | Instrumentierung auf `outbound_lc_founder_click_en` umstellen |
| `/fuehren/en/` Footer | `/founder-en` | heute nicht instrumentiert, `outbound_lc_founder_click_en` ergänzen |
| alle Threshold-Links und `threshold_*`-Events | unverändert | Threshold liegt auf derselben Domain, kein Cross-Domain-Signal |
| EN-Nav `Podcast` → `podcast.html` | unverändert | dokumentierte Lücke. Ein deutschsprachiger Podcast braucht keine englische Fläche |
| Rechtstext-Links im EN-Footer | unverändert | Entscheidung, kein Defekt. Nicht im Scope |

---

## 4. Eventnamen

Acht Namen für ausgehende Links nach light-creators.com. Diese Liste wird nicht erweitert.

```
outbound_lc_nav_click_de
outbound_lc_nav_click_en
outbound_lc_next_gen_click_de
outbound_lc_next_gen_click_en
outbound_lc_founder_click_de
outbound_lc_founder_click_en
outbound_lc_english_block_click      nur Block #english-founders
outbound_lc_founder_click_episode    nur der englische Footer-Link der 30 Episodenseiten
```

**Reichweite dieser Regel, ausdrücklich geklärt:** die acht Namen regeln ausschließlich ausgehende Klicks von davidliebnau.com nach light-creators.com. Sie regeln nicht die Events auf light-creators.com selbst und nicht die bestehende `threshold_*`-Familie auf dieser Domain. Die Prüfzeile „kein Eventname außerhalb der acht" gilt genau für die `outbound_lc_*`-Taxonomie.

Jeder Link trägt **genau eine** Eventklasse.

`outbound_light_creators_click` existiert heute neunmal, fünfmal in `index.html` und viermal in `index-en.html`. Es wird vollständig abgelöst und darf danach im Repository nicht mehr vorkommen. Melde die Trefferzahl vor und nach der Änderung.

Auf den 30 Episodenseiten und auf `/podcast.html` tragen die Light-Creators-Links heute **überhaupt kein** Event. Dort wird also nicht umbenannt, sondern erstmals instrumentiert. Das gehört in dieses Paket und nicht in eine spätere Sitzung.

**Mechanik:** Events laufen auf dieser Domain über Klassennamen, `class="plausible-event-name=…"`. Kein `data-plausible-event`, das ist das Muster der anderen Domain. Der gebuchte Plausible-Plan ist Growth und enthält **keine** Custom Properties. Sprache und Position stehen deshalb im Namen. Baue keine Properties, auch nicht vorbereitend.

Keine personenbezogenen Daten in Eventnamen oder URLs.

Die neuen Goals legt David selbst in Plausible an. Das Goal `outbound_light_creators_click` bleibt vorerst stehen, damit die Historie lesbar bleibt.

---

## 5. Merge-Konvention

Direkte Merges auf Produktion sind für chirurgische, klar umrissene Änderungen freigegeben. Kein PR-Review. Drei Einschränkungen:

1. Ein Commit je Änderung. Änderung 6, 7 und die Instrumentierung dürfen zusammen in einen Commit, wenn sie dieselbe Generatorquelle betreffen.
2. Änderung 1, 2 und 3 erst, nachdem du die Nav-Quelle gemeldet hast und die Ankerfrage aus Abschnitt 2 beantwortet ist. Eine falsch geratene Quelle betrifft 41 Seiten gleichzeitig.
3. Änderung 10 nicht mergen.

Commit-Botschaften im Muster `routing(de): Markentür Light Creators in globale Nav`, `nav: Kontakt in den Footer, Ankerlinks absolut`, `tracking: outbound_light_creators_click durch outbound_lc_* ersetzt`.

---

## 6. Selbstprüfliste

Melde zu jedem Punkt das Ergebnis, nicht nur ein Häkchen.

- [ ] Kein Link zeigt auf `https://light-creators.com` ohne Pfad. Volltextsuche, Trefferzahl melden.
- [ ] Kein Link zeigt auf `https://light-creators.com/en` außer der Markentür in der englischen Navigation. Trefferzahl melden.
- [ ] Jedes genannte Ziel liefert HTTP 200 und keine Redirect-Kette. Mindestens `/`, `/en`, `/founder`, `/founder-en`, `/next-gen`.
- [ ] Keine englische Seite verlinkt auf eine deutsche Zielseite, ausgenommen der Nav-Eintrag `Podcast`.
- [ ] Keine deutsche Seite verlinkt englisch beschriftet auf ein deutsches Ziel.
- [ ] Auf keiner Einzelseite stehen zwei wortgleiche Links auf dasselbe Ziel. Prüfe `/podcast.html`, `index.html` und eine Episodenseite als Stichprobe.
- [ ] `outbound_light_creators_click` kommt nicht mehr vor.
- [ ] Kein `outbound_lc_*`-Name außerhalb der acht aus Abschnitt 4. Volltextsuche über `plausible-event-name=`, gefundene Namen auflisten.
- [ ] Jeder Link trägt genau eine `plausible-event-name`-Klasse.
- [ ] Keine Custom Property und keine Property-Syntax im Repository.
- [ ] Die Nav hat auf allen 41 Seiten dieselbe Reihenfolge und sechs Punkte. `Kontakt` steht nirgends mehr in der Nav und überall im Footer.
- [ ] Alle Ankerlinks auf `#about` und `#contact` sind absolut. Von einer Episodenseite aus getestet.
- [ ] Keine Änderung an `assets/styles.css`, an Farben, Gradienten oder Layout. `git diff --stat` melden.
- [ ] Keine Änderung an Rechtstexten, Formularen oder der Seitenarchitektur.
- [ ] Keine generierte Ausgabedatei direkt bearbeitet.
- [ ] `/sitemap.xml` unverändert.
- [ ] Änderung 10 ist nicht ausgeführt.
- [ ] Mobile-Sichtprüfung der Nav. Bei Umbruch **nichts am CSS ändern**, melden.

---

## 7. Was du meldest, statt es zu lösen

- Die Quelle der globalen Navigation und der Inhaltsseiten-Footer, bevor du sie anfasst.
- Ob `#about` und `#contact` außerhalb der Startseite existieren.
- Ob sich Änderung 6 und 7 in einer Generatorquelle mit einer Bedingung ausdrücken lassen.
- Ob `index-en.html` eine Entsprechung zu `index.html:342` hat.
- Jede Stelle, an der der alte Zustand nicht so vorliegt, wie hier beschrieben. Der Ist-Zustand stammt aus einem Audit vom 12.09.2026 und aus deinem eigenen Repo-Bericht vom 13.09.2026. Weicht er ab, ist das eine Meldung und keine Interpretationsaufgabe.
- Alles, was du nicht prüfen konntest. Als Prüfaufgabe hinschreiben, jede Annahme als Annahme markieren.
