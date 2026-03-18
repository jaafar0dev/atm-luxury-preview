
CREATE TABLE public.gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  image_url text NOT NULL,
  category text DEFAULT 'general',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Gallery items are viewable by everyone" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Admins can manage gallery" ON public.gallery FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));
