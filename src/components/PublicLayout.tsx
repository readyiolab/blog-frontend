import type { ReactNode } from "react";
import { lazy, Suspense } from "react";
import Header from "@/components/Header";

const Footer = lazy(() => import("@/components/Footer"));

const PublicLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>{children}</main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default PublicLayout;
