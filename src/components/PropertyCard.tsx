import { Link } from "react-router-dom";
import { Heart, Expand, Eye, MapPin, Bed, Bath } from "lucide-react";
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

export const PropertyCard = ({
  id,
  title,
  price,
  location,
  city,
  bedrooms,
  bathrooms,
  propertyType,
  status,
  images,
  tags,
  isFeatured,
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
        className="card-hover bg-card border border-border rounded-sm overflow-hidden group"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <div className="relative overflow-hidden">
          <div className="transition-transform duration-700 group-hover:scale-105">
            <PropertyCarousel images={images} autoPlay={hovering} />
          </div>
          <div className="absolute top-3 left-3 flex gap-2 z-10">
            {isFeatured && (
              <Badge className="bg-accent text-accent-foreground text-[10px] tracking-wider uppercase font-semibold rounded-sm px-2.5">
                Featured
              </Badge>
            )}
          </div>
          <div className="absolute top-3 right-3 z-10">
            <Badge className={`text-[10px] tracking-wider uppercase rounded-sm px-2.5 ${
              status === "sold" ? "bg-destructive text-destructive-foreground" :
              status === "sales-closed" ? "bg-muted text-muted-foreground" :
              "bg-success text-success-foreground"
            }`}>
              {status.replace("-", " ")}
            </Badge>
          </div>
          <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/60 to-transparent p-4 pt-10">
            <span className="text-white font-display font-bold text-xl">
              {formatPrice(price)}
            </span>
          </div>
          <div className="absolute bottom-3 right-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleExpand}
              className="bg-card/80 backdrop-blur-sm rounded-sm p-2 hover:bg-card transition-colors"
            >
              <Expand size={14} className="text-foreground" />
            </button>
            <button
              onClick={handleFavorite}
              className="bg-card/80 backdrop-blur-sm rounded-sm p-2 hover:bg-card transition-colors"
            >
              <Heart
                size={14}
                className={
                  isFavorited
                    ? "fill-destructive text-destructive"
                    : "text-foreground"
                }
              />
            </button>
            <Link
              to={`/property/${id}`}
              className="bg-card/80 backdrop-blur-sm rounded-sm p-2 hover:bg-card transition-colors"
            >
              <Eye size={14} className="text-foreground" />
            </Link>
          </div>
        </div>

        <div className="p-5">
          <Link to={`/property/${id}`}>
            <h3 className="font-display font-semibold text-foreground text-sm line-clamp-2 mb-2 hover:text-accent transition-colors">
              {title}
            </h3>
          </Link>
          <p className="text-xs text-muted-foreground flex items-center gap-1.5 mb-3">
            <MapPin size={12} className="text-accent/60" /> {location || city}
          </p>
          <Link
            to={`/property/${id}`}
            className="flex items-center gap-4 text-xs text-muted-foreground mb-3 hover:text-accent transition-colors"
          >
            {bedrooms > 0 && (
              <span className="flex items-center gap-1">
                <Bed size={12} /> {bedrooms} Beds
              </span>
            )}
            {bathrooms > 0 && (
              <span className="flex items-center gap-1">
                <Bath size={12} /> {bathrooms} Bath
              </span>
            )}
          </Link>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {(tags.length > 0 ? tags : [propertyType]).map((tag) => (
              <span
                key={tag}
                className="text-[10px] tracking-wider uppercase text-muted-foreground bg-muted px-2 py-0.5 rounded-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <Link to={`/property/${id}`}>
              <Button
                size="sm"
                className="btn-primary rounded-sm text-xs tracking-wide h-8 px-5"
              >
                View Details
              </Button>
            </Link>
            <span className="text-[10px] text-muted-foreground tracking-wider uppercase">
              ATM LUXURY PROPERTIES
            </span>
          </div>
        </div>
      </div>

      {/* Expand Dialog */}
      <Dialog open={expandOpen} onOpenChange={setExpandOpen}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden rounded-sm">
          <div className="relative">
            <PropertyCarousel images={images} autoPlay />
            <div className="p-6">
              <h3 className="font-display font-bold text-foreground text-xl mb-1">
                {title}
              </h3>
              <p className="text-muted-foreground text-sm mb-3 flex items-center gap-1.5">
                <MapPin size={14} className="text-accent/60" />{" "}
                {location || city}
              </p>
              <p className="text-accent font-display font-bold text-2xl mb-3">
                {formatPrice(price)}
              </p>
              <div className="flex gap-5 text-sm text-muted-foreground mb-4">
                {bedrooms > 0 && (
                  <span className="flex items-center gap-1.5">
                    <Bed size={14} /> {bedrooms} Beds
                  </span>
                )}
                {bathrooms > 0 && (
                  <span className="flex items-center gap-1.5">
                    <Bath size={14} /> {bathrooms} Bath
                  </span>
                )}
              </div>
              <Link to={`/property/${id}`}>
                <Button className="btn-gold rounded-sm tracking-wide">
                  View Full Details
                </Button>
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
