# Phase 2 · Light Creators V3 — Umsetzungsbriefing für Claude Code

**Empfänger:** Claude Code im Repository `davidliebnau.com` (statisch, GitHub Pages)
**Gegenstück:** `_briefings/phase2-lightcreators-webflow.md` (Arbeit über den Webflow-Connector im Chat)
**Stand:** 2. September 2026
**Bearbeiter dieses Dokuments:** Technical Program Lead

> **Wichtig vorab.** Claude Code hat keinen Zugriff auf Webflow. Der Webflow-Connector hat keinen Zugriff auf dieses Repository. In Phase 2 wird auf `davidliebnau.com` **keine Seite verändert**. Dieses Repository ist in dieser Phase Zulieferer: Es erzeugt Copy, Assets, Symbole, Spezifikationen und Prüfberichte, die anschließend im Chat über den Webflow-Connector nach `light-creators.com` gebracht werden. Die einzige Ausnahme ist die Linkprüfung in den Podcast-Episoden, siehe Aufgabe CC-6.

---

## 1. Change Brief

| Feld | Inhalt |
|---|---|
| **Ziel** | `light-creators.com` wird von einer Founder-Resonance-Landingpage zum eigenständigen Marken-Hub. Besucher sollen die gemeinsame Idee verstehen, den Tribe als real erleben und sich danach selbst einem der zwei Wege zuordnen. Dieses Repository liefert die dafür nötigen Bausteine. |
| **Betroffene Journey** | Marke Light Creators, Einstieg über `/` (Hub-Stufe, nicht Conversion-Stufe). Für dieses Repository zusätzlich betroffen: die Podcast-Episoden auf `davidliebnau.com`, die auf `light-creators.com` verlinken. |
| **Hypothese** | Wenn die Selbstselektion erst nach Recognition, Resonanz und Glaubwürdigkeit stattfindet statt im ersten Screen, erwarten wir eine höhere Rate an bewussten Wegwahlen und weniger Fehlrouting, weil Besucher zuerst verstehen, wofür die Marke steht, bevor sie zwischen zwei Angeboten wählen sollen. |
| **Primäre KPI** | Qualifizierte Wegwahl-Rate: Anteil der Home-Sessions mit mindestens einem Klick auf `light.home.nextgen.click` oder `light.home.founders.click`. |
| **Guardrail-KPIs** | (1) Einstiege in `/quiz` und `/call` dürfen nicht einbrechen. (2) Die beiden nackten URLs in Podcast-Episode 28 dürfen nicht ins Leere laufen. (3) Largest Contentful Paint der neuen Startseite mobil ≤ 2,5 s. (4) Keine 404 auf bestehende `light-creators.com`-Pfade, die aus diesem Repository verlinkt werden. |
| **Evidenz** | Master-Briefing „Strategische Website-Iteration", Phase 2. Seiten-Briefing „Light Creators Tribe · Website-Update V3". Technische Bestandsaufnahme über den Webflow-Connector am 02.09.2026. Bestandsaufnahme des Repositories über `OFFENE-AUFGABEN-Relaunch.md`. |
| **Status** | **UNVALIDATED.** Die Hypothese ist strategisch begründet und durch zwei freigegebene Dokumente gedeckt, aber es liegen keine quantitativen Nutzungsdaten für `light-creators.com` vor: Auf der Site läuft heute kein cookiefreies Analytics. Es gibt keine Baseline. Das ist bewusst so benannt und darf nicht als MEASURED oder INFERRED dargestellt werden. |
| **Vorbedingung · Sprint A** | Sprint A (Phase 1) ist zum 02.09.2026 **nicht abgeschlossen**. Die Arbeit ist in diesem Repository weitgehend erledigt, aber noch nicht veröffentlicht; der Review liegt bei David. Abschnitt 17 des Master-Briefings stellt Sprint A vor Sprint B. **David hat entschieden, beide Stränge parallel zu führen:** er prüft und veröffentlicht Phase 1, während Phase 2 vorbereitet wird. Dokumentierter Override, keine Auslassung. Praktische Folge für dieses Repository: Es liegen offene, noch nicht gemergte Phase-1-Änderungen vor. Phase-2-Arbeit entsteht deshalb **ausschließlich in neuen Dateien unter `_briefings/phase2-lightcreators/`** und berührt keine Datei, die im Phase-1-Review stecken könnte. |
| **Vorbedingung · P0** | Auf `light-creators.com` läuft kein cookiefreies Analytics. Das ist eine Phase-0-Regression und nach Abschnitt 12 des Master-Briefings ein „Now"-Task. Die Einbindung von Plausible dort läuft über den Webflow-Strang als Schritt **S-P0** und ist entschieden. Für dieses Repository folgt daraus die Aufgabe, das Eventregister über **beide** Domains konsistent zu führen — siehe CC-4. |
| **Scope (dieses Repository)** | Neue Dateien unter `_briefings/phase2-lightcreators/`. Kopien der vier Symbol-SVGs. Aufbereitete Bilddateien. Prüfbericht über ausgehende Links nach `light-creators.com`. Keine Änderung an bestehenden Seiten. |
| **Nicht im Scope (dieses Repository)** | Jede Änderung an `index.html`, `fuehren/`, `threshold/`, den Rechtsseiten und den Episodenseiten. Der Generator `generate-episodes.js`. Die englischen Fassungen. Design-Token-Vereinheitlichung. Der Umbau von `podcast.html`. Die Founder-Blöcke aus `_archiv/` werden inventarisiert, aber nicht verwendet — sie gehören zu Phase 3. |
| **Reversibilität** | Sehr hoch. Alle Ergebnisse sind neue Dateien in einem eigenen Verzeichnis. Kein bestehendes Artefakt wird überschrieben. Rücknahme = Verzeichnis löschen. Einzige Ausnahme ist eine eventuelle Korrektur in `ep-28`, die als eigener Commit isoliert bleibt und einzeln zurückgenommen werden kann. |
| **QA** | Funktion: alle erzeugten Dateien liegen an den benannten Pfaden und sind valide (Markdown, CSV, SVG, WebP/AVIF). Mobile: nicht anwendbar, dieses Repository liefert keine Oberfläche. Accessibility: Alt-Text-Slots sind vollständig angelegt und als offen markiert, wo Zulieferung fehlt. Analytics: Die Eventspezifikation ist vollständig und widerspruchsfrei zum Schema `brand.page.object.action`. SEO: Linkbericht über alle ausgehenden `light-creators.com`-Links liegt vor. Recht: Keine Personendaten, keine Portraits, keine Zitate werden in diesem Repository ohne dokumentierte Freigabe abgelegt. |

---

## 1a. Entscheidungsstand vom 2. September 2026

Diese Punkte sind entschieden und werden nicht erneut als offen behandelt.

| Regel | Entscheidung | Quelle |
|---|---|---|
| **R-A** | **Plausible wird auf `light-creators.com` eingebunden.** Ziel ist ein Analytics-System über beide Domains. Umsetzung im Webflow-Strang, vorgezogen als Schritt S-P0. | David, 02.09.2026 |
| **R-B** | **Die heutige Startseite von `light-creators.com` wird nicht in den neuen Hub übernommen.** Der Founder-Inhalt zieht unverändert auf einen eigenen Pfad um und bleibt als Interim live, bis Sprint C ihn ersetzt. Für dieses Repository heißt das: Die Blöcke aus `_archiv/` bleiben liegen, sie werden auch jetzt nicht gebraucht. | Master-Briefing, Phase 3 („Migration ist Bestandteil dieses Rebuilds. Nicht alte Blöcke ungeprüft übertragen.") und Abschnitt 12, Backlog-Regel „Now" |
| **R-C** | **Phase 1 und Phase 2 laufen parallel.** Phase-1-Review und Publish liegen bei David; Phase-2-Vorbereitung läuft währenddessen. Dokumentierter Override der Sprint-Reihenfolge aus Abschnitt 17. | David, 02.09.2026 |
| **R-D** | **Kein Publish der neuen Startseite, solange Phase 1 nicht live ist.** Betrifft den Webflow-Strang, ist hier nur als Kontext vermerkt. | Folge aus R-C |
| **R-F** | **Plausible-Tarif Growth.** Growth unterstützt keine Custom Properties. Die Unterscheidung zwischen Sektion 6 und Sektion 9 wandert in den Eventnamen; es gibt keine `data-plausible-prop-*`-Attribute und keine Property-Logik im Snippet. | David, 02.09.2026 |
| **R-G** | **Die Tribe-Sektion und ihr CMS werden separat gebaut.** David liefert die Bausteine nach. Für dieses Repository heißt das: keine Portrait-Aufbereitung, kein CSV-Importschema, keine Alt-Texte für Portraits in dieser Phase. CC-3 beschränkt sich auf die Hero-Collage und das OG-Bild. | David, 02.09.2026 |
| **R-H** | **Die alte Founder-Startseite zieht auf `/founder`.** Kleingeschrieben. Sie bleibt **indexiert** — sie ist bis Sprint C ein laufendes Angebot, `noindex` würde ihren organischen Einstieg abschneiden, und der Zustand ist jederzeit umkehrbar. **Kein 301 von `/` auf `/founder`:** die Wurzel verschwindet nicht, sie bekommt neuen Inhalt. Eine Weiterleitung dort würde die neue Startseite unerreichbar machen. | David, 03.09.2026 |
| **R-I** | **Abgeleitete Linkziele.** Founders-CTA (`S6.FO.CTA`, `S9.CTA2`) → `/founder`. Next-Gen-CTA (`S6.NG.CTA`, `S9.CTA1`) → `/the-art-and-practice-of-a-flourishing-life` als Übersichtsseite; die beiden Unterseiten „Für Dich" und „Für Eltern" sind Zielgruppenzuschnitte und damit eine Stufe zu tief für einen Hub-CTA. Tribe-Pfad (`S9.CTA3`) → Sprungmarke `#tribe` auf derselben Seite, weil `/tribe` heute 404 liefert und R-G ohnehin keine eigene Tribe-Seite vorsieht. Alle drei sind in einer Zeile änderbar. | Ableitung aus R-H, 03.09.2026 |
| **R-J** | **`/en` bleibt, wo es ist.** Phase 2 ersetzt die deutsche Wurzel, nicht die englische Founder-Seite — dort wird nichts überschrieben, also muss auch nichts umziehen. Die 31 Anker auf `/en` bleiben gültig. Die englische Founder-Welt wird in Sprint C mitsortiert, nicht vorher. | Ableitung, 03.09.2026 |
| **R-K** | **Symbole:** der `currentColor`-Satz mit ViewBox 240×240 ist maßgeblich, inline eingebettet statt als Asset hochgeladen, `role` und `aria-label` werden beim Einbetten durch `aria-hidden="true"` ersetzt. Farbe `#A87D34`, weil die Striche haarfein und stark abgeschwächt sind und das hellere Gold auf hellem Grund verschwindet. Eine CSS-Zeile, jederzeit änderbar. | Entscheidung 03.09.2026 |
| **R-L** | **Markenarchitektur.** Die Marke heisst **Light Creators**. Light Creators Tribe bezeichnet ausschliesslich die Community-Ebene, nicht die Marke. Hierarchie: Light Creators = die Welt, Next Gen und Founders = zwei Wege durch diese Welt, Light Creators Tribe = die Menschen, die sie verbinden und verkoerpern. Durchgaengig: Seitentitel, Hero-Eyebrow und Webflow-Site-Name Light Creators; Tribe-Sektion und Community Light Creators Tribe. | David, 03.09.2026 |
| **R-M** | **`S1.EYEBROW` wird geaendert:** LIGHT CREATORS TRIBE wird zu **LIGHT CREATORS**. Damit ist dieser String nicht mehr HIS/EXISTING, sondern **REWRITTEN**. Die Copy-Datei im Repository traegt noch die alte Fassung und muss nachgezogen werden. | Folge aus R-L |
| **R-N** | **Navigation: `Manifest | Tribe | Wege` mit Aufklappmenue**, darin `Next Gen` und `Founders`. About entfaellt ersatzlos. Begruendung: Stehen Next Gen und Founders dauerhaft nebeneinander ueber dem Hero, bekommt die Segmentierung mehr Gewicht, als ihr konzeptionell zusteht. Gleichzeitig brauchen wiederkehrende Besucher einen Direktweg. Das Aufklappmenue loest beides. Die eigentliche Selbstselektion bleibt Sektion 6. | David, 03.09.2026 |
| **R-O** | **Next Gen bleibt die oeffentliche Beschriftung.** | David, 03.09.2026 |
| **R-P** | **F2-Texte freigegeben, 03.09.2026.** Seitentitel: `Light Creators — Finde, was nur du bist`. Meta Description: `Es gibt etwas in jedem Menschen, das sich nicht kopieren lässt. Light Creators lädt ein, dem Eigenen näherzukommen – und daraus etwas in die Welt zu bringen.` OG-Titel: `Finde, was nur du bist. Und bring es in die Welt.` OG-Beschreibung: `Eine Einladung, dem Eigenen näherzukommen – und daraus etwas zu erschaffen.` Alle vier sind **NEW** und stammen nicht aus dem V3-Dokument. | David |
| **R-Q** | **`S7.H2` ist ein visuell verstecktes Heading** mit dem Wortlaut `Light Creators Tribe`. Die drei großen Wörter LIGHT, CREATORS und TRIBE bleiben Gestaltungselemente und tragen keine Heading-Semantik. | David, 03.09.2026 |
| **R-R** | **Mobile Stapelreihenfolge Sektion 6: Next Gen oben.** Begründung: Der Founders-Weg hat eigene Zuläufe (Podcast, Quiz, Diagnostic Call, 74 Episodenlinks), der Next-Gen-Weg hat sie nicht und ist auf die Startseite angewiesen. Beide Karten behalten identische Höhe, Struktur und Button-Gestaltung, damit aus der Reihenfolge keine Wertung wird. | David, 03.09.2026 |
| **R-S** | **Design-System: LCT Brand Design Guidelines sind die Autorität.** Farben: Midnight Blue `#04171F` (trägt die Marke), Grounding Umber `#303231`, Gold-Verlauf `#FFDB9D` nach `#A87D34` (Highlights, Glow, Typo-Verläufe), Soft Gold `#E0B76F` (Akzent, dezent), Aurora Tide `#63A192`, Open Horizon `#05404C`, Luminous Sand `#FFF8E6`. Schriften: **Cormorant Garamond** für Header, **HK Grotesk** für Subheader und Fließtext. Kein Wert wird erfunden; wo die Guidelines schweigen, wird gefragt. | Guidelines, 03.09.2026 |
| **R-T** | **Gold trägt keinen Text auf hellem Grund.** Gemessen auf Luminous Sand: heller Goldton 1,25:1, Soft Gold 1,77:1, dunkles Gold 3,51:1 — alle unter der Fließtextschwelle von 4,5:1. Auf Midnight Blue trägt die gesamte Goldfamilie (4,92:1 bis 13,83:1). **Regel:** Auf hellen Sektionen sind Eyebrows und Textakzente Midnight Blue (17,27:1), Grounding Umber (12,19:1) oder Open Horizon (10,75:1). Gold bleibt dort dekorativen Elementen vorbehalten. **VORSCHLAG, noch nicht freigegeben:** ein abgedunkelter Web-Ableger `#916C2D` im selben Farbton, der auf Luminous Sand 4,52:1 erreicht — nur falls Gold auch auf hell Text tragen soll. | Messung, 03.09.2026 |
| **R-U** | **Das Logo bleibt vorerst `Light Creators Tribe`.** Die Wortmarke widerspricht R-L; eine Adaption auf `Light Creators` erfolgt später durch einen Designer und ist nicht Teil dieser Phase. Alles übrige folgt R-L. | David, 03.09.2026 |
| **R-V** | **S-P0 ist ausgeführt, 03.09.2026.** Plausible steht im Site-Head von light-creators.com, der Meta-Pixel-Block wortgleich darüber, nach dem Schreiben gegengeprüft. **Wirksam erst nach dem nächsten Publish im Designer.** Offen bleibt: neun Goals im Dashboard anlegen, drei überflüssige Custom Properties löschen. | Ausführung |
| **R-W** | **Phase 1 ist live, 03.09.2026.** Damit ist R-D erfüllt und **R-E aufgehoben** — Claude Code darf wieder Dateien außerhalb von `_briefings/phase2-lightcreators/` ändern. Die bis dahin gesperrten Rückfragen zu Symbolsätzen, Eventnamen und Reach-Schwellwert sind frei. | David |
| **R-X** | **Reihenfolge beim Umhängen der 74 Anker:** Erst wird `/founder` in Webflow angelegt und veröffentlicht, dann wird die Repo-Änderung gemerged. Umgekehrt laufen 74 Links ins Leere. Code baut und committet, merged aber erst auf Signal. | Ableitung |
| **R-Y** | **CC-3 und CC-5 wechseln den Strang.** Das Bildmaterial ist im Chat geliefert worden, nicht im Repository. Aufbereitung, Grading und Alt-Text-Entwurf laufen deshalb über den Webflow-Strang. Claude Code ist damit von CC-3 und CC-5 entbunden. | Ableitung, 03.09.2026 |
| **R-Z** | **`/founder` ist in Webflow angelegt, 04.09.2026.** Page-ID `6a9b3c6b0b1f07241e741771`, Duplikat der bisherigen Startseite, Inhalt verifiziert (31 Überschriften, sieben Sektionen, ein H1). Kein Entwurf — die Seite geht mit dem nächsten Publish live. **Der Merge der 74 Anker erfolgt erst nach diesem Publish** (R-X). Ebenfalls angelegt: `/v3` als Entwurf der neuen Startseite, Page-ID `6a9b3c6b80327ba04478f217`, mit den Texten aus R-P. | Ausführung |
| **R-E** | **Keine Änderung an Dateien außerhalb von `_briefings/phase2-lightcreators/`,** solange der Phase-1-Review läuft. Auch keine „kleine Korrektur nebenbei". Ein Commit, der in den Review hineinragt, kostet mehr, als er spart. | Folge aus R-C |

---

## 2. Zuständigkeits-Split

Jede Aufgabe steht in genau einer Spalte. Was hier nicht in der linken Spalte steht, ist nicht Aufgabe von Claude Code.

| Claude Code (dieses Repository) | Webflow-Connector (Chat) | Handarbeit im Webflow-Designer |
|---|---|---|
| **CC-1** Copy-Datei mit Provenance und String-IDs erzeugen | Seite anlegen, Seiteneinstellungen, SEO, Open Graph, JSON-LD setzen | Festlegen, welche Seite die Homepage ist (Slug-Tausch) |
| **CC-2** Symbol-Set der vier schöpferischen Dialoge exportieren und dokumentieren | Elemente, Struktur und Styles der neun Sektionen bauen | Interactions und Animationen, inklusive Reduced-Motion-Variante |
| **CC-3** Bilder für Hero-Collage und Portraits aufbereiten, Manifest schreiben | Tribe-CMS-Collection und alle Felder anlegen | Feinsatz der Hero-Collage: Zuschnitte, Überlappungen, optische Balance |
| **CC-4** Analytics-Spezifikation und die beiden Tracking-Snippets schreiben | Assets hochladen, Alt-Texte setzen, Ordner anlegen, zu WebP/AVIF komprimieren | Visueller Abnahmedurchgang Desktop und Mobil vor dem Publish |
| **CC-5** Alt-Text-Entwürfe für dekorative und bedeutungstragende Bilder vorbereiten | Data-Attribute für die Eventmessung an den Elementen setzen | 301-Weiterleitungen in den Site Settings, falls kein API-Weg verfügbar ist |
| **CC-6** Ausgehende Links nach `light-creators.com` im gesamten Repository prüfen und berichten | Prüfläufe: H1-Anzahl, Alt-Texte, Linkziele, Sitemap-Flags | Entscheidung und Umsetzung zum Meta Pixel und einer eventuellen Consent-Lösung |
| **CC-7** Founder-Material in `_archiv/` inventarisieren, Verwendbarkeit für Phase 3 bewerten | Freeform-Head-Code lesen und, nach Freigabe, schreiben | Veröffentlichung auf die Produktionsdomains |
| **CC-8** Übergabepaket zusammenstellen und Übergabeprotokoll schreiben | Tribe-Items anlegen, Freigabe-Gate prüfen, Draft-Status verwalten | Font-Einbindung, falls neue Webfonts hinzukommen |

---

## 3. Schnittstellen zum Webflow-Strang

Nur an diesen fünf Punkten berühren sich die beiden Stränge. Jeder Punkt ist eine Datei, ein Format und ein Übergabemoment.

| # | Übergabe | Datei / Format | Wann | Wer nimmt es auf |
|---|---|---|---|---|
| **I-1** | Copy mit String-IDs | `_briefings/phase2-lightcreators/copy-lightcreators-home.md` — Markdown, pro String eine Zeile mit ID, Provenance-Tag und Text | Nach Freigabepunkt **F2** | Webflow-Strang setzt Texte über `set_text` gegen die String-IDs |
| **I-2** | Symbol-Set | `_briefings/phase2-lightcreators/symbole/` — vier SVG plus vier PNG @2x, plus `symbole-README.md` mit Farbwerten und Alt-Text-Regel | Nach **F2** | Webflow-Strang lädt sie als Assets hoch |
| **I-3** | Bildpaket | `_briefings/phase2-lightcreators/bilder/` — WebP und AVIF in definierten Größen, plus `bild-manifest.csv` | Nach Freigabepunkt **F4** | Webflow-Strang lädt hoch, setzt Alt-Texte aus dem Manifest |
| **I-4** | Analytics-Spezifikation | `_briefings/phase2-lightcreators/analytics-lightcreators-home.md` plus `snippets/plausible-events.js` und `snippets/plausible-scroll.js` | Nach **F2** | Webflow-Strang setzt die Data-Attribute und, nach Freigabe, den Head-Code |
| **I-5** | Linkbericht | `_briefings/phase2-lightcreators/linkreport-lightcreators.md` | Vor Freigabepunkt **F1** | Fließt in die Redirect-Liste des Webflow-Strangs ein |

**Rückrichtung:** Der Webflow-Strang meldet nach dem Publish die finalen URLs der beiden Wege und des Tribe-Pfads zurück. Erst danach wird der Linkbericht in einen eventuellen Korrektur-Commit für `ep-28` überführt.

---

## 4. Die neun Sektionen aus Sicht dieses Repositories

Der vollständige Sektionsaufbau steht im Webflow-Briefing. Hier steht, was dieses Repository pro Sektion zuliefert.

| # | Sektion | Psychologischer Job | Copy-Quelle · Provenance | Zulieferung aus diesem Repository | Event, das im Snippet vorkommen muss |
|---|---|---|---|---|---|
| 1 | Hero | Identifikation | V3 §4 · **HIS/EXISTING** | 4–6 aufbereitete Collagenbilder, Alt-Text-Entwürfe, String-IDs `S1.*` | `light.home.hero.click` |
| 2 | Recognition | Selbsterkennung | V3 §8 · **HIS/EXISTING** | String-IDs `S2.*`, keine Bilder | `light.home.recognition.reach` |
| 3 | Big Idea | Resonanz | V3 §9 · **HIS/EXISTING** | String-IDs `S3.*`, keine Bilder | `light.home.bigidea.reach` |
| 4 | Schöpferische Dialoge | Mechanismus | V3 §10 · **HIS/EXISTING** | **Symbol-Set** (vier SVG plus PNG-Fallback), Farbwerte, Alt-Text-Regel, String-IDs `S4.*` | — |
| 5 | Der reale Tribe | Glaubwürdigkeit und Zugehörigkeit | V3 §11 · **HIS/EXISTING**; Personendaten **separates Tribe-Paket (R-G)** | Nur die Intro-Strings `S5.*`. **Keine** Portrait-Aufbereitung, **kein** CSV-Importschema, **keine** Portrait-Alt-Texte in dieser Phase | `light.home.tribe.reach`, `light.home.tribe.click` |
| 6 | Zwei Wege | Selbstselektion | V3 §12 · **HIS/EXISTING**; CTA-Zieladressen **OPEN** | String-IDs `S6.*`, Hinweis auf die offenen Linkziele | `light.home.zweiwege.reach`, `light.home.nextgen.click`, `light.home.founders.click` |
| 7 | LIGHT · CREATORS · TRIBE | Markenprägung | V3 §13 · **HIS/EXISTING** | String-IDs `S7.*` | — |
| 8 | Manifest | Commitment | V3 §14 · **HIS/EXISTING** | String-IDs `S8.*` | — |
| 9 | Finale Einladung | Action | V3 §15 · **HIS/EXISTING**; drittes CTA-Ziel **OPEN** | String-IDs `S9.*` | `light.home.nextgenfinale.click`, `light.home.foundersfinale.click`, `light.home.tribe.click` |

**Provenance-Regel für dieses Repository:** Alles, was aus dem V3-Dokument stammt, ist **HIS/EXISTING** und wird wörtlich übernommen. Es wird nicht geglättet, nicht gekürzt und nicht umgestellt. Was im V3-Dokument nicht steht — SEO-Title, Meta Description, Open-Graph-Text, Alt-Texte, Navigationsbeschriftungen, Linkbeschriftungen — ist **NEW** und wird als Vorschlag mit `[NEW · FREIGABE OFFEN]` markiert, nie als gesetzt behandelt.

---

## 5. Aufgaben im Detail

### CC-1 · Copy-Datei mit Provenance und String-IDs

**Ziel.** Eine einzige kanonische Textquelle, gegen die der Webflow-Bau und die spätere QA prüfen können.

**Datei.** `_briefings/phase2-lightcreators/copy-lightcreators-home.md`

**Quelle.** Anhang A dieses Dokuments. Der Text ist bereits mit String-IDs und Provenance-Tags versehen. Nicht abtippen, nicht umformulieren, sondern übernehmen und in die unten beschriebene Dateistruktur bringen.

**Format pro Eintrag.**

```
### S1.H1
- provenance: HIS/EXISTING
- quelle: V3 §4
- element: Heading, Level 1
- dom-id: hero-headline
- text: |
    Finde, was nur du bist.
    Und bring es in die Welt.
```

**Regeln.**
- Genau ein Eintrag mit `element: Heading, Level 1` in der gesamten Datei. Das ist `S1.H1`. Jede Sektion 2 bis 9 bekommt genau ein `Heading, Level 2`.
- Zeilenumbrüche innerhalb einer Headline bleiben erhalten und werden als `<br>` gekennzeichnet, nicht als zwei Absätze.
- Typografie unangetastet lassen: deutsche Anführungszeichen, Gedankenstriche und die Pfeile in den CTA-Beschriftungen (`↓`, `→`, `↗`) bleiben, wie sie sind.
- Am Ende der Datei eine Tabelle mit allen String-IDs, ihrem Provenance-Tag und einer Spalte `status` mit den Werten `fest` oder `freigabe-offen`.

**Fertig, wenn.** Die Datei enthält jede Textzeile aus Anhang A genau einmal, die ID-Tabelle ist vollständig, und ein `grep` auf `Level 1` liefert genau einen Treffer.

---

### CC-2 · Symbol-Set exportieren und dokumentieren

**Ziel.** Die vier Symbole für Loslassen, Verbinden, Erkennen und Gestalten stehen dem Webflow-Strang in einer Form zur Verfügung, die dort ohne Nacharbeit hochgeladen werden kann.

**Verzeichnis.** `_briefings/phase2-lightcreators/symbole/`

**Vorgehen.**
1. Die vier bestehenden SVG im Repository suchen. Bekannter Dateiname aus der Aufgabenliste: `03-erkennen.svg`. Die drei Geschwisterdateien liegen nach demselben Muster (`01-loslassen`, `02-verbinden`, `04-gestalten`). Wenn ein Name abweicht, den tatsächlichen Fund im README festhalten statt umzubenennen.
2. Kopieren, nicht verschieben. Die Originale bleiben unangetastet an ihrem Platz, weil sie auf `davidliebnau.com` in Verwendung sind.
3. Pro Symbol zusätzlich ein PNG mit transparentem Hintergrund in doppelter Auflösung erzeugen, Kantenlänge 512 px. Das ist der Fallback, falls der SVG-Upload in Webflow Probleme macht.
4. `symbole-README.md` schreiben mit: Dateiliste, Originalpfad im Repository, verwendeten Farben, Viewbox-Maßen und der Alt-Text-Regel.

**Farbwerte, die dokumentiert werden müssen.** Der Goldverlauf ist derzeit nur als `linearGradient` innerhalb von `03-erkennen.svg` definiert und läuft von `#FFDB9D` nach `#A87D34`. Diese beiden Werte gehören ins README, damit der Webflow-Strang sie als Variablen anlegen kann. Ob der Verlauf auch in den anderen drei Symbolen vorkommt, beim Export prüfen und im README festhalten.

**Alt-Text-Regel, die ins README gehört.** Die vier Symbole stehen jeweils direkt neben ihrer Textbeschriftung („01 LOSLASSEN" und so weiter). Sie sind damit **dekorativ** und bekommen `alt=""`. Ein Alt-Text würde die Beschriftung doppeln und Screenreader-Nutzern denselben Inhalt zweimal vorlesen.

**Fertig, wenn.** Vier SVG, vier PNG, ein README. Alle SVG öffnen fehlerfrei. Die Originale im Repository sind unverändert.

---

### CC-3 · Bilder aufbereiten

**Ziel.** Ein Bildpaket, das der Webflow-Strang direkt hochladen kann, ohne im Designer nachzuschneiden.

**Verzeichnis.** `_briefings/phase2-lightcreators/bilder/`

> **Vorbedingung.** Diese Aufgabe startet erst nach Freigabepunkt **F4**. Bis dahin liegt kein Bildmaterial vor. Es wird kein Platzhalterbild erzeugt, kein Stockbild beschafft und kein Bild generiert.

**Zulieferung, die David erbringen muss.**

| Was | Umfang | Format | Anforderung |
|---|---|---|---|
| Hero-Collage | 4 bis 6 Bilder | JPG oder PNG, Langkante ≥ 2400 px | Echte Begegnung. Unterschiedliche Menschen und Situationen. David auf höchstens ein bis zwei Bildern. Kein Gruppenfoto als dominantes Einzelbild. |
| ~~Tribe-Portraits~~ | — | — | **Nicht in dieser Phase (R-G).** Portraits gehören zum separaten Tribe-Paket und werden dort aufbereitet. |
| Open-Graph-Bild | 1 Bild oder Motivwahl | dieselben Anforderungen | Darf **kein** Portrait einer Tribe-Person sein, solange keine gesonderte Freigabe für die Social-Media-Vorschau vorliegt |

**Aufbereitung.**

| Zweck | Zielmaße | Ausgabeformate | Benennung |
|---|---|---|---|
| Hero-Collage | Langkante 1600 px, zusätzlich 800 px | WebP (q 80) und AVIF (q 55) | `hero-collage-01.webp`, `-01@800.webp`, analog `.avif` |
| Open Graph | 1200 × 630 px, Zuschnitt aus dem Motiv | JPG (q 82) und WebP | `og-lightcreators-home.jpg` |

Farbprofil auf sRGB normalisieren. EXIF entfernen, insbesondere GPS-Daten — bei Portraits realer Personen ist das nicht optional. Keine Hautton- oder Gesichtsretusche.

**Manifest.** `bild-manifest.csv` mit den Spalten:

`dateiname, zweck, sektion, motivbeschreibung, alt_text_entwurf, alt_status, quelle, freigabe_vorhanden, freigabe_datum, freigabe_nachweis`

`alt_status` hat drei Werte: `dekorativ` (Alt-Text bleibt leer), `bedeutungstragend` (Alt-Text erforderlich), `offen`. `freigabe_vorhanden` ist `ja` oder `nein` — bei `nein` wird das Bild aufbereitet, aber im Manifest als gesperrt markiert und nicht ins Übergabepaket aufgenommen.

**Fertig, wenn.** Jedes gelieferte Bild hat einen Manifest-Eintrag, kein Eintrag hat `alt_status: offen`, und kein Bild mit `freigabe_vorhanden: nein` liegt im Übergabeordner.

---

### CC-4 · Analytics-Spezifikation und Snippets

**Ziel.** Eine Spezifikation, die der Webflow-Strang und das Plausible-Dashboard beide ohne Rückfragen umsetzen können.

**Dateien.**
- `_briefings/phase2-lightcreators/analytics-lightcreators-home.md`
- `_briefings/phase2-lightcreators/snippets/plausible-events.js`
- `_briefings/phase2-lightcreators/snippets/plausible-scroll.js`

**Eventtabelle, die in die Spezifikation gehört.** Schema `brand.page.object.action`, cookiefrei über Plausible.

| Route | Eventname | Ausgelöst durch |
|---|---|---|
| Hero-CTA „Die Idee entdecken ↓" | `light.home.hero.click` | Klick |
| Next Gen, Sektion Zwei Wege | `light.home.nextgen.click` | Klick |
| Next Gen, finale Einladung | `light.home.nextgenfinale.click` | Klick |
| Founders, Sektion Zwei Wege | `light.home.founders.click` | Klick |
| Founders, finale Einladung | `light.home.foundersfinale.click` | Klick |
| Tribe-Pfad „Menschen kennenlernen" | `light.home.tribe.click` | Klick |
| Scrolltiefe Recognition | `light.home.recognition.reach` | 40 % der Sektion sichtbar, einmal pro Seitenaufruf |
| Scrolltiefe Big Idea | `light.home.bigidea.reach` | dito |
| Scrolltiefe Tribe | `light.home.tribe.reach` | dito |
| Scrolltiefe Zwei Wege | `light.home.zweiwege.reach` | dito |

Zehn Eventnamen, keine Properties. `light.home.tribe.click` braucht keine Positionsvariante, weil der Tribe-Pfad nur in der finalen Einladung vorkommt.

**Nicht mehr in der Spezifikation:** `light.home.nav.click` entfällt — interne Navigationsklicks sind an den Seitenaufrufen der Zielseiten ablesbar und wären ohne Property nur als Sammelzahl brauchbar. `light.home.tribeperson.click` entfällt aus dieser Phase; die externen Portrait-Links laufen später über das eingebaute Plausible-Goal „Outbound Link: Click" und gehören ins separate Tribe-Paket (R-G). **⚠ Prüfpunkt für dieses Paket:** ob dieses Goal die Aufschlüsselung nach Ziel-URL auch auf Growth zeigt.

**Warum keine Properties (R-F).** Der Growth-Tarif unterstützt keine Custom Properties. Die frühere Variante mit `position=zweiwege` beziehungsweise `position=finale` entfällt vollständig. Die drei Properties `position`, `person` und `target`, die am 02.09.2026 versuchsweise im Plausible-Konto angelegt wurden, werden vor dem Tarifwechsel gelöscht — falls sie beim Schreiben der Spezifikation noch existieren, als offenen Punkt vermerken statt sie einzuplanen.

**Bindungsmechanik.** Die Elemente in Webflow bekommen Data-Attribute, keine Plausible-Klassennamen. Webflow-Klassennamen vertragen die Zeichen `=` und `.` nicht zuverlässig; Data-Attribute sind über die Element-Werkzeuge sauber setzbar und im Designer sichtbar.

Attributschema — genau zwei Attribute, keine Properties:
- `data-plausible-event="light.home.nextgen.click"` an jedem messbaren Klickziel
- `data-reach-event="light.home.recognition.reach"` an jeder der vier Sektionen mit Scrolltiefenmessung

**`snippets/plausible-events.js`** — delegierter Klick-Listener, unabhängig von Plausible-Skriptvarianten:

```js
document.addEventListener('click', function (e) {
  var el = e.target.closest('[data-plausible-event]');
  if (!el || typeof window.plausible !== 'function') return;
  window.plausible(el.dataset.plausibleEvent);
});
```

**`snippets/plausible-scroll.js`** — Scrolltiefe an den vier Übergängen, je Seitenaufruf einmal:

```js
(function () {
  if (!('IntersectionObserver' in window)) return;

  var targets = document.querySelectorAll('[data-reach-event]');
  if (!targets.length) return;

  var fired = {};
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var name = entry.target.dataset.reachEvent;
      if (fired[name]) return;
      fired[name] = true;
      if (typeof window.plausible === 'function') window.plausible(name);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.4 });

  targets.forEach(function (t) { observer.observe(t); });
})();
```

Die vier Sektionen tragen dafür `data-reach-event="light.home.recognition.reach"` und so weiter.

**Goal-Liste fürs Dashboard.** In die Spezifikation gehört die Liste der Ziele, die im Plausible-Dashboard **von Hand** angelegt werden müssen — Goals entstehen dort nicht automatisch aus eintreffenden Events. Es sind zehn eindeutige Eventnamen (die `position`-Varianten teilen sich jeweils einen Namen). Stand 02.09.2026 ist `light.home.hero.click` bereits angelegt; die übrigen neun fehlen noch. Die Spezifikation führt den Status je Goal in einer Spalte `goal_angelegt`.

**Domainübergreifendes Eventregister.** Weil Plausible jetzt auf beiden Domains läuft (Regel R-A), bekommt die Spezifikation einen zweiten Teil: ein Register **aller** Eventnamen über `davidliebnau.com` und `light-creators.com` hinweg, in einer Tabelle, mit Spalten `event`, `domain`, `seite`, `zweck`, `status` (`aktiv`, `geplant`, `stillgelegt`) und `goal_angelegt`. Grundlage sind die Events, die in diesem Repository bereits implementiert sind — vor dem Schreiben also den tatsächlichen Bestand im Code ermitteln, nicht aus dem Master-Briefing abschreiben. Das Präfix trägt die Domainzuordnung: `david.*` gegen `light.*`. Abschnitt 6.2 des Master-Briefings verlangt, Cross-Domain-Tracking sauber zu prüfen; dieses Register ist die Grundlage dafür und die einzige Stelle, an der beide Domains zusammen dokumentiert sind.

Widersprüche zwischen dem tatsächlichen Bestand und dem Schema werden im Register als solche ausgewiesen, nicht stillschweigend geglättet. Eine bestehende Abweichung ist eine Information, kein Fehler, der wegzuputzen wäre.

**Was nicht in die Spezifikation gehört.** Kein Vorschlag zum Meta Pixel. Der Pixel läuft site-weit auf `light-creators.com` und ist eine offene Entscheidung, keine technische Aufgabe. In der Spezifikation steht dazu nur ein Verweis auf **OD-1b**.

**Fertig, wenn.** Beide Snippets laufen ohne Konsolenfehler gegen eine lokale Testseite mit denselben Data-Attributen, in der Spezifikation ist jeder Eventname genau einmal definiert, und das domainübergreifende Register bildet den tatsächlichen Bestand ab.

---

### CC-5 · Alt-Text-Entwürfe

**Ziel.** Der Webflow-Strang muss beim Asset-Upload nicht improvisieren.

**Ergebnis.** Spalte `alt_text_entwurf` in `bild-manifest.csv` (siehe CC-3), plus ein kurzer Abschnitt im Manifest-README mit den angewandten Regeln.

**Regeln.**
- **Hero-Collage:** Die Collage als Ganzes trägt Bedeutung, das Einzelbild nicht. Ein Bild der Collage bekommt einen beschreibenden Alt-Text, der die Aussage der Gruppe trägt. Die übrigen bekommen `alt=""` und `role="presentation"`. Damit hören Screenreader-Nutzer eine Aussage statt fünf zusammenhanglose Bildbeschreibungen.
- **Tribe-Portraits:** nicht in dieser Phase (R-G). Die Regel bleibt für das spätere Tribe-Paket notiert: Alt-Text ist der Name der Person, ohne „Portrait von" oder „Foto von"; Rolle und Organisation stehen als Text daneben und werden nicht wiederholt.
- **Symbole:** `alt=""`, siehe CC-2.
- **Open-Graph-Bild:** braucht keinen Alt-Text im Sinne der Seite, aber eine Motivbeschreibung im Manifest.
- Kein Alt-Text nennt Attribute, die aus dem Bild nicht hervorgehen und die die Person nicht freigegeben hat.

---

### CC-6 · Linkprüfung und Redirect-Vorbereitung

**Ziel.** Kein Link von `davidliebnau.com` nach `light-creators.com` bricht, wenn sich dort die Struktur ändert.

**Datei.** `_briefings/phase2-lightcreators/linkreport-lightcreators.md`

**Vorgehen.**
1. Über das gesamte Repository nach `light-creators.com` suchen, in HTML, Markdown, JSON und JS. Auch nackte URLs ohne `https://` und ohne Anker-Tag erfassen — genau das ist der bekannte Fall.
2. Pro Fund erfassen: Datei, Zeile, Fundstelle im Kontext, Zielpfad, ob verlinkt oder reiner Fließtext, ob im generierten Bereich oder handgepflegt.
3. Den Zielpfad gegen den bekannten Bestand abgleichen. Bekannt vorhanden sind unter anderem `/`, `/quiz`, `/call`, `/quiz-en`, `/call-en`, `/en`, `/podcast`, `/buch`, `/impressum`, `/datenschutz`, `/abgs`.
4. Zwei Listen ausgeben: **stabil** (Ziel existiert und wird in Phase 2 nicht angefasst) und **gefährdet** (Ziel könnte sich ändern).

**Der bekannte kritische Fall.** In Episode 28 stehen im Fließtext die beiden nackten URLs `light-creators.com/quiz` und `light-creators.com/call`. Sie sind redaktioneller Inhalt und bleiben stehen. Beide Zielseiten existieren heute. In Phase 2 werden sie nicht umgebaut — der Umbau betrifft die Startseite. Damit sind sie zunächst **stabil**. Sie werden aber in den Bericht als Beobachtungspunkt aufgenommen, weil sie die einzigen beiden Stellen in den Episoden sind, die bei einer späteren Slug-Änderung brechen.

**Regel.** Claude Code ändert `ep-28` in Phase 2 **nicht**. Der Bericht ist die Vorbereitung. Ein Korrektur-Commit entsteht nur, wenn der Webflow-Strang nach dem Publish eine tatsächliche Pfadänderung zurückmeldet, und dann als isolierter Commit, der einzeln zurücknehmbar ist.

**Zusätzlich prüfen.** Ob in `podcast.html` oder in den Episodenseiten Links auf die alte Founder-Startseite `light-creators.com/` zeigen, die nach dem Relaunch inhaltlich etwas anderes ausliefert. Das ist kein technischer Bruch, aber ein redaktioneller: Ein Link, der „hier findest du das Founder Resonance Assessment" verspricht und auf einen Marken-Hub führt, ist ein gebrochenes Versprechen. Solche Fälle in eine dritte Liste **inhaltlich zu prüfen** aufnehmen.

---

### CC-7 · Founder-Material inventarisieren

**Ziel.** Klarheit darüber, was für Phase 3 bereitliegt — ohne dass in Phase 2 etwas davon verwendet wird.

**Datei.** `_briefings/phase2-lightcreators/founder-material-inventar.md`

**Umfang.**
- `_archiv/founder-resonance-bloecke.html` strukturell erfassen: welche Blöcke enthalten sind, aus welcher Quelldatei sie stammen, in welchem Zustand sie sind. Bekannt sind die fünf Resonance-Faktoren, der Resonance Gap, das Founder Resonance Assessment und die Hero-Zeile „Das Update, das alle anderen Updates erst möglich macht".
- Die drei brachliegenden Bilder `role-entrepreneur.webp`, `role-manager.webp`, `role-expert.webp` erfassen: Maße, Dateigröße, Motiv, aktueller Verwendungsort.

**Bewertung, die in den Bericht gehört.** Die drei Rollenbilder sind für die Hero-Collage der Phase 2 **nicht geeignet**. Die Collage verlangt echte Begegnung zwischen Menschen; Rollenbilder aus einer Founder-Segmentierung transportieren das Gegenteil und würden zusätzlich die Produktsegmentierung in den ersten Screen zurückholen, die dort ausdrücklich nicht hingehört. Diese Bewertung als Empfehlung formulieren, nicht als Entscheidung.

**Regel.** Nichts aus `_archiv/` wird in Phase 2 aufbereitet, kopiert oder übergeben. Migration ist Bestandteil des Phase-3-Rebuilds und kein eigener Task.

---

### CC-8 · Übergabepaket

**Datei.** `_briefings/phase2-lightcreators/UEBERGABE.md`

**Inhalt.** Eine Tabelle mit allen erzeugten Dateien, ihrem Zweck, ihrem Status (`fertig`, `wartet auf Zulieferung`, `gesperrt`) und dem Freigabepunkt, ab dem sie gültig sind. Dazu eine Liste dessen, was **nicht** geliefert werden konnte, mit Begründung. Ein leeres Feld ist kein Ergebnis; eine benannte Lücke schon.

---

## 6. Arbeitsschritte in Abhängigkeitsreihenfolge

Freigabepunkte sind mit **F** nummeriert. An jedem F entscheidet David, bevor weitergebaut wird. Ohne Entscheidung wird der nachfolgende Schritt nicht begonnen.

| Schritt | Was | Abhängig von | Strang |
|---|---|---|---|
| S0 | Bestandsaufnahme Webflow und Repository | — | beide · **erledigt** |
| **S-P0** | Plausible eingebunden und gegengeprüft (R-V). Offen: Publish im Designer, neun Goals | S0 | **teilweise erledigt** |
| P1 | Phase-1-Review und Publish | — | **David · läuft parallel** |
| S1 | CC-6 Linkbericht, CC-7 Founder-Inventar | S0 | Claude Code |
| S2a | CC-2 Symbol-Set, CC-1 Copy-Datei (CTA-Linkziele als markierte Leerstellen), CC-4 Analytics-Spezifikation und Eventregister | S1 | Claude Code · **läuft vor F1** |
| **F1** | **Erteilt am 03.09.2026** (R-H bis R-K). Offen bleibt allein der Meta Pixel (OD-1b) — er hält nichts auf. | S1 | **erledigt** |
| S2b | Leerstellen aus S2a schließen: CTA-Linkziele in die Copy-Datei eintragen | F1, S2a | Claude Code |
| **F2** | **Erteilt am 03.09.2026** (R-L bis R-R). | S2b | **David** |
| ~~S3~~ | ~~Tribe-Collection anlegen~~ — **vertagt in das separate Tribe-Paket (R-G)** | — | — |
| ~~S4~~ | ~~Zulieferung Tribe-Personen und Freigaben~~ — **Teil des Tribe-Pakets** | — | — |
| ~~F3~~ | ~~Tribe-Gate~~ — **Teil des Tribe-Pakets** | — | — |
| S5 | Bildzulieferung Hero-Collage und OG-Motiv (keine Portraits) | F1 | **David** |
| **F4** | **Bildabnahme: welche 4–6 Collagenbilder, welcher Zuschnitt, welches OG-Motiv** | S5 | **David** |
| T0 | Zulieferung der Tribe-Bausteine durch David | — | **David · offen, außerhalb dieser Sequenz** |
| S6 | CC-3 Bildaufbereitung, CC-5 Alt-Texte | F4 | Claude Code |
| S7 | Webflow-Bau Sektionen 1 bis 9, Assets, CMS-Bindung, Data-Attribute | F2, S6 | Webflow |
| **F5** | **Vorschau-Abnahme Desktop und Mobil** | S7 | **David** |
| S8 | QA-Läufe: Accessibility, SEO, Links, Events, Mobile-Länge | F5 | Webflow |
| **F6** | **Publish-Freigabe und Homepage-Tausch — nur wenn Phase 1 live ist (R-D)** | S8, **P1** | **David** |
| S9 | Publish, Post-Release-Prüfung, Baseline notieren | F6 | Webflow und Designer |
| S10 | CC-8 Übergabeprotokoll abschließen, eventueller `ep-28`-Korrektur-Commit | S9 | Claude Code |

---

## 7. Was in dieser Phase ausdrücklich nicht getan wird

1. Keine Änderung an einer bestehenden Seite von `davidliebnau.com`.
2. Kein Umbau von `podcast.html` — die Seite ist strukturell weiterhin eine Founder-Landingpage, das ist ein eigenes Thema.
3. Keine Änderung an `generate-episodes.js` und keine Generatorläufe. Die Sperre bleibt, wie sie ist.
4. Keine Migration der Founder-Blöcke aus `_archiv/`. Das ist Phase 3 und dort Teil des Rebuilds, nicht ein Kopiervorgang.
5. Keine Vereinheitlichung der Design-Tokens und kein Heben des Goldverlaufs ins CSS. Der Verlauf wird für Phase 2 nur **dokumentiert**.
6. Keine englischen Fassungen.
7. Keine Threshold-Themen, keine Wegfinder-Arbeit, keine Preisangaben.
8. Keine erfundenen Tribe-Personen, keine erfundenen Zitate, keine Platzhalterportraits, keine generierten Gesichter, keine Mitgliederzahlen, keine Termine.
8a. **Keine Vorarbeit am Tribe-CMS (R-G):** kein CSV-Importschema, keine Portrait-Aufbereitung, keine Feldliste, kein Freigabe-Formular. Das Paket kommt von David und wird dann gegen seine Vorgaben gebaut, nicht gegen unsere Vorwegnahme.
9. Keine Beschaffung von Stockmaterial und keine KI-Montage von David in Szenen, an denen er nicht war.
10. Keine Entscheidung über Markenarchitektur, Produktnamen, Tribe-Mitgliedschaft oder eine neue primäre CTA-Logik. Solche Punkte gehen als OPEN DECISION zurück.

---

## 8. OPEN DECISIONS

Diese Punkte werden nicht still entschieden. Sie stehen hier, damit Claude Code sie beim Bau der Zulieferungen als offen behandelt und keine Annahme einbaut.

| ID | Offene Entscheidung | Warum sie hier auftaucht | Blockiert |
|---|---|---|---|
| ~~OD-1a~~ | ~~Cookiefreies Analytics auf `light-creators.com`~~ | **Entschieden 02.09.2026 → Regel R-A.** Plausible wird eingebunden. | — |
| **OD-1b** | **Meta Pixel auf `light-creators.com`.** Im Site-Head läuft ein Meta Pixel (`fbq init`, PageView) — ein cookiesetzender Drittanbieter-Tracker ohne erkennbaren Einwilligungsmechanismus. Optionen: entfernen, hinter eine Einwilligung legen, oder behalten und in der Datenschutzerklärung abbilden. | Betrifft die Analytics-Spezifikation und die Rechtsseiten. Blockiert die Plausible-Einbindung nicht. | F1 |
| ~~OD-2a~~ | ~~Grundsatzentscheidung zur heutigen Startseite~~ | **Entschieden → Regel R-B**, abgeleitet aus Phase 3 und der Backlog-Regel „Now" des Master-Briefings. | — |
| ~~OD-2b~~ | ~~Interim-Pfad~~ — **entschieden, R-H** (`/founder`, indexiert, kein 301 von `/`). Ursprünglich: **Interim-Pfad der alten Startseite.** Welcher Slug, und bleibt die Seite bis Sprint C indexiert? Für den Linkbericht ist das der einzige noch offene Punkt. | Bestimmt die Redirect-Liste und die dritte Liste im Linkbericht | S1, F1 |
| ~~OD-3~~ | ~~Zieladresse des Next-Gen-CTA~~ — **entschieden, R-I.** Ursprünglich: **Zieladresse des Next-Gen-CTA.** Auf der Site existieren drei Flourishing-Life-Seiten (Hauptseite, „Für Dich", „Für Eltern"). Welche ist das Ziel — oder braucht es eine neue Übersichtsseite? | Wird als Linkziel im Copy-Dokument gebraucht | F1 |
| ~~OD-4~~ | ~~Zieladresse des Founders-CTA~~ — **entschieden, R-I** (`/founder`). Ursprünglich: **Zieladresse des Founders-CTA,** solange Phase 3 nicht gebaut ist. Kandidaten: `/quiz`, `/call`, `/en`, oder die verschobene alte Startseite. | dito | F1 |
| **OD-5** | **Der Tribe-Pfad „Ich möchte die Menschen kennenlernen →".** Anker auf derselben Seite oder eigene `/tribe`-Seite? | Bestimmt, ob `light.home.tribe.click` ein Seitenwechsel oder ein Sprung ist | F1 |
| **OD-6** | **Öffentliche Bezeichnung für „Next Gen".** Der Arbeitsbegriff steht so im V3-Dokument. Ob er auch die öffentliche Beschriftung wird, ist im Master-Briefing ausdrücklich offen. | Betrifft Copy-Strings `S6.NG.*` und die Navigation | F2 |
| ~~OD-7~~ | **entschieden, R-N.** Urspruenglich: **Navigation.** Der Vorschlag lautet „Manifest · Tribe · Next Gen · Founders · About". Eine About-Seite existiert auf `light-creators.com` nicht. | Betrifft die Informationsarchitektur und interne Links | F2 |
| ~~OD-8~~ | **entschieden, R-R.** Ursprünglich: **Reihenfolge der zwei Wege auf Mobil.** Nebeneinander sind sie gleichwertig; gestapelt ist die obere Karte bevorzugt. Es gibt keine neutrale Lösung, nur eine bewusste. | Betrifft die Mobile-Regel für Sektion 6 | F2 |
| ~~OD-9~~ | **entschieden, R-S bis R-U.** Ursprünglich: **Design-System für Light Creators.** Die Symbolfarbe ist mit R-K vorentschieden. Offen bleibt: Eigene Tokens und Typografie oder Übernahme von `davidliebnau.com`. Betrifft auch, ob die Symbolfarben angepasst werden. | Betrifft CC-2 und den gesamten Webflow-Bau | F2 |
| ~~OD-10~~ | **entschieden, R-P und R-Q.** Ursprünglich: **SEO-Title, Meta Description und Open-Graph-Text.** Im V3-Dokument nicht enthalten, daher **NEW**. | Betrifft Seiteneinstellungen | F2 |
| **OD-11** | **Tribe-Mitgliedschaft, Governance und Aufnahmelogik.** Die Copy fragt „Und vielleicht magst auch du in den Kreis kommen?" — ohne dass ein Weg dahinter definiert ist. | Muss vor dem Publish beantwortet oder die Zeile angepasst werden | F5 |
| **OD-12** | **Verhältnis zur bestehenden `Testimonials`-Collection.** Empfehlung: getrennt lassen, weil der Tribe kein Social Proof ist. Entscheidung liegt bei David. | Betrifft das CMS-Datenmodell | S3 |

---

## Anhang A · Vollständige Copy mit String-IDs und Provenance

Quelle: „Light Creators Tribe · Briefing Website-Update V3". Alle Texte **HIS/EXISTING**, sofern nicht anders markiert. Wörtlich übernehmen.

### Sektion 1 · Hero

| ID | Element | Text |
|---|---|---|
| `S1.EYEBROW` | Eyebrow, kein Heading | LIGHT CREATORS · **REWRITTEN (R-M)** |
| `S1.H1` | Heading Level 1 | Finde, was nur du bist.<br>Und bring es in die Welt. |
| `S1.LEAD1` | Absatz | Es gibt etwas in jedem Menschen, das sich nicht kopieren lässt. Eine eigene Art zu sehen, zu fühlen, zu denken, Beziehungen zu gestalten und Dinge zu erschaffen. |
| `S1.LEAD2` | Absatz | Light Creators ist eine Einladung, dem Eigenen näherzukommen – und daraus etwas in die Welt zu bringen. |
| `S1.ORIENT` | Absatz, optional | Für Menschen, die ihren Weg suchen. Und für Menschen, die bereits etwas Eigenes aufbauen. |
| `S1.CTA` | Link, Sprung zu `#recognition` | Die Idee entdecken ↓ |

### Sektion 2 · Recognition

| ID | Element | Text |
|---|---|---|
| `S2.H2` | Heading Level 2 | Vielleicht kennst du diesen Moment. |
| `S2.P1` | Absatz | Du funktionierst. Du gehst einen Weg. Vielleicht sogar einen ziemlich erfolgreichen. |
| `S2.P2` | Absatz | Und trotzdem taucht irgendwann eine Frage auf: |
| `S2.P3` | Absatz, hervorgehoben | Was davon ist eigentlich wirklich meins? |
| `S2.P4` | Absatz | Vielleicht stehen dir so viele Möglichkeiten offen, dass keine davon wirklich nach dir klingt. |
| `S2.P5` | Absatz | Vielleicht hast du längst etwas aufgebaut – und merkst, dass Erfolg allein die nächsten Fragen nicht beantwortet. |
| `S2.P6` | Absatz | Vielleicht weißt du nur: So wie bisher soll es nicht einfach weitergehen. |
| `S2.H3A` | Heading Level 3 | Wir leben in einer Welt voller Antworten. |
| `S2.P7` | Absatz | Karriere­wege. Meinungen. Vorbilder. Erfolgsmodelle. Content. Und zunehmend Antworten, die Maschinen in Sekunden für uns erzeugen können. |
| `S2.P8` | Absatz | Umso wertvoller wird etwas, das niemand für uns erzeugen kann: |
| `S2.P9` | Absatz, hervorgehoben | die eigene Wahrnehmung. |
| `S2.Q1` | Listenpunkt | Wer bin ich? |
| `S2.Q2` | Listenpunkt | Was erfüllt mich mit Schaffensfreude? |
| `S2.Q3` | Listenpunkt | Wofür will ich einen Beitrag leisten? |
| `S2.Q4` | Listenpunkt | Was ist mein nächster eigener Schritt? |
| `S2.P10` | Absatz | Ein Light Creator wartet nicht auf den perfekten Lebensplan. Er macht Erfahrungen. Beobachtet. Lauscht. Lernt. Verwirft. Beginnt neu. |
| `S2.P11` | Absatz | So wird aus Suchen Finden. Und aus Finden Gestaltung. |

### Sektion 3 · Big Idea

| ID | Element | Text |
|---|---|---|
| `S3.H2` | Heading Level 2 | Du musst nichts beweisen, um etwas zu erschaffen. |
| `S3.P1` | Absatz | In dir gibt es eine Weite, eine Stille und schöpferische Intelligenz, die bereits da ist. |
| `S3.P2` | Absatz | Dein Wert beginnt nicht mit deinem nächsten Erfolg. Du musst dich nicht erst optimieren, bis du irgendwann gut genug bist, etwas Bedeutendes zu tun. |
| `S3.P3` | Absatz | Schöpferkraft braucht keinen inneren Mangel als Treibstoff. |
| `S3.H3A` | Heading Level 3 | Das heißt nicht, weniger zu wollen. |
| `S3.P4` | Absatz | Wir wollen Ideen verwirklichen. Unternehmen aufbauen. Wohlstand schaffen. Technologie nutzen. Menschen erreichen. Wirkung entfalten. |
| `S3.P5` | Absatz | Uns interessiert nur eine zweite Frage genauso sehr: |
| `S3.P6` | Absatz, hervorgehoben | Was entsteht dabei – in uns, zwischen uns und durch uns? |
| `S3.Q1` | Listenpunkt | Welche Menschen werden dadurch stärker? |
| `S3.Q2` | Listenpunkt | Welche Beziehungen entstehen? |
| `S3.Q3` | Listenpunkt | Welche Zukunft wird wahrscheinlicher? |
| `S3.P7` | Absatz | Erfolg und Verbundenheit sind für uns keine Gegensätze. |
| `S3.P8` | Absatz | Vielleicht beginnt eine andere Art zu gestalten genau dort: nicht aus dem Gefühl, noch nicht genug zu sein – sondern aus Freude, Neugier, Liebe und Lust am Erschaffen. |

### Sektion 4 · Schöpferische Dialoge

| ID | Element | Text |
|---|---|---|
| `S4.H2` | Heading Level 2 | Schöpferkraft beginnt mit Verbindung. |
| `S4.P1` | Absatz | Das Eigene entsteht nicht durch noch mehr Input. Oft braucht es zuerst Raum. Dann Beziehung. Dann Wahrnehmung. Und schließlich den Mut, aus dem Erkannten etwas zu machen. |
| `S4.01.NUM` | Label | 01 |
| `S4.01.H3` | Heading Level 3 | LOSLASSEN |
| `S4.01.P` | Absatz | Raum schaffen. Nicht sofort wissen müssen. |
| `S4.02.NUM` | Label | 02 |
| `S4.02.H3` | Heading Level 3 | VERBINDEN |
| `S4.02.P` | Absatz | Mit dir selbst, anderen Menschen und dem Leben in Beziehung kommen. |
| `S4.03.NUM` | Label | 03 |
| `S4.03.H3` | Heading Level 3 | ERKENNEN |
| `S4.03.P` | Absatz | Wahrnehmen, was wirklich deins ist – und was entstehen will. |
| `S4.04.NUM` | Label | 04 |
| `S4.04.H3` | Heading Level 3 | GESTALTEN |
| `S4.04.P` | Absatz | Erkenntnis in Erfahrungen, Entscheidungen und konkrete Schritte übersetzen. |

### Sektion 5 · Der reale Tribe

| ID | Element | Text |
|---|---|---|
| `S5.H2` | Heading Level 2 | Menschen, mit denen Zukunft entsteht. |
| `S5.P1` | Absatz | Große Dinge entstehen selten allein. |
| `S5.P2` | Absatz | Light Creators lebt in Beziehungen zwischen Menschen, die unterschiedlich sehen, denken und gestalten – und sich gerade dadurch ermöglichen, etwas Neues zu erkennen und in die Welt zu bringen. |
| `S5.P3` | Absatz | Ein kuratierter Kreis von Menschen begleitet, prägt und verkörpert diese Idee bereits heute. |
| `S5.P4` | Absatz — **Prüfen gegen OD-11** | Und vielleicht magst auch du in den Kreis kommen? |
| `S5.LABEL.A` | Label über Stimme A | *(im V3-Dokument nicht als sichtbarer Text vorgesehen; Stimme A steht ohne Label)* |
| `S5.LABEL.B` | Label über Stimme B | Was mich mit Light Creators verbindet: |
| `S5.LINK` | Muster der Linkbeschriftung | `<Vorname>s Arbeit entdecken ↗` |

Alle Personendaten sind **Zulieferung David**. Es werden keine Beispielpersonen übernommen; „Anna Mustermann" aus dem V3-Dokument ist ein Formatbeispiel und darf nicht in eine Datei geraten, die später importiert wird.

### Sektion 6 · Zwei Wege

| ID | Element | Text |
|---|---|---|
| `S6.H2` | Heading Level 2 | Wo stehst du gerade? |
| `S6.P1` | Absatz | Light Creators verbindet nicht Menschen, weil sie im selben Alter sind oder dasselbe tun. |
| `S6.P2` | Absatz | Sondern weil sie vor derselben schöpferischen Aufgabe stehen – an unterschiedlichen Punkten ihres Weges. |
| `S6.NG.EYEBROW` | Label | ICH SUCHE, WAS MEINS IST |
| `S6.NG.H3` | Heading Level 3 | Vom Suchen zum Finden. |
| `S6.NG.P1` | Absatz | Vielleicht stehen dir viele Wege offen – aber keiner fühlt sich wirklich nach deinem an. |
| `S6.NG.P2` | Absatz | Vielleicht bist du zwischen Schule, Studium, Beruf oder einer nächsten Entscheidung. |
| `S6.NG.P3` | Absatz | Du musst heute nicht wissen, wie dein ganzes Leben aussehen soll. |
| `S6.NG.P4` | Absatz | Aber du kannst anfangen herauszufinden, was wirklich deins ist – und den nächsten Schritt erleben statt nur über ihn nachzudenken. |
| `S6.NG.TAGS` | Schlagwortzeile | Orientierung · eigene Stärken · Erfahrungen · Übergänge · Mut · nächste Schritte |
| `S6.NG.CTA` | Link → `/the-art-and-practice-of-a-flourishing-life` (R-I) | Die Next-Gen-Welt entdecken → |
| `S6.FO.EYEBROW` | Label | ICH BRINGE BEREITS ETWAS IN DIE WELT |
| `S6.FO.H3` | Heading Level 3 | Vom Founder zum bewussten Unternehmer. |
| `S6.FO.P1` | Absatz | Du hast bereits angefangen. |
| `S6.FO.P2` | Absatz | Eine Idee wurde ein Unternehmen. Entscheidungen betreffen plötzlich nicht mehr nur dich. Menschen, Geld, Verantwortung und Wachstum kommen hinzu. |
| `S6.FO.P3` | Absatz | Und irgendwann reicht die Frage „Wie bekomme ich das größer?" nicht mehr. |
| `S6.FO.P4` | Absatz | Es entsteht eine zweite: |
| `S6.FO.P5` | Absatz, hervorgehoben | Wie will ich das führen, was ich geschaffen habe – ohne mich selbst darin zu verlieren? |
| `S6.FO.TAGS` | Schlagwortzeile | Führung · Beziehung · Klarheit · Geld · Einfluss · Verantwortung · Wachstum |
| `S6.FO.CTA` | Link → `/founder` (R-H) | Founder Resonance entdecken → |

### Sektion 7 · LIGHT · CREATORS · TRIBE

| ID | Element | Text |
|---|---|---|
| `S7.H2` | Heading Level 2 | LIGHT · CREATORS · TRIBE |
| `S7.A.H3` | Heading Level 3 | LIGHT |
| `S7.A.P` | Absatz | weil etwas in uns sichtbar werden kann, das vorher noch keine Form hatte. |
| `S7.B.H3` | Heading Level 3 | CREATORS |
| `S7.B.P` | Absatz | weil wir unser Leben und unsere Welt nicht nur konsumieren, sondern mitgestalten. |
| `S7.C.H3` | Heading Level 3 | TRIBE |
| `S7.C.P` | Absatz | weil etwas zwischen Menschen entstehen kann, das keiner allein hervorgebracht hätte. |

Hinweis zu `S7.H2`: Im V3-Dokument ist die Sektionsüberschrift nicht ausformuliert; der Sektionstitel dient als Überschrift. Sie ist damit **NEW · FREIGABE OFFEN**. Alternative: die Sektion trägt eine visuell versteckte H2 und die drei Wörter erscheinen als große Gestaltungselemente.

### Sektion 8 · Manifest

| ID | Element | Text |
|---|---|---|
| `S8.H2` | Heading Level 2 | Wofür wir antreten |
| `S8.L1` | Zeile, hervorgehoben | Wir glauben, dass in jedem Menschen etwas liegt, das sich nicht kopieren lässt. |
| `S8.L2` | Zeile | Wir wollen still genug werden, um es wahrzunehmen. |
| `S8.L3` | Zeile | Wir glauben, dass Klarheit nicht immer durch mehr Denken entsteht, sondern auch durch Erfahrung. |
| `S8.L4` | Zeile | Wir wollen nicht nur konsumieren, was andere geschaffen haben, sondern selbst Wirklichkeit entstehen lassen. |
| `S8.L5` | Zeile | Wir glauben, dass Erfolg und Menschlichkeit keine Gegensätze sind. |
| `S8.L6` | Zeile | Wir wollen Unternehmen, Projekte und Beziehungen schaffen, die Leben ermöglichen statt verbrauchen. |
| `S8.L7` | Zeile | Wir glauben, dass große Dinge selten allein entstehen. |
| `S8.L8` | Zeile, Abschluss hervorgehoben | Und wir wollen unsere Schöpferkraft nicht dafür verwenden, ausgetretenen Pfaden besser zu folgen – sondern das in die Welt bringen, was nur durch uns entstehen kann. |

### Sektion 9 · Finale Einladung

| ID | Element | Text |
|---|---|---|
| `S9.H2` | Heading Level 2 | Was willst du in die Welt bringen? |
| `S9.P1` | Absatz | Vielleicht suchst du gerade erst. |
| `S9.P2` | Absatz | Vielleicht hast du längst angefangen. |
| `S9.P3` | Absatz | Vielleicht stehst du zwischen etwas, das nicht mehr trägt, und etwas Neuem, das noch keine Form hat. |
| `S9.P4` | Absatz | Der nächste Schritt muss nicht perfekt sein. Aber er kann deiner sein. |
| `S9.CTA1` | Link → wie `S6.NG.CTA` (R-I) | Ich suche meinen Weg → |
| `S9.CTA1.SUB` | Unterzeile | Next Gen |
| `S9.CTA2` | Link → wie `S6.FO.CTA` (R-H) | Ich baue etwas auf → |
| `S9.CTA2.SUB` | Unterzeile | Founder Resonance |
| `S9.CTA3` | Link → Sprungmarke `#tribe` (R-I) | Ich möchte die Menschen kennenlernen → |
| `S9.CTA3.SUB` | Unterzeile | Tribe |

### Navigation

| ID | Element | Text | Status |
|---|---|---|---|
| `NAV.1` | Navigationslink, Sprungmarke `#manifest` | Manifest | festgelegt, R-N |
| `NAV.2` | Navigationslink, Sprungmarke `#tribe` | Tribe | festgelegt, R-N |
| `NAV.3` | Aufklappmenue, kein Link | Wege | **NEW**, festgelegt, R-N |
| `NAV.3a` | Eintrag im Aufklappmenue, Ziel Flourishing-Uebersicht | Next Gen | festgelegt, R-N und R-O |
| `NAV.3b` | Eintrag im Aufklappmenue, Ziel `/founder` | Founders | festgelegt, R-N |
| ~~`NAV.5`~~ | ~~About~~ | — | **gestrichen, R-N** |

---

*Ende des Briefings für Claude Code. Gegenstück: `_briefings/phase2-lightcreators-webflow.md`.*
