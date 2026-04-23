// Script to fetch the latest sitemap from the API and save it to public/
// This runs automatically before each build via the "prebuild" npm script.

const https = require('https');
const fs = require('fs');
const path = require('path');

const SITEMAP_URL = 'https://api.beansnews.com/sitemap.xml';
const OUTPUT_PATH = path.join(__dirname, '..', 'public', 'sitemap.xml');

const STATIC_PAGES = [
  '/about-us',
  '/contact-us',
  '/privacy-policy',
  '/disclaimer',
  '/editorial-policy',
  '/terms-and-conditions',
  '/write-for-us'
];

https.get(SITEMAP_URL, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    // Generate XML for static pages
    const staticUrlsXml = STATIC_PAGES.map(page => `
  <url>
    <loc>https://beansnews.com${page}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`).join('');

    // Correct URLs by removing 'api.' subdomain and inject static pages
    const correctedData = data
      .replaceAll('api.beansnews.com', 'beansnews.com')
      .replaceAll('https://api.beansnews.com', 'https://beansnews.com')
      .replace('</urlset>', `${staticUrlsXml}\n</urlset>`);

    fs.writeFileSync(OUTPUT_PATH, correctedData);
    console.log('✅ sitemap.xml fetched, corrected, and static pages added successfully');
  });
}).on('error', (err) => {
  console.error('⚠️ Failed to fetch sitemap:', err.message);
  process.exit(0);
});
