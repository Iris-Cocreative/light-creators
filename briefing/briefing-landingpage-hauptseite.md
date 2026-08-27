# Briefing für Claude Code — Landingpage davidliebnau.com (lokale HTML-Dateien)

## Kontext
Die Seite besteht aus **lokalen HTML-Dateien** im Projektordner (lokale Vorschau lief unter localhost:8000). Sie wird später nach **davidliebnau.com** deployt — **kein Webflow**. Code bearbeitet also direkt die Dateien; das Deployment ist ein separater Schritt nach Freigabe des Textes.

## Ziel
Textänderungen auf der **Hauptseite** umsetzen — in der **deutschen** *und* der **englischen** Version. Deutsch ist die Quelle. Die englischen Fassungen sind unten mitgeliefert; sie sind **bewusst frei und idiomatisch** formuliert (native English, keine 1:1-Übersetzung) — bitte auf inhaltliche Deckung mit dem DE-Text prüfen, nicht auf Wörtlichkeit.

## Vorgehen
- **Zuerst orientieren:** Projektordner sichten. Welche Datei ist die deutsche Hauptseite (z. B. `index.html`)? Wie ist Englisch abgelegt — eigene Datei (`en.html`, `/en/index.html`) oder existiert sie lokal noch nicht? Erst danach ersetzen.
- **Pro Änderung:** in der Datei den ALT-Text als Anker suchen, durch NEU ersetzen. Umgebendes Markup (Tags, Klassen, umschließende Elemente) unverändert lassen — nur den Textinhalt tauschen.
- **Buttons/Links** (z. B. „Mehr Infos" / „Learn more") stehen lassen, nur den Fließtext tauschen.
- Falls die EN-Datei lokal fehlt: **nicht neu anlegen ohne Rückfrage** — melden, wie EN im Projekt gehandhabt wird, und Freigabe abwarten.
- Nach den Änderungen lokal in der Vorschau prüfen. **Kein Deploy nach davidliebnau.com ohne Freigabe von David.**

## Vorab-Hinweise
1. **HREA-Logo — web-fertige Datei liegt bereit:** `HREA_Logo_Gewinner_2017_web.png` (transparent, sRGB, 600×1183 px, aus dem Vektor-EPS gerendert). In den Bild-/Assets-Ordner des Projekts legen und per `<img>` an der markierten Stelle einbinden. Opaker Fallback für helle Sektionen: `HREA_Logo_Gewinner_2017_web_whitebg.jpg`. Die Originale (`.jpg` = CMYK-Druck, `.eps` = Vektor) **nicht** direkt einbinden — CMYK/EPS rendern im Browser nicht korrekt.
2. An Davids NEU-Text wurden **leichte Korrekturen** vorgenommen (Tippfehler/Grammatik) — vollständige Liste am Ende. Bitte gegenchecken.

---

## Änderung 1 — Hero-Section

**ALT (DE) — finden:**
> Dort arbeite ich. Mit Geschäftsführern und Führungsteams, deren bisheriges Repertoire nicht mehr reicht. Mit jungen Erwachsenen vor einer wesentlichen Weichenstellung. Mit Gründerinnen und Gründern unter Druck.

**NEU (DE):**
> Dort arbeite ich. Mit CEOs und Führungsteams, deren bisheriges Repertoire nicht mehr reicht. Mit jungen Erwachsenen vor einer wesentlichen Weichenstellung. Mit Gründerinnen und Gründern unter Druck.

**NEU (EN):**
> That's where I work. With CEOs and leadership teams whose existing repertoire no longer takes them far enough. With young adults at a decisive crossroads. With founders under pressure.

---

## Änderung 2 — Section „Wie ich arbeite" (Fließtext)

**ALT (DE) — finden:**
> Zukunft kündigt sich an, bevor sie sichtbar wird. Meistens zuerst als Unruhe, als Reibung, als das Thema, das alle kennen und niemand ausspricht. Wer sie hören will, braucht Bedingungen, unter denen sie auftauchen kann.
> Dafür habe ich eine Methode mit vier Schritten entwickelt. Ich arbeite damit im Executive Coaching online, in Workshops mit Führungsteams und in den Wäldern Finnlands. Der Prozess bleibt derselbe. Was sich ändert, ist der Ort.

**NEU (DE):**
> Viele Menschen in meiner Branche glauben immer noch, dass ihre Kunden mehr Informationen brauchen. Aus meiner Erfahrung ist das eigentliche Problem jedoch nicht der Mangel an Informationen.
> Es braucht vielmehr Raum, um das für uns jeweils Wesentliche zu erkennen, das Flüstern der Zukunft zu hören, und Verbindung, um das Erkennen in konkrete Ergebnisse zu übertragen. Dafür habe ich eine Methode mit vier Schritten entwickelt. Ich arbeite damit im Executive Coaching online, in Workshops mit Führungsteams und in den Wäldern Finnlands. Der Prozess bleibt derselbe. Was sich ändert, ist der Ort.

**NEU (EN):**
> Many people in my field still believe their clients need more information. In my experience, a lack of information was never the real problem.
> What people need is space — room to see what matters most, to hear the future while it's still a whisper — and connection, to turn that recognition into concrete results. That's what my four-step method is built for. I work with it in executive coaching online, in workshops with leadership teams, and in the forests of Finland. The process stays the same. Only the setting changes.

---

## Änderung 3 — Titel „03" (dritter von vier Schritten in „Wie ich arbeite")

**ALT (DE) — finden:**
> Erkennen. Die Lage sehen und die Kraft, die darin liegt.

**NEU (DE):**
> Erkennen. Eine positive Zukunftsvision entwickeln

**NEU (EN):**
> Recognise. Building a positive vision of the future

---

## Änderung 4 — Textblock löschen + durch Zitat ersetzen

**ALT (DE) — löschen:**
> Deshalb ist Threshold kein Nebenprojekt. Es ist dieselbe Arbeit in einer anderen Lebensphase.

**NEU (DE + EN, identisch):**
> „Tomorrow belongs to those – who can hear it coming." — David Bowie

---

## Änderung 5 — Section „Über David"

**Aktion:** Überschrift + kompletten Fließtext ersetzen. Den „Mehr Infos"-Button unten stehen lassen.

**ALT (DE) — finden:**
> Warum ich diese Arbeit mache.
> Über 25 Jahre mit Menschen in Verantwortung. Trainer, Coach, Facilitator. In internationalen Leadership-Beratungen habe ich Programme entwickelt und als Client Director und Mitglied der Geschäftsführung der SYNK GROUP Millionenprojekte verantwortet. Über 20.000 Führungskräfte in 25 Ländern, vom Team-Lead bis in die C-Suite. Ich kenne Führung aus der operativen Realität. Und ich kenne ihren Preis.
> Mit Anfang 40 stand ich selbst kurz vor dem Kollaps. Nicht, weil ich unfähig war. Weil ich zu lange funktioniert habe.
> Wo es angefangen hat
> Mit 22 war ich vier Tage und Nächte allein auf dem Vision Mountain im Bundesstaat Washington. Fastend. Mit zwei Fragen: Wer bin ich, und was ist mein Beitrag?
> Was sich damals zeigte, hat mich seither geführt: die Arbeit an Beziehungen. Zwischen Menschen, in Teams, und zwischen einer Führungskraft und dem, was durch ihre Arbeit wirken will.
> Fünfunddreißig Jahre später erschaffe ich die Räume und die schöpferischen Dialoge, die ich damals selbst gebraucht hätte. In den Wäldern Finnlands. In Online-Meetings. In Besprechungsräumen von Unternehmen und Hotels.

**NEU (DE):**
> **Wofür ich diese Arbeit mache**
>
> Ich liebe es, Menschen, Teams und Organisationen dafür zu befähigen, gelingende Beziehungen zu gestalten. Der Beziehung zu sich selbst, Teammitgliedern, dem Markt und der Mitwelt.
>
> Dieser Mission folge ich seit über 25 Jahren. Sie führte mich zur Arbeit als Coach, Trainer und Facilitator mit über 20.000 Führungskräften in 25 Ländern, vom Team-Lead bis in die C-Suite von großen Konzernen. Ich kenne Führung aus der operativen Realität. Und ich kenne ihren Preis.
>
> Mit Anfang 40 stand ich selbst kurz vor dem Kollaps. Weil ich jahrzehntelang meine eigenen Bedürfnisse ignoriert und dabei übersehen hatte, dass die wichtigste Stakeholder-Beziehung die zu mir selbst ist.
>
> **Wo es angefangen hat**
>
> Mit 22 Jahren saß ich vier Tage und Nächte allein auf einem Berg namens Vision Mountain im US-Bundesstaat Washington. Fastend. Mit zwei Fragen: Wer bin ich, und was ist mein Beitrag?
>
> Was sich damals zeigte, leitet mich noch heute: die Arbeit an gelingenden Beziehungen und der innere Ruf, Räume und schöpferische Dialoge zu schaffen, die es meinen Kunden ermöglichen, ihre eigene Vision zu erkennen und kraftvoll zu verwirklichen.
>
> Dieser Mission folge ich in den Wäldern Finnlands. In Online-Meetings. In Besprechungsräumen von Unternehmen und Hotels.

**NEU (EN):**
> **What I do this work for**
>
> I love enabling people, teams and organisations to build relationships that truly work — the relationship with themselves, with the people they work alongside, with the market, and with the living world around them.
>
> I've followed this calling for more than 25 years. It has taken me into work as a coach, trainer and facilitator with over 20,000 leaders across 25 countries, from team lead to the C-suites of major corporations. I know leadership as a lived, operational reality. And I know what it costs.
>
> In my early forties, I came close to collapse myself — because for decades I had ignored my own needs, and missed the fact that the most important stakeholder relationship of all is the one with yourself.
>
> **Where it began**
>
> At 22, I sat alone for four days and nights on a mountain called Vision Mountain in Washington State. Fasting. Holding two questions: Who am I, and what am I here to contribute?
>
> What surfaced there still guides me today: the work on relationships that flourish, and the inner call to create the kind of spaces and generative dialogue that let my clients see their own vision clearly and bring it powerfully to life.
>
> I follow that calling in the forests of Finland. In online meetings. In the meeting rooms of companies and hotels.

---

## Änderung 6 — Section „Zwei Schulen"

**ALT (DE) — finden:**
> Die meisten Anbieter entscheiden sich für eine Seite. Struktur und Evidenz. Oder Tiefe und Präsenz.
> Meine Arbeit läuft auf beidem, weil eine Entwicklungskante beides braucht. Die eine Seite ist forschungsbasiert: 25 Jahre Führungsentwicklung, Stärkenarbeit aus der Gallup-Forschung, Lernarchitekturen für Konzerne. Die andere Seite ist 30 Jahre alt und kommt aus der Praxis: kontemplative Arbeit auf der Ebene von Körper, Emotion und Sprache. Dazu eigene Visionssuchen an wilden Orten, keine geliehene Theorie.
> Was daraus entsteht, ist kein Kompromiss. Es ist der Grund, warum in meinen Räumen Dinge gesagt werden, die in anderen Räumen nicht gesagt werden.

**NEU (DE):**
> Die meisten Anbieter entscheiden sich für eine Seite. Struktur und Evidenz. Oder Tiefe und Präsenz. Meine Arbeit integriert beide Perspektiven, weil das erfolgreiche Überschreiten einer Entwicklungskante einen integralen Ansatz braucht. Die eine Seite ist evidenzbasiert: 25+ Jahre Führungsentwicklung, stärkenorientierte Entwicklung nach der Gallup-Forschung, nachweislich wirksame und preisgekrönte Blended-Learning-Architekturen für Unternehmen.
> Die andere Seite basiert auf den uralten Praktiken der Weisheitstraditionen und wird verkörpert durch meine über 30 Jahre lange Praxis von Meditation, kontemplative Arbeit auf der Ebene von Körper, Emotion und Sprache, mehrmonatigen Retreats und eigenen Visionssuchen an wilden Orten, keine geliehene Theorie. Diese besondere Kombination von moderner Leadership-Forschung und den zeitlosen Praktiken der Weisheitstraditionen ist der Grund, warum in meinen Räumen Entwicklungsprozesse realisiert werden, die in anderen Räumen gar nicht erst wahrgenommen werden.

**NEU (EN):**
> Most providers pick a side. Structure and evidence. Or depth and presence. My work brings both together, because successfully crossing a developmental edge takes an integral approach. One side is evidence-based: 25+ years in leadership development, strengths-based work grounded in Gallup research, and proven, award-winning blended-learning architectures built for organisations.
> The other side reaches back to the ancient practices of the wisdom traditions, embodied in more than 30 years of my own practice: meditation; contemplative work at the level of body, emotion and language; months-long retreats; and my own vision quests in wild places. None of it borrowed theory. It's this particular pairing of modern leadership research and the timeless practices of the wisdom traditions that lets developmental work unfold in my rooms that other rooms never even notice.

---

## Änderung 7 — Section „Organisationen"

**Aktion:** Fließtext ersetzen **und** HREA-Logo einfügen (nach dem Award-Satz).

**ALT (DE) — finden:**
> In den letzten 25 Jahren habe ich Multimillionen-Programme für über 20.000 Teilnehmer konzipiert und geleitet. Zunächst als Senior Learning & Development Consultant bei Gallup, später als Mitglied der Geschäftsführung und Client Director der SYNK GROUP. Eines dieser Programme wurde in meiner Rolle bei der SYNK GROUP mit dem HR Excellence Award ausgezeichnet.
> Umsatzverantwortung, Teams, Entscheidungen ohne ausreichende Information: ich kenne die Seite des Tisches, auf der meine Kunden sitzen.
> Heute arbeite ich mit Familienunternehmen, mit wachsenden Organisationen und mit Konzernen. Die Fragen sind unterschiedlich groß, die Kante ist dieselbe. Jedes Programm wird für die konkrete Lage gebaut. Standardtrainings gibt es woanders.

**NEU (DE):**
> In den letzten 25 Jahren habe ich Multimillionen-Entwicklungsprogramme für über 20.000 Teilnehmer konzipiert und geleitet. Zunächst als Senior Learning & Development Consultant bei Gallup, später als Mitglied der Geschäftsführung und Client Director der SYNK GROUP. In dieser Zeit wurde eines meiner Programme mit dem HR Excellence Award ausgezeichnet.
>
> **[HIER HREA-Logo einfügen — `HREA_Logo_Gewinner_2017_web.png`]**
>
> Umsatzverantwortung, Leitung von internationalen Teams, Umgang mit Stapel-Krisen, Entscheidungen ohne ausreichende Information: ich kenne die Seite des Tisches, auf der meine Kunden sitzen.
>
> Heute arbeite ich mit Familienunternehmen, mit wachsenden Organisationen und mit Konzernen. Die Fragen sind unterschiedlich groß, aber immer geht es um Entwicklungskanten. Jedes Programm wird für die konkrete Lage gebaut. Standardtrainings gibt es woanders.

**NEU (EN):**
> Over the past 25 years, I've designed and led multi-million development programmes for more than 20,000 participants. First as a Senior Learning & Development Consultant at Gallup, later as an executive board member and Client Director at SYNK GROUP. Along the way, one of my programmes was honoured with the HR Excellence Award.
>
> **[INSERT HREA logo here — `HREA_Logo_Gewinner_2017_web.png`]**
>
> Revenue responsibility, leading international teams, handling one crisis stacked on the next, making calls without enough information: I know the side of the table my clients sit on.
>
> Today I work with family businesses, with scaling organisations, and with large corporations. The questions differ in scale, but it always comes down to developmental edges. Every programme is built for the specific situation. Off-the-shelf training is available elsewhere.

---

## Vorgenommene Korrekturen an Davids NEU-Text (bitte gegenchecken)
- **Hero:** „CEO´s" → „CEOs"
- **Wie ich arbeite:** „ist eigentliche Problem" → „ist **das** eigentliche Problem"; „Es braucht vielmehr, Raum um das für uns jeweils wesentliche" → „Es braucht vielmehr Raum, um das für uns jeweils **Wesentliche**"
- **Über David:** „Jahrzehntelang" → „jahrzehntelang"; „…die wichtigste Stakeholder-Beziehung, die zu mir selbst ist." → „…**dass** die wichtigste Stakeholder-Beziehung die zu mir selbst ist." (Komma raus); „Berg **names** Vision Mountain" → „Berg **namens** Vision Mountain"; „innere Ruf" → „**der** innere Ruf"; Satzbruch nach „…leitet mich noch heute." → Doppelpunkt: „…leitet mich noch heute: die Arbeit an…"
- **Zwei Schulen:** „den **Uralten der Praktiken** der **Weisheitstradtionen**" → „den **uralten Praktiken** der **Weisheitstraditionen**"; „blended-learning" → „Blended-Learning"; „Weisheits-Traditionen" → „Weisheitstraditionen"

## Abschluss-Checks
- Alle 7 Änderungen in **DE und EN** umgesetzt (EN-Handhabung im Projekt vorher geklärt).
- HREA-Logo als `HREA_Logo_Gewinner_2017_web.png` im Assets-Ordner, per `<img>` eingebunden (nicht CMYK-JPG/EPS).
- „Mehr Infos"-Button in „Über David" erhalten.
- Lokale Vorschau geprüft, **kein Deploy nach davidliebnau.com ohne Davids Freigabe**.
