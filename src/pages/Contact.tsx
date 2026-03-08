import { PublicLayout } from "@/components/PublicLayout";
import { PageHero } from "@/components/PageHero";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }
    setSending(true);
    const { error } = await supabase.from("messages").insert({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      message: form.message.trim(),
    });
    setSending(false);
    if (error) toast.error("Failed to send message");
    else {
      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", phone: "", message: "" });
    }
  };

  return (
    <PublicLayout>
      <PageHero title="Contact Us" subtitle="Get in touch with our team for any inquiries" />

      <section className="section-container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <ScrollAnimation direction="left">
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="font-display font-bold text-xl text-foreground mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input placeholder="Enter Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                <Input type="email" placeholder="Enter Email Address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                <Input placeholder="+234 Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                <Textarea placeholder="Type your enquiry here" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
                <Button type="submit" disabled={sending} className="btn-primary w-full rounded-full">
                  <Send size={16} className="mr-2" /> {sending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </ScrollAnimation>

          {/* Contact info */}
          <ScrollAnimation direction="right">
            <h2 className="font-display font-bold text-xl text-foreground mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
                <MapPin className="text-primary shrink-0 mt-0.5" size={20} />
                <div>
                  <h3 className="font-semibold text-foreground text-sm">Abuja Office</h3>
                  <p className="text-sm text-muted-foreground">Suite D 47, Anon Plaza, Gudu District, Abuja</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
                <MapPin className="text-primary shrink-0 mt-0.5" size={20} />
                <div>
                  <h3 className="font-semibold text-foreground text-sm">Lagos Office</h3>
                  <p className="text-sm text-muted-foreground">KM 48, BRG Building, Beside Skymall, Sangotedo, Lekki, Lagos</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
                <Phone className="text-primary shrink-0 mt-0.5" size={20} />
                <div className="text-sm">
                  <a href="tel:+2348106815300" className="text-muted-foreground hover:text-primary block">+234-810-681-5300 (Call/WhatsApp)</a>
                  <a href="tel:+2349037075934" className="text-muted-foreground hover:text-primary block">+234-903-707-5934 (Call/WhatsApp)</a>
                  <a href="tel:+2348159160550" className="text-primary block">+234-815-916-0550 (Call/WhatsApp)</a>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
                <Mail className="text-primary shrink-0 mt-0.5" size={20} />
                <a href="mailto:Info@atmluxuryproperties.com" className="text-sm text-primary">Info@atmluxuryproperties.com</a>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Contact;
