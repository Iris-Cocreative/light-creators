# Briefing für Claude Code — FAQ-Messung, ProvenExpert entschärfen, Threshold EN-Lücke

**Repository:** davidliebnau.com
**Stand:** Plausible läuft, 9 von 10 Events live, Rechtstexte-Ziffer 6
veröffentlicht. Dieses Briefing schließt die drei offenen Punkte aus der
letzten Runde. David hat entschieden:

1. FAQ-Event → „gesehen" statt „geklickt", kein UI-Umbau.
2. ProvenExpert → Skript entfernen, durch statischen Link/Badge ersetzen.
3. Threshold-EN-Partnerlücke → jetzt mitbeheben.

Wie immer: direkt in den Produktionsbranch mergen und pushen.

---

## 1. Zehntes Event: `threshold_faq_seen`

Umbenannt von `threshold_faq_toggle` — der alte Name unterstellt eine
Interaktion, die es nicht gibt. Bitte **nicht** `threshold_faq_toggle`
verwenden, auch nicht als Alias, sonst laufen zwei Namen für dieselbe
Sache durcheinander.

Gleiches Muster wie `threshold_price_scroll`: Intersection Observer auf
dem FAQ-Bereich (`.faq-row`-Container), der beim ersten Sichtbarwerden
einmalig `window.plausible('threshold_faq_seen')` auslöst. Auf **beiden
Sprachfassungen** von `/threshold/`, wie beim Rest der Events auch.

Denk an die Hintergrund-Tab-Falle aus der letzten Runde beim Testen:
Chrome drosselt IntersectionObserver in nicht sichtbaren Tabs vollständig
— beim Verifizieren den Tab aktiv im Vordergrund halten, sonst sieht es
nach einem Bug aus, der keiner ist.

### Abnahme

- [ ] `threshold_faq_seen` löst automatisch aus, sobald der FAQ-Bereich
      sichtbar wird, auf DE und EN.
- [ ] Kein `threshold_faq_toggle` mehr im Code.

---

## 2. ProvenExpert: aktives Skript entfernen, echtes Siegel-Bild lokal einbauen

Auf `index.html` und `index-en.html` läuft aktuell:

```html
<script type="text/javascript" async
  src="https://www.provenexpert.com/widget/circlewidget.js?s=300&id=hdfnh&…"></script>
```

Das lädt automatisch bei jedem Seitenaufruf, überträgt die IP-Adresse und
kann Cookies setzen — ohne Einwilligung. Das Bild selbst ist nicht das
Problem, der automatische Serveraufruf beim Laden der Seite ist es.
Deshalb: Skript entfernen, das Siegel-Bild stattdessen lokal hosten und
verlinken — Sichtbarkeit bleibt vollständig erhalten, der unautorisierte
Datenabruf verschwindet.

**Das Bild liegt bereits vor:** `provenexpert-siegel.png` (250×300px,
PNG mit Transparenz), im selben `_briefings/`-Ordner wie dieses Briefing.
Es ist ein Export aus Davids ProvenExpert-Account, Stand 21.04.2026 laut
eingedrucktem Datum — kein Live-Rendering.

### 2.1 Umsetzung

1. Das `<script>`-Tag komplett entfernen, auf beiden Sprachseiten.
2. `provenexpert-siegel.png` ins Repository übernehmen, z. B. unter
   `assets/images/provenexpert-siegel.png` (gleiche Ablagelogik wie bei
   den selbstgehosteten Schriften).
3. An der bisherigen Stelle des Widgets einbauen:
   ```html
   <a href="[ProvenExpert-Profil-URL]" target="_blank" rel="noopener">
     <img src="/assets/images/provenexpert-siegel.png"
          width="250" height="300"
          alt="ProvenExpert Bewertungssiegel: David Liebnau – Light Creators Tribe, Kundenbewertungen">
   </a>
   ```
   Pfad und Bildgröße bei Bedarf ans bestehende CSS-Layout anpassen, wo
   das Widget vorher saß.
4. Profil-URL: vermutlich noch aus der `circlewidget.js`-Anfrage ableitbar
   (Parameter `id=hdfnh` deutet auf die Profil-ID hin) oder aus dem
   bisherigen Linkziel des Siegels, falls eines hinterlegt war.
5. Damit ist der Text aus Ziffer 7 der v6-Rechtstexte korrekt und kann
   live gehen (siehe Block 3).

**Wichtiger Hinweis an David, nicht an Code:** Das Bild ist eine
Momentaufnahme — die „10 Bewertungen" und das Datum aktualisieren sich
nicht mehr von selbst, anders als beim Live-Widget vorher. Wenn dir die
aktuelle Zahl wichtig ist, müsstest du das Bild von Zeit zu Zeit neu aus
deinem ProvenExpert-Account exportieren und mir zum Austauschen geben.

### Abnahme Block 2

- [ ] `circlewidget.js`-Einbindung auf beiden Sprachversionen entfernt.
- [ ] Grep-Kontrolle: `grep -rn "provenexpert.com/widget" .` liefert null
      Treffer.
- [ ] Siegel-Bild lokal im Repository, sichtbar auf beiden Sprachseiten,
      verlinkt auf das ProvenExpert-Profil.


---

## 3. Rechtstexte v6 live schalten

Zwei Nachträge gegenüber v4/der letzten Runde:

- **Ziffer 3 (Schriftarten):** korrigiert von „Newsreader" auf „Cormorant
  Garamond" — das war mein Fehler aus einer früheren Runde, jetzt
  behoben. Bitte mit der Live-Seite abgleichen, die schon korrekt
  „Cormorant Garamond" zeigt.
- **Ziffer 7 (ProvenExpert):** finaler Text, keine Varianten mehr. Geht
  erst live, **nachdem** Block 2 abgeschlossen ist — sonst behauptet der
  Text etwas, das noch nicht stimmt, gleiches Prinzip wie beim
  Google-Fonts-Deploy.

### Abnahme Block 3

- [ ] Ziffer 3 live korrigiert.
- [ ] Ziffer 7 live, erst nach abgeschlossenem Block 2.

---

## 4. Threshold-Partnerseite auf `/threshold/en/`

Das ist in erster Linie eine Inhalts-/Übersetzungsfrage, keine reine
Verlinkung — bitte entsprechend vorsichtig rangehen:

1. Prüfen, ob mittlerweile eine `/threshold/en/partner/` existiert. Falls
   ja: einfach verlinken, das schließt die Lücke vollständig und
   `threshold_partner_link_click` bekommt sein zweites Element.
2. Falls nein: Laut Backlog sollte in diesem Fall ein eingebetteter
   Partner-Block direkt auf der englischen Threshold-Seite als Ersatz
   stehen (Übersetzung des deutschen Partner-Blocks). Prüfen, ob dieser
   Block früher existierte und verlorengegangen ist, oder nie gebaut
   wurde.
3. **Bitte keine unübersetzten deutschen Inhalte auf die englische Seite
   kopieren.** Falls eine sinnvolle Übersetzung nicht ohne Rückfrage
   möglich ist (z. B. weil Ton oder Fachbegriffe unklar sind), lieber
   einen einfachen Link auf die deutsche Partnerseite setzen, deutlich
   als solchen kennzeichnen (z. B. „Partner-Informationen (Deutsch)"),
   und das im Statusbericht an David zurückmelden statt zu improvisieren.

### Abnahme Block 4

- [ ] `/threshold/en/` bietet einen funktionierenden Weg zur Partnerseite
      oder zu einem gleichwertigen Ersatz.
- [ ] Keine unübersetzten deutschen Inhalte auf der englischen Seite,
      außer als bewusst gekennzeichneter Übergangszustand.

---

## 5. Commit & Deploy

1. `feat: add threshold_faq_seen event tracking`
2. `fix: replace active ProvenExpert widget with static link`
3. `fix: correct Datenschutzerklärung Ziffer 3 and publish Ziffer 7`
4. `fix: restore path to Threshold partner page on EN version`

Reihenfolge beachten: Commit 3 (Ziffer 7 live) erst nach Commit 2
(Skript entfernt), sonst Block 3 aus Abschnitt 3 verletzt.

---

## 6. Für dich zum Anlegen in Plausible

Zehn Namen jetzt vollständig, `threshold_faq_seen` ist neu dazugekommen:

```
cta_briefing_click
nav_threshold_click
outbound_light_creators_click
fuehren_cta1_click
fuehren_cta2_click
threshold_cta_click
threshold_partner_link_click
threshold_price_scroll
threshold_faq_seen
partner_request_click
```

---

## 7. Unverändert offen

AV-Vertrag GitHub, Berufshaftpflicht-Deckung, Art. 246c EGBGB,
DPMA-Markenrecherche „The Threshold Program", anwaltlicher Check zu
§ 22 BDSG in Ziffer 5.
