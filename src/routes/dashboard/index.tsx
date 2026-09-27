import { createFileRoute, useNavigate, redirect } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { LogOut, ShieldAlert } from 'lucide-react';

export const Route = createFileRoute('/dashboard/')({
  component: DashboardOverview,
});

function DashboardOverview() {
  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate({ to: '/auth' });
        return;
      }
      
      const { data: userRole } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .single();
        
      if (userRole) {
        setRole(userRole.role);
        // Implement role-based redirect
        if (userRole.role === 'admin') navigate({ to: '/dashboard/admin' });
        else if (userRole.role === 'beekeeper') navigate({ to: '/dashboard/beekeeper' });
        else navigate({ to: `/dashboard/${userRole.role}` }); // generic routing
      } else {
        setRole('customer'); // Default role if none found
      }
      setLoading(false);
    };
    checkRole();
  }, [navigate]);

  if (loading) {
    return <div className="p-8 text-center text-muted-foreground">Loading dashboard...</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto text-center">
      <ShieldAlert className="h-16 w-16 text-destructive mx-auto mb-4" />
      <h1 className="text-3xl font-bold mb-4">No Role Assigned</h1>
      <p className="mb-6 text-muted-foreground">
        Your account does not have a specific supply chain role assigned. Please contact an administrator.
      </p>
      <Button variant="outline" onClick={async () => {
        await supabase.auth.signOut();
        navigate({ to: '/' });
      }}>
        <LogOut className="mr-2 h-4 w-4" /> Sign Out
      </Button>
    </div>
  );
}
