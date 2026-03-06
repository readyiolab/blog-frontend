import { useEffect, useState } from "react";
import { categoryService } from "@/services/categoryService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Trash2, Edit, Plus, FolderTree } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

export default function CategoriesList() {
    const [categories, setCategories] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);

    // Form State
    const [newCatName, setNewCatName] = useState("");
    const [newCatSlug, setNewCatSlug] = useState("");

    const fetchCategories = async () => {
        try {
            setIsLoading(true);
            const resp = await categoryService.getAll();
            if (resp.success) {
                setCategories(resp.data);
            }
        } catch (error) {
            toast.error("Failed to load categories.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleCreate = async () => {
        if (!newCatName || !newCatSlug) {
            toast.error("Name and Slug are required.");
            return;
        }
        try {
            const resp = await categoryService.create({
                category_name: newCatName,
                slug: newCatSlug,
                status: 'active'
            });
            if (resp.success) {
                toast.success("Category created!");
                setNewCatName("");
                setNewCatSlug("");
                setIsAdding(false);
                fetchCategories(); // Refresh list to get real ID
            }
        } catch (e) {
            toast.error("Error creating category. Slug might already exist.");
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this category? Associated articles might be orphaned or deleted based on DB constraints.")) return;

        try {
            const resp = await categoryService.delete(id);
            if (resp.success) {
                toast.success("Category deleted");
                setCategories(categories.filter(c => c.id !== id));
            }
        } catch (e) {
            toast.error("Error deleting category. Check constraints and permissions.");
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Post Categories</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-1">
                        Organize your articles with unified tags and sections.
                    </p>
                </div>

                <Button className="gap-2 shrink-0" onClick={() => setIsAdding(!isAdding)}>
                    <Plus size={16} />
                    {isAdding ? "Cancel" : "Add Category"}
                </Button>
            </div>

            {isAdding && (
                <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-6 rounded-lg shadow-sm space-y-4 animate-in fade-in zoom-in-95 duration-200">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                        <FolderTree size={18} /> New Category
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Category Name</label>
                            <Input
                                placeholder="e.g. Technology"
                                value={newCatName}
                                onChange={(e) => {
                                    setNewCatName(e.target.value);
                                    setNewCatSlug(e.target.value.toLowerCase().replace(/[\s_]+/g, '-').replace(/[^\w-]+/g, ''));
                                }}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">URL Slug</label>
                            <Input
                                placeholder="e.g. technology"
                                value={newCatSlug}
                                onChange={(e) => setNewCatSlug(e.target.value)}
                            />
                        </div>
                        <div className="md:col-span-2 pt-2">
                            <Button onClick={handleCreate}>Save Category</Button>
                        </div>
                    </div>
                </div>
            )}

            <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-950 shadow-sm overflow-hidden text-sm">
                <Table>
                    <TableHeader className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                        <TableRow>
                            <TableHead className="w-[80px]">ID</TableHead>
                            <TableHead>Category Name</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-zinc-500">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : categories.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-zinc-500">
                                    No categories found. Let's add one!
                                </TableCell>
                            </TableRow>
                        ) : (
                            categories.map(category => (
                                <TableRow key={category.id}>
                                    <TableCell className="font-mono text-zinc-500">{category.id}</TableCell>
                                    <TableCell className="font-semibold">{category.category_name}</TableCell>
                                    <TableCell className="text-zinc-500 font-mono text-xs">{category.slug}</TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider
                      ${category.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                                'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300'}`}>
                                            {category.status || 'active'}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-zinc-500">
                                        {category.created_at ? format(new Date(category.created_at), 'MMM dd, yyyy') : '-'}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-blue-600">
                                                <Edit size={14} />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30" onClick={() => handleDelete(category.id)}>
                                                <Trash2 size={14} />
                                            </Button>
                                        </div>
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
