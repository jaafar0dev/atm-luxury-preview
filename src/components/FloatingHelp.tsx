import { useState, useEffect } from "react";
import { Phone, X, MessageCircle, Mail } from "lucide-react";

export const FloatingHelp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRinging, setIsRinging] = useState(false);

  // Robust timer to ensure it reliably rings every 15 seconds
  useEffect(() => {
    let stopRingTimeout: NodeJS.Timeout;

    // Initial ring after 3 seconds
    const initialTimeout = setTimeout(() => {
      setIsRinging(true);
      stopRingTimeout = setTimeout(() => setIsRinging(false), 3000);
    }, 3000);

    // Continuous ring every 15 seconds
    const interval = setInterval(() => {
      setIsRinging(true);
      stopRingTimeout = setTimeout(() => setIsRinging(false), 3000);
    }, 15000);

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(stopRingTimeout);
      clearInterval(interval);
    };
  }, []);

  // Reordered: Phone -> WhatsApp -> Email
  const contactLinks = [
    {
      label: "Give us a call",
      icon: <Phone size={20} />,
      href: "tel:+2348106815300",
      color: "bg-blue-500",
    },
    {
      label: "Let's chat",
      icon: <MessageCircle size={20} />,
      href: "https://wa.me/2348106815300",
      color: "bg-green-500",
    },
    {
      label: "Email us",
      icon: <Mail size={20} />,
      href: "mailto:Info@atmluxuryproperties.com",
      color: "bg-red-500",
    },
  ];

  return (
    <>
      <style>{`
        @keyframes custom-ring {
          0% { transform: rotate(0) scale(1); }
          10% { transform: rotate(20deg) scale(1.1); }
          20% { transform: rotate(-20deg) scale(1.1); }
          30% { transform: rotate(20deg) scale(1.1); }
          40% { transform: rotate(-20deg) scale(1.1); }
          50% { transform: rotate(20deg) scale(1.1); }
          60% { transform: rotate(-20deg) scale(1.1); }
          70% { transform: rotate(0) scale(1); }
          100% { transform: rotate(0) scale(1); }
        }
        .animate-custom-ring {
          animation: custom-ring 1.5s ease-in-out infinite;
        }
      `}</style>

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
        {/* Expanded Options */}
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
                {/* BLUE Option Label */}
                <span className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-md whitespace-nowrap">
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

        {/* COMBINED TOGGLE BUTTON (Label + Icon) */}
        {/* The origin-right ensures it shakes from the right side rather than the center, keeping it anchored to the screen edge */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-3 transition-all duration-300 origin-right ${
            !isOpen && isRinging ? "animate-custom-ring" : "hover:scale-105"
          }`}
        >
          {/* BLUE Main Label (Hidden when menu is open) */}
          {!isOpen && (
            <div className="bg-primary shadow-lg px-4 py-2.5 rounded-2xl rounded-br-sm whitespace-nowrap">
              <p className="text-sm font-bold text-white">Got any questions?</p>
            </div>
          )}

          {/* Main Circular Icon */}
          <div
            className={`text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
              isOpen ? "bg-destructive rotate-90" : "bg-primary"
            }`}
          >
            {isOpen ? <X size={26} /> : <Phone size={26} />}
          </div>
        </button>
      </div>
    </>
  );
};
