// Vercel Edge Middleware for Dynamic Open Graph Injection

export const config = {
  matcher: [
    '/((?!api|admin|assets|_next|favicon.ico|sitemap.xml|robots.txt|logo.webp).*)',
  ],
};

export default async function middleware(request: Request) {
  // Bypass if this is an internal fetch call to prevent loops
  if (request.headers.get('x-middleware-bypass')) {
    return fetch(request);
  }

  const url = new URL(request.url);
  const pathParts = url.pathname.split('/').filter(Boolean);

  // Handle Article Routes: /category/article-slug
  if (pathParts.length === 2 && !['assets', 'api', 'admin'].includes(pathParts[0])) {
    const articleSlug = pathParts[1];
    
    try {
      const htmlUrl = new URL(url.origin + '/index.html');
      const bypassReq = new Request(htmlUrl.toString(), {
        headers: {
          ...Object.fromEntries(request.headers),
          'x-middleware-bypass': '1'
        }
      });
      
      const htmlRes = await fetch(bypassReq);

      if (htmlRes.ok) {
        let html = await htmlRes.text();

        // Fetch Article Meta from backend
        const apiRes = await fetch(`https://api.beansnews.com/api/articles/slug/${articleSlug}`);
        
        if (apiRes.ok) {
          const result = await apiRes.json();
          const article = result.data;

          if (article) {
            const title = article.meta_title || `${article.title} | Beans News`;
            let description = article.meta_description || article.excerpt || article.title;
            description = description.replace(/"/g, '&quot;');
            const image = article.featured_image || '';

            // Inject SEO Tags
            html = html.replace(
              '<title>Beans News - Breaking US & Global News Today</title>',
              `<title>${title}</title>`
            );
            
            html = html.replace(
              /<meta name="description"[\s\S]*?\/>/,
              `<meta name="description" content="${description}" />`
            );

            const ogTags = `
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  ${image ? `<meta property="og:image" content="${image}" />` : ''}
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  ${image ? `<meta name="twitter:image" content="${image}" />` : ''}
`;
            html = html.replace('</head>', `${ogTags}\n</head>`);

            return new Response(html, {
              headers: {
                'Content-Type': 'text/html; charset=utf-8',
                'Cache-Control': 'public, max-age=60, s-maxage=300'
              },
            });
          }
        } else if (apiRes.status === 404) {
          // Article not found, return 404 status with index.html content
          return new Response(html, {
            status: 404,
            headers: {
              'Content-Type': 'text/html; charset=utf-8',
              'Cache-Control': 'no-cache'
            },
          });
        }
      }
    } catch (error) {
      console.error('Edge Middleware SEO Error:', error);
    }
  }

  // Handle Category Routes: /category-slug
  const staticPages = ['about-us', 'contact-us', 'privacy-policy', 'disclaimer', 'editorial-policy', 'terms-and-conditions', 'write-for-us'];
  if (pathParts.length === 1 && !['assets', 'api', 'admin', 'favicon.ico', 'sitemap.xml', 'robots.txt', ...staticPages].includes(pathParts[0])) {
    const categorySlug = pathParts[0];
    
    try {
      const apiRes = await fetch(`https://api.beansnews.com/api/categories/slug/${categorySlug}`);
      
      if (!apiRes.ok && apiRes.status === 404) {
        const htmlUrl = new URL(url.origin + '/index.html');
        const bypassReq = new Request(htmlUrl.toString(), {
          headers: {
            ...Object.fromEntries(request.headers),
            'x-middleware-bypass': '1'
          }
        });
        const htmlRes = await fetch(bypassReq);
        
        if (htmlRes.ok) {
          const html = await htmlRes.text();
          return new Response(html, {
            status: 404,
            headers: {
              'Content-Type': 'text/html; charset=utf-8',
              'Cache-Control': 'no-cache'
            },
          });
        }
      }
    } catch (error) {
      console.error('Edge Middleware Category Validation Error:', error);
    }
  }

  // Pass-through for any unmatched or failed paths
  const bypassReq = new Request(request);
  bypassReq.headers.set('x-middleware-bypass', '1');
  return fetch(bypassReq);
}
