import { useEffect, useState } from 'react'
import { tickets } from '../lib/api'
import type { Ticket } from '../lib/types'
import { Link } from 'react-router-dom'

export default function TicketsList() {
  const [items, setItems] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    tickets.listMine().then(setItems).catch(() => setError('Erro ao carregar'))
      .finally(() => setLoading(false))
  }, [])
  if (loading) return <div>Carregando...</div>
  if (error) return <div style={{ color: 'red' }}>{error}</div>
  return (
    <div style={{ maxWidth: 800, margin: '16px auto' }}>
      <h2>Meus Tickets</h2>
      {items.length === 0 ? <div>Nenhum ticket</div> : (
        <ul style={{ display: 'grid', gap: 8, padding: 0, listStyle: 'none' }}>
          {items.map(t => (
            <li key={t.id} style={{ border: '1px solid #ddd', padding: 12, borderRadius: 6 }}>
              <strong>{t.title}</strong>
              <p>{t.description}</p>
              <Link to={`/tickets/${t.id}`}>Detalhes</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
