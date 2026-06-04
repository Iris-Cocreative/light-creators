/**
 * Light Creators — Founder Resonance Quiz (Webflow-native)
 * German / Deutsche Version
 *
 * Works with the Webflow-built page structure. The script finds
 * sections via data-quiz attributes, populates content, and
 * handles quiz flow (show/hide, scoring, results).
 *
 * Data attributes used:
 *
 * Slides
 *   intro-slide              Welcome section
 *   statement-slide           Interstitial / transition slide
 *   question-slide            Question flow slide
 *
 * Question flow
 *   section-label             "Abschnitt X von 3" label
 *   question-label            Factor name label
 *   question                  Question heading text
 *   question-1 … question-5   The 5 option cards (fixed in Webflow)
 *   continue-button            Continue / next button (on both question & statement slides)
 *
 * Statement
 *   statement-text            The interstitial text content
 *
 * Results (single section.results-profiles)
 *   type-name                 Founder type heading
 *   tagline                   Tagline beneath type name
 *   radar                     Container for radial chart / spider chart
 *   lever-name                Development lever name
 *   lever-score               Lever score display
 *   lever-next                Next step text
 *   response-type             Type name in course card
 *   recommendation-statement  Micro-copy / recommendation
 *   7-day-course              Course CTA card
 *   diagnostic-call           Diagnostic call CTA card
 *
 * Factor bars: data-factor-bar="<factor>" / data-factor-rating="<factor>"
 * Progress: .lc-progress-track / .lc-progress-fill (fixed at page bottom)
 */
(function () {
    'use strict';

    // ─── Ensure slide sections are transparent so bg-gradient shows through,
    //     and vertically center content within each slide ───
    var lcFixId = 'lc-quiz-fixes';
    if (!document.getElementById(lcFixId)) {
        var sty = document.createElement('style');
        sty.id = lcFixId;
        sty.textContent =
            '[data-quiz="intro-slide"], [data-quiz="statement-slide"], [data-quiz="question-slide"], section.results-profiles, section.results-email-cta {' +
                'background: transparent !important;' +
                'position: relative;' +
                'z-index: 1;' +
            '}' +
            'body, .page-main {' +
                'background: transparent !important;' +
            '}' +
            '.lc-option-card.selected .lc-option-marker {' +
                'border-color: var(--lc-soft-gold);' +
                'background: var(--lc-soft-gold);' +
                'transform: scale(0.9);' +
            '}' +
            '#quiz-logo {' +
                'opacity: 0;' +
            '}' +
            '@media (max-width: 640px) {' +
                '#quiz-logo { display: none; }' +
            '}';
        document.head.appendChild(sty);
    }

    // ─── Selector helpers ───
    function qa(attr, parent) {
        return (parent || document).querySelector('[data-quiz="' + attr + '"]');
    }

    // ─── Find slides ───
    var introSlide = qa('intro-slide');
    var statementSlide = qa('statement-slide');
    var questionSlide = qa('question-slide');

    // Results = all sections after the quiz slides (profiles + email CTA + any others)
    var resultsSections = [];
    var resultsProfile = document.querySelector('section.results-profiles');
    var resultsEmailCta = document.querySelector('section.results-email-cta');
    if (resultsProfile) resultsSections.push(resultsProfile);
    if (resultsEmailCta) resultsSections.push(resultsEmailCta);

    if (!questionSlide) return; // bail if page doesn't have quiz structure

    // ─── Option cards (4 fixed cards in Webflow) ───
    var optionCards = [
        qa('question-1'),
        qa('question-2'),
        qa('question-3'),
        qa('question-4'),
        qa('question-5')
    ];

    // ─── Element references ───
    var sectionLabel = qa('section-label', questionSlide);
    var questionLabel = qa('question-label', questionSlide);
    var questionText = qa('question', questionSlide);
    var continueBtn = qa('continue-button', questionSlide);
    var statementContinueBtn = qa('continue-button', statementSlide);
    var progressFill = document.querySelector('.lc-progress-fill');

    // Begin button — first .button inside intro slide
    var beginBtn = introSlide ? introSlide.querySelector('.button') : null;

    // ─── Questions ───
    var QUESTIONS = [
        {
            id: 1, section: 'Abschnitt 1 von 3', factor: 'Situation',
            text: 'Wo stehst du aktuell in deiner Funding-Journey?',
            options: [
                { text: 'Pre-Seed (MVP im Aufbau, noch kein aktives Fundraising)', scores: {} },
                { text: 'Seed-Phase (aktiv im Pitch mit VCs, Business Model verfeinern)', scores: {} },
                { text: 'Series A Vorbereitung (Skalierung, institutionelle Investoren)', scores: {} },
                { text: 'Zwischen Runden (Pivot, Runway verlängern, neue Strategie)', scores: {} },
                { text: 'Exit-Evaluierung / Private Equity-Gespräche / Sonstiges', scores: {} }
            ]
        },
        {
            id: 2, section: 'Abschnitt 1 von 3', factor: 'Herausforderung',
            text: 'Was ist aktuell deine größte Herausforderung in Investor-Gesprächen?',
            options: [
                { text: 'Ich bekomme Meetings, aber keine Follow-ups oder echtes Interesse', scores: {} },
                { text: 'Investoren mögen die Idee, aber committen nicht', scores: {} },
                { text: 'Das Feedback ist vage oder widersprüchlich - ich weiß nicht, woran es liegt', scores: {} },
                { text: 'Ich habe noch keine Investor-Gespräche, will mich aber vorbereiten', scores: {} }
            ]
        },
        {
            id: 3, section: 'Abschnitt 2 von 3', factor: 'Obsession',
            text: 'Wenn du dein Unternehmen Investoren erklärst - was treibt deine Energie am stärksten?',
            options: [
                { text: 'Die Marktchance und das finanzielle Potenzial', scores: { obsession: 3 } },
                { text: 'Die Eleganz der Lösung oder Technologie', scores: { obsession: 5 } },
                { text: 'Das Problem, das wir in der Welt lösen', scores: { obsession: 7 } },
                { text: 'Meine persönliche Verbindung zu dieser Mission', scores: { obsession: 10 } }
            ]
        },
        {
            id: 4, section: 'Abschnitt 2 von 3', factor: 'Obsession',
            text: 'Wenn Funding 2x länger dauern würde als erwartet - wie würdest du dich fühlen?',
            options: [
                { text: 'Frustriert \u2014 ich brauche Momentum, um motiviert zu bleiben', scores: { obsession: 2 } },
                { text: 'Besorgt \u2014 aber ich würde einen Weg finden weiterzumachen', scores: { obsession: 6 } },
                { text: 'Unbeirrt \u2014 diese Arbeit ist wichtig, unabhängig vom Zeitplan', scores: { obsession: 10 } },
                { text: 'Erleichtert \u2014 mehr Zeit zum Verfeinern vor der Skalierung', scores: { obsession: 4 } }
            ]
        },
        {
            id: 5, section: 'Abschnitt 2 von 3', factor: 'Präsenz & Energie',
            text: 'Wenn ein Investor eine unerwartete oder kritische Frage stellt, passiert bei mir typischerweise:',
            options: [
                { text: 'Mein Körper spannt sich an und mein Kopf sucht hektisch nach der "richtigen" Antwort', scores: { presence: 2 } },
                { text: 'Ich spüre leichte Unruhe, bleibe aber größtenteils geerdet', scores: { presence: 6 } },
                { text: 'Ich bleibe ruhig und bin wirklich neugierig auf ihre Sorge', scores: { presence: 10 } },
                { text: 'Ich gehe in einen "Verteidigungsmodus", ohne es zu merken', scores: { presence: 1 } }
            ]
        },
        {
            id: 6, section: 'Abschnitt 2 von 3', factor: 'Präsenz & Energie',
            text: 'Nach Investor-Meetings fühle ich mich meistens:',
            options: [
                { text: 'Unsicher, ob ich als mein authentisches Selbst aufgetreten bin', scores: { presence: 4 } },
                { text: 'Bewusst, dass ich eher performt als connected habe', scores: { presence: 5 } },
                { text: 'Energetisiert \u2014 als hätten sie das echte Ich gesehen', scores: { presence: 10 } },
                { text: 'Erschöpft vom Management meiner Energie', scores: { presence: 2 } }
            ]
        },
        {
            id: 7, section: 'Abschnitt 2 von 3', factor: 'Vision Resonance',
            text: 'Wenn du deine Vision beschreibst, wie reagieren Investoren typischerweise?',
            options: [
                { text: 'Sie fragen nach mehr Daten oder Beweispunkten', scores: { vision: 3 } },
                { text: 'Sie stimmen intellektuell zu, wirken aber unbewegt', scores: { vision: 5 } },
                { text: 'Sie lehnen sich vor und fragen: "Wie würde diese Welt aussehen?"', scores: { vision: 10 } },
                { text: 'Sie sagen "Ich verstehe es" - aber ich bin nicht sicher, ob sie es wirklich fühlen', scores: { vision: 4 } }
            ]
        },
        {
            id: 8, section: 'Abschnitt 2 von 3', factor: 'Vision Resonance',
            text: 'Kannst du deine Vision so beschreiben, dass Menschen sie sofort sehen und fühlen können?',
            options: [
                { text: 'Ich erkläre das Business Model und die Marktgröße', scores: { vision: 2 } },
                { text: 'Ich kann den zukünftigen Zustand logisch artikulieren', scores: { vision: 5 } },
                { text: 'Ich male ein Bild, das Menschen sehen und fühlen können', scores: { vision: 10 } },
                { text: 'Ich bin unsicher \u2014 ich fokussiere mich mehr auf das Problem, das wir lösen', scores: { vision: 3 } }
            ]
        },
        {
            id: 9, section: 'Abschnitt 2 von 3', factor: 'Founder Fit',
            text: 'Wenn Investoren "Warum du?" fragen, fühlt sich deine Antwort an wie:',
            options: [
                { text: 'Eine Aufzählung meines Lebenslaufs und meiner Credentials', scores: { fit: 3 } },
                { text: 'Logisch, aber von der Mission losgelöst', scores: { fit: 5 } },
                { text: 'Eine unvermeidliche persönliche Geschichte, die hierher führte', scores: { fit: 10 } },
                { text: 'Defensiv oder kompensatorisch', scores: { fit: 2 } }
            ]
        },
        {
            id: 10, section: 'Abschnitt 2 von 3', factor: 'Founder Fit',
            text: 'Deine persönliche Geschichte und die Mission dieses Unternehmens fühlen sich an wie:',
            options: [
                { text: 'Professionell aligned, aber nicht tief verbunden', scores: { fit: 5 } },
                { text: 'Getrennte Teile meiner Identität', scores: { fit: 2 } },
                { text: 'Ein einziger, kohärenter roter Faden', scores: { fit: 10 } },
                { text: 'Stark intellektuell, schwächer emotional', scores: { fit: 4 } }
            ]
        },
        {
            id: 11, section: 'Abschnitt 2 von 3', factor: 'Scalable Logic',
            text: 'Wenn du erklärst, warum JETZT der richtige Zeitpunkt ist, dann:',
            options: [
                { text: 'Ich referenziere allgemeine Trends ("der Markt wächst")', scores: { logic: 3 } },
                { text: 'Ich benenne spezifische Shifts, die neue Möglichkeiten geschaffen haben', scores: { logic: 10 } },
                { text: 'Ich fokussiere mich mehr auf unsere Bereitschaft als auf Market Timing', scores: { logic: 4 } },
                { text: 'Ich tue mich schwer, Timing über "gute Opportunity" hinaus zu artikulieren', scores: { logic: 2 } }
            ]
        },
        {
            id: 12, section: 'Abschnitt 2 von 3', factor: 'Scalable Logic',
            text: 'Wenn ein Investor fragt "Wie kommen Sie von 10 zu 100 Kunden?" - was beschreibst du typischerweise?',
            options: [
                { text: 'Unsere Ambitionen und warum der Markt groß genug ist', scores: { logic: 3 } },
                { text: 'Mehr Team, mehr Budget, mehr Marketing', scores: { logic: 2 } },
                { text: 'Wie wir die ersten 10 gewonnen haben \u2014 und was sich bei 10\u2192100 konkret verändert', scores: { logic: 10 } },
                { text: 'Ehrlich gesagt: das arbeiten wir noch aus', scores: { logic: 5 } }
            ]
        },
        {
            id: 13, section: 'Abschnitt 3 von 3', factor: 'Über dich',
            text: 'Wie hast du von diesem Quiz erfahren?',
            options: [
                { text: 'LinkedIn / Social Media', scores: {} },
                { text: 'Empfehlung von einem anderen Founder', scores: {} },
                { text: 'Web-Suche', scores: {} },
                { text: 'Event / Podcast', scores: {} },
                { text: 'Andere:', scores: {}, otherInput: true }
            ]
        },
        {
            id: 14, section: 'Abschnitt 3 von 3', factor: 'Deine Ziele',
            text: 'Was würde dieses Quiz für dich am wertvollsten machen?',
            options: [
                { text: 'Klarheit über meinen spezifischen blinden Fleck', scores: {} },
                { text: 'Konkrete nächste Schritte zur Verbesserung', scores: {} },
                { text: 'Bestätigung, dass ich auf dem richtigen Weg bin', scores: {} },
                { text: 'Verstehen, was Investoren wirklich bewerten', scores: {} }
            ]
        },
        {
            id: 15, section: 'Abschnitt 3 von 3', factor: 'Bereitschaft',
            text: 'Wenn dieses Quiz eine Lücke aufzeigt, bin ich:',
            options: [
                { text: 'Bereit, sofort daran zu arbeiten', scores: {} },
                { text: 'Offen, mehr zu lernen, bevor ich mich committe', scores: {} },
                { text: 'Neugierig, aber bereits überlastet', scores: {} },
                { text: 'Nur am Erkunden, noch nicht bereit für Veränderung', scores: {} }
            ]
        }
    ];

    // ─── Statement slides (interstitials) ───
    var STATEMENTS = {
        afterQ2: 'Die nächsten Fragen zeigen dir, welche der 5 Faktoren Investoren unbewusst bewerten. Antworte intuitiv \u2014 es gibt keine falschen Antworten.',
        afterQ12: 'Fast geschafft! Diese letzten Fragen helfen uns, deine Ergebnisse zu personalisieren.'
    };

    // ─── Founder Types ───
    var TYPES = {
        'logical-visionary': {
            name: 'The Logical Visionary', label: 'a Logical Visionary',
            tagline: 'Klarheit ist deine Stärke. Präsenz ist dein Hebel.',
            desc: 'Du führst mit Klarheit, Struktur und einem stark durchdachten Modell. Man spürt, dass du in der Lage bist, komplexe Zusammenhänge zu durchdringen und eine solide rationale Story zu bauen.\n\nWas jedoch oft untergeht, ist die emotionale Resonanz: wie sehr Menschen deine Energie fühlen können, nicht nur deine Argumente. Vision und Logik sind da - aber ihre Verkörperung fehlt manchmal.\n\nInvestoren sehen das Potenzial, aber sie spüren dich noch nicht vollständig. Dein größter Hebel liegt darin, Körper, Emotion und Präsenz in Einklang mit deiner Klarheit zu bringen.\n\nDadurch wird deine Vision nicht nur verstanden - sondern gefühlt.',
            lever: 'Presence & Congruent Energy',
            leverScore: '3/10', leverGoal: '7/10',
            nextStep: 'Vertiefe deine Resonanz und finde heraus, wie du von Klarheit zu Kongruenz kommst.',
            course: ['Tag 1\u20132: Präsenz-Grundlagen (Körper-Energie-Alignment)', 'Tag 3\u20134: Von Logik zu gefühlter Bedeutung \u2014 deine Vision verkörpern', 'Tag 5\u20136: Micro-Shifts für kongruente Energie', 'Tag 7: Von Klarheit zu Kongruenz \u2014 wenn Logik und Energie sich treffen'],
            outcomes: ['Du weißt, welche Micro-Shifts deine Präsenz tatsächlich verändern', 'Du hast konkrete Übungen für Präsenz-Entwicklung', 'Du kannst ein Diagnostic Call anfragen (optional)'],
            micro: 'Die meisten Logical Visionaries starten mit dem E-Mail-Kurs. Er gibt dir Zeit, deine Präsenz zu entwickeln, bevor wir sprechen.',
            refScores: { obsession: 7, presence: 3, vision: 8, fit: 6, logic: 9 },
            recommend: '7-day-course'
        },
        'quiet-powerhouse': {
            name: 'The Quiet Powerhouse', label: 'a Quiet Powerhouse',
            tagline: 'Deine Stärke ist da. Deine Vision braucht Sichtbarkeit.',
            desc: 'In dir steckt eine tiefe, ruhige Kraft, die oft erst sichtbar wird, wenn man dich besser kennt. Du bist präsent, geerdet und wirkst stabil \u2014 eine Qualität, die Investoren selten finden und sehr schätzen.\n\nGleichzeitig bleibt deine Vision manchmal zu leise oder zu selbstverständlich. Du weißt, wohin du willst, aber der Weg dahin ist anderen nicht sofort klar.\n\nDeine innere Stärke ist da \u2014 jetzt braucht sie eine klarere Form im Außen: ein schärferes Narrativ, ein stärkeres Bild der Zukunft, ein sichtbarer Zusammenhang zwischen deiner Geschichte und deiner Mission.\n\nWenn deine Tiefe sichtbarer wird, wächst auch das Vertrauen.',
            lever: 'Vision Resonance',
            leverScore: '4/10', leverGoal: '8/10',
            nextStep: 'Erfahre, wie du deine Stärke sichtbarer und deine Vision fühlbarer machst.',
            course: ['Tag 1\u20132: Vision Resonance Grundlagen (gefühlte Bedeutung entwickeln)', 'Tag 3\u20134: Deine Tiefe sichtbar machen \u2014 narrative Klarheit', 'Tag 5\u20136: Von "selbstverständlich" zu "unvermeidlich"', 'Tag 7: Wenn deine Tiefe sichtbar wird \u2014 von leise zu überzeugend'],
            outcomes: ['Deine Vision ist klar, lebendig und emotional greifbar', 'Du weißt, wie du deine stille Stärke nach außen kommunizierst', 'Du kannst ein Diagnostic Call anfragen (optional)'],
            micro: 'Die meisten Quiet Powerhouses starten mit dem E-Mail-Kurs. Er hilft dir, deine Vision zu formen, bevor wir sprechen.',
            refScores: { obsession: 8, presence: 7, vision: 4, fit: 7, logic: 7 },
            recommend: '7-day-course'
        },
        'story-driven': {
            name: 'The Story-Driven Founder', label: 'a Story-Driven Founder',
            tagline: 'Du baust Verbindung auf. Jetzt braucht deine Story Substanz.',
            desc: 'Du hast natürliche Resonanz: Menschen hören dir gerne zu, du baust Verbindung auf und besitzt eine narrative Energie, die sofort Nähe schafft. Das ist ein enormes Kapital.\n\nGleichzeitig verliert deine Story oft an Struktur, wenn es konkret wird: Wie gewinnst du Kunden \u2014 wiederholbar, skalierbar? Was ändert sich von 10 zu 100 Kunden operativ? Investoren hören deine Begeisterung, aber sie suchen auch das Muster dahinter: die Mechanik, die aus einer guten Story ein skalierbares Unternehmen macht.\n\nDeine Stärke liegt im Gefühl \u2014 dein Hebel liegt in der operativen Klarheit. Wenn Wärme und Wachstumslogik zusammenkommen, entsteht eine Präsenz, die sowohl berührt als auch überzeugt.',
            lever: 'Scalable Logic',
            leverScore: '4/10', leverGoal: '8/10',
            nextStep: 'Lerne, wie du deine emotionale Resonanz mit klarer Wachstumsmechanik verbindest.',
            course: ['Tag 1\u20132: Root Cause Pain (was ist das eigentliche Problem \u2014 unter der Oberfläche?)', 'Tag 3\u20134: Scale Path Clarity (von 10 auf 100: was ändert sich konkret?)', 'Tag 5\u20136: Defensibility & Scalable Model (das Muster hinter deiner Story)', 'Tag 7: Story mit Substanz \u2014 wenn Wärme und Mechanik sich treffen'],
            outcomes: ['Deine Story hat eine klare, operative Grundlage', 'Du kannst erklären, wie dein Wachstum funktioniert \u2014 wiederholbar', 'Du kannst ein Diagnostic Call anfragen (optional)'],
            micro: 'Die meisten Story-Driven Founders starten mit dem E-Mail-Kurs. Er gibt deiner Resonanz die Grundlage, die sie verdient.',
            refScores: { obsession: 8, presence: 7, vision: 8, fit: 8, logic: 4 },
            recommend: '7-day-course'
        },
        'integrated-builder': {
            name: 'The Integrated Builder', label: 'an Integrated Builder',
            tagline: 'Du bist fast da. Jetzt geht es um die letzten 10%.',
            desc: 'Du bringst vieles bereits in eine natürliche Stimmigkeit: Präsenz, Klarheit, Vision und persönliche Geschichte sind erkennbar miteinander verbunden. Das ist selten \u2014 und ein starkes Fundament.\n\nDeine nächste Entwicklungsstufe liegt nicht im Fixen großer Lücken, sondern im Feinschliff: Wo fehlt Schärfe im Timing? Wo könnte deine Lösung noch logischer erklärt werden? Wo kann deine Vision noch bildhafter werden?\n\nDu bist nah an einer kongruenten Gesamtpräsenz. Jetzt geht es darum, diese Stimmigkeit bewusst zu verstärken, damit Investoren dich nicht nur als "solide", sondern als "unvermeidlich" erleben.',
            lever: 'Optimization & Precision (all factors)',
            leverScore: '7\u20138/10', leverGoal: '9/10+',
            nextStep: 'Feile an den letzten 10%, die deine Stimmigkeit zur echten Anziehungskraft machen.',
            course: ['Tag 1\u20132: Präzision im Timing (warum genau jetzt \u2014 nicht früher, nicht später?)', 'Tag 3\u20134: Vision Vividness (von klar zu viszeral)', 'Tag 5\u20136: Letzte 10% Optimierung (alle Faktoren)', 'Tag 7: Von "solide" zu "unvermeidlich" \u2014 die letzte Schicht'],
            outcomes: ['Du kennst die letzten Micro-Shifts für echte Präzision', 'Du weißt, wie du von 7/10 auf 9/10 kommst', 'Du kannst ein Diagnostic Call anfragen (optional)'],
            micro: 'Die meisten Integrated Builders starten mit dem E-Mail-Kurs. Er zeigt dir genau, wo deine letzten Hebel liegen.',
            refScores: { obsession: 7, presence: 7, vision: 8, fit: 8, logic: 7 },
            recommend: 'diagnostic-call'
        },
        'almost-there': {
            name: 'The Almost-There Founder', label: 'an Almost-There Founder',
            tagline: 'Alles ist da. Jetzt braucht es Kohärenz.',
            desc: 'Du hast viele Elemente bereits angedeutet: Vision, Energie, Logik, Fit \u2014 alles ist da, aber noch nicht vollständig ausgereift. Es wirkt, als würdest du kurz vor einem Durchbruch stehen, bei dem die verschiedenen Teile deines Foundership miteinander in Einklang kommen.\n\nDeine Entwicklung liegt im Zusammenführen: Was ist deine tiefere Obsession? Wie erzählst du deine persönliche Story so, dass sie Sinn macht? Was ist der ursächliche Pain, und warum ist das Timing genau jetzt richtig?\n\nWenn diese Bausteine sich verbinden, entsteht eine klare, resonante Präsenz, die Investoren intuitiv vertrauen lässt.\n\nDu bist nah dran \u2014 jetzt geht es um Kohärenz.',
            lever: 'Focus & Narrative Coherence',
            leverScore: '5\u20136/10 (all factors)', leverGoal: '8/10',
            nextStep: 'Bring deine verschiedenen Stärken in ein kohärentes, fühlbares Gesamtbild.',
            course: ['Tag 1\u20132: Origin Story Clarity (deine persönliche Verbindung)', 'Tag 3\u20134: Sustainable Obsession (was treibt dich wirklich?)', 'Tag 5\u20136: Narrative Kohärenz (alle Teile verbinden)', 'Tag 7: Der Durchbruch \u2014 wenn alles zusammenkommt'],
            outcomes: ['Du hast ein kohärentes, vollständiges Bild deines Foundership', 'Alle Elemente fügen sich zu einer klaren, fühlbaren Story zusammen', 'Du kannst ein Diagnostic Call anfragen (optional)'],
            micro: 'Die meisten Almost-There Founders starten mit dem E-Mail-Kurs. Er hilft dir, Kohärenz aufzubauen, bevor wir sprechen.',
            refScores: { obsession: 6, presence: 5, vision: 6, fit: 5, logic: 6 },
            recommend: '7-day-course'
        },
        'overloaded-operator': {
            name: 'The Overloaded Operator', label: 'an Overloaded Operator',
            tagline: 'Du trägst viel. Weniger Last erzeugt mehr Wirkung.',
            desc: 'Du trägst viel \u2014 vielleicht zu viel. Du bist kompetent, verantwortungsbewusst und detailstark, aber genau diese Stärken können dich überfrachten.\n\nDeine Energie wirkt manchmal zerstreut oder erschöpft, und Investoren spüren, dass du zu viel gleichzeitig hältst. Der operative Druck überdeckt deine Vision, deine natürliche Präsenz und die Tiefe deiner inneren Motivation.\n\nNichts davon ist ein Defizit \u2014 es ist ein Zeichen dafür, wie wichtig dir alles ist. Doch deine Resonanz entsteht erst, wenn du wieder Raum bekommst: für Klarheit, für Fokus, für den inneren Ruf.\n\nWeniger Last. Mehr Essenz. Und damit mehr Vertrauen.',
            lever: 'Relief & Internal Prioritization',
            leverScore: 'Presence: 2/10, Obsession: toxic', leverGoal: 'create space',
            nextStep: 'Entdecke, wie du Raum schaffst, um wieder klar und resonant zu führen.',
            course: ['Tag 1\u20132: Von toxischer zu nachhaltiger Obsession', 'Tag 3\u20134: Entlastung & Delegation (Raum schaffen)', 'Tag 5\u20136: Präsenz unter Druck (Nervensystem-Regulation)', 'Tag 7: Weniger Last. Mehr Essenz. Mehr Wirkung.'],
            outcomes: ['Du weißt, wie du operative Last reduzierst \u2014 ohne Produktivität zu verlieren', 'Du hast Strategien für nachhaltige Obsession', 'Du kannst ein Diagnostic Call anfragen (optional)'],
            micro: 'Die meisten Overloaded Operators starten mit dem E-Mail-Kurs. Ein Impuls pro Tag \u2014 das schafft Raum, keine neuen Aufgaben.',
            refScores: { obsession: 9, presence: 2, vision: 5, fit: 6, logic: 8 },
            recommend: 'diagnostic-call'
        },
        'disconnected-genius': {
            name: 'The Disconnected Genius', label: 'a Disconnected Genius',
            tagline: 'Deine Brillanz ist da. Jetzt braucht sie Erdung.',
            desc: 'Du siehst Dinge, bevor andere sie sehen. Deine Gedanken sind schnell, tief und oft richtungsweisend. Aber du überholst manchmal dein eigenes Nervensystem \u2014 und deine Zuhörer gleich mit.\n\nWas für dich selbstverständlich ist, wirkt für andere abstrakt oder schwer greifbar. Dazu kommt: Die operative Mechanik \u2014 wie Wachstum konkret funktioniert, welche Schritte von 10 zu 100 Kunden führen \u2014 bleibt im Gespräch oft im Ungefähren.\n\nDeine Brillanz wird spürbar, aber nicht fühlbar und nicht greifbar. Das erzeugt Distanz, obwohl du Verbundenheit willst.\n\nDein größter Hebel liegt darin, Tempo zu reduzieren, Energie zu erden und deine Vision in klare, operative Schritte zu übersetzen, die andere unmittelbar nachvollziehen können.\n\nWenn Genius, Präsenz und Wachstumslogik zusammenfinden, entsteht eine außergewöhnliche Strahlkraft.',
            lever: 'Grounding & Translatability',
            leverScore: 'Presence: 3/10, Fit: 3/10, Logic: 3/10', leverGoal: '7/10+',
            nextStep: 'Erfahre, wie du deine Brillanz fühlbar, zugänglich und operativ konkret machst.',
            course: ['Tag 1\u20132: Erdung & Entschleunigung (Nervensystem)', 'Tag 3\u20134: Übersetzbarkeit \u2014 von abstrakt zu konkret und greifbar', 'Tag 5\u20136: Skalierbare Kommunikation (deine Wachstumslogik für andere zugänglich machen)', 'Tag 7: Wenn Genius landet \u2014 Brillanz, die wirklich ankommt'],
            outcomes: ['Du weißt, wie du entschleunigst, ohne deine Tiefe zu verlieren', 'Du kannst deine Brillanz \u2014 und deine Wachstumslogik \u2014 übersetzen', 'Du kannst ein Diagnostic Call anfragen (optional)'],
            micro: 'Die meisten Disconnected Geniuses starten mit dem E-Mail-Kurs. Er hilft dir, deine Brillanz so zu kommunizieren, dass andere mit dir denken \u2014 nicht hinterher.',
            refScores: { obsession: 9, presence: 3, vision: 9, fit: 3, logic: 3 },
            recommend: 'diagnostic-call'
        }
    };

    // ─── Webhook ───
    var WEBHOOK_URL = 'https://cocreative.app.n8n.cloud/webhook/2f90ce51-d413-4c17-865a-95f4bbdd72b7';

    function buildPayload(extra) {
        var payload = {
            founderType: resultType,
            scores: getScores(),
            answers: {},
            timestamp: new Date().toISOString()
        };
        // Include question text + chosen answer text
        Object.keys(answers).forEach(function (qNum) {
            var q = QUESTIONS[parseInt(qNum) - 1];
            if (q && answers[qNum]) {
                payload.answers[qNum] = {
                    question: q.text,
                    factor: q.factor,
                    answer: q.options[answers[qNum].idx] ? q.options[answers[qNum].idx].text : '',
                    otherText: (q.options[answers[qNum].idx] && q.options[answers[qNum].idx].otherInput) ? (function() {
                        var card = optionCards[answers[qNum].idx];
                        var inp = card ? card.querySelector('[data-quiz="other-input"]') : null;
                        return inp ? inp.value : '';
                    })() : undefined
                };
            }
        });
        if (extra) {
            Object.keys(extra).forEach(function (k) { payload[k] = extra[k]; });
        }
        return payload;
    }

    function sendWebhook(payload) {
        fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }).then(function (res) {
            console.log('[LC Quiz] Webhook sent:', res.status);
        }).catch(function (err) {
            console.error('[LC Quiz] Webhook error:', err);
        });
    }

    // ═══════════════════════════════════════════
    // STATE
    // ═══════════════════════════════════════════
    var answers = {};
    var currentQuestion = 0;
    var resultType = null;

    // ═══════════════════════════════════════════
    // SCREEN TRANSITIONS
    // ═══════════════════════════════════════════
    var allSlides = [introSlide, statementSlide, questionSlide];

    function hideEl(el) {
        el.style.display = 'none';
        el.style.opacity = '0';
    }

    function showSlide(target) {
        allSlides.forEach(function (s) {
            if (s) hideEl(s);
        });
        resultsSections.forEach(function (s) {
            hideEl(s);
        });

        if (target) {
            target.style.display = 'flex';
            target.style.opacity = '0';
            target.style.transform = 'translateY(12px)';
            target.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
            requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                    target.style.opacity = '1';
                    target.style.transform = 'translateY(0)';
                });
            });
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function showResults() {
        allSlides.forEach(function (s) {
            if (s) hideEl(s);
        });
        if (progressFill) progressFill.style.width = '100%';
        var progressTrack = document.querySelector('.lc-progress-track');
        if (progressTrack) progressTrack.style.display = '';

        // Hide quiz logo on results page
        if (quizLogo) quizLogo.style.opacity = '0';

        resultsSections.forEach(function (s) {
            s.style.display = (s === resultsProfile) ? 'block' : 'flex';
            s.style.opacity = '0';
            s.style.transition = 'opacity 0.6s ease';
            requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                    s.style.opacity = '1';
                });
            });
        });

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ═══════════════════════════════════════════
    // SCORING
    // ═══════════════════════════════════════════
    function getScores() {
        var s = { obsession: [], presence: [], vision: [], fit: [], logic: [] };
        Object.values(answers).forEach(function (a) {
            if (a && a.scores) {
                Object.keys(a.scores).forEach(function (k) {
                    if (s[k]) s[k].push(a.scores[k]);
                });
            }
        });
        var avg = {};
        Object.keys(s).forEach(function (k) {
            var v = s[k];
            avg[k] = v.length ? Math.round((v.reduce(function (a, b) { return a + b; }, 0) / v.length) * 10) / 10 : 5;
        });
        return avg;
    }

    function determineType(scores) {
        var o = scores.obsession, p = scores.presence, v = scores.vision, f = scores.fit, l = scores.logic;
        if (l >= 7 && p <= 5 && v >= 6) return 'logical-visionary';
        if (p >= 7 && f >= 6 && v <= 5) return 'quiet-powerhouse';
        if (p >= 6 && o >= 7 && l <= 5) return 'story-driven';
        if (o >= 6 && p >= 6 && v >= 6 && f >= 6 && l >= 6) return 'integrated-builder';
        if (o >= 8 && p <= 3) return 'overloaded-operator';
        if (v >= 8 && o >= 8 && p <= 4 && l <= 4) return 'disconnected-genius';
        return 'almost-there';
    }

    // ═══════════════════════════════════════════
    // RENDER QUESTION
    // ═══════════════════════════════════════════
    function renderQuestion(qNum) {
        var q = QUESTIONS[qNum - 1];

        // Update header labels
        if (sectionLabel) sectionLabel.textContent = q.section;
        if (questionLabel) questionLabel.textContent = q.factor;
        if (questionText) questionText.textContent = q.text;

        // Populate the 4 fixed option cards
        optionCards.forEach(function (card, idx) {
            if (!card) return;
            var opt = q.options[idx];
            if (!opt) {
                card.style.display = 'none';
                return;
            }
            card.style.display = '';
            var textEl = card.querySelector('.lc-option-text');
            if (textEl) textEl.textContent = opt.text;

            // Show/hide other input (use !important to override CSS rule)
            var otherInput = card.querySelector('[data-quiz="other-input"]');
            if (otherInput) {
                otherInput.value = '';
                otherInput.placeholder = 'Deine Antwort...';
                if (opt.otherInput) {
                    var showIt = (answers[qNum] && answers[qNum].idx === idx) ? 'block' : 'none';
                    otherInput.style.setProperty('display', showIt, 'important');
                } else {
                    otherInput.style.setProperty('display', 'none', 'important');
                }
            }

            // Mark as selected if previously answered
            if (answers[qNum] && answers[qNum].idx === idx) {
                card.classList.add('selected');
            } else {
                card.classList.remove('selected');
            }
        });

        // Wire option click handlers (remove old, add new)
        optionCards.forEach(function (card, idx) {
            if (!card) return;
            var newCard = card.cloneNode(true);
            card.parentNode.replaceChild(newCard, card);
            optionCards[idx] = newCard;

            newCard.addEventListener('click', function () {
                optionCards.forEach(function (c) {
                    if (c) c.classList.remove('selected');
                });
                newCard.classList.add('selected');
                answers[qNum] = { idx: idx, scores: q.options[idx].scores };
                // Handle other input visibility
                optionCards.forEach(function (c) {
                    if (c) {
                        var inp = c.querySelector('[data-quiz="other-input"]');
                        if (inp) inp.style.display = 'none';
                    }
                });
                var clickedInput = newCard.querySelector('[data-quiz="other-input"]');
                if (clickedInput && q.options[idx].otherInput) {
                    clickedInput.style.display = 'block';
                    clickedInput.focus();
                }
                if (clickedInput) clickedInput.placeholder = 'Deine Antwort...';
                if (continueBtn) continueBtn.classList.remove('cc-disabled');
            });
        });

        // Update continue button state
        if (continueBtn) {
            if (answers[qNum]) {
                continueBtn.classList.remove('cc-disabled');
            } else {
                continueBtn.classList.add('cc-disabled');
            }
        }

        // Update progress bar
        var pct = Math.round((qNum / QUESTIONS.length) * 100);
        if (progressFill) progressFill.style.width = pct + '%';

        // Show progress track during questions
        var progressTrack = document.querySelector('.lc-progress-track');
        if (progressTrack) progressTrack.style.display = '';

        showSlide(questionSlide);
    }

    // ═══════════════════════════════════════════
    // SHOW STATEMENT
    // ═══════════════════════════════════════════
    var pendingNextQuestion = 0;

    function showStatement(text, nextQ) {
        var stText = qa('statement-text');
        if (stText) stText.innerHTML = text;
        pendingNextQuestion = nextQ;
        showSlide(statementSlide);
    }

    // ═══════════════════════════════════════════
    // NAVIGATION
    // ═══════════════════════════════════════════
    function goNext() {
        if (!answers[currentQuestion] && currentQuestion > 0) return;

        // After Q2 → statement
        if (currentQuestion === 2) {
            showStatement(STATEMENTS.afterQ2, 3);
            return;
        }

        // After Q12 → statement
        if (currentQuestion === 12) {
            showStatement(STATEMENTS.afterQ12, 13);
            return;
        }

        // After Q15 → loading → results
        if (currentQuestion === 15) {
            showLoadingThenResults();
            return;
        }

        currentQuestion++;
        renderQuestion(currentQuestion);
    }

    function goBack() {
        // From a statement slide → go back to the question before it
        if (statementSlide && statementSlide.style.display !== 'none' && statementSlide.style.opacity !== '0') {
            if (pendingNextQuestion === 3) {
                currentQuestion = 2;
            } else if (pendingNextQuestion === 13) {
                currentQuestion = 12;
            }
            renderQuestion(currentQuestion);
            return;
        }

        // From Q1 → back to intro
        if (currentQuestion <= 1) {
            currentQuestion = 0;
            showSlide(introSlide);
            if (quizLogo) quizLogo.style.opacity = '0';
            var progressTrack = document.querySelector('.lc-progress-track');
            if (progressTrack) progressTrack.style.display = '';
            if (progressFill) progressFill.style.width = '0%';
            return;
        }

        currentQuestion--;
        renderQuestion(currentQuestion);
    }

    function showLoadingThenResults() {
        // Create a simple loading overlay
        allSlides.forEach(function (s) {
            if (s) s.style.display = 'none';
        });

        var progressTrack = document.querySelector('.lc-progress-track');
        if (progressTrack) progressTrack.style.display = 'none';

        // Create temporary loading screen
        var loadingEl = document.createElement('section');
        loadingEl.className = 'section slide-section';
        loadingEl.style.textAlign = 'center';
        loadingEl.style.paddingTop = '20vh';
        loadingEl.innerHTML =
            '<div class="w-layout-blockcontainer w-container">' +
            '<p style="font-family:var(--lc-serif,Playfair Display,serif);opacity:0.6;font-style:italic;font-size:1.3rem;">Dein Profil wird erstellt</p>' +
            '<div class="quiz-loading-dots" style="display:flex;justify-content:center;gap:8px;margin-top:32px;">' +
            '<span class="quiz-dot"></span><span class="quiz-dot"></span><span class="quiz-dot"></span>' +
            '</div></div>';
        document.querySelector('.page-main').appendChild(loadingEl);

        setTimeout(function () {
            loadingEl.remove();
            populateResults();
        }, 2400);
    }

    // ═══════════════════════════════════════════
    // WIRE UP BUTTONS
    // ═══════════════════════════════════════════

    // Begin button — first .button inside intro slide
    var quizLogo = document.getElementById('quiz-logo');
    if (beginBtn) {
        beginBtn.addEventListener('click', function (e) {
            e.preventDefault();
            // Fade in quiz logo
            if (quizLogo) {
                quizLogo.style.transition = 'opacity 0.6s ease';
                quizLogo.style.opacity = '1';
            }
            currentQuestion = 1;
            renderQuestion(1);
        });
    }

    // Statement continue button
    if (statementContinueBtn) {
        statementContinueBtn.addEventListener('click', function (e) {
            e.preventDefault();
            currentQuestion = pendingNextQuestion;
            renderQuestion(currentQuestion);
        });
    }

    // Question continue button
    if (continueBtn) {
        continueBtn.addEventListener('click', function (e) {
            e.preventDefault();
            if (continueBtn.classList.contains('cc-disabled')) return;
            goNext();
        });
    }

    // Back button (on both question and statement slides)
    var backBtns = document.querySelectorAll('[data-quiz="back-button"]');
    backBtns.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            goBack();
        });
    });

    // ═══════════════════════════════════════════
    // POPULATE RESULTS
    // ═══════════════════════════════════════════
    function populateText(attr, text) {
        var el = qa(attr);
        if (el) el.textContent = text;
    }

    function populateResults(overrideScores, overrideTypeKey) {
        var scores = overrideScores || getScores();
        var typeKey = overrideTypeKey || determineType(scores);
        var type = TYPES[typeKey];
        resultType = typeKey;
        var useScores = overrideScores || scores;

        console.log('[LC Quiz] Actual scores:', JSON.stringify(scores));
        console.log('[LC Quiz] Type determined:', typeKey);
        console.log('[LC Quiz] Display scores:', JSON.stringify(useScores));

        // ── Type header ──
        populateText('type-name', type.name);
        populateText('tagline', type.tagline);

        // Section label in results = "Dein Founder Resonance Typ:"
        var resultsLabel = qa('section-label', resultsProfile);
        if (resultsLabel) resultsLabel.textContent = 'Dein Founder Resonance Typ:';

        // ── Profile description ──
        // Find the paragraph.paragraph-lg after the "Dein Profil" eyebrow
        if (resultsProfile) {
            var eyebrows = resultsProfile.querySelectorAll('.eyebrow');
            eyebrows.forEach(function (eyebrow) {
                if (eyebrow.textContent.trim() === 'Your Profile' || eyebrow.textContent.trim() === 'Dein Profil') {
                    eyebrow.textContent = 'Dein Profil';
                    var nextP = eyebrow.nextElementSibling;
                    while (nextP && !nextP.classList.contains('paragraph-lg')) {
                        nextP = nextP.nextElementSibling;
                    }
                    if (nextP) {
                        nextP.innerHTML = type.desc.split('\n\n').map(function (p) {
                            return p;
                        }).join('<br><br>');
                    }
                }
            });
        }

        // ── Lever card ──
        populateText('lever-name', type.lever);
        var leverScoreEl = qa('lever-score');
        if (leverScoreEl) leverScoreEl.textContent = type.leverScore + ' \u2192 Ziel: ' + type.leverGoal;
        var leverNextEl = qa('lever-next');
        if (leverNextEl) leverNextEl.innerHTML = '<em>' + type.nextStep + '</em>';

        // ── Factor bars ──
        // Map factor keys to their display labels
        var factorMap = {
            'Obsession': 'obsession',
            'Presence': 'presence',
            'Presence & Congruent Energy': 'presence',
            'Präsenz & Kongruente Energie': 'presence',
            'Vision': 'vision',
            'Vision Resonance': 'vision',
            'Vision & Resonanz': 'vision',
            'Founder Fit': 'fit',
            'Scalable Logic': 'logic',
            'Skalierbare Logik': 'logic'
        };

        if (resultsProfile) {
            var factorWraps = resultsProfile.querySelectorAll('.factor-wrap');
            factorWraps.forEach(function (wrap) {
                var labelEl = wrap.querySelector('.factor-label');
                if (!labelEl) return;
                var factorKey = factorMap[labelEl.textContent.trim()];
                if (!factorKey) return;

                var score = useScores[factorKey];
                var barInner = wrap.querySelector('.factor-bar-inner');
                var ratingEl = wrap.querySelector('.factor-rating');

                if (barInner) {
                    // Set width after a brief delay for animation
                    barInner.style.width = '0%';
                    barInner.style.transition = 'width 1.2s cubic-bezier(0.22, 1, 0.36, 1)';
                }
                if (ratingEl) {
                    ratingEl.textContent = score + '/10';
                    if (score <= 4) ratingEl.textContent += ' \u26A0';
                }
            });

            // Animate bars after paint
            requestAnimationFrame(function () {
                setTimeout(function () {
                    factorWraps.forEach(function (wrap) {
                        var labelEl = wrap.querySelector('.factor-label');
                        if (!labelEl) return;
                        var factorKey = factorMap[labelEl.textContent.trim()];
                        if (!factorKey) return;
                        var barInner = wrap.querySelector('.factor-bar-inner');
                        if (barInner) barInner.style.width = (useScores[factorKey] * 10) + '%';
                    });
                }, 200);
            });
        }

        // ── Radial burst chart ──
        var radarContainer = qa('radar');
        if (radarContainer) {
            // Ensure container has dimensions for canvas rendering
            radarContainer.style.width = '100%';
            radarContainer.style.aspectRatio = '1';

            // Set German labels for radial chart (used by both external and fallback)
            window.lcRadialLabels = ['Obsession', 'Präsenz & Energie', 'Vision & Resonanz', 'Founder Fit', 'Skalierbare Logik'];

            if (window.drawRadialChart) {
                radarContainer.setAttribute('data-radial-chart', '');
                window.drawRadialChart(useScores, radarContainer);
            } else {
                drawRadar(radarContainer, useScores);
            }
        }

        // ── Course card content ──
        populateText('response-type', type.name);

        // Update course list items
        var courseCard = qa('7-day-course');
        if (courseCard) {
            var courseItems = courseCard.querySelectorAll('.cta-list-item');
            type.course.forEach(function (text, i) {
                if (courseItems[i]) {
                    var p = courseItems[i].querySelector('p');
                    if (p) p.textContent = text;
                }
            });

            // Update outcome list items (second .cta-list inside course card)
            var ctaLists = courseCard.querySelectorAll('.cta-list');
            if (ctaLists.length >= 2) {
                var outcomeItems = ctaLists[1].querySelectorAll('.cta-list-item');
                type.outcomes.forEach(function (text, i) {
                    if (outcomeItems[i]) {
                        var p = outcomeItems[i].querySelector('p');
                        if (p) p.textContent = text;
                    }
                });
            }
        }

        // ── Recommendation statement ──
        var recoEl = qa('recommendation-statement');
        if (recoEl) recoEl.innerHTML = '<em>' + type.micro + '</em>';

        // ── CTA recommendation ──
        var recommendedCta = type.recommend || '7-day-course';
        var secondaryCta = (recommendedCta === '7-day-course') ? 'diagnostic-call' : '7-day-course';

        var recCard = qa(recommendedCta);
        var secCard = qa(secondaryCta);

        if (recCard) {
            recCard.classList.add('cc-recommended');
            recCard.classList.remove('cc-secondary-cta');
            var recTag = qa('recommended-tag', recCard);
            if (recTag) recTag.style.display = '';
        }
        if (secCard) {
            secCard.classList.add('cc-secondary-cta');
            secCard.classList.remove('cc-recommended');
            var secTag = qa('recommended-tag', secCard);
            if (secTag) secTag.style.display = 'none';
            var secBtn = secCard.querySelector('.button');
            if (secBtn) secBtn.classList.add('secondary-button');
        }

        // ── Wire CTA button clicks to send webhook ──
        wireCTAWebhook(recCard, recommendedCta);
        wireCTAWebhook(secCard, secondaryCta);

        // Expose quiz data globally for application forms
        window.lcQuizData = buildPayload({ event: 'quiz-completed' });

        // Skip webhook + transitions when called from admin tool
        if (!overrideScores) {
            sendWebhook(window.lcQuizData);
            showResults();
            injectQuizDataIntoForms();
        }
    }

    // ═══════════════════════════════════════════
    // FALLBACK RADAR CHART (when radial-chart.js not loaded)
    // ═══════════════════════════════════════════
    function drawRadar(container, scores) {
        var canvas = container.querySelector('canvas');
        if (!canvas) {
            canvas = document.createElement('canvas');
            container.appendChild(canvas);
        }

        var ctx = canvas.getContext('2d');
        var factors = ['obsession', 'presence', 'vision', 'fit', 'logic'];
        var labels = ['Obsession', 'Präsenz & Energie', 'Vision & Resonanz', 'Founder Fit', 'Skalierbare Logik'];

        container.style.overflow = 'visible';
        var rect = container.getBoundingClientRect();
        var size = Math.min(rect.width, 400);
        var dpr = window.devicePixelRatio || 1;
        canvas.width = size * dpr;
        canvas.height = size * dpr;
        canvas.style.width = size + 'px';
        canvas.style.height = size + 'px';
        canvas.style.margin = '0 auto';
        canvas.style.display = 'block';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        var cx = size / 2, cy = size / 2, r = size * 0.3;

        // Grid rings
        for (var ring = 2; ring <= 10; ring += 2) {
            ctx.beginPath();
            for (var i = 0; i <= 5; i++) {
                var a = (Math.PI * 2 * i / 5) - Math.PI / 2;
                var x = cx + (r * ring / 10) * Math.cos(a);
                var y = cy + (r * ring / 10) * Math.sin(a);
                if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.strokeStyle = 'rgba(255,248,230,0.06)';
            ctx.lineWidth = 0.5;
            ctx.stroke();
        }

        // Axes
        for (var j = 0; j < 5; j++) {
            var aa = (Math.PI * 2 * j / 5) - Math.PI / 2;
            ctx.beginPath(); ctx.moveTo(cx, cy);
            ctx.lineTo(cx + r * Math.cos(aa), cy + r * Math.sin(aa));
            ctx.strokeStyle = 'rgba(255,248,230,0.06)'; ctx.lineWidth = 0.5; ctx.stroke();
        }

        // Fill shape
        ctx.beginPath();
        factors.forEach(function (f, i) {
            var val = scores[f] / 10;
            var a = (Math.PI * 2 * i / 5) - Math.PI / 2;
            var x = cx + r * val * Math.cos(a), y = cy + r * val * Math.sin(a);
            if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        });
        ctx.closePath();
        var g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, 'rgba(5,64,76,0.5)'); g.addColorStop(1, 'rgba(5,64,76,0.15)');
        ctx.fillStyle = g; ctx.fill();

        // Stroke shape
        ctx.beginPath();
        factors.forEach(function (f, i) {
            var val = scores[f] / 10;
            var a = (Math.PI * 2 * i / 5) - Math.PI / 2;
            var x = cx + r * val * Math.cos(a), y = cy + r * val * Math.sin(a);
            if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        });
        ctx.closePath();
        ctx.strokeStyle = '#E0B76F'; ctx.lineWidth = 1.5; ctx.stroke();

        // Points + Labels
        factors.forEach(function (f, i) {
            var val = scores[f] / 10;
            var a = (Math.PI * 2 * i / 5) - Math.PI / 2;
            var x = cx + r * val * Math.cos(a), y = cy + r * val * Math.sin(a);
            ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#E0B76F'; ctx.fill();
            var lx = cx + (r + size * 0.08) * Math.cos(a);
            var ly = cy + (r + size * 0.08) * Math.sin(a);
            ctx.font = '600 ' + Math.max(9, size * 0.022) + 'px Hanken Grotesk, sans-serif';
            ctx.fillStyle = 'rgba(255,248,230,0.45)';
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText(labels[i].toUpperCase(), lx, ly - size * 0.015);
            ctx.font = '600 ' + Math.max(11, size * 0.026) + 'px Hanken Grotesk, sans-serif';
            ctx.fillStyle = '#E0B76F';
            ctx.fillText(scores[f].toFixed(1), lx, ly + size * 0.02);
        });
    }

    // ═══════════════════════════════════════════
    // CTA WEBHOOK WIRING
    // ═══════════════════════════════════════════
    function wireCTAWebhook(card, ctaName) {
        if (!card) return;
        var btn = card.querySelector('.button');
        if (!btn) return;
        btn.addEventListener('click', function () {
            sendWebhook(buildPayload({ event: 'cta-click', cta: ctaName }));
        });
    }

    // ═══════════════════════════════════════════
    // FORM DATA INJECTION
    // ═══════════════════════════════════════════
    function injectQuizDataIntoForms() {
        // Build quiz data object
        var scores = getScores();
        var quizData = {
            founderType: resultType,
            scores: scores,
            answers: {}
        };
        Object.keys(answers).forEach(function (qNum) {
            var q = QUESTIONS[parseInt(qNum) - 1];
            if (q && answers[qNum]) {
                quizData.answers[qNum] = {
                    question: q.text,
                    factor: q.factor,
                    answer: q.options[answers[qNum].idx] ? q.options[answers[qNum].idx].text : ''
                };
                if (q.options[answers[qNum].idx] && q.options[answers[qNum].idx].otherInput) {
                    var card = optionCards[answers[qNum].idx];
                    var inp = card ? card.querySelector('[data-quiz="other-input"]') : null;
                    if (inp && inp.value) quizData.answers[qNum].otherText = inp.value;
                }
            }
        });

        var quizDataJson = JSON.stringify(quizData);

        // Find all forms in results sections and inject hidden fields
        var allForms = [];
        resultsSections.forEach(function (section) {
            var forms = section.querySelectorAll('form');
            forms.forEach(function (f) { allForms.push(f); });
        });

        // Also check CTA cards specifically
        var courseCard = qa('7-day-course');
        var callCard = qa('diagnostic-call');
        [courseCard, callCard].forEach(function (card) {
            if (!card) return;
            var forms = card.querySelectorAll('form');
            forms.forEach(function (f) {
                if (allForms.indexOf(f) === -1) allForms.push(f);
            });
        });

        allForms.forEach(function (form) {
            // Remove any previously injected hidden fields
            var oldFields = form.querySelectorAll('.lc-quiz-data');
            oldFields.forEach(function (f) { f.remove(); });

            // Inject hidden field with all quiz data
            var hidden = document.createElement('input');
            hidden.type = 'hidden';
            hidden.name = 'quiz_data';
            hidden.value = quizDataJson;
            hidden.className = 'lc-quiz-data';
            form.appendChild(hidden);

            // Also inject individual fields for easy n8n mapping
            var typeField = document.createElement('input');
            typeField.type = 'hidden';
            typeField.name = 'founder_type';
            typeField.value = resultType || '';
            typeField.className = 'lc-quiz-data';
            form.appendChild(typeField);

            var scoreFields = ['obsession', 'presence', 'vision', 'fit', 'logic'];
            scoreFields.forEach(function (factor) {
                var sf = document.createElement('input');
                sf.type = 'hidden';
                sf.name = 'score_' + factor;
                sf.value = scores[factor] || '';
                sf.className = 'lc-quiz-data';
                form.appendChild(sf);
            });

            // Q13: How did you hear about this quiz
            var q13Answer = answers[13] && QUESTIONS[12] ? (QUESTIONS[12].options[answers[13].idx] ? QUESTIONS[12].options[answers[13].idx].text : '') : '';
            // Include "Other" text if applicable
            if (q13Answer && answers[13] && QUESTIONS[12].options[answers[13].idx] && QUESTIONS[12].options[answers[13].idx].otherInput) {
                var otherCard = optionCards[answers[13].idx];
                var otherInp = otherCard ? otherCard.querySelector('[data-quiz="other-input"]') : null;
                if (otherInp && otherInp.value) q13Answer += ' ' + otherInp.value;
            }
            var heardField = document.createElement('input');
            heardField.type = 'hidden';
            heardField.name = 'heard_about';
            heardField.value = q13Answer;
            heardField.className = 'lc-quiz-data';
            form.appendChild(heardField);

            // Q14: What would make this most valuable
            var q14Answer = answers[14] && QUESTIONS[13] ? (QUESTIONS[13].options[answers[14].idx] ? QUESTIONS[13].options[answers[14].idx].text : '') : '';
            var valueField = document.createElement('input');
            valueField.type = 'hidden';
            valueField.name = 'value_sought';
            valueField.value = q14Answer;
            valueField.className = 'lc-quiz-data';
            form.appendChild(valueField);

            // Language
            var langField = document.createElement('input');
            langField.type = 'hidden';
            langField.name = 'language';
            langField.value = 'DE';
            langField.className = 'lc-quiz-data';
            form.appendChild(langField);

            console.log('[LC Quiz] Quiz data injected into form:', form.id || form.name || '(unnamed)');
        });

        // Also wire submit handlers to send webhook
        allForms.forEach(function (form) {
            if (form._lcWired) return;
            if (form.id === 'dcFormEl') return; // application form has its own webhook
            form._lcWired = true;

            form.addEventListener('submit', function () {
                var emailInput = form.querySelector('input[type="email"]');
                var nameInput = form.querySelector('input[name="name"], input[type="text"]');
                var payload = buildPayload({
                    event: 'email-signup',
                    email: emailInput ? emailInput.value : '',
                    name: nameInput ? nameInput.value : '',
                    cta: form.closest('[data-quiz="7-day-course"]') ? '7-day-course' : 'diagnostic-call'
                });
                sendWebhook(payload);
                console.log('[LC Quiz] Form submitted with quiz data:', payload);
            });
        });
    }

    // ═══════════════════════════════════════════
    // INITIAL STATE — show intro, hide everything else
    // ═══════════════════════════════════════════
    showSlide(introSlide);
    if (progressFill) progressFill.style.width = '0%';

    console.log('[LC Quiz] Initialized (DE). ' + QUESTIONS.length + ' questions loaded.');

    // ═══════════════════════════════════════════
    // PUBLIC API — for admin/debug tools
    // ═══════════════════════════════════════════
    window.lcQuiz = {
        TYPES: TYPES,
        determineType: determineType,
        populateResults: populateResults,
        showResults: showResults,
        drawRadar: drawRadar
    };

})();
