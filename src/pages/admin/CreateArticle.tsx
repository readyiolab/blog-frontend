import { useState } from "react";
import { RichTextEditor } from "@/components/editor/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Save, FileCheck2, LayoutDashboard } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function CreateArticle() {
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    // Basic sluggify function
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);

        // Auto-generate slug
        const newSlug = newTitle
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');

        setSlug(newSlug);
    };

    const handlePublish = async () => {
        if (!title) {
            toast.error('Article Title is required');
            return;
        }

        if (!content || content === '<p></p>') {
            toast.error('Article Content cannot be empty');
            return;
        }

        try {
            setIsSubmitting(true);
            // Constructing JSON data for standard API creation
            // Assumes /api/articles needs an author_id, category_id, etc. which would naturally be handled by state or context
            const articleData = {
                title,
                slug,
                content,
                category_id: 1, // Placeholder: you would normally have a category dropdown
                excerpt: content.substring(0, 150).replace(/(<([^>]+)>)/gi, ""), // Strip HTML for excerpt
                status: 'published'
            };

            const token = localStorage.getItem('token');

            const response = await fetch('http://localhost:5000/api/articles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(articleData)
            });

            const data = await response.json();

            if (data.success) {
                toast.success('Article published successfully!');
                navigate('/'); // Or to admin dashboard
            } else {
                toast.error(data.message || 'Failed to publish article');
            }
        } catch (error) {
            console.error('Submit Error:', error);
            toast.error('Server error while saving');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
            {/* Basic Admin Header */}
            <header className="border-b bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <Link to="/">
                        <Button variant="ghost" size="icon">
                            <LayoutDashboard size={20} />
                        </Button>
                    </Link>
                    <h1 className="text-xl font-bold tracking-tight">Create New Article</h1>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" className="gap-2" onClick={() => toast.info('Draft saved locally')} disabled={isSubmitting}>
                        <Save size={16} />
                        Save Draft
                    </Button>
                    <Button className="gap-2" onClick={handlePublish} disabled={isSubmitting}>
                        <FileCheck2 size={16} />
                        {isSubmitting ? 'Publishing...' : 'Publish'}
                    </Button>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Main Editor Area */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="space-y-4">
                        <Input
                            placeholder="Article Title..."
                            value={title}
                            onChange={handleTitleChange}
                            className="text-3xl font-bold border-none bg-transparent px-0 shadow-none focus-visible:ring-0 placeholder:text-zinc-300 dark:placeholder:text-zinc-700 h-auto"
                        />
                        {slug && (
                            <p className="text-sm text-zinc-500">
                                Permalink: /articles/<span className="font-mono bg-zinc-100 dark:bg-zinc-800 px-1 rounded">{slug}</span>
                            </p>
                        )}
                    </div>

                    <RichTextEditor
                        content={content}
                        onChange={setContent}
                        placeholder="Tell your story..."
                    />
                </div>

                {/* Sidebar Settings Area */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 shadow-sm space-y-4">
                        <h3 className="font-semibold pb-2 border-b">Publish Settings</h3>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Status</label>
                            <select className="w-full border rounded-md p-2 bg-zinc-50 dark:bg-zinc-950 text-sm">
                                <option>Draft</option>
                                <option>Ready for Review</option>
                                <option>Published</option>
                            </select>
                        </div>

                        <div className="space-y-2 pt-2">
                            <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Category</label>
                            <select className="w-full border rounded-md p-2 bg-zinc-50 dark:bg-zinc-950 text-sm">
                                <option>Technology</option>
                                <option>Business</option>
                                <option>Lifestyle</option>
                            </select>
                        </div>

                        <div className="pt-4 text-xs text-zinc-500">
                            <p>Autosaved at {new Date().toLocaleTimeString()} (Local Storage)</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
