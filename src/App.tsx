import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import TicketsList from './pages/TicketsList'
import TicketDetail from './pages/TicketDetail'
import TicketForm from './pages/TicketForm'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './routes/ProtectedRoute'
import './App.css'

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<TicketsList />} />
          <Route path="/tickets/novo" element={<TicketForm />} />
          <Route path="/tickets/:id" element={<TicketDetail />} />
          <Route path="/tickets/:id/editar" element={<TicketForm />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}
