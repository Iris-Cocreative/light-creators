/**
 * Light Creators — Background Gradient Animation
 *
 * Applies a slowly rotating gradient image inside #background.
 * The div should be styled in Webflow as a full-page background container.
 *
 * USAGE:
 *   Webflow: Add a div with ID "background"
 *     - Set position: fixed (or absolute)
 *     - Set width: 100vw, height: 100vh (or 100%)
 *     - Set z-index: -1 (or 0, behind your content)
 *     - Set overflow: hidden
 *
 *   Page Settings → Before </body>:
 *   <script src="https://lab.iriscocreative.com/light-creators/quiz-assets/bg-gradient.js"></script>
 *
 * OPTIONS (via data attributes on #background):
 *   data-bg-image="url"         Custom image URL
 *   data-bg-opacity="0.25"      Opacity (default: 0.25)
 *   data-bg-speed="180"         Rotation cycle in seconds (default: 180)
 *   data-bg-size="160"          Size in vmax units (default: 160)
 */
(function () {
    'use strict';

    var container = document.getElementById('background');
    if (!container) {
        // Auto-create a fixed fullscreen background container
        container = document.createElement('div');
        container.id = 'background';
        container.style.position = 'fixed';
        container.style.inset = '0';
        container.style.width = '100vw';
        container.style.height = '100vh';
        container.style.zIndex = '-1';
        container.style.pointerEvents = 'none';
        document.body.insertBefore(container, document.body.firstChild);
        console.log('[bg-gradient] Auto-created #background div.');
    }

    // Read options
    var imgUrl = container.getAttribute('data-bg-image') ||
        'https://lab.iriscocreative.com/light-creators/Background-gradient%20large.jpg';
    var opacity = container.getAttribute('data-bg-opacity') || '0.25';
    var speed = container.getAttribute('data-bg-speed') || '180';
    var sizePct = container.getAttribute('data-bg-size') || '160';

    // Inject styles
    var styleId = 'lc-bg-gradient-style';
    if (!document.getElementById(styleId)) {
        var style = document.createElement('style');
        style.id = styleId;
        style.textContent =
            '@keyframes lcBgSpin{' +
                'from{transform:translate(-50%,-50%) rotate(0deg)}' +
                'to{transform:translate(-50%,-50%) rotate(360deg)}' +
            '}' +
            '.lc-bg-gradient{' +
                'position:absolute;' +
                'top:50%;left:50%;' +
                'width:' + sizePct + 'vmax;' +
                'height:' + sizePct + 'vmax;' +
                'transform:translate(-50%,-50%) rotate(0deg);' +
                'animation:lcBgSpin ' + speed + 's linear infinite;' +
                'pointer-events:none;' +
                'opacity:' + opacity + ';' +
            '}' +
            '.lc-bg-gradient img{' +
                'width:100%;height:100%;' +
                'object-fit:cover;' +
                'display:block;' +
            '}';
        document.head.appendChild(style);
    }

    // Force fixed positioning so the gradient stays viewport-sized
    // even when page content is long (e.g. results section)
    container.style.position = 'fixed';
    container.style.inset = '0';
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.overflow = 'hidden';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '-1';

    // Create the rotating image
    var el = document.createElement('div');
    el.className = 'lc-bg-gradient';
    var img = document.createElement('img');
    img.src = imgUrl;
    img.alt = '';
    img.setAttribute('loading', 'eager');
    el.appendChild(img);

    // Log for debugging
    img.onload = function () {
        console.log('[bg-gradient] Image loaded, animation running.');
    };
    img.onerror = function () {
        console.error('[bg-gradient] Failed to load image:', imgUrl);
    };

    container.insertBefore(el, container.firstChild);
    console.log('[bg-gradient] Injected into #background.', {
        position: getComputedStyle(container).position,
        opacity: opacity,
        speed: speed + 's'
    });
})();
