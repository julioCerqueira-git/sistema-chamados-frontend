import type { FormEvent } from 'react'
import { useState } from 'react'
import { auth } from '../lib/api'
import { useAuth } from '../lib/auth.tsx'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { setToken } = useAuth()
  const navigate = useNavigate()

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await auth.register({ name, email, password })
      setToken(res.access_token)
      navigate('/')
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Erro ao registrar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '32px auto' }}>
      <h2>Registrar</h2>
      <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input placeholder="Nome" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Senha" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Criar conta'}</button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
    </div>
  )
}
