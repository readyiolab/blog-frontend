import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { articleService } from "@/services/articleService";
import NewsletterForm from "./NewsletterForm";
import type { PublicArticle } from "@/types/content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ArticleSidebar = () => {
    const [trending, setTrending] = useState<PublicArticle[]>([]);
    const [featured, setFeatured] = useState<PublicArticle[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSidebarData = async () => {
            try {
                const [trendingRes, featuredRes] = await Promise.all([
                    articleService.getTrending(),
                    articleService.getFeatured(),
                ]);
                setTrending(trendingRes.data?.slice(0, 5) || []);
                setFeatured(featuredRes.data?.slice(0, 3) || []);
            } catch (error) {
                console.error("Failed to load sidebar data:", error);
            } finally {
                setLoading(false);
            }
        };

        void loadSidebarData();
    }, []);

    if (loading) {
        return (
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-32" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-3 w-20" />
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-8 sticky top-24">
            {/* Trending Section */}
            <section>
                <h2 className="text-lg font-bold uppercase tracking-wider border-b-2 border-primary inline-block mb-4">
                    Trending
                </h2>
                <div className="space-y-5">
                    {trending.map((story, i) => (
                        <div key={story.id} className="flex gap-4 group">
                            <span className="text-2xl font-bold text-muted-foreground/30 tabular-nums">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <div className="space-y-1">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
                                    {story.category_name}
                                </p>
                                <Link
                                    to={`/${story.category_slug || "latest-news"}/${story.slug}`}
                                    className="text-sm font-semibold leading-snug hover:text-primary transition-colors line-clamp-2"
                                >
                                    {story.title}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Section */}
            {featured.length > 0 && (
                <section>
                    <h2 className="text-lg font-bold uppercase tracking-wider border-b-2 border-primary inline-block mb-4">
                        Must Read
                    </h2>
                    <div className="space-y-6">
                        {featured.map((story) => (
                            <Link
                                key={story.id}
                                to={`/${story.category_slug || "latest-news"}/${story.slug}`}
                                className="block group"
                            >
                                {story.featured_image && (
                                    <div className="aspect-video overflow-hidden rounded-lg mb-3">
                                        <img
                                            src={story.featured_image}
                                            alt={story.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                )}
                                <h3 className="text-sm font-bold leading-tight group-hover:text-primary transition-colors">
                                    {story.title}
                                </h3>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* Newsletter Placeholder */}
            <Card className="bg-primary text-primary-foreground border-none">
                <CardHeader>
                    <CardTitle className="text-lg">Stay Updated</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-xs mb-4 opacity-90">
                        Get the latest news and insights delivered to your inbox daily.
                    </p>
                    <NewsletterForm variant="sidebar" />
                </CardContent>
            </Card>
        </div>
    );
};

export default ArticleSidebar;
