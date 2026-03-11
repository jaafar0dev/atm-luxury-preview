import { PublicLayout } from "@/components/PublicLayout";
import { PageHero } from "@/components/PageHero";
import { PropertyCard } from "@/components/PropertyCard";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const Listings = () => {
  const [searchParams] = useSearchParams();
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState(searchParams.get("status") || "");
  const [typeFilter, setTypeFilter] = useState(searchParams.get("type") || "");
  const [cityFilter, setCityFilter] = useState(searchParams.get("city") || "");
  const [page, setPage] = useState(1);
  const perPage = 6;

  const { data } = useQuery({
    queryKey: ["properties", keyword, statusFilter, typeFilter, cityFilter, page],
    queryFn: async () => {
      let query = supabase.from("properties").select("*", { count: "exact" });
      if (keyword) query = query.ilike("title", `%${keyword}%`);
      if (statusFilter) query = query.eq("status", statusFilter);
      if (typeFilter === "land") query = query.ilike("property_type", "%Land%");
      if (typeFilter === "houses") query = query.not("property_type", "ilike", "%Land%");
      if (cityFilter) query = query.ilike("city", `%${cityFilter}%`);
      query = query.order("created_at", { ascending: false }).range((page - 1) * perPage, page * perPage - 1);
      const { data, count } = await query;
      return { properties: data || [], total: count || 0 };
    },
  });

  const totalPages = Math.ceil((data?.total || 0) / perPage);

  return (
    <PublicLayout>
      <PageHero title="Property Listings" subtitle="Explore our curated selection of premium properties" />

      <section className="section-container py-10">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8 items-center">
          <Input placeholder="Enter Keyword..." value={keyword} onChange={(e) => { setKeyword(e.target.value); setPage(1); }} className="max-w-[200px]" />
          <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1); }}>
            <SelectTrigger className="w-[130px]"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="for-sale">For Sale</SelectItem>
              <SelectItem value="for-rent">For Rent</SelectItem>
              <SelectItem value="investment">Investment</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={(v) => { setTypeFilter(v); setPage(1); }}>
            <SelectTrigger className="w-[130px]"><SelectValue placeholder="Type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="land">Land</SelectItem>
              <SelectItem value="houses">Houses</SelectItem>
            </SelectContent>
          </Select>
          <Select value={cityFilter} onValueChange={(v) => { setCityFilter(v); setPage(1); }}>
            <SelectTrigger className="w-[130px]"><SelectValue placeholder="City" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="abuja">Abuja</SelectItem>
              <SelectItem value="lagos">Lagos</SelectItem>
              <SelectItem value="ibadan">Ibadan</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.properties.map((p, i) => (
            <ScrollAnimation key={p.id} direction="up" delay={i * 80}>
              <PropertyCard
                id={p.id}
                title={p.title}
                price={p.price}
                location={p.location || undefined}
                city={p.city}
                bedrooms={p.bedrooms || 0}
                bathrooms={p.bathrooms || 0}
                propertyType={p.property_type}
                status={p.status}
                images={p.images || []}
                tags={p.tags || []}
                isFeatured={p.is_featured || false}
              />
            </ScrollAnimation>
          ))}
        </div>

        {data?.properties.length === 0 && (
          <p className="text-center text-muted-foreground py-16">No properties found.</p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <Button variant="outline" disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</Button>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button key={i} variant={page === i + 1 ? "default" : "outline"} onClick={() => setPage(i + 1)} size="sm">
                {i + 1}
              </Button>
            ))}
            <Button variant="outline" disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</Button>
          </div>
        )}
      </section>
    </PublicLayout>
  );
};

export default Listings;
