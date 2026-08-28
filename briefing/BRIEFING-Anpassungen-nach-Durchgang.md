# Briefing: Anpassungen nach dem Durchgang

Fünf Punkte, alle in beiden Sprachen. Branch weiter auf
`relaunch/positionierung-2026`, ein Commit pro Punkt.

Nach jeder Änderung das Bauskript nachziehen, wie in den letzten Runden.

---

## 1. Award-Satz präzisieren, Startseite

**Deutsch, ersetzt den letzten Satz des ersten Absatzes im
Organisationen-Abschnitt:**

> In dieser Zeit wurde eines der SYNK GROUP-Programme, die ich für die
> Deutsche Bahn konzipiert und geleitet habe, mit dem HR Excellence Award in
> der Kategorie „Konzernführungskräfte" ausgezeichnet.

**Englisch:**

> During that time, one of the SYNK GROUP programmes I designed and led for
> Deutsche Bahn received the HR Excellence Award in the category
> "Konzernführungskräfte".

Die Kategoriebezeichnung bleibt im Englischen deutsch, sie ist der offizielle
Name der Kategorie. In Anführungszeichen setzen, nicht übersetzen.

**R2-Prüfung danach:** Der neue Satz nennt SYNK GROUP im selben Satz, die
Regel ist erfüllt. Prüf trotzdem alle sechs Award-Fundstellen erneut und
melde das Ergebnis, weil sich der Wortlaut geändert hat.

---

## 2. Testimonials: eine Sprache pro Seite

**Ziel:** Auf allen deutschen Seiten stehen alle Zitate auf Deutsch, auf allen
englischen Seiten alle auf Englisch. Betroffen sind Startseite und
Threshold-Seite in beiden Sprachen, dazu jede weitere Seite, die Zitate trägt.

**Vorgehen:**

1. Leg mir zuerst eine Übersicht vor: welche Zitate stehen wo, in welcher
   Sprache, von wem. Ändere noch nichts.
2. Nach meiner Freigabe übersetzt du. Die englischen Zitate von Pa Sinyan und
   Victor S. kommen auf den deutschen Seiten ins Deutsche, die deutschen
   Zitate auf den englischen Seiten ins Englische.

**Wichtig, und das ist keine Formalie:** Ein übersetztes Zitat ist nicht mehr
der Wortlaut der Person. Deshalb wird jede Übersetzung gekennzeichnet. Setz
hinter die Rollenzeile eine kleine Ergänzung:

- auf deutschen Seiten: `· aus dem Englischen übersetzt`
- auf englischen Seiten: `· translated from German`

Das ist üblich, es kostet drei Wörter und schützt vor dem Vorwurf, jemandem
Worte in den Mund gelegt zu haben.

**Rollenzeilen** folgen weiterhin der bestehenden Regel: Amtsbezeichnungen und
Institutionen bleiben in der Originalsprache, Funktionsbeschreibungen werden
übersetzt.

---

## 3. Zweiter CTA auf der Führen-Seite

**Deutsch:**

> Wenn sich das bis hierhin stimmig und hilfreich anhört, ist ein Gespräch der
> schnellste Weg herauszufinden, ob ich der Richtige bin.

**Englisch:**

> If this sounds helpful, a conversation is the fastest way to find out
> whether I am the right person.

Button unverändert.

---

## 4. Methodensymbole auf die Threshold-Seiten

Die vier SVG-Symbole der schöpferischen Dialoge stehen bisher nur auf der
Startseite. Sie kommen zusätzlich auf `/threshold/` und `/threshold/en/`, dort
zu den vier Schritten.

**Umsetzung:**

1. Prüf zuerst, wie die vier Schritte auf der Threshold-Seite dargestellt sind.
   Die Seite hat eigenes Inline-CSS und lädt `assets/styles.css` nicht.
   Melde mir, welche Komponente dort verwendet wird, bevor du etwas änderst.
2. Symbole als Inline-SVG einbinden, nicht als `<img>`, damit sie die Farbe
   erben. Reihenfolge und Zuordnung wie auf der Startseite: 01 Loslassen,
   02 Verbinden, 03 Erkennen, 04 Gestalten.
3. Die Symbole tragen auf dunklem Grund Soft Gold, auf hellem Grund die
   Regel der jeweiligen Seite. Prüf, welchen Hintergrund der Abschnitt auf der
   Threshold-Seite hat, und melde den Kontrastwert.
4. Der Mittelpunkt von 03 trägt den Gold Gradient, wie auf der Startseite.
5. Größe wie auf der Startseite, 96 Pixel auf Desktop, 56 auf Mobil.
6. Miss danach, um wie viele Pixel der Abschnitt länger wird, bei 1440 und
   bei 390. Melde beide Werte, bevor du committest.

---

## 5. Threshold: „Was sich verändert" und „Was du mitnimmst"

**Rahmen:** Bestehende Struktur beibehalten. Keine neue Sektion, keine neuen
UI-Bauteile, keine zusätzlichen Icons in den Vorher-Nachher-Spalten, keine
Prozessgrafiken. Nur Copy tauschen.

Beide Spalten bleiben gleichwertig. Weißraum erhalten. Headlines visuell
stärker als der Fließtext. Auf Mobil erscheinen „Vor der Schwelle" und „Nach
der Schwelle" nacheinander und bleiben als zusammengehörige Bewegung lesbar.

### 5.1 Sektion „Was sich verändert", deutsch

**Headline**
Sechs Tage. Eine Schwelle. Und eine klarere Idee davon, wer du als Nächstes
sein willst.

**Intro**
Manchmal passt das, was bisher war, nicht mehr zu dem, was vor dir liegt.
Threshold gibt dir Raum, Altes loszulassen und herauszufinden, was als
Nächstes wirklich deins ist.

**Linke Spalte**
Eyebrow bleibt: VOR DER SCHWELLE
Headline: Das Alte passt nicht mehr. Das Neue ist noch nicht klar.
Copy:
Vielleicht läuft dein Leben eigentlich gut, und trotzdem fragst du dich: Ist
das wirklich mein Weg?
Vielleicht fühlst du dich eher lost, steckst fest oder hast so viele
Möglichkeiten, dass du nicht weißt, welche wirklich deine ist.
So oder so spürst du: Etwas muss sich verändern.

**Rechte Spalte**
Eyebrow bleibt: NACH DER SCHWELLE
Headline: Klarer darüber, wer du bist, und wofür du stehen und gehen willst.
Copy:
Kein fertiger Lebensplan. Aber mehr Klarheit darüber, was dir wichtig ist, was
deine Stärken sind und wofür du stehen und gehen willst.
Eine Richtung, die du als deine eigene erkennst. Und einen konkreten nächsten
Schritt, um sie zu gehen.

### 5.2 Sektion „Was sich verändert", englisch

**Headline**
Six days. One threshold. And a clearer sense of who you want to be next.

**Intro**
Sometimes what has been no longer fits what lies ahead. Threshold gives you
room to let go of the old and find out what is genuinely yours next.

**Linke Spalte**
Eyebrow: BEFORE THE THRESHOLD
Headline: The old no longer fits. The new isn't clear yet.
Copy:
Maybe your life is going well on paper, and still you wonder: is this really
my path?
Maybe you feel lost, stuck, or faced with so many options that you can't tell
which one is actually yours.
Either way, you sense it: something has to change.

**Rechte Spalte**
Eyebrow: AFTER THE THRESHOLD
Headline: Clearer about who you are, and what you want to stand for and move
towards.
Copy:
Not a finished life plan. But more clarity about what matters to you, what
your strengths are, and what you want to stand for and move towards.
A direction you recognise as your own. And one concrete next step to take it.

### 5.3 Sektion „Was du mitnimmst", deutsch

Struktur bleibt: Eyebrow, Headline, kurze Einleitung, darunter die scanbare
Liste mit Häkchen und Trennlinien. **Keine Karten daraus machen.**

Eyebrow bleibt: WAS DU MITNIMMST
Headline bleibt: Was du mitnimmst.

**Intro**
Sechs Tage geben dir keinen fertigen Lebensplan. Aber sie können verändern,
von wo aus du deinen nächsten Schritt gehst.

**Liste**
Mehr Klarheit darüber, was für dich wirklich wesentlich ist.
Ein tieferes Gespür für deine Stärken und das, was du einbringen kannst.
Die Erfahrung, Altes und Nichtwesentliches bewusst loszulassen.
Einen stärkeren eigenen Maßstab statt ständigem Vergleich.
Mehr Klarheit darüber, wofür du stehen und gehen willst.
Eine Richtung, die du als deine eigene erkennst, und einen konkreten nächsten
Schritt.
Eine kleine Gruppe, die dich auch danach beim Weitergehen unterstützt.

Keine zusätzlichen Erklärungen zu den Punkten. Die Liste bleibt scanbar.

### 5.4 Sektion „Was du mitnimmst", englisch

Eyebrow: WHAT YOU TAKE WITH YOU
Headline: What you take with you.

**Intro**
Six days won't hand you a finished life plan. But they can change the place
you take your next step from.

**Liste**
More clarity about what is genuinely essential for you.
A deeper sense of your strengths and what you have to contribute.
The experience of consciously letting go of what is old and non-essential.
A stronger standard of your own instead of constant comparison.
More clarity about what you want to stand for and move towards.
A direction you recognise as your own, and one concrete next step.
A small group that keeps supporting you afterwards.

### 5.5 Sprachregeln für diese beiden Sektionen

Diese Regeln gelten für alles, was in diesen Sektionen künftig geändert wird:

- **Keine Selbstoptimierungssprache.** Nicht: beste Version deiner selbst,
  nächstes Level, Potenzial entfesseln, Upgrade, werde die Person, die du sein
  möchtest.
- **„Lost" bleibt stehen.** Es erweitert die Identifikationsfläche über
  ambitionierte junge Menschen hinaus. Der umgebende Text bleibt ruhig und
  erwachsen, damit es nicht nach nachgemachter Jugendsprache klingt.
- **Initiation zeigen, nicht benennen.** Nicht: Initiationsretreat,
  Identitätstod, altes Selbst stirbt, Wiedergeburt. Die Bewegung der Copy
  trägt die Logik.
- **Keine zusätzlichen Absätze** unter „Was du mitnimmst". Die Sektion ist die
  konkrete Antwort auf die emotionalere darüber.

---

## 6. Reihenfolge und Rückmeldung

1. Punkt 1, dann R2-Prüfung melden.
2. Punkt 2, zuerst nur die Übersicht der Zitate. Anhalten.
3. Punkt 3.
4. Punkt 4, zuerst die Komponentenfrage melden. Anhalten.
5. Punkt 5, deutsch und englisch.
6. Danach Screenshots von `/threshold/` und `/threshold/en/` bei 1440 und
   390, jeweils von beiden geänderten Sektionen.

Kein Pull Request ohne Freigabe.
