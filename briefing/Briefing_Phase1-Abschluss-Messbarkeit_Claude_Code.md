# Briefing: Phase-1-Abschluss und Messbarkeit

Stand: 02. September 2026. Folgt auf den Sprint `phase1/threshold-proof-seo`
(vier Commits, noch nicht gemerged). Kleiner Sprint, drei Punkte, kein
Umbau bestehender Copy.

> Ablage: Im Briefing war `_briefings/2026-09_phase1-abschluss-messbarkeit.md`
> vorgeschlagen. Abgelegt nach der bestehenden Repo-Konvention in `briefing/`.
> Inhalt unverändert.

---

## Ausgangslage

Der Phase-1-Sprint ist gebaut, aber nicht abgenommen. Drei Punkte sind
aus dem Ergebnisbericht offen geblieben, dazu kommt eine Lücke, die im
Briefing davor nicht stand: die neuen Conversionpfade sind nicht messbar.

Entscheidungen zu den drei offenen Punkten aus dem letzten Bericht:

- **Platzhalter-Abweichung auf `/fuehren/`:** bestätigt, bleibt als
  Kommentarblock. Kein sichtbarer Platzhalter auf einer indexierten
  Verkaufsseite. Keine Änderung nötig.
- **Englischer Partnerblock:** wird gekürzt, siehe Punkt 1.
- **og:image:** wird mechanisch zugeschnitten, siehe Punkt 1.

---

## 1. Nachträge aus dem Phase-1-Sprint

**Englischen Partnerblock zurückbauen.** `threshold/en/index.html`,
Abschnitt `#partners`. Zuerst die deutsche Fassung `threshold/index.html`
ansehen und den dortigen Teaser-Aufbau als Vorlage nehmen — nicht aus dem
Gedächtnis rekonstruieren. Den vollständigen Block mit Research-Strip und
den vier Partner-Karten durch dasselbe Teaser-Muster ersetzen, das auf
`/threshold/partner/en/` verlinkt. Ziel: der vollständige Inhalt steht
nur noch auf einer indexierbaren URL.

Prüfen, ob interne Links oder Sprungmarken auf `#partners` in der
englischen Fassung zeigen. Wenn ja, mit umziehen.

**og:image für die vier Money Pages.** Aus
`hero-fuehren-split.webp` (1200×1500) einen Zuschnitt 1200×628 erzeugen,
zentriert auf den Bildschwerpunkt, als `assets/og-image-fuehren.jpg`.
Auf `/fuehren/` und `/fuehren/en/` einbinden.

Für `/threshold/partner/` und `/threshold/partner/en/` zuerst prüfen,
welches Bildmaterial im Repo vorhanden ist. Wenn nichts Passendes
existiert, bleibt dort `assets/og-image.jpg` stehen und der Zustand geht
als offener Punkt in den Backlog. Nicht auf Verdacht ein thematisch
unpassendes Bild verwenden.

**Done when:** Der Partnerinhalt steht englisch nur noch auf einer URL.
`/fuehren/` und `/fuehren/en/` haben ein eigenes og:image. Für die
Partnerseiten ist entweder ein Bild gesetzt oder der offene Zustand
dokumentiert.

---

## 2. Die neuen Pfade messbar machen

Die Roadmap sieht vor, `/fuehren/` nach dem Proof-Einbau einzufrieren und
zu messen. Dafür fehlen die Events. Plausible läuft seit Phase 0,
Klick-Tracking über CSS-Klassen, `window.plausible()` für Scrolltiefe und
FAQ.

**Zuerst prüfen:** Wie sind die bestehenden Klick-Events in
`assets/` benannt und aufgebaut? Dieselbe Konvention weiterverwenden,
keine zweite Systematik einführen.

**Zu ergänzen:**

- Vier getrennte Events für die vier Threshold-Pfade (Termin frei,
  Warteliste, spätere Gruppe, Institution), jeweils unterscheidbar nach
  Teilnehmer- und Partnerseite. Ohne diese Trennung ist nicht erkennbar,
  ob Nachfrage an der Terminlage oder am Angebot scheitert.
- Scrolltiefe bis zum Investitionsblock `#investition` auf den
  Threshold-Seiten.
- Beide CTA-Klicks auf `/fuehren/`, falls noch nicht gesetzt.

Keine personenbezogenen Daten in Eventnamen oder Properties. Keine
Mailadressen, keine Formularinhalte.

**Nicht vergessen:** Goals müssen im Plausible-Dashboard manuell angelegt
werden, der Code allein reicht nicht. Die anzulegenden Goal-Namen am Ende
des Sprints als Liste ausgeben, damit David sie im Dashboard nachziehen
kann.

**Done when:** Jeder der vier Threshold-Pfade und beide Führen-CTAs
lösen ein eigenes, unterscheidbares Event aus. Die Liste der im Dashboard
anzulegenden Goals liegt vor.

---

## 3. Backlog und Dokumentation

**Browser-Tooling als eigenen Punkt festhalten.** Das Problem ist zum
zweiten Mal aufgetreten: Browser-Bereich ausgeblendet, Scrollen und
Screenshots im Timeout, `window.innerWidth` meldet 0. Es steht bereits in
`OFFENE-AUFGABEN.md`, aber als Randnotiz eines abgeschlossenen Sprints.
Als eigenen Punkt formulieren, damit es nicht in jedem Sprint neu
improvisiert wird.

**`OFFENE-AUFGABEN.md` aktualisieren.** Nach dem Merge: 1A, 1B und 1D als
erledigt markieren, jeweils mit Datum. Offen bleiben und stehen lassen:
og:image der Partnerseiten (falls ungelöst), Preislogik nach dem Piloten,
Inhouse-Variante als eigene Seite, englische Übersetzungen der neuen
Abschnitte.

**Done when:** Beide Dateien geben den tatsächlichen Stand wieder, ohne
dass ein erledigter Punkt noch offen aussieht oder umgekehrt.

---

## Merge-Gate

Der visuelle Abnahmedurchgang macht David selbst, auf Desktop und Mobil:
die vier Threshold-Seiten und `/fuehren/`, mit Fokus auf die vier
mailto-Wege und die Zitat-Platzierungen. Erst danach mergen. Nicht
versuchen, das Browser-Tooling für diesen Zweck zu reparieren.

Beim Merge gilt der bekannte Weg: direkt auf den Produktions-Branch,
kein PR-Review.

---

## Was in diesem Sprint nicht passiert

- `/fuehren/` inhaltlich weiter iterieren. Die Seite wird eingefroren,
  bis Daten vorliegen.
- Preis oder Preislogik anfassen. Der Wechsel vom Einführungspreis hängt
  am Abschluss der Pilotkohorte und betrifft ausschließlich den
  Investitionsblock der Threshold-Seite.
- Rechtstexte formulieren oder AGB-Fragen entscheiden. Anwaltsprüfung vor
  der ersten Buchung steht aus, die Bestätigung der Betriebshaftpflicht
  (Baloise) für die Wildnisaktivitäten ebenfalls. Unsicherheit markieren,
  nicht auflösen.
- Neue Award-Fundstellen einbauen. Die R2-Mechanik in
  `assets/award-context.js` bleibt unverändert; sie greift automatisch,
  falls später ein Zitat hinzukommt.

Alles Neue in Du-Form, deutsch und englisch gleich behandeln.
