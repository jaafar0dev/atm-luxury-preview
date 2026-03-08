import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConsultationDialog } from "@/components/ConsultationDialog";
import logo from "@/assets/logo.png";

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
      <nav className="sticky top-0 z-40 glass-nav">
        <div className="section-container flex items-center justify-between h-18 py-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="ATM Luxury Properties" className="h-12 w-auto" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <div
                key={link.path}
                className="relative"
                onMouseEnter={() => link.dropdown && setDropdownOpen(link.label)}
                onMouseLeave={() => setDropdownOpen(null)}
              >
                <Link
                  to={link.path}
                  className={`nav-link flex items-center gap-1 text-xs tracking-[0.1em] ${location.pathname === link.path ? "text-accent font-semibold" : "text-foreground"}`}
                >
                  {link.label}
                  {link.dropdown && <ChevronDown size={12} />}
                </Link>
                {link.dropdown && dropdownOpen === link.label && (
                  <div className="absolute top-full left-0 mt-2 bg-card border border-border rounded-sm shadow-lg py-2 min-w-[180px] animate-fade-in">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="block px-5 py-2.5 text-xs tracking-wide text-foreground hover:bg-muted hover:text-accent transition-colors"
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
            <Button onClick={() => setConsultationOpen(true)} className="btn-gold rounded-sm px-6 text-xs tracking-[0.1em] h-9">
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
          <div className="lg:hidden bg-card border-t border-border animate-fade-in">
            <div className="section-container py-6 space-y-3">
              {navLinks.map((link) => (
                <div key={link.path}>
                  <Link
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`block py-2.5 text-sm tracking-wide ${location.pathname === link.path ? "text-accent font-semibold" : "text-foreground"}`}
                  >
                    {link.label}
                  </Link>
                  {link.dropdown?.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      className="block py-1.5 pl-4 text-xs text-muted-foreground hover:text-accent"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ))}
              <Button onClick={() => { setConsultationOpen(true); setMobileOpen(false); }} className="btn-gold rounded-sm w-full tracking-wide">
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
