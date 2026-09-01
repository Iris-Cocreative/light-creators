# Briefing: Phase 1 – Bestehende Conversionpfade scharf machen

Stand: 01. September 2026. Grundlage: Phase-1-Punkte 1A–1D aus der strategischen Roadmap, aufsetzend auf der stabilen Phase-0-Baseline.

> Ablage: Im Briefing war `_briefings/2026-09_phase1-threshold-proof-seo.md` vorgeschlagen.
> Abgelegt wurde nach der bestehenden Repo-Konvention in `briefing/`, damit alle
> Briefings an einem Ort liegen. Inhalt unverändert.

---

## Strategische Entscheidungen

Die folgenden fünf Entscheidungen zu 1A (Threshold-Angebotslogik) sind Empfehlungen auf Basis von Conversion- und Vertriebslogik für hochpreisige Coaching-/Retreat-Programme. Sie sind nicht abgestimmt. David kann jede davon vor der Umsetzung ändern.

1. **Warteliste bei ausgebuchtem Termin.** Ein einfaches Formular (Name, E-Mail, optionale Nachricht), das eine Benachrichtigung an David auslöst. Keine automatisierte Wartelisten-Logik oder CRM-Anbindung in dieser Phase. Begründung: Bei einer noch kleinen Pilotkohorte lohnt sich Automatisierung nicht. Die persönliche Nachfrage durch David stärkt bei einem hochpreisigen Wildnisprogramm eher Vertrauen als ein automatisierter Prozess.

2. **Interesse an einem späteren Termin.** Gleicher Formularweg wie die Warteliste, aber mit einer Auswahl ("aktueller Termin ist ausgebucht" / "aktueller Termin passt zeitlich nicht"), die zu unterschiedlichen Bestätigungstexten führt. Begründung: Die Person soll sich in ihrer konkreten Situation wiederfinden statt eine generische Absage zu bekommen. Das kostet technisch nichts extra, senkt aber die Absprungwahrscheinlichkeit bei einem Premium-Angebot.

3. **Institutionelle Nachfrage.** Eigener Anfragepfad mit kurzem Qualifizierungsformular (Organisation, Ansprechperson, ungefähre Gruppengröße, Zeitrahmen, Nachricht) statt direkter Kalenderbuchung. Begründung: Institutionelle Käufe (Kohorte, Inhouse, Kooperation) sind Beziehungsvertrieb, kein Self-Service. Eine direkte Buchungsoption würde entweder unqualifizierte Anfragen produzieren oder ein potenziell großes Geschäft in ein Standardformat zwingen.

4. **Preislogik nach dem Piloten.** Empfehlung zur Logik, nicht zu einer Zahl. Der Wechsel von "Einführungspreis" auf den Standardpreis wird an den Abschluss der Pilotkohorte gekoppelt, nicht an ein Kalenderdatum, und bleibt – wie bereits festgelegt – ausschließlich im Investitionsblock der Threshold-Seite sichtbar. Begründung: Der Trigger sollte an einem echten Meilenstein hängen, nicht an einem willkürlichen Stichtag, sonst wirkt die Frühphase künstlich verlängert oder zu früh beendet.

5. **Inhouse-/Kooperationsvariante.** Anbieten, aber vorerst ohne eigene Landingpage. Interesse an Kohorte/Inhouse/Kooperation läuft über denselben Anfragepfad wie Punkt 3, mit einer zusätzlichen Auswahlmöglichkeit im Formular. Begründung: Erst Nachfrage über echte Gespräche validieren, bevor Produktionsaufwand in eine eigene Seite fließt – dieselbe "erst validieren, dann bauen"-Logik, die die Roadmap an anderer Stelle für Wegfinder ansetzt.

---

## 1. Threshold vollständig kaufbar machen

**Ausgangslage prüfen.** Vor der Umsetzung den aktuellen Stand der Threshold-Seite(n) im Repo durchgehen: existiert bereits ein Formular-Handling? Haben die Buttons (Bewerbungsgespräch, Partnerschaftsanfrage) schon Zieladressen? Diese waren zuletzt offen. Nichts annehmen, was nicht im Code steht.

**Vier Pfade bauen.** Auf der Threshold-Seite und auf `/threshold/partner/` vier sichtbare, unterscheidbare nächste Schritte einbauen:

- INDIVIDUAL, Termin frei → bestehender Weg zu Bewerbungsgespräch (Zieladresse zuerst klären, siehe oben)
- AUSGEBUCHT → Warteliste-Formular (Entscheidung 1)
- TERMIN PASST NICHT → gleicher Formularweg mit Situationsauswahl (Entscheidung 2)
- INSTITUTION / SPONSOR → eigener Anfragepfad inklusive Inhouse-Checkbox (Entscheidungen 3 und 5)

Deutsch und Englisch identisch umsetzen, durchgängig in Du-Form, auch in den Formulartexten.

**Formulare.** Prüfen, ob im Repo bereits ein Formulardienst genutzt wird (z. B. an anderer Stelle für Wegfinder). Wenn ja, denselben Dienst verwenden. Wenn nein, leichteste Lösung wählen (z. B. mailto-Fallback), kein neues Tool ohne Rücksprache einführen. Bestätigungstexte pro Pfad unterschiedlich formulieren, kein generischer Text für alle vier.

**Preis-Konstante einhalten.** In keinem der vier Formulare, Bestätigungstexte oder Follow-up-Mails den Threshold-Preis nennen. Wo Kosten relevant sind: "Einführungspreis" bzw. "Kosten im Gespräch" (Institution-Pfad), mit Verweis auf den Investitionsblock der Threshold-Seite. Die Preisänderung nach dem Piloten (Entscheidung 4) ist nicht Teil dieses Sprints.

**Rechtlicher Vorbehalt.** Formulare dürfen live gehen, dürfen aber nirgends den Eindruck einer verbindlichen Buchung erwecken, solange AGB-Anwaltsprüfung und Bestätigung der Betriebshaftpflicht (Baloise) für die Wildnisaktivitäten offen sind. Beim INDIVIDUAL-Pfad mit Termin sicherstellen, dass der Text klar "unverbindliches Bewerbungsgespräch" kommuniziert.

**Done when:** Jeder der vier Nachfragezustände hat einen sichtbaren, funktionierenden nächsten Schritt, auf Deutsch und Englisch, ohne Preisnennung außerhalb des Investitionsblocks, ohne Eindruck einer verbindlichen Buchung.

---

## 2. Corporate Proof auf der Führen-Seite ergänzen

**Auswahlkriterien für die LinkedIn-Empfehlungen** (Wortlaut liefert David, hier nur die Kriterien):

- Personen in Entscheidungsposition (Vorstand, Geschäftsführung, HR-Leitung), passend zur Zielgruppe der Seite.
- Konkreter Bezug zu einem Ergebnis oder einer Situation (Krise, Transformation, Übergang), kein allgemeines Lob.
- Mindestens eine Empfehlung sollte den Award-Kontext (R2-Regel) organisch tragen können, ohne wie ein Rechtstext zu wirken.

⚠ Wortlaut, Namen und Rollen liefert David. Nicht erfinden, keine Platzhaltertexte einbauen, die wie echte Zitate aussehen.

**Platzierung.** Keine Testimonial-Wand am Seitenende. Aktuellen Aufbau von `/fuehren/` im Repo durchgehen und die Absätze identifizieren, zu denen jeweils eine Empfehlung inhaltlich passt. Empfehlung als kurzes Zitat-Element direkt im oder unmittelbar nach dem passenden Absatz platzieren. Für `/fuehren/en/` denselben Aufbau vorbereiten, mit Platzhalter bis zur Übersetzung.

**Technische Umsetzung der R2-Regel.** Ein wiederverwendbares Snippet oder eine CSS-Klasse bauen (z. B. `.award-context`), das den vollständigen Rollen-Satz automatisch mitführt, sobald der Award in einem Zitat erwähnt wird. Ziel: Die Regel kann nicht durch nachträgliches Kürzen eines Zitats verletzt werden, auch nicht bei später hinzugefügten Zitaten.

**Platzhalter bis Wortlaut vorliegt.** Sichtbar markierte Platzhalter im Code einbauen, im gleichen Muster wie das bestehende `.who-exclusion` auf den Rechtsseiten. Keine Beispieltexte, die wie echte Zitate wirken.

**Eigenes og:image.** Für `/fuehren/` ein eigenes og:image statt des aktuell mitlaufenden Startseiten-Bilds vorbereiten. Fehlt Bildmaterial, den offenen Zustand im Ergebnisbericht an David zurückmelden statt ihn stillschweigend zu belassen.

**Danach.** Seite nach Einbau einfrieren, nicht weiter iterieren, bis Plausible-Daten zu den beiden CTA-Klicks vorliegen.

**Done when:** 3–5 Empfehlungen sind kontextnah auf `/fuehren/` platziert, die R2-Regel ist technisch nicht umgehbar, fehlender Wortlaut ist sichtbar als Platzhalter markiert.

---

## 3. SEO der neuen Money Pages sauber abschließen

Betrifft: `/fuehren/`, `/fuehren/en/`, `/threshold/partner/`, `/threshold/partner/en/`.

**Vor der Umsetzung prüfen.** Jede der vier Seiten einzeln im Repo durchgehen: Title, Meta Description, Canonical, hreflang, Open Graph, robots/Indexierbarkeit, Sitemap-Eintrag, interne Verlinkung. Nichts annehmen – zuletzt dokumentiert waren og:image noch auf das Startseiten-Bild gesetzt und die Rechtsseiten auf `noindex`.

Zusätzlich prüfen, ob `/threshold/partner/en/` als eigenständige Seite existiert oder ob der englische Partner-Block weiterhin innerhalb der Threshold-Hauptseite eingebettet ist. Falls letzteres zutrifft, das im Ergebnisbericht an David zurückmelden statt eine eigene Seite vorauszusetzen.

**Umsetzung je Seite:**

- Title und Meta Description einzeln prüfen und ergänzen, nicht von der Startseite übernehmen.
- Canonical auf die jeweils eigene URL setzen.
- hreflang-Paare zwischen DE- und EN-Version verlinken (`/fuehren/` ↔ `/fuehren/en/`, `/threshold/partner/` ↔ `/threshold/partner/en/`), sobald beide Fassungen bestätigt existieren.
- Open Graph: eigenes og:image statt Startseiten-Bild, sobald Bildmaterial vorliegt (siehe Punkt 2).
- Sitemap: alle vier URLs eintragen, sofern sie live und indexierbar sein sollen. Die noindex-Logik der Rechtsseiten hier nicht versehentlich übernehmen.
- Interne Links von Startseite und relevanten Unterseiten auf alle vier URLs prüfen.
- Live-Auslieferung nach Merge auf Produktion real abrufen, nicht nur lokal oder im Preview. Title/Description/OG in einem Social-Preview-Check verifizieren.

**Done when:** Für alle vier Seiten sind Title, Meta Description, Canonical, hreflang (wo beide Sprachfassungen existieren), Open Graph und Sitemap-Eintrag gesetzt und live verifiziert. Ein fehlender Status, etwa eine nicht existierende EN-Partnerseite, ist dokumentiert, nicht stillschweigend übersprungen.
