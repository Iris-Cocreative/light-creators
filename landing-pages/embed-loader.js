/*
 * Shadow-DOM embed loader for IRIS landing pages.
 * ------------------------------------------------
 * Drops a large, fully self-contained HTML page (its own <style> blocks,
 * global CSS reset, base64 images) into a Webflow page WITHOUT an iframe and
 * WITHOUT pasting the markup into Webflow. The page is fetched at runtime and
 * rendered inside a shadow root, so its CSS is fully isolated from Webflow and
 * Webflow's CSS can't touch it either.
 *
 * Usage — paste only this into a Webflow HTML Embed element:
 *
 *   <div data-iris-embed="https://lab.iriscocreative.com/light-creators/landing-pages/flourishing-life-eltern.html"></div>
 *   <script src="https://lab.iriscocreative.com/light-creators/landing-pages/embed-loader.js"></script>
 *
 * Requirements / notes
 * - Cross-origin fetch needs permissive CORS on the host (this repo sends
 *   `Access-Control-Allow-Origin: *` via netlify.toml / _headers).
 * - The source page's `:root`, `html` and `body` selectors are rewritten to
 *   `:host` so its custom properties and base styles apply inside the shadow
 *   tree (those selectors don't match inside a shadow root). Identifiers such
 *   as `.hero-body` are left untouched.
 * - Brand fonts (HK Grotesk, Cormorant Garamond) must be loaded by the host
 *   Webflow page. Document-level @font-face rules still apply inside shadow DOM.
 * - Place the Embed in a full-width Webflow container for a full-bleed page.
 */
(function () {
  'use strict';

  // Rewrite document-level selectors so the page's styles apply inside a shadow
  // root. Only runs over <style> contents, never over page markup.
  function scopeCss(css) {
    return css
      // `:root` only ever appears as the pseudo-class — safe to swap wholesale.
      .replace(/:root\b/g, ':host')
      // Rewrite `html` / `body` *element* selectors to `:host`, but leave
      // identifiers like `.hero-body` alone. CSS identifiers may contain
      // letters, digits, `_` and `-`, so we guard the char on each side.
      .replace(/(^|[^A-Za-z0-9_-])(?:html|body)(?![A-Za-z0-9_-])/g, '$1:host');
  }

  function render(mount, html) {
    var doc = new DOMParser().parseFromString(html, 'text/html');

    var css = '';
    doc.querySelectorAll('style').forEach(function (styleEl) {
      css += scopeCss(styleEl.textContent) + '\n';
    });

    // Preserve any external stylesheets the source page links to.
    var links = '';
    doc.querySelectorAll('link[rel="stylesheet"]').forEach(function (linkEl) {
      links += linkEl.outerHTML;
    });

    var root = mount.shadowRoot || mount.attachShadow({ mode: 'open' });
    // Inject the page's body children directly into the shadow root (not inside
    // a wrapper) so top-level `<section>`s stay direct children and selectors
    // like `body > section` (-> `:host > section`) keep working.
    root.innerHTML =
      '<style>:host{display:block;}</style>' +
      links +
      '<style>' + css + '</style>' +
      doc.body.innerHTML;
  }

  function load(mount) {
    if (mount.dataset.irisEmbedLoaded) return;
    mount.dataset.irisEmbedLoaded = '1';

    var src = mount.getAttribute('data-iris-embed');
    if (!src) return;

    fetch(src, { credentials: 'omit' })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.text();
      })
      .then(function (html) { render(mount, html); })
      .catch(function (err) {
        console.error('[iris-embed] Failed to load', src, err);
        mount.dataset.irisEmbedLoaded = ''; // allow a retry if re-run
      });
  }

  function init() {
    document.querySelectorAll('[data-iris-embed]').forEach(load);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
