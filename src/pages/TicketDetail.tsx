import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { tickets } from '../lib/api'
import type { Ticket } from '../lib/types'
import { useAuth } from '../lib/auth.tsx'
import { Link } from 'react-router-dom'

export default function TicketDetail() {
  const { id } = useParams()
  const [item, setItem] = useState<Ticket | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { me } = useAuth()

  useEffect(() => {
    if (!id) return
    tickets.get(id).then(setItem).catch(() => setError('Erro ao carregar'))
      .finally(() => setLoading(false))
  }, [id])

  const onDelete = async () => {
    if (!id) return
    try {
      await tickets.remove(id)
      navigate('/')
    } catch {
      setError('Erro ao excluir')
    }
  }

  if (loading) return <div>Carregando...</div>
  if (error) return <div style={{ color: 'red' }}>{error}</div>
  if (!item) return <div>Não encontrado</div>
  const canEdit = !!me
  const canDelete = me && me.role === 'admin'
  return (
    <div style={{ maxWidth: 800, margin: '16px auto' }}>
      <h2>{item.title}</h2>
      <p>{item.description}</p>
      <div style={{ display: 'flex', gap: 12 }}>
        {canEdit && <Link to={`/tickets/${item.id}/editar`}>Editar</Link>}
        {canDelete && <button onClick={onDelete}>Excluir</button>}
      </div>
    </div>
  )
}
