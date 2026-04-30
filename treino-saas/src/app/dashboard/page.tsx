'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'

export default function Dashboard() {
  const [students, setStudents] = useState<any[]>([])
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      const fetchStudents = async () => {
        const { data } = await supabase.from('students').select('*').eq('personal_id', user.id)
        setStudents(data || [])
      }
      fetchStudents()
    }
  }, [user])

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-white">Meus Alunos</h1>
        <button className="bg-emerald-500 px-4 py-2 rounded-lg text-black font-bold">+ Aluno</button>
      </div>
      <div className="grid gap-4">
        {students.map(student => (
          <div key={student.id} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
            {student.name}
          </div>
        ))}
      </div>
    </div>
  )
}