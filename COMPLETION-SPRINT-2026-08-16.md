# Light Creators — completion sprint session, 16 Aug 2026

Worked David's 24 July review end to end. Everything below is **built and
verified**; nothing is live yet. Two deploy actions are outstanding, both
one-liners, both deliberately left for James.

## Deploy state — read this first

| Where | State | To ship it |
|---|---|---|
| **davidliebnau.com** (`Iris-Cocreative/light-creators`) | commit `d6b9b6c`, **local only** | `git push` — GitHub Pages deploys on push to `main` |
| **light-creators.com** (Webflow) | edits saved, **published to staging only** | Publish to the `light-creators.com` + `www` domains |
| Staging preview | https://light-creators-tribe.webflow.io | — |
| `iris-field` docs | commit `eb9e3a8`, **local only** | `git push` |

The Webflow edits are in the project and on the staging subdomain. The live
site still serves the 30 July build, so nothing David sees has changed yet.

---

## davidliebnau.com — commit `d6b9b6c`

Browser-verified against a local server; HTML structure and asset paths
validated programmatically.

**"Discovery Call" → "Diagnostic Call"** across DE/EN home, `podcast.html`,
all 29 episode pages, `solo.html`, and `generate-episodes.js` — the generator
too, so regenerating episodes won't revert it. 42 files.
Left alone on purpose: the hidden `form: 'discovery-call'` field in
`quiz-assets` (n8n's routing key, not display copy) and the "Discovery"
progress label in the quiz (an unrelated step name).

**Testimonials rebuilt** on `index.html` and `index-en.html` from the briefing
doc's "TESTIMONIAL BRIEFING FOR JAMES" tab, and a testimonial section **added
to `podcast.html`**, which had none.

- DE home, 8 cards: Sinyan · Szücs (new quote, replacing the old COVID-era one)
  · **Harz T1 as a full-width lead card** (5 paragraphs, two columns) ·
  Dr. Julian Pott (role corrected) · Peter Koch · anonymous ProvenExpert ·
  Miriam Burgheim · David Kling
- EN home: the same set using the doc's own English translations. The old
  "testimonials 3–5 are kept in German" apology note is gone, except for
  Kling, who has no English version in the doc.
- Podcast: Martin Braun + two ProvenExpert quotes
- Portraits were extracted from the briefing doc and cut out to transparent
  circles → `assets/testimonials/*.webp`, 7 files, 81 KB total
- Prototype quotes (M.K., T.H.) excluded — the briefing says replace before
  go-live

**HR Excellence Award logo** replaces the text pill in *Organisations- &
Systemerfahrung*. The supplied TIFF was gold-and-grey artwork on an **opaque
white** background, and that section is dark navy — knocking the white out to
transparency wrecked it (flat colours came back semi-transparent, the grey
caption nearly vanished). Instead the mark is multiplied onto the site cream
with padding baked in, giving a cream certificate plate on the navy. The
official mark keeps its exact colours and proportions, which matters for a
trademarked award logo. 300×510, 28 KB.

**ProvenExpert seal** (the 300px variant David preferred) at the end of the
ÜBER DAVID / ABOUT DAVID section on both language versions.

**Podcast archive — the EP 19–21 bug, root-caused.** The archive builds from
the Apple Podcasts API and reads the episode number out of the metadata:
either `": #29"` in `shortDescription` or `"#0:"` at the start of `trackName`.
Episodes 19, 20 and 21 shipped with **neither** — their description just reads
"Herzlich Willkommen bei Leise Kraft, alle e…" with no number — so they fell
through to the trailer branch. That also silently cost them their "Mehr lesen"
links, because the subpage lookup is keyed on the number. Fixed with a
`NUMBER_OVERRIDES` map keyed by Apple `trackId`. Verified in the browser: all
three now render EPISODE 21/20/19 with working buttons.

*If David includes `#N` in the episode description at publish time, no
override is ever needed again. Worth telling him.*

Also on the podcast page: the "Jeden Dienstag eine neue Folge." line is gone,
the **real trailer is hoisted to the top** (it's the oldest feed item, so
newest-first sorting had buried it at the bottom), and **real Spotify cover
art** now fills the archive thumbs and blog cards — retiring the
`<podcast-cover>` web component, which was a CSS *reconstruction* of the cover.

**Flourishing Life v2** — `og:image` pointed at the `lab.iriscocreative.com`
staging host, which would have broken link previews once live. Now
davidliebnau.com.

---

## light-creators.com (Webflow) — staged

Unblocked when James connected the Webflow workspace.

**The thank-you video — root cause found, and it was not what it looked like.**
Both thank-you pages and both videos already existed and were fine:

| | page | video |
|---|---|---|
| DE | `/bewerbung-eingegangen` | SproutVideo `109ad9b11e18e2c59a` · 75 Sek. |
| EN | `/application-received` | SproutVideo `729ad9b11e18e2c6f8` · 90 sec |

The n8n webhook is registered for POST and CORS is correct for
`https://light-creators.com`, so submissions were never failing. **The German
form simply never redirected** — it hid the form, showed the inline success
block, and stopped. The English embed *did* redirect, so EN has most likely
been working all along.

Why it drifted: these forms are HTML Embeds pasted into Webflow. Someone added
the redirect to the EN embed **directly in Webflow** and never brought it back
to the repo, and DE never got one — both repo copies were stale. Fixed by
writing the patched embed into `/call`, then **reading it back and comparing
hashes — byte-for-byte identical** to the repo copy. The original is saved for
rollback. Documented in `quiz-assets/APPLICATION-FORMS-README.md` so it can't
drift silently again.

**Testimonials replaced** on `/call` and `/call-en`. The Testimonials CMS
collection exists but is **empty**, so these are static and were edited in
place. What was there: three cards with unattributed placeholder quotes
("— Founder, SaaS, Seed Stage" and similar) — the briefing's PROTOTYPE
pattern, which it says must be replaced before go-live. Now the two authorized
quotes: **Jacob Harz** (CEO & Co-Founder @Viivi) and an anonymous
**ProvenExpert** client. The third card held the M.K. prototype, which has no
real replacement yet — **hidden, not deleted**, so it's one toggle to restore.
The Harz case study and its €400.000 figure were kept off these public pages
per the briefing's warm-leads-only rule.

**Diagnostic Call CTA ported** to the `/` and `/en` homepages. Both ended on a
single next step (the Assessment); the Diagnostic Call — David's point 1.2 —
was the missing half of the funnel. Added below the Assessment CTA using
David's own copy verbatim, built with the site's own button and eyebrow markup
so it inherits the Light Creators design system rather than importing
davidliebnau.com's. Verified in the browser: matching gold button, eyebrow and
microcopy, separated by a hairline rule.

**Rename finished here too:** `/call` and `/call-en` hero eyebrows, both page
names, and all SEO/OG titles; the `/quiz` heading "Direkt zum Discovery-Call";
and `/application-received`, whose SEO title was wrongly "Discovery Call  EN".
No visible "Discovery Call" remains anywhere on the site. Left alone: the n8n
`form: 'discovery-call'` field, the `discovery-call-footer` CSS class, and two
ASCII comment headers inside embeds (HTML comments, never rendered).

---

## Also done

- **Collab OS** — all sprint actions updated with statuses and detailed notes,
  authored as Iris AI. Collaboration `Light Creators Website`, action set
  `Completion Sprint · July 2026`. The update scripts are idempotent.
- **`iris-field` docs** (commit `eb9e3a8`) — `CLAUDE.md` still described ClickUp
  as the system of record and `docs/CLAUDE-OPERATIONS.md` still used the
  pre-0061 table names, which now 404. Both corrected, with the old→new
  mapping added.

---

## Decisions — all resolved, 17 Aug

1. **David Kling / ZF Group** — **kept.** Not in the briefing's list for
   davidliebnau.com, but a real authorized testimonial that was already live and
   never asked to be removed.
2. **Spelling** — **normalisation approved.** The briefing mixes
   transliterations with proper umlauts in the same paragraph ("Naehe",
   "hoeheres", "hinterlaesst" beside "genießen"); standardised to Nähe, höheres,
   hinterlässt, außen, äußerst, Maßnahmen.
3. **The second Spotify cover** — **dropped.** The older teal/purple "DER
   PODCAST FÜR UNTERNEHMER:INNEN" screenshot isn't needed; the square "Leise
   Kraft" artwork is the one in use.
4. **English ProvenExpert seal** — **fine as is.** index-en.html keeps David's
   locale-locked `de-de` seal for now. An EN widget from his account swaps
   straight in whenever he sends one.
5. **`/call` shows two testimonials instead of three** — **accepted.** Flag it
   to David at go-live.

## Sprint status in Collab OS

The nine actions above are marked **done**, meaning built and verified — not
live. A `Publish` action now holds the two deploy steps plus the live test
submissions, so "done" on a build action can't be read as "David can see it."
That distinction is what reopened the thank-you-video task in the first place.

Still open and assigned to James: the quiz-funnel proposal, the client
enablement call/Loom, and the David follow-up (missing items 4–5, GSC check).

## Still open

- **Publish both deploys** (see the table at the top), then submit one live
  test application per language to confirm the redirect. I deliberately have
  not — submissions hit the live webhook and reach David.
- **Flourishing Life hosting** — the page is in good shape (responsive, real
  assets, SEO, `noindex`, embeddable). Everything left branches on subpage vs.
  Webflow embed vs. new domain. Its CTA is currently three `mailto:` links;
  wiring it to the n8n form with its own `form:` value would make those leads
  separable.
- **Quiz-funnel proposal** and **client enablement call/Loom** — untouched,
  both assigned to James.
- **GSC check** — still open, still needs James.
