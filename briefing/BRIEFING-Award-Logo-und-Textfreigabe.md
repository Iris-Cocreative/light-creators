# Briefing: Award-Logo entfernen, deutsche Textänderungen freigeben

Zwei Punkte. Beide klein, beide vor dem Pull Request.

Branch: weiter auf `relaunch/positionierung-2026`. Ein Commit pro Punkt.

---

## 1. HR Excellence Award: Logo raus, Text bleibt

**Entscheidung:** Das Logo wird nicht eingebunden. Der textliche Bezug auf den
Award bleibt unverändert bestehen.

**Begründung, damit sie im Commit nachvollziehbar ist:** Ausgezeichnet wurde
ein Programm der SYNK GROUP, nicht David persönlich. Die Nutzungsrechte an
Award-Logos liegen üblicherweise bei der ausgezeichneten Organisation. Ohne
schriftliche Freigabe wird das Logo nicht geführt. Ein Satz mit korrekter
Rollenzuschreibung ist davon nicht betroffen.

**Umsetzung:**

1. Das `<img class="award-logo">` im Organisationen-Abschnitt der Startseite
   entfernen. Der Absatz davor und der Absatz danach bleiben unverändert
   stehen, es entsteht keine Lücke im Text.
2. Die CSS-Regel `.award-logo` in `assets/styles.css` **entfernen**, nicht nur
   auskommentieren. Ungenutztes CSS sammelt sich sonst an.
3. Die Bilddatei im Assets-Ordner **nicht löschen**, nur nicht verwenden.
   Sollte die Freigabe später kommen, ist sie sofort verfügbar.
4. Prüfen, ob das Logo auch auf `index-en.html`, `/fuehren/` oder einer
   anderen Seite eingebunden ist, und dort ebenso entfernen. Fundstellen
   melden.
5. Die BACKLOG-Zeile zur alten Datei `assets/hr-excellence-award-2017.png`
   anpassen: Beide Award-Dateien sind vorhanden, aber bewusst ungenutzt.
   Neue Zeile für das Backlog:

   ```
   - [ ] HR Excellence Award Logo: Nutzungsrechte klären.
     Ausgezeichnet wurde ein Programm der SYNK GROUP. Ohne schriftliche
     Freigabe der SYNK GROUP wird das Logo nicht auf der Website geführt.
     Beide Bilddateien liegen ungenutzt im Assets-Ordner. Der textliche
     Bezug auf den Award bleibt bestehen, er ist davon nicht betroffen.
   ```

**Was bleibt, wörtlich unverändert:**

> In dieser Zeit wurde eines meiner Programme mit dem HR Excellence Award
> ausgezeichnet.

Und in der englischen Fassung:

> During that time one of my programmes received the HR Excellence Award.

**Regel R2 gilt unverändert weiter.** Der Award darf nur in einem Satz
erscheinen, der die Rolle bei der SYNK GROUP im selben Satz oder im
unmittelbar vorangehenden Satz nennt. Prüf nach der Änderung noch einmal alle
Award-Fundstellen im Repository und melde das Ergebnis.

---

## 2. Die deutschen Textänderungen sind freigegeben

Die sieben Änderungen, die als uncommittete Änderung im Arbeitsverzeichnis
lagen, stammen von David. Sie sind geprüft und freigegeben.

**Bitte committen**, mit den drei Abweichungen, die du selbst gemeldet hast:

- Änderung 3, Punkt am Ende von „Erkennen. Eine positive Zukunftsvision
  entwickeln." bleibt. Richtig, er passt zu den drei anderen Titeln.
- Änderung 5, der Satz „Ich kenne Führung aus der operativen Realität. Und ich
  kenne ihren Preis." bleibt im bestehenden `pull-quote`-Markup stehen.
  Richtig entschieden, das Markup bleibt unangetastet.
- Änderung 5, die Überschrift trägt den Punkt im `em`, wie das bestehende
  Markup es vorgibt.

**Eine Ergänzung zu Änderung 4.** Das Bowie-Zitat ersetzt den Satz „Deshalb
ist Threshold kein Nebenprojekt. Es ist dieselbe Arbeit in einer anderen
Lebensphase." Damit fällt die einzige Stelle weg, an der die Startseite
begründet, warum Threshold zur selben Arbeit gehört. Das ist so gewollt.
Melde mir aber, ob der Threshold-Teaser weiter unten diesen Zusammenhang noch
trägt, oder ob er jetzt unverbunden dasteht. Ändere nichts, nur melden.

**Zitat im Wortlaut, deutsch und englisch identisch:**

> „Tomorrow belongs to those - who can hear it coming."
> David Bowie

---

## 3. Reihenfolge

1. Punkt 1 umsetzen, Fundstellen melden.
2. Punkt 2 committen, Rückmeldung zum Threshold-Zusammenhang.
3. Danach `index-en.html` neu bauen, nach
   `briefing/EN-Startseite-komplett.md`.
4. Dann anhalten. Kein Pull Request ohne Freigabe.
