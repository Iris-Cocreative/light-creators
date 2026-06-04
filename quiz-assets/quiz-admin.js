/**
 * Light Creators — Quiz Admin / Debug Tool
 *
 * Drop this script onto a duplicate of the quiz results page to get
 * a floating admin panel that lets you:
 *   - Toggle between the 7 founder types (chart + bars + text update)
 *   - Drag factor sliders to adjust scores (chart + bars + type re-evaluate)
 *
 * Requires:
 *   - quiz-webflow.js (exposes window.lcQuiz)
 *   - radial-chart.js (exposes window.drawRadialChart)
 *
 * Usage:
 *   <script src=".../quiz-admin.js"></script>
 */
(function () {
    'use strict';

    // Wait for lcQuiz to be available
    function boot() {
        if (!window.lcQuiz) {
            setTimeout(boot, 200);
            return;
        }
        init();
    }

    function init() {
        var lc = window.lcQuiz;
        var TYPES = lc.TYPES;
        var typeKeys = Object.keys(TYPES);
        var factors = ['obsession', 'presence', 'vision', 'fit', 'logic'];
        var factorLabels = {
            obsession: 'Obsession',
            presence: 'Presence',
            vision: 'Vision',
            fit: 'Founder Fit',
            logic: 'Scalable Logic'
        };

        var currentTypeIdx = 0;
        var currentScores = cloneScores(TYPES[typeKeys[0]].refScores);

        // ── Skip quiz flow: show results immediately ──
        skipToResults();

        // ── Build admin panel ──
        var panel = document.createElement('div');
        panel.id = 'lc-admin-panel';
        panel.innerHTML = buildPanelHTML();
        document.body.appendChild(panel);
        injectStyles();

        // ── Elements ──
        var typeSelect = document.getElementById('lca-type-select');
        var typePrev = document.getElementById('lca-type-prev');
        var typeNext = document.getElementById('lca-type-next');
        var sliders = {};
        var sliderValues = {};
        factors.forEach(function (f) {
            sliders[f] = document.getElementById('lca-slider-' + f);
            sliderValues[f] = document.getElementById('lca-val-' + f);
        });
        var autoTypeEl = document.getElementById('lca-auto-type');
        var modeToggle = document.getElementById('lca-mode-toggle');
        var collapseBtn = document.getElementById('lca-collapse');
        var panelBody = document.getElementById('lca-body');

        // ── State ──
        var mode = 'type'; // 'type' = selecting types, 'slider' = free slider mode

        // ── Initialize ──
        populateSelect();
        syncSlidersToScores();
        applyResults();

        // ── Event handlers ──
        typeSelect.addEventListener('change', function () {
            currentTypeIdx = parseInt(typeSelect.value);
            currentScores = cloneScores(TYPES[typeKeys[currentTypeIdx]].refScores);
            syncSlidersToScores();
            applyResults();
        });

        typePrev.addEventListener('click', function () {
            currentTypeIdx = (currentTypeIdx - 1 + typeKeys.length) % typeKeys.length;
            typeSelect.value = currentTypeIdx;
            currentScores = cloneScores(TYPES[typeKeys[currentTypeIdx]].refScores);
            syncSlidersToScores();
            applyResults();
        });

        typeNext.addEventListener('click', function () {
            currentTypeIdx = (currentTypeIdx + 1) % typeKeys.length;
            typeSelect.value = currentTypeIdx;
            currentScores = cloneScores(TYPES[typeKeys[currentTypeIdx]].refScores);
            syncSlidersToScores();
            applyResults();
        });

        factors.forEach(function (f) {
            sliders[f].addEventListener('input', function () {
                currentScores[f] = parseFloat(sliders[f].value);
                sliderValues[f].textContent = currentScores[f].toFixed(1);

                // In slider mode, auto-detect the type
                if (mode === 'slider') {
                    var detected = lc.determineType(currentScores);
                    autoTypeEl.textContent = TYPES[detected].name;
                    currentTypeIdx = typeKeys.indexOf(detected);
                    typeSelect.value = currentTypeIdx;
                }

                applyResults();
            });
        });

        modeToggle.addEventListener('click', function () {
            mode = (mode === 'type') ? 'slider' : 'type';
            modeToggle.textContent = mode === 'type' ? 'Mode: Type Select' : 'Mode: Free Sliders';
            autoTypeEl.style.display = mode === 'slider' ? 'block' : 'none';
            if (mode === 'type') {
                currentScores = cloneScores(TYPES[typeKeys[currentTypeIdx]].refScores);
                syncSlidersToScores();
                applyResults();
            }
        });

        collapseBtn.addEventListener('click', function () {
            var collapsed = panelBody.style.display === 'none';
            panelBody.style.display = collapsed ? 'block' : 'none';
            collapseBtn.textContent = collapsed ? '\u25BC' : '\u25B6';
        });

        // ── Make panel draggable ──
        makeDraggable(panel);

        // ── Helpers ──
        function populateSelect() {
            typeKeys.forEach(function (key, i) {
                var opt = document.createElement('option');
                opt.value = i;
                opt.textContent = TYPES[key].name;
                typeSelect.appendChild(opt);
            });
        }

        function syncSlidersToScores() {
            factors.forEach(function (f) {
                sliders[f].value = currentScores[f];
                sliderValues[f].textContent = currentScores[f].toFixed(1);
            });
        }

        function applyResults() {
            var typeKey = mode === 'type' ? typeKeys[currentTypeIdx] : lc.determineType(currentScores);
            lc.populateResults(currentScores, typeKey);
        }

        function skipToResults() {
            // Hide quiz slides, show results
            var slides = document.querySelectorAll('[data-quiz="intro-slide"], [data-quiz="statement-slide"], [data-quiz="question-slide"]');
            slides.forEach(function (s) { s.style.display = 'none'; });

            var resultsProfile = document.querySelector('section.results-profiles');
            var resultsEmailCta = document.querySelector('section.results-email-cta');
            if (resultsProfile) { resultsProfile.style.display = 'block'; resultsProfile.style.opacity = '1'; }
            if (resultsEmailCta) { resultsEmailCta.style.display = 'flex'; resultsEmailCta.style.opacity = '1'; }

            // Hide progress bar
            var progressTrack = document.querySelector('.lc-progress-track');
            if (progressTrack) progressTrack.style.display = 'none';

            // Hide quiz logo
            var quizLogo = document.getElementById('quiz-logo');
            if (quizLogo) quizLogo.style.opacity = '0';
        }

        function buildPanelHTML() {
            var html = '' +
                '<div id="lca-header">' +
                    '<span id="lca-title">Quiz Admin</span>' +
                    '<div style="display:flex;gap:6px;align-items:center;">' +
                        '<button id="lca-mode-toggle">Mode: Type Select</button>' +
                        '<button id="lca-collapse">\u25BC</button>' +
                    '</div>' +
                '</div>' +
                '<div id="lca-body">' +
                    '<div id="lca-type-row">' +
                        '<button id="lca-type-prev">\u25C0</button>' +
                        '<select id="lca-type-select"></select>' +
                        '<button id="lca-type-next">\u25B6</button>' +
                    '</div>' +
                    '<div id="lca-auto-type" style="display:none;"></div>' +
                    '<div id="lca-sliders">';

            factors.forEach(function (f) {
                html += '' +
                    '<div class="lca-slider-row">' +
                        '<label>' + factorLabels[f] + '</label>' +
                        '<input type="range" id="lca-slider-' + f + '" min="1" max="10" step="0.5" value="5">' +
                        '<span id="lca-val-' + f + '" class="lca-val">5.0</span>' +
                    '</div>';
            });

            html += '</div></div>';
            return html;
        }

        function injectStyles() {
            var s = document.createElement('style');
            s.textContent = '' +
                '#lc-admin-panel {' +
                    'position: fixed;' +
                    'bottom: 20px;' +
                    'right: 20px;' +
                    'width: 320px;' +
                    'background: rgba(4,23,31,0.95);' +
                    'border: 1px solid rgba(224,183,111,0.2);' +
                    'border-radius: 8px;' +
                    'z-index: 99999;' +
                    'font-family: "Hanken Grotesk", sans-serif;' +
                    'color: #FFF8E6;' +
                    'font-size: 12px;' +
                    'box-shadow: 0 8px 32px rgba(0,0,0,0.5);' +
                    'user-select: none;' +
                '}' +
                '#lca-header {' +
                    'display: flex;' +
                    'justify-content: space-between;' +
                    'align-items: center;' +
                    'padding: 10px 14px;' +
                    'border-bottom: 1px solid rgba(224,183,111,0.1);' +
                    'cursor: grab;' +
                '}' +
                '#lca-header:active { cursor: grabbing; }' +
                '#lca-title {' +
                    'font-weight: 600;' +
                    'font-size: 11px;' +
                    'letter-spacing: 0.12em;' +
                    'text-transform: uppercase;' +
                    'color: #E0B76F;' +
                '}' +
                '#lca-body { padding: 12px 14px; }' +
                '#lca-type-row {' +
                    'display: flex;' +
                    'gap: 6px;' +
                    'align-items: center;' +
                    'margin-bottom: 14px;' +
                '}' +
                '#lca-type-select {' +
                    'flex: 1;' +
                    'background: rgba(255,248,230,0.06);' +
                    'border: 1px solid rgba(255,248,230,0.1);' +
                    'border-radius: 4px;' +
                    'color: #FFF8E6;' +
                    'font-family: inherit;' +
                    'font-size: 12px;' +
                    'padding: 6px 8px;' +
                    'cursor: pointer;' +
                '}' +
                '#lca-type-select option { background: #04171F; color: #FFF8E6; }' +
                '#lca-auto-type {' +
                    'text-align: center;' +
                    'font-size: 11px;' +
                    'color: #83A18E;' +
                    'margin-bottom: 10px;' +
                    'font-style: italic;' +
                '}' +
                '#lc-admin-panel button {' +
                    'background: rgba(255,248,230,0.06);' +
                    'border: 1px solid rgba(255,248,230,0.1);' +
                    'border-radius: 4px;' +
                    'color: #FFF8E6;' +
                    'font-family: inherit;' +
                    'font-size: 11px;' +
                    'padding: 4px 8px;' +
                    'cursor: pointer;' +
                    'transition: background 0.15s;' +
                '}' +
                '#lc-admin-panel button:hover {' +
                    'background: rgba(224,183,111,0.15);' +
                '}' +
                '.lca-slider-row {' +
                    'display: flex;' +
                    'align-items: center;' +
                    'gap: 8px;' +
                    'margin-bottom: 6px;' +
                '}' +
                '.lca-slider-row label {' +
                    'width: 90px;' +
                    'font-size: 11px;' +
                    'color: rgba(255,248,230,0.5);' +
                    'flex-shrink: 0;' +
                '}' +
                '.lca-slider-row input[type="range"] {' +
                    'flex: 1;' +
                    '-webkit-appearance: none;' +
                    'appearance: none;' +
                    'height: 4px;' +
                    'background: rgba(255,248,230,0.1);' +
                    'border-radius: 2px;' +
                    'outline: none;' +
                '}' +
                '.lca-slider-row input[type="range"]::-webkit-slider-thumb {' +
                    '-webkit-appearance: none;' +
                    'width: 14px;' +
                    'height: 14px;' +
                    'border-radius: 50%;' +
                    'background: #E0B76F;' +
                    'cursor: pointer;' +
                '}' +
                '.lca-slider-row input[type="range"]::-moz-range-thumb {' +
                    'width: 14px;' +
                    'height: 14px;' +
                    'border-radius: 50%;' +
                    'background: #E0B76F;' +
                    'border: none;' +
                    'cursor: pointer;' +
                '}' +
                '.lca-val {' +
                    'width: 28px;' +
                    'text-align: right;' +
                    'font-size: 12px;' +
                    'font-weight: 600;' +
                    'color: #E0B76F;' +
                '}';
            document.head.appendChild(s);
        }

        function makeDraggable(el) {
            var header = el.querySelector('#lca-header');
            var offsetX = 0, offsetY = 0, dragging = false;

            header.addEventListener('mousedown', function (e) {
                if (e.target.tagName === 'BUTTON') return;
                dragging = true;
                offsetX = e.clientX - el.getBoundingClientRect().left;
                offsetY = e.clientY - el.getBoundingClientRect().top;
                e.preventDefault();
            });

            document.addEventListener('mousemove', function (e) {
                if (!dragging) return;
                el.style.left = (e.clientX - offsetX) + 'px';
                el.style.top = (e.clientY - offsetY) + 'px';
                el.style.right = 'auto';
                el.style.bottom = 'auto';
            });

            document.addEventListener('mouseup', function () {
                dragging = false;
            });
        }
    }

    function cloneScores(s) {
        return { obsession: s.obsession, presence: s.presence, vision: s.vision, fit: s.fit, logic: s.logic };
    }

    boot();
})();
