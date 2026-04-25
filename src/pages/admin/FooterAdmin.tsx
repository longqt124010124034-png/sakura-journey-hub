import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Save, Globe, Phone, Mail, MapPin, Clock, Facebook, Youtube, Instagram, Music2, MessageCircle } from 'lucide-react';

type FooterData = {
  id?: string;
  center_name_vn?: string; center_name_jp?: string; center_name_en?: string;
  description_vn?: string; description_jp?: string; description_en?: string;
  address?: string; phone?: string; email?: string; working_hours?: string;
  facebook_url?: string; youtube_url?: string; zalo_url?: string;
  instagram_url?: string; tiktok_url?: string; copyright_text?: string;
};

const FooterAdmin = () => {
  const [data, setData] = useState<FooterData>({});
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => { load(); }, []);

  const load = async () => {
    const { data: row } = await supabase.from('footer_settings').select('*').limit(1).maybeSingle();
    if (row) setData(row);
  };

  const set = (k: keyof FooterData, v: string) => setData((p) => ({ ...p, [k]: v }));

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

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Cấu hình Footer</h1>
          <p className="text-muted-foreground mt-1">Chỉnh sửa thông tin liên hệ và mạng xã hội hiển thị ở footer</p>
        </div>
        <Button onClick={handleSave} disabled={saving}><Save className="h-4 w-4 mr-2" />{saving ? 'Đang lưu...' : 'Lưu thay đổi'}</Button>
      </div>

      <Card className="p-6">
        <h2 className="font-semibold text-lg mb-4 flex items-center gap-2"><Globe className="h-5 w-5" />Tên & Mô tả trung tâm</h2>
        <Tabs defaultValue="vn">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="vn">Tiếng Việt</TabsTrigger>
            <TabsTrigger value="jp">日本語</TabsTrigger>
            <TabsTrigger value="en">English</TabsTrigger>
          </TabsList>
          {(['vn', 'jp', 'en'] as const).map((lang) => (
            <TabsContent key={lang} value={lang} className="space-y-4 mt-4">
              <div>
                <Label>Tên trung tâm</Label>
                <Input value={(data as any)[`center_name_${lang}`] || ''} onChange={(e) => set(`center_name_${lang}` as any, e.target.value)} />
              </div>
              <div>
                <Label>Mô tả ngắn</Label>
                <Textarea rows={3} value={(data as any)[`description_${lang}`] || ''} onChange={(e) => set(`description_${lang}` as any, e.target.value)} />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </Card>

      <Card className="p-6">
        <h2 className="font-semibold text-lg mb-4">Thông tin liên hệ</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label className="flex items-center gap-2"><Phone className="h-4 w-4" />Số điện thoại</Label>
            <Input value={data.phone || ''} onChange={(e) => set('phone', e.target.value)} placeholder="+84 123 456 789" />
          </div>
          <div>
            <Label className="flex items-center gap-2"><Mail className="h-4 w-4" />Email</Label>
            <Input value={data.email || ''} onChange={(e) => set('email', e.target.value)} placeholder="info@example.com" />
          </div>
          <div className="md:col-span-2">
            <Label className="flex items-center gap-2"><MapPin className="h-4 w-4" />Địa chỉ</Label>
            <Input value={data.address || ''} onChange={(e) => set('address', e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <Label className="flex items-center gap-2"><Clock className="h-4 w-4" />Giờ làm việc</Label>
            <Input value={data.working_hours || ''} onChange={(e) => set('working_hours', e.target.value)} placeholder="8:00 - 21:00 (T2-CN)" />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="font-semibold text-lg mb-4">Mạng xã hội</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label className="flex items-center gap-2"><Facebook className="h-4 w-4" />Facebook URL</Label>
            <Input value={data.facebook_url || ''} onChange={(e) => set('facebook_url', e.target.value)} placeholder="https://facebook.com/..." />
          </div>
          <div>
            <Label className="flex items-center gap-2"><Youtube className="h-4 w-4" />YouTube URL</Label>
            <Input value={data.youtube_url || ''} onChange={(e) => set('youtube_url', e.target.value)} placeholder="https://youtube.com/..." />
          </div>
          <div>
            <Label className="flex items-center gap-2"><MessageCircle className="h-4 w-4" />Zalo URL</Label>
            <Input value={data.zalo_url || ''} onChange={(e) => set('zalo_url', e.target.value)} placeholder="https://zalo.me/..." />
          </div>
          <div>
            <Label className="flex items-center gap-2"><Instagram className="h-4 w-4" />Instagram URL</Label>
            <Input value={data.instagram_url || ''} onChange={(e) => set('instagram_url', e.target.value)} placeholder="https://instagram.com/..." />
          </div>
          <div className="md:col-span-2">
            <Label className="flex items-center gap-2"><Music2 className="h-4 w-4" />TikTok URL</Label>
            <Input value={data.tiktok_url || ''} onChange={(e) => set('tiktok_url', e.target.value)} placeholder="https://tiktok.com/@..." />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="font-semibold text-lg mb-4">Bản quyền</h2>
        <div>
          <Label>Dòng bản quyền</Label>
          <Input value={data.copyright_text || ''} onChange={(e) => set('copyright_text', e.target.value)} />
        </div>
      </Card>

      <div className="flex justify-end">
        <Button size="lg" onClick={handleSave} disabled={saving}><Save className="h-4 w-4 mr-2" />{saving ? 'Đang lưu...' : 'Lưu thay đổi'}</Button>
      </div>
    </div>
  );
};

export default FooterAdmin;
