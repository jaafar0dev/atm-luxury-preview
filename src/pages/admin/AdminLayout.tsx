import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { Home, Building2, Users, FileText, MessageSquare, Mail, Calendar, Image, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const links = [
  { label: "Dashboard", path: "/admin", icon: Home },
  { label: "Properties", path: "/admin/properties", icon: Building2 },
  { label: "Team", path: "/admin/team", icon: Users },
  { label: "Blog Posts", path: "/admin/blog", icon: FileText },
  { label: "Inquiries", path: "/admin/inquiries", icon: MessageSquare },
  { label: "Messages", path: "/admin/messages", icon: Mail },
  { label: "Consultations", path: "/admin/consultations", icon: Calendar },
];

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/admin/login");
        return;
      }
      // Check admin role
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", user.id);
      const isAdmin = roles?.some((r) => r.role === "admin");
      if (!isAdmin) {
        toast.error("Access denied. Admin role required.");
        await supabase.auth.signOut();
        navigate("/admin/login");
        return;
      }
      setLoading(false);
    };
    checkAuth();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>;

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-56 bg-sidebar text-sidebar-foreground flex flex-col shrink-0">
        <div className="p-4">
          <Link to="/admin" className="font-display text-xl font-bold italic text-primary">ATM Admin</Link>
        </div>
        <nav className="flex-1 px-2 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${isActive ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground/80 hover:bg-sidebar-accent"}`}
              >
                <Icon size={18} />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-2">
          <button onClick={handleSignOut} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent w-full">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 bg-background p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
