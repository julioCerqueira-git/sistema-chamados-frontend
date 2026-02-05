import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/auth.tsx'

export default function NavBar() {
  const { me, logout } = useAuth()
  const navigate = useNavigate()
  const onLogout = () => {
    logout()
    navigate('/login')
  }
  return (
    <nav style={{ display: 'flex', gap: 12, padding: 12, borderBottom: '1px solid #ddd' }}>
      <Link to="/">Meus Tickets</Link>
      <Link to="/tickets/novo">Novo Ticket</Link>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 12 }}>
        {me ? (
          <>
            <span>{me.username} ({me.role})</span>
            <button onClick={onLogout}>Sair</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Registrar</Link>
          </>
        )}
      </div>
    </nav>
  )
}
