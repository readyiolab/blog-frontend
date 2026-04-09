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
    // Correct URLs by removing 'api.' subdomain
    const correctedData = data
      .replaceAll('api.beansnews.com', 'beansnews.com')
      .replaceAll('https://api.beansnews.com', 'https://beansnews.com');
      
    fs.writeFileSync(OUTPUT_PATH, correctedData);
    console.log('✅ sitemap.xml fetched and corrected successfully');
  });
}).on('error', (err) => {
  console.error('⚠️ Failed to fetch sitemap:', err.message);
  process.exit(0);
});
