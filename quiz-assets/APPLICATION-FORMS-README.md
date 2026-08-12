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
validate → POST JSON to n8n webhook → redirect to SUCCESS_URL
```

- Webhook: `https://cocreative.app.n8n.cloud/webhook/2f90ce51-d413-4c17-865a-95f4bbdd72b7`
  (shared by all four variants; the `form: 'discovery-call'` hidden field is how
  n8n identifies them — **do not rename it**, it is not display copy)
- `SUCCESS_URL` — DE: `/bewerbung-eingegangen`, EN: `/application-received`.
  Both pages exist on light-creators.com and carry David's SproutVideo message.
- The inline `#dcSuccess` block stays as a fallback for a blocked or slow redirect.

## Rule of thumb

Edit here first, paste into Webflow, publish. If you edit in Webflow instead,
copy the embed back into this folder in the same session.
