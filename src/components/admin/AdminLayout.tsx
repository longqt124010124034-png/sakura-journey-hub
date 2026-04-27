import { useEffect, useState } from 'react';
import { useNavigate, Outlet, NavLink } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Home, BookOpen, Users, DollarSign, HelpCircle, Info, LogOut, Inbox, PanelBottom, Palette } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const ADMIN_THEMES = [
  { id: 'sakura', name: 'Sakura', color: 'hsl(348 83% 47%)' },
  { id: 'ocean', name: 'Ocean', color: 'hsl(210 90% 50%)' },
  { id: 'forest', name: 'Forest', color: 'hsl(152 60% 38%)' },
  { id: 'sunset', name: 'Sunset', color: 'hsl(18 90% 55%)' },
  { id: 'violet', name: 'Violet', color: 'hsl(270 70% 55%)' },
  { id: 'midnight', name: 'Midnight', color: 'hsl(230 80% 60%)' },
] as const;
type AdminThemeId = typeof ADMIN_THEMES[number]['id'];

const AdminLayout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [adminTheme, setAdminTheme] = useState<AdminThemeId>(
    () => (localStorage.getItem('admin-theme') as AdminThemeId) || 'sakura'
  );

  useEffect(() => {
    localStorage.setItem('admin-theme', adminTheme);
  }, [adminTheme]);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate('/auth');
      return;
    }

    const { data: roles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', session.user.id)
      .eq('role', 'admin')
      .single();

    if (!roles) {
      toast({
        variant: 'destructive',
        title: 'Không có quyền truy cập',
        description: 'Bạn không có quyền truy cập trang quản trị',
      });
      navigate('/');
      return;
    }

    setIsAdmin(true);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Đang tải...</div>;
  }

  if (!isAdmin) {
    return null;
  }

  const menuItems = [
    { title: 'Tổng quan', url: '/admin', icon: Home },
    { title: 'Đăng ký liên hệ', url: '/admin/submissions', icon: Inbox },
    { title: 'Giới thiệu', url: '/admin/about', icon: Info },
    { title: 'Khóa học', url: '/admin/courses', icon: BookOpen },
    { title: 'Đội ngũ', url: '/admin/team', icon: Users },
    { title: 'Học phí', url: '/admin/pricing', icon: DollarSign },
    { title: 'FAQ', url: '/admin/faq', icon: HelpCircle },
    { title: 'Footer', url: '/admin/footer', icon: PanelBottom },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full" data-admin-theme={adminTheme}>
        <Sidebar className="border-r">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="font-bold text-lg">CMS Admin</h2>
            <SidebarTrigger />
          </div>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Quản lý nội dung</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={item.url}
                          end={item.url === '/admin'}
                          className={({ isActive }) =>
                            isActive ? 'bg-primary text-primary-foreground' : ''
                          }
                        >
                          <item.icon className="mr-2 h-4 w-4" />
                          <span>{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <div className="p-4 border-t mt-auto">
            <Button onClick={handleLogout} variant="outline" className="w-full">
              <LogOut className="mr-2 h-4 w-4" />
              Đăng xuất
            </Button>
          </div>
        </Sidebar>

        <main className="flex-1 overflow-auto">
          <div className="sticky top-0 z-30 flex items-center justify-end gap-2 px-6 py-3 border-b bg-background/80 backdrop-blur">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Palette className="h-4 w-4" />
                  <span className="hidden sm:inline">Theme</span>
                  <span
                    className="h-3 w-3 rounded-full border"
                    style={{ background: ADMIN_THEMES.find((t) => t.id === adminTheme)?.color }}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Chọn theme màu</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {ADMIN_THEMES.map((t) => (
                  <DropdownMenuItem
                    key={t.id}
                    onClick={() => setAdminTheme(t.id)}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <span
                      className="h-4 w-4 rounded-full border"
                      style={{ background: t.color }}
                    />
                    <span className="flex-1">{t.name}</span>
                    {adminTheme === t.id && <span className="text-xs text-primary">✓</span>}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
