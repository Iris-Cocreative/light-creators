# Briefing: Korrekturen vor der ersten Veröffentlichung

Fünf Punkte. Punkt 1 bis 4 vor dem Pull Request, Punkt 5 direkt danach.
Branch: weiter auf `relaunch/positionierung-2026`, ein Commit pro Punkt.

---

## 1. Gold zurück, Open Horizon als Textfarbe raus

Die Umstellung auf Open Horizon war eine Fehlentscheidung von mir. Sie wird
vollständig zurückgenommen. Hervorhebungen und Eyebrows sind wieder Gold.

Ein Punkt bleibt bestehen: Soft Gold `#E0B76F` erreicht auf Luminous Sand
einen Kontrast von 1,77 und reißt damit beide Schwellen, 4,5 für kleine und
3,0 für große Schrift. Auf hellen Abschnitten wird deshalb ein tieferer
Goldton verwendet, der aus dem Gold Gradient des Corporate Designs stammt.

| Verwendung | Farbe | Kontrast auf Creme |
|---|---|---|
| `em` und Hervorhebungen in Überschriften, heller Grund | `#A87D34` | 3,51 |
| Eyebrow-Zeilen, klein und gesperrt, heller Grund | `#8D651E` | 4,94 |
| Alles auf dunklem Grund, Flächen, Linien, Buttons | `#E0B76F` unverändert | 6,06 bis 9,74 |

**Umsetzung:**
- `--color-eyebrow: #8D651E` statt `var(--color-teal)`.
- Neue Variable `--color-gold-em: #A87D34`.
- Alle 21 Stellen aus Commit `c84e3c8` entsprechend umstellen.
- Danach prüfen, ob irgendwo noch Open Horizon als Schriftfarbe auf hellem
  Grund steht. Jede Fundstelle melden.

Betrifft Startseite, `/fuehren/`, `/threshold/partner/`, `podcast.html` und
die Rechtsseiten.

---

## 2. Bildausschnitt auf `/fuehren/`

**Das Problem liegt im CSS, nicht in der Bilddatei.** Die Bildspalte ist
nahezu quadratisch, das bisherige Bild ist hochformatig im Verhältnis 4:5.
`object-fit: cover` schneidet die Differenz oben und unten weg, deshalb endet
das Bild auf der Website bei den Schultern.

**Ziel:** sichtbar bis etwa zum Solarplexus, also Kopf, Schultern und
Oberkörper bis zur Brustmitte.

**Umsetzung:**
1. Neue Datei `hero-fuehren-split.webp` verwenden, 1400 × 1400, quadratisch.
   Sie ersetzt die bisherige 1200 × 1500. Bereits gespiegelt, nicht erneut
   spiegeln.
2. `object-position: center 30%` setzen, damit bei schmalen Spalten oben
   geschnitten wird und nicht unten.
3. **Danach messen und melden**, an welcher Körperstelle die Unterkante des
   sichtbaren Bildes liegt, bei 1280, 1440 und 1920 Pixeln Fensterbreite.
   Angabe genügt in der Form: Schultern, Brustmitte, Bauch.
4. Screenshot der Bildspalte bei allen drei Breiten.

Falls der Solarplexus bei einer Breite immer noch nicht im Bild ist, ändere
nichts weiter, sondern melde mir, wie viel Prozent Bildhöhe fehlen.

---

## 3. Abschnitt „Die Lücke" auf der Startseite

Der erste Absatz ist größer gesetzt als die drei folgenden. Prüfen und
melden, nichts ändern:
- welche Klassen die vier Absätze tragen
- welche Schriftgrößen sich daraus ergeben
- ob dasselbe Muster in anderen Abschnitten vorkommt

---

## 4. LinkedIn-Platzhalter löschen

Im Belege-Abschnitt von `/fuehren/` steht ein markierter Platzhalter für die
LinkedIn-Empfehlungen. Ersatzlos entfernen, samt Auszeichnung. Die
gespiegelten Zitate von der Startseite bleiben.

---

## 5. Englische Seiten

`/fuehren/` und `/threshold/partner/` fehlen auf Englisch. Die Texte stehen
unten, vollständig.

**Ablage:** Richte dich nach der bestehenden Struktur. `threshold/en/` legt
einen `en`-Ordner nahe, `index-en.html` ein Suffix. Entscheide nach dem, was
zur jeweiligen Seite passt, und nenn mir die gewählte Regel, bevor du die
Dateien anlegst.

**Sprachumschalter:** Von jeder neuen englischen Seite muss der Umschalter
auf die deutsche Fassung führen und umgekehrt. Auf beiden Seiten ergänzen.

**Meta:** title, description, og:title, og:description, og:image analog zur
deutschen Fassung, `lang="en"`.

**Melde mir außerdem**, ob weitere Seiten auf Deutsch existieren und auf
Englisch fehlen.

---

### 5.1 `/fuehren/` auf Englisch

**Meta title:** Leading · David Liebnau
**Meta description:** Support for executives, leadership teams and
organisations at turning points where the existing repertoire no longer
carries.

**Hero**
- Eyebrow: For executives, leadership teams and organisations
- H1: When what made the company great is now holding it back.
- Subline: Conscious leadership at business-critical turning points.
- Button: Request a briefing conversation

**Two sentences**
- H2: Two sentences I hear in almost every first conversation.
- Quote 1: We have tried everything that used to work.
- Quote 2: I no longer know where to start.
- Neither is a competence problem. Both are transitions. The business model
  still carries, but the curve shows it will not carry much longer. The
  executive is experienced, but the experience no longer fits the situation.
  The team works harder and moves slower.
- What happens next is usually more of the same. Another programme, another
  reporting line, another reorganisation. The best people burn out first.
  Exactly the people whose energy the next answer would have to come from.

**How I work**
- H2: How I work
- First, back to strength. As long as a leadership team is stuck in constant
  reaction, the knowledge already present in the company is not available. So
  that is where we begin.
- Then, seeing the situation as it is. No glossing over, no blame, with the
  people in the room whom it concerns.
- Then, decisions that hold. And a date on which we check whether they still
  hold.
- Link: The four steps in detail

**Formats**
- H2: Formats
- One-to-one work at executive level. For people who have no one to speak to
  openly.
- Leadership team support. Retreats, alignment processes, resolving conflict
  at the top.
- Programmes. Blended learning architectures over several months, for
  leadership levels or entire organisations.
- Everything is built for the specific situation. That is why there is no
  price list. After the briefing conversation you receive an outline with
  format, scope and price, and then you decide.

**Where I am not the right fit**
- H2: Where I am not the right fit
- For off-the-shelf training. For programmes meant to replace a decision the
  leadership does not want to make. For situations where the outcome is
  already fixed and only agreement is being collected.

**Evidence**
- H2: Evidence
- Over the past 25 years I have designed and led multi-million programmes for
  more than 20,000 participants. First as Senior Learning & Development
  Consultant at Gallup, later as Managing Director and Client Director at
  SYNK GROUP. One of these programmes received the HR Excellence Award during
  my time at SYNK GROUP.
- Revenue responsibility, teams, decisions without sufficient information: I
  know the side of the table my clients sit on.
- Today I work with family businesses, growing organisations and
  corporations. The questions differ in scale, the edge is the same. Every
  programme is built for the specific situation. Off-the-shelf training is
  available elsewhere.
- Kundenzitate: von der deutschen Fassung spiegeln, Wortlaut unverändert auf
  Deutsch belassen, darüber die Zeile „Client quotes, in German".

**Closing**
- H2: Briefing conversation
- 60 minutes, free of charge, by video. You describe the situation. I ask
  questions and tell you honestly whether I am the right person. If I am, you
  receive an outline with format, scope, timeline and price within a week. If
  I am not, I tell you who I would recommend instead.
- Button: Request a conversation

---

### 5.2 `/threshold/partner/` auf Englisch

**Meta title:** Fund a place · The Threshold Program
**Meta description:** For parents, foundations and companies who want to make
a place in The Threshold Program possible for a young adult.

- Eyebrow: The Threshold Program
- H1: Make a place possible.
- Threshold is a six-day programme for young adults between 18 and 28 who
  stand before a significant decision. Two guided days alone in nature, a
  small group, one concrete next step and six weeks of support afterwards.

**Why these years**
- H2: Why these years. And why now.
- Between 18 and 28, much of what a life later draws on is decided. Which
  direction someone takes. By what standard they measure it. Whether they
  stay capable of acting under pressure. It is also the phase of life with
  the least support. School is over, an employer is not yet responsible, and
  parents are not neutral.
- There is a second shift, and it concerns every organisation. The more
  routine is automated, the more depends on what a person can contribute that
  is not a copy of something that already exists. That question cannot be
  read up on. It needs a place where no one prescribes the outcome.

**Three cells**
- Self-knowledge: Someone who has worked out their own strengths still knows
  them in five years. A test result is known until the next folder.
- Innovation from clarity: People who have found their own ground move
  differently under pressure. They build instead of freezing.
- Agency in uncertainty: Taking a real step without waiting for the next
  instruction. That is precisely what a machine cannot do.

**Who funds the places**
- H2: Who funds the places
- Some participants pay themselves. Some are supported by their parents. And
  some places are covered by foundations, educational institutions or
  employers who want to open access for young people who could not otherwise
  afford it.

**What you receive**
- H2: What you receive
- For scholarships: a written reflection from the person you supported, with
  their consent. Not marketing material, but the words of a young person
  about what has changed.

**Ways of working together**
- H2: Ways of working together
- Die vier Karten aus der deutschen Fassung übersetzen, Struktur und
  Reihenfolge identisch: Scholarship Partner, Impact Partner, Employer and
  Talent Partner, Founding Partner. Sinngemäß übersetzen, keine neuen Inhalte
  erfinden. **Leg mir die Übersetzung vor, bevor du sie festschreibst.**

**Costs**
- H2: Costs
- An introductory rate applies for the founding group. We discuss the cost
  per place in conversation.

**Closing**
- In 30 minutes we explore together whether this programme is the right one,
  how the six days unfold and what value it creates.
- Button: Request a partnership

---

## Reihenfolge

1. Punkt 1 umsetzen, Fundstellen melden.
2. Punkt 2 umsetzen, messen, Screenshots.
3. Punkt 3 prüfen und vorlegen, nichts ändern.
4. Punkt 4 umsetzen.
5. Punkt 5: erst Ablageregel und Sprachumschalter melden, dann bauen. Die
   vier Partnerkarten vor der Festschreibung vorlegen.
6. Dann anhalten. Kein Pull Request ohne meine Freigabe.
