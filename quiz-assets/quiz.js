/* ═══════════════════════════════════════════════════════
   Light Creators — Founder Resonance Quiz (English)
   Loaded externally onto Webflow page

   Usage: Add to Webflow page head:
   <link rel="stylesheet" href="https://lab.iriscocreative.com/light-creators/quiz-assets/quiz.css">

   Add before </body>:
   <script src="https://lab.iriscocreative.com/light-creators/quiz-assets/quiz.js"></script>
   ═══════════════════════════════════════════════════════ */

(function () {
    'use strict';

    // ─── Configuration ───
    const ASSET_BASE = 'https://lab.iriscocreative.com/light-creators';

    // ─── Questions ───
    const QUESTIONS = [
        {
            id: 1, section: 'Section 1 of 3', factor: 'Situation',
            text: 'Where are you currently in your funding journey?',
            options: [
                { text: 'Pre-seed (building MVP, talking to first angels)', scores: {} },
                { text: 'Seed stage (actively pitching VCs, refining business model)', scores: {} },
                { text: 'Series A prep (scaling, institutional investors)', scores: {} },
                { text: 'Between rounds (pivoting or extending runway)', scores: {} }
            ]
        },
        {
            id: 2, section: 'Section 1 of 3', factor: 'Challenge',
            text: "What's your biggest challenge in investor conversations right now?",
            options: [
                { text: 'Getting meetings, but no follow-up interest', scores: {} },
                { text: "Investors like the idea, but don't commit", scores: {} },
                { text: 'Feedback feels vague or contradictory', scores: {} },
                { text: "I'm not sure what I'm missing", scores: {} }
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
                { text: 'Frustrated — I need momentum to stay motivated', scores: { obsession: 2 } },
                { text: "Concerned — but I'd find a way to continue", scores: { obsession: 6 } },
                { text: 'Unaffected — this work matters regardless of timeline', scores: { obsession: 10 } },
                { text: 'Relieved — more time to refine before scaling', scores: { obsession: 4 } }
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
                { text: 'Energized — like they saw the real me', scores: { presence: 10 } },
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
            text: 'Can you describe your vision in a way that creates a visceral image?',
            options: [
                { text: 'I explain the business model and market size', scores: { vision: 2 } },
                { text: 'I can articulate the future state logically', scores: { vision: 5 } },
                { text: 'I paint a picture people can see and feel', scores: { vision: 10 } },
                { text: "I'm not sure — I focus more on the problem we solve", scores: { vision: 3 } }
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
            text: 'When describing the problem you solve, you focus on:',
            options: [
                { text: 'The symptoms customers experience', scores: { logic: 4 } },
                { text: 'The root cause that creates those symptoms', scores: { logic: 8 } },
                { text: 'Both, with clear connection between them', scores: { logic: 10 } },
                { text: 'Our solution more than the problem itself', scores: { logic: 2 } }
            ]
        },
        {
            id: 13, section: 'Section 3 of 3', factor: 'About You',
            text: 'How did you hear about this assessment?',
            options: [
                { text: 'LinkedIn / Social media', scores: {} },
                { text: 'Referral from another founder', scores: {} },
                { text: 'Web search', scores: {} },
                { text: 'Event / Podcast', scores: {} }
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

    // ─── Founder Types ───
    const TYPES = {
        'logical-visionary': {
            name: 'The Logical Visionary', label: 'a Logical Visionary',
            tagline: 'Clarity is your strength. Presence is your lever.',
            desc: 'You lead with clarity, structure, and a thoroughly reasoned model. People sense that you can cut through complexity and build a solid rational story.\n\nWhat often gets lost: emotional resonance. How much people can feel your energy — not just follow your arguments. Vision and logic are there. But their embodiment is sometimes missing.\n\nInvestors see the potential. They just don\'t fully feel you yet. Your biggest lever is bringing body, emotion, and presence into alignment with your clarity.\n\nWhen that happens, your vision won\'t just be understood — it will be felt.',
            lever: 'Presence & Congruent Energy',
            leverScore: '3/10', leverGoal: '7/10',
            nextStep: 'Deepen your resonance — and discover how to move from clarity to congruence.',
            course: [
                'Days 1–2: Presence Foundations (body-energy alignment)',
                'Days 3–4: From Logic to Felt Significance — embodying your vision',
                'Days 5–6: Micro-Shifts for Congruent Energy',
                'Day 7: From Clarity to Congruence — when logic and energy meet'
            ],
            outcomes: [
                'You know which micro-shifts actually change your presence',
                'You have concrete exercises for presence development',
                'You can request a Diagnostic Call (optional)'
            ],
            micro: 'Most Logical Visionaries start with the email course. It gives you time to develop your presence before we talk.',
            refScores: { obsession: 7, presence: 3, vision: 8, fit: 6, logic: 9 }
        },
        'quiet-powerhouse': {
            name: 'The Quiet Powerhouse', label: 'a Quiet Powerhouse',
            tagline: 'Your strength is there. Your vision needs visibility.',
            desc: 'You carry a deep, quiet strength that often only becomes visible when people get to know you. You\'re present, grounded, and steady — a quality investors rarely encounter and highly value.\n\nAt the same time, your vision sometimes stays too quiet. Too taken for granted. You know where you\'re going. But others can\'t immediately see the path.\n\nYour inner strength is there — now it needs a clearer external form: a sharper narrative, a stronger image of the future, a visible connection between your personal story and your mission.\n\nWhen your depth becomes visible, trust grows with it.',
            lever: 'Vision Resonance',
            leverScore: '4/10', leverGoal: '8/10',
            nextStep: 'Learn how to make your strength more visible — and your vision more tangible.',
            course: [
                'Days 1–2: Vision Resonance Foundations (developing felt significance)',
                'Days 3–4: Making your depth visible — narrative clarity',
                'Days 5–6: From "obvious" to "inevitable"',
                'Day 7: When your depth becomes visible — from quiet to compelling'
            ],
            outcomes: [
                'Your vision is clear, vivid, and emotionally tangible',
                'You know how to communicate your quiet strength outwardly',
                'You can request a Diagnostic Call (optional)'
            ],
            micro: 'Most Quiet Powerhouses start with the email course. It helps you shape your vision before we talk.',
            refScores: { obsession: 8, presence: 7, vision: 4, fit: 7, logic: 7 }
        },
        'story-driven': {
            name: 'The Story-Driven Founder', label: 'a Story-Driven Founder',
            tagline: 'You build connection. Now your story needs backbone.',
            desc: 'You have natural resonance: people enjoy listening to you, you build connection, and you carry a narrative energy that creates closeness fast. That\'s significant capital.\n\nAt the same time, your story loses structure when things get concrete: how do you acquire customers — repeatably, at scale? What changes operationally from 10 to 100? Investors hear your enthusiasm. But they\'re looking for the pattern behind it.\n\nYour strength is in the feeling. Your lever is in the mechanic. When warmth and growth logic come together, you get a presence that both moves people and convinces them.\n\nStory with backbone. That\'s your next move.',
            lever: 'Scalable Logic',
            leverScore: '4/10', leverGoal: '8/10',
            nextStep: 'Learn how to connect your emotional resonance with a clear growth mechanic.',
            course: [
                'Days 1–2: Root Cause Pain (what\'s the real problem — underneath the surface?)',
                'Days 3–4: Scale Path Clarity (from 10 to 100: what specifically changes?)',
                'Days 5–6: Defensibility & Scalable Model (the pattern behind your story)',
                'Day 7: Story with backbone — when warmth and mechanic meet'
            ],
            outcomes: [
                'Your story has a clear, operational foundation',
                'You can explain how your growth works — repeatably',
                'You can request a Diagnostic Call (optional)'
            ],
            micro: 'Most Story-Driven Founders start with the email course. It gives your resonance the foundation it deserves.',
            refScores: { obsession: 8, presence: 7, vision: 8, fit: 8, logic: 4 }
        },
        'integrated-builder': {
            name: 'The Integrated Builder', label: 'an Integrated Builder',
            tagline: "You're almost there. Now it's about the last 10%.",
            desc: 'You already bring many things into natural coherence: presence, clarity, vision, and personal story are visibly connected. That\'s rare — and a strong foundation.\n\nYour next development stage isn\'t about fixing big gaps. It\'s about precision: where does timing lack sharpness? Where could your solution be explained more clearly? Where can your vision become more vivid?\n\nYou\'re close to a fully congruent presence. Now it\'s about consciously reinforcing that coherence — so investors experience you not just as "solid," but as "inevitable."',
            lever: 'Optimization & Precision (all factors)',
            leverScore: '7–8/10', leverGoal: '9/10+',
            nextStep: 'Polish the last 10% that turn your coherence into genuine magnetism.',
            course: [
                'Days 1–2: Precision in Timing (why exactly now — not earlier, not later?)',
                'Days 3–4: Vision Vividness (from clear to visceral)',
                'Days 5–6: Final 10% Optimization (all factors)',
                'Day 7: From "solid" to "inevitable" — the last layer'
            ],
            outcomes: [
                'You know the last micro-shifts for genuine precision',
                'You know how to move from 7/10 to 9/10',
                'You can request a Diagnostic Call (optional)'
            ],
            micro: 'Most Integrated Builders start with the email course. It shows you exactly where your final levers are.',
            refScores: { obsession: 7, presence: 7, vision: 8, fit: 8, logic: 7 }
        },
        'almost-there': {
            name: 'The Almost-There Founder', label: 'an Almost-There Founder',
            tagline: 'Everything is there. Now it needs coherence.',
            desc: 'You\'ve already hinted at many elements: vision, energy, logic, fit — everything is there, but not yet fully developed. It feels like you\'re on the verge of a breakthrough where the different parts of your foundership come into alignment.\n\nYour development lies in integration: what is your deeper obsession? How do you tell your personal story so it lands? What\'s the root cause pain, and why is the timing exactly right now?\n\nWhen these building blocks connect, a clear, resonant presence emerges — one that makes investors intuitively trust.\n\nYou\'re close. Now it\'s about coherence.',
            lever: 'Focus & Narrative Coherence',
            leverScore: '5–6/10 (all factors)', leverGoal: '8/10',
            nextStep: 'Bring your different strengths into one coherent, tangible picture.',
            course: [
                'Days 1–2: Origin Story Clarity (your personal connection)',
                'Days 3–4: Sustainable Obsession (what\'s really driving you?)',
                'Days 5–6: Narrative Coherence (connecting all the parts)',
                'Day 7: The breakthrough — when everything comes together'
            ],
            outcomes: [
                'You have a coherent, complete picture of your foundership',
                'All elements come together into one clear, felt story',
                'You can request a Diagnostic Call (optional)'
            ],
            micro: 'Most Almost-There Founders start with the email course. It helps you build coherence before we talk.',
            refScores: { obsession: 6, presence: 5, vision: 6, fit: 5, logic: 6 }
        },
        'overloaded-operator': {
            name: 'The Overloaded Operator', label: 'an Overloaded Operator',
            tagline: 'You carry a lot. Less load creates more impact.',
            desc: 'You carry a lot — perhaps too much. You\'re competent, responsible, and detail-oriented, but precisely these strengths can overload you.\n\nYour energy sometimes appears scattered or depleted. Investors sense you\'re holding too much at once. The operational pressure obscures your vision, your natural presence, and the depth of your inner drive.\n\nNone of this is a deficit — it\'s a sign of how much everything matters to you. But your resonance only emerges when you regain space: for clarity, for focus, for the signal underneath the noise.\n\nLess load. More essence. And with it, more trust.',
            lever: 'Relief & Internal Prioritization',
            leverScore: 'Presence: 2/10, Obsession: toxic', leverGoal: 'create space',
            nextStep: 'Discover how to create space — so you can lead clearly and resonate again.',
            course: [
                'Days 1–2: From toxic to sustainable obsession',
                'Days 3–4: Relief & delegation (creating space)',
                'Days 5–6: Presence under pressure (nervous system regulation)',
                'Day 7: Less load. More essence. More impact.'
            ],
            outcomes: [
                'You know how to reduce operational load — without losing productivity',
                'You have strategies for sustainable obsession',
                'You can request a Diagnostic Call (optional)'
            ],
            micro: 'Most Overloaded Operators start with the email course. One impulse per day — that creates space, not more tasks.',
            refScores: { obsession: 9, presence: 2, vision: 5, fit: 6, logic: 8 }
        },
        'disconnected-genius': {
            name: 'The Disconnected Genius', label: 'a Disconnected Genius',
            tagline: 'Your brilliance is there. Now it needs grounding.',
            desc: 'You see things before others do. Your thoughts are fast, deep, and often directional. But sometimes you outpace your own nervous system — and your listeners along with it.\n\nWhat\'s obvious to you appears abstract or hard to grasp for others. And the operational mechanic — how growth actually works, what steps lead from 10 to 100 customers — often stays vague in conversation.\n\nYour brilliance is perceptible. But not yet tangible. That creates distance, even though you want connection.\n\nYour biggest lever: slow down, ground your energy — and translate your vision so that your growth logic becomes immediately clear to others, not just to you.\n\nWhen genius, presence, and growth logic come together, an extraordinary radiance emerges.',
            lever: 'Grounding & Translatability',
            leverScore: 'Presence: 3/10, Fit: 3/10, Logic: 3/10', leverGoal: '7/10+',
            nextStep: 'Learn how to communicate your brilliance so others think with you — not after you.',
            course: [
                'Days 1–2: Grounding & slowing down (nervous system)',
                'Days 3–4: Translatability — from abstract to concrete and tangible',
                'Days 5–6: Scalable Communication (making your growth logic accessible to others)',
                'Day 7: When genius lands — brilliance that actually reaches people'
            ],
            outcomes: [
                'You know how to slow down without losing your depth',
                'You can translate your brilliance — and your growth logic',
                'You can request a Diagnostic Call (optional)'
            ],
            micro: 'Most Disconnected Geniuses start with the email course. It helps you communicate your brilliance so others think with you — not after you.',
            refScores: { obsession: 9, presence: 3, vision: 9, fit: 3, logic: 3 }
        }
    };

    // ─── State ───
    let answers = {};
    let currentScreen = 'welcome';
    let resultType = null;
    let animationId = null;

    // ─── Iris Logomark Animation ───
    const IRIS_CX = 383.23, IRIS_CY = 383.23, IRIS_SVG_SIZE = 766.5;
    const IRIS_LINES = [
        {ix:227.18,iy:369.6,ox:46.3,oy:354.79,angle:-3.0545},
        {ix:229.05,iy:356.1,ox:47.17,oy:324.1,angle:-2.9674},
        {ix:231.96,iy:342.77,ox:89.73,oy:305.44,angle:-2.8802},
        {ix:236.06,iy:329.75,ox:92.41,oy:277.58,angle:-2.793},
        {ix:241.31,iy:317.12,ox:125.07,oy:262.96,angle:-2.7057},
        {ix:247.67,iy:304.95,ox:159.92,oy:254.34,angle:-2.6179},
        {ix:254.9,iy:293.61,ox:189.83,oy:248.03,angle:-2.532},
        {ix:263.23,iy:282.68,ox:212.25,oy:239.93,angle:-2.4442},
        {ix:272.52,iy:272.67,ox:214.5,oy:215.33,angle:-2.3569},
        {ix:282.56,iy:263.51,ox:241.13,oy:214.14,angle:-2.27},
        {ix:293.45,iy:255.1,ox:247.51,oy:189.62,angle:-2.182},
        {ix:304.89,iy:247.73,ox:244.04,oy:142.25,angle:-2.095},
        {ix:317.08,iy:241.45,ox:246.85,oy:90.96,angle:-2.0073},
        {ix:329.75,iy:236.23,ox:276.83,oy:91.23,angle:-1.9197},
        {ix:342.66,iy:232.17,ox:291.02,oy:39.44,angle:-1.8332},
        {ix:355.99,iy:229.19,ox:320.76,oy:9.58,angle:-1.7458},
        {ix:369.61,iy:227.51,ox:353.6,oy:44.45,angle:-1.658},
        {ix:383.29,iy:226.78,ox:378.18,oy:27.27,angle:-1.5704},
        {ix:396.86,iy:227.39,ox:401.95,oy:85.48,angle:-1.4836},
        {ix:410.32,iy:229.28,ox:422.43,oy:110.39,angle:-1.3966},
        {ix:423.65,iy:232.17,ox:444.21,oy:128.59,angle:-1.3093},
        {ix:436.7,iy:236.2,ox:480.08,oy:88.48,angle:-1.222},
        {ix:449.32,iy:241.51,ox:493.01,oy:138.57,angle:-1.1344},
        {ix:461.43,iy:247.68,ox:545.26,oy:102.71,angle:-1.0475},
        {ix:473.03,iy:255.03,ox:562.82,oy:127.95,angle:-0.9598},
        {ix:483.84,iy:263.38,ox:608.48,oy:115.71,angle:-0.8724},
        {ix:493.83,iy:272.6,ox:618.32,oy:152.43,angle:-0.7855},
        {ix:503.13,iy:282.66,ox:628.9,oy:174.11,angle:-0.6979},
        {ix:511.32,iy:293.47,ox:665.8,oy:180.23,angle:-0.6112},
        {ix:518.74,iy:305.01,ox:701.54,oy:199.55,angle:-0.5235},
        {ix:525.03,iy:317.05,ox:671.8,oy:250.47,angle:-0.4367},
        {ix:530.19,iy:329.67,ox:703.25,oy:266.75,angle:-0.3495},
        {ix:534.28,iy:342.75,ox:690.36,oy:300.93,angle:-0.2618},
        {ix:537.26,iy:356.07,ox:666.76,oy:333.21,angle:-0.1745},
        {ix:539.11,iy:369.56,ox:645.47,oy:360.22,angle:-0.0875},
        {ix:539.67,iy:383.14,ox:635.2,oy:383.17,angle:-0.0006},
        {ix:539.04,iy:396.91,ox:637.18,oy:405.45,angle:0.0876},
        {ix:537.33,iy:410.31,ox:655.03,oy:431.07,angle:0.174},
        {ix:534.31,iy:423.67,ox:637.16,oy:452.39,angle:0.2615},
        {ix:530.28,iy:436.71,ox:662.13,oy:483.68,angle:0.3488},
        {ix:525.08,iy:449.29,ox:667.67,oy:515.34,angle:0.4358},
        {ix:518.72,iy:461.45,ox:676.69,oy:549.01,angle:0.5236},
        {ix:511.31,iy:472.85,ox:638.27,oy:561.06,angle:0.6105},
        {ix:503.05,iy:483.82,ox:665.87,oy:620.22,angle:0.6984},
        {ix:493.76,iy:493.83,ox:616.8,oy:617.29,angle:0.7857},
        {ix:483.66,iy:503,ox:601.89,oy:643.7,angle:0.873},
        {ix:472.99,iy:511.31,ox:557.78,oy:633.12,angle:0.9595},
        {ix:461.5,iy:518.68,ox:527.39,oy:632.75,angle:1.0468},
        {ix:449.29,iy:524.9,ox:494.41,oy:621.71,angle:1.1345},
        {ix:436.64,iy:530.18,ox:467.85,oy:615.88,angle:1.2222},
        {ix:423.6,iy:534.26,ox:445.45,oy:615.8,angle:1.3096},
        {ix:410.4,iy:537.21,ox:425.2,oy:621.5,angle:1.3961},
        {ix:396.8,iy:538.96,ox:409.69,oy:672.78,angle:1.4839},
        {ix:383.12,iy:539.68,ox:383.1,oy:652.65,angle:1.5715},
        {ix:369.53,iy:539.01,ox:357.68,oy:674.49,angle:1.6585},
        {ix:355.86,iy:537.23,ox:332.48,oy:669.59,angle:1.7467},
        {ix:342.63,iy:534.32,ox:299.99,oy:693.35,angle:1.8333},
        {ix:329.57,iy:530.3,ox:259.92,oy:733.77,angle:1.9206},
        {ix:316.89,iy:524.94,ox:239.5,oy:690.02,angle:2.0086},
        {ix:304.95,iy:518.72,ox:248.74,oy:619.03,angle:2.0947},
        {ix:293.36,iy:511.37,ox:219.64,oy:615.91,angle:2.1824},
        {ix:282.57,iy:503.09,ox:219.12,oy:578.59,angle:2.2693},
        {ix:272.44,iy:493.84,ox:185.84,oy:582.8,angle:2.357},
        {ix:263.26,iy:483.75,ox:187.08,oy:547.63,angle:2.4442},
        {ix:254.89,iy:473.05,ox:162.87,oy:537.38,angle:2.531},
        {ix:247.65,iy:461.39,ox:107.58,oy:540.76,angle:2.6186},
        {ix:241.35,iy:449.35,ox:100.67,oy:514.96,angle:2.7055},
        {ix:236.02,iy:436.79,ox:54.95,oy:500.86,angle:2.7926},
        {ix:231.94,iy:423.76,ox:66.46,oy:468.1,angle:2.8798},
        {ix:228.94,iy:408.24,ox:39.75,oy:447.07,angle:2.9809},
        {ix:227.56,iy:397.02,ox:18.17,oy:418.34,angle:3.0532},
        {ix:227.1,iy:385.77,ox:34.65,oy:385.75,angle:3.1253}
    ];

    function startIrisAnimation(container) {
        if (animationId) { cancelAnimationFrame(animationId); animationId = null; }

        const canvas = container.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        let size = 0, scale = 1;
        const mouse = { x: 0, y: 0, active: false };
        const smoothMouse = { x: 0, y: 0 };
        let startTime = null;

        function resize() {
            const rect = container.getBoundingClientRect();
            size = Math.min(rect.width, rect.height);
            const dpr = window.devicePixelRatio || 1;
            canvas.width = size * dpr;
            canvas.height = size * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            scale = size / IRIS_SVG_SIZE;
        }

        function toScreen(x, y) { return [x * scale, y * scale]; }
        function fromScreen(sx, sy) { return [sx / scale, sy / scale]; }

        function getCanvasPos(clientX, clientY) {
            const rect = canvas.getBoundingClientRect();
            return [clientX - rect.left, clientY - rect.top];
        }

        function onMouseMove(e) {
            const [cx, cy] = getCanvasPos(e.clientX, e.clientY);
            mouse.x = cx; mouse.y = cy; mouse.active = true;
        }
        function onMouseLeave() { mouse.active = false; }
        function onMouseEnter() { mouse.active = true; }
        function onTouchMove(e) {
            e.preventDefault();
            const t = e.touches[0];
            const [cx, cy] = getCanvasPos(t.clientX, t.clientY);
            mouse.x = cx; mouse.y = cy; mouse.active = true;
        }
        function onTouchEnd() { mouse.active = false; }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseleave', onMouseLeave);
        document.addEventListener('mouseenter', onMouseEnter);
        document.addEventListener('touchmove', onTouchMove, { passive: false });
        document.addEventListener('touchend', onTouchEnd);

        const ro = new ResizeObserver(resize);
        ro.observe(container);
        resize();

        function animate(timestamp) {
            if (!startTime) startTime = timestamp;
            const time = (timestamp - startTime) / 1000;

            smoothMouse.x += (mouse.x - smoothMouse.x) * 0.08;
            smoothMouse.y += (mouse.y - smoothMouse.y) * 0.08;

            const [msvgX, msvgY] = fromScreen(smoothMouse.x, smoothMouse.y);
            const mdx = msvgX - IRIS_CX, mdy = msvgY - IRIS_CY;
            const mouseAngle = Math.atan2(mdy, mdx);
            const mouseDist = Math.sqrt(mdx * mdx + mdy * mdy);

            ctx.clearRect(0, 0, size, size);

            const rotPhase = time * Math.PI * 2 / 10;

            IRIS_LINES.forEach(function (line) {
                const dx = line.ox - line.ix, dy = line.oy - line.iy;
                const waveVal = Math.sin(line.angle * 4 - rotPhase);
                let sf = 1 - (0.35 * (1 - waveVal) / 2);

                if (mouse.active) {
                    let ad = line.angle - mouseAngle;
                    while (ad > Math.PI) ad -= Math.PI * 2;
                    while (ad < -Math.PI) ad += Math.PI * 2;
                    const ap = Math.exp(-ad * ad * 3);
                    const df = Math.max(0, 1 - mouseDist / 500);
                    const me = ap * 0.4 * (0.5 + df * 0.5);
                    sf = Math.min(sf + me * (1 - sf) * 1.5, 1.15);
                }

                const nx = line.ix + dx * sf, ny = line.iy + dy * sf;
                const [sx1, sy1] = toScreen(line.ix, line.iy);
                const [sx2, sy2] = toScreen(nx, ny);

                const grad = ctx.createLinearGradient(sx1, sy1, sx2, sy2);
                grad.addColorStop(0, '#ffdb9d');
                grad.addColorStop(1, '#a87d34');

                ctx.beginPath();
                ctx.moveTo(sx1, sy1);
                ctx.lineTo(sx2, sy2);
                ctx.strokeStyle = grad;
                ctx.lineWidth = Math.max(2.5 * scale, 0.75);
                ctx.lineCap = 'round';
                ctx.stroke();
            });

            animationId = requestAnimationFrame(animate);
        }

        animationId = requestAnimationFrame(animate);

        // Return cleanup function
        return function cleanup() {
            if (animationId) { cancelAnimationFrame(animationId); animationId = null; }
            ro.disconnect();
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseleave', onMouseLeave);
            document.removeEventListener('mouseenter', onMouseEnter);
            document.removeEventListener('touchmove', onTouchMove);
            document.removeEventListener('touchend', onTouchEnd);
        };
    }

    let cleanupAnimation = null;

    // ─── Scoring ───
    function getScores() {
        const s = { obsession: [], presence: [], vision: [], fit: [], logic: [] };
        Object.values(answers).forEach(a => {
            if (a && a.scores) {
                Object.entries(a.scores).forEach(([k, v]) => {
                    if (s[k]) s[k].push(v);
                });
            }
        });
        const avg = {};
        Object.entries(s).forEach(([k, v]) => {
            avg[k] = v.length ? Math.round((v.reduce((a, b) => a + b, 0) / v.length) * 10) / 10 : 5;
        });
        return avg;
    }

    function determineType(scores) {
        const { obsession, presence, vision, fit, logic } = scores;
        if (logic >= 7 && presence <= 5 && vision >= 6) return 'logical-visionary';
        if (presence >= 7 && fit >= 6 && vision <= 5) return 'quiet-powerhouse';
        if (presence >= 6 && obsession >= 7 && logic <= 5) return 'story-driven';
        if (obsession >= 6 && presence >= 6 && vision >= 6 && fit >= 6 && logic >= 6) return 'integrated-builder';
        if (obsession >= 8 && presence <= 3) return 'overloaded-operator';
        if (vision >= 8 && obsession >= 8 && presence <= 4 && logic <= 4) return 'disconnected-genius';
        return 'almost-there';
    }

    // ─── Build Overlay ───
    function createOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'lc-quiz-overlay';
        overlay.innerHTML = `
            <div class="lc-bg-rotate"><img src="${ASSET_BASE}/Background-gradient%20large.jpg" alt=""></div>
            <div class="lc-logo-header" id="lcLogo"><a href="#"><img src="https://lab.iriscocreative.com/client-mockups/Logo%20Export.png" alt="Light Creators"></a></div>
            <div class="lc-progress-bar" id="lcProgress">
                <div class="lc-progress-track"><div class="lc-progress-fill" id="lcProgressFill"></div></div>
                <div class="lc-progress-text" id="lcProgressText"></div>
            </div>
            <div id="lcApp"></div>
        `;
        document.body.appendChild(overlay);
    }

    // ─── Render Screens ───
    function renderScreen() {
        const app = document.getElementById('lcApp');
        const logo = document.getElementById('lcLogo');
        const progress = document.getElementById('lcProgress');

        // Clean up animation when leaving welcome screen
        if (currentScreen !== 'welcome' && cleanupAnimation) {
            cleanupAnimation();
            cleanupAnimation = null;
        }

        if (currentScreen === 'welcome') {
            progress.classList.remove('visible');
            logo.classList.remove('visible');
            app.innerHTML = `
                <div class="lc-screen active"><div class="lc-screen-inner lc-welcome-screen">
                    <div class="lc-iris-container" id="lcIrisContainer"><canvas></canvas></div>
                    <div style="position:relative;z-index:2;">
                        <div class="lc-welcome-logo"><img src="https://lab.iriscocreative.com/client-mockups/Logo%20Export.png" alt="Light Creators"></div>
                        <div class="lc-welcome-eyebrow">Founder Resonance Assessment</div>
                        <h1 class="lc-welcome-title">Discover Your <em>Resonance</em> Profile</h1>
                        <p class="lc-welcome-sub">In 3–5 minutes, discover which of the 5 factors stands between you and your funding round.</p>
                        <p class="lc-welcome-note">There are no wrong answers — only clarity.</p>
                        <button class="lc-btn-gold" id="lcStartBtn">START</button>
                    </div>
                </div></div>
            `;
            cleanupAnimation = startIrisAnimation(document.getElementById('lcIrisContainer'));
            document.getElementById('lcStartBtn').addEventListener('click', () => goToQuestion(1));

        } else if (currentScreen === 'transition1') {
            logo.classList.add('visible');
            app.innerHTML = `
                <div class="lc-screen active"><div class="lc-screen-inner lc-transition-screen">
                    <p class="lc-transition-text">The next questions reveal the 5 factors investors evaluate unconsciously.<br><br>Answer intuitively — there are no wrong responses.</p>
                    <button class="lc-btn-gold" id="lcTransBtn1">Continue</button>
                </div></div>
            `;
            document.getElementById('lcTransBtn1').addEventListener('click', () => goToQuestion(3));

        } else if (currentScreen === 'transition2') {
            app.innerHTML = `
                <div class="lc-screen active"><div class="lc-screen-inner lc-transition-screen">
                    <p class="lc-transition-text">Almost there. These final questions help us personalize your results.</p>
                    <button class="lc-btn-gold" id="lcTransBtn2">Continue</button>
                </div></div>
            `;
            document.getElementById('lcTransBtn2').addEventListener('click', () => goToQuestion(13));

        } else if (currentScreen === 'loading') {
            progress.classList.remove('visible');
            app.innerHTML = `
                <div class="lc-screen active"><div class="lc-screen-inner lc-loading-screen">
                    <p class="lc-loading-text">Creating your profile…</p>
                    <div class="lc-loading-dots"><div class="lc-loading-dot"></div><div class="lc-loading-dot"></div><div class="lc-loading-dot"></div></div>
                </div></div>
            `;
            setTimeout(() => showResults(), 2400);

        } else if (typeof currentScreen === 'number') {
            logo.classList.add('visible');
            renderQuestion(currentScreen);
        }
    }

    function renderQuestion(qNum) {
        const q = QUESTIONS[qNum - 1];
        const pct = Math.round((qNum / 15) * 100);
        const progress = document.getElementById('lcProgress');
        progress.classList.add('visible');
        document.getElementById('lcProgressFill').style.width = pct + '%';
        document.getElementById('lcProgressText').textContent = 'Discovery ━━━ ' + pct + '%';

        const selectedIdx = answers[qNum] ? answers[qNum].idx : -1;
        const app = document.getElementById('lcApp');
        app.innerHTML = `
            <div class="lc-screen active"><div class="lc-screen-inner">
                <div class="lc-q-section">${q.section}</div>
                <div class="lc-q-factor">${q.factor}</div>
                <h2 class="lc-q-text">${q.text}</h2>
                <div class="lc-options">
                    ${q.options.map((opt, i) => `
                        <div class="lc-option ${selectedIdx === i ? 'selected' : ''}" data-idx="${i}">
                            <div class="lc-option-marker"></div>
                            <div class="lc-option-text">${opt.text}</div>
                        </div>
                    `).join('')}
                </div>
                <div class="lc-q-nav">
                    <button class="lc-btn-back" id="lcBack">${qNum > 1 ? '\u2190 Back' : ''}</button>
                    <button class="lc-btn-next ${selectedIdx >= 0 ? 'enabled' : ''}" id="lcNext">Continue</button>
                </div>
            </div></div>
        `;

        // Option click handlers
        app.querySelectorAll('.lc-option').forEach(el => {
            el.addEventListener('click', () => {
                const idx = parseInt(el.dataset.idx);
                answers[qNum] = { idx, scores: QUESTIONS[qNum - 1].options[idx].scores };
                app.querySelectorAll('.lc-option').forEach((o, i) => o.classList.toggle('selected', i === idx));
                const btn = document.getElementById('lcNext');
                if (btn) btn.classList.add('enabled');
            });
        });

        // Navigation
        document.getElementById('lcBack').addEventListener('click', () => goBack(qNum));
        document.getElementById('lcNext').addEventListener('click', () => goNext(qNum));
    }

    function goToQuestion(num) {
        currentScreen = num;
        renderScreen();
    }

    function goNext(qNum) {
        if (!answers[qNum]) return;
        if (qNum === 2) currentScreen = 'transition1';
        else if (qNum === 12) currentScreen = 'transition2';
        else if (qNum === 15) currentScreen = 'loading';
        else currentScreen = qNum + 1;
        renderScreen();
    }

    function goBack(qNum) {
        if (qNum === 1) return;
        if (qNum === 3) { currentScreen = 'transition1'; renderScreen(); return; }
        if (qNum === 13) { currentScreen = 'transition2'; renderScreen(); return; }
        currentScreen = qNum - 1;
        renderScreen();
    }

    // ─── Show Results ───
    function showResults() {
        const scores = getScores();
        const typeKey = determineType(scores);
        const type = TYPES[typeKey];
        resultType = typeKey;

        // Close the overlay
        const overlay = document.getElementById('lc-quiz-overlay');
        overlay.classList.add('hidden');

        // Scroll to top
        window.scrollTo(0, 0);

        // Show the results wrapper
        const resultsWrapper = document.querySelector('[data-quiz-results]');
        if (resultsWrapper) {
            resultsWrapper.classList.add('lc-results-visible');
        }

        // Set type as data attribute on body for conditional styling
        document.body.setAttribute('data-founder-type', typeKey);

        // ── Populate dynamic elements ──
        populateText('[data-quiz="type-name"]', type.name);
        populateText('[data-quiz="tagline"]', type.tagline);
        populateText('[data-quiz="type-label"]', 'You are ' + type.label);

        // Profile text (paragraphs)
        const profileEl = document.querySelector('[data-quiz="profile-text"]');
        if (profileEl) {
            profileEl.innerHTML = type.desc.split('\n\n').map(p => '<p>' + p + '</p>').join('');
        }

        // Development lever
        populateText('[data-quiz="lever-name"]', type.lever);
        populateText('[data-quiz="lever-score"]', type.leverScore + ' \u2192 Goal: ' + type.leverGoal);
        populateText('[data-quiz="lever-next"]', type.nextStep);

        // Course items
        const courseEl = document.querySelector('[data-quiz="course-items"]');
        if (courseEl) {
            courseEl.innerHTML = type.course.map(c => '<li class="lc-course-item">' + c + '</li>').join('');
        }

        // Outcomes
        const outcomesEl = document.querySelector('[data-quiz="outcome-items"]');
        if (outcomesEl) {
            outcomesEl.innerHTML = type.outcomes.map(o => '<li class="lc-outcome-item">' + o + '</li>').join('');
        }

        // Course subtitle (personalized)
        populateText('[data-quiz="course-subtitle"]', 'Personalized for your type: ' + type.name);

        // Micro-copy
        populateText('[data-quiz="micro-copy"]', type.micro);

        // Factor bars
        const useScores = type.refScores;
        const factorsEl = document.querySelector('[data-quiz="factors"]');
        if (factorsEl) {
            const factorLabels = {
                obsession: 'Obsession',
                presence: 'Presence',
                vision: 'Vision',
                fit: 'Founder Fit',
                logic: 'Scalable Logic'
            };
            const factors = ['obsession', 'presence', 'vision', 'fit', 'logic'];
            factorsEl.innerHTML = factors.map(f => {
                const v = useScores[f];
                const cls = v >= 7 ? 'high' : v >= 5 ? 'mid' : 'low';
                const warn = v <= 4 ? '<span class="lc-factor-warn">\u26A0</span>' : '';
                return `
                    <div class="lc-factor-item">
                        <div class="lc-factor-name">${factorLabels[f]}</div>
                        <div class="lc-factor-bar-wrap"><div class="lc-factor-bar ${cls}" data-width="${v * 10}"></div></div>
                        <div class="lc-factor-score">${v}/10${warn}</div>
                    </div>
                `;
            }).join('');

            // Animate bars
            requestAnimationFrame(() => {
                setTimeout(() => {
                    factorsEl.querySelectorAll('.lc-factor-bar').forEach(bar => {
                        bar.style.width = bar.dataset.width + '%';
                    });
                }, 200);
            });
        }

        // Radar chart
        const radarContainer = document.querySelector('[data-quiz="radar"]');
        if (radarContainer) {
            let canvas = radarContainer.querySelector('canvas');
            if (!canvas) {
                canvas = document.createElement('canvas');
                canvas.width = 300;
                canvas.height = 300;
                radarContainer.appendChild(canvas);
            }
            drawRadar(canvas, useScores);
        }
    }

    function populateText(selector, text) {
        const el = document.querySelector(selector);
        if (el) el.textContent = text;
    }

    // ─── Radar Chart ───
    function drawRadar(canvas, scores) {
        const ctx = canvas.getContext('2d');
        const cx = 150, cy = 150, r = 115;
        const factors = ['obsession', 'presence', 'vision', 'fit', 'logic'];
        const labels = ['Obsession', 'Presence', 'Vision', 'Founder Fit', 'Scalable Logic'];

        ctx.clearRect(0, 0, 300, 300);

        // Grid rings
        for (let ring = 2; ring <= 10; ring += 2) {
            ctx.beginPath();
            for (let i = 0; i <= 5; i++) {
                const angle = (Math.PI * 2 * i / 5) - Math.PI / 2;
                const x = cx + (r * ring / 10) * Math.cos(angle);
                const y = cy + (r * ring / 10) * Math.sin(angle);
                if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.strokeStyle = 'rgba(255,248,230,0.05)';
            ctx.stroke();
        }

        // Axes
        for (let i = 0; i < 5; i++) {
            const angle = (Math.PI * 2 * i / 5) - Math.PI / 2;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
            ctx.strokeStyle = 'rgba(255,248,230,0.06)';
            ctx.stroke();
        }

        // Data shape
        ctx.beginPath();
        factors.forEach((f, i) => {
            const val = scores[f] / 10;
            const angle = (Math.PI * 2 * i / 5) - Math.PI / 2;
            const x = cx + r * val * Math.cos(angle);
            const y = cy + r * val * Math.sin(angle);
            if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        });
        ctx.closePath();
        ctx.fillStyle = 'rgba(5,64,76,0.3)';
        ctx.fill();
        ctx.strokeStyle = '#E0B76F';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Points + Labels
        factors.forEach((f, i) => {
            const val = scores[f] / 10;
            const angle = (Math.PI * 2 * i / 5) - Math.PI / 2;
            const x = cx + r * val * Math.cos(angle);
            const y = cy + r * val * Math.sin(angle);
            ctx.beginPath();
            ctx.arc(x, y, 3.5, 0, Math.PI * 2);
            ctx.fillStyle = '#E0B76F';
            ctx.fill();

            const lx = cx + (r + 22) * Math.cos(angle);
            const ly = cy + (r + 22) * Math.sin(angle);
            ctx.font = '500 9px Hanken Grotesk';
            ctx.fillStyle = 'rgba(255,248,230,0.4)';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(labels[i], lx, ly);
            ctx.font = '600 10px Hanken Grotesk';
            ctx.fillStyle = '#E0B76F';
            ctx.fillText(scores[f].toFixed(1), lx, ly + 13);
        });
    }

    // ─── Email CTA handler ───
    // Hooks into the Webflow email form on the results page
    function setupEmailCTA() {
        const form = document.querySelector('[data-quiz="email-form"]');
        if (!form) return;

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = form.querySelector('input[type="email"]');
            const nameInput = form.querySelector('input[type="text"]');
            const email = emailInput ? emailInput.value : '';
            const name = nameInput ? nameInput.value : '';

            if (!email) return;

            // Store for potential integration
            const payload = {
                email: email,
                name: name,
                founderType: resultType,
                scores: getScores(),
                timestamp: new Date().toISOString()
            };

            console.log('[LC Quiz] Email submission:', payload);

            // Show success state
            const successEl = form.querySelector('[data-quiz="email-success"]');
            const formFields = form.querySelector('[data-quiz="email-fields"]');
            if (successEl) successEl.style.display = 'block';
            if (formFields) formFields.style.display = 'none';

            // TODO: Connect to email service (e.g., webhook, API)
            // fetch('YOUR_ENDPOINT', { method: 'POST', body: JSON.stringify(payload) });
        });
    }

    // ─── Retake quiz handler ───
    function setupRetakeButton() {
        const btn = document.querySelector('[data-quiz="retake"]');
        if (!btn) return;
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            answers = {};
            currentScreen = 'welcome';
            resultType = null;

            // Hide results
            const resultsWrapper = document.querySelector('[data-quiz-results]');
            if (resultsWrapper) resultsWrapper.classList.remove('lc-results-visible');

            // Show overlay
            const overlay = document.getElementById('lc-quiz-overlay');
            overlay.classList.remove('hidden');

            renderScreen();
            window.scrollTo(0, 0);
        });
    }

    // ─── Init ───
    function init() {
        createOverlay();
        renderScreen();
        setupEmailCTA();
        setupRetakeButton();
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
