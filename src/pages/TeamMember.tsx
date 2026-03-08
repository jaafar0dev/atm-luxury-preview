import { PublicLayout } from "@/components/PublicLayout";
import { PageHero } from "@/components/PageHero";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const TeamMember = () => {
  const { id } = useParams<{ id: string }>();

  const { data: member, isLoading } = useQuery({
    queryKey: ["team-member", id],
    queryFn: async () => {
      const { data } = await supabase.from("team_members").select("*").eq("id", id!).single();
      return data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <PublicLayout>
        <div className="section-container py-20 text-center text-muted-foreground">Loading...</div>
      </PublicLayout>
    );
  }

  if (!member) {
    return (
      <PublicLayout>
        <div className="section-container py-20 text-center text-muted-foreground">Member not found.</div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <PageHero title={member.name} subtitle={member.role} />

      <section className="section-container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
                About {member.name.split(" ")[0]}
              </h2>
              {member.bio ? (
                <div className="text-muted-foreground leading-relaxed whitespace-pre-line">{member.bio}</div>
              ) : (
                <p className="text-muted-foreground">No bio available.</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Photo */}
            {member.image_url && (
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <img src={member.image_url} alt={member.name} className="w-full aspect-square object-cover" />
              </div>
            )}

            {/* Contact Info */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-display font-bold text-foreground mb-4">Contact Information</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-primary" />
                  <span>ATM Luxury Properties</span>
                </div>
                {member.email && (
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-primary" />
                    <a href={`mailto:${member.email}`} className="hover:text-primary transition-colors">{member.email}</a>
                  </div>
                )}
                {member.phone && (
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-primary" />
                    <a href={`tel:${member.phone}`} className="hover:text-primary transition-colors">{member.phone}</a>
                  </div>
                )}
              </div>
              <div className="mt-4">
                <ConsultationDialog>
                  <Button className="w-full btn-primary">Send Message</Button>
                </ConsultationDialog>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-display font-bold text-foreground mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/contact" className="block text-sm text-muted-foreground hover:text-primary border border-border rounded px-3 py-2 transition-colors">
                  Book a Consultation
                </Link>
                <Link to="/listings" className="block text-sm text-muted-foreground hover:text-primary border border-border rounded px-3 py-2 transition-colors">
                  View Properties
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default TeamMember;
