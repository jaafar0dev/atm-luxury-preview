import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Trash2, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { MultiImageUpload } from "@/components/ImageUpload";

const AdminGallery = () => {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("general");
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const { data: items } = useQuery({
    queryKey: ["admin-gallery"],
    queryFn: async () => {
      const { data, error } = await supabase.from("gallery").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const handleSubmit = async () => {
    if (!title || imageUrls.length === 0) {
      toast.error("Title and at least one image are required");
      return;
    }
    // Insert one gallery item per image
    const items = imageUrls.map((url) => ({
      title,
      description: description || null,
      image_url: url,
      category: category || "general",
    }));
    const { error } = await supabase.from("gallery").insert(items);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(`${imageUrls.length} gallery item(s) added`);
    queryClient.invalidateQueries({ queryKey: ["admin-gallery"] });
    setDialogOpen(false);
    setTitle(""); setDescription(""); setCategory("general"); setImageUrls([]);
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
        <Button onClick={() => { setTitle(""); setDescription(""); setCategory("general"); setImageUrls([]); setDialogOpen(true); }} className="rounded-full">
          <Plus size={16} className="mr-2" /> Add Items
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
            <DialogTitle>Add Gallery Items</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <div>
              <label className="text-sm font-medium mb-1 block">Images (upload multiple at once)</label>
              <MultiImageUpload value={imageUrls} onChange={setImageUrls} bucket="uploads" folder="gallery" />
            </div>
            <Input placeholder="Category (e.g. properties, developments)" value={category} onChange={(e) => setCategory(e.target.value)} />
            <Textarea placeholder="Description (optional)" value={description} onChange={(e) => setDescription(e.target.value)} />
            <Button onClick={handleSubmit} className="w-full rounded-full">Add {imageUrls.length > 1 ? `${imageUrls.length} Items` : "Item"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminGallery;
