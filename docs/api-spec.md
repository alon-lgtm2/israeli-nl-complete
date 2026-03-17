# israelis.nl Article Management API — Specification

**Version 1.0 | March 2026**

---

## Overview

External Node.js/Express API service hosted on Render (free tier) that manages articles on the israelis.nl website. The API modifies `articles.json` in the GitHub repository via the GitHub API, triggering automatic redeployment on Render.

## Architecture

```
API Call → Validate request → Fetch articles.json from GitHub → Modify → Commit back → Render auto-deploys
```

- **Runtime:** Node.js + Express
- **Hosting:** Render (free tier web service)
- **Storage:** `content/articles/articles.json` in the GitHub repository
- **GitHub Access:** Personal Access Token (stored as environment variable)
- **Consumer:** Automated programmatic process

## Authentication

All requests require an API key in the `X-API-Key` header.

```
X-API-Key: <your-api-key>
```

The API key is stored as an environment variable (`API_KEY`) on Render.

Unauthorized requests receive a `401` response.

---

## Endpoints

### `GET /api/articles`

List all articles.

**Response:** `200 OK`

```json
{
  "count": 18,
  "articles": [ ... ]
}
```

---

### `GET /api/articles/:slug`

Get a single article by slug.

**Response:** `200 OK` — article object

**Response:** `404 Not Found` — if slug doesn't exist

---

### `POST /api/articles`

Create a new article.

**Response:** `201 Created` — created article object

**Response:** `400 Bad Request` — validation error

**Response:** `409 Conflict` — slug already exists

---

### `PUT /api/articles/:slug`

Update an existing article. Accepts partial updates (only fields provided are updated).

**Response:** `200 OK` — updated article object

**Response:** `404 Not Found` — if slug doesn't exist

---

### `DELETE /api/articles/:slug`

Delete an article by slug.

**Response:** `200 OK`

```json
{
  "message": "Article deleted",
  "slug": "nsc-coalition-crisis-immigration"
}
```

**Response:** `404 Not Found` — if slug doesn't exist

---

## Article Schema

| Field | Type | Required (POST) | Notes |
|---|---|---|---|
| `title` | string | yes | Article headline |
| `slug` | string | yes | URL-friendly identifier (e.g. `nsc-coalition-crisis-immigration`). Immutable after creation. |
| `summary` | string | yes | Short article summary |
| `body` | string | yes | Full article content in Markdown |
| `category` | string | yes | One of the defined categories (see below) |
| `persona` | string | no | Hebrew name of the authoring persona. Omit for unbylined content (newsflashes, weather, transit). |
| `personaAvatar` | string | no | Path to persona avatar SVG (e.g. `/images/personas/policy-analyst.svg`) |
| `date` | string (ISO 8601) | yes | Publication datetime (e.g. `2026-03-16T08:30:00Z`) |
| `region` | string | no | Municipality slug (e.g. `amsterdam`, `den-haag`). Optional for national news. |
| `tags` | string[] | yes | Array of Hebrew tags for categorization |
| `imageUrl` | string | no | Path or URL to article image |
| `imageAlt` | string | no | Image alt text (Hebrew) |
| `imageCredit` | string | no | Image source credit |
| `sources` | `{name: string, url: string}[]` | yes | Attribution links to original reporting |
| `isBreaking` | boolean | no | Default: `false` |
| `isFeatured` | boolean | no | Default: `false` |
| `aiDisclosure` | string | yes | AI transparency label (e.g. `כתבה זו נוצרה באמצעות בינה מלאכותית בפיקוח עורך אנושי`) |
| `publishingMode` | string | yes | One of: `automated`, `editor-push`, `editor-request`, `human-written` |

### Categories

| Slug | Hebrew | Description |
|---|---|---|
| `politics` | פוליטיקה | Dutch government, coalition, elections |
| `housing` | דיור ונדל"ן | Housing market, rentals, mortgage |
| `finance` | כלכלה ומיסים | Taxes, cost of living, toeslagen |
| `netherlands-israel` | הולנד-ישראל | Dutch-Israeli relations, antisemitism |
| `community` | קהילה | Israeli/Jewish community events |
| `municipal` | מוניציפלי | City-level news |
| `business` | עסקים וכלכלה | Economy, startups, job market |
| `education` | חינוך | Schools, universities, childcare |
| `healthcare` | בריאות | Healthcare system, public health |
| `transport` | תחבורה ותשתיות | Trains, transit, Schiphol |
| `culture` | תרבות ופנאי | Arts, events, exhibitions, food |
| `sport` | ספורט | Sports (when relevant) |
| `weather` | מזג אוויר וטבע | Weather, climate, environment |
| `guide` | מדריך מעשי | How-to content, bureaucracy guides |
| `youth` | צעירים | Youth section (future) |

---

## Error Responses

All errors follow this format:

```json
{
  "error": "Description of the error"
}
```

| Status | Meaning |
|---|---|
| `400` | Validation error — missing or invalid fields |
| `401` | Invalid or missing API key |
| `404` | Article not found |
| `409` | Slug already exists (POST only) |
| `500` | Internal server error (GitHub API failure, etc.) |

---

## Environment Variables

| Variable | Description |
|---|---|
| `API_KEY` | Secret key for authenticating API requests |
| `GITHUB_TOKEN` | GitHub Personal Access Token with repo write access |
| `GITHUB_REPO` | Repository in `owner/repo` format (e.g. `user/israelis-nl-complete`) |
| `GITHUB_BRANCH` | Target branch (default: `main`) |
| `ARTICLES_PATH` | Path to articles file in repo (default: `content/articles/articles.json`) |

---

## Deployment

1. Create a new Web Service on Render (free tier)
2. Connect to the API's GitHub repository
3. Set environment variables
4. Deploy — service auto-starts on port `10000` (Render default)

The main israelis.nl site auto-redeploys when the API commits changes to `articles.json`.

---

## Rate Limiting

No rate limiting at launch. The API is consumed by a single automated process. Rate limiting can be added if needed.

---

## Future Considerations

- Batch operations (create/update multiple articles in a single commit)
- Image upload endpoint
- Webhook notifications on publish
- Article versioning / history
