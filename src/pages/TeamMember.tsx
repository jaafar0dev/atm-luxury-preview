import { PublicLayout } from "@/components/PublicLayout";
import { PageHero } from "@/components/PageHero";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, Mail, Phone, Globe, GraduationCap, Award, Users } from "lucide-react";
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

  // Parse bio for structured sections
  const bioText = member.bio || "";
  const hasEducation = bioText.includes("Bachelor") || bioText.includes("University") || bioText.includes("Certificate");
  const hasAwards = bioText.includes("Award") || bioText.includes("ICON") || bioText.includes("Prize");
  const hasMemberships = bioText.includes("member of") || bioText.includes("fellow of") || bioText.includes("Alumni");

  // Extract education items
  const educationItems: string[] = [];
  if (bioText.includes("Bachelor of Science (Hons) in Economics")) educationItems.push("Bachelor of Science (Hons) in Economics - University of Abuja");
  if (bioText.includes("University of Reading")) educationItems.push("Proficiency Certificate in Fundamental Estate Management - University of Reading, Henley Business School, UK");
  if (bioText.includes("Austin Peay")) educationItems.push("Certificate from Austin Peay State University, Clarksville Tennessee, USA");
  if (bioText.includes("Lagos Business School")) educationItems.push("Alumni of Lagos Business School (LBS)");

  // Extract awards
  const awardItems: string[] = [];
  if (bioText.includes("National Outstanding Leadership Award")) awardItems.push("National Outstanding Leadership Award");
  if (bioText.includes("ICON OF SOCIETAL TRANSFORMATION")) awardItems.push("ICON OF SOCIETAL TRANSFORMATION");
  if (bioText.includes("Top Selling Realtor")) awardItems.push("Multiple recognitions as a Top Selling Realtor");
  if (bioText.includes("Thomas Sankara")) awardItems.push("Thomas Sankara's Leadership Prize for Integrity and Transparency (2022) - Youth Partnership for Africa's Development (YOUPAD)");

  // Extract memberships
  const membershipItems: string[] = [];
  if (bioText.includes("IOMP")) membershipItems.push("International Organization of Management Professionals (IOMP)");
  if (bioText.includes("Buildman")) membershipItems.push("Fellow - Buildman Leadership Foundation");
  if (bioText.includes("Lagos Business School")) membershipItems.push("Lagos Business School (LBS) Alumni");
  if (bioText.includes("Billionaire Realtors")) membershipItems.push("Billionaire Realtors Group (BRG)");

  // Get main bio paragraphs (before education/awards sections)
  const mainBio = bioText.split("\n\n").filter(p => 
    !p.startsWith("Language:") && p.trim().length > 0
  );

  return (
    <PublicLayout>
      <PageHero title={member.name} subtitle={member.role} />

      <section className="section-container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
                <Users size={20} className="text-primary" />
                About {member.name.split(" ")[0]}
              </h2>
              {member.bio ? (
                <div className="text-muted-foreground leading-relaxed whitespace-pre-line text-sm">{mainBio.join("\n\n")}</div>
              ) : (
                <p className="text-muted-foreground">No bio available.</p>
              )}
            </div>

            {/* Education */}
            {educationItems.length > 0 && (
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
                  <GraduationCap size={20} className="text-primary" />
                  Education & Certifications
                </h2>
                <ul className="space-y-2">
                  {educationItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Awards */}
            {awardItems.length > 0 && (
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
                  <Award size={20} className="text-primary" />
                  Awards & Recognition
                </h2>
                <ul className="space-y-2">
                  {awardItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Memberships */}
            {membershipItems.length > 0 && (
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-xl font-display font-bold text-foreground mb-4">Professional Memberships</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {membershipItems.map((item, i) => (
                    <div key={i} className="text-sm text-muted-foreground border border-border rounded-lg p-3">{item}</div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Photo */}
            {member.image_url && (
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <img src={member.image_url} alt={member.name} className="w-full aspect-square object-cover" />
              </div>
            )}

            {/* Contact Info */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-display font-bold text-foreground mb-4">Contact Information</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-primary" />
                  <span>ATM Luxury Properties</span>
                </div>
                {bioText.includes("Language:") && (
                  <div className="flex items-center gap-2">
                    <Globe size={16} className="text-primary" />
                    <span>{bioText.split("Language: ")[1]?.split("\n")[0] || "English"}</span>
                  </div>
                )}
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
                <Link to="/contact">
                  <Button className="w-full btn-primary rounded-full">Send Message</Button>
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-display font-bold text-foreground mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/book-consultation" className="block text-sm text-muted-foreground hover:text-primary border border-border rounded-lg px-3 py-2 transition-colors">
                  Book a Consultation
                </Link>
                <Link to="/listings" className="block text-sm text-muted-foreground hover:text-primary border border-border rounded-lg px-3 py-2 transition-colors">
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
