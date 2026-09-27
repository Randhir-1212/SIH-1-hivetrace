import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Hexagon, Image as ImageIcon, MapPin, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/dashboard/beekeeper')({
  component: BeekeeperDashboard,
});

function BeekeeperDashboard() {
  const navigate = useNavigate();
  const [farms, setFarms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFarms = async () => {
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
        
      if (userRole?.role !== 'beekeeper' && userRole?.role !== 'admin') {
        navigate({ to: '/dashboard' });
        return;
      }

      const { data } = await supabase
        .from('farms')
        .select('*, hives(*)')
        .eq('owner_id', user.id);

      setFarms(data || []);
      setLoading(false);
    };

    fetchFarms();
  }, [navigate]);

  if (loading) return <div className="p-8 text-center text-muted-foreground">Loading Beekeeper Dashboard...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Beekeeper Dashboard</h1>
        <Button>Register New Farm</Button>
      </div>
      
      {farms.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center text-muted-foreground">
            <Hexagon className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p>You haven't registered any farms yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {farms.map((farm) => (
            <Card key={farm.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{farm.name}</span>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </CardTitle>
                <p className="text-sm text-muted-foreground">{farm.location}</p>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm font-medium flex items-center gap-2">
                    <Hexagon className="h-4 w-4" /> {farm.hives?.length || 0} Registered Hives
                  </div>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="secondary" size="sm" className="w-full justify-start">
                    <ImageIcon className="h-4 w-4 mr-2" /> Upload Media
                  </Button>
                  <Button variant="secondary" size="sm" className="w-full justify-start">
                    <Activity className="h-4 w-4 mr-2" /> Honey Collection
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
