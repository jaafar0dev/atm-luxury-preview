import { useState, useEffect } from "react";
import { MessageCircle, X, Phone, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const FloatingHelp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldVibrate, setShouldVibrate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShouldVibrate(true);
      setTimeout(() => setShouldVibrate(false), 1000);
    }, 10000);

    const initialTimeout = setTimeout(() => {
      setShouldVibrate(true);
      setTimeout(() => setShouldVibrate(false), 1000);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 bg-card border border-border rounded-sm w-80"
            style={{ boxShadow: "var(--shadow-luxury)" }}
          >
            <div className="p-5 border-b border-border">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-display font-bold text-foreground text-lg">Need Assistance?</h3>
                <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X size={18} />
                </button>
              </div>
              <p className="text-xs text-muted-foreground">Our team is ready to help with your real estate needs.</p>
            </div>
            <div className="p-5 space-y-3">
              <a href="/contact" className="flex items-center gap-3 w-full text-left bg-primary text-primary-foreground py-3 px-4 rounded-sm text-sm font-medium hover:bg-primary/90 transition-colors">
                <Mail size={16} />
                Contact Us
              </a>
              <a href="tel:+2348106815300" className="flex items-center gap-3 w-full text-left border border-border text-foreground py-3 px-4 rounded-sm text-sm font-medium hover:bg-muted transition-colors">
                <Phone size={16} className="text-accent" />
                +234-810-681-5300
              </a>
              <a href="https://wa.me/2348106815300" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full text-left border border-border text-foreground py-3 px-4 rounded-sm text-sm font-medium hover:bg-muted transition-colors">
                <MessageCircle size={16} className="text-success" />
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105 ${shouldVibrate ? "animate-vibrate" : ""}`}
        style={{ background: "var(--gold-gradient)" }}
      >
        {isOpen ? <X size={22} className="text-primary" /> : <MessageCircle size={22} className="text-primary" />}
      </button>
    </div>
  );
};
