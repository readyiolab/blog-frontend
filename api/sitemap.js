export default async function handler(request, response) {
  try {
    const res = await fetch("https://api.beansnews.com/sitemap.xml");
    let xml = await res.text();
    
    // Correct URLs by removing 'api.' subdomain from loc tags
    xml = xml.replaceAll('api.beansnews.com', 'beansnews.com');
    xml = xml.replaceAll('https://api.beansnews.com', 'https://beansnews.com');

    // Set headers explicitly for XML
    response.setHeader("Content-Type", "application/xml");
    response.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
    
    response.status(200).send(xml);
  } catch (error) {
    console.error("Sitemap fetch error:", error);
    response.status(500).send("Error fetching sitemap");
  }
}
