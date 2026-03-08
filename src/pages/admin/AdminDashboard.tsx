import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Building2, Users, FileText, MessageSquare, Mail } from "lucide-react";

const AdminDashboard = () => {
  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [props, team, blog, inquiries, messages] = await Promise.all([
        supabase.from("properties").select("id", { count: "exact", head: true }),
        supabase.from("team_members").select("id", { count: "exact", head: true }),
        supabase.from("blog_posts").select("id", { count: "exact", head: true }),
        supabase.from("inquiries").select("id", { count: "exact", head: true }),
        supabase.from("messages").select("id", { count: "exact", head: true }),
      ]);
      return {
        properties: props.count || 0,
        team: team.count || 0,
        blog: blog.count || 0,
        inquiries: inquiries.count || 0,
        messages: messages.count || 0,
      };
    },
  });

  const cards = [
    { label: "Properties", count: stats?.properties || 0, icon: Building2, color: "text-primary" },
    { label: "Team Members", count: stats?.team || 0, icon: Users, color: "text-primary" },
    { label: "Blog Posts", count: stats?.blog || 0, icon: FileText, color: "text-primary" },
    { label: "Inquiries", count: stats?.inquiries || 0, icon: MessageSquare, color: "text-success" },
    { label: "Messages", count: stats?.messages || 0, icon: Mail, color: "text-destructive" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-display font-bold text-foreground mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-card border border-border rounded-lg p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">{card.label}</span>
                <Icon size={20} className={card.color} />
              </div>
              <div className="text-3xl font-bold text-foreground">{card.count}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminDashboard;
