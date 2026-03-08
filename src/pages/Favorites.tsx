import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { PublicLayout } from "@/components/PublicLayout";
import { PageHero } from "@/components/PageHero";
import { PropertyCard } from "@/components/PropertyCard";
import { supabase } from "@/integrations/supabase/client";

interface Property {
  id: string;
  title: string;
  price: number;
  city: string;
  location: string | null;
  property_type: string;
  bedrooms: number | null;
  bathrooms: number | null;
  images: string[] | null;
  status: string;
  tags: string[] | null;
}

const Favorites = () => {
  const [favorites, setFavorites] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    setLoading(true);
    try {
      // Get favorite IDs from localStorage
      const savedFavorites: string[] = JSON.parse(localStorage.getItem("favorites") || "[]");
      
      if (savedFavorites.length === 0) {
        setFavorites([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .in("id", savedFavorites);

      if (error) throw error;
      setFavorites(data || []);
    } catch (err) {
      console.error("Error loading favorites:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
      <PageHero title="Saved Properties" subtitle="Your favorited listings" />
      <section className="section-container section-padding">
        {loading ? (
          <div className="text-center text-muted-foreground py-20">Loading...</div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="mx-auto mb-4 text-muted-foreground" size={48} />
            <h3 className="font-display text-xl font-semibold mb-2">No saved properties yet</h3>
            <p className="text-muted-foreground mb-6">Browse our listings and save your favorites</p>
            <Link to="/listings" className="btn-gold inline-block px-8 py-3 rounded-sm text-sm font-semibold">
              View Listings
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </section>
    </PublicLayout>
  );
};

export default Favorites;
