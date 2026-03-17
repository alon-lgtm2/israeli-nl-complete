require("dotenv").config();
const express = require("express");
const { getArticles, saveArticles } = require("./github");
const { validateArticle } = require("./validate");

const app = express();
app.use(express.json());

// --- Auth middleware ---

function auth(req, res, next) {
  const key = req.headers["x-api-key"];
  if (!key || key !== process.env.API_KEY) {
    return res.status(401).json({ error: "Invalid or missing API key" });
  }
  next();
}

app.use("/api", auth);

// --- Routes ---

// List all articles
app.get("/api/articles", async (req, res) => {
  try {
    const { articles } = await getArticles();
    res.json({ count: articles.length, articles });
  } catch (err) {
    console.error("GET /api/articles error:", err.message);
    res.status(500).json({ error: "Failed to fetch articles" });
  }
});

// Get single article by slug
app.get("/api/articles/:slug", async (req, res) => {
  try {
    const { articles } = await getArticles();
    const article = articles.find((a) => a.slug === req.params.slug);
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.json(article);
  } catch (err) {
    console.error("GET /api/articles/:slug error:", err.message);
    res.status(500).json({ error: "Failed to fetch article" });
  }
});

// Create article
app.post("/api/articles", async (req, res) => {
  try {
    const errors = validateArticle(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join("; ") });
    }

    const { articles, sha } = await getArticles();

    if (articles.find((a) => a.slug === req.body.slug)) {
      return res.status(409).json({ error: "Slug already exists" });
    }

    const article = {
      title: req.body.title,
      slug: req.body.slug,
      summary: req.body.summary,
      body: req.body.body,
      category: req.body.category,
      date: req.body.date,
      tags: req.body.tags,
      sources: req.body.sources,
      aiDisclosure: req.body.aiDisclosure,
      publishingMode: req.body.publishingMode,
      isBreaking: req.body.isBreaking || false,
      isFeatured: req.body.isFeatured || false,
    };

    // Optional fields
    if (req.body.persona) article.persona = req.body.persona;
    if (req.body.personaAvatar) article.personaAvatar = req.body.personaAvatar;
    if (req.body.region) article.region = req.body.region;
    if (req.body.imageUrl) article.imageUrl = req.body.imageUrl;
    if (req.body.imageAlt) article.imageAlt = req.body.imageAlt;
    if (req.body.imageCredit) article.imageCredit = req.body.imageCredit;

    articles.push(article);
    await saveArticles(articles, sha, `[api] Add article: ${article.slug}`);

    res.status(201).json(article);
  } catch (err) {
    console.error("POST /api/articles error:", err.message);
    res.status(500).json({ error: "Failed to create article" });
  }
});

// Update article
app.put("/api/articles/:slug", async (req, res) => {
  try {
    const errors = validateArticle(req.body, { partial: true });
    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join("; ") });
    }

    const { articles, sha } = await getArticles();
    const index = articles.findIndex((a) => a.slug === req.params.slug);
    if (index === -1) {
      return res.status(404).json({ error: "Article not found" });
    }

    // Prevent slug mutation
    const updates = { ...req.body };
    delete updates.slug;

    articles[index] = { ...articles[index], ...updates };
    await saveArticles(
      articles,
      sha,
      `[api] Update article: ${req.params.slug}`
    );

    res.json(articles[index]);
  } catch (err) {
    console.error("PUT /api/articles/:slug error:", err.message);
    res.status(500).json({ error: "Failed to update article" });
  }
});

// Delete article
app.delete("/api/articles/:slug", async (req, res) => {
  try {
    const { articles, sha } = await getArticles();
    const index = articles.findIndex((a) => a.slug === req.params.slug);
    if (index === -1) {
      return res.status(404).json({ error: "Article not found" });
    }

    articles.splice(index, 1);
    await saveArticles(
      articles,
      sha,
      `[api] Delete article: ${req.params.slug}`
    );

    res.json({ message: "Article deleted", slug: req.params.slug });
  } catch (err) {
    console.error("DELETE /api/articles/:slug error:", err.message);
    res.status(500).json({ error: "Failed to delete article" });
  }
});

// --- Start ---

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`israelis.nl API running on port ${PORT}`);
});
