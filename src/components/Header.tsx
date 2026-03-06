import { Search, Menu } from "lucide-react";
import { navCategories } from "@/data/staticNews";

const Header = () => {
  return (
    <header className="border-b border-border">
      {/* Logo area */}
      <div className="flex flex-col items-center py-4 px-4">
        <h1 className="font-headline text-3xl md:text-5xl font-bold tracking-tight">
          The Telegraph <span className="italic font-medium">online</span>
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Friday, 13 February 2026
        </p>
      </div>

      {/* Navigation */}
      <nav className="border-t border-border">
        <div className="max-w-7xl mx-auto flex items-center px-4">
          <button className="p-2 mr-2 hover:bg-secondary rounded" aria-label="Menu">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1 overflow-x-auto">
            <ul className="flex items-center gap-0 whitespace-nowrap">
              {navCategories.map((cat, i) => (
                <li key={cat}>
                  <a
                    href="#"
                    className={`inline-block px-3 py-3 text-sm font-semibold tracking-wide transition-colors hover:text-accent ${
                      i === 0
                        ? "text-accent border-b-2 border-accent"
                        : "text-foreground"
                    }`}
                  >
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <button className="p-2 ml-2 hover:bg-secondary rounded" aria-label="Search">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
