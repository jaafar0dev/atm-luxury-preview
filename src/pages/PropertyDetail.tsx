import { useParams, Link } from "react-router-dom";
import { PublicLayout } from "@/components/PublicLayout";
import { PropertyCarousel } from "@/components/PropertyCarousel";
import { PropertyCard } from "@/components/PropertyCard";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Bed, Bath, Heart, Video, Share2, Copy, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

const getFavorites = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem("atm-favorites") || "[]");
  } catch {
    return [];
  }
};

const toggleFavorite = (id: string): boolean => {
  const favs = getFavorites();
  const idx = favs.indexOf(id);
  if (idx >= 0) {
    favs.splice(idx, 1);
  } else {
    favs.push(id);
  }
  localStorage.setItem("atm-favorites", JSON.stringify(favs));
  return idx < 0;
};

const PropertyDetail = () => {
  const { id } = useParams();

  // Fetch current property
  const { data: property } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const { data } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id!)
        .single();
      return data;
    },
    enabled: !!id,
  });

  // Fetch related properties (same property type, excluding current property)
  const { data: relatedProperties } = useQuery({
    queryKey: ["related-properties", property?.property_type, id],
    queryFn: async () => {
      const { data } = await supabase
        .from("properties")
        .select("*")
        .eq("property_type", property!.property_type)
        .neq("id", id!) // Exclude the one we are currently viewing
        .limit(3); // Fetch 3 related properties
      return data || [];
    },
    enabled: !!property?.property_type && !!id,
  });

  const [isFavorited, setIsFavorited] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (id) setIsFavorited(getFavorites().includes(id));
  }, [id]);

  const propertyUrl = `${window.location.origin}/property/${id}`;

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(propertyUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: string) => {
    const title = property?.title || "Check out this property";
    const urls: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(title + " " + propertyUrl)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(propertyUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(propertyUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(propertyUrl)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(propertyUrl)}&text=${encodeURIComponent(title)}`,
      email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent("Check out this property: " + propertyUrl)}`,
    };
    if (platform === "email") {
      window.location.href = urls[platform];
    } else {
      window.open(urls[platform], "_blank");
    }
  };

  if (!property) {
    return (
      <PublicLayout>
        <div className="section-container py-20 text-center text-muted-foreground">
          Loading property...
        </div>
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
            <PropertyCarousel
              images={property.images || []}
              autoPlay
              className="rounded-lg overflow-hidden"
            />

            {/* Details */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                {property.is_featured && (
                  <Badge className="bg-primary text-primary-foreground">
                    FEATURED
                  </Badge>
                )}
                <Badge className="bg-success text-success-foreground uppercase">
                  {property.status.replace("-", " ")}
                </Badge>
              </div>
              <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
                {property.title}
              </h1>
              <p className="text-muted-foreground flex items-center gap-1 mb-4">
                <MapPin size={16} /> {property.location || property.city}
              </p>
              <div className="text-3xl font-bold text-primary mb-6">
                {formatPrice(property.price)}
              </div>

              <div className="flex gap-6 mb-6 text-muted-foreground">
                {(property.bedrooms || 0) > 0 && (
                  <span className="flex items-center gap-2">
                    <Bed size={18} /> {property.bedrooms} Bedrooms
                  </span>
                )}
                {(property.bathrooms || 0) > 0 && (
                  <span className="flex items-center gap-2">
                    <Bath size={18} /> {property.bathrooms} Bathrooms
                  </span>
                )}
              </div>

              <div className="text-sm text-muted-foreground mb-2">
                Type: {property.property_type}
              </div>
              {property.tags && property.tags.length > 0 && (
                <div className="flex gap-2 mb-6 flex-wrap">
                  {property.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <Link to="/contact">
                  <Button className="btn-primary">
                    Contact Us About This Property
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsFavorited(toggleFavorite(property.id))}
                >
                  <Heart
                    size={18}
                    className={
                      isFavorited ? "fill-destructive text-destructive" : ""
                    }
                  />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Share2 size={18} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleCopyLink}>
                      {copied ? <Check size={16} className="mr-2" /> : <Copy size={16} className="mr-2" />}
                      {copied ? "Link Copied!" : "Copy Link"}
                    </DropdownMenuItem>
                     <DropdownMenuItem onClick={() => handleShare("whatsapp")}>
                       WhatsApp
                     </DropdownMenuItem>
                     <DropdownMenuItem onClick={() => handleShare("facebook")}>
                       Facebook
                     </DropdownMenuItem>
                     <DropdownMenuItem onClick={() => handleShare("twitter")}>
                       X (Twitter)
                     </DropdownMenuItem>
                     <DropdownMenuItem onClick={() => handleShare("linkedin")}>
                       LinkedIn
                     </DropdownMenuItem>
                     <DropdownMenuItem onClick={() => handleShare("telegram")}>
                       Telegram
                     </DropdownMenuItem>
                     <DropdownMenuItem onClick={() => handleShare("email")}>
                       Email
                     </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </ScrollAnimation>

        {/* Description */}
        {property.description && (
          <ScrollAnimation direction="up" className="mt-10">
            <h2 className="text-xl font-display font-bold text-foreground mb-4">
              Description
            </h2>
            <div className="prose max-w-none text-muted-foreground prose-headings:text-foreground prose-headings:font-display prose-strong:text-foreground prose-a:text-primary prose-img:rounded-lg"
              dangerouslySetInnerHTML={{ __html: property.description }}
            />
          </ScrollAnimation>
        )}

        {/* Video */}
        {(property as any).video_link && (
          <ScrollAnimation direction="up" className="mt-10">
            <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
              <Video size={20} className="text-primary" /> Property Video
            </h2>
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                src={(property as any).video_link.replace("watch?v=", "embed/").replace("youtu.be/", "youtube.com/embed/")}
                title="Property Video"
                className="w-full h-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          </ScrollAnimation>
        )}

        {/* Related Properties Section */}
        {relatedProperties && relatedProperties.length > 0 && (
          <ScrollAnimation
            direction="up"
            className="mt-20 pt-10 border-t border-border"
          >
            <h2 className="text-2xl font-display font-bold text-foreground mb-8">
              Similar Properties
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProperties.map((prop) => (
                <PropertyCard
                  key={prop.id}
                  id={prop.id}
                  title={prop.title}
                  price={prop.price}
                  location={prop.location || undefined}
                  city={prop.city}
                  bedrooms={prop.bedrooms || 0}
                  bathrooms={prop.bathrooms || 0}
                  propertyType={prop.property_type}
                  status={prop.status}
                  images={prop.images || []}
                  tags={prop.tags || []}
                  isFeatured={prop.is_featured || false}
                />
              ))}
            </div>
          </ScrollAnimation>
        )}
      </div>
    </PublicLayout>
  );
};

export default PropertyDetail;
