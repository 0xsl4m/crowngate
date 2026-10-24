# CrownGate — Master Plan & Checkpoints

Status: **Live on Vercel (commit 5ed0183) · Lighthouse live: 87 performance / 100 accessibility / 100 best practices / 100 SEO**
Started: 2026-10-24
Design system: `DESIGN.md`

Legend: `[ ]` not started · `[~]` in progress · `[x]` done & verified

---

## Phase 0 — Foundation

- [x] Audit live site + code (bugs, SEO, assets, content)
- [x] Define brand direction and design tokens (`DESIGN.md`)
- [x] Create this plan with checkpoints
- [x] Generate brand assets: `logo-tight.png`, `favicon-512.png`, `apple-touch-icon.png`, `favicon.ico`, `og-crowngate.jpg`, `icons.svg`

**Checkpoint 0:** passed.

---

## Phase 1 — Critical fixes

- [x] Fixed `applyLanguage()` overwriting every page H1 with the homepage title
- [x] Removed URL hash writes; language persists in `cg-lang` (legacy `lang` migrated)
- [x] `<html lang>` and `dir` update with language
- [x] Fixed mobile logo hitbox (34px logo; no 250px overflow)
- [x] Removed the fake location filter; cars page now has a working category filter
- [x] Booking form: visible labels, labelled dates, bilingual service options
- [x] Single WhatsApp number format (`wa.me/201004717276`)
- [x] Verified `index.html#services` lands on the section (scrollY 810, target 90px under header)

**Checkpoint 1:** passed.

---

## Phase 2 — Brand & global UI

- [x] New `style.css` from tokens (ink/ivory/gold; Playfair + Manrope + Amiri + IBM Plex Sans Arabic)
- [x] Fixed header with scroll state, mobile sheet, EN/AR switch, WhatsApp CTA
- [x] Static footer on every page: wordmark, services, destinations, contact, social
- [x] `images/icons.svg` sprite replaces Font Awesome
- [x] Buttons/forms/cards/states; explicit `:focus-visible` on all controls
- [x] Transform-only reveal; respects `prefers-reduced-motion`; fail-safe reveals content if rendering is paused
- [x] No glassmorphism, no gradient headline text

**Checkpoint 2:** passed. `avoid-ai-design` scan: **0 findings**.

---

## Phase 3 — Homepage rebuild

- [x] Asymmetric cinematic hero: left copy, right planner, full-bleed Cairo image
- [x] Working quick-request form → WhatsApp (service/date/travellers/notes)
- [x] Asymmetric 7–5 service grid: Airport · Cars · Golf · Tours
- [x] “How it works” ivory section (3 ordered steps)
- [x] Concierge block (one handler, no partner names)
- [x] FAQ rewritten to match real services and scope
- [x] CTA band + contact strip
- [x] Removed fake reviews and invented stats

**Checkpoint 3:** passed.

---

## Phase 4 — Service pages

- [x] Cars: category filters, offer cards, galleries, “request availability”
- [x] Airport: three packages with real prices and inclusions + “before you fly” checklist
- [x] Golf: 4/6-seater carts, delivery note, North Coast framing
- [x] Tours: three Cairo tours, private guide, scope note
- [x] Shared page hero + breadcrumb + CTA band on all four pages

**Checkpoint 4:** passed. Filters and gallery verified in the browser.

---

## Phase 5 — Booking flow

- [x] Two-column booking page (form + “what happens next”)
- [x] Visible labels for every field; date minimum + departure ≥ arrival
- [x] Service checkboxes limited to Airport · Cars · Golf · Tours
- [x] WhatsApp message includes name, phone, email, country, services, dates, details
- [x] Error messages (EN/AR) and honest WhatsApp fallback link

**Checkpoint 5:** passed in EN and AR; validated empty form and a full valid submission.

---

## Phase 6 — SEO & sharing

- [x] Unique title, description, canonical, OG/Twitter per page
- [x] Proper favicon (512 + ICO + Apple touch) and 1200×630 OG image
- [x] Removed fragment hreflang; one canonical domain
- [x] Sitemap: active pages only, single domain, `lastmod` 2026-10-24
- [x] JSON-LD: TravelAgency + FAQ graph; Service schema on service pages
- [x] 404 page
- [x] Removed meta keywords, duplicate descriptions and self-serving reviews

**Checkpoint 6:** passed (JSON-LD and sitemap parse cleanly).

---

## Phase 7 — Performance, accessibility & QA

- [x] Hero preload; width/height on hero and logo; CSS aspect ratios for cards
- [x] Lazy loading below the fold; below-fold images deprioritised with `fetchpriority="low"`
- [x] Removed `background-attachment: fixed`; removed Font Awesome
- [x] Lighthouse mobile run — live: **87 / 100 / 100 / 100** · local: 84 / 100 / 100 / 100
- [x] Keyboard path, focus-visible, gallery focus trap/ESC, alt text
- [x] Browser QA at 390 / 768 / 1024 / 1440 in EN and AR (no horizontal overflow)
- [x] `avoid-ai-design` re-scan: **0 findings**
- [x] Updated this file with results

**Checkpoint 7:** passed. Performance follow-up (critical CSS / minification) remains optional.

---

## Deferred (needs real business input)

- [ ] Real prices / “from” rates for cars, golf, tours
- [ ] Real testimonials with platform links (Google/TripAdvisor)
- [ ] Business address, licence, cancellation/payment policies
- [ ] Privacy policy and terms pages
- [ ] Analytics IDs (GA4 / Meta Pixel) and Search Console access
- [ ] Professional photography for golf carts and cars
- [x] Deleted `hotels.html` and `chalets.html` (2026-10-24)
- [ ] Image compression / `srcset` pass beyond the hero
- [ ] Custom domain decision (canonicals currently use `crowngate-egyconcierge.vercel.app`)

---

## What shipped on 2026-10-24

- Brand system (`DESIGN.md`) and this checkpoint plan.
- New visual system: ink/ivory/gold, Playfair + Manrope (Amiri + IBM Plex Sans Arabic for AR), gate/arch-friendly editorial layout.
- Rebuilt pages: `index.html`, `cars.html`, `airport-pickup.html`, `golf-cart.html`, `guided-tours.html`, `booking.html`, plus a new `404.html`.
- New assets: tight logo, favicon set, 1200×630 OG image, SVG icon sprite.
- Removed Font Awesome and the old multi-font stack.
- Fixed the H1 override, hash writes, fake filter, mobile logo overflow and form language/labels.
- Language now updates `<html lang/dir>` and never touches the URL.
- Booking and quick-request flows verified end-to-end in English and Arabic.
- `avoid-ai-design`: 0 findings across the active pages, CSS and JS.
- Committed as `5ed0183`, pushed to `0xsl4m/crowngate`, deployed to Vercel; all live pages and assets return 200, and `hotels.html` / `chalets.html` return 404 with the custom page.
- Live Lighthouse: **87 performance / 100 accessibility / 100 best practices / 100 SEO**.

## Known follow-ups

- Optional performance push to 90+: critical CSS, minify CSS/JS/HTML, or self-host fonts.
- Add real business proof, prices and policies before promoting the site or running paid traffic.
- Consider a custom domain and update canonicals across all pages.

---

## Change log

| Date | Phase | Note |
|---|---|---|
| 2026-10-24 | 0 | Brand direction + plan created |
| 2026-10-24 | — | Hotels/chalets removed from all live surfaces; airport retained |
| 2026-10-24 | 1–6 | Full redesign and rebuild completed; scanner clean |
| 2026-10-24 | 7 | Manual responsive/functional QA complete; local Lighthouse 84/100/100/100 |
| 2026-10-24 | — | Deleted `hotels.html` and `chalets.html` |
| 2026-10-24 | — | Committed 5ed0183, pushed to GitHub, deployed to Vercel; live 87/100/100/100 |
