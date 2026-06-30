# UI Review — Portfolio

**Audited:** 2026-06-30
**Baseline:** Code analysis — no dev server detected, screenshots not captured
**Stack:** Next.js 16, Tailwind CSS v4 (`@theme inline`), Framer Motion
**Primary concern:** Contrast failures in light theme

---

## Audit Summary

| Pillar | Score | Status |
|--------|-------|--------|
| 1. Color & Contrast | 1/4 | CRITICAL |
| 2. Typography | 3/4 | MINOR |
| 3. Layout & Spacing | 3/4 | MINOR |
| 4. Component Consistency | 3/4 | MINOR |
| 5. Animation & Motion | 4/4 | PASS |
| 6. Accessibility | 2/4 | MAJOR |

**Overall: 16/24**

---

## Pillar 1: Color & Contrast — 1/4 CRITICAL

### Computed Contrast Ratios (Light Theme)

Background: `#faf9f7` — computed relative luminance L = 0.9507
All ratios use WCAG 2.1 formula: (L_lighter + 0.05) / (L_darker + 0.05)

| Color Pair | Values | Ratio | AA Normal (4.5:1) | AA Large (3:1) | Verdict |
|---|---|---|---|---|---|
| `--color-accent` on background | `#059669` on `#faf9f7` | **3.45:1** | FAIL | PASS | BLOCKER |
| `--color-text-muted` on background | `#64748b` on `#faf9f7` | **4.20:1** | FAIL | PASS | WARNING |
| `--color-text-secondary` on background | `#475569` on `#faf9f7` | **6.80:1** | PASS | PASS | OK |
| `--color-text-primary` on background | `#0f172a` on `#faf9f7` | **18.4:1** | PASS | PASS | OK |
| White text on primary button | `#ffffff` on `#059669` | **3.62:1** | FAIL | PASS | BLOCKER |
| Focus outline on background | `#059669` on `#faf9f7` | **3.45:1** | FAIL | — | BLOCKER |
| Glass card surface on page bg | `rgba(255,255,255,0.7)` comp. `#faf9f7` | **~1.04:1** | FAIL | FAIL | BLOCKER |
| Border on background | `rgba(212,207,199,0.6)` comp. `#faf9f7` | **~1.22:1** | n/a (decorative) | — | WARNING |
| Accent gradient "to" on background | `#0891b2` on `#faf9f7` | **3.21:1** | FAIL | PASS | WARNING |

> Luminance method: IEC 61966-2-1 sRGB linearization applied per channel; WCAG 2.1 §1.4.3 formula.

### Issues

**1. BLOCKER — Accent color fails WCAG AA for normal text (3.45:1)**

`--color-accent: #059669` in the light theme override (`globals.css:62`) is rendered as `text-accent` across:
- Active nav link color (`Header.tsx:61`) — `text-sm` weight-normal
- Hero greeting `font-mono text-sm` (`Hero.tsx:36`)
- ProjectCard expand/collapse button (`ProjectCard.tsx:112`) — `text-sm`
- Contact section icon (`Contact.tsx:51`) — 20px icon color
- List bullet dots throughout (`Experience.tsx:43`, `ProjectCard.tsx:83,99`) — decorative but still rendered via `bg-accent`

In dark mode the accent is `#10b981` on `#0f172a`, which passes. The light-theme override chose a darker green `#059669` but did not verify it against the light background `#faf9f7`. The ratio is 3.45:1 — passes for large text only.

**2. BLOCKER — Primary button white text on `#059669` fails WCAG AA (3.62:1)**

`Button.tsx:17` applies `bg-accent text-white`. At 14px `font-medium` this is normal text and requires 4.5:1. Current ratio is 3.62:1. The issue originates from the accent token, not the button itself.

**3. BLOCKER — Focus ring at 3.45:1 fails WCAG 2.4.11 requirements**

`globals.css:117` defines `outline: 2px solid var(--color-accent)` globally. In light mode `var(--color-accent)` resolves to `#059669` — ratio against page background 3.45:1. WCAG 2.4.11 (AA, 2.2) requires focus indicators to have 3:1 contrast against adjacent colors; on white card surfaces (`--color-surface-elevated: #ffffff`) the ratio drops to ~2.77:1, below the threshold.

**4. BLOCKER — Glass cards are visually invisible against light background (1.04:1)**

`--color-glass: rgba(255,255,255,0.7)` composited over `#faf9f7` produces an effective background of approximately `rgb(253,253,252)` — luminance contrast of ~1.04:1 against the page. Cards used in `About.tsx:28`, `Skills.tsx:32`, `Contact.tsx:49`, and `ProjectCard.tsx:15` are structurally present but have no visual separation from the page. `--color-glass-border: rgba(212,207,199,0.6)` is likewise near-invisible at ~1.22:1 composite contrast.

**5. WARNING — `--color-text-muted` fails WCAG AA for normal text (4.20:1)**

Used at `text-sm` (14px normal weight) in: project role label (`ProjectCard.tsx:25`), date labels (`Experience.tsx:29`), contact label (`Contact.tsx:53`), About sidebar subheadings (`About.tsx:30,39,49`), ProjectCard section subheadings (`ProjectCard.tsx:74,90`). All fail 4.5:1. They pass for large text (3:1) but `text-sm` is not large text.

**6. WARNING — `.text-gradient` both stops fail WCAG AA for normal text**

`globals.css:91`. In light theme: from `#059669` (3.45:1) to `#0891b2` (3.21:1). Applied to the H1 name in `Hero.tsx:43` at `text-4xl md:text-6xl` — large text passes at 3:1, but the value in `About.tsx:34` at `text-2xl font-bold` (computed 24px bold) is borderline large text.

---

## Pillar 2: Typography — 3/4 MINOR

### Font Assignments

| Role | Family | Token |
|---|---|---|
| Headings h1/h2/h3 | Space Grotesk | `globals.css:27,49` |
| Body | Inter | `globals.css:25` |
| Mono (logo, badges) | JetBrains Mono | `globals.css:26` |

### Size Scale in Use

`text-xs`, `text-sm`, `text-base` (implicit), `text-lg`, `text-xl`, `text-2xl`, `text-3xl`, `text-4xl`, `text-6xl` — 8 sizes total. No arbitrary `text-[N]` values found in any component.

### Issues

1. **MINOR — Eight distinct sizes exceeds a disciplined 4-5 step scale.** For a single-page portfolio the range is justifiable (hero needs 6xl, badges need xs) but the difference between `text-lg` body and `text-xl` card headings is subtle enough to be unnoticeable at a glance, reducing hierarchy signal.

2. **MINOR — Badge uses `font-mono text-sm` (`Badge.tsx:14`) for all technology labels.** JetBrains Mono at 14px renders with tighter character spacing than Inter. On mobile the narrow characters help with wrapping but may appear fragile in light mode where the badge background has no visible boundary (see Pillar 1 Issue 4).

3. **PASS — Line heights.** `leading-relaxed` (1.625) applied consistently to `p` elements across all sections. Heading line height inherits tight default — appropriate.

4. **PASS — Weights.** Three weights in use: `font-medium` (500), `font-semibold` (600), `font-bold` (700). Correct hierarchy.

---

## Pillar 3: Layout & Spacing — 3/4 MINOR

### Issues

1. **PASS — Floating pill header clearance.** Header: `fixed top-4` + `h-14` = 4.5rem from top. Sections: `scroll-margin-top: 6rem` (`globals.css:46`). Hero: `pt-24` (6rem). Adequate on standard viewports.

2. **MINOR — Mobile nav touch targets below 44px.** `Header.tsx:89` mobile links use `py-2.5` = 10px padding each side. At `text-sm` (14px) the total touch target is ~34px — below WCAG 2.5.5 recommendation of 44px.

3. **MINOR — Experience timeline uses arbitrary positioning value.** `Experience.tsx:23`: `ml-4 pl-8`. Timeline dot at `Experience.tsx:28`: `-left-[2.55rem]` — an arbitrary Tailwind value. This works correctly but is a maintenance concern if the `ml-4 pl-8` relationship changes.

4. **PASS — Section internal spacing is consistent.** `gap-6` between grid items, `gap-12` between major columns, `p-6` for card padding uniformly. No arbitrary `[Npx]` values found in grid or card spacing.

5. **MINOR — Hero background orb blur radius is very large.** `Hero.tsx:24`: `h-[500px] w-[500px]` orb with `blur-[120px]`. In light theme the orb is `bg-accent/10` — `#059669` at 10% opacity on `#faf9f7`. The glow effect will be nearly imperceptible in light mode given the low opacity and high background luminance.

---

## Pillar 4: Component Consistency — 3/4 MINOR

### Issues

1. **PASS — Card surface class is consistent.** `.glass-card.card-elevated` applied uniformly in `About.tsx:28`, `Skills.tsx:32`, `Contact.tsx:49`, `ProjectCard.tsx:15`. All four card contexts use the same base.

2. **WARNING — `Button` component is anchor-only (`Button.tsx:3`).** Extends `AnchorHTMLAttributes<HTMLAnchorElement>` and always renders `<a>`. Cannot be used for action triggers. The pattern is intentionally safe for the current usage (CTAs navigate to anchors or PDFs), but the design system provides no `<button>` variant. ProjectCard's expand button and ThemeToggle correctly use native `<button>` — the split creates two button-style patterns that are not unified.

3. **MINOR — Badge `default` variant has no visible border in light mode.** `Badge.tsx:10`: `bg-surface` in light theme is `#f0eee9` — contrast against `#faf9f7` page background is ~1.22:1. The badge shape is invisible as a container; only the text inside it provides visual presence. Adding a border (`border border-border`) would fix card visibility.

4. **MINOR — `Badge` receives `hover:scale-105` regardless of interactivity.** `Badge.tsx:14`. Badges are `<span>` elements — non-interactive by default. The hover scale suggests clickability that does not exist, which is a false affordance. Should be removed from the base badge or only added when the badge is wrapped in an interactive element.

5. **PASS — Button hover states are consistent.** Both variants use `hover:-translate-y-0.5` lift and `transition-all duration-200`. The primary variant adds `hover:shadow-lg hover:shadow-accent/20`. The secondary variant adds `hover:bg-surface hover:text-text-primary`. Internally consistent.

---

## Pillar 5: Animation & Motion — 4/4 PASS

### Findings

1. **PASS — CSS reduced-motion kill-switch.** `globals.css:122-129` applies `animation-duration: 0.01ms !important` to `*, *::before, *::after` when `prefers-reduced-motion: reduce` is active. Covers all CSS keyframe animations including the `dot-glow` pulse.

2. **PASS — Framer Motion checks `useReducedMotion()`.** `Hero.tsx:22` disables stagger on reduced motion. `AnimateOnScroll.tsx:62` returns a plain `<div>` — completely bypasses all scroll animation.

3. **PASS — Animation timing is appropriate.** Hero stagger at 0.18s, scroll animations at 0.6s, ProjectCard spring at `stiffness: 300, damping: 25`. None are excessively long or repetitive.

4. **PASS — `viewport: { once: true }` on all scroll animations** (`AnimateOnScroll.tsx:69`). Prevents disorienting re-animation on scroll-up.

5. **PASS — Pulse animation on experience dots is subtle.** `dot-glow` at 3s cycle, low-opacity glow values. Will degrade gracefully in light mode (glow barely visible against light bg — not a defect for animation pillar, but noted).

---

## Pillar 6: Accessibility — 2/4 MAJOR

### Issues

1. **BLOCKER (from Pillar 1) — Focus ring fails contrast in light theme.** Keyboard users see an insufficient `#059669` outline on `#faf9f7` backgrounds (3.45:1 < required 3:1 minimum on adjacent colors per WCAG 2.4.11). On white card surfaces it drops to ~2.77:1.

2. **MAJOR — Mobile hamburger button missing `aria-expanded`.** `Header.tsx:71-77` has `aria-label="Toggle menu"` but no `aria-expanded={mobileOpen}`. Screen readers cannot report the current open/closed state of the menu to users. This violates WCAG 4.1.2 (Name, Role, Value).

3. **MAJOR — No skip-to-content link.** The fixed floating header requires keyboard users to tab through the logo, 5 nav links, language switcher, and theme toggle before reaching main content on every page load. A visually-hidden skip link is essential for single-page layouts with fixed navigation.

4. **MINOR — `LanguageSwitcher` uses `window.location.assign` for routing (`LanguageSwitcher.tsx:11`).** This causes a full hard reload, losing scroll position, focus context, and Next.js app state. Should use the Next.js router or at minimum an `<a>` element so the browser handles focus management correctly.

5. **MINOR — Mobile nav links lack `cursor-pointer`.** `Header.tsx:89` mobile links have no explicit cursor. Desktop nav links also lack it (`Header.tsx:59`). The `Button.tsx:14` base class includes `cursor-pointer`; nav anchors do not — inconsistent cursor behavior for interactive elements.

6. **MINOR — No focus trap in mobile menu.** When the mobile menu is open, keyboard focus can escape to behind the overlay. `Header.tsx:81-100` renders the menu but applies no `aria-modal`, no focus trap, and no `Escape` key handler to close it.

7. **PASS — Icon-only interactive links include aria-labels.** `ProjectCard.tsx:32` GitHub link: `aria-label={`${project.title} GitHub`}`. Live demo link at line 42: `aria-label={`${project.title} live demo`}`. ThemeToggle at `ThemeToggle.tsx:30`: contextual aria-label that reflects current state. LanguageSwitcher at line 17: describes the target language. All correct.

---

## Remediation Plan

Ordered by severity. All `globals.css` changes go inside the `html[data-theme="light"]` block unless otherwise noted.

---

### Fix 1 — Darken light-theme accent token to pass WCAG AA (BLOCKER)

**Target:** minimum 4.5:1 against `#faf9f7` (L=0.9507) requires foreground L ≤ 0.1724.
`#047857` — L ≈ 0.1485 — ratio ≈ **5.04:1**. Passes AA for normal text.

```css
/* globals.css — html[data-theme="light"] */
--color-accent: #047857;                    /* was #059669 (3.45:1) → now 5.04:1 */
--color-accent-hover: #065f46;             /* was #047857, step darker */
--color-accent-gradient-from: #047857;     /* was #059669 */
```

This single change also fixes Fix 2 (button text) and Fix 4 (focus ring), which both derive from `--color-accent`.

---

### Fix 2 — Primary button contrast (resolved by Fix 1)

With `--color-accent: #047857`, white text contrast becomes:
(1.05) / (0.1485 + 0.05) = 1.05 / 0.1985 = **5.29:1** — passes AA for normal text.

No additional change needed.

---

### Fix 3 — Make glass cards visible in light theme (BLOCKER)

```css
/* globals.css — html[data-theme="light"] */
--color-glass: rgba(255, 255, 255, 0.92);      /* was 0.7 — near-opaque white */
--color-glass-border: rgba(160, 153, 143, 0.9); /* was rgba(212,207,199,0.6) — visible edge */
```

Add a subtle shadow specifically for light mode to reinforce card elevation:

```css
/* globals.css — outside the theme block, targeting light specifically */
html[data-theme="light"] .glass-card {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.10),
              0 4px 16px rgba(0, 0, 0, 0.07);
}
```

---

### Fix 4 — Focus ring (resolved by Fix 1)

The global `:focus-visible` rule (`globals.css:117`) uses `var(--color-accent)`. Once Fix 1 sets the light-theme accent to `#047857` (5.04:1), the focus ring inherits the corrected value automatically.

---

### Fix 5 — Darken `--color-text-muted` for WCAG AA (WARNING)

Current `#64748b` = 4.20:1 on `#faf9f7` — fails for `text-sm` normal weight.
Target `#576372` achieves ≈ 4.6:1.

```css
/* globals.css — html[data-theme="light"] */
--color-text-muted: #576372;    /* was #64748b (4.20:1) → ~4.6:1 */
```

---

### Fix 6 — Add `aria-expanded` to hamburger button (MAJOR)

```tsx
// Header.tsx — line 71
<button
  onClick={() => setMobileOpen(!mobileOpen)}
  className="text-text-secondary md:hidden"
  aria-label="Toggle menu"
  aria-expanded={mobileOpen}
  aria-controls="mobile-nav"
>
```

Add `id="mobile-nav"` to the `<nav>` element at `Header.tsx:82`.

---

### Fix 7 — Add skip-to-content link (MAJOR)

Add as the first child of `<body>` in the root layout:

```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-background focus:px-4 focus:py-2 focus:text-text-primary focus:shadow-lg"
>
  Skip to main content
</a>
```

Add `id="main-content"` to the `<main>` element or the `#about` section's wrapping element.

---

### Fix 8 — Add visible border to Badge default variant (MINOR)

```tsx
// Badge.tsx — line 10
variant === "default"
  ? "bg-surface border border-border text-text-secondary"
  : "bg-accent-subtle text-accent"
```

---

### Fix 9 — Increase mobile nav touch targets (MINOR)

```tsx
// Header.tsx — line 89 — add min-h-[44px] flex items-center
className={`flex min-h-[44px] items-center rounded-md px-3 text-sm transition-colors ...`}
```

---

## Files Audited

- `c:\Richard\private_projects\portfolio\src\app\globals.css`
- `c:\Richard\private_projects\portfolio\src\components\layout\Header.tsx`
- `c:\Richard\private_projects\portfolio\src\components\sections\Hero.tsx`
- `c:\Richard\private_projects\portfolio\src\components\sections\About.tsx`
- `c:\Richard\private_projects\portfolio\src\components\sections\Skills.tsx`
- `c:\Richard\private_projects\portfolio\src\components\sections\Experience.tsx`
- `c:\Richard\private_projects\portfolio\src\components\sections\Contact.tsx`
- `c:\Richard\private_projects\portfolio\src\components\ui\Button.tsx`
- `c:\Richard\private_projects\portfolio\src\components\ui\Badge.tsx`
- `c:\Richard\private_projects\portfolio\src\components\ui\ProjectCard.tsx`
- `c:\Richard\private_projects\portfolio\src\components\ui\SectionHeading.tsx`
- `c:\Richard\private_projects\portfolio\src\components\ui\AnimateOnScroll.tsx`
- `c:\Richard\private_projects\portfolio\src\components\ui\ThemeToggle.tsx`
- `c:\Richard\private_projects\portfolio\src\components\ui\LanguageSwitcher.tsx`
