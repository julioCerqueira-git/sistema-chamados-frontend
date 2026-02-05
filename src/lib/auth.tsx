import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from './api'
import { tokenKey } from './config'
import type { MeResponse } from './types'

type AuthContextValue = {
  me: MeResponse | null
  loading: boolean
  setToken: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue>({
  me: null,
  loading: false,
  setToken: () => {},
  logout: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [me, setMe] = useState<MeResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem(tokenKey)
    if (!token) {
      setLoading(false)
      return
    }
    auth.me().then(setMe).finally(() => setLoading(false))
  }, [])

  const setToken = (token: string) => {
    localStorage.setItem(tokenKey, token)
    setLoading(true)
    auth.me().then(setMe).finally(() => setLoading(false))
  }

  const logout = () => {
    localStorage.removeItem(tokenKey)
    setMe(null)
  }

  return (
    <AuthContext.Provider value={{ me, loading, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
