/*
 * Shadow-DOM embed loader for IRIS landing pages.
 * ------------------------------------------------
 * Drops a large, self-contained HTML page (its own <style> blocks, global CSS
 * reset, images) into a Webflow page WITHOUT an iframe and WITHOUT pasting the
 * markup into Webflow. The page is fetched at runtime and rendered inside a
 * shadow root, so its CSS is fully isolated from Webflow and vice versa.
 *
 * Usage — paste only this into a Webflow HTML Embed element:
 *
 *   <div data-iris-embed="https://lab.iriscocreative.com/light-creators/solo.html"></div>
 *   <script src="https://lab.iriscocreative.com/light-creators/landing-pages/embed-loader.js"></script>
 *
 * Handles
 * - Selector scoping: `:root` / `html` / `body` -> `:host` so the page's
 *   variables and base styles apply inside the shadow tree (identifiers like
 *   `.hero-body` are left untouched).
 * - Relative URLs: `src`, `srcset`, `poster`, `href`, inline `style` url() and
 *   <style> url() are resolved against the *source page* URL, so assets load
 *   from lab.iriscocreative.com instead of the Webflow domain. Absolute,
 *   `data:`, `blob:`, `mailto:`, `#…` values are left alone.
 * - External stylesheets / fonts: <link> (and preconnect/preload) are hoisted
 *   to the document <head> so their @font-face rules register reliably.
 * - In-page anchors (`#section`): handled inside the shadow root (the browser's
 *   default hash scrolling can't reach into shadow DOM).
 *
 * Requirements
 * - Cross-origin fetch needs permissive CORS on the host (this repo sends
 *   `Access-Control-Allow-Origin: *` via netlify.toml / _headers).
 * - The source page must be self-contained HTML+CSS (this loader does not run
 *   the page's <script> tags).
 * - Place the Embed in a full-width Webflow container for a full-bleed page.
 */
(function () {
  'use strict';

  // --- URL helpers ----------------------------------------------------------

  // Resolve a relative URL against the source page; leave absolute/special ones.
  function absolutize(value, base) {
    if (!value) return value;
    // scheme: (http, data, blob, mailto, tel…), protocol-relative //, or #fragment
    if (/^(?:[a-z][a-z0-9+.\-]*:|\/\/|#)/i.test(value)) return value;
    try { return new URL(value, base).href; } catch (e) { return value; }
  }

  function rewriteSrcset(value, base) {
    return value.split(',').map(function (part) {
      var p = part.trim();
      if (!p) return p;
      var bits = p.split(/\s+/);
      bits[0] = absolutize(bits[0], base);
      return bits.join(' ');
    }).join(', ');
  }

  // Rewrite url(...) inside CSS text (style blocks + inline style attributes).
  function rewriteCssUrls(css, base) {
    return css.replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/gi, function (m, q, u) {
      return 'url(' + q + absolutize(u.trim(), base) + q + ')';
    });
  }

  function rewriteElementUrls(doc, base) {
    doc.querySelectorAll('[src]').forEach(function (el) {
      el.setAttribute('src', absolutize(el.getAttribute('src'), base));
    });
    doc.querySelectorAll('[poster]').forEach(function (el) {
      el.setAttribute('poster', absolutize(el.getAttribute('poster'), base));
    });
    doc.querySelectorAll('[srcset]').forEach(function (el) {
      el.setAttribute('srcset', rewriteSrcset(el.getAttribute('srcset'), base));
    });
    doc.querySelectorAll('[href]').forEach(function (el) {
      el.setAttribute('href', absolutize(el.getAttribute('href'), base));
    });
    doc.querySelectorAll('[style]').forEach(function (el) {
      el.setAttribute('style', rewriteCssUrls(el.getAttribute('style'), base));
    });
  }

  // --- Selector scoping -----------------------------------------------------

  function scopeCss(css) {
    return css
      .replace(/:root\b/g, ':host')
      .replace(/(^|[^A-Za-z0-9_-])(?:html|body)(?![A-Za-z0-9_-])/g, '$1:host');
  }

  // --- <head> adoption (fonts / external stylesheets) -----------------------

  function adoptHeadLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var existing = document.head.querySelectorAll('link');
    for (var j = 0; j < existing.length; j++) {
      if (existing[j].getAttribute('href') === href) return; // already present
    }
    var clone = document.createElement('link');
    for (var i = 0; i < link.attributes.length; i++) {
      clone.setAttribute(link.attributes[i].name, link.attributes[i].value);
    }
    document.head.appendChild(clone);
  }

  // --- In-page anchors inside the shadow root -------------------------------

  function enableHashLinks(root) {
    root.addEventListener('click', function (e) {
      var el = e.target;
      var a = el && el.closest ? el.closest('a[href^="#"]') : null;
      if (!a) return;
      e.preventDefault();
      var id = a.getAttribute('href').slice(1);
      if (!id) return; // bare "#"
      var target = root.getElementById(id);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // --- Render ---------------------------------------------------------------

  function render(mount, html, base) {
    var doc = new DOMParser().parseFromString(html, 'text/html');

    // Resolve all relative asset/link URLs against the source page.
    rewriteElementUrls(doc, base);

    // Hoist external stylesheets / fonts to the document head so @font-face
    // rules register reliably (more robust than relying on shadow-scoped fonts).
    doc.querySelectorAll(
      'link[rel="stylesheet"], link[rel="preconnect"], link[rel="preload"]'
    ).forEach(adoptHeadLink);

    // Collect <style> blocks: scope their selectors and absolutize their url()s.
    var css = '';
    doc.querySelectorAll('style').forEach(function (styleEl) {
      css += rewriteCssUrls(scopeCss(styleEl.textContent), base) + '\n';
    });

    // Drop head-ish nodes from the markup we inject (styles are re-added scoped;
    // links are hoisted; scripts are not executed by this loader).
    doc.querySelectorAll('style, link, script').forEach(function (el) { el.remove(); });

    var root = mount.shadowRoot || mount.attachShadow({ mode: 'open' });
    // Inject the body children directly into the shadow root so top-level
    // <section>s stay direct children (`body > section` -> `:host > section`).
    root.innerHTML =
      '<style>:host{display:block;}</style>' +
      '<style>' + css + '</style>' +
      doc.body.innerHTML;

    enableHashLinks(root);
  }

  // --- Boot -----------------------------------------------------------------

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
      .then(function (html) { render(mount, html, src); })
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
