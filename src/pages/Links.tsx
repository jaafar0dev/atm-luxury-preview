import logo from "@/assets/logo.png";
import {
  MapPin,
  BookOpen,
  ShoppingBag,
  Newspaper,
  Globe,
  MessageCircle,
  Linkedin,
  Instagram,
  Youtube,
  Facebook,
  Music2,
  Heart,
  ExternalLink,
} from "lucide-react";

interface LinkItem {
  label: string;
  title: string;
  href: string;
  icon: React.ReactNode;
  color?: string;
}

const links: LinkItem[] = [
  {
    label: "VISIT US",
    title: "Visit Our Office",
    href: "https://maps.app.goo.gl/ZuHQurgwFr9Ec1jb9?g_st=ic",
    icon: <MapPin className="w-6 h-6" />,
    color: "bg-[#EA4335]",
  },
  {
    label: "GET THE BOOK",
    title: "Nigerian Real Estate Decoded",
    href: "https://selfany.com/RealEstateDecoded",
    icon: <BookOpen className="w-6 h-6" />,
    color: "bg-[#F7931E]",
  },
  {
    label: "ORDER HARD COPY",
    title: "Order The Nigerian Real Estate Decoded",
    href: "https://wa.link/0lbddo",
    icon: <ShoppingBag className="w-6 h-6" />,
    color: "bg-[#25D366]",
  },
  {
    label: "IN THE NEWS",
    title: "ATM Luxury Properties secures double honors - Vanguard",
    href: "https://www.vanguardngr.com/2026/01/atm-luxury-properties-secures-double-honors-at-brg-excellence-awards-7-0",
    icon: <Newspaper className="w-6 h-6" />,
    color: "bg-[#C4170C]",
  },
  {
    label: "IN THE NEWS",
    title: "ATM Luxury Properties receives double recognitions - THISDAY",
    href: "https://www.thisdaylive.com/2026/01/13/atm-luxury-properties-ltd-honored-with-double-recognition-at-brg-excellence-awards-7-0",
    icon: <Newspaper className="w-6 h-6" />,
    color: "bg-[#C4170C]",
  },
  {
    label: "OFFICIAL WEBSITE",
    title: "Visit Our Website",
    href: "http://www.atmluxuryproperties.com/",
    icon: <Globe className="w-6 h-6" />,
    color: "bg-primary",
  },
  {
    label: "CHAT WITH US",
    title: "Chat With Us On WhatsApp",
    href: "https://wa.me/2347055558229",
    icon: <MessageCircle className="w-6 h-6" />,
    color: "bg-[#25D366]",
  },
  {
    label: "CONNECT",
    title: "Follow Us On LinkedIn",
    href: "https://www.linkedin.com/company/atmluxuryproperties",
    icon: <Linkedin className="w-6 h-6" />,
    color: "bg-[#0A66C2]",
  },
  {
    label: "FOLLOW US",
    title: "Follow Us On Instagram",
    href: "http://instagram.com/atmluxuryproperties/",
    icon: <Instagram className="w-6 h-6" />,
    color: "bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]",
  },
  {
    label: "SUBSCRIBE",
    title: "Subscribe to Our YouTube Channel",
    href: "https://youtube.com/@atmluxurypropertiestv?si=MtH7Y9T-ajftNQsU&sub_confirmation=1",
    icon: <Youtube className="w-6 h-6" />,
    color: "bg-[#FF0000]",
  },
  {
    label: "LIKE US",
    title: "Like Us On Facebook",
    href: "http://facebook.com/atmluxuryproperties/",
    icon: <Facebook className="w-6 h-6" />,
    color: "bg-[#1877F2]",
  },
  {
    label: "WATCH OUR VIDEOS",
    title: "Follow Us On TikTok",
    href: "https://www.tiktok.com/@atmluxuryproperties?_r=1&_t=zs-993luwnjoot",
    icon: <Music2 className="w-6 h-6" />,
    color: "bg-black",
  },
];

export default function Links() {
  return (
    <main
      className="min-h-screen w-full relative flex flex-col items-center py-10 px-4"
      style={{
        background: `linear-gradient(135deg, hsl(207 90% 54%) 0%, hsl(215 80% 30%) 100%)`,
      }}
    >
      {/* Subtle dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center">
        {/* Logo */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg mb-6">
          <img
            src={logo}
            alt="ATM Luxury Properties"
            className="h-16 w-auto object-contain"
          />
        </div>

        {/* Headline */}
        <h1 className="font-display text-2xl md:text-3xl font-bold text-white text-center mb-2">
          ATM Luxury Properties
        </h1>
        <p className="text-white/80 text-center text-sm md:text-base mb-1 max-w-sm">
          Doing Real Estate The Right Way...
        </p>
        <p className="text-white/70 text-center text-xs md:text-sm mb-8 max-w-xs">
          Your Investing Partner. Brokerage, Investment & Advisory.
        </p>

        {/* Links */}
        <div className="w-full space-y-4">
          {links.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="flex items-center gap-4 w-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-xl p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                <div
                  className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white ${item.color}`}
                >
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-[10px] md:text-xs font-semibold tracking-wider text-white/60 uppercase">
                    {item.label}
                  </p>
                  <p className="text-sm md:text-base font-semibold text-white line-clamp-2">
                    {item.title}
                  </p>
                </div>
                <div className="shrink-0 text-white/60 group-hover:text-white transition-colors">
                  <ExternalLink className="w-5 h-5" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Footer tag */}
        <div className="mt-10 flex items-center gap-2 text-white/60 text-xs">
          <Heart className="w-4 h-4 fill-current" />
          <span>ATM Luxury Properties</span>
        </div>
      </div>
    </main>
  );
}
