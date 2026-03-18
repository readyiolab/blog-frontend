import { Facebook, Twitter, Linkedin, Link2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface SocialShareProps {
    url: string;
    title: string;
}

const SocialShare = ({ url, title }: SocialShareProps) => {
    const shareLinks = [
        {
            name: "Facebook",
            icon: <Facebook className="h-4 w-4" />,
            onClick: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank"),
        },
        {
            name: "Twitter",
            icon: <Twitter className="h-4 w-4" />,
            onClick: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, "_blank"),
        },
        {
            name: "LinkedIn",
            icon: <Linkedin className="h-4 w-4" />,
            onClick: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank"),
        },
    ];

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(url);
            toast.success("Link copied to clipboard");
        } catch {
            toast.error("Failed to copy link");
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 sticky top-24">
            <div className="flex flex-col gap-2">
                {shareLinks.map((link) => (
                    <Button
                        key={link.name}
                        variant="ghost"
                        size="icon"
                        className="rounded-full hover:bg-muted"
                        onClick={link.onClick}
                        title={`Share on ${link.name}`}
                    >
                        {link.icon}
                    </Button>
                ))}
                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-muted"
                    onClick={copyToClipboard}
                    title="Copy Link"
                >
                    <Link2 className="h-4 w-4" />
                </Button>
            </div>

            <div className="h-px w-8 bg-border my-2" />

            <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-muted"
                title="Comments"
            >
                <MessageSquare className="h-4 w-4" />
            </Button>
        </div>
    );
};

export default SocialShare;
