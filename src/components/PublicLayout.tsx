import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingHelp } from "@/components/FloatingHelp";
import { ReactNode } from "react";

export const PublicLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingHelp />
    </div>
  );
};
