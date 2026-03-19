import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  bucket?: string;
  folder?: string;
  placeholder?: string;
}

export const ImageUpload = ({ value, onChange, bucket = "uploads", folder = "general", placeholder = "Upload image" }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { toast.error("Please select an image file"); return; }
    if (file.size > 5 * 1024 * 1024) { toast.error("Image must be under 5MB"); return; }

    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error } = await supabase.storage.from(bucket).upload(path, file);
    if (error) { toast.error("Upload failed: " + error.message); setUploading(false); return; }

    const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(path);
    onChange(publicUrl);
    setUploading(false);
    toast.success("Image uploaded");
  };

  return (
    <div className="space-y-2">
      {value && (
        <div className="relative inline-block">
          <img src={value} alt="Preview" className="w-full max-h-40 object-cover rounded-md border" />
          <button onClick={() => onChange("")} className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1">
            <X size={12} />
          </button>
        </div>
      )}
      <div className="flex gap-2">
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
        <Button type="button" variant="outline" size="sm" className="rounded-full" onClick={() => inputRef.current?.click()} disabled={uploading}>
          {uploading ? <Loader2 size={14} className="mr-1 animate-spin" /> : <Upload size={14} className="mr-1" />}
          {uploading ? "Uploading..." : placeholder}
        </Button>
      </div>
    </div>
  );
};

interface MultiImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  bucket?: string;
  folder?: string;
}

export const MultiImageUpload = ({ value, onChange, bucket = "property-images", folder = "properties" }: MultiImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const valid = files.filter(f => f.type.startsWith("image/") && f.size <= 5 * 1024 * 1024);
    if (valid.length !== files.length) toast.error("Some files skipped (not images or >5MB)");
    if (!valid.length) return;

    setUploading(true);
    const newUrls: string[] = [];
    for (const file of valid) {
      const ext = file.name.split(".").pop();
      const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from(bucket).upload(path, file);
      if (error) { toast.error(`Failed: ${file.name}`); continue; }
      const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(path);
      newUrls.push(publicUrl);
    }
    onChange([...value, ...newUrls]);
    setUploading(false);
    toast.success(`${newUrls.length} image(s) uploaded`);
    if (inputRef.current) inputRef.current.value = "";
  };

  const removeImage = (index: number) => onChange(value.filter((_, i) => i !== index));

  return (
    <div className="space-y-2">
      {value.length > 0 && (
        <div className="grid grid-cols-4 gap-2">
          {value.map((url, i) => (
            <div key={i} className="relative group">
              <img src={url} alt="" className="w-full aspect-square object-cover rounded-md border" />
              <button onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <X size={10} />
              </button>
            </div>
          ))}
        </div>
      )}
      <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} />
      <Button type="button" variant="outline" size="sm" className="rounded-full" onClick={() => inputRef.current?.click()} disabled={uploading}>
        {uploading ? <Loader2 size={14} className="mr-1 animate-spin" /> : <Upload size={14} className="mr-1" />}
        {uploading ? "Uploading..." : "Upload Images"}
      </Button>
    </div>
  );
};
