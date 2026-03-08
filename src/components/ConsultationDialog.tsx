import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ConsultationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ConsultationDialog = ({ open, onOpenChange }: ConsultationDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Please fill in required fields");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("consultations").insert({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      notes: form.notes.trim() || null,
    });
    setLoading(false);
    if (error) {
      toast.error("Failed to book consultation");
    } else {
      toast.success("Consultation booked successfully!");
      setForm({ name: "", email: "", phone: "", notes: "" });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Book a Consultation</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input placeholder="Full Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <Input type="email" placeholder="Email *" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <Input placeholder="+234 Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <Textarea placeholder="Any notes or preferences" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          <Button type="submit" disabled={loading} className="w-full btn-primary">
            {loading ? "Booking..." : "Book Consultation"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
