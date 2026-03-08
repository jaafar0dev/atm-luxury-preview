import { PublicLayout } from "@/components/PublicLayout";
import { PageHero } from "@/components/PageHero";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { Diamond, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const About = () => {
  return (
    <PublicLayout>
      <PageHero title="About Us" subtitle="Your Investing Partner Since 2019" />

      <section className="section-container py-16">
        {/* Core values badges */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {["Customer Satisfaction", "Integrity", "Excellence"].map((v) => (
            <Badge key={v} variant="outline" className="px-4 py-2 text-sm border-primary text-primary">{v}</Badge>
          ))}
        </div>

        {/* Story */}
        <ScrollAnimation direction="left">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-foreground mb-2">
              Expanding Your Dream, <span className="text-primary">In All Ways</span>
            </h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              ATM Luxury Properties™ is a specialized property brokerage based in Nigeria. We offer a range of management consulting expertise in the real estate sector with deep commitment to providing personalized, professional and one-stop service.
            </p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              We are a full breed real estate company. Our community comprises of residential, commercial and mixed-use properties. We exist on the quest to bridge the gap in real estate services between the average earning market and the elite stream market in Nigeria.
            </p>
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
              <div key={s.label} className="text-center p-6 bg-secondary rounded-lg">
                <div className="text-3xl font-display font-bold text-primary">{s.num}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </ScrollAnimation>

        {/* Our Story */}
        <ScrollAnimation direction="left">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed">
              At ATM Luxury Properties, we prioritize our clients' needs in the Nigerian real estate market. Our services include Brokerage, Investment and Advisory, with a focus on delivering exceptional results in Abuja, Lagos and Ibadan. Our Abuja head office is dedicated to serving our esteemed clients.
            </p>
          </div>
        </ScrollAnimation>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
          <ScrollAnimation direction="left">
            <div className="card-hover bg-card border border-border rounded-lg p-6">
              <Diamond className="text-primary mb-3" size={24} />
              <h3 className="font-display font-bold text-foreground mb-2">Our Mission</h3>
              <p className="text-sm text-muted-foreground">We are dedicated to building lasting relationships with our clients, delivering personalised real estate solutions that ensure happy landlords and profitable investors, while protecting their interests and assets.</p>
            </div>
          </ScrollAnimation>
          <ScrollAnimation direction="right">
            <div className="card-hover bg-card border border-border rounded-lg p-6">
              <Eye className="text-primary mb-3" size={24} />
              <h3 className="font-display font-bold text-foreground mb-2">Our Vision</h3>
              <p className="text-sm text-muted-foreground">At ATM Luxury Properties, we are guided by a strong sense of purpose and a commitment to our values. We strive to build a sustainable and reliable company that reflects our dedication to client satisfaction, integrity, and excellence.</p>
            </div>
          </ScrollAnimation>
        </div>

        {/* Core Values */}
        <ScrollAnimation direction="up">
          <div className="text-center">
            <h2 className="text-3xl font-display font-bold text-foreground mb-6">Our Core Values</h2>
            <div className="flex justify-center gap-3 flex-wrap">
              {["Customer Satisfaction", "Integrity", "Excellence"].map((v) => (
                <Badge key={v} variant="outline" className="px-6 py-2 text-sm border-primary text-primary">{v}</Badge>
              ))}
            </div>
          </div>
        </ScrollAnimation>
      </section>
    </PublicLayout>
  );
};

export default About;
