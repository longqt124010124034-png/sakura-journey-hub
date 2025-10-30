import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const PricingAdmin = () => {
  const [plans, setPlans] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    const { data } = await supabase
      .from('pricing_plans')
      .select('*')
      .order('display_order', { ascending: true });
    if (data) setPlans(data);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const planData = {
      name_vn: formData.get('name_vn') as string,
      name_jp: formData.get('name_jp') as string || null,
      name_en: formData.get('name_en') as string || null,
      price: formData.get('price') as string,
      period_vn: formData.get('period_vn') as string,
      period_jp: formData.get('period_jp') as string || null,
      period_en: formData.get('period_en') as string || null,
      description_vn: formData.get('description_vn') as string || null,
      description_jp: formData.get('description_jp') as string || null,
      description_en: formData.get('description_en') as string || null,
      features_vn: (formData.get('features_vn') as string).split('\n').filter(Boolean),
      features_jp: (formData.get('features_jp') as string || '')?.split('\n').filter(Boolean) || null,
      features_en: (formData.get('features_en') as string || '')?.split('\n').filter(Boolean) || null,
      is_popular: formData.get('is_popular') === 'on',
      display_order: parseInt(formData.get('display_order') as string) || 0,
      is_active: true,
    };

    const { error } = editing
      ? await supabase.from('pricing_plans').update(planData).eq('id', editing.id)
      : await supabase.from('pricing_plans').insert(planData);

    if (error) {
      toast({ variant: 'destructive', title: 'Lỗi', description: error.message });
    } else {
      toast({ title: editing ? 'Đã cập nhật' : 'Đã thêm mới' });
      setOpen(false);
      setEditing(null);
      loadPlans();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Xác nhận xóa?')) return;
    
    const { error } = await supabase.from('pricing_plans').delete().eq('id', id);
    if (error) {
      toast({ variant: 'destructive', title: 'Lỗi', description: error.message });
    } else {
      toast({ title: 'Đã xóa' });
      loadPlans();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Quản lý Học phí</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditing(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Thêm gói học phí
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editing ? 'Sửa' : 'Thêm'} gói học phí</DialogTitle>
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
                      <Label>Giá</Label>
                      <Input name="price" defaultValue={editing?.price} required placeholder="60.000đ" />
                    </div>
                    <div>
                      <Label>Thứ tự hiển thị</Label>
                      <Input type="number" name="display_order" defaultValue={editing?.display_order || 0} />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="is_popular" name="is_popular" defaultChecked={editing?.is_popular} />
                    <Label htmlFor="is_popular">Đánh dấu là phổ biến</Label>
                  </div>

                  <TabsContent value="vn" className="space-y-4">
                    <div>
                      <Label>Tên gói (VN)</Label>
                      <Input name="name_vn" defaultValue={editing?.name_vn} required />
                    </div>
                    <div>
                      <Label>Chu kỳ (VN)</Label>
                      <Input name="period_vn" defaultValue={editing?.period_vn} required placeholder="/ giờ" />
                    </div>
                    <div>
                      <Label>Mô tả (VN)</Label>
                      <Textarea name="description_vn" defaultValue={editing?.description_vn} />
                    </div>
                    <div>
                      <Label>Tính năng (VN, mỗi dòng 1 mục)</Label>
                      <Textarea name="features_vn" defaultValue={editing?.features_vn?.join('\n')} required />
                    </div>
                  </TabsContent>

                  <TabsContent value="jp" className="space-y-4">
                    <div>
                      <Label>Tên gói (JP)</Label>
                      <Input name="name_jp" defaultValue={editing?.name_jp} />
                    </div>
                    <div>
                      <Label>Chu kỳ (JP)</Label>
                      <Input name="period_jp" defaultValue={editing?.period_jp} />
                    </div>
                    <div>
                      <Label>Mô tả (JP)</Label>
                      <Textarea name="description_jp" defaultValue={editing?.description_jp} />
                    </div>
                    <div>
                      <Label>Tính năng (JP, mỗi dòng 1 mục)</Label>
                      <Textarea name="features_jp" defaultValue={editing?.features_jp?.join('\n')} />
                    </div>
                  </TabsContent>

                  <TabsContent value="en" className="space-y-4">
                    <div>
                      <Label>Tên gói (EN)</Label>
                      <Input name="name_en" defaultValue={editing?.name_en} />
                    </div>
                    <div>
                      <Label>Chu kỳ (EN)</Label>
                      <Input name="period_en" defaultValue={editing?.period_en} />
                    </div>
                    <div>
                      <Label>Mô tả (EN)</Label>
                      <Textarea name="description_en" defaultValue={editing?.description_en} />
                    </div>
                    <div>
                      <Label>Tính năng (EN, mỗi dòng 1 mục)</Label>
                      <Textarea name="features_en" defaultValue={editing?.features_en?.join('\n')} />
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

      <div className="grid gap-4 md:grid-cols-2">
        {plans.map((plan) => (
          <Card key={plan.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{plan.name_vn}</h3>
                <p className="text-2xl font-bold text-primary mt-2">{plan.price}</p>
                <p className="text-sm text-muted-foreground">{plan.period_vn}</p>
                {plan.is_popular && <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded mt-2 inline-block">Phổ biến</span>}
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => { setEditing(plan); setOpen(true); }}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(plan.id)}>
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

export default PricingAdmin;
