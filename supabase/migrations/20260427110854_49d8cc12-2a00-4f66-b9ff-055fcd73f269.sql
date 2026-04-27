
-- Add logo and favicon to footer_settings (used as global branding)
ALTER TABLE public.footer_settings
  ADD COLUMN IF NOT EXISTS logo_url text,
  ADD COLUMN IF NOT EXISTS favicon_url text;

-- Create public branding bucket for logo/favicon uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('branding', 'branding', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies: public read, admin write
DROP POLICY IF EXISTS "Public can view branding" ON storage.objects;
CREATE POLICY "Public can view branding"
ON storage.objects FOR SELECT
USING (bucket_id = 'branding');

DROP POLICY IF EXISTS "Admins can upload branding" ON storage.objects;
CREATE POLICY "Admins can upload branding"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'branding' AND public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can update branding" ON storage.objects;
CREATE POLICY "Admins can update branding"
ON storage.objects FOR UPDATE
USING (bucket_id = 'branding' AND public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete branding" ON storage.objects;
CREATE POLICY "Admins can delete branding"
ON storage.objects FOR DELETE
USING (bucket_id = 'branding' AND public.has_role(auth.uid(), 'admin'));
