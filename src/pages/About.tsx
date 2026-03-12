import { PublicLayout } from "@/components/PublicLayout";
import { PageHero } from "@/components/PageHero";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { Diamond, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import sectionBg from "@/assets/section-bg.jpg";

const About = () => {
  const { data: teamMembers } = useQuery({
    queryKey: ["team-members"],
    queryFn: async () => {
      const { data } = await supabase
        .from("team_members")
        .select("*")
        .order("created_at");
      return data || [];
    },
  });

  return (
    <PublicLayout>
      <PageHero title="About Us" subtitle="Your Investing Partner Since 2019" />

      <section className="section-container py-16">
        {/* Expanding Your Dream section with image */}
        <ScrollAnimation direction="left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground mb-2">
                Expanding Your Dream,{" "}
                <span className="text-primary">In All Ways</span>
              </h2>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                ATM Luxury Properties™ is a specialized property brokerage based
                in Nigeria. We offer a range of management consulting expertise
                in the real estate sector with deep commitment to providing
                personalized, professional and one-stop service.
              </p>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                We are a full breed real estate company. Our community comprises
                of residential, commercial and mixed-use properties. We exist on
                the quest to bridge the gap in real estate services between the
                average earning market and the elite stream market in Nigeria.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Real estate"
                className="rounded-xl w-full h-72 object-cover"
              />
              <div className="absolute bottom-4 right-4 bg-primary text-white rounded-lg p-4 text-center">
                <div className="text-2xl font-display font-bold">5+</div>
                <div className="text-xs">Years of Excellence</div>
              </div>
            </div>
          </div>
        </ScrollAnimation>

        {/* Stats */}
        <ScrollAnimation direction="up">
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-16">
            {[
              { num: "5+", label: "Years in Business" },
              { num: "100+", label: "Happy Clients" },
              { num: "50+", label: "Projects" },
            ].map((s) => (
              <div
                key={s.label}
                className="text-center p-6 bg-secondary rounded-xl"
              >
                <div className="text-3xl font-display font-bold text-primary">
                  {s.num}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </ScrollAnimation>

        {/* Our Story */}
        <ScrollAnimation direction="left">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
              Our Story
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              At ATM Luxury Properties, we prioritize our clients' needs in the
              Nigerian real estate market. Our services include Brokerage,
              Investment and Advisory, with a focus on delivering exceptional
              results in Abuja, Lagos and Ibadan. Our Abuja head office is
              dedicated to serving our esteemed clients.
            </p>
          </div>
        </ScrollAnimation>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
          <ScrollAnimation direction="left">
            <div className="card-hover bg-card border border-border rounded-xl p-6">
              <Diamond className="text-primary mb-3" size={24} />
              <h3 className="font-display font-bold text-foreground mb-2">
                Our Mission
              </h3>
              <p className="text-sm text-muted-foreground">
                We are dedicated to building lasting relationships with our
                clients, delivering personalised real estate solutions that
                ensure happy landlords and profitable investors, while
                protecting their interests and assets.
              </p>
            </div>
          </ScrollAnimation>
          <ScrollAnimation direction="right">
            <div className="card-hover bg-card border border-border rounded-xl p-6">
              <Eye className="text-primary mb-3" size={24} />
              <h3 className="font-display font-bold text-foreground mb-2">
                Our Vision
              </h3>
              <p className="text-sm text-muted-foreground">
                At ATM Luxury Properties, we are guided by a strong sense of
                purpose and a commitment to our values. We strive to build a
                sustainable and reliable company that reflects our dedication to
                client satisfaction, integrity, and excellence.
              </p>
            </div>
          </ScrollAnimation>
        </div>

        {/* Core Values */}
        <ScrollAnimation direction="up">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-foreground mb-6">
              Our Core Values
            </h2>
            <div className="flex justify-center gap-3 flex-wrap">
              {["Customer Satisfaction", "Integrity", "Excellence"].map((v) => (
                <Badge
                  key={v}
                  variant="outline"
                  className="px-6 py-2 text-sm border-primary text-primary rounded-full"
                >
                  {v}
                </Badge>
              ))}
            </div>
          </div>
        </ScrollAnimation>

        {/* Meet The Team */}
        <ScrollAnimation direction="up">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
              Meet The Team
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our combined experience provides us with lots of know how in
              various situations. Our Realtors meet stringent conditions.
              Friendly, courteous, honest, diligent, hardworking and integral.
              We help each other out. It's not a competition! Talk to any team
              member today and have a pleasant and prosperous real estate
              experience! We're easy to talk to, just a call away.
            </p>
            <div className="flex justify-end mt-4">
              <Link to="/about">
                <Button className="btn-primary rounded-full">
                  View All Members
                </Button>
              </Link>
            </div>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers?.map((m, i) => (
            <ScrollAnimation key={m.id} direction="up" delay={i * 100}>
              <div className="text-center">
                <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-border bg-secondary">
                  {m.image_url ? (
                    <img
                      src={m.image_url}
                      alt={m.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl font-display font-bold text-muted-foreground">
                      {m.name.charAt(0)}
                    </div>
                  )}
                </div>
                <h3 className="font-display font-bold text-foreground">
                  {m.name}
                </h3>
                <p className="text-sm text-primary mb-2">{m.role}</p>
                {m.bio && (
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-3 max-w-xs mx-auto">
                    {m.bio}
                  </p>
                )}
                <Link to={`/team/${m.id}`}>
                  <Button variant="outline" size="sm" className="rounded-full">
                    View Profile
                  </Button>
                </Link>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        {(!teamMembers || teamMembers.length === 0) && (
          <p className="text-center text-muted-foreground py-8">
            Team members coming soon.
          </p>
        )}

        {/* Contact Any Team Member CTA */}
        <div className="text-center mt-12">
          <Link to="/contact">
            <Button
              variant="outline"
              className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8"
            >
              Contact Any Team Member
            </Button>
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
};

export default About;
