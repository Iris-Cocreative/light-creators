# Briefing: Rechtsseiten für davidliebnau.com

**Auftrag in einem Satz:** Fünf Rechtsseiten mit echtem Inhalt anlegen, die
bisherigen Platzhalter ersetzen und alle Footer entsprechend verlinken.

**Textquelle:** `briefing/Rechtstexte-davidliebnau-v2.md`, liegt im
Repository. Alle Texte werden von dort wörtlich übernommen. Nichts
umformulieren, nichts kürzen, nichts ergänzen. Wenn dir etwas widersprüchlich
oder fehlerhaft erscheint, melde es, statt es zu korrigieren.

---

## 1. Arbeitsweise

1. Branch: `relaunch/rechtsseiten`, abgezweigt vom aktuellen Stand.
2. Ein Commit pro Seite.
3. Am Ende ein Pull Request mit einer Liste der geänderten Dateien.
4. Der Pull Request zu den Rechtsseiten kann unabhängig vom
   Positionierungs-Relaunch gemergt werden. Sag mir, falls die beiden Branches
   sich in die Quere kommen.

---

## 2. Die fünf Seiten

| Pfad | Quelle im Textdokument | Titel im Browser |
|---|---|---|
| `/impressum/` | Teil 0 | Impressum · David Liebnau |
| `/datenschutz/` | Teil 1 | Datenschutzerklärung · David Liebnau |
| `/ki-einsatz/` | Teil 2 | KI-Einsatz · David Liebnau |
| `/agb/` | Teil 3, nur „Allgemeine Geschäftsbedingungen" ab § 1 | AGB · David Liebnau |
| `/widerruf/` | Teil 4 | Widerrufsbelehrung · David Liebnau |

**Wichtig zu `/agb/`:** Teil 3 des Textdokuments beginnt mit einer
Vorbemerkung zur gewählten Konstruktion. Die ist für mich geschrieben und
gehört **nicht** auf die Website. Übernimm erst ab der Überschrift
„Allgemeine Geschäftsbedingungen".

**Wichtig zu Teil 5 und Teil 6** des Textdokuments: interne Notizen, kommen
nirgends auf die Website.

**Wichtig zu Teil 4:** Der Wortlaut der Widerrufsbelehrung ist gesetzlich
vorgegeben. Kein Zeichen ändern, auch keine Anführungszeichen, keine
Umbrüche, keine Zwischenüberschriften einfügen, die nicht im Text stehen. Die
Sternchen und die Zeile „(*) Unzutreffendes streichen." bleiben.

---

## 3. Technische Vorgaben

Für alle fünf Seiten:

- Gleiches Layout und gleiche Komponenten wie `/impressum/` und
  `/datenschutz/` sie bereits verwenden. Kein neues CSS.
- `<meta name="robots" content="noindex">` auf allen fünf Seiten.
- Nicht in `sitemap.xml` aufnehmen.
- Vollständige Meta-Angaben: title, description, og:title, og:description,
  og:image mit dem Startseitenbild.
- Der Platzhalterkasten `.who-exclusion` und der Hinweis „Platzhalter, Inhalt
  folgt" verschwinden auf `/impressum/` und `/datenschutz/` ersatzlos.
- Die Zeile „This page is available in German only." bleibt auf allen fünf
  Seiten oben stehen, in derselben Auszeichnung wie bisher.
- Lange Texte gliedern: Überschriftenebenen wie im Textdokument, also H1 für
  den Seitentitel, H2 für die nummerierten Abschnitte und Paragrafen.
- E-Mail-Adressen als `mailto:`-Links.
- Auf `/agb/` bei der Erwähnung von davidliebnau.com/widerruf/ einen echten
  Link setzen.

---

## 4. Footer auf allen Seiten

Die Rechtslinks im Footer lauten künftig:

`Impressum · Datenschutz · AGB · Widerruf · KI-Einsatz`

Das betrifft: `index.html`, `index-en.html`, `podcast.html`, alle 29
Episodenseiten, die Generator-Vorlage in `generate-episodes.js`,
`threshold/index.html`, `threshold/en/index.html`, `/fuehren/`,
`/threshold/partner/` und die fünf Rechtsseiten selbst.

Auf `index-en.html` und `threshold/en/index.html` lauten die Beschriftungen:
`Legal Notice · Privacy Policy · Terms · Right of Withdrawal · AI Use`,
verlinkt auf dieselben deutschen Seiten.

Es bleibt bei fünf Links, keine AGB-Altlasten, keine toten Ziele. Prüf nach
der Änderung alle internen Links erneut und melde mir das Ergebnis.

---

## 5. Zwei Stellen außerhalb der Rechtsseiten

**5.1 Threshold-Seite, Investitionsblock.** Dort steht der Preis. Ergänze
darunter einen kurzen Absatz, der zu den neuen AGB passt:

> Mit der Anmeldebestätigung wird eine Anzahlung von 20 Prozent fällig, damit
> ist dein Platz reserviert. Der Rest ist 30 Tage vor Beginn fällig.
> Ratenzahlung ist auf Anfrage möglich. Enthalten sind Unterkunft und
> Verpflegung vor Ort, alle Materialien und die Begleitung über sechs Wochen
> nach dem Programm. Anreise und Versicherungen kommen dazu.
> Es gelten die [AGB](/agb/) und die [Widerrufsbelehrung](/widerruf/).

Auf der englischen Threshold-Seite denselben Absatz sinngemäß auf Englisch,
mit demselben Link auf die deutschen Seiten.

**5.2 Partnerseite.** Im Abschnitt Kosten einen Satz ergänzen:
`Es gelten die AGB.` mit Link auf `/agb/`.

---

## 6. Was du nicht tun sollst

- Keine Texte glätten, kürzen oder in eigene Worte fassen.
- Keine Rechtstexte aus anderen Quellen ergänzen.
- Die Widerrufsbelehrung nicht anfassen.
- Die internen Teile 5 und 6 des Textdokuments nicht veröffentlichen.
- Keine Cookie-Banner oder Consent-Werkzeuge einbauen. Die Seite setzt keine
  Cookies, und ein Banner ohne Anlass wäre falsch.

---

## 7. Wenn du fertig bist

Melde mir:
1. Die fünf neuen Seiten mit Pfad und Zeilenzahl.
2. Eine Liste aller Dateien, in denen du den Footer geändert hast, mit Anzahl.
3. Das Ergebnis der Linkprüfung.
4. Screenshots der fünf Seiten bei 1440 und bei 390 Pixeln.
5. Die Liste der Stellen, die du nicht visuell verifizieren konntest.

Danach gehe ich alles selbst durch. Öffne den Pull Request erst, wenn ich
grünes Licht gebe.
