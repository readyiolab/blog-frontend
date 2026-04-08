import { opinionArticles } from "@/data/staticNews";

const OpinionSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8 border-t border-border">
      <h2 className="font-headline text-2xl font-bold mb-5 pb-2 border-b-2 border-foreground inline-block">
        OPINION
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {opinionArticles.map((article, i) => (
          <article
            key={article.id}
            className={`${i === 0 ? "md:col-span-1 md:row-span-1" : ""}`}
          >
            <div className="bg-secondary p-5 h-full hover:bg-secondary/80 transition-colors cursor-pointer">
              <h3 className="font-headline text-xl font-bold mb-2">
                {article.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                {article.excerpt}
              </p>
              {article.author && (
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  {article.author}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default OpinionSection;
