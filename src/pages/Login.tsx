import type { FormEvent } from 'react'
import { useState } from 'react'
import { auth } from '../lib/api'
import { useAuth } from '../lib/auth.tsx'
import { useNavigate } from 'react-router-dom'
import { extractErrorMessage } from '../lib/utils'

export default function Login() {
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
      const res = await auth.login({ email, password })
      setToken(res.access_token)
      navigate('/')
    } catch (err: any) {
      setError(extractErrorMessage(err, 'Erro ao fazer login'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '32px auto' }}>
      <h2>Login</h2>
      <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Senha" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
    </div>
  )
}
