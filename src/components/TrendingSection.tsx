import { trendingStories } from "@/data/staticNews";

const TrendingSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="font-headline text-2xl font-bold mb-5 pb-2 border-b-2 border-foreground inline-block">
        TRENDING
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
        {trendingStories.map((story, i) => (
          <div
            key={story.id}
            className="flex items-start gap-3 py-3 border-b border-border last:border-b-0"
          >
            <span className="text-2xl font-headline font-bold text-muted-foreground/40 flex-shrink-0 w-8">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <span className="text-xs font-semibold text-accent uppercase tracking-wide">
                {story.category}
              </span>
              <h3 className="font-body text-sm font-semibold leading-snug mt-1 hover:text-accent transition-colors cursor-pointer">
                {story.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingSection;
