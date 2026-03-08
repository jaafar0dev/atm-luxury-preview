import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const FloatingHelp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldPulse, setShouldPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShouldPulse(true);
      setTimeout(() => setShouldPulse(false), 2000);
    }, 30000);

    // Initial pulse after 3 seconds
    const initialTimeout = setTimeout(() => {
      setShouldPulse(true);
      setTimeout(() => setShouldPulse(false), 2000);
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
            className="mb-4 bg-card border border-border rounded-lg shadow-xl p-4 w-72"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-semibold text-foreground">Do you need help?</h3>
              <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X size={18} />
              </button>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Our team is always ready to assist you with your real estate needs.
            </p>
            <div className="space-y-2">
              <a href="/contact" className="block w-full text-center bg-primary text-primary-foreground py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
                Contact Us
              </a>
              <a href="tel:+2348106815300" className="block w-full text-center border border-border text-foreground py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors">
                Call: +234-810-681-5300
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center transition-all hover:bg-primary/90 ${shouldPulse ? "animate-pulse-help" : ""}`}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
};
