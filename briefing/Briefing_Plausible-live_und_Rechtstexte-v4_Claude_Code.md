# Briefing für Claude Code — Plausible live schalten + Rechtstexte v4 abgleichen

**Repository:** davidliebnau.com (statische Seite, GitHub Pages)
**Stand:** Google Fonts und die meisten Rechtstexte-Fixes aus der letzten
Runde sind bereits live und bestätigt. Dieses Briefing schließt zwei
verbliebene Lücken: Plausible ist noch nicht deployed, und die
Rechtstexte-Quelldatei hatte einen Absatz (ProvenExpert), der auf der
Live-Seite bereits steht, aber in keiner Quelldatei enthalten war. Beides
jetzt schließen, committen, **direkt in den Produktionsbranch mergen und
pushen**, gleiche Freigabe wie in den vorherigen Runden.

---

## 1. Plausible deployen — Priorität

Konto und Skript stehen bereits, das hier ist reine Umsetzung.

### 1.1 Skript einbauen

```html
<!-- Privacy-friendly analytics by Plausible -->
<script async src="https://plausible.io/js/pa-PE8LepbzU6ohWEdNxpoeQ.js"></script>
<script>
  window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
  plausible.init()
</script>
```

Im `<head>` **jeder** Seite, kurz vor `</head>` — Startseite, Führen,
Threshold, Partner, Podcast-Übersicht, alle Episodenseiten, Rechtsseiten,
DE und EN. Gemeinsamer Header/Include falls vorhanden, sonst jede Datei
einzeln **und** `generate-episodes.js`, Funktion `generatePage()` (gleiches
Muster wie bei den vorherigen Briefings).

Kontrolle danach: `grep -rn "pa-PE8LepbzU6ohWEdNxpoeQ" .` sollte auf jeder
ausgelieferten Seite genau einen Treffer im `<head>` liefern.

### 1.2 Events verdrahten

| Seite | Ereignis | Event-Name |
|---|---|---|
| Startseite | Klick Briefing-CTA | `cta_briefing_click` |
| Startseite | Klick Threshold | `nav_threshold_click` |
| Startseite | Klick Founder-Ausgang (Light Creators) | `outbound_light_creators_click` |
| Führen | Klick CTA 1 | `fuehren_cta1_click` |
| Führen | Klick CTA 2 | `fuehren_cta2_click` |
| Threshold | Gespräch beginnen | `threshold_cta_click` |
| Threshold | Klick auf Partnerseite | `threshold_partner_link_click` |
| Threshold | Scrolltiefe bis Preis | `threshold_price_scroll` |
| Threshold | FAQ-Interaktion | `threshold_faq_toggle` (mit Property, welche Frage) |
| Partnerseite | Partnerschaftsanfrage | `partner_request_click` |

Zwei Wege, je nach Element:

- **Einfache Klicks:** CSS-Klasse `plausible-event-name=<EventName>` auf
  das Element, z. B. `<a href="..." class="plausible-event-name=cta_briefing_click">`.
  Kein zusätzliches JavaScript nötig.
- **Scrolltiefe und FAQ (dynamische Werte):** programmatisch, z. B.
  ```js
  window.plausible('threshold_price_scroll');
  window.plausible('threshold_faq_toggle', { props: { question: faqQuestionText } });
  ```
  Scrolltiefe über einen Intersection Observer auf dem Preis-Block, der
  beim ersten Sichtbarwerden einmalig auslöst.

**Nicht vergessen:** Zu jedem der zehn Events unter Site Settings → Goals
in Plausible ein passendes Goal mit demselben Namen anlegen, sonst werden
Events gesendet, aber nicht ausgewertet. Bitte David am Ende die Liste der
zehn Namen zum Anlegen der Goals geben.

### 1.3 Testlauf

Nach dem Deploy ein paar der zehn Aktionen selbst auslösen und im
Plausible-Dashboard prüfen, dass Pageviews und Events ankommen, bevor die
Aufgabe als erledigt gemeldet wird.

### Abnahme Block 1

- [ ] Skript auf allen Seiten, inklusive Episodenseiten und Generator.
- [ ] Alle zehn Events verdrahtet.
- [ ] Testlauf im Dashboard bestätigt: Pageviews und Events kommen an.

---

## 2. Rechtstexte v4 — nur zwei Stellen fehlen noch

Alles andere aus der letzten Runde ist bereits live. Es geht nur noch um
zwei Absätze in `Rechtstexte-Veroeffentlichungsfassung_v4.md`:

### 2.1 `/datenschutz/` Ziffer 6 — Plausible-Absatz

Der Text steht schon in der Quelldatei, durfte aber erst live gehen, wenn
Plausible tatsächlich läuft. Das ist jetzt der Fall — bitte Ziffer 6
unverändert aus der v4-Datei übernehmen.

### 2.2 `/datenschutz/` neue Ziffer 7 — ProvenExpert

Das ist der eine Punkt, den ich nicht sauber lösen konnte: Die Live-Seite
hat bereits einen ProvenExpert-Absatz, den keine unserer Quelldateien
kennt. Ich habe zwei Varianten in die v4-Datei geschrieben, je nachdem wie
das Siegel technisch eingebunden ist:

- **Variante A** — falls es nur ein Link/Badge-Bild ohne Skript-Ladung
  von provenexpert.com ist.
- **Variante B** — falls ein Skript-Tag Inhalte von provenexpert.com
  nachlädt (typisches ProvenExpert-Bewertungswidget).

**Bitte in der aktuell live stehenden Seite nachsehen, welche Variante
zutrifft, die richtige übernehmen und die andere löschen.** Falls keine
von beiden zum tatsächlichen Live-Text passt, bitte stattdessen den
echten Live-Text unverändert in die Quelldatei übernehmen, nicht raten.

**Wichtiger Nebenbefund, unabhängig von diesem Briefing:** Falls Variante
B zutrifft (aktives Skript, das Cookies setzen kann), ist die Einbindung
nach aktueller Rechtslage nur mit vorheriger Einwilligung zulässig — die
Seite hat aber kein Consent-Tool. Falls das zutrifft, bitte **David
explizit darauf hinweisen**, bevor der Text live geht. Nicht einfach
Variante B veröffentlichen, um das eigentliche Problem (fehlendes
Consent-Tool bei aktiver Drittanbieter-Einbindung) zu verdecken — das
wäre schlechter als der aktuelle Zustand, in dem die Seite zumindest
nicht behauptet, ein Problem sauber gelöst zu haben, das in
Wahrheit noch offen ist.

### Abnahme Block 2

- [ ] Ziffer 6 (Plausible) live, wortgleich mit v4.
- [ ] Ziffer 7 (ProvenExpert) live, mit der zutreffenden Variante oder dem
      tatsächlichen Live-Text, keine der beiden Platzhalter-Kommentare
      mit ausgeliefert.
- [ ] Falls Variante B zutraf: David wurde auf das Consent-Tool-Problem
      hingewiesen.

---

## 3. Commit & Deploy

1. `feat: deploy Plausible analytics with event tracking`
2. `fix: publish Datenschutzerklärung Ziffer 6 and 7 (Plausible, ProvenExpert)`

Nach dem Push kurz bestätigen, dass beide Ziffern auf der Live-Seite so
stehen wie in der v4-Datei (abzüglich der Kommentare).

---

## 4. Unverändert offen, zur Erinnerung

AV-Vertrag GitHub, Berufshaftpflicht-Deckung für die tatsächliche
Tätigkeit, Art. 246c EGBGB für die Anmeldebestätigung, DPMA-Markenrecherche
„The Threshold Program", anwaltlicher Check zu § 22 BDSG in Ziffer 5. Keine
Änderung an diesen Punkten in diesem Briefing.
