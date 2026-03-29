import fs from 'fs';
import https from 'https';
import path from 'path';

const url = 'https://api.beansnews.com/sitemap.xml';
const dest = path.resolve('public', 'sitemap.xml');

console.log('Fetching sitemap from API...');

https.get(url, (res) => {
  if (res.statusCode !== 200) {
    console.error(`Failed to fetch sitemap: HTTP ${res.statusCode}`);
    process.exit(0); // Exit 0 so build doesn't fail if API is down
  }

  const file = fs.createWriteStream(dest);
  res.pipe(file);

  file.on('finish', () => {
    file.close();
    console.log('Successfully saved sitemap to public/sitemap.xml');
  });
}).on('error', (err) => {
  console.error('Error fetching sitemap:', err.message);
  process.exit(0); // Exit 0 so build doesn't fail
});
