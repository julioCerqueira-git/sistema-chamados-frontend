export type Role = 'user' | 'admin'
export interface MeResponse {
  userId: string
  username: string
  role: Role
}
export interface AuthResponse {
  access_token: string
}
export interface RegisterPayload {
  name: string
  email: string
  password: string
}
export interface LoginPayload {
  email: string
  password: string
}
export interface Ticket {
  id: string
  title: string
  description: string
  userId: string
  createdAt: string
  updatedAt: string
}
export interface TicketPayload {
  title: string
  description: string
}
