import { Link } from "react-router-dom";
import { Heart, Expand, Eye, MapPin, Bed, Bath, X } from "lucide-react";
import { PropertyCarousel } from "./PropertyCarousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState, useEffect } from "react";

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
}

const getFavorites = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem("atm-favorites") || "[]");
  } catch { return []; }
};

const toggleFavorite = (id: string): boolean => {
  const favs = getFavorites();
  const idx = favs.indexOf(id);
  if (idx >= 0) { favs.splice(idx, 1); } else { favs.push(id); }
  localStorage.setItem("atm-favorites", JSON.stringify(favs));
  return idx < 0;
};

export const PropertyCard = ({
  id, title, price, location, city, bedrooms, bathrooms, propertyType, status, images, tags, isFeatured
}: PropertyCardProps) => {
  const [hovering, setHovering] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [expandOpen, setExpandOpen] = useState(false);

  useEffect(() => {
    setIsFavorited(getFavorites().includes(id));
  }, [id]);

  const formatPrice = (p: number) => "₦" + p.toLocaleString();

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nowFav = toggleFavorite(id);
    setIsFavorited(nowFav);
  };

  const handleExpand = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandOpen(true);
  };

  return (
    <>
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
            <button onClick={handleExpand} className="bg-background/70 rounded-full p-1.5 hover:bg-background transition-colors">
              <Expand size={14} className="text-foreground" />
            </button>
            <button onClick={handleFavorite} className="bg-background/70 rounded-full p-1.5 hover:bg-background transition-colors">
              <Heart size={14} className={isFavorited ? "fill-destructive text-destructive" : "text-foreground"} />
            </button>
            <Link to={`/property/${id}`} className="bg-background/70 rounded-full p-1.5 hover:bg-background transition-colors">
              <Eye size={14} className="text-foreground" />
            </Link>
          </div>
        </div>

        <div className="p-4">
          <Link to={`/property/${id}`}>
            <h3 className="font-display font-semibold text-foreground text-sm line-clamp-2 mb-1 hover:text-primary transition-colors">{title}</h3>
          </Link>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
            <MapPin size={12} /> {location || city}
          </p>
          <Link to={`/property/${id}`} className="flex items-center gap-3 text-xs text-muted-foreground mb-2 hover:text-primary transition-colors">
            {bedrooms > 0 && <span className="flex items-center gap-1"><Bed size={12} /> Beds:{bedrooms}</span>}
            {bathrooms > 0 && <span className="flex items-center gap-1"><Bath size={12} /> Bath:{bathrooms}</span>}
          </Link>
          <Link to={`/property/${id}`}>
            <div className="text-xs text-muted-foreground uppercase mb-3 hover:text-primary transition-colors">
              {tags.join(", ") || propertyType}
            </div>
          </Link>
          <div className="flex items-center justify-between">
            <Link to={`/property/${id}`}>
              <Button size="sm" className="btn-primary text-xs">Details</Button>
            </Link>
            <span className="text-xs text-muted-foreground">ATM Luxury Properties</span>
          </div>
        </div>
      </div>

      {/* Expand Dialog */}
      <Dialog open={expandOpen} onOpenChange={setExpandOpen}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          <div className="relative">
            <PropertyCarousel images={images} autoPlay />
            <div className="p-4">
              <h3 className="font-display font-bold text-foreground text-lg">{title}</h3>
              <p className="text-muted-foreground text-sm mb-2">{location || city}</p>
              <p className="text-primary font-bold text-xl mb-2">{formatPrice(price)}</p>
              <div className="flex gap-4 text-sm text-muted-foreground mb-3">
                {bedrooms > 0 && <span className="flex items-center gap-1"><Bed size={14} /> {bedrooms} Beds</span>}
                {bathrooms > 0 && <span className="flex items-center gap-1"><Bath size={14} /> {bathrooms} Bath</span>}
              </div>
              <Link to={`/property/${id}`}>
                <Button className="btn-primary">View Full Details</Button>
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
