import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Trash2, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface GalleryForm {
  title: string;
  description: string;
  image_url: string;
  category: string;
}

const emptyForm: GalleryForm = { title: "", description: "", image_url: "", category: "general" };

const AdminGallery = () => {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<GalleryForm>(emptyForm);

  const { data: items } = useQuery({
    queryKey: ["admin-gallery"],
    queryFn: async () => {
      const { data, error } = await supabase.from("gallery").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const handleSubmit = async () => {
    if (!form.title || !form.image_url) {
      toast.error("Title and image URL are required");
      return;
    }
    const { error } = await supabase.from("gallery").insert({
      title: form.title,
      description: form.description || null,
      image_url: form.image_url,
      category: form.category || "general",
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Gallery item added");
    queryClient.invalidateQueries({ queryKey: ["admin-gallery"] });
    setDialogOpen(false);
    setForm(emptyForm);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this gallery item?")) return;
    const { error } = await supabase.from("gallery").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Deleted");
      queryClient.invalidateQueries({ queryKey: ["admin-gallery"] });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Gallery</h1>
        <Button onClick={() => { setForm(emptyForm); setDialogOpen(true); }} className="rounded-full">
          <Plus size={16} className="mr-2" /> Add Item
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items?.map((item) => (
          <div key={item.id} className="relative group rounded-lg overflow-hidden border bg-card">
            <img src={item.image_url} alt={item.title} className="w-full aspect-[4/3] object-cover" />
            <div className="p-3">
              <h3 className="font-semibold text-sm">{item.title}</h3>
              <p className="text-xs text-muted-foreground capitalize">{item.category}</p>
            </div>
            <button
              onClick={() => handleDelete(item.id)}
              className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      {(!items || items.length === 0) && (
        <p className="text-center text-muted-foreground py-20">No gallery items yet. Add your first one!</p>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Gallery Item</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <Input placeholder="Image URL" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
            <Input placeholder="Category (e.g. properties, developments)" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            <Textarea placeholder="Description (optional)" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <Button onClick={handleSubmit} className="w-full rounded-full">Add Item</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminGallery;
