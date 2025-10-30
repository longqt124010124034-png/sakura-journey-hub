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

const TeamAdmin = () => {
  const [members, setMembers] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    const { data } = await supabase
      .from('team_members')
      .select('*')
      .order('display_order', { ascending: true });
    if (data) setMembers(data);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const memberData = {
      name_vn: formData.get('name_vn') as string,
      name_jp: formData.get('name_jp') as string || null,
      name_en: formData.get('name_en') as string || null,
      role_vn: formData.get('role_vn') as string,
      role_jp: formData.get('role_jp') as string || null,
      role_en: formData.get('role_en') as string || null,
      experience: formData.get('experience') as string,
      rating: parseFloat(formData.get('rating') as string),
      description_vn: formData.get('description_vn') as string,
      description_jp: formData.get('description_jp') as string || null,
      description_en: formData.get('description_en') as string || null,
      specialties_vn: (formData.get('specialties_vn') as string).split(',').map(s => s.trim()).filter(Boolean),
      specialties_jp: (formData.get('specialties_jp') as string || '')?.split(',').map(s => s.trim()).filter(Boolean) || null,
      specialties_en: (formData.get('specialties_en') as string || '')?.split(',').map(s => s.trim()).filter(Boolean) || null,
      image_url: (formData.get('image_url') as string) || null,
      display_order: parseInt(formData.get('display_order') as string) || 0,
      is_active: true,
    };

    const { error } = editing
      ? await supabase.from('team_members').update(memberData).eq('id', editing.id)
      : await supabase.from('team_members').insert(memberData);

    if (error) {
      toast({ variant: 'destructive', title: 'Lỗi', description: error.message });
    } else {
      toast({ title: editing ? 'Đã cập nhật' : 'Đã thêm mới' });
      setOpen(false);
      setEditing(null);
      loadMembers();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Xác nhận xóa?')) return;
    
    const { error } = await supabase.from('team_members').delete().eq('id', id);
    if (error) {
      toast({ variant: 'destructive', title: 'Lỗi', description: error.message });
    } else {
      toast({ title: 'Đã xóa' });
      loadMembers();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Quản lý Đội ngũ</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditing(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Thêm giáo viên
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editing ? 'Sửa' : 'Thêm'} giáo viên</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <Tabs defaultValue="vn" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="vn">Tiếng Việt</TabsTrigger>
                  <TabsTrigger value="jp">日本語</TabsTrigger>
                  <TabsTrigger value="en">English</TabsTrigger>
                </TabsList>

                <div className="space-y-4 mt-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>Kinh nghiệm</Label>
                      <Input name="experience" defaultValue={editing?.experience} required />
                    </div>
                    <div>
                      <Label>Đánh giá</Label>
                      <Input type="number" step="0.1" min="0" max="5" name="rating" defaultValue={editing?.rating || 5} required />
                    </div>
                    <div>
                      <Label>Thứ tự hiển thị</Label>
                      <Input type="number" name="display_order" defaultValue={editing?.display_order || 0} />
                    </div>
                  </div>

                  <div>
                    <Label>URL ảnh</Label>
                    <Input name="image_url" defaultValue={editing?.image_url} placeholder="/path/to/image.jpg" />
                  </div>

                  <TabsContent value="vn" className="space-y-4">
                    <div>
                      <Label>Tên (VN)</Label>
                      <Input name="name_vn" defaultValue={editing?.name_vn} required />
                    </div>
                    <div>
                      <Label>Vai trò (VN)</Label>
                      <Input name="role_vn" defaultValue={editing?.role_vn} required />
                    </div>
                    <div>
                      <Label>Mô tả (VN)</Label>
                      <Textarea name="description_vn" defaultValue={editing?.description_vn} required />
                    </div>
                    <div>
                      <Label>Chuyên môn (VN, phân cách bằng dấu phẩy)</Label>
                      <Input name="specialties_vn" defaultValue={editing?.specialties_vn?.join(', ')} required />
                    </div>
                  </TabsContent>

                  <TabsContent value="jp" className="space-y-4">
                    <div>
                      <Label>Tên (JP)</Label>
                      <Input name="name_jp" defaultValue={editing?.name_jp} />
                    </div>
                    <div>
                      <Label>Vai trò (JP)</Label>
                      <Input name="role_jp" defaultValue={editing?.role_jp} />
                    </div>
                    <div>
                      <Label>Mô tả (JP)</Label>
                      <Textarea name="description_jp" defaultValue={editing?.description_jp} />
                    </div>
                    <div>
                      <Label>Chuyên môn (JP, phân cách bằng dấu phẩy)</Label>
                      <Input name="specialties_jp" defaultValue={editing?.specialties_jp?.join(', ')} />
                    </div>
                  </TabsContent>

                  <TabsContent value="en" className="space-y-4">
                    <div>
                      <Label>Tên (EN)</Label>
                      <Input name="name_en" defaultValue={editing?.name_en} />
                    </div>
                    <div>
                      <Label>Vai trò (EN)</Label>
                      <Input name="role_en" defaultValue={editing?.role_en} />
                    </div>
                    <div>
                      <Label>Mô tả (EN)</Label>
                      <Textarea name="description_en" defaultValue={editing?.description_en} />
                    </div>
                    <div>
                      <Label>Chuyên môn (EN, phân cách bằng dấu phẩy)</Label>
                      <Input name="specialties_en" defaultValue={editing?.specialties_en?.join(', ')} />
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
        {members.map((member) => (
          <Card key={member.id} className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                {member.image_url && (
                  <img src={member.image_url} alt={member.name_vn} className="w-16 h-16 rounded-full object-cover" />
                )}
                <div>
                  <h3 className="font-bold text-lg">{member.name_vn}</h3>
                  <p className="text-sm text-muted-foreground">{member.role_vn} | {member.experience}</p>
                  <p className="text-sm mt-2">{member.description_vn}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => { setEditing(member); setOpen(true); }}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(member.id)}>
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

export default TeamAdmin;
