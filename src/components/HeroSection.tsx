import heroImg from "@/assets/hero-news.jpg";
import sidebarHealth from "@/assets/sidebar-health.jpg";
import sidebarMovie from "@/assets/sidebar-movie.jpg";
import newsBangladesh from "@/assets/news-bangladesh.jpg";
import newsCricket from "@/assets/news-cricket.jpg";
import newsTechie from "@/assets/news-techie.jpg";
import {
  heroArticle,
  heroQuote,
  bulletHeadlines,
  bottomHeroStories,
  sidebarStories,
} from "@/data/staticNews";

const HeroSection = () => {
  const bottomImages = [newsBangladesh, newsCricket, newsTechie];
  const sideImages = [sidebarHealth, sidebarMovie];

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column - headline + bullets */}
        <div className="lg:col-span-4 flex flex-col justify-between">
          <div>
            <h2 className="font-headline text-2xl md:text-3xl font-bold leading-tight hover:text-accent transition-colors cursor-pointer">
              {heroArticle.title}
            </h2>
            <p className="text-muted-foreground mt-3 text-base leading-relaxed">
              {heroArticle.excerpt}
            </p>
          </div>

          <div className="mt-6 space-y-4 border-t border-border pt-4">
            {bulletHeadlines.map((article) => (
              <div key={article.id} className="flex items-start gap-2">
                <span className="inline-block w-2 h-2 mt-2 rounded-sm bg-accent flex-shrink-0" />
                <h3 className="font-headline text-lg font-semibold leading-snug hover:text-accent transition-colors cursor-pointer">
                  {article.title}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Center column - hero image + quote */}
        <div className="lg:col-span-5">
          <div className="overflow-hidden">
            <img
              src={heroImg}
              alt="News"
              className="w-full h-64 md:h-80 object-cover"
              loading="lazy"
            />
          </div>
          <div className="bg-quote-bg p-6 mt-0">
            <div className="flex items-start gap-3">
              <span className="text-accent text-4xl font-headline leading-none">"</span>
              <p className="font-headline text-lg md:text-xl font-semibold text-center flex-1 leading-snug">
                {heroQuote.quoteText}
              </p>
              <span className="text-accent text-4xl font-headline leading-none">"</span>
            </div>
          </div>
        </div>

        {/* Right column - sidebar stories */}
        <div className="lg:col-span-3 space-y-5 border-l-0 lg:border-l border-border lg:pl-5">
          {sidebarStories.map((story, i) => (
            <div key={story.id}>
              <img
                src={sideImages[i]}
                alt={story.title}
                className="w-full h-40 object-cover"
                loading="lazy"
              />
              <h3 className="font-headline text-base font-semibold mt-2 leading-snug hover:text-accent transition-colors cursor-pointer">
                {story.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom row - 3 stories with images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6 pt-6 border-t border-border">
        {bottomHeroStories.map((story, i) => (
          <div key={story.id} className="flex gap-3">
            <img
              src={bottomImages[i]}
              alt={story.title}
              className="w-24 h-20 object-cover flex-shrink-0"
              loading="lazy"
            />
            <div>
              <h3 className="font-headline text-sm font-semibold leading-snug hover:text-accent transition-colors cursor-pointer">
                {story.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
