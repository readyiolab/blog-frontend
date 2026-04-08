import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { Bold, Italic, List, ListOrdered, Heading2, Quote, Undo, Redo, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useState, useCallback } from 'react';

interface RichTextEditorProps {
    content: string;
    onChange: (html: string) => void;
    placeholder?: string;
}

const MenuBar = ({ editor }: { editor: any }) => {
    const [isUploading, setIsUploading] = useState(false);

    const handleImageUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // File type validation
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        // Size validation - 5MB
        if (file.size > 5 * 1024 * 1024) {
            alert('File size must be less than 5MB');
            return;
        }

        try {
            setIsUploading(true);
            const formData = new FormData();
            formData.append('image', file);

            // We need the token from localStorage (assuming it's stored there for RBAC)
            const token = localStorage.getItem('token');

            const response = await fetch('http://localhost:5000/api/upload/image', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData,
            });

            const data = await response.json();

            if (data.success && data.url) {
                editor.chain().focus().setImage({ src: data.url }).run();
            } else {
                alert(data.message || 'Error uploading image');
            }
        } catch (error) {
            console.error('Upload Error:', error);
            alert('An error occurred while uploading');
        } finally {
            setIsUploading(false);
            // Reset input value so same file can be chosen again if needed
            if (event.target) {
                event.target.value = '';
            }
        }
    }, [editor]);

    if (!editor) {
        return null;
    }

    const toggleBtnClass = (isActive: boolean) =>
        `p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors ${isActive ? 'bg-zinc-200 dark:bg-zinc-800 text-primary' : 'text-zinc-600 dark:text-zinc-400'}`;

    return (
        <div className="flex flex-wrap gap-1 p-2 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 items-center">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={toggleBtnClass(editor.isActive('bold'))}
                title="Bold"
                type="button"
            >
                <Bold size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={toggleBtnClass(editor.isActive('italic'))}
                title="Italic"
                type="button"
            >
                <Italic size={18} />
            </button>

            <div className="w-[1px] h-6 bg-zinc-300 dark:bg-zinc-700 mx-1"></div>

            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={toggleBtnClass(editor.isActive('heading', { level: 2 }))}
                title="Heading 2"
                type="button"
            >
                <Heading2 size={18} />
            </button>

            <div className="w-[1px] h-6 bg-zinc-300 dark:bg-zinc-700 mx-1"></div>

            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={toggleBtnClass(editor.isActive('bulletList'))}
                title="Bullet List"
                type="button"
            >
                <List size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={toggleBtnClass(editor.isActive('orderedList'))}
                title="Numbered List"
                type="button"
            >
                <ListOrdered size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={toggleBtnClass(editor.isActive('blockquote'))}
                title="Quote"
                type="button"
            >
                <Quote size={18} />
            </button>

            <div className="w-[1px] h-6 bg-zinc-300 dark:bg-zinc-700 mx-1"></div>

            <button
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}
                className={toggleBtnClass(false)}
                title="Undo"
                type="button"
            >
                <Undo size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}
                className={toggleBtnClass(false)}
                title="Redo"
                type="button"
            >
                <Redo size={18} />
            </button>

            <div className="flex-grow"></div>

            {/* Image Upload Button */}
            <div className="relative">
                <label className={`cursor-pointer ${toggleBtnClass(false)} flex items-center justify-center`} title="Upload Image">
                    {isUploading ? <Loader2 size={18} className="animate-spin" /> : <ImageIcon size={18} />}
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                        disabled={isUploading}
                    />
                </label>
            </div>
        </div>
    );
};

export const RichTextEditor = ({ content, onChange, placeholder = 'Write your article here...' }: RichTextEditorProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image.configure({
                inline: true,
                allowBase64: true, // Allow base64 for dragged images if needed, but our upload is better
                HTMLAttributes: {
                    class: 'max-w-full rounded-md object-contain max-h-[500px] border border-zinc-200 dark:border-zinc-800 my-4',
                },
            }),
        ],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose-base dark:prose-invert max-w-none focus:outline-none min-h-[300px] p-4',
            },
        },
    });

    return (
        <div className="border border-zinc-200 dark:border-zinc-800 rounded-md overflow-hidden bg-white dark:bg-zinc-950 flex flex-col">
            <MenuBar editor={editor} />
            <div className="flex-1 overflow-y-auto max-h-[800px] cursor-text" onClick={() => editor?.commands.focus()}>
                <EditorContent editor={editor} />
            </div>
        </div>
    );
};

export default RichTextEditor;
