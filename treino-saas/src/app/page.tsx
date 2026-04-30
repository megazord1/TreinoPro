'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) alert(error.message)
    else window.location.href = '/dashboard'
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6 text-emerald-500">FitManager</h1>
      <input 
        className="bg-zinc-900 p-3 rounded mb-2 w-full max-w-sm"
        placeholder="Email" 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        className="bg-zinc-900 p-3 rounded mb-4 w-full max-w-sm"
        type="password" 
        placeholder="Senha" 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button onClick={handleLogin} className="bg-emerald-600 p-3 rounded w-full max-w-sm font-bold">
        Entrar
      </button>
    </div>
  )
}