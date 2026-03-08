import { useParams } from "react-router-dom";
import { PublicLayout } from "@/components/PublicLayout";
import { PropertyCarousel } from "@/components/PropertyCarousel";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Bed, Bath, Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const getFavorites = (): string[] => {
  try { return JSON.parse(localStorage.getItem("atm-favorites") || "[]"); } catch { return []; }
};

const toggleFavorite = (id: string): boolean => {
  const favs = getFavorites();
  const idx = favs.indexOf(id);
  if (idx >= 0) { favs.splice(idx, 1); } else { favs.push(id); }
  localStorage.setItem("atm-favorites", JSON.stringify(favs));
  return idx < 0;
};

const PropertyDetail = () => {
  const { id } = useParams();

  const { data: property } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const { data } = await supabase.from("properties").select("*").eq("id", id!).single();
      return data;
    },
    enabled: !!id,
  });

  if (!property) {
    return (
      <PublicLayout>
        <div className="section-container py-20 text-center text-muted-foreground">Loading property...</div>
      </PublicLayout>
    );
  }

  const formatPrice = (p: number) => "₦" + p.toLocaleString();

  return (
    <PublicLayout>
      <div className="section-container py-10">
        <ScrollAnimation direction="up">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Images */}
            <PropertyCarousel images={property.images || []} autoPlay className="rounded-lg overflow-hidden" />

            {/* Details */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                {property.is_featured && <Badge className="bg-primary text-primary-foreground">FEATURED</Badge>}
                <Badge className="bg-success text-success-foreground uppercase">{property.status.replace("-", " ")}</Badge>
              </div>
              <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">{property.title}</h1>
              <p className="text-muted-foreground flex items-center gap-1 mb-4">
                <MapPin size={16} /> {property.location || property.city}
              </p>
              <div className="text-3xl font-bold text-primary mb-6">{formatPrice(property.price)}</div>

              <div className="flex gap-6 mb-6 text-muted-foreground">
                {(property.bedrooms || 0) > 0 && (
                  <span className="flex items-center gap-2"><Bed size={18} /> {property.bedrooms} Bedrooms</span>
                )}
                {(property.bathrooms || 0) > 0 && (
                  <span className="flex items-center gap-2"><Bath size={18} /> {property.bathrooms} Bathrooms</span>
                )}
              </div>

              <div className="text-sm text-muted-foreground mb-2">Type: {property.property_type}</div>
              {property.tags && property.tags.length > 0 && (
                <div className="flex gap-2 mb-6 flex-wrap">
                  {property.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              )}

              <div className="flex gap-3">
                <Link to="/contact">
                  <Button className="btn-primary">Contact Us About This Property</Button>
                </Link>
                <Button variant="outline" size="icon">
                  <Heart size={18} />
                </Button>
              </div>
            </div>
          </div>
        </ScrollAnimation>

        {/* Description */}
        {property.description && (
          <ScrollAnimation direction="up" className="mt-10">
            <h2 className="text-xl font-display font-bold text-foreground mb-4">Description</h2>
            <div className="prose max-w-none text-muted-foreground whitespace-pre-line">
              {property.description}
            </div>
          </ScrollAnimation>
        )}
      </div>
    </PublicLayout>
  );
};

export default PropertyDetail;
