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
  ChevronRight,
} from "lucide-react";

interface LinkItem {
  label: string;
  title: string;
  href: string;
  icon: React.ReactNode;
  bgColor: string;
}

const links: LinkItem[] = [
  {
    label: "FIND US ON GOOGLE MAPS",
    title: "Visit Our Office",
    href: "https://maps.app.goo.gl/ZuHQurgwFr9Ec1jb9?g_st=ic",
    icon: <MapPin className="w-6 h-6 text-white" />,
    bgColor: "#EA4335",
  },
  {
    label: "GET THE BOOK",
    title: "Nigerian Real Estate Decoded",
    href: "https://selfany.com/RealEstateDecoded",
    icon: <BookOpen className="w-6 h-6 text-white" />,
    bgColor: "#FF9900",
  },
  {
    label: "ORDER HARD COPY",
    title: "Order The Nigerian Real Estate Decoded",
    href: "https://wa.link/0lbddo",
    icon: <ShoppingBag className="w-6 h-6 text-white" />,
    bgColor: "#FF9900",
  },
  {
    label: "IN THE NEWS",
    title: "ATM Luxury Properties secures double honors - Vanguard",
    href: "https://www.vanguardngr.com/2026/01/atm-luxury-properties-secures-double-honors-at-brg-excellence-awards-7-0",
    icon: <Newspaper className="w-6 h-6 text-white" />,
    bgColor: "#34A853",
  },
  {
    label: "IN THE NEWS",
    title: "ATM Luxury Properties receives double recognitions - THISDAY",
    href: "https://www.thisdaylive.com/2026/01/13/atm-luxury-properties-ltd-honored-with-double-recognition-at-brg-excellence-awards-7-0",
    icon: <Newspaper className="w-6 h-6 text-white" />,
    bgColor: "#34A853",
  },
  {
    label: "VISIT OUR WEBSITE",
    title: "Official Homepage",
    href: "http://www.atmluxuryproperties.com/",
    icon: <Globe className="w-6 h-6 text-white" />,
    bgColor: "#1B5E20",
  },
  {
    label: "CHAT WITH US ON",
    title: "WhatsApp",
    href: "https://wa.me/2347055558229",
    icon: <MessageCircle className="w-6 h-6 text-white" />,
    bgColor: "#25D366",
  },
  {
    label: "FOLLOW US ON",
    title: "LinkedIn",
    href: "https://www.linkedin.com/company/atmluxuryproperties",
    icon: <Linkedin className="w-6 h-6 text-white" />,
    bgColor: "#0A66C2",
  },
  {
    label: "FOLLOW US ON",
    title: "Instagram",
    href: "http://instagram.com/atmluxuryproperties/",
    icon: <Instagram className="w-6 h-6 text-white" />,
    bgColor: "#E4405F",
  },
  {
    label: "SUBSCRIBE NOW",
    title: "YouTube Channel",
    href: "https://youtube.com/@atmluxurypropertiestv?si=MtH7Y9T-ajftNQsU&sub_confirmation=1",
    icon: <Youtube className="w-6 h-6 text-white" />,
    bgColor: "#FF0000",
  },
  {
    label: "FOLLOW US ON",
    title: "Facebook",
    href: "http://facebook.com/atmluxuryproperties/",
    icon: <Facebook className="w-6 h-6 text-white" />,
    bgColor: "#1877F2",
  },
  {
    label: "WATCH OUR VIDEOS",
    title: "TikTok",
    href: "https://www.tiktok.com/@atmluxuryproperties?_r=1&_t=zs-993luwnjoot",
    icon: <Music2 className="w-6 h-6 text-white" />,
    bgColor: "#000000",
  },
];

export default function Links() {
  return (
    <main
      className="min-h-screen w-full relative flex flex-col items-center py-10 px-4 text-primary-foreground"
      style={{ background: "var(--hero-gradient)" }}
    >
      <div className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center">
        {/* Logo */}
        <img
          src={logo}
          alt="ATM Luxury Properties"
          className="h-24 w-auto object-contain mb-5"
        />

        {/* Headline */}
        <h1 className="font-body text-3xl md:text-4xl font-bold text-primary-foreground text-center mb-4">
          ...Your Investing Partner
        </h1>
        <p className="text-primary-foreground/80 text-center text-sm md:text-base leading-relaxed mb-8 max-w-sm">
          ATM Luxury Properties offers real estate Brokerage, Investment and
          Advisory to individuals and organizations looking to build wealth
          through real estate.
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
              <div className="flex items-center gap-4 w-full bg-primary-foreground/10 hover:bg-primary-foreground/20 backdrop-blur-xl border border-primary-foreground/20 rounded-xl p-3.5 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                <div
                  className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: item.bgColor }}
                >
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-[10px] font-semibold tracking-wider text-primary-foreground/60 uppercase">
                    {item.label}
                  </p>
                  <p className="text-sm md:text-base font-bold text-primary-foreground line-clamp-2">
                    {item.title}
                  </p>
                </div>
                <div className="shrink-0 text-primary-foreground/60 group-hover:text-primary-foreground transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            </a>
          ))}
        </div>

        <footer className="mt-10 text-center text-primary-foreground/60 text-xs leading-relaxed">
          <Heart className="w-4 h-4 fill-current mx-auto mb-2" />
          <span>2026 Atm Luxury Properties Ltd RC-8704771. All rights reserved - </span>
          <a href="/" className="text-primary-foreground underline underline-offset-4 hover:text-primary-foreground/80 transition-colors">
            Visit our website
          </a>
        </footer>
      </div>
    </main>
  );
}
