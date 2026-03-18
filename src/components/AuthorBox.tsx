import { Twitter, Facebook, Linkedin, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PublicArticle } from "@/types/content";

interface AuthorBoxProps {
    article: PublicArticle;
}

const AuthorBox = ({ article }: AuthorBoxProps) => {
    const authorName = [article.first_name, article.last_name].filter(Boolean).join(" ") || article.username || "Beans News Desk";

    return (
        <div className="my-12 p-8 rounded-2xl border border-border bg-muted/20 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left transition-all hover:bg-muted/30">
            <div className="h-24 w-24 rounded-full overflow-hidden bg-primary/10 border-2 border-primary/20 shrink-0">
                {article.author_image ? (
                    <img src={article.author_image} alt={authorName} className="h-full w-full object-cover" />
                ) : (
                    <div className="h-full w-full flex items-center justify-center text-3xl font-bold text-primary">
                        {authorName.charAt(0)}
                    </div>
                )}
            </div>

            <div className="space-y-4 flex-1">
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">About the Author</p>
                    <h3 className="text-2xl font-bold">{authorName}</h3>
                </div>

                <p className="text-muted-foreground leading-relaxed italic">
                    {article.author_bio || "Dedicated journalist committed to delivering verified, high-impact news stories for the Beans News community."}
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
                    {article.twitter_url && (
                        <Button variant="outline" size="icon" className="rounded-full h-9 w-9" onClick={() => window.open(article.twitter_url, '_blank')}>
                            <Twitter className="h-4 w-4" />
                        </Button>
                    )}
                    {article.facebook_url && (
                        <Button variant="outline" size="icon" className="rounded-full h-9 w-9" onClick={() => window.open(article.facebook_url, '_blank')}>
                            <Facebook className="h-4 w-4" />
                        </Button>
                    )}
                    {article.linkedin_url && (
                        <Button variant="outline" size="icon" className="rounded-full h-9 w-9" onClick={() => window.open(article.linkedin_url, '_blank')}>
                            <Linkedin className="h-4 w-4" />
                        </Button>
                    )}
                    <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
                        <Globe className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AuthorBox;
