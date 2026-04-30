'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

export default function AlunoDashboard() {
  const { user } = useAuth();
  const [workout, setWorkout] = useState<any>(null);

  useEffect(() => {
    if (!user) return;

    const fetchWorkout = async () => {
      const { data } = await supabase
        .from('workouts')
        .select(`*, exercises(*)`)
        .eq('student_id', user.id)
        .single();
      setWorkout(data);
    };

    fetchWorkout();

    // Inscrição em tempo real para mudanças no treino
    const channel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'exercises' }, fetchWorkout)
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <h1 className="text-2xl font-bold mb-6 text-emerald-500">Meu Treino</h1>
      {workout?.exercises.map((ex: any) => (
        <div key={ex.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl mb-4">
          <h3 className="font-bold text-lg">{ex.name}</h3>
          <p className="text-zinc-400">{ex.sets} séries x {ex.reps} • {ex.weight}kg</p>
        </div>
      ))}
    </div>
  );
}