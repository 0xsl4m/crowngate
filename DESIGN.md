# CrownGate — Design System & Brand Direction

Status: v1 · 2026-10-24
Owner: CrownGate
Scope: crown-gate static site (EN/AR)

## 1. Brand core

**What CrownGate is:** a private concierge for travellers coming to Egypt. One point of contact arranges airport meet & assist, private cars, North Coast golf carts, and guided days in Cairo.

**What it is not:** a marketplace, a comparison engine, or a hotel booking platform. Never show partner companies, supplier logos, “compare” language, or inventory grids that read like an OTA.

**Positioning:** *Egypt, arranged before you land.*

**Audience:** Gulf travellers (UAE, Saudi, Kuwait, Qatar) and international visitors who want a calm, pre-arranged trip without chasing suppliers.

**Voice:** calm, specific, personal. Short sentences. No hype words (“seamless”, “elevate”, “unlock”, “premium offerings”). Say what happens, where, and when.

**Current scope (do not overpromise):** Cairo & Giza tours · North Coast golf carts · private cars · Cairo airport meet & assist. Do not advertise Alexandria, Sharm, Hurghada, Luxor or Aswan until they are actually offered.

## 2. Visual direction

**Quiet Luxury / Editorial Concierge.** Cinematic full-bleed photography, editorial serif headlines, generous negative space, warm ink surfaces, champagne-gold details, and one recurring geometric motif: **the gate/arch**.

The site should feel like a private travel desk, not a template. Spend boldness in one place: the hero. Everything else stays quiet.

### References — what to take, what to leave

| Reference | Take | Leave |
|---|---|---|
| Japan / Endless Discovery | full-bleed hero, small caps eyebrow, oversized two-line headline, restrained info card | decorative 01–04 numbering, green tint |
| Hika | human social proof, pill CTA, airy nav | washed-out light palette |
| Explore With DB | two-level CTA hierarchy, four-item service strip | script font, clip-art logo, icon clutter |
| Roadify | planner card in hero, fleet cards, trust strip | marketplace/comparison language |
| FLASH | tour cards, immersive image section | teal as primary colour |
| Premium Airport Transfer | black/gold luxury, serif + hairline rules, contact bar | heavy ornament |
| Wanderlust | split hero with search card, editorial serif, destination cards | mint palette, flight/hotel tabs we do not offer |

## 3. Design tokens

### Colour

| Token | Value | Role |
|---|---|---|
| `--ink` | `#080D12` | page background |
| `--ink-2` | `#0E1720` | raised surfaces |
| `--ink-3` | `#15212C` | cards on dark |
| `--ivory` | `#F4EFE6` | light editorial sections |
| `--ivory-2` | `#E7DFD2` | light borders / muted text on ivory |
| `--gold` | `#C8A96A` | primary accent, CTAs, hairlines |
| `--gold-bright` | `#E3C98F` | hover |
| `--text` | `#EAE6DE` | body on dark |
| `--muted` | `#9AA6B0` | secondary text |
| `--line` | `rgba(244,239,230,.12)` | hairlines |
| `--teal` | `#1F6F63` | status only (never a brand colour) |

Rules: no purple gradients. No gradient-filled headline text. Gold is an accent, not a background for large areas.

### Type

- Display: **Playfair Display** 500/600 — English; **Amiri** 400/700 — Arabic.
- UI/body: **Manrope** 400/500/600/700 — English; **IBM Plex Sans Arabic** 400/500/600 — Arabic.
- Labels: 11–12px uppercase, letter-spacing .2em.
- Scale: 12 / 14 / 16 / 18 / 24 / 32 / 44 / 64 / clamp(48px, 8vw, 104px).
- Line-height: display .95–1.02; body 1.65.

### Space, radius, elevation

- 8pt spacing scale. Section padding: 128px desktop / 80px tablet / 64px mobile.
- Container: 1240px, 24px gutters.
- Radius: pills 999px; cards 4px; media 2px; inputs 2px. Do not use one radius for everything.
- Elevation: one shadow level (`0 24px 60px rgba(0,0,0,.35)`) used only on floating cards.
- Borders: 1px `var(--line)`; no glassmorphism, no blur except a real modal scrim.

### Motion

- 600–800ms, `cubic-bezier(.22,1,.36,1)`.
- Reveal: 16px rise + fade; image hover scale 1.04; arrow translate 4px.
- No auto-carousels, no scroll-jacking, no bounce easing.
- Respect `prefers-reduced-motion`: disable transforms and reveals.

## 4. Components

- **Header:** fixed, transparent over hero, solid ink after 24px scroll; 78px tall; logo left, nav centre, language + WhatsApp right. Mobile: full-screen sheet.
- **Buttons:** gold filled (ink text), ghost (hairline border), WhatsApp (solid green only for the WhatsApp action). Max two CTAs in one block.
- **Hero:** asymmetric grid; left copy, right planner card; image full-bleed; bottom service strip (functional links, no decorative numbering).
- **Service card:** image-led, dark gradient overlay, title, one line, arrow link. Asymmetric 7/5 + 5/7 grid on desktop.
- **How it works:** ivory section, three ordered steps, one supporting image, thin rules.
- **Concierge block:** dark, split copy + contact card. Copy reinforces one handler, no suppliers mentioned.
- **FAQ:** solid surfaces, hairline dividers, plus/minus.
- **Footer:** oversized wordmark, four columns, contact, social, legal line.
- **Forms:** visible labels above fields, 2px radius, gold focus ring, inline errors, no placeholder-only fields.
- **States:** every control has hover, focus-visible, active, disabled, loading; pages have empty/error/404 states.

## 5. Imagery

- Full-bleed, warm-neutral grade: `saturate(.9) contrast(1.05)` at CSS level.
- Consistent crops: 3:2 for landscape, 4:5 for cards, 1:1 for avatars.
- No text baked into images, no stock collages, no emoji.
- Current assets: Cairo skyline (hero), airport lounge, car close-up, golf cart, Pyramids. Replace the golf-cart photo when a real North Coast shot is available.
- Favicon: gold crown on ink. OG: 1200×630 with wordmark and hero image.

## 6. Content rules

- Hero: “Egypt, arranged before you land.”
- Sub: airport meet & assist, private cars, North Coast golf carts, guided days in Cairo — one WhatsApp thread.
- No invented statistics (“200+ clients”, “5-star rated”). No invented reviews.
- No partner names. No “we compare”. No “book instantly”.
- Prices only where they are real (airport packages). Otherwise “on request”.
- Every page ends with one clear next step: WhatsApp or the trip form.
- Arabic copy is written, not machine-translated; RTL must be tested.

## 7. Anti-AI checklist (gate)

From `avoid-ai-design` — must pass before shipping:

- [ ] No gradient-filled headline text (current P0).
- [ ] No glassmorphism/backdrop blur.
- [ ] No centered hero over identical cards.
- [ ] No emoji as icons; one icon set only.
- [ ] Different radii/elevation by element type.
- [ ] No generic copy (“seamless”, “elevate”, “unlock”).
- [ ] No invented social proof.
- [ ] Visible `:focus-visible` on every interactive element.
- [ ] Real content, real photos, real states.
- [ ] Scanner passes with no P0; visual review at 375/768/1440.

## 8. RTL rules

- Set `<html lang="ar" dir="rtl">`; never only a body class.
- Flip arrows and directional icons; keep the logo left/right per design.
- Arabic display uses Amiri; body uses IBM Plex Sans Arabic.
- Numbers, prices and phone numbers remain LTR (`dir="ltr"` spans).
- Test every page in Arabic at 375px and 1440px.
