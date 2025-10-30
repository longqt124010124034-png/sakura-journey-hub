import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CoursesAdmin = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const { data } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setCourses(data);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const courseData = {
      code: formData.get('code') as string,
      name_vn: formData.get('name_vn') as string,
      name_jp: formData.get('name_jp') as string || null,
      name_en: formData.get('name_en') as string || null,
      level: formData.get('level') as string,
      material: formData.get('material') as string,
      duration: formData.get('duration') as string,
      capacity: parseInt(formData.get('capacity') as string),
      description_vn: formData.get('description_vn') as string,
      description_jp: formData.get('description_jp') as string || null,
      description_en: formData.get('description_en') as string || null,
      highlights_vn: (formData.get('highlights_vn') as string).split('\n').filter(Boolean),
      highlights_jp: (formData.get('highlights_jp') as string || '')?.split('\n').filter(Boolean) || null,
      highlights_en: (formData.get('highlights_en') as string || '')?.split('\n').filter(Boolean) || null,
      is_active: true,
    };

    const { error } = editing
      ? await supabase.from('courses').update(courseData).eq('id', editing.id)
      : await supabase.from('courses').insert(courseData);

    if (error) {
      toast({ variant: 'destructive', title: 'Lỗi', description: error.message });
    } else {
      toast({ title: editing ? 'Đã cập nhật' : 'Đã thêm mới' });
      setOpen(false);
      setEditing(null);
      loadCourses();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Xác nhận xóa?')) return;
    
    const { error } = await supabase.from('courses').delete().eq('id', id);
    if (error) {
      toast({ variant: 'destructive', title: 'Lỗi', description: error.message });
    } else {
      toast({ title: 'Đã xóa' });
      loadCourses();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Quản lý Khóa học</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditing(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Thêm khóa học
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editing ? 'Sửa' : 'Thêm'} khóa học</DialogTitle>
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
                      <Label>Mã môn</Label>
                      <Input name="code" defaultValue={editing?.code} required />
                    </div>
                    <div>
                      <Label>Level</Label>
                      <Select name="level" defaultValue={editing?.level}>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PreN5">PreN5</SelectItem>
                          <SelectItem value="N5">N5</SelectItem>
                          <SelectItem value="N4">N4</SelectItem>
                          <SelectItem value="N3">N3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Tài liệu</Label>
                      <Input name="material" defaultValue={editing?.material} required />
                    </div>
                    <div>
                      <Label>Thời gian</Label>
                      <Input name="duration" defaultValue={editing?.duration} required />
                    </div>
                  </div>

                  <div>
                    <Label>Số lượng</Label>
                    <Input type="number" name="capacity" defaultValue={editing?.capacity} required />
                  </div>

                  <TabsContent value="vn" className="space-y-4">
                    <div>
                      <Label>Tên môn (VN)</Label>
                      <Input name="name_vn" defaultValue={editing?.name_vn} required />
                    </div>
                    <div>
                      <Label>Mô tả (VN)</Label>
                      <Textarea name="description_vn" defaultValue={editing?.description_vn} required />
                    </div>
                    <div>
                      <Label>Điểm nổi bật (VN, mỗi dòng 1 mục)</Label>
                      <Textarea name="highlights_vn" defaultValue={editing?.highlights_vn?.join('\n')} required />
                    </div>
                  </TabsContent>

                  <TabsContent value="jp" className="space-y-4">
                    <div>
                      <Label>Tên môn (JP)</Label>
                      <Input name="name_jp" defaultValue={editing?.name_jp} />
                    </div>
                    <div>
                      <Label>Mô tả (JP)</Label>
                      <Textarea name="description_jp" defaultValue={editing?.description_jp} />
                    </div>
                    <div>
                      <Label>Điểm nổi bật (JP, mỗi dòng 1 mục)</Label>
                      <Textarea name="highlights_jp" defaultValue={editing?.highlights_jp?.join('\n')} />
                    </div>
                  </TabsContent>

                  <TabsContent value="en" className="space-y-4">
                    <div>
                      <Label>Tên môn (EN)</Label>
                      <Input name="name_en" defaultValue={editing?.name_en} />
                    </div>
                    <div>
                      <Label>Mô tả (EN)</Label>
                      <Textarea name="description_en" defaultValue={editing?.description_en} />
                    </div>
                    <div>
                      <Label>Điểm nổi bật (EN, mỗi dòng 1 mục)</Label>
                      <Textarea name="highlights_en" defaultValue={editing?.highlights_en?.join('\n')} />
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
        {courses.map((course) => (
          <Card key={course.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{course.code} - {course.name_vn}</h3>
                <p className="text-sm text-muted-foreground">Level: {course.level} | {course.duration}</p>
                <p className="text-sm mt-2">{course.description_vn}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => { setEditing(course); setOpen(true); }}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(course.id)}>
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

export default CoursesAdmin;
