import axios from 'axios'
import type { AuthResponse, LoginPayload, MeResponse, RegisterPayload, Ticket, TicketPayload } from './types'
import { API_URL, tokenKey } from './config'

const api = axios.create({ baseURL: API_URL })

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(tokenKey)
  if (token) {
    if (config.headers) {
      const h: any = config.headers
      if (typeof h.set === 'function') {
        h.set('Authorization', `Bearer ${token}`)
      } else {
        h['Authorization'] = `Bearer ${token}`
      }
    } else {
      config.headers = { Authorization: `Bearer ${token}` } as any
    }
  }
  return config
})

export const auth = {
  register: (data: RegisterPayload) => api.post<AuthResponse>('/auth/register', data).then(r => r.data),
  login: (data: LoginPayload) => api.post<AuthResponse>('/auth/login', data).then(r => r.data),
  me: () => api.get<MeResponse>('/auth/me').then(r => r.data),
}

export const tickets = {
  create: (data: TicketPayload) => api.post<Ticket>('/tickets', data).then(r => r.data),
  listMine: () => api.get<Ticket[]>('/tickets').then(r => r.data),
  get: (id: string) => api.get<Ticket>(`/tickets/${id}`).then(r => r.data),
  update: (id: string, data: TicketPayload) => api.put<Ticket>(`/tickets/${id}`, data).then(r => r.data),
  remove: (id: string) => api.delete<void>(`/tickets/${id}`).then(r => r.data),
}

export default api
