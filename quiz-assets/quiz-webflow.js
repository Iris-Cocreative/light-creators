/**
 * Light Creators — Founder Resonance Quiz (Webflow-native)
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
 *   section-label             "Section X of 3" label
 *   question-label            Factor name label
 *   question                  Question heading text
 *   question-1 … question-4   The 4 option cards (fixed in Webflow)
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

    // ─── Option cards (5 fixed cards in Webflow) ───
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
            id: 1, section: 'Section 1 of 3', factor: 'Situation',
            text: 'Where are you currently in your funding journey?',
            options: [
                { text: 'Pre-seed (building MVP, no active fundraising yet)', scores: {} },
                { text: 'Seed stage (actively pitching VCs, refining business model)', scores: {} },
                { text: 'Series A prep (scaling, institutional investors)', scores: {} },
                { text: 'Between rounds (pivoting or extending runway)', scores: {} },
                { text: 'Exit evaluation / Private Equity conversations / Other', scores: {} }
            ]
        },
        {
            id: 2, section: 'Section 1 of 3', factor: 'Challenge',
            text: "What's your biggest challenge in investor conversations right now?",
            options: [
                { text: 'Getting meetings, but no follow-up interest', scores: {} },
                { text: "Investors like the idea, but don't commit", scores: {} },
                { text: "Feedback is too vague \u2014 I don't know what's missing", scores: {} },
                { text: "I haven't pitched yet, but want to prepare properly", scores: {} }
            ]
        },
        {
            id: 3, section: 'Section 2 of 3', factor: 'Obsession',
            text: 'When you explain your company to investors, what drives your energy most?',
            options: [
                { text: 'The market opportunity and financial potential', scores: { obsession: 3 } },
                { text: 'The elegance of the solution or technology', scores: { obsession: 5 } },
                { text: 'The problem this solves in the world', scores: { obsession: 7 } },
                { text: 'My personal connection to this mission', scores: { obsession: 10 } }
            ]
        },
        {
            id: 4, section: 'Section 2 of 3', factor: 'Obsession',
            text: 'If funding took 2x longer than expected, how would you feel?',
            options: [
                { text: 'Frustrated \u2014 I need momentum to stay motivated', scores: { obsession: 2 } },
                { text: "Concerned \u2014 but I'd find a way to continue", scores: { obsession: 6 } },
                { text: 'Unaffected \u2014 this work matters regardless of timeline', scores: { obsession: 10 } },
                { text: 'Relieved \u2014 more time to refine before scaling', scores: { obsession: 4 } }
            ]
        },
        {
            id: 5, section: 'Section 2 of 3', factor: 'Presence & Energy',
            text: 'When an investor asks an unexpected or critical question, I typically:',
            options: [
                { text: 'Feel my body tense and my mind race for the "right" answer', scores: { presence: 2 } },
                { text: 'Notice slight unease, but stay mostly grounded', scores: { presence: 6 } },
                { text: 'Feel calm and genuinely curious about their concern', scores: { presence: 10 } },
                { text: 'Shift into "defense mode" without realizing it', scores: { presence: 1 } }
            ]
        },
        {
            id: 6, section: 'Section 2 of 3', factor: 'Presence & Energy',
            text: 'After investor meetings, I most often feel:',
            options: [
                { text: 'Uncertain whether I showed up as my authentic self', scores: { presence: 4 } },
                { text: 'Aware I was performing rather than connecting', scores: { presence: 5 } },
                { text: 'Energized \u2014 like they saw the real me', scores: { presence: 10 } },
                { text: 'Exhausted from managing my energy', scores: { presence: 2 } }
            ]
        },
        {
            id: 7, section: 'Section 2 of 3', factor: 'Vision Resonance',
            text: 'When you describe your vision, how do investors typically respond?',
            options: [
                { text: 'They ask for more data or proof points', scores: { vision: 3 } },
                { text: 'They intellectually agree but seem unmoved', scores: { vision: 5 } },
                { text: 'They lean in and ask "what would that world look like?"', scores: { vision: 10 } },
                { text: 'They say "I get it" but I\'m not sure they feel it', scores: { vision: 4 } }
            ]
        },
        {
            id: 8, section: 'Section 2 of 3', factor: 'Vision Resonance',
            text: 'Can you describe your vision in a way that people can immediately see and feel?',
            options: [
                { text: 'I explain the business model and market size', scores: { vision: 2 } },
                { text: 'I can articulate the future state logically', scores: { vision: 5 } },
                { text: 'I paint a picture people can see and feel', scores: { vision: 10 } },
                { text: "I'm not sure \u2014 I focus more on the problem we solve", scores: { vision: 3 } }
            ]
        },
        {
            id: 9, section: 'Section 2 of 3', factor: 'Founder Fit',
            text: 'When investors ask "Why you?", your answer feels like:',
            options: [
                { text: 'A resume recitation of credentials', scores: { fit: 3 } },
                { text: 'Logical, but disconnected from the mission', scores: { fit: 5 } },
                { text: 'An inevitable personal story that led here', scores: { fit: 10 } },
                { text: 'Defensive or compensatory', scores: { fit: 2 } }
            ]
        },
        {
            id: 10, section: 'Section 2 of 3', factor: 'Founder Fit',
            text: "Your personal history and this company's mission feel like:",
            options: [
                { text: 'Professionally aligned, but not deeply connected', scores: { fit: 5 } },
                { text: 'Separate parts of my identity', scores: { fit: 2 } },
                { text: 'A single, coherent thread', scores: { fit: 10 } },
                { text: 'Strong intellectually, weaker emotionally', scores: { fit: 4 } }
            ]
        },
        {
            id: 11, section: 'Section 2 of 3', factor: 'Scalable Logic',
            text: 'When explaining why NOW is the right time, I:',
            options: [
                { text: 'Reference general trends ("market is growing")', scores: { logic: 3 } },
                { text: 'Cite specific shifts that created new possibility', scores: { logic: 10 } },
                { text: 'Focus more on our readiness than market timing', scores: { logic: 4 } },
                { text: 'Struggle to articulate timing beyond "good opportunity"', scores: { logic: 2 } }
            ]
        },
        {
            id: 12, section: 'Section 2 of 3', factor: 'Scalable Logic',
            text: 'When an investor asks "How do you go from 10 to 100 customers?" \u2014 what do you typically describe?',
            options: [
                { text: 'Our ambitions and why the market is large enough', scores: { logic: 3 } },
                { text: 'More team, more budget, more marketing', scores: { logic: 2 } },
                { text: 'How we won the first 10 \u2014 and what specifically changes at 10\u2192100', scores: { logic: 10 } },
                { text: "Honestly: we're still working that out", scores: { logic: 5 } }
            ]
        },
        {
            id: 13, section: 'Section 3 of 3', factor: 'About You',
            text: 'How did you hear about this assessment?',
            options: [
                { text: 'LinkedIn / Social media', scores: {} },
                { text: 'Referral from another founder', scores: {} },
                { text: 'Web search', scores: {} },
                { text: 'Event / Podcast', scores: {} },
                { text: 'Other:', scores: {}, otherInput: true }
            ]
        },
        {
            id: 14, section: 'Section 3 of 3', factor: 'Your Goals',
            text: 'What would make this assessment most valuable for you?',
            options: [
                { text: 'Clarity on my specific blind spot', scores: {} },
                { text: 'Concrete next steps to improve', scores: {} },
                { text: "Validation that I'm on the right track", scores: {} },
                { text: 'Understanding what investors actually evaluate', scores: {} }
            ]
        },
        {
            id: 15, section: 'Section 3 of 3', factor: 'Readiness',
            text: "If this assessment reveals a gap, I'm:",
            options: [
                { text: 'Ready to work on it immediately', scores: {} },
                { text: 'Open to learning more before committing', scores: {} },
                { text: 'Curious but already overloaded', scores: {} },
                { text: 'Just exploring, not ready for change yet', scores: {} }
            ]
        }
    ];

    // ─── Statement slides (interstitials) ───
    var STATEMENTS = {
        afterQ2: 'The next questions reveal the 5 factors investors evaluate unconsciously. Answer intuitively \u2014 there are no wrong responses.',
        afterQ12: 'Almost there. These final questions help us personalize your results.'
    };

    // ─── Founder Types ───
    var TYPES = {
        'logical-visionary': {
            name: 'The Logical Visionary', label: 'a Logical Visionary',
            tagline: 'Clarity is your strength. Presence is your lever.',
            desc: 'You lead with clarity, structure, and a thoroughly reasoned model. People sense that you can cut through complexity and build a solid rational story.\n\nWhat often gets lost: emotional resonance. How much people can feel your energy \u2014 not just follow your arguments. Vision and logic are there. But their embodiment is sometimes missing.\n\nInvestors see the potential. They just don\'t fully feel you yet. Your biggest lever is bringing body, emotion, and presence into alignment with your clarity.\n\nWhen that happens, your vision won\'t just be understood \u2014 it will be felt.',
            lever: 'Presence & Congruent Energy',
            leverScore: '3/10', leverGoal: '7/10',
            nextStep: 'Deepen your resonance \u2014 and discover how to move from clarity to congruence.',
            course: ['Days 1\u20132: Presence Foundations (body-energy alignment)', 'Days 3\u20134: From Logic to Felt Significance \u2014 embodying your vision', 'Days 5\u20136: Micro-Shifts for Congruent Energy', 'Day 7: From Clarity to Congruence \u2014 when logic and energy meet'],
            outcomes: ['You know which micro-shifts actually change your presence', 'You have concrete exercises for presence development', 'You can request a Diagnostic Call (optional)'],
            micro: 'Most Logical Visionaries start with the email course. It gives you time to develop your presence before we talk.',
            refScores: { obsession: 7, presence: 3, vision: 8, fit: 6, logic: 9 },
            recommend: '7-day-course'
        },
        'quiet-powerhouse': {
            name: 'The Quiet Powerhouse', label: 'a Quiet Powerhouse',
            tagline: 'Your strength is there. Your vision needs visibility.',
            desc: 'You carry a deep, quiet strength that often only becomes visible when people get to know you. You\'re present, grounded, and steady \u2014 a quality investors rarely encounter and highly value.\n\nAt the same time, your vision sometimes stays too quiet. Too taken for granted. You know where you\'re going. But others can\'t immediately see the path.\n\nYour inner strength is there \u2014 now it needs a clearer external form: a sharper narrative, a stronger image of the future, a visible connection between your personal story and your mission.\n\nWhen your depth becomes visible, trust grows with it.',
            lever: 'Vision Resonance',
            leverScore: '4/10', leverGoal: '8/10',
            nextStep: 'Learn how to make your strength more visible \u2014 and your vision more tangible.',
            course: ['Days 1\u20132: Vision Resonance Foundations (developing felt significance)', 'Days 3\u20134: Making your depth visible \u2014 narrative clarity', 'Days 5\u20136: From "obvious" to "inevitable"', 'Day 7: When your depth becomes visible \u2014 from quiet to compelling'],
            outcomes: ['Your vision is clear, vivid, and emotionally tangible', 'You know how to communicate your quiet strength outwardly', 'You can request a Diagnostic Call (optional)'],
            micro: 'Most Quiet Powerhouses start with the email course. It helps you shape your vision before we talk.',
            refScores: { obsession: 8, presence: 7, vision: 4, fit: 7, logic: 7 },
            recommend: '7-day-course'
        },
        'story-driven': {
            name: 'The Story-Driven Founder', label: 'a Story-Driven Founder',
            tagline: 'You build connection. Now your story needs backbone.',
            desc: 'You have natural resonance: people enjoy listening to you, you build connection, and possess a narrative energy that immediately creates closeness. This is tremendous capital.\n\nAt the same time, your story often loses structure when things get concrete: How do you acquire customers \u2014 repeatably, scalably? What changes operationally from 10 to 100 customers? Investors hear your enthusiasm, but they\'re also looking for the pattern behind it: the mechanic that turns a great story into a scalable company.\n\nYour strength lies in feeling \u2014 your leverage lies in operational clarity. When warmth and growth logic come together, a presence emerges that both touches and convinces.',
            lever: 'Scalable Logic',
            leverScore: '4/10', leverGoal: '8/10',
            nextStep: 'Learn how to connect your emotional resonance with a clear growth mechanic.',
            course: ['Days 1\u20132: Root Cause Pain (what\'s the real problem \u2014 underneath the surface?)', 'Days 3\u20134: Scale Path Clarity (from 10 to 100: what specifically changes?)', 'Days 5\u20136: Defensibility & Scalable Model (the pattern behind your story)', 'Day 7: Story with backbone \u2014 when warmth and mechanic meet'],
            outcomes: ['Your story has a clear, operational foundation', 'You can explain how your growth works \u2014 repeatably', 'You can request a Diagnostic Call (optional)'],
            micro: 'Most Story-Driven Founders start with the email course. It gives your resonance the foundation it deserves.',
            refScores: { obsession: 8, presence: 7, vision: 8, fit: 8, logic: 4 },
            recommend: '7-day-course'
        },
        'integrated-builder': {
            name: 'The Integrated Builder', label: 'an Integrated Builder',
            tagline: "You're almost there. Now it's about the last 10%.",
            desc: 'You already bring many things into natural coherence: presence, clarity, vision, and personal story are visibly connected. That\'s rare \u2014 and a strong foundation.\n\nYour next development stage isn\'t about fixing big gaps. It\'s about precision: where does timing lack sharpness? Where could your solution be explained more clearly? Where can your vision become more vivid?\n\nYou\'re close to a fully congruent presence. Now it\'s about consciously reinforcing that coherence \u2014 so investors experience you not just as "solid," but as "inevitable."',
            lever: 'Optimization & Precision (all factors)',
            leverScore: '7\u20138/10', leverGoal: '9/10+',
            nextStep: 'Polish the last 10% that turn your coherence into genuine magnetism.',
            course: ['Days 1\u20132: Precision in Timing (why exactly now \u2014 not earlier, not later?)', 'Days 3\u20134: Vision Vividness (from clear to visceral)', 'Days 5\u20136: Final 10% Optimization (all factors)', 'Day 7: From "solid" to "inevitable" \u2014 the last layer'],
            outcomes: ['You know the last micro-shifts for genuine precision', 'You know how to move from 7/10 to 9/10', 'You can request a Diagnostic Call (optional)'],
            micro: 'Most Integrated Builders start with the email course. It shows you exactly where your final levers are.',
            refScores: { obsession: 7, presence: 7, vision: 8, fit: 8, logic: 7 },
            recommend: 'diagnostic-call'
        },
        'almost-there': {
            name: 'The Almost-There Founder', label: 'an Almost-There Founder',
            tagline: 'Everything is there. Now it needs coherence.',
            desc: 'You\'ve already hinted at many elements: vision, energy, logic, fit \u2014 everything is there, but not yet fully developed. It feels like you\'re on the verge of a breakthrough where the different parts of your foundership come into alignment.\n\nYour development lies in integration: what is your deeper obsession? How do you tell your personal story so it lands? What\'s the root cause pain, and why is the timing exactly right now?\n\nWhen these building blocks connect, a clear, resonant presence emerges \u2014 one that makes investors intuitively trust.\n\nYou\'re close. Now it\'s about coherence.',
            lever: 'Focus & Narrative Coherence',
            leverScore: '5\u20136/10 (all factors)', leverGoal: '8/10',
            nextStep: 'Bring your different strengths into one coherent, tangible picture.',
            course: ['Days 1\u20132: Origin Story Clarity (your personal connection)', 'Days 3\u20134: Sustainable Obsession (what\'s really driving you?)', 'Days 5\u20136: Narrative Coherence (connecting all the parts)', 'Day 7: The breakthrough \u2014 when everything comes together'],
            outcomes: ['You have a coherent, complete picture of your foundership', 'All elements come together into one clear, felt story', 'You can request a Diagnostic Call (optional)'],
            micro: 'Most Almost-There Founders start with the email course. It helps you build coherence before we talk.',
            refScores: { obsession: 6, presence: 5, vision: 6, fit: 5, logic: 6 },
            recommend: '7-day-course'
        },
        'overloaded-operator': {
            name: 'The Overloaded Operator', label: 'an Overloaded Operator',
            tagline: 'You carry a lot. Less load creates more impact.',
            desc: 'You carry a lot \u2014 perhaps too much. You\'re competent, responsible, and detail-oriented, but precisely these strengths can overload you.\n\nYour energy sometimes appears scattered or depleted. Investors sense you\'re holding too much at once. The operational pressure obscures your vision, your natural presence, and the depth of your inner drive.\n\nNone of this is a deficit \u2014 it\'s a sign of how much everything matters to you. But your resonance only emerges when you regain space: for clarity, for focus, for the signal underneath the noise.\n\nLess load. More essence. And with it, more trust.',
            lever: 'Relief & Internal Prioritization',
            leverScore: 'Presence: 2/10, Obsession: toxic', leverGoal: 'create space',
            nextStep: 'Discover how to create space \u2014 so you can lead clearly and resonate again.',
            course: ['Days 1\u20132: From toxic to sustainable obsession', 'Days 3\u20134: Relief & delegation (creating space)', 'Days 5\u20136: Presence under pressure (nervous system regulation)', 'Day 7: Less load. More essence. More impact.'],
            outcomes: ['You know how to reduce operational load \u2014 without losing productivity', 'You have strategies for sustainable obsession', 'You can request a Diagnostic Call (optional)'],
            micro: 'Most Overloaded Operators start with the email course. One impulse per day \u2014 that creates space, not more tasks.',
            refScores: { obsession: 9, presence: 2, vision: 5, fit: 6, logic: 8 },
            recommend: 'diagnostic-call'
        },
        'disconnected-genius': {
            name: 'The Disconnected Genius', label: 'a Disconnected Genius',
            tagline: 'Your brilliance is there. Now it needs grounding.',
            desc: 'You see things before others do. Your thoughts are fast, deep, and often directional. But sometimes you outpace your own nervous system \u2014 and your listeners along with it.\n\nWhat is obvious to you appears abstract or hard to grasp for others. Beyond that: the operational mechanic \u2014 how growth actually works, what steps lead from 10 to 100 customers \u2014 often remains vague in conversation.\n\nYour brilliance is perceptible but not tangible and not concrete. This creates distance, even though you want connection.\n\nYour greatest leverage lies in reducing tempo, grounding energy, and translating your vision into clear, operational steps that others can immediately follow.\n\nWhen genius, presence, and growth logic come together, an extraordinary radiance emerges.',
            lever: 'Grounding & Translatability',
            leverScore: 'Presence: 3/10, Fit: 3/10, Logic: 3/10', leverGoal: '7/10+',
            nextStep: 'Learn how to make your brilliance tangible, accessible, and operationally concrete.',
            course: ['Days 1\u20132: Grounding & slowing down (nervous system)', 'Days 3\u20134: Translatability \u2014 from abstract to concrete and tangible', 'Days 5\u20136: Scalable Communication (making your growth logic accessible to others)', 'Day 7: When genius lands \u2014 brilliance that actually reaches people'],
            outcomes: ['You know how to slow down without losing your depth', 'You can translate your brilliance \u2014 and your growth logic', 'You can request a Diagnostic Call (optional)'],
            micro: 'Most Disconnected Geniuses start with the email course. It helps you communicate your brilliance so others think with you \u2014 not after you.',
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

        // Populate the fixed option cards
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

        // From Q3 → back to statement (afterQ2), which goes back to Q2
        // From Q13 → back to statement (afterQ12), which goes back to Q12
        // For all other questions → just go to previous question
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
            '<p style="font-family:var(--lc-serif,Playfair Display,serif);opacity:0.6;font-style:italic;font-size:1.3rem;">Creating your profile</p>' +
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

        // Section label in results = "Your Founder Resonance Type:"
        var resultsLabel = qa('section-label', resultsProfile);
        if (resultsLabel) resultsLabel.textContent = 'Your Founder Resonance Type:';

        // ── Profile description ──
        // Find the paragraph.paragraph-lg after the "Your Profile" eyebrow
        if (resultsProfile) {
            var eyebrows = resultsProfile.querySelectorAll('.eyebrow');
            eyebrows.forEach(function (eyebrow) {
                if (eyebrow.textContent.trim() === 'Your Profile') {
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
        if (leverScoreEl) leverScoreEl.textContent = type.leverScore + ' \u2192 Goal: ' + type.leverGoal;
        var leverNextEl = qa('lever-next');
        if (leverNextEl) leverNextEl.innerHTML = '<em>' + type.nextStep + '</em>';

        // ── Factor bars ──
        // Map factor keys to their display labels
        var factorMap = {
            'Obsession': 'obsession',
            'Presence': 'presence',
            'Presence & Congruent Energy': 'presence',
            'Vision': 'vision',
            'Vision Resonance': 'vision',
            'Founder Fit': 'fit',
            'Scalable Logic': 'logic'
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
        var labels = ['Obsession', 'Presence', 'Vision', 'Founder Fit', 'Scalable Logic'];

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
            langField.value = 'EN';
            langField.className = 'lc-quiz-data';
            form.appendChild(langField);

            console.log('[LC Quiz] Quiz data injected into form:', form.id || form.name || '(unnamed)');
        });

        // Also wire submit handlers to send webhook (skip forms with their own handler)
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

    console.log('[LC Quiz] Initialized. ' + QUESTIONS.length + ' questions loaded.');

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
