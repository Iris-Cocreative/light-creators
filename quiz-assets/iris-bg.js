/**
 * Light Creators — Iris Background Animation
 *
 * Standalone script that renders the animated Iris logomark on a canvas.
 * Drop it on any Webflow page — just add a container with the right attribute.
 *
 * USAGE:
 *   <div data-iris="background" style="width:400px;height:400px;"><canvas></canvas></div>
 *   <script src="https://lab.iriscocreative.com/light-creators/quiz-assets/iris-bg.js"></script>
 *
 * OPTIONS (via data attributes on the container):
 *   data-iris="background"        Required — identifies the container
 *   data-iris-opacity="0.35"      Overall opacity (default: 0.35)
 *   data-iris-speed="10"          Rotation cycle in seconds (default: 10)
 *   data-iris-mouse="true"        Enable mouse interaction (default: true)
 *   data-iris-color-inner="#ffdb9d"  Inner gradient color (default: #ffdb9d)
 *   data-iris-color-outer="#a87d34"  Outer gradient color (default: #a87d34)
 *
 * Multiple instances supported — each container gets its own animation.
 */
(function () {
    'use strict';

    var SVG_SIZE = 766.5;
    var CX = 383.23, CY = 383.23;

    var LINES = [
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

    function initIris(container) {
        var canvas = container.querySelector('canvas');
        if (!canvas) {
            canvas = document.createElement('canvas');
            container.appendChild(canvas);
        }
        canvas.style.display = 'block';
        canvas.style.width = '100%';
        canvas.style.height = '100%';

        var ctx = canvas.getContext('2d');
        var size = 0, scale = 1, startTime = null, animId = null;

        // Read options from data attributes
        var opacity = parseFloat(container.getAttribute('data-iris-opacity')) || 0.35;
        var speed = parseFloat(container.getAttribute('data-iris-speed')) || 10;
        var useMouse = container.getAttribute('data-iris-mouse') !== 'false';
        var colorInner = container.getAttribute('data-iris-color-inner') || '#ffdb9d';
        var colorOuter = container.getAttribute('data-iris-color-outer') || '#a87d34';

        container.style.opacity = opacity;

        // Mouse tracking
        var mouse = { x: 0, y: 0, active: false };
        var smoothMouse = { x: 0, y: 0 };

        if (useMouse) {
            document.addEventListener('mousemove', function (e) {
                var rect = canvas.getBoundingClientRect();
                mouse.x = e.clientX - rect.left;
                mouse.y = e.clientY - rect.top;
                mouse.active = true;
            });
            document.addEventListener('mouseleave', function () { mouse.active = false; });
            document.addEventListener('mouseenter', function () { mouse.active = true; });
            document.addEventListener('touchmove', function (e) {
                var rect = canvas.getBoundingClientRect();
                var t = e.touches[0];
                mouse.x = t.clientX - rect.left;
                mouse.y = t.clientY - rect.top;
                mouse.active = true;
            }, { passive: true });
            document.addEventListener('touchend', function () { mouse.active = false; });
        }

        function resize() {
            var rect = container.getBoundingClientRect();
            size = Math.min(rect.width, rect.height);
            var dpr = window.devicePixelRatio || 1;
            canvas.width = size * dpr;
            canvas.height = size * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            scale = size / SVG_SIZE;
        }

        var ro = new ResizeObserver(resize);
        ro.observe(container);
        resize();

        function animate(timestamp) {
            if (!startTime) startTime = timestamp;
            var time = (timestamp - startTime) / 1000;

            if (useMouse) {
                smoothMouse.x += (mouse.x - smoothMouse.x) * 0.08;
                smoothMouse.y += (mouse.y - smoothMouse.y) * 0.08;
            }

            var msvgX = smoothMouse.x / scale, msvgY = smoothMouse.y / scale;
            var mdx = msvgX - CX, mdy = msvgY - CY;
            var mouseAngle = Math.atan2(mdy, mdx);
            var mouseDist = Math.sqrt(mdx * mdx + mdy * mdy);

            ctx.clearRect(0, 0, size, size);

            var rotPhase = time * Math.PI * 2 / speed;

            LINES.forEach(function (line) {
                var dx = line.ox - line.ix, dy = line.oy - line.iy;
                var waveVal = Math.sin(line.angle * 4 - rotPhase);
                var sf = 1 - (0.35 * (1 - waveVal) / 2);

                if (useMouse && mouse.active) {
                    var ad = line.angle - mouseAngle;
                    while (ad > Math.PI) ad -= Math.PI * 2;
                    while (ad < -Math.PI) ad += Math.PI * 2;
                    var ap = Math.exp(-ad * ad * 3);
                    var df = Math.max(0, 1 - mouseDist / 500);
                    var me = ap * 0.4 * (0.5 + df * 0.5);
                    sf = Math.min(sf + me * (1 - sf) * 1.5, 1.15);
                }

                var nx = line.ix + dx * sf, ny = line.iy + dy * sf;
                var sx1 = line.ix * scale, sy1 = line.iy * scale;
                var sx2 = nx * scale, sy2 = ny * scale;

                var grad = ctx.createLinearGradient(sx1, sy1, sx2, sy2);
                grad.addColorStop(0, colorInner);
                grad.addColorStop(1, colorOuter);

                ctx.beginPath();
                ctx.moveTo(sx1, sy1);
                ctx.lineTo(sx2, sy2);
                ctx.strokeStyle = grad;
                ctx.lineWidth = Math.max(2.5 * scale, 0.75);
                ctx.lineCap = 'round';
                ctx.stroke();
            });

            animId = requestAnimationFrame(animate);
        }

        animId = requestAnimationFrame(animate);

        // Return cleanup for SPA use
        return function () {
            if (animId) cancelAnimationFrame(animId);
            ro.disconnect();
        };
    }

    // ── Auto-init all containers on the page ──
    var containers = document.querySelectorAll('[data-iris="background"]');
    var cleanups = [];
    containers.forEach(function (el) {
        cleanups.push(initIris(el));
    });

    // Expose for manual init (e.g. after dynamic content loads)
    window.initIrisBackground = initIris;

})();
