import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Eye, Search, Mail, Phone, BookOpen, Clock, Inbox } from 'lucide-react';

type Submission = {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string | null;
  message: string | null;
  status: string;
  created_at: string;
};

const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  new: { label: 'Mới', variant: 'default' },
  contacted: { label: 'Đã liên hệ', variant: 'secondary' },
  enrolled: { label: 'Đã đăng ký', variant: 'outline' },
  rejected: { label: 'Từ chối', variant: 'destructive' },
};

const SubmissionsAdmin = () => {
  const [items, setItems] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selected, setSelected] = useState<Submission | null>(null);
  const { toast } = useToast();

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      toast({ variant: 'destructive', title: 'Lỗi tải dữ liệu', description: error.message });
    } else {
      setItems(data || []);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from('contact_submissions').update({ status }).eq('id', id);
    if (error) {
      toast({ variant: 'destructive', title: 'Lỗi', description: error.message });
    } else {
      toast({ title: 'Đã cập nhật trạng thái' });
      load();
      if (selected?.id === id) setSelected({ ...selected, status });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Xác nhận xóa đăng ký này?')) return;
    const { error } = await supabase.from('contact_submissions').delete().eq('id', id);
    if (error) {
      toast({ variant: 'destructive', title: 'Lỗi', description: error.message });
    } else {
      toast({ title: 'Đã xóa' });
      load();
    }
  };

  const filtered = items.filter((it) => {
    const q = search.toLowerCase().trim();
    const matchSearch = !q || it.name.toLowerCase().includes(q) || it.email.toLowerCase().includes(q) || it.phone.includes(q);
    const matchStatus = filterStatus === 'all' || it.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: items.length,
    new: items.filter(i => i.status === 'new').length,
    contacted: items.filter(i => i.status === 'contacted').length,
    enrolled: items.filter(i => i.status === 'enrolled').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Đăng ký liên hệ</h1>
        <p className="text-muted-foreground mt-1">Danh sách thông tin học viên đăng ký từ form liên hệ</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4"><div className="text-sm text-muted-foreground">Tổng cộng</div><div className="text-2xl font-bold">{stats.total}</div></Card>
        <Card className="p-4"><div className="text-sm text-muted-foreground">Mới</div><div className="text-2xl font-bold text-primary">{stats.new}</div></Card>
        <Card className="p-4"><div className="text-sm text-muted-foreground">Đã liên hệ</div><div className="text-2xl font-bold">{stats.contacted}</div></Card>
        <Card className="p-4"><div className="text-sm text-muted-foreground">Đã đăng ký</div><div className="text-2xl font-bold text-green-500">{stats.enrolled}</div></Card>
      </div>

      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Tìm theo tên, email, số điện thoại..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-48"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="new">Mới</SelectItem>
              <SelectItem value="contacted">Đã liên hệ</SelectItem>
              <SelectItem value="enrolled">Đã đăng ký</SelectItem>
              <SelectItem value="rejected">Từ chối</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card>
        {loading ? (
          <div className="p-12 text-center text-muted-foreground">Đang tải...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <Inbox className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">Chưa có đăng ký nào</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Họ tên</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead className="hidden sm:table-cell">SĐT</TableHead>
                  <TableHead className="hidden lg:table-cell">Khóa học</TableHead>
                  <TableHead className="hidden md:table-cell">Thời gian</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((it) => (
                  <TableRow key={it.id}>
                    <TableCell className="font-medium">{it.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{it.email}</TableCell>
                    <TableCell className="hidden sm:table-cell">{it.phone}</TableCell>
                    <TableCell className="hidden lg:table-cell max-w-[200px] truncate">{it.course || '—'}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                      {new Date(it.created_at).toLocaleString('vi-VN')}
                    </TableCell>
                    <TableCell>
                      <Select value={it.status} onValueChange={(v) => updateStatus(it.id, v)}>
                        <SelectTrigger className="w-32 h-8"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">Mới</SelectItem>
                          <SelectItem value="contacted">Đã liên hệ</SelectItem>
                          <SelectItem value="enrolled">Đã đăng ký</SelectItem>
                          <SelectItem value="rejected">Từ chối</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button size="icon" variant="ghost" onClick={() => setSelected(it)}><Eye className="h-4 w-4" /></Button>
                        <Button size="icon" variant="ghost" onClick={() => handleDelete(it.id)}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Chi tiết đăng ký</DialogTitle></DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div>
                <div className="text-2xl font-bold">{selected.name}</div>
                <Badge variant={statusConfig[selected.status]?.variant || 'default'} className="mt-2">
                  {statusConfig[selected.status]?.label || selected.status}
                </Badge>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3"><Mail className="h-4 w-4 text-muted-foreground" /><a href={`mailto:${selected.email}`} className="hover:underline">{selected.email}</a></div>
                <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-muted-foreground" /><a href={`tel:${selected.phone}`} className="hover:underline">{selected.phone}</a></div>
                {selected.course && <div className="flex items-center gap-3"><BookOpen className="h-4 w-4 text-muted-foreground" />{selected.course}</div>}
                <div className="flex items-center gap-3"><Clock className="h-4 w-4 text-muted-foreground" />{new Date(selected.created_at).toLocaleString('vi-VN')}</div>
              </div>
              {selected.message && (
                <div>
                  <div className="text-sm font-semibold mb-2">Tin nhắn</div>
                  <div className="bg-muted p-3 rounded-md text-sm whitespace-pre-wrap">{selected.message}</div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubmissionsAdmin;
