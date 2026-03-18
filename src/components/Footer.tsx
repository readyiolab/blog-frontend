import { Link } from "react-router-dom";

const footerGroups = [
  {
    title: "Sections",
    links: [
      { label: "India News", to: "/india-news" },
      { label: "World News", to: "/world-news" },
      { label: "Business News", to: "/business-news" },
      { label: "Finance News", to: "/finance-news" },
      { label: "Sports News", to: "/sports-news" },
      { label: "Health & Wellness", to: "/health-wellness" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about-us" },
      { label: "Contact Us", to: "/contact-us" },
      { label: "Write For Us", to: "/write-for-us" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", to: "/privacy-policy" },
      { label: "Editorial Policy", to: "/editorial-policy" },
      { label: "Disclaimer", to: "/disclaimer" },
      { label: "Terms & Conditions", to: "/terms-and-conditions" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="mt-12 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="font-headline text-2xl font-bold">Beans News</h3>
            <p className="mt-3 text-sm text-primary-foreground/80">
              Breaking US and global news focused on business, finance, sports, health, and expert analysis.
            </p>
          </div>
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em]">
                {group.title}
              </h4>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 border-t border-primary-foreground/20 pt-6 text-center text-xs text-primary-foreground/70">
          © 2026 Beans News. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
