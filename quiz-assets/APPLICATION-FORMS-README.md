# Diagnostic Call application forms — where the live version actually lives

`application-form.html` (EN) and `application-form-de.html` (DE) are **HTML Embed
elements pasted into Webflow pages on light-creators.com**. Nothing on
davidliebnau.com loads them. Editing a file here changes nothing on the live
site until the file is pasted back into Webflow.

| File | Live location |
|---|---|
| `application-form-de.html` | light-creators.com **/call** → HTML Embed |
| `application-form.html` | light-creators.com **/call-en** → HTML Embed |
| `application-form-quiz-de.html` / `application-form-quiz.html` | quiz-funnel variants |

## Why this file exists

In August 2026 these copies had drifted from the live embeds: the EN embed had
been edited directly in Webflow to redirect to the thank-you page, and that
change was never brought back here. The DE embed never got the redirect at all,
so German applicants only ever saw the inline success message and never reached
the thank-you video — the bug David reported on 24 July 2026.

Both files have since been re-synced from the live pages, with the redirect
added to the DE one.

## Submit flow

```
validate → POST JSON to n8n webhook → n8n answers {"ok":true} → redirect to SUCCESS_URL
                                    → anything else            → visible error + mailto fallback
```

- Webhook (since 22 Sep 2026): `https://cocreative.app.n8n.cloud/webhook/8fc48002-9d7e-455c-a6b0-ec42e3e4e517`,
  n8n workflow **"Light Creators · Diagnostic Call applications"** (`ezGN49TeYNjfOPsh`).
  Shared by all four variants. The `form: 'discovery-call'` hidden field is checked by
  the workflow; **do not rename it**, it is not display copy.
- The workflow uses "Respond to Webhook", so the browser only gets `{"ok":true}` **after**
  the notification email to dl@light-creators.com has been sent. That is the whole point:
  the old webhook (`2f90ce51…`) answered "Workflow was started" before doing anything,
  so a 200 proved nothing, and its published version only ever emailed James.
  The old webhook still receives the quiz script's own events (cta-click, email-signup).
- After the notification: Airtable log (base "Light Creators", Table 1; full payload in
  "Quiz Data (JSON)") and a DE/EN confirmation to the applicant. Both are
  continue-on-fail, so neither can block an application.
- `SUCCESS_URL` — DE: `/bewerbung-eingegangen`, EN: `/application-received`, on all
  four variants (the quiz-page variants got the redirect on 22 Sep 2026).
- `language` is hard-coded per variant (`'DE'` / `'EN'`). `<html lang>` is "en" on
  every page of this site, so it cannot be used.
- The inline `#dcSuccess` block stays as a fallback for a blocked or slow redirect.
- Textarea groups: the label sits in the flow above the textarea (CSS at the end of
  the `<style>` block), so long questions no longer overlap the field on mobile.

## Rule of thumb

Edit here first, paste into Webflow, publish. If you edit in Webflow instead,
copy the embed back into this folder in the same session.
