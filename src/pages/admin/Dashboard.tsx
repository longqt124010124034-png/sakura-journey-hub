import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, DollarSign, HelpCircle } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    courses: 0,
    team: 0,
    pricing: 0,
    faq: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const [courses, team, pricing, faq] = await Promise.all([
      supabase.from('courses').select('id', { count: 'exact', head: true }),
      supabase.from('team_members').select('id', { count: 'exact', head: true }),
      supabase.from('pricing_plans').select('id', { count: 'exact', head: true }),
      supabase.from('faqs').select('id', { count: 'exact', head: true }),
    ]);

    setStats({
      courses: courses.count || 0,
      team: team.count || 0,
      pricing: pricing.count || 0,
      faq: faq.count || 0,
    });
  };

  const statCards = [
    { title: 'Khóa học', value: stats.courses, icon: BookOpen, color: 'text-blue-500' },
    { title: 'Giáo viên', value: stats.team, icon: Users, color: 'text-green-500' },
    { title: 'Gói học phí', value: stats.pricing, icon: DollarSign, color: 'text-yellow-500' },
    { title: 'FAQ', value: stats.faq, icon: HelpCircle, color: 'text-purple-500' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Tổng quan</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
