const Footer = () => {
  const sections = [
    { title: "Sections", links: ["India", "West Bengal", "World", "Business", "Sports", "Entertainment", "Science & Tech"] },
    { title: "More", links: ["Opinion", "Edugraph", "My Kolkata", "Gallery", "Videos", "Culture"] },
    { title: "About", links: ["About Us", "Contact", "Advertise", "Privacy Policy", "Terms of Use"] },
  ];

  return (
    <footer className="bg-primary text-primary-foreground mt-8">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-headline text-xl font-bold mb-2">
              The Telegraph <span className="italic font-normal">online</span>
            </h3>
            <p className="text-primary-foreground/60 text-sm mt-2">
              Since 1982. India's leading English daily.
            </p>
          </div>
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-sm uppercase tracking-wider mb-3">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center">
          <p className="text-xs text-primary-foreground/50">
            © 2026 The Telegraph. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
