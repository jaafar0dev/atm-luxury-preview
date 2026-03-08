import { Link } from "react-router-dom";
import { Heart, Expand, Eye, MapPin, Bed, Bath } from "lucide-react";
import { PropertyCarousel } from "./PropertyCarousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";

interface PropertyCardProps {
  id: string;
  title: string;
  price: number;
  location?: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  propertyType: string;
  status: string;
  images: string[];
  tags: string[];
  isFeatured: boolean;
  isFavorited?: boolean;
  onFavoriteToggle?: () => void;
}

export const PropertyCard = ({
  id, title, price, location, city, bedrooms, bathrooms, propertyType, status, images, tags, isFeatured, isFavorited, onFavoriteToggle
}: PropertyCardProps) => {
  const [hovering, setHovering] = useState(false);

  const formatPrice = (p: number) => {
    return "₦" + p.toLocaleString();
  };

  const handleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Please sign in to save favorites");
      return;
    }
    if (isFavorited) {
      await supabase.from("favorites").delete().eq("user_id", user.id).eq("property_id", id);
    } else {
      await supabase.from("favorites").insert({ user_id: user.id, property_id: id });
    }
    onFavoriteToggle?.();
  };

  return (
    <div
      className="card-hover bg-card border border-border rounded-lg overflow-hidden"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="relative">
        <PropertyCarousel images={images} autoPlay={hovering} />
        <div className="absolute top-3 left-3 flex gap-2 z-10">
          {isFeatured && <Badge className="bg-primary text-primary-foreground text-xs">FEATURED</Badge>}
        </div>
        <div className="absolute top-3 right-3 z-10">
          <Badge className="bg-success text-success-foreground text-xs uppercase">{status.replace("-", " ")}</Badge>
        </div>
        <div className="absolute bottom-3 left-3 z-10">
          <span className="text-primary-foreground font-bold text-lg drop-shadow-lg">{formatPrice(price)}</span>
        </div>
        <div className="absolute bottom-3 right-3 z-10 flex gap-2">
          <button className="bg-background/70 rounded-full p-1.5 hover:bg-background transition-colors">
            <Expand size={14} className="text-foreground" />
          </button>
          <button onClick={handleFavorite} className="bg-background/70 rounded-full p-1.5 hover:bg-background transition-colors">
            <Heart size={14} className={isFavorited ? "fill-destructive text-destructive" : "text-foreground"} />
          </button>
          <button className="bg-background/70 rounded-full p-1.5 hover:bg-background transition-colors">
            <Eye size={14} className="text-foreground" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-display font-semibold text-foreground text-sm line-clamp-2 mb-1">{title}</h3>
        <p className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
          <MapPin size={12} /> {location || city}
        </p>
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
          {bedrooms > 0 && <span className="flex items-center gap-1"><Bed size={12} /> Beds:{bedrooms}</span>}
          {bathrooms > 0 && <span className="flex items-center gap-1"><Bath size={12} /> Bath:{bathrooms}</span>}
        </div>
        <div className="text-xs text-muted-foreground uppercase mb-3">
          {tags.join(", ") || propertyType}
        </div>
        <div className="flex items-center justify-between">
          <Link to={`/property/${id}`}>
            <Button size="sm" className="btn-primary text-xs">Details</Button>
          </Link>
          <span className="text-xs text-muted-foreground">ATM Luxury Properties</span>
        </div>
      </div>
    </div>
  );
};
