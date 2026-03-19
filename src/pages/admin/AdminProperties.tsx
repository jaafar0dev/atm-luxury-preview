import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { MultiImageUpload } from "@/components/ImageUpload";

interface PropertyForm {
  title: string; description: string; price: string; property_type: string; status: string;
  city: string; location: string; bedrooms: string; bathrooms: string; images: string[]; tags: string; is_featured: boolean; video_link: string;
}

const emptyForm: PropertyForm = {
  title: "", description: "", price: "", property_type: "Residential Land", status: "for-sale",
  city: "Abuja", location: "", bedrooms: "0", bathrooms: "0", images: [], tags: "", is_featured: true, video_link: "",
};

const AdminProperties = () => {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<PropertyForm>(emptyForm);

  const { data: properties } = useQuery({
    queryKey: ["admin-properties"],
    queryFn: async () => {
      const { data } = await supabase.from("properties").select("*").order("created_at", { ascending: false });
      return data || [];
    },
  });

  const openNew = () => { setEditId(null); setForm(emptyForm); setDialogOpen(true); };
  const openEdit = (p: any) => {
    setEditId(p.id);
    setForm({
      title: p.title, description: p.description || "", price: String(p.price),
      property_type: p.property_type, status: p.status, city: p.city,
      location: p.location || "", bedrooms: String(p.bedrooms || 0), bathrooms: String(p.bathrooms || 0),
      images: (p.images || []).join("\n"), tags: (p.tags || []).join(", "), is_featured: p.is_featured || false, video_link: (p as any).video_link || "",
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim()) { toast.error("Title required"); return; }
    const payload = {
      title: form.title.trim(),
      description: form.description.trim() || null,
      price: parseInt(form.price) || 0,
      property_type: form.property_type,
      status: form.status,
      city: form.city,
      location: form.location.trim() || null,
      bedrooms: parseInt(form.bedrooms) || 0,
      bathrooms: parseInt(form.bathrooms) || 0,
      images: form.images.split("\n").map((s) => s.trim()).filter(Boolean),
      tags: form.tags.split(",").map((s) => s.trim()).filter(Boolean),
      is_featured: form.is_featured,
      video_link: form.video_link.trim() || null,
    } as any;

    let error;
    if (editId) {
      ({ error } = await supabase.from("properties").update(payload).eq("id", editId));
    } else {
      ({ error } = await supabase.from("properties").insert(payload));
    }

    if (error) toast.error("Failed to save property");
    else {
      toast.success(editId ? "Property updated" : "Property added");
      setDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ["admin-properties"] });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this property?")) return;
    const { error } = await supabase.from("properties").delete().eq("id", id);
    if (error) toast.error("Failed to delete");
    else {
      toast.success("Deleted");
      queryClient.invalidateQueries({ queryKey: ["admin-properties"] });
    }
  };

  const formatPrice = (p: number) => "₦" + p.toLocaleString();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-display font-bold text-foreground">Properties</h1>
        <Button onClick={openNew} className="btn-primary"><Plus size={16} className="mr-2" /> Add Property</Button>
      </div>

      <div className="border border-border rounded-lg overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>City</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties?.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium max-w-[300px] truncate">{p.title}</TableCell>
                <TableCell>{p.property_type}</TableCell>
                <TableCell>{formatPrice(p.price)}</TableCell>
                <TableCell><Badge className="bg-success/20 text-success text-xs">{p.status}</Badge></TableCell>
                <TableCell>{p.city}</TableCell>
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
          <DialogHeader>
            <DialogTitle>{editId ? "Edit Property" : "Add Property"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Title *" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <Textarea placeholder="Description (supports multiple paragraphs)" rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <Input placeholder="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            <div className="grid grid-cols-2 gap-3">
              <Select value={form.property_type} onValueChange={(v) => setForm({ ...form, property_type: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Apartment">Apartment</SelectItem>
                  <SelectItem value="Bungalow">Bungalow</SelectItem>
                  <SelectItem value="Detached Bungalow">Detached Bungalow</SelectItem>
                  <SelectItem value="Semi-Detached Bungalow">Semi-Detached Bungalow</SelectItem>
                  <SelectItem value="Terrace Bungalow">Terrace Bungalow</SelectItem>
                  <SelectItem value="Detached Duplex">Detached Duplex</SelectItem>
                  <SelectItem value="Duplex">Duplex</SelectItem>
                  <SelectItem value="Maisonette">Maisonette</SelectItem>
                  <SelectItem value="Penthouse">Penthouse</SelectItem>
                  <SelectItem value="Semi-Detached Duplex">Semi-Detached Duplex</SelectItem>
                  <SelectItem value="Terrace Duplex">Terrace Duplex</SelectItem>
                  <SelectItem value="Residential Land">Residential Land</SelectItem>
                  <SelectItem value="Commercial Land">Commercial Land</SelectItem>
                  <SelectItem value="Office/Suite">Office/Suite</SelectItem>
                  <SelectItem value="Luxury Home">Luxury Home</SelectItem>
                  <SelectItem value="Mansion">Mansion</SelectItem>
                </SelectContent>
              </Select>
              <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="for-sale">For Sale</SelectItem>
                  <SelectItem value="for-rent">For Rent</SelectItem>
                  <SelectItem value="investment">Investment</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Select value={form.city} onValueChange={(v) => setForm({ ...form, city: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Abuja">Abuja</SelectItem>
                  <SelectItem value="Lagos">Lagos</SelectItem>
                  <SelectItem value="Ibadan">Ibadan</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Bedrooms" type="number" value={form.bedrooms} onChange={(e) => setForm({ ...form, bedrooms: e.target.value })} />
              <Input placeholder="Bathrooms" type="number" value={form.bathrooms} onChange={(e) => setForm({ ...form, bathrooms: e.target.value })} />
            </div>
            <Textarea placeholder="Image URLs (one per line)" rows={3} value={form.images} onChange={(e) => setForm({ ...form, images: e.target.value })} />
            <Input placeholder="Tags (comma separated)" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
            <Input placeholder="Video Link (optional, e.g. YouTube URL)" value={form.video_link} onChange={(e) => setForm({ ...form, video_link: e.target.value })} />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} />
              Featured property
            </label>
            <Button onClick={handleSave} className="w-full btn-primary">
              {editId ? "Update Property" : "Add Property"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProperties;
