# israelis.nl — Hebrew News Portal for the Israeli Community in the Netherlands

A professional, AI-powered Hebrew news site serving ~12,000 Israelis living in the Netherlands. Built with Next.js, TypeScript, and Tailwind CSS. Deployed as a static site on Render.

**Live site:** [israeli-nl-complete.onrender.com](https://israeli-nl-complete.onrender.com/)

---

## Tech Stack

- **Framework:** Next.js 16 (App Router) with TypeScript
- **Styling:** Tailwind CSS 4
- **Fonts:** Heebo (body text), Secular One (logo)
- **Output:** Static Site Generation (`output: 'export'`)
- **Deployment:** Render (static site, publish directory: `out/`)
- **Node.js:** 20.11.0

## Design

Inspired by [Times of Israel](https://www.timesofisrael.com/) and [Zman.co.il](https://www.zman.co.il/):

- **RTL-native** — full right-to-left Hebrew layout (`dir="rtl"`, `lang="he"`)
- **Dark navy masthead** with Secular One logo font and orange dot accent (#FF6B35)
- **White category navigation bar** with hover underline effects
- **Card-based layouts** with hover animations
- **Mobile-first** responsive design

## Project Structure

```
israelis-nl-complete/
├── api/                             # Article Management API
│   ├── index.js                     # Express server + route handlers
│   ├── github.js                    # GitHub API helper (read/write articles.json)
│   ├── validate.js                  # Article schema validation
│   └── package.json                 # API dependencies (express, dotenv)
├── content/
│   ├── articles/articles.json       # 18 sample articles in Hebrew
│   ├── personas/personas.json       # 12 AI editorial personas
│   └── municipalities/              # 25 Dutch city definitions
├── docs/
│   └── api-spec.md                  # Full API specification
├── public/images/
│   ├── articles/                    # Article placeholder SVGs
│   └── personas/                    # Persona avatar SVGs
├── src/
│   ├── app/
│   │   ├── layout.tsx               # Root layout (RTL, fonts)
│   │   ├── page.tsx                 # Homepage
│   │   ├── globals.css              # Theme variables, styles
│   │   ├── about/page.tsx           # About page
│   │   ├── team/page.tsx            # Team/reporters page
│   │   ├── article/[slug]/page.tsx  # Article detail page
│   │   ├── category/[id]/page.tsx   # Category listing page
│   │   └── city/[id]/page.tsx       # City/municipality page
│   ├── components/
│   │   ├── Header.tsx               # Sticky header with masthead + nav
│   │   ├── Footer.tsx               # Site footer
│   │   ├── ArticleCard.tsx          # Card component (large/medium/small)
│   │   ├── CategorySection.tsx      # Homepage category block
│   │   ├── Sidebar.tsx              # Desktop sidebar (most read, city links)
│   │   ├── Newsletter.tsx           # Newsletter signup component
│   │   └── ShareButtons.tsx         # WhatsApp, Facebook, X share
│   ├── lib/
│   │   ├── data.ts                  # Data access functions
│   │   └── categories.ts            # Category definitions with colors
│   └── types/index.ts               # TypeScript interfaces
├── .node-version                    # Node.js version for Render
├── render.yaml                      # Render deployment config (site + API)
└── next.config.ts                   # Next.js config (static export)
```

## Content

### Categories (14)

Politics, Housing, Finance, Netherlands-Israel, Community, Municipal, Business, Education, Healthcare, Transport, Culture, Sport, Weather, Guide

### AI Editorial Personas (8)

All reporters are transparent AI personas — not pretending to be human. Names use Hebrew editorial titles, not human-sounding names.

**Active (Phase 1):**
| Persona | Hebrew Name | Beat |
|---|---|---|
| The Policy Analyst | הפרשן הפוליטי | Dutch politics, coalition dynamics, legislation |
| The Community Reporter | כתב הקהילה | Israeli/Jewish community life, events, practical expat topics |
| The City Beat | כתב העיר | Municipal news, local government, neighborhoods |

**Coming Soon (Phase 2):**
| Persona | Hebrew Name | Beat |
|---|---|---|
| The Economy Desk | שולחן הכלכלה | Business, startups, tax, housing market |
| The Culture Editor | עורכת התרבות | Arts, food, lifestyle, exhibitions |
| The Sports Reporter | כתב הספורט | Eredivisie, Israeli athletes in NL, F1 Zandvoort |
| The Food Reporter | כתבת האוכל | Restaurants, cafes, Israeli food in NL |
| The Leisure Reporter | כתבת הפנאי | Weekend activities, day trips, family outings |

**Human oversight:** A human editor oversees all AI-generated content before publication.

### Sample Articles (18)

Covers politics, housing, community, municipal, culture, and sport categories with realistic Dutch news content written in Hebrew.

## Pages

| Page | Route | Description |
|---|---|---|
| Homepage | `/` | Hero article, breaking news ticker, category sections, newsletter, sidebar |
| Article | `/article/[slug]` | Full article with persona byline, AI disclosure, sources, related articles |
| Category | `/category/[id]` | Filtered article listing by category |
| City | `/city/[id]` | Articles filtered by municipality (25 cities) |
| Team | `/team` | AI editorial personas with human editor section |
| About | `/about` | About the project, editorial policy, AI transparency, contact |

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build static site
npm run build

# Output is in the `out/` directory
```

## Article Management API

A Node.js/Express API that manages articles by reading/writing `articles.json` via the GitHub API. Commits trigger automatic redeployment on Render.

**Endpoints:**

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/articles` | List all articles |
| `GET` | `/api/articles/:slug` | Get single article |
| `POST` | `/api/articles` | Create article |
| `PUT` | `/api/articles/:slug` | Update article (partial) |
| `DELETE` | `/api/articles/:slug` | Delete article |

All requests require `X-API-Key` header. See `docs/api-spec.md` for full specification.

**Local development:**
```bash
cd api
cp .env.example .env   # Fill in your values
npm install
npm run dev
```

## Deployment (Render)

Two services configured in `render.yaml`:

**1. Static Site (israelis.nl)**
- **Build command:** `npm run build`
- **Publish directory:** `out`

**2. Article API**
- **Root directory:** `api/`
- **Start command:** `node index.js`
- **Environment variables:** `API_KEY`, `GITHUB_TOKEN`, `GITHUB_REPO`

See `render.yaml` for full configuration.

## Key Design Decisions

1. **Secular One font for logo** — matches the israelis.nl brand identity with the distinctive orange dot
2. **Hebrew editorial titles** — personas use titles like "הפרשן הפוליטי" instead of human-sounding names, signaling transparency
3. **AI-first transparency** — every article, every byline, the team page, and the about page make the AI nature clear
4. **Static export** — fast loading, CDN-friendly, no server needed
5. **WhatsApp-first sharing** — primary distribution channel for the Israeli community
