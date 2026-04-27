import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import {
  Save, Globe, Phone, Mail, MapPin, Clock, Facebook, Youtube,
  Instagram, Music2, MessageCircle, ImageIcon, Upload, Trash2,
  Sunrise, Eye,
} from 'lucide-react';

type Lang = 'vn' | 'jp' | 'en';
const LANG_LABELS: Record<Lang, string> = { vn: 'Tiếng Việt', jp: '日本語', en: 'English' };

type FooterData = {
  id?: string;
  center_name_vn?: string; center_name_jp?: string; center_name_en?: string;
  description_vn?: string; description_jp?: string; description_en?: string;
  address?: string; phone?: string; email?: string; working_hours?: string;
  facebook_url?: string; youtube_url?: string; zalo_url?: string;
  instagram_url?: string; tiktok_url?: string; copyright_text?: string;
  logo_url?: string; favicon_url?: string;
};

const FooterAdmin = () => {
  const [data, setData] = useState<FooterData>({});
  const [saving, setSaving] = useState(false);
  const [previewLang, setPreviewLang] = useState<Lang>('vn');
  const [uploading, setUploading] = useState<'logo' | 'favicon' | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const faviconInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => { load(); }, []);

  const load = async () => {
    const { data: row } = await supabase.from('footer_settings').select('*').limit(1).maybeSingle();
    if (row) setData(row);
  };

  const set = (k: keyof FooterData, v: string) => setData((p) => ({ ...p, [k]: v }));

  const handleUpload = async (kind: 'logo' | 'favicon', file: File) => {
    setUploading(kind);
    try {
      const ext = file.name.split('.').pop() || 'png';
      const path = `${kind}-${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage.from('branding').upload(path, file, {
        upsert: true, contentType: file.type,
      });
      if (upErr) throw upErr;
      const { data: { publicUrl } } = supabase.storage.from('branding').getPublicUrl(path);
      set(kind === 'logo' ? 'logo_url' : 'favicon_url', publicUrl);
      toast({ title: '✅ Đã upload', description: `${kind === 'logo' ? 'Logo' : 'Favicon'} đã được tải lên` });
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Upload thất bại', description: e.message });
    } finally {
      setUploading(null);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    const payload = { ...data };
    delete (payload as any).id;
    delete (payload as any).created_at;
    delete (payload as any).updated_at;

    const { error } = data.id
      ? await supabase.from('footer_settings').update(payload).eq('id', data.id)
      : await supabase.from('footer_settings').insert(payload);

    if (error) {
      toast({ variant: 'destructive', title: 'Lỗi', description: error.message });
    } else {
      toast({ title: '✅ Đã lưu', description: 'Footer đã được cập nhật' });
      load();
    }
    setSaving(false);
  };

  const previewName = (data as any)[`center_name_${previewLang}`] || data.center_name_vn || 'Quang Dũng Japanese Center';
  const previewDesc = (data as any)[`description_${previewLang}`] || data.description_vn || '';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
        <div>
          <h1 className="text-3xl font-bold">Cấu hình Footer & Thương hiệu</h1>
          <p className="text-muted-foreground mt-1">Quản lý logo, favicon, thông tin liên hệ và mạng xã hội (đa ngôn ngữ).</p>
        </div>
        <Button onClick={handleSave} disabled={saving} size="lg">
          <Save className="h-4 w-4 mr-2" />{saving ? 'Đang lưu...' : 'Lưu thay đổi'}
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* ====== FORM (2/3) ====== */}
        <div className="lg:col-span-2 space-y-6">
          {/* Logo & Favicon */}
          <Card className="p-6">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />Logo & Favicon
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Logo */}
              <div className="space-y-3">
                <Label>Logo trang web</Label>
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-xl border-2 border-dashed border-border flex items-center justify-center bg-muted/30 overflow-hidden shrink-0">
                    {data.logo_url ? (
                      <img src={data.logo_url} alt="Logo" className="h-full w-full object-cover" />
                    ) : (
                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <input
                      ref={logoInputRef} type="file" accept="image/*" className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleUpload('logo', e.target.files[0])}
                    />
                    <Button variant="outline" size="sm" onClick={() => logoInputRef.current?.click()} disabled={uploading === 'logo'}>
                      <Upload className="h-4 w-4 mr-2" />{uploading === 'logo' ? 'Đang tải...' : 'Tải logo'}
                    </Button>
                    {data.logo_url && (
                      <Button variant="ghost" size="sm" onClick={() => set('logo_url', '')}>
                        <Trash2 className="h-4 w-4 mr-2" />Xoá
                      </Button>
                    )}
                  </div>
                </div>
                <Input
                  placeholder="Hoặc dán URL logo..."
                  value={data.logo_url || ''}
                  onChange={(e) => set('logo_url', e.target.value)}
                />
              </div>

              {/* Favicon */}
              <div className="space-y-3">
                <Label>Favicon (icon trên tab trình duyệt)</Label>
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-xl border-2 border-dashed border-border flex items-center justify-center bg-muted/30 overflow-hidden shrink-0">
                    {data.favicon_url ? (
                      <img src={data.favicon_url} alt="Favicon" className="h-10 w-10 object-contain" />
                    ) : (
                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <input
                      ref={faviconInputRef} type="file" accept="image/*,.ico" className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleUpload('favicon', e.target.files[0])}
                    />
                    <Button variant="outline" size="sm" onClick={() => faviconInputRef.current?.click()} disabled={uploading === 'favicon'}>
                      <Upload className="h-4 w-4 mr-2" />{uploading === 'favicon' ? 'Đang tải...' : 'Tải favicon'}
                    </Button>
                    {data.favicon_url && (
                      <Button variant="ghost" size="sm" onClick={() => set('favicon_url', '')}>
                        <Trash2 className="h-4 w-4 mr-2" />Xoá
                      </Button>
                    )}
                  </div>
                </div>
                <Input
                  placeholder="Hoặc dán URL favicon..."
                  value={data.favicon_url || ''}
                  onChange={(e) => set('favicon_url', e.target.value)}
                />
              </div>
            </div>
          </Card>

          {/* Đa ngôn ngữ */}
          <Card className="p-6">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5" />Tên & Mô tả trung tâm (đa ngôn ngữ)
            </h2>
            <Tabs defaultValue="vn">
              <TabsList className="grid grid-cols-3 w-full max-w-md">
                <TabsTrigger value="vn">🇻🇳 Tiếng Việt</TabsTrigger>
                <TabsTrigger value="jp">🇯🇵 日本語</TabsTrigger>
                <TabsTrigger value="en">🇬🇧 English</TabsTrigger>
              </TabsList>
              {(['vn', 'jp', 'en'] as const).map((lang) => (
                <TabsContent key={lang} value={lang} className="space-y-4 mt-4">
                  <div>
                    <Label>Tên trung tâm ({LANG_LABELS[lang]})</Label>
                    <Input
                      value={(data as any)[`center_name_${lang}`] || ''}
                      onChange={(e) => set(`center_name_${lang}` as any, e.target.value)}
                      className={lang === 'jp' ? 'font-japanese' : ''}
                    />
                  </div>
                  <div>
                    <Label>Mô tả ngắn ({LANG_LABELS[lang]})</Label>
                    <Textarea
                      rows={4}
                      value={(data as any)[`description_${lang}`] || ''}
                      onChange={(e) => set(`description_${lang}` as any, e.target.value)}
                      className={lang === 'jp' ? 'font-japanese' : ''}
                    />
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </Card>

          {/* Liên hệ */}
          <Card className="p-6">
            <h2 className="font-semibold text-lg mb-4">Thông tin liên hệ</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label className="flex items-center gap-2"><Phone className="h-4 w-4" />Số điện thoại</Label>
                <Input value={data.phone || ''} onChange={(e) => set('phone', e.target.value)} placeholder="+84 123 456 789" />
              </div>
              <div>
                <Label className="flex items-center gap-2"><Mail className="h-4 w-4" />Email</Label>
                <Input value={data.email || ''} onChange={(e) => set('email', e.target.value)} placeholder="info@example.com" />
              </div>
              <div className="sm:col-span-2">
                <Label className="flex items-center gap-2"><MapPin className="h-4 w-4" />Địa chỉ</Label>
                <Input value={data.address || ''} onChange={(e) => set('address', e.target.value)} />
              </div>
              <div className="sm:col-span-2">
                <Label className="flex items-center gap-2"><Clock className="h-4 w-4" />Giờ làm việc</Label>
                <Input value={data.working_hours || ''} onChange={(e) => set('working_hours', e.target.value)} placeholder="8:00 - 21:00 (T2-CN)" />
              </div>
            </div>
          </Card>

          {/* Mạng xã hội */}
          <Card className="p-6">
            <h2 className="font-semibold text-lg mb-4">Mạng xã hội</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label className="flex items-center gap-2"><Facebook className="h-4 w-4 text-blue-500" />Facebook</Label>
                <Input value={data.facebook_url || ''} onChange={(e) => set('facebook_url', e.target.value)} placeholder="https://facebook.com/..." />
              </div>
              <div>
                <Label className="flex items-center gap-2"><Youtube className="h-4 w-4 text-red-500" />YouTube</Label>
                <Input value={data.youtube_url || ''} onChange={(e) => set('youtube_url', e.target.value)} placeholder="https://youtube.com/..." />
              </div>
              <div>
                <Label className="flex items-center gap-2"><MessageCircle className="h-4 w-4 text-green-500" />Zalo</Label>
                <Input value={data.zalo_url || ''} onChange={(e) => set('zalo_url', e.target.value)} placeholder="https://zalo.me/..." />
              </div>
              <div>
                <Label className="flex items-center gap-2"><Instagram className="h-4 w-4 text-pink-500" />Instagram</Label>
                <Input value={data.instagram_url || ''} onChange={(e) => set('instagram_url', e.target.value)} placeholder="https://instagram.com/..." />
              </div>
              <div className="sm:col-span-2">
                <Label className="flex items-center gap-2"><Music2 className="h-4 w-4" />TikTok</Label>
                <Input value={data.tiktok_url || ''} onChange={(e) => set('tiktok_url', e.target.value)} placeholder="https://tiktok.com/@..." />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <Label>Dòng bản quyền</Label>
            <Input value={data.copyright_text || ''} onChange={(e) => set('copyright_text', e.target.value)} className="mt-2" />
          </Card>
        </div>

        {/* ====== LIVE PREVIEW (1/3) ====== */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-20 space-y-4">
            <Card className="p-4 border-primary/30 shadow-glow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Eye className="h-4 w-4" />Live Preview
                </h3>
                <div className="flex gap-1">
                  {(['vn', 'jp', 'en'] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => setPreviewLang(l)}
                      className={`text-xs px-2 py-1 rounded-md transition-colors ${
                        previewLang === l ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/70'
                      }`}
                    >
                      {l.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border bg-card p-4 space-y-4">
                {/* Header preview */}
                <div className="flex items-center gap-3 pb-3 border-b">
                  {data.logo_url ? (
                    <img src={data.logo_url} alt="logo" className="h-10 w-10 rounded-full object-cover" />
                  ) : (
                    <div className="p-1.5 rounded-full bg-gradient-to-br from-sakura to-sunrise">
                      <Sunrise className="h-6 w-6 text-white" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className={`font-bold text-sm truncate ${previewLang === 'jp' ? 'font-japanese' : ''}`}>{previewName}</p>
                    {data.favicon_url && (
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <img src={data.favicon_url} alt="favicon" className="h-3 w-3" />
                        <span className="text-[10px] text-muted-foreground">favicon</span>
                      </div>
                    )}
                  </div>
                </div>

                {previewDesc && (
                  <p className={`text-xs text-muted-foreground leading-relaxed ${previewLang === 'jp' ? 'font-japanese' : ''}`}>
                    {previewDesc}
                  </p>
                )}

                <div className="flex flex-wrap gap-2">
                  {data.facebook_url && <span className="h-7 w-7 rounded-full bg-blue-600 flex items-center justify-center"><Facebook className="h-3.5 w-3.5 text-white" /></span>}
                  {data.youtube_url && <span className="h-7 w-7 rounded-full bg-red-600 flex items-center justify-center"><Youtube className="h-3.5 w-3.5 text-white" /></span>}
                  {data.zalo_url && <span className="h-7 w-7 rounded-full bg-green-600 flex items-center justify-center"><MessageCircle className="h-3.5 w-3.5 text-white" /></span>}
                  {data.instagram_url && <span className="h-7 w-7 rounded-full bg-pink-600 flex items-center justify-center"><Instagram className="h-3.5 w-3.5 text-white" /></span>}
                  {data.tiktok_url && <span className="h-7 w-7 rounded-full bg-foreground flex items-center justify-center"><Music2 className="h-3.5 w-3.5 text-background" /></span>}
                </div>

                <div className="space-y-1.5 text-xs pt-2 border-t">
                  {data.phone && <div className="flex items-center gap-2"><Phone className="h-3 w-3 text-primary" />{data.phone}</div>}
                  {data.email && <div className="flex items-center gap-2"><Mail className="h-3 w-3 text-primary" />{data.email}</div>}
                  {data.address && <div className="flex items-start gap-2"><MapPin className="h-3 w-3 text-primary mt-0.5" /><span>{data.address}</span></div>}
                  {data.working_hours && <div className="flex items-center gap-2 text-muted-foreground"><Clock className="h-3 w-3" />{data.working_hours}</div>}
                </div>

                {data.copyright_text && (
                  <p className="text-[10px] text-muted-foreground pt-2 border-t">{data.copyright_text}</p>
                )}
              </div>

              <p className="text-xs text-muted-foreground mt-3">
                💡 Bấm <strong>Lưu thay đổi</strong> để cập nhật website thật.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterAdmin;