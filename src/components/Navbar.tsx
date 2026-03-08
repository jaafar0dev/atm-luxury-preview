import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConsultationDialog } from "@/components/ConsultationDialog";

const navLinks = [
  { label: "HOME", path: "/" },
  {
    label: "LISTINGS",
    path: "/listings",
    dropdown: [
      { label: "Land", path: "/listings?type=land" },
      { label: "Houses", path: "/listings?type=houses" },
    ],
  },
  { label: "BLOG", path: "/blog" },
  { label: "ABOUT", path: "/about" },
  { label: "FAQ", path: "/faq" },
  { label: "CONTACT", path: "/contact" },
  { label: "MORTGAGE CALCULATOR", path: "/mortgage-calculator" },
];

export const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  return (
    <>
      <nav className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="section-container flex items-center justify-between h-16">
          <Link to="/" className="font-display text-2xl font-bold text-primary italic">
            atm
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <div
                key={link.path}
                className="relative"
                onMouseEnter={() => link.dropdown && setDropdownOpen(link.label)}
                onMouseLeave={() => setDropdownOpen(null)}
              >
                <Link
                  to={link.path}
                  className={`nav-link flex items-center gap-1 ${location.pathname === link.path ? "text-primary font-semibold" : "text-foreground"}`}
                >
                  {link.label}
                  {link.dropdown && <ChevronDown size={14} />}
                </Link>
                {link.dropdown && dropdownOpen === link.label && (
                  <div className="absolute top-full left-0 mt-1 bg-card border border-border rounded-md shadow-lg py-2 min-w-[160px] animate-fade-in">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden lg:block">
            <Button onClick={() => setConsultationOpen(true)} className="btn-primary rounded-full px-6">
              Book Consultation
            </Button>
          </div>

          {/* Mobile toggle */}
          <button className="lg:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-background border-t border-border animate-fade-in">
            <div className="section-container py-4 space-y-3">
              {navLinks.map((link) => (
                <div key={link.path}>
                  <Link
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`block py-2 nav-link ${location.pathname === link.path ? "text-primary font-semibold" : "text-foreground"}`}
                  >
                    {link.label}
                  </Link>
                  {link.dropdown?.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      className="block py-1 pl-4 text-sm text-muted-foreground hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ))}
              <Button onClick={() => { setConsultationOpen(true); setMobileOpen(false); }} className="btn-primary rounded-full w-full">
                Book Consultation
              </Button>
            </div>
          </div>
        )}
      </nav>

      <ConsultationDialog open={consultationOpen} onOpenChange={setConsultationOpen} />
    </>
  );
};
