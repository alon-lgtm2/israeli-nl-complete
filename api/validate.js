const CATEGORIES = [
  "politics",
  "housing",
  "finance",
  "netherlands-israel",
  "community",
  "municipal",
  "business",
  "education",
  "healthcare",
  "transport",
  "culture",
  "sport",
  "weather",
  "guide",
  "youth",
];

const PUBLISHING_MODES = [
  "automated",
  "editor-push",
  "editor-request",
  "human-written",
];

const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function validateArticle(data, { partial = false } = {}) {
  const errors = [];

  const requiredFields = [
    "title",
    "slug",
    "summary",
    "body",
    "category",
    "date",
    "tags",
    "sources",
    "aiDisclosure",
    "publishingMode",
  ];

  if (!partial) {
    for (const field of requiredFields) {
      if (data[field] === undefined || data[field] === null || data[field] === "") {
        errors.push(`Missing required field: ${field}`);
      }
    }
  }

  if (data.slug !== undefined) {
    if (typeof data.slug !== "string" || !SLUG_REGEX.test(data.slug)) {
      errors.push("slug must be a lowercase URL-friendly string (e.g. my-article-title)");
    }
  }

  if (data.category !== undefined) {
    if (!CATEGORIES.includes(data.category)) {
      errors.push(`Invalid category. Must be one of: ${CATEGORIES.join(", ")}`);
    }
  }

  if (data.publishingMode !== undefined) {
    if (!PUBLISHING_MODES.includes(data.publishingMode)) {
      errors.push(`Invalid publishingMode. Must be one of: ${PUBLISHING_MODES.join(", ")}`);
    }
  }

  if (data.date !== undefined) {
    if (isNaN(Date.parse(data.date))) {
      errors.push("date must be a valid ISO 8601 string");
    }
  }

  if (data.tags !== undefined) {
    if (!Array.isArray(data.tags) || data.tags.length === 0) {
      errors.push("tags must be a non-empty array of strings");
    }
  }

  if (data.sources !== undefined) {
    if (!Array.isArray(data.sources) || data.sources.length === 0) {
      errors.push("sources must be a non-empty array of {name, url} objects");
    } else {
      for (const [i, src] of data.sources.entries()) {
        if (!src.name || !src.url) {
          errors.push(`sources[${i}] must have both name and url`);
        }
      }
    }
  }

  if (data.isBreaking !== undefined && typeof data.isBreaking !== "boolean") {
    errors.push("isBreaking must be a boolean");
  }

  if (data.isFeatured !== undefined && typeof data.isFeatured !== "boolean") {
    errors.push("isFeatured must be a boolean");
  }

  return errors;
}

module.exports = { validateArticle };
