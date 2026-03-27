import { useParams, Link } from "react-router-dom";
import { PublicLayout } from "@/components/PublicLayout";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Calendar, ArrowLeft } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const BlogPost = () => {
  const { slug } = useParams();

  const { data: post, isLoading } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      // Try by slug first, then by id
      let { data } = await supabase.from("blog_posts").select("*").eq("slug", slug!).eq("published", true).maybeSingle();
      if (!data) {
        ({ data } = await supabase.from("blog_posts").select("*").eq("id", slug!).eq("published", true).maybeSingle());
      }
      return data;
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <PublicLayout>
        <div className="section-container py-20 text-center text-muted-foreground">Loading...</div>
      </PublicLayout>
    );
  }

  if (!post) {
    return (
      <PublicLayout>
        <div className="section-container py-20 text-center">
          <h1 className="text-2xl font-display font-bold text-foreground mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-primary hover:underline">← Back to Blog</Link>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="section-container py-10 max-w-4xl mx-auto">
        <ScrollAnimation direction="up">
          <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft size={16} /> Back to Blog
          </Link>

          {post.image_url && (
            <img src={post.image_url} alt={post.title} className="w-full aspect-video object-cover rounded-lg mb-8" />
          )}

          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">{post.title}</h1>

          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
            <span>{post.author}</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Calendar size={14} /> {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}</span>
          </div>

          {post.content && (
            <div
              className="prose prose-lg max-w-none text-muted-foreground
                prose-headings:text-foreground prose-headings:font-display
                prose-strong:text-foreground prose-a:text-primary
                prose-img:rounded-lg prose-img:mx-auto"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          )}
        </ScrollAnimation>
      </div>
    </PublicLayout>
  );
};

export default BlogPost;
