import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import {
  Home,
  Instagram,
  Facebook,
  Music2,
  Phone,
  Mail,
  List,
  Calendar,
  MessageCircle,
  Linkedin,
  Twitter,
  Youtube,
  ExternalLink,
  Heart,
} from "lucide-react";

interface LinkItem {
  label: string;
  title: string;
  href: string;
  external: boolean;
  icon: React.ReactNode;
  color?: string;
}

const links: LinkItem[] = [
  {
    label: "VISIT OUR WEBSITE",
    title: "Official Homepage",
    href: "/",
    external: false,
    icon: <Home className="w-6 h-6" />,
    color: "bg-[#1877F2]",
  },
  {
    label: "CHAT WITH US ON",
    title: "WhatsApp",
    href: "https://wa.me/2348106815300",
    external: true,
    icon: <MessageCircle className="w-6 h-6" />,
    color: "bg-[#25D366]",
  },
  {
    label: "FOLLOW US ON",
    title: "Instagram",
    href: "https://instagram.com/atmluxuryproperties",
    external: true,
    icon: <Instagram className="w-6 h-6" />,
    color: "bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]",
  },
  {
    label: "FOLLOW US ON",
    title: "Facebook",
    href: "https://facebook.com/atmluxuryproperties",
    external: true,
    icon: <Facebook className="w-6 h-6" />,
    color: "bg-[#1877F2]",
  },
  {
    label: "WATCH OUR VIDEOS",
    title: "TikTok",
    href: "https://tiktok.com/@atmluxuryproperties",
    external: true,
    icon: <Music2 className="w-6 h-6" />,
    color: "bg-black",
  },
  {
    label: "CONNECT WITH US ON",
    title: "LinkedIn",
    href: "https://linkedin.com/company/atmluxuryproperties",
    external: true,
    icon: <Linkedin className="w-6 h-6" />,
    color: "bg-[#0A66C2]",
  },
  {
    label: "FOLLOW US ON",
    title: "X (Twitter)",
    href: "https://twitter.com/atmluxuryprop",
    external: true,
    icon: <Twitter className="w-6 h-6" />,
    color: "bg-black",
  },
  {
    label: "SUBSCRIBE ON",
    title: "YouTube",
    href: "https://youtube.com/@atmluxuryproperties",
    external: true,
    icon: <Youtube className="w-6 h-6" />,
    color: "bg-[#FF0000]",
  },
  {
    label: "VIEW OUR PROPERTIES",
    title: "Listings",
    href: "/listings",
    external: false,
    icon: <List className="w-6 h-6" />,
    color: "bg-primary",
  },
  {
    label: "BOOK A SESSION",
    title: "Book Consultation",
    href: "/book-consultation",
    external: false,
    icon: <Calendar className="w-6 h-6" />,
    color: "bg-primary",
  },
  {
    label: "SEND US AN EMAIL",
    title: "Email Us",
    href: "mailto:Info@atmluxuryproperties.com",
    external: true,
    icon: <Mail className="w-6 h-6" />,
    color: "bg-primary",
  },
  {
    label: "CALL US NOW",
    title: "+234 810 681 5300",
    href: "tel:+2348106815300",
    external: true,
    icon: <Phone className="w-6 h-6" />,
    color: "bg-primary",
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
      {/* Background overlay pattern */}
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
          Get in touch with us or join our network using these links
        </p>

        {/* Links */}
        <div className="w-full space-y-4">
          {links.map((item, idx) => {
            const Card = (
              <div className="group flex items-center gap-4 w-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-xl p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                <div
                  className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white ${item.color}`}
                >
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-[10px] md:text-xs font-semibold tracking-wider text-white/60 uppercase">
                    {item.label}
                  </p>
                  <p className="text-sm md:text-base font-semibold text-white truncate">
                    {item.title}
                  </p>
                </div>
                <div className="shrink-0 text-white/60 group-hover:text-white transition-colors">
                  {item.external ? (
                    <ExternalLink className="w-5 h-5" />
                  ) : (
                    <ExternalLink className="w-5 h-5" />
                  )}
                </div>
              </div>
            );

            return item.external ? (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {Card}
              </a>
            ) : (
              <Link key={idx} to={item.href} className="block">
                {Card}
              </Link>
            );
          })}
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
