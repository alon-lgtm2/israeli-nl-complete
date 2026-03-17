const https = require("https");

const GITHUB_REPO = process.env.GITHUB_REPO;
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main";
const ARTICLES_PATH =
  process.env.ARTICLES_PATH || "content/articles/articles.json";

function githubRequest(method, path, body) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "api.github.com",
      path,
      method,
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "israelis-nl-api",
        "Content-Type": "application/json",
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(data));
        } else {
          reject(
            new Error(
              `GitHub API ${res.statusCode}: ${data.slice(0, 200)}`
            )
          );
        }
      });
    });

    req.on("error", reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function getArticles() {
  const file = await githubRequest(
    "GET",
    `/repos/${GITHUB_REPO}/contents/${ARTICLES_PATH}?ref=${GITHUB_BRANCH}`
  );
  const content = Buffer.from(file.content, "base64").toString("utf-8");
  return { articles: JSON.parse(content), sha: file.sha };
}

async function saveArticles(articles, sha, commitMessage) {
  const content = Buffer.from(
    JSON.stringify(articles, null, 2) + "\n"
  ).toString("base64");

  await githubRequest(
    "PUT",
    `/repos/${GITHUB_REPO}/contents/${ARTICLES_PATH}`,
    {
      message: commitMessage,
      content,
      sha,
      branch: GITHUB_BRANCH,
    }
  );
}

module.exports = { getArticles, saveArticles };
