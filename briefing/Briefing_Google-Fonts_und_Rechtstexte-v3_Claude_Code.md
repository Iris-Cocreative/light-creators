# Briefing für Claude Code — Google Fonts lokal hosten + Rechtstexte v3 live schalten

**Repository:** davidliebnau.com (statische Seite, GitHub Pages)
**Auslöser:** Juristische Prüfung der Rechtstexte vom 28. August 2026 hat
einen akuten, abmahnungsgefährdeten Punkt identifiziert (Google Fonts)
sowie mehrere mittlere Risiken, die jetzt behoben sind — im Text, siehe
unten. Auftrag: umsetzen, committen, **direkt in den Produktionsbranch
mergen und pushen**, gleiche Freigabe wie bei den vorherigen Briefings.

**Wichtig zur Reihenfolge:** Block 1 (Google Fonts) muss technisch
umgesetzt sein, bevor oder im selben Deploy wie Block 2 (Rechtstexte)
live geht. Der neue Text in der Datenschutzerklärung behauptet, dass
keine Verbindung zu Google-Servern mehr stattfindet — das darf erst
live gehen, wenn das auch stimmt.

---

## 1. Google Fonts lokal hosten — höchste Priorität

**Hintergrund:** Die dynamische Einbindung von Google Fonts ohne
Einwilligung wurde vom LG München I (Urt. v. 20.1.2022, 3 O 17493/20)
als DSGVO-Verstoß gewertet, weil dabei die IP-Adresse in die USA
übertragen wird — Art. 6 Abs. 1 lit. f DSGVO reicht dafür nicht als
Rechtsgrundlage. Es gab deswegen eine große Abmahnwelle, die Rechtslage
ist weiterhin risikobehaftet. Lokales Hosting entfernt das Problem an
der Wurzel, weil dann gar keine Datenübermittlung an Google mehr
stattfindet.

Das war ohnehin schon als Backlog-Punkt vorgemerkt („Design-Tokens
vereinheitlichen" / Font-Migration), ist jetzt aber nicht mehr
„später, kein Zeitdruck", sondern vorrangig.

### 1.1 Vorgehen

1. Aktuelle Einbindung finden:
   ```
   grep -rn "fonts.googleapis.com\|fonts.gstatic.com" .
   ```
2. Aus der gefundenen `<link>`- bzw. `@import`-URL die tatsächlich
   geladenen Familien, Schnitte und Stile ablesen (z. B.
   `family=Newsreader:wght@400;500;600;700&family=Hanken+Grotesk:wght@400;500;600;700`).
   Nur das laden, was im CSS tatsächlich per `font-weight`/`font-style`
   verwendet wird — nicht pauschal alle Schnitte mitziehen.
3. Passende Schriftdateien im WOFF2-Format besorgen, lizenzkonform (beide
   Schriften stehen unter der SIL Open Font License, unbedenklich für
   Selbsthosting), z. B. über den offiziellen Google-Fonts-Font-Katalog
   auf GitHub (`github.com/google/fonts`) oder ein Tool wie
   `google-webfonts-helper`.
4. Dateien im Repository ablegen, z. B. unter
   `assets/fonts/newsreader/` und `assets/fonts/hanken-grotesk/`.
5. `@font-face`-Regeln in `assets/styles.css` (oder wo immer die
   globalen Styles liegen) ergänzen, mit `font-display: swap` und
   relativen Pfaden auf die lokalen Dateien.
6. Alle Google-Fonts-Einbindungen entfernen: die `<link>`-Tags auf
   `fonts.googleapis.com`, sowie `<link rel="preconnect">` auf
   `fonts.googleapis.com` und `fonts.gstatic.com`. Gleiche zwei
   Baustellen wie bei den vorherigen Briefings:
   - gemeinsamer Header/Include, falls vorhanden, dort einmal entfernen;
   - sonst jede HTML-Datei einzeln, inklusive der 29 Episodenseiten
     (per Suchen/Ersetzen, nicht per Generator-Lauf) **und**
     `generate-episodes.js`, Funktion `generatePage()`.
7. Kontrolle: Grep aus Schritt 1 liefert danach null Treffer.
8. Visuell prüfen, dass sich am Schriftbild nichts sichtbar verändert
   hat — Schnitte, Kursiv/Fett-Varianten, Desktop und Mobil, DE und EN.

### Abnahme Block 1

- [ ] Grep auf `fonts.googleapis.com` / `fonts.gstatic.com` liefert null
      Treffer im gesamten Repository.
- [ ] Schriftdateien liegen lokal im Repository, referenziert über
      `@font-face`.
- [ ] Schriftbild optisch unverändert geprüft.

---

## 2. Rechtstexte v3 live schalten

Die überarbeitete Fassung liegt vor:
`Rechtstexte-Veroeffentlichungsfassung_v3.md`. Sie ersetzt die zuvor
ausgelieferte v2-Fassung. Änderungen gegenüber der Live-Version, Seite
für Seite:

### `/datenschutz/`

- **Ziffer 3 (Schriftarten):** komplett neuer Text — beschreibt jetzt
  lokal gehostete Schriften statt Google Fonts. Siehe Abhängigkeit zu
  Block 1 oben.
- **Ziffer 5 (Daten in Programmen/Coachings):** Rechtsgrundlage
  aufgeteilt — freiwillige Gesundheitsangaben laufen weiter über
  Einwilligung (Art. 9 Abs. 2 lit. a DSGVO), die im Bedarfsfall
  verpflichtende ärztliche Bescheinigung neu über Art. 9 Abs. 2 lit. h
  DSGVO i. V. m. § 22 Abs. 1 Nr. 1 Buchstabe b BDSG. Grund: Eine als
  Teilnahmebedingung verlangte Angabe kann nicht sauber auf eine
  „freiwillige" Einwilligung gestützt werden.
- **Ziffer 6 (Cookies und Webanalyse):** zwei Sätze ergänzt — Hinweis auf
  den mit Plausible automatisch zustande kommenden
  Auftragsverarbeitungsvertrag (Art. 28 DSGVO) und auf das
  Widerspruchsrecht nach Art. 21 DSGVO mit Verweis auf Ziffer 8.

### `/ki-einsatz/`

- Der Satz unter „Ich sage, wo KI beteiligt war" ist konkreter gefasst,
  entspricht jetzt eher dem Geist von Art. 50 AI Act (seit 2. August
  2026 anwendbar).

### `/agb/`

- **§ 7 (Absage durch Anbieter):** ein Halbsatz ergänzt, der den
  Haftungsausschluss für Reise-/Stornokosten Dritter an § 9 (Haftung)
  koppelt, statt ihn pauschal auszuschließen. Grund: Ein vollständiger
  Ausschluss auch für Fälle von Vorsatz/grober Fahrlässigkeit wäre nach
  § 307 BGB angreifbar; § 9 regelt diese Fälle bereits korrekt, § 7
  darf dem nicht widersprechen.

### `/widerruf/`

- Der einleitende Satz „Der Wortlaut ist gesetzlich vorgegeben und darf
  nicht verändert werden." ist in der Quelldatei jetzt als HTML-Kommentar
  markiert (redaktionelle Notiz). **Bitte beim Publizieren sicherstellen,
  dass dieser Kommentar nicht mit ausgeliefert wird** — die
  Widerrufsbelehrung muss auf der Live-Seite ausschließlich den
  gesetzlichen Wortlaut enthalten, ohne Kommentierung davor.

### `/impressum/`

- Keine Änderung. Die im Review aufgeworfene Frage zur Anschrift
  (Berlin vs. aktueller Aufenthaltsort) ist geklärt: die ladungsfähige
  Anschrift bleibt Berlin, Gardeschützenweg 103. Nichts anzupassen.

### Abnahme Block 2

- [ ] Alle fünf Seiten entsprechen wortgleich der v3-Quelldatei.
- [ ] Redaktionelle Kommentare (Widerrufsbelehrung) sind nicht Teil der
      ausgelieferten Seite.
- [ ] Reihenfolge eingehalten: Ziffer 3 der Datenschutzerklärung geht
      erst live, wenn Block 1 abgeschlossen ist.

---

## 3. Commit & Deploy

Vorschlag für die Commit-Aufteilung:

1. `fix: self-host Newsreader and Hanken Grotesk, remove Google Fonts`
2. `fix: update Datenschutzerklärung, AGB, KI-Text and Widerrufsbelehrung per legal review`

Da beide Blöcke inhaltlich zusammenhängen (Block 2 setzt Block 1
voraus), im selben Deploy ausliefern. Nach dem Push kurz den Diff der
zweiten Datei überfliegen, bevor die Aufgabe als erledigt gemeldet
wird — bei Rechtstexten lohnt sich der kurze Blick, auch wenn direkt
gepusht wird.

---

## 4. Was nicht Teil dieses Auftrags ist — offene Punkte für David

Diese Punkte aus der juristischen Prüfung betreffen keine Website-Texte
und sind daher hier nicht adressiert:

1. **Auftragsverarbeitungsvertrag mit GitHub.** Bei GitHub läuft das
   in der Regel automatisch über deren Nutzungsbedingungen mit;
   trotzdem einmal kurz im GitHub-Account prüfen, ob ein DPA explizit
   akzeptiert werden muss.
2. **Berufshaftpflichtversicherung.** Die Prüfung merkt an, dass die
   Versicherung die tatsächliche Tätigkeit (Coaching/
   Personalentwicklung) abdecken muss — das ist derselbe offene Punkt
   wie die Baloise-Bestätigung, die ohnehin schon aussteht.
3. **Vorvertragliche Pflichtinformationen (Art. 246c EGBGB).** Betrifft
   die Anmeldebestätigung, nicht die Website-Rechtstexte. Sag Bescheid,
   falls du dafür eine Vorlage brauchst, das ist ein eigenes Dokument.
4. **Markenrecherche „The Threshold Program".** Empfehlung aus der
   Prüfung, vor stärkerer Vermarktung beim DPMA-Register zu prüfen, ob
   der Name bereits für Coaching-/Weiterbildungsdienstleistungen belegt
   ist. Das ist eine echte Registerrecherche, die über eine einfache
   Websuche hinausgeht — würde ich beim Anwalt oder direkt im
   DPMAregister machen, nicht hier im Vorbeigehen behaupten, sauber
   geklärt zu haben.

---

## 5. Eine Anmerkung zur Rechtsgrundlage in Ziffer 5

Der zitierte § 22 Abs. 1 Nr. 1 Buchstabe b BDSG spricht wörtlich von der
„Beurteilung der Arbeitsfähigkeit **des Beschäftigten**" — das ist
eigentlich auf Arbeitsverhältnisse zugeschnitten, ein
Programmteilnehmer ist kein Beschäftigter von David. Die Übertragung
auf die Teilnahmefähigkeit bei einem Wildnisprogramm ist naheliegend,
aber nicht hundertprozentig deckungsgleich mit dem Wortlaut. Das ist
der eine Punkt aus der ganzen Überarbeitung, den ich David empfehlen
würde, konkret mit einem Anwalt gegenzuprüfen, bevor viel Traffic auf
die Buchungsseite kommt — alles andere aus der Prüfung war entweder
eindeutig (Google Fonts) oder eine saubere Übernahme der im Review
vorgeschlagenen Formulierung.
