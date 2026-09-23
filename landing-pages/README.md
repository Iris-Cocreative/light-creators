# Landing pages

## Retired pages

The three landing pages for "The Art and Practice of a Flourishing Life" are
no longer live. Each file is now a minimal redirect page (`noindex`, meta
refresh, canonical to the target):

| File | Redirects to |
|------|--------------|
| `flourishing-life-dich.html` | `https://light-creators.com/next-gen` |
| `flourishing-life-eltern.html` | `https://davidliebnau.com/threshold/partner/` |
| `flourishing-life-eltern-v2.html` | `https://davidliebnau.com/threshold/partner/` |

The old pages and their images are in the git history (before `5d75d35`).

## Webflow embed — `embed-loader.js`

`embed-loader.js` embeds a large, self-contained HTML page hosted here into a
Webflow page without an iframe and without pasting the markup. It fetches the
page at runtime and renders it inside a **shadow root**, which isolates the
page's CSS from Webflow (and vice versa). The content lives in the real page
DOM: auto height, no inner scrollbar, indexable.

Add an **HTML Embed** element and paste only this, with the page URL swapped in:

```html
<div data-iris-embed="https://davidliebnau.com/PATH/TO/PAGE.html"></div>
<script src="https://davidliebnau.com/landing-pages/embed-loader.js"></script>
```

The `<script>` line can be loaded once per page even for several embeds.

Notes:

- **CORS:** GitHub Pages sends `Access-Control-Allow-Origin: *`, so the
  cross-origin `fetch()` works from any domain.
- **Fonts:** document-level `@font-face` rules apply inside the shadow tree,
  so the Webflow site must load the fonts the embedded page uses.
- **Selector rewriting:** `:root`, `html` and `body` become `:host`; class
  names are left untouched.
- **Relative URLs** in the embedded page are resolved against the source page,
  so its assets load from this domain.
- The loader only works once the page is on `main` and GitHub Pages has
  published it; until then it logs a load error in the console.
