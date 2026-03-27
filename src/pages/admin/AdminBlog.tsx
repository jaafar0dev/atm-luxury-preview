import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RichTextEditor } from "@/components/RichTextEditor";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { ImageUpload } from "@/components/ImageUpload";

const AdminBlog = () => {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", content: "", author: "ATM Luxury Properties", slug: "", image_url: "", published: false });

  const { data: posts } = useQuery({
    queryKey: ["admin-blog"],
    queryFn: async () => {
      const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
      return data || [];
    },
  });

  const openNew = () => { setEditId(null); setForm({ title: "", content: "", author: "ATM Luxury Properties", slug: "", image_url: "", published: false }); setDialogOpen(true); };
  const openEdit = (p: any) => {
    setEditId(p.id);
    setForm({ title: p.title, content: p.content || "", author: p.author, slug: p.slug || "", image_url: p.image_url || "", published: p.published || false });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim()) { toast.error("Title required"); return; }
    const slug = form.slug.trim() || form.title.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const payload = {
      title: form.title.trim(), content: form.content.trim() || null, author: form.author.trim(),
      slug, image_url: form.image_url.trim() || null, published: form.published,
    };
    let error;
    if (editId) ({ error } = await supabase.from("blog_posts").update(payload).eq("id", editId));
    else ({ error } = await supabase.from("blog_posts").insert(payload));
    if (error) toast.error("Failed to save");
    else { toast.success("Saved"); setDialogOpen(false); queryClient.invalidateQueries({ queryKey: ["admin-blog"] }); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await supabase.from("blog_posts").delete().eq("id", id);
    toast.success("Deleted");
    queryClient.invalidateQueries({ queryKey: ["admin-blog"] });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-display font-bold text-foreground">Blog Posts</h1>
        <Button onClick={openNew} className="btn-primary"><Plus size={16} className="mr-2" /> Add Post</Button>
      </div>
      <div className="border border-border rounded-lg overflow-auto">
        <Table>
          <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Author</TableHead><TableHead>Date</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {posts?.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.title}</TableCell>
                <TableCell>{p.author}</TableCell>
                <TableCell>{formatDistanceToNow(new Date(p.created_at), { addSuffix: true })}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(p)}><Pencil size={16} /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)} className="text-destructive"><Trash2 size={16} /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editId ? "Edit Post" : "Add Post"}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Title *" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <Input placeholder="Slug (auto-generated if empty)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
            <Input placeholder="Author" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
            <div>
              <label className="text-sm font-medium mb-1 block">Cover Image</label>
              <ImageUpload value={form.image_url} onChange={(url) => setForm({ ...form, image_url: url })} folder="blog" placeholder="Upload cover image" />
            </div>
            <Textarea placeholder="Content (supports paragraphs)" rows={8} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
            <div className="flex items-center gap-2">
              <Switch checked={form.published} onCheckedChange={(v) => setForm({ ...form, published: v })} />
              <span className="text-sm text-muted-foreground">Published</span>
            </div>
            <Button onClick={handleSave} className="w-full btn-primary">{editId ? "Update" : "Add"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBlog;
