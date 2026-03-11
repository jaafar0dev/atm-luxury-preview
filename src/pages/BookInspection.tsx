import { PublicLayout } from "@/components/PublicLayout";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Home, MapPin, User, CalendarDays, MessageSquare } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const BookInspection = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", whatsapp: "",
    propertyType: "", city: "", budget: "", specificArea: "",
    preferredDate: "", preferredTime: "", message: "",
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
        "INSPECTION REQUEST",
        form.whatsapp && `WhatsApp: ${form.whatsapp}`,
        form.propertyType && `Property Type: ${form.propertyType}`,
        form.city && `City: ${form.city}`,
        form.budget && `Budget: ${form.budget}`,
        form.specificArea && `Area: ${form.specificArea}`,
        form.preferredTime && `Preferred Time: ${form.preferredTime}`,
        form.message,
      ].filter(Boolean).join("\n") || null,
    });
    setLoading(false);
    if (error) toast.error("Failed to submit inspection request");
    else {
      toast.success("Inspection request submitted successfully!");
      setForm({ name: "", email: "", phone: "", whatsapp: "", propertyType: "", city: "", budget: "", specificArea: "", preferredDate: "", preferredTime: "", message: "" });
    }
  };

  return (
    <PublicLayout>
      <PageHero title="Book a Property Inspection" subtitle="Schedule a visit to view your dream property with our expert team" />

      {/* Benefits */}
      <section className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { icon: Clock, title: "Quick Response", desc: "We respond within 24 hours" },
            { icon: Home, title: "Expert Guidance", desc: "Professional property tour" },
            { icon: MapPin, title: "Multiple Locations", desc: "Properties across Nigeria" },
          ].map((b) => (
            <div key={b.title} className="bg-card border border-border rounded-xl p-6 text-center">
              <b.icon size={32} className="text-primary mx-auto mb-3" />
              <h3 className="font-display font-bold text-foreground mb-1">{b.title}</h3>
              <p className="text-sm text-muted-foreground">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Form */}
      <section className="section-container py-8 pb-16">
        <div className="max-w-3xl mx-auto bg-card border border-border rounded-xl p-8">
          <h2 className="text-2xl font-display font-bold text-foreground mb-1">Inspection Request Form</h2>
          <p className="text-muted-foreground text-sm mb-6">Fill in your details and we'll arrange the perfect time for your visit</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Info */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <User size={16} className="text-primary" />
                <h3 className="font-display font-bold text-foreground">Personal Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-foreground mb-1 block">Full Name *</label>
                  <Input placeholder="Enter your full name" className="rounded-lg" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div>
                  <label className="text-sm text-foreground mb-1 block">Email Address *</label>
                  <Input type="email" placeholder="your@email.com" className="rounded-lg" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                </div>
                <div>
                  <label className="text-sm text-foreground mb-1 block">Phone Number *</label>
                  <Input placeholder="+234 XXX XXX XXXX" className="rounded-lg" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
                </div>
                <div>
                  <label className="text-sm text-foreground mb-1 block">WhatsApp Number</label>
                  <Input placeholder="+234 XXX XXX XXXX" className="rounded-lg" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} />
                </div>
              </div>
            </div>

            {/* Property Preferences */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Home size={16} className="text-primary" />
                <h3 className="font-display font-bold text-foreground">Property Preferences</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-foreground mb-1 block">Property Type *</label>
                  <Select value={form.propertyType} onValueChange={(v) => setForm({ ...form, propertyType: v })}>
                    <SelectTrigger className="rounded-lg"><SelectValue placeholder="Select property type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Residential">Residential</SelectItem>
                      <SelectItem value="Commercial">Commercial</SelectItem>
                      <SelectItem value="Land">Land</SelectItem>
                      <SelectItem value="Mixed-Use">Mixed-Use</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm text-foreground mb-1 block">Preferred City *</label>
                  <Select value={form.city} onValueChange={(v) => setForm({ ...form, city: v })}>
                    <SelectTrigger className="rounded-lg"><SelectValue placeholder="Select city" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Abuja">Abuja</SelectItem>
                      <SelectItem value="Lagos">Lagos</SelectItem>
                      <SelectItem value="Ibadan">Ibadan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm text-foreground mb-1 block">Budget Range</label>
                  <Input placeholder="e.g., ₦50M - ₦100M" className="rounded-lg" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm text-foreground mb-1 block">Specific Property/Area (if any)</label>
                  <Input placeholder="e.g., Lekki Phase 1, Maitama" className="rounded-lg" value={form.specificArea} onChange={(e) => setForm({ ...form, specificArea: e.target.value })} />
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CalendarDays size={16} className="text-primary" />
                <h3 className="font-display font-bold text-foreground">Schedule Your Visit</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-foreground mb-1 block">Preferred Date *</label>
                  <Input type="date" className="rounded-lg" value={form.preferredDate} onChange={(e) => setForm({ ...form, preferredDate: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm text-foreground mb-1 block">Preferred Time *</label>
                  <Select value={form.preferredTime} onValueChange={(v) => setForm({ ...form, preferredTime: v })}>
                    <SelectTrigger className="rounded-lg"><SelectValue placeholder="Select time slot" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                      <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                      <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                      <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                      <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                      <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                      <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                      <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare size={16} className="text-primary" />
                <h3 className="font-display font-bold text-foreground">Additional Information</h3>
              </div>
              <label className="text-sm text-foreground mb-1 block">Message (Optional)</label>
              <Textarea placeholder="Tell us more about what you're looking for, any specific requirements, or questions you have..." className="rounded-lg min-h-[100px]" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            </div>

            <Button type="submit" disabled={loading} className="w-full btn-gold rounded-full h-12 text-base">
              {loading ? "Submitting..." : "Submit Inspection Request"}
            </Button>
          </form>
        </div>

        <div className="text-center mt-8 text-sm text-muted-foreground">
          Need immediate assistance? Contact us directly<br />
          <a href="tel:+2348106815300" className="text-primary hover:underline">+234 810 681 5300 (WhatsApp)</a>
          {" · "}
          <a href="mailto:info@atmluxuryproperties.com" className="text-primary hover:underline">info@atmluxuryproperties.com</a>
        </div>
      </section>
    </PublicLayout>
  );
};

export default BookInspection;
