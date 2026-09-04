# Phase 2 · Light Creators V3 — Umsetzungsbriefing für den Webflow-Connector

**Empfänger:** Assistent mit Webflow-Connector im Chat
**Gegenstück:** `_briefings/phase2-lightcreators-claude-code.md` (Arbeit im Repository `davidliebnau.com`)
**Stand:** 2. September 2026

> **Wichtig vorab.** Der Webflow-Connector hat keinen Zugriff auf das Repository `davidliebnau.com`. Claude Code hat keinen Zugriff auf Webflow. Alles, was aus dem Repository kommt — Copy, Symbole, Bilder, Analytics-Snippets — trifft über die in Abschnitt 4 benannten Dateien ein. Ohne diese Zulieferungen wird nicht gebaut, sondern nachgefragt.
>
> **Kennzeichnung.** Aussagen über Webflow-Fähigkeiten sind entweder durch die tatsächlich vorhandenen Werkzeuge gedeckt oder mit **⚠ PRÜFPUNKT** markiert. Ein Prüfpunkt wird geprüft, bevor darauf gebaut wird — nicht angenommen.

---

## 1. Bestandsaufnahme, Stand 2. September 2026

Erhoben über den Connector. Der Connector ist verbunden und autorisiert; es ist keine zusätzliche Freigabe nötig.

### Site

| Feld | Wert |
|---|---|
| Name | Light Creators |
| Site-ID | `699de057278d05930e1728ad` |
| Short Name | `light-creators-tribe` |
| Workspace-ID | `645b5350c096d9343b58146c` |
| Domains | `light-creators.com`, `www.light-creators.com` |
| Zuletzt veröffentlicht | 17.08.2026 |
| Startseite | Page-ID `69bbb715cf90663eff881547`, `publishedPath: /` |
| SEO-Title der Startseite heute | „Light Creators Tribe \| Founder Resonance Assessment" |

### Seiten — 34 insgesamt

| Bereich | Seiten (Auswahl mit Pfad) |
|---|---|
| Startseite | `/` |
| Founder-Strecke | `/call`, `/call-en`, `/quiz`, `/quiz-en`, `/quiz-copy`, `/lp2-quiz-admin`, `/quiz-en-admin`, `/en`, `/bewerbung-eingegangen`, `/application-received` |
| Flourishing / Next Gen | `/the-art-and-practice-of-a-flourishing-life`, `…-fur-dich`, `…-fur-eltern`, `/solo` |
| Content | `/podcast`, `/podcast-01`, `/podcast-02`, `/buch`, Blog-Template `/blog` |
| Recht | `/impressum`, `/datenschutz`, `/abgs` |
| Template-Altlast (Iris) | `/old-home`, `/styles`, `/components`, `/basic-layouts`, `/inspired-layouts`, zwei Design-Mode-Seiten (Draft), `/contact-modal`, Testimonials-Template `/testimonials`, `/404`, `/401` |

**Drei Befunde, die den Bau bestimmen.**

1. Die Startseite **ist** heute die Founder-Resonance-Landingpage. Der Umbau nimmt einer laufenden Conversion-Strecke ihren Einstieg. Das ist der Grund für den Guardrail im Change Brief.
2. Die Next-Gen-Welt existiert bereits in drei Varianten. Welche das Ziel des Next-Gen-CTA wird, ist eine Entscheidung, keine Implementierungsfrage — siehe **OD-3**.
3. Es gibt bereits eine `/old-home`. Vor einem weiteren Startseiten-Wechsel muss geklärt sein, ob archiviert oder ersetzt wird.

### CMS

| Collection | ID | Anmerkung |
|---|---|---|
| Blogs | `699de057278d05930e1728cf` | bestehend, unberührt |
| Testimonials | `69e8d186148755d0c0fcbb37` | bestehend, unberührt |

**Eine Tribe-Collection existiert nicht.** Sie wird in Schritt S3 neu angelegt.

### Assets

71 Assets, **null Ordner**, Alt-Texte überwiegend leer. Webflow erzeugt zu Bild-Assets automatisch responsive Varianten — bei einem Stichprobenasset lagen `-p-500`, `-p-800`, `-p-1080`, `-p-1600`, `-p-2000` und `-p-2600` vor. Das deckt die Anforderung „responsive Images" ohne Zusatzarbeit ab.

### Komponenten — 38, aus dem Iris-Template

Für den Bau relevant und wiederverwendbar:

| Komponente | Gruppe | Instanzen | Verwendung in Phase 2 |
|---|---|---|---|
| `Section` | Layout | 22 | Rahmen aller neun Sektionen |
| `Grid Row` / `Grid Column` | Layout | 48 / 89 | Hero-Collage, Zwei Wege, Tribe-Raster |
| `Card` / `Card Body` | Layout | 75 / 59 | Tribe-Karte, Weg-Karte |
| `Image` / `Image Fit` | Content | 23 / 23 | Collagenbilder, Portraits |
| `Heading` | Content | 92 | alle Überschriften |
| `Rich Text` | Content | 92 | Fließtextblöcke |
| `Eyebrow` | Content | 49 | `S1.EYEBROW`, Weg-Labels |
| `Button` | Interactive | 59 | CTAs |
| `Content Wrap` | Layout | 19 | Ausrichtung, DOM-ID, Rolle |
| `Spacer` | Style | 115 | Vertikalrhythmus |
| `Custom Code` | Global | 18 | Analytics-Snippets |
| `Marquee` / `Slider` | Interactive | 3 / 5 | Reserve für Sektion 4 mobil, siehe dort |
| `Theme Toggle` | Global | 7 | **nicht anfassen** — hängt an Custom-Code-Sichtbarkeit |

### Custom Code im Site-Head — kritischer Befund

Im Freeform-Head-Block der Site läuft **ein Meta Pixel** (`fbq('init', …)`, `fbq('track', 'PageView')`) samt `noscript`-Fallback. Es ist **kein Plausible-Skript vorhanden**. Registrierte Scripts sind keine angewendet (`get_site_scripts` liefert 404 „Custom code block not found").

Daraus folgt zweierlei:
- Die Vorgabe „Analytics läuft über Plausible, cookiefrei" ist auf dieser Site **heute nicht erfüllt**. Phase 0 des Master-Briefings führt cookiefreies Analytics und Basis-Eventmessung als umgesetzt; auf dieser Domain trifft das nicht zu. Nach der Phase-0-Regel „nur regressionsbedingt wieder öffnen" ist das genau der Regressionsfall. **Entschieden am 02.09.2026: Plausible wird eingebunden**, siehe Schritt S-P0.
- Es läuft ein cookiesetzender Drittanbieter-Tracker ohne erkennbaren Einwilligungsmechanismus. Das ist eine Rechts- und keine Technikfrage und wird nicht nebenbei entschieden — siehe **OD-1b**. Die Plausible-Einbindung ist davon unabhängig und wartet nicht darauf.

### Werkzeuglage

| Fähigkeit | Status |
|---|---|
| Sites auflisten, Site-Details, Publish | durch Aufruf bestätigt |
| Seiten auflisten, anlegen, duplizieren, Seiteneinstellungen, SEO, Open Graph, JSON-LD | durch Aufruf bestätigt (Lesen); Schreiben im Werkzeug vorhanden |
| Sitemap-Indexierungsstatus je Seite und je CMS-Item | Werkzeug vorhanden |
| CMS: Collections, Felder (statisch, Option, Referenz), Feldgruppen, Items | durch Aufruf bestätigt (Lesen); Schreiben im Werkzeug vorhanden |
| Assets: auflisten, anlegen (presigned S3), Alt-Text, Ordner, Komprimierung nach WebP oder AVIF | durch Aufruf bestätigt (Lesen); Schreiben im Werkzeug vorhanden |
| Komponenten: auflisten, anlegen, duplizieren, Instanzen einfügen, Props, Varianten | durch Aufruf bestätigt (Lesen) |
| Elemente: Baum abfragen, anlegen, verschieben, entfernen, Text, Styles, Links, Bilder, Attribute, Heading-Level, DOM-ID | Werkzeug vorhanden, **⚠ PRÜFPUNKT** ob alle Aktionen auf dieser Site greifen |
| Styles und Variablen anlegen und ändern | Werkzeug vorhanden, **⚠ PRÜFPUNKT** |
| Freeform-Head-/Footer-Code lesen und schreiben, Scripts registrieren und anwenden | Lesen bestätigt, Schreiben **⚠ PRÜFPUNKT** |
| **Collection-List-Filter setzen** (z. B. „nur Items mit `auf-startseite = true`") | **⚠ PRÜFPUNKT** — im Element-Settings-Werkzeug existieren die Werttypen `filter` und `booleanFilter`; ob sie über den Connector schreibbar sind, ist ungeprüft. Fallback: Handarbeit im Designer. |
| **Startseite festlegen** (welche Seite unter `/` liegt) | **⚠ PRÜFPUNKT** — kein Werkzeug dafür gefunden. Bis zum Gegenbeweis: Handarbeit im Designer. |
| **301-Weiterleitungen** | **⚠ PRÜFPUNKT** — nur über das Enterprise-Werkzeug; Plan-Verfügbarkeit ungeprüft. Fallback: Site Settings von Hand. |
| **Interactions, Animationen, `prefers-reduced-motion`** | **kein Werkzeug gefunden.** Bleibt Handarbeit im Designer. |
| **Canonical-URL je Seite überschreiben** | **⚠ PRÜFPUNKT** — im Seiten-Werkzeug nicht als Feld sichtbar. Webflow setzt Canonicals standardmäßig selbst; ein Override erfolgt gegebenenfalls in den Seiteneinstellungen von Hand. |

---

## 2. Change Brief

| Feld | Inhalt |
|---|---|
| **Ziel** | `light-creators.com` wird vom Founder-Resonance-Funnel zum eigenständigen Marken-Hub. Die Startseite soll zuerst Identifikation, Resonanz und Glaubwürdigkeit herstellen und erst danach zur Selbstselektion führen. |
| **Betroffene Journey** | Marke Light Creators, Seite `/`, Funnelstufe Hub. Zielgruppen: Next Gen und Founders gleichgewichtig, verbunden durch den Tribe. |
| **Hypothese** | Wenn die Selbstselektion erst nach Recognition, Resonanz und Glaubwürdigkeit stattfindet statt im ersten Screen, erwarten wir eine höhere Rate bewusster Wegwahlen und weniger Fehlrouting, weil Besucher zuerst verstehen, wofür die Marke steht, bevor sie zwischen zwei Angeboten wählen sollen. |
| **Primäre KPI** | Qualifizierte Wegwahl-Rate: Anteil der Home-Sessions mit mindestens einem Klick auf `light.home.nextgen.click` oder `light.home.founders.click`. |
| **Guardrail-KPIs** | (1) Einstiege in `/quiz` und `/call` dürfen nicht einbrechen. (2) Gleichgewicht der beiden Wege: kein Weg unter 25 % aller Wegwahlklicks, sonst ist die Gleichwertigkeit gestalterisch verletzt. (3) LCP mobil ≤ 2,5 s. (4) Keine neuen 404. (5) Kein Bruch der beiden nackten URLs in Podcast-Episode 28. |
| **Evidenz** | Master-Briefing „Strategische Website-Iteration", Phase 2. Seiten-Briefing „Light Creators Tribe · Website-Update V3". Bestandsaufnahme über den Connector am 02.09.2026 (Abschnitt 1 dieses Dokuments). |
| **Status** | **UNVALIDATED.** Es liegen keine quantitativen Nutzungsdaten vor: Auf `light-creators.com` läuft heute kein cookiefreies Analytics. Es gibt keine Baseline und damit keinen Vorher-Nachher-Vergleich. Die primäre KPI wird ab dem Publish erstmals erhoben. Das ist eine bewusste Einschränkung und wird nicht als INFERRED oder MEASURED umetikettiert. |
| **Vorbedingung · Sprint A** | Sprint A (Phase 1 auf `davidliebnau.com`) ist zum 02.09.2026 **nicht abgeschlossen**. Die Arbeit ist im Repository weitgehend erledigt, aber noch nicht veröffentlicht; der Review liegt bei David. Abschnitt 17 des Master-Briefings stellt Sprint A vor Sprint B. **David hat entschieden, beide Stränge bewusst parallel zu führen:** er prüft und veröffentlicht Phase 1, während Phase 2 vorbereitet und aufgebaut wird. Das ist ein dokumentierter Override der Sprint-Reihenfolge, keine Auslassung. Die Grenze verläuft am Publish: **F6 wird nicht erteilt, solange Phase 1 nicht live ist.** Bis dahin entsteht die neue Startseite ausschließlich als Draft. |
| **Vorbedingung · P0** | Auf `light-creators.com` läuft kein cookiefreies Analytics. Das ist eine Phase-0-Regression und nach Abschnitt 12 des Master-Briefings ein „Now"-Task (verhindert Messbarkeit **und** erzeugt Vertrauensrisiko). Die Plausible-Einbindung läuft als Schritt **S-P0** vor dem Bau, nicht als Teil davon. Ohne sie hat die primäre KPI keinen Vorher-Wert und der in Phase 9 vorgesehene A/B-Test ist nicht fahrbar. |
| **Scope** | **P0-Nacharbeit: Plausible auf `light-creators.com` einbinden und verifizieren.** Neue Startseite mit neun Sektionen, Sektion 5 als Rahmen ohne Personendarstellung (R-G). Asset-Upload und Alt-Texte für Collagenbilder und Symbole. Data-Attribute für die Eventmessung. Seiteneinstellungen der neuen Seite. Navigation und Footer, soweit für die neue Seite nötig. |
| **Nicht im Scope** | `/quiz`, `/call` und die übrige Founder-Strecke. Die Flourishing-Life-Seiten. `/podcast`, `/buch`, die Rechtsseiten. Aufräumen der Iris-Template-Altlasten. **Die Tribe-Collection und die Personendarstellung in Sektion 5 (R-G).** Englische Fassung der neuen Startseite. Die `Testimonials`-Collection. Der Aufbau von Founder Resonance als Conversion-Spoke (Phase 3). Preise, Membership, Threshold, Wegfinder. |
| **Reversibilität** | Hoch bis zum Publish. Die neue Seite entsteht als eigene Seite im Draft-Status; die bestehende Startseite bleibt bis zum Tausch unverändert live. Rücknahme vor dem Tausch = neue Seite auf Draft lassen. Rücknahme nach dem Tausch = Startseiten-Zuweisung zurückdrehen, Aufwand wenige Minuten im Designer. Nicht automatisch reversibel sind Änderungen am Site-Head-Code; deshalb wird der bestehende Inhalt vor jeder Änderung wörtlich gesichert und im Chat protokolliert. |
| **QA** | Siehe Abschnitt 8. Umfasst Funktion, Mobile, Accessibility, Analytics, SEO und die Freigabeprüfung für alle Personendarstellungen. |

---

## 2a. Entscheidungsstand vom 2. September 2026

Diese Punkte sind entschieden und werden nicht erneut als offen behandelt.

| Regel | Entscheidung | Quelle |
|---|---|---|
| **R-A** | **Plausible wird auf `light-creators.com` eingebunden.** Ziel ist ein System über beide Domains, damit der Überblick nicht an der Domaingrenze abreißt. Vorgezogen als Schritt S-P0. | David, 02.09.2026 |
| **R-B** | **Die heutige Startseite wird nicht in den Hub übernommen.** Der Founder-Inhalt zieht unverändert auf einen eigenen Pfad um und bleibt dort als Interim live, bis Sprint C ihn ersetzt. Er wird weder gelöscht noch blockweise in die neue Startseite migriert. | Master-Briefing, Phase 3 („Migration ist Bestandteil dieses Rebuilds. Nicht alte Blöcke ungeprüft übertragen.") und Abschnitt 12, Backlog-Regel „Now" |
| **R-C** | **Phase 1 und Phase 2 laufen parallel.** Phase-1-Review und Publish liegen bei David; Phase-2-Vorbereitung und Bau laufen währenddessen. Dokumentierter Override der Sprint-Reihenfolge aus Abschnitt 17. | David, 02.09.2026 |
| **R-D** | **Kein Publish der neuen Startseite, solange Phase 1 nicht live ist.** Der Bau läuft im Draft; F6 hängt an Phase 1. | Folge aus R-C |
| **R-F** | **Plausible-Tarif Growth.** Growth unterstützt keine Custom Properties. Die Unterscheidung zwischen Sektion 6 und Sektion 9 wandert deshalb in den Eventnamen. Es gibt keine `data-plausible-prop-*`-Attribute. | David, 02.09.2026 |
| **R-G** | **Die Tribe-Sektion und ihr CMS werden in einem separaten Paket gebaut.** David liefert die Bausteine nach. In Phase 2 entsteht Sektion 5 nur als Rahmen: Überschrift, Intro-Copy, Sektions-ID, Scroll-Event und der freigehaltene Platz für die Personendarstellung. Collection, Felder, Items und Bindung sind **nicht** Teil dieses Briefings. Das Datenmodell in Abschnitt 6 bleibt als Zielbild stehen, ist aber kein Bauauftrag. | David, 02.09.2026 |

Offen bleibt aus dem früheren OD-2 nur noch der **Interim-Pfad** der alten Startseite und die Frage, ob er indexiert bleibt. Das ist als **OD-2b** geführt und kein Freigabepunkt mehr.

---

## 2b. Arbeitspaket S-P0 · Plausible einbinden

Läuft **vor** dem Bau und unabhängig von jeder Copy- oder Bildzulieferung. Es ist der einzige Schritt in diesem Briefing, der eine bestehende, live veröffentlichte Site verändert — entsprechend vorsichtig.

**Schritte.**

1. **Bestand sichern.** `get_site_freeform_code` für `head` aufrufen und den vollständigen aktuellen Inhalt wörtlich im Chat protokollieren. Ohne dieses Protokoll wird nichts geschrieben. Der Meta-Pixel-Block bleibt in diesem Schritt **unangetastet** — er ist Gegenstand von OD-1b.
2. **Plausible-Snippet ergänzen.** Das bestehende Head-Code-Feld wird mit `set_site_freeform_code` neu geschrieben: bisheriger Inhalt unverändert plus das Plausible-Tag. `set_site_freeform_code` ersetzt den gesamten Block — der gesicherte Bestand muss also wortgleich mit übergeben werden. **⚠ PRÜFPUNKT:** Ob das Schreiben über den Connector greift, ist ungeprüft; bei Fehlschlag erfolgt die Einbindung von Hand in den Site Settings.

   Das Snippet ist am 02.09.2026 aus dem Plausible-Dashboard erfasst worden. **Es enthält kein `data-domain`-Attribut** — Plausible verwendet inzwischen eine site-spezifische Script-URL. Wortlaut:

   ```html
   <script async src="https://plausible.io/js/pa-WXbJzpRzoMDT8W-LykjGx.js"></script>
   <script>
     window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
     plausible.init()
   </script>
   ```

   Die Script-URL ist site-gebunden und gilt ausschließlich für `light-creators.com`. Vor dem Einsetzen im Dashboard gegenprüfen, ob sie unverändert ist.
3. **Zählweise festlegen.** Die Site führt DE- und EN-Inhalte als getrennte Seiten unter derselben Domain. Für Plausible ist das eine Site; sie ist am 02.09.2026 angelegt worden. Cross-Domain-Vergleich mit `davidliebnau.com` läuft nicht über eine technische Verknüpfung, sondern über das gemeinsame Eventschema: Das Präfix `david.` beziehungsweise `light.` trägt die Domainzuordnung bereits im Eventnamen. Abschnitt 6.2 des Master-Briefings verlangt ausdrücklich, Cross-Domain-Tracking sauber zu prüfen — das ist der Prüfpunkt, nicht ein anzunehmendes Feature.
4. **Verifizieren.** Site publizieren, eine Seite aufrufen, Eintreffen im Plausible-Dashboard bestätigen, Datum als Baseline notieren.
5. **Baseline aufnehmen.** Ab diesem Tag laufen die Guardrail-Kennzahlen: Einstiege in `/quiz` und `/call`, Seitenaufrufe der Startseite. Je länger S-P0 vor dem Publish der neuen Startseite liegt, desto belastbarer ist der Vorher-Wert. Das ist ein Argument dafür, S-P0 sofort zu machen und nicht mit dem Bau zu bündeln.

**Was S-P0 nicht tut.** Es entfernt den Meta Pixel nicht, es baut keinen Consent-Layer und es fasst keine Seite inhaltlich an.

---

## 3. Zuständigkeits-Split

Jede Aufgabe steht in genau einer Spalte.

| Claude Code (Repository `davidliebnau.com`) | Webflow-Connector (dieses Briefing) | Handarbeit im Webflow-Designer |
|---|---|---|
| Copy-Datei mit Provenance und String-IDs erzeugen | Bestandsaufnahme dokumentieren und aktuell halten | Festlegen, welche Seite die Startseite ist |
| Symbol-Set der vier schöpferischen Dialoge exportieren und dokumentieren | Seite anlegen, Seiteneinstellungen, SEO, Open Graph, JSON-LD, Sitemap-Flag | Interactions und Animationen inklusive Reduced-Motion-Variante |
| Bilder aufbereiten (WebP/AVIF, Zuschnitte) und Manifest schreiben | Tribe-CMS-Collection und alle Felder anlegen, Items pflegen, Draft-Gate verwalten | Feinsatz der Hero-Collage: Zuschnitte, Überlappungen, optische Balance |
| Analytics-Spezifikation und die beiden JS-Snippets schreiben | Elemente, Struktur, Styles und Komponenten der neun Sektionen bauen | Visueller Abnahmedurchgang Desktop und Mobil |
| Alt-Text-Entwürfe vorbereiten | Assets hochladen, Ordner anlegen, Alt-Texte setzen, zu WebP/AVIF komprimieren | 301-Weiterleitungen, falls kein API-Weg verfügbar (⚠ Prüfpunkt) |
| Ausgehende Links nach `light-creators.com` prüfen und berichten | Data-Attribute für die Eventmessung setzen | Umsetzung der Meta-Pixel-Entscheidung und einer eventuellen Consent-Lösung |
| Founder-Material in `_archiv/` inventarisieren | Head-Code lesen, sichern und nach Freigabe schreiben | Veröffentlichung auf die Produktionsdomains |
| Übergabepaket und Übergabeprotokoll | Prüfläufe: H1-Anzahl, Heading-Struktur, Alt-Texte, Linkziele, Events | Font-Einbindung, falls neue Webfonts hinzukommen |

---

## 4. Schnittstellen zum Repository-Strang

| # | Übergabe | Datei / Format | Wann verfügbar | Was hier damit passiert |
|---|---|---|---|---|
| **I-1** | Copy mit String-IDs | `copy-lightcreators-home.md` — pro String eine ID, ein Provenance-Tag, ein Text | nach **F2** | Texte werden über `set_text` gegen die String-IDs gesetzt; die ID wird als Element-Anzeigename im Navigator hinterlegt |
| **I-2** | Symbol-Set | Ordner `symbole/` — vier SVG, vier PNG @2x, `symbole-README.md` mit Farbwerten | nach **F2** | Upload als Assets, Alt-Text leer (dekorativ) |
| **I-3** | Bildpaket | Ordner `bilder/` — WebP und AVIF in definierten Größen, `bild-manifest.csv` | nach **F4** | Upload, Ordner anlegen, Alt-Texte aus dem Manifest übernehmen |
| **I-4** | Analytics | `analytics-lightcreators-home.md`, `snippets/plausible-events.js`, `snippets/plausible-scroll.js` | nach **F2** | Data-Attribute setzen; Event-Snippets in den Head (Plausible-Tag steht bereits aus S-P0) |
| **I-5** | Linkbericht | `linkreport-lightcreators.md` | vor **F1** | fließt in die Redirect-Liste ein |

**Rückrichtung.** Nach dem Publish werden die finalen URLs der beiden Wege und des Tribe-Pfads sowie eventuelle Pfadänderungen an den Repository-Strang zurückgemeldet. Erst danach entsteht dort ein eventueller Korrektur-Commit.

---

## 5. Bauplan Sektion für Sektion

**Globale Regeln, die für alle neun Sektionen gelten.**

- Genau **ein H1** auf der Seite: `S1.H1`. Alle Sektionen 2 bis 9 tragen genau ein H2. Untergliederungen sind H3. Kein Heading-Level wird zu Gestaltungszwecken übersprungen.
- Jede Sektion bekommt eine sprechende DOM-ID (`hero`, `recognition`, `big-idea`, `dialoge`, `tribe`, `zwei-wege`, `marke`, `manifest`, `einladung`) und wird über `set_dom_id` gesetzt.
- Sektionen tragen `tag: section`. Der Sektionskopf ist ein Heading-Element, kein gestylter Textblock.
- Kontrastregel: Fließtext mindestens 4,5:1, große Schrift und Bedienelemente mindestens 3:1. Text liegt nie direkt auf einem Foto ohne Abdunklung oder Farbfläche.
- Fokus-Regel: Jedes fokussierbare Element hat einen sichtbaren Fokusring mit mindestens 3:1 Kontrast zum Hintergrund. `outline: none` wird nirgends gesetzt, auch nicht in einer Komponente aus dem Iris-Template — beim Bau prüfen und gegebenenfalls überschreiben.
- Bilder unterhalb des ersten Bildschirms bekommen `loading="lazy"`; die ersten Collagenbilder bekommen `loading="eager"` und `fetchpriority="high"`.
- Animationen sind optional. Wo sie eingesetzt werden, muss im Designer eine Reduced-Motion-Variante existieren. Wo das nicht sichergestellt ist, wird nicht animiert.

---

### Sektion 1 · Hero — DOM-ID `hero`

| | |
|---|---|
| **Psychologischer Job** | Identifikation. Nicht Erklärung, nicht Verkauf. |
| **Copy-Quelle** | V3 §4 · **HIS/EXISTING** |
| **Struktur** | `Section` › `Content Wrap` › links Textspalte, rechts Collage. Textspalte: `Eyebrow` (`S1.EYEBROW`, kein Heading-Tag) › `Heading` Level 1 (`S1.H1`, zweizeilig mit `<br>`) › `Rich Text` (`S1.LEAD1`, `S1.LEAD2`) › optionale Orientierungszeile (`S1.ORIENT`) › `Button` (`S1.CTA`, Sprungziel `#recognition`). Collage: `Grid Row` mit 4 bis 6 `Image`-Instanzen in versetztem Raster. |
| **CMS-Bedarf** | keiner |
| **Analytics** | `light.home.hero.click` am CTA. Attribut `data-plausible-event="light.home.hero.click"`. |
| **Mobile-Regel** | Collage auf **drei** Bilder reduzieren, zweispaltig, feste Seitenverhältnisse, keine Überlappungen. Der Hero endet unter einer Bildschirmhöhe, damit `S1.CTA` ohne Scrollen erreichbar ist. Reduktion über Sichtbarkeit einzelner Bilder am `small`-Breakpoint, nicht über ein zweites Bildset. |
| **Done when** | Genau ein H1 auf der Seite. Vier bis sechs Bilder auf Desktop, drei auf Mobil. David auf höchstens zwei Bildern. Kein Bild wirkt als dominantes Gruppenfoto. Keine konkurrierenden Next-Gen- und Founders-Buttons im ersten Screen. |

**Copy.**
- `S1.EYEBROW` — LIGHT CREATORS TRIBE
- `S1.H1` — Finde, was nur du bist. / Und bring es in die Welt.
- `S1.LEAD1` — Es gibt etwas in jedem Menschen, das sich nicht kopieren lässt. Eine eigene Art zu sehen, zu fühlen, zu denken, Beziehungen zu gestalten und Dinge zu erschaffen.
- `S1.LEAD2` — Light Creators ist eine Einladung, dem Eigenen näherzukommen – und daraus etwas in die Welt zu bringen.
- `S1.ORIENT` — Für Menschen, die ihren Weg suchen. Und für Menschen, die bereits etwas Eigenes aufbauen.
- `S1.CTA` — Die Idee entdecken ↓

**Bildwelt-Regeln aus V3 §5 und §6, die beim Einsetzen gelten.** Motivmischung: zwei oder drei Menschen im Gespräch, kleine Gruppe im Austausch, Mensch in Natur oder Übergang, kreativer oder unternehmerischer Arbeitsmoment, Begegnung, ein Dialogbild mit David. Ausgeschlossen: „Happy diverse team"-Stockästhetik, für die Kamera lachende Teams, Meetingraum- und Post-it-Klischees, High Five, überinszenierte Retreat-Szenen, pseudo-spirituelle Bildsprache, Lagerfeuerromantik, Purpose-Ästhetik. Keine KI-Montage von David in Szenen, an denen er nicht war. Keine ungeklärten Gruppenbilder aus früheren Veranstaltungen.

---

### Sektion 2 · Recognition — DOM-ID `recognition`

| | |
|---|---|
| **Psychologischer Job** | Selbsterkennung. Der Besucher erkennt seine Situation, bevor eigene Begriffe eingeführt werden. |
| **Copy-Quelle** | V3 §8 · **HIS/EXISTING** |
| **Struktur** | `Section` › `Content Wrap` › `Heading` L2 (`S2.H2`) › `Rich Text` Block A (`S2.P1`–`S2.P6`, `S2.P3` hervorgehoben) › `Heading` L3 (`S2.H3A`) › `Rich Text` Block B (`S2.P7`–`S2.P9`) › Liste `ul` mit vier `li` (`S2.Q1`–`S2.Q4`) › `Rich Text` Abschluss (`S2.P10`, `S2.P11`). Einspaltig, schmales Textmaß, editorial. Keine Karten, keine Icons. |
| **CMS-Bedarf** | keiner |
| **Analytics** | `data-reach-event="light.home.recognition.reach"` an der Sektion |
| **Mobile-Regel** | Vier Fragen als kompakte Liste, nicht als vier Vollbild-Blöcke. Sektion höchstens zwei Bildschirmhöhen. |
| **Done when** | Der Text beschreibt die Situation des Besuchers, bevor irgendein Light-Creators-Begriff fällt. Die vier Fragen sind semantisch eine Liste. Kein CTA in dieser Sektion. |

**Copy.** `S2.H2` Vielleicht kennst du diesen Moment. — `S2.P1` Du funktionierst. Du gehst einen Weg. Vielleicht sogar einen ziemlich erfolgreichen. — `S2.P2` Und trotzdem taucht irgendwann eine Frage auf: — `S2.P3` Was davon ist eigentlich wirklich meins? — `S2.P4` Vielleicht stehen dir so viele Möglichkeiten offen, dass keine davon wirklich nach dir klingt. — `S2.P5` Vielleicht hast du längst etwas aufgebaut – und merkst, dass Erfolg allein die nächsten Fragen nicht beantwortet. — `S2.P6` Vielleicht weißt du nur: So wie bisher soll es nicht einfach weitergehen. — `S2.H3A` Wir leben in einer Welt voller Antworten. — `S2.P7` Karrierewege. Meinungen. Vorbilder. Erfolgsmodelle. Content. Und zunehmend Antworten, die Maschinen in Sekunden für uns erzeugen können. — `S2.P8` Umso wertvoller wird etwas, das niemand für uns erzeugen kann: — `S2.P9` die eigene Wahrnehmung. — `S2.Q1` Wer bin ich? — `S2.Q2` Was erfüllt mich mit Schaffensfreude? — `S2.Q3` Wofür will ich einen Beitrag leisten? — `S2.Q4` Was ist mein nächster eigener Schritt? — `S2.P10` Ein Light Creator wartet nicht auf den perfekten Lebensplan. Er macht Erfahrungen. Beobachtet. Lauscht. Lernt. Verwirft. Beginnt neu. — `S2.P11` So wird aus Suchen Finden. Und aus Finden Gestaltung.

---

### Sektion 3 · Big Idea — DOM-ID `big-idea`

| | |
|---|---|
| **Psychologischer Job** | Resonanz. Emotionaler Höhepunkt. |
| **Copy-Quelle** | V3 §9 · **HIS/EXISTING** |
| **Struktur** | `Section` mit ruhigem, großzügigem Satz. `Heading` L2 (`S3.H2`) sehr groß › `Rich Text` (`S3.P1`–`S3.P3`) › `Heading` L3 (`S3.H3A`) › `Rich Text` (`S3.P4`–`S3.P6`) › Liste mit drei `li` (`S3.Q1`–`S3.Q3`) › `Rich Text` (`S3.P7`, `S3.P8`). Kein Bild. Die Sektion trägt durch Typografie und Weißraum. |
| **CMS-Bedarf** | keiner |
| **Analytics** | `data-reach-event="light.home.bigidea.reach"` |
| **Mobile-Regel** | Schriftgrad der H2 skaliert deutlich herunter, damit sie nicht über vier Zeilen bricht. Sektion höchstens zwei Bildschirmhöhen. |
| **Done when** | Die Sektion wiederholt nicht die Recognition, sondern hebt sie an. Kein CTA. Kein Bild, das den Text visuell verdrängt. |

**Copy.** `S3.H2` Du musst nichts beweisen, um etwas zu erschaffen. — `S3.P1` In dir gibt es eine Weite, eine Stille und schöpferische Intelligenz, die bereits da ist. — `S3.P2` Dein Wert beginnt nicht mit deinem nächsten Erfolg. Du musst dich nicht erst optimieren, bis du irgendwann gut genug bist, etwas Bedeutendes zu tun. — `S3.P3` Schöpferkraft braucht keinen inneren Mangel als Treibstoff. — `S3.H3A` Das heißt nicht, weniger zu wollen. — `S3.P4` Wir wollen Ideen verwirklichen. Unternehmen aufbauen. Wohlstand schaffen. Technologie nutzen. Menschen erreichen. Wirkung entfalten. — `S3.P5` Uns interessiert nur eine zweite Frage genauso sehr: — `S3.P6` Was entsteht dabei – in uns, zwischen uns und durch uns? — `S3.Q1` Welche Menschen werden dadurch stärker? — `S3.Q2` Welche Beziehungen entstehen? — `S3.Q3` Welche Zukunft wird wahrscheinlicher? — `S3.P7` Erfolg und Verbundenheit sind für uns keine Gegensätze. — `S3.P8` Vielleicht beginnt eine andere Art zu gestalten genau dort: nicht aus dem Gefühl, noch nicht genug zu sein – sondern aus Freude, Neugier, Liebe und Lust am Erschaffen.

---

### Sektion 4 · Schöpferische Dialoge — DOM-ID `dialoge`

| | |
|---|---|
| **Psychologischer Job** | Mechanismus. Erst hier wird die eigene Methodensprache eingeführt. |
| **Copy-Quelle** | V3 §10 · **HIS/EXISTING** |
| **Struktur** | `Section` › `Heading` L2 (`S4.H2`) › `Rich Text` (`S4.P1`) › vier Schritte. Jeder Schritt: Nummer-Label, Symbol (`Image`, dekorativ), `Heading` L3, ein Satz. **Ausdrücklich keine vier klassischen Feature-Karten** — V3 §10 verlangt eine Bewegung. Umsetzung: eine durchlaufende horizontale Linie oder ein Verlauf, an dem die vier Schritte sitzen, ohne Kartenrahmen und ohne Schatten. |
| **CMS-Bedarf** | keiner |
| **Assets** | Vier Symbole aus **I-2**. Goldverlauf `#FFDB9D` → `#A87D34` (aus `03-erkennen.svg`) als Farbvariable anlegen, damit Linie und Symbole zusammenhängen. |
| **Analytics** | keines |
| **Mobile-Regel** | **Höchstens zwei Bildschirmhöhen.** Die vier Schritte werden auf Mobil zu einer kompakten vertikalen Reihe mit kleinem Symbol links und Text rechts — nicht zu vier bildschirmfüllenden Blöcken. Alternative: horizontaler `Slider`; dann muss er per Tastatur bedienbar sein und darf nicht automatisch laufen. |
| **Done when** | Die vier Schritte wirken als eine Bewegung, nicht als Feature-Liste. Symbole sind `alt=""`. Die Sektion erklärt den Mechanismus erst, nachdem Recognition und Big Idea gelaufen sind. |

**Copy.** `S4.H2` Schöpferkraft beginnt mit Verbindung. — `S4.P1` Das Eigene entsteht nicht durch noch mehr Input. Oft braucht es zuerst Raum. Dann Beziehung. Dann Wahrnehmung. Und schließlich den Mut, aus dem Erkannten etwas zu machen. — **01 LOSLASSEN** Raum schaffen. Nicht sofort wissen müssen. — **02 VERBINDEN** Mit dir selbst, anderen Menschen und dem Leben in Beziehung kommen. — **03 ERKENNEN** Wahrnehmen, was wirklich deins ist – und was entstehen will. — **04 GESTALTEN** Erkenntnis in Erfahrungen, Entscheidungen und konkrete Schritte übersetzen.

---

### Sektion 5 · Der reale Tribe — DOM-ID `tribe`

| | |
|---|---|
| **Psychologischer Job** | Glaubwürdigkeit und Zugehörigkeit. Die Idee wird durch reale Menschen konkret. |
| **Copy-Quelle** | V3 §11 · **HIS/EXISTING**; alle Personendaten **Zulieferung David** |
| **Struktur** | **In dieser Phase nur der Rahmen (R-G):** `Section` › `Heading` L2 (`S5.H2`) › `Rich Text` Intro (`S5.P1`–`S5.P4`) › leerer Container mit DOM-ID `tribe-liste`. Der Container bekommt die vorgesehene Rasterbreite und den Vertikalabstand, damit die Sektion später ohne Layoutumbau gefüllt werden kann. **Nichts davon wird mit Beispielinhalt bestückt.**<br><br>*Zielbild für das separate Tribe-Paket, hier nur zur Orientierung:* `CMSCollection` über die Tribe-Collection, gefiltert auf `auf-startseite = true`, sortiert nach `sortierung`, Limit 12; Item-Template als `Card` mit Portrait (1:1), Name als H3, Rolle · Organisation, Stimme A, Label `S5.LABEL.B` plus Stimme B, externer `TextLink`. |
| **CMS-Bedarf** | **Keiner in dieser Phase (R-G).** Die Collection entsteht im separaten Tribe-Paket. Hier wird nur der Platz freigehalten: ein leerer Container mit der DOM-ID `tribe-liste` und dem Kommentar, dass die Personendarstellung nachgeliefert wird. |
| **Analytics** | Sektion: `data-reach-event="light.home.tribe.reach"` — wird in dieser Phase gesetzt, weil die Sektion als Rahmen existiert. Die Messung der externen Portrait-Links läuft später über das eingebaute Plausible-Goal „Outbound Link: Click"; jede Person hat eine eigene Ziel-URL, daraus ergibt sich die Aufschlüsselung. **⚠ PRÜFPUNKT:** ob dieses eingebaute Goal die URL-Aufschlüsselung auch auf dem Growth-Tarif zeigt — Plausible führt sie intern ebenfalls als Property. Gehört ins Tribe-Paket, nicht hierher. |
| **Mobile-Regel** | Sechs bis acht Karten gestapelt, Portrait 1:1 bei etwa 40 % Breite neben dem Text oder darüber. Zitate werden **nicht** gekürzt und nicht hinter „mehr lesen" versteckt — die Stimme ist der Punkt der Sektion. Stattdessen Schriftgrad und Zeilenabstand anpassen. Zielwert: die Sektion bleibt mobil unter fünf Bildschirmhöhen. |
| **Done when (diese Phase)** | Überschrift, Intro und ein leerer, korrekt bemessener Container stehen. Das Scroll-Event feuert. Kein Platzhalterinhalt, kein Beispielportrait, kein „coming soon"-Text. |
| **Done when (Tribe-Paket, später)** | Sechs bis acht reale Personen, höchstens zwölf. Jede mit Portrait, Vor- und Nachname, Rolle, Organisation oder Projekt und mindestens einer persönlichen Stimme. Kuratierte Mischung aus Frage A und Frage B. Keine Person ohne vollständig dokumentierte Freigabe live. Keine anonymen Gesichter, keine Mitgliederzahl. |

**Copy.** `S5.H2` Menschen, mit denen Zukunft entsteht. — `S5.P1` Große Dinge entstehen selten allein. — `S5.P2` Light Creators lebt in Beziehungen zwischen Menschen, die unterschiedlich sehen, denken und gestalten – und sich gerade dadurch ermöglichen, etwas Neues zu erkennen und in die Welt zu bringen. — `S5.P3` Ein kuratierter Kreis von Menschen begleitet, prägt und verkörpert diese Idee bereits heute. — `S5.P4` Und vielleicht magst auch du in den Kreis kommen? — `S5.LABEL.B` Was mich mit Light Creators verbindet: — `S5.LINK` Muster: `<Vorname>s Arbeit entdecken ↗`

> **Achtung bei `S5.P4`.** Die Zeile lädt zur Mitgliedschaft ein, ohne dass ein Weg dahinter definiert ist. Solange **OD-11** offen ist, führt die Zeile ins Leere. Vor dem Publish entweder einen Pfad hinterlegen oder die Zeile entfernen — nicht stillschweigend live nehmen.

> **Nicht übernehmen.** Das Beispiel „Anna Mustermann" aus V3 §11 ist ein Formatbeispiel. Es darf in keinem CMS-Item, keiner Vorschau und keinem Export erscheinen.

> **Rollen-Regel aus V3 §11.** Personen werden nicht als Kunde, Freund, Mentor oder Kooperationspartner gekennzeichnet. Auf der Startseite zählt: Wer ist dieser Mensch, was bringt er oder sie in die Welt, was verbindet ihn oder sie mit der Idee.

---

### Sektion 6 · Zwei Wege — DOM-ID `zwei-wege`

| | |
|---|---|
| **Psychologischer Job** | Selbstselektion. Erst hier. |
| **Copy-Quelle** | V3 §12 · **HIS/EXISTING**; CTA-Ziele **OPEN**, siehe OD-3 und OD-4 |
| **Struktur** | `Section` › `Heading` L2 (`S6.H2`) › `Rich Text` (`S6.P1`, `S6.P2`) › `Grid Row` mit zwei gleich breiten `Grid Column`. Jede Spalte identisch aufgebaut: `Eyebrow` › `Heading` L3 › `Rich Text` › Schlagwortzeile › `Button`. **Gleichwertigkeit ist eine Bauvorgabe, keine Geschmacksfrage:** identische Spaltenbreite, identische Kartenhöhe, identische Button-Variante, identischer Schriftgrad, gleiche Anzahl Absätze im Sichtbereich. Kein Weg bekommt ein Bild, das der andere nicht hat. Kein Weg bekommt eine Auszeichnung wie „beliebt" oder eine stärkere Farbfläche. |
| **CMS-Bedarf** | keiner |
| **Analytics** | Sektion: `data-reach-event="light.home.zweiwege.reach"`. Next-Gen-Button: `data-plausible-event="light.home.nextgen.click"`. Founders-Button: `data-plausible-event="light.home.founders.click"`. Keine Property-Attribute (R-F). |
| **Mobile-Regel** | Gestapelt. Beide Karten mit identischer Struktur und identischer Höhe (gleiche Mindesthöhe setzen, nicht der Inhalt entscheiden lassen). Die Reihenfolge ist eine bewusste Entscheidung, siehe **OD-8** — es gibt keine neutrale Stapelreihenfolge. Sektion höchstens drei Bildschirmhöhen. |
| **Done when** | Beide Wege sind visuell und gewichtungsmäßig gleichwertig. Der Tribe erscheint hier **nicht** als dritter Zielgruppen-Button. Beide CTAs führen auf reale, existierende Ziele. |

**Copy.** `S6.H2` Wo stehst du gerade? — `S6.P1` Light Creators verbindet nicht Menschen, weil sie im selben Alter sind oder dasselbe tun. — `S6.P2` Sondern weil sie vor derselben schöpferischen Aufgabe stehen – an unterschiedlichen Punkten ihres Weges.

**Weg 1 · Next Gen.** `S6.NG.EYEBROW` ICH SUCHE, WAS MEINS IST — `S6.NG.H3` Vom Suchen zum Finden. — `S6.NG.P1` Vielleicht stehen dir viele Wege offen – aber keiner fühlt sich wirklich nach deinem an. — `S6.NG.P2` Vielleicht bist du zwischen Schule, Studium, Beruf oder einer nächsten Entscheidung. — `S6.NG.P3` Du musst heute nicht wissen, wie dein ganzes Leben aussehen soll. — `S6.NG.P4` Aber du kannst anfangen herauszufinden, was wirklich deins ist – und den nächsten Schritt erleben statt nur über ihn nachzudenken. — `S6.NG.TAGS` Orientierung · eigene Stärken · Erfahrungen · Übergänge · Mut · nächste Schritte — `S6.NG.CTA` Die Next-Gen-Welt entdecken →

**Weg 2 · Founders.** `S6.FO.EYEBROW` ICH BRINGE BEREITS ETWAS IN DIE WELT — `S6.FO.H3` Vom Founder zum bewussten Unternehmer. — `S6.FO.P1` Du hast bereits angefangen. — `S6.FO.P2` Eine Idee wurde ein Unternehmen. Entscheidungen betreffen plötzlich nicht mehr nur dich. Menschen, Geld, Verantwortung und Wachstum kommen hinzu. — `S6.FO.P3` Und irgendwann reicht die Frage „Wie bekomme ich das größer?" nicht mehr. — `S6.FO.P4` Es entsteht eine zweite: — `S6.FO.P5` Wie will ich das führen, was ich geschaffen habe – ohne mich selbst darin zu verlieren? — `S6.FO.TAGS` Führung · Beziehung · Klarheit · Geld · Einfluss · Verantwortung · Wachstum — `S6.FO.CTA` Founder Resonance entdecken →

---

### Sektion 7 · LIGHT · CREATORS · TRIBE — DOM-ID `marke`

| | |
|---|---|
| **Psychologischer Job** | Markenprägung. Visueller Payoff, wenig Erklärung. |
| **Copy-Quelle** | V3 §13 · **HIS/EXISTING**; die Sektionsüberschrift ist **NEW · FREIGABE OFFEN** |
| **Struktur** | `Section` › H2 (siehe unten) › drei aufeinanderfolgende Blöcke, jeder mit `Heading` L3 im ganz großen Schriftgrad und einem Satz darunter. **Keine kleinen Feature-Karten** — V3 §13 verlangt eine Wirkung wie drei Magazin-Doppelseiten. |
| **CMS-Bedarf** | keiner |
| **Analytics** | keines |
| **Mobile-Regel** | Drei Blöcke, jeder höchstens eine Bildschirmhöhe. Der Wortschriftgrad skaliert mit, bricht aber nie um — LIGHT, CREATORS und TRIBE bleiben je einzeilig. |
| **Done when** | Der Name der Marke ist danach verstanden. Die Sektion wiederholt nicht den Manifest-Inhalt. Genau ein H2 vorhanden, auch wenn es visuell versteckt ist. |

**Copy.** **LIGHT** — weil etwas in uns sichtbar werden kann, das vorher noch keine Form hatte. **CREATORS** — weil wir unser Leben und unsere Welt nicht nur konsumieren, sondern mitgestalten. **TRIBE** — weil etwas zwischen Menschen entstehen kann, das keiner allein hervorgebracht hätte.

**Zur H2.** V3 §13 formuliert keine Sektionsüberschrift. Zwei zulässige Wege, beide erhalten die Heading-Struktur: entweder die drei Wörter „LIGHT · CREATORS · TRIBE" stehen als sichtbares H2 über den Blöcken, oder ein visuell verstecktes H2 mit demselben Wortlaut trägt die Struktur, während die drei Wörter als Gestaltungselemente wirken. Die Entscheidung gehört zu **OD-10**. Bis dahin die versteckte Variante bauen — sie ist die risikoärmere, weil sie die Gestaltung offenlässt und die Struktur trotzdem korrekt ist.

---

### Sektion 8 · Manifest — DOM-ID `manifest`

| | |
|---|---|
| **Psychologischer Job** | Commitment. |
| **Copy-Quelle** | V3 §14 · **HIS/EXISTING** |
| **Struktur** | `Section` › `Heading` L2 (`S8.H2`) › acht Zeilen als eine `Rich Text`-Einheit, keine Karten, keine Icons, keine Nummerierung. `S8.L1` und `S8.L8` typografisch hervorgehoben. Der Rhythmus „Wir glauben … / Wir wollen …" bleibt erhalten und wird nicht in zwei Spalten aufgebrochen. |
| **CMS-Bedarf** | keiner |
| **Analytics** | keines |
| **Mobile-Regel** | Eine durchlaufende Sektion, kein Karussell, keine Akkordeons. Höchstens zwei Bildschirmhöhen. |
| **Done when** | Das Manifest erzählt nicht die ganze Seite noch einmal, sondern verdichtet. Kein CTA. |

**Copy.** `S8.H2` Wofür wir antreten — `S8.L1` Wir glauben, dass in jedem Menschen etwas liegt, das sich nicht kopieren lässt. — `S8.L2` Wir wollen still genug werden, um es wahrzunehmen. — `S8.L3` Wir glauben, dass Klarheit nicht immer durch mehr Denken entsteht, sondern auch durch Erfahrung. — `S8.L4` Wir wollen nicht nur konsumieren, was andere geschaffen haben, sondern selbst Wirklichkeit entstehen lassen. — `S8.L5` Wir glauben, dass Erfolg und Menschlichkeit keine Gegensätze sind. — `S8.L6` Wir wollen Unternehmen, Projekte und Beziehungen schaffen, die Leben ermöglichen statt verbrauchen. — `S8.L7` Wir glauben, dass große Dinge selten allein entstehen. — `S8.L8` Und wir wollen unsere Schöpferkraft nicht dafür verwenden, ausgetretenen Pfaden besser zu folgen – sondern das in die Welt bringen, was nur durch uns entstehen kann.

---

### Sektion 9 · Finale Einladung — DOM-ID `einladung`

| | |
|---|---|
| **Psychologischer Job** | Action. |
| **Copy-Quelle** | V3 §15 · **HIS/EXISTING**; drittes CTA-Ziel **OPEN**, siehe OD-5 |
| **Struktur** | `Section` › `Heading` L2 (`S9.H2`) › `Rich Text` (`S9.P1`–`S9.P4`) › drei Links untereinander oder in einer Reihe. Die ersten beiden Links sind gleichwertig gestaltet und führen auf dieselben Ziele wie in Sektion 6. Der dritte Link — Tribe — ist bewusst **sekundär** gestaltet: kleinerer Schriftgrad oder Textlink statt Button. Er ist der verbindende Community-Pfad, nicht ein dritter Zielgruppen-Button. |
| **CMS-Bedarf** | keiner |
| **Analytics** | Eigene Eventnamen statt Properties (R-F): `light.home.nextgenfinale.click`, `light.home.foundersfinale.click`, `light.home.tribe.click`. Der Tribe-Pfad kommt nur hier vor und braucht deshalb keine Positionsvariante. |
| **Mobile-Regel** | Drei Links gestapelt, ausreichend große Trefferflächen (mindestens 44 × 44 px). Sektion höchstens zwei Bildschirmhöhen. |
| **Done when** | Jede der drei Routen führt auf ein existierendes Ziel und feuert ihr Event. Next Gen und Founders bleiben untereinander gleichwertig; Tribe ist erkennbar sekundär. |

**Copy.** `S9.H2` Was willst du in die Welt bringen? — `S9.P1` Vielleicht suchst du gerade erst. — `S9.P2` Vielleicht hast du längst angefangen. — `S9.P3` Vielleicht stehst du zwischen etwas, das nicht mehr trägt, und etwas Neuem, das noch keine Form hat. — `S9.P4` Der nächste Schritt muss nicht perfekt sein. Aber er kann deiner sein. — `S9.CTA1` Ich suche meinen Weg → *(Next Gen)* — `S9.CTA2` Ich baue etwas auf → *(Founder Resonance)* — `S9.CTA3` Ich möchte die Menschen kennenlernen → *(Tribe)*

---

### CRO-Prüfung: erledigt eine Sektion denselben Job wie eine andere?

Vor dem Bau von Sektion 7 bis 9 die drei Kandidatenpaare aktiv prüfen. Wenn ein Paar denselben psychologischen Job erledigt, wird zusammengelegt statt beides zu bauen.

| Paar | Risiko | Entscheidungskriterium |
|---|---|---|
| 3 Big Idea ↔ 8 Manifest | beide tragen Weltanschauung | Big Idea spricht den Besucher an („du"), Manifest spricht für die Marke („wir"). Bleibt der Unterschied im Satzbild sichtbar, bleiben beide. Verschwimmt er, wird Sektion 8 in Sektion 3 aufgelöst. |
| 7 Markenprägung ↔ 8 Manifest | beide sind Bekenntnis ohne Handlung | Sektion 7 erklärt den Namen, Sektion 8 die Haltung. Wenn Sektion 7 anfängt zu erklären statt zu wirken, wird sie gestrichen und in Sektion 8 integriert. |
| 6 Zwei Wege ↔ 9 Finale Einladung | beide fordern eine Wegwahl | Die Wiederholung ist beabsichtigt, weil zwischen ihnen Markenprägung und Manifest liegen. Sie bleibt nur zulässig, wenn Sektion 9 den Tribe-Pfad ergänzt und die Ansprache wechselt. Wäre Sektion 9 eine reine Wiederholung von Sektion 6, wird sie zu einem schlanken Abschluss reduziert. |

---

## 6. CMS-Datenmodell: Collection „Tribe" — Zielbild, kein Bauauftrag

> **Nicht in dieser Phase bauen (R-G).** Die Tribe-Sektion und ihr CMS entstehen in einem separaten Paket; David liefert die Bausteine dafür nach. Dieser Abschnitt bleibt stehen, weil er das Freigabe-Gate und die Feldstruktur festhält, auf die sich Sektion 5 später stützt. Er wird nicht ausgeführt, solange das Tribe-Paket nicht vorliegt. Wenn es kommt, ist dieser Abschnitt der Ausgangspunkt — und wird gegen die dann gelieferten Vorgaben geprüft, nicht blind übernommen.

Zielort wäre Site `699de057278d05930e1728ad`.

**Collection.** Anzeigename „Tribe", Singular „Tribe-Mitglied", Slug `tribe`.

> **⚠ PRÜFPUNKT.** Wird beim Anlegen der Collection automatisch eine Template-Seite `/tribe/<slug>` erzeugt, entstehen indexierbare Personenseiten, die niemand bestellt hat. Direkt nach dem Anlegen prüfen und diese Seiten über das Sitemap-Werkzeug auf `includeInSitemap: false` setzen sowie auf Draft belassen, bis eine Entscheidung dazu vorliegt.

### Felder

| Anzeigename | Slug | Typ | Pflicht | Zweck |
|---|---|---|---|---|
| Name | `name` | PlainText | ja (Webflow-Standard) | Vor- **und** Nachname, wie freigegeben |
| Slug | `slug` | Slug | ja (Webflow-Standard) | Referenz für die Analytics-Property `person` |
| Portrait | `portrait` | Image | ja | freigegebenes Portrait, 1:1 |
| Portrait Alt-Text | `portrait-alt` | PlainText | ja | in der Regel der Name, ohne „Foto von" |
| Rolle | `rolle` | PlainText | ja | kurze Tätigkeitsbeschreibung |
| Organisation oder Projekt | `organisation` | PlainText | nein | |
| Externer Link | `link-extern` | Link | nein | eigene Arbeit der Person |
| Linkbeschriftung | `link-label` | PlainText | nein | Muster: `<Vorname>s Arbeit entdecken ↗` |
| Stimme A · Was möchtest du in die Welt bringen? | `stimme-welt` | PlainText, mehrzeilig | nein | |
| Stimme B · Was verbindet dich mit dem Tribe? | `stimme-tribe` | PlainText, mehrzeilig | nein | |
| Sortierung | `sortierung` | Number | ja | steuert die Reihenfolge in der Collection List |
| Auf Startseite zeigen | `auf-startseite` | Switch | ja | Filterkriterium der Collection List |
| **Freigabe · Foto** | `freigabe-foto` | Switch | ja | |
| **Freigabe · Name** | `freigabe-name` | Switch | ja | |
| **Freigabe · Rolle** | `freigabe-rolle` | Switch | ja | |
| **Freigabe · Organisation** | `freigabe-organisation` | Switch | ja | |
| **Freigabe · Aussage** | `freigabe-aussage` | Switch | ja | betrifft Stimme A und Stimme B |
| **Freigabe · Zugehörigkeit** | `freigabe-zugehoerigkeit` | Switch | ja | Zustimmung zur öffentlich suggerierten Zugehörigkeit zum Tribe |
| Freigabe-Datum | `freigabe-datum` | DateTime | ja | |
| Freigabe-Nachweis | `freigabe-nachweis` | PlainText | ja | wo die dokumentierte Zustimmung liegt (Ablageort, Datum, Kanal) |

### Freigabe-Gate — verbindliche Regel

Ein Item wird **nur dann** aus dem Draft-Status geholt und veröffentlicht, wenn **alle sechs** Freigabe-Switches auf `true` stehen **und** `freigabe-datum` und `freigabe-nachweis` gefüllt sind. Fehlt eine einzige Freigabe, bleibt `isDraft: true`.

Diese Regel ist im CMS nicht technisch erzwingbar. Sie wird deshalb als Prüfschritt ausgeführt: Vor jedem `publish_collection_items` werden die Items über `list_collection_items` mit Filtern auf die sechs Switches geprüft, und das Ergebnis wird im Chat protokolliert. Ohne dieses Protokoll wird nicht publiziert.

Zusätzlich filtert die Collection List auf der Seite auf `auf-startseite = true`. Das ist eine Anzeigeentscheidung, kein Ersatz für das Freigabe-Gate.

### Import-Format für die Zulieferung

Damit die Items nicht abgetippt werden müssen, liefert David eine Tabelle mit genau diesen Spalten:

`name, rolle, organisation, link_extern, link_label, stimme_welt, stimme_tribe, sortierung, auf_startseite, freigabe_foto, freigabe_name, freigabe_rolle, freigabe_organisation, freigabe_aussage, freigabe_zugehoerigkeit, freigabe_datum, freigabe_nachweis, portrait_dateiname`

Umfang: sechs bis acht Zeilen für den Start, höchstens zwölf. Freigabe-Spalten mit `ja` oder `nein`. `portrait_dateiname` verweist auf eine Datei aus dem Bildpaket **I-3**.

**Es werden keine Personen, Zitate, Rollen, Organisationen oder Freigabedaten erfunden, ergänzt oder plausibel aufgefüllt.** Eine unvollständige Zeile bleibt unvollständig und geht als Rückfrage zurück.

---

## 7. Arbeitsschritte in Abhängigkeitsreihenfolge

| Schritt | Was | Abhängig von | Strang |
|---|---|---|---|
| S0 | Bestandsaufnahme (Abschnitt 1) | — | **erledigt** |
| **S-P0** | **Plausible einbinden und verifizieren, Baseline notieren** (Abschnitt 2b) | S0 | **Webflow · sofort, blockiert nichts** |
| P1 | Phase-1-Review und Publish auf `davidliebnau.com` | — | **David · läuft parallel** |
| S1 | Linkbericht und Founder-Inventar | S0 | Claude Code |
| **F1** | **Rest-Entscheidungen: Meta Pixel (OD-1b), Interim-Pfad der alten Startseite (OD-2b), CTA-Ziele beider Wege (OD-3, OD-4), Tribe-Pfad (OD-5)** | S1 | **David** |
| S2a | Copy-Datei (CTA-Linkziele als markierte Leerstellen), Symbol-Set, Analytics-Spezifikation und Eventregister | S1 | Claude Code · **läuft vor F1** |
| S2b | Leerstellen aus S2a schließen: CTA-Linkziele eintragen | F1, S2a | Claude Code |
| **F2** | **Copy-Freigabe: alle `NEW`-Strings entscheiden, inklusive SEO-Title, Meta Description, OG-Text, Navigation** | S2b | **David** |
| ~~S3~~ | ~~Tribe-Collection anlegen~~ — **vertagt in das separate Tribe-Paket (R-G)** | — | — |
| ~~S4~~ | ~~Zulieferung Tribe-Tabelle und Freigaben~~ — **Teil des Tribe-Pakets** | — | — |
| ~~F3~~ | ~~Tribe-Gate~~ — **Teil des Tribe-Pakets** | — | — |
| T0 | Zulieferung der Tribe-Bausteine durch David (Datenmodell-Vorgaben, Personen, Freigaben, Portraits) | — | **David · offen, außerhalb dieser Sequenz** |
| S5 | Bildzulieferung Hero-Collage (Portraits gehören ins Tribe-Paket) | F1 | **David** |
| **F4** | **Bildabnahme: welche vier bis sechs Collagenbilder, welche Zuschnitte, welches OG-Motiv** | S5 | **David** |
| S6 | Bildaufbereitung und Alt-Text-Entwürfe | F4 | Claude Code |
| S7a | Neue Seite anlegen (Draft, Arbeits-Slug `v3`), Seiteneinstellungen setzen | F2 | **Webflow** |
| S7b | Assets hochladen, Ordner anlegen, Alt-Texte setzen, zu WebP/AVIF komprimieren | S6, S7a | **Webflow** |
| S7c | Sektionen 1 bis 4 bauen | S7a, S7b | **Webflow** |
| S7d | Sektionen 5 bis 9 bauen; Sektion 5 nur als Rahmen (R-G), keine CMS-Bindung | S7c | **Webflow** |
| S7e | Data-Attribute für die zehn Events setzen | S7d | **Webflow** |
| S7f | Head-Code: die beiden Event-Snippets ergänzen (Plausible-Tag steht bereits aus S-P0) | S-P0, S7e | **Webflow** |
| S7g | Interactions und Reduced-Motion-Variante | S7d | **Designer** |
| **F5** | **Vorschau-Abnahme Desktop und Mobil an der Draft-Seite** | S7g | **David** |
| S8 | QA-Läufe nach Abschnitt 8 | F5 | **Webflow** |
| **F6** | **Publish-Freigabe und Startseiten-Tausch — nur wenn Phase 1 live ist (R-D) und die Tribe-Sektion gefüllt ist (siehe unten)** | S8, **P1**, T0 | **David** |
| S9a | Startseiten-Zuweisung tauschen, alte Startseite auf ihren neuen Pfad | F6 | **Designer** |
| S9b | Weiterleitungen setzen, Sitemap prüfen | S9a | **Designer** oder Webflow (⚠ Prüfpunkt) |
| S9c | Publish, Post-Release-Prüfung, Events verifizieren, Baseline notieren | S9b | **Webflow** |
| S10 | Rückmeldung der finalen URLs an den Repository-Strang | S9c | **Webflow** |

**Zur leeren Tribe-Sektion.** Sektion 5 trägt die Glaubwürdigkeit der ganzen Seite — sie ist der Beleg, dass die Idee in realen Menschen existiert. Eine Startseite, die diesen Beleg ankündigt und dann eine Lücke zeigt, ist schlechter als gar keine neue Startseite. Deshalb: Der Bau läuft ohne das Tribe-Paket weiter, **der Publish nicht.** Kommt das Paket später als erwartet, sind zwei Auswege denkbar, beide als Entscheidung und nicht als Notlösung: Sektion 5 entfällt vorerst ganz und die Dramaturgie wird um sie herum geschlossen, oder der Publish wartet. Was nicht geht, ist ein Platzhalter.

**Regel für alle Freigabepunkte.** Ohne Entscheidung wird der nachfolgende Schritt nicht begonnen. Es wird keine Annahme getroffen, um weiterarbeiten zu können, und keine Entscheidung „vorläufig" umgesetzt.

---

## 8. QA vor dem Publish

### Accessibility

- **Genau ein H1** auf der Seite. Prüfung: `query_elements` mit `element_filter.type = "Heading"` über die Seite, Heading-Level auswerten. Ergebnis protokollieren.
- **Heading-Struktur** ohne Sprünge: H1 im Hero, je ein H2 in Sektion 2 bis 9, H3 nur unterhalb eines H2. Kein Heading-Level dient allein der Schriftgröße.
- **Kontraste:** Fließtext ≥ 4,5:1, große Schrift und Bedienelemente ≥ 3:1. Jede Text-auf-Bild-Stelle einzeln messen, nicht schätzen. Text auf Collagenbildern nur mit Abdunklung oder Farbfläche.
- **Fokus-States** an allen Links, Buttons und dem Slider (falls in Sektion 4 verwendet) sichtbar, mit ≥ 3:1 Kontrast. Die Iris-Template-Komponenten auf `outline: none` prüfen.
- **Tastaturbedienung:** Die gesamte Seite ist ohne Maus durchlaufbar. Die Fokusreihenfolge entspricht der Leserichtung. Dekorative Collagenbilder sind nicht fokussierbar. Ein Skip-Link führt an der Navigation vorbei zum Hauptinhalt.
- **Alt-Texte:** Portraits mit dem Namen der Person. Collage: ein bedeutungstragendes Bild mit beschreibendem Alt-Text, die übrigen `alt=""` und `role="presentation"`. Symbole `alt=""`. Prüfung: Alle `Image`-Elemente auflisten und gegen `bild-manifest.csv` abgleichen.
- **Reduced Motion:** Falls Animationen eingesetzt werden, existiert eine Variante für `prefers-reduced-motion: reduce`. Ist das im Designer nicht sicher umsetzbar, werden keine Animationen eingesetzt.
- **Trefferflächen** auf Mobil mindestens 44 × 44 px.
- **Sprache:** `lang="de"` auf der Seite gesetzt.

### Mobile

- Die gesamte Seite über alle neun Sektionen bleibt mobil **unter etwa 14 Bildschirmhöhen**. Vor dem Publish messen und den Wert notieren. Liegt sie darüber, wird gekürzt statt begründet.
- Sektionsobergrenzen mobil: Hero unter 1, Recognition ≤ 2, Big Idea ≤ 2, **Schöpferische Dialoge ≤ 2**, Tribe ≤ 5, Zwei Wege ≤ 3, Markenprägung ≤ 3, Manifest ≤ 2, Finale Einladung ≤ 2.
- Die Hero-Collage funktioniert im schmalen Viewport: drei Bilder, feste Seitenverhältnisse, keine Überlappungen, kein horizontales Scrollen.
- Die zwei Wege sind gestapelt gleich hoch und gleich gewichtet.
- Kein horizontales Überlaufen bei 320 px Viewport-Breite.

### Performance

- Alle Bilder als WebP, zusätzlich AVIF wo verfügbar. Komprimierung über das Asset-Werkzeug nach dem Upload. **Vorher bestätigen lassen** — die Komprimierung ersetzt die Datei am selben Asset und ist nicht rückholbar.
- Webflow erzeugt die responsiven Varianten automatisch; das ist in der Bestandsaufnahme belegt und braucht keine Zusatzarbeit.
- `loading="lazy"` an allen Bildern unterhalb des ersten Bildschirms, `eager` plus `fetchpriority="high"` an den ersten ein bis zwei Collagenbildern.
- LCP mobil ≤ 2,5 s messen und notieren.

### SEO

- **Title** und **Meta Description** der neuen Seite gesetzt — beide **NEW**, Freigabe über **OD-10**.
- **Open Graph:** eigenes 1200 × 630-Bild aus dem Bildpaket. **Kein Portrait einer Tribe-Person**, solange keine gesonderte Freigabe für die Social-Media-Vorschau vorliegt.
- **Canonical:** prüfen, welchen Canonical Webflow für die Startseite ausliefert; ein Override ist über die Seitenwerkzeuge nicht sichtbar (⚠ Prüfpunkt) und erfolgt gegebenenfalls von Hand.
- **Sitemap:** neue Startseite indexierbar; die Tribe-Template-Seite und alle Tribe-Items **nicht** in der Sitemap.
- **Interne Links:** Navigation und Footer zeigen auf existierende Ziele. Alle Sprungziele (`#recognition`, `#tribe`) existieren.
- **Weiterleitungen:** Wenn die alte Startseite einen neuen Pfad bekommt, wird eine 301 von jedem bisher extern verlinkten Pfad gesetzt. Grundlage ist der Linkbericht **I-5**.
- **JSON-LD:** optional. Nur `Organization` mit belegbaren Angaben. Keine erfundenen `foundingDate`, `numberOfEmployees` oder `member`-Einträge.

### Analytics

- Alle zehn Eventnamen sind an genau einem Element gesetzt und feuern genau einmal. Es existiert **kein** `data-plausible-prop-*`-Attribut auf der Seite (R-F) — die Suche danach muss leer ausgehen.
- Die vier Scrolltiefen-Events feuern einmal pro Seitenaufruf, nicht bei jedem Zurückscrollen.
- Die Goals sind im Plausible-Dashboard **von Hand** angelegt — sie entstehen dort nicht automatisch. Stand 02.09.2026 ist `light.home.hero.click` angelegt, die übrigen neun fehlen.
- Testdurchlauf: Seite einmal vollständig durchscrollen, jede Route einmal klicken, in Plausible verifizieren.
- Der bestehende Head-Code-Inhalt wurde vor jeder Änderung wörtlich gesichert und im Chat protokolliert.

### Trust und Recht

- Für **jedes** veröffentlichte Portrait liegt die dokumentierte Zustimmung zu Foto, Name, Rolle, Organisation, Aussage und suggerierter Zugehörigkeit vor. Das Prüfprotokoll aus Abschnitt 6 liegt vor. In dieser Phase greift die Prüfung nicht, weil keine Portraits veröffentlicht werden (R-G) — sie ist Bestandteil des Tribe-Pakets und Vorbedingung von F6.
- Keine Dark Patterns: keine erfundene Knappheit, kein Countdown, kein „über X Mitglieder", kein aufgeblasener Social Proof, keine künstlich erzeugte dokumentarische Realität.
- Rechtslinks im Footer der neuen Seite vorhanden und funktionsfähig.
- Der Umgang mit dem Meta Pixel ist entschieden und umgesetzt (**OD-1b**). Wird er behalten, ist die Datenschutzerklärung entsprechend geprüft — das ist eine Anwaltsfrage, keine Assistentenentscheidung.

---

## 9. Was in dieser Phase ausdrücklich nicht getan wird

1. Keine Änderung an `/quiz`, `/call`, `/quiz-en`, `/call-en`, `/en` oder den Bestätigungsseiten. Die Founder-Strecke läuft unverändert weiter.
2. Kein Aufbau von Founder Resonance als Conversion-Spoke — das ist Phase 3 und dort ein Rebuild, keine Migration.
3. Keine Änderung an den Flourishing-Life-Seiten. Sie werden verlinkt, nicht umgebaut.
4. Kein Aufräumen der Iris-Template-Altlasten (`/old-home`, `/styles`, `/components`, `/basic-layouts`, `/inspired-layouts`, Design-Mode-Seiten). Verlockend, aber nicht in dieser Phase.
5. Kein Anfassen der `Theme Toggle`-Komponente und der von ihr abhängigen Custom-Code-Sichtbarkeit.
6. Keine englische Fassung der neuen Startseite und keine Einrichtung von Locales.
7. Keine Zusammenlegung der `Testimonials`-Collection mit dem Tribe.
7a. **Keine Tribe-Collection, keine Tribe-Felder, keine Tribe-Items, keine CMS-Bindung in Sektion 5 (R-G).** Das ist ein eigenes Paket und wartet auf Davids Bausteine. Auch kein „schon mal die Collection anlegen, schadet ja nicht" — ein halb gebautes Datenmodell, das später gegen andere Vorgaben geprüft werden muss, kostet mehr als es spart.
8. Keine Preise, keine Mitgliedschaftslogik, keine Aufnahmebedingungen, keine Termine.
9. Keine erfundenen Personen, Zitate, Mitgliederzahlen oder Organisationen. Kein Platzhalterportrait und kein generiertes Gesicht — auch nicht „nur für die Vorschau".
10. Keine stille Entscheidung über Markenarchitektur, Produktnamen, Tribe-Mitgliedschaft oder eine neue primäre CTA-Logik.
11. Kein Publish ohne den Freigabepunkt F6. Kein `publish_site` „zum Testen".

---

## 10. OPEN DECISIONS

| ID | Offene Entscheidung | Warum sie nicht still entschieden werden darf | Blockiert |
|---|---|---|---|
| ~~OD-1a~~ | ~~Cookiefreies Analytics auf `light-creators.com`~~ | **Entschieden 02.09.2026 → Regel R-A.** Plausible wird eingebunden, Schritt S-P0. | — |
| **OD-1b** | **Meta Pixel auf `light-creators.com`.** Läuft site-weit im Head, ohne erkennbaren Einwilligungsmechanismus. Optionen: entfernen, hinter eine Einwilligung legen, oder behalten und in der Datenschutzerklärung sauber abbilden. Relevant ist auch, ob aktuell Meta-Kampagnen laufen, die auf den Pixel angewiesen sind. Wird eine Einwilligungslösung gewählt, kommt ein Consent-Layer als Gestaltungselement auf die neue Startseite — das gehört dann in den Bau. | Rechtsfrage. Wird nicht durch einen Assistenten entschieden. Blockiert die Plausible-Einbindung **nicht**. | F1, S7f |
| ~~OD-2a~~ | ~~Grundsatzentscheidung zur heutigen Startseite~~ | **Entschieden → Regel R-B**, abgeleitet aus Phase 3 und der Backlog-Regel „Now" des Master-Briefings. | — |
| **OD-2b** | **Interim-Pfad der alten Startseite.** Welcher Slug (`/founder-resonance`, `/founder`, anderes), und bleibt die Seite bis Sprint C indexiert oder geht sie auf `noindex`? Es existiert bereits eine `/old-home`, die nicht zusätzlich verwechselt werden sollte. | Betrifft Weiterleitungen und die Guardrail-Messung der Founder-Strecke | F1, S9a |
| **OD-3** | **Zieladresse des Next-Gen-CTA.** Drei Flourishing-Life-Seiten existieren; keine ist erkennbar die Übersichtsseite. | Neue primäre CTA-Logik | F1, S7d |
| **OD-4** | **Zieladresse des Founders-CTA,** solange Phase 3 nicht gebaut ist. | dito | F1, S7d |
| **OD-5** | **Tribe-Pfad „Ich möchte die Menschen kennenlernen →".** Anker auf der Seite oder eigene `/tribe`-Seite. | Betrifft Markenarchitektur und Messung | F1, S7d |
| **OD-6** | **Öffentliche Bezeichnung für „Next Gen".** Arbeitsbegriff, im Master-Briefing ausdrücklich als offen geführt. | Produktname | F2 |
| **OD-7** | **Navigation** „Manifest · Tribe · Next Gen · Founders · About". Eine About-Seite existiert nicht. | Betrifft Informationsarchitektur | F2 |
| **OD-8** | **Stapelreihenfolge der zwei Wege auf Mobil.** Es gibt keine neutrale Reihenfolge. | Betrifft die geforderte Gleichwertigkeit | F2 |
| **OD-9** | **Design-System für Light Creators:** eigene Tokens und Typografie oder Übernahme von `davidliebnau.com`. Betrifft auch, ob die Symbolfarben angepasst werden. | Markenarchitektur | F2 |
| **OD-10** | **SEO-Title, Meta Description, Open-Graph-Text und die H2 in Sektion 7.** Im V3-Dokument nicht enthalten, daher **NEW**. | Zentrale öffentliche Claims | F2 |
| **OD-11** | **Tribe-Mitgliedschaft und Aufnahmelogik.** `S5.P4` fragt „Und vielleicht magst auch du in den Kreis kommen?", ohne dass ein Weg dahinter existiert. | Governance und Produktversprechen | F5 |
| **OD-12** | **Verhältnis zur `Testimonials`-Collection.** Empfehlung: getrennt lassen, weil der Tribe kein Social Proof ist. | Datenmodell | S3 |
| **OD-13** | **Sprachstrategie.** Die Site führt DE- und EN-Seiten als getrennte Seiten, nicht als Locales. Ob die neue Startseite eine EN-Fassung bekommt und in welcher Form, ist offen. | Betrifft Seitenstruktur und hreflang | nach S9 |

---

*Ende des Briefings für den Webflow-Connector. Gegenstück: `_briefings/phase2-lightcreators-claude-code.md`.*
