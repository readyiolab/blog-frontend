import { useParams } from "react-router-dom";
import PublicLayout from "@/components/PublicLayout";
import SEOHead from "@/components/SEOHead";
import { staticPages } from "@/lib/seo";
import { policyContent } from "@/data/TrustPolicies";

const StaticPage = ({ pageSlug: propPageSlug }: { pageSlug?: string } = {}) => {
  const params = useParams();
  const pageSlug = propPageSlug || params.pageSlug;
  const page = pageSlug ? staticPages[pageSlug as keyof typeof staticPages] : null;

  if (!page) {
    return (
      <PublicLayout>
        <div className="mx-auto max-w-7xl px-4 py-16 text-center">
          <h1 className="text-3xl font-bold">Page not found</h1>
        </div>
      </PublicLayout>
    );
  }

  const customContent = pageSlug ? policyContent[pageSlug] : null;

  return (
    <PublicLayout>
      <SEOHead title={page.title} description={page.description} path={`/${pageSlug}`} />
      <section className="mx-auto max-w-4xl px-4 py-16">
        <div className="mb-10 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">Company Information</p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{page.heading}</h1>
        </div>

        <div className="bg-card border rounded-3xl p-8 md:p-12 shadow-sm min-h-[400px]">
          {customContent ? (
            <div className="space-y-6 text-foreground">
              {customContent}
            </div>
          ) : (
            <p className="text-lg leading-relaxed text-muted-foreground">{page.description}</p>
          )}
        </div>
      </section>
    </PublicLayout>
  );
};

export default StaticPage;
