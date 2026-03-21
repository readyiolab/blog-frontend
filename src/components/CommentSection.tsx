import { useEffect, useState } from "react";
import { commentService } from "@/services/commentService";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { MessageCircle, User } from "lucide-react";

interface Comment {
    id: number;
    article_id: number;
    user_id: number;
    comment_text: string;
    created_at: string;
    username?: string;
    first_name?: string;
    last_name?: string;
}

interface CommentSectionProps {
    articleId: number;
}

const CommentSection = ({ articleId }: CommentSectionProps) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState("");
    const [guestName, setGuestName] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const loadComments = async () => {
            try {
                const response = await commentService.getForArticle(articleId);
                setComments(response.data || []);
            } catch (error) {
                console.error("Failed to load comments:", error);
            } finally {
                setLoading(false);
            }
        };

        void loadComments();
    }, [articleId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        setSubmitting(true);
        try {
            const content = token 
                ? newComment.trim() 
                : `${guestName.trim() || 'Guest'}: ${newComment.trim()}`;
                
            await commentService.addComment({ articleId, content });
            setNewComment("");
            if(!token) setGuestName("");
            
            // Reload comments to show the new one immediately
            const response = await commentService.getForArticle(articleId);
            setComments(response.data || []);
            
            toast.success("Comment posted successfully!");
        } catch {
            toast.error("Failed to post comment");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="mt-16 border-t pt-10">
            <div className="flex items-center gap-2 mb-8">
                <MessageCircle className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">Comments ({comments.length})</h2>
            </div>

            <div className="bg-muted/30 rounded-2xl p-6 mb-10">
                <h3 className="font-bold mb-4">Leave a Reply</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {!token && (
                        <input
                            type="text"
                            placeholder="Your Name (Optional)"
                            value={guestName}
                            onChange={(e) => setGuestName(e.target.value)}
                            className="w-full h-11 rounded-md border border-input bg-white px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                            disabled={submitting}
                        />
                    )}
                    <Textarea
                        placeholder="What are your thoughts on this story?"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="min-h-[120px] bg-white border-border"
                        disabled={submitting}
                    />
                    <div className="flex justify-end">
                        <Button type="submit" disabled={submitting || !newComment.trim()}>
                            {submitting ? "Posting..." : "Post Comment"}
                        </Button>
                    </div>
                </form>
            </div>

            <div className="space-y-8">
                {loading ? (
                    <div className="text-center py-10">Loading comments...</div>
                ) : comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment.id} className="flex gap-4">
                            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                                <User className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div className="space-y-1 flex-1">
                                <div className="flex items-center justify-between">
                                    <span className="font-bold text-sm">
                                        {comment.first_name ? `${comment.first_name} ${comment.last_name || ""}` : comment.username || "Guest"}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        {new Date(comment.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-muted-foreground leading-relaxed text-sm">
                                    {comment.comment_text}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-20 border-2 border-dashed rounded-2xl">
                        <p className="text-muted-foreground italic">No comments yet. Be the first to share your thoughts!</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default CommentSection;
