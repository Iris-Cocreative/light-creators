# Briefing für Claude Code — Ziffer 7 mit dem Nachweis-Block abgleichen

**Repository:** davidliebnau.com
**Stand:** Der letzte Durchlauf ist komplett live und bestätigt — Plausible,
alle zehn Events, Threshold-EN, Aufräumen. Eine Sache ist dabei offen
geblieben, die dieses Briefing klärt.

---

## Die Frage

Block 2 des letzten Briefings verlangte ein lokal gehostetes
ProvenExpert-Siegelbild mit Link. Umgesetzt wurde stattdessen ein eigener
„Nachweis-Block" — das war eine bewusste, gute Entscheidung, kein Fehler.
Was ich nicht weiß: **Verlinkt oder erwähnt dieser Nachweis-Block
ProvenExpert überhaupt noch, oder ist ProvenExpert da komplett raus?**

Davon hängt ab, ob Ziffer 7 der Datenschutzerklärung
(„Bewertungssiegel ProvenExpert") noch etwas Zutreffendes beschreibt oder
eine Datenverarbeitung behauptet, die es nicht mehr gibt.

Bitte direkt in den ausgelieferten Dateien nachsehen (wo immer der
Nachweis-Block sitzt) und dann einen der beiden Wege gehen — das sollte
sich ohne Rückfrage klären lassen, gleiches Prinzip wie bei den
vorherigen Abgleichen zwischen Quelltext und Live-Seite:

### Fall A — der Nachweis-Block verlinkt noch zu ProvenExpert

Ziffer 7 bleibt inhaltlich bestehen, aber bitte den Wortlaut an das
tatsächliche Element anpassen. Aktueller Text:

> Auf dieser Website verweise ich auf mein Bewertungsprofil bei
> ProvenExpert, einem Angebot der Expert Systems AG, Quedlinburger Str. 1,
> 10589 Berlin. Beim Anklicken des Siegels wirst du zur Website von
> ProvenExpert weitergeleitet; erst dort findet eine Datenverarbeitung
> durch die Expert Systems AG statt. Näheres in der Datenschutzerklärung
> von ProvenExpert: https://www.provenexpert.com/de-de/datenschutzbestimmungen/

Falls der Nachweis-Block kein „Siegel" mehr ist, sondern z. B. eigene
Kennzahlen (4,98, Bewertungsanzahl) mit einem Link, bitte „Siegel" durch
eine passendere Formulierung ersetzen (z. B. „meinen Nachweis-Block mit
Link zu meinem Bewertungsprofil"). Inhaltlich bleibt der Kernsatz
richtig, solange nur beim Anklicken eine Verbindung zu ProvenExpert
entsteht, nicht automatisch beim Seitenaufruf.

### Fall B — der Nachweis-Block erwähnt ProvenExpert gar nicht mehr

Dann muss Ziffer 7 komplett raus, sonst behauptet die Datenschutzerklärung
eine Datenverarbeitung, die nicht stattfindet. Dabei bitte:

1. Ziffer 7 („Bewertungssiegel ProvenExpert") entfernen.
2. Ziffer 8, 9, 10 zu 7, 8, 9 verschieben (Verlinkte Angebote → Deine
   Rechte → Änderungen).
3. In Ziffer 6 den Cross-Verweis „Näheres zu deinem Widerspruchsrecht
   findest du unter Ziffer 9" auf „Ziffer 8" korrigieren — das ist die
   neue Nummer von „Deine Rechte" nach der Verschiebung.
4. Kurz grep gegen den ganzen Text laufen lassen, ob „Ziffer" noch
   irgendwo sonst auf eine jetzt falsche Zahl verweist.

### Falls weder A noch B eindeutig zutrifft

Zum Beispiel: der Nachweis-Block zeigt Zahlen, ohne dass klar ist, ob
sie von ProvenExpert stammen oder von Hand gepflegt sind. Bitte dann
nicht raten, sondern den tatsächlichen HTML-Ausschnitt des Nachweis-Blocks
im Statusbericht zurückmelden, dann formuliere ich Ziffer 7 passend dazu.

---

## Commit & Deploy

`fix: reconcile Datenschutzerklärung Ziffer 7 with the current Nachweis-Block`

Direkt in den Produktionsbranch mergen und pushen, wie immer.

---

## Nicht Teil dieses Briefings

Die zehn Plausible-Goals legt David selbst im Dashboard an. Backlog
(Art. 246c EGBGB, DPMA-Markenrecherche, og:image-Seitenverhältnis auf
`/threshold/`, § 22 BDSG-Check, AV-Vertrag GitHub) bleibt unverändert
offen, David entscheidet noch, was davon als Nächstes drankommt.
