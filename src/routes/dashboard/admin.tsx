import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Activity, Hexagon, Database } from 'lucide-react';

export const Route = createFileRoute('/dashboard/admin')({
  component: AdminDashboard,
});

function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ users: 0, farms: 0, hives: 0, batches: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      // Very basic security check for UI
      const { data: userRole } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
        .single();
        
      if (userRole?.role !== 'admin') {
        navigate({ to: '/dashboard' });
        return;
      }

      // Fetch actual stats via API or direct Supabase call if RLS permits
      // We will do direct calls assuming RLS for admin allows it
      const [users, farms, hives, batches] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('farms').select('*', { count: 'exact', head: true }),
        supabase.from('hives').select('*', { count: 'exact', head: true }),
        supabase.from('batches').select('*', { count: 'exact', head: true })
      ]);

      setStats({
        users: users.count || 0,
        farms: farms.count || 0,
        hives: hives.count || 0,
        batches: batches.count || 0,
      });
      setLoading(false);
    };

    fetchStats();
  }, [navigate]);

  if (loading) return <div className="p-8 text-center text-muted-foreground">Loading Admin Dashboard...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Admin Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.users}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Farms</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.farms}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hives</CardTitle>
            <Hexagon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.hives}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Honey Batches</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.batches}</div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">System Actions</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <button className="p-4 rounded-lg border bg-card hover:bg-accent text-left transition-colors">
            <h3 className="font-medium">Manage Users</h3>
            <p className="text-sm text-muted-foreground">Assign roles and permissions</p>
          </button>
          <button className="p-4 rounded-lg border bg-card hover:bg-accent text-left transition-colors">
            <h3 className="font-medium">Audit Logs</h3>
            <p className="text-sm text-muted-foreground">View system activity history</p>
          </button>
          <button className="p-4 rounded-lg border bg-card hover:bg-accent text-left transition-colors">
            <h3 className="font-medium">Blockchain Explorer</h3>
            <p className="text-sm text-muted-foreground">Verify on-chain hashes</p>
          </button>
        </div>
      </div>
    </div>
  );
}
