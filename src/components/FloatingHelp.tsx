import { useState, useEffect } from "react";
import { Phone, X, MessageCircle, Mail } from "lucide-react";

export const FloatingHelp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRinging, setIsRinging] = useState(false);

  // Handle the 30-second ringing animation schedule
  useEffect(() => {
    // Give it an initial ring shortly after page load
    const initialTimeout = setTimeout(() => {
      setIsRinging(true);
      setTimeout(() => setIsRinging(false), 4000); // Ring for 4 seconds
    }, 3000);

    // Then repeat every 30 seconds
    const interval = setInterval(() => {
      setIsRinging(true);
      setTimeout(() => setIsRinging(false), 4000);
    }, 30000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const contactLinks = [
    {
      label: "Email us",
      icon: <Mail size={20} />,
      href: "mailto:Info@atmluxuryproperties.com",
      color: "bg-red-500",
    },
    {
      label: "Let's chat",
      icon: <MessageCircle size={20} />,
      href: "https://wa.me/2348106815300",
      color: "bg-green-500",
    },
    {
      label: "Give us a call",
      icon: <Phone size={20} />,
      href: "tel:+2348106815300",
      color: "bg-blue-500",
    },
  ];

  return (
    <>
      {/* Custom CSS for the precise ringing animation you requested */}
      <style>{`
        @keyframes custom-ring {
          0% { transform: rotate(0) scale(1); }
          10% { transform: rotate(15deg) scale(1.1); }
          20% { transform: rotate(-10deg) scale(1.1); }
          30% { transform: rotate(15deg) scale(1.1); }
          40% { transform: rotate(-10deg) scale(1.1); }
          50% { transform: rotate(0) scale(1); }
          100% { transform: rotate(0) scale(1); }
        }
        .animate-custom-ring {
          animation: custom-ring 2s ease-in-out infinite;
        }
      `}</style>

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
        {/* Expanded Buttons (Rendered when isOpen is true) */}
        {isOpen && (
          <div className="flex flex-col gap-3 mb-1 animate-fade-in items-end">
            {contactLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                {/* Text Label */}
                <span className="bg-card border border-border px-4 py-2 rounded-xl text-sm font-semibold text-foreground shadow-md whitespace-nowrap">
                  {link.label}
                </span>
                {/* Icon Button */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110 ${link.color}`}
                >
                  {link.icon}
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Main Floating Button Row */}
        <div className="flex items-center gap-3">
          {/* "Got any questions?" Label - Shows only when ringing and NOT currently open */}
          {isRinging && !isOpen && (
            <div className="bg-card border border-border shadow-lg px-4 py-2.5 rounded-2xl rounded-br-sm animate-slide-in-right whitespace-nowrap">
              <p className="text-sm font-bold text-foreground">
                Got any questions?
              </p>
            </div>
          )}

          {/* Main Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
              isOpen
                ? "bg-destructive rotate-90" // Turns into a red X when open
                : isRinging
                  ? "bg-primary animate-custom-ring"
                  : "bg-primary hover:scale-110" // Rings or scales when closed
            }`}
          >
            {isOpen ? <X size={26} /> : <Phone size={26} />}
          </button>
        </div>
      </div>
    </>
  );
};
