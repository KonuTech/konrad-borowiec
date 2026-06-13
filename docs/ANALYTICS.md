# Analytics

This site uses **Microsoft Clarity** (free, unlimited) for usage analytics, behind a
provider-agnostic wrapper so it can be swapped later. Analytics is **disabled by default**
and only turns on when a Clarity project id is supplied at build time.

## What it answers

| Question                     | Where to look                                                                                                            |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| How many visitors / sessions | Clarity dashboard → Overview                                                                                             |
| Average time on page         | Clarity → session duration                                                                                               |
| Which sections engaged users | Clarity scroll heatmaps **+** custom events `section_viewed` / `section_time` (Clarity → Filters → Custom tags / Events) |
| Is the CV holding attention? | Clarity → Recordings + heatmaps + dead/rage clicks                                                                       |
| LinkedIn vs. direct          | Custom event `visit_source` and the `utm_source` tag (see [Traffic source](#traffic-source-linkedin-vs-direct))          |

### Custom events emitted

`pageview`, `visit_source`, `section_viewed`, `section_time`, `contact_submitted`,
`cv_downloaded` (format + lang), `cta_clicked`, `project_link_clicked`,
`language_changed`, `theme_toggled`. All carry **no PII** — the contact form's
name/email/message are never sent.

The wrapper lives in `client/src/lib/analytics.ts`; section tracking in
`client/src/lib/useSectionTracking.ts` (it reuses the IntersectionObserver already in
`client/src/components/layout/Header.tsx` — do not add a second observer).

## Setup (one-time owner steps)

### 1. Create the Clarity project

1. Sign in at https://clarity.microsoft.com with the Microsoft/GitHub account.
2. Create a project for `https://gentle-bush-092d4010f.1.azurestaticapps.net/`.
3. Copy the **Project ID** (Settings → Overview).

### 2. Add the build secret

In GitHub → repo **Settings → Secrets and variables → Actions → New repository secret**:

- Name: `VITE_CLARITY_ID`
- Value: the Clarity project id

The Azure workflow already passes it into the build
(`.github/workflows/azure-static-web-apps-gentle-bush-092d4010f.yml`). Push to `main`
to deploy a build with analytics enabled. (Locally, analytics stays off unless you set
`VITE_CLARITY_ID` in `.env.local` — leave it empty for normal dev.)

## Traffic source (LinkedIn vs. direct)

The public URL `https://konutech.github.io/` redirects to the Azure app. A plain
redirect **destroys the original referrer**, so LinkedIn would look like "direct". Two
changes fix this — both are outside this repo:

### A. Fix the redirect in the `KonuTech/konutech.github.io` repo

Replace that repo's `index.html` redirect with a **JS** redirect that forwards the query
string and referrer (a `<meta refresh>` blanks the referrer and can't read it):

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <script>
      (function () {
        var TARGET = 'https://gentle-bush-092d4010f.1.azurestaticapps.net/';
        var params = new URLSearchParams(window.location.search); // keep existing ?utm_*
        if (document.referrer) {
          try {
            params.set('ref', new URL(document.referrer).hostname);
          } catch (e) {}
        }
        if (!params.get('utm_source') && /linkedin\.com$/.test(params.get('ref') || '')) {
          params.set('utm_source', 'linkedin');
        }
        var qs = params.toString();
        window.location.replace(TARGET + (qs ? '?' + qs : ''));
      })();
    </script>
  </head>
  <body>
    Redirecting…
  </body>
</html>
```

`client/src/lib/analytics.ts` reads `utm_source` / `utm_medium` / `utm_campaign` / `ref`
on load and records them.

### B. UTM-tag the LinkedIn link

Point the LinkedIn profile / "Featured" link at:

```
https://konutech.github.io/?utm_source=linkedin&utm_medium=profile&utm_campaign=cv
```

UTM is the **reliable** signal (it survives the hop via step A's query forwarding);
referrer-forwarding is the fallback for untagged links. Use the same pattern for other
channels (e.g. `utm_source=github`, `utm_source=email`).

### C. (Optional) Eliminate the hop

Attaching a **custom domain** directly to the Azure Static Web App removes the GitHub
Pages redirect entirely, so `document.referrer` works natively and no snippet is needed.
Requires owning a domain + DNS configuration.

## Privacy

- No PII in any event (the contact form contents are never sent).
- Clarity masks text content in recordings by default — keep that on.
- A short privacy note is shown in the footer (`footer.privacy`, all 13 locales).
- `initAnalytics()` also skips when the visitor has Do-Not-Track enabled.

## Swapping providers

Only `client/src/lib/analytics.ts` knows about Clarity. To move to PostHog (e.g. for
funnels like "% who viewed Projects → downloaded CV"), reimplement `initAnalytics` /
`trackEvent` / `trackPageview` there; callers don't change.
