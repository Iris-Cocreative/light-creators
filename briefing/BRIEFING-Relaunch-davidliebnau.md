# Briefing: Neuausrichtung davidliebnau.com

**Auftrag in einem Satz:** Die Website wird von der bisherigen Founder-Positionierung auf die neue Klammer „Bewusstes Leadership an kritischen Wendepunkten" umgestellt. Sie muss ab sofort für Corporate-Entscheider, für Zahler des Threshold-Programms (Eltern, Stiftungen, Unternehmen) und für junge Erwachsene funktionieren. Founder-Inhalte werden verkleinert und nach light-creators.com verwiesen.

**Was dieses Briefing NICHT ist:** Kein Redesign. Layout, Farben, Schriften, Komponenten und Animationen bleiben, wie sie sind. Geändert werden Texte, es kommen zwei Seiten und vier SVG-Assets hinzu.

---

## 1. Arbeitsweise

1. Lege einen Branch an: `relaunch/positionierung-2026`.
2. Arbeite Schritt 0 (Inventur) ab und **halte danach an**. Leg mir das Ergebnis vor, bevor du Dateien änderst.
3. Danach: ein Commit pro Abschnitt dieses Briefings, Commit-Message mit der Abschnittsnummer, zum Beispiel `4.3 Startseite: Abschnitt Der Moment`.
4. Am Ende ein Pull Request gegen `main` mit einer Zusammenfassung aller geänderten Dateien.
5. Niemals direkt auf `main` committen. Nichts löschen, was nicht in diesem Briefing steht.

---

## 2. Schritt 0: Inventur

Bevor du etwas änderst, verschaffe dir Klarheit und berichte:

- Welche HTML-Dateien gehören zu davidliebnau.com, welche zu light-creators.com? Liegen beide Seiten in diesem Repository oder nur eine?
- Vollständiger Dateibaum ohne `node_modules`, `.git` und Build-Ordner.
- Wie ist die Startseite aufgebaut: statisches HTML, Template-System, Static-Site-Generator, CMS-Export?
- Wo liegen CSS-Dateien und wo werden Farben definiert (Variablen, Tailwind-Config, Inline-Styles)?
- Wo liegen Bild- und Icon-Assets?
- Wie sind Unterseiten organisiert? Als Ordner mit `index.html` (`/threshold/index.html`) oder als einzelne Dateien (`threshold.html`)? Diese Antwort bestimmt, wie ich die neuen Seiten anlege.
- Gibt es Mehrsprachigkeit und wie ist sie gelöst (`/en/`-Ordner, Sprach-Suffix, Datei-Duplikate)?

Ergebnis als kurze Tabelle: Datei, Zweck, Sprache, Änderungsbedarf laut diesem Briefing.

---

## 3. Globale Regeln

Diese Regeln gelten für jede Datei und jeden Text, den du anfasst.

**R1 Signaturzeile.** Überall, wo bisher „Bewusstes Unternehmertum an kritischen Wendepunkten" steht, kommt „Bewusstes Leadership an kritischen Wendepunkten". Auch in `<title>`, Meta-Description, Open-Graph-Tags und Footer.

**R2 Award-Regel, wichtig.** Der HR Excellence Award darf auf der gesamten Website **nur** in einem Satz erscheinen, der im selben Satz die Rolle „Client Director und Mitglied der Geschäftsführung der SYNK GROUP" nennt. Nicht im Hero, nicht im Zahlenbalken, nicht in Meta-Tags, nicht in Alt-Texten, nicht auf der Führen-Seite in Kurzform. Wenn du eine Erwähnung findest, die diese Bedingung nicht erfüllt, entferne sie und melde die Stelle.

**R3 Preis-Regel.** Der Preis des Threshold-Programms erscheint auf der gesamten Website nur an einer einzigen Stelle: im Investitionsblock der Threshold-Seite. Überall sonst heißt es „für die Gründungsgruppe gilt ein Einführungspreis" oder der Preis wird gar nicht genannt. Grund: Der Preis steigt nach dem Piloten.

**R4 Termine.** Konkrete Programmtermine erscheinen nur auf der Threshold-Seite. Auf Startseite und allen anderen Seiten steht „Termine auf Anfrage".

**R5 Anrede.** Die gesamte Website duzt, auch die neue Führen-Seite. Auf der Führen-Seite steht direkt über dem Call-to-Action der Satz: „Ich duze in der Regel. Wenn dir das Sie lieber ist, sag es einfach, das ist überhaupt kein Thema."

**R6 Sprache.** Keine Gedankenstriche als Satzzeichen. Keine „nicht X, sondern Y"-Konstruktionen. Keine der Wörter ganzheitlich, nachhaltig, authentisch, auf Augenhöhe, Potenzial entfalten, Klarheit gewinnen. Ausnahme: wörtliche Zitate von Kunden werden nie redigiert.

**R7 Founder-Inhalte.** Die fünf Resonance-Faktoren, der Resonance Gap, das Founder Resonance Assessment und die Zeile „Das Update, das alle anderen Updates erst möglich macht" verschwinden von davidliebnau.com. Auf light-creators.com bleiben oder ziehen sie hin. Auf davidliebnau.com bleibt Founder ein Absatz mit Link.

**R8 Navigation.** Neue Hauptnavigation: Führen · Threshold · Podcast · Über mich · Kontakt · DE/EN. Das Assessment verschwindet aus der Hauptnavigation.

---

## 4. Startseite

Finde jeden Abschnitt über den angegebenen Suchtext. Wenn du ihn nicht findest, melde es, statt zu raten.

### 4.1 Meta und Signaturzeile

Suchtext: `Bewusstes Unternehmertum an kritischen Wendepunkten`
Ersetzen durch: `Bewusstes Leadership an kritischen Wendepunkten`
Gilt für alle Fundstellen inklusive `<title>` und Meta-Tags.

### 4.2 Hero

Suchtext: Bereich um `Das Update, das alle anderen Updates erst möglich macht`

Neuer Inhalt:

- Eyebrow: `Bewusstes Leadership an kritischen Wendepunkten`
- H1: `Wenn das Alte nicht mehr trägt und das Neue noch keine Form hat.`
- Fließtext: `Dort arbeite ich. Mit Geschäftsführern und Führungsteams, deren bisheriges Repertoire nicht mehr reicht. Mit jungen Erwachsenen vor einer wesentlichen Weichenstellung. Mit Gründerinnen und Gründern unter Druck.`
- Primär-Button: `Briefing-Gespräch anfragen` → Kontaktformular oder Buchungslink
- Sekundär-Button: `The Threshold Program` → `/threshold/`
- Textlink darunter, kleiner gesetzt: `Für Founder: Founder Resonance Assessment auf light-creators.com` → https://light-creators.com
- Zahlenbalken: `25 Jahre preisgekrönte Führungskräfteentwicklung · über 20.000 Teilnehmer · 25 Länder · 30 Jahre Bewusstseinsarbeit`

Die Zeile `Wer klar ist, dem folgt die Welt.` wird im Hero gestrichen. Sie darf im Footer stehen bleiben, falls sie dort vorkommt.

### 4.3 Abschnitt „Der Moment" (ersetzt „Du jonglierst drei Rollen")

Suchtext: `Du jonglierst drei Rollen`

Neuer Inhalt:

- Eyebrow: `Der Moment`
- H2: `Kennst du die Stelle, an der das, was immer funktioniert hat, aufhört zu funktionieren?`
- Vier Absätze, optisch gleichwertig, mit Abstand dazwischen:
  1. `Ein Vorstand hat drei Transformationsprogramme nacheinander gestartet, und keines davon hat wirklich funktioniert.`
  2. `Eine Geschäftsführerin führt seit fünfzehn Jahren erfolgreich und merkt, dass ihr Repertoire diesmal nicht reicht.`
  3. `Ein Gründer hat gute Zahlen und ein gutes Deck und bekommt trotzdem kein Term Sheet.`
  4. `Ein Neunzehnjähriger weiß nicht, wer er ist und wofür er einen sinnvollen Beitrag leisten will und kann.`
- Danach hervorgehoben: `Vier verschiedene Leben. Derselbe Ort.`
- Abschluss: `Ich nenne ihn die Entwicklungskante. An dieser Kante bringt mehr vom Selben nichts mehr. Was hilft, ist jemand, der den Raum hält, bis die eigene Antwort da ist.`

### 4.4 Abschnitt „Die Lücke"

Suchtext: `Pitch-Coaches optimieren Folien`

Neuer Inhalt:

- Eyebrow: `Die Lücke`
- H2: `Für den Übergang selbst ist niemand zuständig.`
- Absatz 1: `Für die Strategie gibt es Berater. Für die Umsetzung gibt es Projektleiter. Für den Kopf gibt es Coaches. Für die Zeit dazwischen, in der die alte Antwort schon weg und die neue noch nicht da ist, gibt es niemanden.`
- Absatz 2: `Dabei entscheidet sich genau dort, ob eine Organisation ihre besten Leute behält. Ob ein Führungsteam wieder entscheidungsfähig wird. Ob ein junger Mensch seine eigene Richtung findet oder die von jemand anderem übernimmt.`
- Absatz 3: `Ein Übergang lässt sich nicht managen. Er braucht Bedingungen, unter denen Menschen ihre eigenen Antworten finden. Die erschaffe ich.`

### 4.5 Abschnitt „Die schöpferischen Dialoge" (ersetzt die fünf Resonance-Faktoren)

Suchtext: `inneren Operating System` oder der Block mit `Obsession`, `Presence`, `Vision Resonance`, `Founder Fit`, `Scalable Logic`

Der komplette Block der fünf Resonance-Faktoren inklusive Resonance Gap wird entfernt und durch Folgendes ersetzt:

- Eyebrow: `Wie ich arbeite`
- H2: `Zukunftsintelligenz entsteht in schöpferischen Dialogen.`
- Absatz 1: `Zukunft kündigt sich an, bevor sie sichtbar wird. Meistens zuerst als Unruhe, als Reibung, als das Thema, das alle kennen und niemand ausspricht. Wer sie hören will, braucht Bedingungen, unter denen sie auftauchen kann.`
- Absatz 2: `Dafür habe ich eine Methode mit vier Schritten entwickelt. Ich arbeite damit im Executive Coaching online, in Workshops mit Führungsteams und in den Wäldern Finnlands. Der Prozess bleibt derselbe. Was sich ändert, ist der Ort.`

Danach vier Einheiten. Wenn der bisherige Block eine Karten- oder Rasterkomponente für die fünf Faktoren verwendet, nutze dieselbe Komponente für vier Einheiten. Jede Einheit besteht aus: SVG-Symbol (siehe Abschnitt 8), Ziffer, Titel, zwei Zeilen.

**01 · Loslassen. Raum schaffen.**
- `Im Unternehmen: alte Gewissheiten und altes Wissen loslassen. Aussprechen, was nicht mehr trägt, auch wenn es jahrelang richtig war.`
- `Im Wald: Raum schaffen, um das Flüstern der Zukunft zu hören. Zwei Tage ohne Feed und ohne die Meinung aller anderen.`

**02 · Verbinden. Zurück in Kontakt.**
- `Im Unternehmen: sichere Räume, in denen auch schwierige Emotionen Platz finden und bearbeitet werden. Erst dann lässt sich die Schwelle zum Neuen überschreiten.`
- `Im Wald: sich selbst erkennen, indem man von anderen bezeugt und gespiegelt wird. Entwicklung geschieht in Beziehung.`

**03 · Erkennen. Die Lage sehen und die Kraft, die darin liegt.**
- `Im Unternehmen: begründete Zuversicht erkennen und erschaffen. Neue Strategien gemeinsam entwickeln, die kollektiven Stärken entfesseln und daraus eine Zukunft bauen, die tragfähig ist.`
- `Im Wald: die eigenen Stärken und den eigenen Beitrag erkennen, ohne sich im Feed mit anderen zu vergleichen.`

**04 · Gestalten. Den nächsten Schritt bauen.**
- `Im Unternehmen: eine Entscheidung, die das Team trägt, und ein Entwicklungs-Sprint, an dessen Ende ein erstes konkretes Ergebnis steht.`
- `Zurück aus dem Wald: ein konkreter nächster Schritt und ein Buddy-System an deiner Seite, mit dem du etwas schaffst, was du allein nicht geschafft hättest.`

Abschluss unter den vier Einheiten: `Deshalb ist Threshold kein Nebenprojekt. Es ist dieselbe Arbeit in einer anderen Lebensphase.`

### 4.6 Neuer Abschnitt „Drei Wege"

Direkt nach 4.5 einfügen. Dreispaltig auf Desktop, gestapelt auf Mobil.

- Eyebrow: `Wo ich arbeite`
- H2: `Drei Wege, eine Entwicklungskante.`

**Spalte 1**
- Titel: `Führen. Für Geschäftsführung, Führungsteams und Organisationen.`
- Text: `Wenn das Geschäftsmodell nicht mehr trägt. Wenn eine Führungskraft oder ein ganzes Team mit dem bisherigen Repertoire nicht mehr weiterkommt. Maßgeschneiderte Programme, Begleitung von Führungsteams, Einzelarbeit auf Geschäftsführungsebene.`
- Link: `Zur Führen-Seite` → `/fuehren/`

**Spalte 2**
- Titel: `Wachsen. Für junge Erwachsene zwischen 18 und 28.`
- Text: `The Threshold Program: sechs Tage in den Wäldern Finnlands, für alle, die vor einer wesentlichen Weichenstellung stehen. Kleine Gruppen, Termine auf Anfrage.`
- Link 1: `Zum Programm` → `/threshold/`
- Link 2: `Für Eltern, Stiftungen und Unternehmen: Plätze finanzieren` → `/threshold/partner/`

**Spalte 3**
- Titel: `Gründen. Für Founder.`
- Text: `Wie Präsenz und Beziehungsführung über Funding und Team entscheiden. Diese Arbeit läuft unter Founder Resonance.`
- Link: `Zu light-creators.com` → https://light-creators.com

### 4.7 Über David

Suchtext: `Mit Anfang 40`

Neuer Inhalt:

- Eyebrow: `Über David`
- H2: `Warum ich diese Arbeit mache.`
- `Über 25 Jahre mit Menschen in Verantwortung. Trainer, Coach, Facilitator. In internationalen Leadership-Beratungen habe ich Programme entwickelt und als Client Director und Mitglied der Geschäftsführung Millionenprojekte verantwortet. Über 20.000 Führungskräfte in 25 Ländern, vom Team-Lead bis in die C-Suite.`
- `Ich kenne Führung aus der operativen Realität. Und ich kenne ihren Preis.`
- `Mit Anfang 40 stand ich selbst kurz vor dem Kollaps. Nicht, weil ich unfähig war. Weil ich zu lange funktioniert habe.`
- Zwischenüberschrift: `Wo es angefangen hat`
- `Mit 22 war ich vier Tage und Nächte allein auf dem Vision Mountain im Bundesstaat Washington. Fastend. Mit zwei Fragen: Wer bin ich, und was ist mein Beitrag?`
- `Was sich damals zeigte, hat mich seither geführt: die Arbeit an Beziehungen. Zwischen Menschen, in Teams, und zwischen einer Führungskraft und dem, was durch ihre Arbeit wirken will.`
- `Fünfunddreißig Jahre später erschaffe ich die Räume und die schöpferischen Dialoge, die ich damals selbst gebraucht hätte. In den Wäldern Finnlands. In Online-Meetings. In Besprechungsräumen von Unternehmen und Hotels.`

### 4.8 Neuer Abschnitt „Zwei Schulen"

Direkt nach 4.7 einfügen, ruhig gesetzt, ohne Bild.

- Eyebrow: `Zwei Schulen`
- H2: `Moderne Führungswissenschaft. Alte Wege zur Klarheit.`
- `Die meisten Anbieter entscheiden sich für eine Seite. Struktur und Evidenz. Oder Tiefe und Präsenz.`
- `Meine Arbeit läuft auf beidem, weil eine Entwicklungskante beides braucht. Die eine Seite ist forschungsbasiert: 25 Jahre Führungsentwicklung, Stärkenarbeit aus der Gallup-Forschung, Lernarchitekturen für Konzerne. Die andere Seite ist 30 Jahre alt und kommt aus der Praxis: kontemplative Arbeit auf der Ebene von Körper, Emotion und Sprache. Dazu eigene Visionssuchen an wilden Orten, keine geliehene Theorie.`
- `Was daraus entsteht, ist kein Kompromiss. Es ist der Grund, warum in meinen Räumen Dinge gesagt werden, die in anderen Räumen nicht gesagt werden.`

### 4.9 Organisationen

Suchtext: `Führung wirkt nie isoliert` oder `Customised Inhouse-Programme`

Neuer Inhalt:

- Eyebrow: `Organisationen`
- H2: `Ich habe Führungsprogramme gebaut und selbst geführt.`
- `In den letzten 25 Jahren habe ich Multimillionen-Programme für über 20.000 Teilnehmer konzipiert und geleitet. Zunächst als Senior Learning & Development Consultant bei Gallup, später als Mitglied der Geschäftsführung und Client Director der SYNK GROUP. Eines dieser Programme wurde in meiner Rolle bei der SYNK GROUP mit dem HR Excellence Award ausgezeichnet.`
- `Umsatzverantwortung, Teams, Entscheidungen ohne ausreichende Information: ich kenne die Seite des Tisches, auf der meine Kunden sitzen.`
- `Heute arbeite ich mit Familienunternehmen, mit wachsenden Organisationen und mit Konzernen. Die Fragen sind unterschiedlich groß, die Kante ist dieselbe. Jedes Programm wird für die konkrete Lage gebaut. Standardtrainings gibt es woanders.`
- Link: `Wie ein Auftrag abläuft` → `/fuehren/`

### 4.10 Testimonials

Suchtext: `Was Kunden sagen`

- Eyebrow bleibt: `Was Kunden sagen`
- H2: `Von Einzelcoachings bis zu konzernweiten Programmen.`
- Einleitungssatz über den Zitaten: `In meiner Rolle als Client Director der SYNK GROUP habe ich für Kunden wie die Lufthansa Group, BMW, die Deutsche Bahn, ZF und viele andere gearbeitet.`
- Bestehende Zitate bleiben unverändert stehen, inklusive Namen und Funktionen.
- Neuer Link unter den Zitaten: `Alle Empfehlungen auf LinkedIn` → https://www.linkedin.com/in/david-liebnau/ (Attribut `rel="noopener"`, neues Fenster)

### 4.11 Podcast

Suchtext: `Neue Episode jeden Dienstag`

- H2 bleibt: `Alle entscheidenden Beziehungen beginnen mit einer: der zu dir selbst.`
- Text: `Für Menschen in Verantwortung, die fast alles optimiert haben, außer dieser Verbindung.`
- Der Satz `Neue Episode jeden Dienstag` wird ersatzlos gestrichen.
- Der Satz mit `Für Founder` wird ersetzt durch den Text oben.
- Buttons: `Alle Episoden` → Podcast-Seite, dazu Spotify und Apple Podcasts wie bisher.

### 4.12 Threshold-Teaser

Suchtext: `Schaffe Raum für die Antwort, die wirklich deine ist`

- Eyebrow: `The Threshold Program`
- H2: `Sechs Tage, die eine Weichenstellung möglich machen.`
- Text: `Für junge Erwachsene zwischen 18 und 28, die vor einer wegweisenden Entscheidung stehen und sie nach ihrem eigenen Maßstab treffen wollen. Sechs Tage in den Wäldern Finnlands, zwei davon begleitet allein in der Natur. Danach ein konkreter Plan und sechs Wochen Begleitung. Kleine Gruppen, Termine auf Anfrage.`
- Button 1: `Zum Programm` → `/threshold/`
- Button 2: `Einen Platz finanzieren` → `/threshold/partner/`
- Datum und Preis werden hier entfernt (siehe R3 und R4).

### 4.13 Call-to-Action-Block

Suchtext: `Founder Resonance Assessment` im CTA-Bereich

Kompletter Ersatz:

- Eyebrow: `Der nächste Schritt`
- H2: `Drei Wege, mit mir zu sprechen.`

**Karte 1**
- Titel: `Für Unternehmen: Briefing-Gespräch`
- Text: `60 Minuten, kostenlos, per Video. Du schilderst die Lage, ich sage dir, ob und wie ich damit arbeiten würde. Danach bekommst du eine Skizze mit Format, Aufwand, Zeitrahmen und Preis, spätestens innerhalb einer Woche. Ohne dieses Gespräch mache ich kein Angebot.`
- Button: `Briefing-Gespräch anfragen`

**Karte 2**
- Titel: `Für Threshold: Bewerbungsgespräch`
- Text: `Schreib mir drei Sätze dazu, wo du gerade stehst. Wir sprechen 30 Minuten. Danach weißt du, ob Threshold dein nächster Schritt ist, und ich weiß, ob die Gruppe zu dir passt. Zusage oder Absage kommt direkt im Gespräch.`
- Button: `Gespräch beginnen`

**Karte 3**
- Titel: `Für Eltern, Stiftungen und Unternehmen: Plätze finanzieren`
- Text: `In 30 Minuten erforschen wir gemeinsam, ob dieses Programm das Richtige ist, wie die sechs Tage ablaufen und welchen Mehrwert es bringt. Die Kosten pro Platz besprechen wir im Gespräch, für die Gründungsgruppe gilt noch ein Einführungspreis. Bei Stipendien: eine schriftliche Rückmeldung der Person, die du unterstützt hast, mit ihrer Zustimmung.`
- Button: `Partnerschaft anfragen`

Darunter eine Zeile, kleiner gesetzt: `Für Founder Resonance: light-creators.com`

### 4.14 English-Block

Suchtext: `For English-speaking founders`

- Eyebrow: `For international clients`
- H2: `The work isn't limited by language.`
- Text: `Corporate programmes, Threshold and one-to-one work all run in English. The Threshold Program has an English page. Founder work lives at light-creators.com.`
- Links: `Threshold in English` → englische Threshold-Seite, `light-creators.com` → https://light-creators.com

### 4.15 Footer

- Signaturzeile: `Bewusstes Leadership an kritischen Wendepunkten.`
- Der Link `Für systematische Arbeit: light-creators.com` wird zu `Für Founder Resonance: light-creators.com`
- Footer-Navigation an die neue Hauptnavigation angleichen (R8).

---

## 5. Neue Seite `/fuehren/`

Struktur analog zur bestehenden Threshold-Seite, gleiche Komponenten, gleiche Typografie.

**Meta**
- Title: `Führen · David Liebnau`
- Description: `Begleitung für Geschäftsführung, Führungsteams und Organisationen an Wendepunkten, an denen das bisherige Repertoire nicht mehr reicht.`

**Hero**
- Eyebrow: `Für Geschäftsführung, Führungsteams und Organisationen`
- H1: `Wenn das, was das Unternehmen groß gemacht hat, es jetzt bremst.`
- Unterzeile: `Bewusstes Leadership an erfolgskritischen Wendepunkten.`
- Button: `Briefing-Gespräch anfragen`

**Abschnitt: Zwei Sätze**
- H2: `Zwei Sätze, die ich in Erstgesprächen ständig höre.`
- Zitat 1: `Wir haben alles versucht, was früher funktioniert hat.`
- Zitat 2: `Ich weiß nicht mehr, wo ich anfangen soll.`
- `Beides sind keine Kompetenzprobleme. Es sind Übergänge. Das Geschäftsmodell trägt noch, aber die Kurve zeigt, dass es nicht mehr lange trägt. Die Führungskraft ist erfahren, aber die Erfahrung passt nicht mehr auf die Lage. Das Team arbeitet härter und kommt langsamer voran.`
- `Was in dieser Lage passiert: Es wird mehr vom Selben verordnet. Noch ein Programm, noch ein Reporting, noch eine Reorganisation. Die besten Leute verbrauchen sich zuerst. Genau die, aus deren Energie die nächste Antwort entstehen müsste.`

**Abschnitt: Wie ich arbeite**
- H2: `Wie ich arbeite`
- `Erst zurück zur Kraft. Solange ein Führungsteam im Dauerreagieren steckt, ist das Wissen, das im Unternehmen längst vorhanden ist, nicht verfügbar. Also fangen wir dort an.`
- `Dann die Lage sehen, wie sie ist. Ohne Beschönigung, ohne Schuldzuweisung, mit den Menschen im Raum, die es betrifft.`
- `Dann Entscheidungen, die tragen. Und ein Termin, an dem überprüft wird, ob sie noch tragen.`
- Verlinkung auf den Methodenabschnitt der Startseite: `Die vier Schritte im Detail`

**Abschnitt: Formate**
- H2: `Formate`
- `Einzelarbeit auf Geschäftsführungsebene. Für Menschen, die niemanden haben, mit dem sie offen sprechen können.`
- `Führungsteam-Begleitung. Klausuren, Alignment-Prozesse, Konfliktklärung an der Spitze.`
- `Programme. Blended-Learning-Architekturen über mehrere Monate, für Führungsebenen oder ganze Organisationen.`
- `Alles wird für die konkrete Lage gebaut. Deshalb gibt es keine Preisliste. Nach dem Briefing-Gespräch bekommst du eine Skizze mit Format, Aufwand und Preis, und entscheidest dann.`

**Abschnitt: Abgrenzung**
- H2: `Wofür ich nicht der Richtige bin`
- `Für Standardtrainings von der Stange. Für Programme, die eine Entscheidung ersetzen sollen, die die Geschäftsführung nicht treffen will. Für Situationen, in denen das Ergebnis vorher feststeht und nur noch Zustimmung eingesammelt wird.`

**Abschnitt: Belege**
- H2: `Belege`
- `In den letzten 25 Jahren Multimillionen-Programme für über 20.000 Teilnehmer konzipiert und geleitet. Zunächst als Senior Learning & Development Consultant bei Gallup, später als Mitglied der Geschäftsführung und Client Director der SYNK GROUP. Eines dieser Programme wurde in dieser Rolle mit dem HR Excellence Award ausgezeichnet.`
- Zitate von der Startseite hier gespiegelt einsetzen (dieselben Quellen, keine neuen erfinden).
- Link: `Alle Empfehlungen auf LinkedIn` → https://www.linkedin.com/in/david-liebnau/

**Abschluss**
- H2: `Briefing-Gespräch`
- `Ich duze in der Regel. Wenn dir das Sie lieber ist, sag es einfach, das ist überhaupt kein Thema.`
- `60 Minuten, kostenlos, per Video. Du schilderst die Lage. Ich stelle Fragen und sage dir ehrlich, ob ich der Richtige bin. Wenn ja, bekommst du innerhalb einer Woche eine Skizze mit Format, Aufwand, Zeitrahmen und Preis. Wenn nein, sage ich dir, wen ich stattdessen empfehle.`
- Button: `Gespräch anfragen`

---

## 6. Neue Seite `/threshold/partner/`

Zielgruppe: Eltern als Zahler, Stiftungen, Bildungsträger, Unternehmen. Ruhiger, sachlicher als die Threshold-Seite.

**Meta**
- Title: `Plätze finanzieren · The Threshold Program`
- Description: `Für Eltern, Stiftungen und Unternehmen, die jungen Erwachsenen einen Platz im Threshold Program ermöglichen.`

**Inhalt**
- Eyebrow: `The Threshold Program`
- H1: `Einen Platz möglich machen.`
- `Threshold ist ein sechstägiges Programm für junge Erwachsene zwischen 18 und 28, die vor einer wesentlichen Weichenstellung stehen. Zwei begleitete Tage allein in der Natur, eine kleine Gruppe, ein konkreter nächster Schritt und sechs Wochen Begleitung danach.`
- H2: `Wer die Plätze finanziert`
- `Manche Teilnehmer zahlen selbst. Manche werden von ihren Eltern unterstützt. Und manche Plätze werden von Stiftungen, Bildungsträgern oder Arbeitgebern übernommen, die jungen Menschen einen Zugang ermöglichen wollen, den sie sich sonst nicht leisten könnten.`
- H2: `Was du zurückbekommst`
- `Bei Stipendien: eine schriftliche Rückmeldung der Person, die du unterstützt hast, mit ihrer Zustimmung. Kein Marketingmaterial, sondern die eigenen Worte eines jungen Menschen darüber, was sich verändert hat.`
- H2: `Wege der Zusammenarbeit`
- Hier die vier bestehenden Partnerschaftswege von der Threshold-Seite übernehmen, im Wortlaut angepasst auf Zahler statt Teilnehmer. **Vor dem Schreiben: bestehenden Text auslesen und mir vorlegen.** Nichts neu erfinden.
- H2: `Kosten`
- `Für die Gründungsgruppe gilt ein Einführungspreis. Die Kosten pro Platz besprechen wir im Gespräch.` (siehe R3)
- Abschluss-CTA: `In 30 Minuten erforschen wir gemeinsam, ob dieses Programm das Richtige ist, wie die sechs Tage ablaufen und welchen Mehrwert es bringt.` Button: `Partnerschaft anfragen`

---

## 7. Änderungen auf `/threshold/`

**7.1** Die Eyebrow-Zeile `Bewusstes Leadership an kritischen Wendepunkten` ganz oben auf der Seite wird ersatzlos entfernt. Die Seite beginnt direkt mit `Bevor du wählst, was als Nächstes kommt`. Im Footer bleibt die Signaturzeile stehen.

**7.2** Der ausführliche Partnerschaftsabschnitt inklusive des Absatzes zum Zeitalter der KI zieht vollständig auf `/threshold/partner/`. An seiner Stelle steht nur noch:
- H2: `Wenn jemand anderes den Platz bezahlt.`
- `Manche Plätze werden von Eltern finanziert, andere von Stiftungen, Bildungsträgern oder Arbeitgebern. Wenn das für dich in Frage kommt, schick diesen Link weiter.`
- Link: `Für Eltern, Stiftungen und Unternehmen` → `/threshold/partner/`

**7.3** Der Eltern-Abschnitt bleibt auf der Threshold-Seite, unverändert.

**7.4** Der Investitionsblock mit dem Preis bleibt unverändert. Das ist die einzige Stelle auf der Website mit einer Preisangabe.

---

## 8. Assets: die vier Symbole

Vier neue SVG-Dateien anlegen, Ablageort nach Inventur (dort, wo die übrigen Icons liegen):

`01-loslassen.svg`, `02-verbinden.svg`, `03-erkennen.svg`, `04-gestalten.svg`

Einbindung als Inline-SVG im Methodenblock, nicht als `<img>`, damit die Farbe vererbt wird. Jedes SVG behält `stroke="currentColor"`. Das Attribut `style="color:#E3C486"` aus den Vorlagendateien wird beim Einbau **entfernt**, die Farbe kommt aus dem CSS.

CSS ergänzen:

```css
:root { --gold: #E3C486; }
.methode-symbol { width: 96px; height: 96px; color: var(--gold); }
@media (max-width: 640px) { .methode-symbol { width: 56px; height: 56px; } }
@media (prefers-reduced-motion: reduce) { .methode-symbol { animation: none; transition: none; } }
```

Optional, nur wenn die Seite bereits Scroll-Reveals verwendet: einmalige Einblendung beim Scrollen. Keine Dauerrotation, keine Endlosanimation.

Der SVG-Quellcode liegt in den Dateien, die ich separat übergebe. Falls sie nicht vorliegen, melde das, statt die Formen nachzubauen.

---

## 9. Nicht anfassen

- Wörtliche Kundenzitate, Namen und Funktionen.
- Bestehende Bilder und Fotos.
- Impressum, Datenschutz, Cookie-Einstellungen.
- Formulare und Buchungs-Integrationen. Nur die Beschriftung der Buttons ändert sich, nicht ihre Funktion.
- light-creators.com, falls es in diesem Repository liegt. Der Umzug der Founder-Inhalte dorthin ist ein eigener Auftrag.

---

## 10. Offene Punkte, bitte melden statt entscheiden

1. **LinkedIn-Empfehlungen.** Der Wortlaut fehlt noch und wird nachgeliefert. Lege im Belege-Abschnitt der Führen-Seite einen klar markierten Platzhalter an.
2. **Zieladressen der Buttons.** Wohin führen `Briefing-Gespräch anfragen`, `Gespräch beginnen` und `Partnerschaft anfragen`? Bestehende Ziele aus dem alten Code übernehmen und mir vorlegen, welches Ziel du welchem Button zugeordnet hast.
3. **Umzug der Founder-Inhalte.** Die entfernten Blöcke (fünf Resonance-Faktoren, Resonance Gap, Assessment, die Zeile zum Update) nicht löschen, sondern in eine Datei `_archiv/founder-resonance-bloecke.html` sichern, damit sie für light-creators.com verfügbar bleiben.
4. **Englische Fassungen.** Falls englische Seiten existieren, in diesem Durchgang nur die Signaturzeile und die Navigation angleichen. Die Übersetzung der neuen Texte ist ein eigener Auftrag.
5. **Vier-Wörter-Annahme.** Im Text steht „Mitglied der Geschäftsführung und Client Director der SYNK GROUP". Wenn im bestehenden Code eine abweichende Rollenbezeichnung steht, melde den Unterschied, statt ihn zu vereinheitlichen.
