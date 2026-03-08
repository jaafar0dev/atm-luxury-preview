import { PublicLayout } from "@/components/PublicLayout";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { Search, Shield, Eye, Award, ArrowRight, Building2, MapPin, Phone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import heroBg from "@/assets/hero-bg.jpg";
import sectionBg from "@/assets/section-bg.jpg";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

const stats = [
  { num: "500+", label: "Properties Sold" },
  { num: "15+", label: "Years Experience" },
  { num: "98%", label: "Client Satisfaction" },
  { num: "50+", label: "Expert Agents" },
];

const Index = () => {
  const [inquiryForm, setInquiryForm] = useState({ name: "", email: "", phone: "", whatsapp: "", propertyType: "", subject: "", usagePurpose: "", message: "" });
  const [sending, setSending] = useState(false);
  const [heroType, setHeroType] = useState("");
  const [heroCity, setHeroCity] = useState("");
  const [heroStatus, setHeroStatus] = useState("");

  const { data: properties } = useQuery({
    queryKey: ["featured-properties"],
    queryFn: async () => {
      const { data } = await supabase.from("properties").select("*").eq("is_featured", true).order("created_at", { ascending: false }).limit(6);
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
      setInquiryForm({ name: "", email: "", phone: "", whatsapp: "", propertyType: "", subject: "", usagePurpose: "", message: "" });
    }
  };

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover scale-105" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsla(212,60%,16%,0.82), hsla(207,80%,20%,0.75))" }} />
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-px h-32 bg-accent/20" />
          <div className="absolute bottom-20 right-10 w-px h-32 bg-accent/20" />
          <div className="absolute top-1/4 right-20 w-24 h-px bg-accent/20" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="luxury-divider mb-6">
            <span className="text-white/80 font-accent text-sm tracking-[0.3em] uppercase">Luxury Real Estate</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight animate-bounce-text">
            ATM Luxury Properties
          </h1>
          <p className="text-lg md:text-xl font-accent text-white/70 mb-4 italic tracking-wide">Choosing The Right Luxury</p>
          <p className="text-sm text-white/50 max-w-xl mx-auto mb-10">
            Nigeria's premier destination for exclusive residential and commercial properties. Experience real estate excellence.
          </p>

          {/* Search bar */}
          <div className="bg-card/95 backdrop-blur-sm rounded-sm p-5 max-w-3xl mx-auto" style={{ boxShadow: "var(--shadow-luxury)" }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Select value={heroType} onValueChange={setHeroType}>
                <SelectTrigger className="border-border/50 bg-background"><SelectValue placeholder="Property Type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="land">Land</SelectItem>
                  <SelectItem value="houses">Houses</SelectItem>
                </SelectContent>
              </Select>
              <Select value={heroCity} onValueChange={setHeroCity}>
                <SelectTrigger className="border-border/50 bg-background"><SelectValue placeholder="City" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="abuja">Abuja</SelectItem>
                  <SelectItem value="lagos">Lagos</SelectItem>
                  <SelectItem value="ibadan">Ibadan</SelectItem>
                </SelectContent>
              </Select>
              <Select value={heroStatus} onValueChange={setHeroStatus}>
                <SelectTrigger className="border-border/50 bg-background"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="for-sale">For Sale</SelectItem>
                  <SelectItem value="for-rent">For Rent</SelectItem>
                </SelectContent>
              </Select>
              <Link to={`/listings?type=${heroType}&status=${heroStatus}&city=${heroCity}`}>
                <Button className="w-full h-10 btn-gold rounded-sm">
                  <Search size={16} className="mr-2" /> Search
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 animate-bounce-text">
          <span className="text-xs tracking-widest uppercase font-accent">Scroll</span>
          <div className="w-px h-8 bg-white/30" />
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-primary py-6">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-display font-bold text-white">{stat.num}</div>
                <div className="text-xs text-white/60 tracking-wider uppercase mt-1">{stat.label}</div>
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
                <span className="text-accent font-accent text-sm tracking-[0.2em] uppercase">Our Portfolio</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">Featured Listings</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">Discover some of our recent and finest property listings across Nigeria's most sought-after locations</p>
            </div>
          </ScrollAnimation>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties?.map((p, i) => (
              <ScrollAnimation key={p.id} direction={i % 2 === 0 ? "left" : "right"} delay={i * 100}>
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
            <p className="text-center text-muted-foreground py-10">No properties listed yet. Check back soon!</p>
          )}
          <div className="text-center mt-12">
            <Link to="/listings">
              <Button variant="outline" className="rounded-sm border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 h-11 tracking-wide">
                View All Listings <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us + Inquiry */}
      <section className="relative section-padding overflow-hidden">
        <img src={sectionBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsla(212,60%,16%,0.88), hsla(207,80%,20%,0.92))" }} />
        <div className="relative z-10 section-container grid grid-cols-1 lg:grid-cols-2 gap-16">
          <ScrollAnimation direction="left">
            <div className="luxury-divider justify-start mb-4">
              <span className="text-white/80 font-accent text-sm tracking-[0.2em] uppercase">Our Promise</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-10">Why Should You<br />Deal With Us?</h2>
            <div className="space-y-8">
              {[
                { icon: Shield, num: "01", title: "Amazing Attention To Detail", desc: "Our meticulous approach ensures nothing is overlooked. The relationship we maintain between quality investment is unparalleled in the industry." },
                { icon: Eye, num: "02", title: "Expert Property Evaluation", desc: "We understand what searching for the perfect property means to a prospective investor. Our verifications are carefully and thoroughly carried out." },
                { icon: Award, num: "03", title: "Superior Negotiating Skills", desc: "We fight for the best deal by acquiring a price that fits an affordable budget for our clients, ensuring maximum value for every transaction." },
              ].map((item) => (
                <div key={item.num} className="flex gap-5 group">
                  <div className="shrink-0 w-12 h-12 rounded-sm bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <item.icon size={20} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-secondary mb-1.5 text-lg">{item.title}</h3>
                    <p className="text-sm text-secondary/60 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollAnimation>

          <ScrollAnimation direction="right">
            <div className="bg-card rounded-sm p-8" style={{ boxShadow: "var(--shadow-luxury)" }}>
              <div className="luxury-divider justify-start mb-3">
                <span className="text-accent font-accent text-xs tracking-[0.2em] uppercase">Get In Touch</span>
              </div>
              <h3 className="font-display font-bold text-xl text-foreground mb-6">Got Any Enquiry?</h3>
              <form onSubmit={handleInquiry} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Input className="rounded-sm border-border/60" placeholder="Full Name *" value={inquiryForm.name} onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })} required />
                  <Input className="rounded-sm border-border/60" type="email" placeholder="Email Address *" value={inquiryForm.email} onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })} required />
                  <Input className="rounded-sm border-border/60" placeholder="Phone Number" value={inquiryForm.phone} onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })} />
                  <Input className="rounded-sm border-border/60" placeholder="WhatsApp (Optional)" value={inquiryForm.whatsapp} onChange={(e) => setInquiryForm({ ...inquiryForm, whatsapp: e.target.value })} />
                </div>
                <Select onValueChange={(v) => setInquiryForm({ ...inquiryForm, propertyType: v })}>
                  <SelectTrigger className="rounded-sm border-border/60"><SelectValue placeholder="Property Type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential-land">Residential Land</SelectItem>
                    <SelectItem value="commercial-land">Commercial Land</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                  </SelectContent>
                </Select>
                <Input className="rounded-sm border-border/60" placeholder="Purpose (Use / Living / Rental)" value={inquiryForm.usagePurpose} onChange={(e) => setInquiryForm({ ...inquiryForm, usagePurpose: e.target.value })} />
                <Textarea className="rounded-sm border-border/60 min-h-[100px]" placeholder="Additional information" value={inquiryForm.message} onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })} />
                <Button type="submit" disabled={sending} className="w-full btn-gold rounded-sm h-11 tracking-wide">
                  {sending ? "Sending..." : "Submit Enquiry"}
                </Button>
              </form>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Explore Popular Areas */}
      <section className="relative section-padding overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsla(212,60%,16%,0.9), hsla(207,80%,20%,0.85))" }} />
        <div className="relative z-10 section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollAnimation direction="left">
              <div className="luxury-divider justify-start mb-4">
                <span className="text-accent font-accent text-sm tracking-[0.2em] uppercase">Prime Locations</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-4">Explore Our Most<br />Popular Areas</h2>
              <p className="text-secondary/60 mb-10 max-w-md leading-relaxed">See what these exclusive areas have to offer and find your perfect home in Nigeria's most prestigious neighborhoods.</p>
              <div className="space-y-5 mb-10">
                {[
                  { name: "Lekki, Lagos", desc: "Discover coastal luxury living in one of Lagos' most desirable neighborhoods" },
                  { name: "Maitama, Abuja", desc: "Explore contemporary elegance in the heart of Nigeria's capital" },
                  { name: "Asokoro, Abuja", desc: "Premium residential district with world-class amenities" },
                ].map((area) => (
                  <div key={area.name} className="flex items-start gap-4 group cursor-pointer">
                    <div className="shrink-0 w-10 h-10 rounded-sm bg-accent/10 border border-accent/20 flex items-center justify-center">
                      <MapPin size={16} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-secondary group-hover:text-accent transition-colors">{area.name}</h3>
                      <p className="text-sm text-secondary/50">{area.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/listings">
                <Button variant="outline" className="rounded-sm border-accent/30 text-secondary hover:bg-accent/10 px-8 h-11 tracking-wide">
                  View All Areas <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </ScrollAnimation>

            <ScrollAnimation direction="right">
              <div className="hidden lg:grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-accent/10 border border-accent/20 rounded-sm p-6 text-center">
                    <Building2 size={28} className="text-accent mx-auto mb-3" />
                    <div className="text-2xl font-display font-bold text-secondary">120+</div>
                    <div className="text-xs text-secondary/50 tracking-wider uppercase mt-1">Lekki Properties</div>
                  </div>
                  <div className="bg-accent/10 border border-accent/20 rounded-sm p-6 text-center">
                    <Building2 size={28} className="text-accent mx-auto mb-3" />
                    <div className="text-2xl font-display font-bold text-secondary">85+</div>
                    <div className="text-xs text-secondary/50 tracking-wider uppercase mt-1">Maitama Properties</div>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-accent/10 border border-accent/20 rounded-sm p-6 text-center">
                    <Building2 size={28} className="text-accent mx-auto mb-3" />
                    <div className="text-2xl font-display font-bold text-secondary">60+</div>
                    <div className="text-xs text-secondary/50 tracking-wider uppercase mt-1">Asokoro Properties</div>
                  </div>
                  <div className="bg-accent/10 border border-accent/20 rounded-sm p-6 text-center">
                    <Phone size={28} className="text-accent mx-auto mb-3" />
                    <div className="text-sm font-display font-semibold text-secondary">Get Expert Advice</div>
                    <div className="text-xs text-secondary/50 mt-1">+234-810-681-5300</div>
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
              <span className="text-accent font-accent text-sm tracking-[0.2em] uppercase">Start Your Journey</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Ready To Find Your Dream Property?</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
              Let our expert team guide you through every step of the process. From property selection to final closing, we're with you all the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/listings">
                <Button className="btn-gold rounded-sm px-8 h-12 tracking-wide">
                  Browse Properties <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="rounded-sm border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 h-12 tracking-wide">
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
