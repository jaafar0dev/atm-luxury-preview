import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const FloatingHelp = () => {
  const [showBubble, setShowBubble] = useState(false);

  // Pop up the message bubble 3 seconds after the page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBubble(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* The pop-up chat bubble */}
      {showBubble && (
        <div
          className="bg-card border border-border rounded-2xl rounded-br-sm shadow-xl p-4 w-60 animate-slide-in-up relative"
          style={{ boxShadow: "var(--shadow-luxury)" }}
        >
          <button
            onClick={() => setShowBubble(false)}
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={14} />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">👋</span>
            <h4 className="font-display font-bold text-sm text-foreground">
              Need help?
            </h4>
          </div>
          <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
            Our Consultants are available to assist you.
          </p>
          <Link to="/contact">
            <Button
              size="sm"
              className="w-full btn-gold rounded-full text-xs h-8"
            >
              Chat With Us
            </Button>
          </Link>
        </div>
      )}

      {/* The Floating Icon */}
      <div className="relative group">
        <Link to="/contact">
          {/* Pulsing red notification dot */}
          <div className="absolute -top-1 -right-1 flex h-4 w-4 z-10">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-destructive border-2 border-background"></span>
          </div>

          {/* Main Button */}
          <div className="bg-primary text-white p-4 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300 animate-pulse-help flex items-center justify-center">
            <MessageCircle size={28} />
          </div>
        </Link>
      </div>
    </div>
  );
};
