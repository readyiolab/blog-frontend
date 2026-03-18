import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const PublicLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
