# Claude-Code-Arbeitsbriefing — Routing davidliebnau.com → Light Creators

**Phase 2, Fassung 4 vom 13.09.2026.** Ersetzt alle früheren Fassungen und Nachträge vollständig.
**Repository:** `iris-cocreative/light-creators`, darin die statische Seite davidliebnau.com
**Arbeitsbranch:** `claude/phase-2-nachtrag-korrektionen-3w3lp1`
**Auftragsart:** Ausführung. Kein Vorschlagspapier.

Eigenständig lesbar. Du brauchst kein weiteres Briefing. Das ältere Paar `briefing/phase2-lightcreators-*.md` vom 02.09.2026 auf `origin/founder-pfad-umhaengen` ist überholt und gilt nicht.

## 0. Was sich gegenüber Fassung 3 geändert hat

Deine Bestandsaufnahme vom 13.09.2026 hat zwei Annahmen widerlegt, auf denen Fassung 3 aufsetzte. Beides ist hier korrigiert.

**Die Ankeränderung ist gestrichen.** Fassung 3 verlangte, alle Links auf `#about` und `#contact` absolut zu setzen, weil sie außerhalb der Startseite ins Leere zeigten. Das war falsch. Deine Zählung zeigt: die Episodenseiten nutzen `../index.html#contact`, sechs weitere Seiten `/#about`, die Startseiten seitenintern `#contact`. Alle Formen landen auf einer Seite, die den Anker trägt. Es ist nichts kaputt, also wird nichts umgestellt. An die Stelle tritt eine eng begrenzte Prüfung, siehe Änderung 3.

**Die Navigation hat 15 Bearbeitungsstellen, nicht eine.** 30 Episodenseiten über `tools/generate_episode.py`, Zeilen 343 bis 362, plus 14 handgepflegte Seiten in drei Varianten. Das steht jetzt ausdrücklich in Abschnitt 2.

## 1. Was du tust und was du nicht tust

Du änderst Links, Linktexte, die globale Navigation und Tracking-Attribute. Nichts anderes.

**Nicht anfassen:** Layout, CSS, Farben, Gradienten, `assets/styles.css`, Copy außerhalb der hier genannten Linktexte und Satzumgebungen, Rechtstexte, Formulare, Seitenarchitektur. Keine neue Seite, keine Umbenennung.

**Die HTML-Entities bleiben.** Fünf Seiten schreiben `F&uuml;hren` und `&Uuml;ber mich` statt der Umlaute. Das ist entschieden und wird **nicht** vereinheitlicht. Es ist kosmetisch und würde den Diff aufblähen. Arbeite dort vorsichtig: ein Suchen und Ersetzen auf „Führen" oder „Über mich" übersieht genau diese fünf Dateien.

**R1 — Root-Link-Regel.** Von davidliebnau.com wird nie auf die nackte Root `light-creators.com` verlinkt, immer auf einen benannten Angebotspfad. `light-creators.com/en` gilt als Root-Äquivalent und fällt unter dieselbe Regel. Ausgenommen ist genau eine globale Markentür in der Navigation, das sind Änderung 1 und 2. Ein Footerlink ist nie von dieser Ausnahme gedeckt.

**R2 — Language Safety.** Eine englische Seite verlinkt auf ein englisches Ziel. Existiert keins, wird kein Link gesetzt und die Lücke bleibt dokumentiert.

## 2. Die Navigation

Ziel in einem Satz: `Light Creators` kommt in jede Variante der Site-Navigation, und `Kontakt` verlässt dort die Navigation, wo es heute steht.

### Die drei Varianten und was mit jeder passiert

**Variante A, DE mit Kontakt, 8 Seiten**
`index.html`, `podcast.html`, `fuehren/`, `ki-einsatz/`, `impressum/`, `datenschutz/`, `agb/`, `widerruf/`

| | |
|---|---|
| heute | Home · Führen · Threshold · Podcast · Über mich · Kontakt · DE/EN |
| künftig | Home · Führen · Threshold · **Light Creators** · Podcast · Über mich · DE/EN |
| dazu | `Kontakt` wandert in den Footer dieser Seiten, Ziel unverändert wie bisher auf der jeweiligen Seite |

**Variante B, EN mit Contact, 2 Seiten**
`index-en.html`, `fuehren/en/`

| | |
|---|---|
| heute | Home · Leading · Threshold · Podcast · About · Contact · DE/EN |
| künftig | Home · Leading · Threshold · **Light Creators** · Podcast · About · DE/EN |
| dazu | `Contact` wandert in den Footer, Ziel unverändert |

**Variante C, Threshold-Familie, 4 Seiten**
`threshold/`, `threshold/en/`, `threshold/partner/`, `threshold/partner/en/`

| | |
|---|---|
| heute | Home · Führen · Threshold · Plätze finanzieren · Podcast · DE/EN |
| künftig | Home · Führen · Threshold · **Light Creators** · Plätze finanzieren · Podcast · DE/EN |
| dazu | **nichts.** Diese Variante hat keinen Kontakt-Eintrag, es wird nichts in den Footer verschoben |
| ausdrücklich | `Plätze finanzieren` bleibt unverändert, einschließlich seiner Zieladresse. Dort liegt bewusst eine davidliebnau.com-Adresse, weil die Threshold-Strecke auf dieser Domain gehostet wird. **Nicht auf eine Light-Creators-Adresse ändern** |

Diese vier Seiten tragen damit einen Eintrag mehr als die übrigen. Das ist gewollt.

**Variante D, Generator, 30 Episodenseiten**
`tools/generate_episode.py`, Zeilen 343 bis 362. Behandlung wie Variante A. Änderung in der Quelle, danach Regenerationslauf. Keine generierte Ausgabedatei per Hand bearbeiten.

`solo.html`, `project-plan.html` und `styles.html` enthalten ein `<nav>`, aber nicht die Site-Navigation. Sie bleiben außen vor.

### Änderung 1 — Markentür, deutsche Seiten

| | |
|---|---|
| Betroffen | Varianten A, C und D, deutsche Fassungen |
| Position | nach `Threshold` |
| Linktext | `Light Creators` |
| Ziel | `https://light-creators.com/` |
| Tracking | `class="plausible-event-name=outbound_lc_nav_click_de"` |
| Zusatz | dezente Kennzeichnung, dass der Link die Seite verlässt, etwa ein Pfeil nach schräg oben. Öffnet im selben Tab, **kein** `target="_blank"` |
| Alter Zustand | auf keiner der 44 Seiten existiert heute ein LC-Link in `nav` oder `header` |

### Änderung 2 — Markentür, englische Seiten

| | |
|---|---|
| Betroffen | `index-en.html`, `fuehren/en/`, `threshold/en/`, `threshold/partner/en/` |
| Position | nach `Threshold` |
| Linktext | `Light Creators` |
| Ziel | `https://light-creators.com/en` |
| Tracking | `class="plausible-event-name=outbound_lc_nav_click_en"` |

### Änderung 3 — Kontakt in den Footer, plus eine eng begrenzte Ankerprüfung

| | |
|---|---|
| Betroffen | Varianten A, B und D. **Nicht** Variante C |
| Zielzustand | `Kontakt` beziehungsweise `Contact` aus der Navigation entfernt und im Footer derselben Seite ergänzt. Zieladresse in der jeweiligen Form, die auf dieser Seite heute schon steht |
| `Über mich` / `About` | bleibt in der Navigation |
| Tracking | keins |

**Die Ankerprüfung, ersetzt die gestrichene Generalumstellung.** Es gibt zwei Startseiten. Ein absolutes `/#about` ist auf deutschen Seiten richtig und auf englischen falsch, weil es dort auf die deutsche Startseite führt. Prüfe ausschließlich die vier englischen Seiten (`index-en.html`, `fuehren/en/`, `threshold/en/`, `threshold/partner/en/`) darauf, ob ihre Anker auf `index-en.html` zeigen. `fuehren/en/` macht es mit `/index-en.html#about` bereits richtig. Wo eine englische Seite auf einen deutschen Startseitenanker zeigt, korrigiere sie auf die `index-en.html`-Form. Sonst nichts.

Die 8 seitenintern relativen Anker auf den beiden Startseiten bleiben, wie sie sind. Entschieden.

## 3. Die Linkänderungen

### Änderung 4 — Kontextueller Next-Gen-Link, deutsche Threshold-Seite

| | |
|---|---|
| Betroffen | `/threshold/`, Sektion mit dem Anker `#naechste-schritte` |
| Vorkommen | einmalig |
| Alter Zustand | die Threshold-Strecke enthält in keiner Sprache einen Light-Creators-Link |
| Satzumgebung | `Wenn Threshold sich gerade zu groß anfühlt, ist das eine brauchbare Information und kein Nein. Unter Next Gen liegt der kleinere Einstieg, mit dem du in einer Woche etwas Konkretes ausprobierst.` |
| Linktext | `Zu Next Gen →` |
| Ziel | `https://light-creators.com/next-gen` |
| Tracking | `class="plausible-event-name=outbound_lc_next_gen_click_de"` |
| Hinweis | keine neue Sektion, kein neues Layout |

### Änderung 5 — Englischer Founder-Block, deutsches Ziel korrigieren

| | |
|---|---|
| Betroffen | `index.html` und `podcast.html`, Block mit dem Anker `#english-founders` |
| Alter Zustand | Linktext `→ light-creators.com Founder Resonance`, Ziel `/founder`. Auf `index.html` mit `outbound_light_creators_click` instrumentiert, auf `podcast.html` nicht |
| Linktext neu | `Founder Resonance in English →` |
| Ziel neu | `https://light-creators.com/founder-en` |
| Tracking | `class="plausible-event-name=outbound_lc_english_block_click"` auf beiden Stellen. Dieses Event **ersetzt** hier `outbound_lc_founder_click_de` |

### Änderung 6 — Die `/en`-Footer-Links der 30 Episodenseiten

| | |
|---|---|
| Quelle | `episodes-meta.json` und `tools/generate_episode.py` |
| Identifikation | der Link mit Linktext `light-creators.com/en` und Ziel `https://light-creators.com/en`. Der einzige `/en`-Link je Seite. Die zwei `/founder`-Links mit dem Text „Für Founder Resonance: light-creators.com" sind **nicht** gemeint und bleiben unverändert |
| Linktext neu | `Founder Resonance in English →` |
| Ziel neu | `https://light-creators.com/founder-en` |
| Tracking | `class="plausible-event-name=outbound_lc_founder_click_episode"` |

### Änderung 7 — Denselben Footer-Link auf `podcast.html` entfernen

| | |
|---|---|
| Alter Zustand | Linktext `light-creators.com/en`, Ziel `/en` |
| Zielzustand | ersatzlos entfernt |
| Warum | `podcast.html` trägt bereits den Block `#english-founders`, der nach Änderung 5 auf `/founder-en` zeigt. Sonst stünden zwei wortgleiche Links auf dasselbe Ziel auf einer Seite |
| Technischer Punkt | Podcast- und Episodenseiten teilen denselben Footer. Änderung 6 und 7 brauchen zusammen eine Bedingung im Generator, keine zweite Templatedatei. Falls das nicht sauber geht, melden |

### Änderung 8 — Sprechender Linktext, `podcast.html`

Der Textteil ist erledigt in Commit `78becd9`: `podcast.html:448`, `.next-section`, Linktext `Zu Founder Resonance →`, Ziel `/founder` unverändert.

**Offen und hiermit bestätigt:** ergänze `class="plausible-event-name=outbound_lc_founder_click_de"`.

### Änderung 9 — Derselbe Linktext auf der Startseite

| | |
|---|---|
| Betroffen | `index.html:342` |
| Alter Zustand | Linktext `Zu light-creators.com →`, Ziel `/founder` |
| Linktext neu | `Zu Founder Resonance →`, Ziel unverändert |
| Tracking | `class="plausible-event-name=outbound_lc_founder_click_de"` |
| Zusatz | prüfe `index-en.html` auf eine Entsprechung. Falls vorhanden: `To Founder Resonance →` mit `outbound_lc_founder_click_en` |

### Änderung 10 — GESPERRT

| | |
|---|---|
| Betroffen | `threshold/en/` |
| Status | **nicht ausführen.** Ziel `https://light-creators.com/next-gen-en` existiert noch nicht |
| Satzumgebung | `If Threshold feels too big right now, that is useful information and not a no. Next Gen holds the smaller way in, the kind you can try in a week.` |
| Linktext | `Go to Next Gen →` |
| Tracking | `class="plausible-event-name=outbound_lc_next_gen_click_en"` |

### Was unverändert bleibt

| Stelle | Ziel | Anmerkung |
|---|---|---|
| `index.html` Hero, `.wege-section`, `#contact` | `/founder` | Instrumentierung auf `outbound_lc_founder_click_de` umstellen |
| Haupt-Footer auf 33 Seiten, „Für Founder Resonance: light-creators.com" | `/founder` | dito |
| Episodenseiten, Button `.btn--ghost` und Footer-Listen-Link, beide „Für Founder Resonance: light-creators.com" | `/founder` | Text und Ziel bleiben, beide bekommen `outbound_lc_founder_click_de` |
| `index-en.html` Hero, `.wege-section`, `#contact`, Footer | `/founder-en` | Instrumentierung auf `outbound_lc_founder_click_en` |
| `fuehren/en/` Footer | `/founder-en` | heute nicht instrumentiert, ergänzen |
| `Plätze finanzieren` in Variante C | unverändert | siehe Abschnitt 2 |
| alle Threshold-Links und `threshold_*`-Events | unverändert | dieselbe Domain, kein Cross-Domain-Signal |
| EN-Nav `Podcast` → `podcast.html` | unverändert | dokumentierte Lücke |
| Rechtstext-Links im EN-Footer | unverändert | Entscheidung, kein Defekt |

## 4. Eventnamen

Acht Namen für ausgehende Links nach light-creators.com. Wird nicht erweitert.

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

Die Liste regelt ausschließlich ausgehende Klicks nach light-creators.com. On-Page-Events und die bestehende `threshold_*`-Familie fallen nicht darunter. Bestätigt.

Jeder Link trägt genau eine Eventklasse.

`outbound_light_creators_click` existiert heute neunmal, fünfmal in `index.html`, viermal in `index-en.html`. Es wird vollständig abgelöst und darf danach nicht mehr vorkommen. Trefferzahl vorher und nachher melden.

Auf den 30 Episodenseiten und auf `podcast.html` tragen die Light-Creators-Links heute kein Event. Dort wird erstmals instrumentiert. Das gehört in dieses Paket.

**Mechanik:** Klassennamen, `class="plausible-event-name=…"`. Kein `data-plausible-event`. Der Plausible-Plan ist Growth und enthält **keine** Custom Properties, Sprache und Position stehen im Namen. Keine Properties bauen. Keine personenbezogenen Daten in Eventnamen oder URLs. Die Goals legt David selbst an.

## 5. Merge-Konvention

Direkte Merges auf Produktion sind für chirurgische Änderungen freigegeben, kein PR-Review. Drei Einschränkungen:

1. Ein Commit je Änderung. Änderung 6, 7 und die Generator-Instrumentierung dürfen zusammen, wenn sie dieselbe Quelle betreffen. Die Navigation darf als ein Commit über alle 15 Stellen laufen.
2. Änderung 10 nicht mergen.
3. Kein Publish.

Commit-Botschaften im Muster `nav: Light Creators in alle drei Nav-Varianten`, `nav: Kontakt in den Footer`, `tracking: outbound_light_creators_click durch outbound_lc_* ersetzt`.

## 6. Selbstprüfliste

Ergebnis melden, nicht nur ein Häkchen.

- [ ] Kein Link zeigt auf `https://light-creators.com` ohne Pfad. Trefferzahl melden.
- [ ] Kein Link zeigt auf `https://light-creators.com/en` außer der Markentür in den vier englischen Navigationen. Trefferzahl melden.
- [ ] Jedes genannte Ziel liefert HTTP 200 ohne Redirect-Kette. Mindestens `/`, `/en`, `/founder`, `/founder-en`, `/next-gen`. Falls der Egress-Proxy das blockt: als Prüfaufgabe melden, nicht raten.
- [ ] Alle 44 Seiten mit Site-Navigation tragen den Eintrag `Light Creators` an derselben Position, nach `Threshold`.
- [ ] `Kontakt` und `Contact` stehen in keiner Navigation der Varianten A, B und D mehr und im Footer derselben Seiten. Variante C ist unberührt.
- [ ] `Plätze finanzieren` ist in Variante C unverändert, einschließlich Zieladresse.
- [ ] Die fünf Entity-Seiten sind korrekt geändert, obwohl sie `F&uuml;hren` schreiben. Namentlich prüfen.
- [ ] Keine englische Seite verlinkt auf einen Anker der deutschen Startseite.
- [ ] Auf keiner Einzelseite stehen zwei wortgleiche Links auf dasselbe Ziel. `podcast.html`, `index.html` und eine Episodenseite als Stichprobe.
- [ ] `outbound_light_creators_click` kommt nicht mehr vor.
- [ ] Kein `outbound_lc_*`-Name außerhalb der acht. Volltextsuche über `plausible-event-name=`, gefundene Namen auflisten.
- [ ] Jeder Link trägt genau eine `plausible-event-name`-Klasse.
- [ ] Keine Custom Property im Repository.
- [ ] Keine Änderung an `assets/styles.css`, an Farben, Gradienten oder Layout. `git diff --stat` melden.
- [ ] Keine generierte Ausgabedatei per Hand bearbeitet, Regenerationslauf gefahren.
- [ ] `/sitemap.xml` unverändert.
- [ ] Änderung 10 nicht ausgeführt.
- [ ] Mobile-Sichtprüfung der Navigation, besonders Variante C mit einem Eintrag mehr. Bei Umbruch **nichts am CSS ändern**, melden.

## 7. Was du meldest, statt es zu lösen

- Ob sich Änderung 6 und 7 in einer Generatorquelle mit einer Bedingung ausdrücken lassen.
- Ob `index-en.html` eine Entsprechung zu `index.html:342` hat.
- Ob die Navigation auf Mobile umbricht.
- Jede Stelle, an der der alte Zustand nicht so vorliegt wie beschrieben. Grundlage ist deine eigene Bestandsaufnahme vom 13.09.2026. Abweichung ist eine Meldung, keine Interpretationsaufgabe.
- Alles, was du nicht prüfen konntest. Als Prüfaufgabe hinschreiben, jede Annahme als Annahme markieren.
