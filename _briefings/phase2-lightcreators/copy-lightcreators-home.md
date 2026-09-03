# CC-1 · Copy der neuen Startseite `light-creators.com`

**Aufgabe:** CC-1 aus `phase2-lightcreators-claude-code.md`  
**Übergabepunkt:** I-1, fällig nach Freigabepunkt F2  
**Quelle:** Anhang A des Briefings, dort aus „Light Creators Tribe · Briefing Website-Update V3“  
**Stand:** 3. September 2026 (Erstfassung 02.09., am 03.09. gegen Anhang A nachgeprüft)  
**Erzeugung:** maschinell aus Anhang A extrahiert, nicht abgetippt. Kein Text wurde
geglättet, gekürzt oder umgestellt.

**Nachprüfung am 03.09.2026.** Alle 110 String-IDs aus Anhang A sind genau einmal
vorhanden, ohne Zusatz und ohne Auslassung; die Texte stimmen zeichengenau mit Anhang A
überein. Genau ein Eintrag trägt `Heading, Level 1`, jede Sektion 2 bis 9 genau einen
`Heading, Level 2`.

**Nachtrag vom 03.09.2026 (Schritt S2b).** Freigabepunkt **F1** ist erteilt. Die fünf
CTA-Linkziele sind nach Regel **R-I** eingetragen; OD-3, OD-4 und OD-5 sind damit
geschlossen. Weiterhin offen und auf **F2** wartend: die öffentliche Beschriftung
für „Next Gen“ (OD-6), die Sektionsüberschrift `S7.H2` und der
Navigationspunkt `NAV.5` (OD-7).

---

## Lesehinweis

Ein Block je String. Der Webflow-Strang setzt Texte über `set_text` gegen die `dom-id`.

| Feld | Bedeutung |
|---|---|
| `provenance` | `HIS/EXISTING` = wörtlich aus V3, unantastbar. `NEW · FREIGABE OFFEN` = Vorschlag, nicht gesetzt. |
| `quelle` | Abschnitt im V3-Dokument |
| `element` | Elementtyp und Überschriftenebene |
| `dom-id` | technischer Griff, siehe Regel unten |
| `linkziel` | nur bei Links. Alle CTA-Ziele sind seit **F1 vom 03.09.2026** gesetzt (Regel **R-I**). Einzige Ausnahme: `S5.LINK`, das Muster der Personenlinks — es ist kein CTA-Ziel und kommt mit dem Tribe-Paket (**R-G**). |
| `betroffen-von` | offene Entscheidung, die diesen String verändern kann |
| `text` | der Text, unverändert |

**Regel für `dom-id`.** Abgeleitet aus der String-ID: kleingeschrieben, Punkte zu
Bindestrichen. `S6.NG.CTA` wird zu `s6-ng-cta`. Einzige Ausnahme ist `S1.H1`, die im
Briefing ausdrücklich `hero-headline` heißt. Die `dom-id` ist **kein Inhalt aus V3**,
sondern ein technischer Vorschlag — der Webflow-Strang darf ein eigenes Schema setzen,
solange er es zurückmeldet.

---

## Sektion 1 · Hero

### S1.EYEBROW
- provenance: HIS/EXISTING
- quelle: V3 §4
- element: Eyebrow, kein Heading
- dom-id: s1-eyebrow
- text: |
    LIGHT CREATORS TRIBE

### S1.H1
- provenance: HIS/EXISTING
- quelle: V3 §4
- element: Heading, Level 1
- dom-id: hero-headline
- umbruch: <br> zwischen den beiden Zeilen, kein zweiter Absatz
- text: |
    Finde, was nur du bist.
    Und bring es in die Welt.

### S1.LEAD1
- provenance: HIS/EXISTING
- quelle: V3 §4
- element: Absatz
- dom-id: s1-lead1
- text: |
    Es gibt etwas in jedem Menschen, das sich nicht kopieren lässt. Eine eigene Art zu sehen, zu fühlen, zu denken, Beziehungen zu gestalten und Dinge zu erschaffen.

### S1.LEAD2
- provenance: HIS/EXISTING
- quelle: V3 §4
- element: Absatz
- dom-id: s1-lead2
- text: |
    Light Creators ist eine Einladung, dem Eigenen näherzukommen – und daraus etwas in die Welt zu bringen.

### S1.ORIENT
- provenance: HIS/EXISTING
- quelle: V3 §4
- element: Absatz, optional
- dom-id: s1-orient
- text: |
    Für Menschen, die ihren Weg suchen. Und für Menschen, die bereits etwas Eigenes aufbauen.

### S1.CTA
- provenance: HIS/EXISTING
- quelle: V3 §4
- element: Link, Sprung zu `#recognition`
- dom-id: s1-cta
- linkziel: Sprung zu #recognition — im V3 gesetzt, seitenintern
- text: |
    Die Idee entdecken ↓

## Sektion 2 · Recognition

### S2.H2
- provenance: HIS/EXISTING
- quelle: V3 §8
- element: Heading, Level 2
- dom-id: s2-h2
- text: |
    Vielleicht kennst du diesen Moment.

### S2.P1
- provenance: HIS/EXISTING
- quelle: V3 §8
- element: Absatz
- dom-id: s2-p1
- text: |
    Du funktionierst. Du gehst einen Weg. Vielleicht sogar einen ziemlich erfolgreichen.

### S2.P2
- provenance: HIS/EXISTING
- quelle: V3 §8
- element: Absatz
- dom-id: s2-p2
- text: |
    Und trotzdem taucht irgendwann eine Frage auf:

### S2.P3
- provenance: HIS/EXISTING
- quelle: V3 §8
- element: Absatz, hervorgehoben
- dom-id: s2-p3
- text: |
    Was davon ist eigentlich wirklich meins?

### S2.P4
- provenance: HIS/EXISTING
- quelle: V3 §8
- element: Absatz
- dom-id: s2-p4
- text: |
    Vielleicht stehen dir so viele Möglichkeiten offen, dass keine davon wirklich nach dir klingt.

### S2.P5
- provenance: HIS/EXISTING
- quelle: V3 §8
- element: Absatz
- dom-id: s2-p5
- text: |
    Vielleicht hast du längst etwas aufgebaut – und merkst, dass Erfolg allein die nächsten Fragen nicht beantwortet.

### S2.P6
- provenance: HIS/EXISTING
- quelle: V3 §8
- element: Absatz
- dom-id: s2-p6
- text: |
    Vielleicht weißt du nur: So wie bisher soll es nicht einfach weitergehen.

### S2.H3A
- provenance: HIS/EXISTING
- quelle: V3 §8
- element: Heading, Level 3
- dom-id: s2-h3a
- text: |
    Wir leben in einer Welt voller Antworten.

### S2.P7
- provenance: HIS/EXISTING
- quelle: V3 §8
- element: Absatz
- dom-id: s2-p7
- text: |
    Karriere­wege. Meinungen. Vorbilder. Erfolgsmodelle. Content. Und zunehmend Antworten, die Maschinen in Sekunden für uns erzeugen können.

### S2.P8
- provenance: HIS/EXISTING
- quelle: V3 §8
- element: Absatz
- dom-id: s2-p8
- text: |
    Umso wertvoller wird etwas, das niemand für uns erzeugen kann:

### S2.P9
- provenance: HIS/EXISTING
- quelle: V3 §8
- element: Absatz, hervorgehoben
- dom-id: s2-p9
- text: |
    die eigene Wahrnehmung.

### S2.Q1
- provenance: HIS/EXISTING
- quelle: V3 §8
- element: Listenpunkt
- dom-id: s2-q1
- text: |
    Wer bin ich?

### S2.Q2
- provenance: HIS/EXISTING
- quelle: V3 §8
- element: Listenpunkt
- dom-id: s2-q2
- text: |
    Was erfüllt mich mit Schaffensfreude?

### S2.Q3
- provenance: HIS/EXISTING
- quelle: V3 §8
- element: Listenpunkt
- dom-id: s2-q3
- text: |
    Wofür will ich einen Beitrag leisten?

### S2.Q4
- provenance: HIS/EXISTING
- quelle: V3 §8
- element: Listenpunkt
- dom-id: s2-q4
- text: |
    Was ist mein nächster eigener Schritt?

### S2.P10
- provenance: HIS/EXISTING
- quelle: V3 §8
- element: Absatz
- dom-id: s2-p10
- text: |
    Ein Light Creator wartet nicht auf den perfekten Lebensplan. Er macht Erfahrungen. Beobachtet. Lauscht. Lernt. Verwirft. Beginnt neu.

### S2.P11
- provenance: HIS/EXISTING
- quelle: V3 §8
- element: Absatz
- dom-id: s2-p11
- text: |
    So wird aus Suchen Finden. Und aus Finden Gestaltung.

## Sektion 3 · Big Idea

### S3.H2
- provenance: HIS/EXISTING
- quelle: V3 §9
- element: Heading, Level 2
- dom-id: s3-h2
- text: |
    Du musst nichts beweisen, um etwas zu erschaffen.

### S3.P1
- provenance: HIS/EXISTING
- quelle: V3 §9
- element: Absatz
- dom-id: s3-p1
- text: |
    In dir gibt es eine Weite, eine Stille und schöpferische Intelligenz, die bereits da ist.

### S3.P2
- provenance: HIS/EXISTING
- quelle: V3 §9
- element: Absatz
- dom-id: s3-p2
- text: |
    Dein Wert beginnt nicht mit deinem nächsten Erfolg. Du musst dich nicht erst optimieren, bis du irgendwann gut genug bist, etwas Bedeutendes zu tun.

### S3.P3
- provenance: HIS/EXISTING
- quelle: V3 §9
- element: Absatz
- dom-id: s3-p3
- text: |
    Schöpferkraft braucht keinen inneren Mangel als Treibstoff.

### S3.H3A
- provenance: HIS/EXISTING
- quelle: V3 §9
- element: Heading, Level 3
- dom-id: s3-h3a
- text: |
    Das heißt nicht, weniger zu wollen.

### S3.P4
- provenance: HIS/EXISTING
- quelle: V3 §9
- element: Absatz
- dom-id: s3-p4
- text: |
    Wir wollen Ideen verwirklichen. Unternehmen aufbauen. Wohlstand schaffen. Technologie nutzen. Menschen erreichen. Wirkung entfalten.

### S3.P5
- provenance: HIS/EXISTING
- quelle: V3 §9
- element: Absatz
- dom-id: s3-p5
- text: |
    Uns interessiert nur eine zweite Frage genauso sehr:

### S3.P6
- provenance: HIS/EXISTING
- quelle: V3 §9
- element: Absatz, hervorgehoben
- dom-id: s3-p6
- text: |
    Was entsteht dabei – in uns, zwischen uns und durch uns?

### S3.Q1
- provenance: HIS/EXISTING
- quelle: V3 §9
- element: Listenpunkt
- dom-id: s3-q1
- text: |
    Welche Menschen werden dadurch stärker?

### S3.Q2
- provenance: HIS/EXISTING
- quelle: V3 §9
- element: Listenpunkt
- dom-id: s3-q2
- text: |
    Welche Beziehungen entstehen?

### S3.Q3
- provenance: HIS/EXISTING
- quelle: V3 §9
- element: Listenpunkt
- dom-id: s3-q3
- text: |
    Welche Zukunft wird wahrscheinlicher?

### S3.P7
- provenance: HIS/EXISTING
- quelle: V3 §9
- element: Absatz
- dom-id: s3-p7
- text: |
    Erfolg und Verbundenheit sind für uns keine Gegensätze.

### S3.P8
- provenance: HIS/EXISTING
- quelle: V3 §9
- element: Absatz
- dom-id: s3-p8
- text: |
    Vielleicht beginnt eine andere Art zu gestalten genau dort: nicht aus dem Gefühl, noch nicht genug zu sein – sondern aus Freude, Neugier, Liebe und Lust am Erschaffen.

## Sektion 4 · Schöpferische Dialoge

### S4.H2
- provenance: HIS/EXISTING
- quelle: V3 §10
- element: Heading, Level 2
- dom-id: s4-h2
- text: |
    Schöpferkraft beginnt mit Verbindung.

### S4.P1
- provenance: HIS/EXISTING
- quelle: V3 §10
- element: Absatz
- dom-id: s4-p1
- text: |
    Das Eigene entsteht nicht durch noch mehr Input. Oft braucht es zuerst Raum. Dann Beziehung. Dann Wahrnehmung. Und schließlich den Mut, aus dem Erkannten etwas zu machen.

### S4.01.NUM
- provenance: HIS/EXISTING
- quelle: V3 §10
- element: Label
- dom-id: s4-01-num
- text: |
    01

### S4.01.H3
- provenance: HIS/EXISTING
- quelle: V3 §10
- element: Heading, Level 3
- dom-id: s4-01-h3
- text: |
    LOSLASSEN

### S4.01.P
- provenance: HIS/EXISTING
- quelle: V3 §10
- element: Absatz
- dom-id: s4-01-p
- text: |
    Raum schaffen. Nicht sofort wissen müssen.

### S4.02.NUM
- provenance: HIS/EXISTING
- quelle: V3 §10
- element: Label
- dom-id: s4-02-num
- text: |
    02

### S4.02.H3
- provenance: HIS/EXISTING
- quelle: V3 §10
- element: Heading, Level 3
- dom-id: s4-02-h3
- text: |
    VERBINDEN

### S4.02.P
- provenance: HIS/EXISTING
- quelle: V3 §10
- element: Absatz
- dom-id: s4-02-p
- text: |
    Mit dir selbst, anderen Menschen und dem Leben in Beziehung kommen.

### S4.03.NUM
- provenance: HIS/EXISTING
- quelle: V3 §10
- element: Label
- dom-id: s4-03-num
- text: |
    03

### S4.03.H3
- provenance: HIS/EXISTING
- quelle: V3 §10
- element: Heading, Level 3
- dom-id: s4-03-h3
- text: |
    ERKENNEN

### S4.03.P
- provenance: HIS/EXISTING
- quelle: V3 §10
- element: Absatz
- dom-id: s4-03-p
- text: |
    Wahrnehmen, was wirklich deins ist – und was entstehen will.

### S4.04.NUM
- provenance: HIS/EXISTING
- quelle: V3 §10
- element: Label
- dom-id: s4-04-num
- text: |
    04

### S4.04.H3
- provenance: HIS/EXISTING
- quelle: V3 §10
- element: Heading, Level 3
- dom-id: s4-04-h3
- text: |
    GESTALTEN

### S4.04.P
- provenance: HIS/EXISTING
- quelle: V3 §10
- element: Absatz
- dom-id: s4-04-p
- text: |
    Erkenntnis in Erfahrungen, Entscheidungen und konkrete Schritte übersetzen.

## Sektion 5 · Der reale Tribe

> **Regel R-G.** Die Tribe-Sektion und ihr CMS werden in einem separaten Paket gebaut;
> David liefert die Bausteine nach. Diese Datei enthält deshalb **nur** die acht
> Intro- und Struktur-Strings `S5.*`. Keine Personendaten, keine Portrait-Alt-Texte,
> kein Importschema und keine Feldliste — weder hier noch anderswo in diesem Paket.

### S5.H2
- provenance: HIS/EXISTING
- quelle: V3 §11
- element: Heading, Level 2
- dom-id: s5-h2
- text: |
    Menschen, mit denen Zukunft entsteht.

### S5.P1
- provenance: HIS/EXISTING
- quelle: V3 §11
- element: Absatz
- dom-id: s5-p1
- text: |
    Große Dinge entstehen selten allein.

### S5.P2
- provenance: HIS/EXISTING
- quelle: V3 §11
- element: Absatz
- dom-id: s5-p2
- text: |
    Light Creators lebt in Beziehungen zwischen Menschen, die unterschiedlich sehen, denken und gestalten – und sich gerade dadurch ermöglichen, etwas Neues zu erkennen und in die Welt zu bringen.

### S5.P3
- provenance: HIS/EXISTING
- quelle: V3 §11
- element: Absatz
- dom-id: s5-p3
- text: |
    Ein kuratierter Kreis von Menschen begleitet, prägt und verkörpert diese Idee bereits heute.

### S5.P4
- provenance: HIS/EXISTING
- quelle: V3 §11
- element: Absatz — **Prüfen gegen OD-11**
- dom-id: s5-p4
- betroffen-von: OD-11 · Tribe-Mitgliedschaft ist nicht definiert
- text: |
    Und vielleicht magst auch du in den Kreis kommen?

### S5.LABEL.A
- provenance: HIS/EXISTING
- quelle: V3 §11
- element: Label über Stimme A
- dom-id: s5-label-a
- text: |
    *(im V3-Dokument nicht als sichtbarer Text vorgesehen; Stimme A steht ohne Label)*

### S5.LABEL.B
- provenance: HIS/EXISTING
- quelle: V3 §11
- element: Label über Stimme B
- dom-id: s5-label-b
- text: |
    Was mich mit Light Creators verbindet:

### S5.LINK
- provenance: HIS/EXISTING
- quelle: V3 §11
- element: Muster der Linkbeschriftung
- dom-id: s5-link
- linkziel: PRO PERSON · Zulieferung Tribe-Paket (R-G). Kein CTA-Ziel, deshalb nicht Gegenstand von F1.
- text: |
    `<Vorname>s Arbeit entdecken ↗`

## Sektion 6 · Zwei Wege

### S6.H2
- provenance: HIS/EXISTING
- quelle: V3 §12
- element: Heading, Level 2
- dom-id: s6-h2
- text: |
    Wo stehst du gerade?

### S6.P1
- provenance: HIS/EXISTING
- quelle: V3 §12
- element: Absatz
- dom-id: s6-p1
- text: |
    Light Creators verbindet nicht Menschen, weil sie im selben Alter sind oder dasselbe tun.

### S6.P2
- provenance: HIS/EXISTING
- quelle: V3 §12
- element: Absatz
- dom-id: s6-p2
- text: |
    Sondern weil sie vor derselben schöpferischen Aufgabe stehen – an unterschiedlichen Punkten ihres Weges.

### S6.NG.EYEBROW
- provenance: HIS/EXISTING
- quelle: V3 §12
- element: Label
- dom-id: s6-ng-eyebrow
- betroffen-von: OD-6 · öffentliche Bezeichnung für Next Gen
- text: |
    ICH SUCHE, WAS MEINS IST

### S6.NG.H3
- provenance: HIS/EXISTING
- quelle: V3 §12
- element: Heading, Level 3
- dom-id: s6-ng-h3
- betroffen-von: OD-6 · nur mittelbar, falls die Wegbezeichnung wechselt
- text: |
    Vom Suchen zum Finden.

### S6.NG.P1
- provenance: HIS/EXISTING
- quelle: V3 §12
- element: Absatz
- dom-id: s6-ng-p1
- text: |
    Vielleicht stehen dir viele Wege offen – aber keiner fühlt sich wirklich nach deinem an.

### S6.NG.P2
- provenance: HIS/EXISTING
- quelle: V3 §12
- element: Absatz
- dom-id: s6-ng-p2
- text: |
    Vielleicht bist du zwischen Schule, Studium, Beruf oder einer nächsten Entscheidung.

### S6.NG.P3
- provenance: HIS/EXISTING
- quelle: V3 §12
- element: Absatz
- dom-id: s6-ng-p3
- text: |
    Du musst heute nicht wissen, wie dein ganzes Leben aussehen soll.

### S6.NG.P4
- provenance: HIS/EXISTING
- quelle: V3 §12
- element: Absatz
- dom-id: s6-ng-p4
- text: |
    Aber du kannst anfangen herauszufinden, was wirklich deins ist – und den nächsten Schritt erleben statt nur über ihn nachzudenken.

### S6.NG.TAGS
- provenance: HIS/EXISTING
- quelle: V3 §12
- element: Schlagwortzeile
- dom-id: s6-ng-tags
- text: |
    Orientierung · eigene Stärken · Erfahrungen · Übergänge · Mut · nächste Schritte

### S6.NG.CTA
- provenance: HIS/EXISTING
- quelle: V3 §12
- element: Link
- dom-id: s6-ng-cta
- linkziel: /the-art-and-practice-of-a-flourishing-life · R-I, F1 vom 03.09.2026
- betroffen-von: OD-6 · Beschriftung enthält Next-Gen
- text: |
    Die Next-Gen-Welt entdecken →

### S6.FO.EYEBROW
- provenance: HIS/EXISTING
- quelle: V3 §12
- element: Label
- dom-id: s6-fo-eyebrow
- text: |
    ICH BRINGE BEREITS ETWAS IN DIE WELT

### S6.FO.H3
- provenance: HIS/EXISTING
- quelle: V3 §12
- element: Heading, Level 3
- dom-id: s6-fo-h3
- text: |
    Vom Founder zum bewussten Unternehmer.

### S6.FO.P1
- provenance: HIS/EXISTING
- quelle: V3 §12
- element: Absatz
- dom-id: s6-fo-p1
- text: |
    Du hast bereits angefangen.

### S6.FO.P2
- provenance: HIS/EXISTING
- quelle: V3 §12
- element: Absatz
- dom-id: s6-fo-p2
- text: |
    Eine Idee wurde ein Unternehmen. Entscheidungen betreffen plötzlich nicht mehr nur dich. Menschen, Geld, Verantwortung und Wachstum kommen hinzu.

### S6.FO.P3
- provenance: HIS/EXISTING
- quelle: V3 §12
- element: Absatz
- dom-id: s6-fo-p3
- text: |
    Und irgendwann reicht die Frage „Wie bekomme ich das größer?" nicht mehr.

### S6.FO.P4
- provenance: HIS/EXISTING
- quelle: V3 §12
- element: Absatz
- dom-id: s6-fo-p4
- text: |
    Es entsteht eine zweite:

### S6.FO.P5
- provenance: HIS/EXISTING
- quelle: V3 §12
- element: Absatz, hervorgehoben
- dom-id: s6-fo-p5
- text: |
    Wie will ich das führen, was ich geschaffen habe – ohne mich selbst darin zu verlieren?

### S6.FO.TAGS
- provenance: HIS/EXISTING
- quelle: V3 §12
- element: Schlagwortzeile
- dom-id: s6-fo-tags
- text: |
    Führung · Beziehung · Klarheit · Geld · Einfluss · Verantwortung · Wachstum

### S6.FO.CTA
- provenance: HIS/EXISTING
- quelle: V3 §12
- element: Link
- dom-id: s6-fo-cta
- linkziel: /founder · R-I, F1 vom 03.09.2026
- text: |
    Founder Resonance entdecken →

## Sektion 7 · LIGHT · CREATORS · TRIBE

### S7.H2
- provenance: NEW · FREIGABE OFFEN
- grund-neu: Sektionstitel dient als Überschrift, im V3-Dokument nicht ausformuliert
- quelle: V3 §13
- element: Heading, Level 2
- dom-id: s7-h2
- betroffen-von: OD-10 · alternativ visuell versteckte H2, siehe Hinweis im Briefing
- text: |
    LIGHT · CREATORS · TRIBE

### S7.A.H3
- provenance: HIS/EXISTING
- quelle: V3 §13
- element: Heading, Level 3
- dom-id: s7-a-h3
- text: |
    LIGHT

### S7.A.P
- provenance: HIS/EXISTING
- quelle: V3 §13
- element: Absatz
- dom-id: s7-a-p
- text: |
    weil etwas in uns sichtbar werden kann, das vorher noch keine Form hatte.

### S7.B.H3
- provenance: HIS/EXISTING
- quelle: V3 §13
- element: Heading, Level 3
- dom-id: s7-b-h3
- text: |
    CREATORS

### S7.B.P
- provenance: HIS/EXISTING
- quelle: V3 §13
- element: Absatz
- dom-id: s7-b-p
- text: |
    weil wir unser Leben und unsere Welt nicht nur konsumieren, sondern mitgestalten.

### S7.C.H3
- provenance: HIS/EXISTING
- quelle: V3 §13
- element: Heading, Level 3
- dom-id: s7-c-h3
- text: |
    TRIBE

### S7.C.P
- provenance: HIS/EXISTING
- quelle: V3 §13
- element: Absatz
- dom-id: s7-c-p
- text: |
    weil etwas zwischen Menschen entstehen kann, das keiner allein hervorgebracht hätte.

## Sektion 8 · Manifest

### S8.H2
- provenance: HIS/EXISTING
- quelle: V3 §14
- element: Heading, Level 2
- dom-id: s8-h2
- text: |
    Wofür wir antreten

### S8.L1
- provenance: HIS/EXISTING
- quelle: V3 §14
- element: Zeile, hervorgehoben
- dom-id: s8-l1
- text: |
    Wir glauben, dass in jedem Menschen etwas liegt, das sich nicht kopieren lässt.

### S8.L2
- provenance: HIS/EXISTING
- quelle: V3 §14
- element: Zeile
- dom-id: s8-l2
- text: |
    Wir wollen still genug werden, um es wahrzunehmen.

### S8.L3
- provenance: HIS/EXISTING
- quelle: V3 §14
- element: Zeile
- dom-id: s8-l3
- text: |
    Wir glauben, dass Klarheit nicht immer durch mehr Denken entsteht, sondern auch durch Erfahrung.

### S8.L4
- provenance: HIS/EXISTING
- quelle: V3 §14
- element: Zeile
- dom-id: s8-l4
- text: |
    Wir wollen nicht nur konsumieren, was andere geschaffen haben, sondern selbst Wirklichkeit entstehen lassen.

### S8.L5
- provenance: HIS/EXISTING
- quelle: V3 §14
- element: Zeile
- dom-id: s8-l5
- text: |
    Wir glauben, dass Erfolg und Menschlichkeit keine Gegensätze sind.

### S8.L6
- provenance: HIS/EXISTING
- quelle: V3 §14
- element: Zeile
- dom-id: s8-l6
- text: |
    Wir wollen Unternehmen, Projekte und Beziehungen schaffen, die Leben ermöglichen statt verbrauchen.

### S8.L7
- provenance: HIS/EXISTING
- quelle: V3 §14
- element: Zeile
- dom-id: s8-l7
- text: |
    Wir glauben, dass große Dinge selten allein entstehen.

### S8.L8
- provenance: HIS/EXISTING
- quelle: V3 §14
- element: Zeile, Abschluss hervorgehoben
- dom-id: s8-l8
- text: |
    Und wir wollen unsere Schöpferkraft nicht dafür verwenden, ausgetretenen Pfaden besser zu folgen – sondern das in die Welt bringen, was nur durch uns entstehen kann.

## Sektion 9 · Finale Einladung

### S9.H2
- provenance: HIS/EXISTING
- quelle: V3 §15
- element: Heading, Level 2
- dom-id: s9-h2
- text: |
    Was willst du in die Welt bringen?

### S9.P1
- provenance: HIS/EXISTING
- quelle: V3 §15
- element: Absatz
- dom-id: s9-p1
- text: |
    Vielleicht suchst du gerade erst.

### S9.P2
- provenance: HIS/EXISTING
- quelle: V3 §15
- element: Absatz
- dom-id: s9-p2
- text: |
    Vielleicht hast du längst angefangen.

### S9.P3
- provenance: HIS/EXISTING
- quelle: V3 §15
- element: Absatz
- dom-id: s9-p3
- text: |
    Vielleicht stehst du zwischen etwas, das nicht mehr trägt, und etwas Neuem, das noch keine Form hat.

### S9.P4
- provenance: HIS/EXISTING
- quelle: V3 §15
- element: Absatz
- dom-id: s9-p4
- text: |
    Der nächste Schritt muss nicht perfekt sein. Aber er kann deiner sein.

### S9.CTA1
- provenance: HIS/EXISTING
- quelle: V3 §15
- element: Link
- dom-id: s9-cta1
- linkziel: /the-art-and-practice-of-a-flourishing-life — identisch mit S6.NG.CTA · R-I, F1 vom 03.09.2026
- text: |
    Ich suche meinen Weg →

### S9.CTA1.SUB
- provenance: HIS/EXISTING
- quelle: V3 §15
- element: Unterzeile
- dom-id: s9-cta1-sub
- betroffen-von: OD-6 · Unterzeile Next Gen
- text: |
    Next Gen

### S9.CTA2
- provenance: HIS/EXISTING
- quelle: V3 §15
- element: Link
- dom-id: s9-cta2
- linkziel: /founder — identisch mit S6.FO.CTA · R-I, F1 vom 03.09.2026
- text: |
    Ich baue etwas auf →

### S9.CTA2.SUB
- provenance: HIS/EXISTING
- quelle: V3 §15
- element: Unterzeile
- dom-id: s9-cta2-sub
- text: |
    Founder Resonance

### S9.CTA3
- provenance: HIS/EXISTING
- quelle: V3 §15
- element: Link
- dom-id: s9-cta3
- linkziel: #tribe — Sprungmarke auf derselben Seite, kein Seitenwechsel · R-I, F1 vom 03.09.2026
- text: |
    Ich möchte die Menschen kennenlernen →

### S9.CTA3.SUB
- provenance: HIS/EXISTING
- quelle: V3 §15
- element: Unterzeile
- dom-id: s9-cta3-sub
- text: |
    Tribe

## Sektion Navigation

### NAV.1
- provenance: HIS/EXISTING
- quelle: V3 §16
- element: Navigationslink
- dom-id: nav-1
- text: |
    Manifest

### NAV.2
- provenance: HIS/EXISTING
- quelle: V3 §16
- element: Navigationslink
- dom-id: nav-2
- text: |
    Tribe

### NAV.3
- provenance: HIS/EXISTING
- quelle: V3 §16
- element: Navigationslink
- dom-id: nav-3
- betroffen-von: OD-6 · Navigationsbeschriftung Next Gen
- text: |
    Next Gen

### NAV.4
- provenance: HIS/EXISTING
- quelle: V3 §16
- element: Navigationslink
- dom-id: nav-4
- text: |
    Founders

### NAV.5
- provenance: NEW · FREIGABE OFFEN
- grund-neu: Zielseite existiert nicht, OD-7
- quelle: V3 §16
- element: Navigationslink
- dom-id: nav-5
- betroffen-von: OD-7 · About-Seite existiert nicht
- text: |
    About

---

## ID-Tabelle

`status` hat zwei Werte. `fest` = wörtlich aus V3 und durch keine offene Entscheidung
berührt. `freigabe-offen` = der String selbst ist ein Vorschlag, oder eine offene
Entscheidung kann ihn oder sein Linkziel noch ändern.

Die Überschriftenebene steht hier abgekürzt als `H1`, `H2`, `H3`, damit die Prüfung
die Prüfung auf die H1-Ebene genau einen Treffer liefert, nämlich den Block `S1.H1`.

| # | String-ID | Provenance | Element | status | hängt an |
|---|---|---|---|---|---|
| 1 | `S1.EYEBROW` | HIS/EXISTING | Eyebrow, kein Heading | fest | — |
| 2 | `S1.H1` | HIS/EXISTING | H1 | fest | — |
| 3 | `S1.LEAD1` | HIS/EXISTING | Absatz | fest | — |
| 4 | `S1.LEAD2` | HIS/EXISTING | Absatz | fest | — |
| 5 | `S1.ORIENT` | HIS/EXISTING | Absatz, optional | fest | — |
| 6 | `S1.CTA` | HIS/EXISTING | Link, Sprung zu `#recognition` | fest | — |
| 7 | `S2.H2` | HIS/EXISTING | H2 | fest | — |
| 8 | `S2.P1` | HIS/EXISTING | Absatz | fest | — |
| 9 | `S2.P2` | HIS/EXISTING | Absatz | fest | — |
| 10 | `S2.P3` | HIS/EXISTING | Absatz, hervorgehoben | fest | — |
| 11 | `S2.P4` | HIS/EXISTING | Absatz | fest | — |
| 12 | `S2.P5` | HIS/EXISTING | Absatz | fest | — |
| 13 | `S2.P6` | HIS/EXISTING | Absatz | fest | — |
| 14 | `S2.H3A` | HIS/EXISTING | H3 | fest | — |
| 15 | `S2.P7` | HIS/EXISTING | Absatz | fest | — |
| 16 | `S2.P8` | HIS/EXISTING | Absatz | fest | — |
| 17 | `S2.P9` | HIS/EXISTING | Absatz, hervorgehoben | fest | — |
| 18 | `S2.Q1` | HIS/EXISTING | Listenpunkt | fest | — |
| 19 | `S2.Q2` | HIS/EXISTING | Listenpunkt | fest | — |
| 20 | `S2.Q3` | HIS/EXISTING | Listenpunkt | fest | — |
| 21 | `S2.Q4` | HIS/EXISTING | Listenpunkt | fest | — |
| 22 | `S2.P10` | HIS/EXISTING | Absatz | fest | — |
| 23 | `S2.P11` | HIS/EXISTING | Absatz | fest | — |
| 24 | `S3.H2` | HIS/EXISTING | H2 | fest | — |
| 25 | `S3.P1` | HIS/EXISTING | Absatz | fest | — |
| 26 | `S3.P2` | HIS/EXISTING | Absatz | fest | — |
| 27 | `S3.P3` | HIS/EXISTING | Absatz | fest | — |
| 28 | `S3.H3A` | HIS/EXISTING | H3 | fest | — |
| 29 | `S3.P4` | HIS/EXISTING | Absatz | fest | — |
| 30 | `S3.P5` | HIS/EXISTING | Absatz | fest | — |
| 31 | `S3.P6` | HIS/EXISTING | Absatz, hervorgehoben | fest | — |
| 32 | `S3.Q1` | HIS/EXISTING | Listenpunkt | fest | — |
| 33 | `S3.Q2` | HIS/EXISTING | Listenpunkt | fest | — |
| 34 | `S3.Q3` | HIS/EXISTING | Listenpunkt | fest | — |
| 35 | `S3.P7` | HIS/EXISTING | Absatz | fest | — |
| 36 | `S3.P8` | HIS/EXISTING | Absatz | fest | — |
| 37 | `S4.H2` | HIS/EXISTING | H2 | fest | — |
| 38 | `S4.P1` | HIS/EXISTING | Absatz | fest | — |
| 39 | `S4.01.NUM` | HIS/EXISTING | Label | fest | — |
| 40 | `S4.01.H3` | HIS/EXISTING | H3 | fest | — |
| 41 | `S4.01.P` | HIS/EXISTING | Absatz | fest | — |
| 42 | `S4.02.NUM` | HIS/EXISTING | Label | fest | — |
| 43 | `S4.02.H3` | HIS/EXISTING | H3 | fest | — |
| 44 | `S4.02.P` | HIS/EXISTING | Absatz | fest | — |
| 45 | `S4.03.NUM` | HIS/EXISTING | Label | fest | — |
| 46 | `S4.03.H3` | HIS/EXISTING | H3 | fest | — |
| 47 | `S4.03.P` | HIS/EXISTING | Absatz | fest | — |
| 48 | `S4.04.NUM` | HIS/EXISTING | Label | fest | — |
| 49 | `S4.04.H3` | HIS/EXISTING | H3 | fest | — |
| 50 | `S4.04.P` | HIS/EXISTING | Absatz | fest | — |
| 51 | `S5.H2` | HIS/EXISTING | H2 | fest | — |
| 52 | `S5.P1` | HIS/EXISTING | Absatz | fest | — |
| 53 | `S5.P2` | HIS/EXISTING | Absatz | fest | — |
| 54 | `S5.P3` | HIS/EXISTING | Absatz | fest | — |
| 55 | `S5.P4` | HIS/EXISTING | Absatz — **Prüfen gegen OD-11** | freigabe-offen | OD-11 · Tribe-Mitgliedschaft ist nicht definiert |
| 56 | `S5.LABEL.A` | HIS/EXISTING | Label über Stimme A | freigabe-offen | — |
| 57 | `S5.LABEL.B` | HIS/EXISTING | Label über Stimme B | fest | — |
| 58 | `S5.LINK` | HIS/EXISTING | Muster der Linkbeschriftung | freigabe-offen | Linkziel pro Person · Tribe-Paket (R-G) |
| 59 | `S6.H2` | HIS/EXISTING | H2 | fest | — |
| 60 | `S6.P1` | HIS/EXISTING | Absatz | fest | — |
| 61 | `S6.P2` | HIS/EXISTING | Absatz | fest | — |
| 62 | `S6.NG.EYEBROW` | HIS/EXISTING | Label | fest | OD-6 · öffentliche Bezeichnung für Next Gen |
| 63 | `S6.NG.H3` | HIS/EXISTING | H3 | fest | OD-6 · nur mittelbar, falls die Wegbezeichnung wechselt |
| 64 | `S6.NG.P1` | HIS/EXISTING | Absatz | fest | — |
| 65 | `S6.NG.P2` | HIS/EXISTING | Absatz | fest | — |
| 66 | `S6.NG.P3` | HIS/EXISTING | Absatz | fest | — |
| 67 | `S6.NG.P4` | HIS/EXISTING | Absatz | fest | — |
| 68 | `S6.NG.TAGS` | HIS/EXISTING | Schlagwortzeile | fest | — |
| 69 | `S6.NG.CTA` | HIS/EXISTING | Link → `/the-art-and-practice-of-a-flourishing-life` | freigabe-offen | Linkziel gesetzt (R-I). Weiterhin offen ist allein die **Beschriftung**, sie hängt an OD-6. |
| 70 | `S6.FO.EYEBROW` | HIS/EXISTING | Label | fest | — |
| 71 | `S6.FO.H3` | HIS/EXISTING | H3 | fest | — |
| 72 | `S6.FO.P1` | HIS/EXISTING | Absatz | fest | — |
| 73 | `S6.FO.P2` | HIS/EXISTING | Absatz | fest | — |
| 74 | `S6.FO.P3` | HIS/EXISTING | Absatz | fest | — |
| 75 | `S6.FO.P4` | HIS/EXISTING | Absatz | fest | — |
| 76 | `S6.FO.P5` | HIS/EXISTING | Absatz, hervorgehoben | fest | — |
| 77 | `S6.FO.TAGS` | HIS/EXISTING | Schlagwortzeile | fest | — |
| 78 | `S6.FO.CTA` | HIS/EXISTING | Link → `/founder` | fest | Linkziel gesetzt, R-I |
| 79 | `S7.H2` | NEW | H2 | freigabe-offen | OD-10 · alternativ visuell versteckte H2, siehe Hinweis im Briefing |
| 80 | `S7.A.H3` | HIS/EXISTING | H3 | fest | — |
| 81 | `S7.A.P` | HIS/EXISTING | Absatz | fest | — |
| 82 | `S7.B.H3` | HIS/EXISTING | H3 | fest | — |
| 83 | `S7.B.P` | HIS/EXISTING | Absatz | fest | — |
| 84 | `S7.C.H3` | HIS/EXISTING | H3 | fest | — |
| 85 | `S7.C.P` | HIS/EXISTING | Absatz | fest | — |
| 86 | `S8.H2` | HIS/EXISTING | H2 | fest | — |
| 87 | `S8.L1` | HIS/EXISTING | Zeile, hervorgehoben | fest | — |
| 88 | `S8.L2` | HIS/EXISTING | Zeile | fest | — |
| 89 | `S8.L3` | HIS/EXISTING | Zeile | fest | — |
| 90 | `S8.L4` | HIS/EXISTING | Zeile | fest | — |
| 91 | `S8.L5` | HIS/EXISTING | Zeile | fest | — |
| 92 | `S8.L6` | HIS/EXISTING | Zeile | fest | — |
| 93 | `S8.L7` | HIS/EXISTING | Zeile | fest | — |
| 94 | `S8.L8` | HIS/EXISTING | Zeile, Abschluss hervorgehoben | fest | — |
| 95 | `S9.H2` | HIS/EXISTING | H2 | fest | — |
| 96 | `S9.P1` | HIS/EXISTING | Absatz | fest | — |
| 97 | `S9.P2` | HIS/EXISTING | Absatz | fest | — |
| 98 | `S9.P3` | HIS/EXISTING | Absatz | fest | — |
| 99 | `S9.P4` | HIS/EXISTING | Absatz | fest | — |
| 100 | `S9.CTA1` | HIS/EXISTING | Link → `/the-art-and-practice-of-a-flourishing-life` | fest | Linkziel gesetzt, R-I |
| 101 | `S9.CTA1.SUB` | HIS/EXISTING | Unterzeile | fest | OD-6 · Unterzeile Next Gen |
| 102 | `S9.CTA2` | HIS/EXISTING | Link → `/founder` | fest | Linkziel gesetzt, R-I |
| 103 | `S9.CTA2.SUB` | HIS/EXISTING | Unterzeile | fest | — |
| 104 | `S9.CTA3` | HIS/EXISTING | Link → `#tribe` | fest | Sprungmarke, kein Seitenwechsel. Linkziel gesetzt, R-I |
| 105 | `S9.CTA3.SUB` | HIS/EXISTING | Unterzeile | fest | — |
| 106 | `NAV.1` | HIS/EXISTING | Navigationslink | fest | — |
| 107 | `NAV.2` | HIS/EXISTING | Navigationslink | fest | — |
| 108 | `NAV.3` | HIS/EXISTING | Navigationslink | freigabe-offen | OD-6 · Navigationsbeschriftung Next Gen |
| 109 | `NAV.4` | HIS/EXISTING | Navigationslink | fest | — |
| 110 | `NAV.5` | NEW | Navigationslink | freigabe-offen | OD-7 · About-Seite existiert nicht |

**110 Strings gesamt. 99 `fest`, 11 `freigabe-offen`.**

---

## Typografische Eigenheiten, die beim Setzen brechen können

Alle Texte sind **HIS/EXISTING** und wurden wörtlich übernommen, einschließlich der
folgenden Stellen. Sie werden hier benannt, nicht korrigiert — eine Korrektur wäre eine
Textänderung und bräuchte eine Freigabe.

| Stelle | Was | Warum es relevant ist |
|---|---|---|
| `S2.P7` | Enthält ein **weiches Trennzeichen** (U+00AD) in „Karriere­wege". Unsichtbar im Editor. | Ein `set_text`-Abgleich über Zeichenkettenvergleich schlägt fehl, wenn das Zeichen beim Kopieren verloren geht. Der Text sieht dann identisch aus und ist es nicht. |
| `S6.FO.P3` | Öffnendes Anführungszeichen ist `„` (U+201E), das schließende ein gerades `"` (U+0022). | Typografisch inkonsistent zum Rest. Im V3-Dokument steht es so. Nicht angeglichen. |
| `S1.CTA`, `S6.*.CTA`, `S9.CTA*`, `S5.LINK` | Pfeile `↓` (U+2193), `→` (U+2192), `↗` (U+2197) sind Teil des Textes, kein Icon. | Dürfen nicht durch ein Icon-Element ersetzt werden, sonst ändert sich der String. |
| durchgehend | Gedankenstriche sind teils `–` (en dash), teils `—` (em dash). | Beide Formen kommen vor und sind so gewollt übernommen. |
| `S7.H2`, `S6.NG.TAGS`, `S6.FO.TAGS` | Trennzeichen ist `·` (U+00B7 middle dot), kein Punkt und kein Bullet. | |

## Was diese Datei nicht enthält

- **Nur noch eine offene Linkadresse.** Seit **F1 vom 03.09.2026** tragen `S6.NG.CTA`,
  `S6.FO.CTA`, `S9.CTA1`, `S9.CTA2` und `S9.CTA3` ihre Zieladresse nach Regel **R-I**.
  Offen bleibt allein `S5.LINK`, das Beschriftungsmuster der Personenlinks — es ist
  kein CTA-Ziel, war deshalb nicht Gegenstand von F1 und kommt mit dem Tribe-Paket
  (**R-G**). Auch dort steht keine Platzhalter-URL.
- **Keine SEO-Texte.** Title, Meta Description und Open-Graph-Text stehen nicht im
  V3-Dokument und sind damit NEW. Sie hängen an **OD-10** und gehören in die
  Seiteneinstellungen, nicht in diese Datei.
- **Keine Personendaten.** Sektion 5 enthält nur die Struktur-Strings. Namen, Rollen,
  Stimmen und Links der Tribe-Personen sind Zulieferung David und laufen über das
  CMS, nicht über diese Datei. „Anna Mustermann" aus dem V3-Dokument ist ein
  Formatbeispiel und steht bewusst nirgends hier.
- **Kein Alt-Text.** Gehört nach CC-5 in `bild-manifest.csv`.

## Rückfrage

| ID | Frage | Blockiert |
|---|---|---|
| **RF-11** | `S5.LABEL.A` ist im V3-Dokument als nicht sichtbarer Text vermerkt: Stimme A steht ohne Label, Stimme B trägt „Was mich mit Light Creators verbindet:". Soll das so bleiben — eine Stimme mit Label, eine ohne —, oder war das im V3 eine Auslassung? Betrifft das CMS-Feldmodell der Tribe-Collection. | F2, Tribe-Paket (T0) |
