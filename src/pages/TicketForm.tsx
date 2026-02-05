import type { FormEvent } from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { tickets } from '../lib/api'

export default function TicketForm() {
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!id) return
    setLoading(true)
    tickets.get(id).then(t => {
      setTitle(t.title)
      setDescription(t.description)
    }).catch(() => setError('Erro ao carregar')).finally(() => setLoading(false))
  }, [id])

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      if (id) {
        await tickets.update(id, { title, description })
        navigate(`/tickets/${id}`)
      } else {
        const t = await tickets.create({ title, description })
        navigate(`/tickets/${t.id}`)
      }
    } catch {
      setError('Erro ao salvar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: '16px auto' }}>
      <h2>{id ? 'Editar Ticket' : 'Novo Ticket'}</h2>
      <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)} rows={5} />
        <button type="submit" disabled={loading}>{loading ? 'Salvando...' : 'Salvar'}</button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
    </div>
  )
}
