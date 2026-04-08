const https = require("https");
const fs = require("fs");
const path = require("path");

const API_BASE = "https://api.beansnews.com/api";
const OUTPUT_PATH = path.join(__dirname, "..", "src", "data", "generated", "homepageData.ts");
const INDEX_HTML_PATH = path.join(__dirname, "..", "index.html");

const endpoints = {
  featured: `${API_BASE}/articles/featured`,
  trending: `${API_BASE}/articles/trending`,
  latest: `${API_BASE}/articles?limit=48`,
  categories: `${API_BASE}/categories`,
};

const fetchJson = (url) =>
  new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode && res.statusCode >= 400) {
          reject(new Error(`Request failed for ${url}: ${res.statusCode}`));
          res.resume();
          return;
        }

        let raw = "";
        res.on("data", (chunk) => {
          raw += chunk;
        });
        res.on("end", () => {
          try {
            resolve(JSON.parse(raw));
          } catch (error) {
            reject(error);
          }
        });
      })
      .on("error", reject);
  });

const writeOutput = (payload) => {
  const fileContents = `import type { PublicArticle, PublicCategory } from "@/types/content";

export type HomepageData = {
  generatedAt: string | null;
  featured: PublicArticle[];
  trending: PublicArticle[];
  latest: PublicArticle[];
  categories: PublicCategory[];
};

const homepageData: HomepageData = ${JSON.stringify(payload, null, 2)};

export default homepageData;
`;

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, fileContents);
};

const optimizeCloudinary = (url, width) => {
  if (!url || typeof url !== "string") return "";
  if (!url.includes("cloudinary.com") || !url.includes("/upload/")) return url;
  const parts = url.split("/upload/");
  const transform = `f_auto,q_auto,w_${width},c_fill`;
  return `${parts[0]}/upload/${transform}/${parts[1]}`;
};

const updateIndexHtmlLcpPreload = (leadImageUrl) => {
  if (!fs.existsSync(INDEX_HTML_PATH)) return;

  const marker = "<!--LCP_PRELOAD-->";
  const html = fs.readFileSync(INDEX_HTML_PATH, "utf8");
  if (!html.includes(marker)) return;

  let replacement = "";
  if (leadImageUrl) {
    // Preload the likely LCP image so it starts downloading before JS renders it.
    const preloadHref = optimizeCloudinary(leadImageUrl, 1200);
    const srcsetWidths = [480, 800, 1200];
    const srcset = srcsetWidths
      .map((w) => {
        const optimizedUrl = optimizeCloudinary(leadImageUrl, w);
        return optimizedUrl ? `${optimizedUrl} ${w}w` : "";
      })
      .filter(Boolean)
      .join(", ");

    const sizes = "(max-width: 1024px) 100vw, 1200px";

    replacement = `  <link rel="preload" as="image" href="${preloadHref}" imagesrcset="${srcset}" imagesizes="${sizes}">`;
  }

  fs.writeFileSync(INDEX_HTML_PATH, html.replace(marker, replacement));
};

Promise.all([
  fetchJson(endpoints.featured),
  fetchJson(endpoints.trending),
  fetchJson(endpoints.latest),
  fetchJson(endpoints.categories),
])
  .then(([featured, trending, latest, categories]) => {
    const featuredList = featured.data || [];
    writeOutput({
      generatedAt: new Date().toISOString(),
      featured: featuredList,
      trending: trending.data || [],
      latest: latest.data || [],
      categories: categories.data || [],
    });

    const leadImageUrl =
      (featuredList[0] && featuredList[0].featured_image) ||
      (latest.data && latest.data[0] && latest.data[0].featured_image) ||
      "";
    updateIndexHtmlLcpPreload(leadImageUrl);
    console.log("Homepage data updated successfully");
  })
  .catch((error) => {
    console.error("Failed to fetch homepage data:", error.message);
    process.exit(0);
  });
