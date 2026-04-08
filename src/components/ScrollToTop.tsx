import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { pathname } = useLocation();

  // Also automatically scroll to top on route changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [pathname]);

  // Show button when page is scolled up to given distance
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top variable to 0
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Button
        variant="default"
        size="icon"
        className="h-12 w-12 rounded-full shadow-lg transition-all hover:scale-110"
        onClick={scrollToTop}
        title="Scroll to top"
      >
        <ArrowUp className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default ScrollToTop;
