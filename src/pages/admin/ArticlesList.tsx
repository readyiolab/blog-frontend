import { useEffect, useState } from "react";
import { articleService } from "@/services/articleService";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, MoreVertical, Edit, Trash2, Eye, Activity } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

export default function ArticlesList() {
    const [articles, setArticles] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchArticles = async () => {
        try {
            setIsLoading(true);
            const response = await articleService.getAll();
            if (response.success && response.data) {
                setArticles(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch articles", error);
            toast.error("Could not load latest articles from server");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this article?")) return;

        try {
            const resp = await articleService.delete(id);
            if (resp.success) {
                toast.success("Article deleted successfully");
                setArticles(articles.filter(a => a.id !== id));
            }
        } catch (e) {
            toast.error("Failed to delete article. Check permissions.");
        }
    }

    const handlePublishToggle = async (id: number) => {
        try {
            // Assuming articleService.publish toggles state internally
            const resp = await articleService.publish(id);
            if (resp.success) {
                toast.success("Article status updated");
                fetchArticles(); // Refresh strictly to get absolute DB values
            }
        } catch (e) {
            toast.error("Action denied or Server Error");
        }
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Articles Management</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-1">
                        Create, edit, and manage all your live publications.
                    </p>
                </div>

                <Link to="/admin/articles/create">
                    <Button className="gap-2 shrink-0">
                        <Plus size={16} />
                        Write Article
                    </Button>
                </Link>
            </div>

            <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-950 shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                        <TableRow>
                            <TableHead className="w-12">ID</TableHead>
                            <TableHead className="min-w-[250px]">Article Details</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Views</TableHead>
                            <TableHead>Published</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-10 text-zinc-500">
                                    Loading articles from database...
                                </TableCell>
                            </TableRow>
                        ) : articles.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-10 font-medium text-zinc-500">
                                    No articles found. Click "Write Article" to start.
                                </TableCell>
                            </TableRow>
                        ) : (
                            articles.map((article) => (
                                <TableRow key={article.id}>
                                    <TableCell className="font-mono text-xs text-zinc-500">{article.id}</TableCell>
                                    <TableCell>
                                        <div className="font-medium">{article.title}</div>
                                        <div className="text-xs text-zinc-500 flex items-center gap-2 mt-1">
                                            <span>{article.category_name || 'Uncategorized'}</span>
                                            <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700"></span>
                                            <span>By {article.author_name || 'Admin'}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                      ${article.status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                                article.status === 'draft' ? 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300' :
                                                    'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                                            {article.status || 'draft'}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-zinc-600 dark:text-zinc-400">
                                        {article.views_count?.toLocaleString() || 0}
                                    </TableCell>
                                    <TableCell className="text-zinc-600 dark:text-zinc-400 text-sm">
                                        {article.created_at ? format(new Date(article.created_at), 'MMM dd, yyyy') : '-'}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreVertical size={16} />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <Link to={`/articles/${article.slug}`}>
                                                    <DropdownMenuItem className="gap-2">
                                                        <Eye size={14} /> View Live
                                                    </DropdownMenuItem>
                                                </Link>
                                                <Link to={`/admin/articles/edit/${article.id}`}>
                                                    <DropdownMenuItem className="gap-2">
                                                        <Edit size={14} /> Edit
                                                    </DropdownMenuItem>
                                                </Link>
                                                <DropdownMenuItem className="gap-2" onClick={() => handlePublishToggle(article.id)}>
                                                    <Activity size={14} /> Toggle Publish
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="gap-2 text-red-600 focus:bg-red-50 focus:text-red-700 dark:focus:bg-red-950/50" onClick={() => handleDelete(article.id)}>
                                                    <Trash2 size={14} /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
