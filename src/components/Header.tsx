import { Menu, Search } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { sectionConfigs } from "@/lib/seo";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const navItems = sectionConfigs.filter((section) => section.slug !== "latest-news");

  // Close mobile menu whenever route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-5 relative">
        <Link to="/" className="text-center">
          <img 
            src="/logo.webp" 
            alt="Beans News" 
            className="h-10 object-contain md:h-14" 
            width="200" 
            height="56"
          />
        </Link>
        <p className="mt-2 text-sm text-muted-foreground">{today}</p>
      </div>

      <nav className="border-t border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 lg:justify-start">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <button
                className="mr-2 rounded p-2 hover:bg-secondary lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="mt-6 flex flex-col gap-4">
                <nav className="flex flex-col space-y-4">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `text-lg font-semibold ${isActive ? "text-primary" : "text-foreground"}`
                    }
                  >
                    Home
                  </NavLink>
                  <div className="border-t my-2"></div>
                  {navItems.map((item) => (
                    <NavLink
                      key={item.slug}
                      to={`/${item.slug}`}
                      className={({ isActive }) =>
                        `text-lg font-semibold ${isActive ? "text-primary" : "text-foreground"}`
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                  <NavLink
                    to="/latest-news"
                    className={({ isActive }) =>
                      `text-lg font-semibold ${isActive ? "text-primary" : "text-foreground"}`
                    }
                  >
                    Latest News
                  </NavLink>
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          <div className="hidden flex-1 lg:flex">
            <ul className="flex items-center whitespace-nowrap">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `inline-block px-3 py-3 text-sm font-semibold tracking-wide ${
                      isActive ? "border-b-2 border-primary text-primary" : "text-foreground hover:text-primary"
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              {navItems.map((item) => (
                <li key={item.slug}>
                  <NavLink
                    to={`/${item.slug}`}
                    className={({ isActive }) =>
                      `inline-block px-3 py-3 text-sm font-semibold tracking-wide hover:text-primary ${
                        isActive ? "border-b-2 border-primary text-primary" : "text-foreground"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <li>
                <NavLink
                  to="/latest-news"
                  className={({ isActive }) =>
                    `inline-block px-3 py-3 text-sm font-semibold tracking-wide hover:text-primary ${
                      isActive ? "border-b-2 border-primary text-primary" : "text-foreground"
                    }`
                  }
                >
                  Latest News
                </NavLink>
              </li>
            </ul>
          </div>
          <button className="ml-2 rounded p-2 hover:bg-secondary" aria-label="Search">
            <Search className="h-5 w-5" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
