import { PublicLayout } from "@/components/PublicLayout";
import { PageHero } from "@/components/PageHero";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Home, TrendingUp, ClipboardList, CheckCircle } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const BookConsultation = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "", email: "", consultationType: "", budgetRange: "",
    propertyType: "", preferredLocation: "", preferredDate: "", preferredTime: "", notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("consultations").insert({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      preferred_date: form.preferredDate || null,
      notes: [
        form.consultationType && `Consultation Type: ${form.consultationType}`,
        form.budgetRange && `Budget: ${form.budgetRange}`,
        form.propertyType && `Property Type: ${form.propertyType}`,
        form.preferredLocation && `Location: ${form.preferredLocation}`,
        form.preferredTime && `Preferred Time: ${form.preferredTime}`,
        form.notes,
      ].filter(Boolean).join("\n") || null,
    });
    setLoading(false);
    if (error) toast.error("Failed to submit consultation request");
    else {
      toast.success("Consultation request submitted successfully!");
      setForm({ name: "", phone: "", email: "", consultationType: "", budgetRange: "", propertyType: "", preferredLocation: "", preferredDate: "", preferredTime: "", notes: "" });
    }
  };

  return (
    <PublicLayout>
      <PageHero title="Expert Real Estate Consultation" subtitle="Connect with our luxury property specialists for personalized guidance tailored to your unique needs" />

      <section className="section-container py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-foreground mb-2">Book Your Consultation</h2>
          <p className="text-muted-foreground">Fill out the form below and our experts will contact you to schedule your personalized consultation</p>
        </div>

        <div className="max-w-3xl mx-auto bg-card border border-border rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="Full Name *" className="rounded-lg" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              <Input placeholder="Phone Number *" className="rounded-lg" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
            </div>
            <Input type="email" placeholder="Email Address *" className="rounded-lg" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select value={form.consultationType} onValueChange={(v) => setForm({ ...form, consultationType: v })}>
                <SelectTrigger className="rounded-lg"><SelectValue placeholder="Consultation Type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Property Buying">Property Buying</SelectItem>
                  <SelectItem value="Property Investment">Property Investment</SelectItem>
                  <SelectItem value="Property Management">Property Management</SelectItem>
                </SelectContent>
              </Select>
              <Select value={form.budgetRange} onValueChange={(v) => setForm({ ...form, budgetRange: v })}>
                <SelectTrigger className="rounded-lg"><SelectValue placeholder="Budget Range" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Under ₦50M">Under ₦50M</SelectItem>
                  <SelectItem value="₦50M - ₦100M">₦50M - ₦100M</SelectItem>
                  <SelectItem value="₦100M - ₦500M">₦100M - ₦500M</SelectItem>
                  <SelectItem value="Above ₦500M">Above ₦500M</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select value={form.propertyType} onValueChange={(v) => setForm({ ...form, propertyType: v })}>
                <SelectTrigger className="rounded-lg"><SelectValue placeholder="Property Type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Residential">Residential</SelectItem>
                  <SelectItem value="Commercial">Commercial</SelectItem>
                  <SelectItem value="Land">Land</SelectItem>
                  <SelectItem value="Mixed-Use">Mixed-Use</SelectItem>
                </SelectContent>
              </Select>
              <Select value={form.preferredLocation} onValueChange={(v) => setForm({ ...form, preferredLocation: v })}>
                <SelectTrigger className="rounded-lg"><SelectValue placeholder="Preferred Location" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Abuja">Abuja</SelectItem>
                  <SelectItem value="Lagos">Lagos</SelectItem>
                  <SelectItem value="Ibadan">Ibadan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input type="date" placeholder="Preferred Date" className="rounded-lg" value={form.preferredDate} onChange={(e) => setForm({ ...form, preferredDate: e.target.value })} />
              <Input type="time" placeholder="Preferred Time" className="rounded-lg" value={form.preferredTime} onChange={(e) => setForm({ ...form, preferredTime: e.target.value })} />
            </div>
            <Textarea placeholder="Additional Information" className="rounded-lg min-h-[100px]" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            <Button type="submit" disabled={loading} className="w-full btn-gold rounded-full h-12">
              <CheckCircle size={16} className="mr-2" />
              {loading ? "Submitting..." : "Submit Consultation Request"}
            </Button>
          </form>
        </div>
      </section>

      {/* Services */}
      <section className="section-container py-16">
        <ScrollAnimation direction="up">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display font-bold text-foreground mb-2">Our Consultation Services</h2>
            <p className="text-muted-foreground">Specialized expertise to guide you through every aspect of luxury real estate</p>
          </div>
        </ScrollAnimation>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { icon: Home, title: "Property Buying", desc: "Expert guidance on purchasing your dream property with tailored advice for your budget and preferences." },
            { icon: TrendingUp, title: "Property Investment", desc: "Strategic investment advice to maximize returns on your real estate portfolio." },
            { icon: ClipboardList, title: "Property Management", desc: "Comprehensive management services for landlords and property owners." },
          ].map((s) => (
            <ScrollAnimation key={s.title} direction="up">
              <div className="bg-card border border-border rounded-xl p-6 text-center card-hover">
                <s.icon size={32} className="text-primary mx-auto mb-4" />
                <h3 className="font-display font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="section-container py-16">
        <ScrollAnimation direction="up">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display font-bold text-foreground mb-2">Our Consultation Process</h2>
            <p className="text-muted-foreground">A structured approach to ensure you receive comprehensive real estate guidance</p>
          </div>
        </ScrollAnimation>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { num: "01", title: "Initial Consultation", desc: "Discuss your goals and requirements with our expert consultants" },
            { num: "02", title: "Market Analysis", desc: "Receive detailed market insights and property recommendations" },
            { num: "03", title: "Custom Strategy", desc: "Get a personalized action plan tailored to your objectives" },
            { num: "04", title: "Ongoing Support", desc: "Continuous assistance throughout your real estate journey" },
          ].map((step) => (
            <ScrollAnimation key={step.num} direction="up">
              <div className="text-center">
                <div className="w-14 h-14 rounded-full border-2 border-primary flex items-center justify-center mx-auto mb-3">
                  <span className="font-display font-bold text-primary">{step.num}</span>
                </div>
                <h3 className="font-display font-bold text-foreground text-sm mb-1">{step.title}</h3>
                <p className="text-xs text-muted-foreground">{step.desc}</p>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-container py-16">
        <ScrollAnimation direction="up">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display font-bold text-foreground mb-2">Client Success Stories</h2>
            <p className="text-muted-foreground">Hear from clients who have benefited from our expert consultation services</p>
          </div>
        </ScrollAnimation>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            { initials: "JD", name: "John Doe", role: "Property Investor", quote: "The consultation with ATM Luxury Properties completely transformed my approach to property investment. Their market insights helped me identify opportunities I would have otherwise missed." },
            { initials: "MS", name: "Mary Smith", role: "Home Buyer", quote: "Exceptional service from start to finish. Their personalized approach made all the difference in finding my dream home." },
          ].map((t) => (
            <ScrollAnimation key={t.initials} direction="up">
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">{t.initials}</div>
                  <div>
                    <div className="font-display font-bold text-foreground text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground italic">"{t.quote}"</p>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="section-container text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-3">Ready to Transform Your Real Estate Journey?</h2>
          <p className="text-white/70 mb-6 max-w-xl mx-auto">Schedule your complimentary consultation with our luxury property experts today</p>
          <Link to="/listings">
            <Button variant="outline" className="rounded-full border-white text-white hover:bg-white hover:text-primary px-8 h-11">
              Explore Properties
            </Button>
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
};

export default BookConsultation;
