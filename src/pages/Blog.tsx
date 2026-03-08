import { PublicLayout } from "@/components/PublicLayout";
import { PageHero } from "@/components/PageHero";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const Blog = () => {
  const { data: posts } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const { data } = await supabase.from("blog_posts").select("*").eq("published", true).order("created_at", { ascending: false });
      return data || [];
    },
  });

  return (
    <PublicLayout>
      <PageHero title="Blog" subtitle="Insights and news from ATM Luxury Properties" />

      <section className="section-container py-16">
        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <ScrollAnimation key={post.id} direction="up" delay={i * 100}>
                <Link to={`/blog/${post.slug || post.id}`} className="block card-hover bg-card border border-border rounded-lg overflow-hidden">
                  {post.image_url && (
                    <img src={post.image_url} alt={post.title} className="w-full aspect-video object-cover" />
                  )}
                  <div className="p-4">
                    <h3 className="font-display font-semibold text-foreground mb-2">{post.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{post.author}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Calendar size={12} /> {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}</span>
                    </div>
                  </div>
                </Link>
              </ScrollAnimation>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-16">No blog posts yet. Check back soon!</p>
        )}
      </section>
    </PublicLayout>
  );
};

export default Blog;
