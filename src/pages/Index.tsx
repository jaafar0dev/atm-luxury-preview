import { PublicLayout } from "@/components/PublicLayout";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { Search, Shield, Eye, Award } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import heroBg from "@/assets/hero-bg.jpg";
import sectionBg from "@/assets/section-bg.jpg";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

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
      toast.success("Inquiry submitted!");
      setInquiryForm({ name: "", email: "", phone: "", whatsapp: "", propertyType: "", subject: "", usagePurpose: "", message: "" });
    }
  };

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/70 to-primary/60" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground mb-4 animate-bounce-text">
            Welcome To ATM Luxury Properties
          </h1>
          <p className="text-lg text-primary-foreground/80 mb-8">Choosing The Right Luxury</p>

          {/* Search bar */}
          <div className="bg-background rounded-lg p-4 max-w-3xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Select value={heroType} onValueChange={setHeroType}>
                <SelectTrigger><SelectValue placeholder="Property Type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="land">Land</SelectItem>
                  <SelectItem value="houses">Houses</SelectItem>
                </SelectContent>
              </Select>
              <Select value={heroCity} onValueChange={setHeroCity}>
                <SelectTrigger><SelectValue placeholder="City" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="abuja">Abuja</SelectItem>
                  <SelectItem value="lagos">Lagos</SelectItem>
                  <SelectItem value="ibadan">Ibadan</SelectItem>
                </SelectContent>
              </Select>
              <Select value={heroStatus} onValueChange={setHeroStatus}>
                <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="for-sale">For Sale</SelectItem>
                  <SelectItem value="for-rent">For Rent</SelectItem>
                </SelectContent>
              </Select>
              <Link to={`/listings?type=${heroType}&status=${heroStatus}&city=${heroCity}`}>
                <Button className="btn-primary w-full h-10">
                  <Search size={16} className="mr-2" /> Search
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="section-container py-16">
        <ScrollAnimation direction="up">
          <h2 className="text-3xl font-display font-bold text-center text-foreground mb-2">Featured Listings</h2>
          <p className="text-center text-muted-foreground mb-10">Discover some of our recent and finest listings</p>
        </ScrollAnimation>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <div className="text-center mt-8">
          <Link to="/listings">
            <Button variant="outline">View All Listings</Button>
          </Link>
        </div>
      </section>

      {/* Why Choose Us + Inquiry */}
      <section className="relative py-16 overflow-hidden">
        <img src={sectionBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10 section-container grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ScrollAnimation direction="left">
            <h2 className="text-3xl font-display font-bold text-primary-foreground mb-8">Why Should You Deal With Us?</h2>
            <div className="space-y-6">
              {[
                { icon: Shield, num: "01", title: "Amazing In Detail", desc: "Our attention to detail ensures nothing is overlooked. The relationship we maintain between quality investment is one to reckon with." },
                { icon: Eye, num: "02", title: "We Know What To Look For", desc: "We know for searching for properties means a lot to a prospective investor. Our verifications are carefully carried out." },
                { icon: Award, num: "03", title: "We Have Superior Negotiating Skills", desc: "We fight for the best deal by acquiring a price to fit an affordable budget for our clients." },
              ].map((item) => (
                <div key={item.num} className="flex gap-4">
                  <span className="text-2xl font-display font-bold text-primary-foreground/40">{item.num}.</span>
                  <div>
                    <h3 className="font-display font-semibold text-primary-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-primary-foreground/70">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollAnimation>

          <ScrollAnimation direction="right">
            <div className="bg-background rounded-lg p-6">
              <h3 className="font-display font-bold text-lg text-foreground mb-4">Got Any Enquiry?</h3>
              <form onSubmit={handleInquiry} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="Last Name" value={inquiryForm.name} onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })} required />
                  <Input type="email" placeholder="Email Address" value={inquiryForm.email} onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })} required />
                  <Input placeholder="Phone Number" value={inquiryForm.phone} onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })} />
                  <Input placeholder="WhatsApp (Optional)" value={inquiryForm.whatsapp} onChange={(e) => setInquiryForm({ ...inquiryForm, whatsapp: e.target.value })} />
                </div>
                <Select onValueChange={(v) => setInquiryForm({ ...inquiryForm, propertyType: v })}>
                  <SelectTrigger><SelectValue placeholder="Property Type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential-land">Residential Land</SelectItem>
                    <SelectItem value="commercial-land">Commercial Land</SelectItem>
                    <SelectItem value="duplex">Duplex</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="Use / living / rental" value={inquiryForm.usagePurpose} onChange={(e) => setInquiryForm({ ...inquiryForm, usagePurpose: e.target.value })} />
                <Textarea placeholder="Additional information" value={inquiryForm.message} onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })} />
                <Button type="submit" disabled={sending} className="w-full btn-primary">
                  {sending ? "Sending..." : "Submit Enquiry"}
                </Button>
              </form>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Explore Popular Areas */}
      <section className="relative py-16 overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/80" />
        <div className="relative z-10 section-container">
          <ScrollAnimation direction="left">
            <h2 className="text-3xl font-display font-bold text-primary-foreground mb-4">Explore Our Most Popular Areas</h2>
            <p className="text-primary-foreground/70 mb-8">See what these areas have to offer and buy your perfect home</p>
            <div className="space-y-3 mb-6">
              <div>
                <h3 className="font-display font-semibold text-primary-foreground">Lekki</h3>
                <p className="text-sm text-primary-foreground/60">Discover what lekki has to offer...</p>
              </div>
              <div>
                <h3 className="font-display font-semibold text-primary-foreground">Maitama</h3>
                <p className="text-sm text-primary-foreground/60">Explore contemporary living in Maitama...</p>
              </div>
            </div>
            <Link to="/listings">
              <Button variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">View All Areas</Button>
            </Link>
          </ScrollAnimation>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Index;
