
-- Create a general uploads bucket for team, blog, gallery images
INSERT INTO storage.buckets (id, name, public) VALUES ('uploads', 'uploads', true);

-- Allow anyone to view files in uploads bucket
CREATE POLICY "Public read access on uploads" ON storage.objects FOR SELECT TO public USING (bucket_id = 'uploads');

-- Allow authenticated users to upload to uploads bucket  
CREATE POLICY "Authenticated users can upload" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id IN ('uploads', 'property-images'));

-- Allow authenticated users to delete from uploads bucket
CREATE POLICY "Authenticated users can delete uploads" ON storage.objects FOR DELETE TO authenticated USING (bucket_id IN ('uploads', 'property-images'));

-- Also allow public read on property-images if not already
CREATE POLICY "Public read access on property-images" ON storage.objects FOR SELECT TO public USING (bucket_id = 'property-images');
