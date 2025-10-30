import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const FAQAdmin = () => {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    const { data } = await supabase
      .from('faqs')
      .select('*')
      .order('display_order', { ascending: true });
    if (data) setFaqs(data);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const faqData = {
      question_vn: formData.get('question_vn') as string,
      question_jp: formData.get('question_jp') as string || null,
      question_en: formData.get('question_en') as string || null,
      answer_vn: formData.get('answer_vn') as string,
      answer_jp: formData.get('answer_jp') as string || null,
      answer_en: formData.get('answer_en') as string || null,
      category: (formData.get('category') as string) || null,
      display_order: parseInt(formData.get('display_order') as string) || 0,
      is_active: true,
    };

    const { error } = editing
      ? await supabase.from('faqs').update(faqData).eq('id', editing.id)
      : await supabase.from('faqs').insert(faqData);

    if (error) {
      toast({ variant: 'destructive', title: 'Lỗi', description: error.message });
    } else {
      toast({ title: editing ? 'Đã cập nhật' : 'Đã thêm mới' });
      setOpen(false);
      setEditing(null);
      loadFAQs();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Xác nhận xóa?')) return;
    
    const { error } = await supabase.from('faqs').delete().eq('id', id);
    if (error) {
      toast({ variant: 'destructive', title: 'Lỗi', description: error.message });
    } else {
      toast({ title: 'Đã xóa' });
      loadFAQs();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Quản lý FAQ</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditing(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Thêm câu hỏi
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editing ? 'Sửa' : 'Thêm'} câu hỏi</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <Tabs defaultValue="vn" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="vn">Tiếng Việt</TabsTrigger>
                  <TabsTrigger value="jp">日本語</TabsTrigger>
                  <TabsTrigger value="en">English</TabsTrigger>
                </TabsList>

                <div className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Danh mục</Label>
                      <Input name="category" defaultValue={editing?.category} placeholder="Học phí, Lịch học..." />
                    </div>
                    <div>
                      <Label>Thứ tự hiển thị</Label>
                      <Input type="number" name="display_order" defaultValue={editing?.display_order || 0} />
                    </div>
                  </div>

                  <TabsContent value="vn" className="space-y-4">
                    <div>
                      <Label>Câu hỏi (VN)</Label>
                      <Input name="question_vn" defaultValue={editing?.question_vn} required />
                    </div>
                    <div>
                      <Label>Câu trả lời (VN)</Label>
                      <Textarea name="answer_vn" defaultValue={editing?.answer_vn} required rows={5} />
                    </div>
                  </TabsContent>

                  <TabsContent value="jp" className="space-y-4">
                    <div>
                      <Label>Câu hỏi (JP)</Label>
                      <Input name="question_jp" defaultValue={editing?.question_jp} />
                    </div>
                    <div>
                      <Label>Câu trả lời (JP)</Label>
                      <Textarea name="answer_jp" defaultValue={editing?.answer_jp} rows={5} />
                    </div>
                  </TabsContent>

                  <TabsContent value="en" className="space-y-4">
                    <div>
                      <Label>Câu hỏi (EN)</Label>
                      <Input name="question_en" defaultValue={editing?.question_en} />
                    </div>
                    <div>
                      <Label>Câu trả lời (EN)</Label>
                      <Textarea name="answer_en" defaultValue={editing?.answer_en} rows={5} />
                    </div>
                  </TabsContent>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>Hủy</Button>
                  <Button type="submit">Lưu</Button>
                </div>
              </Tabs>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {faqs.map((faq) => (
          <Card key={faq.id} className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-bold text-lg">{faq.question_vn}</h3>
                {faq.category && <span className="text-xs text-muted-foreground">{faq.category}</span>}
                <p className="text-sm mt-2">{faq.answer_vn}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => { setEditing(faq); setOpen(true); }}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(faq.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FAQAdmin;
