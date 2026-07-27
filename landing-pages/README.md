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
| Für Eltern **v2** (current) | `flourishing-life-eltern-v2.html` | `https://davidliebnau.com/landing-pages/flourishing-life-eltern-v2.html` |
| Für Eltern v1 | `flourishing-life-eltern.html` | `https://davidliebnau.com/landing-pages/flourishing-life-eltern.html` |
| Für dich (you) | `flourishing-life-dich.html` | `https://davidliebnau.com/landing-pages/flourishing-life-dich.html` |

The v2 page references its images via relative paths in `assets/flourishing/`
(no base64) — the loader absolutizes those URLs against the source page, so
they load from this repo's domain wherever the page is embedded.

## How to embed in Webflow

Add an **HTML Embed** element where the page should appear (a full-width
container/section for a full-bleed look) and paste **only** this:

```html
<!-- Für Eltern v2 -->
<div data-iris-embed="https://davidliebnau.com/landing-pages/flourishing-life-eltern-v2.html"></div>
<script src="https://davidliebnau.com/landing-pages/embed-loader.js"></script>
```

For another page, swap the `data-iris-embed` URL. The `<script>` line is the
same and can be loaded once per page even if you embed multiple pages.

## Notes & gotchas

- **CORS:** the cross-origin `fetch()` needs `Access-Control-Allow-Origin` on
  the host. GitHub Pages sends `Access-Control-Allow-Origin: *` on every
  response (verified on both `davidliebnau.com` and `lab.iriscocreative.com`),
  so the embed works from any domain.
- **Fonts:** the pages reference `HK Grotesk` and `Cormorant Garamond` but don't
  bundle them — make sure the Webflow site loads those brand fonts. Document-
  level `@font-face` rules apply inside the shadow tree.
- **Selector rewriting:** the loader rewrites `:root`, `html` and `body`
  selectors to `:host` so the page's variables and base styles work inside the
  shadow root. Class names like `.hero-body` are left untouched.
- **Editing the page:** these are exported files — edit the HTML directly here
  and re-deploy; no Webflow change needed.

## Deploy

The loader's URLs only resolve once these files are on `main` and GitHub Pages
has published them to `davidliebnau.com`. Until then the embed will log a load
error in the console.
