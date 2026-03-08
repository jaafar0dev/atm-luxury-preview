import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Discover */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Discover</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><Link to="/listings?city=Abuja" className="hover:text-primary-foreground transition-colors">Abuja</Link></li>
              <li><Link to="/listings?city=Lagos" className="hover:text-primary-foreground transition-colors">Lagos</Link></li>
              <li><Link to="/listings?city=Ibadan" className="hover:text-primary-foreground transition-colors">Ibadan</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>Suite D 47, Anon Plaza Gudu District, Abuja</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>KM 48, BRG Building, Beside Skymall, Sangotedo, Lekki Lagos Nigeria.</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-0.5 shrink-0" />
                <div>
                  <a href="tel:+2348106815300" className="hover:text-primary-foreground block">+234-810-681-5300</a>
                  <a href="tel:+2349037075934" className="hover:text-primary-foreground block">+234-903-707-5934</a>
                  <a href="tel:+2348159160550" className="hover:text-primary-foreground block">+234-815-916-0550</a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-0.5 shrink-0" />
                <a href="mailto:Info@atmluxuryproperties.com" className="hover:text-primary-foreground">Info@atmluxuryproperties.com</a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>Brokerage</li>
              <li>Investment</li>
              <li>Advisory</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><Link to="/" className="hover:text-primary-foreground transition-colors">Home</Link></li>
              <li><Link to="/listings" className="hover:text-primary-foreground transition-colors">Listings</Link></li>
              <li><Link to="/blog" className="hover:text-primary-foreground transition-colors">Blog</Link></li>
              <li><Link to="/about" className="hover:text-primary-foreground transition-colors">About</Link></li>
              <li><Link to="/contact" className="hover:text-primary-foreground transition-colors">Contact</Link></li>
              <li><Link to="/faq" className="hover:text-primary-foreground transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Brand */}
          <div>
            <div className="font-display text-3xl font-bold italic mb-3">atm</div>
            <p className="text-sm text-primary-foreground/80">
              Your first choice real estate marketing agency. We specialize in luxury properties across Nigeria.
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/20 py-4 text-center text-sm text-primary-foreground/60">
        © {new Date().getFullYear()} ATM Luxury Properties. All rights reserved.
      </div>
    </footer>
  );
};
