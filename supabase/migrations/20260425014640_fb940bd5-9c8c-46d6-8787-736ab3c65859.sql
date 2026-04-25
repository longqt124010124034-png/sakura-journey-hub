CREATE TABLE public.footer_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  center_name_vn TEXT,
  center_name_jp TEXT,
  center_name_en TEXT,
  description_vn TEXT,
  description_jp TEXT,
  description_en TEXT,
  address TEXT,
  phone TEXT,
  email TEXT,
  working_hours TEXT,
  facebook_url TEXT,
  youtube_url TEXT,
  zalo_url TEXT,
  instagram_url TEXT,
  tiktok_url TEXT,
  copyright_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.footer_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view footer"
ON public.footer_settings FOR SELECT USING (true);

CREATE POLICY "Admins can insert footer"
ON public.footer_settings FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update footer"
ON public.footer_settings FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete footer"
ON public.footer_settings FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_footer_settings_updated_at
BEFORE UPDATE ON public.footer_settings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.footer_settings (
  center_name_vn, center_name_jp, center_name_en,
  description_vn, description_jp, description_en,
  address, phone, email, working_hours,
  facebook_url, youtube_url, zalo_url, instagram_url, tiktok_url,
  copyright_text
) VALUES (
  'Trung tâm tiếng Nhật Quang Dũng',
  'クアンユン日本語センター',
  'Quang Dung Japanese Center',
  'Đồng hành cùng bạn chinh phục tiếng Nhật từ N5 đến N3',
  '日本語をN5からN3まで一緒に学びましょう',
  'Master Japanese from N5 to N3 with us',
  '123 Đường ABC, Quận 1, TP.HCM',
  '+84 123 456 789',
  'info@quangdungjapanese.com',
  '8:00 - 21:00 (T2-CN)',
  'https://facebook.com',
  'https://youtube.com',
  'https://zalo.me',
  'https://instagram.com',
  'https://tiktok.com',
  '© 2025 Quang Dũng Japanese Center. All rights reserved.'
);