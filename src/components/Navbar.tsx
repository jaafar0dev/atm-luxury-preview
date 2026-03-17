import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { Menu, X, ChevronDown, Heart, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "HOME", path: "/" },
  {
    label: "LISTINGS",
    path: "/listings",
    dropdown: [
      { label: "All Listings", path: "/listings" },
      { label: "Land", path: "/listings?type=land" },
      { label: "Houses", path: "/listings?type=houses" },
      { label: "Investment", path: "/listings?status=investment" },
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
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [bookingDropdownOpen, setBookingDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const bookingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setDropdownOpen(label);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => setDropdownOpen(null), 150);
  };

  const handleBookingEnter = () => {
    if (bookingTimeoutRef.current) clearTimeout(bookingTimeoutRef.current);
    setBookingDropdownOpen(true);
  };

  const handleBookingLeave = () => {
    bookingTimeoutRef.current = setTimeout(
      () => setBookingDropdownOpen(false),
      150,
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full flex flex-col shadow-sm">
      {/* TOP UTILITY BAR - Updated to Brand Blue, Thicker Border, Centered, Reordered */}
      <div className="bg-primary text-white py-3 hidden lg:block border-b-4 border-black/10">
        <div className="section-container flex justify-center items-center gap-6 text-xs font-medium tracking-wide">
          <a
            href="tel:+2348106815300"
            className="flex items-center gap-1.5 hover:text-white/80 transition-colors"
          >
            <Phone size={16} className="text-white/70" /> +234-810-681-5300
          </a>
          <span className="text-white/30">|</span>
          <a
            href="mailto:Info@atmluxuryproperties.com"
            className="flex items-center gap-1.5 hover:text-white/80 transition-colors"
          >
            <Mail size={16} className="text-white/70" />{" "}
            Info@atmluxuryproperties.com
          </a>
          <span className="text-white/30">|</span>
          <div className="flex items-center gap-1.5">
            <MapPin size={16} className="text-white/70" /> Suite D 47, Anon
            Plaza, Gudu District, Abuja
          </div>
        </div>
      </div>

      {/* MAIN NAVIGATION */}
      <nav className="glass-nav bg-background/95 backdrop-blur-md">
        <div className="section-container flex items-center justify-between h-18 py-4">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="ATM Luxury Properties"
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() =>
                  link.dropdown && handleDropdownEnter(link.label)
                }
                onMouseLeave={() => link.dropdown && handleDropdownLeave()}
              >
                <Link
                  to={link.path}
                  className={`nav-link flex items-center gap-1 text-xs tracking-[0.1em] ${location.pathname === link.path ? "text-accent font-semibold" : "text-foreground"}`}
                >
                  {link.label}
                  {link.dropdown && <ChevronDown size={12} />}
                </Link>
                {link.dropdown && dropdownOpen === link.label && (
                  <div className="absolute top-full left-0 pt-1">
                    <div className="bg-card border border-border rounded-lg shadow-lg py-2 min-w-[180px] animate-fade-in">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="block px-5 py-2.5 text-xs tracking-wide text-foreground hover:bg-muted hover:text-accent transition-colors"
                          onClick={() => setDropdownOpen(null)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <Link
              to="/favorites"
              className={`nav-link flex items-center gap-1.5 text-xs tracking-[0.1em] ${location.pathname === "/favorites" ? "text-accent font-semibold" : "text-foreground"}`}
            >
              <Heart size={14} />
              FAVORITES
            </Link>
          </div>

          {/* Desktop Book Consultation dropdown */}
          <div
            className="hidden lg:block relative"
            onMouseEnter={handleBookingEnter}
            onMouseLeave={handleBookingLeave}
          >
            <Button className="btn-gold rounded-full px-6 text-xs tracking-[0.1em] h-9">
              Book Consultation <ChevronDown size={12} className="ml-1" />
            </Button>
            {bookingDropdownOpen && (
              <div className="absolute top-full right-0 pt-1">
                <div className="bg-card border border-border rounded-lg shadow-lg py-2 min-w-[200px] animate-fade-in">
                  <Link
                    to="/book-consultation"
                    className="block px-5 py-2.5 text-xs tracking-wide text-foreground hover:bg-muted hover:text-accent transition-colors"
                    onClick={() => setBookingDropdownOpen(false)}
                  >
                    Book Consultation
                  </Link>
                  <Link
                    to="/book-inspection"
                    className="block px-5 py-2.5 text-xs tracking-wide text-foreground hover:bg-muted hover:text-accent transition-colors"
                    onClick={() => setBookingDropdownOpen(false)}
                  >
                    Book Inspection
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Mobile toggle area */}
          <div className="flex lg:hidden items-center gap-3">
            <Link
              to="/favorites"
              className="text-foreground hover:text-accent transition-colors"
            >
              <Heart
                size={22}
                className={
                  location.pathname === "/favorites"
                    ? "fill-accent text-accent"
                    : ""
                }
              />
            </Link>
            <button
              className="text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-card border-t border-border animate-fade-in">
            <div className="section-container py-6 space-y-3">
              {navLinks.map((link) => (
                <div key={link.label}>
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
              <div className="space-y-2 pt-2">
                <Link
                  to="/book-consultation"
                  onClick={() => setMobileOpen(false)}
                >
                  <Button className="btn-gold rounded-full w-full tracking-wide">
                    Book Consultation
                  </Button>
                </Link>
                <Link
                  to="/book-inspection"
                  onClick={() => setMobileOpen(false)}
                >
                  <Button
                    variant="outline"
                    className="rounded-full w-full tracking-wide border-primary text-primary"
                  >
                    Book Inspection
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
