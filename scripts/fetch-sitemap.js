// Script to fetch the latest sitemap from the API and save it to public/
// This runs automatically before each build via the "prebuild" npm script.

const https = require('https');
const fs = require('fs');
const path = require('path');

const SITEMAP_URL = 'https://api.beansnews.com/sitemap.xml';
const OUTPUT_PATH = path.join(__dirname, '..', 'public', 'sitemap.xml');

https.get(SITEMAP_URL, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    fs.writeFileSync(OUTPUT_PATH, data);
    console.log('✅ sitemap.xml updated successfully');
  });
}).on('error', (err) => {
  console.error('⚠️ Failed to fetch sitemap:', err.message);
  // Don't fail the build if sitemap fetch fails — the old copy stays
  process.exit(0);
});
