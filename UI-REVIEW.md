# UI Review -- Portfolio Website

**Date:** 2026-06-26
**Overall Score:** 18/24
**Screenshots:** Not captured (Playwright browsers not installed; dev server running on localhost:3000)
**Baseline:** Abstract 6-pillar standards (no UI-SPEC.md)

---

## Score Summary

| Pillar | Score | Grade |
|--------|-------|-------|
| Copywriting | 2/4 | Needs Work |
| Visuals | 3/4 | Good |
| Color | 3/4 | Good |
| Typography | 3/4 | Good |
| Spacing | 4/4 | Excellent |
| Experience Design | 3/4 | Good |

---

## Priority Fixes

1. **BLOCKER: Title mismatch between metadata and hero** -- `layout.tsx:18` says "Backend Software Engineer" but `personal.json:3` says "Fullstack Software Engineer". Search engines, social shares, and the page itself show conflicting titles. Fix: align metadata title to match `personal.title` from personal.json, or use the data source dynamically.

2. **WARNING: Typo in email address** -- `personal.json:5` has `desarollo-software@lionbridge.com.do` -- "desarollo" is misspelled (should be "desarrollo"). This is the primary contact email shown in Contact section and Footer. If this is the actual email address, ignore; if it is a typo, fix in `personal.json`.

3. **WARNING: Second experience entry has vague company name** -- `experience.json:18` lists company as "Software Development" which reads as a placeholder, not a real company name. This undermines credibility. Fix: use the actual company name or a more descriptive label.

---

## Detailed Findings

### Pillar 1: Copywriting (2/4)

**Findings:**

- **BLOCKER: Identity conflict.** `layout.tsx:18-19` metadata declares "Backend Software Engineer" in both `<title>` and OG tags. `personal.json:3` declares "Fullstack Software Engineer". The hero renders personal.json, so visitors see "Fullstack" while link previews say "Backend". This is a credibility issue.

- **WARNING: Possible email typo.** `personal.json:5`: `desarollo-software` -- Spanish for "development" is "desarrollo" (double r). If this is the real address, no action needed.

- **WARNING: Vague company name.** `experience.json:18`: `"company": "Software Development"` -- reads as a category, not an employer. Hurts professional credibility.

- The About section copy (`personal.json:8-12`) is well-written, professional, and specific. Good use of concrete details (tax authority integrations, CI/CD).

- CTAs are specific: "View Projects" and "Download Resume" in Hero are clear and action-oriented. Contact subtitle "Interested in working together? Let's connect." is appropriate.

- Project descriptions are detailed with real challenges and results. No generic filler detected.

- Section headings are terse single words (About, Projects, Skills, Experience, Contact) which is appropriate for a portfolio but the Projects section benefits from its subtitle.

**Score justification:** The metadata/hero title mismatch is a significant copywriting failure that affects how the site presents to the world. The vague company name further reduces the score.

### Pillar 2: Visuals (3/4)

**Findings:**

- Visual hierarchy is well-structured: Hero has clear name > title > tagline > CTA progression using size and weight differentiation.

- Icon-only buttons in Footer and ProjectCard all have proper `aria-label` attributes. Good.

- The experience timeline with border-l-2 and dot markers creates effective visual storytelling.

- ProjectCard expand/collapse with ChevronDown rotation is a good affordance pattern.

- **WARNING: No images or visual media anywhere.** The entire portfolio is text-only. No project screenshots, no profile photo, no diagrams. For a portfolio site, this is a notable gap -- projects have `screenshotPath: null` for all entries. This reduces visual engagement significantly.

- Skills section uses icons (Lucide) paired with category names -- good visual anchor.

- Consistent card styling across About sidebar, Skills cards, Contact links, and ProjectCards (rounded-xl, border-border, bg-surface).

**Score justification:** Solid component-level visual design and hierarchy, but the complete absence of imagery in a portfolio site is a meaningful gap.

### Pillar 3: Color (3/4)

**Findings:**

- Theme is well-defined in `globals.css` with semantic custom properties (background, foreground, surface, accent, text-primary/secondary/muted). No hardcoded hex values in components.

- Accent color (blue-500 / #3b82f6) usage is disciplined: active nav links, CTAs, skill icons, timeline dots, bullet markers, hover states. Not overused.

- Dark theme execution is clean: slate-900 background, slate-800 surface, proper layering with border-border separation.

- `bg-green-500` in ProjectCard:94 for "Results" bullet dots is the only color outside the declared palette. This is intentional semantic differentiation (blue = challenges, green = results) but it is not defined as a theme variable, meaning it would not adapt if the palette changes.

- Text hierarchy uses three defined tones: text-primary (#f8fafc), text-secondary (#94a3b8), text-muted (#64748b). Contrast ratios against slate-900:
  - text-primary: ~15.4:1 (excellent)
  - text-secondary: ~5.5:1 (passes AA)
  - text-muted: ~3.7:1 (passes AA for large text only, fails AA for body text at 14px)

- **WARNING: text-muted contrast concern.** `text-muted` (#64748b on #0f172a) is used for body-sized text in several places: project roles (`ProjectCard.tsx:20`), date labels (`Experience.tsx:28`), category subheadings. At `text-sm` (14px), this fails WCAG AA (requires 4.5:1, gets ~3.7:1).

**Score justification:** Well-structured palette with semantic tokens, but the text-muted contrast ratio for small text is a real accessibility gap, and one off-palette color exists.

### Pillar 4: Typography (3/4)

**Findings:**

- Font pairing: Inter (sans) + JetBrains Mono (mono) is a strong, professional pairing. Inter for body, JetBrains Mono used sparingly for the "RA" logo and Badge component. Good restraint.

- Font sizes in use: text-sm, text-lg, text-xl, text-2xl, text-3xl, text-4xl, md:text-6xl. That is 7 distinct sizes -- slightly above the recommended 4-5, but the responsive variants (md:text-6xl, md:text-4xl) are reasonable scaling, leaving 5 base sizes which is acceptable.

- Font weights: font-medium, font-semibold, font-bold. Three weights is appropriate.

- `leading-relaxed` applied consistently to paragraph text (Hero tagline, About paragraphs, ProjectCard overview). Good readability choice.

- **Minor:** SectionHeading subtitle uses `text-lg` without explicit `leading-relaxed`, creating slightly different line-height treatment than other body text at the same size.

- `tracking-tight` on h1, `tracking-wider` on uppercase labels -- appropriate typographic differentiation.

**Score justification:** Strong font pairing and weight hierarchy. Minor inconsistency in line-height treatment.

### Pillar 5: Spacing (4/4)

**Findings:**

- Section wrapper uses consistent `py-20 md:py-28` with `max-w-6xl px-4 sm:px-6`. Applied uniformly across all sections.

- Header height `h-16` with `scroll-margin-top: 5rem` in CSS for anchor offset. Correct relationship.

- Card internal spacing is consistent: `p-6` across all card variants (About sidebar, Skills cards, ProjectCards, Contact links use `p-4` which is slightly different but appropriate for its smaller card size).

- Gap values follow Tailwind scale: gap-2, gap-4, gap-6, gap-12. No arbitrary spacing values detected.

- `space-y-2` for list items, `space-y-4` for paragraphs, `space-y-6` for card internal sections -- consistent rhythm.

- `mb-12` for SectionHeading, `mb-6` for category subheadings, `mb-12` for experience items. Consistent vertical rhythm.

- No arbitrary `[Npx]` or `[Nrem]` values found anywhere in components.

**Score justification:** Spacing is consistent, uses the Tailwind scale exclusively, and maintains good vertical rhythm throughout.

### Pillar 6: Experience Design (3/4)

**Findings:**

- **Navigation:** IntersectionObserver-based active section tracking with `rootMargin: "-20% 0px -70% 0px"` is a good threshold for scroll-spy. Mobile menu closes on link click (line 80). Smooth scroll via CSS `scroll-behavior: smooth`.

- **Animations:** Framer Motion `AnimateOnScroll` with `viewport: { once: true }` prevents re-triggering. Staggered delays (i * 0.1) create pleasing cascade. ProjectCard expand/collapse uses AnimatePresence for clean mount/unmount.

- **WARNING: No loading states.** No skeleton screens, loading spinners, or loading indicators anywhere. Since this is a static export site, this is less critical, but the resume download (`/resume.pdf`) has no loading feedback.

- **WARNING: No error boundaries.** No ErrorBoundary component exists. A runtime error in any client component (Header, ProjectCard, AnimateOnScroll) would crash the entire page with no recovery UI.

- **WARNING: No 404/empty state handling.** If projects.json returns empty for a category, the section renders an empty div with just the category label. No "No projects yet" message.

- Mobile menu uses simple show/hide without animation transition -- functional but abrupt compared to the polished animations elsewhere.

- `Button` component is an anchor (`<a>`) not a `<button>`, which is semantically correct for its navigation uses (href="#projects", href="/resume.pdf").

- Footer social links have proper `target="_blank" rel="noopener noreferrer"` and `aria-label`. Good.

- **Minor:** The mobile hamburger menu has no focus trap -- keyboard users can tab behind the menu overlay.

**Score justification:** Good navigation and animation patterns, but missing error boundaries and empty state handling are real gaps for production readiness.

---

## Files Audited

- `c:\Richard\private_projects\portfolio\src\app\globals.css`
- `c:\Richard\private_projects\portfolio\src\app\layout.tsx`
- `c:\Richard\private_projects\portfolio\src\app\page.tsx`
- `c:\Richard\private_projects\portfolio\src\components\layout\Header.tsx`
- `c:\Richard\private_projects\portfolio\src\components\layout\Footer.tsx`
- `c:\Richard\private_projects\portfolio\src\components\layout\Section.tsx`
- `c:\Richard\private_projects\portfolio\src\components\ui\Badge.tsx`
- `c:\Richard\private_projects\portfolio\src\components\ui\Button.tsx`
- `c:\Richard\private_projects\portfolio\src\components\ui\SectionHeading.tsx`
- `c:\Richard\private_projects\portfolio\src\components\ui\AnimateOnScroll.tsx`
- `c:\Richard\private_projects\portfolio\src\components\ui\ProjectCard.tsx`
- `c:\Richard\private_projects\portfolio\src\components\ui\Icons.tsx`
- `c:\Richard\private_projects\portfolio\src\components\sections\Hero.tsx`
- `c:\Richard\private_projects\portfolio\src\components\sections\About.tsx`
- `c:\Richard\private_projects\portfolio\src\components\sections\Projects.tsx`
- `c:\Richard\private_projects\portfolio\src\components\sections\Skills.tsx`
- `c:\Richard\private_projects\portfolio\src\components\sections\Experience.tsx`
- `c:\Richard\private_projects\portfolio\src\components\sections\Contact.tsx`
- `c:\Richard\private_projects\portfolio\src\data\personal.json`
- `c:\Richard\private_projects\portfolio\src\data\projects.json`
- `c:\Richard\private_projects\portfolio\src\data\skills.json`
- `c:\Richard\private_projects\portfolio\src\data\experience.json`

## UI REVIEW COMPLETE
