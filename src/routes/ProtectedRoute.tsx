import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../lib/auth.tsx'

export default function ProtectedRoute() {
  const { me, loading } = useAuth()
  if (loading) return <div>Carregando...</div>
  if (!me) return <Navigate to="/login" replace />
  return <Outlet />
}
