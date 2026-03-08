import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import logo from "@/assets/logo.png";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Top accent line */}
      <div className="h-1" style={{ background: "var(--gold-gradient)" }} />
      
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <img src={logo} alt="ATM Luxury Properties" className="h-16 w-auto mb-4 brightness-0 invert" />
            <p className="text-sm text-primary-foreground/60 leading-relaxed max-w-sm mb-6">
              Your premier luxury real estate marketing agency. We specialize in exclusive properties across Nigeria's most prestigious locations.
            </p>
            <Link to="/listings" className="inline-flex items-center gap-2 text-accent text-sm font-medium hover:text-accent/80 transition-colors">
              View Our Properties <ArrowRight size={14} />
            </Link>
          </div>

          {/* Discover */}
          <div>
            <h3 className="font-display font-bold text-sm tracking-[0.1em] uppercase mb-5 text-accent">Discover</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/60">
              <li><Link to="/listings?city=Abuja" className="hover:text-accent transition-colors">Abuja</Link></li>
              <li><Link to="/listings?city=Lagos" className="hover:text-accent transition-colors">Lagos</Link></li>
              <li><Link to="/listings?city=Ibadan" className="hover:text-accent transition-colors">Ibadan</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-sm tracking-[0.1em] uppercase mb-5 text-accent">Quick Links</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/60">
              <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
              <li><Link to="/listings" className="hover:text-accent transition-colors">Listings</Link></li>
              <li><Link to="/blog" className="hover:text-accent transition-colors">Blog</Link></li>
              <li><Link to="/about" className="hover:text-accent transition-colors">About</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-bold text-sm tracking-[0.1em] uppercase mb-5 text-accent">Contact</h3>
            <ul className="space-y-4 text-sm text-primary-foreground/60">
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="mt-1 shrink-0 text-accent/60" />
                <span>Suite D 47, Anon Plaza Gudu District, Abuja</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone size={14} className="mt-1 shrink-0 text-accent/60" />
                <div className="space-y-1">
                  <a href="tel:+2348106815300" className="hover:text-accent block transition-colors">+234-810-681-5300</a>
                  <a href="tel:+2349037075934" className="hover:text-accent block transition-colors">+234-903-707-5934</a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail size={14} className="mt-1 shrink-0 text-accent/60" />
                <a href="mailto:Info@atmluxuryproperties.com" className="hover:text-accent transition-colors">Info@atmluxuryproperties.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 py-5 text-center text-xs text-primary-foreground/40 tracking-wider">
        © {new Date().getFullYear()} ATM Luxury Properties. All rights reserved.
      </div>
    </footer>
  );
};
