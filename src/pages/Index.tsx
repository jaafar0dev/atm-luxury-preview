import { PublicLayout } from "@/components/PublicLayout";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import { Search, ArrowRight, Building2, MapPin, Phone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import heroBg from "@/assets/hero-bg.jpg";
import sectionBg from "@/assets/section-bg.jpg";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const stats = [
  { num: "500+", label: "Properties Sold" },
  { num: "15+", label: "Years Experience" },
  { num: "98%", label: "Client Satisfaction" },
  { num: "50+", label: "Expert Agents" },
];

const propertyTypes = [
  "Apartment",
  "Bungalow",
  "Detached Bungalow",
  "Semi-Detached Bungalow",
  "Terrace Bungalow",
  "Detached Duplex",
  "Duplex",
  "Maisonette",
  "Penthouse",
  "Semi-Detached Duplex",
  "Terrace Duplex",
  "Residential Land",
  "Commercial Land",
  "Office/Suite",
  "Luxury Home",
  "Mansion",
];

const budgetOptions = [
  { label: "₦50,000", value: "50000" },
  { label: "₦100,000", value: "100000" },
  { label: "₦200,000", value: "200000" },
  { label: "₦500,000", value: "500000" },
  { label: "₦1,000,000", value: "1000000" },
  { label: "₦2,000,000", value: "2000000" },
  { label: "₦3,000,000", value: "3000000" },
  { label: "₦4,000,000", value: "4000000" },
  { label: "₦5,000,000", value: "5000000" },
  { label: "₦6,000,000", value: "6000000" },
  { label: "₦7,000,000", value: "7000000" },
  { label: "₦8,000,000", value: "8000000" },
  { label: "₦9,000,000", value: "9000000" },
  { label: "₦10,000,000", value: "10000000" },
];

const Index = () => {
  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    propertyType: "",
    subject: "",
    usagePurpose: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [heroType, setHeroType] = useState("");
  const [heroCity, setHeroCity] = useState("");
  const [heroBedrooms, setHeroBedrooms] = useState("");
  const [heroBudget, setHeroBudget] = useState("");

  // NEW: Typing effect state
  const [typedText, setTypedText] = useState("");
  const fullText = "Welcome";

  // NEW: Typing effect logic
  useEffect(() => {
    let i = 0;
    setTypedText("");
    const timer = setInterval(() => {
      setTypedText(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(timer);
    }, 150); // Speed of typing (150ms per letter)
    return () => clearInterval(timer);
  }, []);

  const { data: properties } = useQuery({
    queryKey: ["featured-properties"],
    queryFn: async () => {
      const { data } = await supabase
        .from("properties")
        .select("*")
        .eq("is_featured", true)
        .order("created_at", { ascending: false })
        .limit(6);
      return data || [];
    },
  });

  const handleInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryForm.name.trim() || !inquiryForm.email.trim()) {
      toast.error("Please fill required fields");
      return;
    }
    setSending(true);
    const { error } = await supabase.from("inquiries").insert({
      name: inquiryForm.name.trim(),
      email: inquiryForm.email.trim(),
      phone: inquiryForm.phone.trim() || null,
      property_type: inquiryForm.propertyType || null,
      subject: inquiryForm.subject.trim() || null,
      message: inquiryForm.message.trim() || null,
    });
    setSending(false);
    if (error) toast.error("Failed to send inquiry");
    else {
      toast.success("Inquiry submitted successfully!");
      setInquiryForm({
        name: "",
        email: "",
        phone: "",
        whatsapp: "",
        propertyType: "",
        subject: "",
        usagePurpose: "",
        message: "",
      });
    }
  };

  const buildSearchUrl = () => {
    const params = new URLSearchParams();
    if (heroType) params.set("type", heroType);
    if (heroCity) params.set("city", heroCity);
    if (heroBedrooms) params.set("bedrooms", heroBedrooms);
    if (heroBudget) params.set("maxPrice", heroBudget);
    return `/listings?${params.toString()}`;
  };

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <img
          src={heroBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, hsla(222,60%,16%,0.82), hsla(222,80%,20%,0.75))",
          }}
        />

        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-px h-32 bg-white/20" />
          <div className="absolute bottom-20 right-10 w-px h-32 bg-white/20" />
          <div className="absolute top-1/4 right-20 w-24 h-px bg-white/20" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          {/* UPDATED: Welcome Text with Typing Animation */}
          <div className="luxury-divider mb-6">
            <span className="text-white/80 font-accent text-sm tracking-[0.3em] uppercase min-w-[75px] inline-block text-center">
              {typedText}
              <span className="animate-pulse ml-[2px]">|</span>
            </span>
          </div>

          {/* UPDATED: Margin changed from mb-6 to mb-2 to pull the subtitle up */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-2 leading-tight animate-bounce-text">
            ATM Luxury Properties
          </h1>

          {/* UPDATED: Added mt-0 and changed mb-4 to mb-8 to keep distance from the search bar */}
          <p className="text-lg md:text-xl font-accent text-white/70 mb-8 italic tracking-wide mt-0">
            ...Your Investing Partner
          </p>

          {/* Search bar */}
          <div
            className="bg-card/95 backdrop-blur-sm rounded-xl p-5 max-w-4xl mx-auto"
            style={{ boxShadow: "var(--shadow-luxury)" }}
          >
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <Select value={heroType} onValueChange={setHeroType}>
                <SelectTrigger className="border-border/50 bg-background rounded-lg">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  {propertyTypes.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={heroCity} onValueChange={setHeroCity}>
                <SelectTrigger className="border-border/50 bg-background rounded-lg">
                  <SelectValue placeholder="All Cities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="abuja">Abuja</SelectItem>
                  <SelectItem value="lagos">Lagos</SelectItem>
                  <SelectItem value="ibadan">Ibadan</SelectItem>
                </SelectContent>
              </Select>
              <Select value={heroBedrooms} onValueChange={setHeroBedrooms}>
                <SelectTrigger className="border-border/50 bg-background rounded-lg">
                  <SelectValue placeholder="Bedrooms" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => (
                    <SelectItem key={i + 1} value={String(i + 1)}>
                      {i + 1} Bedroom{i > 0 ? "s" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={heroBudget} onValueChange={setHeroBudget}>
                <SelectTrigger className="border-border/50 bg-background rounded-lg">
                  <SelectValue placeholder="Max Price" />
                </SelectTrigger>
                <SelectContent>
                  {budgetOptions.map((b) => (
                    <SelectItem key={b.value} value={b.value}>
                      {b.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Link to={buildSearchUrl()}>
                <Button className="w-full h-10 btn-gold rounded-lg">
                  <Search size={16} className="mr-2" /> Search
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 animate-bounce-text">
          <span className="text-xs tracking-widest uppercase font-accent">
            Scroll
          </span>
          <div className="w-px h-8 bg-white/30" />
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-primary py-6">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-display font-bold text-white">
                  {stat.num}
                </div>
                <div className="text-xs text-white/60 tracking-wider uppercase mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <ScrollAnimation direction="up">
            <div className="text-center mb-14">
              <div className="luxury-divider mb-4">
                <span className="text-accent font-accent text-sm tracking-[0.2em] uppercase">
                  Our Portfolio
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
                Featured Listings
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Discover some of our recent and finest property listings across
                Nigeria's most sought-after locations
              </p>
            </div>
          </ScrollAnimation>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties?.map((p, i) => (
              <ScrollAnimation
                key={p.id}
                direction={i % 2 === 0 ? "left" : "right"}
                delay={i * 100}
              >
                <PropertyCard
                  id={p.id}
                  title={p.title}
                  price={p.price}
                  location={p.location || undefined}
                  city={p.city}
                  bedrooms={p.bedrooms || 0}
                  bathrooms={p.bathrooms || 0}
                  propertyType={p.property_type}
                  status={p.status}
                  images={p.images || []}
                  tags={p.tags || []}
                  isFeatured={p.is_featured || false}
                />
              </ScrollAnimation>
            ))}
          </div>
          {(!properties || properties.length === 0) && (
            <p className="text-center text-muted-foreground py-10">
              No properties listed yet. Check back soon!
            </p>
          )}
          <div className="text-center mt-12">
            <Link to="/listings">
              <Button
                variant="outline"
                className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 h-11 tracking-wide"
              >
                View All Listings <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us + Inquiry */}
      <section className="relative section-padding overflow-hidden">
        <img
          src={sectionBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, hsla(222,60%,16%,0.88), hsla(222,80%,20%,0.92))",
          }}
        />
        <div className="relative z-10 section-container grid grid-cols-1 lg:grid-cols-2 gap-16">
          <ScrollAnimation direction="left">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-10">
              Why Should You
              <br />
              Deal With Us?
            </h2>
            <div className="space-y-10">
              {[
                {
                  num: "01",
                  title: "Attention To Detail",
                  desc: "Our Attention to Detail ensures nothing is left to chance. We meticulously navigate every step so you have the smoothest experience possible. From first Consultation to key handover, NOTHING IS MISSED!",
                },
                {
                  num: "02",
                  title: "We Know What To Look For",
                  desc: "We focus on identifying the correct property that is on a upward valuation trajectory. Even when providing rent services, our attention to investment potential is significant. In addition, that the seller and structure of the property are well vetted. In order words, the transaction has minimal risk of reversal.",
                },
                {
                  num: "03",
                  title: "We Have Superior Negotiating Skills",
                  desc: "We fight for clients like negotiating what you can afford to maximize your best price. We've represented buyers and sellers, bringing a unique perspective to each. We also help Landlords get the best leases and help tenants get the best value properties as well as helping lease out and sell properties for land or development.",
                },
              ].map((item) => (
                <div key={item.num} className="flex gap-5">
                  <div className="shrink-0 flex flex-col items-center">
                    <span className="text-2xl font-display font-bold text-white">
                      {item.num}
                    </span>
                    <div className="w-0.5 flex-1 bg-white/20 mt-2 min-h-[40px]" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-white mb-2 text-lg">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollAnimation>

          <ScrollAnimation direction="right">
            <div
              className="bg-card rounded-xl p-8"
              style={{ boxShadow: "var(--shadow-luxury)" }}
            >
              <div className="luxury-divider justify-start mb-3">
                <span className="text-accent font-accent text-xs tracking-[0.2em] uppercase">
                  Get In Touch
                </span>
              </div>
              <h3 className="font-display font-bold text-xl text-foreground mb-6">
                Got Any Enquiry?
              </h3>
              <form onSubmit={handleInquiry} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    className="rounded-lg border-border/60"
                    placeholder="Full Name *"
                    value={inquiryForm.name}
                    onChange={(e) =>
                      setInquiryForm({ ...inquiryForm, name: e.target.value })
                    }
                    required
                  />
                  <Input
                    className="rounded-lg border-border/60"
                    type="email"
                    placeholder="Email Address *"
                    value={inquiryForm.email}
                    onChange={(e) =>
                      setInquiryForm({ ...inquiryForm, email: e.target.value })
                    }
                    required
                  />
                  <Input
                    className="rounded-lg border-border/60"
                    placeholder="Phone Number"
                    value={inquiryForm.phone}
                    onChange={(e) =>
                      setInquiryForm({ ...inquiryForm, phone: e.target.value })
                    }
                  />
                  <Input
                    className="rounded-lg border-border/60"
                    placeholder="WhatsApp (Optional)"
                    value={inquiryForm.whatsapp}
                    onChange={(e) =>
                      setInquiryForm({
                        ...inquiryForm,
                        whatsapp: e.target.value,
                      })
                    }
                  />
                </div>
                <Select
                  onValueChange={(v) =>
                    setInquiryForm({ ...inquiryForm, propertyType: v })
                  }
                >
                  <SelectTrigger className="rounded-lg border-border/60">
                    <SelectValue placeholder="Property Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  className="rounded-lg border-border/60"
                  placeholder="Purpose (Use / Living / Rental)"
                  value={inquiryForm.usagePurpose}
                  onChange={(e) =>
                    setInquiryForm({
                      ...inquiryForm,
                      usagePurpose: e.target.value,
                    })
                  }
                />
                <Textarea
                  className="rounded-lg border-border/60 min-h-[100px]"
                  placeholder="Additional information"
                  value={inquiryForm.message}
                  onChange={(e) =>
                    setInquiryForm({ ...inquiryForm, message: e.target.value })
                  }
                />
                <Button
                  type="submit"
                  disabled={sending}
                  className="w-full btn-gold rounded-full h-11 tracking-wide"
                >
                  {sending ? "Sending..." : "Submit Enquiry"}
                </Button>
              </form>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Explore Popular Areas */}
      <section className="relative section-padding overflow-hidden">
        <img
          src={heroBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, hsla(222,60%,16%,0.9), hsla(222,80%,20%,0.85))",
          }}
        />
        <div className="relative z-10 section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollAnimation direction="left">
              <div className="luxury-divider justify-start mb-4">
                <span className="text-white/80 font-accent text-sm tracking-[0.2em] uppercase">
                  Prime Locations
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                Explore Our Most
                <br />
                Popular Areas
              </h2>
              <p className="text-white/60 mb-10 max-w-md leading-relaxed">
                See what these exclusive areas have to offer and find your
                perfect home in Nigeria's most prestigious neighborhoods.
              </p>
              <div className="space-y-5 mb-10">
                {[
                  {
                    name: "Lekki, Lagos",
                    desc: "Discover coastal luxury living in one of Lagos' most desirable neighborhoods",
                  },
                  {
                    name: "Maitama, Abuja",
                    desc: "Explore contemporary elegance in the heart of Nigeria's capital",
                  },
                  {
                    name: "Asokoro, Abuja",
                    desc: "Premium residential district with world-class amenities",
                  },
                ].map((area) => (
                  <div
                    key={area.name}
                    className="flex items-start gap-4 group cursor-pointer"
                  >
                    <div className="shrink-0 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                      <MapPin size={16} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-white group-hover:text-white/80 transition-colors">
                        {area.name}
                      </h3>
                      <p className="text-sm text-white/50">{area.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/listings">
                <Button className="rounded-full border border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white px-8 h-11 tracking-wide">
                  View All Areas <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </ScrollAnimation>

            <ScrollAnimation direction="right">
              <div className="hidden lg:grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-white/10 border border-white/20 rounded-xl p-6 text-center">
                    <Building2 size={28} className="text-white mx-auto mb-3" />
                    <div className="text-2xl font-display font-bold text-white">
                      120+
                    </div>
                    <div className="text-xs text-white/50 tracking-wider uppercase mt-1">
                      Lekki Properties
                    </div>
                  </div>
                  <div className="bg-white/10 border border-white/20 rounded-xl p-6 text-center">
                    <Building2 size={28} className="text-white mx-auto mb-3" />
                    <div className="text-2xl font-display font-bold text-white">
                      85+
                    </div>
                    <div className="text-xs text-white/50 tracking-wider uppercase mt-1">
                      Maitama Properties
                    </div>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-white/10 border border-white/20 rounded-xl p-6 text-center">
                    <Building2 size={28} className="text-white mx-auto mb-3" />
                    <div className="text-2xl font-display font-bold text-white">
                      60+
                    </div>
                    <div className="text-xs text-white/50 tracking-wider uppercase mt-1">
                      Asokoro Properties
                    </div>
                  </div>
                  <div className="bg-white/10 border border-white/20 rounded-xl p-6 text-center">
                    <Phone size={28} className="text-white mx-auto mb-3" />
                    <div className="text-sm font-display font-semibold text-white">
                      Get Expert Advice
                    </div>
                    <div className="text-xs text-white/50 mt-1">
                      +234-810-681-5300
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-background">
        <div className="section-container text-center max-w-3xl mx-auto">
          <ScrollAnimation direction="up">
            <div className="luxury-divider mb-4">
              <span className="text-accent font-accent text-sm tracking-[0.2em] uppercase">
                Start Your Journey
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Ready To Find Your Dream Property?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
              Let our expert team guide you through every step of the process.
              From property selection to final closing, we're with you all the
              way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/listings">
                <Button className="btn-gold rounded-full px-8 h-12 tracking-wide">
                  Browse Properties <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  variant="outline"
                  className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 h-12 tracking-wide"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Index;
