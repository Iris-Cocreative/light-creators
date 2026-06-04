/**
 * Light Creators — Radial Burst Chart
 *
 * Spider chart with score-responsive radiating rays.
 * Geometry exported from Grasshopper SVG. Rays from shared start points
 * are vector-summed so each domain's contribution scales independently.
 *
 * USAGE:
 *   <div data-radial-chart style="width:600px; aspect-ratio:1;"><canvas></canvas></div>
 *   <script src="radial-chart.js"></script>
 *
 *   Then call: window.drawRadialChart({ obsession:7, presence:5, vision:8, fit:4, logic:6 });
 *
 * Or set scores via data attributes:
 *   <div data-radial-chart data-obsession="7" data-presence="5" ...>
 *
 * The chart auto-inits on any element with [data-radial-chart].
 */
(function () {
    'use strict';

    // ── SVG geometry from Grasshopper export ──
    var SVG_W = 690.52, SVG_H = 671.54;
    var SVG_CX = 345.9, SVG_CY = 372.34;
    var CIRCLE_R = 145.21;

    var PENTAGON = [
        [345.9, 227.12],   // top (Obsession)
        [484.01, 327.46],  // upper-right (Presence)
        [431.26, 489.82],  // lower-right (Vision)
        [260.55, 489.82],  // lower-left (Founder Fit)
        [207.8, 327.46],   // upper-left (Scalable Logic)
    ];

    var DIMENSIONS = [
        { name: 'Obsession', key: 'obsession' },
        { name: 'Presence & Congruent Energy', key: 'presence' },
        { name: 'Vision Resonance', key: 'vision' },
        { name: 'Founder Fit', key: 'fit' },
        { name: 'Scalable Logic', key: 'logic' },
    ];

    // ── Raw lines per domain [x1, y1, x2, y2] at full extension ──
    var RAW = {
        obsession: [
            [345.9,227.12,345.9,2.45],[358.05,227.63,372.69,53.35],[370.12,229.16,399.03,58.25],
            [382.02,231.68,408.89,127.03],[393.66,235.2,423.7,148.94],[404.97,239.68,433.88,174.74],
            [415.86,245.08,461.52,162.04],[426.26,251.38,458.28,203.2],[436.1,258.53,480.87,202.05],
            [445.31,266.48,488.37,220.63],[453.82,275.17,498.53,234.91],[461.57,284.54,501.13,254.51],
            [468.51,294.53,497.05,276.42],[474.59,305.06,495.57,294.09],[479.77,316.06,491.5,311.13],
            [333.75,227.63,317.78,37.43],[321.69,229.16,299.2,96.19],[309.79,231.68,277.67,106.58],
            [298.15,235.2,266.71,144.91],[286.84,239.68,261.13,181.92],[275.95,245.08,256.67,210.02],
            [265.54,251.38,236.39,207.51],[255.7,258.53,236.02,233.69],[246.5,266.48,225.83,244.48],
            [237.99,275.17,213.98,253.56],[230.23,284.54,204.39,264.92],[223.29,294.53,201.26,280.54],
            [217.21,305.06,195.22,293.56],[212.03,316.06,200,311.01],
        ],
        presence: [
            [484.01,327.46,688.07,261.16],[487.28,339.18,663.07,297.94],[489.56,351.12,634.82,329.67],
            [490.83,363.22,613.3,355.51],[491.09,375.38,580.22,377.25],[490.32,387.52,557.48,394.57],
            [488.55,399.55,546.34,410.57],[485.77,411.39,537.74,425.9],[482.01,422.95,538.19,443.85],
            [477.3,434.17,517.67,453.16],[471.66,444.94,513.22,468.94],[465.15,455.21,499.61,479.16],
            [457.79,464.9,487.22,489.25],[449.65,473.94,464,487.99],[440.79,482.26,448.15,490.79],
            [479.77,316.06,643.93,247.06],[474.59,305.06,610.96,233.77],[468.51,294.53,582.67,222.08],
            [461.57,284.54,570.37,201.96],[453.82,275.17,543.25,194.65],[445.31,266.48,509.9,197.7],
            [436.1,258.53,487.27,193.98],[426.26,251.38,454.27,209.23],[415.86,245.08,446.3,189.72],
            [404.97,239.68,419.42,207.21],[393.66,235.2,404.58,203.83],[382.02,231.68,388.73,205.52],
            [370.12,229.16,374.57,202.86],[358.05,227.63,359.1,215.18],
        ],
        vision: [
            [431.26,489.82,548.08,650.6],[440.79,482.26,543.84,601.64],[449.65,473.94,542.9,565.25],
            [457.79,464.9,575.51,562.28],[270.68,496.55,264.97,505.98],[281.34,502.41,270.85,523.53],
            [292.45,507.35,281.81,534.22],[303.93,511.35,293.45,546.07],[315.71,514.38,307.04,555.18],
            [327.7,516.41,321.85,562.71],[339.82,517.42,336.89,587.35],[351.98,517.42,353.9,563.17],
            [364.1,516.41,370.82,569.61],[376.09,514.38,389.81,578.88],[387.87,511.35,412.42,592.65],
            [399.36,507.35,440.49,611.24],[410.47,502.41,479.28,641.03],[421.13,496.55,508.25,640.4],
            [487.28,339.18,499.84,336.23],[489.56,351.12,511.91,347.82],[490.83,363.22,521.45,361.29],
            [491.09,375.38,523.5,376.06],[490.32,387.52,523.9,391.05],[488.55,399.55,527.07,406.9],
            [485.77,411.39,531.25,424.09],[482.01,422.95,546.22,446.83],[477.3,434.17,537.85,462.66],
            [471.66,444.94,554.77,492.93],[465.15,455.21,559.91,521.08],
        ],
        fit: [
            [260.55,489.82,130.3,669.09],[251.02,482.26,135.82,615.72],[242.15,473.94,159.75,554.63],
            [234.01,464.9,169.24,518.48],[226.66,455.21,149.37,508.93],[220.14,444.94,156.74,481.55],
            [214.51,434.17,150.8,464.14],[209.8,422.95,127.43,453.59],[206.04,411.39,131.27,432.26],
            [203.26,399.55,134.25,412.71],[201.48,387.52,138.93,394.09],[200.72,375.38,149.15,376.46],
            [200.97,363.22,161.98,360.77],[202.25,351.12,176.12,347.27],[204.52,339.18,191.04,336.01],
            [270.68,496.55,190.74,628.54],[281.34,502.41,213.18,639.7],[292.45,507.35,249.9,614.82],
            [303.93,511.35,275.11,606.82],[315.71,514.38,298.36,595.99],[327.7,516.41,318.93,585.86],
            [339.82,517.42,336.47,597.34],[351.98,517.42,353.66,557.45],[364.1,516.41,368.58,551.87],
            [376.09,514.38,382.95,546.63],[387.87,511.35,396.8,540.91],[399.36,507.35,409.64,533.33],
            [410.47,502.41,421.06,523.73],[421.13,496.55,427.35,506.82],
        ],
        logic: [
            [207.8,327.46,2.45,260.74],[204.52,339.18,15.68,294.88],[202.25,351.12,32.42,326.05],
            [200.97,363.22,44.99,353.4],[200.72,375.38,58.91,378.35],[201.48,387.52,76.38,400.66],
            [203.26,399.55,99.75,419.29],[206.04,411.39,120.59,435.25],[209.8,422.95,137.72,449.76],
            [214.51,434.17,172.04,454.15],[220.14,444.94,188.44,463.25],[226.66,455.21,198.55,474.75],
            [234.01,464.9,217.82,478.3],[242.15,473.94,229.47,486.35],[251.02,482.26,242.79,491.8],
            [212.03,316.06,43.61,245.26],[217.21,305.06,74.26,230.33],[223.29,294.53,135.16,238.6],
            [230.23,284.54,159.15,230.58],[237.99,275.17,189.98,231.95],[246.5,266.48,215.5,233.47],
            [255.7,258.53,233.2,230.15],[265.54,251.38,240.04,212.99],[275.95,245.08,263.09,221.71],
            [286.84,239.68,273.98,210.8],[298.15,235.2,286.71,202.37],[309.79,231.68,301.76,200.41],
            [321.69,229.16,318.23,208.7],[333.75,227.63,332.61,214.05],
        ],
    };

    // ── Precompute line vectors ──
    var LINES = {};
    DIMENSIONS.forEach(function (dim) {
        LINES[dim.key] = RAW[dim.key].map(function (l) {
            return { sx: l[0], sy: l[1], vx: l[2] - l[0], vy: l[3] - l[1] };
        });
    });

    // ── Merge lines sharing start points (vector addition) ──
    function buildMergedLines(scores) {
        var groups = {};
        DIMENSIONS.forEach(function (dim) {
            var scale = scores[dim.key] / 10;
            LINES[dim.key].forEach(function (line) {
                var key = Math.round(line.sx * 2) / 2 + ',' + Math.round(line.sy * 2) / 2;
                if (!groups[key]) {
                    groups[key] = { sx: line.sx, sy: line.sy, vx: 0, vy: 0 };
                }
                groups[key].vx += line.vx * scale;
                groups[key].vy += line.vy * scale;
            });
        });
        var result = [];
        for (var k in groups) result.push(groups[k]);
        return result;
    }

    // ── Animation easing ──
    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    // ── Main chart renderer ──
    function createChart(container, scores) {
        var canvas = container.querySelector('canvas');
        if (!canvas) {
            canvas = document.createElement('canvas');
            container.appendChild(canvas);
        }
        canvas.style.display = 'block';
        canvas.style.width = '100%';
        canvas.style.height = '100%';

        var ctx = canvas.getContext('2d');
        // Resolve CSS variable for label font, falling back to Hanken Grotesk
        var sansFont = "'Hanken Grotesk', sans-serif";
        try {
            var resolved = getComputedStyle(document.documentElement).getPropertyValue('--_typography---fonts--secondary-font').trim();
            if (resolved) sansFont = resolved;
        } catch (e) {}
        var canvasSize, dpr, drawScale, offsetX, offsetY;
        var animStartTime = null;
        var animId = null;
        var ANIM_DURATION = 1400;

        function resize() {
            var rect = container.getBoundingClientRect();
            dpr = window.devicePixelRatio || 1;
            canvasSize = Math.min(rect.width, rect.height);
            canvas.width = canvasSize * dpr;
            canvas.height = canvasSize * dpr;
            canvas.style.width = canvasSize + 'px';
            canvas.style.height = canvasSize + 'px';
            var padding = 0.05;
            drawScale = (canvasSize * dpr * (1 - padding * 2)) / Math.max(SVG_W, SVG_H);
            offsetX = (canvasSize * dpr - SVG_W * drawScale) / 2;
            offsetY = (canvasSize * dpr - SVG_H * drawScale) / 2;
        }

        function tx(x) { return x * drawScale + offsetX; }
        function ty(y) { return y * drawScale + offsetY; }

        function getLabelPos(i) {
            var vx = PENTAGON[i][0], vy = PENTAGON[i][1];
            var dx = vx - SVG_CX, dy = vy - SVG_CY;
            var dist = Math.sqrt(dx * dx + dy * dy);
            var labelDist = dist + 125;
            return { x: SVG_CX + (dx / dist) * labelDist, y: SVG_CY + (dy / dist) * labelDist };
        }

        function draw(progress) {
            var W = canvas.width, H = canvas.height;
            var ease = easeOutCubic(progress);
            ctx.clearRect(0, 0, W, H);

            var lw = Math.max(1, 1.8 * drawScale);

            // ── Radiating lines (merged) ──
            var merged = buildMergedLines(scores);
            for (var m = 0; m < merged.length; m++) {
                var line = merged[m];
                var len = Math.sqrt(line.vx * line.vx + line.vy * line.vy);
                if (len < 0.5) continue;
                var ex = line.sx + line.vx * ease;
                var ey = line.sy + line.vy * ease;
                var alpha = 0.25 + 0.6 * Math.min(len / 400, 1);
                ctx.beginPath();
                ctx.moveTo(tx(line.sx), ty(line.sy));
                ctx.lineTo(tx(ex), ty(ey));
                ctx.strokeStyle = 'rgba(201, 169, 110, ' + alpha + ')';
                ctx.lineWidth = lw;
                ctx.lineCap = 'round';
                ctx.stroke();
            }

            // ── Circle ──
            ctx.beginPath();
            ctx.arc(tx(SVG_CX), ty(SVG_CY), CIRCLE_R * drawScale, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(180, 200, 210, 0.12)';
            ctx.lineWidth = Math.max(0.5, 1 * drawScale);
            ctx.stroke();

            // ── Pentagon ──
            ctx.beginPath();
            for (var p = 0; p < 5; p++) {
                var px = tx(PENTAGON[p][0]), py = ty(PENTAGON[p][1]);
                if (p === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.strokeStyle = 'rgba(180, 200, 210, 0.18)';
            ctx.lineWidth = Math.max(1, 1.2 * drawScale);
            ctx.stroke();

            // ── Inner rings ──
            var rings = [0.33, 0.66];
            for (var r = 0; r < rings.length; r++) {
                ctx.beginPath();
                for (var i = 0; i < 5; i++) {
                    var rx = SVG_CX + (PENTAGON[i][0] - SVG_CX) * rings[r];
                    var ry = SVG_CY + (PENTAGON[i][1] - SVG_CY) * rings[r];
                    if (i === 0) ctx.moveTo(tx(rx), ty(ry)); else ctx.lineTo(tx(rx), ty(ry));
                }
                ctx.closePath();
                ctx.strokeStyle = 'rgba(180, 200, 210, 0.08)';
                ctx.lineWidth = Math.max(0.5, 0.8 * drawScale);
                ctx.stroke();
            }

            // ── Spokes ──
            for (var s = 0; s < 5; s++) {
                ctx.beginPath();
                ctx.moveTo(tx(SVG_CX), ty(SVG_CY));
                ctx.lineTo(tx(PENTAGON[s][0]), ty(PENTAGON[s][1]));
                ctx.strokeStyle = 'rgba(180, 200, 210, 0.08)';
                ctx.lineWidth = Math.max(0.5, 0.8 * drawScale);
                ctx.stroke();
            }

            // ── Spider shape ──
            ctx.beginPath();
            for (var d = 0; d < 5; d++) {
                var val = scores[DIMENSIONS[d].key] / 10;
                var spx = SVG_CX + (PENTAGON[d][0] - SVG_CX) * val;
                var spy = SVG_CY + (PENTAGON[d][1] - SVG_CY) * val;
                if (d === 0) ctx.moveTo(tx(spx), ty(spy)); else ctx.lineTo(tx(spx), ty(spy));
            }
            ctx.closePath();
            var sg = ctx.createRadialGradient(tx(SVG_CX), ty(SVG_CY), 0, tx(SVG_CX), ty(SVG_CY), CIRCLE_R * drawScale);
            sg.addColorStop(0, 'rgba(30, 140, 120, 0.06)');
            sg.addColorStop(1, 'rgba(30, 140, 120, 0.2)');
            ctx.fillStyle = sg;
            ctx.fill();
            ctx.strokeStyle = 'rgba(100, 210, 180, 0.55)';
            ctx.lineWidth = Math.max(1, 1.6 * drawScale);
            ctx.stroke();

            // ── Score dots ──
            for (var dd = 0; dd < 5; dd++) {
                var dval = scores[DIMENSIONS[dd].key] / 10;
                var dpx = SVG_CX + (PENTAGON[dd][0] - SVG_CX) * dval;
                var dpy = SVG_CY + (PENTAGON[dd][1] - SVG_CY) * dval;
                var dotR = Math.max(3, 4.5 * drawScale);
                ctx.beginPath();
                ctx.arc(tx(dpx), ty(dpy), dotR, 0, Math.PI * 2);
                ctx.fillStyle = '#d4b070';
                ctx.fill();
                ctx.strokeStyle = 'rgba(10, 26, 31, 0.6)';
                ctx.lineWidth = Math.max(1, 1.5 * drawScale);
                ctx.stroke();
            }

            // ── Labels ──
            var fontSize = Math.max(10, 13 * drawScale);
            var scoreFontSize = Math.max(9, 11 * drawScale);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            for (var li = 0; li < 5; li++) {
                var lval = scores[DIMENSIONS[li].key];
                var lp = getLabelPos(li);
                ctx.font = '600 ' + fontSize + 'px ' + sansFont;
                ctx.fillStyle = 'rgba(200, 210, 215, 0.75)';
                var labelName = (window.lcRadialLabels && window.lcRadialLabels[li]) ? window.lcRadialLabels[li] : DIMENSIONS[li].name;
                ctx.fillText(labelName.toUpperCase(), tx(lp.x), ty(lp.y) - scoreFontSize * 0.8);
                ctx.font = '300 ' + scoreFontSize + 'px ' + sansFont;
                ctx.fillStyle = 'rgba(201, 169, 110, 0.8)';
                ctx.fillText(lval.toFixed(1), tx(lp.x), ty(lp.y) + fontSize * 0.7);
            }
        }

        // ── Animate in ──
        function animate(timestamp) {
            if (!animStartTime) animStartTime = timestamp;
            var elapsed = timestamp - animStartTime;
            var progress = Math.min(elapsed / ANIM_DURATION, 1);
            draw(progress);
            if (progress < 1) {
                animId = requestAnimationFrame(animate);
            }
        }

        var ro = new ResizeObserver(function () {
            resize();
            draw(1);
        });
        ro.observe(container);
        resize();
        requestAnimationFrame(animate);

        // Return update function
        return function updateScores(newScores) {
            for (var k in newScores) scores[k] = newScores[k];
            animStartTime = null;
            if (animId) cancelAnimationFrame(animId);
            requestAnimationFrame(animate);
        };
    }

    // ── Auto-init all [data-radial-chart] containers ──
    var containers = document.querySelectorAll('[data-radial-chart]');
    containers.forEach(function (el) {
        var scores = {
            obsession: parseFloat(el.getAttribute('data-obsession')) || 5,
            presence: parseFloat(el.getAttribute('data-presence')) || 5,
            vision: parseFloat(el.getAttribute('data-vision')) || 5,
            fit: parseFloat(el.getAttribute('data-fit')) || 5,
            logic: parseFloat(el.getAttribute('data-logic')) || 5,
        };
        createChart(el, scores);
    });

    // ── Expose for programmatic use ──
    window.drawRadialChart = function (scores, container) {
        container = container || document.querySelector('[data-radial-chart]');
        if (!container) return;
        return createChart(container, scores);
    };

})();
