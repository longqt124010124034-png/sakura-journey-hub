import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AboutAdmin = () => {
  const [aboutVN, setAboutVN] = useState<any>(null);
  const [aboutJP, setAboutJP] = useState<any>(null);
  const [aboutEN, setAboutEN] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    const { data } = await supabase
      .from('about_content')
      .select('*');
    
    if (data) {
      data.forEach(item => {
        if (item.language === 'vn') setAboutVN(item);
        if (item.language === 'jp') setAboutJP(item);
        if (item.language === 'en') setAboutEN(item);
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, language: string) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const contentData = {
      language,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      mission: formData.get('mission') as string,
    };

    const existing = language === 'vn' ? aboutVN : language === 'jp' ? aboutJP : aboutEN;

    const { error } = existing
      ? await supabase.from('about_content').update(contentData).eq('id', existing.id)
      : await supabase.from('about_content').insert(contentData);

    if (error) {
      toast({ variant: 'destructive', title: 'Lỗi', description: error.message });
    } else {
      toast({ title: 'Đã lưu' });
      loadContent();
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Quản lý Giới thiệu</h1>

      <Card className="p-6">
        <Tabs defaultValue="vn" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="vn">Tiếng Việt</TabsTrigger>
            <TabsTrigger value="jp">日本語</TabsTrigger>
            <TabsTrigger value="en">English</TabsTrigger>
          </TabsList>

          <TabsContent value="vn">
            <form onSubmit={(e) => handleSubmit(e, 'vn')} className="space-y-4">
              <div>
                <Label>Tiêu đề</Label>
                <Input name="title" defaultValue={aboutVN?.title} required />
              </div>
              <div>
                <Label>Mô tả</Label>
                <Textarea name="description" defaultValue={aboutVN?.description} required rows={4} />
              </div>
              <div>
                <Label>Sứ mệnh</Label>
                <Textarea name="mission" defaultValue={aboutVN?.mission} required rows={6} />
              </div>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                Lưu (VN)
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="jp">
            <form onSubmit={(e) => handleSubmit(e, 'jp')} className="space-y-4">
              <div>
                <Label>タイトル</Label>
                <Input name="title" defaultValue={aboutJP?.title} required />
              </div>
              <div>
                <Label>説明</Label>
                <Textarea name="description" defaultValue={aboutJP?.description} required rows={4} />
              </div>
              <div>
                <Label>ミッション</Label>
                <Textarea name="mission" defaultValue={aboutJP?.mission} required rows={6} />
              </div>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                保存 (JP)
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="en">
            <form onSubmit={(e) => handleSubmit(e, 'en')} className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input name="title" defaultValue={aboutEN?.title} required />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea name="description" defaultValue={aboutEN?.description} required rows={4} />
              </div>
              <div>
                <Label>Mission</Label>
                <Textarea name="mission" defaultValue={aboutEN?.mission} required rows={6} />
              </div>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                Save (EN)
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default AboutAdmin;
