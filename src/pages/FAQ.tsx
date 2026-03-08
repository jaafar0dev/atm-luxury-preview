import { PublicLayout } from "@/components/PublicLayout";
import { PageHero } from "@/components/PageHero";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

const faqs = [
  { q: "Where do you have property for sale?", a: "We have properties available in Abuja, Lagos, and Ibadan. Our portfolio includes residential land, commercial land, duplexes, and more across premium locations in these cities." },
  { q: "Is my property safe?", a: "Yes, all our properties come with verified documentation including C of O, Governor's Consent, and other relevant documents. We ensure thorough due diligence on every property." },
  { q: "Can I resell after purchase?", a: "Absolutely! All properties purchased through us come with full ownership rights, allowing you to resell at any time." },
  { q: "Are there payment plan options available?", a: "Yes, we offer flexible payment plans on select properties. Contact our team to discuss available options." },
  { q: "Any mortgage option?", a: "We can help with securing some level of mortgage facility. Contact our customer care line for more information." },
  { q: "When do you do inspection?", a: "Property inspections are scheduled based on your convenience. Contact us to book an inspection visit." },
  { q: "How do I inspect your property?", a: "You can schedule a physical inspection by contacting our office. We also provide virtual tours for select properties." },
  { q: "How do I make payment?", a: "Payments can be made via bank transfer to our company account. Full payment details are provided upon agreement." },
  { q: "What do I do after making payment for the property?", a: "After payment, you'll receive an official receipt and your allocation letter. Our team will guide you through the documentation process." },
  { q: "What will I receive after making the initial deposit?", a: "You'll receive an acknowledgment receipt and a letter of commitment confirming your allocation." },
  { q: "What document(s) will I receive after completing my payment?", a: "Upon full payment, you'll receive a Certificate of Occupancy (C of O), Deed of Assignment, Survey Plan, and other relevant property documents." },
];

const FAQ = () => {
  return (
    <PublicLayout>
      <PageHero title="Frequently Asked Questions" subtitle="Find answers to common questions about buying properties" />

      <section className="section-container py-16 max-w-3xl mx-auto">
        <ScrollAnimation direction="left">
          <div className="flex items-center gap-2 mb-8">
            <Home className="text-primary" size={24} />
            <h2 className="text-2xl font-display font-bold text-foreground">Questions about Buying</h2>
          </div>
        </ScrollAnimation>

        <ScrollAnimation direction="up">
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-lg px-4">
                <AccordionTrigger className="text-sm font-medium text-foreground">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollAnimation>

        <ScrollAnimation direction="up" className="mt-12">
          <div className="bg-muted rounded-lg p-8 text-center">
            <h3 className="font-display font-bold text-xl text-foreground mb-2">Still have questions?</h3>
            <p className="text-sm text-muted-foreground mb-4">Our team is always ready to help. Contact us for personalized assistance with your real estate needs.</p>
            <Link to="/contact">
              <Button className="btn-primary">Contact Us →</Button>
            </Link>
          </div>
        </ScrollAnimation>
      </section>
    </PublicLayout>
  );
};

export default FAQ;
