import { useState } from "react";
import { newsletterService } from "@/services/newsletterService";
import { toast } from "sonner";

interface NewsletterFormProps {
  variant?: "default" | "sidebar";
}

const NewsletterForm = ({ variant = "default" }: NewsletterFormProps) => {
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setSubscribing(true);
    try {
      await newsletterService.subscribe({ email: email.trim() });
      setEmail("");
      toast.success("Thank you for subscribing!");
    } catch (error: any) {
      toast.error(error.message || "Failed to subscribe.");
    } finally {
      setSubscribing(false);
    }
  };

  if (variant === "sidebar") {
    return (
      <form onSubmit={handleSubscribe} className="flex gap-2">
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={subscribing}
          className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-sm w-full placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-white/30"
        />
        <button 
          type="submit"
          disabled={subscribing}
          className="bg-white text-primary px-3 py-2 rounded-md font-bold text-xs hover:bg-white/90 transition-colors disabled:opacity-50"
        >
          {subscribing ? "..." : "Join"}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubscribe} className="mt-4 flex flex-col gap-3 md:flex-row">
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={subscribing}
        className="h-11 flex-1 rounded-md border border-input bg-background px-4 focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
      <button 
        type="submit"
        disabled={subscribing}
        className="h-11 rounded-md bg-primary px-6 font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {subscribing ? "Subscribing..." : "Subscribe"}
      </button>
    </form>
  );
};

export default NewsletterForm;
