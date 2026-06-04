# Landing pages — Webflow embed (no iframe, no full paste)

These landing pages are large, fully self-contained HTML documents (their own
`<style>` blocks, a global CSS reset, base64-embedded images — ~1.6 MB each).
That's far past Webflow's HTML Embed character limit, so instead of pasting the
markup you host the page here and drop in a tiny loader.

`embed-loader.js` fetches the page at runtime and renders it inside a
**shadow root**, which isolates the page's CSS from Webflow (and vice versa) —
the same isolation an iframe gives you, but the content lives in the real page
DOM (auto height, no inner scrollbar, indexable).

## Pages

| Audience | File | Live URL (after deploy) |
|----------|------|--------------------------|
| Für Eltern (parents) | `flourishing-life-eltern.html` | `https://lab.iriscocreative.com/light-creators/landing-pages/flourishing-life-eltern.html` |
| Für dich (you) | `flourishing-life-dich.html` | `https://lab.iriscocreative.com/light-creators/landing-pages/flourishing-life-dich.html` |

## How to embed in Webflow

Add an **HTML Embed** element where the page should appear (a full-width
container/section for a full-bleed look) and paste **only** this:

```html
<!-- Für Eltern -->
<div data-iris-embed="https://lab.iriscocreative.com/light-creators/landing-pages/flourishing-life-eltern.html"></div>
<script src="https://lab.iriscocreative.com/light-creators/landing-pages/embed-loader.js"></script>
```

For the other page, swap the `data-iris-embed` URL to
`.../flourishing-life-dich.html`. The `<script>` line is the same and can be
loaded once per page even if you embed multiple pages.

## Notes & gotchas

- **CORS:** the cross-origin `fetch()` needs `Access-Control-Allow-Origin` on
  the host. This repo sends `*` via `netlify.toml` / `_headers`, so it works
  when served by Netlify. (Plain GitHub Pages does not send CORS headers.)
- **Fonts:** the pages reference `HK Grotesk` and `Cormorant Garamond` but don't
  bundle them — make sure the Webflow site loads those brand fonts. Document-
  level `@font-face` rules apply inside the shadow tree.
- **Selector rewriting:** the loader rewrites `:root`, `html` and `body`
  selectors to `:host` so the page's variables and base styles work inside the
  shadow root. Class names like `.hero-body` are left untouched.
- **Editing the page:** these are exported files — edit the HTML directly here
  and re-deploy; no Webflow change needed.

## Deploy

The loader's URLs only resolve once these files are on the **deploy branch**
(e.g. `main`) and published to `lab.iriscocreative.com`. Until then the embed
will log a load error in the console.
