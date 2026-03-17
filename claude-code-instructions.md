# israelis.nl — Claude Code Build Instructions

## What You're Building

A frontend news website for **israelis.nl** — an AI-powered Dutch news platform written entirely in Hebrew, serving the Israeli community in the Netherlands (~12,000 people). This is the MVP: a content-rich, mobile-first, RTL Hebrew news site modeled after Israeli news portals like Ynet, with a modern clean aesthetic.

This document contains everything you need to build the site. Read it fully before writing any code.

---

## Project Context

israelis.nl is the daily news hub within a broader Israeli community ecosystem in the Netherlands. It publishes original Hebrew-language news about Dutch topics — politics, housing, community events, municipal decisions — curated and written by AI editorial personas with human oversight. It is **not** a translation service and **not** an Israeli news site. It covers the Netherlands, in Hebrew, for Israelis living there.

The site should feel like coming home to a professional Israeli news portal — but everything is about life in the Netherlands.

---

## Tech Stack

Choose the best framework for a content-driven, SEO-friendly, fast-loading news site. Recommended options (pick one):

- **Next.js (App Router)** — if you want SSR/SSG, great SEO, and React ecosystem
- **Astro** — if you want maximum performance, content-focused architecture, minimal JS

Whichever you choose:

- Must support static site generation (SSG) or server-side rendering (SSR)
- Must produce fast, lightweight pages
- Must be deployable to **Vercel** or **Render**
- Use **Tailwind CSS** for styling
- Use **TypeScript**

---

## Content Architecture

Articles are stored as **local data files** — either JSON or Markdown with frontmatter. This simulates a future CMS and makes it easy to swap in a real backend later.

### Article Schema

Each article file should contain:

```
title: string (Hebrew)
slug: string (URL-friendly, can be transliterated Hebrew or English)
summary: string (Hebrew, 1-2 sentences)
body: string (Hebrew, full article content in Markdown)
category: string (one of the defined categories below)
persona: string (byline — the AI persona who "wrote" it)
personaAvatar: string (path to persona illustration)
date: ISO date string
updatedAt: ISO date string (optional)
municipality: string (optional — one of the 25 covered cities)
region: string (optional — province)
tags: string[] (optional)
imageUrl: string (article hero image)
imageAlt: string (Hebrew)
imageCredit: string (optional)
sources: { name: string, url: string }[] (attribution links)
isBreaking: boolean (for newsflash bar)
isFeatured: boolean (for homepage hero)
aiDisclosure: string (default: "כתבה זו נוצרה באמצעות בינה מלאכותית בפיקוח עורך אנושי")
```

### Content Categories

Use these exact category IDs and Hebrew labels:

| ID | Hebrew Label | Icon |
|---|---|---|
| politics | פוליטיקה | 🏠 |
| housing | דיור ונדל"ן | 🏡 |
| finance | כלכלה ומיסים | 💰 |
| netherlands-israel | הולנד-ישראל | 🌐 |
| community | קהילה | 👥 |
| municipal | מוניציפלי | 🏛️ |
| business | עסקים וכלכלה | 💼 |
| education | חינוך | 🎓 |
| healthcare | בריאות | 🏥 |
| transport | תחבורה ותשתיות | 🚆 |
| culture | תרבות ופנאי | 🎨 |
| sport | ספורט | ⚽ |
| weather | מזג אוויר וטבע | 🌦️ |
| guide | מדריך מעשי | 📘 |

### AI Editorial Personas

Create 3 personas for the MVP. Each needs a name, focus area, short Hebrew bio, and a distinct illustrated avatar (use a placeholder SVG or illustration style — NOT a realistic photo):

| Persona | Hebrew Name | Focus | Voice |
|---|---|---|---|
| The Policy Analyst | הפרשן הפוליטי | Dutch politics, government, legislation | Sharp, analytical, explains complex Dutch politics clearly |
| The Community Reporter | כתב הקהילה | Israeli/Jewish community, practical expat topics | Warm, practical, always includes actionable takeaways |
| The City Beat | כתב העיר | Municipal news, local government, neighborhoods | Grounded, detail-oriented, knows every city |

### Sample Content

Create **12-15 sample articles** in Hebrew covering a realistic spread:

- 2-3 articles about Dutch politics (coalition, policy changes)
- 2-3 about the Israeli/Jewish community in NL (events, antisemitism, embassy)
- 2 about housing/real estate in Netherlands
- 2 about municipal news (Amsterdam, Amstelveen, Den Haag)
- 1-2 about culture/leisure (exhibitions, events)
- 1 about transport (NS trains, Schiphol)
- 1-2 newsflash items (weather warning, transit strike)

Articles should feel like real news — specific, timely, with Dutch place names and institutions mentioned naturally. Write them as if it's March 2026. Include source attributions to real Dutch media outlets (NOS, AD, Telegraaf, etc.).

### Covered Municipalities

Use these 25 cities throughout the sample content and city page structure:

Amsterdam, Amstelveen, Den Haag, Rotterdam, Utrecht, Eindhoven, Haarlem, Hoofddorp, Hilversum, Leiden, Almere, Delft, Groningen, Den Bosch, Tilburg, Nijmegen, Maastricht, Zaanstad, Purmerend, Veldhoven, Diemen, Alkmaar, Hoorn, Lelystad, Wassenaar

---

## Design Specifications

### Design Philosophy

The site must feel like a **professional Israeli news portal** — Israelis have strong expectations for how a news site looks. Study these reference sites for patterns:

**Primary references (Israeli news style):**
- **Ynet (ynet.co.il):** Dense homepage, prominent hero story, category sections below, red accent color, lots of content visible above the fold, horizontal category navigation, breaking news ticker
- **Israeli Week (israeliweek.com):** Large hero image with overlaid headline, grid of smaller stories below, blue color scheme, category nav with dropdowns, "trending" ticker bar at top, sidebar with popular stories

**Diaspora community references:**
- **aLondon (alondon.net):** Israeli diaspora portal for London. Categories include community, events, real estate, culture. Features a breaking news ("מבזקים") section, latest headlines sidebar, community-focused navigation
- **Dutchtown (dutchtown.nl):** The closest existing competitor — Hebrew magazine for Israelis in NL. Magazine-style grid layout, orange/blue color scheme, weather widget, category-based navigation including "ישראלנדים" (Israelanders) section

**Dutch news references (for content density and structure):**
- NU.nl, NOS.nl, AD.nl, Telegraaf.nl — study their information hierarchy and how they organize breaking vs. regular news

### Core Design Principles

1. **RTL-native from the ground up.** The entire UI is right-to-left. Use `dir="rtl"` on the HTML element. All layouts, text alignment, navigation, and reading flow must be RTL. This is non-negotiable.

2. **Mobile-first.** The majority of readers are on phones. Every design decision prioritizes small screens. Desktop is an enhanced version of mobile, not the other way around.

3. **Hebrew typography.** Use **Heebo** or **Rubik** from Google Fonts as the primary typeface. Ensure proper line height for Hebrew (1.6-1.8 for body text). Headlines should be bold and impactful.

4. **Content density.** Like Ynet: many stories visible above the fold. The homepage should be scannable in 60 seconds. A reader should immediately see: the top story, breaking news, and at least 6-8 other headlines across categories.

5. **Modern clean aesthetic.** Take the Ynet density concept but apply a cleaner, more modern look. Better whitespace than Ynet, cleaner typography, less visual noise — but still content-rich. Think of it as "Ynet meets a modern design system."

6. **Speed over spectacle.** Fast load times, minimal JavaScript. News competes with opening WhatsApp — it must be instant.

7. **Clear AI attribution.** Every article shows persona byline, source links, and an AI-generated content label. This is a brand value, not a disclaimer.

### Color Palette

Create a fresh, professional color palette that subtly nods to both Israeli and Dutch visual identity without being literal about flag colors. Suggestions:

- **Primary:** A confident blue (trust, professionalism — connects to both cultures)
- **Accent:** A warm orange or amber (energy, Dutch reference, stands out against blue)
- **Breaking news / alerts:** Red
- **Background:** Clean white / very light gray
- **Text:** Near-black for body, dark gray for secondary text
- **Category tags:** Each category gets a distinct color for visual scanning

### Layout Structure

#### Header
- Logo: "israelis.nl" — design a clean, bilingual-feeling wordmark. The ".nl" part should be visually distinct (different color or weight)
- Below logo: horizontal category navigation bar (scrollable on mobile)
- Include: search icon, date display (Hebrew date format), weather widget showing current Amsterdam temperature
- Sticky on scroll (compact version)

#### Breaking News Ticker (Newsflash Bar)
- Positioned just below the header
- Scrolling or auto-rotating ticker showing breaking news items
- Red accent color with label "מבזקים" (Breaking)
- Links to full articles
- Only shows when there are active breaking news items

#### Homepage Layout

**Hero Section:**
- Large featured story with big image, bold Hebrew headline overlaid or adjacent, summary text, persona byline, and category tag
- Below the hero: 3-4 secondary stories in a horizontal row with smaller images

**Category Sections:**
- Below the hero, organize content by category
- Each section has: category name as header (with icon), 3-4 article cards, "עוד ב[category]" (more in [category]) link
- Prioritize these sections on homepage (in order):
  1. הולנד-ישראל (Netherlands-Israel) — highest priority
  2. חדשות (Top news mix)
  3. קהילה (Community)
  4. מוניציפלי (Municipal) — show which city each article is about
  5. תרבות ופנאי (Culture & Leisure)

**Sidebar (desktop only):**
- "הנקראים ביותר" (Most read) — list of 5 popular articles
- Weather widget for Amsterdam
- Quick links to city pages

**Footer:**
- About israelis.nl (short Hebrew paragraph)
- Links: About, Contact, Editorial Policy, AI Transparency
- Category links
- City page links
- Social media icons
- "כל התוכן באתר נוצר באמצעות בינה מלאכותית בפיקוח עורכים אנושיים" (All content on this site is created using AI under human editorial oversight)
- © israelis.nl 2026

#### Article Page
- Hero image (full width on mobile)
- Category tag (colored badge)
- Headline (large, bold Hebrew)
- Meta line: persona avatar + name + date + reading time
- AI disclosure badge: small, visible label: "נוצר באמצעות AI | בפיקוח עורך"
- Article body: clean Hebrew typography, good reading width (max ~680px), proper paragraph spacing
- Source attribution section at bottom: "מקורות" (Sources) with links to original Dutch reporting
- Related articles section: 3-4 cards from same category
- Share buttons: WhatsApp (primary — this is how Israelis share), Facebook, X/Twitter, copy link

#### Category Pages
- Category name + icon as page title
- Filtered list of all articles in that category
- Grid/list view of article cards
- For MVP: build 2-3 category pages as templates. The pattern should make it trivial to add the remaining categories.

#### City/Municipality Pages
- City name in Hebrew as page title
- Map or icon showing location (optional for MVP)
- All articles tagged with that municipality
- For MVP: build 2 city pages (Amsterdam and Amstelveen) as templates.

#### About Page (אודות)
Write this page content in Hebrew. It should cover:
- What is israelis.nl (Dutch news in Hebrew, for the Israeli community in NL)
- How the content is created (AI editorial personas, transparent, with human oversight)
- The editorial personas — introduce each one with their avatar and focus area
- AI transparency statement: how AI is used, what human oversight exists, commitment to accuracy
- Connection to the broader israelis.nl community ecosystem
- Contact information

### Article Card Component

Every article card (used on homepage, category pages, city pages) should show:
- Thumbnail image
- Category tag (colored)
- Headline (Hebrew, bold)
- Summary (1-2 lines, truncated)
- Persona avatar (small) + persona name
- Date
- Municipality tag (if applicable)

Cards come in multiple sizes: large (hero), medium (secondary stories), small (list items).

### Responsive Behavior

**Mobile (< 768px):**
- Single column layout
- Hamburger menu for categories
- Horizontal scrollable category bar
- Hero story takes full width
- Cards stack vertically
- Sticky header (compact)
- Bottom navigation bar (optional)

**Tablet (768px - 1024px):**
- 2-column grid for article cards
- Sidebar collapses into main flow

**Desktop (> 1024px):**
- 3-column layout: main content + sidebar
- Full category navigation visible
- Hero + secondary stories in grid layout

### OpenGraph / Social Sharing

Every page must have proper OpenGraph tags optimized for WhatsApp and Facebook sharing:
- og:title (Hebrew headline)
- og:description (Hebrew summary)
- og:image (article image or site default)
- og:locale = "he_IL"
- twitter:card = "summary_large_image"

This is critical — WhatsApp sharing is the primary distribution channel.

---

## Technical Requirements

### RTL Support
- `dir="rtl"` and `lang="he"` on the HTML element
- All Tailwind utilities should use logical properties where possible (e.g., `ps-4` instead of `pl-4`, `ms-2` instead of `ml-2`)
- Test every component in RTL — arrows, icons, and layouts must all flow correctly
- When mixing Hebrew and Dutch/English text (e.g., Dutch place names in Hebrew articles), use proper bidirectional text handling (`<bdi>` tags or `dir="ltr"` on inline elements)

### Performance
- Target Lighthouse score: 90+ on Performance, Accessibility, SEO
- Lazy load images below the fold
- Use modern image formats (WebP with fallback)
- Minimize JavaScript — this is primarily a content site
- Implement proper caching headers

### SEO
- Semantic HTML throughout (article, nav, header, main, section, aside)
- Proper heading hierarchy (one h1 per page)
- Structured data (JSON-LD) for articles: NewsArticle schema
- Sitemap generation
- robots.txt
- Hebrew meta descriptions on every page

### Accessibility
- WCAG 2.1 AA compliance
- Proper aria labels (in Hebrew)
- Keyboard navigation
- Sufficient color contrast
- Skip-to-content link
- Alt text on all images

### Deployment
- The site should be deployable to either **Vercel** or **Render**
- Include clear deployment configuration (vercel.json or render.yaml)
- Include a README with setup and deployment instructions

---

## File/Folder Structure

Organize the project cleanly:

```
israelis-nl/
├── README.md
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── content/
│   ├── articles/          # All sample articles (JSON or MD)
│   ├── personas/          # Persona definitions
│   └── municipalities/    # City metadata
├── public/
│   ├── images/
│   │   ├── articles/      # Article images (use placeholder images)
│   │   ├── personas/      # Persona avatar illustrations
│   │   └── logo/          # Site logo
│   └── favicon.ico
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ArticleCard/
│   │   ├── BreakingNews/
│   │   ├── CategorySection/
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── PersonaByline/
│   │   ├── ShareButtons/
│   │   ├── WeatherWidget/
│   │   └── ...
│   ├── layouts/           # Page layouts
│   ├── pages/             # Page routes
│   ├── lib/               # Utilities, data loading
│   ├── styles/            # Global styles, Tailwind config
│   └── types/             # TypeScript types
└── [framework config files]
```

---

## What NOT to Build

- No backend API or server
- No database
- No authentication or user accounts
- No CMS admin panel
- No AI content pipeline
- No comment system
- No newsletter signup (just a placeholder "coming soon")
- No payment/subscription flow
- No analytics integration (just leave placeholder comments for where Google Analytics would go)

---

## Quality Checklist

Before considering the build complete, verify:

- [ ] All text is in Hebrew and reads naturally
- [ ] RTL layout works correctly on all pages and components
- [ ] Mobile layout is fully functional and looks good
- [ ] All 12-15 sample articles display correctly
- [ ] Homepage hero, category sections, and sidebar render properly
- [ ] Breaking news ticker works with sample data
- [ ] Article pages show full content with persona byline and AI disclosure
- [ ] Category pages filter articles correctly
- [ ] City pages filter by municipality correctly
- [ ] About page has full Hebrew content
- [ ] OpenGraph tags render correct previews (test with a WhatsApp-like preview checker)
- [ ] Images lazy load properly
- [ ] Site loads fast (< 3 seconds on mobile)
- [ ] No console errors
- [ ] Responsive design works across mobile, tablet, desktop
- [ ] Color palette is consistent and professional
- [ ] Typography is readable and visually appealing in Hebrew
- [ ] Share buttons work (especially WhatsApp)
- [ ] All links and navigation work correctly
- [ ] Accessibility: keyboard navigation works, proper contrast, aria labels present

---

## Summary

Build a beautiful, fast, Hebrew RTL news website that makes Israelis in the Netherlands feel informed and at home. The design should blend the content density of Ynet with modern clean aesthetics. Content comes from local data files (JSON/MD). The site should be immediately deployable and ready for real content to be plugged in once the AI editorial pipeline is built.

The ultimate test: if an Israeli in Amsterdam opens this site on their phone, they should immediately understand what it is, trust it, and want to come back tomorrow.
